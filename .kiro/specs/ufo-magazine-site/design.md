# Design Document

## Overview

OLD UFO MAGS is a static website built with Next.js that serves as a digital archive for vintage UFO magazines from the 1990s. The application uses the Next.js App Router with static export to generate a fully pre-rendered site deployable to Cloudflare Pages. The design emphasizes a nostalgic 90s aesthetic (ASCII art, terminal green colors, monospace fonts) while maintaining modern web performance standards.

The system consists of five main pages (Home, Magazines, Magazine Reader, About, Socials) with a shared navigation component. Magazine data is managed through a JSON file, making it easy to add new content without code changes. The homepage features live search functionality and an animated Three.js background, while magazine reader pages use static gradients to avoid distraction.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Pages CDN                      │
│                   (Static File Hosting)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Static HTML/CSS/JS Files                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Homepage   │  │  Magazines   │  │    About     │     │
│  │   (index)    │  │    Page      │  │    Page      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Socials    │  │   Magazine   │                        │
│  │    Page      │  │  Reader [n]  │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Internet Archive API                        │
│              (BookReader Embed iframes)                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js (for homepage background)
- **Build Output**: Static HTML/CSS/JS (via `output: 'export'`)
- **Deployment**: Cloudflare Pages
- **Data Storage**: JSON file (`magazines.json`)

### Static Generation Strategy

All pages are generated at build time using Next.js static export:
- Homepage: Single static page
- Magazines listing: Single static page
- Magazine readers: Dynamic routes with `generateStaticParams()` to pre-render all magazine pages
- About/Socials: Single static pages each

No server-side rendering or API routes are used, ensuring compatibility with static hosting.

## Components and Interfaces

### Core Components

#### 1. Navbar Component
**Purpose**: Provides consistent navigation across all pages

**Props**:
```typescript
interface NavbarProps {
  currentPath?: string; // Optional for active link highlighting
}
```

**Behavior**:
- Renders navigation links: Home, Magazines, About, Socials
- Applies black background with terminal green text
- Sticky or fixed positioning at top of viewport
- Highlights active page link

#### 2. Background Component
**Purpose**: Manages different backgrounds for different page types

**Props**:
```typescript
interface BackgroundProps {
  type: 'home' | 'static';
  children: React.ReactNode;
}
```

**Behavior**:
- When `type='home'`: Renders Three.js animated background
- When `type='static'`: Renders CSS gradient background
- Provides fallback if Three.js fails to load
- Ensures full viewport coverage and responsiveness

#### 3. HomeBackground Component
**Purpose**: Renders Three.js animated background for homepage

**Props**: None

**Behavior**:
- Initializes Three.js scene on mount
- Creates starfield with occasional UFO animations
- Handles window resize events
- Cleans up Three.js resources on unmount
- Provides loading state and fallback

#### 4. ASCIILogo Component
**Purpose**: Displays ASCII art logo on homepage

**Props**:
```typescript
interface ASCIILogoProps {
  className?: string;
}
```

**Behavior**:
- Renders SVG-based ASCII art
- Only displayed on homepage
- Positioned below navbar
- Responsive sizing

#### 5. TypingEffect Component
**Purpose**: Animates text with typing effect

**Props**:
```typescript
interface TypingEffectProps {
  text: string;
  speed?: number; // Characters per second
  className?: string;
}
```

**Behavior**:
- Displays text character by character
- Configurable typing speed
- Completes animation on mount

#### 6. SearchBar Component
**Purpose**: Provides live search functionality

**Props**:
```typescript
interface SearchBarProps {
  magazines: Magazine[];
  onResultClick: (slug: string) => void;
}
```

**Behavior**:
- Accepts user input with debouncing (300ms)
- Filters magazines based on coverName, date, description, customText
- Displays results dropdown with covers and metadata
- Shows "NO RESULTS" when no matches found
- Navigates to magazine reader on result click

#### 7. MagazineCard Component
**Purpose**: Displays magazine preview in grid layouts

**Props**:
```typescript
interface MagazineCardProps {
  magazine: Magazine;
  onClick: () => void;
}
```

**Behavior**:
- Displays cover image
- Shows coverName and date
- Applies hover effect with green accent
- Handles click to navigate

#### 8. MagazineReader Component
**Purpose**: Embeds Internet Archive BookReader

**Props**:
```typescript
interface MagazineReaderProps {
  archiveUrl: string;
  title: string;
}
```

**Behavior**:
- Embeds Internet Archive BookReader iframe
- Full-width, responsive sizing
- Handles loading states
- Provides error fallback if embed fails

#### 9. MagazineMetadata Component
**Purpose**: Displays magazine information

**Props**:
```typescript
interface MagazineMetadataProps {
  magazine: Magazine;
}
```

**Behavior**:
- Displays coverName, date, description, customText
- Formatted layout with proper spacing
- Semantic HTML structure

#### 10. SocialLink Component
**Purpose**: Renders individual social media link

**Props**:
```typescript
interface SocialLinkProps {
  platform: 'twitter' | 'youtube' | 'discord';
  url: string;
  description: string;
}
```

**Behavior**:
- Displays platform icon and name
- Shows description text
- Opens link in new tab
- Applies hover effects

### Page Components

#### Homepage (`/`)
- Navbar
- ASCIILogo
- TypingEffect (headline)
- Description text
- SearchBar
- HomeBackground

#### Magazines Page (`/magazines`)
- Navbar
- Page title and description
- Grid of MagazineCard components
- Static background

#### Magazine Reader Page (`/magazine/[slug]`)
- Navbar
- "Back to Magazines" button
- MagazineReader (Internet Archive embed)
- MagazineMetadata
- Static background

#### About Page (`/about`)
- Navbar
- Mission statement
- Copyright information
- Static background

#### Socials Page (`/socials`)
- Navbar
- Page title
- List of SocialLink components
- Static background

## Data Models

### Magazine Interface

```typescript
interface Magazine {
  id: string;              // Unique identifier
  slug: string;            // URL-friendly identifier (e.g., "nov-dec-1997")
  coverName: string;       // Title text from magazine cover
  date: string;            // Publication date (e.g., "Nov/Dec 1997")
  description: string;     // Brief description of issue content
  customText: string;      // Additional notes or context
  coverImage: string;      // Path to local cover image (e.g., "/covers/nov-dec-1997.jpg")
  archiveUrl: string;      // Internet Archive detail page URL
}
```

### Magazine Data File Structure

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

### SEO Metadata Interface

```typescript
interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}
```

### JSON-LD Schema Types

**WebSite Schema (Homepage)**:
```typescript
interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}
```

**CreativeWork Schema (Magazine Pages)**:
```typescript
interface CreativeWorkSchema {
  '@context': 'https://schema.org';
  '@type': 'CreativeWork';
  name: string;
  datePublished: string;
  description: string;
  url: string;
  image: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Static page generation completeness
*For any* magazine in the magazines.json file, the build process should generate a corresponding static HTML page at `/magazine/[slug]`
**Validates: Requirements 1.1**

### Property 2: Magazine data completeness
*For any* magazine entry in magazines.json, all required fields (id, slug, coverName, date, description, customText, coverImage, archiveUrl) should be present and non-empty
**Validates: Requirements 2.2, 2.5**

### Property 3: Slug generation consistency
*For any* magazine date string, the generated slug should be URL-friendly (lowercase, hyphens instead of spaces, no special characters)
**Validates: Requirements 2.3**

### Property 4: Search result accuracy
*For any* search query string, all returned magazine results should contain the query string (case-insensitive) in at least one of the following fields: coverName, date, description, or customText
**Validates: Requirements 3.5, 4.1, 4.2**

### Property 5: Search results display completeness
*For any* search result displayed, it should include both the magazine cover image and metadata (coverName and date)
**Validates: Requirements 3.6, 4.4**

### Property 6: Search result navigation
*For any* search result clicked, the system should navigate to the URL `/magazine/[slug]` where slug matches that magazine's slug field
**Validates: Requirements 3.8, 4.5**

### Property 7: Search debouncing behavior
*For any* sequence of rapid keystrokes in the search input (within 300ms), only the final keystroke should trigger a search operation
**Validates: Requirements 4.3**

### Property 8: Navigation consistency
*For any* page in the application, the navigation bar should be present and contain links to Home, Magazines, About, and Socials
**Validates: Requirements 5.1, 5.3**

### Property 9: Navigation link functionality
*For any* navigation link clicked, the system should navigate to the corresponding page (Home → /, Magazines → /magazines, About → /about, Socials → /socials)
**Validates: Requirements 5.4**

### Property 10: Magazine listing completeness
*For any* magazine in the JSON data file, it should appear as a card on the magazines listing page
**Validates: Requirements 6.1**

### Property 11: Magazine card structure
*For any* magazine card displayed, it should contain both a cover image and metadata (coverName and date)
**Validates: Requirements 6.2**

### Property 12: Magazine card navigation
*For any* magazine card clicked, the system should navigate to the URL `/magazine/[slug]` where slug matches that magazine's slug field
**Validates: Requirements 6.5**

### Property 13: Magazine reader embed presence
*For any* magazine reader page, it should display an Internet Archive BookReader embed with the correct archiveUrl
**Validates: Requirements 7.1**

### Property 14: Magazine reader back button presence
*For any* magazine reader page, it should display a "Back to Magazines" button that navigates to the magazines listing page
**Validates: Requirements 7.3, 7.4**

### Property 15: Magazine reader metadata display
*For any* magazine reader page, it should display all metadata fields (coverName, date, description, customText) below the embed
**Validates: Requirements 7.5, 7.6**

### Property 16: Social link structure
*For any* social link displayed on the socials page, it should include a platform icon, name, and description
**Validates: Requirements 9.2, 9.3**

### Property 17: Social link behavior
*For any* social link clicked, it should open in a new tab (target="_blank")
**Validates: Requirements 9.5**

### Property 18: Background type consistency
*For any* page, if it is the homepage then it should use the animated Three.js background, otherwise it should use the static gradient background
**Validates: Requirements 10.3**

### Property 19: SEO metadata presence
*For any* page in the application, the rendered HTML should include unique title tags, meta descriptions, Open Graph tags (og:title, og:description, og:image, og:url), Twitter Card tags, and canonical URLs
**Validates: Requirements 11.1, 11.2, 11.3, 11.4**

### Property 20: Magazine page structured data
*For any* magazine reader page, the rendered HTML should include JSON-LD structured data with Article or CreativeWork schema
**Validates: Requirements 11.6**

### Property 21: Semantic heading hierarchy
*For any* page in the application, heading tags should follow proper hierarchy (h1 → h2 → h3, no skipping levels)
**Validates: Requirements 11.8**

### Property 22: Image lazy loading
*For any* magazine cover image displayed in a list or grid, it should only load when it enters or is near the viewport
**Validates: Requirements 12.3**

### Property 23: Cover image path validity
*For any* magazine entry, the coverImage field should reference a path starting with "/covers/"
**Validates: Requirements 14.2**

### Property 24: Cover image alt text
*For any* cover image displayed, it should have non-empty alt text for accessibility
**Validates: Requirements 14.4**

## Error Handling

### Build-Time Errors

**Missing Magazine Data**:
- Validate magazines.json exists and is valid JSON
- Check all required fields are present for each magazine
- Fail build with descriptive error if validation fails

**Invalid Slugs**:
- Validate slugs are URL-friendly
- Check for duplicate slugs
- Fail build if duplicates found

**Missing Cover Images**:
- Validate cover image files exist in `/public/covers/`
- Warn if referenced images are missing
- Provide fallback placeholder image

### Runtime Errors

**Three.js Loading Failure**:
- Catch Three.js initialization errors
- Display fallback gradient background
- Log error to console for debugging

**Internet Archive Embed Failure**:
- Detect iframe loading errors
- Display error message with link to Internet Archive
- Provide "Try Again" button

**Search Performance**:
- Limit search results to reasonable number (e.g., 20)
- Handle empty search gracefully
- Prevent search on very short queries (< 2 characters)

**Image Loading Failure**:
- Use Next.js Image component error handling
- Display placeholder image on error
- Include alt text for accessibility

### User-Facing Error Messages

**No Search Results**:
```
NO RESULTS
Try different keywords or browse all magazines
```

**Embed Loading Error**:
```
Unable to load magazine viewer
[View on Internet Archive] button
```

**Page Not Found (404)**:
```
Lost in Space?
This page doesn't exist. Maybe it was abducted?
[Return to Homepage] button
```

## Testing Strategy

### Unit Testing

**Component Tests**:
- SearchBar: Test filtering logic, debouncing, result display
- MagazineCard: Test rendering, hover states, click handling
- TypingEffect: Test animation completion, text display
- Navbar: Test link rendering, active state highlighting

**Utility Function Tests**:
- Slug generation: Test various date formats produce valid slugs
- Search filtering: Test case-insensitive matching across fields
- Data validation: Test magazine entry validation logic

**Integration Tests**:
- Page rendering: Test each page renders without errors
- Navigation: Test links navigate to correct pages
- Search flow: Test search input → results → navigation

### Property-Based Testing

The application will use **fast-check** (JavaScript/TypeScript property-based testing library) for property-based tests. Each property-based test should run a minimum of 100 iterations.

**Property Test Implementation Requirements**:
- Each property-based test must be tagged with a comment referencing the design document property
- Tag format: `// Feature: ufo-magazine-site, Property {number}: {property_text}`
- Each correctness property must be implemented by a single property-based test
- Tests should be placed as close to implementation as possible

**Property Tests to Implement**:

1. **Static Generation Test** (Property 1):
   - Generate random magazine entries
   - Verify build creates corresponding static pages
   - Check page URLs match slug format

2. **Search Accuracy Test** (Property 2):
   - Generate random magazine data and search queries
   - Verify all results contain query string in searchable fields
   - Test case-insensitive matching

3. **Navigation Consistency Test** (Property 3):
   - Generate random page paths
   - Verify navbar is present on all pages
   - Check all required links exist

4. **Data Completeness Test** (Property 4):
   - Generate random magazine entries
   - Verify all required fields are present and non-empty
   - Test validation rejects incomplete entries

5. **SEO Metadata Test** (Property 5):
   - Generate random page content
   - Verify all required meta tags are present
   - Check tag values are non-empty and valid

6. **Background Type Test** (Property 6):
   - Test homepage uses animated background
   - Test other pages use static background
   - Verify background component receives correct type prop

7. **Debouncing Test** (Property 7):
   - Generate rapid keystroke sequences
   - Verify only final keystroke triggers search
   - Test timing is within 300ms threshold

8. **Card Navigation Test** (Property 8):
   - Generate random magazine data
   - Simulate card clicks
   - Verify navigation URLs match expected format

9. **Slug Generation Test** (Property 9):
   - Generate random date strings
   - Verify slugs are lowercase, hyphenated, no special chars
   - Test various date formats

10. **Lazy Loading Test** (Property 10):
    - Generate list of magazine covers
    - Verify images only load when in/near viewport
    - Test scroll behavior triggers loading

### End-to-End Testing

**User Flows**:
- Homepage → Search → Magazine Reader → Back
- Homepage → Magazines → Magazine Reader
- Navigation between all pages
- Social links open in new tabs

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90
- Bundle size < 200KB (initial load)

**Testing Approach**:
- Use Lighthouse CI in build pipeline
- Test on throttled network (Fast 3G)
- Verify lazy loading reduces initial payload

### Accessibility Testing

**Requirements**:
- All images have alt text
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast (WCAG AA)
- Keyboard navigation works
- Focus states visible

**Testing Tools**:
- axe-core for automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing (optional)

## Implementation Notes

### Next.js Configuration

```typescript
// next.config.js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with static hosts
};
```

### Static Params Generation

```typescript
// app/magazine/[slug]/page.tsx
export async function generateStaticParams() {
  const magazines = await import('@/data/magazines.json');
  return magazines.magazines.map((mag) => ({
    slug: mag.slug,
  }));
}
```

### Search Implementation

Use client-side filtering with debouncing:
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [results, setResults] = useState<Magazine[]>([]);

const debouncedSearch = useMemo(
  () =>
    debounce((query: string) => {
      const filtered = magazines.filter((mag) =>
        [mag.coverName, mag.date, mag.description, mag.customText]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300),
  [magazines]
);
```

### Three.js Background Integration

- Load Three.js dynamically to reduce initial bundle
- Use `useEffect` for initialization and cleanup
- Handle window resize with throttling
- Provide loading state and fallback

### Internet Archive Embed

Use iframe with BookReader:
```html
<iframe
  src={`https://archive.org/embed/${archiveId}`}
  width="100%"
  height="800px"
  frameborder="0"
  allowfullscreen
></iframe>
```

### SEO Implementation

Create reusable metadata generation function:
```typescript
export function generateMetadata({ params }): Metadata {
  return {
    title: '...',
    description: '...',
    openGraph: { ... },
    twitter: { ... },
  };
}
```

### Performance Optimizations

- Use Next.js Image component for cover images
- Implement lazy loading with `loading="lazy"`
- Code split by route (automatic with App Router)
- Minimize CSS with Tailwind purge
- Compress images before adding to `/public/covers/`
