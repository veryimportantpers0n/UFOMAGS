'use client';

import { useRouter } from 'next/navigation';
import Background from '@/components/Background';
import MagazineCard from '@/components/MagazineCard';
import magazineData from '@/data/magazines.json';
import type { Magazine } from '@/types/magazine';

export default function MagazinesClient() {
  const router = useRouter();
  const magazines: Magazine[] = magazineData.magazines;

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
              RECORDS FOUND: [{magazines.length}] // DECRYPTING...
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

            {/* Coming Soon Locked Cards - Add 3 placeholders */}
            <MagazineCard
              magazine={{
                id: 'locked-1',
                coverName: 'Data Corrupted',
                slug: '',
                issueNumber: '???',
                date: '??? ????',
                description: 'This file is currently being digitized. Uplink pending. Check back for decryption key later.',
                coverImage: '',
                archiveUrl: '',
                customText: '',
              } as Magazine}
              onClick={() => { }}
              isLocked={true}
            />
            <MagazineCard
              magazine={{
                id: 'locked-2',
                coverName: 'Data Corrupted',
                slug: '',
                issueNumber: '???',
                date: '??? ????',
                description: 'This file is currently being digitized. Uplink pending. Check back for decryption key later.',
                coverImage: '',
                archiveUrl: '',
                customText: '',
              } as Magazine}
              onClick={() => { }}
              isLocked={true}
            />
            <MagazineCard
              magazine={{
                id: 'locked-3',
                coverName: 'Data Corrupted',
                slug: '',
                issueNumber: '???',
                date: '??? ????',
                description: 'This file is currently being digitized. Uplink pending. Check back for decryption key later.',
                coverImage: '',
                archiveUrl: '',
                customText: '',
              } as Magazine}
              onClick={() => { }}
              isLocked={true}
            />
          </div>
        </div>
      </div>
    </Background>
  );
}
