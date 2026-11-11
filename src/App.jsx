import React, { useState } from 'react';
import About from './components/About.jsx';
import OpinionForm from './components/OpinionForm.jsx';
import Results from './components/Results.jsx';
import './style.css';

function App() {
  const [pagina, setPagina] = useState('sobre');

  return (
    <div>
      <header>
        <h2>🌿 Clima em pauta</h2>
        <nav>
          <button onClick={() => setPagina('sobre')}>Sobre</button>
          <button onClick={() => setPagina('formulario')}>Questionário</button>
          <button onClick={() => setPagina('resultados')}>Respostas</button>
        </nav>
      </header>

      <main>
        {pagina === 'sobre' && <About irParaFormulario={() => setPagina('formulario')} />}
        {pagina === 'formulario' && <OpinionForm />}
        {pagina === 'resultados' && <Results />}
      </main>

      <footer>Projeto escolar • Pesquisa anônima sobre mudanças climáticas</footer>
    </div>
  );
}

export default App;
