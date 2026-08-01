import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { locations, type LocationId } from '@/data/locations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  activeId: LocationId | null;
  onSelect: (id: LocationId) => void;
  animate: boolean;
}

// Projection bounds (real degrees) padded around the corridor.
const LON_MIN = 0;
const LON_MAX = 83;
const LAT_MIN = 19;
const LAT_MAX = 58;
const W = 1000;
const H = 560;

const project = (lat: number, lng: number) => ({
  x: ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
});

/**
 * Accurate-geography corridor visualization.
 * Uses REAL coordinates projected equirectangularly onto a graticule.
 * No fabricated coastlines or borders — a lat/long grid plus correctly-placed
 * nodes and the animated corridor connecting them.
 */
export function RouteMap({ activeId, onSelect, animate }: Props) {
  const reduced = useReducedMotion();
  const ordered = useMemo(() => [...locations].sort((a, b) => a.order - b.order), []);
  const points = useMemo(() => ordered.map((l) => ({ ...l, ...project(l.lat, l.lng) })), [ordered]);

  // Build a smooth corridor path through the nodes.
  const pathD = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      const mx = (prev.x + cur.x) / 2;
      const my = (prev.y + cur.y) / 2 - 42; // arc upward for a flight-path feel
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
    return d;
  }, [points]);

  return (
    <div className="route-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="ILS corridor: Hamburg to Dubai to Central Asia to Kabul and Karachi">
        <defs>
          <linearGradient id="corridorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#255aad" />
            <stop offset="55%" stopColor="#3a7bd5" />
            <stop offset="100%" stopColor="#e96332" />
          </linearGradient>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#0f3562" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#071b33" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#mapGlow)" />

        {/* Graticule — real lat/long grid, 10° spacing */}
        <g stroke="#2b4c78" strokeWidth="0.7" opacity="0.5">
          {Array.from({ length: Math.floor((LON_MAX - LON_MIN) / 10) + 1 }).map((_, i) => {
            const lng = LON_MIN + i * 10;
            const { x } = project(0, lng);
            return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={H} />;
          })}
          {Array.from({ length: Math.floor((LAT_MAX - LAT_MIN) / 10) + 1 }).map((_, i) => {
            const lat = LAT_MIN + i * 10;
            const { y } = project(lat, 0);
            return <line key={`h${i}`} x1={0} y1={y} x2={W} y2={y} />;
          })}
        </g>

        {/* Corridor path (animated draw) */}
        <path id="corridorPath" d={pathD} fill="none" stroke="#12294a" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#corridorGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: animate ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 2.4, ease: 'easeInOut' }}
        />

        {/* Live data pulses travelling the corridor */}
        {!reduced &&
          animate &&
          [0, 1.6, 3.2].map((delay, i) => (
            <circle key={i} r={i === 1 ? 5 : 3.5} fill="#bcd6fb" opacity="0.9">
              <animateMotion dur="4.8s" begin={`${delay + 2.2}s`} repeatCount="indefinite" rotate="auto">
                <mpath href="#corridorPath" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="4.8s" begin={`${delay + 2.2}s`} repeatCount="indefinite" />
            </circle>
          ))}

        {/* Nodes */}
        {points.map((p, i) => {
          const isActive = p.id === activeId;
          return (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
              {!reduced && (
                <motion.circle
                  r={isActive ? 22 : 16}
                  fill="none"
                  stroke={isActive ? '#e8b72e' : '#3a7bd5'}
                  strokeWidth="1.4"
                  initial={{ opacity: 0.6, scale: 0.7 }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{ transformOrigin: 'center' }}
                />
              )}
              <motion.circle
                r={isActive ? 9 : 6.5}
                fill={isActive ? '#e8b72e' : '#8ab6f2'}
                initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.4 + i * 0.42, duration: 0.4 }}
                stroke="#071b33"
                strokeWidth="2"
              />
              {/* Clickable hit-target + label */}
              <g
                className="route-node"
                role="button"
                tabIndex={0}
                aria-label={`${p.name}, ${p.country}`}
                onClick={() => onSelect(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(p.id);
                  }
                }}
              >
                <circle r="26" fill="transparent" style={{ cursor: 'pointer' }} />
                <text
                  className="route-node__label"
                  x={i === 0 ? 18 : 0}
                  y={i % 2 === 0 ? -30 : 40}
                  textAnchor={i === 0 ? 'start' : 'middle'}
                  fill={isActive ? '#e8b72e' : '#e6eefb'}
                >
                  {p.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
