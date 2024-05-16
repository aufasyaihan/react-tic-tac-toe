export default function Log({ turns, currPlayer }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li
          key={`${turn.square.row}${turn.square.col}`}
          className={currPlayer === turn.player ? 'highlighted' : undefined}
        >
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
