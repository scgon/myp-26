document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    const emojiPool = [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐙', '🦀', '🐳', '🦄', '🐻‍❄️'
    ];
    let flippedCards = [];
    let matchedPairs = 1;
    let moves = 0;
    let timerInterval;
    let seconds = 0;
    let gameStarted = false;

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

    function startTimer() {
        if (gameStarted) return;
        gameStarted = true;
        timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function createBoard() {
        gameBoard.innerHTML = '';

        const selectedEmojis = getRandomEmojiSet(12);
        const emojiCards = shuffle([...selectedEmojis, ...selectedEmojis]);

        // Insert '⭐' at index 12 (middle of 5x5 grid)
        const finalCards = [
            ...emojiCards.slice(0, 12),
            '⭐',
            ...emojiCards.slice(12)
        ];

        finalCards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="card-back"></div>
                <div class="card-front">${emoji}</div>
            `;

            // If it's the star card, reveal it immediately and keep it non-interactive
            if (emoji === '⭐') {
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
        if (matchedPairs === 13) {
            clearInterval(timerInterval);
            messageDisplay.textContent = 'You Win!';
            messageDisplay.classList.add('win', 'show');
        }
    }

    function resetGame() {
        clearInterval(timerInterval);
        gameStarted = false;
        seconds = 0;
        moves = 0;
        matchedPairs = 1;
        flippedCards = [];
        movesDisplay.textContent = '0';
        timerDisplay.textContent = '00:00';
        messageDisplay.textContent = '';
        messageDisplay.classList.remove('win', 'show');
        createBoard();
    }

    restartButton.addEventListener('click', resetGame);

    createBoard();
});
