import { receiptsContent } from '@/data/slides';
import { proofPoints } from '@/data/proofPoints';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { MetricCard } from '@/components/common/MetricCard';

export function Slide06Receipts() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="slide slide--receipts" aria-label="The receipts">
      <div className="slide-bg slide-bg--flat" aria-hidden="true" />
      <div className="slide__inner" ref={ref}>
        <header className="slide-head">
          <p className="kicker kicker--gold">{receiptsContent.kicker}</p>
          <h2 className="slide-title">{receiptsContent.headline}</h2>
        </header>

        <div className="receipts-grid">
          {proofPoints.map((p, i) => (
            <MetricCard key={p.id} point={p} active={inView} order={i} />
          ))}
        </div>

        <p className="receipts-note muted">Click a card for the detail behind the number.</p>
      </div>
    </section>
  );
}
