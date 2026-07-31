import { motion } from 'framer-motion';
import { reachContent } from '@/data/slides';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useCountUp } from '@/hooks/useCountUp';

export function Slide03Reach() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.4 });
  const count = useCountUp(reachContent.number, inView, 1600);

  return (
    <section className="slide slide--reach" aria-label="Reach is not the difference">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />

      {/* Abstract network / node cloud (not a geographic map) */}
      <svg className="reach-network" viewBox="0 0 900 600" aria-hidden="true">
        <defs>
          <radialGradient id="reachGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#255aad" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#255aad" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="620" cy="300" r="300" fill="url(#reachGlow)" />
        {Array.from({ length: 34 }).map((_, i) => {
          const a = (i / 34) * Math.PI * 2;
          const r = 120 + (i % 5) * 46;
          const cx = 620 + Math.cos(a) * r;
          const cy = 300 + Math.sin(a) * r * 0.72;
          return (
            <g key={i}>
              <line x1="620" y1="300" x2={cx} y2={cy} stroke="#2b4c78" strokeWidth="0.6" opacity="0.5" />
              <motion.circle
                cx={cx}
                cy={cy}
                r="3"
                fill="#7fb2f5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0.2, 0.8, 0.2] } : { opacity: 0 }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.05 }}
              />
            </g>
          );
        })}
      </svg>

      <div className="slide__inner reach-layout" ref={ref}>
        <div className="reach-number-wrap">
          <span className="reach-number">
            {count}
            <span className="reach-number__suffix">{reachContent.suffix}</span>
          </span>
          <p className="reach-label">{reachContent.label}</p>
        </div>

        <div className="reach-copy">
          <motion.p
            className="reach-reveal"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {reachContent.reveal}
          </motion.p>
          <motion.p
            className="reach-statement"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Reach isn’t rare anymore. <span className="text-gold">What’s rare is where we actually go.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
