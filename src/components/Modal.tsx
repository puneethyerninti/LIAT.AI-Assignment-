import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => {

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-[80]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close modal"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              className="w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-[0_0_90px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <h2 className="text-4xl font-display text-ink-950 leading-tight">{title}</h2>
                {subtitle && <p className="mt-3 text-sm text-ink-600">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-950 transition hover:bg-ink-950 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
