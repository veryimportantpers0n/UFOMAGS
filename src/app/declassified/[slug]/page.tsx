import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/lib/seo';
import { allDocuments, findDocumentBySlug, getCategoryForDocument } from '@/data/documents';
import DocumentViewer from '@/app/declassified/[slug]/DocumentViewer';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return allDocuments.map((document) => ({
        slug: document.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const document = findDocumentBySlug(slug);

    if (!document) {
        return {
            title: 'Document Not Found',
        };
    }

    return generateSEOMetadata({
        title: `${document.title} - Declassified Document`,
        description: document.description,
        path: `/declassified/${document.slug}`,
    });
}

export default async function DocumentPage({ params }: PageProps) {
    const { slug } = await params;
    const document = findDocumentBySlug(slug);
    const category = getCategoryForDocument(slug);

    if (!document || !category) {
        notFound();
    }

    return <DocumentViewer document={document} category={category} />;
}
