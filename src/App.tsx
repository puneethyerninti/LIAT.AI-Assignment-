import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Compass,
  Crown,
  Layers3,
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
  UtensilsCrossed,
  X,
} from 'lucide-react';

type Fact = {
  label: string;
  value: string;
  note: string;
  icon: ReactNode;
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

type ModuleKey = 'leasing' | 'sponsorship' | 'events' | 'venues';

type ModuleCard = {
  title: string;
  eyebrow: string;
  body: string;
  bullets: string[];
};

type ModuleConfig = {
  title: string;
  summary: string;
  cta: string;
  cards: ModuleCard[];
};

const heroVideo = '/assets/14881421_1080_1920_60fps.mp4';
const crowdVideo = '/assets/14881421_1080_1920_60fps.mp4';
const retailVideo = '/assets/14922381_1080_1920_30fps.mp4';
const diningVideo = '/assets/14922381_1080_1920_30fps.mp4';
const attractionVideo = '/assets/14881421_1080_1920_60fps.mp4';

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
  { id: 'platform', label: 'Modules' },
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

const MODULES: Record<ModuleKey, ModuleConfig> = {
  leasing: {
    title: 'Leasing paths',
    summary: 'Segmented pitches for brands that need different proof points: prestige, frequency, experimentation, or scale.',
    cta: 'Open tenant conversation',
    cards: [
      { title: 'Luxury and premium', eyebrow: 'Curated', body: 'For brands that need a controlled, elevated setting with strong visual merchandising and appointment-worthy discovery.', bullets: ['Private clienteling moments', 'Seasonal windows and launch moments', 'Premium fit-out storytelling'] },
      { title: 'Mid-tier and volume', eyebrow: 'Reach', body: 'For growth brands that want a dependable traffic engine and a broad regional audience across families and tourists.', bullets: ['High repeat visitation', 'Cross-shopping across categories', 'Strong conversion potential'] },
      { title: 'Pop-up and test', eyebrow: 'Fast', body: 'For launches, holiday drops, and product-market fit experiments with short lead times and clear measurement.', bullets: ['Flexible footprints', 'High-energy traffic capture', 'Campaign-friendly scheduling'] },
    ],
  },
  sponsorship: {
    title: 'Sponsorship platform',
    summary: 'Partnership tiers built around audience reach, cultural relevance, and repeated visibility across the full destination.',
    cta: 'Request sponsorship options',
    cards: [
      { title: 'Signature takeover', eyebrow: 'Premium', body: 'Rotunda or seasonal centerpiece domination for launches that need to feel unavoidable.', bullets: ['Digital and physical presence', 'Media-ready storytelling', 'Limited exclusivity windows'] },
      { title: 'Family audience programs', eyebrow: 'Scale', body: 'Tie-ins around holidays, back-to-school, travel seasons, and multi-generational weekends.', bullets: ['Brand-safe atmosphere', 'High dwell time', 'Shareable content moments'] },
      { title: 'Always-on media', eyebrow: 'Reach', body: 'A continuous visibility layer that keeps your brand in front of visitors from arrival to exit.', bullets: ['Directional touchpoints', 'Venue branding', 'Measurable impressions'] },
    ],
  },
  events: {
    title: 'Event engine',
    summary: 'The property is not just a tenant mix. It is a live content platform for concerts, launches, creator appearances, and holiday programming.',
    cta: 'Explore booking windows',
    cards: [
      { title: 'Concerts and performances', eyebrow: 'Live', body: 'Turn the destination into a stage with programmable crowd flow, family appeal, and media visibility.', bullets: ['Ticketed or free activations', 'High-energy arrival moments', 'Brand partnership extensions'] },
      { title: 'Product launches', eyebrow: 'Launch', body: 'Use the property as a launchpad for drops, premieres, and press-friendly reveal moments.', bullets: ['Strong visual backdrops', 'Creator-friendly pacing', 'Integrated retail follow-through'] },
      { title: 'Holiday spectacles', eyebrow: 'Seasonal', body: 'Program the calendar around peak trading periods so the destination stays culturally relevant all year.', bullets: ['Signature installations', 'Holiday traffic lift', 'Repeatable annual formats'] },
    ],
  },
  venues: {
    title: 'Venue concepts',
    summary: 'Expandable spaces and hypothetical modules that make the property feel like a venue network, not a single mall.',
    cta: 'See venue concepts',
    cards: [
      { title: 'Performing arts shell', eyebrow: 'Stage', body: 'A configurable showcase space for panels, performances, and brand moments that need theatrical energy.', bullets: ['Flexible audience layouts', 'Media and lighting-friendly', 'Sponsor-ready backdrops'] },
      { title: 'Expo and showcase floor', eyebrow: 'Convention', body: 'A more formal B2B-friendly layout for trade moments, product demos, and corporate-hosted programming.', bullets: ['Brand neighborhood zones', 'Sampling and lead capture', 'Easy breakout programming'] },
      { title: 'VIP hospitality suite', eyebrow: 'Hospitality', body: 'A private layer for decision-makers, creators, and press that turns the property into a hosted experience.', bullets: ['Invite-only access', 'Premium hospitality cues', 'Closing-room utility'] },
    ],
  },
};

const SectionTitle = ({ eyebrow, title, summary, dark = false }: { eyebrow: string; title: string; summary: string; dark?: boolean }) => (
  <div className="max-w-3xl">
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      className={`text-[11px] font-bold uppercase tracking-[0.45em] ${dark ? 'text-white/50' : 'text-ink-600'}`}
    >
      {eyebrow}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.08 }}
      className={`mt-4 text-4xl md:text-6xl leading-[0.95] ${dark ? 'text-cream' : 'text-ink-950'} font-display`}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.16 }}
      className={`mt-5 text-base md:text-lg leading-8 ${dark ? 'text-white/70' : 'text-ink-700'}`}
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
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
  <figure className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${className}`}>
    <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    {caption ? <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm text-white/80">{caption}</figcaption> : null}
  </figure>
);

const VideoCard = ({ src, poster, caption, className = '' }: { src: string; poster?: string; caption: string; className?: string }) => (
  <figure className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${className}`}>
    <video autoPlay muted loop playsInline preload="metadata" poster={poster} className="h-full w-full object-cover">
      <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
      <div className="max-w-[16rem] text-sm leading-6 text-white/80">{caption}</div>
      <CirclePlay className="h-6 w-6 text-white/70" />
    </div>
  </figure>
);

const SectionPill = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
    {label}
  </span>
);

const PrimaryButton = ({ children, onClick, dark = false }: { children: ReactNode; onClick: () => void; dark?: boolean }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
      dark ? 'bg-cream text-ink-950' : 'bg-ink-950 text-cream'
    }`}
  >
    {children}
    <ArrowUpRight className="h-4 w-4" />
  </button>
);

const Navigation = ({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsXL(window.innerWidth >= 1280);
    };
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-3 text-white backdrop-blur-2xl md:px-5">
          <button onClick={() => onNavigate('overview')} className="flex items-center gap-3 text-left">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.4em] text-white/75">
              MOA
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.42em] text-white/50">{PROPERTY.deckTag}</div>
              <div className="mt-1 text-sm font-semibold text-white">{PROPERTY.name}</div>
            </div>
          </button>

          {!isMobile && (
            <div className="items-center gap-2 flex">
              {SECTIONS.slice(0, 6).map((section) => (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] transition ${
                    activeSection === section.id ? 'bg-white text-ink-950' : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <PrimaryButton onClick={() => onNavigate('platform')}>Book a walkthrough</PrimaryButton>
            <button
              onClick={() => setIsOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Open deck navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
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
            <div className="mx-auto grid max-w-[1600px] gap-6 rounded-[2rem] border border-white/10 bg-ink-950/95 p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr] md:p-8">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Quick jump</div>
                <div className="mt-5 grid gap-2 md:grid-cols-2">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onNavigate(section.id);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition hover:bg-white/10"
                    >
                      <span className="text-lg font-semibold">{section.label}</span>
                      <ChevronRight className="h-4 w-4 text-white/40" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 self-end">
                <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Primary actions</div>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <div>Drive retail leasing, sponsorship, and event bookings from a single self-guided deck.</div>
                    <div>Use the module tabs to move from overview to tailored conversations without leaving the page.</div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/70">
                  The deck is built to work on a live call or as a standalone link someone can explore alone.
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {isMobile && (
        <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-ink-950/80 p-2 text-white backdrop-blur-2xl">
          {SECTIONS.slice(0, 5).map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${
                activeSection === section.id ? 'bg-white text-ink-950' : 'text-white/50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      )}

      {isXL && (
        <div className="fixed left-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-4">
          {SECTIONS.map((section) => (
            <button key={section.id} onClick={() => onNavigate(section.id)} className="group relative flex items-center gap-3">
              <span
                className={`block h-12 w-1 rounded-full transition-all duration-300 ${
                  activeSection === section.id ? 'bg-white' : 'bg-white/20 group-hover:bg-white/50'
                }`}
              />
              <span
                className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] transition ${
                  activeSection === section.id ? 'translate-x-0 text-white opacity-100' : '-translate-x-2 text-white/0 opacity-0'
                }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <section id="overview" className="relative min-h-screen overflow-hidden bg-ink-950 text-white">
    <div className="absolute inset-0">
      <video autoPlay muted loop playsInline preload="metadata" poster={media.aerial} className="h-full w-full object-cover opacity-65">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,194,120,0.26),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.18),_transparent_28%),linear-gradient(to_bottom,rgba(7,10,15,0.2),rgba(7,10,15,0.9))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,15,0.65),rgba(7,10,15,0.08),rgba(7,10,15,0.4))]" />
    </div>

    <div className="relative mx-auto grid min-h-screen max-w-[1600px] gap-10 px-4 pt-28 pb-12 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-28">
      <div className="max-w-3xl">
        <SectionPill label={PROPERTY.deckTag} />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mt-6 text-6xl leading-[0.92] tracking-tight text-cream md:text-8xl lg:text-[6.8rem] font-display"
        >
          {PROPERTY.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl"
        >
          {PROPERTY.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl text-sm leading-7 text-white/50 md:text-base"
        >
          {PROPERTY.summary}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton onClick={() => onNavigate('why')} dark>
            Start the story
          </PrimaryButton>
          <button
            onClick={() => onNavigate('platform')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Open modules
            <Layers3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
          >
            Jump to events
            <Ticket className="h-4 w-4" />
          </button>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {FACTS.map((fact) => (
            <MetricCard key={fact.label} fact={fact} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:self-end">
        <div className="grid gap-4 md:grid-cols-2">
          <ImageCard
            src={media.aerial}
            alt="Mall of America aerial view"
            className="aspect-[4/5] md:row-span-2"
            caption="A destination large enough to behave like a district, not a storefront."
          />
          <VideoCard
            src={crowdVideo}
            poster={media.interior}
            className="aspect-[4/3]"
            caption="Video carries the energy here: crowd scale, movement, and the feeling of constant activity."
          />
          <ImageCard src={media.transit} alt="Mall of America transit station entrance" className="aspect-[4/3]" caption="Transit, parking, and arrival are part of the pitch." />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Audience reach</div>
            <div className="mt-4 text-2xl font-display text-cream">Regional, tourist, and tourist-adjacent demand</div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Business goal</div>
            <div className="mt-4 text-2xl font-display text-cream">Lease, sponsor, or book the venue</div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Format</div>
            <div className="mt-4 text-2xl font-display text-cream">Self-guided or screen-share ready</div>
          </div>
        </div>
      </div>
    </div>

    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50">
      <ChevronDown className="h-8 w-8" />
    </motion.div>
  </section>
);

const WhySection = () => (
  <section id="why" className="bg-cream px-4 py-24 text-ink-950 md:px-6 lg:py-32">
    <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <div>
        <SectionTitle
          eyebrow="Why this property"
          title="It performs like a small city."
          summary="Mall of America is one of the few retail properties that already behaves like a mixed-use destination: transit, attractions, dining, and all-day reasons to stay. That makes it ideal for a sales tool that needs to move beyond static square footage and into commercial momentum."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: <MapPin className="h-5 w-5" />, title: 'Location advantage', body: 'Steps from Minneapolis-Saint Paul International Airport and on the region\'s main transit network.' },
            { icon: <TramFront className="h-5 w-5" />, title: 'Transit hub', body: 'Blue Line, Red Line, D Line, buses, hotel shuttles, and commuter connectivity make the property easy to reach.' },
            { icon: <Landmark className="h-5 w-5" />, title: 'Destination scale', body: 'The size and tenancy density create repeat trips and more chances to cross-sell across categories.' },
            { icon: <Sparkles className="h-5 w-5" />, title: 'All-weather relevance', body: 'The property is built to keep visitors inside the experience, regardless of season or weather.' },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-ink-900/10 bg-white p-6 shadow-[0_24px_80px_rgba(14,18,25,0.08)]">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-ink-600">
                {item.icon}
                {item.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-700">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] bg-ink-950 p-5 text-white shadow-[0_30px_100px_rgba(6,8,12,0.25)] md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Core proof points</div>
            <div className="mt-3 text-3xl font-display text-cream">The story is already built into the property.</div>
          </div>
          <Building2 className="h-8 w-8 text-white/40" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Retail base</div>
            <div className="mt-3 text-2xl font-display text-cream">520 stores and services</div>
            <div className="mt-2 text-sm leading-7 text-white/50">Enough variety to support both frequency and discovery.</div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Visitor draw</div>
            <div className="mt-3 text-2xl font-display text-cream">32M+ annual visits</div>
            <div className="mt-2 text-sm leading-7 text-white/50">A broad audience mix that creates more than one route to revenue.</div>
          </div>
        </div>
        <ImageCard src={media.interior} alt="Mall of America interior corridor" className="aspect-[16/10]" caption="A controlled interior environment lets the storytelling feel premium and consistent." />
      </div>
    </div>
  </section>
);

const RetailSection = () => (
  <section id="retail" className="bg-ink-950 px-4 py-24 text-white md:px-6 lg:py-32">
    <div className="mx-auto max-w-[1600px]">
      <SectionTitle
        dark
        eyebrow="Retail"
        title="Retail needs to feel curated, not crowded."
        summary="The deck should not read like a directory. It should show how the tenant mix supports different business intents, from anchor traffic to experimentation."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {retailPaths.map((path) => (
          <motion.article
            key={path.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${path.accent} opacity-90`} />
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
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <VideoCard
          src={retailVideo}
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
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
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
  <section id="luxury" className="bg-cream px-4 py-24 text-ink-950 md:px-6 lg:py-32">
    <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div className="order-2 lg:order-1">
        <SectionTitle
          eyebrow="Premium path"
          title="When the brief calls for prestige, the pitch should slow down."
          summary="Mall of America is not a pure luxury mall, but the deck can still show how the environment supports a premium lane for flagship launches, elevated merchandising, and higher-touch clienteling."
        />

        <div className="mt-8 grid gap-4">
          {[
            'Premium brands can use the destination to reach affluent households, travelers, and family decision-makers in one place.',
            'Launches feel more important when they sit inside a destination with proven scale, architecture, and repeat visitation.',
            'Seasonal campaigns can move from awareness to conversion because the mall naturally supports longer dwell and more than one visit type.',
          ].map((line) => (
            <div key={line} className="rounded-[1.5rem] border border-ink-900/10 bg-white p-5 shadow-[0_24px_60px_rgba(15,18,22,0.08)]">
              <div className="flex items-start gap-3 text-sm leading-7 text-ink-700">
                <Crown className="mt-0.5 h-4 w-4 text-amber-700" />
                <span>{line}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 grid gap-4 md:grid-cols-2">
        <ImageCard src={media.aerial} alt="Mall of America aerial context" className="aspect-[4/5] md:row-span-2" caption="Premium positioning begins with arrival and proportion." />
        <ImageCard src={media.interior} alt="Mall of America interior" className="aspect-[4/3]" caption="Controlled interiors make it easier to stage premium storytelling." />
        <div className="rounded-[2rem] bg-ink-950 p-6 text-white shadow-[0_24px_80px_rgba(5,8,12,0.35)]">
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
  <section id="dining" className="bg-ink-950 px-4 py-24 text-white md:px-6 lg:py-32">
    <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="order-2 lg:order-1 grid gap-4 md:grid-cols-2">
        <VideoCard
          src={diningVideo}
          poster={media.interior}
          className="aspect-[4/5] md:row-span-2"
          caption="Food is not an afterthought here; it keeps the trip longer, warmer, and commercially richer."
        />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Dining role</div>
          <div className="mt-4 text-3xl font-display text-cream">The meal is part of the destination story.</div>
          <p className="mt-4 text-sm leading-7 text-white/70">That matters because dining extends dwell time, creates social content, and gives brand partners a softer entry point into the property.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Commercial angle</div>
          <div className="mt-4 text-3xl font-display text-cream">Food, beverage, and lifestyle tenants all feed the same trip.</div>
          <p className="mt-4 text-sm leading-7 text-white/70">A dining cluster is easier to sell when it sits inside a larger, always-on attraction ecosystem.</p>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <SectionTitle
          dark
          eyebrow="Dining and lifestyle"
          title="Food should feel like a reason to visit, not a reason to leave."
          summary="For a mall of this scale, dining is a lifestyle lever. It turns a shopping trip into a daypart strategy and gives the sales team another reason to pitch brands on dwell, discovery, and repeat visits."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Longer stays', value: 'More dwell', icon: <UtensilsCrossed className="h-5 w-5" /> },
            { label: 'Content value', value: 'More shareable', icon: <Sparkles className="h-5 w-5" /> },
            { label: 'Audience mix', value: 'More occasions', icon: <Users className="h-5 w-5" /> },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/40">
                {item.icon}
                {item.label}
              </div>
              <div className="mt-4 text-2xl font-display text-cream">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/30 p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Best pitch line</div>
          <p className="mt-4 text-2xl leading-9 text-white/80 md:text-3xl font-display">
            A great food tenant does not just sell meals. It adds a chapter to the property\'s story and keeps the destination active after the first purchase.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AttractionsSection = () => (
  <section id="attractions" className="bg-cream px-4 py-24 text-ink-950 md:px-6 lg:py-32">
    <div className="mx-auto max-w-[1600px]">
      <SectionTitle
        eyebrow="Attractions and entertainment"
        title="This is the differentiator."
        summary="Attractions are what turn a mall into a destination. They create reasons to come back, stay longer, and bring different people on different days."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: 'Nickelodeon Universe', body: 'The largest indoor theme park in the United States gives the property its unmistakable energy.', icon: <PartyPopper className="h-5 w-5" /> },
            { title: 'SEA LIFE aquarium', body: 'A tunnel aquarium and family-friendly daypart that broadens who comes and why.', icon: <Sparkles className="h-5 w-5" /> },
            { title: 'B&B Theatres', body: 'Moviegoing adds another reason to stay on property after retail and dining.', icon: <CirclePlay className="h-5 w-5" /> },
            { title: 'Adventure golf and play', body: 'Small-format entertainment keeps the destination flexible for families and groups.', icon: <Compass className="h-5 w-5" /> },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-ink-900/10 bg-white p-5 shadow-[0_24px_60px_rgba(15,18,22,0.08)]">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-ink-600">
                {item.icon}
                {item.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-700">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <VideoCard
            src={attractionVideo}
            poster={media.amusement}
            className="min-h-[24rem]"
            caption="The visual language should feel kinetic and family-scale, not like a static directory page."
          />
          <div className="grid gap-4">
            <ImageCard src={media.amusement} alt="Nickelodeon Universe at Mall of America" className="aspect-[4/3]" caption="The entertainment story is the scale story." />
            <div className="rounded-[1.75rem] bg-ink-950 p-6 text-white">
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

const EventsSection = () => (
  <section id="events" className="bg-ink-950 px-4 py-24 text-white md:px-6 lg:py-32">
    <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
      <div>
        <SectionTitle
          dark
          eyebrow="Events and platform"
          title="The mall can act like a media platform."
          summary="Concerts, premieres, celebrity appearances, seasonal spectacles, and brand activations all work better when the destination already has an audience and a visual identity."
        />

        <div className="mt-10 grid gap-4">
          {[
            { title: 'Concerts and talent', body: 'Use the property to stage live moments that carry beyond the day of the event.', icon: <CalendarDays className="h-5 w-5" /> },
            { title: 'Brand activations', body: 'Build immersive experiences that let sponsors touch the audience in a physical way.', icon: <Star className="h-5 w-5" /> },
            { title: 'Corporate and launch events', body: 'Bring product teams, media, and decision-makers into a destination that already feels important.', icon: <Ticket className="h-5 w-5" /> },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                {item.icon}
                {item.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <VideoCard src={crowdVideo} poster={media.interior} className="min-h-[22rem]" caption="A live-event frame helps prospects feel the scale, energy, and commercial opportunity immediately." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Event KPI</div>
            <div className="mt-4 text-3xl font-display text-cream">More than foot traffic.</div>
            <p className="mt-4 text-sm leading-7 text-white/70">Every activation should be measured against leasing, sponsor reach, and venue momentum.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Program logic</div>
            <div className="mt-4 text-3xl font-display text-cream">Own the calendar.</div>
            <p className="mt-4 text-sm leading-7 text-white/70">If the destination owns the calendar, it owns the conversation with tenants and partners.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PlatformSection = ({ activeModule, setActiveModule }: { activeModule: ModuleKey; setActiveModule: (value: ModuleKey) => void }) => {
  const active = MODULES[activeModule];

  return (
    <section id="platform" className="bg-cream px-4 py-24 text-ink-950 md:px-6 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <SectionTitle
          eyebrow="Expandable architecture"
          title="Designed to grow into deeper sub-modules."
          summary="The brief asked for a deck that can expand. This section shows the modular logic: lease by category, sponsor by tier, book events by use case, and create venue-specific stories without rewriting the experience."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {(Object.keys(MODULES) as ModuleKey[]).map((key) => {
              const config = MODULES[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveModule(key)}
                  className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                    activeModule === key ? 'border-ink-950 bg-ink-950 text-white shadow-[0_24px_70px_rgba(14,18,25,0.18)]' : 'border-ink-900/10 bg-white hover:bg-ink-950/5'
                  }`}
                >
                  <div className={`text-[11px] font-bold uppercase tracking-[0.35em] ${activeModule === key ? 'text-white/40' : 'text-ink-500'}`}>{config.title}</div>
                  <div className="mt-3 text-sm leading-7 opacity-90">{config.summary}</div>
                </button>
              );
            })}

            <div className="rounded-[1.75rem] bg-ink-950 p-6 text-white shadow-[0_24px_70px_rgba(14,18,25,0.18)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Action</div>
              <div className="mt-4 text-3xl font-display text-cream">{active.cta}</div>
              <p className="mt-4 text-sm leading-7 text-white/70">This is where the deck moves from inspiration into a commercial conversation.</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
              className="grid gap-4"
            >
              <div className="rounded-[2rem] border border-ink-900/10 bg-white p-6 shadow-[0_24px_80px_rgba(15,18,22,0.08)] md:p-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-500">{active.title}</div>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-700">{active.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {active.cards.map((card) => (
                    <div key={card.title} className="rounded-[1.5rem] border border-ink-900/10 bg-cream p-5">
                      <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-ink-500">{card.eyebrow}</div>
                      <div className="mt-3 text-2xl font-display text-ink-950">{card.title}</div>
                      <p className="mt-3 text-sm leading-7 text-ink-700">{card.body}</p>
                      <div className="mt-4 space-y-2">
                        {card.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2 text-sm leading-6 text-ink-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-ink-900/10 bg-white p-6">
                  <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-500">Why it matters</div>
                  <p className="mt-4 text-sm leading-7 text-ink-700">The architecture keeps the deck non-linear while preserving a clear story path. A salesperson can jump straight to the relevant business case without losing the overall narrative.</p>
                </div>
                <div className="rounded-[1.75rem] border border-ink-900/10 bg-white p-6">
                  <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-500">Next layer</div>
                  <p className="mt-4 text-sm leading-7 text-ink-700">Each module can become a standalone experience later: one for luxury leasing, one for event bookings, one for sponsorship inventory, and one for venue-specific pitches.</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const DealRoomSection = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <section id="deal-room" className="bg-ink-950 px-4 py-24 text-white md:px-6 lg:py-32">
    <div className="mx-auto max-w-[1600px]">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <SectionTitle
          dark
          eyebrow="Commercial close"
          title="The deck ends where the sales conversation begins."
          summary="A premium sales tool should not fade out after inspiration. This closing room turns the story into three concrete next moves: lease the right space, sponsor the right moment, or book the right venue."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Leasing', value: 'Match category to traffic pattern', icon: <ShoppingBag className="h-5 w-5" /> },
            { label: 'Sponsorship', value: 'Pair brand objective with property moment', icon: <Star className="h-5 w-5" /> },
            { label: 'Events', value: 'Shape concept, audience, and calendar window', icon: <Ticket className="h-5 w-5" /> },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/40">
                {item.icon}
                {item.label}
              </div>
              <div className="mt-4 text-2xl font-display text-cream">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: 'Tenant pitch path',
            body: 'For retailers, the strongest story is category fit: flagship visibility, family frequency, tourist reach, or fast pop-up testing.',
            action: 'Open leasing module',
            target: 'platform',
          },
          {
            title: 'Sponsor pitch path',
            body: 'For brand partners, the strongest story is owned attention: seasonal programs, rotunda-scale moments, media inventory, and repeat exposure.',
            action: 'Open partnership tiers',
            target: 'platform',
          },
          {
            title: 'Producer pitch path',
            body: 'For event teams, the strongest story is built-in audience plus infrastructure: arrival, dwell, food, entertainment, and press-friendly visuals.',
            action: 'Open event platform',
            target: 'events',
          },
        ].map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="flex min-h-[22rem] flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Decision path</div>
              <h3 className="mt-4 text-4xl leading-none font-display text-cream">{item.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/70">{item.body}</p>
            </div>
            <button
              onClick={() => onNavigate(item.target)}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item.action}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <footer className="bg-ink-950 px-4 py-16 text-white md:px-6">
    <div className="mx-auto grid max-w-[1600px] gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/40">Closing line</div>
        <div className="mt-4 text-4xl font-display text-cream md:text-6xl">Make the destination feel inevitable.</div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
          This deck is intentionally built like a sales tool rather than a website: fast to scan, cinematic to explore, and modular enough to expand into deeper partner conversations.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <PrimaryButton onClick={() => onNavigate('platform')} dark>
          Open the modules
        </PrimaryButton>
        <button onClick={() => onNavigate('overview')} className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10">
          Back to the top
        </button>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeModule, setActiveModule] = useState<ModuleKey>('leasing');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -60% 0px',
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-ink-950 text-white antialiased selection:bg-cream selection:text-ink-950">
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-amber-200" />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <HeroSection onNavigate={handleNavigate} />
        <WhySection />
        <RetailSection />
        <LuxurySection />
        <DiningSection />
        <AttractionsSection />
        <EventsSection />
        <PlatformSection activeModule={activeModule} setActiveModule={setActiveModule} />
        <DealRoomSection onNavigate={handleNavigate} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
