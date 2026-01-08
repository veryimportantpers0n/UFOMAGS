import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oldufomags.com';
export const SITE_NAME = 'OLD UFO MAGS';

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
}: SEOConfig): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'A digital archive of vintage UFO magazines from the 1990s',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/magazines?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateCreativeWorkSchema(magazine: {
  coverName: string;
  date: string;
  description: string;
  slug: string;
  coverImage: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: magazine.coverName,
    datePublished: magazine.date,
    description: magazine.description,
    url: `${SITE_URL}/magazine/${magazine.slug}`,
    image: `${SITE_URL}${magazine.coverImage}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

/**
 * Generate CollectionPage schema for /magazines
 */
export function generateCollectionPageSchema(itemCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Magazine Archive',
    description: 'Browse our complete collection of vintage UFO magazines from the 1990s.',
    url: `${SITE_URL}/magazines`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Thing',
      name: 'UFO Magazines',
      description: 'Vintage UFO and paranormal publications from the 1990s',
    },
    numberOfItems: itemCount,
  };
}

/**
 * Generate Organization schema for /about
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: 'A non-profit digital archive dedicated to preserving vintage UFO magazines from the 1990s.',
    sameAs: [
      'https://twitter.com/oldufomags',
      'https://youtube.com/@oldufomags',
    ],
    foundingDate: '2025',
    knowsAbout: ['UFO', 'Paranormal', 'Vintage Magazines', 'Digital Archives'],
  };
}

/**
 * Generate Article schema for /declassified/[slug]
 */
export function generateArticleSchema(document: {
  title: string;
  description: string;
  slug: string;
  date?: string;
  classification?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: document.title,
    description: document.description,
    url: `${SITE_URL}/declassified/${document.slug}`,
    datePublished: document.date || undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    isAccessibleForFree: true,
    genre: 'Declassified Government Document',
    keywords: ['UFO', 'declassified', 'government documents', document.classification || 'unclassified'].filter(Boolean),
  };
}

