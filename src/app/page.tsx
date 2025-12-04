import type { Metadata } from "next";
import Link from "next/link";
import TextScramble from "@/components/ui/TextScramble";
import SearchTerminal from "@/components/ui/SearchTerminal";
import magazineData from "@/data/magazines.json";
import { generateSEOMetadata, generateWebSiteSchema } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "PROJECT: ZETA // 2025",
  description:
    "Browse our expanding archive of vintage UFO magazines and if you've got an issue we don't, help us keep the collection alive!",
  path: "/",
});

export default function Home() {
  const websiteSchema = generateWebSiteSchema();

  return (
    <main className="flex flex-col justify-start px-[10vw] relative overflow-hidden pt-24">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* HERO SECTION */}
      <section className="flex flex-col justify-start relative pb-0">

        <div className="hero-title-container flex flex-row items-center gap-8 relative z-10">
          <h1 className="hero-title text-[8vw] font-bold">
            <TextScramble text="THEY ARE" className="block" />
            <TextScramble
              text="WATCHING"
              className="block gradient-text"
            />
            <TextScramble text="YOU" hoverText="THEM" className="block" />
          </h1>

          {/* Modern Gradient ASCII Art */}
          <pre
            className="font-mono text-[10px] leading-[10px] text-white/10 pointer-events-none select-none hidden lg:block"
            id="ascii-ufo"
          >
            {`
        _.---._
      .'       '.
  _.-~===========~-._
 (___________________)
       \\_______/
        |     |
        |     |
      _/       \\_
     /           \\
          `}
          </pre>
        </div>

        <p className="hero-description text-[#888] max-w-[1200px] mb-0 relative z-10">
          Browse our expanding archive of vintage UFO magazines and if you have an issue we’re missing, help us keep the collection alive!
        </p>
        <div className="w-full relative z-10">
          <SearchTerminal magazines={magazineData.magazines} />
        </div>
      </section>

      {/* DATA SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="glass-card p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:left-[100%]" />
          <div className="mono mb-4">FILE: 89-XJ</div>
          <h3 className="text-4xl mb-4 font-bold">ROSWELL RELOADED</h3>
          <p className="text-[#888] leading-relaxed">
            New telemetry data suggests the 1947 crash was a deliberate seeding
            event. Nano-biological evidence recovered.
          </p>
        </div>
        <div className="pl-0 md:pl-8">
          <div className="mono text-[var(--cyber-blue)] mb-4">
            :: SYSTEM ANALYSIS
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            THE TRUTH IS <br />
            <span className="gradient-text">DIGITAL</span>
          </h2>
          <p className="text-lg text-[#888] leading-relaxed mb-8 max-w-[600px]">
            Advanced cloaking technology renders them invisible to the naked eye,
            but not to our custom kernel sensors. View the raw data feed.
          </p>
          <Link href="/magazines" className="btn-cyber">
            ACCESS TERMINAL
          </Link>
        </div>
      </section>

      <footer className="py-16 border-t border-white/10 flex justify-between items-end">
        <div>
          <div className="mono text-sm text-[#888]">COORDINATES</div>
          <div className="font-mono text-2xl mt-2">51.23N, 30.21W</div>
        </div>
        <div className="mono text-right text-sm text-[#888]">
          &copy; 2025 ZETA PROJECT <br /> NO ESCAPE
        </div>
      </footer>
    </main>
  );
}
