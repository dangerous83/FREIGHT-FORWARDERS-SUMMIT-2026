import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { heavyLiftContent } from '@/data/slides';
import { ImageReveal } from '@/components/common/ImageReveal';

export function Slide08HeavyLift() {
  const [active, setActive] = useState(0);
  const { steps } = heavyLiftContent;

  return (
    <section className="slide slide--heavy" aria-label="Heavy-lift capability">
      <div className="slide-bg" aria-hidden="true">
        <img className="slide-bg__img slide-bg__img--dim" src="/assets/images/heavy-lift.svg" alt="" />
        <div className="slide-bg__scrim slide-bg__scrim--left" />
      </div>

      <div className="slide__inner heavy-layout">
        <header className="slide-head">
          <p className="kicker kicker--orange">{heavyLiftContent.kicker}</p>
          <h2 className="slide-title slide-title--sm">{heavyLiftContent.headline}</h2>
          <p className="lead heavy-intro">{heavyLiftContent.intro}</p>
        </header>

        <div className="heavy-checklist" role="list">
          {steps.map((s, i) => {
            const done = i < active;
            const isActive = i === active;
            return (
              <div key={s.id} role="listitem">
                <button
                  className={`heavy-step ${isActive ? 'is-active' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-label={`Step ${i + 1}: ${s.step}`}
                >
                  <span className="heavy-step__marker">
                    {done ? <Check size={14} /> : <span>{String(i + 1).padStart(2, '0')}</span>}
                  </span>
                  <span className="heavy-step__label">{s.step}</span>
                  <ChevronRight size={16} className="heavy-step__chev" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      className="heavy-step__detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>{s.detail}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="heavy-media no-print">
        <ImageReveal
          src="/assets/images/heavy-lift.svg"
          alt="Oversized refinery module on a multi-axle platform trailer with engineering escorts"
          rounded
        />
      </div>
    </section>
  );
}
