import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, HelpCircle, Play, Pause, Home, Sun, Moon } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';
import { useNavigationInput } from '@/hooks/useNavigationInput';
import { useTheme } from '@/hooks/useTheme';
import { slides } from '@/data/slides';
import { slideComponents } from '@/components/slides';
import { SlideNavigation, NavZones } from './SlideNavigation';
import { FullscreenControl } from './FullscreenControl';
import { KeyboardHelp } from './KeyboardHelp';
import { SlideOverview } from './SlideOverview';
import { asset } from '@/utils/asset';
import '@/styles/shell.css';
import '@/styles/slides.css';

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export function PresentationShell() {
  const {
    phase,
    index,
    direction,
    reducedMotion,
    overviewOpen,
    helpOpen,
    autoplay,
    toggleOverview,
    toggleHelp,
    toggleAutoplay,
    returnToStart,
  } = usePresentation();
  const { theme, toggle: toggleTheme } = useTheme();

  useNavigationInput();

  const active = slides[index - 1];
  const ActiveSlide = slideComponents[active.component];

  const transition = reducedMotion
    ? { duration: 0.2 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <div className="stage-wrap">
      <div className="stage">
        {/* Live slide (animated) — hidden from print; print uses the static stack below */}
        <div className="slide-layer no-print" aria-live="polite">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={active.index}
              className="slide-layer"
              custom={direction}
              variants={reducedMotion ? undefined : variants}
              initial={reducedMotion ? { opacity: 0 } : 'enter'}
              animate={reducedMotion ? { opacity: 1 } : 'center'}
              exit={reducedMotion ? { opacity: 0 } : 'exit'}
              transition={transition}
            >
              <ActiveSlide />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Static print stack — one slide per page for PDF export */}
        <div className="print-only-stack" aria-hidden="true">
          {slides.map((s) => {
            const S = slideComponents[s.component];
            return (
              <div className="print-slide" key={s.index}>
                <S />
              </div>
            );
          })}
        </div>

        {/* Chrome only while presenting */}
        {phase === 'presentation' && (
          <div className="presentation-chrome">
            <NavZones />

            <div className="chrome-top no-print">
              <div className="chrome-brand">
                <img src={asset('/logo/ils-logo-white.png')} alt="ILS — International Logistic Services" />
              </div>
              <div className="chrome-tools">
                <button
                  className="tool-btn"
                  onClick={toggleAutoplay}
                  aria-pressed={autoplay}
                  aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
                  title="Autoplay (P)"
                >
                  {autoplay ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  className="tool-btn"
                  onClick={() => toggleOverview()}
                  aria-pressed={overviewOpen}
                  aria-label="Slide overview"
                  title="Overview (O)"
                >
                  <LayoutGrid size={17} />
                </button>
                <FullscreenControl />
                <button
                  className="tool-btn"
                  onClick={toggleTheme}
                  aria-pressed={theme === 'light'}
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button
                  className="tool-btn"
                  onClick={() => toggleHelp()}
                  aria-pressed={helpOpen}
                  aria-label="Keyboard help"
                  title="Help (?)"
                >
                  <HelpCircle size={17} />
                </button>
                <button
                  className="tool-btn"
                  onClick={returnToStart}
                  aria-label="Return to start screen"
                  title="Return to start"
                >
                  <Home size={16} />
                </button>
              </div>
            </div>

            <SlideNavigation />
          </div>
        )}

        <AnimatePresence>{overviewOpen && <SlideOverview key="ov" />}</AnimatePresence>
        <AnimatePresence>{helpOpen && <KeyboardHelp key="help" />}</AnimatePresence>
      </div>
    </div>
  );
}
