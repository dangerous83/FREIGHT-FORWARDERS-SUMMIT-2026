import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { asset } from '@/utils/asset';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Cinematic slow scale-in on the image within a masked frame. */
  delay?: number;
  eager?: boolean;
  rounded?: boolean;
}

/** Masked image reveal: a wipe uncovers a slowly scaling image. */
export function ImageReveal({ src, alt, className, delay = 0, eager = false, rounded = true }: Props) {
  const reduced = useReducedMotion();
  return (
    <div
      className={`image-reveal ${rounded ? 'image-reveal--rounded' : ''} ${className ?? ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <motion.img
        src={asset(src)}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        initial={reduced ? { opacity: 0 } : { scale: 1.14, opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: reduced ? 0.3 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {!reduced && (
        <motion.div
          className="image-reveal__mask"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
