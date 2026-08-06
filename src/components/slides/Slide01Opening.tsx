import { motion } from 'framer-motion';
import { ArrowRight, Ship, Plane, Truck, Container, Anchor, Globe2 } from 'lucide-react';
import { openingContent } from '@/data/slides';
import { usePresentation } from '@/context/PresentationContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline';
import { asset } from '@/utils/asset';

const HERO_IMAGE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_34SGn9O1DyKx5raXvDSnlxgbueE/hf_20260806_044338_bef97e44-7666-4e76-86f6-c00000b4c31c.png';
const HERO_FALLBACK = asset('/assets/images/hero-convoy.svg');

// Floating logistics icons drifting across the cover — subtle motion.
const FLOATERS = [
  { Icon: Ship, x: '8%', y: '18%', size: 20, delay: 0, drift: 22 },
  { Icon: Plane, x: '78%', y: '14%', size: 22, delay: 0.9, drift: -30 },
  { Icon: Truck, x: '14%', y: '76%', size: 22, delay: 0.4, drift: 28 },
  { Icon: Container, x: '86%', y: '72%', size: 20, delay: 1.3, drift: -24 },
  { Icon: Anchor, x: '46%', y: '10%', size: 18, delay: 1.8, drift: 18 },
  { Icon: Globe2, x: '52%', y: '86%', size: 22, delay: 0.6, drift: -20 },
];

export function Slide01Opening() {
  const { next } = usePresentation();
  const reduced = useReducedMotion();

  return (
    <section className="slide slide--opening" aria-label="Opening: We don't do easy">
      <div className="slide-bg" aria-hidden="true">
        <motion.img
          className="slide-bg__img opening-hero"
          src={HERO_IMAGE}
          alt=""
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== HERO_FALLBACK) img.src = HERO_FALLBACK;
          }}
          initial={reduced ? undefined : { scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 14, ease: 'easeOut' }}
        />
        <div className="slide-bg__scrim slide-bg__scrim--opening" />

        {/* Animated global route lines + moving cargo pulses */}
        <svg
          className="slide-bg__routes opening-routes"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="routeGrad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3a7bd5" stopOpacity="0" />
              <stop offset="50%" stopColor="#e96332" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e8b72e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="routeGrad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#255aad" stopOpacity="0" />
              <stop offset="50%" stopColor="#3a7bd5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3a7bd5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base subtle route arcs */}
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.28">
            <path id="opening-arc-1" d="M-40,620 C 400,470 900,520 1300,360 S 1620,300 1680,240" />
            <path id="opening-arc-2" d="M-40,760 C 500,700 950,660 1660,470" />
            <path id="opening-arc-3" d="M-60,340 C 380,300 780,220 1240,200 S 1600,180 1680,150" />
          </g>

          {/* Illuminated stroke drawing along each arc */}
          {!reduced && (
            <>
              <path
                d="M-40,620 C 400,470 900,520 1300,360 S 1620,300 1680,240"
                fill="none"
                stroke="url(#routeGrad-1)"
                strokeWidth="2.4"
                strokeDasharray="10 260"
                className="opening-route-stream"
                style={{ animationDelay: '0s' }}
              />
              <path
                d="M-40,760 C 500,700 950,660 1660,470"
                fill="none"
                stroke="url(#routeGrad-2)"
                strokeWidth="2"
                strokeDasharray="8 320"
                className="opening-route-stream"
                style={{ animationDelay: '1.6s' }}
              />
              <path
                d="M-60,340 C 380,300 780,220 1240,200 S 1600,180 1680,150"
                fill="none"
                stroke="url(#routeGrad-1)"
                strokeWidth="1.6"
                strokeDasharray="6 220"
                className="opening-route-stream"
                style={{ animationDelay: '3s' }}
              />

              {/* Cargo pulses travelling the corridors */}
              {['opening-arc-1', 'opening-arc-2', 'opening-arc-3'].map((id, i) => (
                <circle key={id} r={i === 0 ? 4 : 3} fill="#ffdc7a" opacity="0.95">
                  <animateMotion dur={`${8 + i * 2}s`} begin={`${i * 1.4}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${8 + i * 2}s`}
                    begin={`${i * 1.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </>
          )}
        </svg>

        {/* Floating logistics glyphs */}
        {!reduced && (
          <div className="opening-floaters" aria-hidden="true">
            {FLOATERS.map(({ Icon, x, y, size, delay, drift }, i) => (
              <motion.span
                key={i}
                className="opening-floater"
                style={{ left: x, top: y }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.55, 0.55, 0], y: [0, drift, drift * 1.4, drift * 1.6] }}
                transition={{ duration: 9, delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon size={size} />
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <div className="slide__inner slide--opening__inner">
        <motion.p
          className="kicker opening-kicker"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="opening-kicker__dot" aria-hidden="true" />
          {openingContent.kicker}
        </motion.p>

        <AnimatedHeadline as="h1" className="opening-headline" text={openingContent.headline} delay={0.35} />

        <motion.div
          className="opening-support"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {openingContent.supportingLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.div>

        <motion.div
          className="opening-meta"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          aria-hidden="true"
        >
          <span className="opening-meta__chip">
            <span className="opening-meta__pulse" /> Live corridor · Hamburg → Karachi
          </span>
          <span className="opening-meta__chip opening-meta__chip--muted">Global · Sea · Air · Land</span>
        </motion.div>

        <motion.button
          className="btn-primary opening-cta"
          onClick={next}
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
        >
          {openingContent.cta}
          <ArrowRight size={18} />
        </motion.button>
      </div>

      <div className="opening-logo-mark" aria-hidden="true">
        <img src={asset('/logo/ils-logo-white.png')} alt="" className="opening-logo-mark__dark" />
        <img src={asset('/logo/ils-logo-color.png')} alt="" className="opening-logo-mark__light" />
      </div>
    </section>
  );
}
