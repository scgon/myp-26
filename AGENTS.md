# AGENTS.md

Static HTML/CSS/JS website (no framework, no build step, no package.json). Hosted on Cloudflare Pages via the GitHub repo. All games live in `pages/`.

## Layout conventions
- Each game = 3 files in `pages/`: `<game>.html`, `<game>-styles.css`, `<game>-script.js`.
- `pages/nav-toggle.js` is shared by every page (loaded with `defer`). It does two jobs: (1) the mobile sidenav drawer toggle, and (2) auto-injecting the "Clear All High Scores" button (`#clear-scores-btn`) plus its styles (`#clear-scores-style`) into the sidenav. New pages need NO button markup — it is created by `nav-toggle.js`.
- Every page must include the `nav-toggle` button (`id="nav-toggle"`, aria attributes) and a `.sidenav-wrapper` (`id="sidenav"`) wrapping an inner grey `.sidenav` box. The grey box lists all game links, plus Home. The current page's link gets `id="current-page"`. This wrapper structure is identical across `index.html` and every game page.
- `index.html` has an inline copy of the sidenav CSS (including `.sidenav-wrapper`), so keep its styles in sync with the per-game stylesheets.
- Game settings menus use the shared `.settings-menu` / `.settings-select` pattern (see snake/memory-match/tic-tac-toe).

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
No lint/test runners exist. After editing a JS file, run `node -c pages/<file>.js` for a syntax check.

## Persistence
High scores/best stats use `localStorage` (e.g. `snake_high_score`, `memory_best_moves_<gridsize>`, `memory_best_time_<gridsize>`).
