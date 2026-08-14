# AGENTS.md

Static HTML/CSS/JS website (no framework, no build step, no package.json). Hosted on Cloudflare Pages via the GitHub repo. All games live in `pages/`.

## Layout conventions
- Each game = 3 files in `pages/`: `<game>.html`, `<game>-styles.css`, `<game>-script.js`.
- `pages/nav-toggle.js` is shared by every page (loaded with `defer`).
- Every page must include the `nav-toggle` button (`id="nav-toggle"`, aria attributes) and a `div.sidenav` (`id="sidenav"`) listing all game links, plus Home. The current page's link gets `id="current-page"`.
- `index.html` also has an inline copy of the sidenav CSS, so keep its styles in sync with the per-game stylesheets.

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
