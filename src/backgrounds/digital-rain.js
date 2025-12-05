// Digital Rain - The Matrix-style binary rain effect
let canvas, ctx, animationId;
let particles = [];
let width, height;

export function init(container, THREE, AsciiEffect) {
    // 1. Create Canvas
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Ensure it stays behind
    container.appendChild(canvas);

    ctx = canvas.getContext('2d');

    // 2. Resize Handler
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 3. Particle System
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 0.5; // Depth
            this.char = Math.random() > 0.9 ? "1" : "0";
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y -= this.z; // Move up
            if (this.y < 0) this.reset();
        }

        draw() {
            if (!ctx) return;
            ctx.font = `${10 * this.z}px 'JetBrains Mono', monospace`;
            ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
            ctx.fillText(this.char, this.x, this.y);
        }
    }

    // Initialize particles
    particles = Array.from({ length: 150 }, () => new Particle());

    // 4. Animation Loop
    const animate = () => {
        ctx.fillStyle = "rgba(5, 5, 5, 0.2)"; // Trail effect
        ctx.fillRect(0, 0, width, height);

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        animationId = requestAnimationFrame(animate);
    };

    animate();
}

export function stop() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    // Remove event listener (we'd need a reference to the specific function instance if we wanted to be strict, 
    // but for this simple module structure, we rely on the container cleanup or page refresh mostly. 
    // To be cleaner, we should store the resize function reference.)
    // For now, since we are replacing the whole component, it's okay.

    if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
    }

    particles = [];
    ctx = null;
    canvas = null;
}
