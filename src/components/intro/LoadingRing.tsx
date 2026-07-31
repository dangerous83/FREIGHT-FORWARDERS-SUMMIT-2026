import { motion } from 'framer-motion';

/**
 * Subtle loading hint shown around the activation control while essential
 * assets warm up. Deliberately does NOT display a fake percentage — it is an
 * indeterminate cobalt arc that resolves the moment assets are ready.
 */
export function LoadingRing({ reduced }: { reduced: boolean }) {
  return (
    <div className="loading-ring" aria-hidden="true">
      <svg viewBox="0 0 60 60" width="60" height="60" fill="none" style={{ display: 'block' }}>
        <circle cx="30" cy="30" r="26" stroke="rgba(120,170,230,0.18)" strokeWidth="2" />
        <motion.circle
          cx="30"
          cy="30"
          r="26"
          stroke="#5c9bf0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="40 200"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '30px 30px' }}
        />
      </svg>
    </div>
  );
}
