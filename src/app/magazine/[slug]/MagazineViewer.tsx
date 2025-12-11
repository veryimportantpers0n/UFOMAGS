'use client';

import Link from 'next/link';
import Background from '@/components/Background';
import { generateCreativeWorkSchema } from '@/lib/seo';
import magazinesData from '@/data/magazines.json';
import './MagazineViewer.css';

interface MagazineViewerProps {
    magazine: typeof magazinesData.magazines[0];
}

export default function MagazineViewer({ magazine }: MagazineViewerProps) {
    // Extract archive ID from URL for embed
    const archiveId = magazine.archiveUrl.split('/').pop() || '';
    const embedUrl = `https://archive.org/embed/${archiveId}`;

    // Generate JSON-LD structured data
    const structuredData = generateCreativeWorkSchema(magazine);

    return (
        <Background>
            <div className="magazine-slug-page" data-page="magazine-slug">
                {/* Navigation removed and integrated into viewer header */}

                {/* Full-width Viewer Container */}
                <div className="slug-container">
                    {/* Internet Archive Viewer */}
                    <section className="viewer-frame">
                        <div className="viewer-header mono">
                            <Link href="/magazines" className="green-text hover:text-cyan-400 no-underline transition-colors duration-200">
                                &lt; RETURN TO ARCHIVE
                            </Link>
                            <span>EMBED VIEWER</span>
                        </div>

                        {/* Iframe container with blocker to prevent zoom issues */}
                        <div className="iframe-container">
                            <iframe
                                src={embedUrl}
                                frameBorder="0"
                                allowFullScreen
                                title={`${magazine.coverName} - ${magazine.date}`}
                                className="viewer-iframe"
                            />
                            {/* Overlay to block double-click zoom - allows single clicks through */}
                            <div className="iframe-blocker" />
                        </div>

                        {/* Important: Direct user to Full Viewer for best experience */}
                        <div className="viewer-notice">
                            <div className="notice-content mono">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    <strong className="green-text">NOTICE:</strong> All archives are hosted via Internet Archive for copyright preservation.
                                    The embedded uplink can be unstable - if issues persist, please reset or
                                    <span className="green-text"> OPEN FULL VIEWER</span>.
                                </span>
                                <a
                                    href={magazine.archiveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="open-full-btn"
                                >
                                    OPEN FULL VIEWER →
                                </a>
                            </div>
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
