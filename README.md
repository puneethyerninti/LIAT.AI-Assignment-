# Mall of America Interactive Sales Deck

A browser-based, non-linear sales deck for Mall of America, built for prospective retail tenants, sponsors, brand partners, and event producers.

The goal is not to make a brochure site. This is a screen-share-ready pitch tool that uses video, data, imagery, modular navigation, and commercial storytelling to make the property feel like a high-value destination platform.

## Live Deployment

Recommended deployment: Vercel or Netlify.

```bash
npm install
npm run build
```

For Vercel, import the repository and use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## What The Deck Covers

- Cinematic opening with video-first storytelling
- Non-linear navigation for self-guided exploration and live sales calls
- Property scale, location, access, visitor draw, and regional reach
- Retail leasing story for flagships, anchors, discovery brands, and pop-ups
- Premium positioning path for elevated retail and private launch moments
- Dining and lifestyle as dwell-time and occasion-building drivers
- Attractions and entertainment as the major mega-mall differentiator
- Events platform for concerts, activations, corporate events, and product launches
- Expandable modules for leasing, sponsorship, event bookings, and venue concepts
- Deal-room close that maps the experience to leasing, sponsorship, and event actions

## Product Strategy

Mall of America was selected because it naturally fits the assignment: it is not just a mall, it is a mixed-use destination with retail, attractions, transit, dining, and event potential in one property. The deck is structured so a salesperson can quickly adapt the narrative to different buyer types without leaving the experience.

The interface supports two modes of use:

- Screen-share mode: clear navigation, strong visual pacing, and high-impact proof points for a live pitch.
- Standalone mode: enough narrative context and CTAs for a prospect to understand the opportunity without narration.

## Design Decisions

- Visual direction: luxury editorial meets destination entertainment. The dark cinematic surfaces, ivory type, large-scale video, and restrained chrome are meant to feel premium without becoming generic.
- Interaction model: non-linear section navigation plus expandable commercial modules, so the viewer can jump directly to leasing, sponsorship, events, or venue logic.
- Content model: every section is tied to a business action, not just a descriptive story beat.
- Performance model: the app references the lighter video clips in `public/assets`; larger exploratory clips are excluded from source control through `.gitignore`.

## Assets And Sources

- Public property facts were informed by publicly available Mall of America information.
- Public imagery uses Wikimedia Commons file endpoints for Mall of America visuals.
- Motion backgrounds use locally bundled stock video clips to keep the experience cinematic where property-specific video was limited.
- AI assistance was used to accelerate concepting, copy direction, layout refinement, and submission documentation.

## AI Usage

AI was used as a product-building accelerator, not just a code generator:

- Translated the interview brief into a modular product architecture.
- Developed the sales narrative across tenant, sponsor, and event partner audiences.
- Refined the premium visual direction and section pacing.
- Helped identify submission risks such as performance, deployability, README quality, and action-oriented storytelling.
- Assisted with implementation, TypeScript cleanup, and build verification.

## Performance Notes

The app is designed for a Vite production build and avoids shipping the largest exploratory video files. For a production deployment, keep the ignored large clips out of the repository and deploy only the referenced lightweight assets.

Further optimization with more time:

- Transcode all videos to modern compressed formats such as WebM and H.264 MP4.
- Replace remote Wikimedia images with locally optimized responsive images.
- Add a Lighthouse CI check after deployment.

## Submission Checklist

- Live URL from Vercel, Netlify, GitHub Pages, or equivalent.
- Public GitHub repository with this README.
- Optional write-up: see `SUBMISSION.md`.
