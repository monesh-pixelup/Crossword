"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { lifecycleStages } from "../../config/lifecycle";
import { LifecyclePanel } from "../motion/panels";

// Trims the line box to cap height → baseline, as Figma lays these out.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

/** How long each feature stays open before the next one opens (the last of a stage hands on to the next stage). */
const TURN = 9000;

type Position = { stage: number; feature: number };

/**
 * Each stage's glyph as a line icon in a 16px box, stroked 1.2px (the site's icon stroke): shopping bag, headset,
 * arrows, sparkles and robot, after Figma's tab badges (3495:23536).
 */
const glyphs: Record<string, ReactNode> = {
  Sell: (
    <>
      <path d="M3.2 5.2h9.6l.75 8.3a.7.7 0 0 1-.7.75H3.15a.7.7 0 0 1-.7-.75Z" />
      <path d="M5.6 5.2v-.6a2.4 2.4 0 0 1 4.8 0v.6" />
    </>
  ),
  Support: (
    <>
      <path d="M2.75 9.5V8a5.25 5.25 0 0 1 10.5 0v1.5" />
      <path d="M2.75 9.5h1.6a.8.8 0 0 1 .8.8v2.2a.8.8 0 0 1-.8.8h-.8a.8.8 0 0 1-.8-.8Z" />
      <path d="M13.25 9.5h-1.6a.8.8 0 0 0-.8.8v2.2a.8.8 0 0 0 .8.8h.8a.8.8 0 0 0 .8-.8Z" />
      <path d="M13.25 12.5v.5a1.8 1.8 0 0 1-1.8 1.8H8.8" />
    </>
  ),
  Retain: (
    <>
      <path d="M12.9 6.3a5.2 5.2 0 0 0-9.4-.9L2.4 6.5" />
      <path d="M2.4 3.6v2.9h2.9" />
      <path d="M3.1 9.7a5.2 5.2 0 0 0 9.4.9l1.1-1.1" />
      <path d="M13.6 12.4V9.5h-2.9" />
    </>
  ),
  "AI Assistants": (
    <>
      <path d="M6.5 3.5l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2Z" />
      <path d="M12 10.2l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5Z" />
      <path d="M11.6 2.2v2.8M10.2 3.6H13" />
    </>
  ),
  "Personal Agents": (
    <>
      <path d="M4.5 6h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M8 6V3.6" />
      <circle cx="8" cy="2.6" r="0.9" />
      <circle cx="5.9" cy="10" r="0.9" />
      <circle cx="10.1" cy="10" r="0.9" />
    </>
  ),
};

/**
 * The open stage's badge (the plain badge the other pages' tabs use): a 24px maroon square with a 0.6px #efe9db line
 * inside it (no gold ring outside), its gold line glyph centred.
 */
function StageBadge({ glyph }: { glyph: ReactNode }) {
  return (
    <span aria-hidden className="block size-6 bg-maroon shadow-[inset_0_0_0_0.6px_var(--color-linen)]">
      {/* The glyphs' 16px box, centred in the 24px square. */}
      <svg
        viewBox="-4 -4 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block size-6 text-amber"
      >
        {glyph}
      </svg>
    </span>
  );
}

/** Opens (and closes) a feature's chip or copy: its rows grow from nothing, fading in. Closed, it's inert. */
function Reveal({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      inert={!open}
      className={cn(
        "grid w-full transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/**
 * Lifecycle stages as tabs (Figma 3073:20862): a row of stage tabs over a box holding the stage's features
 * on the left and the open feature's motion mock-up on the right. The open tab carries its badge and, along
 * its top edge, a maroon bar filling through the stage. Within a stage the open feature shows its chip, copy and
 * GET STARTED; the others are titles at 50%, between hairlines. Features play on their own: each stays open
 * for its turn while the section is on screen, then the next opens (the last of a stage moves on to the next
 * stage, and the last stage back to the first). Keyboard focus pauses the turn (hovering doesn't); with reduced
 * motion nothing advances on its own. Choosing a tab opens its first feature; choosing a title opens it.
 * Below 1280px the tabs scroll sideways and the mock-up sits above the features.
 */
export function LifecycleTabs() {
  const id = useId();
  const [position, setPosition] = useState<Position>({ stage: 0, feature: 0 });
  // Bumped on every change so the open feature's visual plays from the top.
  const [run, setRun] = useState(0);
  const positionRef = useRef(position);
  /** Time spent in the open feature's turn, in ms. */
  const elapsed = useRef(0);
  const inView = useRef(false);
  const focused = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // The open tab's maroon bar, scaled every frame.
  const fillRef = useRef<HTMLSpanElement>(null);

  const open = (next: Position) => {
    elapsed.current = 0;
    const current = positionRef.current;
    if (next.stage === current.stage && next.feature === current.feature) return;
    positionRef.current = next;
    setPosition(next);
    setRun((r) => r + 1);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(root);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let loop = 0;
    let last = 0;
    const tick = (time: number) => {
      loop = requestAnimationFrame(tick);
      // Capped, so a frame after the tab was hidden (or the main thread stalled) doesn't skip the turn.
      const delta = last ? Math.min(time - last, 100) : 0;
      last = time;

      const { stage, feature } = positionRef.current;
      const count = lifecycleStages[stage].features.length;
      if (!reduce.matches && inView.current && !focused.current) elapsed.current += delta;
      if (!reduce.matches && elapsed.current >= TURN) {
        const next =
          feature + 1 < count ? { stage, feature: feature + 1 } : { stage: (stage + 1) % lifecycleStages.length, feature: 0 };
        elapsed.current = 0;
        positionRef.current = next;
        setPosition(next);
        setRun((r) => r + 1);
        return;
      }
      // Through the stage: the features before the open one, plus how far its turn has run (all of it with reduced motion).
      const progress = (feature + (reduce.matches ? 1 : elapsed.current / TURN)) / count;
      if (fillRef.current) fillRef.current.style.scale = `${progress} 1`;
    };
    loop = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(loop);
    };
  }, []);

  // When the tabs scroll sideways (below 1280px), bring the open one into view.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabs.current[position.stage];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [position.stage]);

  // Arrow keys move between tabs (roving tabindex), as Insights does.
  const count = lifecycleStages.length;
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const current = position.stage;
    const target = e.key === "Home" ? 0 : e.key === "End" ? count - 1 : step ? (current + step + count) % count : null;
    if (target === null) return;
    e.preventDefault();
    open({ stage: target, feature: 0 });
    tabs.current[target]?.focus();
  };

  const stage = lifecycleStages[position.stage];
  const panelId = `${id}-panel`;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col"
      onFocus={(e) => {
        focused.current = e.target.matches(":focus-visible");
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false;
      }}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label="Customer lifecycle stages"
        onKeyDown={onKeyDown}
        className="relative flex w-full overflow-x-auto [scrollbar-width:none] xl:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {lifecycleStages.map((s, i) => {
          const on = i === position.stage;
          return (
            <button
              key={s.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={panelId}
              tabIndex={on ? 0 : -1}
              onClick={() => open({ stage: i, feature: 0 })}
              className={cn(
                // Edges are inset shadows, as Figma's 0.5px inside strokes: neighbouring tabs share a 1px edge.
                // Below 1280px each tab is at least as wide as its name and they grow to fill the row, scrolling
                // sideways only once they no longer fit; from 1280px they share the row equally.
                "group relative flex h-[52px] flex-[1_0_auto] items-center px-5 text-left max-md:w-[208px] max-md:flex-none max-md:justify-center shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon md:h-[58.5px] md:px-8 xl:flex-1 xl:basis-0 xl:pr-0",
                // Below 768px every tab, open or closed, is one width (208px: room for the open tab's badge and "Personal
                // Agents"), its contents centred, so the row doesn't change size as the tabs advance.
                on ? "cursor-default bg-sand" : "cursor-pointer bg-[rgba(243,233,212,0.37)]",
              )}
            >
              {/* The badge opens out ahead of the name (16px gap, as Figma 3786:16661) on the open tab. */}
              <span
                className={cn(
                  "relative h-6 shrink-0 transition-[width,margin-right,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  on ? "mr-4 w-6 opacity-100" : "mr-0 w-0 opacity-0",
                )}
              >
                <span className="absolute top-0 left-0">
                  <StageBadge glyph={glyphs[s.name]} />
                </span>
              </span>
              <span
                className={cn(
                  "font-serif text-[20px] leading-[1.0833] tracking-[-0.05em] whitespace-nowrap text-ink transition-opacity duration-300 md:text-[24px]",
                  on ? "opacity-100" : "opacity-50 group-hover:opacity-75",
                )}
              >
                {s.name}
              </span>
              {/*
                Along the open tab's top edge (Figma 3800:29305): a 1px track (#b6af9f) with the maroon fill running through
                the stage.
              */}
              {on && (
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-1 h-px bg-[#b6af9f]">
                  <span ref={fillRef} className="absolute inset-0 origin-left bg-maroon [scale:0_1]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${id}-tab-${position.stage}`}
        className="flex w-full flex-col bg-sand px-[0.5px] pt-[0.5px] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] xl:flex-row xl:items-start xl:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col px-6 pt-8 pb-10 max-xl:order-2 md:px-8 md:pt-10 md:pb-12 xl:pt-20">
          {/* 40px either side of each 0.5px hairline; the list is Figma's 462.87px wide beside the mock-up. */}
          <div key={position.stage} className="lifecycle-stage-enter flex w-full flex-col gap-10 xl:max-w-[462.865px]">
            {stage.features.map((feature, f) => {
              const on = f === position.feature;
              return (
                <Fragment key={feature.title}>
                  {f > 0 && <span aria-hidden className="h-0 w-full outline-[0.25px] outline-black/20 outline-solid" />}
                  <div className="flex flex-col items-start">
                    <Reveal open={on}>
                      <div className="flex pb-4">
                        <span className="flex h-[23px] items-center bg-[#ffeec2] p-[6.5px] outline-[0.5px] -outline-offset-[0.5px] outline-black/40 outline-solid">
                          <span
                            className={cn(
                              "font-sans text-[14px] leading-5 font-medium tracking-[-0.28px] whitespace-nowrap text-ink-muted uppercase",
                              trimToCaps,
                            )}
                          >
                            {feature.label}
                          </span>
                        </span>
                      </div>
                    </Reveal>
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => open({ stage: position.stage, feature: f })}
                      className={cn(
                        "text-left font-serif text-(length:--h6-size) leading-[1.1071] tracking-[-0.04em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                        on ? "cursor-default text-ink" : "cursor-pointer text-ink/50 hover:text-ink/75",
                      )}
                    >
                      {feature.title}
                    </button>
                    <Reveal open={on}>
                      <div className="flex flex-col items-start gap-6 pt-4">
                        <p className="w-full text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">{feature.body}</p>
                        <Link
                          href={feature.href}
                          className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] max-md:text-[15px] max-md:leading-5 max-md:tracking-[-0.45px] whitespace-nowrap text-ink-soft transition-opacity duration-150 hover:opacity-50"
                        >
                          GET STARTED
                          <Image src={arrowRight} alt="" className="size-3" />
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Figma's 738 × 680 mock-up, flush to the box's top right; it fills the box's width when stacked. */}
        <div className="@container w-full xl:w-[57.65625%] xl:flex-none">
          <LifecyclePanel visual={stage.features[position.feature].visual} run={run} />
        </div>
      </div>
    </div>
  );
}
