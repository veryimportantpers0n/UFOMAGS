# Technical Implementation Details

## Project Structure
```
/
├── public/
│   ├── covers/              # Magazine cover images (locally stored)
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
└── README.md                # Background generation prompts
```

## Magazine Data Structure (JSON)
```json
{
  "magazines": [
    {
      "id": "nov-dec-1997",
      "slug": "nov-dec-1997",
      "coverName": "UFO Magazine",
      "date": "Nov/Dec 1997",
      "description": "Description of this issue",
      "customText": "Additional context or notes",
      "coverImage": "/covers/nov-dec-1997.jpg",
      "archiveUrl": "https://archive.org/details/36-37_20251202"
    }
  ]
}
```

## URL Structure
- Homepage: `/` (with search functionality)
- Magazine listing: `/magazines` (displays all magazines from JSON)
- Individual magazine: `/magazine/[slug]` (e.g., `/magazine/nov-dec-1997`)
- About: `/about`
- Socials: `/socials`

## Background System
### Homepage Background
- AI-generated Three.js animation (alien/UFO themed)
- Full viewport coverage
- Responsive to all screen sizes
- Placeholder: Simple starfield or gradient until AI background is ready
- Implementation: Separate component that can be swapped out

### Magazine Reader Background
- Static gradient or subtle fade
- Non-distracting, theme-appropriate colors
- Ensures readability of content
- No animations or movement

## SEO Implementation
### Required Meta Tags (All Pages)
- Title tags (unique per page)
- Meta descriptions
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Canonical URLs

### JSON-LD Structured Data
- Homepage: WebSite schema
- Magazine pages: Article or CreativeWork schema
- About page: AboutPage schema
- Organization schema for the project

### Additional SEO Features
- Semantic HTML structure
- Alt text for all images
- Proper heading hierarchy (h1, h2, h3)
- Descriptive link text
- Sitemap.xml generation (via Next.js)
- Robots.txt

## Search Functionality
- Live search (results update as user types)
- Located on homepage
- Searches across: coverName, date, description, customText
- Case-insensitive matching
- Displays matching magazines with covers in dropdown/results area
- Shows "NO RESULTS" message when no matches found
- Click on result navigates to magazine reader page
- Debounced input (300ms) for performance

## Navigation
### Navbar (All Pages)
- Black background with themed styling
- Links: Home | Magazines | About | Socials
- Fixed or sticky positioning (TBD)
- Simple, clean design

### ASCII Logo
- SVG format (provided by user, placeholder for testing)
- Displayed only on homepage
- Positioned below navbar
- Not clickable (Home button in navbar serves this purpose)

## Static Export Configuration
- Next.js configured for static export (`output: 'export'`)
- All pages pre-rendered at build time
- No server-side rendering or API routes
- Compatible with Cloudflare Pages deployment
- Optimized images using Next.js Image component with static export

## Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse score: > 90
- Minimal JavaScript bundle size
- Lazy loading for magazine covers
- Code splitting by route
