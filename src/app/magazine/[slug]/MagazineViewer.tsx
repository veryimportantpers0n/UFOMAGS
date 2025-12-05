'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Background from '@/components/Background';
import { generateCreativeWorkSchema } from '@/lib/seo';
import magazinesData from '@/data/magazines.json';
import './MagazineViewer.css';

interface MagazineViewerProps {
    magazine: typeof magazinesData.magazines[0];
}

export default function MagazineViewer({ magazine }: MagazineViewerProps) {
    const [blockInteraction, setBlockInteraction] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Extract archive ID from URL for embed
    const archiveId = magazine.archiveUrl.split('/').pop() || '';
    // Try Internet Archive parameters to force theater/full-screen mode
    const embedUrl = `https://archive.org/embed/${archiveId}?ui=embed&skin=2023&view=theater`;

    // Generate JSON-LD structured data
    const structuredData = generateCreativeWorkSchema(magazine);

    // Prevent double-click zoom in iframe
    useEffect(() => {
        const handleDoubleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            // Temporarily block interactions to prevent zoom
            setBlockInteraction(true);
            setTimeout(() => setBlockInteraction(false), 200);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('dblclick', handleDoubleClick, { capture: true });
            return () => container.removeEventListener('dblclick', handleDoubleClick, { capture: true });
        }
    }, []);

    return (
        <Background>
            <div className="magazine-slug-page" data-page="magazine-slug">
                {/* Navigation - with padding */}
                <nav className="slug-nav">
                    <Link href="/magazines" className="back-btn mono">
                        &lt; RETURN TO ARCHIVE
                    </Link>
                </nav>

                {/* Full-width Viewer Container */}
                <div className="slug-container">
                    {/* Internet Archive Viewer */}
                    <section className="viewer-frame">
                        <div className="viewer-header mono">
                            <span className="green-text">:: INTERNET ARCHIVE UPLINK ESTABLISHED</span>
                            <span>MODE: READ-ONLY</span>
                        </div>
                        <div className="iframe-container" ref={containerRef}>
                            <iframe
                                src={embedUrl}
                                frameBorder="0"
                                allowFullScreen
                                title={`${magazine.coverName} - ${magazine.date}`}
                            />
                            {/* Overlay to prevent double-click zoom */}
                            <div
                                className="iframe-overlay"
                                style={{ pointerEvents: blockInteraction ? 'all' : 'none' }}
                            />
                        </div>
                        {/* Navigation Controls */}
                        <div className="viewer-controls">
                            <div className="navigation-instructions mono">
                                <div className="instruction-row">
                                    <svg className="instruction-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                    <span className="green-text">CLICK INSIDE VIEWER FIRST</span>
                                    <span className="dim-text">→ Then use arrow keys ← → to navigate pages</span>
                                </div>
                            </div>

                            <a
                                href={magazine.archiveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="control-btn primary mono"
                            >
                                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                OPEN FULL VIEWER
                            </a>
                        </div>
                    </section>
                </div>

                {/* Centered Content Wrapper for Details */}
                <div className="slug-content-wrapper">
                    {/* Details & Video Grid */}
                    <section className="info-grid">
                        {/* Left: Magazine Details */}
                        <article className="details-panel">
                            <div className="mono label green-text">
                                {magazine.issueNumber ? `// CLASSIFIED FILE ${magazine.issueNumber}` : '// CLASSIFIED FILE'}
                            </div>
                            <h1>{magazine.coverName}</h1>

                            <div className="meta-row mono">
                                <div className="meta-item">
                                    <span className="label">DATE OF ORIGIN</span>
                                    <span className="value">{magazine.date}</span>
                                </div>
                                {magazine.publisher && (
                                    <div className="meta-item">
                                        <span className="label">PUBLISHER</span>
                                        <span className="value">{magazine.publisher}</span>
                                    </div>
                                )}
                                {magazine.pageCount && (
                                    <div className="meta-item">
                                        <span className="label">PAGES</span>
                                        <span className="value">{magazine.pageCount}</span>
                                    </div>
                                )}
                            </div>

                            {magazine.coverAnalysis && (
                                <div className="blurb-box">
                                    <h3 className="mono blurb-title">&gt;&gt; COVER ANALYSIS</h3>
                                    <p className="blurb-text">{magazine.coverAnalysis}</p>
                                </div>
                            )}

                            {magazine.issueContents && (
                                <div className="blurb-box">
                                    <h3 className="mono blurb-title">&gt;&gt; ISSUE CONTENTS</h3>
                                    <p className="blurb-text">{magazine.issueContents}</p>
                                </div>
                            )}
                        </article>

                        {/* Right: Video Panel */}
                        {magazine.youtubeVideoId && (
                            <aside className="video-panel">
                                <div className="mono blue-text video-header">
                                    :: VIDEO DEBRIEF
                                </div>

                                <div className="video-wrapper">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${magazine.youtubeVideoId}`}
                                        title={magazine.youtubeVideoTitle || 'Magazine Video'}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>

                                <div className="video-actions">
                                    <h3 className="mono video-title">
                                        {magazine.youtubeVideoTitle || 'DEEP DIVE'}
                                    </h3>
                                    {magazine.youtubeVideoDescription && (
                                        <p className="video-description">{magazine.youtubeVideoDescription}</p>
                                    )}
                                    <a
                                        href={`https://www.youtube.com/watch?v=${magazine.youtubeVideoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="yt-btn mono"
                                    >
                                        WATCH ON YOUTUBE_ [EXT] ↗
                                    </a>
                                </div>
                            </aside>
                        )}
                    </section>
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
