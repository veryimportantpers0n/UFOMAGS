'use client';

import { useEffect, useRef, useState } from 'react';

const BACKGROUNDS = [
  'ufo-fleet',
  'alien-towers',
  'ufo-swarm',
  'alien-artifact',
  'alien-face',
  'abduction-beam',
  'bio-rings',
  'portal-tunnel',
];

export default function HomeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const backgroundRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBackground() {
      if (!containerRef.current) return;

      try {
        // Dynamically import Three.js and AsciiEffect
        const THREE = await import('three');
        const { AsciiEffect } = await import(
          'three/examples/jsm/effects/AsciiEffect.js'
        );

        // Select random background
        const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
        
        // Dynamically import the background module
        let backgroundModule;
        switch (randomBg) {
          case 'ufo-fleet':
            backgroundModule = await import('@/backgrounds/ufo-fleet');
            break;
          case 'alien-towers':
            backgroundModule = await import('@/backgrounds/alien-towers');
            break;
          case 'ufo-swarm':
            backgroundModule = await import('@/backgrounds/ufo-swarm');
            break;
          case 'alien-artifact':
            backgroundModule = await import('@/backgrounds/alien-artifact');
            break;
          case 'alien-face':
            backgroundModule = await import('@/backgrounds/alien-face');
            break;
          case 'abduction-beam':
            backgroundModule = await import('@/backgrounds/abduction-beam');
            break;
          case 'bio-rings':
            backgroundModule = await import('@/backgrounds/bio-rings');
            break;
          case 'portal-tunnel':
            backgroundModule = await import('@/backgrounds/portal-tunnel');
            break;
          default:
            backgroundModule = await import('@/backgrounds/ufo-fleet');
        }

        if (!mounted) return;

        // Initialize the background
        backgroundModule.init(containerRef.current, THREE, AsciiEffect);
        backgroundRef.current = backgroundModule;
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load background:', error);
        setIsLoading(false);
      }
    }

    loadBackground();

    return () => {
      mounted = false;
      if (backgroundRef.current) {
        backgroundRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      {/* Fallback gradient while loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10" />
      )}
      
      {/* Three.js background container */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10"
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      />
    </>
  );
}
