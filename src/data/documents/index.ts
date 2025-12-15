import type { DocumentCategory, Document, DocumentWithCategory } from '@/types/document';

// Import category JSON files
import majestic12Data from './majestic-12.json';
import australiaData from './australia.json';

// Type assertion for imported JSON
const majestic12 = majestic12Data as DocumentCategory;
const australia = australiaData as DocumentCategory;

/**
 * All document categories
 */
export const documentCategories: DocumentCategory[] = [
    majestic12,
    australia,
];

/**
 * Flat list of all documents with their category info
 */
export const allDocuments: DocumentWithCategory[] = documentCategories.flatMap(category =>
    category.documents.map(doc => ({
        ...doc,
        categoryId: category.id,
        categoryName: category.name,
    }))
);

/**
 * Find a document by its slug
 */
export function findDocumentBySlug(slug: string): DocumentWithCategory | undefined {
    return allDocuments.find(doc => doc.slug === slug);
}

/**
 * Get all documents in the same category as the given document
 */
export function getRelatedDocuments(slug: string): Document[] {
    const doc = findDocumentBySlug(slug);
    if (!doc) return [];

    const category = documentCategories.find(cat => cat.id === doc.categoryId);
    if (!category) return [];

    // Return all documents except the current one
    return category.documents.filter(d => d.slug !== slug);
}

/**
 * Get the category for a document
 */
export function getCategoryForDocument(slug: string): DocumentCategory | undefined {
    const doc = findDocumentBySlug(slug);
    if (!doc) return undefined;

    return documentCategories.find(cat => cat.id === doc.categoryId);
}
