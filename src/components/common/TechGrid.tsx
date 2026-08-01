import { memo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  /** Visual weight 0..1. */
  intensity?: number;
  /** Accent: cobalt (default), gold, orange. */
  accent?: 'cobalt' | 'gold' | 'orange';
  /** Show HUD corner brackets + telemetry strip. */
  hud?: boolean;
  /** Telemetry label shown top-left of the HUD. */
  label?: string;
}

const ACCENT: Record<string, string> = {
  cobalt: '#3a7bd5',
  gold: '#e8b72e',
  orange: '#e96332',
};

/**
 * High-tech "cyber" overlay in the ILS brand blue: a fine animated mesh grid,
 * a slow radar/scan sweep, drifting data particles, and optional HUD corner
 * brackets + telemetry. Purely decorative, pointer-events: none, and fully
 * static under prefers-reduced-motion.
 */
function TechGridBase({ intensity = 0.5, accent = 'cobalt', hud = true, label = 'ILS · NETWORK LINK' }: Props) {
  const reduced = useReducedMotion();
  const col = ACCENT[accent];
  const gridOp = 0.05 + intensity * 0.07;

  return (
    <div className="tech-grid" aria-hidden="true">
      <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="tgMesh" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke={col} strokeWidth="0.6" />
          </pattern>
          <radialGradient id="tgFade" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="tgMask">
            <rect width="1280" height="720" fill="url(#tgFade)" />
          </mask>
          <linearGradient id="tgScan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col} stopOpacity="0" />
            <stop offset="85%" stopColor={col} stopOpacity="0" />
            <stop offset="100%" stopColor={col} stopOpacity={0.5 + intensity * 0.3} />
          </linearGradient>
        </defs>

        {/* Mesh */}
        <rect width="1280" height="720" fill="url(#tgMesh)" opacity={gridOp} mask="url(#tgMask)" />

        {/* Scan sweep */}
        {!reduced && (
          <rect className="tg-scan" width="1280" height="140" fill="url(#tgScan)" opacity="0.6" mask="url(#tgMask)" />
        )}

        {/* Drifting data particles */}
        {!reduced &&
          Array.from({ length: 18 }).map((_, i) => {
            const x = (i * 137) % 1280;
            const y = (i * 89) % 720;
            return (
              <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.8 : 1} fill={col} opacity="0.5">
                <animate
                  attributeName="opacity"
                  values="0.05;0.6;0.05"
                  dur={`${3 + (i % 5)}s`}
                  begin={`${(i % 7) * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${y};${y - 26};${y}`}
                  dur={`${6 + (i % 6)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
      </svg>

      {hud && (
        <div className={`tg-hud tg-hud--${accent}`}>
          <span className="tg-hud__corner tg-hud__corner--tl" />
          <span className="tg-hud__corner tg-hud__corner--tr" />
          <span className="tg-hud__corner tg-hud__corner--bl" />
          <span className="tg-hud__corner tg-hud__corner--br" />
          <span className="tg-hud__label">
            <span className={`tg-hud__dot ${reduced ? '' : 'tg-hud__dot--live'}`} />
            {label}
          </span>
          <span className="tg-hud__coord">24.86°N · 67.01°E — 53.55°N · 9.99°E</span>
        </div>
      )}
    </div>
  );
}

export const TechGrid = memo(TechGridBase);
