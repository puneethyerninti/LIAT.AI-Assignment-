import type { Transition, Variants } from 'framer-motion';

export type TransitionType =
  | 'wipe'
  | 'reveal'
  | 'flip'
  | 'tilt'
  | 'card'
  | 'cube'
  | 'roll'
  | 'bounce'
  | 'fade'
  | 'zoom'
  | 'slide'
  | 'iris'
  | 'shutter';

const baseEase = 'easeInOut' as const;

export const transitionOrder: TransitionType[] = ['wipe', 'reveal', 'flip', 'tilt', 'card', 'cube', 'roll', 'fade', 'zoom', 'slide', 'bounce'];

export const getTransitionConfig = (type: TransitionType): Transition => {
  switch (type) {
    case 'wipe':
    case 'reveal':
    case 'slide':
    case 'shutter':
      return { duration: 0.68, ease: baseEase };
    case 'card':
      return { duration: 0.72, ease: baseEase };
    case 'cube':
      return { duration: 0.78, ease: baseEase };
    case 'roll':
      return { duration: 0.74, ease: baseEase };
    case 'zoom':
      return { duration: 0.7, ease: baseEase };
    case 'flip':
      return { duration: 0.75, ease: baseEase };
    case 'iris':
      return { duration: 0.66, ease: baseEase };
    case 'tilt':
      return { duration: 0.66, ease: baseEase };
    case 'bounce':
      return { duration: 0.72, ease: baseEase, times: [0, 0.7, 1] };
    case 'fade':
    default:
      return { duration: 0.62, ease: baseEase };
  }
};

export const getTransitionVariants = (type: TransitionType): Variants => {
  switch (type) {
    case 'wipe':
      return {
        enter: (direction: number) => ({
          clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
          opacity: 0.7,
        }),
        center: { clipPath: 'inset(0 0 0 0)', opacity: 1 },
        exit: (direction: number) => ({
          clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          opacity: 0.7,
        }),
      };
    case 'reveal':
      return {
        enter: (direction: number) => ({
          clipPath: direction > 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
          opacity: 0.7,
          filter: 'brightness(1.16)',
        }),
        center: { clipPath: 'inset(0 0 0 0)', opacity: 1, filter: 'brightness(1)' },
        exit: (direction: number) => ({
          clipPath: direction > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
          opacity: 0.55,
          filter: 'brightness(0.92)',
        }),
      };
    case 'zoom':
      return {
        enter: { scale: 0.94, opacity: 0, filter: 'blur(8px)' },
        center: { scale: 1, opacity: 1, filter: 'blur(0px)' },
        exit: { scale: 1.06, opacity: 0, filter: 'blur(10px)' },
      };
    case 'flip':
      return {
        enter: (direction: number) => ({
          rotateY: direction > 0 ? -70 : 70,
          opacity: 0,
          transformPerspective: 1200,
        }),
        center: { rotateY: 0, opacity: 1, transformPerspective: 1200 },
        exit: (direction: number) => ({
          rotateY: direction > 0 ? 70 : -70,
          opacity: 0,
          transformPerspective: 1200,
        }),
      };
    case 'card':
      return {
        enter: (direction: number) => ({
          x: direction > 0 ? '18%' : '-18%',
          y: direction > 0 ? '7%' : '-7%',
          scale: 0.88,
          rotateZ: direction > 0 ? 4 : -4,
          opacity: 0,
          filter: 'blur(8px)',
        }),
        center: { x: 0, y: 0, scale: 1, rotateZ: 0, opacity: 1, filter: 'blur(0px)' },
        exit: (direction: number) => ({
          x: direction > 0 ? '-14%' : '14%',
          y: direction > 0 ? '-4%' : '4%',
          scale: 0.92,
          rotateZ: direction > 0 ? -2.5 : 2.5,
          opacity: 0,
          filter: 'blur(8px)',
        }),
      };
    case 'cube':
      return {
        enter: (direction: number) => ({
          rotateY: direction > 0 ? 88 : -88,
          x: direction > 0 ? '16%' : '-16%',
          opacity: 0.3,
          transformPerspective: 1600,
          transformOrigin: direction > 0 ? '100% 50%' : '0% 50%',
        }),
        center: {
          rotateY: 0,
          x: 0,
          opacity: 1,
          transformPerspective: 1600,
          transformOrigin: '50% 50%',
        },
        exit: (direction: number) => ({
          rotateY: direction > 0 ? -88 : 88,
          x: direction > 0 ? '-16%' : '16%',
          opacity: 0.3,
          transformPerspective: 1600,
          transformOrigin: direction > 0 ? '0% 50%' : '100% 50%',
        }),
      };
    case 'roll':
      return {
        enter: (direction: number) => ({
          x: direction > 0 ? '100%' : '-100%',
          rotateZ: direction > 0 ? 10 : -10,
          scale: 0.92,
          opacity: 0,
        }),
        center: { x: 0, rotateZ: 0, scale: 1, opacity: 1 },
        exit: (direction: number) => ({
          x: direction > 0 ? '-70%' : '70%',
          rotateZ: direction > 0 ? -8 : 8,
          scale: 0.96,
          opacity: 0,
        }),
      };
    case 'bounce':
      return {
        enter: (direction: number) => ({
          y: direction > 0 ? '12%' : '-12%',
          scale: 0.96,
          opacity: 0,
        }),
        center: { y: [0, -10, 0], scale: [0.98, 1.02, 1], opacity: 1 },
        exit: (direction: number) => ({
          y: direction > 0 ? '-10%' : '10%',
          opacity: 0,
          scale: 0.98,
        }),
      };
    case 'slide':
      return {
        enter: (direction: number) => ({ x: direction > 0 ? '20%' : '-20%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction > 0 ? '-20%' : '20%', opacity: 0 }),
      };
    case 'iris':
      return {
        enter: { clipPath: 'circle(0% at 50% 50%)', opacity: 0.7 },
        center: { clipPath: 'circle(120% at 50% 50%)', opacity: 1 },
        exit: { clipPath: 'circle(0% at 50% 50%)', opacity: 0.6 },
      };
    case 'shutter':
      return {
        enter: (direction: number) => ({ scaleY: 0.1, opacity: 0, transformOrigin: direction > 0 ? '50% 0%' : '50% 100%' }),
        center: { scaleY: 1, opacity: 1, transformOrigin: '50% 50%' },
        exit: (direction: number) => ({ scaleY: 0.1, opacity: 0, transformOrigin: direction > 0 ? '50% 100%' : '50% 0%' }),
      };
    case 'tilt':
      return {
        enter: (direction: number) => ({
          rotateX: direction > 0 ? 12 : -12,
          rotateZ: direction > 0 ? 1.2 : -1.2,
          y: direction > 0 ? '8%' : '-8%',
          opacity: 0,
          transformPerspective: 1200,
        }),
        center: { rotateX: 0, rotateZ: 0, y: 0, opacity: 1, transformPerspective: 1200 },
        exit: (direction: number) => ({
          rotateX: direction > 0 ? -12 : 12,
          rotateZ: direction > 0 ? -1.2 : 1.2,
          y: direction > 0 ? '-8%' : '8%',
          opacity: 0,
          transformPerspective: 1200,
        }),
      };
    case 'fade':
    default:
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
  }
};
