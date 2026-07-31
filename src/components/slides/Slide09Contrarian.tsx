import { motion } from 'framer-motion';
import { contrarianContent } from '@/data/slides';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Slide09Contrarian() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.5 });
  const reduced = useReducedMotion();

  return (
    <section className="slide slide--contrarian" aria-label="Anyone can get a container to Rotterdam. We get it to Kabul.">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="contrarian-index" aria-hidden="true">
        <span>ROTTERDAM</span>
        <span>·</span>
        <span className="text-orange">KABUL</span>
      </div>

      <div className="slide__inner contrarian-layout" ref={ref}>
        <p className="kicker kicker--orange">{contrarianContent.kicker}</p>

        <motion.h2
          className="contrarian-setup"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {contrarianContent.setup}
        </motion.h2>

        <motion.div
          className="contrarian-rule"
          initial={reduced ? undefined : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        <motion.h2
          className="contrarian-reveal"
          initial={reduced ? undefined : { opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {contrarianContent.reveal}
        </motion.h2>

        <motion.p
          className="contrarian-support"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          {contrarianContent.supporting}
        </motion.p>
      </div>
    </section>
  );
}
