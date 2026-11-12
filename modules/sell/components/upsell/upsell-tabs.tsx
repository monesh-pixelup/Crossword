"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import { PlusLines } from "@/components/ui/plus-lines";
import { cn } from "@/lib/cn";
import { upsellFeatures } from "../../config/upsell";
import { ScenePanel } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { upsellScenes } from "../motion-v2/scenes";

/** How long each feature stays open before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a feature's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

/** The stacked accordion's open / close: the row eases its height while the visual fades. */
const ACCORDION_MS = 500;

/**
 * Each feature's icon, a 24px square with its Phosphor glyph (phosphoricons.com, regular weight) at 16px. The open
 * feature's is a maroon badge (Figma 3786:21472) with a 0.46px #efe9db line inside and the glyph in #ffb657; the others
 * are a 0.75px black/19 line with the glyph at black/40.
 */
function IconTile({ icon: Glyph, on }: { icon: Icon; on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-6 shrink-0 items-center justify-center",
        on ? "border-[0.46px] border-linen bg-maroon text-[#ffb657]" : "border-[0.75px] border-black/19 text-black/40",
      )}
    >
      <Glyph size={16} />
    </span>
  );
}

/**
 * Figma "Layout" (Upsell & cross-sell, node 2914:36238): one sand panel (#f3e7d3, 0.5px black/25 border) with the
 * features as a list in the 596px left column and, on the right, the open feature's motion visual at 687px wide. The list
 * (Figma 3257:36264: 520px wide, at the top of the column 40px down and 42px in, so its rules end 34px short of the
 * visual) is 32px from row to rule: the open feature shows its tile, Crimson Light 24 title and line of Geist 16 (8px under it), its rule
 * 24px below; the others are their tile and title at 40%. Every rule is black/20. The features take turns on a
 * timer (long enough for each scene to play out and hold) while the section is on screen; choosing one restarts its
 * timer. Side by side from 1280px. Narrower, the tabs are an accordion, as Insights on the home page: the open
 * feature's visual opens out right under its copy (easing open as the last one's closes), and they change only when
 * tapped, never on a timer.
 */
export function UpsellTabs() {
  const [active, setActive] = useState(0);
  // Bumped on every selection so the timer and the scene restart even on the same feature.
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const last = upsellFeatures.length - 1;
  const scene = upsellScenes[upsellFeatures[active].scene];
  // Which layout is showing (null until known): only its visuals are drawn, and only side by side do the tabs turn on a timer.
  const [wide, setWide] = useState<boolean | null>(null);
  // The accordion item closing as another opens, kept drawn until it has eased shut.
  const [closing, setClosing] = useState<number | null>(null);
  // Side by side: the feature whose visual is fading out as the open one fades in (`.tab-panel--soft`), and how many
  // times each feature has opened, to key its scene so it plays from the start each time without redrawing the one
  // fading out.
  const [previous, setPrevious] = useState<number | null>(null);
  const [plays, setPlays] = useState(() => upsellFeatures.map(() => 0));

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
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

  /** The open feature's turn: long enough for its scene to play out and hold. */
  const turn = Math.max(DURATION_MS, scene.duration + HOLD_MS);

  const select = (i: number) => {
    if (i !== active) {
      setClosing(active);
      setPrevious(active);
    }
    setActive(i);
    setRun((r) => r + 1);
    setPlays((p) => p.map((n, j) => (j === i ? n + 1 : n)));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      ref={root}
      className="flex w-full flex-col bg-sand p-[0.5px] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] min-[1280px]:flex-row min-[1280px]:items-start"
    >
      {/* Stacked (below 1280px), 32px above the first row and below the last, as between each row and its rule. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch px-6 py-8 md:px-10 min-[1280px]:items-start min-[1280px]:justify-start min-[1280px]:pt-10 min-[1280px]:pr-[34px] min-[1280px]:pb-0 min-[1280px]:pl-[42px]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Upsell and cross-sell features"
          onKeyDown={onKeyDown}
          className="flex w-full flex-col gap-8"
        >
          {upsellFeatures.map((feature, i) => {
            const on = i === active;
            return (
              <div key={feature.title} className="flex flex-col">
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${id}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "flex w-full gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                    on ? "cursor-default items-start" : "cursor-pointer items-center",
                  )}
                >
                  {/* Figma: the 24px tile top-aligned with the open title, centred on a closed one's 24px row. */}
                  <IconTile icon={feature.icon} on={on} />
                  <span className="flex min-w-0 flex-col">
                    <span
                      className={cn(
                        "font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] transition-colors duration-300 ease-out",
                        on ? "text-ink" : "text-ink/40",
                      )}
                    >
                      {feature.title}
                    </span>
                    {/*
                      The description (8px under the title) opens and closes by easing its row's height between 0 and
                      its own, fading in once there's room and out before it closes.
                    */}
                    <span
                      aria-hidden={!on}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] ease-out",
                        on
                          ? "grid-rows-[1fr] opacity-100 duration-[300ms,200ms] delay-[0ms,100ms]"
                          : "grid-rows-[0fr] opacity-0 duration-[300ms,150ms]",
                      )}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="block max-w-[462.865px] pt-2 font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
                          {feature.description}
                        </span>
                      </span>
                    </span>
                  </span>
                  {/*
                    Below 1280px (the accordion): the FAQ's plus / minus (FaqList's plain one, 14px in ink-soft) at the row's
                    end, centred on the 24px tile's row. The plus turns half a turn as its upright folds away, leaving the minus.
                  */}
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-[5px] ml-auto size-3.5 shrink-0 self-start transition-[rotate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1280px]:hidden",
                      on && "rotate-180",
                    )}
                  >
                    <PlusLines open={on} className="text-ink-soft" />
                  </span>
                </button>
                {/*
                  Below 1280px: the accordion row under the copy, easing open to the feature's visual (at its 738:680
                  shape, 24px under the copy) while it's open, and shut as another opens.
                */}
                <div
                  aria-hidden={!on}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1280px]:hidden",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  style={{ transitionDuration: `${ACCORDION_MS}ms` }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="relative mt-6 aspect-[738/680] w-full overflow-hidden">
                      {wide !== true && (on || i === closing) && (
                        <ScenePanel
                          key={`${i}-${run}`}
                          scene={upsellScenes[feature.scene]}
                          active={visible && on}
                          root={SellMotionRoot}
                          maxScale={Infinity}
                          transform
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/*
                  Each rule is a zero-height line with its 0.5px stroke centred on it, as Figma (3257:36264) draws them:
                  the open feature's sits in a 1px box 24px under its copy, the others' 32px under their row, and the
                  next feature starts 32px below. Side by side the last is drawn too; stacked over the panel (below
                  1280px) it isn't, and the rules run past the list's padding to the panel's edges, so they span the
                  same width as the panel under them.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "h-0 transition-[margin] duration-300 ease-out max-[1279px]:-mx-6 md:max-[1279px]:-mx-10",
                    on ? "mt-[24.5px] mb-[0.5px]" : "mt-8 mb-0",
                    // Stacked (below 1280px) the last isn't drawn and its gap goes too, so the list ends on the panel's padding.
                    "shadow-[0_0_0_0.25px_rgba(0,0,0,0.2)]",
                    i === last && "max-[1279px]:hidden",
                    "relative",
                  )}
                >
                  {/*
                    Side by side, the open feature's progress loader (as the site's other tabs): a 1.5px maroon line
                    filling along its rule over the feature's turn, paused while the section is off screen; once full,
                    the next feature takes over. Not drawn below 1280px (tapped there, never on a timer); with reduced
                    motion it sits full and nothing moves on by itself.
                  */}
                  {on && wide === true && (
                    <span
                      key={run}
                      aria-hidden
                      onAnimationEnd={() => select(active === last ? 0 : active + 1)}
                      className="pointer-events-none absolute -top-[0.75px] left-0 h-[1.5px] w-0 animate-[insights-progress_linear_forwards] bg-maroon motion-reduce:w-full motion-reduce:animate-none"
                      style={{ animationDuration: `${turn}ms`, animationPlayState: visible ? "running" : "paused" }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/*
        The open feature's visual (the source's 738 × 680 maroon frame with its phone chat), drawn at 687px wide side by
        side (its height following the frame's 738:680), where Figma's 687 × 586 panel was. Side by side it runs 4px past
        the card's right edge, over its border, as in Figma (0.5 + 596 + 687 = 1283.5 of 1280), which leaves the list
        column its 596px. Keyed so each feature (and each reselection) replays from the start, fading in as it opens.
      */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="relative aspect-[738/680] w-full shrink-0 overflow-hidden max-[1279px]:hidden min-[1280px]:-mr-1 min-[1280px]:w-[687px]"
      >
        {/*
          Every feature's layer is stacked in the panel and they crossfade as the Product discovery tabs do
          (`.tab-panel--soft`): the outgoing visual fades and softly blurs away while the chosen one eases in after it. A
          scene is drawn only while its feature is open or fading out.
        */}
        {wide !== false &&
          upsellFeatures.map((feature, i) => (
            <div key={feature.title} inert={i !== active} className="tab-panel tab-panel--soft absolute inset-0">
              {(i === active || i === previous) && (
                <ScenePanel
                  key={plays[i]}
                  scene={upsellScenes[feature.scene]}
                  active={visible && i === active}
                  root={SellMotionRoot}
                  maxScale={Infinity}
                  transform
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
