'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Magazine } from '@/types/magazine';

interface MagazineCardProps {
  magazine: Magazine;
  onClick: () => void;
}

/**
 * MagazineCard component displays a magazine preview in grid layouts
 * Requirements: 6.2, 6.4, 6.5, 12.3, 14.3, 14.4, 14.5
 */
export default function MagazineCard({ magazine, onClick }: MagazineCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${magazine.coverName}, ${magazine.date} issue`}
      className="group cursor-pointer transition-all duration-300 hover:scale-105 
                 focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 
                 focus:ring-offset-black rounded-lg animate-fade-in"
    >
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-800 
                      hover:border-[#00ff41] group-focus:border-[#00ff41] 
                      transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff41]/20">
        {/* Cover Image with lazy loading and fallback */}
        <div className="relative aspect-[3/4] bg-gray-900">
          <Image
            src={imageError ? '/placeholder-cover.svg' : magazine.coverImage}
            alt={`Cover of ${magazine.coverName}, ${magazine.date} issue`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Metadata Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                        flex flex-col justify-end p-4">
          <h3 className="text-[#00ff41] font-bold text-base md:text-lg mb-1 glow-green">
            {magazine.coverName}
          </h3>
          <p className="text-gray-300 text-sm">{magazine.date}</p>
        </div>
      </div>

      {/* Metadata Below Card */}
      <div className="mt-3 px-1">
        <h3 className="text-gray-200 font-semibold text-sm md:text-base mb-1 
                       group-hover:text-[#00ff41] transition-colors duration-200">
          {magazine.coverName}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm">{magazine.date}</p>
      </div>
    </div>
  );
}
