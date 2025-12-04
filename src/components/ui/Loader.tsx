"use client";

import { useEffect, useState } from "react";

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 5) + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setVisible(false), 500);
                    return 100;
                }
                return next;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black z-[10000] flex flex-col justify-center items-center transition-opacity duration-500 ${progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="mono text-[var(--neon-green)] mb-5">
                ESTABLISHING UPLINK...
            </div>
            <div className="w-[200px] h-[2px] bg-[#222] relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-[var(--neon-green)] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mono text-[var(--neon-green)] mt-5">{progress}%</div>
        </div>
    );
}
