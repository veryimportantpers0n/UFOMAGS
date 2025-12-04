import type { Magazine } from '@/types/magazine';

/**
 * Generates a URL-friendly slug from a magazine date string
 * Requirements: 2.3
 * 
 * @param date - The magazine date (e.g., "Nov/Dec 1997", "January 1998")
 * @returns URL-friendly slug (e.g., "nov-dec-1997", "january-1998")
 * 
 * @example
 * generateSlug("Nov/Dec 1997") // returns "nov-dec-1997"
 * generateSlug("January 1998") // returns "january-1998"
 */
export function generateSlug(date: string): string {
  return date
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Validates that a magazine entry contains all required fields
 * Requirements: 2.5
 * 
 * @param magazine - The magazine object to validate
 * @returns true if valid, false otherwise
 */
export function validateMagazine(magazine: any): magazine is Magazine {
  const requiredFields: (keyof Magazine)[] = [
    'id',
    'slug',
    'coverName',
    'date',
    'description',
    'customText',
    'coverImage',
    'archiveUrl'
  ];

  // Check that all required fields exist and are non-empty strings
  for (const field of requiredFields) {
    if (
      !magazine[field] ||
      typeof magazine[field] !== 'string' ||
      magazine[field].trim() === ''
    ) {
      console.error(`Magazine validation failed: missing or empty field "${field}"`);
      return false;
    }
  }

  return true;
}

/**
 * Validates an array of magazine entries
 * Requirements: 2.5
 * 
 * @param magazines - Array of magazine objects to validate
 * @returns true if all magazines are valid, false otherwise
 */
export function validateMagazines(magazines: any[]): magazines is Magazine[] {
  if (!Array.isArray(magazines)) {
    console.error('Magazine validation failed: input is not an array');
    return false;
  }

  return magazines.every((magazine, index) => {
    const isValid = validateMagazine(magazine);
    if (!isValid) {
      console.error(`Magazine validation failed at index ${index}`);
    }
    return isValid;
  });
}
