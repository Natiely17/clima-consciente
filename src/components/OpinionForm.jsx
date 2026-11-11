import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { THEME, HEAT_OPTIONS } from '../data/theme.js';

function OpinionForm() {
  const [calor, setCalor] = useState('');
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviarResposta(event) {
    event.preventDefault();
    setMensagem('');

    if (calor === '' || nota === '') {
      setMensagem('Responda às duas primeiras perguntas.');
      return;
    }

    if (!isSupabaseConfigured) {
      setMensagem('Confira se o arquivo .env está configurado.');
      return;
    }

    setEnviando(true);

    try {
      const { error } = await supabase.from('opinioes').insert([
        {
          tema: THEME,
          resposta_1: calor,
          resposta_2: Number(nota),
          resposta_3: comentario
        }
      ]);

      if (error) {
        setMensagem('Não foi possível enviar. Confira a conexão com o Supabase.');
      } else {
        setMensagem('Resposta enviada! Obrigado por participar.');
        setCalor('');
        setNota('');
        setComentario('');
      }
    } catch (erro) {
      console.log(erro);
      setMensagem('Erro de conexão. Tente novamente.');
    }

    setEnviando(false);
  }

  return (
    <section>
      <h1>Questionário</h1>
      <p>As respostas são anônimas. Não escreva dados pessoais.</p>

      <form onSubmit={enviarResposta}>
        <h3>1. Você sente que o calor em Araraquara mudou nos últimos anos?</h3>
        {HEAT_OPTIONS.map((opcao) => (
          <label className="resposta" key={opcao}>
            <input type="radio" name="calor" value={opcao} checked={calor === opcao} onChange={(e) => setCalor(e.target.value)} />
            {opcao}
          </label>
        ))}

        <h3>2. De 1 a 5, quanto as mudanças climáticas afetam sua rotina?</h3>
        {[1, 2, 3, 4, 5].map((numero) => (
          <label className="nota" key={numero}>
            <input type="radio" name="nota" value={numero} checked={nota === String(numero)} onChange={(e) => setNota(e.target.value)} />
            {numero}
          </label>
        ))}

        <h3>3. O que a escola poderia fazer para diminuir o calor? (opcional)</h3>
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} maxLength="500" rows="4" />
        <p>{comentario.length}/500 caracteres</p>

        <button type="submit" disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar resposta'}</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </section>
  );
}

export default OpinionForm;
