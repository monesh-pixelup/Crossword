"use client";

import { useEffect, useRef } from "react";

/**
 * A paragraph whose words light up from 30% to full ink, one after another, as it scrolls through
 * the viewport: the fill starts when its top reaches 85% of the viewport and finishes when its
 * bottom reaches 45%. Opacities are written straight to the spans, so scrolling never re-renders.
 * With reduced motion the whole paragraph is simply full ink.
 */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const span of spans) span.style.opacity = "1";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, bottom } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.45;
      // 0 while the top is below `start`, 1 once the bottom has passed `end`.
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end + (bottom - top))));
      const lit = progress * spans.length;
      spans.forEach((span, i) => {
        span.style.opacity = String(0.3 + 0.7 * Math.min(1, Math.max(0, lit - i)));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word className="opacity-30 transition-opacity duration-150 ease-out motion-reduce:opacity-100">
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}
