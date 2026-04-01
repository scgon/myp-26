document.addEventListener("DOMContentLoaded", () => {
    const navToggleButton = document.getElementById("nav-toggle");
    const sideNav = document.getElementById("sidenav");

    if (!navToggleButton || !sideNav) {
        return;
    }

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

