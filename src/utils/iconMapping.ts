
import { Document } from '@/types/document';

export type IconType =
    | 'alien'
    | 'craft'
    | 'fullreport'
    | 'intelligence'
    | 'legal'
    | 'logs'
    | 'magazine'
    | 'research';

const ICON_PATHS: Record<IconType, string> = {
    alien: '/icons/alien.svg',
    craft: '/icons/craft.svg',
    fullreport: '/icons/fullreport.svg',
    intelligence: '/icons/intelligence.svg',
    legal: '/icons/legal.svg',
    logs: '/icons/logs.svg',
    magazine: '/icons/magazine.svg',
    research: '/icons/research.svg',
};

/**
 * Determines the icon type based on document category or explicit rules.
 * This can be expanded to check specific document attributes.
 */

/**
 * Determines the icon type based on document category or explicit rules.
 * Priority:
 * 1. Explicit 'icon' field in accessNotes (e.g. "ICON: ALIEN")
 * 2. Keywords in accessNotes
 * 3. Category Default
 * 4. Title Keywords
 * 5. Fallback 'legal'
 */
export function getIconForDocument(doc: Document, categoryId?: string): IconType {
    // 1. Check for explicit overrides in accessNotes (User Control)
    if (doc.accessNotes) {
        const note = doc.accessNotes.toUpperCase();

        // Direct assignment command in notes
        // Specific checks for multi-word or variations
        if (note.includes('ICON: ALIEN')) return 'alien';
        if (note.includes('ICON: CRAFT') || note.includes('ICON: UFO CRAFT')) return 'craft';
        if (note.includes('ICON: FULLREPORT') || note.includes('ICON: FULL REPORT')) return 'fullreport';
        if (note.includes('ICON: INTELLIGENCE') || note.includes('ICON: INTEL')) return 'intelligence';
        if (note.includes('ICON: LEGAL')) return 'legal';
        if (note.includes('ICON: LOGS') || note.includes('ICON: LOG')) return 'logs';
        if (note.includes('ICON: MAGAZINE')) return 'magazine';
        if (note.includes('ICON: RESEARCH')) return 'research';

        // Keyword matching in notes (if ICON command not found or partial matches)
        if (note.includes('SIGHTING') || note.includes('CONTACT')) return 'alien';
        if (note.includes('VEHICLE') || note.includes('SAUCER')) return 'craft';
        if (note.includes('RESEARCH') || note.includes('STUDY')) return 'research';
        if (note.includes('TOP SECRET') || note.includes('CLASSIFIED')) return 'intelligence';
        if (note.includes('LOG')) return 'logs';
        if (note.includes('REPORT')) return 'fullreport';
    }

    // 2. Map based on Category ID (Defaults)
    if (categoryId) {
        switch (categoryId) {
            case 'majestic-12':
                return 'intelligence';
            case 'project-grudge':
                return 'fullreport';
            case 'australia':
                return 'alien';
            case 'blue-book':
                return 'research';
        }
    }

    // 3. Fallback based on content keywords in Title
    const lowerTitle = doc.title.toLowerCase();
    if (lowerTitle.includes('log')) return 'logs';
    if (lowerTitle.includes('report')) return 'fullreport';
    if (lowerTitle.includes('craft') || lowerTitle.includes('ufo')) return 'craft';
    if (lowerTitle.includes('memo')) return 'legal';

    return 'legal'; // Ultimate default
}

export function getIconPath(type: IconType): string {
    return ICON_PATHS[type];
}

/**
 * Strips the 'ICON: [NAME]' command from the access notes for display purposes.
 */
export function formatAccessNotes(notes: string | undefined): string | null {
    if (!notes) return null;
    // Replace "ICON: ..." and everything after it (assuming it's at the end) 
    // OR try to be smart about multi-word values. 
    // Given the issues, removing ICON: and the rest of the line is safest if user appends it.
    return notes.replace(/ICON:.*$/i, '').trim();
}
