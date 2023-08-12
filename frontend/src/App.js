import './App.css';

function App() {
  const handleTwitch = () => {
    console.log(window.Twitch);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="inputBlock">
          <p className="title bold">Chess.com username</p>
          <p className="description">
            Your{' '}
            <a
              href="https://chess.com/settings"
              target="_blank"
              style={{ color: '#a970ff' }}
            >
              chess.com
            </a>{' '}
            username.
          </p>
          <input type="text" className="input" />
        </div>
        <div className="inputBlock">
          <p className="title bold">Maximum queue size (optional)</p>
          <p className="description">
            Here you can define the maximum queue size, if needed. Leave empty
            for no limit.
          </p>
          <input type="text" placeholder="Ex: 10" className="input" />
        </div>
        <div className="inputBlock" onClick={handleTwitch}>
          <button className="button">Salvar alterações</button>
        </div>
      </header>
    </div>
  );
}

export default App;
