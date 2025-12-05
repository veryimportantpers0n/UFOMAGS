import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { generateSEOMetadata } from "@/lib/seo";
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

export const metadata: Metadata = generateSEOMetadata({
  title: "PROJECT: ZETA // 2025",
  description:
    "The signal has been intercepted. We are not alone in the void. Welcome to the final frontier of truth.",
  path: "/",
});

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
