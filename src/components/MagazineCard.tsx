'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Magazine } from '@/types/magazine';
import HoloIcon from './HoloIcon';

interface MagazineCardProps {
  magazine: Magazine;
  onClick: () => void;
  isLocked?: boolean;
}

export default function MagazineCard({ magazine, onClick, isLocked = false }: MagazineCardProps) {
  const [imageError, setImageError] = useState(false);

  if (isLocked) {
    return (
      <article className="mag-card locked">
        <div className="img-wrapper">
          {/* Lock Overlay */}
          <div className="lock-overlay">
            <div className="lock-icon">🔒</div>
            <div className="mono lock-text">CLASSIFIED</div>
          </div>
          <img
            src="https://placehold.co/600x800/220000/555?text=ENCRYPTED"
            alt="Classified Magazine"
          />
        </div>
        <div className="content">
          <div>
            <span className="mono meta-tag" style={{ color: '#666' }}>
              ISSUE #{magazine.issueNumber} // {magazine.date}
            </span>
            <h3 className="mag-title" style={{ color: '#888' }}>
              {magazine.coverName}
            </h3>
            <p className="mag-desc" style={{ color: '#555' }}>
              {magazine.description}
            </p>
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--locked-red)' }}>
            ACCESS DENIED
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="mag-card active"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${magazine.coverName}, ${magazine.date}`}
    >
      <div className="img-wrapper">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50%', height: '50%', position: 'relative' }}>
            <HoloIcon
              src="/icons/magazine.svg"
              alt="Magazine Hologram"
              color="#00adb5" // CYBER_BLUE
            />
          </div>
        </div>
      </div>
      <div className="content">
        <div>
          <span className="mono meta-tag">
            ISSUE #{magazine.issueNumber} // {magazine.date}
          </span>
          <h3 className="mag-title">{magazine.coverName}</h3>
          <p className="mag-desc">{magazine.description}</p>
        </div>
        <div className="read-btn">ACCESS FILE</div>
      </div>
    </article>
  );
}
