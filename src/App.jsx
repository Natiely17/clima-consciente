import React, { useState } from 'react';
import About from './components/About.jsx';
import OpinionForm from './components/OpinionForm.jsx';
import Results from './components/Results.jsx';
import styles from './App.module.css';

function App() {
  const [pagina, setPagina] = useState('sobre');

  // Guarda o tema escolhido para manter a preferência ao abrir o site novamente.
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema-clima') || 'claro';
  });

  function mudarTema() {
    const novoTema = tema === 'claro' ? 'escuro' : 'claro';
    setTema(novoTema);
    localStorage.setItem('tema-clima', novoTema);
  }

  return (
    <div data-tema={tema}>
      <header className={styles.header}>
        <h2>🌿 Clima em pauta</h2>

        <nav className={styles.nav}>
          <button onClick={() => setPagina('sobre')}>Sobre</button>
          <button onClick={() => setPagina('formulario')}>Questionário</button>
          <button onClick={() => setPagina('resultados')}>Respostas</button>
          <button
            className={styles.botaoTema}
            onClick={mudarTema}
            aria-label="Mudar tema do site"
          >
            {tema === 'claro' ? '🌙 Tema escuro' : '☀️ Tema claro'}
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        {pagina === 'sobre' && <About irParaFormulario={() => setPagina('formulario')} />}
        {pagina === 'formulario' && <OpinionForm />}
        {pagina === 'resultados' && <Results />}
      </main>

      <footer className={styles.footer}>
        Projeto escolar • Pesquisa anônima sobre mudanças climáticas
      </footer>
    </div>
  );
}

export default App;
