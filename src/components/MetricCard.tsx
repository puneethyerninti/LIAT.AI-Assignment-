import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

export type Fact = {
  label: string;
  value: string;
  note: string;
  icon: ReactNode;
};

export const MetricCard = ({ fact }: { fact: Fact }) => (
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
