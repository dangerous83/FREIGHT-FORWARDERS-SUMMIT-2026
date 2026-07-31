import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';
import { SlideProgress } from './SlideProgress';

export function SlideNavigation() {
  const { index, total, next, prev } = usePresentation();
  return (
    <div className="chrome-bottom no-print">
      <div className="slide-nav">
        <button
          className="nav-btn"
          onClick={prev}
          disabled={index <= 1}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="nav-btn"
          onClick={next}
          disabled={index >= total}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
        <span className="slide-counter" aria-live="polite">
          <b>{String(index).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </span>
      </div>
      <SlideProgress />
    </div>
  );
}

/** Full-height invisible click zones on the left / right edges. */
export function NavZones() {
  const { index, total, next, prev } = usePresentation();
  return (
    <>
      {index > 1 && (
        <button className="nav-zone nav-zone--left no-print" onClick={prev} aria-label="Previous slide">
          <ChevronLeft className="nav-zone__chev" size={26} />
        </button>
      )}
      {index < total && (
        <button className="nav-zone nav-zone--right no-print" onClick={next} aria-label="Next slide">
          <ChevronRight className="nav-zone__chev" size={26} />
        </button>
      )}
    </>
  );
}
