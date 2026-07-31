import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';
import { slides } from '@/data/slides';

const accentColor: Record<string, string> = {
  cobalt: 'var(--ils-cobalt)',
  gold: 'var(--gold)',
  orange: 'var(--orange)',
  navy: 'var(--ils-cobalt-bright)',
};

export function SlideOverview() {
  const { overviewOpen, toggleOverview, goTo, index } = usePresentation();
  if (!overviewOpen) return null;

  return (
    <motion.div
      className="overlay slide-overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Slide overview"
      style={{ gridTemplateRows: 'auto 1fr' }}
    >
      <div className="overlay__head">
        <h2 className="overlay__title">All slides</h2>
        <button className="overlay__close" onClick={() => toggleOverview(false)} aria-label="Close overview">
          <X size={18} />
        </button>
      </div>
      <div className="overview-grid scroll-y">
        {slides.map((s) => (
          <button
            key={s.index}
            className="thumb"
            aria-current={s.index === index}
            aria-label={`Slide ${s.index}: ${s.title}`}
            onClick={() => {
              goTo(s.index);
              toggleOverview(false);
            }}
          >
            <div className="thumb__frame">
              <div>
                <div className="thumb__section">{s.section}</div>
                <div className="thumb__num">{String(s.index).padStart(2, '0')}</div>
              </div>
              <div className="thumb__title">{s.title}</div>
            </div>
            <div className="thumb__accent" style={{ background: accentColor[s.accent] }} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
