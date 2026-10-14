"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { adaptiveFeatures } from "../../config/adaptive";
import { PdpMock } from "./pdp-mock";

/** How long each feature stays up before the next one takes over (the guidelines' `--dur-ambient`). */
const DURATION_MS = 6000;

/**
 * Figma "Library · Stage + triggers": a 509px #f3e7d3 stage on 1px black/25 rules holding the
 * product-page mock-up, over a row of four feature tabs split by the same rule (each one Crimson
 * Medium 20 paragraph, its title run into the copy; the active tab on cream at full strength with
 * the progress bar, the rest at 50%, full on hover). The tabs take turns on a timer, a 2px gold
 * bar filling across the active tab's top edge, then the next takes over (looping); choosing a
 * tab restarts it.
 *
 * As the guidelines ask (P1, P7, 11.6), the cycle pauses off screen, while a mouse is over the tab
 * row, and while a tab has keyboard focus. A click doesn't count as focus here, so choosing a tab
 * with the mouse never leaves the cycle stuck. Under reduced motion the bar sits full and nothing
 * advances.
 */
export function AdaptiveTabs() {
  const [active, setActive] = useState(0);
  // Bumped on every selection so the bar's animation restarts even on the same tab.
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const select = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = adaptiveFeatures.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  // Hover is left to CSS (group-hover below): :hover stays right while the page scrolls under a
  // still pointer, where pointerleave often doesn't fire, which used to leave the bar paused.
  const running = visible && !keyboardFocus;

  return (
    <div ref={root} className="flex w-full flex-col">
      {/* The stage draws its top and side hairlines; the tab row below supplies the rule under it. */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex w-full items-center justify-center border-x border-t border-black/25 bg-[#f3e7d3] px-4 py-8 md:px-10 md:py-12 lg:min-h-[509px]"
      >
        <PdpMock active={adaptiveFeatures[active].id} />
      </div>

      {/* The row draws its top and left hairlines above the tabs; each tab draws its right and bottom, so shared edges stay one rule. */}
      <div
        role="tablist"
        aria-label="Adaptive product page components"
        onKeyDown={onKeyDown}
        onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
        className="group/tabs relative grid w-full before:pointer-events-none before:absolute before:inset-0 before:z-2 before:shadow-[inset_1px_1px_0_rgba(0,0,0,0.25)] md:grid-cols-2 lg:grid-cols-4"
      >
        {adaptiveFeatures.map((feature, i) => {
          const selected = i === active;
          return (
            <button
              key={feature.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "group relative flex cursor-pointer items-start px-6 py-8 text-left transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:p-10",
                selected && "bg-cream",
              )}
            >
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.15] font-medium tracking-[-0.6px] text-[#040404] transition-opacity duration-300",
                  !selected && "opacity-50 group-hover:opacity-100",
                )}
              >
                {feature.title}. {feature.description}
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  data-paused={!running || undefined}
                  onAnimationEnd={() => select(active === adaptiveFeatures.length - 1 ? 0 : active + 1)}
                  className="pointer-events-none absolute top-0 left-0 z-3 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-gold group-hover/tabs:[animation-play-state:paused] data-paused:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                  style={{ animationDuration: `${DURATION_MS}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
