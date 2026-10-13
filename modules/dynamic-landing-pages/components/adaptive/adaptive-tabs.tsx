"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { adaptiveFeatures } from "../../config/adaptive";
import { PdpMock } from "./pdp-mock";

/** How long each feature stays up before the next one takes over (the guidelines' `--dur-ambient`). */
const DURATION_MS = 6000;

/**
 * Layout/Showcase, Stage + triggers variant, set to the guidelines' web kit (`.wk-st`): a sand
 * stage on 0.5px engraved hairlines holding the product-page mock-up, over a row of feature tabs
 * split by the same hairline (Crimson 20 titles; the active tab on sand, the rest at 50%, full on
 * hover). The tabs take turns on a timer, a 2px gold bar filling across the active tab's top edge,
 * then the next takes over (looping); choosing a tab restarts it.
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
  const [hovered, setHovered] = useState(false);
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

  const running = visible && !hovered && !keyboardFocus;

  return (
    <div ref={root} className="flex w-full flex-col">
      {/* The stage draws its top and side hairlines; the tab row below supplies the rule under it. */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex w-full items-center justify-center bg-sand px-4 py-8 shadow-[inset_0.5px_0.5px_0_var(--color-engraved),inset_-0.5px_0_0_var(--color-engraved)] md:px-10 md:py-12 lg:min-h-[509px]"
      >
        <PdpMock active={adaptiveFeatures[active].id} />
      </div>

      {/* The row draws its top and left hairlines above the tabs; each tab draws its right and bottom, so shared edges stay one rule. */}
      <div
        role="tablist"
        aria-label="Adaptive product page components"
        onKeyDown={onKeyDown}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
        className="relative grid w-full before:pointer-events-none before:absolute before:inset-0 before:z-2 before:shadow-[inset_0.5px_0.5px_0_var(--color-engraved)] md:grid-cols-2 lg:grid-cols-4"
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
                "group relative flex cursor-pointer flex-col items-start gap-3 px-6 py-8 text-left transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_-0.5px_-0.5px_0_var(--color-engraved)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:p-10",
                selected ? "bg-sand" : "hover:bg-sand/50",
              )}
            >
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.25] tracking-[-0.03em] text-ink transition-opacity duration-300",
                  !selected && "opacity-50 group-hover:opacity-100",
                )}
              >
                {feature.title}
              </span>
              <span
                className={cn(
                  "font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted transition-opacity duration-300",
                  !selected && "opacity-60 group-hover:opacity-100",
                )}
              >
                {feature.description}
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  onAnimationEnd={() => select(active === adaptiveFeatures.length - 1 ? 0 : active + 1)}
                  className="pointer-events-none absolute top-0 left-0 z-3 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-gold motion-reduce:w-full motion-reduce:animate-none"
                  style={{ animationDuration: `${DURATION_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
