import { useState, useEffect, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Typewriter effect that cycles through phrases.
 * Returns the currently visible text and whether the cursor should blink.
 *
 * When reduced motion is enabled, returns the first phrase as static text.
 */
export default function useTypewriter(phrases, {
  typeSpeed = 60,
  deleteSpeed = 35,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
} = {}) {
  const reducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [isCursorBlinking, setIsCursorBlinking] = useState(true);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex.current] || '';

      if (isDeleting.current) {
        // Deleting
        setIsCursorBlinking(false);
        charIndex.current = Math.max(0, charIndex.current - 1);
        setDisplayText(currentPhrase.substring(0, charIndex.current));

        if (charIndex.current === 0) {
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timeoutRef.current = setTimeout(tick, pauseAfterDelete);
        } else {
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        }
      } else {
        // Typing
        setIsCursorBlinking(false);
        charIndex.current = Math.min(currentPhrase.length, charIndex.current + 1);
        setDisplayText(currentPhrase.substring(0, charIndex.current));

        if (charIndex.current === currentPhrase.length) {
          setIsCursorBlinking(true);
          isDeleting.current = true;
          timeoutRef.current = setTimeout(tick, pauseAfterType);
        } else {
          timeoutRef.current = setTimeout(tick, typeSpeed);
        }
      }
    };

    // Start after initial delay
    timeoutRef.current = setTimeout(tick, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reducedMotion, phrases, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  if (reducedMotion) {
    return {
      text: phrases[0] || '',
      isCursorBlinking: false,
      isReducedMotion: true,
    };
  }

  return {
    text: displayText,
    isCursorBlinking,
    isReducedMotion: false,
  };
}
