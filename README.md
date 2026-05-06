# Mall of America Interactive Sales Deck

An interactive, browser-based sales deck for Mall of America. Built to be screen-shared on live calls or sent as a standalone link that prospects can explore on their own. Think of it as a high-end pitch deck that moves people closer to leasing, sponsorship, or event deals.

I chose to build this as a pitch tool, not a brochure website. That means every section exists for a reason: to show value, tell a story, and push toward action.

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploying to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect it's a Vite project
4. Set these build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Add environment variables (see below)
6. Deploy

That's it. Netlify and other platforms work the same way.

## Environment Variables

If you're hosting video files externally (which you should—GitHub has a 100MB file limit), add these to your `.env.local` for local dev or to your deployment platform's environment variables:

```
VITE_HERO_VIDEO_URL=https://your-cdn.com/12707958_3840_2160_30fps.mp4
VITE_CROWD_VIDEO_URL=https://your-cdn.com/14863538_3840_2160_30fps.mp4
VITE_RETAIL_VIDEO_URL=https://your-cdn.com/14922381_1080_1920_30fps.mp4
VITE_DINING_VIDEO_URL=https://your-cdn.com/14922381_1080_1920_30fps.mp4
VITE_ATTRACTION_VIDEO_URL=https://your-cdn.com/14881421_1080_1920_60fps.mp4
VITE_PLACEHOLDER_VIDEO_URL=https://your-cdn.com/placeholder.mp4
```

If you don't provide these URLs, the app falls back to local clips in `public/assets/` (which are included in the repo for demo purposes).

## What's in the Deck

- **Opening:** Cinematic video intro that hits you with scale and energy right away
- **Why Mall of America:** Location, access, visitor numbers, why it's different from a regular mall
- **Retail:** Different tenant paths—flagships, discovery brands, pop-ups
- **Premium/Luxury:** Elevated positioning and private moments
- **Dining & Lifestyle:** Why food and entertainment matter for dwell time
- **Attractions:** The real differentiator—what makes this a destination
- **Events:** Positioning the property as a platform for concerts, activations, launches
- **Modules:** Four expandable sub-decks for leasing, sponsorship, events, venues
- **Deal Room:** Three clear next steps for different buyer types

## Tech Stack

- **React 18** + **TypeScript** — type-safe components
- **Vite** — fast builds, instant HMR
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth animations and transition effects
- **lucide-react** — clean icon library

## Why These Choices

I picked Vite because it's fast and the build is tiny. React and TypeScript keep the code modular and safe. Tailwind lets me build without a separate CSS file. Framer Motion handles the motion work that makes this feel premium. Everything is production-ready and performant.

## Design Notes

I went with a dark, cinematic look—think luxury brand, not generic startup. Large video, restrained typography, plenty of breathing room. The interface gets out of the way so the content can speak.

Navigation is non-linear. You can jump to any section or dive into the modules. A salesperson can customize the flow for their audience; a prospect can explore at their own pace.

## How Assets Are Organized

- **Video clips:** Referenced from environment variables (for external hosting) or fallback to `public/assets/`
- **Images:** Wikimedia Commons URLs for Mall of America photography
- **Icons:** lucide-react library (no custom SVGs needed)
- **Fonts:** Google Fonts (Manrope for body, Cormorant Garamond for display)

Everything is lazy-loaded where possible. The app is designed to feel fast.

## Why Mall of America

It's one of the world's biggest malls and it's genuinely a mixed-use destination. You've got retail, attractions, dining, transit, tourism, and event potential all in one property. That gives the sales story real leverage: it's not just about square footage, it's about being a platform.

## What I'd Do Next

- Connect the CTAs to actual lead capture or CRM handoff
- Build out the full sub-modules (right now they're expandable architecture waiting to be filled)
- Source official Mall of America brand video and photography
- Add analytics to track which sections people spend time in
- Add a mobile-optimized "one-pager" mode for prospects on phones

## Credits

- Property facts and brand positioning: Mall of America public information
- Images: Wikimedia Commons (public domain / CC licensed)
- UI/UX approach: Inspired by luxury brands and high-end pitch decks
- Development: Built with modern web tooling for speed and clarity

Further optimization with more time:

- Transcode all videos to modern compressed formats such as WebM and H.264 MP4.
- Replace remote Wikimedia images with locally optimized responsive images.
- Add a Lighthouse CI check after deployment.

## Submission Checklist

- Live URL from Vercel, Netlify, GitHub Pages, or equivalent.
- Public GitHub repository with this README.
- Optional write-up: see `SUBMISSION.md`.
