import React, { useState } from "react";
import Board from "./Board";

export default function App(props) {
  const [histories, setHistories] = useState([
    { squares: Array(9).fill(null) },
  ]);
  const [isX, setIsX] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i) => {
    const history = histories.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = isX ? "X" : "O";
    setHistories(history.concat([{ squares: squares }]));
    setStepNumber(history.length);
    setIsX(!isX);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsX(step % 2 === 0);
  };

  const current = histories[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = histories.map((step, move) => {
    const desc = move ? `${move} に移動する。` : "ゲームを始める。";
    const handleJumpTo = () => {
      jumpTo(move);
    };
    return (
      <li key={move}>
        <button onClick={handleJumpTo}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "勝者: " + winner;
  } else {
    status = "次のプレイヤー: " + (isX ? "X" : "O");
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
