# Design System & Visual Guidelines

## Site Name
**OLD UFO MAGS** (working title)

## Color Palette

### Primary Colors
- **Background**: Deep space black (#0a0a0a, #000000)
- **Primary Accent**: Dark hacker green (#00ff41, #00cc33)
- **Secondary Accent**: Muted terminal green (#33ff66, #66ff99)
- **Text Primary**: Light gray/white (#e0e0e0, #ffffff)
- **Text Secondary**: Medium gray (#a0a0a0)

### Background Gradients
- Homepage: Dynamic Three.js animation (alien/UFO themed)
- Magazine pages: Subtle gradient (black to dark navy/purple)
- Accent colors: Deep space blues, purples, dark greens

### UI Elements
- **Navbar**: Pure black (#000000) with green accents
- **Links**: Terminal green with hover effects
- **Buttons**: Dark with green borders/text
- **Cards**: Dark background with subtle borders

## Typography

### Font Families
- **Primary**: Monospace/terminal-style font (e.g., 'Courier New', 'Monaco', 'Consolas')
- **Accent**: Retro pixel font for headings (optional)
- **Body**: Clean sans-serif for readability in magazine reader

### Font Sizes
- H1: 2.5rem - 3rem
- H2: 2rem
- H3: 1.5rem
- Body: 1rem
- Small: 0.875rem

## Visual Effects

### Homepage
- **Typing effect** for main headline/description
- ASCII art logo (SVG) below navbar
- Animated Three.js background (starfield, UFOs)
- Smooth fade-in animations for content

### Magazine Cards
- Hover effects (subtle glow, scale)
- Cover image with metadata overlay
- Green accent borders on hover

### Transitions
- Smooth page transitions
- Fade-in effects for content loading
- Hover states: 200-300ms transitions

## ASCII Art & Retro Elements

### Usage Guidelines
- ASCII art logo on homepage only
- Subtle ASCII borders/dividers (optional)
- Terminal-style text effects
- Retro scan lines (very subtle, optional)
- Green phosphor glow effects (minimal)

### What to Avoid
- Overwhelming CRT effects
- Too many blinking elements
- Excessive animations
- Cluttered ASCII decorations

## Layout Principles

### Grid System
- Clean, organized component structure
- Generous whitespace
- Content-focused design
- Responsive to desktop sizes (mobile in future)

### Navigation
- Fixed/sticky navbar at top
- Simple, clear navigation
- Consistent across all pages

### Content Hierarchy
1. Navigation (always visible)
2. Hero/Title section
3. Main content area
4. Footer (minimal)

## Component Styling

### Navbar
- Black background
- Terminal green text/links
- Simple horizontal layout
- Links: Home | Magazines | About | Socials

### Magazine Cards
- Cover image (prominent)
- Metadata below (title, date)
- Hover state with green accent
- Click to navigate to reader

### Search Bar
- Terminal-style input
- Green cursor/focus state
- Live results dropdown
- Dark background with green accents

### Magazine Reader
- Full-width embed (responsive)
- Metadata section below embed
- "Back to Magazines" button (top-left)
- Clean, distraction-free layout

## Accessibility Notes
- Maintain sufficient contrast ratios
- Readable font sizes
- Clear focus states
- Semantic HTML structure
- Alt text for all images

## Performance Considerations
- Optimize all images
- Lazy load magazine covers
- Minimal animation overhead
- Fast page transitions
- Efficient Three.js rendering
