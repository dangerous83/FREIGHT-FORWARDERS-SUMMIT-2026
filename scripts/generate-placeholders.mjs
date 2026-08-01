/**
 * Generates CINEMATIC, atmospheric SVG placeholder compositions for every
 * image in the manifest — dark, moody, film-graded backdrops (layered
 * silhouettes, haze, light shafts, grain, ILS-blue grade) rather than
 * iconographic clip-art. They read as premium cinematic depth behind the
 * slide scrims. Each is clearly marked "PLACEHOLDER" for swap-out with the
 * final Higgsfield 1K renders (see docs/HIGGSFIELD_IMAGE_PROMPTS.md).
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
  navy: '#04101f',
  navy2: '#071b33',
  blue: '#0e355f',
  cobalt: '#255aad',
  cobalt2: '#3a7bd5',
  ice: '#8fb7e8',
  gold: '#e8b72e',
  amber: '#e9843a',
  orange: '#e96332',
};

/** Shared cinematic defs: grade, grain, haze, vignette, light. */
function defs(w, h, opts) {
  const horizon = opts.horizon ?? C.cobalt2;
  const glow = opts.glow ?? C.gold;
  return `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${opts.top ?? '#0a2039'}"/>
      <stop offset="0.42" stop-color="${opts.mid ?? C.blue}"/>
      <stop offset="0.7" stop-color="${horizon}"/>
      <stop offset="1" stop-color="${opts.bottom ?? C.navy}"/>
    </linearGradient>
    <radialGradient id="sun" cx="${opts.sunX ?? 68}%" cy="${opts.sunY ?? 60}%" r="55%">
      <stop offset="0" stop-color="${glow}" stop-opacity="${opts.sunA ?? 0.55}"/>
      <stop offset="0.35" stop-color="${glow}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="46%" r="75%">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.66"/>
    </radialGradient>
    <linearGradient id="cobaltShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.cobalt}" stop-opacity="0.0"/>
      <stop offset="1" stop-color="${C.cobalt}" stop-opacity="0.22"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${opts.seed ?? 7}" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
    <filter id="soft"><feGaussianBlur stdDeviation="${opts.soft ?? 3}"/></filter>
    <filter id="haze"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>`;
}

/** A layered ridge/dune silhouette. */
function ridge(w, h, baseY, amp, col, op, blur = 0) {
  let d = `M0 ${h} L0 ${baseY}`;
  const seg = 7;
  for (let i = 0; i <= seg; i++) {
    const x = (w / seg) * i;
    const y = baseY + Math.sin(i * 1.7 + amp) * amp - (i % 2) * amp * 0.4;
    d += ` L${x.toFixed(0)} ${y.toFixed(0)}`;
  }
  d += ` L${w} ${h} Z`;
  return `<path d="${d}" fill="${col}" opacity="${op}"${blur ? ' filter="url(#soft)"' : ''}/>`;
}

/** Fine light shafts from the horizon. */
function shafts(w, h, x, col) {
  let s = `<g opacity="0.10" filter="url(#haze)">`;
  for (let i = -3; i <= 3; i++) {
    s += `<polygon points="${x},${h * 0.55} ${x + i * 40 - 60},0 ${x + i * 40 + 60},0" fill="${col}"/>`;
  }
  return s + `</g>`;
}

/** Distant crane line-art (fine, silhouetted). */
function cranes(w, y, col) {
  let g = `<g stroke="${col}" stroke-width="1.4" fill="none" opacity="0.5">`;
  for (let i = 0; i < 5; i++) {
    const x = w * (0.12 + i * 0.19);
    const hh = 60 + (i % 3) * 22;
    g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - hh}"/>
          <line x1="${x - 34}" y1="${y - hh}" x2="${x + 60}" y2="${y - hh + 6}"/>
          <line x1="${x + 34}" y1="${y - hh + 3}" x2="${x + 34}" y2="${y - hh + 22}"/>`;
  }
  return g + `</g>`;
}

/** Container-stack texture as dim blocks. */
function stacks(w, y, col) {
  let g = `<g opacity="0.32">`;
  for (let i = 0; i < 26; i++) {
    const x = (i * 47) % w;
    const row = ((i * 47) / w) | 0;
    g += `<rect x="${x}" y="${y - row * 12}" width="42" height="11" fill="${col}" opacity="${0.4 + ((i % 3) * 0.2)}"/>`;
  }
  return g + `</g>`;
}

const frame = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" preserveAspectRatio="xMidYMid slice">
  ${inner}
  <text x="${w - 16}" y="${h - 13}" text-anchor="end" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#ffffff" opacity="0.22" letter-spacing="1.5">PLACEHOLDER · REPLACE WITH HIGGSFIELD 1K</text>
</svg>`;

// ---- Scene compositions -------------------------------------------------
const scenes = {
  'hero-convoy': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#071a30', mid: '#0c2745', horizon: '#123a63', bottom: C.navy, glow: C.gold, sunX: 72, sunY: 58, sunA: 0.6, seed: 4 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${shafts(w, h, w * 0.72, C.gold)}
    ${ridge(w, h, h * 0.62, 26, '#0a1f38', 0.9, 1)}
    ${ridge(w, h, h * 0.72, 20, '#081a30', 0.95)}
    ${ridge(w, h, h * 0.84, 12, '#050f1d', 1)}
    <g opacity="0.9"><path d="M${w * 0.1} ${h * 0.9} Q ${w * 0.5} ${h * 0.8} ${w * 0.95} ${h * 0.66}" stroke="#12294a" stroke-width="10" fill="none"/>
    <path d="M${w * 0.1} ${h * 0.9} Q ${w * 0.5} ${h * 0.8} ${w * 0.95} ${h * 0.66}" stroke="${C.cobalt2}" stroke-width="1" stroke-dasharray="3 9" fill="none" opacity="0.6"/></g>
    <g fill="#040d19">
      <path d="M${w * 0.3} ${h * 0.855} l30 -13 l8 13 z"/><rect x="${w * 0.3}" y="${h * 0.83}" width="30" height="26"/>
      <path d="M${w * 0.42} ${h * 0.83} l26 -11 l7 11 z"/><rect x="${w * 0.42}" y="${h * 0.808}" width="26" height="23"/>
      <path d="M${w * 0.53} ${h * 0.81} l22 -9 l6 9 z"/><rect x="${w * 0.53}" y="${h * 0.79}" width="22" height="20"/>
    </g>
    <ellipse cx="${w * 0.5}" cy="${h * 0.55}" rx="${w * 0.6}" ry="60" fill="${C.ice}" opacity="0.05" filter="url(#haze)"/>
    <rect width="${w}" height="${h}" fill="url(#cobaltShade)"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'hamburg-port': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0a1d33', mid: '#0d2842', horizon: '#16324f', bottom: '#05121f', glow: C.ice, sunX: 40, sunY: 42, sunA: 0.3, seed: 11 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${cranes(w, h * 0.66, C.cobalt2)}
    ${stacks(w, h * 0.8, C.cobalt)}
    <rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="#04101c"/>
    <rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="${C.cobalt2}" opacity="0.06"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'dubai-operations': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0c2038', mid: '#123153', horizon: '#c98a3a', bottom: '#06121f', glow: C.gold, sunX: 78, sunY: 66, sunA: 0.5, seed: 21 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    <g fill="#081b30" opacity="0.92">
      <rect x="${w * 0.6}" y="${h * 0.24}" width="16" height="${h * 0.56}"/>
      <polygon points="${w * 0.7},${h * 0.1} ${w * 0.712},${h * 0.8} ${w * 0.688},${h * 0.8}"/>
      <rect x="${w * 0.76}" y="${h * 0.34}" width="26" height="${h * 0.46}"/>
      <rect x="${w * 0.84}" y="${h * 0.44}" width="18" height="${h * 0.36}"/>
      <rect x="${w * 0.9}" y="${h * 0.5}" width="12" height="${h * 0.3}"/>
    </g>
    ${cranes(w * 0.6, h * 0.72, C.cobalt2)}
    ${stacks(w * 0.55, h * 0.82, C.cobalt)}
    <rect x="0" y="${h * 0.8}" width="${w}" height="${h * 0.2}" fill="#050f1c"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'central-asia-corridor': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0a1c31', mid: '#102a45', horizon: '#2a4a6e', bottom: '#050f1c', glow: C.ice, sunX: 30, sunY: 40, sunA: 0.28, seed: 33 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${ridge(w, h, h * 0.5, 34, '#0c2440', 0.85, 1)}
    ${ridge(w, h, h * 0.64, 26, '#0a1d34', 0.95)}
    ${ridge(w, h, h * 0.8, 14, '#06121f', 1)}
    <path d="M0 ${h * 0.92} C ${w * 0.35} ${h * 0.82} ${w * 0.6} ${h * 0.95} ${w} ${h * 0.82}" stroke="#132b4c" stroke-width="16" fill="none"/>
    <path d="M0 ${h * 0.92} C ${w * 0.35} ${h * 0.82} ${w * 0.6} ${h * 0.95} ${w} ${h * 0.82}" stroke="${C.gold}" stroke-width="1.2" stroke-dasharray="6 12" fill="none" opacity="0.55"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'kabul-corridor': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0a1a2f', mid: '#0f2742', horizon: '#3a5573', bottom: '#050e1b', glow: C.gold, sunX: 74, sunY: 30, sunA: 0.3, seed: 44 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${ridge(w, h, h * 0.42, 40, '#0b2038', 0.8, 1)}
    ${ridge(w, h, h * 0.58, 30, '#091a30', 0.92)}
    ${ridge(w, h, h * 0.78, 16, '#050f1c', 1)}
    <path d="M${w * 0.08} ${h * 0.9} Q ${w * 0.5} ${h * 0.72} ${w * 0.94} ${h * 0.52}" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="3 9" fill="none" opacity="0.6"/>
    <g fill="#040d18"><rect x="${w * 0.3}" y="${h * 0.84}" width="26" height="20"/><rect x="${w * 0.4}" y="${h * 0.8}" width="20" height="16"/></g>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'karachi-port': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0b1e34', mid: '#12314f', horizon: '#b5762f', bottom: '#05121f', glow: C.amber, sunX: 26, sunY: 52, sunA: 0.42, seed: 55 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${cranes(w, h * 0.68, C.cobalt2)}
    ${stacks(w, h * 0.82, C.cobalt)}
    <rect x="0" y="${h * 0.84}" width="${w}" height="${h * 0.16}" fill="#04101c"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'heavy-lift': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#091a30', mid: '#0e2743', horizon: '#1c3c60', bottom: '#050f1c', glow: C.cobalt2, sunX: 30, sunY: 40, sunA: 0.34, seed: 66 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${ridge(w, h, h * 0.56, 20, '#0a1f38', 0.85, 1)}
    <g>
      <rect x="${w * 0.16}" y="${h * 0.58}" width="${w * 0.46}" height="${h * 0.16}" fill="#0d2645" stroke="${C.cobalt2}" stroke-width="1.5"/>
      <rect x="${w * 0.2}" y="${h * 0.5}" width="${w * 0.3}" height="${h * 0.09}" fill="#10365f"/>
      <rect x="${w * 0.24}" y="${h * 0.54}" width="26" height="${h * 0.06}" fill="#0a2036"/>
      <rect x="${w * 0.16}" y="${h * 0.74}" width="${w * 0.48}" height="10" fill="#0a1c33"/>
      ${Array.from({ length: 11 }).map((_, i) => `<circle cx="${w * 0.2 + i * 34}" cy="${h * 0.79}" r="9" fill="#04101c" stroke="${C.cobalt2}" stroke-width="2"/>`).join('')}
      <circle cx="${w * 0.08}" cy="${h * 0.75}" r="4" fill="${C.amber}"/><circle cx="${w * 0.72}" cy="${h * 0.75}" r="4" fill="${C.orange}"/>
    </g>
    <rect width="${w}" height="${h}" fill="url(#cobaltShade)"/><rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),

  'humanitarian-case': (w, h) =>
    frame(w, h, `${defs(w, h, { top: '#0a1b30', mid: '#102842', horizon: '#3a5674', bottom: '#050e1b', glow: C.gold, sunX: 66, sunY: 34, sunA: 0.32, seed: 77 })}
    <rect width="${w}" height="${h}" fill="url(#sky)"/><rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${ridge(w, h, h * 0.46, 34, '#0b2038', 0.82, 1)}
    ${ridge(w, h, h * 0.64, 24, '#091a30', 0.93)}
    <path d="M${w * 0.06} ${h * 0.88} Q ${w * 0.5} ${h * 0.68} ${w * 0.94} ${h * 0.5}" stroke="${C.gold}" stroke-width="1.4" stroke-dasharray="3 9" fill="none" opacity="0.6"/>
    <g><rect x="${w * 0.34}" y="${h * 0.74}" width="60" height="26" fill="#0e3157"/><rect x="${w * 0.45}" y="${h * 0.72}" width="60" height="26" fill="#123a66"/></g>
    <rect width="${w}" height="${h}" fill="url(#vig)"/><rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>`),
};

const sizes = {
  'hero-convoy': [1600, 900],
  'hamburg-port': [1000, 667],
  'dubai-operations': [1000, 667],
  'central-asia-corridor': [1000, 667],
  'kabul-corridor': [1000, 667],
  'karachi-port': [1000, 667],
  'heavy-lift': [1600, 900],
  'humanitarian-case': [1600, 900],
};

let count = 0;
for (const [id, draw] of Object.entries(scenes)) {
  const [w, h] = sizes[id];
  writeFileSync(resolve(OUT, `${id}.svg`), draw(w, h));
  count += 1;
}
console.log(`Generated ${count} cinematic placeholder images in ${OUT}`);
