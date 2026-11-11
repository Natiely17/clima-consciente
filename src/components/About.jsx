import React from 'react';
import { SOURCES } from '../data/theme.js';

function About({ irParaFormulario }) {
  return (
    <section>
      <p className="destaque">O CLIMA ESTÁ MUDANDO. E A NOSSA ROTINA?</p>
      <h1>O calor que sentimos também conta uma história.</h1>
      <p>Esta página apresenta uma pesquisa sobre mudanças climáticas e a sensação de calor no dia a dia.</p>
      <button onClick={irParaFormulario}>Responder à pesquisa</button>

      <h2>O que são mudanças climáticas?</h2>
      <p>São mudanças que acontecem nos padrões de temperatura e do clima ao longo do tempo. Atualmente, as atividades humanas, como a queima de combustíveis fósseis e o desmatamento, contribuem muito para o aquecimento global.</p>
      <p>Nas cidades, o asfalto e o concreto absorvem calor. A falta de árvores e de sombra pode deixar alguns lugares ainda mais quentes. Esse efeito é chamado de ilha de calor urbana.</p>

      <h2>O que pode ajudar?</h2>
      <ul>
        <li>Plantar e cuidar de árvores.</li>
        <li>Ter mais lugares com sombra.</li>
        <li>Melhorar a ventilação dos ambientes.</li>
        <li>Disponibilizar água para os estudantes.</li>
      </ul>

      <h2>Fontes de pesquisa</h2>
      <ul>
        {SOURCES.map((fonte) => (
          <li key={fonte.url}><a href={fonte.url} target="_blank" rel="noreferrer">{fonte.name}</a></li>
        ))}
      </ul>
      <p className="aviso">A pesquisa mostra a opinião dos estudantes. Ela não mede a temperatura de Araraquara.</p>
    </section>
  );
}

export default About;
