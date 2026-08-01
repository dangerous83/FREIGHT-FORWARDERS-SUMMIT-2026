import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { corridorContent } from '@/data/slides';
import { getLocation, type LocationId } from '@/data/locations';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { RouteMap } from '@/components/common/RouteMap';
import { Drawer } from '@/components/common/Drawer';
import { TechGrid } from '@/components/common/TechGrid';

export function Slide04Corridor() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });
  const [active, setActive] = useState<LocationId | null>(null);
  const loc = active ? getLocation(active) : null;

  return (
    <section className="slide slide--corridor" aria-label="The corridor nobody else wants">
      <div className="slide-bg slide-bg--flat" aria-hidden="true">
        <TechGrid intensity={0.6} accent="orange" label="ILS · CORRIDOR TELEMETRY" />
      </div>
      <div className="slide__inner" ref={ref}>
        <header className="slide-head slide-head--split">
          <div>
            <p className="kicker kicker--orange">{corridorContent.kicker}</p>
            <h2 className="slide-title">{corridorContent.headline}</h2>
          </div>
          <p className="corridor-hint muted">Click any point on the corridor for its operational brief.</p>
        </header>

        <div className="corridor-stage">
          <RouteMap activeId={active} onSelect={setActive} animate={inView} />
        </div>

        <motion.p
          className="corridor-closing"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 2.2 }}
        >
          {corridorContent.closing}
        </motion.p>
      </div>

      <AnimatePresence>
        {loc && (
          <Drawer open onClose={() => setActive(null)} title={`${loc.name} — operational brief`}>
            <div className="drawer-content">
              <p className="kicker kicker--orange">{loc.role}</p>
              <h3 className="drawer-title">
                {loc.name} <span className="muted">· {loc.country}</span>
              </h3>
              <p className="drawer-summary">{loc.summary}</p>

              <h4 className="drawer-subhead">
                <AlertTriangle size={14} className="text-orange" /> The hard part
              </h4>
              <ul className="chip-list">
                {loc.challenges.map((c) => (
                  <li key={c} className="tag tag--warning">
                    {c}
                  </li>
                ))}
              </ul>

              <h4 className="drawer-subhead">On the ground</h4>
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
