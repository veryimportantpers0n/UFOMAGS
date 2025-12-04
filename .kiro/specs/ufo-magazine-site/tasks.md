# Implementation Plan

- [x] 1. Initialize Next.js project with TypeScript and Tailwind CSS





  - Create Next.js 14+ project with App Router
  - Configure TypeScript with strict mode
  - Set up Tailwind CSS for styling
  - Configure Next.js for static export (`output: 'export'`)
  - Create basic project structure (components, data, lib folders)
  - _Requirements: 1.1, 1.4_

- [x] 2. Create magazine data structure and sample data





  - Define Magazine TypeScript interface
  - Create `/src/data/magazines.json` with sample magazine entry
  - Implement slug generation utility function
  - Create data validation utility
  - Add placeholder cover image to `/public/covers/`
  - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [ ]* 2.1 Write property test for magazine data completeness
  - **Property 2: Magazine data completeness**
  - **Validates: Requirements 2.2, 2.5**

- [ ]* 2.2 Write property test for slug generation
  - **Property 3: Slug generation consistency**
  - **Validates: Requirements 2.3**

- [x] 3. Build core layout components






  - [x] 3.1 Create Navbar component with navigation links

    - Implement Navbar with Home, Magazines, About, Socials links
    - Style with black background and terminal green accents
    - Add active link highlighting
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 3.2 Write property test for navigation consistency
    - **Property 8: Navigation consistency**
    - **Validates: Requirements 5.1, 5.3**

  - [x] 3.3 Create Background wrapper component


    - Implement Background component with type prop ('home' | 'static')
    - Add static gradient background for non-home pages
    - _Requirements: 10.3, 10.4_

  - [ ]* 3.4 Write property test for background type consistency
    - **Property 18: Background type consistency**
    - **Validates: Requirements 10.3**

  - [x] 3.5 Create root layout with Navbar


    - Set up app/layout.tsx with Navbar
    - Configure global styles and fonts
    - Add SEO metadata helper function
    - _Requirements: 5.1, 11.8_

- [x] 4. Implement homepage with search functionality



  - [x] 4.1 Create ASCIILogo component


    - Implement SVG-based ASCII art logo
    - Add placeholder logo for testing
    - _Requirements: 3.1_

  - [x] 4.2 Create TypingEffect component


    - Implement character-by-character typing animation
    - Make speed configurable
    - _Requirements: 3.2_

  - [x] 4.3 Create SearchBar component with live search


    - Implement search input with debouncing (300ms)
    - Add filtering logic across coverName, date, description, customText
    - Display results dropdown with covers and metadata
    - Show "NO RESULTS" message when appropriate
    - Handle result click navigation
    - _Requirements: 3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 4.4 Write property test for search result accuracy
    - **Property 4: Search result accuracy**
    - **Validates: Requirements 3.5, 4.1, 4.2**

  - [ ]* 4.5 Write property test for search debouncing
    - **Property 7: Search debouncing behavior**
    - **Validates: Requirements 4.3**

  - [x] 4.6 Build homepage (app/page.tsx)


    - Integrate ASCIILogo, TypingEffect, SearchBar
    - Add hero section with headline and description
    - Apply HomeBackground
    - Add SEO metadata
    - _Requirements: 3.1, 3.2, 3.3, 11.1, 11.5_

- [x] 5. Create Three.js animated background
  - [x] 5.1 Create HomeBackground component
    - Set up Three.js scene with 8 different ASCII art backgrounds
    - Randomly select one background on each page load
    - Handle window resize events
    - Implement cleanup on unmount
    - Add fallback gradient while loading
    - _Requirements: 10.1, 10.2, 10.5_

  - [x] 5.2 Integrate HomeBackground into homepage
    - Add dynamic import for Three.js to reduce bundle size
    - Test loading states and fallback
    - Full viewport coverage (100vw x 100vh)
    - _Requirements: 10.1_

- [x] 6. Build magazine listing page




  - [x] 6.1 Create MagazineCard component


    - Display cover image with lazy loading
    - Show coverName and date metadata
    - Add hover effect with green accent
    - Handle click navigation
    - _Requirements: 6.2, 6.4, 6.5, 12.3_

  - [ ]* 6.2 Write property test for magazine card structure
    - **Property 11: Magazine card structure**
    - **Validates: Requirements 6.2**

  - [ ]* 6.3 Write property test for image lazy loading
    - **Property 22: Image lazy loading**
    - **Validates: Requirements 12.3**

  - [x] 6.4 Build magazines listing page (app/magazines/page.tsx)


    - Load all magazines from JSON
    - Display magazines in responsive grid
    - Add page title and description
    - Add SEO metadata
    - _Requirements: 6.1, 6.3, 11.1_

  - [ ]* 6.5 Write property test for magazine listing completeness
    - **Property 10: Magazine listing completeness**
    - **Validates: Requirements 6.1**

- [x] 7. Implement magazine reader pages





  - [x] 7.1 Create MagazineReader component


    - Embed Internet Archive BookReader iframe
    - Make full-width and responsive
    - Handle loading states
    - Add error fallback with link to Internet Archive
    - _Requirements: 7.1, 7.2_

  - [ ]* 7.2 Write property test for magazine reader embed presence
    - **Property 13: Magazine reader embed presence**
    - **Validates: Requirements 7.1**

  - [x] 7.3 Create MagazineMetadata component


    - Display coverName, date, description, customText
    - Use semantic HTML structure
    - _Requirements: 7.5, 7.6_

  - [ ]* 7.4 Write property test for metadata display
    - **Property 15: Magazine reader metadata display**
    - **Validates: Requirements 7.5, 7.6**

  - [x] 7.5 Build magazine reader page (app/magazine/[slug]/page.tsx)


    - Implement generateStaticParams for all magazines
    - Add "Back to Magazines" button
    - Integrate MagazineReader and MagazineMetadata
    - Add SEO metadata with JSON-LD CreativeWork schema
    - _Requirements: 1.1, 7.3, 7.4, 11.1, 11.6_

  - [ ]* 7.6 Write property test for static page generation
    - **Property 1: Static page generation completeness**
    - **Validates: Requirements 1.1**

  - [ ]* 7.7 Write property test for magazine page structured data
    - **Property 20: Magazine page structured data**
    - **Validates: Requirements 11.6**

- [x] 8. Create About and Socials pages





  - [x] 8.1 Build About page (app/about/page.tsx)


    - Add mission statement placeholder
    - Add copyright and legal information
    - Explain non-profit status and Internet Archive hosting
    - Add SEO metadata
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 11.1_

  - [x] 8.2 Create SocialLink component


    - Display platform icon, name, and description
    - Open links in new tab (target="_blank")
    - Add hover effects
    - _Requirements: 9.2, 9.3, 9.5_

  - [ ]* 8.3 Write property test for social link structure
    - **Property 16: Social link structure**
    - **Validates: Requirements 9.2, 9.3**

  - [ ]* 8.4 Write property test for social link behavior
    - **Property 17: Social link behavior**
    - **Validates: Requirements 9.5**

  - [x] 8.5 Build Socials page (app/socials/page.tsx)


    - Add page title and description
    - Display SocialLink components for Twitter/X, YouTube, Discord
    - Add placeholder URLs
    - Add SEO metadata
    - _Requirements: 9.1, 9.4, 11.1_

- [x] 9. Implement comprehensive SEO




  - [x] 9.1 Create SEO metadata utility functions


    - Build generateMetadata helper for all page types
    - Add JSON-LD schema generators (WebSite, CreativeWork)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [ ]* 9.2 Write property test for SEO metadata presence
    - **Property 19: SEO metadata presence**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4**

  - [x] 9.3 Add SEO metadata to all pages


    - Update homepage with WebSite schema
    - Update magazine pages with CreativeWork schema
    - Add Open Graph and Twitter Card tags to all pages
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 9.4 Generate sitemap.xml


    - Create sitemap generation script or use Next.js plugin
    - Include all static pages and magazine pages
    - _Requirements: 11.7_

  - [ ]* 9.5 Write property test for semantic heading hierarchy
    - **Property 21: Semantic heading hierarchy**
    - **Validates: Requirements 11.8**

- [x] 10. Add accessibility and image optimization





  - [x] 10.1 Implement image optimization


    - Use Next.js Image component for all cover images
    - Add lazy loading attributes
    - Create fallback placeholder image
    - _Requirements: 12.3, 14.3, 14.5_

  - [ ]* 10.2 Write property test for cover image path validity
    - **Property 23: Cover image path validity**
    - **Validates: Requirements 14.2**

  - [ ]* 10.3 Write property test for cover image alt text
    - **Property 24: Cover image alt text**
    - **Validates: Requirements 14.4**

  - [x] 10.4 Add accessibility features



    - Ensure all images have descriptive alt text
    - Verify proper heading hierarchy across all pages
    - Test keyboard navigation
    - Add focus states to interactive elements
    - _Requirements: 13.4, 14.4_
  
- [x] 11. Optimize performance and build configuration





  - [x] 11.1 Configure Next.js for optimal static export


    - Set output: 'export' in next.config.js
    - Configure image optimization for static export
    - Add trailingSlash for better static host compatibility
    - _Requirements: 1.1, 1.3_

  - [x] 11.2 Optimize bundle size

    - Implement dynamic imports for Three.js
    - Verify code splitting by route
    - Minimize CSS with Tailwind purge
    - _Requirements: 12.4, 12.5_

  - [x] 11.3 Test build and deployment

    - Run production build
    - Verify all pages generate correctly
    - Test static export output
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 12. Create custom 404 page




  - Build 404 page with "Lost in Space?" message
  - Add "Return to Homepage" button
  - Style with theme colors
  - _Requirements: General error handling_

- [ ] 13. Final testing and polish
  - [ ] 13.1 Test all navigation flows
    - Homepage → Search → Magazine Reader
    - Homepage → Magazines → Magazine Reader
    - All navbar links
    - Back buttons
    - _Requirements: 3.8, 5.4, 6.5, 7.4_

  - [ ] 13.2 Verify visual design consistency
    - Check color palette across all pages
    - Verify font usage (monospace/terminal style)
    - Test hover effects and transitions
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ] 13.3 Test responsive behavior on desktop
    - Test various desktop screen sizes
    - Verify grid layouts adapt properly
    - Check background coverage
    - _Requirements: 15.1, 15.3, 15.5_

  - [ ]* 13.4 Run all property-based tests
    - Execute all property tests with 100+ iterations
    - Verify all properties pass
    - Fix any failing tests

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Documentation and deployment preparation




  - [x] 15.1 Update README with setup instructions


    - Add instructions for adding new magazines
    - Document background customization process
    - Include deployment steps for Cloudflare Pages
    - _Requirements: 2.4_

  - [x] 15.2 Create sample magazine entry documentation


    - Document JSON structure
    - Provide example entry
    - Explain slug generation
    - _Requirements: 2.1, 2.2_

  - [x] 15.3 Prepare for Cloudflare Pages deployment


    - Verify build command and output directory
    - Test static export compatibility
    - Document deployment configuration
    - _Requirements: 1.3_
