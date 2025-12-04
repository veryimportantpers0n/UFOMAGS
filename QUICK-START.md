# Quick Start Guide

Get OLD UFO MAGS up and running in minutes.

## For Developers

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd old-ufo-mags

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Project Structure

```
/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── data/            # magazines.json
│   └── lib/             # Utilities
├── public/
│   ├── covers/          # Magazine cover images
│   └── backgrounds/     # Three.js backgrounds
└── out/                 # Build output (generated)
```

### Key Files

- `src/data/magazines.json` - Magazine data
- `next.config.ts` - Next.js configuration
- `README.md` - Full documentation
- `MAGAZINE-ENTRY-GUIDE.md` - How to add magazines
- `DEPLOYMENT.md` - Deployment instructions

## For Content Managers

### Adding a New Magazine

1. **Prepare the cover image**
   - Save to `/public/covers/`
   - Name it: `date-format.jpg` (e.g., `nov-dec-1997.jpg`)

2. **Upload to Internet Archive**
   - Visit [archive.org](https://archive.org)
   - Upload the magazine PDF
   - Copy the detail page URL

3. **Update magazines.json**
   - Open `/src/data/magazines.json`
   - Add new entry (see MAGAZINE-ENTRY-GUIDE.md)

4. **Test and deploy**
   ```bash
   npm run dev      # Test locally
   npm run build    # Build for production
   git push         # Auto-deploys to Cloudflare
   ```

See `MAGAZINE-ENTRY-GUIDE.md` for detailed instructions.

## For Site Owners

### Deploying to Cloudflare Pages

1. **Connect repository**
   - Log in to Cloudflare Dashboard
   - Go to Workers & Pages → Create
   - Connect your Git repository

2. **Configure build**
   - Build command: `npm run build`
   - Output directory: `out`
   - Framework: Next.js

3. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-5 minutes
   - Site live at `https://[project-name].pages.dev`

See `DEPLOYMENT.md` for detailed instructions.

### Customizing the Site

**Change homepage background:**
- Edit `/src/components/HomeBackground.tsx`
- Choose from 8 available backgrounds
- Or add your own to `/public/backgrounds/`

**Update site content:**
- About page: `/src/app/about/page.tsx`
- Socials page: `/src/app/socials/page.tsx`
- Homepage text: `/src/app/page.tsx`

**Modify design:**
- Colors: `/src/app/globals.css`
- Components: `/src/components/`

## Common Tasks

### Test the site locally
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Test production build
```bash
npm run build
npx serve out
```

### Add a magazine
1. Add cover to `/public/covers/`
2. Update `/src/data/magazines.json`
3. Test with `npm run dev`
4. Deploy with `git push`

### Update dependencies
```bash
npm update
npm audit fix
```

## Troubleshooting

**Build fails:**
- Check Node.js version (need 18+)
- Run `npm install`
- Check for JSON syntax errors in `magazines.json`

**Images not loading:**
- Verify files are in `/public/covers/`
- Check paths start with `/covers/`
- Rebuild: `npm run build`

**Search not working:**
- Check `magazines.json` is valid JSON
- Verify all required fields are present
- Test in development mode

## Documentation

- **README.md** - Complete project documentation
- **MAGAZINE-ENTRY-GUIDE.md** - How to add magazines
- **DEPLOYMENT.md** - Cloudflare Pages deployment
- **QUICK-START.md** - This file

## Support

For issues or questions:
1. Check the documentation files
2. Review build logs in Cloudflare dashboard
3. Test locally before deploying
4. Check browser console for errors

## Next Steps

1. ✅ Set up development environment
2. ✅ Add your first magazine
3. ✅ Test locally
4. ✅ Deploy to Cloudflare Pages
5. ✅ Add custom domain (optional)
6. ✅ Share with the world! 🛸

---

**Need more details?** See the full documentation in README.md
