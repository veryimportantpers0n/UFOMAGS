import { Metadata } from 'next';
import DeclassifiedClient from '@/app/declassified/DeclassifiedClient';
import { generateSEOMetadata } from '@/lib/seo';

/**
 * Declassified Documents listing page
 */

export const metadata: Metadata = generateSEOMetadata({
    title: 'Declassified UFO Documents',
    description:
        'Browse our collection of declassified government UFO documents. Explore files from Majestic 12, Australian UFO Files, and more - all sourced from official archives.',
    path: '/declassified',
});

export default function DeclassifiedPage() {
    return <DeclassifiedClient />;
}
