# Deployment Guide

This guide walks you through deploying the Mall of America sales deck to Vercel, Netlify, or another static hosting platform.

## Prerequisites

- A GitHub account
- Code pushed to a public GitHub repository

## Deploying to Vercel (Recommended)

Vercel is the simplest option. It's made by the creators of Next.js and has native Vite support.

### Step 1: Connect Your GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Click **"Import"**

### Step 2: Configure Build Settings

Vercel should auto-detect Vite. You'll see:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

These defaults are correct. Don't change them.

### Step 3: Add Environment Variables (Optional)

If you're hosting videos on an external CDN:

1. In the Vercel project settings, go to **Settings** → **Environment Variables**
2. Add each variable from `.env.example`:
   - `VITE_HERO_VIDEO_URL`
   - `VITE_CROWD_VIDEO_URL`
   - `VITE_RETAIL_VIDEO_URL`
   - `VITE_DINING_VIDEO_URL`
   - `VITE_ATTRACTION_VIDEO_URL`
   - `VITE_PLACEHOLDER_VIDEO_URL`
3. Paste the full CDN URLs for each
4. Click **"Save"**

If you skip this step, the app will use local video clips from `public/assets/` (which work fine for demo/testing).

### Step 4: Deploy

Click **"Deploy"**. Vercel will build and deploy your project. This takes 30–60 seconds.

Once complete, you'll get a live URL. Share it with prospects.

### Future Deploys

Every time you push to GitHub, Vercel auto-deploys. No extra steps needed.

---

## Deploying to Netlify

Netlify is another solid option.

### Step 1: Connect Your Repository

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose GitHub and authorize Netlify to access your repos
4. Select your repo

### Step 2: Configure Build Settings

Netlify should auto-detect these. Verify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 3: Add Environment Variables (Optional)

1. In Netlify, go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Edit variables"**
3. Add each variable from `.env.example` with its CDN URL
4. Click **"Save"**

### Step 4: Deploy

Click **"Deploy"**. Netlify will build your project (takes ~60 seconds).

---

## Deploying to GitHub Pages

GitHub Pages is free but slightly more involved.

### Step 1: Update `vite.config.ts`

Add a `base` option pointing to your repo name (if deploying to `username.github.io`, skip this):

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
});
```

### Step 2: Create a GitHub Actions Workflow

Create a new file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 3: Enable GitHub Pages

1. Go to your repo **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

Every push to `main` will trigger a deploy.

---

## Video Hosting (Important)

GitHub has a 100MB file size limit. If your video files exceed that:

1. **Option A: Use a CDN** (Recommended)
   - Upload videos to Cloudinary, AWS S3, or similar
   - Add the URLs to your `.env` file
   - Deploy normally

2. **Option B: Use Local Fallbacks** (For Demo)
   - Keep the lightweight clips in `public/assets/`
   - The app will use those if environment variables aren't provided

3. **Option C: Git LFS**
   - Use GitHub's Large File Storage
   - More complex, but keeps everything in one place

For a real sales tool, **Option A (CDN)** is best. Videos load faster, you can track traffic, and you're not limited by GitHub's constraints.

---

## Testing Your Deployment

Once live, test these things:

1. **Load time:** Open DevTools (F12) → Network tab. Videos should load. Page should feel snappy.
2. **Navigation:** Try clicking sections, scrolling, the modules, CTAs.
3. **Mobile:** Open on a phone or tablet. Everything should work.
4. **Video playback:** Make sure all videos autoplay and loop correctly.

---

## Monitoring & Analytics

If you want to understand user behavior:

1. **Vercel Analytics:** Built-in, shows real user metrics
2. **Google Analytics:** Add to `index.html` for session tracking
3. **Hotjar:** See how people interact (heatmaps, session recordings)

For now, just watch traffic and see where people spend time.

---

## Troubleshooting

### Build fails on deploy
- Check that `npm run build` works locally (`npm install && npm run build`)
- Look at the deployment logs for error details
- Common issues: missing dependencies, TypeScript errors, or wrong environment variables

### Videos don't play
- Check the browser console for 404 errors
- If using environment variables, verify the URLs are correct and accessible
- Make sure CORS is enabled on your CDN (if using external hosting)

### Page is slow
- Check video file sizes. Large MP4s will slow things down.
- Compress videos or use a CDN with caching
- Verify Lighthouse scores (should be 90+)

### Want to update live
- Make changes locally, push to GitHub
- Vercel/Netlify auto-deploys (usually within 30 seconds)
- Changes are live immediately

---

## Next Steps

Once live:

1. Share the URL with prospects
2. Monitor which sections get the most time/engagement
3. Iterate on copy, video, or CTAs based on feedback
4. Connect lead capture or CRM integration for real deals

Good luck!
