import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo';
import magazinesData from '@/data/magazines.json';
import MagazineViewer from './MagazineViewer';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return magazinesData.magazines.map((magazine) => ({
    slug: magazine.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const magazine = magazinesData.magazines.find((m) => m.slug === slug);

  if (!magazine) {
    return {
      title: 'Magazine Not Found',
    };
  }

  return generateSEOMetadata({
    title: `${magazine.coverName} (${magazine.date})`,
    description: magazine.description,
    path: `/magazine/${magazine.slug}`,
    image: magazine.coverImage,
  });
}

export default async function MagazinePage({ params }: PageProps) {
  const { slug } = await params;
  const magazine = magazinesData.magazines.find((m) => m.slug === slug);

  if (!magazine) {
    notFound();
  }

  return <MagazineViewer magazine={magazine} />;
}
