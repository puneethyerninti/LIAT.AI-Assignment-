import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Compass,
  Crown,
  Landmark,
  MapPin,
  Maximize2,
  Menu,
  PartyPopper,
  Sparkles,
  ShoppingBag,
  Star,
  Ticket,
  TramFront,
  Users,
  X,
} from 'lucide-react';

// Import contact components and analytics
import { Modal } from './components/Modal';
import { ContactForm, type ContactFormData } from './components/ContactForm';
import { IntroScreen } from './components/IntroScreen';
import { SectionTransition } from './components/SectionTransition';
import { Carousel } from './components/Carousel';
import { initAnalytics, trackCTAClick, trackFormSubmission } from './utils/analytics';
import { transitionOrder } from './utils/transitionEffects';

type Fact = {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
};

type Section = {
  id: string;
  label: string;
};

type RetailPath = {
  title: string;
  summary: string;
  bullets: string[];
  accent: string;
};

type ModuleDefinition = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  cta: string;
  icon: React.ReactNode;
};

const heroVideo = (import.meta as any).env?.VITE_HERO_VIDEO_URL || '/assets/12707958_3840_2160_30fps.mp4';
const crowdVideo = (import.meta as any).env?.VITE_CROWD_VIDEO_URL || '/assets/14863538_3840_2160_30fps.mp4';
const retailVideo = (import.meta as any).env?.VITE_RETAIL_VIDEO_URL || '/assets/14922381_1080_1920_30fps.mp4';
const diningVideo = (import.meta as any).env?.VITE_DINING_VIDEO_URL || '/assets/14922381_1080_1920_30fps.mp4';
const attractionVideo = (import.meta as any).env?.VITE_ATTRACTION_VIDEO_URL || '/assets/14881421_1080_1920_60fps.mp4';
const placeholderVideo = (import.meta as any).env?.VITE_PLACEHOLDER_VIDEO_URL || retailVideo;

const media = {
  aerial: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mall_of_America_Aerial.jpg',
  interior: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mall_of_America_interior_three-level_corridor.jpg',
  amusement: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amusement_park_at_Mall_of_America.jpg',
  transit: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mall_of_America_Transit_Station_Mall_Entrance.jpg',
};

const PROPERTY = {
  name: 'Mall of America',
  location: 'Bloomington, Minnesota',
  tagline: 'A destination city for retail, entertainment, hospitality, and live moments.',
  deckTag: 'Interactive sales deck',
  summary:
    'The brief is simple: make a prospect understand, in under a minute, why this property is a platform rather than a building. Mall of America is exactly that kind of asset.',
};

const SECTIONS: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'why', label: 'Why It Wins' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Premium Path' },
  { id: 'dining', label: 'Dining' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'events', label: 'Events' },
  { id: 'platform', label: 'Platform' },
  { id: 'deal-room', label: 'Deal Room' },
];

const FACTS: Fact[] = [
  { label: 'Gross area', value: '5.6M SQ FT', note: 'Total floor area', icon: <Maximize2 className="h-5 w-5" /> },
  { label: 'Stores and services', value: '520', note: 'Retail density at scale', icon: <ShoppingBag className="h-5 w-5" /> },
  { label: 'Annual visits', value: '32M+', note: 'Regional pull across the Midwest', icon: <Users className="h-5 w-5" /> },
  { label: 'Parking', value: '12,300', note: 'Two 7-story ramps plus overflow lots', icon: <Compass className="h-5 w-5" /> },
];

const retailPaths: RetailPath[] = [
  {
    title: 'Flagships and anchors',
    summary: 'High-footfall tenants that set the tone for the property and pull families, tourists, and repeat regional trips.',
    bullets: ['Nordstrom and Macy\'s adjacency', 'Daily traffic with destination-scale dwell time', 'Easy seasonal merchandising and event tie-ins'],
    accent: 'from-amber-300/30 to-transparent',
  },
  {
    title: 'Discovery and newness',
    summary: 'The mall behaves like a launch pad for brands that want to show up as culture, not just inventory.',
    bullets: ['Pop-ups and limited drops', 'Experiential retail moments', 'Youth and family traffic for product trials'],
    accent: 'from-white/20 to-transparent',
  },
  {
    title: 'Family and value lanes',
    summary: 'A broad middle of the market that keeps traffic constant and makes the mall resilient in every retail cycle.',
    bullets: ['Apparel, gifting, tech, and specialty retail', 'Weather-proof visitor flow', 'Cross-shopping across food and attractions'],
    accent: 'from-sky-300/20 to-transparent',
  },
];

const MODULES: ModuleDefinition[] = [
  {
    id: 'leasing',
    title: 'Leasing paths',
    summary: 'Segmented entry points for luxury, flagship, pop-up, and mid-tier tenants with clear positioning and traffic logic.',
    bullets: ['Luxury positioning and adjacent dining', 'Pop-up windows tied to seasonal peaks', 'Flagship-ready layouts with sustained dwell'],
    cta: 'Start a leasing conversation',
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship modules',
    summary: 'Brand partnerships built around visibility, footfall, and experiential moments that feel native to the destination.',
    bullets: ['Campaign-ready placements and media zones', 'Family + tourist reach at scale', 'Measured brand lift and activation ROI'],
    cta: 'Explore sponsorship tiers',
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: 'events',
    title: 'Events engine',
    summary: 'From concerts to corporate launches, the property operates like a venue network with year-round calendar control.',
    bullets: ['Flexible venues for talent, culture, and launches', 'Built-in audience and press visibility', 'Seasonal programming that compounds demand'],
    cta: 'Book an event path',
    icon: <Ticket className="h-5 w-5" />,
  },
  {
    id: 'venues',
    title: 'Dedicated venues',
    summary: 'Performing arts, expo, and showcase environments designed to host large-format experiences and private events.',
    bullets: ['Expo hall and showcase-ready footprints', 'Performing arts + live entertainment rooms', 'Private buyouts and premium hospitality'],
    cta: 'See venue capabilities',
    icon: <Landmark className="h-5 w-5" />,
  },
];

const SectionTitle = ({ eyebrow, title, summary, dark = false }: { eyebrow: string; title: string; summary: string; dark?: boolean }) => (
  <div className="relative max-w-3xl">
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className={`mb-5 h-px w-28 origin-left ${dark ? 'bg-amber-200/70' : 'bg-ink-950/60'}`}
    />
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      className={`text-[10px] font-extrabold uppercase tracking-[0.42em] ${dark ? 'text-white/55' : 'text-ink-600'}`}
    >
      {eyebrow}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.08 }}
      className={`mt-4 max-w-4xl text-4xl leading-[0.86] md:text-6xl xl:text-7xl ${dark ? 'text-cream text-balance' : 'text-ink-950 text-balance'} font-display`}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.16 }}
      className={`mt-5 max-w-2xl text-base leading-8 md:text-lg md:leading-8 ${dark ? 'text-white/72' : 'text-ink-700'}`}
    >
      {summary}
    </motion.p>
  </div>
);

const MetricCard = ({ fact }: { fact: Fact }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }}
    className="cinema-card group relative overflow-hidden border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/14 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="scan-line loop-scan" aria-hidden="true" />
    <div className="relative flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
          {fact.icon}
          {fact.label}
        </div>
        <div className="mt-4 text-3xl font-display text-cream">{fact.value}</div>
        <div className="mt-2 text-sm leading-6 text-white/50">{fact.note}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-white/25 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  </motion.div>
);

const ImageCard = ({ src, alt, className = '', caption }: { src: string; alt: string; className?: string; caption?: string }) => (
  <figure className={`cinema-frame relative overflow-hidden border border-white/10 ${className}`}>
    <img src={src} alt={alt} className="h-full w-full object-cover transition duration-[1400ms] hover:scale-[1.035]" loading="lazy" />
    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.76),rgba(0,0,0,0.16),transparent),linear-gradient(115deg,rgba(255,245,220,0.12),transparent_28%,rgba(255,255,255,0.04)_55%,transparent)]" />
    {caption ? <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm text-white/80">{caption}</figcaption> : null}
  </figure>
);

const VideoCard = ({ src, poster, caption, className = '' }: { src: string; poster?: string; caption: string; className?: string }) => (
  <figure className={`cinema-frame relative overflow-hidden border border-white/10 ${className}`}>
    <video autoPlay muted loop playsInline preload="metadata" poster={poster} className="h-full w-full object-cover">
      <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78),rgba(0,0,0,0.14),transparent),linear-gradient(90deg,rgba(255,220,160,0.1),transparent_36%,rgba(255,255,255,0.06))]" />
    <div className="letterbox" aria-hidden="true" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
      <div className="max-w-[16rem] text-sm leading-6 text-white/80">{caption}</div>
      <CirclePlay className="h-6 w-6 text-white/70" />
    </div>
  </figure>
);

const PrimaryButton = ({ children, onClick, dark = false }: { children: React.ReactNode; onClick: () => void; dark?: boolean }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] transition duration-300 hover:-translate-y-0.5 ${
      dark ? 'bg-cream text-ink-950 shadow-[0_0_36px_rgba(243,238,228,0.22)]' : 'bg-ink-950 text-cream shadow-[0_0_36px_rgba(7,10,15,0.18)]'
    }`}
  >
    {children}
    <ArrowUpRight className="h-4 w-4" />
  </button>
);

const SectionBackground = ({
  imageSrc,
  videoSrc,
  poster,
  overlayClassName = '',
  mediaClassName = '',
}: {
  imageSrc?: string;
  videoSrc?: string;
  poster?: string;
  overlayClassName?: string;
  mediaClassName?: string;
}) => (
  <div className="absolute inset-0">
    {videoSrc ? (
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} className={`section-media ${mediaClassName}`}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    ) : imageSrc ? (
      <img src={imageSrc} alt="" aria-hidden="true" className={`section-media ${mediaClassName}`} loading="lazy" />
    ) : null}
    <div className={`section-overlay ${overlayClassName}`} />
  </div>
);

const Navigation = ({
  activeSection,
  currentIndex,
  onNavigate,
  onNext,
  onPrev,
}: {
  activeSection: string;
  currentIndex: number;
  onNavigate: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const active = SECTIONS[currentIndex] ?? SECTIONS[0];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === SECTIONS.length - 1;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between text-white">
          <button
            onClick={() => onNavigate('overview')}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-left backdrop-blur-2xl transition hover:bg-black/40"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.32em] text-white/75">
              MOA
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/50">{PROPERTY.deckTag}</div>
              <div className="mt-1 text-sm font-semibold text-white">{PROPERTY.name}</div>
            </div>
          </button>

          <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-3 text-white backdrop-blur-2xl md:flex">
            <span className="text-xs font-bold tabular-nums tracking-[0.28em] text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-xs tabular-nums text-white/30">/ {String(SECTIONS.length).padStart(2, '0')}</span>
            <span className="h-4 w-px bg-white/15" />
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/55">{active.label}</span>
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur-2xl transition hover:bg-black/40 hover:text-white"
            aria-label="Open story map"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">Story map</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="fixed inset-x-0 top-20 z-40 px-4 md:px-6"
          >
            <div className="mx-auto grid max-w-[1200px] gap-6 rounded-[1.75rem] border border-white/10 bg-ink-950/95 p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr] md:p-7">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Story beats</div>
                <div className="mt-5 grid gap-2 md:grid-cols-2">
                  {SECTIONS.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onNavigate(section.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                        activeSection === section.id ? 'border-white/35 bg-white text-ink-950' : 'border-white/10 bg-white/[0.04] hover:bg-white/10'
                      }`}
                    >
                      <span>
                        <span className={`block text-[10px] font-bold uppercase tracking-[0.35em] ${activeSection === section.id ? 'text-ink-500' : 'text-white/35'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 block text-lg font-semibold">{section.label}</span>
                      </span>
                      <ChevronRight className={`h-4 w-4 ${activeSection === section.id ? 'text-ink-500' : 'text-white/40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 self-end">
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Pitch logic</div>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <div>Move from destination proof to category story, then into leasing, sponsorship, and event booking paths.</div>
                    <div>The dots are intentionally non-linear, but the next control keeps the sales journey guided.</div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/70">
                  Built for a live pitch, a screen share, or a standalone link a prospect can explore after the meeting.
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <nav className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="group relative flex items-center gap-3 flex-row-reverse"
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={`block h-10 w-1 rounded-full transition-all duration-300 ${
                activeSection === section.id ? 'bg-amber-200' : 'bg-white/20 group-hover:bg-white/55'
              }`}
            />
            <span
              className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] transition ${
                activeSection === section.id ? 'translate-x-0 text-white opacity-100' : 'translate-x-2 text-white/0 opacity-0 group-hover:text-white/70 group-hover:opacity-100'
              }`}
            >
              {String(index + 1).padStart(2, '0')} {section.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[36rem] -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-white/10 bg-black/35 p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:bottom-6">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0 px-2 text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Now presenting</div>
          <div className="truncate text-sm font-semibold text-white">{active.label}</div>
        </div>
        <button
          onClick={onNext}
          disabled={isLast}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-ink-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 md:px-5"
        >
          <span className="hidden sm:inline">{isLast ? 'Final slide' : 'Next'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <section id="overview" className="deck-section hero-reel relative overflow-hidden bg-ink-950 text-white">
    <div className="absolute inset-0">
      <video autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover opacity-80">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,224,180,0.3),transparent_28%),linear-gradient(90deg,rgba(7,10,15,0.94),rgba(7,10,15,0.42)_44%,rgba(7,10,15,0.78)),linear-gradient(to_bottom,rgba(7,10,15,0.2),rgba(7,10,15,0.95))]" />
    </div>
    <div className="cinema-grid loop-drift" aria-hidden="true" />
    <div className="hard-flash loop-hard-flash" aria-hidden="true" />
    <div className="hero-orbit loop-rotate" aria-hidden="true" />
    <div className="hero-slash loop-sweep" aria-hidden="true" />
    <div className="hero-marquee" aria-hidden="true">
      <span className="loop-marquee">Mall of America / Leasing / Sponsorship / Events / Venues /</span>
    </div>

    <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-4 py-28 md:px-6 lg:grid-cols-[0.95fr_0.72fr] lg:items-end">
      <div>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-[10px] font-extrabold uppercase tracking-[0.5em] text-white/55"
      >
        {PROPERTY.location}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.9, ease: 'easeOut' }}
        className="mt-6 max-w-5xl text-6xl leading-[0.82] text-cream md:text-8xl lg:text-[9rem] font-display"
      >
        {PROPERTY.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.75, ease: 'easeOut' }}
        className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-2xl md:leading-9"
      >
        A market-making destination for retail leasing, brand sponsorship, and live-event demand.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.7 }} className="mt-9">
        <PrimaryButton onClick={() => onNavigate('why')} dark>
          Start the story
        </PrimaryButton>
      </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
        className="cinema-card hidden min-h-[22rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl lg:block"
      >
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.36em] text-white/45">
          <span>Destination Platform</span>
          <span>01</span>
        </div>
        <div className="mt-10 grid gap-3">
          {FACTS.slice(0, 3).map((fact) => (
            <div key={fact.label} className="flex items-center justify-between border-t border-white/10 py-4">
              <span className="text-sm text-white/62">{fact.label}</span>
              <span className="text-2xl text-cream font-display">{fact.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
        <p className="mt-6 text-sm leading-7 text-white/65">{PROPERTY.summary}</p>
      </motion.div>
    </div>

    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/45 md:bottom-28">
      <ChevronDown className="h-8 w-8" />
    </motion.div>
  </section>
);

const WhySection = () => (
  <section id="why" className="deck-section motif-data relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
    <SectionBackground imageSrc={media.interior} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
    <div className="section-halo loop-sweep" aria-hidden="true" />
    <div className="data-bars loop-bars" aria-hidden="true" />
    <div className="stat-ribbon" aria-hidden="true">
      <span className="loop-marquee">32M annual visits / 520 stores / 5.6M sq ft / Transit-connected /</span>
    </div>
    <div className="mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
      <div>
        <SectionTitle
          dark
          eyebrow="Why this property"
          title="It performs like a small city."
          summary="Before a prospect cares about square footage, they need to feel the commercial gravity: transit, attractions, dining, weather-proof dwell, and a reason to stay all day."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: <MapPin className="h-5 w-5" />, title: 'Location advantage', body: 'Steps from Minneapolis-Saint Paul International Airport and on the region\'s main transit network.' },
            { icon: <TramFront className="h-5 w-5" />, title: 'Transit hub', body: 'Blue Line, Red Line, D Line, buses, hotel shuttles, and commuter connectivity make the property easy to reach.' },
            { icon: <Landmark className="h-5 w-5" />, title: 'Destination scale', body: 'The size and tenancy density create repeat trips and more chances to cross-sell across categories.' },
            { icon: <Sparkles className="h-5 w-5" />, title: 'All-weather relevance', body: 'The property is built to keep visitors inside the experience, regardless of season or weather.' },
          ].map((item) => (
            <div key={item.title} className="cinema-card group border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(6,8,12,0.35)]">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-white/55">
                {item.icon}
                {item.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-white/40 via-transparent to-transparent transition-all duration-500 group-hover:w-2/3" />
            </div>
          ))}
        </div>
      </div>

      <div className="cinema-card relative grid gap-4 overflow-hidden bg-ink-950 p-5 text-white shadow-[0_30px_100px_rgba(6,8,12,0.25)] md:p-6">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,235,200,0.08))]" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Core proof points</div>
            <div className="mt-3 text-3xl font-display text-cream">The story is already built into the property.</div>
          </div>
          <Building2 className="h-8 w-8 text-white/40" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {FACTS.map((fact) => (
            <MetricCard key={fact.label} fact={fact} />
          ))}
        </div>
        <ImageCard src={media.interior} alt="Mall of America interior corridor" className="aspect-[16/10]" caption="A controlled interior environment lets the storytelling feel premium and consistent." />
      </div>
    </div>
  </section>
);

const RetailSection = () => (
  <section id="retail" className="deck-section motif-retail relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
    <SectionBackground videoSrc={retailVideo} poster={media.interior} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
    <div className="section-halo loop-sweep" aria-hidden="true" />
    <div className="retail-lightbox loop-lightbox" aria-hidden="true" />
    <div className="mx-auto w-full max-w-[1600px]">
      <SectionTitle
        dark
        eyebrow="Retail"
        title="Retail needs to feel curated, not crowded."
        summary="This beat should sell the retail logic, not list stores: anchor traffic, discovery energy, and flexible formats that turn audience scale into tenant revenue."
      />

      <div className="mt-10">
        <Carousel
          items={retailPaths}
          ariaLabel="Retail lanes"
          className="mx-auto max-w-[1200px]"
          slideClassName="px-2"
          autoPlay
          interval={4200}
          pauseOnHover={false}
          respectReducedMotion={false}
          renderItem={(path) => (
            <motion.article
              key={path.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="cinema-card group relative min-h-[24rem] overflow-hidden border border-white/10 bg-white/[0.055] p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${path.accent} opacity-90`} />
              <div className="retail-lane-lines" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Retail lane</div>
                  <h3 className="mt-4 text-3xl font-display text-cream">{path.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{path.summary}</p>
                </div>
                <div className="space-y-3">
                  {path.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 text-sm leading-7 text-white/78">
                      <Star className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          )}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <VideoCard
          src={placeholderVideo}
          poster={media.interior}
          className="min-h-[22rem]"
          caption="Retail becomes a motion story here: bright, active, and easy to understand in a few seconds."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: 'Flagship traffic', body: 'Destination brands benefit from the mall\'s natural pull across family, tourist, and regional audiences.' },
            { title: 'Pop-up economics', body: 'Seasonal or limited-time activations can live inside a more permanent ecosystem without losing urgency.' },
            { title: 'Cross-shopping', body: 'Retail, food, and attractions all feed the same trip, which increases the value of every square foot.' },
            { title: 'Visual merchandising', body: 'Wide corridors and large arrival moments create better windows, better dwell, and better staging.' },
          ].map((item) => (
            <div key={item.title} className="cinema-card border border-white/10 bg-white/[0.045] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40">{item.title}</div>
              <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LuxurySection = () => (
  <section id="luxury" className="deck-section motif-vault relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
    <SectionBackground imageSrc={media.aerial} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
    <div className="vault-lines loop-vault" aria-hidden="true" />
    <div className="mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div className="order-2 lg:order-1">
        <SectionTitle
          dark
          eyebrow="Premium path"
          title="When the brief calls for prestige, the pitch should slow down."
          summary="The premium story is about pacing: fewer claims, stronger atmosphere, and a clear path for launches, elevated merchandising, and high-touch clienteling."
        />

        <div className="mt-8 grid gap-4">
          {[
            'Premium brands can use the destination to reach affluent households, travelers, and family decision-makers in one place.',
            'Launches feel more important when they sit inside a destination with proven scale, architecture, and repeat visitation.',
            'Seasonal campaigns can move from awareness to conversion because the mall naturally supports longer dwell and more than one visit type.',
          ].map((line) => (
            <div key={line} className="cinema-card border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_60px_rgba(6,8,12,0.35)]">
              <div className="flex items-start gap-3 text-sm leading-7 text-white/70">
                <Crown className="mt-0.5 h-4 w-4 text-amber-200" />
                <span>{line}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 grid gap-4 md:grid-cols-2">
        <div className="relative md:row-span-2">
          <ImageCard src={media.aerial} alt="Mall of America aerial context" className="aspect-[4/5]" caption="Premium positioning begins with arrival and proportion." />
          <div className="luxury-shimmer loop-shimmer" aria-hidden="true" />
        </div>
        <ImageCard src={media.interior} alt="Mall of America interior" className="aspect-[4/3]" caption="Controlled interiors make it easier to stage premium storytelling." />
        <div className="cinema-card bg-ink-950 p-6 text-white shadow-[0_24px_80px_rgba(5,8,12,0.35)]">
          <div className="text-[11px] font-bold uppercase tracking-[0.42em] text-white/40">Luxury-ready cues</div>
          <div className="mt-4 text-3xl font-display text-cream">Elevated, visual, and appointment-worthy.</div>
          <div className="mt-5 space-y-3 text-sm leading-7 text-white/70">
            <div className="flex items-start gap-3"><Sparkles className="mt-1 h-4 w-4 text-amber-200" />Private previews and VIP events</div>
            <div className="flex items-start gap-3"><Sparkles className="mt-1 h-4 w-4 text-amber-200" />High-impact windows and premium merchandising</div>
            <div className="flex items-start gap-3"><Sparkles className="mt-1 h-4 w-4 text-amber-200" />Strong adjacency to dining and entertainment</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DiningSection = () => (
  <section id="dining" className="deck-section motif-dining relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
    <SectionBackground videoSrc={diningVideo} poster={media.interior} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
    <div className="dining-sweep loop-sweep" aria-hidden="true" />
    <div className="table-glow loop-table" aria-hidden="true" />
    <div className="mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="order-2 lg:order-1 grid gap-4 md:grid-cols-2">
        <VideoCard
          src={diningVideo}
          poster={media.interior}
          className="aspect-[4/5] md:row-span-2"
          caption="The lifestyle layer keeps visitors present, spending, and ready for brand moments."
        />
        <div className="cinema-card border border-white/10 bg-white/[0.045] p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Lifestyle role</div>
          <div className="mt-4 text-3xl font-display text-cream">Hospitality turns a trip into an occasion.</div>
          <p className="mt-4 text-sm leading-7 text-white/70">When the destination feels like a day out, conversion improves across retail, entertainment, and brand activations. This is the commercial bridge between browsing and buying.</p>
        </div>
        <div className="cinema-card border border-white/10 bg-white/[0.045] p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Partner angle</div>
          <div className="mt-4 text-3xl font-display text-cream">The best moments happen between destinations.</div>
          <p className="mt-4 text-sm leading-7 text-white/70">Lounges, social zones, and high-comfort dayparts create natural touchpoints for sampling, launches, and sponsor visibility without interrupting the guest flow.</p>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <SectionTitle
          dark
          eyebrow="Lifestyle and hospitality"
          title="Make the destination feel like time well spent."
          summary="Hospitality is the bridge from traffic to time spent. It gives sponsors natural touchpoints, gives tenants higher-quality visits, and makes the destination feel like an occasion."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Visitor energy', value: 'More dwell', icon: <Users className="h-5 w-5" /> },
            { label: 'Brand moments', value: 'More activations', icon: <Sparkles className="h-5 w-5" /> },
            { label: 'Premium cues', value: 'More comfort', icon: <Crown className="h-5 w-5" /> },
          ].map((item) => (
            <div key={item.label} className="cinema-card border border-white/10 bg-white/[0.045] p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/40">
                {item.icon}
                {item.label}
              </div>
              <div className="mt-4 text-2xl font-display text-cream">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="cinema-card mt-6 border border-white/10 bg-black/30 p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Best pitch line</div>
          <p className="mt-4 text-2xl leading-9 text-white/80 md:text-3xl font-display">
            The most valuable tenant mix is not just what people buy. It is how the destination makes people want to stay.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AttractionsSection = () => {
  const attractionCards = [
    { title: 'Nickelodeon Universe', body: 'The largest indoor theme park in the United States gives the property its unmistakable energy.', icon: <PartyPopper className="h-5 w-5" /> },
    { title: 'SEA LIFE aquarium', body: 'A tunnel aquarium and family-friendly daypart that broadens who comes and why.', icon: <Sparkles className="h-5 w-5" /> },
    { title: 'B&B Theatres', body: 'Moviegoing adds another reason to stay on property after retail and dining.', icon: <CirclePlay className="h-5 w-5" /> },
    { title: 'Adventure golf and play', body: 'Small-format entertainment keeps the destination flexible for families and groups.', icon: <Compass className="h-5 w-5" /> },
  ];

  return (
    <section id="attractions" className="deck-section motif-kinetic relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
      <SectionBackground imageSrc={media.amusement} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
      <div className="section-halo loop-sweep" aria-hidden="true" />
      <div className="kinetic-rings loop-rotate" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1600px]">
        <SectionTitle
          dark
          eyebrow="Attractions and entertainment"
          title="This is the differentiator."
          summary="Attractions are the proof that this is not just retail. They create trip intent, repeat visitation, and a more emotionally charged platform for tenants and sponsors."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Carousel
            items={attractionCards}
            ariaLabel="Attraction highlights"
            className="lg:pr-6"
            slideClassName="px-2"
            autoPlay
            interval={4200}
            pauseOnHover={false}
            respectReducedMotion={false}
            renderItem={(item) => (
              <div className="cinema-card border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_60px_rgba(6,8,12,0.35)]">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-white/55">
                  {item.icon}
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
              </div>
            )}
          />

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <VideoCard
              src={attractionVideo}
              poster={media.amusement}
              className="min-h-[24rem]"
              caption="The visual language should feel kinetic and family-scale, not like a static directory page."
            />
            <div className="grid gap-4">
              <ImageCard src={media.amusement} alt="Nickelodeon Universe at Mall of America" className="aspect-[4/3]" caption="The entertainment story is the scale story." />
              <div className="cinema-card bg-ink-950 p-6 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Event fit</div>
                <div className="mt-4 text-3xl font-display text-cream">Entertainment makes the property feel alive between retail moments.</div>
                <p className="mt-4 text-sm leading-7 text-white/50">That matters to tenants and sponsors because the property already has the emotional architecture needed for launches, seasonal programming, and repeat attendance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EventsSection = () => {
  const eventCards = [
    { title: 'Concerts and talent', body: 'Use the property to stage live moments that carry beyond the day of the event.', icon: <CalendarDays className="h-5 w-5" /> },
    { title: 'Brand activations', body: 'Build immersive experiences that let sponsors touch the audience in a physical way.', icon: <Star className="h-5 w-5" /> },
    { title: 'Corporate and launch events', body: 'Bring product teams, media, and decision-makers into a destination that already feels important.', icon: <Ticket className="h-5 w-5" /> },
  ];

  const eventSignals = [
    { title: 'Live moments', detail: 'Concerts, talent drops, premieres.', icon: <CalendarDays className="h-4 w-4" /> },
    { title: 'Sponsor scale', detail: 'Buildable, brand-owned experiences.', icon: <Star className="h-4 w-4" /> },
    { title: 'Launches', detail: 'Product reveals and partner showcases.', icon: <Ticket className="h-4 w-4" /> },
    { title: 'Seasonal peaks', detail: 'Calendar ownership across key weeks.', icon: <PartyPopper className="h-4 w-4" /> },
  ];

  const eventStats = [
    { label: 'Audience energy', value: 'High dwell', note: 'More time on site, higher conversion.' },
    { label: 'Partner value', value: 'Brand lift', note: 'Measurable sponsor outcomes.' },
  ];

  return (
    <section id="events" className="deck-section motif-broadcast relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
      <SectionBackground videoSrc={crowdVideo} poster={media.interior} overlayClassName="section-overlay--dark" mediaClassName="opacity-40" />
      <div className="section-halo loop-sweep" aria-hidden="true" />
      <div className="broadcast-scan loop-scan" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-8">
          <SectionTitle
            dark
            eyebrow="Events and platform"
            title="The mall can act like a media platform."
            summary="Concerts, launches, celebrity appearances, seasonal spectacles, and brand activations become easier to sell when the venue already has audience, dwell, and visual identity."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {eventSignals.map((signal) => (
              <div key={signal.title} className="cinema-card border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-white/45">
                  {signal.icon}
                  {signal.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/70">{signal.detail}</p>
              </div>
            ))}
          </div>

          <div className="cinema-card border border-white/10 bg-black/35 p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Program cadence</div>
            <p className="mt-4 text-xl leading-8 text-white/75 md:text-2xl font-display">
              Stack anchor moments with sponsor-ready activations to keep the calendar commercially active.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <VideoCard src={crowdVideo} poster={media.interior} className="min-h-[24rem]" caption="A live-event frame helps prospects feel the scale, energy, and commercial opportunity immediately." />
          <div className="grid gap-4 sm:grid-cols-2">
            {eventStats.map((stat) => (
              <div key={stat.label} className="cinema-card border border-white/10 bg-white/[0.04] p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/45">{stat.label}</div>
                <div className="mt-4 text-2xl font-display text-cream">{stat.value}</div>
                <p className="mt-3 text-sm leading-6 text-white/65">{stat.note}</p>
              </div>
            ))}
          </div>
          <Carousel
            items={eventCards}
            ariaLabel="Event programs"
            slideClassName="px-2"
            autoPlay
            interval={4200}
            pauseOnHover={false}
            respectReducedMotion={false}
            renderItem={(item) => (
              <div className="cinema-card border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                  {item.icon}
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

const PlatformSection = ({ onOpenContact }: { onOpenContact: (source: string) => void }) => {
  const [activeModule, setActiveModule] = useState(MODULES[0]);

  return (
    <section id="platform" className="deck-section motif-broadcast relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
      <SectionBackground videoSrc={crowdVideo} poster={media.interior} overlayClassName="section-overlay--dark" mediaClassName="opacity-35" />
      <div className="section-halo loop-sweep" aria-hidden="true" />
      <div className="broadcast-scan loop-scan" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-8">
          <SectionTitle
            dark
            eyebrow="Platform modules"
            title="Expandable paths for every buyer."
            summary="Each module can expand into a deeper sub-deck. Leasing, sponsorship, events, and venues all have distinct stories and CTAs."
          />

          <div className="grid gap-3">
            {MODULES.map((module) => (
              <button
                key={module.id}
                type="button"
                onClick={() => setActiveModule(module)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                  activeModule.id === module.id ? 'border-white/45 bg-white text-ink-950' : 'border-white/10 bg-white/[0.04] text-white hover:bg-white/10'
                }`}
              >
                <span>
                  <span className={`block text-[10px] font-bold uppercase tracking-[0.35em] ${activeModule.id === module.id ? 'text-ink-500' : 'text-white/40'}`}>
                    Module
                  </span>
                  <span className="mt-1 block text-lg font-semibold">{module.title}</span>
                </span>
                <ChevronRight className={`h-4 w-4 ${activeModule.id === module.id ? 'text-ink-500' : 'text-white/50'}`} />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="cinema-card border border-white/10 bg-white/[0.05] p-6 shadow-[0_32px_120px_rgba(5,8,12,0.45)]"
        >
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
            {activeModule.icon}
            {activeModule.title}
          </div>
          <h3 className="mt-4 text-4xl font-display text-cream">{activeModule.summary}</h3>
          <div className="mt-6 grid gap-3">
            {activeModule.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                <Sparkles className="mt-1 h-4 w-4 text-amber-200" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryButton onClick={() => onOpenContact(activeModule.id)} dark>
              {activeModule.cta}
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DealRoomSection = ({ onOpenContact }: { onOpenContact: (source: string) => void }) => (
  <section id="deal-room" className="deck-section motif-deal relative overflow-hidden bg-ink-950 px-4 py-16 text-white md:px-6 lg:py-20">
    <div className="absolute inset-0">
      <video autoPlay muted loop playsInline preload="metadata" poster={media.interior} className="h-full w-full object-cover opacity-35">
        <source src={crowdVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,15,0.94),rgba(7,10,15,0.72),rgba(7,10,15,0.88)),radial-gradient(circle_at_78%_22%,rgba(255,205,130,0.2),transparent_34%)]" />
    </div>
    <div className="deal-glow loop-pulse" aria-hidden="true" />
    <div className="deal-shutter loop-shutter" aria-hidden="true" />

    <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <SectionTitle
        dark
        eyebrow="Commercial close"
        title="One clear ending: start the conversation."
        summary="Instead of opening extra branches, the deck now closes with three plain next steps so the prospect knows exactly how to respond."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Lease a retail space', body: 'Start a tenant conversation around category fit, footprint, and merchandising opportunity.', source: 'lease_now', icon: <ShoppingBag className="h-5 w-5" /> },
          { title: 'Plan a brand partnership', body: 'Open a sponsorship conversation around seasonal takeovers, family audience reach, and live moments.', source: 'partner_now', icon: <Star className="h-5 w-5" /> },
          { title: 'Book an event', body: 'Start a booking conversation for launches, performances, creator appearances, or experiential programs.', source: 'book_event', icon: <Ticket className="h-5 w-5" /> },
        ].map((item) => (
          <motion.button
            key={item.title}
            onClick={() => onOpenContact(item.source)}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="cinema-card group flex min-h-[22rem] flex-col justify-between border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur-md transition hover:bg-cream hover:text-ink-950"
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 group-hover:text-ink-500">
                {item.icon}
                Decision path
              </div>
              <h3 className="mt-5 text-5xl leading-none font-display text-cream group-hover:text-ink-950">{item.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/70 group-hover:text-ink-700">{item.body}</p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              Start here
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [introDuration, setIntroDuration] = useState(6800);
  const activeSection = SECTIONS[activeIndex]?.id ?? SECTIONS[0].id;

  const handleNavigate = (id: string) => {
    const targetIndex = SECTIONS.findIndex((section) => section.id === id);
    if (targetIndex === -1 || targetIndex === activeIndex) {
      return;
    }

    setDirection(targetIndex > activeIndex ? 1 : -1);
    setActiveIndex(targetIndex);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((current) => Math.min(current + 1, SECTIONS.length - 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const handleContactSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.statusText}`);
      }

      const result = await response.json();
      trackFormSubmission(data.interest, true);
      return result;
    } catch (error) {
      trackFormSubmission(data.interest, false);
      throw error;
    }
  };

  const handleOpenContact = (source?: string) => {
    setIsContactOpen(true);
    trackCTAClick('contact_form_open', source || 'unknown');
  };

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isIntroComplete) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditing = target ? ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) : false;

      if (isEditing) {
        return;
      }

      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        handleNext();
      }

      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        handlePrev();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        handleNavigate(SECTIONS[0].id);
      }

      if (event.key === 'End') {
        event.preventDefault();
        handleNavigate(SECTIONS[SECTIONS.length - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isIntroComplete]);

  useEffect(() => {
    const updateIntroDuration = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIntroDuration(isMobile ? 5200 : 7200);
    };

    updateIntroDuration();
    window.addEventListener('resize', updateIntroDuration);
    return () => window.removeEventListener('resize', updateIntroDuration);
  }, []);

  const slides = [
    { id: 'overview', element: <HeroSection onNavigate={handleNavigate} /> },
    { id: 'why', element: <WhySection /> },
    { id: 'retail', element: <RetailSection /> },
    { id: 'luxury', element: <LuxurySection /> },
    { id: 'dining', element: <DiningSection /> },
    { id: 'attractions', element: <AttractionsSection /> },
    { id: 'events', element: <EventsSection /> },
    { id: 'platform', element: <PlatformSection onOpenContact={handleOpenContact} /> },
    { id: 'deal-room', element: <DealRoomSection onOpenContact={handleOpenContact} /> },
  ];

  const activeSlide = slides[activeIndex] ?? slides[0];
  const transitionSequence = useMemo(() => {
    const shuffled = [...transitionOrder];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);
  const transitionType = transitionSequence[activeIndex % transitionSequence.length];
  const progress = SECTIONS.length > 1 ? activeIndex / (SECTIONS.length - 1) : 1;

  return (
    <AnimatePresence mode="wait">
      {!isIntroComplete ? (
        <IntroScreen
          key="intro"
          videoSrc={heroVideo}
          eyebrow={PROPERTY.deckTag}
          title={PROPERTY.name}
          subtitle={PROPERTY.tagline}
          autoAdvanceMs={introDuration}
          onSkip={() => setIsIntroComplete(true)}
        />
      ) : (
        <motion.div
          key="deck"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="bg-ink-950 text-white antialiased selection:bg-cream selection:text-ink-950"
        >
          <motion.div
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-amber-200"
            animate={{ scaleX: progress }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <Navigation activeSection={activeSection} currentIndex={activeIndex} onNavigate={handleNavigate} onNext={handleNext} onPrev={handlePrev} />
          <main className="deck-stage">
            <AnimatePresence mode="wait" custom={direction}>
              <SectionTransition key={activeSlide.id} transitionType={transitionType} direction={direction}>
                {activeSlide.element}
              </SectionTransition>
            </AnimatePresence>
          </main>
          <Modal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            title="Get in Touch"
            subtitle="Tell us about your interest in Mall of America. We'll be in touch shortly."
          >
            <ContactForm onSubmit={handleContactSubmit} onClose={() => setIsContactOpen(false)} />
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
