import { useEffect, useRef } from 'react';
import { usePresentation } from '@/context/PresentationContext';

/**
 * Wires up keyboard, mouse-wheel and touch-swipe navigation for the
 * presentation. Wheel navigation is throttled so one physical scroll gesture
 * advances at most one slide (avoids accidental multi-slide jumps).
 */
export function useNavigationInput() {
  const {
    phase,
    next,
    prev,
    goTo,
    total,
    overviewOpen,
    helpOpen,
    toggleOverview,
    toggleHelp,
    toggleFullscreen,
    toggleAutoplay,
    returnToStart,
  } = usePresentation();

  const wheelLock = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (phase !== 'presentation') return;

    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      // Escape closes overlays first
      if (e.key === 'Escape') {
        if (overviewOpen) return toggleOverview(false);
        if (helpOpen) return toggleHelp(false);
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(1);
          break;
        case 'End':
          e.preventDefault();
          goTo(total);
          break;
        case 'o':
        case 'O':
          toggleOverview();
          break;
        case '?':
          toggleHelp();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'p':
        case 'P':
          toggleAutoplay();
          break;
        default:
          // Number keys 1-9 jump directly
          if (/^[1-9]$/.test(e.key)) {
            goTo(Number(e.key));
          }
          break;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (overviewOpen || helpOpen) return;
      // Let scrollable panels scroll internally
      const target = e.target as HTMLElement;
      if (target?.closest('.scroll-y')) return;
      if (Math.abs(e.deltaY) < 24) return;
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaY > 0) next();
      else prev();
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 900);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (overviewOpen || helpOpen) return;
      // Horizontal swipe dominant
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [
    phase,
    next,
    prev,
    goTo,
    total,
    overviewOpen,
    helpOpen,
    toggleOverview,
    toggleHelp,
    toggleFullscreen,
    toggleAutoplay,
    returnToStart,
  ]);
}
