import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// export default function Board({xIsNext, squares, onPlay}) {
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  // const [next, setNext] = useState('X');
  let game_state, next;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const tmp_squares = squares.slice()
    if (xIsNext) {
      tmp_squares[i] = "X";
    } else {
      tmp_squares[i] = "O";
    }
    setSquares(tmp_squares)
    if (calculateWinner(tmp_squares)) {
      return
    }
    setXIsNext(!xIsNext);
  }
  next = xIsNext ? 'O': 'X';
  if (!calculateWinner(squares)) {
    next = xIsNext ? 'O': 'X';
    game_state = "Next player is " + (xIsNext ? 'X': 'O');
  }
  else {
    next = xIsNext ? 'X': 'O';
    game_state = "Winner is " + next;
  }

  return (
    <>
      <div className='status'>{game_state}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquares = history[history.length - 1];

//   function handlePlay(nextSquares) {
//     // todo
//   }

//   return (
//     <div className="game">
//       <div className='game-board'>
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
//       </div>
//       <div className='game-info'>
//         <ol>history goes here</ol>
//       </div>
//     </div>
//   )

// }

function calculateWinner(squares) {
  console.log("Test")
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('Winner is {squares[a]')
      return squares[a];
    }
  }
  return null;
}
