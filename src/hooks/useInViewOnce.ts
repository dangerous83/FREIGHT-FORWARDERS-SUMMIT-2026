import { useEffect, useRef, useState } from 'react';

/** Fires once when the element first enters the viewport. */
export function useInViewOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.35 },
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return [ref, inView];
}
