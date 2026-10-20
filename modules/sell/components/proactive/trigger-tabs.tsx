"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { proactiveTriggerScenes, proactiveTriggers } from "../../config/proactive";
import { proactiveScenes } from "../motion/proactive";
import { ScenePanel } from "../motion/scene-panel";

/** How long each trigger stays up before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a trigger's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

const sceneFor = (i: number) => {
  const slug = proactiveTriggerScenes[i];
  return slug ? proactiveScenes[slug as keyof typeof proactiveScenes] : undefined;
};

/**
 * A sand stage (1280 × 509, zoomed to the row's width) playing the active trigger's motion scene,
 * over three trigger tabs; a trigger without a scene leaves the stage empty. The tabs take turns on a timer: a
 * 2px gold bar fills across the active tab's top edge, then hands over to the next (Figma shows it
 * part-way, at 156.95px). Choosing a tab restarts its timer. The cycle only runs while the
 * section is on screen, and not at all with reduced motion (the bar then sits full).
 */
export function TriggerTabs() {
  const [active, setActive] = useState(0);
  // Bumped on every selection so the bar's animation restarts even on the same tab.
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
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

  const scene = sceneFor(active);
  // Long enough for the scene to play out and hold.
  const duration = Math.max(DURATION_MS, scene ? scene.duration + HOLD_MS : 0);

  const select = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = proactiveTriggers.length - 1;
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
        // The scene draws its own sand ground and hairline border; without one the stage draws them.
        className={cn("relative aspect-[1280/509] w-full", !scene && "border-x border-t border-black/25 bg-[#f3e7d3]")}
      >
        {scene && <ScenePanel key={`${active}-${run}`} scene={scene} active={visible} />}
      </div>

      <div role="tablist" aria-label="Proactive message triggers" onKeyDown={onKeyDown} className="flex w-full flex-col md:flex-row">
        {proactiveTriggers.map((trigger, i) => {
          const selected = i === active;
          return (
            <button
              key={trigger}
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
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.15] font-light text-[#040404] transition-opacity duration-300",
                  !selected && "opacity-50",
                )}
              >
                {trigger}
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  onAnimationEnd={() => select(active === proactiveTriggers.length - 1 ? 0 : active + 1)}
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
