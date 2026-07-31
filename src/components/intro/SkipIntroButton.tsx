import { SkipForward } from 'lucide-react';

/** Immediate access to Slide 01 for users who want to bypass the entry animation. */
export function SkipIntroButton({ onSkip }: { onSkip: () => void }) {
  return (
    <button
      type="button"
      className="intro-ctl-btn skip-intro"
      onClick={onSkip}
      aria-label="Skip the intro and go straight to the first slide"
    >
      <SkipForward size={15} />
      <span>Skip intro</span>
    </button>
  );
}
