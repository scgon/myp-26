document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const bestMovesDisplay = document.getElementById('best-moves');
    const bestTimeDisplay = document.getElementById('best-time');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const sizeSelect = document.getElementById('size-select');

    const emojiPool = [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐙', '🦀', '🐳', '🦄', '🐻‍❄️'
    ];
    const FREE_SPACE_EMOJI = '⭐';

    let gridSize = 5;
    let flippedCards = [];
    let matchedPairs = 1;
    let totalToMatch = 13;
    let moves = 0;
    let timerInterval;
    let seconds = 0;
    let gameStarted = false;
    let bestMoves = null;
    let bestTime = null;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getRandomEmojiSet(pairCount) {
        return shuffle([...emojiPool]).slice(0, pairCount);
    }

    function formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function startTimer() {
        if (gameStarted) return;
        gameStarted = true;
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }

    function loadBestStats() {
        bestMoves = parseInt(localStorage.getItem(`memory_best_moves_${gridSize}`)) || null;
        bestTime = parseInt(localStorage.getItem(`memory_best_time_${gridSize}`)) || null;
        bestMovesDisplay.textContent = bestMoves !== null ? bestMoves : '—';
        bestTimeDisplay.textContent = bestTime !== null ? formatTime(bestTime) : '—';
    }

    function updateBestStats() {
        if (bestMoves === null || moves < bestMoves) {
            bestMoves = moves;
            localStorage.setItem(`memory_best_moves_${gridSize}`, bestMoves);
        }
        if (bestTime === null || seconds < bestTime) {
            bestTime = seconds;
            localStorage.setItem(`memory_best_time_${gridSize}`, bestTime);
        }
        bestMovesDisplay.textContent = bestMoves;
        bestTimeDisplay.textContent = formatTime(bestTime);
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        const hasFreeSpace = gridSize % 2 === 1;
        const pairCount = (gridSize * gridSize - (hasFreeSpace ? 1 : 0)) / 2;
        totalToMatch = pairCount + (hasFreeSpace ? 1 : 0);

        const selectedEmojis = getRandomEmojiSet(pairCount);
        const emojiCards = shuffle([...selectedEmojis, ...selectedEmojis]);

        if (hasFreeSpace) {
            emojiCards.splice(Math.floor(gridSize * gridSize / 2), 0, FREE_SPACE_EMOJI);
        }

        emojiCards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="card-back"></div>
                <div class="card-front">${emoji}</div>
            `;

            // If it's the star card, reveal it immediately and keep it non-interactive
            if (emoji === FREE_SPACE_EMOJI) {
                card.classList.add('flipped', 'free-space');
            } else {
                card.addEventListener('click', () => flipCard(card));
            }

            gameBoard.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched') || card.classList.contains('free-space')) {
            return;
        }

        startTimer();
        card.classList.add('flipped');

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Apply 'matched' class after the flip animation (0.4s)
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                checkWin();
            }, 400);
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function checkWin() {
        if (matchedPairs === totalToMatch) {
            clearInterval(timerInterval);
            updateBestStats();
            messageDisplay.textContent = 'You Win!';
            messageDisplay.classList.add('win', 'show');
        }
    }

    function resetGame() {
        clearInterval(timerInterval);
        gameStarted = false;
        seconds = 0;
        moves = 0;
        matchedPairs = gridSize % 2 === 1 ? 1 : 0;
        flippedCards = [];
        movesDisplay.textContent = '0';
        timerDisplay.textContent = '00:00';
        messageDisplay.textContent = '';
        messageDisplay.classList.remove('win', 'show');
        loadBestStats();
        createBoard();
    }

    restartButton.addEventListener('click', resetGame);

    sizeSelect.addEventListener('change', () => {
        gridSize = parseInt(sizeSelect.value);
        resetGame();
    });

    createBoard();
});
