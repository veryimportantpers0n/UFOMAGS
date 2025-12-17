'use client';

import Image from 'next/image';

interface HoloIconProps {
    src: string;
    alt: string;
    className?: string;
    color?: string; // Optional hex color to override filter if needed (requires more complex CSS)
}

export default function HoloIcon({ src, alt, className = '', color = '#00ff88' }: HoloIconProps) {
    return (
        <div className={`holo-container ${className}`}>
            <div className="holo-icon-wrapper">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="holo-icon-img"
                    style={{
                        filter: `drop-shadow(0 0 8px ${color})`,
                    }}
                />
            </div>
        </div>
    );
}
