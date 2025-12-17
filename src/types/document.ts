/**
 * Document interface representing a declassified document entry
 */
export interface Document {
    /** Unique identifier for the document */
    id: string;

    /** URL-friendly slug */
    slug: string;

    /** Document title */
    title: string;

    /** Brief description of the document */
    description: string;

    /** Internet Archive URL */
    archiveUrl: string;

    /** Path to thumbnail image (optional) - DEPRECATED in favor of HoloIcon logic */
    thumbnailImage?: string;

    /** Start year of the document (optional) */
    yearStart?: string;

    /** End year of the document (optional) */
    yearEnd?: string;

    /** Notes about document access (optional) */
    accessNotes?: string;
}

/**
 * Category interface representing a group of related documents
 */
export interface DocumentCategory {
    /** Category slug identifier */
    id: string;

    /** Display name for the category */
    name: string;

    /** Emoji for countries (e.g., "🇦🇺") - optional */
    emoji?: string;

    /** Year range for entire category (optional) */
    yearStart?: string;
    yearEnd?: string;

    /** Documents in this category */
    documents: Document[];
}

/**
 * Extended document with category info for flat lists
 */
export interface DocumentWithCategory extends Document {
    categoryId: string;
    categoryName: string;
}
