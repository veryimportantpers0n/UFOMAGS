import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo';
import Background from '@/components/Background';
import SocialLink from '@/components/SocialLink';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Socials',
  description: 'Follow OLD UFO MAGS for updates on new magazine additions, UFO history, and more.',
  path: '/socials',
});

export default function SocialsPage() {
  return (
    <Background>
      <div className="socials-page">
        <div className="links-container">
          <SocialLink
            platform="twitter"
            url="https://twitter.com/oldufomags"
            description="Follow us for magazine updates, UFO history facts, and community discussions."
          />

          <SocialLink
            platform="youtube"
            url="https://youtube.com/@oldufomags"
            description="Video tours of rare magazines, deep dives into 90s UFO culture, and interviews."
          />

          <SocialLink
            platform="discord"
            url="https://discord.gg/oldufomags"
            description="Join our community to discuss vintage UFO magazines, share discoveries, and connect."
          />
        </div>
      </div>
    </Background>
  );
}
