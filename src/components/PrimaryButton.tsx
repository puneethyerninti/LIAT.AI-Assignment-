import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export const PrimaryButton = ({
  children,
  onClick,
  dark = false,
}: {
  children: ReactNode;
  onClick: () => void;
  dark?: boolean;
}) => (
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
