# AGENTS.md

Static HTML/CSS/JS website (no framework, no build step, no package.json). Hosted on Cloudflare Pages via the GitHub repo (https://myp-26.pages.dev). All games live in `pages/`.

## Layout conventions
- Each game = 3 files in `pages/`: `<game>.html`, `<game>-styles.css`, `<game>-script.js`.
- Shared scripts in `pages/`:
  - `nav-toggle.js` is loaded with `defer` by every page. It does three jobs: (1) mobile sidenav drawer toggle, (2) injecting the "Clear All High Scores" button (`#clear-scores-btn`) into the sidenav, (3) dark mode: injects the theme toggle button (`#theme-toggle-btn`), applies a `dark-mode` class to `<html>` at the top level of the script (before DOMContentLoaded) to avoid a wrong-theme flash, persists to `localStorage` key `theme` ("light"/"dark"), defaults to the device's `prefers-color-scheme` (and follows live OS changes) until the user picks a theme explicitly, and dispatches a `themechange` event on `document`. Both injected buttons share styles in the `#sidenav-buttons-style` tag created by this script.
  - `confetti.js` is loaded with `defer` by game pages and exposes the global `launchConfetti()`. Any game with a win condition should call it when the player wins.
- New pages need NO sidenav button markup — buttons are created by `nav-toggle.js`.
- Every page must include the `nav-toggle` button (`id="nav-toggle"`, aria attributes) and a `.sidenav-wrapper` (`id="sidenav"`) wrapping an inner grey `.sidenav` box. The grey box lists all game links, plus Home. The current page's link gets `id="current-page"`.

## Dark mode
- Every page themes via `html.dark-mode ...` CSS overrides appended after the light styles: each game stylesheet has a section, and `index.html` has one in its inline `<style>` (keep them in sync).
- JS-driven colors must be theme-aware: snake's canvas picks colors from `getBoardColors()` and repaints on `themechange`; tic-tac-toe status text uses inline `var(--ttt-*)` colors defined per theme in `tic-tac-toe-styles.css` (inline styles beat class rules, so use variables, not hardcoded hex).

## Adding a new game (or any page)
Update **all** of these or navigation breaks:
- the new game's HTML/CSS/JS in `pages/`
- the sidenav in every existing page AND `index.html` (new game link)
- `index.html` nav + "Upcoming Games" roadmap list
- `README.md` ("Current Games" / planned list)
- `TODO.md` (move from Planned to Completed Games)

## Paths: relative only
Use relative paths (`../index.html`, `../favicon.ico`) — never root-absolute (`/index.html`). The site must work opened locally via `file://` and hosted on Cloudflare Pages.

## Verification
No lint/test runners exist. After editing a JS file, run `node -c pages/<file>.js` for a syntax check. Otherwise verify pages by opening them locally in a browser.

## Persistence
High scores/best stats/theme use `localStorage`: e.g. `snake_high_score`, `memory_best_moves_<gridsize>`, `memory_best_time_<gridsize>`, `theme`. Note: "Clear All High Scores" calls `localStorage.clear()`, which also wipes the saved theme.
