# UFO Magazine Archive - Project Overview

## Project Vision
A 90s-themed static website to host and display vintage UFO magazines from the 1990s. The site combines nostalgic aesthetics (ASCII art, terminal vibes, alien themes) with modern web technologies to create a fast, visually appealing archive.

## Technical Stack
- **Framework**: Next.js (static export)
- **Hosting**: Cloudflare Pages (free tier, static only)
- **Backgrounds**: Three.js/JavaScript animated backgrounds (AI-generated)
- **Magazine Hosting**: Internet Archive embeds (copyright-safe)

## Core Principles
- Static site generation (no backend, no authentication)
- Component-based architecture (clean, organized directory structure)
- Performance-first (fast loading, optimized assets)
- Desktop-focused initially (mobile responsive in future updates)
- Phased development (MVP first, then enhancements)

## MVP Scope (Phase 1)
### In Scope
- Home page with site explanation and ASCII art logo (SVG, displayed only on homepage)
- Magazine listing with metadata (cover name, date, description, custom text)
- Individual magazine reader pages with Internet Archive embed
- Live search functionality (searches as you type, searches metadata fields)
- Simple black navbar (Home, Magazines, About, Socials)
- About page explaining the project
- Socials page with links to Twitter/X, YouTube, Discord
- Dynamic background system:
  - Homepage: AI-generated animated Three.js background (alien-themed)
  - Magazine pages: Static gradient/fade background (non-distracting)
- 3D page flip effect for magazine reader
- Page navigation component (jump to specific pages)
- "Back to Magazines" button on reader pages
- JSON-based magazine data management
- Magazine cover images stored locally in `/public/covers/` folder
- URL-friendly slugs based on magazine dates (e.g., `/magazine/nov-dec-1997`)
- Full SEO implementation (JSON-LD structured data, meta tags, Open Graph)

### Out of Scope (Future Updates)
- Analytics tracking
- Mobile responsive design
- Advanced search (full-text content search)
- Complex visual effects/distractions
- User accounts/authentication
- Comments or social features
- Advanced filtering/sorting

## Design Aesthetic
- 90s retro with modern touches
- Alien/UFO themed
- ASCII art elements
- Terminal/hacker vibes (subtle, not overwhelming)
- Full-browser dynamic backgrounds
- Clean, uncluttered interface
- No distracting effects
