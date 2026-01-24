// Word list for the game
const WORDS = word_list = ['ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT', 'RIVAL', 'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'];

// Game state
let targetWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;

function getTargetWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

// Initialize the game
function init() {
    targetWord = getTargetWord();

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

    // Add reset button event listener
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetGame);
    }
}

// Reset the game
function resetGame() {
    // Reset game state
    currentRow = 0;
    currentTile = 0;
    gameOver = false;
    targetWord = getTargetWord();

    // Clear the board
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.textContent = '';
        tile.className = 'tile';
    });

    // Reset keyboard
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.classList.remove('correct', 'present', 'absent');
    });

    // Hide any messages
    const messageEl = document.getElementById('message');
    messageEl.classList.remove('show');
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

    if (guess.length !== 5) {
        // showMessage('Not enough letters');
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