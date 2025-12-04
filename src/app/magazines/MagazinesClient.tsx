'use client';

import { useRouter } from 'next/navigation';
import Background from '@/components/Background';
import MagazineCard from '@/components/MagazineCard';
import magazineData from '@/data/magazines.json';
import type { Magazine } from '@/types/magazine';
import TextScramble from '@/components/ui/TextScramble';

export default function MagazinesClient() {
  const router = useRouter();
  const magazines: Magazine[] = magazineData.magazines;

  const handleMagazineClick = (slug: string) => {
    router.push(`/magazine/${slug}`);
  };

  return (
    <Background>
      <main className="page-container">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12">
            <div className="mono mb-4">:: CLASSIFIED ARCHIVES</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <TextScramble text="MAGAZINE" className="block" />
              <TextScramble text="ARCHIVE" className="block gradient-text" />
            </h1>
            <p className="text-lg text-[#888] max-w-2xl">
              Browse our complete collection of vintage UFO magazines. Click any
              cover to start reading.
            </p>
          </div>

          <div className="mono mb-6">:: {magazines.length} FILES RECOVERED</div>

          {/* Magazine Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {magazines.map((magazine) => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
                onClick={() => handleMagazineClick(magazine.slug)}
              />
            ))}
          </div>

          {/* Empty State */}
          {magazines.length === 0 && (
            <div className="glass-card p-12 text-center">
              <div className="mono mb-4">:: NO SIGNAL</div>
              <p className="text-[#888] text-lg">
                No magazines available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </Background>
  );
}
