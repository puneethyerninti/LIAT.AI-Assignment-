import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  slideClassName?: string;
  autoPlay?: boolean;
  interval?: number;
  ariaLabel?: string;
  showIndicators?: boolean;
  pauseOnHover?: boolean;
  respectReducedMotion?: boolean;
};

export const Carousel = <T,>({
  items,
  renderItem,
  className = '',
  slideClassName = '',
  autoPlay = true,
  interval = 4800,
  ariaLabel = 'Carousel',
  showIndicators = true,
  pauseOnHover = true,
  respectReducedMotion = true,
}: CarouselProps<T>) => {
  const itemCount = items.length;
  const canLoop = itemCount > 1;
  const slides = useMemo(() => {
    if (!canLoop) {
      return items;
    }

    const first = items[0];
    const last = items[itemCount - 1];
    return [last, ...items, first];
  }, [items, itemCount, canLoop]);

  const [index, setIndex] = useState(canLoop ? 1 : 0);
  const [isJumping, setIsJumping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isAnimatingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = respectReducedMotion && shouldReduceMotion;

  const setAnimating = (value: boolean) => {
    isAnimatingRef.current = value;
  };

  const goTo = (nextIndex: number) => {
    if (!canLoop || isAnimatingRef.current) {
      return;
    }

    setAnimating(true);
    setIndex(nextIndex);
  };

  const handleNext = () => {
    goTo(index + 1);
  };

  const handlePrev = () => {
    goTo(index - 1);
  };

  const handleAnimationComplete = () => {
    if (!canLoop) {
      setAnimating(false);
      return;
    }

    if (index === 0) {
      setIsJumping(true);
      setIndex(itemCount);
    } else if (index === itemCount + 1) {
      setIsJumping(true);
      setIndex(1);
    }

    setAnimating(false);
  };

  useEffect(() => {
    if (reduceMotion || !autoPlay || !canLoop || (pauseOnHover && isHovering)) {
      return;
    }

    const id = window.setInterval(() => {
      if (isAnimatingRef.current) {
        return;
      }

      setAnimating(true);
      setIndex((current) => current + 1);
    }, interval);

    return () => window.clearInterval(id);
  }, [autoPlay, canLoop, interval, isHovering, pauseOnHover, reduceMotion]);

  useEffect(() => {
    if (!canLoop || !isJumping) {
      return;
    }

    const id = window.requestAnimationFrame(() => setIsJumping(false));
    return () => window.cancelAnimationFrame(id);
  }, [canLoop, isJumping]);

  const realIndex = canLoop ? (index - 1 + itemCount) % itemCount : index;

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden border-y border-white/10 bg-black/[0.08]">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={isJumping || reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={handleAnimationComplete}
        >
          {slides.map((item, position) => {
            const mappedIndex = canLoop ? (position - 1 + itemCount) % itemCount : position;
            return (
              <div key={`${mappedIndex}-${position}`} className={`w-full shrink-0 ${slideClassName}`}>
                {renderItem(item, mappedIndex)}
              </div>
            );
          })}
        </motion.div>
      </div>

      {canLoop && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-sm border border-white/15 bg-black/50 text-white transition hover:bg-cream hover:text-ink-950"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-sm border border-white/15 bg-black/50 text-white transition hover:bg-cream hover:text-ink-950"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {showIndicators && itemCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, dotIndex) => (
            <button
              key={`dot-${dotIndex}`}
              type="button"
              className={`h-1.5 w-8 rounded-sm transition ${dotIndex === realIndex ? 'bg-amber-200' : 'bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={() => {
                if (!canLoop || isAnimatingRef.current) {
                  return;
                }

                setAnimating(true);
                setIndex(dotIndex + 1);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
