# Background Generation Prompts

This document contains prompts to give to AI tools for generating the animated backgrounds.

## Homepage Background (Three.js/JavaScript)

### ✅ BACKGROUNDS READY!

8 custom ASCII art Three.js backgrounds have been created and are located in `/public/backgrounds/`:

1. **ufo-fleet.js** (RECOMMENDED DEFAULT) - Classic flying saucers over wireframe grid
2. **alien-towers.js** - Rotating tower structures
3. **ufo-swarm.js** - 40 UFOs in formation
4. **alien-artifact.js** - Mysterious floating object with debris
5. **alien-face.js** - Classic grey alien head
6. **abduction-beam.js** - UFO with tractor beam
7. **bio-rings.js** - Pulsing organic rings
8. **portal-tunnel.js** - Twisting geometric tunnel

### Technical Details
- All backgrounds use Three.js + AsciiEffect
- Terminal green color (#0f0) on black background
- Each exports `init(container, THREE, AsciiEffect)` and `stop()` functions
- Optimized for 60fps performance
- Proper memory cleanup on unmount

### Integration Notes
- Background component should be placed in `/src/components/HomeBackground.tsx`
- Component receives THREE and AsciiEffect as props (loaded once at app level)
- Component should handle mounting/unmounting properly
- Should include loading state and fallback
- See `/public/backgrounds/README.md` for full documentation

## Magazine Reader Background

### Requirements
- Static or very subtle animation
- Non-distracting
- Theme-appropriate colors
- Ensures content readability

### Implementation
Simple CSS gradient or solid color with theme colors:
- Deep space navy/black
- Subtle purple or green tints
- Possible very slow gradient shift (optional)

No AI generation needed - can be implemented with CSS.

## Fallback Background

Until AI-generated background is ready, use:
- Simple CSS gradient (black to dark blue)
- Optional: CSS-only twinkling stars
- Minimal performance impact

## Testing Checklist
- [ ] Background covers full viewport on all screen sizes
- [ ] No performance issues (check FPS)
- [ ] Content remains readable
- [ ] Proper cleanup on component unmount
- [ ] Works in static export build
- [ ] No console errors
- [ ] Graceful fallback if Three.js fails to load
