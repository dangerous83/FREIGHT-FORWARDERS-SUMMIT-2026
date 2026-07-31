import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { introConfig } from '@/data/intro';

interface Props {
  onActivate: () => void;
  hovered: boolean;
  onHoverChange: (h: boolean) => void;
  ready: boolean;
  reduced: boolean;
}

/**
 * The central activation control — a real semantic button.
 * Idle: breathing scale, rotating technical rings, soft scanning line.
 * Hover: rings brighten, icon scales, "INITIALIZE PRESENTATION" label appears.
 */
export const ActivationButton = forwardRef<HTMLButtonElement, Props>(function ActivationButton(
  { onActivate, hovered, onHoverChange, ready, reduced },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      className="activation"
      onClick={ready ? onActivate : undefined}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      aria-label={`${introConfig.activationLabel} — enter the ILS presentation`}
      aria-disabled={!ready}
      initial={reduced ? undefined : { scale: 0.9, opacity: 0 }}
      animate={reduced ? undefined : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ cursor: ready ? 'pointer' : 'progress' }}
    >
      <div className="activation__rings">
        <svg viewBox="0 0 200 200" fill="none">
          {/* Outer technical ring */}
          <g className={reduced ? undefined : 'ring-outer'} opacity={hovered ? 0.95 : 0.6}>
            <circle cx="100" cy="100" r="94" stroke="#3a7bd5" strokeWidth="1" strokeDasharray="2 8" />
            {[0, 90, 180, 270].map((a) => (
              <line
                key={a}
                x1="100"
                y1="6"
                x2="100"
                y2="16"
                stroke="#5c9bf0"
                strokeWidth="2"
                transform={`rotate(${a} 100 100)`}
              />
            ))}
          </g>
          {/* Mid ring */}
          <g className={reduced ? undefined : 'ring-mid'} opacity={hovered ? 0.9 : 0.55}>
            <circle cx="100" cy="100" r="80" stroke="#255aad" strokeWidth="1.4" strokeDasharray="40 220" />
            <circle cx="100" cy="100" r="80" stroke="#255aad" strokeWidth="1.4" strokeDasharray="40 220" transform="rotate(180 100 100)" />
          </g>
          {/* Thin progress paths */}
          <circle cx="100" cy="100" r="70" stroke="#1c3f6e" strokeWidth="0.8" opacity="0.7" />
          {/* Scanning sweep */}
          {!reduced && (
            <g className="ring-scan">
              <defs>
                <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5c9bf0" stopOpacity="0" />
                  <stop offset="100%" stopColor="#5c9bf0" stopOpacity={hovered ? 0.85 : 0.5} />
                </linearGradient>
              </defs>
              <path d="M100 100 L100 22 A78 78 0 0 1 168 62 Z" fill="url(#scanGrad)" opacity="0.5" />
            </g>
          )}
        </svg>
      </div>

      <div className={`activation__logo-wrap ${reduced ? '' : 'activation__breathe'}`}>
        <img className="activation__logo" src={introConfig.logoSrc} alt="" aria-hidden="true" />
      </div>

      {hovered && (
        <motion.span
          className="activation__hover-label"
          initial={reduced ? undefined : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {introConfig.hoverLabel}
        </motion.span>
      )}
    </motion.button>
  );
});
