'use client';

import Link from 'next/link';
import Background from '@/components/Background';
import DocumentCarousel from '@/components/DocumentCarousel';
import type { DocumentWithCategory, DocumentCategory } from '@/types/document';
import './DocumentViewer.css';

interface DocumentViewerProps {
    document: DocumentWithCategory;
    category: DocumentCategory;
}

export default function DocumentViewer({ document, category }: DocumentViewerProps) {
    // Extract archive ID from URL for embed
    // Handle different URL formats from Internet Archive
    const archiveUrl = document.archiveUrl;
    const archiveId = extractArchiveId(archiveUrl);
    const embedUrl = archiveId ? `https://archive.org/embed/${archiveId}` : archiveUrl;

    // Format year display
    const yearDisplay = document.yearStart
        ? document.yearEnd
            ? `${document.yearStart} - ${document.yearEnd}`
            : document.yearStart
        : null;

    return (
        <Background>
            <div className="document-slug-page" data-page="document-slug">
                {/* Full-width Viewer Container */}
                <div className="doc-slug-container">
                    {/* Internet Archive Viewer */}
                    <section className="doc-viewer-frame">
                        <div className="doc-viewer-header mono">
                            <Link href="/declassified" className="green-text hover:text-cyan-400 no-underline transition-colors duration-200">
                                &lt; RETURN TO ARCHIVES
                            </Link>
                            <span>DOCUMENT VIEWER</span>
                        </div>

                        {/* Iframe container - no blocker to allow full interaction */}
                        <div className="doc-iframe-container">
                            <iframe
                                src={embedUrl}
                                frameBorder="0"
                                allowFullScreen
                                title={document.title}
                                className="doc-viewer-iframe"
                            />
                        </div>

                        {/* Notice */}
                        <div className="doc-viewer-notice">
                            <div className="doc-notice-content mono">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    <strong className="green-text">NOTICE:</strong> All documents are hosted via Internet Archive for preservation.
                                    The embedded viewer may have limitations - for full access, please
                                    <span className="green-text"> OPEN FULL VIEWER</span>.
                                </span>
                                <a
                                    href={archiveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="doc-open-full-btn"
                                >
                                    OPEN FULL VIEWER →
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Centered Content Wrapper for Details */}
                <div className="doc-content-wrapper">
                    {/* Document Details */}
                    <section className="doc-details-section">
                        <article className="doc-details-panel">
                            <div className="mono label green-text">
                // {category.emoji ? `${category.emoji} ` : ''}{category.name}
                            </div>
                            <h1>{document.title}</h1>

                            <div className="doc-meta-row mono">
                                {yearDisplay && (
                                    <div className="doc-meta-item">
                                        <span className="label">DATE RANGE</span>
                                        <span className="value">{yearDisplay}</span>
                                    </div>
                                )}
                                {document.accessNotes && (
                                    <div className="doc-meta-item">
                                        <span className="label">ACCESS NOTES</span>
                                        <span className="value">{document.accessNotes}</span>
                                    </div>
                                )}
                            </div>

                            {document.description && (
                                <div className="doc-blurb-box">
                                    <h3 className="mono doc-blurb-title">&gt;&gt; DOCUMENT SUMMARY</h3>
                                    <p className="doc-blurb-text">{document.description}</p>
                                </div>
                            )}
                        </article>
                    </section>

                    {/* Related Documents Carousel */}
                    <DocumentCarousel
                        documents={category.documents}
                        currentSlug={document.slug}
                        categoryId={category.id}
                    />
                </div>
            </div>
        </Background>
    );
}

/**
 * Extract the archive ID from various Internet Archive URL formats
 */
function extractArchiveId(url: string): string | null {
    try {
        // Handle URLs like: https://archive.org/details/majestic-12-documents.../Document.pdf
        const detailsMatch = url.match(/archive\.org\/details\/([^/]+)/);
        if (detailsMatch) {
            return detailsMatch[1];
        }
        return null;
    } catch {
        return null;
    }
}
