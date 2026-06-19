import { useState, useEffect } from 'react';

/**
 * Returns true if the user has prefers-reduced-motion enabled.
 * Listens for changes in real time.
 */
export default function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}
