import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oldufomags.com';
const SITE_NAME = 'OLD UFO MAGS';

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
