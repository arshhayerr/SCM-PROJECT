// Game logic
const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const statusDiv = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      setStatus(`${gameBoard[a]} Wins!`);
      return true;
    }
  }
  return false;
}


function checkDraw() {
  if (!gameBoard.includes('')) {
    setStatus("It's a Draw!");
    return true;
  }
  return false;
}


function setStatus(message) {
  statusDiv.textContent = message;
  statusDiv.style.color = 'white'; 
  board.style.pointerEvents = 'none'; 
}


function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.color = 'white';

    if (checkWin()) return;
    if (checkDraw()) return;

    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
  }
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'white'; 
  });
  statusDiv.textContent = '';
  statusDiv.style.color = 'white'; 
  board.style.pointerEvents = 'auto'; 
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);