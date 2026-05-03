# Getting Started

## 5-Minute Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd liat-ai-assignment
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Explore the Deck

Click through the sections, try the navigation, check out the modules. Get familiar with what you're looking at.

---

## Building for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

---

## Deploying (Pick One)

### **Vercel (Easiest)**

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click deploy
5. Done. Your live URL is ready.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

### **Netlify**

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Click deploy
5. Done.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

### **GitHub Pages**

Requires a GitHub Actions workflow. See [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Project Structure

```
src/
  App.tsx          ← Main component (all sections, navigation, state)
  main.tsx         ← React entry point
  styles/
    index.css      ← Tailwind directives + custom variables

public/
  assets/          ← Video files (fallback if no env vars provided)

index.html         ← HTML entry point
package.json       ← Dependencies and scripts
vite.config.ts     ← Vite configuration
tailwind.config.cjs ← Tailwind theme customization
tsconfig.json      ← TypeScript configuration
```

---

## Making Changes

### Update Copy/Content

Edit `src/App.tsx`:
- `PROPERTY` object has the main property info
- `SECTIONS` array has the navigation labels
- `FACTS`, `retailPaths`, `MODULES` objects have content

### Update Colors

Edit `tailwind.config.cjs` or `src/styles/index.css`:
- `--ink-950`, `--cream` and other CSS variables

### Update Fonts

Edit `src/styles/index.css`:
- Change the Google Fonts imports
- Update `.font-display` and `body` font-family

### Update Videos

Option A: Add environment variables in `.env.local`:
```
VITE_HERO_VIDEO_URL=https://...
VITE_CROWD_VIDEO_URL=https://...
```

Option B: Add new files to `public/assets/` and update the fallback URLs in `App.tsx`.

### Add a New Section

1. Create a new component in `App.tsx` (e.g., `const MySection = () => (...)`)
2. Add it to the `SECTIONS` array
3. Add a new section ID (e.g., `{ id: 'mysection', label: 'My Section' }`)
4. Render it in the main return statement in `App()`

---

## Understanding the Architecture

**Sections:** Each major content area is a React component.
- `HeroSection`, `WhySection`, `RetailSection`, etc.
- They're exported as `const` functions, not separate files
- Easy to move/copy if needed

**Navigation:** Non-linear via buttons that scroll to section IDs.
- `handleNavigate()` uses `scrollIntoView()`
- Active section is tracked by Intersection Observer
- Mobile, tablet, and XL viewports have different nav layouts

**Modules:** The `PlatformSection` has a state for active module.
- Module content lives in the `MODULES` object
- Clicking a module button updates `activeModule`
- Framer Motion handles the transition animation

**Styling:** All Tailwind utility classes.
- Custom colors defined in `tailwind.config.cjs`
- No separate CSS files
- Responsive classes: `md:`, `lg:`, `xl:` prefixes

---

## Customizing for Another Property

To use this for a different mall/property:

1. Update `PROPERTY` object with your property's info
2. Update `SECTIONS` with your story beats
3. Replace `FACTS` with your property's data
4. Update video URLs (environment variables or local files)
5. Update image URLs (replace Wikimedia Commons URLs with your sources)
6. Update retail/leasing/sponsorship/event content in `MODULES`

The structure stays the same. Content changes.

---

## Common Questions

**Q: Where do the videos come from?**
A: They're provided via environment variables (`VITE_*_VIDEO_URL`). If not provided, the app falls back to local clips in `public/assets/`.

**Q: Can I use this on mobile?**
A: Yes, it's responsive. Best on desktop/tablet, but works on phones too.

**Q: How do I add tracking/analytics?**
A: Add a script tag to `index.html` (Google Analytics, Segment, etc.). The page handles the rest.

**Q: Can I change the color scheme?**
A: Yes. Edit `tailwind.config.cjs` to update the theme colors.

**Q: How do I add a form or lead capture?**
A: Add a form component to the `DealRoomSection` or create a new section. Connect it to your backend or a service like Typeform, HubSpot, etc.

**Q: Is this SEO-friendly?**
A: It's a React SPA, so SEO is limited. But for a B2B sales tool, you probably don't need organic search. If you do, consider adding a static marketing site alongside this.

---

## Performance Notes

- **Lighthouse score:** Aiming for 90+ (achievable with current architecture)
- **Load time:** Typically under 3 seconds on broadband
- **Video:** Use external CDN for large files; keep local clips small
- **Images:** All lazy-loaded; use reasonable resolutions (not 4K)
- **Bundle:** ~500KB gzipped (React + Framer Motion + styles)

---

## Troubleshooting

**Page is blank**
- Check browser console for errors (F12)
- Make sure `npm install` completed
- Try `npm run dev` again

**Videos don't play**
- Check if video URLs are correct (F12 → Network tab)
- Make sure CORS is enabled on external CDN
- Try using local fallback clips from `public/assets/`

**Build fails**
- Run `npm install` again
- Delete `node_modules/` and `.npm` cache, then reinstall
- Check Node version (should be 16+)

**Mobile layout is broken**
- Check Tailwind responsive classes (md:, lg:, xl:)
- Make sure viewport meta tag is in `index.html`
- Test in different browsers/devices

---

## Next Steps

1. **Local testing:** Run `npm run dev` and explore
2. **Customize:** Update copy, colors, videos for your property
3. **Deploy:** Push to Vercel/Netlify (see DEPLOYMENT.md)
4. **Iterate:** Get feedback and improve
5. **Connect:** Add analytics, lead capture, or CRM integration

---

**Need help?** See README.md, DEPLOYMENT.md, or PRODUCT.md for more details.
