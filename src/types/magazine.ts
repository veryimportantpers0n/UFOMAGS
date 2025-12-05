/**
 * Magazine interface representing a vintage UFO magazine entry
 * Requirements: 2.1, 2.2
 */
export interface Magazine {
  /** Unique identifier for the magazine */
  id: string;

  /** URL-friendly identifier derived from the magazine date */
  slug: string;

  /** Title text from the magazine cover */
  coverName: string;

  /** Publication date (e.g., "Nov/Dec 1997") */
  date: string;

  /** Brief description of the issue content */
  description: string;

  /** Additional notes or context about the issue */
  customText: string;

  /** Path to local cover image (e.g., "/covers/nov-dec-1997.jpg") */
  coverImage: string;

  /** Internet Archive detail page URL */
  archiveUrl: string;

  /** Issue number (e.g., "#042") */
  issueNumber?: string;

  /** Publisher name */
  publisher?: string;

  /** Number of pages in the magazine */
  pageCount?: string;

  /** Cover art analysis/description */
  coverAnalysis?: string;

  /** Summary of issue contents */
  issueContents?: string;

  /** YouTube video ID (if available) */
  youtubeVideoId?: string;

  /** YouTube video title */
  youtubeVideoTitle?: string;

  /** YouTube video description */
  youtubeVideoDescription?: string;
}

/**
 * Root structure for the magazines.json data file
 */
export interface MagazineData {
  magazines: Magazine[];
}
