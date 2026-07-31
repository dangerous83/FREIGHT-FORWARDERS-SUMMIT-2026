import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ShieldAlert } from 'lucide-react';
import { humanitarianCase } from '@/data/caseStudies';
import { CaseStudyTimeline } from '@/components/common/CaseStudyTimeline';
import { ImageReveal } from '@/components/common/ImageReveal';

export function Slide07CaseStudy() {
  const [step, setStep] = useState(0);
  const { stages, testimonial } = humanitarianCase;
  const stage = stages[step];

  return (
    <section className="slide slide--case" aria-label="Humanitarian corridor case study">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner case-layout">
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
          <div className="case-media">
            <ImageReveal src="/assets/images/humanitarian-case.svg" alt="Sealed relief cargo moving through a mountain corridor" rounded />
          </div>

          {/* Unverified testimonial — clearly labelled as placeholder */}
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
