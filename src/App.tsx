import { AnimatePresence } from 'framer-motion';
import { PresentationProvider, usePresentation } from '@/context/PresentationContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PresentationIntro } from '@/components/intro/PresentationIntro';
import { PresentationShell } from '@/components/shell/PresentationShell';

function Experience() {
  const { phase } = usePresentation();
  return (
    <div className="app-root">
      {/* The shell mounts underneath so assets warm up during the intro. */}
      <PresentationShell />
      <AnimatePresence>{phase === 'intro' && <PresentationIntro key="intro" />}</AnimatePresence>
    </div>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  return (
    <PresentationProvider reducedMotion={reducedMotion}>
      <Experience />
    </PresentationProvider>
  );
}
