"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width: number, height: number;
        let animationFrameId: number;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        class Particle {
            x: number;
            y: number;
            z: number;
            char: string;
            opacity: number;

            constructor() {
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.char = "";
                this.opacity = 0;
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

        const particles = Array.from({ length: 150 }, () => new Particle());

        const animate = () => {
            ctx.fillStyle = "rgba(5, 5, 5, 0.2)"; // Trail effect
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none"
        />
    );
}
