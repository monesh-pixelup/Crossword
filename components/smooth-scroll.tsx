"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Smooth scrolling on every page (Lenis): mouse-wheel and trackpad scrolling eases to a stop instead of stepping, and
 * in-page links (`#…`) glide to their target. It drives the page's own scroll position, so sticky sections, the hero
 * curtain, scroll listeners and IntersectionObservers all work as before.
 *
 * - Touch scrolling is left native (phones already scroll with momentum).
 * - A panel that scrolls on its own (a chat window, a list) still scrolls under the wheel (`allowNestedScroll`); mark
 *   any element that should never be smoothed with `data-lenis-prevent`.
 * - It stops while the page's overflow is hidden (`autoToggle`), e.g. while a dialog locks the page.
 * - Off for anyone who asks for reduced motion.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      lenis.current?.destroy();
      lenis.current = reduce.matches
        ? null
        : new Lenis({
            autoRaf: true,
            lerp: 0.1,
            wheelMultiplier: 1,
            anchors: { offset: -72.5 },
            allowNestedScroll: true,
            autoToggle: true,
          });
    };
    start();
    reduce.addEventListener("change", start);
    return () => {
      reduce.removeEventListener("change", start);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  // On a route change, drop any glide still running from the last page so it doesn't carry over and fight the new
  // page's scroll position (Next sets it: the top, or where the page was on back and forward).
  useEffect(() => {
    const l = lenis.current;
    if (!l) return;
    const frame = requestAnimationFrame(() => {
      l.resize();
      l.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
