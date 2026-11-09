"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { upsellFeatures } from "../../config/upsell";
import { ScenePanel } from "../motion/scene-panel";
import { SellCameraMotionRoot } from "../motion-camera";
import { upsellCameraScenes } from "../motion-camera/scenes";

/** How long each feature stays open before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a feature's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

/** The stacked accordion's open / close: the row eases its height while the visual fades. */
const ACCORDION_MS = 500;

/**
 * Figma 3257:36264's icons, each a 24px square. The open feature's is a maroon badge (Figma 3786:21472): the glyph at
 * 14.8px in #ffb657, 4.6px in (its 0.46px #efe9db line counted inside), with a 0.46px #ffb657 ring. The others are a
 * 0.75px black/19 line around the 22.5px glyph box, the glyph (16.36px, 3.6px in) in black/40. `path` is the glyph in
 * that 22.5px box.
 */
function IconTile({ path, on }: { path: string; on: boolean }) {
  if (on) {
    return (
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center overflow-clip border-[0.46px] border-[#efe9db] bg-maroon p-[4.143px] shadow-[0_0_0_0.46px_#ffb657]"
      >
        {/* The glyph's own 16.36px box inside the 22.5px one, drawn at 14.8px: its 1.2px stroke scales to Figma's 1.085px. */}
        <svg width="14.795" height="14.795" viewBox="3.615 3.705 16.362 16.362" fill="none" className="block">
          <path d={path} stroke="#FFB657" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span aria-hidden className="flex size-6 shrink-0 items-center border-[0.75px] border-black/19">
      <svg width="22.5" height="22.5" viewBox="0 0 22.5 22.5" fill="none" className="block overflow-hidden">
        <path d={path} stroke="black" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
  const scene = upsellCameraScenes[upsellFeatures[active].scene];
  // Which layout is showing (null until known): only its visuals are drawn, and only side by side do the tabs turn on a timer.
  const [wide, setWide] = useState<boolean | null>(null);
  // The accordion item closing as another opens, kept drawn until it has eased shut.
  const [closing, setClosing] = useState<number | null>(null);

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

  // Hands over to the next feature once this one's scene has played out and held; never with reduced motion, and only
  // side by side (stacked, the visitor taps to change them).
  useEffect(() => {
    if (!wide || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setActive((a) => (a === last ? 0 : a + 1)),
      Math.max(DURATION_MS, scene.duration + HOLD_MS),
    );
    return () => window.clearTimeout(timer);
  }, [active, run, visible, scene.duration, last, wide]);

  const select = (i: number) => {
    if (i !== active) setClosing(active);
    setActive(i);
    setRun((r) => r + 1);
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
      className="flex w-full flex-col bg-[#f3e7d3] p-[0.5px] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] min-[1280px]:flex-row min-[1280px]:items-start"
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
                  <IconTile path={feature.icon} on={on} />
                  <span className="flex min-w-0 flex-col">
                    <span
                      className={cn(
                        "font-serif text-[22px] leading-[1.1] tracking-[-0.88px] transition-colors duration-300 ease-out",
                        on ? "text-[#040404]" : "text-[#040404]/40",
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
                        <span className="block max-w-[462.865px] pt-2 font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
                          {feature.description}
                        </span>
                      </span>
                    </span>
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
                          scene={upsellCameraScenes[feature.scene]}
                          active={visible && on}
                          root={SellCameraMotionRoot}
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
                  )}
                />
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
        {wide !== false && (
          <div key={`${active}-${run}`} className="absolute inset-0 transition-opacity duration-300 ease-out starting:opacity-0">
            <ScenePanel scene={scene} active={visible} root={SellCameraMotionRoot} maxScale={Infinity} transform />
          </div>
        )}
      </div>
    </div>
  );
}
