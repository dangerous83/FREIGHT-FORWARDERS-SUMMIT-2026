import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { whyIlsContent } from '@/data/slides';

export function Slide10WhyIls() {
  const [active, setActive] = useState(whyIlsContent.differentiators[0].id);
  const current = whyIlsContent.differentiators.find((d) => d.id === active)!;

  return (
    <section className="slide slide--why" aria-label="Why ILS">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner why-layout">
        <header className="slide-head">
          <p className="kicker">{whyIlsContent.kicker}</p>
          <h2 className="slide-title">{whyIlsContent.headline}</h2>
          <p className="lead">{whyIlsContent.intro}</p>
        </header>

        <div className="why-compare">
          <ul className="why-list" role="tablist" aria-label="Differentiators">
            {whyIlsContent.differentiators.map((d, i) => (
              <li key={d.id}>
                <button
                  role="tab"
                  aria-selected={d.id === active}
                  className={`why-item ${d.id === active ? 'is-active' : ''}`}
                  onClick={() => setActive(d.id)}
                  onMouseEnter={() => setActive(d.id)}
                >
                  <span className="why-item__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="why-item__label">{d.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <motion.div
            key={current.id}
            className="why-detail"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="why-detail__title">{current.label}</h3>
            <p className="why-detail__text">{current.detail}</p>
            <div className="why-versus">
              <div className="why-versus__col why-versus__col--ils">
                <span className="why-versus__tag">
                  <Check size={13} /> ILS
                </span>
                <p>{current.detail}</p>
              </div>
              <div className="why-versus__col why-versus__col--generic">
                <span className="why-versus__tag why-versus__tag--muted">
                  <X size={13} /> The usual pitch
                </span>
                <p>{current.generic}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
