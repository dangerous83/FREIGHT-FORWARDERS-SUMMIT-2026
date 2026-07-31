import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { SLIDE_COUNT, findSlideByHash, slides } from '@/data/slides';

type Phase = 'intro' | 'presentation';
type Direction = 1 | -1;

interface PresentationState {
  phase: Phase;
  index: number; // 1-based current slide
  direction: Direction;
  overviewOpen: boolean;
  helpOpen: boolean;
  autoplay: boolean;
  audioEnabled: boolean;
  isFullscreen: boolean;
  reducedMotion: boolean;
}

interface PresentationApi extends PresentationState {
  total: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  enterPresentation: () => void;
  returnToStart: () => void;
  toggleOverview: (open?: boolean) => void;
  toggleHelp: (open?: boolean) => void;
  toggleAutoplay: () => void;
  toggleAudio: () => void;
  toggleFullscreen: () => void;
}

const PresentationContext = createContext<PresentationApi | null>(null);

const AUTOPLAY_MS = 9000;

export function PresentationProvider({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  // Determine initial phase/index from the URL hash (deep-linkable slides).
  const initial = (() => {
    if (typeof window === 'undefined') return { phase: 'intro' as Phase, index: 1 };
    const match = findSlideByHash(window.location.hash);
    if (match) return { phase: 'presentation' as Phase, index: match.index };
    return { phase: 'intro' as Phase, index: 1 };
  })();

  const [phase, setPhase] = useState<Phase>(initial.phase);
  const [index, setIndex] = useState<number>(initial.index);
  const [direction, setDirection] = useState<Direction>(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const syncHash = useCallback((i: number, p: Phase) => {
    if (typeof window === 'undefined') return;
    const target = p === 'presentation' ? `#${slides[i - 1].hash}` : '#/intro';
    if (window.location.hash !== target) {
      window.history.replaceState(null, '', target);
    }
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setIndex((cur) => {
        const clamped = Math.max(1, Math.min(SLIDE_COUNT, target));
        setDirection(clamped >= cur ? 1 : -1);
        syncHash(clamped, 'presentation');
        return clamped;
      });
      setPhase('presentation');
    },
    [syncHash],
  );

  const next = useCallback(() => {
    setIndex((cur) => {
      if (cur >= SLIDE_COUNT) return cur;
      setDirection(1);
      const n = cur + 1;
      syncHash(n, 'presentation');
      return n;
    });
  }, [syncHash]);

  const prev = useCallback(() => {
    setIndex((cur) => {
      if (cur <= 1) return cur;
      setDirection(-1);
      const n = cur - 1;
      syncHash(n, 'presentation');
      return n;
    });
  }, [syncHash]);

  const enterPresentation = useCallback(() => {
    setPhase('presentation');
    setIndex(1);
    setDirection(1);
    syncHash(1, 'presentation');
  }, [syncHash]);

  const returnToStart = useCallback(() => {
    setPhase('intro');
    setOverviewOpen(false);
    setHelpOpen(false);
    setAutoplay(false);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#/intro');
    }
  }, []);

  const toggleOverview = useCallback((open?: boolean) => {
    setOverviewOpen((o) => (typeof open === 'boolean' ? open : !o));
  }, []);

  const toggleHelp = useCallback((open?: boolean) => {
    setHelpOpen((o) => (typeof open === 'boolean' ? open : !o));
  }, []);

  const toggleAutoplay = useCallback(() => setAutoplay((a) => !a), []);
  const toggleAudio = useCallback(() => setAudioEnabled((a) => !a), []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => undefined);
    } else {
      document.exitFullscreen?.().catch(() => undefined);
    }
  }, []);

  // Track native fullscreen state
  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Autoplay
  const autoplayRef = useRef<number>();
  useEffect(() => {
    if (!autoplay || phase !== 'presentation' || overviewOpen) return;
    autoplayRef.current = window.setTimeout(() => {
      if (index >= SLIDE_COUNT) {
        setAutoplay(false);
      } else {
        next();
      }
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(autoplayRef.current);
  }, [autoplay, phase, index, overviewOpen, next]);

  // Respond to browser back/forward hash changes
  useEffect(() => {
    const onHash = () => {
      const match = findSlideByHash(window.location.hash);
      if (match) {
        setPhase('presentation');
        setIndex(match.index);
      } else if (window.location.hash === '#/intro') {
        setPhase('intro');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const value = useMemo<PresentationApi>(
    () => ({
      phase,
      index,
      direction,
      overviewOpen,
      helpOpen,
      autoplay,
      audioEnabled,
      isFullscreen,
      reducedMotion,
      total: SLIDE_COUNT,
      next,
      prev,
      goTo,
      enterPresentation,
      returnToStart,
      toggleOverview,
      toggleHelp,
      toggleAutoplay,
      toggleAudio,
      toggleFullscreen,
    }),
    [
      phase,
      index,
      direction,
      overviewOpen,
      helpOpen,
      autoplay,
      audioEnabled,
      isFullscreen,
      reducedMotion,
      next,
      prev,
      goTo,
      enterPresentation,
      returnToStart,
      toggleOverview,
      toggleHelp,
      toggleAutoplay,
      toggleAudio,
      toggleFullscreen,
    ],
  );

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePresentation(): PresentationApi {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error('usePresentation must be used within PresentationProvider');
  return ctx;
}
