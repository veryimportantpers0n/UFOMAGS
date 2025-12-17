/* 1. The Container: Sets the stage for 3D */
.holo-container {
    perspective: 800px; /* How "deep" the 3D looks */
    width: 80px;        /* Adjust size */
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 2. The Hologram: The spinning element */
.holo-icon {
    width: 100%;
    height: 100%;
    
    /* Color: Cyberpunk Amber (Declassified) or Alien Green */
    color: #00ff88; 
    
    /* Double Animation: Spin + Levitate */
    animation: 
        holoSpin 6s linear infinite, 
        holoFloat 3s ease-in-out infinite alternate;
        
    /* Glow Effect */
    filter: drop-shadow(0 0 8px currentColor);
    opacity: 0.9;
    
    /* Ensures the back of the SVG is visible as it turns */
    transform-style: preserve-3d;
}

/* 3. The Flicker: Adds realism on hover */
.holo-container:hover .holo-icon {
    animation: 
        holoSpin 2s linear infinite, /* Sped up spin on hover */
        holoFlicker 0.2s infinite;   /* Glitch effect */
}

/* --- ANIMATIONS --- */

@keyframes holoSpin {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(360deg); }
}

@keyframes holoFloat {
    from { margin-top: -5px; }
    to   { margin-top: 5px; }
}

@keyframes holoFlicker {
    0%   { opacity: 0.9; }
    50%  { opacity: 0.5; }
    51%  { opacity: 0.9; }
    100% { opacity: 0.8; }
}