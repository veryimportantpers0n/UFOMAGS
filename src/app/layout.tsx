import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { generateSEOMetadata, SITE_URL } from "@/lib/seo";
import { Scanlines, Noise } from "@/components/ui/Overlays";
import HomeBackground from "@/components/HomeBackground";
import Loader from "@/components/ui/Loader";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "400", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...generateSEOMetadata({
    title: "Vintage UFO Magazine Archive",
    description: "Explore vintage UFO magazines from the 1990s and beyond. A curated digital archive of classic UFO, alien, and paranormal publications.",
    path: "/",
  }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans bg-[var(--void-black)] text-[#e0e0e0] antialiased overflow-x-hidden`}
      >
        <Loader />
        <Scanlines />
        <Noise />

        <HomeBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
