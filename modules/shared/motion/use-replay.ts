"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * Replays a motion visual that runs once: once it has run (`duration` ms, counted from when its panel is half on
 * screen) and held for `gap` ms, the returned `take` goes up, so a ScenePanel keyed on it mounts the scene afresh and
 * it plays from the start, and so on. The count pauses while the panel is off screen and picks up where it left off
 * on its return. With `gap` undefined nothing replays (`take` stays 0).
 */
export function useReplay(duration: number, gap: number | undefined): { ref: RefObject<HTMLDivElement | null>; take: number } {
  const ref = useRef<HTMLDivElement>(null);
  const [take, setTake] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (gap === undefined || !el) return;
    const cycle = duration + gap;
    let timer = 0;
    let startedAt: number | null = null;
    const schedule = (ms: number) => {
      timer = window.setTimeout(() => {
        startedAt = performance.now();
        setTake((t) => t + 1);
        schedule(cycle);
      }, ms);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (!entry.isIntersecting) return;
        if (startedAt === null) startedAt = performance.now();
        schedule(Math.max(0, startedAt + cycle - performance.now()));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [duration, gap]);

  return { ref, take };
}
