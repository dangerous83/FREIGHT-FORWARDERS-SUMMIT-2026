import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { openingContent } from '@/data/slides';
import { usePresentation } from '@/context/PresentationContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline';

export function Slide01Opening() {
  const { next } = usePresentation();
  const reduced = useReducedMotion();

  return (
    <section className="slide slide--opening" aria-label="Opening: We don't do easy">
      {/* Cinematic hero backdrop */}
      <div className="slide-bg" aria-hidden="true">
        <img className="slide-bg__img" src="/assets/images/hero-convoy.svg" alt="" />
        <div className="slide-bg__scrim slide-bg__scrim--opening" />
        {/* Subtle animated global route lines */}
        <svg className="slide-bg__routes" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="#3a7bd5" strokeWidth="1.4" opacity="0.5">
            {['M-40,620 C400,470 900,520 1300,360 1680,240', 'M-40,760 C500,700 950,660 1660,470'].map(
              (d, i) => (
                <path
                  key={i}
                  d={d}
                  strokeDasharray="4 210"
                  className={reduced ? undefined : 'intro-route-dash'}
                  style={{ animationDelay: `${i * 1.5}s` }}
                />
              ),
            )}
          </g>
        </svg>
      </div>

      <div className="slide__inner slide--opening__inner">
        <motion.p
          className="kicker"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {openingContent.kicker}
        </motion.p>

        <AnimatedHeadline as="h1" className="opening-headline" text={openingContent.headline} delay={0.35} />

        <motion.div
          className="opening-support"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {openingContent.supportingLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.div>

        <motion.button
          className="btn-primary opening-cta"
          onClick={next}
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
        >
          {openingContent.cta}
          <ArrowRight size={18} />
        </motion.button>
      </div>

      <div className="opening-logo-mark" aria-hidden="true">
        <img src="/logo/ils-logo-white.png" alt="" />
      </div>
    </section>
  );
}
