let confettiRunning = false;

function launchConfetti(particleCount = 180) {
    if (confettiRunning) return;
    confettiRunning = true;

    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 2000;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#b5179e", "#4361ee"];
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width(),
            y: -20 - Math.random() * height() * 0.5,
            w: 6 + Math.random() * 6,
            h: 8 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 2 + Math.random() * 3,
            swayAmp: 20 + Math.random() * 40,
            swaySpeed: 0.02 + Math.random() * 0.03,
            phase: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.25
        });
    }

    let frame = 0;

    function tick() {
        frame++;
        ctx.clearRect(0, 0, width(), height());
        let alive = false;

        particles.forEach((p) => {
            p.y += p.speedY;
            p.x += Math.sin(frame * p.swaySpeed + p.phase) * (p.swayAmp / 40);
            p.angle += p.angleSpeed;

            if (p.y <= height() + 20) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.scale(1, Math.sin(frame * 0.1 + p.phase));
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            }
        });

        if (alive && frame < 900) {
            requestAnimationFrame(tick);
        } else {
            window.removeEventListener("resize", resize);
            canvas.remove();
            confettiRunning = false;
        }
    }

    requestAnimationFrame(tick);
}
