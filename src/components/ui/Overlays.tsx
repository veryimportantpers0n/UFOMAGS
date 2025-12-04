"use client";

import { useEffect, useRef } from "react";

export function Scanlines() {
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]" />
    );
}

export function Noise() {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-[998]"
            style={{
                backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
            }}
        />
    );
}


