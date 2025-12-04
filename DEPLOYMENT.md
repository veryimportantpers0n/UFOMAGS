# Cloudflare Pages Deployment Guide

This document provides detailed instructions for deploying OLD UFO MAGS to Cloudflare Pages.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Cloudflare account (free tier is sufficient)
- Node.js 18+ installed locally for testing

## Deployment Configuration

### Build Settings

The project is configured for static export with the following settings:

**Framework**: Next.js  
**Build Command**: `npm run build`  
**Build Output Directory**: `out`  
**Node Version**: 18 or higher

### Next.js Configuration

The project includes the following configuration in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',              // Enables static export
  images: {
    unoptimized: true,           // Required for static hosting
  },
  trailingSlash: true,           // Better compatibility with static hosts
};
```

This configuration ensures:
- All pages are pre-rendered as static HTML
- No server-side rendering or API routes
- Images work without Next.js image optimization server
- URLs work correctly on static hosts

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"

# Push to your remote repository
git push origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your Git provider (GitHub, GitLab, or Bitbucket)
5. Authorize Cloudflare to access your repositories
6. Select the OLD UFO MAGS repository

### 3. Configure Build Settings

On the build configuration page, enter:

```
Project name: old-ufo-mags (or your preferred name)
Production branch: main (or master)
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: (leave empty)
```

### 4. Environment Variables (Optional)

Add environment variables if needed:

| Variable | Value | Purpose |
|----------|-------|---------|
| NODE_VERSION | 18 | Ensures correct Node.js version |
| NPM_FLAGS | --legacy-peer-deps | If dependency conflicts occur |

To add environment variables:
1. Scroll to "Environment variables" section
2. Click "Add variable"
3. Enter variable name and value
4. Click "Save"

### 5. Deploy

1. Review your settings
2. Click **Save and Deploy**
3. Wait for the build to complete (typically 2-5 minutes)
4. Your site will be available at `https://[project-name].pages.dev`

## Automatic Deployments

Cloudflare Pages automatically deploys when you push to your repository:

### Production Deployments
- Triggered by pushes to your production branch (main/master)
- Deploys to your main domain
- Example: `https://old-ufo-mags.pages.dev`

### Preview Deployments
- Triggered by pushes to any other branch
- Each branch gets a unique preview URL
- Example: `https://[branch-name].old-ufo-mags.pages.dev`

### Pull Request Previews
- Automatically created for pull requests
- Allows testing changes before merging
- Comment with preview URL is added to PR

## Custom Domain Setup

### Adding a Custom Domain

1. In Cloudflare Pages dashboard, go to your project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain name (e.g., `oldufomags.com`)
5. Follow the instructions to:
   - Add DNS records (if domain is on Cloudflare)
   - Or update nameservers (if domain is elsewhere)
6. Wait for DNS propagation (can take up to 24 hours)
7. SSL certificate is automatically provisioned

### Domain Configuration Options

**Apex Domain**: `oldufomags.com`
- Add CNAME record pointing to your Pages project

**Subdomain**: `www.oldufomags.com`
- Add CNAME record pointing to your Pages project

**Both**:
- Set up both and configure redirect from one to the other

## Build Verification

### Pre-Deployment Checklist

Before deploying, verify locally:

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# Visit http://localhost:3000 and test all pages

# 3. Build for production
npm run build

# 4. Check build output
ls -la out/
# Verify all expected files are present

# 5. Test static export locally
npx serve out
# Visit http://localhost:3000 and test all pages
```

### What to Test

- [ ] Homepage loads with background animation
- [ ] Search functionality works
- [ ] Magazine listing page displays all magazines
- [ ] Individual magazine pages load correctly
- [ ] Internet Archive embeds work
- [ ] Navigation between pages works
- [ ] About and Socials pages load
- [ ] All images load correctly
- [ ] No console errors
- [ ] SEO metadata is present (check page source)

## Troubleshooting

### Build Fails

**Error: Node version too old**
```
Solution: Add NODE_VERSION environment variable set to 18 or higher
```

**Error: Module not found**
```
Solution: Ensure all dependencies are in package.json
Run: npm install
Commit: package-lock.json
```

**Error: Build timeout**
```
Solution: Check for infinite loops or heavy computations during build
Review: generateStaticParams() functions
```

### Images Not Loading

**Problem**: Images return 404 errors

```
Solution:
1. Verify images are in /public directory
2. Check paths start with / (e.g., /covers/image.jpg)
3. Confirm images.unoptimized: true in next.config.ts
4. Rebuild and redeploy
```

### Pages Return 404

**Problem**: Dynamic routes return 404

```
Solution:
1. Verify output: 'export' in next.config.ts
2. Check generateStaticParams() is implemented
3. Ensure trailingSlash: true is set
4. Rebuild and redeploy
```

### Three.js Backgrounds Not Working

**Problem**: Homepage shows fallback gradient instead of animation

```
Solution:
1. Check browser console for JavaScript errors
2. Verify Three.js scripts are in /public/backgrounds/
3. Test locally with: npx serve out
4. Ensure scripts are properly exported
5. Check that fallback gradient displays (this is expected behavior if Three.js fails)
```

### Slow Build Times

**Problem**: Builds take longer than 5 minutes

```
Solution:
1. Check for large files in /public directory
2. Optimize images before adding to project
3. Review dependencies for unnecessary packages
4. Consider using Cloudflare's build cache
```

## Monitoring and Analytics

### Build Logs

Access build logs in Cloudflare Pages dashboard:
1. Go to your project
2. Click **Deployments** tab
3. Click on any deployment
4. View build logs and errors

### Deployment History

View all deployments:
1. Go to **Deployments** tab
2. See list of all production and preview deployments
3. Rollback to previous deployment if needed

### Performance Monitoring

Monitor site performance:
1. Use Cloudflare Analytics (in dashboard)
2. Run Lighthouse audits regularly
3. Check Core Web Vitals
4. Monitor page load times

## Updating the Site

### Adding New Magazines

```bash
# 1. Add cover image to /public/covers/
cp new-magazine.jpg public/covers/

# 2. Update magazines.json
# Add new entry to src/data/magazines.json

# 3. Test locally
npm run dev

# 4. Build and verify
npm run build

# 5. Commit and push
git add .
git commit -m "Add new magazine: [name]"
git push origin main

# 6. Cloudflare automatically deploys
# Check deployment status in dashboard
```

### Updating Content

```bash
# 1. Make changes to components, pages, or content
# 2. Test locally
npm run dev

# 3. Build and verify
npm run build

# 4. Commit and push
git add .
git commit -m "Update [description]"
git push origin main

# 5. Automatic deployment triggered
```

## Performance Optimization

### Current Configuration

The site is optimized for Cloudflare's CDN:

- **Static HTML/CSS/JS**: All files pre-rendered
- **Automatic Caching**: Cloudflare caches static assets
- **Global CDN**: Content served from nearest edge location
- **HTTP/2 & HTTP/3**: Automatic protocol upgrades
- **Brotli Compression**: Automatic compression

### Expected Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

### Optimization Tips

1. **Images**: Compress before adding to /public/covers/
2. **Backgrounds**: Keep Three.js scripts optimized
3. **Dependencies**: Remove unused packages
4. **Code Splitting**: Automatic with Next.js App Router
5. **Lazy Loading**: Implemented for magazine covers

## Security

### Automatic Security Features

Cloudflare Pages provides:
- **Free SSL/TLS**: Automatic HTTPS
- **DDoS Protection**: Built-in protection
- **WAF**: Web Application Firewall (on paid plans)
- **Bot Protection**: Automatic bot detection

### Best Practices

1. Keep dependencies updated
2. Review security advisories
3. Use environment variables for sensitive data (if any)
4. Enable Cloudflare security features
5. Monitor access logs

## Cost

### Cloudflare Pages Free Tier

- **Builds**: 500 builds per month
- **Bandwidth**: Unlimited
- **Requests**: Unlimited
- **Custom Domains**: Unlimited
- **SSL Certificates**: Free

This is more than sufficient for OLD UFO MAGS.

### Paid Plans (Optional)

If you need more:
- **Pro**: $20/month - More builds, advanced features
- **Business**: $200/month - Priority support, enhanced security

## Support and Resources

### Documentation
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Community](https://community.cloudflare.com/)

### Getting Help
1. Check Cloudflare Pages documentation
2. Review build logs for errors
3. Test locally before deploying
4. Ask in Cloudflare Community forums
5. Contact Cloudflare support (paid plans)

## Rollback Procedure

If a deployment has issues:

1. Go to Cloudflare Pages dashboard
2. Navigate to **Deployments** tab
3. Find the last working deployment
4. Click **...** menu → **Rollback to this deployment**
5. Confirm rollback
6. Site reverts to previous version immediately

## Maintenance

### Regular Tasks

**Weekly**:
- Check deployment status
- Review analytics
- Monitor performance

**Monthly**:
- Update dependencies: `npm update`
- Run security audit: `npm audit`
- Review and optimize images
- Check for broken links

**As Needed**:
- Add new magazines
- Update content
- Fix bugs
- Improve features

## Conclusion

OLD UFO MAGS is now ready for deployment to Cloudflare Pages. The static export configuration ensures fast, reliable hosting with minimal maintenance.

For questions or issues, refer to the troubleshooting section or consult the Cloudflare Pages documentation.

Happy deploying! 🛸
