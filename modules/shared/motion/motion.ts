"use client";

import { type RefObject, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/*
 * Timing for the Sell motion visuals: the beat runner every scene is scripted
 * with, the in-view/focus gate, typing and scroll easing. Durations and
 * easings are the source build's, unchanged.
 */

/** Typing: ms per character (±30% jitter). */
const typeMsPerStep = 26;
/** Composer lead-in before the first message is typed, and before later ones. */
const firstComposeLeadMs = 350;
const composeLeadMs = 900;
/** Pause after the last character before the message sends. */
const composeSendMs = 220;
/** `compose` beat with no text (e.g. an upload): how long it holds. */
const composeHoldMs = 700;
/** Think beats: one label shows 600ms; two labels swap after 300ms and hold 500ms more. */
const thinkMs = 600;
const thinkSwapMs = 300;
const thinkSecondLabelMs = 500;
/** The status line's exit before the next beat starts. */
const thinkExitMs = 150;
/** Staggered reply: 45ms a word, the last word's 220ms enter, plus a beat. */
const wordStaggerMs = 45;
const wordEnterMs = 220;
const replySettleMs = 150;
/** Default durations of `appear` and `load` beats. */
const appearMs = 450;
const loadMs = 650;

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

/** Eases a scroll container to `top` over `duration` ms. Returns a cancel function. */
export function smoothScrollTo(el: HTMLElement, top: number, duration = 320) {
  const from = el.scrollTop;
  const delta = top - from;
  if (Math.abs(delta) < 1) return () => {};
  let cancelled = false;
  const start = performance.now();
  const frame = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / duration);
    el.scrollTop = from + delta * easeOutBloom(t);
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return () => {
    cancelled = true;
  };
}

/**
 * Types `text` `chunk` characters at a time, with ±`jitterMs` (default 30%)
 * so it reads as a person typing. Returns a cancel function.
 */
export function typeText(
  text: string,
  {
    msPerStep,
    jitterMs = msPerStep * 0.3,
    chunk = 1,
    onTick,
    onDone,
  }: { msPerStep: number; jitterMs?: number; chunk?: number; onTick: (value: string) => void; onDone: () => void },
) {
  let cancelled = false;
  let typed = 0;
  let timer: number;
  const step = () => {
    if (cancelled) return;
    typed = Math.min(text.length, typed + chunk);
    onTick(text.slice(0, typed));
    if (typed >= text.length) {
      onDone();
      return;
    }
    const jitter = (Math.random() * 2 - 1) * jitterMs;
    timer = window.setTimeout(step, Math.max(8, msPerStep + jitter));
  };
  timer = window.setTimeout(step, msPerStep);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when the viewer asks for reduced motion (false while server rendering). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

/** Words in a reply, ignoring `**` bold markers. */
export function wordCount(text: string) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}

/** How long a staggered reply takes to land: 45ms a word, the last word's 220ms enter, and a beat. */
export function replyDuration(text: string) {
  return wordCount(text) * wordStaggerMs + wordEnterMs + replySettleMs;
}

function isPageActive() {
  return typeof document !== "undefined" && document.visibilityState === "visible" && document.hasFocus();
}

/**
 * The source build's play gate: true while `ref` is at least 30% in view and
 * the tab is visible and focused. Scenes here take a `play` prop instead; a
 * host can feed it from this hook.
 */
export function useInViewAndFocused(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  // Read on mount, not during render, so server and client markup agree.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const update = () => setActive(isPageActive());
    update();
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
    };
  }, []);

  return inView && active;
}

/**
 * One step of a scene's script. Each beat holds for its duration, then the
 * next starts:
 * - `compose`: types `text` into the composer (after `leadMs`, default 350ms
 *   for the first beat, 900ms otherwise), then sends 220ms after the last
 *   character. With no `text` it just holds `holdMs` (default 700ms).
 * - `think`: the "thinking" status line. One label: 600ms. Two labels: the
 *   second swaps in at 300ms, then 500ms more. Then 150ms for it to exit.
 * - `text`: a staggered reply landing (see replyDuration).
 * - `appear`: `ms` (default 450ms). `load`: `ms` (default 650ms), for skeletons.
 * - `pause`: `ms`.
 */
export type Beat =
  | { id: string; type: "compose"; text?: string; leadMs?: number; holdMs?: number }
  | { id: string; type: "think"; labels: string[] }
  | { id: string; type: "text"; text: string }
  | { id: string; type: "appear"; ms?: number }
  | { id: string; type: "load"; ms?: number }
  | { id: string; type: "pause"; ms: number };

/** What a scene renders from: where the script is, by beat id. */
export type BeatState = {
  /** The beat has started (or finished). */
  reached: (id: string) => boolean;
  /** The beat has finished. */
  passed: (id: string) => boolean;
  /** The beat is the one playing now. */
  loading: (id: string) => boolean;
  /** While think beat `id` plays: its current label, and whether it's still showing (false once exiting). */
  status: (id: string) => { label: string; visible: boolean } | null;
  /** While a `compose` beat with text plays: what's typed so far. */
  composer: { value: string; typing: true } | null;
  /** Index of the playing beat; `beats.length` once done. */
  index: number;
  done: boolean;
  reducedMotion: boolean;
  /** Bumps each time the script restarts. */
  runKey: number;
};

/**
 * Plays `beats` while `play` is true. Pausing (play → false) stops the clock;
 * playing again restarts the script from the top. It does not loop on its
 * own. With reduced motion the script starts at its end.
 */
export function useBeats(beats: Beat[], play: boolean): BeatState {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState({ index: -1, value: "" });
  const [stage, setStage] = useState({ index: -1, stage: 0 });
  const [exiting, setExiting] = useState(-1);
  const [runKey, setRunKey] = useState(0);
  const wasPlaying = useRef(play);
  const index = reducedMotion ? beats.length : step;

  // Restart from the top each time play turns back on.
  useEffect(() => {
    if (play && !wasPlaying.current && !reducedMotion) {
      setStep(0);
      setTyped({ index: -1, value: "" });
      setStage({ index: -1, stage: 0 });
      setExiting(-1);
      setRunKey((key) => key + 1);
    }
    wasPlaying.current = play;
  }, [play, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !play || index >= beats.length) return;
    const beat = beats[index];
    const timers: number[] = [];
    let cancelTyping: (() => void) | undefined;
    const after = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const next = () => setStep((i) => i + 1);

    switch (beat.type) {
      case "compose": {
        if (!beat.text) {
          after(beat.holdMs ?? composeHoldMs, next);
          break;
        }
        const text = beat.text;
        after(beat.leadMs ?? (index === 0 ? firstComposeLeadMs : composeLeadMs), () => {
          cancelTyping = typeText(text, {
            msPerStep: typeMsPerStep,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(composeSendMs, next),
          });
        });
        break;
      }
      case "think": {
        let hold = thinkMs;
        if (beat.labels.length === 2) {
          after(thinkSwapMs, () => setStage({ index, stage: 1 }));
          hold = thinkSwapMs + thinkSecondLabelMs;
        }
        after(hold, () => setExiting(index));
        after(hold + thinkExitMs, next);
        break;
      }
      case "text":
        after(replyDuration(beat.text), next);
        break;
      case "appear":
        after(beat.ms ?? appearMs, next);
        break;
      case "load":
        after(beat.ms ?? loadMs, next);
        break;
      case "pause":
        after(beat.ms, next);
        break;
    }

    return () => {
      cancelTyping?.();
      timers.forEach(window.clearTimeout);
    };
  }, [index, play, reducedMotion, beats]);

  return useMemo(() => {
    const indexOf = (id: string) => {
      const i = beats.findIndex((beat) => beat.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current = beats[index];
    const value = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= indexOf(id),
      passed: (id) => index > indexOf(id),
      loading: (id) => index === indexOf(id),
      status: (id) => {
        const beat = beats[index];
        if (index !== indexOf(id) || beat.type !== "think") return null;
        const labelIndex = stage.index === index ? stage.stage : 0;
        return { label: beat.labels[labelIndex] ?? beat.labels[0], visible: exiting !== index };
      },
      composer: current?.type === "compose" && current.text ? { value, typing: true } : null,
      index,
      done: index >= beats.length,
      reducedMotion,
      runKey,
    };
  }, [beats, index, typed, stage, exiting, reducedMotion, runKey]);
}
