'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Returns a 0→1 progress value for the given element ref.
 * 0 = element is fully below viewport, 1 = element top has reached viewport top.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const updateProgress = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // 0 when element bottom enters viewport, 1 when element top leaves
    const raw = 1 - rect.top / windowHeight;
    setProgress(Math.max(0, Math.min(1, raw)));
    ticking.current = false;
  }, [ref]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', onScroll);
  }, [updateProgress]);

  return progress;
}

/**
 * Returns true once the element has entered the viewport (stays true after).
 */
export function useInViewOnce(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!ref.current || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, hasEntered]);

  return hasEntered;
}
