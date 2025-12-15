'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Document } from '@/types/document';

interface DocumentCarouselProps {
    documents: Document[];
    currentSlug: string;
}

export default function DocumentCarousel({ documents, currentSlug }: DocumentCarouselProps) {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    // Filter out current document
    const relatedDocs = documents.filter(doc => doc.slug !== currentSlug);

    // Don't render if no related documents
    if (relatedDocs.length === 0) {
        return null;
    }

    const handleImageError = (slug: string) => {
        setImageErrors(prev => ({ ...prev, [slug]: true }));
    };

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
                {relatedDocs.map((doc) => (
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
                            {imageErrors[doc.slug] || !doc.thumbnailImage ? (
                                <div className="doc-carousel-placeholder">
                                    <span className="doc-carousel-placeholder-icon">📄</span>
                                </div>
                            ) : (
                                <Image
                                    src={doc.thumbnailImage}
                                    alt={doc.title}
                                    fill
                                    sizes="200px"
                                    className="doc-carousel-img"
                                    loading="lazy"
                                    onError={() => handleImageError(doc.slug)}
                                />
                            )}
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
                ))}
            </div>
        </section>
    );
}
