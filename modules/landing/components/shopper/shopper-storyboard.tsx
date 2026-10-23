"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { SearchWindow } from "./search-window";
import "./shopper-storyboard.css";
import { StorefrontMockup } from "./storefront-mockup";

/*
 * Figma storyboard 3096:27926, "Give them a reason to choose you": a shopper searches for Gillette, the top
 * result is Harry's sponsored comparison ad, they click it and land on Harry's product page, where Crossword's
 * widget makes the case row by row. One timeline owns every beat; the scenes only read `scene`, `query`,
 * `pressed` and `revealed`.
 */

const QUERY = "Gillette";

type Scene = "search" | "store";
type Beat = { at: number; scene?: Scene; typed?: number; results?: boolean; pressed?: boolean; revealed?: boolean; cta?: boolean };

/** When each beat lands, in ms from the start of a loop. */
const TYPE_START = 350;
const TYPE_STEP = 90;
const timeline: Beat[] = [
  { at: 0, scene: "search", typed: 0, results: false, pressed: false, revealed: false, cta: false },
  ...Array.from({ length: QUERY.length }, (_, i) => ({ at: TYPE_START + i * TYPE_STEP, typed: i + 1 })),
  { at: 1350, results: true },
  { at: 2600, pressed: true },
  { at: 3100, scene: "store" },
  { at: 3650, revealed: true },
  { at: 5600, cta: true },
];
const LOOP_MS = 10500;

/** True while the panel is at least 30% on screen, the tab is visible and the window has focus. */
function useOnScreen(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const sync = () => setActive(document.visibilityState === "visible" && document.hasFocus());
    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", sync);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", sync);
      observer.disconnect();
    };
  }, [ref]);
  return inView && active;
}

type State = Required<Omit<Beat, "at">>;
const initial: State = { scene: "search", typed: 0, results: false, pressed: false, revealed: false, cta: false };

/**
 * Plays the storyboard on a loop while it is on screen, from the first beat each time it comes back into view (so
 * nobody lands mid-sequence). Before it is first seen, and for reduced motion, it rests on the finished product page.
 */
export function ShopperStoryboard({ children }: { children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const playing = useOnScreen(root);
  const [state, setState] = useState<State>({ ...initial, scene: "store", revealed: true });
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    // Reduced motion never starts the loop, so the panel stays on its finished state.
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = timeline.map((beat) =>
      window.setTimeout(() => {
        const { at: _at, ...change } = beat;
        void _at;
        setState((s) => ({ ...s, ...change }));
      }, beat.at),
    );
    timers.push(window.setTimeout(() => setLoop((n) => n + 1), LOOP_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [playing, loop]);

  return (
    <div ref={root} className="sb-stage absolute inset-0" data-scene={state.scene} data-results={state.results}>
      {children}
      <SearchWindow query={QUERY.slice(0, state.typed)} pressed={state.pressed} />
      <div className="sb-store absolute inset-0" data-revealed={state.revealed} data-cta={state.cta}>
        <StorefrontMockup />
      </div>
    </div>
  );
}
