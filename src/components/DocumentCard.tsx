'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Document } from '@/types/document';
import HoloIcon from './HoloIcon';
import { getIconForDocument, getIconPath } from '@/utils/iconMapping';

interface DocumentCardProps {
    document: Document;
    onClick: () => void;
    showYear?: boolean;
    categoryId?: string;
}

export default function DocumentCard({ document, onClick, showYear = true, categoryId }: DocumentCardProps) {

    // Format year range display
    const yearDisplay = document.yearStart
        ? document.yearEnd
            ? `${document.yearStart} - ${document.yearEnd}`
            : document.yearStart
        : null;

    // Get Icon Type
    const iconType = getIconForDocument(document, categoryId);
    const iconPath = getIconPath(iconType);

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
