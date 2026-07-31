/**
 * Generates polished, brand-consistent SVG placeholder compositions for every
 * image in the manifest. These are intentionally abstract (no fabricated
 * photos, logos, borders or statistics) and are clearly marked "PLACEHOLDER"
 * so they can be swapped for final Higgsfield 1K renders by filename.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/assets/images');
mkdirSync(OUT, { recursive: true });

const C = {
  navy: '#071B33',
  navy2: '#0B2748',
  cobalt: '#255AAD',
  cobalt2: '#3A7BD5',
  gold: '#E8B72E',
  orange: '#E96332',
  off: '#F6F8FB',
};

function frame(w, h, inner, { grid = true, glowFrom = C.cobalt } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0e3057"/>
      <stop offset="0.55" stop-color="${C.navy2}"/>
      <stop offset="1" stop-color="${C.navy}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="34%" r="60%">
      <stop offset="0" stop-color="${glowFrom}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${glowFrom}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.gold}"/>
      <stop offset="1" stop-color="${C.orange}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${grid ? gridPattern(w, h) : ''}
  ${inner}
  <text x="${w - 18}" y="${h - 16}" text-anchor="end" font-family="Inter, sans-serif" font-size="13" fill="#ffffff" opacity="0.32" letter-spacing="2">PLACEHOLDER · REPLACE WITH HIGGSFIELD 1K</text>
</svg>`;
}

function gridPattern(w, h) {
  let lines = '';
  for (let x = 0; x <= w; x += 64) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += 64) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g stroke="${C.cobalt2}" stroke-width="0.6" opacity="0.12">${lines}</g>`;
}

// Simple silhouette helpers ------------------------------------------------
const crane = (x, y, s, col) =>
  `<g stroke="${col}" stroke-width="${2 * s}" fill="none" opacity="0.8">
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y - 90 * s}"/>
    <line x1="${x - 40 * s}" y1="${y - 90 * s}" x2="${x + 70 * s}" y2="${y - 90 * s}"/>
    <line x1="${x + 40 * s}" y1="${y - 90 * s}" x2="${x + 40 * s}" y2="${y - 60 * s}"/>
  </g>`;

const container = (x, y, w, h, col) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" opacity="0.9" rx="2"/>
   <line x1="${x + w / 3}" y1="${y}" x2="${x + w / 3}" y2="${y + h}" stroke="${C.navy}" stroke-width="1" opacity="0.5"/>
   <line x1="${x + (2 * w) / 3}" y1="${y}" x2="${x + (2 * w) / 3}" y2="${y + h}" stroke="${C.navy}" stroke-width="1" opacity="0.5"/>`;

const mountains = (w, h, col) =>
  `<path d="M0,${h} L${w * 0.18},${h * 0.55} L${w * 0.32},${h * 0.72} L${w * 0.52},${h * 0.4} L${w * 0.7},${h * 0.68} L${w * 0.86},${h * 0.5} L${w},${h * 0.66} L${w},${h} Z" fill="${col}" opacity="0.55"/>`;

const truck = (x, y, s, col, accent) =>
  `<g>
    <rect x="${x}" y="${y - 34 * s}" width="${90 * s}" height="${34 * s}" rx="3" fill="${col}"/>
    <rect x="${x + 90 * s}" y="${y - 24 * s}" width="${30 * s}" height="${24 * s}" rx="3" fill="${accent}"/>
    <circle cx="${x + 24 * s}" cy="${y}" r="${8 * s}" fill="#0a1a2e" stroke="${col}" stroke-width="${2 * s}"/>
    <circle cx="${x + 66 * s}" cy="${y}" r="${8 * s}" fill="#0a1a2e" stroke="${col}" stroke-width="${2 * s}"/>
    <circle cx="${x + 104 * s}" cy="${y}" r="${8 * s}" fill="#0a1a2e" stroke="${accent}" stroke-width="${2 * s}"/>
  </g>`;

const routeArc = (w, h) =>
  `<path d="M${w * 0.05},${h * 0.8} C${w * 0.3},${h * 0.5} ${w * 0.6},${h * 0.55} ${w * 0.95},${h * 0.28}" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-dasharray="2 10" opacity="0.85"/>`;

// Compositions -------------------------------------------------------------
const images = {
  'hero-convoy': (w, h) =>
    `${mountains(w, h, '#0c2545')}${mountains(w, h * 1.08, '#0a1f3c')}
     <g opacity="0.9">${truck(w * 0.24, h * 0.82, 1.6, C.cobalt, C.gold)}${truck(w * 0.5, h * 0.86, 1.9, C.cobalt2, C.orange)}${truck(w * 0.72, h * 0.83, 1.5, C.cobalt, C.gold)}</g>
     ${routeArc(w, h)}
     <circle cx="${w * 0.82}" cy="${h * 0.2}" r="46" fill="${C.gold}" opacity="0.14"/>`,
  'hamburg-port': (w, h) =>
    `<g>${crane(w * 0.2, h * 0.7, 1.3, C.cobalt2)}${crane(w * 0.45, h * 0.68, 1.5, C.cobalt2)}${crane(w * 0.72, h * 0.72, 1.2, C.cobalt2)}</g>
     <g>${container(w * 0.12, h * 0.72, 60, 26, C.cobalt)}${container(w * 0.12, h * 0.72 + 28, 60, 26, C.cobalt2)}${container(w * 0.3, h * 0.75, 60, 26, C.orange)}${container(w * 0.55, h * 0.73, 60, 26, C.cobalt)}${container(w * 0.55, h * 0.73 + 28, 60, 26, C.gold)}${container(w * 0.72, h * 0.76, 60, 26, C.cobalt2)}</g>
     <rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="#06182e" opacity="0.7"/>`,
  'dubai-operations': (w, h) =>
    `<g fill="#0c2545" opacity="0.85">
       <rect x="${w * 0.62}" y="${h * 0.2}" width="26" height="${h * 0.6}"/>
       <polygon points="${w * 0.72},${h * 0.08} ${w * 0.735},${h * 0.8} ${w * 0.705},${h * 0.8}"/>
       <rect x="${w * 0.78}" y="${h * 0.32}" width="34" height="${h * 0.48}"/>
       <rect x="${w * 0.86}" y="${h * 0.42}" width="24" height="${h * 0.38}"/>
     </g>
     <g>${container(w * 0.1, h * 0.72, 58, 24, C.cobalt)}${container(w * 0.26, h * 0.74, 58, 24, C.gold)}${container(w * 0.42, h * 0.72, 58, 24, C.cobalt2)}</g>
     ${truck(w * 0.14, h * 0.86, 1.5, C.cobalt, C.orange)}
     <rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="#06182e" opacity="0.6"/>`,
  'central-asia-corridor': (w, h) =>
    `${mountains(w, h, '#0c2545')}
     <path d="M0,${h * 0.9} C${w * 0.3},${h * 0.82} ${w * 0.6},${h * 0.92} ${w},${h * 0.8}" fill="none" stroke="#12294a" stroke-width="30"/>
     <path d="M0,${h * 0.9} C${w * 0.3},${h * 0.82} ${w * 0.6},${h * 0.92} ${w},${h * 0.8}" fill="none" stroke="${C.gold}" stroke-width="2" stroke-dasharray="14 14" opacity="0.7"/>
     ${truck(w * 0.4, h * 0.88, 1.7, C.cobalt2, C.orange)}`,
  'kabul-corridor': (w, h) =>
    `${mountains(w, h * 0.95, '#0b2140')}${mountains(w, h * 1.1, '#091b34')}
     <path d="M${w * 0.1},${h * 0.9} Q${w * 0.5},${h * 0.7} ${w * 0.92},${h * 0.5}" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-dasharray="2 10"/>
     ${truck(w * 0.32, h * 0.9, 1.5, C.cobalt, C.gold)}${truck(w * 0.54, h * 0.86, 1.3, C.cobalt2, C.gold)}
     <circle cx="${w * 0.8}" cy="${h * 0.24}" r="30" fill="${C.gold}" opacity="0.1"/>`,
  'karachi-port': (w, h) =>
    `<g>${crane(w * 0.28, h * 0.66, 1.6, C.cobalt2)}${crane(w * 0.58, h * 0.68, 1.4, C.cobalt2)}${crane(w * 0.82, h * 0.7, 1.2, C.cobalt2)}</g>
     <g>${container(w * 0.14, h * 0.74, 62, 26, C.orange)}${container(w * 0.14, h * 0.74 + 28, 62, 26, C.cobalt)}${container(w * 0.36, h * 0.76, 62, 26, C.cobalt2)}${container(w * 0.6, h * 0.75, 62, 26, C.gold)}</g>
     <rect x="0" y="${h * 0.84}" width="${w}" height="${h * 0.16}" fill="#06182e" opacity="0.7"/>`,
  'heavy-lift': (w, h) => {
    const y = h * 0.68;
    let axles = '';
    for (let i = 0; i < 10; i++) axles += `<circle cx="${w * 0.2 + i * 34}" cy="${y + 40}" r="12" fill="#0a1a2e" stroke="${C.cobalt2}" stroke-width="3"/>`;
    return `${mountains(w, h, '#0b2140')}
      <rect x="${w * 0.16}" y="${y}" width="${w * 0.42}" height="24" fill="${C.cobalt}"/>
      <rect x="${w * 0.2}" y="${y - 90}" width="${w * 0.3}" height="90" fill="#123a66" stroke="${C.cobalt2}" stroke-width="2"/>
      <rect x="${w * 0.24}" y="${y - 70}" width="30" height="60" fill="#0e2f52"/>
      <rect x="${w * 0.32}" y="${y - 74}" width="40" height="64" fill="#0e2f52"/>
      ${axles}
      ${truck(w * 0.05, y + 52, 1.4, C.orange, C.gold)}
      <text x="${w * 0.35}" y="${y - 40}" text-anchor="middle" font-family="Inter" font-size="16" fill="${C.off}" opacity="0.5">REFINERY MODULE</text>`;
  },
  'humanitarian-case': (w, h) =>
    `${mountains(w, h * 0.95, '#0b2140')}${mountains(w, h * 1.12, '#091b34')}
     <path d="M${w * 0.06},${h * 0.86} Q${w * 0.5},${h * 0.66} ${w * 0.94},${h * 0.46}" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-dasharray="2 10"/>
     <g>${container(w * 0.3, h * 0.74, 70, 30, C.cobalt)}${container(w * 0.44, h * 0.72, 70, 30, C.off)}${container(w * 0.44, h * 0.72, 70, 30, '#c9d6e6')}</g>
     ${truck(w * 0.24, h * 0.9, 1.6, C.cobalt2, C.gold)}
     <text x="${w * 0.52}" y="${h * 0.71}" font-family="Inter" font-size="14" fill="${C.navy}" opacity="0.6">RELIEF</text>`,
};

const sizes = {
  'hero-convoy': [1600, 900],
  'hamburg-port': [900, 600],
  'dubai-operations': [900, 600],
  'central-asia-corridor': [900, 600],
  'kabul-corridor': [900, 600],
  'karachi-port': [900, 600],
  'heavy-lift': [1600, 900],
  'humanitarian-case': [1600, 900],
};

let count = 0;
for (const [id, draw] of Object.entries(images)) {
  const [w, h] = sizes[id];
  const svg = frame(w, h, draw(w, h), {
    glowFrom: id.includes('kabul') || id.includes('humanitarian') ? C.gold : C.cobalt,
  });
  writeFileSync(resolve(OUT, `${id}.svg`), svg);
  count += 1;
}
console.log(`Generated ${count} placeholder images in ${OUT}`);
