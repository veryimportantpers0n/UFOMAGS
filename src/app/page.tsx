import type { Metadata } from "next";
import HeroTitle from "@/components/ui/HeroTitle";
import SearchTerminal from "@/components/ui/SearchTerminal";
import magazineData from "@/data/magazines.json";
import { generateSEOMetadata, generateWebSiteSchema } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Vintage UFO Magazine Archive",
  description:
    "Browse our expanding archive of vintage British UFO magazines and if you've got an issue we don't, help us keep the collection alive!",
  path: "/",
});

export default function Home() {
  const websiteSchema = generateWebSiteSchema();

  return (
    <main className="home-page">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="home-container">
        <HeroTitle />

        <p className="home-description">
          Browse our expanding archive of vintage British UFO magazines and if you have an issue we're missing, help us keep the collection alive!
        </p>

        <div className="home-search">
          <SearchTerminal magazines={magazineData.magazines} />
        </div>
      </div>
    </main>
  );
}
