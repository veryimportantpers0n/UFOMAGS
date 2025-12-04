import { MetadataRoute } from 'next';
import magazinesData from '@/data/magazines.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oldufomags.com';

// Required for static export
export const dynamic = 'force-static';

/**
 * Generate sitemap for all static pages and magazine pages
 * Requirements: 11.7
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/magazines`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/socials`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Magazine pages
  const magazinePages = magazinesData.magazines.map((magazine) => ({
    url: `${SITE_URL}/magazine/${magazine.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...magazinePages];
}
