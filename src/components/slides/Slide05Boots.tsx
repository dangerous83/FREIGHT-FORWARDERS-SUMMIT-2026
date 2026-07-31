import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { bootsContent } from '@/data/slides';
import { locations, getLocation, type LocationId } from '@/data/locations';
import { LocationCard } from '@/components/common/LocationCard';
import { Drawer } from '@/components/common/Drawer';
import { ImageReveal } from '@/components/common/ImageReveal';

export function Slide05Boots() {
  const [active, setActive] = useState<LocationId | null>(null);
  const loc = active ? getLocation(active) : null;

  return (
    <section className="slide slide--boots" aria-label="Boots on the ground, not an agent list">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner">
        <header className="slide-head">
          <p className="kicker">{bootsContent.kicker}</p>
          <h2 className="slide-title slide-title--stack">
            {bootsContent.headlineLines.map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {l}
              </motion.span>
            ))}
          </h2>
        </header>

        <div className="boots-grid">
          {locations.map((l, i) => (
            <LocationCard key={l.id} location={l} order={i} onOpen={setActive} />
          ))}
        </div>

        <motion.p
          className="boots-statement"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {bootsContent.statement}
        </motion.p>
      </div>

      <AnimatePresence>
        {loc && (
          <Drawer open onClose={() => setActive(null)} title={`${loc.name} operations`}>
            <div className="drawer-content">
              <div className="drawer-media">
                <ImageReveal src={loc.image} alt={`${loc.name} operations`} rounded />
              </div>
              <p className="kicker">{loc.role}</p>
              <h3 className="drawer-title">
                {loc.name} <span className="muted">· {loc.country}</span>
              </h3>
              <p className="drawer-summary">{loc.summary}</p>
              <h4 className="drawer-subhead">Operational capability</h4>
              <ul className="bullet-list">
                {loc.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </section>
  );
}
