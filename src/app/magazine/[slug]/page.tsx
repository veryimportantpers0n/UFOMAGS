import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MagazineReader from '@/components/MagazineReader';
import MagazineMetadata from '@/components/MagazineMetadata';
import Background from '@/components/Background';
import { generateSEOMetadata, generateCreativeWorkSchema } from '@/lib/seo';
import magazinesData from '@/data/magazines.json';
import { Magazine } from '@/types/magazine';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all magazine pages
 * Requirements: 1.1
 */
export function generateStaticParams() {
  return magazinesData.magazines.map((magazine) => ({
    slug: magazine.slug,
  }));
}

/**
 * Generate metadata for magazine reader page
 * Requirements: 11.1, 11.6
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const magazine = magazinesData.magazines.find((m) => m.slug === slug);

  if (!magazine) {
    return {
      title: 'Magazine Not Found',
    };
  }

  return generateSEOMetadata({
    title: `${magazine.coverName} - ${magazine.date}`,
    description: magazine.description,
    path: `/magazine/${magazine.slug}`,
    image: magazine.coverImage,
  });
}

/**
 * Magazine Reader Page
 * Requirements: 1.1, 7.3, 7.4, 11.1, 11.6
 */
export default async function MagazinePage({ params }: PageProps) {
  const { slug } = await params;
  const magazine = magazinesData.magazines.find((m) => m.slug === slug);

  if (!magazine) {
    notFound();
  }

  // Generate JSON-LD structured data
  const structuredData = generateCreativeWorkSchema(magazine);

  return (
    <Background type="static">
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Magazines Button */}
          <div className="mb-6">
            <Link
              href="/magazines"
              className="inline-flex items-center px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 rounded"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Magazines
            </Link>
          </div>

          {/* Page Title - visually hidden but accessible */}
          <h1 className="sr-only">{magazine.coverName} - {magazine.date}</h1>

          {/* Magazine Reader */}
          <div className="mb-8">
            <MagazineReader
              archiveUrl={magazine.archiveUrl}
              title={magazine.coverName}
            />
          </div>

          {/* Magazine Metadata */}
          <MagazineMetadata magazine={magazine} />
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </Background>
  );
}
