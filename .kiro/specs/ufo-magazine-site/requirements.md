# Requirements Document

## Introduction

OLD UFO MAGS is a static website that serves as a digital archive for vintage UFO magazines from the 1990s. The system SHALL provide users with the ability to browse, search, and read digitized magazines through Internet Archive embeds. The site combines a nostalgic 90s aesthetic with modern web performance, featuring ASCII art elements, terminal-inspired design, and animated backgrounds while maintaining fast load times and clean navigation.

## Glossary

- **System**: The OLD UFO MAGS website application
- **User**: Any visitor accessing the website
- **Magazine**: A digitized UFO publication from the 1990s
- **Magazine Metadata**: Information about a magazine including cover name, date, description, and custom text
- **Internet Archive Embed**: An embedded viewer from archive.org that displays magazine pages
- **Live Search**: Real-time search functionality that updates results as the user types
- **Static Export**: A pre-rendered website with no server-side processing
- **Slug**: A URL-friendly identifier derived from the magazine date

## Requirements

### Requirement 1: Static Site Generation

**User Story:** As a site owner, I want the website to be a fully static site, so that I can host it for free on Cloudflare Pages without requiring a backend server.

#### Acceptance Criteria

1. WHEN the site is built THEN the System SHALL generate all pages as static HTML files
2. WHEN a user requests any page THEN the System SHALL serve pre-rendered content without server-side processing
3. WHEN the site is deployed THEN the System SHALL function correctly on Cloudflare Pages static hosting
4. THE System SHALL NOT require API routes or server-side rendering
5. WHEN new magazines are added THEN the System SHALL require a rebuild to update the site

### Requirement 2: Magazine Data Management

**User Story:** As a site owner, I want to manage magazine data through a JSON file, so that I can easily add new magazines without modifying code.

#### Acceptance Criteria

1. THE System SHALL store magazine metadata in a JSON file located at `/src/data/magazines.json`
2. WHEN a magazine entry is added to the JSON file THEN the System SHALL include fields for id, slug, coverName, date, description, customText, coverImage, and archiveUrl
3. THE System SHALL generate URL slugs from magazine dates in a URL-friendly format
4. WHEN the JSON file is updated THEN the System SHALL reflect changes after rebuild
5. THE System SHALL validate that all required fields are present in each magazine entry

### Requirement 3: Homepage with Search

**User Story:** As a user, I want to see an engaging homepage with search functionality, so that I can quickly find magazines of interest.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the System SHALL display an ASCII art logo below the navigation bar
2. WHEN the homepage loads THEN the System SHALL display a headline with a typing animation effect
3. WHEN the homepage loads THEN the System SHALL display a description with placeholder text about the archive
4. THE System SHALL display a prominent search bar on the homepage
5. WHEN a user types in the search bar THEN the System SHALL display matching results in real-time
6. WHEN search results are displayed THEN the System SHALL show magazine covers and metadata
7. WHEN no matches are found THEN the System SHALL display a "NO RESULTS" message
8. WHEN a user clicks a search result THEN the System SHALL navigate to that magazine reader page

### Requirement 4: Live Search Functionality

**User Story:** As a user, I want to search for magazines as I type, so that I can quickly find specific issues without navigating through lists.

#### Acceptance Criteria

1. WHEN a user types in the search input THEN the System SHALL search across coverName, date, description, and customText fields
2. WHEN a user types in the search input THEN the System SHALL perform case-insensitive matching
3. WHEN a user types in the search input THEN the System SHALL debounce input by 300 milliseconds for performance
4. WHEN search results are displayed THEN the System SHALL show magazine cover images and basic metadata
5. WHEN a user clicks on a search result THEN the System SHALL navigate to the corresponding magazine reader page

### Requirement 5: Navigation System

**User Story:** As a user, I want a consistent navigation bar across all pages, so that I can easily move between different sections of the site.

#### Acceptance Criteria

1. THE System SHALL display a navigation bar at the top of every page
2. THE System SHALL style the navigation bar with a black background and terminal green accents
3. WHEN the navigation bar is rendered THEN the System SHALL include links for Home, Magazines, About, and Socials
4. WHEN a user clicks a navigation link THEN the System SHALL navigate to the corresponding page
5. THE System SHALL NOT display the ASCII art logo in the navigation bar

### Requirement 6: Magazine Listing Page

**User Story:** As a user, I want to browse all available magazines in a grid layout, so that I can explore the complete archive.

#### Acceptance Criteria

1. WHEN a user navigates to the magazines page THEN the System SHALL display all magazines from the JSON data file
2. WHEN magazines are displayed THEN the System SHALL show each magazine as a card with cover image and metadata
3. WHEN magazines are displayed THEN the System SHALL arrange them in a responsive grid layout
4. WHEN a user hovers over a magazine card THEN the System SHALL apply a visual hover effect with green accent
5. WHEN a user clicks a magazine card THEN the System SHALL navigate to that magazine reader page

### Requirement 7: Magazine Reader Page

**User Story:** As a user, I want to read magazines through an embedded viewer, so that I can browse pages without leaving the site.

#### Acceptance Criteria

1. WHEN a user navigates to a magazine reader page THEN the System SHALL display an Internet Archive BookReader embed
2. WHEN the embed is displayed THEN the System SHALL make it full-width and responsive to screen size
3. WHEN a magazine reader page loads THEN the System SHALL display a "Back to Magazines" button
4. WHEN a user clicks the "Back to Magazines" button THEN the System SHALL navigate to the magazine listing page
5. WHEN a magazine reader page loads THEN the System SHALL display magazine metadata below the embed
6. WHEN magazine metadata is displayed THEN the System SHALL show coverName, date, description, and customText fields

### Requirement 8: About Page

**User Story:** As a user, I want to learn about the project and its mission, so that I understand the purpose and legal status of the archive.

#### Acceptance Criteria

1. WHEN a user navigates to the about page THEN the System SHALL display the project mission statement
2. WHEN the about page loads THEN the System SHALL display copyright and legal information
3. WHEN the about page loads THEN the System SHALL explain that the project is non-profit
4. WHEN the about page loads THEN the System SHALL explain that magazines are hosted on Internet Archive
5. THE System SHALL display placeholder content that can be updated by the site owner

### Requirement 9: Socials Page

**User Story:** As a user, I want to find social media links, so that I can follow the project on various platforms.

#### Acceptance Criteria

1. WHEN a user navigates to the socials page THEN the System SHALL display links to Twitter/X, YouTube, and Discord
2. WHEN social links are displayed THEN the System SHALL show platform icons and names
3. WHEN social links are displayed THEN the System SHALL include brief descriptions for each platform
4. THE System SHALL allow the site owner to easily add or remove social links
5. WHEN a user clicks a social link THEN the System SHALL open the link in a new tab

### Requirement 10: Dynamic Background System

**User Story:** As a user, I want visually engaging backgrounds that match the site theme, so that the experience feels immersive without being distracting.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the System SHALL display an animated Three.js background
2. WHEN the homepage background is displayed THEN the System SHALL make it full viewport coverage and responsive to all screen sizes
3. WHEN a user visits a magazine reader page THEN the System SHALL display a static gradient background
4. WHEN the magazine reader background is displayed THEN the System SHALL use non-distracting colors that ensure content readability
5. WHEN the Three.js background is not available THEN the System SHALL display a fallback gradient background

### Requirement 11: SEO Implementation

**User Story:** As a site owner, I want comprehensive SEO implementation, so that the site ranks well in search engines and shares properly on social media.

#### Acceptance Criteria

1. WHEN any page is rendered THEN the System SHALL include unique title tags and meta descriptions
2. WHEN any page is rendered THEN the System SHALL include Open Graph tags for og:title, og:description, og:image, and og:url
3. WHEN any page is rendered THEN the System SHALL include Twitter Card tags
4. WHEN any page is rendered THEN the System SHALL include canonical URLs
5. WHEN the homepage is rendered THEN the System SHALL include JSON-LD structured data with WebSite schema
6. WHEN a magazine page is rendered THEN the System SHALL include JSON-LD structured data with Article or CreativeWork schema
7. THE System SHALL generate a sitemap.xml file
8. THE System SHALL use semantic HTML structure with proper heading hierarchy

### Requirement 12: Performance Optimization

**User Story:** As a user, I want the site to load quickly, so that I can access content without delays.

#### Acceptance Criteria

1. WHEN any page loads THEN the System SHALL achieve First Contentful Paint in less than 1.5 seconds
2. WHEN any page loads THEN the System SHALL achieve Time to Interactive in less than 3 seconds
3. WHEN magazine covers are displayed THEN the System SHALL lazy load images
4. THE System SHALL implement code splitting by route
5. THE System SHALL minimize JavaScript bundle size

### Requirement 13: Visual Design and Theming

**User Story:** As a user, I want a cohesive 90s-inspired design with modern touches, so that the site feels nostalgic yet functional.

#### Acceptance Criteria

1. THE System SHALL use a color palette of deep space black, dark hacker green, and light gray text
2. WHEN text is displayed THEN the System SHALL use monospace or terminal-style fonts for retro aesthetic
3. WHEN interactive elements are displayed THEN the System SHALL apply smooth transitions of 200-300 milliseconds
4. THE System SHALL maintain sufficient contrast ratios for accessibility
5. THE System SHALL use ASCII art elements sparingly to avoid visual clutter

### Requirement 14: Magazine Cover Storage

**User Story:** As a site owner, I want magazine covers stored locally in the project, so that they load quickly and remain under my control.

#### Acceptance Criteria

1. THE System SHALL store magazine cover images in the `/public/covers/` directory
2. WHEN a magazine entry is created THEN the System SHALL reference the local cover image path
3. WHEN cover images are displayed THEN the System SHALL optimize them for web delivery
4. THE System SHALL include alt text for all cover images for accessibility
5. WHEN a cover image fails to load THEN the System SHALL display a fallback placeholder

### Requirement 15: Responsive Layout for Desktop

**User Story:** As a user on a desktop computer, I want the site to display properly on various desktop screen sizes, so that content is readable and well-organized.

#### Acceptance Criteria

1. WHEN the site is viewed on desktop screens THEN the System SHALL adapt layout to screen width
2. WHEN the Internet Archive embed is displayed THEN the System SHALL scale to full available width while maintaining readability
3. WHEN magazine grids are displayed THEN the System SHALL adjust column count based on available width
4. THE System SHALL prioritize desktop optimization over mobile responsiveness in this phase
5. WHEN backgrounds are displayed THEN the System SHALL cover the full viewport on all desktop screen sizes
