"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { init } from '@/backgrounds/abduction-beam-about';

export default function AbductionBeam() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationInstance: { stop: () => void } | undefined;

        if (containerRef.current) {
            // init now returns an object with a stop() method
            animationInstance = init(containerRef.current, THREE, AsciiEffect);
        }

        return () => {
            if (animationInstance) {
                animationInstance.stop();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[300px] overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,15,20,0.7)] backdrop-blur-md"
        />
    );
}
