import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { introConfig } from '@/data/intro';
import { usePresentation } from '@/context/PresentationContext';
import { NetworkBackground } from './NetworkBackground';
import { ActivationButton } from './ActivationButton';
import { LoadingRing } from './LoadingRing';
import { IntroAudioControl } from './IntroAudioControl';
import { SkipIntroButton } from './SkipIntroButton';
import { asset } from '@/utils/asset';
import '@/styles/intro.css';

// Assets to warm up during the intro so Slide 01 appears instantly.
const PRELOAD = [
  '/assets/images/hero-convoy.svg',
  '/logo/ils-logo-white.png',
  '/assets/images/dubai-operations.svg',
].map(asset);

export function PresentationIntro() {
  const { enterPresentation, reducedMotion } = usePresentation();
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const [activating, setActivating] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Pointer parallax (disabled under reduced motion)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18 });
  const sy = useSpring(py, { stiffness: 40, damping: 18 });

  // Preload essential assets, then unlock the button.
  useEffect(() => {
    let done = 0;
    let cancelled = false;
    const finish = () => {
      done += 1;
      if (done >= PRELOAD.length && !cancelled) setReady(true);
    };
    PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });
    // Safety: never block entry for more than 2.5s.
    const t = window.setTimeout(() => !cancelled && setReady(true), 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  // Focus the activation control for immediate keyboard access.
  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
  }, []);

  const handlePointer = useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return;
      const { innerWidth, innerHeight } = window;
      px.set(((e.clientX / innerWidth) * 2 - 1) * 18);
      py.set(((e.clientY / innerHeight) * 2 - 1) * 12);
    },
    [px, py, reducedMotion],
  );

  const doEnter = useCallback(() => {
    if (introConfig.requestFullscreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => undefined);
    }
    enterPresentation();
  }, [enterPresentation]);

  const activate = useCallback(() => {
    if (activating) return;
    if (reducedMotion) {
      // Simple fade — no camera / scaling.
      doEnter();
      return;
    }
    setActivating(true);
    window.setTimeout(doEnter, introConfig.animationDuration);
  }, [activating, reducedMotion, doEnter]);

  // Enter / Space activate; also handled by the native button, but we keep an
  // explicit handler so the whole intro surface responds.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === btnRef.current) {
        e.preventDefault();
        if (ready) activate();
      }
    },
    [activate, ready],
  );

  return (
    <motion.div
      className="presentation-intro"
      onPointerMove={handlePointer}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
      role="dialog"
      aria-label="Presentation entry"
    >
      <NetworkBackground
        intensity={introConfig.backgroundIntensity}
        active={hovered || activating}
        parallaxX={sx}
        parallaxY={sy}
        reduced={reducedMotion}
      />
      <div className="intro-vignette" />

      {/* Decorative coordinate labels */}
      <span className="intro-coords" style={{ top: '14%', left: '8%' }}>
        25.20°N · 55.27°E
      </span>
      <span className="intro-coords" style={{ bottom: '16%', right: '9%' }}>
        NET · CORRIDOR · LIVE
      </span>

      <div className="intro-controls no-print">
        <IntroAudioControl />
        {introConfig.showSkipIntro && <SkipIntroButton onSkip={doEnter} />}
      </div>

      <div className="intro-content">
        {introConfig.summitLine && (
          <motion.p
            className="intro-summit"
            initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {introConfig.summitLine}
          </motion.p>
        )}

        <ActivationButton
          ref={btnRef}
          onActivate={activate}
          hovered={hovered}
          onHoverChange={setHovered}
          ready={ready}
          reduced={reducedMotion}
        />

        <AnimatePresence mode="wait">
          {ready ? (
            <motion.div
              key="ready"
              className="intro-content"
              style={{ gap: 'clamp(0.6rem, 1.5vh, 1rem)', padding: 0 }}
              initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="intro-title">{introConfig.title}</h1>
              <p className="intro-support">{introConfig.supportingText}</p>
              <motion.p
                className="intro-click"
                animate={reducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                {introConfig.activationLabel}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              style={{ display: 'grid', placeItems: 'center', gap: '0.75rem' }}
              exit={{ opacity: 0 }}
            >
              <LoadingRing reduced={reducedMotion} />
              <span className="loading-ring-label">Warming up the network…</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!introConfig.logoIsOfficial && (
        <p className="intro-placeholder-note">Temporary logistics symbol — replace with official ILS logo</p>
      )}

      {/* Reveal sequence overlay */}
      <AnimatePresence>
        {activating && !reducedMotion && (
          <>
            <motion.div
              className="intro-flash"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.9, 0.4, 1], scale: [0.2, 1.4, 2.4, 3.4] }}
              transition={{ duration: introConfig.animationDuration / 1000, ease: 'easeInOut' }}
            />
            <motion.div
              className="intro-wordmark"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [1.1, 1, 1, 0.94] }}
              transition={{ duration: introConfig.animationDuration / 1000, times: [0, 0.45, 0.8, 1] }}
            >
              <img src={asset('/logo/ils-logo-white.png')} alt="ILS — International Logistic Services" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
