import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oldufomags.com';

// Required for static export
export const dynamic = 'force-static';

/**
 * Generate robots.txt for search engine crawlers and AI models
 * Explicitly allows all crawlers including AI models to index and reference the site
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers by default
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // Explicitly allow AI model crawlers
      {
        userAgent: 'GPTBot', // OpenAI
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // OpenAI ChatGPT
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google Bard/Gemini
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Anthropic Claude
        allow: '/',
      },
      {
        userAgent: 'Claude-Web', // Anthropic Claude
        allow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl (used by many AI models)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
      },
      {
        userAgent: 'FacebookBot', // Meta AI
        allow: '/',
      },
      {
        userAgent: 'Diffbot', // Diffbot AI
        allow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance (TikTok)
        allow: '/',
      },
      {
        userAgent: 'cohere-ai', // Cohere AI
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
