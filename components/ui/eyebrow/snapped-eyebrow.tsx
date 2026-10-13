"use client";

import { type ComponentProps, useLayoutEffect, useRef } from "react";
import { Eyebrow } from "./eyebrow";

/**
 * The Eyebrow, nudged onto whole device pixels. Its frame and corner curls are 0.5px strokes, so
 * when the label lands part-way through a pixel (its position comes from the fractional heights
 * of everything above it) they smear across two rows at 1x and the curls look broken. This
 * measures where the label sits and shifts it by the leftover fraction (under a pixel, so the
 * layout doesn't visibly move), re-measuring whenever the page's layout changes.
 */
export function SnappedEyebrow(props: ComponentProps<typeof Eyebrow>) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const snap = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const dpr = window.devicePixelRatio || 1;
        el.style.translate = "";
        const box = el.getBoundingClientRect();
        // Page coordinates, so the result doesn't depend on how far the page is scrolled.
        const x = (box.left + window.scrollX) * dpr;
        const y = (box.top + window.scrollY) * dpr;
        el.style.translate = `${(Math.round(x) - x) / dpr}px ${(Math.round(y) - y) / dpr}px`;
      });
    };

    snap();
    const observer = new ResizeObserver(snap);
    observer.observe(document.body);
    window.addEventListener("resize", snap);
    document.fonts?.ready.then(snap);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", snap);
    };
  }, []);

  return (
    <div ref={ref} className="inline-flex">
      <Eyebrow {...props} />
    </div>
  );
}
