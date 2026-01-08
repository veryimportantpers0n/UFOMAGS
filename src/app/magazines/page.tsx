import { Metadata } from 'next';
import MagazinesClient from './MagazinesClient';
import { generateSEOMetadata, generateCollectionPageSchema } from '@/lib/seo';
import magazineData from '@/data/magazines.json';

/**
 * Magazine listing page displaying all available magazines
 * Requirements: 6.1, 6.3, 11.1
 */

export const metadata: Metadata = generateSEOMetadata({
  title: 'Browse UFO Magazines',
  description:
    'Browse our complete collection of vintage UFO magazines from the 1990s. Explore rare issues and forgotten stories from the golden age of UFO research.',
  path: '/magazines',
});

export default function MagazinesPage() {
  const collectionSchema = generateCollectionPageSchema(magazineData.magazines.length);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <MagazinesClient />
    </>
  );
}

