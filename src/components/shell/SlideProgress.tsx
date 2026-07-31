import { motion } from 'framer-motion';
import { usePresentation } from '@/context/PresentationContext';
import { slides } from '@/data/slides';

export function SlideProgress() {
  const { index, total, goTo } = usePresentation();
  const pct = (index / total) * 100;
  return (
    <div
      className="slide-progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index}
      aria-label={`Slide ${index} of ${total}`}
    >
      <motion.div
        className="slide-progress__fill"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="slide-progress__ticks">
        {slides.map((s) => (
          <button
            key={s.index}
            onClick={() => goTo(s.index)}
            aria-label={`Go to slide ${s.index}: ${s.title}`}
            title={s.title}
          />
        ))}
      </div>
    </div>
  );
}
