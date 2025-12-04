import { Metadata } from 'next';
import MagazinesClient from './MagazinesClient';
import { generateSEOMetadata } from '@/lib/seo';

/**
 * Magazine listing page displaying all available magazines
 * Requirements: 6.1, 6.3, 11.1
 */

export const metadata: Metadata = generateSEOMetadata({
  title: 'Magazine Archive',
  description:
    'Browse our complete collection of vintage UFO magazines from the 1990s. Explore rare issues and forgotten stories from the golden age of UFO research.',
  path: '/magazines',
});

export default function MagazinesPage() {
  return <MagazinesClient />;
}
