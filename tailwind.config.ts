import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'cyber-blue': '#00f3ff',
        'void-black': '#050505',
        'deep-space': '#0a0a0f',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
