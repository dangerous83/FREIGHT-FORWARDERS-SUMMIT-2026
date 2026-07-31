import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';

const SHORTCUTS: { keys: string[]; action: string }[] = [
  { keys: ['→', 'Space'], action: 'Next slide' },
  { keys: ['←'], action: 'Previous slide' },
  { keys: ['Home'], action: 'First slide' },
  { keys: ['End'], action: 'Last slide' },
  { keys: ['1–9'], action: 'Jump to slide' },
  { keys: ['O'], action: 'Slide overview' },
  { keys: ['F'], action: 'Toggle fullscreen' },
  { keys: ['P'], action: 'Toggle autoplay' },
  { keys: ['?'], action: 'This help panel' },
  { keys: ['Esc'], action: 'Close overlays' },
];

export function KeyboardHelp() {
  const { helpOpen, toggleHelp } = usePresentation();
  if (!helpOpen) return null;
  return (
    <motion.div
      className="overlay keyboard-help"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      style={{ gridTemplateRows: 'auto 1fr' }}
    >
      <div className="overlay__head">
        <h2 className="overlay__title">Keyboard &amp; navigation</h2>
        <button className="overlay__close" onClick={() => toggleHelp(false)} aria-label="Close help">
          <X size={18} />
        </button>
      </div>
      <div className="help-body scroll-y">
        {SHORTCUTS.map((s) => (
          <div className="help-row" key={s.action}>
            <span>{s.action}</span>
            <span className="kbd">
              {s.keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
