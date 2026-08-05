import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { locations, type LocationId } from '@/data/locations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  activeId: LocationId | null;
  onSelect: (id: LocationId) => void;
  animate: boolean;
}

// User-uploaded corridor basemap MP4 ("slide 4 Map"). Served from /public.
const MAP_VIDEO = '/assets/video/slide-4-map.mp4';

// Geographic bounding box the image was generated to cover. The image is
// stretched to fill 16:9, so we project lat/lon into normalized 0..1 space
// against the box (not against true equirectangular units).
const LON_MIN = 0;
const LON_MAX = 78;
const LAT_MIN = 20;
const LAT_MAX = 58;

const W = 1600;
const H = 900; // 16:9 render surface

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
      const my = (prev.y + cur.y) / 2 - 40;
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
    return d;
  }, [points]);

  return (
    <div className="route-map">
      <video
        className="route-map__video"
        src={MAP_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <svg
        className="route-map__overlay"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="ILS corridor plotted on a real satellite basemap: Hamburg, Dubai, Central Asia, Kabul, Karachi"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="corridorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d8ee0" />
            <stop offset="55%" stopColor="#f0a03a" />
            <stop offset="100%" stopColor="#e96332" />
          </linearGradient>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="80%">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={W} height={H} fill="url(#mapVignette)" />

        {/* Static corridor line — no draw animation */}
        <path
          d={pathD}
          fill="none"
          stroke="#0b1a30"
          strokeOpacity="0.9"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d={pathD}
          fill="none"
          stroke="url(#corridorGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Nodes with radar echo pulses */}
        {points.map((p, i) => {
          const isActive = p.id === activeId;
          return (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
              {!reduced && animate && [0, 1, 2].map((k) => (
                <circle
                  key={`echo-${k}`}
                  r="10"
                  fill="none"
                  stroke={isActive ? '#e8b72e' : '#e96332'}
                  strokeWidth="2"
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    values="8;46"
                    dur="2.6s"
                    begin={`${i * 0.25 + k * 0.87}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="2.6s"
                    begin={`${i * 0.25 + k * 0.87}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-width"
                    values="2.5;0.4"
                    dur="2.6s"
                    begin={`${i * 0.25 + k * 0.87}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              <motion.circle
                r={isActive ? 12 : 9}
                fill={isActive ? '#e8b72e' : '#f4f7fc'}
                initial={reduced ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.2 + i * 0.15, duration: 0.35 }}
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
                    fill="rgba(7,18,36,0.8)"
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
