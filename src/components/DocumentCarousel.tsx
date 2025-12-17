'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Document } from '@/types/document';
import HoloIcon from './HoloIcon';
import { getIconForDocument, getIconPath } from '@/utils/iconMapping';

interface DocumentCarouselProps {
    documents: Document[];
    currentSlug: string;
    categoryId?: string;
}

export default function DocumentCarousel({ documents, currentSlug, categoryId }: DocumentCarouselProps) {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter out current document
    const relatedDocs = documents.filter(doc => doc.slug !== currentSlug);

    // Don't render if no related documents
    if (relatedDocs.length === 0) {
        return null;
    }


    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320; // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleDocumentClick = (slug: string) => {
        router.push(`/declassified/${slug}`);
    };

    return (
        <section className="doc-carousel-section">
            <div className="doc-carousel-header">
                <h3 className="mono doc-carousel-title">
                    :: RELATED DOCUMENTS [{relatedDocs.length}]
                </h3>
                <div className="doc-carousel-controls">
                    <button
                        onClick={() => scroll('left')}
                        className="doc-carousel-btn mono"
                        aria-label="Scroll left"
                    >
                        ◀
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="doc-carousel-btn mono"
                        aria-label="Scroll right"
                    >
                        ▶
                    </button>
                </div>
            </div>

            <div className="doc-carousel-track" ref={scrollRef}>
                {relatedDocs.map((doc) => {
                    const iconType = getIconForDocument(doc, categoryId);
                    const iconPath = getIconPath(iconType);

                    return (
                        <article
                            key={doc.id}
                            className="doc-carousel-card"
                            onClick={() => handleDocumentClick(doc.slug)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleDocumentClick(doc.slug);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="doc-carousel-image">
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '50%', height: '50%', position: 'relative' }}>
                                        <HoloIcon
                                            src={iconPath}
                                            alt={`${iconType} Hologram`}
                                            color="#00adb5"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="doc-carousel-info">
                                <h4 className="doc-carousel-card-title">{doc.title}</h4>
                                {(doc.yearStart || doc.yearEnd) && (
                                    <span className="doc-carousel-year mono">
                                        {doc.yearStart}{doc.yearEnd ? ` - ${doc.yearEnd}` : ''}
                                    </span>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
