'use client';

import { useEffect, useRef, useState } from 'react';

// Extend Window interface for BookReader and jQuery
declare global {
    interface Window {
        BookReader: any;
        jQuery: any;
    }
}

interface FullBookReaderProps {
    archiveId: string;
    title?: string;
    height?: string;
}

export default function FullBookReader({ archiveId, title, height = '80vh' }: FullBookReaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const readerRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const initializeReader = () => {
            if (!containerRef.current || !window.BookReader) return;

            try {
                // Create BookReader instance with full UI
                const br = new window.BookReader({
                    ui: 'full',
                    el: '#BookReaderContainer',
                    bookTitle: title || archiveId,
                    data: {
                        itemId: archiveId
                    },
                    // Enable all features
                    enableMobileNav: true,
                    enableSearch: false, // Search requires additional setup
                    showToolbar: true,
                    showNavbar: true,
                    autoResize: true,
                });

                br.init();
                readerRef.current = br;

                if (isMounted) {
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('BookReader initialization error:', err);
                if (isMounted) {
                    setError('Failed to initialize BookReader');
                    setIsLoading(false);
                }
            }
        };

        const loadBookReader = async () => {
            // Check if BookReader is already loaded
            if (window.BookReader) {
                initializeReader();
                return;
            }

            try {
                // Load CSS first
                const existingLink = document.querySelector('link[href*="BookReader.css"]');
                if (!existingLink) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://archive.org/bookreader/BookReader.css';
                    document.head.appendChild(link);
                }

                // Load jQuery (required by BookReader)
                const existingJQuery = document.querySelector('script[src*="jquery"]');
                if (!existingJQuery && !window.jQuery) {
                    await new Promise<void>((resolve, reject) => {
                        const jqueryScript = document.createElement('script');
                        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                        jqueryScript.onload = () => resolve();
                        jqueryScript.onerror = () => reject(new Error('Failed to load jQuery'));
                        document.body.appendChild(jqueryScript);
                    });
                }

                // Load BookReader JS
                const existingScript = document.querySelector('script[src*="BookReader.js"]');
                if (!existingScript) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://archive.org/bookreader/BookReader.js';
                        script.onload = () => resolve();
                        script.onerror = () => reject(new Error('Failed to load BookReader'));
                        document.body.appendChild(script);
                    });
                }

                // Small delay to ensure scripts are fully initialized
                await new Promise(resolve => setTimeout(resolve, 100));

                if (isMounted) {
                    initializeReader();
                }
            } catch (err) {
                console.error('Script loading error:', err);
                if (isMounted) {
                    setError('Failed to load BookReader scripts');
                    setIsLoading(false);
                }
            }
        };

        loadBookReader();

        // Cleanup
        return () => {
            isMounted = false;
            if (readerRef.current) {
                try {
                    // BookReader doesn't have a standard destroy method,
                    // but we can clean up the container
                    if (containerRef.current) {
                        containerRef.current.innerHTML = '';
                    }
                } catch (e) {
                    console.error('BookReader cleanup error:', e);
                }
                readerRef.current = null;
            }
        };
    }, [archiveId, title]);

    if (error) {
        return (
            <div
                className="bookreader-error"
                style={{
                    width: '100%',
                    height,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1a1a1a',
                    color: '#ff4444',
                    fontFamily: 'monospace'
                }}
            >
                <p>⚠ {error}</p>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
                    Falling back to external viewer...
                </p>
                <a
                    href={`https://archive.org/details/${archiveId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        border: '1px solid #00f3ff',
                        color: '#00f3ff',
                        textDecoration: 'none'
                    }}
                >
                    Open on Internet Archive →
                </a>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height, position: 'relative' }}>
            {isLoading && (
                <div
                    className="bookreader-loading"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0a0a0a',
                        color: '#00ff41',
                        fontFamily: 'monospace',
                        zIndex: 10
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                            :: LOADING ARCHIVE VIEWER ::
                        </div>
                        <div style={{
                            width: '200px',
                            height: '2px',
                            background: '#333',
                            borderRadius: '1px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '50%',
                                height: '100%',
                                background: '#00ff41',
                                animation: 'loadingBar 1.5s ease-in-out infinite'
                            }} />
                        </div>
                    </div>
                </div>
            )}
            <div
                id="BookReaderContainer"
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#000'
                }}
            />
            <style jsx>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
        </div>
    );
}
