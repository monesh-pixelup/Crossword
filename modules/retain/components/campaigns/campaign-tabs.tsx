"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { campaigns } from "../../config/campaigns";
import { PhoneThread } from "../shared/phone-thread";

/** How long each campaign stays up before the next one takes over (the guidelines' `--dur-ambient`). */
const DURATION_MS = 6000;

/**
 * Layout/Showcase, Stage + triggers variant, set to the guidelines' web kit (`.wk-st`), as on the
 * Dynamic landing pages: a sand stage on 0.5px engraved hairlines holding the campaign's message
 * in a phone, over a row of five campaign tabs split by the same hairline (Crimson 20 titles; the
 * active tab on sand, the rest at 50%, full on hover). A 2px gold bar fills the active tab's top
 * edge over 6s, then the next takes over (looping); choosing a tab restarts it.
 *
 * As the guidelines ask (P1, P7, 11.6), the cycle pauses off screen, while a mouse is over the tab
 * row, and while a tab has keyboard focus (a click doesn't count, so it never sticks). Under reduced
 * motion the bar sits full and nothing advances.
 */
export function CampaignTabs() {
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
    const last = campaigns.length - 1;
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
        className="flex w-full items-center justify-center bg-sand px-4 py-10 shadow-[inset_0.5px_0.5px_0_var(--color-engraved),inset_-0.5px_0_0_var(--color-engraved)] md:py-12 lg:min-h-[560px]"
      >
        <p className="sr-only">{campaigns[active].message.text}</p>
        <PhoneThread message={campaigns[active].message} />
      </div>

      {/* The row draws its top and left hairlines above the tabs; each tab draws its right and bottom, so shared edges stay one rule. */}
      <div
        role="tablist"
        aria-label="Campaigns and outbound"
        onKeyDown={onKeyDown}
        onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
        className="group/tabs relative grid w-full before:pointer-events-none before:absolute before:inset-0 before:z-2 before:shadow-[inset_0.5px_0.5px_0_var(--color-engraved)] md:grid-cols-3 lg:grid-cols-5"
      >
        {campaigns.map((campaign, i) => {
          const selected = i === active;
          return (
            <button
              key={campaign.title}
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
                "group relative flex cursor-pointer flex-col items-start gap-3 px-6 py-8 text-left transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_-0.5px_-0.5px_0_var(--color-engraved)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon lg:px-8",
                selected ? "bg-sand" : "hover:bg-sand/50",
              )}
            >
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.25] tracking-[-0.03em] text-ink transition-opacity duration-300",
                  !selected && "opacity-50 group-hover:opacity-100",
                )}
              >
                {campaign.title}
              </span>
              <span
                className={cn(
                  "font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted transition-opacity duration-300",
                  !selected && "opacity-60 group-hover:opacity-100",
                )}
              >
                {campaign.description}
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  data-paused={!running || undefined}
                  onAnimationEnd={() => select(active === campaigns.length - 1 ? 0 : active + 1)}
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
