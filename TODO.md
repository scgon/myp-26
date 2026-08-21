# TODO

## Completed Games
* [x] **Snake**: HTML5 Canvas-based movement, food spawning, collision detection, and score tracking.

## Planned Games
* [ ] **Pong**: 2D paddle/ball physics with single-player (vs simple AI) and 2-player local modes.
* [ ] **2048**: Grid-based sliding tile puzzle with tile merge animations and score tracking.
* [ ] **Minesweeper**: Dynamic grid generation, flag mechanics, timer, and recursive reveal (flood fill).
* [ ] **Connect Four**: Turn-based dropping piece mechanics with win condition detection.
* [ ] **Breakout / Brick Breaker**: Canvas physics, paddle control, destructible bricks, and power-ups.
* [ ] **Flappy Bird Clone**: Gravity/jump physics, scrolling obstacles, and high-score saving.
* [ ] **Simon Says**: Sequence memorization with sound effects and increasing speed.

## Enhancements for Existing Games
* [ ] **Wordle**:
  * [ ] Add word validation dictionary and customizable word length options.
  * [ ] Add game statistics (streak, win rate, guess distribution) saved in `localStorage`.
* [ ] **Memory Match**:
  * [x] Add difficulty levels (grid sizes 4x4, 5x5, and 6x6).
  * [ ] Add customizable card themes (emojis, icons).
  * [x] Add move counter and speed-run timer.
  * [x] Add best moves and best time tracking (saved in `localStorage`).
* [ ] **Tic-Tac-Toe**:
  * [x] Add an AI opponent mode (easy random AI and unbeatable Minimax AI).
  * [ ] Add score tracker across multiple rounds.

## Site-Wide Features & UI/UX
* [x] **Persistent High Scores & Stats**: Use browser `localStorage` to save player records and stats across sessions.
* [ ] **Sound Effects & Music**: Add Web Audio / sound effects for actions, wins, and losses with a global mute toggle.
* [x] **Dark Mode / Theme Toggle**: Allow players to switch between light and dark color schemes.
* [ ] **How to Play Modals**: Add an info button on each game page with game rules and instructions.
* [x] **Win Animations**: Add confetti or celebration effects when winning a game.
* [ ] **Mobile & Touch Support**: Ensure touch swipe and on-screen controls work smoothly on mobile screens.