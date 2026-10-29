"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import panelArt from "../../assets/upsell/panel-aubergine.webp";
import { upsellFeatures } from "../../config/upsell";
import { ScenePanel } from "../motion/scene-panel";
import { upsellScenes } from "../motion/upsell";

/** How long each feature stays open before the next one takes over, at least. */
const DURATION_MS = 6000;

/** How long a feature's scene holds once it has played out, before the next takes over. */
const HOLD_MS = 2500;

/**
 * Figma's 24px icon tile: a 0.75px border (black/30 open, black/19 otherwise) around the 22.5px tile, its line glyph
 * (maroon open, black/40 otherwise) under a rotated square and four corner dots (black/30 open, black/16 otherwise).
 */
function IconTile({ path, on }: { path: string; on: boolean }) {
  const deco = on ? 0.3 : 0.16;
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center border-[0.75px] p-[0.75px] transition-colors duration-300 ease-out",
        on ? "border-black/30" : "border-black/19",
      )}
    >
      <svg
        width="22.5"
        height="22.5"
        viewBox="0 0 22.5 22.5"
        fill="none"
        // The glyph's and marks' colours ease with the tile's border.
        className="block overflow-hidden *:transition-[stroke,stroke-opacity,fill-opacity] *:duration-300 *:ease-out"
      >
        <path
          d={path}
          stroke={on ? "#8C1F3D" : "black"}
          strokeOpacity={on ? 1 : 0.4}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="11.25"
          y="-5.85341"
          width="24.1875"
          height="24.1875"
          transform="rotate(45 11.25 -5.85341)"
          stroke="black"
          strokeOpacity={deco}
          strokeWidth="0.5625"
        />
        {[
          [1.125, 1.125],
          [21.375, 1.125],
          [21.375, 21.375],
          [1.125, 21.375],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.5625" fill="black" fillOpacity={deco} />
        ))}
      </svg>
    </span>
  );
}

/**
 * Figma "Layout" (Upsell & cross-sell, node 2914:36238): one sand panel (#f3e7d3, 0.5px black/25 border) with the
 * features as a list in the 596px left column and, on the right, the 687 × 586 aubergine damask panel playing the
 * open feature's chat scene. The list (centred under 40px top padding, 42px in from both sides, so its rules end as
 * far from the panel as they start from the card's edge) is 49px from row to rule: the open feature shows its tile, Crimson Light 24 title and line of Geist 16 (8px under it), its rule
 * 24px below; the others are their tile and title at 40%. Every rule is black/20. The features take turns on a
 * timer (long enough for each scene to play out and hold) while the section is on screen; choosing one restarts its
 * timer. Side by side from 1280px; narrower, the list sits over the panel, which spans the width.
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

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hands over to the next feature once this one's scene has played out and held; never with reduced motion.
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setActive((a) => (a === last ? 0 : a + 1)),
      Math.max(DURATION_MS, scene.duration + HOLD_MS),
    );
    return () => window.clearTimeout(timer);
  }, [active, run, visible, scene.duration, last]);

  const select = (i: number) => {
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
      <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch px-6 py-8 md:px-10 md:py-10 min-[1280px]:items-start min-[1280px]:pt-10 min-[1280px]:pr-[42px] min-[1280px]:pb-0 min-[1280px]:pl-[42px]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Upsell and cross-sell features"
          onKeyDown={onKeyDown}
          className="flex w-full flex-col gap-[49px]"
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
                    "flex w-full items-start gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                    on ? "cursor-default" : "cursor-pointer",
                  )}
                >
                  {/* Top-aligned with the open title, centred on a closed one's 26px title box (1px down), easing between. */}
                  <span className={cn("flex transition-[margin] duration-300 ease-out", !on && "mt-px")}>
                    <IconTile path={feature.icon} on={on} />
                  </span>
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
                  Each rule is a zero-height line with its 0.5px stroke centred on it, as Figma draws them: the open
                  feature's sits in a 1px box 24px under its copy, the others' 49px under their row. The last is not
                  drawn. Stacked over the panel (below 1280px), the rules run past the list's padding to the panel's
                  edges, so they span the same width as the panel under them.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "h-0 transition-[margin] duration-300 ease-out max-[1279px]:-mx-6 md:max-[1279px]:-mx-10",
                    on ? "mt-[24.5px] mb-[0.5px]" : "mt-[49px] mb-0",
                    i !== last && "shadow-[0_0_0_0.25px_rgba(0,0,0,0.2)]",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/*
        Figma's 687 × 586 panel art (aubergine damask, gold notched frame, four studs) with the scene at its drawn size,
        centred. Side by side it runs 4px past the card's right edge, over its border, as in Figma (0.5 + 596 + 687 =
        1283.5 of 1280), which leaves the list column its 596px.
      */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="relative aspect-[687/586] w-full shrink-0 overflow-hidden bg-[#462160] min-[1280px]:-mr-1 min-[1280px]:w-[687px]"
      >
        <Image src={panelArt} alt="" fill sizes="(min-width: 1280px) 687px, 100vw" className="object-cover" />
        {/* Each scene fades in over the art as its feature opens, rather than cutting in. */}
        <div key={`${active}-${run}`} className="absolute inset-0 transition-opacity duration-300 ease-out starting:opacity-0">
          <ScenePanel scene={scene} active={visible} padding={20} />
        </div>
      </div>
    </div>
  );
}
