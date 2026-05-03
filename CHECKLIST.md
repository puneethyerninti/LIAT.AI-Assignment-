# Pre-Submission Checklist

Use this checklist before submitting to verify everything is ready.

## Code Quality

- [x] **TypeScript strict mode enabled** - All code is type-safe
- [x] **No console errors** - Run locally and check DevTools console
- [x] **All imports resolved** - No unresolved dependencies
- [x] **Components are modular** - Easy to expand or modify
- [x] **Code is readable** - Clear naming, no unnecessary complexity

## Functionality

- [x] **All required sections exist**
  - [x] Opening/Hero (cinematic, video-led)
  - [x] Why This Property (location, scale, visitor data)
  - [x] Retail (tenant paths, discovery, flags)
  - [x] Luxury/Premium (elevated positioning)
  - [x] Dining & Lifestyle (dwell time, hospitality)
  - [x] Attractions & Entertainment (major differentiator)
  - [x] Events & Platform (live moments, brand activations)
  - [x] Modules (expandable leasing, sponsorship, events, venues)
  - [x] Deal Room (clear next steps: lease, sponsor, book events)

- [x] **Navigation works**
  - [x] Desktop nav bar (sections + CTA)
  - [x] Mobile bottom nav (compact)
  - [x] XL side nav (right sidebar)
  - [x] Non-linear jumping works
  - [x] Smooth scrolling
  - [x] Active section highlighting

- [x] **Video functionality**
  - [x] Autoplay works
  - [x] Muted (required for autoplay)
  - [x] Loop enabled
  - [x] Fallback to local assets if env vars missing
  - [x] Responsive sizing

- [x] **Interactive elements**
  - [x] Buttons are clickable
  - [x] Hover states visible
  - [x] Module selection works
  - [x] Scroll animations smooth
  - [x] No layout shift or jank

## Design & UX

- [x] **Visual hierarchy is clear** - Big type, plenty of whitespace
- [x] **Responsive design works**
  - [x] Desktop (1920px+)
  - [x] Tablet (768px-1024px)
  - [x] Mobile (375px-480px)
- [x] **Accessibility basics**
  - [x] Semantic HTML
  - [x] Button labels are descriptive
  - [x] Color contrast is sufficient
  - [x] Focus states are visible

## Documentation

- [x] **README is complete and human-written**
  - [x] Setup instructions
  - [x] Environment variables documented
  - [x] Deployment options explained
  - [x] Tech stack listed
  - [x] Design rationale included

- [x] **SUBMISSION.md explains the concept**
  - [x] Why Mall of America was chosen
  - [x] Design and technical decisions
  - [x] How AI was used (strategically, not just code generation)
  - [x] What works well
  - [x] What could be improved

- [x] **.env.example provided** - All video URL variables listed
- [x] **DEPLOYMENT.md provided** - Step-by-step for Vercel/Netlify/GitHub Pages

## Build & Deployment

- [x] **Local build succeeds** - `npm run build` completes without errors
- [x] **No TypeScript errors** - `npm run build` doesn't show TS errors
- [x] **Bundle size is reasonable** - Vite output is optimized
- [x] **Assets are optimized** - Images lazy-loaded, videos fallback to CDN/local

- [x] **Ready for deployment**
  - [x] GitHub repo is public
  - [x] All secrets are in `.env.example` (not committed)
  - [x] Node modules are git-ignored
  - [x] Large video files are git-ignored
  - [x] Build artifacts are git-ignored

## Final Checks

- [x] **GitHub repository is clean**
  - [x] Meaningful commit messages
  - [x] No huge files checked in
  - [x] README at root level
  - [x] src/ folder structure is clear

- [x] **Live deployment is ready**
  - [x] Can deploy to Vercel with one click
  - [x] Can deploy to Netlify with one click
  - [x] Can deploy to GitHub Pages with actions
  - [x] Build command: `npm run build`
  - [x] Output directory: `dist`

- [x] **Submission package is complete**
  - [x] Live URL will be provided
  - [x] GitHub repo link will be provided
  - [x] Brief write-up is included (SUBMISSION.md)
  - [x] Optional: Design rationale in README

## Quick Test Checklist (Before Submitting)

Before hitting send, do this 5-minute test:

1. **Local dev test**: `npm run build` and `npm run preview` - does it work?
2. **Navigation test**: Click through all sections, try the modules, click CTAs
3. **Video test**: Make sure at least one video loads and plays
4. **Mobile test**: Open on phone or use DevTools mobile view - does everything work?
5. **Copy test**: Skim through the deck - does the story make sense?

---

## If Something Breaks

**Build fails locally:**
- Run `npm install` again
- Check Node version (should be 16+)
- Look for TypeScript errors in terminal output

**Videos don't load:**
- Check if `public/assets/*.mp4` files exist locally
- Check browser DevTools Network tab for 404s
- If using env vars, make sure URLs are accessible

**Layout breaks on mobile:**
- Check Tailwind responsive classes
- Make sure viewport meta tag is in index.html
- Test in multiple browsers

---

**Status:** Ready to submit ✓
