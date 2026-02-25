"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  enabled?: boolean;
}

/**
 * Animates a number from `start` to `end` over `duration` milliseconds.
 * Uses easeOutExpo for a fast-start, slow-finish feel that matches
 * the "Wall Street ticker" aesthetic on the landing page.
 */
export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setValue(start);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      const run = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = start + (end - start) * eased;

        const factor = Math.pow(10, decimals);
        setValue(Math.round(current * factor) / factor);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(run);
        }
      };

      startTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(run);
    };

    if (delay > 0) {
      timeout = setTimeout(animate, delay);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
    };
  }, [end, start, duration, delay, decimals, enabled]);

  return value;
}
