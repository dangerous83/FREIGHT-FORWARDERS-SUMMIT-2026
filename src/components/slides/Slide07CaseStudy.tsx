import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ShieldAlert } from 'lucide-react';
import { humanitarianCase } from '@/data/caseStudies';
import { CaseStudyTimeline } from '@/components/common/CaseStudyTimeline';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import challengeImg from '@/assets/case/challenge.jpg';
import routeImg from '@/assets/case/route.jpg';
import complexityImg from '@/assets/case/complexity.jpg';
import responseImg from '@/assets/case/response.jpg';
import resultImg from '@/assets/case/result.jpg';

const STAGE_IMAGES: Record<string, string> = {
  challenge: challengeImg,
  route: routeImg,
  complexity: complexityImg,
  response: responseImg,
  result: resultImg,
};

const AUTO_ADVANCE_MS = 4000;

export function Slide07CaseStudy() {
  const [step, setStep] = useState(0);
  const { stages, testimonial } = humanitarianCase;
  const stage = stages[step];
  const reduced = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.25 });

  // Auto-reveal Challenge → Route → Complexity → ILS Response → Result,
  // then loop back to Challenge. Runs continuously while the slide is in
  // view. Never pauses on hover — presenters want the reel to keep going.
  useEffect(() => {
    if (!inView || reduced) return;
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % stages.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [inView, reduced, step, stages.length]);

  const image = STAGE_IMAGES[stage.id];

  return (
    <section className="slide slide--case" aria-label="Humanitarian corridor case study">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner case-layout" ref={ref}>
        <div className="case-main">
          <header className="slide-head">
            <p className="kicker kicker--gold">{humanitarianCase.kicker}</p>
            <h2 className="slide-title slide-title--sm">{humanitarianCase.title}</h2>
          </header>

          <CaseStudyTimeline stages={stages} activeIndex={step} onSelect={setStep} />

          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              className="case-stage-body"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <span className="case-stage-body__key">{stage.key}</span>
              <h3 className="case-stage-body__title">{stage.title}</h3>
              <p className="case-stage-body__text">{stage.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="case-aside">
          <div className="case-media case-media--reveal">
            <AnimatePresence mode="wait">
              <motion.img
                key={stage.id}
                src={image}
                alt={`${stage.key} — ${stage.title}`}
                className="case-media__img"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.3 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <span className="case-media__badge">{stage.key}</span>
          </div>

          <figure className="testimonial testimonial--unverified">
            <span className="testimonial__flag">
              <ShieldAlert size={13} /> Unverified · placeholder — pending client approval
            </span>
            <Quote size={20} className="testimonial__mark" aria-hidden="true" />
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.attributionName}</strong>
              <span className="muted">
                {testimonial.attributionRole}, {testimonial.attributionOrg}
              </span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
