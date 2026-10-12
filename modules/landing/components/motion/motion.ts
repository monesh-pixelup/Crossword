"use client";

import { type RefObject, useEffect, useState, useSyncExternalStore } from "react";

/*
 * Timing helpers shared by every motion visual. Durations and easings are the
 * original build's, unchanged.
 */

/** The ease every enter/scroll uses: cubic-bezier(0.32, 0.72, 0, 1). */
const easeOutBloom = cubicBezier(0.32, 0.72, 0, 1);

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const ax = 3 * x1 - 3 * x2 + 1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= dx / slope;
    }
    return t;
  };
  return (x: number) => sampleY(solveT(x));
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when the viewer asks for reduced motion; visuals then show their final frame. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

/** Words in a message: drives the staggered reveal and its timing. */
export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

/** How long a staggered reply takes to land: 45ms a word, plus the last word's 220ms enter and a beat. */
export function replyDuration(...texts: string[]) {
  return texts.reduce((sum, text) => sum + wordCount(text), 0) * 45 + 220 + 150;
}

/**
 * Types `text` into the composer a character at a time, with ±30% jitter so it
 * reads as a person typing. Returns a cancel function.
 */
export function typeText(
  text: string,
  { msPerStep, onTick, onDone }: { msPerStep: number; onTick: (value: string) => void; onDone: () => void },
) {
  const jitter = msPerStep * 0.3;
  let cancelled = false;
  let typed = 0;
  let timer: number;
  const step = () => {
    if (cancelled) return;
    typed = Math.min(text.length, typed + 1);
    onTick(text.slice(0, typed));
    if (typed >= text.length) {
      onDone();
      return;
    }
    timer = window.setTimeout(step, Math.max(8, msPerStep + (Math.random() * 2 - 1) * jitter));
  };
  timer = window.setTimeout(step, msPerStep);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}

/** setTimeout bookkeeping for one script phase: schedule beats, then clear them all on cleanup. */
export function phaseTimers() {
  const timers: number[] = [];
  return {
    after(ms: number, fn: () => void) {
      timers.push(window.setTimeout(fn, ms));
    },
    clear() {
      timers.forEach(window.clearTimeout);
    },
  };
}

/**
 * The visuals are drawn at a fixed size and zoomed to fit their panel, so
 * on-screen distances are the drawn ones times the zoom. Scroll offsets are
 * in drawn pixels: divide by this.
 */
function drawnScale(el: HTMLElement) {
  const scale = el.getBoundingClientRect().height / el.offsetHeight;
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

/** Eases a scroll container to `top` over 320ms. */
function smoothScrollTo(el: HTMLElement, top: number, duration = 320) {
  const from = el.scrollTop;
  const delta = top - from;
  if (Math.abs(delta) < 1) return;
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.scrollTop = from + delta * easeOutBloom(t);
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/**
 * Scrolls `viewport` so `target` sits `margin` px above its bottom edge,
 * unless it's already in view with `slack` px to spare (defaults to `margin`).
 */
export function revealInViewport(
  viewport: HTMLElement,
  target: Element,
  { margin, slack = margin, instant }: { margin: number; slack?: number; instant: boolean },
) {
  const box = viewport.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const scale = drawnScale(viewport);
  if (rect.bottom <= box.bottom - slack * scale && rect.top >= box.top) return;
  const top = viewport.scrollTop + (rect.bottom - box.bottom) / scale + margin;
  if (instant) viewport.scrollTop = top;
  else smoothScrollTo(viewport, top);
}

/**
 * Keeps a chat's newest turn in view as the script advances: whenever `step`
 * changes, scrolls the thread so its last turn clears the composer by 40px.
 */
export function useFollowLatest(viewportRef: RefObject<HTMLDivElement | null>, step: string, instant: boolean) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const latest = viewport?.querySelector(".ill-thread")?.lastElementChild;
    if (!viewport || !latest) return;
    revealInViewport(viewport, latest, { margin: 40, instant });
  }, [viewportRef, step, instant]);
}

/**
 * Card skeletons: the overlay shows while `loading`, then stays mounted
 * (hidden) so it can blur away instead of vanishing. Cards that arrive
 * already loaded never get one.
 */
export function useSkeleton(loading: boolean) {
  const [hasLoaded, setHasLoaded] = useState(loading);
  if (loading && !hasLoaded) setHasLoaded(true);
  return { mounted: loading || hasLoaded, hidden: !loading };
}
