"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { tabTurn } from "@/lib/use-autoplay-tabs";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import stagePhoto from "../../assets/adaptive/stage-photo.webp";
import { type AdaptiveId, adaptiveFeatures } from "../../config/adaptive";
import { DlpMotionRoot, dlpScenes } from "../motion/dlp-motion";

/** How long each feature stays up before the next one takes over: its motion visual's run plus the hold. */
const turns = adaptiveFeatures.map((feature) => tabTurn(dlpScenes[feature.scene].duration));

/**
 * Each feature's glyph, from Figma (1.1px round strokes), with the centre of its bounding box: the marks are drawn
 * centred on their tile, which Figma's exports miss by 0.3–1px.
 */
const glyphs: Record<AdaptiveId, { paths: string[]; center: [number, number] }> = {
  ask: {
    paths: [
      "M12.5978 7.21133C9.3119 7.21133 6.62344 9.35214 6.62344 11.9908C6.62344 13.4844 7.46981 14.7789 8.81404 15.675L8.11703 18.1643L10.7059 16.8201C11.3034 16.9695 11.9506 17.069 12.5978 17.069C15.8837 17.069 18.5722 14.9282 18.5722 12.2895C18.5722 9.65086 15.8837 7.21133 12.5978 7.21133Z",
      "M12.5954 9.94961L13.1928 11.3436L14.5868 11.9411L13.1928 12.5385L12.5954 13.9325L11.9979 12.5385L10.6039 11.9411L11.9979 11.3436L12.5954 9.94961Z",
    ],
    center: [12.598, 12.688],
  },
  gist: {
    paths: ["M6.125 7.14648H15.499M6.125 9.95869H15.499M6.125 12.7709H12.6868M6.125 15.5831H10.3433"],
    center: [10.812, 11.365],
  },
  direct: {
    paths: [
      "M13.6242 9.95859C13.6242 12.0294 11.9455 13.7082 9.8746 13.7082C7.80375 13.7082 6.125 12.0294 6.125 9.95859C6.125 7.88774 7.80375 6.20898 9.8746 6.20898C11.9455 6.20898 13.6242 7.88774 13.6242 9.95859Z",
      "M12.6875 12.7695L15.9684 16.0504",
    ],
    center: [11.047, 11.13],
  },
  upsell: {
    paths: [
      "M5.1875 6.20898H6.5936L7.9997 12.7708H14.5615L15.9676 8.08379H7.531",
      "M9.64048 15.1132C9.64048 15.5015 9.32571 15.8163 8.93743 15.8163C8.54914 15.8163 8.23438 15.5015 8.23438 15.1132C8.23438 14.7249 8.54914 14.4102 8.93743 14.4102C9.32571 14.4102 9.64048 14.7249 9.64048 15.1132Z",
      "M14.328 15.1132C14.328 15.5015 14.0132 15.8163 13.6249 15.8163C13.2366 15.8163 12.9219 15.5015 12.9219 15.1132C12.9219 14.7249 13.2366 14.4102 13.6249 14.4102C14.0132 14.4102 14.328 14.7249 14.328 15.1132Z",
      "M11.2811 8.55273V9.95884M11.2811 9.95884V11.3649M11.2811 9.95884H9.875M11.2811 9.95884H12.6872",
    ],
    center: [10.578, 11.013],
  },
};

function Glyph({ id, at, color }: { id: AdaptiveId; at: number; color: string }) {
  const { paths, center } = glyphs[id];
  return (
    <g transform={`translate(${at - center[0]} ${at - center[1]})`} stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

/**
 * Each feature's mark, from Figma (3257:37821, 3257:37835): a tile with a fine diamond and a dot in each corner. The
 * active one is a 22px maroon tile, its glyph, diamond and dots in gold, with a 0.55px #efe9db ring around it; the rest
 * are a 0.688px black/19 frame (0.688px in) around a 20.625px tile, the glyph in #cfcabe and the diamond and dots in
 * black/16.
 */
function Mark({ id, on }: { id: AdaptiveId; on: boolean }) {
  if (on) {
    return (
      <span aria-hidden className="block size-[22px] shrink-0 bg-[#7d0034] shadow-[0_0_0_0.55px_#efe9db]">
        <svg viewBox="1.1 1.1 22 22" fill="none" className="block size-[22px]">
          <Glyph id={id} at={12.1} color="#ffb657" />
          <path d="M12.1 -4.62437L28.8231 12.0987L12.1 28.8218L-4.62308 12.0987L12.1 -4.62437Z" stroke="#ffb657" strokeWidth="0.55" />
          {[
            [2.19688, 2.20078],
            [22.0016, 2.20078],
            [22.0016, 21.9996],
            [2.19688, 21.9996],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.55" fill="#ffb657" />
          ))}
        </svg>
      </span>
    );
  }
  return (
    <span aria-hidden className="block shrink-0 border-[0.688px] border-black/19 p-[0.688px]">
      <svg viewBox="0 0 20.625 20.625" fill="none" className="block size-[20.625px]">
        <Glyph id={id} at={10.3125} color="#cfcabe" />
        <rect
          x="10.3125"
          y="-5.36568"
          width="22.1719"
          height="22.1719"
          transform="rotate(45 10.3125 -5.36568)"
          stroke="black"
          strokeOpacity="0.16"
          strokeWidth="0.515625"
        />
        {[
          [1.03125, 1.03125],
          [19.5938, 1.03125],
          [19.5938, 19.5938],
          [1.03125, 19.5938],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.515625" fill="black" fillOpacity="0.16" />
        ))}
      </svg>
    </span>
  );
}

/**
 * Figma "Library · Stage + triggers" (Adaptive product pages): the stage (738px wide), playing the
 * chosen feature's motion visual (Sell: Dynamic v2 10–13, a product page on the stage photo, 738 × 760),
 * beside a column of four feature tabs on #ddd rules, each 40px in: its mark, then a Crimson 20 title over a
 * line of Open Sans 14, 16px from the mark. The active tab sits on sand with its mark in gold on
 * maroon; the rest rest at 50%, full on hover. The tabs take turns on a timer, a 2px maroon bar
 * filling across the active tab's top edge over that feature's visual (its run plus a short hold),
 * then the next takes over (looping); choosing a tab restarts it and its visual.
 *
 * From 1260px the photo (up to 738px, at most 60% of the row) sits beside the tabs; below that,
 * where the tabs would be squeezed into a sliver, the photo stacks over them at the visual's 738:760 shape,
 * and under 768px the tabs pad 24px in rather than 40px.
 *
 * As the guidelines ask (P1, P7, 11.6), the cycle pauses off screen, while a mouse is over the tab
 * column, and while a tab has keyboard focus. A click doesn't count as focus here, so choosing a tab
 * with the mouse never leaves the cycle stuck. Under reduced motion the bar sits full and nothing
 * advances.
 */
export function AdaptiveTabs() {
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
    const last = adaptiveFeatures.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
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
    <div ref={root} className="flex w-full flex-col min-[1260px]:flex-row min-[1260px]:items-stretch">
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="relative aspect-[738/760] w-full overflow-hidden min-[1260px]:aspect-auto min-[1260px]:w-[min(738px,60%)] min-[1260px]:shrink-0"
      >
        {/* The bare stage under the visual, until it draws (the visual sits on the same photo). */}
        <Image src={stagePhoto} alt="" fill sizes="(min-width: 1260px) 738px, 100vw" className="object-cover" />
        {/*
          The chosen feature's visual, keyed to play from the start each time it is chosen. It covers the stage: beside
          the tabs, the stage takes the tab column's height, so the visual's photo margins give way rather than leave a band.
        */}
        <ScenePanel key={run} scene={dlpScenes[adaptiveFeatures[active].scene]} root={DlpMotionRoot} cover />
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Adaptive product page components"
        onKeyDown={onKeyDown}
        onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
        className="group/tabs flex min-w-0 flex-1 flex-col"
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
                // Each tab draws its top and sides; the last closes the column at the bottom.
                "group relative flex cursor-pointer items-start gap-4 border-x border-t border-[#ddd] p-6 text-left md:p-10 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] last:border-b focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                selected ? "bg-sand" : "hover:bg-sand/40",
              )}
            >
              <Mark id={feature.id} on={selected} />
              <span
                className={cn(
                  "flex max-w-[424px] flex-col items-start gap-2.5 transition-opacity duration-300",
                  !selected && "opacity-50 group-hover:opacity-100",
                )}
              >
                <span className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{feature.title}</span>
                <span className="font-sans text-[14px] leading-5 tracking-[-0.42px] text-black/59">{feature.description}</span>
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  data-paused={!running || undefined}
                  onAnimationEnd={() => select(active === adaptiveFeatures.length - 1 ? 0 : active + 1)}
                  className="pointer-events-none absolute -top-[1.01px] -left-[1.01px] z-3 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-maroon group-hover/tabs:[animation-play-state:paused] data-paused:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                  style={{ animationDuration: `${turns[i]}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
