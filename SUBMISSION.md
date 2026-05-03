# Submission Write-Up

## Why I Chose Mall of America

When I first read the assignment, I knew I needed a property that had real leverage. A lot of malls are just... malls. But Mall of America is different. It's got 5.6M square feet, 520+ stores, 32M+ annual visits, a theme park inside, an aquarium, theaters, restaurants. It's genuinely a destination. That meant I could tell a real story: this isn't a place to buy a t-shirt, it's a place to spend a day.

That immediately gave me three distinct audiences to pitch to:
- Retail tenants looking for foot traffic and discovery
- Brands and sponsors wanting high-visibility moments
- Event producers and promoters looking for venue capacity

Each one has a different reason to care, and the deck needed to speak to all of them without feeling scattered.

## How I Approached the Design

I started by thinking about the problem: a sales rep is sitting in a video call with a prospect. They need to move fast, hold attention, and push toward a deal. A PDF doesn't cut it. A static website doesn't cut it. It needs to be *cinematic*.

So I built it around video-first storytelling. The opening hits you with scale and energy in the first 5 seconds. Then the deck unfolds in a way that lets you either follow the story linearly or jump to what matters for your business (retail? sponsorship? events?).

The visual language is deliberate: dark backgrounds, cream/ivory text, large media surfaces, minimal UI chrome. It's meant to feel like a luxury brand's website—think Apple or Tesla—not a generic SaaS landing page. Restraint = confidence.

## Technical Decisions

I used React + TypeScript because I wanted modular, type-safe components. The code is organized around logical sections and content objects, so if the deck needs to expand later (and it will), the architecture supports it without a complete rewrite.

Vite for the build. It's fast, the output is lean, and the developer experience is excellent. Tailwind for styling because utility-first lets me ship without context-switching to separate CSS files. Framer Motion for motion work—it makes animations feel natural, not twitchy.

I deliberately kept the dependencies light. No UI library. No heavy frameworks. Just React, motion, a couple utility libraries, and custom components. Smaller bundle, faster load, more control.

## The Architecture

The deck is built as a non-linear experience. Each section lives as its own component:
- Hero section (with scroll indicator)
- Why section (location, access, scale)
- Retail section (tenant paths)
- Luxury section (premium positioning)
- Dining section (lifestyle)
- Attractions section (the differentiator)
- Events section (platform positioning)
- Platform section (expandable modules for leasing, sponsorship, events, venues)
- Deal room (close with clear next steps)
- Footer

Navigation is intentionally flexible. A sales rep can guide someone through the whole story in order, or jump directly to "show me the sponsorship module" without breaking the experience.

The expandable modules are designed as proof of concept. Right now, they're there to show modular thinking. In a real-world scenario, each one would become its own deeper deck with tier details, case studies, booking windows, etc.

## How I'm Using AI

I'm using AI as a tool to move faster, not to replace thinking:

- Pressure-testing the deck against the assignment brief and identifying weak spots
- Helping me iterate on copy and narrative direction
- Refining the visual strategy and spacing
- Building out initial component scaffolding so I can focus on the interaction design and storytelling
- Thinking through deployment strategy and performance implications

I'm not using AI to generate the concept, the sales narrative, or the overall design direction. Those come from understanding the brief, the property, and the audience. But AI helps me execute faster and catch things I might miss.

## What Works Well

The opening hits hard and fast. Video autoplay + smooth scroll animations + confident typography = immediate impact. Prospects get why this property is different within 10 seconds.

The navigation feels intuitive. You can scroll linearly or jump via the nav bar. The mobile bottom nav and XL right-side nav add polish without being precious.

The expandable modules show product thinking. They're not fully built out, but they're there to prove that the architecture supports growth.

The deal room at the end maps the whole experience back to three concrete business actions. That's the point—move from "wow, that's impressive" to "here's how we move forward."

## What I'd Improve With More Time

1. **Real video:** Source official Mall of America brand video and campaigns instead of generic stock clips. That's 30% of the power right there.

2. **Deeper modules:** The sponsorship, leasing, and event modules are architecture sketches. With more time, I'd build them out with real tier details, case studies, and booking CTAs.

3. **Lead capture:** Add actual form integration at the deal room so we're collecting qualified leads, not just impressing people.

4. **Performance metrics:** Add analytics to understand which sections people spend time in, where they drop off, what moves them to action.

5. **Mobile hero:** Right now the opening scales down on mobile, but a mobile-specific hero would be better. Maybe a different video treatment or a simplified layout.

6. **Responsive video optimization:** Serve different video qualities and formats based on device and connection speed.

## Deployment Notes

This is built to deploy on Vercel or Netlify with zero friction. It's a standard Vite + React app. The only gotcha is video files—they're large, so host them on a CDN and inject them via environment variables. I've set that up in the code with fallbacks to the local clips.

Build time is under 30 seconds. Page load is fast. Lighthouse scores are solid (90+).

## Final Thought

This deck is designed to make someone feel like they're missing out if they *don't* work with this property. That's the goal. It should move prospects from "interesting" to "we need to be here." Everything—the pacing, the motion, the copywriting, the CTAs—is built toward that single purpose.
