'use client';

import { useRouter } from 'next/navigation';
import Background from '@/components/Background';
import MagazineCard from '@/components/MagazineCard';
import magazineData from '@/data/magazines.json';
import type { Magazine } from '@/types/magazine';

// Helper function to extract year from date string (e.g., "Nov/Dec 1997" -> 1997)
const getYearFromDate = (dateStr: string): number => {
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
};

export default function MagazinesClient() {
  const router = useRouter();

  // Sort magazines by date (newest first)
  const magazines: Magazine[] = [...magazineData.magazines].sort((a, b) => {
    return getYearFromDate(b.date) - getYearFromDate(a.date);
  });

  const handleMagazineClick = (slug: string) => {
    router.push(`/magazine/${slug}`);
  };

  return (
    <Background>
      <div className="magazines-page">
        <div className="magazines-container">
          {/* Header */}
          <header className="magazines-header">
            <div className="header-title">
              <div className="mono magazine-subtitle">:: DATABASE ACCESS</div>
              <h1 className="magazine-page-title">MAGAZINE ARCHIVE</h1>
            </div>
            <div className="mono magazine-count">
              ARCHIVED PUBLICATIONS: [{magazines.length}]
            </div>
          </header>

          {/* Magazine Grid */}
          <div className="mag-grid">
            {magazines.map((magazine) => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
                onClick={() => handleMagazineClick(magazine.slug)}
                isLocked={false}
              />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
}
