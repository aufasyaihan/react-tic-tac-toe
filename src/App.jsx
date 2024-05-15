import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Aufa" symbol="X"/>
          <Player name="Rizki" symbol="O"/>
        </ol>
      </div>
    </main>
  );
}

export default App;
