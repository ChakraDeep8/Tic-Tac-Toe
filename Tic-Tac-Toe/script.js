const board = document.getElementById('tic-tac-toe-board');
const cells = Array.from({ length: 9 }, (_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    return cell;
});

let currentPlayer = 'X';
let gameOver = false;

function handleCellClick(event) {
    const cell = event.target;
    if (cell.innerText || gameOver) return;

    cell.innerText = currentPlayer;
    cell.dataset.player = currentPlayer;

    if (checkWinner()) {
        gameOver = true;
        document.getElementById('winner-message').textContent = `Player ${currentPlayer} wins!`;
        displayPopup(`Player ${currentPlayer} wins!`);
    } else if (cells.every(cell => cell.innerText)) {
        gameOver = true;
        document.getElementById('winner-message').textContent = "It's a draw!";
        displayPopup("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('current-player').textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
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

    return winningCombinations.some(combination =>
        combination.every(index => cells[index].innerText === currentPlayer)
    );
}

function startNewGame() {
    closePopup(); // Close the pop-up
    cells.forEach(cell => {
        cell.innerText = '';
        cell.removeAttribute('data-player');
    });

    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('current-player').textContent = 'Current Player: X';
    document.getElementById('winner-message').textContent = '';
}

function displayPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupWinner = document.getElementById('popup-winner');

    popup.style.display = 'flex';
    popupWinner.textContent = message;
}
// Add a function to restart the game
function restartGame() {
    startNewGame();
    document.getElementById('current-player').textContent = 'Current Player: X';
    document.getElementById('winner-message').textContent = ''; // Clear any previous winner message
}
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
