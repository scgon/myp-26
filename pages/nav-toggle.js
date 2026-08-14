document.addEventListener("DOMContentLoaded", () => {
    const navToggleButton = document.getElementById("nav-toggle");
    const sideNav = document.getElementById("sidenav");

    if (!navToggleButton || !sideNav) {
        return;
    }

    const clearScoresBtnId = "clear-scores-btn";

    function injectClearScoresStyles() {
        if (document.getElementById("clear-scores-style")) return;
        const style = document.createElement("style");
        style.id = "clear-scores-style";
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
        `;
        document.head.appendChild(style);
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

    injectClearScoresStyles();
    setupClearScoresButton();

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

