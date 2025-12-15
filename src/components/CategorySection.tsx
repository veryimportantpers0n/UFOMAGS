'use client';

import { useRouter } from 'next/navigation';
import type { DocumentCategory } from '@/types/document';
import DocumentCard from './DocumentCard';

interface CategorySectionProps {
    category: DocumentCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
    const router = useRouter();

    const handleDocumentClick = (slug: string) => {
        router.push(`/declassified/${slug}`);
    };

    // Format category year range
    const yearRange = category.yearStart
        ? category.yearEnd
            ? `${category.yearStart} - ${category.yearEnd}`
            : category.yearStart
        : null;

    return (
        <section className="category-section">
            {/* Category Header */}
            <header className="category-header">
                <div className="category-title-row">
                    {category.emoji && (
                        <span className="category-emoji">{category.emoji}</span>
                    )}
                    <h2 className="category-name">{category.name}</h2>
                    {yearRange && (
                        <span className="category-year mono">{yearRange}</span>
                    )}
                </div>
                <div className="category-count mono">
                    DOCUMENTS: [{category.documents.length}]
                </div>
            </header>

            {/* Documents Grid */}
            <div className="category-documents">
                {category.documents.map((doc) => (
                    <DocumentCard
                        key={doc.id}
                        document={doc}
                        onClick={() => handleDocumentClick(doc.slug)}
                    />
                ))}
            </div>
        </section>
    );
}
