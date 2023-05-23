import React, { useState } from "react";

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(square => !!square)) {
    return 'Draw';
  }

  return null;
}

const TILE_STYLE = {
  background: "lightblue",
  border: "2px solid darkblue",
  fontSize: "30px",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

const BOARD_STYLE = {
    border: "4px solid darkblue",
    borderRadius: "10px",
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

const Tile = ({onClick, value}) => (
  <button style={TILE_STYLE} onClick={onClick}>{value}</button>
);

const Board = ({ tiles, onClick }) => (
  <div style={BOARD_STYLE}>
    {tiles.map((tile, i) => (
      <Tile key={i} value={tile} onClick={() => onClick(i)} />
    ))}
  </div>
);

export const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  return (
    <div>
      <Board tiles={board} onClick={handleClick} />
      {winner ? (
        <>
          <p style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>Winner: {winner}</p>
          <button onClick={() => {setBoard(Array(9).fill(null))}}>Reset Game</button>
        </>
      )
      : (
        <p style={{ fontSize: 20, fontWeight: 'bold' }}>Who's turn? {xIsNext ? 'X' : 'O'}</p>
      )
      }
    </div>
  )
}

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height:'100vh',
      // #ffccc7 - red, #ffffb8 -- yellow, #b5f5ec -- cyan, #ffd6e7 -- magenta
      backgroundColor: '#ffccc7',
    }}>
      <p style={{ fontSize: 32, fontWeight: 'bold' }}>
        Tic Tac Toe
      </p>
      <Game />
    </div>
  );
}

export default App;
