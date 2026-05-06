import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

type IntroScreenProps = {
  videoSrc: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  onSkip: () => void;
  autoAdvanceMs?: number;
};

export const IntroScreen = ({ videoSrc, title, subtitle, eyebrow, onSkip, autoAdvanceMs = 6500 }: IntroScreenProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioStatus, setAudioStatus] = useState<'ready' | 'playing' | 'blocked'>('ready');
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(autoAdvanceMs / 1000));
  const hasSkipped = useRef(false);
  const audioCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!autoAdvanceMs) {
      return;
    }

    setSecondsLeft(Math.ceil(autoAdvanceMs / 1000));
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      if (!hasSkipped.current) {
        hasSkipped.current = true;
        onSkip();
      }
    }, autoAdvanceMs);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [autoAdvanceMs, onSkip]);

  useEffect(() => {
    if (isMuted) {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
      return;
    }

    const AudioContextRef = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextRef) {
      return;
    }

    const context = new AudioContextRef();
    const master = context.createGain();
    const low = context.createOscillator();
    const mid = context.createOscillator();
    const high = context.createOscillator();
    const filter = context.createBiquadFilter();

    low.type = 'sine';
    low.frequency.value = 42;
    mid.type = 'sawtooth';
    mid.frequency.value = 84;
    high.type = 'triangle';
    high.frequency.value = 168;
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    master.gain.value = 0.0001;

    low.connect(master);
    mid.connect(filter);
    high.connect(filter);
    filter.connect(master);
    master.connect(context.destination);

    const now = context.currentTime;
    low.start(now);
    mid.start(now + 0.04);
    high.start(now + 0.11);
    master.gain.exponentialRampToValueAtTime(0.22, now + 0.18);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.65);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.35);
    setAudioStatus('playing');

    const stopId = window.setTimeout(() => {
      [low, mid, high].forEach((oscillator) => oscillator.stop());
      context.close();
      setAudioStatus('ready');
    }, 2600);

    audioCleanupRef.current = () => {
      window.clearTimeout(stopId);
      try {
        [low, mid, high].forEach((oscillator) => oscillator.stop());
      } catch {
        // Oscillators may already be stopped when the intro advances.
      }
      context.close();
      setAudioStatus('ready');
    };

    return () => {
      audioCleanupRef.current?.();
      audioCleanupRef.current = null;
    };
  }, [isMuted]);

  const handleSkip = () => {
    if (hasSkipped.current) {
      return;
    }

    hasSkipped.current = true;
    onSkip();
  };

  return (
    <motion.section
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-ink-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <video
        autoPlay
        muted={isMuted}
        playsInline
        preload="metadata"
        onEnded={handleSkip}
        className="absolute inset-0 h-full w-full scale-[1.06] object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,230,192,0.18),transparent_22%),radial-gradient(circle_at_76%_18%,rgba(255,189,118,0.26),transparent_24%),linear-gradient(110deg,rgba(4,6,9,0.97),rgba(4,6,9,0.44)_42%,rgba(4,6,9,0.92)),linear-gradient(to_bottom,rgba(2,4,6,0.16),rgba(2,4,6,0.96))]" />
      <div className="intro-letterbox" aria-hidden="true" />
      <div className="intro-beams" aria-hidden="true" />
      <div className="intro-shutter" aria-hidden="true" />
      <div className="intro-flash" aria-hidden="true" />
      <div className="intro-grain" aria-hidden="true" />
      <div className="intro-stinger" aria-hidden="true">
        <div className="intro-stinger__bar intro-stinger__bar--left" />
        <div className="intro-stinger__bar intro-stinger__bar--right" />
        <div className="intro-stinger__glow" />
      </div>
      <div className="intro-logo" aria-hidden="true">MOA</div>
      <div className="intro-logo-blast" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.75, ease: 'easeOut' }}
      >
        {eyebrow ? (
          <div className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.52em] text-white/55 backdrop-blur-xl">
            {eyebrow}
          </div>
        ) : null}
        <div className="mt-6 h-px w-28 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
        <h1 className="mt-8 text-5xl leading-[0.84] text-cream md:text-7xl lg:text-[6.4rem] font-display">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/78 md:text-xl md:leading-9">
          {subtitle}
        </p>
        <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/42">
          Destination trailer / leasing / sponsorship / experiences
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              const AudioContextRef = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
              if (!AudioContextRef) {
                setAudioStatus('blocked');
                return;
              }

              setIsMuted((value) => !value);
            }}
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.32em] text-white/82 transition hover:bg-black/55"
          >
            {isMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            {isMuted ? 'Play Cue' : 'Mute'}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-2 rounded-sm bg-cream px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-950 transition hover:-translate-y-0.5"
          >
            Skip Intro
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 text-xs uppercase tracking-[0.32em] text-white/50">
          {audioStatus === 'blocked' ? 'Audio blocked by browser. Visual stinger active.' : `Audio cue ${audioStatus}. Auto entering in ${secondsLeft}s`}
        </div>
      </motion.div>
    </motion.section>
  );
};
