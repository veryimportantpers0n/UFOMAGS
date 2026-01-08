# Setup Next.js Site for Cloudflare Pages Static Hosting

**INSTRUCTIONS FOR AI:** Follow these steps to configure an existing Next.js project for static export and Cloudflare Pages deployment.

---

## Step 1: Update `next.config.ts` (or `next.config.mjs`)

Open the Next.js config file and ensure it has static export enabled:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**CRITICAL:** 
- `output: 'export'` MUST be present - this enables static site generation
- `images.unoptimized: true` MUST be present - Next.js image optimization requires a server and won't work on static hosts

---

## Step 2: Create `wrangler.jsonc`

Create a file called `wrangler.jsonc` in the project root with this content:

```jsonc
{
    "name": "PROJECT_NAME_HERE",
    "compatibility_date": "2025-12-25",
    "assets": {
        "directory": "./out",
        "not_found_handling": "404-page"
    }
}
```

**Replace `PROJECT_NAME_HERE`** with a lowercase, hyphenated project name (e.g., `my-new-site`).

---

## Step 3: Verify `package.json` Scripts

Ensure these scripts exist in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

The `build` script must be `next build` - with `output: 'export'` in the config, this will automatically generate the `./out` folder.

---

## Step 4: Check for Incompatible Features

**SCAN THE ENTIRE CODEBASE** for these incompatible features that will break static export:

### ❌ Remove or Refactor These:

| Pattern to Search | Problem | Fix |
|-------------------|---------|-----|
| `app/api/` folder | API routes don't work | Remove or use external API |
| `cookies()` | Server-only function | Remove or use client-side cookies |
| `headers()` | Server-only function | Remove |
| `revalidate` | ISR not supported | Remove, use full rebuild |
| `dynamic = 'force-dynamic'` | Forces SSR | Remove |
| `next/headers` import | Server-only | Remove |
| `unstable_cache` | Server-only | Remove |

### ✅ These Are Fine:
- `'use client'` components
- Client-side `fetch()` in `useEffect`
- Static data imports from JSON/TS files
- `generateStaticParams()` for dynamic routes
- `generateMetadata()` for SEO

---

## Step 5: Add `generateStaticParams()` to Dynamic Routes

**For every file matching `app/**/[slug]/page.tsx` or `app/**/[id]/page.tsx`:**

Add a `generateStaticParams()` function that returns all possible values:

```typescript
// Example: app/guides/[slug]/page.tsx

import { guidesData } from '@/data/guides';

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  // ... component code
}
```

**Every dynamic route segment MUST have this function**, or the build will fail.

---

## Step 6: Ensure Static Assets Are in `/public`

All static files should be in the `/public` folder:
- `/public/images/` - All images
- `/public/favicon.ico` - Favicon
- `/public/robots.txt` - SEO robots file
- `/public/sitemap.xml` - Sitemap (or generate dynamically at build)

These get copied directly to `./out` during build.

---

## Step 7: Create a 404 Page

Ensure `app/not-found.tsx` exists for the 404 page:

```typescript
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}
```

This generates `404.html` in the output.

---

## Step 8: Test the Build Locally

Run these commands to verify everything works:

```bash
# Install dependencies
npm install

# Run the build
npm run build
```

**CHECK FOR:**
1. Build completes without errors
2. `./out` folder is created
3. `./out/index.html` exists
4. All expected pages have folders in `./out`

---

## Step 9: Add to `.gitignore`

Ensure these are in `.gitignore`:

```
# dependencies
/node_modules

# next.js build output
/.next
/out

# misc
.DS_Store
*.pem
.env*.local
```

The `./out` folder should NOT be committed - Cloudflare builds it fresh.

---

## Step 10: Cloudflare Pages Settings

When connecting to Cloudflare Pages, use these settings:

| Setting | Value |
|---------|-------|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (or subfolder if monorepo) |
| Node.js version | 18.x or 20.x |

---

## Verification Checklist

Before considering setup complete, verify:

- [ ] `next.config.ts` has `output: 'export'`
- [ ] `next.config.ts` has `images.unoptimized: true`
- [ ] `wrangler.jsonc` exists with correct `assets.directory: "./out"`
- [ ] No `app/api/` routes exist
- [ ] No server-only functions (`cookies()`, `headers()`) are used
- [ ] All `[slug]` dynamic routes have `generateStaticParams()`
- [ ] `npm run build` completes successfully
- [ ] `./out` folder contains `index.html`
- [ ] `./out` folder contains `404.html`
- [ ] All expected pages exist in `./out` as folders with `index.html`

---

## Common Build Errors and Fixes

### Error: "Page with `dynamic = 'error'` couldn't be rendered statically"
**Fix:** Add `generateStaticParams()` to the dynamic route.

### Error: "You're importing a component that needs `cookies`"
**Fix:** Remove the `cookies()` call or make it client-side only.

### Error: "Export encountered errors on following paths"
**Fix:** Check each listed path for server-only code.

### Error: "`next/image` Un-configured Host"
**Fix:** Either add the host to `next.config.ts` images.remotePatterns, or use regular `<img>` tags.

---

## After Setup

Once complete, the site can be deployed by:

1. **GitHub Integration:** Push to GitHub, Cloudflare auto-builds
2. **Manual:** Run `npm run build` then `wrangler deploy`

The site will be served as pure static HTML/CSS/JS with no server.
