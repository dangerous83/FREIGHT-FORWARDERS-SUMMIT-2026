import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { locations, type LocationId } from '@/data/locations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  activeId: LocationId | null;
  onSelect: (id: LocationId) => void;
  animate: boolean;
}

// Real geographic base map generated via Higgsfield (nano_banana / Gemini image).
// CloudFront-hosted, cache-immutable for 1 year.
const MAP_IMAGE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260805_072750_508f702b-6dff-4227-aad7-20b0d8be6f66.png';

// The generated map spans roughly this lon/lat bounding box — coordinates were
// used in the prompt and match the corridor from Hamburg to Karachi.
const LON_MIN = 0;
const LON_MAX = 83;
const LAT_MIN = 19;
const LAT_MAX = 58;
const W = 1600;
const H = ((LAT_MAX - LAT_MIN) / (LON_MAX - LON_MIN)) * W; // preserve aspect

const project = (lat: number, lng: number) => ({
  x: ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
});

export function RouteMap({ activeId, onSelect, animate }: Props) {
  const reduced = useReducedMotion();
  const ordered = useMemo(() => [...locations].sort((a, b) => a.order - b.order), []);
  const points = useMemo(() => ordered.map((l) => ({ ...l, ...project(l.lat, l.lng) })), [ordered]);

  const pathD = useMemo(() => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      const mx = (prev.x + cur.x) / 2;
      const my = (prev.y + cur.y) / 2 - (W * 0.045);
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
    return d;
  }, [points]);

  return (
    <div className="route-map">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="ILS corridor: Hamburg to Dubai to Central Asia to Kabul and Karachi, plotted on a real satellite basemap"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="corridorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d8ee0" />
            <stop offset="55%" stopColor="#f0a03a" />
            <stop offset="100%" stopColor="#e96332" />
          </linearGradient>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Real generated satellite / editorial base map */}
        <image
          href={MAP_IMAGE}
          x={0}
          y={0}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid slice"
        />
        {/* Vignette to focus attention on the corridor */}
        <rect width={W} height={H} fill="url(#mapVignette)" />

        {/* Corridor path (dark base + gradient stroke animated draw) */}
        <path
          id="corridorPath"
          d={pathD}
          fill="none"
          stroke="#0b1a30"
          strokeOpacity="0.85"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#corridorGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: animate ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 2.4, ease: 'easeInOut' }}
        />

        {/* Live data pulses travelling the corridor */}
        {!reduced &&
          animate &&
          [0, 1.6, 3.2].map((delay, i) => (
            <circle key={i} r={i === 1 ? 7 : 5} fill="#ffe6b8" opacity="0.95">
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
                  r={isActive ? 30 : 22}
                  fill="none"
                  stroke={isActive ? '#e8b72e' : '#8ab6f2'}
                  strokeWidth="2"
                  initial={{ opacity: 0.6, scale: 0.7 }}
                  animate={{ opacity: [0.55, 0, 0.55], scale: [0.8, 1.6, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{ transformOrigin: 'center' }}
                />
              )}
              <motion.circle
                r={isActive ? 12 : 9}
                fill={isActive ? '#e8b72e' : '#f4f7fc'}
                initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.4 + i * 0.42, duration: 0.4 }}
                stroke="#0b1a30"
                strokeWidth="2.5"
              />
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
                <circle r="34" fill="transparent" style={{ cursor: 'pointer' }} />
                <g transform={`translate(${i === 0 ? 22 : 0}, ${i % 2 === 0 ? -34 : 46})`}>
                  <rect
                    x={i === 0 ? -4 : -60}
                    y={-18}
                    width={i === 0 ? p.name.length * 12 + 20 : 120}
                    height={26}
                    rx={13}
                    fill="rgba(7,18,36,0.78)"
                    stroke={isActive ? '#e8b72e' : 'rgba(255,255,255,0.18)'}
                    strokeWidth="1"
                  />
                  <text
                    className="route-node__label"
                    x={i === 0 ? 6 : 0}
                    y={0}
                    textAnchor={i === 0 ? 'start' : 'middle'}
                    fill={isActive ? '#ffdc7a' : '#e6eefb'}
                  >
                    {p.name}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
