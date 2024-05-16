import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  // const [haveWinner, setHaveWinner] = useState(false); // its redundant
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;

  function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((item) => [...item])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function deriveWinner(gameBoard, players) {
    let winner;

    for (const combinations of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combinations[0].row][combinations[0].column];
      const secondSquareSymbol =
        gameBoard[combinations[1].row][combinations[1].column];
      const thirdSquareSymbol =
        gameBoard[combinations[2].row][combinations[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol]; // atau players.firstSquareSymbol jg bisa
      }
    }
    return winner;
  }
  

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currPlayer = deriveActivePlayer(prevGameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevGameTurns,
      ];

      return updatedTurns;
    });
  }

  function handleOnRestart() {
    setGameTurns([]);
  }

  function handlePlayersName(symbol, newName) {
    setPlayers((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayersName}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayersName}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleOnRestart} />
        )}
      </div>
      <Log turns={gameTurns} currPlayer={activePlayer} />
    </main>
  );
}

export default App;
