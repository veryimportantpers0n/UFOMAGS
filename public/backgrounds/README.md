# UFO Magazine Site - Background Effects

This folder contains ASCII art Three.js background animations for the OLD UFO MAGS website.

## Available Backgrounds

### 1. **alien-towers.js**
Two rotating tower structures made of stacked cubes. Towers rotate in opposite directions and bob up and down.
- **Vibe**: Mysterious alien architecture
- **Speed**: Medium
- **ASCII Characters**: ` [|]`

### 2. **ufo-swarm.js**
40 UFOs scattered throughout 3D space, flying toward the viewer in a swarm formation.
- **Vibe**: Invasion fleet
- **Speed**: Fast
- **ASCII Characters**: ` 01` (binary code)

### 3. **alien-artifact.js**
Large icosahedron in the center with floating debris ring orbiting around it. The artifact pulses and rotates.
- **Vibe**: Ancient alien technology
- **Speed**: Medium
- **ASCII Characters**: ` .-|/=\<+>@`

### 4. **alien-face.js**
Classic grey alien head that breathes and looks around slightly.
- **Vibe**: Close encounter
- **Speed**: Slow
- **ASCII Characters**: ` .:-+*=%@#`

### 5. **ufo-fleet.js** (Recommended Default)
15 flying saucers hovering over a wireframe grid landscape. UFOs bob and rotate.
- **Vibe**: Classic 90s UFO scene
- **Speed**: Medium
- **ASCII Characters**: ` .-+*=%@#X0`

### 6. **abduction-beam.js**
UFO at top with tractor beam pulling particles upward in a cone shape.
- **Vibe**: Alien abduction
- **Speed**: Medium
- **ASCII Characters**: ` .|lI` (vertical bars)

### 7. **bio-rings.js**
Pulsing organic rings moving slowly toward the viewer with breathing motion.
- **Vibe**: Organic/biological
- **Speed**: Very slow
- **ASCII Characters**: ` .:coCO8@`

### 8. **portal-tunnel.js**
Twisting geometric tunnel with square gates rotating as they approach.
- **Vibe**: Wormhole/portal
- **Speed**: Medium
- **ASCII Characters**: ` .-=+^`

## Usage

Each background exports two functions:

```javascript
// Initialize the background
export function init(container, THREE, AsciiEffect) {
    // Setup and start animation
}

// Clean up resources
export function stop() {
    // Stop animation and dispose resources
}
```

### Integration Example

```javascript
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import * as background from './backgrounds/ufo-fleet.js';

const container = document.getElementById('background-container');
background.init(container, THREE, AsciiEffect);

// Later, when switching backgrounds or unmounting:
background.stop();
```

## Technical Notes

- All backgrounds use **Three.js** for 3D rendering
- **AsciiEffect** converts 3D scenes to ASCII art
- Color: Terminal green (`#0f0` / `#00ff00`)
- Background: Black
- All backgrounds handle window resize events
- Memory cleanup via `stop()` function prevents leaks

## Customization

To adjust speed or behavior, edit the animation constants in each file:
- Look for `speed` variables in the `animate()` function
- Modify rotation speeds (usually `* 0.001` to `* 0.1` range)
- Change ASCII character sets in the `AsciiEffect` initialization

## Recommended for Homepage

**ufo-fleet.js** - Best balance of visual interest and performance. Classic UFO aesthetic that matches the site theme perfectly.

## Performance

All backgrounds are optimized for 60fps on modern desktop browsers. The ASCII effect naturally limits rendering complexity.
