import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { heavyLiftContent } from '@/data/slides';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Generated via Higgsfield (nano_banana) at 4:3 — one editorial photo per
// heavy-lift step. CloudFront-hosted, cache-immutable for a year.
const STEP_IMAGES: Record<string, string> = {
  survey:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_5a8e0c1e-2968-43c6-a217-0ee68b2f1755.png',
  engineering:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_eeca0599-c842-408b-982d-d8099696bee0.png',
  permits:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_1eba8a74-f911-49ce-84ca-b852023943e6.png',
  escorts:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_8f569e11-064f-4f3a-94e6-e4d6adbd6226.png',
  lifting:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_136313d4-ea37-4469-a8b4-a06bb2481f9a.png',
  delivery:
    'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_175842_c4d8e9bc-4c88-4599-bfa6-3071e521263c.png',
};

const AUTO_ADVANCE_MS = 4000;

export function Slide08HeavyLift() {
  const [active, setActive] = useState(0);
  const { steps } = heavyLiftContent;
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.25 });

  // Auto-cycle each step every 4s while the slide is in view; loops back
  // to the first step so the reel never freezes.
  useEffect(() => {
    if (!inView || reduced) return;
    const t = setTimeout(() => setActive((s) => (s + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [inView, reduced, active, steps.length]);

  // Preload every heavy-lift image on mount so the reel doesn't stall
  // waiting on the CDN when the timer flips to the next stage.
  useEffect(() => {
    Object.values(STEP_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const currentStep = steps[active];
  const image = STEP_IMAGES[currentStep.id];

  return (
    <section className="slide slide--heavy" aria-label="Heavy-lift capability">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />

      <div className="slide__inner heavy-layout" ref={ref}>
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
        <div className="heavy-media__frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentStep.id}
              src={image}
              alt={`${currentStep.step} — heavy-lift stage ${active + 1}`}
              className="heavy-media__img"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.3 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <span className="heavy-media__badge">{currentStep.step}</span>
        </div>
      </div>
    </section>
  );
}
