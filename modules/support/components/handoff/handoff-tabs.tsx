"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { handoffModes } from "../../config/handoff";
import { HandoffScene, handoffDuration } from "./handoff-scene";

/** How long each mode stays up before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a mode's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

/** The phone accordion's open / close: the row eases its height while the dashboard fades. */
const ACCORDION_MS = 500;

/**
 * Figma "Stage + triggers" (3836:17091), as Proactive messages on Sell: a 1280 × 599 sand stage (#f3e7d3, a 1px
 * black/25 line on its top and sides) playing the open mode's helpdesk dashboard (Support V3 10–12, the stage's own
 * 1280 × 599), over the three modes as tabs. Each tab is 40px in on a 1px black/25 line, its Crimson 22 title 16px over
 * a line of Geist 16 at black/59; the open one is cream with 32px under its copy, the others at 50%. A 2px gold bar
 * fills across the open tab's top edge (Figma shows it part-way, at 156.95px) while its scene plays and holds, then
 * the next takes over. Choosing a tab restarts its turn; the turn only runs while the section is on screen, and not
 * at all with reduced motion (the bar then sits full).
 *
 * Below 768px the tabs stack as an accordion, as Insights on the home page: the open mode's dashboard opens out right under
 * its copy on a sand stage, easing open as the last one's closes, and they change only when tapped (with no progress bar).
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
  // Which layout is showing (null until known): only its dashboard is drawn, and only from 768px do the tabs turn on a timer.
  const [wide, setWide] = useState<boolean | null>(null);
  // The accordion item closing as another opens, kept drawn until it has eased shut.
  const [closing, setClosing] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (closing === null) return;
    const timer = window.setTimeout(() => setClosing(null), ACCORDION_MS);
    return () => window.clearTimeout(timer);
  }, [closing]);

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
    if (i !== active) setClosing(active);
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
        className="relative flex aspect-[1280/599] w-full items-center justify-center overflow-hidden border-x border-t border-black/25 bg-[#f3e7d3] max-md:hidden"
      >
        {/* The mode's helpdesk dashboard (Support V3, 1280 × 599), filling the stage, fading in as it takes over. */}
        {wide !== false && (
          <div key={`${active}-${run}`} className="absolute inset-0 transition-opacity duration-300 ease-out starting:opacity-0">
            <HandoffScene index={active} active={visible} />
          </div>
        )}
      </div>

      <div role="tablist" aria-label="Human-in-the-loop modes" onKeyDown={onKeyDown} className="flex w-full flex-col max-md:border-b max-md:border-black/25 md:flex-row">
        {handoffModes.map((mode, i) => {
          const selected = i === active;
          return (
            <div key={mode.title} className="flex flex-1 flex-col border-black/25 md:last:border-r">
              <button
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
                  // Each tab draws its top, bottom and left edges; the last one's wrapper closes the row on the right.
                  // Stacked below 768px, each draws its top and sides instead and the list closes the bottom.
                  "relative flex flex-1 cursor-pointer items-start border-black/25 px-6 py-8 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:border-y md:border-l md:p-10",
                  "max-md:border-x max-md:border-t",
                  selected ? "bg-cream md:pb-8" : "hover:bg-cream/60",
                )}
              >
                <span className={cn("flex min-w-0 flex-1 flex-col items-start gap-4 transition-opacity duration-300", !selected && "opacity-50")}>
                  <span className="font-serif text-[22px] max-md:text-[20px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{mode.title}</span>
                  <span className="font-sans text-base leading-6 tracking-[-0.32px] text-black/59">{mode.description}</span>
                </span>
                {/*
                  Below 768px (the accordion): the FAQ's plus / minus (FaqList's plain one, 14px in ink-soft), centred on the
                  title's first line. The plus turns half a turn as its upright folds away, leaving the minus.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-1 ml-4 size-3.5 shrink-0 transition-[rotate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden",
                    selected && "rotate-180",
                  )}
                >
                  <span className="absolute inset-x-0 top-[6.3px] h-[1.4px] bg-ink-soft" />
                  <span
                    className={cn(
                      "absolute inset-y-0 left-[6.3px] w-[1.4px] bg-ink-soft transition-[scale,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      selected ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100",
                    )}
                  />
                </span>
                {/* Below 768px the tabs change only when tapped, so the open tab has no progress bar (nor while the layout is unknown). */}
                {selected && wide === true && (
                  <span
                    key={run}
                    aria-hidden
                    onAnimationEnd={() => select(active === last ? 0 : active + 1)}
                    className="pointer-events-none absolute -top-[1.01px] -left-[1.01px] z-1 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-gold motion-reduce:w-full motion-reduce:animate-none"
                    style={{ animationDuration: `${duration}ms`, animationPlayState: visible ? "running" : "paused" }}
                  />
                )}
              </button>
              {/*
                Below 768px: the open mode's dashboard on its sand stage (the dashboard's 1280:599 shape) under its copy,
                easing open while it's open and shut as another opens; it carries the tab's side lines on down.
              */}
              <div
                aria-hidden={!selected}
                className={cn(
                  "grid border-x border-black/25 bg-cream transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden",
                  selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
                style={{ transitionDuration: `${ACCORDION_MS}ms` }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-6 pb-8">
                    <div className="relative aspect-[353/440] w-full overflow-hidden bg-[#f3e7d3]">
                      {wide !== true && (selected || i === closing) && (
                        <HandoffScene key={`${i}-${run}`} index={i} active={visible && selected} mobile />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
