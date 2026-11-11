"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { BinocularsIcon, LinkIcon, UserFocusIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";
import { insightFeatures } from "../../config/insights";
import { InsightPanel, insightVisuals } from "../motion/panels";

/** How long a tab stays open once its visual has played out, before the tabs advance. */
const HOLD = 3000;

/** Tab glyphs, from Phosphor (phosphoricons.com), regular weight: binoculars, link, user focus. */
const icons: ReactNode[] = [
  <BinocularsIcon key="ask" size={16} />,
  <LinkIcon key="links" size={16} />,
  <UserFocusIcon key="user" size={16} />,
];

/** The accordion's open / close: the row eases its height while the visual fades. */
const ACCORDION_MS = 500;

/**
 * Insights tabs: the feature list beside the open tab's motion visual. The
 * active tab's top edge fills while its visual plays plus a hold, then the
 * next tab opens. Visuals start once the tabs are first on screen. Runs only
 * while in view, keeps running on hover, pauses on keyboard focus; no
 * auto-rotation with reduced motion.
 *
 * Below 1200px the tabs are an accordion (as henrylabs.ai's "Built for a new era of shopping" on phones): the open
 * tab's visual opens out right under it, easing its height open as the last one's closes. There they don't advance on
 * their own; the visitor taps to change them.
 */
export function InsightTabs() {
  const id = useId();
  const [current, setCurrent] = useState(0);
  // Bumped on every switch so re-opening a tab replays its visual.
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = insightFeatures.length;
  // Which layout is showing (null until known), so only its copy of the visual is drawn and plays.
  const [wide, setWide] = useState<boolean | null>(null);
  // The accordion item closing as another opens, kept drawn until it has eased shut.
  const [closing, setClosing] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 75rem)");
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
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const open = (i: number) => {
    if (i === current) return;
    setClosing(current);
    setCurrent(i);
    setRun((r) => r + 1);
  };

  // Arrow keys move between tabs (roving tabindex), as Webflow's tabs do.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    const target = e.key === "Home" ? 0 : e.key === "End" ? count - 1 : step ? (current + step + count) % count : null;
    if (target === null) return;
    e.preventDefault();
    open(target);
    tabs.current[target]?.focus();
  };

  const panelId = `${id}-panel`;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col min-[1200px]:flex-row min-[1200px]:items-stretch"
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setFocusPaused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusPaused(false);
      }}
    >
      {/* Side by side, the row never grows past Figma's 640px, so wide screens don't pad the tabs out; the visual zooms to cover. */}
      {/* Side by side (from 1200px) the open tab's visual has its own column; below that it opens under its tab. */}
      <div role="tabpanel" id={panelId} aria-labelledby={`${id}-tab-${current}`} className="relative aspect-[738/640] w-full overflow-hidden [container-type:size] max-[1199px]:hidden min-[1200px]:max-h-[640px] min-[1200px]:w-[57.6563%] min-[1200px]:flex-none">
        {wide !== false && <InsightPanel visual={insightFeatures[current].visual} run={run} />}
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Crossword Insights"
        onKeyDown={onKeyDown}
        className="flex w-full min-w-0 flex-col shadow-[inset_0_-1px_0_#ddd] min-[1200px]:grid min-[1200px]:flex-1 min-[1200px]:grid-rows-3"
      >
        {insightFeatures.map((feature, i) => {
          const on = i === current;
          const drawn = wide !== true && (on || i === closing);
          return (
            <div key={feature.title} className={cn("flex flex-col transition-colors duration-300", on ? "bg-sand" : "bg-transparent")}>
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on ? 0 : -1}
                onClick={() => open(i)}
                className={cn(
                  // Edges are inset shadows: Figma strokes sit inside the box and take no space.
                  // Tabs share edges; the list closes the bottom.
                  "relative flex w-full flex-1 cursor-pointer items-start gap-3 p-5 text-left shadow-[inset_1px_0_0_#ddd,inset_-1px_0_0_#ddd,inset_0_1px_0_#ddd] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon min-[480px]:gap-4 min-[480px]:p-6 md:p-8 min-[1200px]:p-10",
                )}
              >
                {/* Below 1200px the tabs only change when tapped, so the open tab has no progress bar (nor while the layout is unknown). */}
                {on && wide === true && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 z-1 h-[2px] w-0 animate-[insights-progress_linear_forwards] bg-maroon motion-reduce:w-full motion-reduce:animate-none"
                    style={{
                      animationDuration: `${insightVisuals[feature.visual].duration + HOLD}ms`,
                      animationPlayState: inView && !focusPaused ? "running" : "paused",
                    }}
                    onAnimationEnd={() => open((i + 1) % count)}
                  />
                )}
                {/*
                  The badge the other tabs on the site use (Lifecycle, Upsell): a 24px square, the glyph centred. Open, it's
                  maroon with a 0.6px #efe9db line inside (no gold ring outside), the glyph gold; closed, a 0.75px
                  black/19 line with the glyph at black/40.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "flex size-6 flex-none items-center justify-center transition-[background-color,color,box-shadow] duration-300",
                    on
                      ? "bg-maroon text-amber shadow-[inset_0_0_0_0.6px_var(--color-linen)]"
                      : "text-black/40 shadow-[inset_0_0_0_0.75px_rgba(0,0,0,0.19)]",
                  )}
                >
                  {icons[i]}
                </span>
                <span
                  className={cn(
                    "flex min-w-0 flex-auto flex-col items-start gap-2.5 transition-opacity duration-300",
                    !on && "opacity-50",
                  )}
                >
                  <span className="max-w-[403.95px] font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] text-ink">
                    {feature.title}
                  </span>
                  {/* Below 1200px (the accordion) a closed tab shows only its title; the open one keeps its line of copy. */}
                  <span
                    className={cn(
                      "font-sans text-[14px] leading-5 tracking-[-0.28px] text-ink-muted",
                      feature.narrow ? "max-w-[359.64px]" : "max-w-[391.67px]",
                      !on && "max-[1199px]:hidden",
                    )}
                  >
                    {feature.body}
                  </span>
                </span>
                {/*
                  Below 1200px (the accordion): the FAQ's plus / minus (FaqList's plain one, 14px in ink-soft), level with
                  the title's first line. The plus turns half a turn as its upright folds away, leaving the minus.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-[5px] size-3.5 shrink-0 transition-[rotate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1200px]:hidden",
                    on && "rotate-180",
                  )}
                >
                  <span className="absolute inset-x-0 top-[6.3px] h-[1.4px] bg-ink-soft" />
                  <span
                    className={cn(
                      "absolute inset-y-0 left-[6.3px] w-[1.4px] bg-ink-soft transition-[scale,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      on ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100",
                    )}
                  />
                </span>
              </button>
              {/*
                Below 1200px: the accordion row under the tab, easing open to the visual (at its 738:640 shape, inset like the
                tab's copy) while the tab is open, and shut as another opens. The tab's side edges run on down beside it.
              */}
              <div
                aria-hidden={!on}
                className={cn(
                  "grid shadow-[inset_1px_0_0_#ddd,inset_-1px_0_0_#ddd] transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1200px]:hidden",
                  on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
                style={{ transitionDuration: `${ACCORDION_MS}ms` }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-5 pb-5 min-[480px]:px-6 min-[480px]:pb-6 md:px-8 md:pb-8">
                    <div className="relative aspect-[738/640] w-full overflow-hidden [container-type:size]">
                      {drawn && <InsightPanel visual={feature.visual} run={run} />}
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
