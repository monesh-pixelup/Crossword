"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

/** How long the notes sit in their first layout, once in view, before they scatter. */
const HOLD_MS = 350;

/**
 * The journey notes' strip, scattering once it's in view: it starts as the notes' first layout and, when about a
 * third of it is on screen (and a beat later), sets `data-scattered` so each note eases out to its scattered place
 * (see JourneyNote's `scatter`). It happens once; with reduced motion the notes move without easing.
 */
export function ScatterStrip({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scattered, setScattered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || scattered) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setScattered(true), HOLD_MS);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [scattered]);

  return (
    <div ref={ref} role="list" aria-label="Journeys" data-scattered={scattered || undefined} className={className} style={style}>
      {children}
    </div>
  );
}
