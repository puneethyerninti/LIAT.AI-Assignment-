import { motion } from 'framer-motion';

export const SectionTitle = ({
  eyebrow,
  title,
  summary,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  dark?: boolean;
}) => (
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
      className={`mt-4 text-4xl leading-[0.92] md:text-6xl xl:text-7xl ${dark ? 'text-cream' : 'text-ink-950'} font-display`}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: 0.16 }}
      className={`mt-5 text-base leading-8 md:text-xl md:leading-9 ${dark ? 'text-white/70' : 'text-ink-700'}`}
    >
      {summary}
    </motion.p>
  </div>
);
