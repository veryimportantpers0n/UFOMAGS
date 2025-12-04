# OLD UFO MAGS - Vintage UFO Magazine Archive

A 90s-themed static website for hosting and displaying vintage UFO magazines from the 1990s. Built with Next.js and deployed on Cloudflare Pages.

## Project Overview

OLD UFO MAGS is a non-profit digital archive that preserves vintage UFO magazines from the 1990s. The site combines nostalgic 90s aesthetics (ASCII art, terminal vibes, alien themes) with modern web technologies to create a fast, visually appealing archive.

All magazines are hosted on the Internet Archive to ensure copyright compliance and long-term preservation.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (or CSS Modules)
- **3D Graphics**: Three.js (for animated backgrounds)
- **Hosting**: Cloudflare Pages (static export)
- **Package Manager**: npm/yarn/pnpm

## Features

### MVP (Phase 1)
- ✅ Homepage with ASCII art logo and typing effect
- ✅ Live search functionality (searches magazine metadata)
- ✅ Magazine listing page with grid display
- ✅ Individual magazine reader with Internet Archive embed
- ✅ About page with project information
- ✅ Socials page with social media links
- ✅ Responsive navigation bar
- ✅ Dynamic backgrounds (Three.js on homepage, gradient on reader pages)
- ✅ Full SEO implementation (meta tags, JSON-LD, Open Graph)
- ✅ JSON-based magazine data management

### Future Enhancements
See `.kiro/steering/future-updates.md` for planned features.

## Project Structure

```
/
├── public/
│   ├── covers/              # Magazine cover images
│   ├── backgrounds/         # Background assets
│   └── assets/              # Other static assets
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx         # Homepage
│   │   ├── magazines/       # Magazine listing page
│   │   ├── magazine/[slug]/ # Individual magazine reader
│   │   ├── about/           # About page
│   │   └── socials/         # Socials page
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── Background.tsx   # Background wrapper
│   │   ├── MagazineCard.tsx # Magazine listing card
│   │   ├── MagazineReader.tsx # Internet Archive embed
│   │   ├── SearchBar.tsx    # Live search component
│   │   └── ASCIILogo.tsx    # ASCII art logo (SVG)
│   ├── data/
│   │   └── magazines.json   # Magazine metadata
│   └── lib/
│       └── utils.ts         # Utility functions
├── .kiro/
│   └── steering/            # Project documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/veryimportantpers0n/UFOMAGS.git
cd old-ufo-mags

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

### Adding New Magazines

Follow these steps to add a new magazine to the archive:

#### Step 1: Prepare the Magazine Cover Image

1. Obtain a high-quality image of the magazine cover
2. Optimize the image for web:
   - Recommended format: JPG or PNG
   - Recommended size: 800-1200px width
   - Compress to reduce file size while maintaining quality
3. Name the file using the magazine date format (e.g., `nov-dec-1997.jpg`)
4. Save the image to `/public/covers/`

#### Step 2: Upload Magazine to Internet Archive

1. Visit [archive.org](https://archive.org) and create an account if needed
2. Upload the magazine PDF using the "Upload" button
3. Fill in metadata:
   - Title: Include magazine name and date
   - Description: Brief description of contents
   - Subject tags: "UFO", "magazines", "1990s", etc.
   - License: Choose appropriate license
4. After upload, note the Internet Archive identifier from the URL
   - Example: `https://archive.org/details/36-37_20251202`
   - The identifier is: `36-37_20251202`

#### Step 3: Update magazines.json

1. Open `/src/data/magazines.json`
2. Add a new entry to the `magazines` array:

```json
{
  "id": "unique-identifier",
  "slug": "url-friendly-slug",
  "coverName": "Magazine Title from Cover",
  "date": "Mon/Year or Mon/Mon Year",
  "description": "Brief description of this issue's content and highlights",
  "customText": "Additional context, historical notes, or interesting facts about this issue",
  "coverImage": "/covers/filename.jpg",
  "archiveUrl": "https://archive.org/details/identifier"
}
```

**Field Guidelines:**
- `id`: Unique identifier, typically matches slug (e.g., "nov-dec-1997")
- `slug`: URL-friendly version of the date (lowercase, hyphens, no spaces)
  - Examples: "nov-dec-1997", "jan-1998", "summer-1999"
- `coverName`: Exact title text from the magazine cover
- `date`: Publication date as shown on cover (e.g., "Nov/Dec 1997", "January 1998")
- `description`: 1-2 sentences about the issue's main content
- `customText`: Optional additional context or notes
- `coverImage`: Path to cover image in `/public/covers/` (must start with `/covers/`)
- `archiveUrl`: Full Internet Archive detail page URL

#### Step 4: Rebuild and Deploy

```bash
# Test locally first
npm run dev

# Verify the new magazine appears in:
# - Search results (try searching for the title)
# - Magazine listing page (/magazines)
# - Individual magazine page (/magazine/[slug])

# Build for production
npm run build

# Deploy to Cloudflare Pages (see Deployment section)
```

#### Example Complete Entry

```json
{
  "id": "nov-dec-1997",
  "slug": "nov-dec-1997",
  "coverName": "UFO Magazine",
  "date": "Nov/Dec 1997",
  "description": "Features articles on the Phoenix Lights incident, government disclosure, and interviews with leading researchers.",
  "customText": "This issue includes a special report on the mass UFO sighting over Arizona in March 1997.",
  "coverImage": "/covers/nov-dec-1997.jpg",
  "archiveUrl": "https://archive.org/details/36-37_20251202"
}
```

## Background Customization

The site features dynamic backgrounds that enhance the retro UFO theme.

### Available Backgrounds

The project includes 8 custom ASCII art Three.js backgrounds located in `/public/backgrounds/`:

1. **ufo-fleet.js** (RECOMMENDED DEFAULT) - Classic flying saucers over wireframe grid
2. **alien-towers.js** - Rotating tower structures
3. **ufo-swarm.js** - 40 UFOs in formation
4. **alien-artifact.js** - Mysterious floating object with debris
5. **alien-face.js** - Classic grey alien head
6. **abduction-beam.js** - UFO with tractor beam
7. **bio-rings.js** - Pulsing organic rings
8. **portal-tunnel.js** - Twisting geometric tunnel

### How Backgrounds Work

- **Homepage**: Randomly selects one of the 8 backgrounds on each page load
- **Other Pages**: Uses a static gradient background for readability
- All backgrounds use Three.js with ASCII effect for retro terminal aesthetic
- Terminal green (#0f0) on black background
- Optimized for 60fps performance

### Changing the Default Background

To use a specific background instead of random selection:

1. Open `/src/components/HomeBackground.tsx`
2. Find the background selection logic
3. Replace the random selection with your preferred background:

```typescript
// Instead of random selection:
const backgrounds = ['ufo-fleet', 'alien-towers', ...];
const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

// Use a specific background:
const selectedBg = 'ufo-fleet'; // or any other background name
```

### Adding New Backgrounds

To create a new Three.js ASCII background:

1. Create a new file in `/public/backgrounds/` (e.g., `my-background.js`)
2. Follow the structure of existing backgrounds:

```javascript
export function init(container, THREE, AsciiEffect) {
  // Set up scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  // Create ASCII effect renderer
  const renderer = new THREE.WebGLRenderer();
  const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(effect.domElement);
  
  // Add your 3D objects and animations
  // ...
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Update animations
    effect.render(scene, camera);
  }
  animate();
  
  // Return cleanup function
  return () => {
    // Clean up resources
  };
}

export function stop() {
  // Additional cleanup if needed
}
```

3. Add the new background to the list in `HomeBackground.tsx`
4. Test locally before deploying

### Background Technical Details

- All backgrounds use Three.js + AsciiEffect for terminal-style rendering
- Each exports `init(container, THREE, AsciiEffect)` and `stop()` functions
- Proper memory cleanup on component unmount
- Responsive to window resize events
- Fallback gradient displays while loading

For more details, see `/public/backgrounds/README.md`

## Design System

### Color Palette
- **Background**: Deep space black (#0a0a0a)
- **Primary Accent**: Dark hacker green (#00ff41)
- **Text**: Light gray/white (#e0e0e0)

### Typography
- Monospace/terminal fonts for retro feel
- Clean sans-serif for readability

### Visual Style
- 90s retro aesthetic with modern execution
- ASCII art elements
- Terminal/hacker vibes (subtle)
- Alien/UFO themed
- No overwhelming effects

## Deployment

### Cloudflare Pages Deployment

The site is configured for static export and optimized for Cloudflare Pages hosting.

#### Initial Setup

1. **Prepare Your Repository**
   - Ensure all changes are committed to your Git repository
   - Push to GitHub, GitLab, or Bitbucket

2. **Connect to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Workers & Pages" → "Pages"
   - Click "Create a project" → "Connect to Git"
   - Select your repository and authorize access

3. **Configure Build Settings**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: / (leave empty if project is at root)
   ```

4. **Environment Variables** (if needed)
   - Node version: Add `NODE_VERSION` = `18` or higher
   - No other environment variables required for basic setup

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete (typically 2-5 minutes)
   - Your site will be available at `https://[project-name].pages.dev`

#### Deployment Configuration

The project includes the following configuration for static export:

**next.config.ts:**
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with static hosts
};
```

**Build Commands:**
```bash
# Development
npm run dev          # Starts dev server at http://localhost:3000

# Production Build
npm run build        # Builds and exports static site to /out directory

# Preview Production Build Locally
npx serve out        # Serves the static export locally
```

#### Automatic Deployments

Cloudflare Pages automatically deploys when you push to your repository:

- **Production Branch** (usually `main` or `master`): Deploys to your main domain
- **Preview Branches**: Each branch gets a unique preview URL
- **Pull Requests**: Automatic preview deployments for PRs

#### Custom Domain Setup

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to "Custom domains"
3. Click "Set up a custom domain"
4. Follow the instructions to add your domain
5. Cloudflare will automatically provision SSL certificate

#### Deployment Checklist

Before deploying, verify:

- [ ] All magazine entries in `magazines.json` are valid
- [ ] All cover images exist in `/public/covers/`
- [ ] Build completes successfully locally (`npm run build`)
- [ ] Static export generates correctly (check `/out` directory)
- [ ] No console errors in production build
- [ ] All pages are accessible in the static export
- [ ] SEO metadata is present on all pages
- [ ] Images load correctly
- [ ] Three.js backgrounds work (or fallback displays)

**Quick Verification Commands:**

```bash
# Verify build works
npm run build

# Check output directory exists
ls -la out/

# Verify magazine pages were generated
ls -la out/magazine/

# Test static export locally
npx serve out
# Then visit http://localhost:3000

# Check for errors
npm run build 2>&1 | grep -i error
```

#### Troubleshooting Deployment Issues

**Build Fails:**
- Check Node.js version (must be 18+)
- Verify all dependencies are in `package.json`
- Review build logs in Cloudflare dashboard

**Images Not Loading:**
- Ensure images are in `/public` directory
- Check image paths start with `/` (e.g., `/covers/image.jpg`)
- Verify `images.unoptimized: true` in `next.config.ts`

**Pages Return 404:**
- Confirm `output: 'export'` is set in `next.config.ts`
- Check that `trailingSlash: true` is enabled
- Verify all dynamic routes use `generateStaticParams()`

**Three.js Backgrounds Not Working:**
- Check browser console for errors
- Verify Three.js scripts are in `/public/backgrounds/`
- Ensure fallback gradient displays if Three.js fails

#### Redeploying After Updates

```bash
# 1. Make your changes (add magazines, update content, etc.)
git add .
git commit -m "Add new magazine issue"
git push origin main

# 2. Cloudflare Pages automatically detects the push and rebuilds
# 3. Check deployment status in Cloudflare dashboard
# 4. Verify changes at your site URL
```

#### Performance Optimization

The site is optimized for Cloudflare's CDN:
- Static HTML/CSS/JS files
- Automatic caching
- Global CDN distribution
- Fast page loads worldwide

**Expected Performance:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

## SEO

The site includes comprehensive SEO implementation:
- Unique meta tags for each page
- JSON-LD structured data
- Open Graph tags
- Twitter Card tags
- Sitemap generation
- Semantic HTML structure

## Contributing

This is a personal archive project. If you have vintage UFO magazines to contribute or suggestions, please reach out via our social channels.

## License

This project is for educational and archival purposes. All magazine content is hosted on the Internet Archive. See the About page for copyright information.

## Acknowledgments

- Internet Archive for hosting the magazine files
- The original publishers and creators of these magazines
- The UFO research community

---

**Project Status**: MVP Development Phase
**Last Updated**: December 2024
