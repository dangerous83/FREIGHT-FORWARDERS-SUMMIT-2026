import { memo } from 'react';
import { motion, type MotionValue } from 'framer-motion';

interface Props {
  intensity: number;
  active: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
}

/**
 * Sophisticated, uncluttered network backdrop:
 *  - subtle digital grid
 *  - very faint globe geometry (latitude / longitude arcs)
 *  - fine global route lines with animated dash motion
 *  - a handful of slow data particles
 * All SVG, no external assets. Route dash animation pauses under reduced motion.
 */
function NetworkBackgroundBase({ intensity, active, parallaxX, parallaxY, reduced }: Props) {
  const routeOpacity = 0.35 + intensity * 0.4 + (active ? 0.2 : 0);
  const gridOpacity = 0.06 + intensity * 0.06;

  // Decorative route arcs across the "world" (abstract, not a literal map).
  const routes = [
    'M120,470 C360,300 620,300 860,410',
    'M860,410 C1050,470 1180,380 1320,300',
    'M300,650 C520,560 760,600 980,540',
    'M180,360 C420,220 720,180 1040,240',
  ];

  return (
    <div className="intro-bg" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <defs>
          <radialGradient id="glowCore" cx="50%" cy="46%" r="45%">
            <stop offset="0%" stopColor="#3a7bd5" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#255aad" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#255aad" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#255aad" stopOpacity="0" />
            <stop offset="50%" stopColor="#5c9bf0" stopOpacity="1" />
            <stop offset="100%" stopColor="#255aad" stopOpacity="0" />
          </linearGradient>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0 L0 0 0 48" fill="none" stroke="#4f7cb8" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Digital grid */}
        <rect width="1440" height="810" fill="url(#grid)" opacity={gridOpacity} />

        {/* Central glow */}
        <rect width="1440" height="810" fill="url(#glowCore)" />

        {/* Faint globe geometry */}
        <g
          fill="none"
          stroke="#4f8ad6"
          strokeWidth="0.8"
          opacity={0.14 + intensity * 0.05}
          transform="translate(720 405)"
        >
          <circle r="300" />
          {[-220, -120, 0, 120, 220].map((cy) => (
            <ellipse key={cy} cx="0" cy={cy} rx={Math.sqrt(Math.max(0, 300 * 300 - cy * cy))} ry="26" />
          ))}
          {[-1, -0.55, 0, 0.55, 1].map((k, i) => (
            <ellipse key={i} rx={Math.abs(k) * 300 || 60} ry="300" cx="0" cy="0" opacity={0.7} />
          ))}
        </g>

        {/* Route lines */}
        <g fill="none" stroke="url(#routeStroke)" strokeWidth="1.6" opacity={routeOpacity}>
          {routes.map((d, i) => (
            <g key={i}>
              <path d={d} stroke="#26518f" strokeWidth="1" opacity="0.5" />
              <path
                d={d}
                strokeDasharray="6 200"
                className={reduced ? undefined : 'intro-route-dash'}
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            </g>
          ))}
        </g>

        {/* Route nodes */}
        <g fill="#7fb2f5">
          {[
            [120, 470],
            [860, 410],
            [1320, 300],
            [980, 540],
            [180, 360],
            [1040, 240],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3" opacity="0.9" />
              {!reduced && (
                <circle cx={cx} cy={cy} r="3" fill="none" stroke="#7fb2f5" strokeWidth="1">
                  <animate attributeName="r" values="3;14;3" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}
        </g>

        {/* Slow data particles */}
        {!reduced && (
          <g fill="#a9cbf7">
            {Array.from({ length: 14 }).map((_, i) => {
              const x = (i * 103) % 1440;
              const y = (i * 197) % 810;
              return (
                <circle key={i} cx={x} cy={y} r="1.4" opacity="0.5">
                  <animate
                    attributeName="cy"
                    values={`${y};${y - 40};${y}`}
                    dur={`${6 + (i % 5)}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>
        )}
      </motion.svg>
    </div>
  );
}

export const NetworkBackground = memo(NetworkBackgroundBase);
