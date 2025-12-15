'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Document } from '@/types/document';

interface DocumentCardProps {
    document: Document;
    onClick: () => void;
    showYear?: boolean;
}

export default function DocumentCard({ document, onClick, showYear = true }: DocumentCardProps) {
    const [imageError, setImageError] = useState(false);

    // Format year range display
    const yearDisplay = document.yearStart
        ? document.yearEnd
            ? `${document.yearStart} - ${document.yearEnd}`
            : document.yearStart
        : null;

    return (
        <article
            className="doc-card"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${document.title}`}
        >
            <div className="doc-card-image">
                {imageError || !document.thumbnailImage ? (
                    <div className="doc-card-placeholder">
                        <span className="doc-card-placeholder-icon">📄</span>
                        <span className="doc-card-placeholder-text mono">CLASSIFIED</span>
                    </div>
                ) : (
                    <Image
                        src={document.thumbnailImage}
                        alt={document.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="doc-card-img"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="doc-card-content">
                <h3 className="doc-card-title">{document.title}</h3>
                {showYear && yearDisplay && (
                    <span className="doc-card-year mono">{yearDisplay}</span>
                )}
                <p className="doc-card-desc">{document.description}</p>
                <div className="doc-card-btn mono">ACCESS FILE</div>
            </div>
        </article>
    );
}
