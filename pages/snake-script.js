document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const highScoreElement = document.getElementById("high-score");
    const startButton = document.getElementById("restart-button");
    const messageElement = document.getElementById("message");

    const speedSelect = document.getElementById("speed-select");
    const sizeSelect = document.getElementById("size-select");
    const fruitsSelect = document.getElementById("fruits-select");

    const btnUp = document.getElementById("btn-up");
    const btnDown = document.getElementById("btn-down");
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");

    const SPEED_OPTIONS = {
        slow: 150,
        normal: 100,
        fast: 60
    };

    const SIZE_OPTIONS = {
        small: 16,
        normal: 20,
        large: 25
    };

    const CANVAS_SIZE = 400;

    let gridSize = SIZE_OPTIONS[sizeSelect.value];
    let tileSize = CANVAS_SIZE / gridSize;
    let totalCells = gridSize * gridSize;
    let fruitCount = parseInt(fruitsSelect.value);
    let gameInterval = null;
    let gameRunning = false;

    let snake = [];
    let foods = [];
    let dx = 1;
    let dy = 0;
    let nextDx = 1;
    let nextDy = 0;
    let score = 0;
    let highScore = parseInt(localStorage.getItem("snake_high_score")) || 0;
    let gameOver = false;

    highScoreElement.textContent = highScore;

    function applySize() {
        gridSize = SIZE_OPTIONS[sizeSelect.value];
        tileSize = CANVAS_SIZE / gridSize;
        totalCells = gridSize * gridSize;
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
    }

    function initBoard() {
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }

        gameRunning = false;
        gameOver = false;

        snake = [
            { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
            { x: Math.floor(gridSize / 2) - 1, y: Math.floor(gridSize / 2) },
            { x: Math.floor(gridSize / 2) - 2, y: Math.floor(gridSize / 2) }
        ];

        dx = 1;
        dy = 0;
        nextDx = 1;
        nextDy = 0;

        score = 0;
        scoreElement.textContent = score;
        startButton.textContent = "Start Game";

        hideMessage();
        spawnFoods();
        draw();
    }

    function startGame() {
        if (gameRunning) return;

        gameOver = false;
        gameRunning = true;
        startButton.textContent = "Restart Game";

        if (gameInterval) clearInterval(gameInterval);

        gameInterval = setInterval(gameLoop, SPEED_OPTIONS[speedSelect.value]);
    }

    // Set of cell keys occupied by the snake and current fruits
    function occupiedKeys() {
        const occupied = new Set(snake.map(s => s.x + "," + s.y));
        foods.forEach(food => occupied.add(food.x + "," + food.y));
        return occupied;
    }

    // Random empty cell, with a linear fallback for near-full boards
    function randomEmptyCell(occupied) {
        for (let attempts = 0; attempts < 1000; attempts++) {
            const x = Math.floor(Math.random() * gridSize);
            const y = Math.floor(Math.random() * gridSize);
            if (!occupied.has(x + "," + y)) {
                occupied.add(x + "," + y);
                return { x, y };
            }
        }
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (!occupied.has(x + "," + y)) {
                    occupied.add(x + "," + y);
                    return { x, y };
                }
            }
        }
        return null;
    }

    // Spawns the initial set of fruits
    function spawnFoods() {
        foods = [];
        const occupied = occupiedKeys();
        for (let f = 0; f < fruitCount; f++) {
            const pos = randomEmptyCell(occupied);
            if (!pos) break;
            foods.push(pos);
        }
    }

    // Spawns one new fruit onto a random empty cell (for respawning an eaten fruit)
    function respawnFood() {
        const occupied = occupiedKeys();
        const pos = randomEmptyCell(occupied);
        if (pos) foods.push(pos);
        return !!pos;
    }

    function gameLoop() {
        if (gameOver || !gameRunning) return;

        dx = nextDx;
        dy = nextDy;

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            handleGameOver();
            return;
        }

        // Self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            handleGameOver();
            return;
        }

        snake.unshift(head);

        // Food collision
        const foodIndex = foods.findIndex(food => food.x === head.x && food.y === head.y);
        if (foodIndex !== -1) {
            score += 1;
            scoreElement.textContent = score;

            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem("snake_high_score", highScore.toString());
            }

            foods.splice(foodIndex, 1);

            // Win condition: snake fills the entire board
            if (snake.length >= totalCells) {
                handleGameWin();
                return;
            }

            // Move only the eaten fruit to a new spot, leaving the others untouched
            respawnFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function getBoardColors() {
        const darkMode = document.documentElement.classList.contains("dark-mode");
        return {
            background: darkMode ? "#1e1f22" : "#f8f9fa",
            grid: darkMode ? "#33363a" : "#e9ecef"
        };
    }

    function draw() {
        const colors = getBoardColors();

        // Clear canvas
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw grid lines
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        for (let i = 0; i <= gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * tileSize, 0);
            ctx.lineTo(i * tileSize, CANVAS_SIZE);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * tileSize);
            ctx.lineTo(CANVAS_SIZE, i * tileSize);
            ctx.stroke();
        }

        // Draw foods (apples)
        foods.forEach(food => {
            const foodX = food.x * tileSize + tileSize / 2;
            const foodY = food.y * tileSize + tileSize / 2;
            const foodRadius = tileSize / 2 - 2;

            ctx.fillStyle = "#e74c3c";
            ctx.beginPath();
            ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
            ctx.fill();

            // Leaf on apple
            ctx.fillStyle = "#27ae60";
            ctx.beginPath();
            ctx.ellipse(foodX + 2, foodY - foodRadius, tileSize * 0.15, tileSize * 0.25, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw snake
        const headInset = tileSize >= 18 ? 1 : 0;
        const bodyInset = tileSize >= 18 ? 2 : 1;
        const headRadius = tileSize >= 18 ? 6 : 4;
        const bodyRadius = tileSize >= 18 ? 4 : 2;
        const eyeSize = Math.max(1, tileSize * 0.12);
        const pupilSize = Math.max(0.5, tileSize * 0.06);
        const eyeSpread = tileSize * 0.4;

        snake.forEach((segment, index) => {
            const x = segment.x * tileSize;
            const y = segment.y * tileSize;
            const isHead = index === 0;

            if (isHead) {
                ctx.fillStyle = "#1e8449";
                ctx.beginPath();
                ctx.roundRect(x + headInset, y + headInset, tileSize - headInset * 2, tileSize - headInset * 2, headRadius);
                ctx.fill();

                // Eyes on head
                ctx.fillStyle = "#ffffff";
                let eye1X = x + tileSize * 0.25, eye1Y = y + tileSize * 0.25;
                let eye2X = x + tileSize * 0.75, eye2Y = y + tileSize * 0.75;

                if (dx === 1) {
                    eye1X = x + tileSize - eyeSpread; eye1Y = y + tileSize * 0.25;
                    eye2X = x + tileSize - eyeSpread; eye2Y = y + tileSize * 0.65;
                } else if (dx === -1) {
                    eye1X = x + eyeSpread; eye1Y = y + tileSize * 0.25;
                    eye2X = x + eyeSpread; eye2Y = y + tileSize * 0.65;
                } else if (dy === 1) {
                    eye1X = x + tileSize * 0.25; eye1Y = y + tileSize - eyeSpread;
                    eye2X = x + tileSize * 0.65; eye2Y = y + tileSize - eyeSpread;
                } else if (dy === -1) {
                    eye1X = x + tileSize * 0.25; eye1Y = y + eyeSpread;
                    eye2X = x + tileSize * 0.65; eye2Y = y + eyeSpread;
                }

                ctx.beginPath();
                ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
                ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(eye1X, eye1Y, pupilSize, 0, Math.PI * 2);
                ctx.arc(eye2X, eye2Y, pupilSize, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = "#2ecc71";
                ctx.beginPath();
                ctx.roundRect(x + bodyInset, y + bodyInset, tileSize - bodyInset * 2, tileSize - bodyInset * 2, bodyRadius);
                ctx.fill();
            }
        });
    }

    function handleGameOver() {
        gameOver = true;
        gameRunning = false;
        clearInterval(gameInterval);
        gameInterval = null;
        startButton.textContent = "Restart Game";
        showMessage(`Game Over! Final Score: ${score}`, "lose");
    }

    function handleGameWin() {
        gameOver = true;
        gameRunning = false;
        clearInterval(gameInterval);
        gameInterval = null;
        startButton.textContent = "Restart Game";
        showMessage(`You Win! Final Score: ${score}`, "win");
        launchConfetti();
        draw();
    }

    function changeDirection(newDx, newDy) {
        if (gameOver) return;
        // Prevent 180 degree turns
        if (newDx !== 0 && dx === -newDx) return;
        if (newDy !== 0 && dy === -newDy) return;

        nextDx = newDx;
        nextDy = newDy;
    }

    // Keyboard Controls
    window.addEventListener("keydown", (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();

        if (!gameRunning) {
            const directionKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"];
            if (directionKeys.includes(e.key)) {
                if (gameOver) initBoard();
                startGame();
            }
        }

        switch (e.key) {
            case "ArrowUp":
            case "w":
            case "W":
                if (dy !== 1) changeDirection(0, -1);
                break;
            case "ArrowDown":
            case "s":
            case "S":
                if (dy !== -1) changeDirection(0, 1);
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if (dx !== 1) changeDirection(-1, 0);
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if (dx !== -1) changeDirection(1, 0);
                break;
        }
    });

    // On-screen Buttons
    if (btnUp) btnUp.addEventListener("click", () => changeDirection(0, -1));
    if (btnDown) btnDown.addEventListener("click", () => changeDirection(0, 1));
    if (btnLeft) btnLeft.addEventListener("click", () => changeDirection(-1, 0));
    if (btnRight) btnRight.addEventListener("click", () => changeDirection(1, 0));

    // Touch Swipe Controls on Canvas
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    canvas.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 20) {
                if (diffX > 0) changeDirection(1, 0);
                else changeDirection(-1, 0);
            }
        } else {
            if (Math.abs(diffY) > 20) {
                if (diffY > 0) changeDirection(0, 1);
                else changeDirection(0, -1);
            }
        }
    }, { passive: true });

    function showMessage(msg, type = "win") {
        messageElement.textContent = msg;
        messageElement.className = `message show ${type}`;
    }

    function hideMessage() {
        messageElement.className = "message";
    }

    startButton.addEventListener("click", () => {
        if (gameRunning || gameOver) {
            initBoard();
        }
        startGame();
    });

    speedSelect.addEventListener("change", () => {
        if (gameRunning) {
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, SPEED_OPTIONS[speedSelect.value]);
        }
    });

    // Repaint the board when the site theme is toggled
    document.addEventListener("themechange", () => {
        if (!gameRunning) {
            draw();
        }
    });

    sizeSelect.addEventListener("change", () => {
        applySize();
        initBoard();
    });

    fruitsSelect.addEventListener("change", () => {
        fruitCount = parseInt(fruitsSelect.value);
        initBoard();
    });

    applySize();
    initBoard();
});
