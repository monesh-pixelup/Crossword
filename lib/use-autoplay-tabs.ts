import { useEffect, useRef, useState } from "react";

/** How long each tab holds once its scene has settled, before moving on to the next. */
const HOLD = 1500;

/** A scene's run when the tab has none to time (a still panel, or a scene without a duration). */
const RUN = 4500;

/** A tab's turn, in ms: its scene's run (`duration`, when it has one) plus the hold. */
export function tabTurn(duration?: number) {
  return (duration ?? RUN) + HOLD;
}

type Options = {
  /** Called as tab `i` becomes the active one. */
  onActivate?: (i: number) => void;
  /** The way the fill grows: across (a rule under the label, the default) or down (a bar beside it). */
  axis?: "x" | "y";
};

/**
 * Vertical tabs that play on their own: the list of tabs sits on the left from 992px (above the panel
 * below that) and only the active tab's panel shows. The fill on the active tab grows over its turn
 * (`turns[i]`, from `tabTurn`), then the next tab takes over, round to the first after the last.
 * The turn only runs while the tabs (`root`, set on their wrapper) are on screen and the page is
 * showing. When the next tab takes over, the old fill eases away (its transition is the caller's).
 * `open(i)` shows tab `i`, starting its turn afresh. With reduced motion nothing plays on its own: the
 * active tab's fill stays full.
 *
 * The panels crossfade (`.tab-panel`): `previous` is the tab fading out, so its scene can stay drawn
 * until it has gone, and `plays[i]` counts tab `i`'s turns, to key its scene so it plays from the
 * start each time it takes over.
 *
 * `turns` takes one entry per tab.
 */
export function useAutoplayTabs(turns: number[], { onActivate, axis = "x" }: Options = {}) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [plays, setPlays] = useState(() => turns.map(() => 0));
  const root = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  /** Time spent in the active tab's turn, in ms. */
  const elapsed = useRef(0);
  const activate = useRef(onActivate);
  const turnsRef = useRef(turns);
  useEffect(() => {
    activate.current = onActivate;
    turnsRef.current = turns;
  });

  /** Makes tab `i` the active one, starting its turn afresh. */
  const select = (i: number) => {
    elapsed.current = 0;
    if (i === activeRef.current) return;
    setPrevious(activeRef.current);
    activeRef.current = i;
    setActive(i);
    setPlays((p) => p.map((n, j) => (j === i ? n + 1 : n)));
    activate.current?.(i);
  };
  const selectRef = useRef(select);
  useEffect(() => {
    selectRef.current = select;
  });

  useEffect(() => {
    const scale = (progress: number) => (axis === "x" ? `${progress} 1` : `1 ${progress}`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let loop = 0;
    let last = 0;

    /** Runs the active tab's turn, growing its fill, and moves on to the next once it is up. */
    const tick = (time: number) => {
      loop = requestAnimationFrame(tick);
      // Capped, so a frame after the page was hidden (or the main thread stalled) doesn't skip the turn.
      const delta = last ? Math.min(time - last, 100) : 0;
      last = time;

      const current = activeRef.current;
      const fill = fills.current[current];
      if (reduce.matches) {
        if (fill) fill.style.scale = scale(1);
        return;
      }

      const turn = turnsRef.current[current];
      if (inView && !document.hidden) {
        elapsed.current = Math.min(turn, elapsed.current + delta);
      }
      if (fill) fill.style.scale = scale(elapsed.current / turn);

      if (elapsed.current >= turn) {
        selectRef.current((current + 1) % turnsRef.current.length);
      }
    };

    const view = new IntersectionObserver(
      ([entry]) => {
        // Coming back to the tabs starts the turn afresh.
        if (entry.isIntersecting && !inView) elapsed.current = 0;
        inView = entry.isIntersecting;
      },
      // Any part of the tabs within the middle 60% of the viewport, so it holds however tall they are.
      { rootMargin: "-20% 0px" },
    );
    if (root.current) view.observe(root.current);
    loop = requestAnimationFrame(tick);
    return () => {
      view.disconnect();
      cancelAnimationFrame(loop);
    };
  }, [axis]);

  // Once the outgoing fill has its eased transition (after this render), let it shrink away.
  const outgoing = useRef(0);
  useEffect(() => {
    const out = outgoing.current;
    outgoing.current = active;
    if (out === active) return;
    const frame = requestAnimationFrame(() => {
      const fill = fills.current[out];
      if (fill) fill.style.scale = axis === "x" ? "0 1" : "1 0";
    });
    return () => cancelAnimationFrame(frame);
  }, [active, axis]);

  return { active, previous, plays, root, fills, open: select };
}
