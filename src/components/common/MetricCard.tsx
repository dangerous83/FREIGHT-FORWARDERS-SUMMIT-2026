import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import type { ProofPoint } from '@/data/proofPoints';

interface Props {
  point: ProofPoint;
  active: boolean;
  order: number;
}

const accentVar: Record<ProofPoint['accent'], string> = {
  cobalt: 'var(--ils-cobalt-bright)',
  gold: 'var(--gold)',
  orange: 'var(--orange)',
};

export function MetricCard({ point, active, order }: Props) {
  const [open, setOpen] = useState(false);
  const count = useCountUp(point.value ?? 0, active, 1300 + order * 120);
  const accent = accentVar[point.accent];

  return (
    <motion.button
      type="button"
      className="metric-card"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-label={`${point.label}. ${open ? 'Hide' : 'Show'} details.`}
      initial={{ opacity: 0, y: 26 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration: 0.6, delay: order * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ ['--accent' as string]: accent }}
    >
      <span className="metric-card__toggle" aria-hidden="true">
        {open ? <Minus size={14} /> : <Plus size={14} />}
      </span>

      <span className="metric-card__value" style={{ color: accent }}>
        {point.value === null ? point.display : (
          <>
            {point.prefix}
            {count}
            {point.suffix}
          </>
        )}
      </span>
      <span className="metric-card__label">{point.label}</span>
      <span className="metric-card__desc">{point.description}</span>

      <motion.span
        className="metric-card__detail"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{point.detail}</span>
      </motion.span>
    </motion.button>
  );
}
