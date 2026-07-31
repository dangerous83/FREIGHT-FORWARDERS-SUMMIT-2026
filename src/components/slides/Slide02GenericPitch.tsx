import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, Plane, Truck } from 'lucide-react';
import { genericPitch, type ServiceCard } from '@/data/slides';
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline';

const iconFor: Record<ServiceCard['icon'], typeof Ship> = { ship: Ship, plane: Plane, truck: Truck };

function Card({ card, index }: { card: ServiceCard; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const Icon = iconFor[card.icon];
  return (
    <motion.button
      type="button"
      className={`service-card ${revealed ? 'is-revealed' : ''}`}
      onClick={() => setRevealed((r) => !r)}
      onMouseEnter={() => setRevealed(true)}
      aria-expanded={revealed}
      aria-label={`${card.service}. Reveal the usual industry phrases.`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="service-card__icon">
        <Icon size={26} />
      </span>
      <span className="service-card__title">{card.service}</span>
      <span className="service-card__sub">{card.subtitle}</span>

      <motion.span
        className="service-card__cliches"
        initial={false}
        animate={{ height: revealed ? 'auto' : 0, opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="service-card__cliches-inner">
          {card.clichés.map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </span>
      </motion.span>

      <span className="service-card__hint">{revealed ? '' : 'Tap to reveal'}</span>
    </motion.button>
  );
}

export function Slide02GenericPitch() {
  return (
    <section className="slide slide--pitch" aria-label="Every forwarder's slide one">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner">
        <header className="slide-head">
          <p className="kicker">{genericPitch.kicker}</p>
          <AnimatedHeadline as="h2" className="slide-title" text={genericPitch.headline} />
        </header>

        <div className="service-grid">
          {genericPitch.cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>

        <motion.p
          className="punchline"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {genericPitch.punchline}
        </motion.p>
      </div>
    </section>
  );
}
