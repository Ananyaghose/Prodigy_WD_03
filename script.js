// Select the game board and status elements
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

// Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]  // diagonals
];

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !isGameActive) {
        return; // Cell already taken or game over
    }

    // Mark the cell and update the board
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for winner or draw
    checkResult();

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusMessage();
}

// Function to check for win or draw
function checkResult() {
    let roundWon = false;

    // Check if any winning combination has been achieved
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    // Check for draw
    if (!board.includes("")) {
        gameStatus.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }
}

// Function to update the game status message
function updateStatusMessage() {
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    updateStatusMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

// Add event listeners
gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', resetGame);

// Initialize game status
updateStatusMessage();
