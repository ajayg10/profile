import { useState, useEffect, useCallback, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Tracks mouse position normalized to -1…1 range (center = 0,0).
 * Returns { x: 0, y: 0 } on touch devices or when reduced motion is enabled.
 * Throttled to requestAnimationFrame for GPU-friendly updates.
 */
export default function useMousePosition() {
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const latestRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    latestRef.current = { x, y };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setPosition(latestRef.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    // Skip on touch devices or when reduced motion is preferred
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || isTouchDevice) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, handleMouseMove]);

  return position;
}
