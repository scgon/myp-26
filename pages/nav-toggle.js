// Theme is applied at the top level (not inside DOMContentLoaded) so the
// saved preference takes effect as early as possible and avoids a flash
// of the wrong theme while deferred scripts run.
const THEME_STORAGE_KEY = "theme";

function getSavedTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
}

applyTheme(getSavedTheme());

document.addEventListener("DOMContentLoaded", () => {
    const navToggleButton = document.getElementById("nav-toggle");
    const sideNav = document.getElementById("sidenav");

    if (!navToggleButton || !sideNav) {
        return;
    }

    const clearScoresBtnId = "clear-scores-btn";
    const themeToggleBtnId = "theme-toggle-btn";

    function injectSidenavButtonStyles() {
        if (document.getElementById("sidenav-buttons-style")) return;
        const style = document.createElement("style");
        style.id = "sidenav-buttons-style";
        style.textContent = `
            .clear-scores-btn {
                display: block;
                width: calc(100% - 20px);
                margin: 8px 10px 4px;
                padding: 6px 10px;
                font-size: 0.7rem;
                font-weight: 600;
                color: #555;
                background: #fff;
                border: 2px solid #ccc;
                border-radius: 6px;
                cursor: pointer;
                text-align: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            .clear-scores-btn:hover {
                color: #e74c3c;
                border-color: #e74c3c;
                box-shadow: 0 2px 6px rgba(231, 76, 60, 0.25);
            }
            html.dark-mode .clear-scores-btn {
                color: #ccc;
                background: #2b2b2e;
                border-color: #555;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            }
            html.dark-mode .clear-scores-btn:hover {
                color: #ff7b72;
                border-color: #e74c3c;
            }

            /* Same look as the clear scores button, but larger */
            .theme-toggle-btn {
                display: block;
                width: calc(100% - 20px);
                margin: 10px 10px 14px;
                padding: 10px 12px;
                font-size: 0.95rem;
                font-weight: 700;
                border-radius: 6px;
                cursor: pointer;
                text-align: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
            }
            /* Site is in light mode, so the button itself is dark */
            .theme-toggle-btn.theme-is-light {
                color: #fff;
                background: #333;
                border: 2px solid #333;
            }
            .theme-toggle-btn.theme-is-light:hover {
                background: #444;
                border-color: #444;
            }
            /* Site is in dark mode, so the button itself is light */
            .theme-toggle-btn.theme-is-dark {
                color: #333;
                background: #fff;
                border: 2px solid #ccc;
            }
            .theme-toggle-btn.theme-is-dark:hover {
                border-color: #888;
            }
        `;
        document.head.appendChild(style);
    }

    function refreshThemeToggleButton(button) {
        const currentTheme = getSavedTheme();
        const isDark = currentTheme === "dark";
        button.classList.toggle("theme-is-light", !isDark);
        button.classList.toggle("theme-is-dark", isDark);
        button.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
        button.setAttribute("aria-pressed", String(isDark));
    }

    function setupThemeToggleButton() {
        let themeButton = document.getElementById(themeToggleBtnId);
        if (!themeButton) {
            themeButton = document.createElement("button");
            themeButton.type = "button";
            themeButton.id = themeToggleBtnId;
            themeButton.className = "theme-toggle-btn";
            themeButton.setAttribute("aria-pressed", "false");

            // Place it above the "Clear All High Scores" button
            const clearButton = document.getElementById(clearScoresBtnId);
            if (clearButton) {
                sideNav.insertBefore(themeButton, clearButton);
            } else {
                sideNav.appendChild(themeButton);
            }
        }
        refreshThemeToggleButton(themeButton);

        themeButton.addEventListener("click", () => {
            const newTheme = getSavedTheme() === "dark" ? "light" : "dark";
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            applyTheme(newTheme);
            refreshThemeToggleButton(themeButton);
            document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: newTheme } }));
        });
    }

    function setupClearScoresButton() {
        let clearButton = document.getElementById(clearScoresBtnId);
        if (!clearButton) {
            clearButton = document.createElement("button");
            clearButton.type = "button";
            clearButton.id = clearScoresBtnId;
            clearButton.className = "clear-scores-btn";
            clearButton.textContent = "Clear All High Scores";
            sideNav.appendChild(clearButton);
        }
        clearButton.addEventListener("click", () => {
            const confirmed = confirm("This will remove all high scores and saved data. Continue?");
            if (!confirmed) return;
            localStorage.clear();
            alert("All high scores and saved data have been cleared.");
        });
    }

    injectSidenavButtonStyles();
    setupClearScoresButton();
    setupThemeToggleButton();

    const setMenuState = (isOpen) => {
        sideNav.classList.toggle("is-open", isOpen);
        navToggleButton.setAttribute("aria-expanded", String(isOpen));
    };

    navToggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = sideNav.classList.contains("is-open");
        setMenuState(!isOpen);
    });

    document.addEventListener("click", (event) => {
        if (!sideNav.classList.contains("is-open")) {
            return;
        }

        if (sideNav.contains(event.target) || navToggleButton.contains(event.target)) {
            return;
        }

        setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });

    sideNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            setMenuState(false);
        }
    });
});
