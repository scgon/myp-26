// Word list for the game
const WORDS = [
    'REACT', 'WORLD', 'ABOUT', 'HEART', 'WATER', 'HOUSE', 'PLACE', 'LIGHT',
    'GREAT', 'SMALL', 'FOUND', 'STILL', 'BETWEEN', 'NEVER', 'BEING', 'AGAIN',
    'THINK', 'THREE', 'YEARS', 'COMES', 'THESE', 'COULD', 'WHERE', 'THEIR',
    'AFTER', 'FIRST', 'WOULD', 'OTHER', 'WRITE', 'THOSE', 'ALONG', 'SEEMS',
    'GHOST', 'PLANT', 'STORM', 'BREAD', 'FROST', 'OCEAN', 'TRAIL', 'BEACH'
];

// Game state
let targetWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;

// Get the target word for today
function getTargetWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

// Initialize the game
function init() {
    targetWord = getTargetWord();
    console.log('Target word:', targetWord); // For testing - remove in production

    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyPress);

    // Add click event listeners to keyboard buttons
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const letter = key.textContent;
            if (letter === 'ENTER') {
                handleSubmit();
            } else if (letter === '⌫') {
                handleBackspace();
            } else {
                handleLetter(letter);
            }
        });
    });
}

// Handle keyboard input
function handleKeyPress(e) {
    if (gameOver) return;

    if (e.key === 'Enter') {
        handleSubmit();
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key.match(/^[a-z]$/i)) {
        handleLetter(e.key.toUpperCase());
    }
}

// Handle letter input
function handleLetter(letter) {
    if (gameOver || currentTile >= 5) return;

    const row = document.querySelectorAll('.row')[currentRow];
    const tiles = row.querySelectorAll('.tile');

    tiles[currentTile].textContent = letter;
    tiles[currentTile].classList.add('filled');
    currentTile++;
}

// Handle backspace
function handleBackspace() {
    if (gameOver || currentTile === 0) return;

    const row = document.querySelectorAll('.row')[currentRow];
    const tiles = row.querySelectorAll('.tile');

    currentTile--;
    tiles[currentTile].textContent = '';
    tiles[currentTile].classList.remove('filled');
}

// Handle submit
function handleSubmit() {
    if (gameOver || currentTile !== 5) {
        if (currentTile < 5) {
            showMessage('Not enough letters');
        }
        return;
    }

    const row = document.querySelectorAll('.row')[currentRow];
    const tiles = row.querySelectorAll('.tile');
    let guess = '';

    tiles.forEach(tile => {
        guess += tile.textContent;
    });

    // Check if word is valid (in this simple version, any 5-letter combination is valid)
    if (guess.length !== 5) {
        showMessage('Not enough letters');
        return;
    }

    // Check the guess
    checkGuess(guess, tiles);

    if (guess === targetWord) {
        gameOver = true;
        setTimeout(() => {
            showMessage('Congratulations! 🎉', 3000);
        }, 1500);
    } else if (currentRow === 5) {
        gameOver = true;
        setTimeout(() => {
            showMessage(`Game Over! The word was ${targetWord}`, 5000);
        }, 1500);
    } else {
        currentRow++;
        currentTile = 0;
    }
}

// Check the guess against the target word
function checkGuess(guess, tiles) {
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const statuses = Array(5).fill('absent');

    // First pass: mark correct letters (green)
    guessLetters.forEach((letter, i) => {
        if (letter === targetLetters[i]) {
            statuses[i] = 'correct';
            targetLetters[i] = null; // Mark as used
        }
    });

    // Second pass: mark present letters (yellow)
    guessLetters.forEach((letter, i) => {
        if (statuses[i] !== 'correct') {
            const targetIndex = targetLetters.indexOf(letter);
            if (targetIndex !== -1) {
                statuses[i] = 'present';
                targetLetters[targetIndex] = null; // Mark as used
            }
        }
    });

    // Animate and color the tiles
    tiles.forEach((tile, i) => {
        setTimeout(() => {
            tile.classList.add(statuses[i]);
            updateKeyboard(guessLetters[i], statuses[i]);
        }, i * 300);
    });
}

// Update keyboard colors
function updateKeyboard(letter, status) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.textContent === letter) {
            // Only update if the new status is "better" than the current one
            const currentClasses = key.classList;
            if (status === 'correct') {
                key.classList.remove('present', 'absent');
                key.classList.add('correct');
            } else if (status === 'present' && !currentClasses.contains('correct')) {
                key.classList.remove('absent');
                key.classList.add('present');
            } else if (status === 'absent' && !currentClasses.contains('correct') && !currentClasses.contains('present')) {
                key.classList.add('absent');
            }
        }
    });
}

// Show message to user
function showMessage(text, duration = 2000) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.classList.add('show');

    setTimeout(() => {
        messageEl.classList.remove('show');
    }, duration);
}

// Start the game when the page loads
init();