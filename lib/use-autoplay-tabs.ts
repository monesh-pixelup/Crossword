import { useEffect, useRef, useState } from "react";

/** The fixed site header's height plus the 48px the list sits below it while pinned. */
const PIN_TOP = 72.5 + 48;

/** How long each tab holds once its scene has settled, before moving on to the next. */
const HOLD = 1500;

/** A scene's run when the tab has none to time (a still panel, or a scene without a duration). */
const RUN = 4500;

/** Keys that scroll the page, which count as the reader scrolling by hand (like a wheel or a swipe). */
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

/** How long after the reader last scrolled by hand before a finished turn may scroll the page on. */
const SETTLE = 600;

/** How long after a wheel, swipe or key a scroll still counts as the reader's own (momentum included). */
const MANUAL = 300;

/** A tab's turn, in ms: its scene's run (`duration`, when it has one) plus the hold. */
export function tabTurn(duration?: number) {
  return (duration ?? RUN) + HOLD;
}

/** Scrolls `el` up to just below the header, level with the pinned list. */
function scrollToStep(el: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: window.scrollY + el.getBoundingClientRect().top - PIN_TOP,
    behavior: reduce ? "auto" : "smooth",
  });
}

type Options = {
  /** Called as tab `i` becomes the active one. */
  onActivate?: (i: number) => void;
  /** The way the fill grows: across (a rule under the label, the default) or down (a bar beside it). */
  axis?: "x" | "y";
};

/**
 * Vertical tabs made scroll-driven, as on Support's "Customer support, handled by Crossword": every
 * tab's block stacks in the right column while the list of tabs stays pinned on the left from 992px.
 * The tab whose block has crossed the middle of the viewport is the active one.
 *
 * They also play on their own: while the list is pinned, the fill on the active tab grows over its
 * turn (`turns[i]`, from `tabTurn`), then the page scrolls on to the next tab, stopping after the
 * last. Scrolling by hand moves the fill along with it too (forward, or back when scrolling up) as
 * the turn keeps filling, but the page only scrolls on once the reader has stopped; hovering the list
 * (`pause`, spread on it) pauses the turn. When the next tab takes over, the old fill eases away
 * (its transition is the caller's). `open(i)` scrolls to tab `i`, starting its turn afresh. With
 * reduced motion, or below 992px (where the list is hidden), nothing plays on its own and the fill
 * grows as the tab's block scrolls through instead.
 *
 * `turns` takes one entry per tab.
 */
export function useAutoplayTabs(turns: number[], { onActivate, axis = "x" }: Options = {}) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);
  const fills = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  /** Time spent in the active tab's turn, in ms. */
  const elapsed = useRef(0);
  /** Whether the pointer is over the list (the turn pauses). */
  const hovering = useRef(false);
  const activate = useRef(onActivate);
  const turnsRef = useRef(turns);
  useEffect(() => {
    activate.current = onActivate;
    turnsRef.current = turns;
  });

  useEffect(() => {
    const scale = (progress: number) => (axis === "x" ? `${progress} 1` : `1 ${progress}`);
    const wide = window.matchMedia("(min-width: 62rem)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let autoplay = wide.matches && !reduce.matches;
    // The section is engaged while the middle of the viewport is within the tabs' blocks (the list pinned).
    let engaged = false;
    // Set once a turn has run out and the page is scrolling on, until the next tab takes over.
    let advancing = false;
    let frame = 0;
    let loop = 0;
    let last = 0;
    // When the reader last scrolled by hand.
    let input = 0;
    // The active tab and how far its block had scrolled through at the last read.
    let seen = { current: 0, progress: 0 };

    const read = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      const tops = steps.current.map((el) => el?.getBoundingClientRect().top ?? 0);
      // The last tab whose block's top has crossed the middle of the viewport (the first until one has).
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });

      const el = steps.current[current];
      const end = steps.current[tops.length - 1]?.getBoundingClientRect().bottom ?? 0;
      const now = tops[0] <= line && end >= line;
      // Coming back into the section starts the turn afresh.
      if (now && !engaged) elapsed.current = 0;
      engaged = now;

      // Progress through the active tab's block: from its top crossing the line to the next one's.
      const span = current < tops.length - 1 ? tops[current + 1] - tops[current] : (el?.offsetHeight ?? 1);
      const progress = Math.min(1, Math.max(0, (line - tops[current]) / span));
      if (!autoplay) {
        const fill = fills.current[current];
        if (fill) fill.style.scale = scale(progress);
      } else if (current === seen.current && performance.now() - input < MANUAL) {
        // The reader's own scrolling within the block carries its turn along by as much (not a
        // scroll on to a tab, which starts its turn afresh).
        const turn = turnsRef.current[current];
        elapsed.current = Math.min(turn, Math.max(0, elapsed.current + (progress - seen.progress) * turn));
      }
      seen = { current, progress };

      if (current !== activeRef.current) {
        activeRef.current = current;
        elapsed.current = 0;
        advancing = false;
        setActive(current);
        activate.current?.(current);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    /** Runs the active tab's turn, growing its fill, and moves on to the next once it is up. */
    const tick = (time: number) => {
      loop = requestAnimationFrame(tick);
      // Capped, so a frame after the tab was hidden (or the main thread stalled) doesn't skip the turn.
      const delta = last ? Math.min(time - last, 100) : 0;
      last = time;
      if (!autoplay) return;

      const current = activeRef.current;
      const turn = turnsRef.current[current];
      if (engaged && !hovering.current && !advancing) {
        elapsed.current = Math.min(turn, elapsed.current + delta);
      }
      const fill = fills.current[current];
      if (fill) fill.style.scale = scale(elapsed.current / turn);

      const settled = time - input > SETTLE;
      if (elapsed.current >= turn && !advancing && settled && engaged && current < steps.current.length - 1) {
        const next = steps.current[current + 1];
        if (next) {
          advancing = true;
          scrollToStep(next);
        }
      }
    };

    /** The reader scrolling by hand holds off the scroll on (and calls off one that was underway). */
    const takeOver = () => {
      input = performance.now();
      advancing = false;
    };
    const onKey = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) takeOver();
    };

    const onMedia = () => {
      autoplay = wide.matches && !reduce.matches;
      elapsed.current = 0;
      advancing = false;
      // Hand the fill back to the scroll position, or clear it for the turn to grow.
      const fill = fills.current[activeRef.current];
      if (fill) fill.style.scale = scale(0);
      read();
    };

    read();
    loop = requestAnimationFrame(tick);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", takeOver, { passive: true });
    window.addEventListener("touchmove", takeOver, { passive: true });
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onMedia);
    reduce.addEventListener("change", onMedia);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", takeOver);
      window.removeEventListener("touchmove", takeOver);
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onMedia);
      reduce.removeEventListener("change", onMedia);
      if (frame) cancelAnimationFrame(frame);
      cancelAnimationFrame(loop);
    };
  }, [axis]);

  // Once the outgoing fill has its eased transition (after this render), let it shrink away.
  const previous = useRef(0);
  useEffect(() => {
    const out = previous.current;
    previous.current = active;
    if (out === active) return;
    const frame = requestAnimationFrame(() => {
      const fill = fills.current[out];
      if (fill) fill.style.scale = axis === "x" ? "0 1" : "1 0";
    });
    return () => cancelAnimationFrame(frame);
  }, [active, axis]);

  /** Scrolls to tab `i`, starting its turn afresh. */
  const open = (i: number) => {
    const el = steps.current[i];
    if (!el) return;
    elapsed.current = 0;
    scrollToStep(el);
  };

  /** Spread on the list: hovering it pauses the turn. */
  const pause = {
    onPointerEnter: () => {
      hovering.current = true;
    },
    onPointerLeave: () => {
      hovering.current = false;
    },
  };

  return { active, steps, fills, open, pause };
}
