const statusDisplay = document.querySelector('#status-display');
const restartBtn = document.querySelector('#restart-btn');
const cells = document.querySelectorAll('.cell');
const modeSelect = document.querySelector('#mode-select');
const difficultySelect = document.querySelector('#difficulty-select');
const difficultyRow = document.querySelector('#difficulty-row');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = "ai";        // "ai" or "multiplayer"
let difficulty = "easy";     // "easy", "normal", "impossible"
const aiPlayer = "O";
const humanPlayer = "X";

const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

const winningMessage = () => {
    if (gameMode === "ai" && currentPlayer === aiPlayer) {
        return `AI has won!`;
    }
    return `Player ${currentPlayer} has won!`;
};
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => {
    if (gameMode === "ai" && currentPlayer === aiPlayer) {
        return `AI's turn`;
    }
    return `Player ${currentPlayer}'s turn`;
};

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    // The 'data-cell-index' attribute returns a string, so we parse it to a number
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if cell is already filled or if game is paused/over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // In AI mode, ignore human clicks while it's the AI's turn
    if (gameMode === "ai" && currentPlayer === aiPlayer) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    // If game still active, it's now the AI's turn in AI mode
    if (gameActive && gameMode === "ai" && currentPlayer === aiPlayer) {
        // Small delay so the AI move feels natural
        setTimeout(aiMove, 350);
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

// 3. Check for Win or Draw
function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        if (currentPlayer === "X") {
            statusDisplay.style.color = "#e74c3c";
        } else {
            statusDisplay.style.color = "#3498db";
        }

        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        statusDisplay.style.color = "#6A0DAD";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    statusDisplay.style.color = "#555";
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    statusDisplay.style.color = "#555"

    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

// ---------- AI logic ----------

function aiMove() {
    if (!gameActive) return;

    let moveIndex;
    if (difficulty === "easy") {
        moveIndex = easyMove();
    } else if (difficulty === "normal") {
        moveIndex = normalMove();
    } else {
        moveIndex = impossibleMove();
    }

    if (moveIndex === null || moveIndex === undefined) return;

    const aiCell = cells[moveIndex];
    handleCellPlayed(aiCell, moveIndex);
    handleResultValidation();
}

// Easy: pick a random empty cell
function easyMove() {
    const empty = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") empty.push(i);
    }
    if (empty.length === 0) return null;
    return empty[Math.floor(Math.random() * empty.length)];
}

// Normal: take a win if available, block an immediate threat, otherwise
// prefer center then corners then a random move (no full lookahead)
function normalMove() {
    // 1. Win if we can
    const winMove = findWinningMove(aiPlayer);
    if (winMove !== null) return winMove;

    // 2. Block the opponent's winning move
    const blockMove = findWinningMove(humanPlayer);
    if (blockMove !== null) return blockMove;

    // 3. Take center
    if (gameState[4] === "") return 4;

    // 4. Take a random corner
    const corners = [0, 2, 6, 8].filter(i => gameState[i] === "");
    if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Fall back to any empty cell
    return easyMove();
}

// Returns the index of a move that would let `player` win, or null if none
function findWinningMove(player) {
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] !== "") continue;
        gameState[i] = player;
        if (checkWin(player)) {
            gameState[i] = "";
            return i;
        }
        gameState[i] = "";
    }
    return null;
}

function checkWin(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === player && gameState[b] === player && gameState[c] === player) {
            return true;
        }
    }
    return false;
}

// Impossible: full minimax. Player X (human) moves first, so with perfect
// play from X the result is a draw; O can never lose.
function impossibleMove() {
    const empty = emptyCells();
    if (empty.length === 0) return null;

    let bestScore = -Infinity;
    let bestMove = null;
    for (const i of empty) {
        gameState[i] = aiPlayer; // AI is the maximizer
        const score = minimax(gameState, 0, false);
        gameState[i] = "";
        if (score > bestScore) {
            bestScore = score;
            bestMove = i;
        }
    }
    return bestMove;
}

function emptyCells() {
    const empty = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") empty.push(i);
    }
    return empty;
}

// minimax: returns +10 if aiPlayer wins, -10 if humanPlayer wins, 0 for draw.
// We adjust by depth so the AI prefers faster wins / slower losses.
function minimax(board, depth, isMaximizing) {
    if (checkWinFor(board, aiPlayer)) return 10 - depth;
    if (checkWinFor(board, humanPlayer)) return depth - 10;
    if (!board.includes("")) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== "") continue;
            board[i] = aiPlayer;
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i] = "";
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== "") continue;
            board[i] = humanPlayer;
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i] = "";
        }
        return best;
    }
}

function checkWinFor(board, player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// ---------- settings ----------

function updateModeVisibility() {
    if (gameMode === "ai") {
        difficultyRow.classList.remove('hidden');
    } else {
        difficultyRow.classList.add('hidden');
    }
}

modeSelect.addEventListener('change', () => {
    gameMode = modeSelect.value;
    updateModeVisibility();
    handleRestartGame();
});

difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    handleRestartGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);

// initial setup
updateModeVisibility();
