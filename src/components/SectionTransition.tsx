import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getTransitionConfig, getTransitionVariants, type TransitionType } from '../utils/transitionEffects';

type SectionTransitionProps = {
  children: ReactNode;
  transitionType: TransitionType;
  direction: number;
  className?: string;
};

export const SectionTransition = ({ children, transitionType, direction, className = '' }: SectionTransitionProps) => {
  const variants = getTransitionVariants(transitionType);
  const transition = getTransitionConfig(transitionType);

  return (
    <motion.div
      className={`deck-slide ${className}`}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};
