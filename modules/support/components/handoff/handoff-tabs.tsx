"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { handoffModes } from "../../config/handoff";
import { HandoffScene, handoffDuration } from "./handoff-scene";

/** How long each mode stays up before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a mode's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

/**
 * Figma "Stage + triggers" (3836:17091), as Proactive messages on Sell: a 1280 × 599 sand stage (#f3e7d3, a 1px
 * black/25 line on its top and sides) playing the open mode's motion card, centred and 48px clear of its top and
 * bottom, over the three modes as tabs. Each tab is 40px in on a 1px black/25 line, its Crimson 22 title 16px over
 * a line of Geist 16 at black/59; the open one is cream with 32px under its copy, the others at 50%. A 2px gold bar
 * fills across the open tab's top edge (Figma shows it part-way, at 156.95px) while its scene plays and holds, then
 * the next takes over. Choosing a tab restarts its turn; the turn only runs while the section is on screen, and not
 * at all with reduced motion (the bar then sits full). Below 768px the tabs stack.
 */
export function HandoffTabs() {
  const [active, setActive] = useState(0);
  // Bumped on every selection so the bar and the scene restart even on the same tab.
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const last = handoffModes.length - 1;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Long enough for the scene to play out and hold.
  const duration = Math.max(DURATION_MS, handoffDuration(active) + HOLD_MS);

  const select = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
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

  return (
    <div ref={root} className="flex w-full flex-col">
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="relative flex aspect-[1280/599] w-full items-center justify-center overflow-hidden border-x border-t border-black/25 bg-[#f3e7d3] max-md:aspect-[4/5]"
      >
        {/* The mode's 355 × 402 card, as tall as the stage less 48px top and bottom, fading in as it takes over. */}
        <div
          key={`${active}-${run}`}
          className="relative aspect-[355/402] h-[calc(100%-96px)] max-md:h-[calc(100%-48px)] transition-opacity duration-300 ease-out starting:opacity-0"
        >
          <HandoffScene index={active} active={visible} />
        </div>
      </div>

      <div role="tablist" aria-label="Human-in-the-loop modes" onKeyDown={onKeyDown} className="flex w-full flex-col md:flex-row">
        {handoffModes.map((mode, i) => {
          const selected = i === active;
          return (
            <button
              key={mode.title}
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
                // Each tab draws its top, bottom and left edges; the last closes the row on the right.
                // Stacked below 768px, each draws its top and sides instead and the last its bottom.
                "relative flex flex-1 cursor-pointer items-start border-black/25 px-6 py-8 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:self-stretch md:border-y md:border-l md:p-10 md:last:border-r",
                "max-md:border-x max-md:border-t max-md:last:border-b",
                selected ? "bg-cream md:pb-8" : "hover:bg-cream/60",
              )}
            >
              <span className={cn("flex flex-col items-start gap-4 transition-opacity duration-300", !selected && "opacity-50")}>
                <span className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{mode.title}</span>
                <span className="font-sans text-base leading-6 tracking-[-0.32px] text-black/59">{mode.description}</span>
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  onAnimationEnd={() => select(active === last ? 0 : active + 1)}
                  className="pointer-events-none absolute -top-[1.01px] -left-[1.01px] z-1 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-gold motion-reduce:w-full motion-reduce:animate-none"
                  style={{ animationDuration: `${duration}ms`, animationPlayState: visible ? "running" : "paused" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
