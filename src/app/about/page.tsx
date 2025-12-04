import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';
import Background from '@/components/Background';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About',
  description: 'Learn about OLD UFO MAGS, a non-profit digital archive dedicated to preserving vintage UFO magazines from the 1990s.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <Background>
      <div className="about-page">
        <div className="about-container">
          {/* Mission Log */}
          <div className="dossier-card">
            <h2 className="dossier-header">:: MISSION LOG</h2>
            <h3 className="dossier-title">Our Mission</h3>
            <p className="dossier-text">
              OLD UFO MAGS is a non-profit digital archive project dedicated to preserving and sharing vintage UFO magazines from the 1990s.
            </p>
            <ul className="mission-list">
              <li>Preserve rare and out-of-print UFO publications</li>
              <li>Make historical UFO research accessible to everyone</li>
              <li>Celebrate the golden age of UFO investigation and reporting</li>
            </ul>
          </div>

          {/* Legal Protocol */}
          <div className="dossier-card">
            <h2 className="dossier-header orange">:: LEGAL PROTOCOL</h2>
            <h3 className="dossier-title">Copyright & Usage</h3>
            <p className="dossier-text">
              This is a non-profit educational project. All magazines are from the 1990s and are hosted on the Internet Archive.
            </p>
            <p className="dossier-text">
              We respect copyright and intellectual property rights. If you are a copyright holder and have concerns about any content, please contact us.
            </p>
          </div>

          {/* Uplink Partner */}
          <div className="dossier-card">
            <h2 className="dossier-header">:: UPLINK PARTNER</h2>
            <h3 className="dossier-title">Internet Archive Partnership</h3>
            <p className="dossier-text">
              All magazine content is hosted on the Internet Archive, a non-profit library of millions of free books, movies, software, music, websites, and more.
            </p>
            <p className="dossier-text">
              By partnering with the Internet Archive, we ensure that these historical documents are preserved for future generations.
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
