//TicTacToe.js
import React from 'react';
import { useState, useEffect } from 'react';

import styles from '../../resourses/css/TicTacToe.module.css';

function Square({ value, onSquareClick }) {
  return (
    <button className={styles.squareButton} onClick={onSquareClick} >
        {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner + "!";
  } else if (noWinner(squares)) {
    status = "It's a tie!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h2>{status}</h2>
      <br />
      <div className={styles.boardContainer}>
        <div className={styles.boardRow + ' ' + styles.boardRowLR + ' ' + styles.boardRowUp}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div> 
        <div className={styles.boardRow + ' ' + styles.boardRowLR}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className={styles.boardRow + ' ' + styles.boardRowLR + ' ' + styles.boardRowDown}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
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
    const [x, y, z] = lines[i];
    if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
      return squares[x];
    }
  }
  return null;
}

function noWinner(squares) { // A function that shows whether the game ended in a tie or not.
  // Checking for a tie comes after checking for a winner. If all elements in the list are null, then true is output.
  for (let i = 0; i < squares.length; i++ ) {
    if (squares[i] === null) return false;
  }
  return true;
}

const TicTacToe = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "lightgoldenrodyellow";

    return () => {
        document.body.style.backgroundColor = "lightgray";
    }
  })

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move + " - " + ((move % 2 === 0) ? "X" : "O");
    } else {
      description = "Go to game start - X";
    }
    return (
      <li key={move} className={styles.listItem}>
        <button onClick={() => jumpTo(move)} className={styles.listButton}>{description}</button>
      </li>
    );
  });

  return (
    <div className="startPage">
      <h1>Tic Tac Toe</h1>
      <div className={styles.tictactoeContainer}>
        <div className={styles.TicTacToeMenu}>
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            <br />
          </div>
          <div>
            <p>The first player is <b>X</b> and the second player is <b>O</b>.</p>
            <ol className={styles.listObject}>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;