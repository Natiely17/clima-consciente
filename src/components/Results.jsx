import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { THEME, HEAT_OPTIONS } from '../data/theme.js';
import StatCard from './StatCard.jsx';
import styles from './Results.module.css';

function Results() {
  const [respostas, setRespostas] = useState([]);
  const [mensagem, setMensagem] = useState('Carregando respostas...');

  async function carregarRespostas() {
    if (!isSupabaseConfigured) {
      setMensagem('Configure o arquivo .env para ver as respostas.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('opinioes')
        .select('*')
        .eq('tema', THEME)
        .order('criado_em', { ascending: false });

      if (error) {
        setMensagem('Não foi possível carregar as respostas.');
      } else {
        setRespostas(data);
        setMensagem('');
      }
    } catch (erro) {
      console.log(erro);
      setMensagem('Erro de conexão. Tente novamente.');
    }
  }

  useEffect(() => {
    carregarRespostas();
  }, []);

  const total = respostas.length;
  let media = 0;
  if (total > 0) {
    const soma = respostas.reduce((total, item) => total + item.resposta_2, 0);
    media = (soma / total).toFixed(1).replace('.', ',');
  }

  const comentarios = respostas.filter((item) => item.resposta_3 && item.resposta_3.trim() !== '');

  return (
    <section>
      <h1>Respostas da pesquisa</h1>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      {!mensagem && (
        <>
          <div className={styles.cartoes}>
            <StatCard titulo="Respostas recebidas" valor={total} />
            <StatCard titulo="Média de impacto" valor={media} />
            <StatCard titulo="Comentários" valor={comentarios.length} />
          </div>

          <h2>O calor em Araraquara mudou?</h2>
          {HEAT_OPTIONS.map((opcao) => {
            const quantidade = respostas.filter((item) => item.resposta_1 === opcao).length;
            return <p key={opcao}>{opcao}: <strong>{quantidade}</strong></p>;
          })}

          <h2>Sugestões dos estudantes</h2>
          {comentarios.length === 0 && <p>Ainda não há comentários.</p>}
          {comentarios.map((item) => <p className={styles.comentario} key={item.id}>“{item.resposta_3}”</p>)}
        </>
      )}

      <button onClick={carregarRespostas}>Atualizar respostas</button>
    </section>
  );
}

export default Results;
