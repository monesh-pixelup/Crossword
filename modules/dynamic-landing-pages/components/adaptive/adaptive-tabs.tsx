"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import stagePhoto from "../../assets/adaptive/stage-photo.webp";
import { type AdaptiveId, adaptiveFeatures } from "../../config/adaptive";

/** How long each feature stays up before the next one takes over (the guidelines' `--dur-ambient`). */
const DURATION_MS = 6000;

/** Each feature's mark, from Figma: drawn in maroon on a bordered tile, or gold on maroon when active. */
const icons: Record<AdaptiveId, { viewBox: string; paths: string[] }> = {
  ask: {
    viewBox: "1.1 1.1 22 22",
    paths: [
      "M12.5978 7.21041C9.3119 7.21041 6.62344 9.35123 6.62344 11.9899C6.62344 13.4835 7.46981 14.7779 8.81404 15.6741L8.11703 18.1634L10.7059 16.8192C11.3034 16.9685 11.9506 17.0681 12.5978 17.0681C15.8837 17.0681 18.5722 14.9273 18.5722 12.2886C18.5722 9.64994 15.8837 7.21041 12.5978 7.21041Z",
      "M12.5954 9.94866L13.1928 11.3427L14.5868 11.9401L13.1928 12.5376L12.5954 13.9316L11.9979 12.5376L10.6039 11.9401L11.9979 11.3427L12.5954 9.94866Z",
    ],
  },
  gist: { viewBox: "0 0 20.625 20.625", paths: ["M6.125 7.14612H15.499M6.125 9.95832H15.499M6.125 12.7705H12.6868M6.125 15.5827H10.3433"] },
  direct: {
    viewBox: "0 0 20.625 20.625",
    paths: [
      "M9.8746 13.7079C11.9455 13.7079 13.6242 12.0291 13.6242 9.95828C13.6242 7.88743 11.9455 6.20868 9.8746 6.20868C7.80375 6.20868 6.125 7.88743 6.125 9.95828C6.125 12.0291 7.80375 13.7079 9.8746 13.7079Z",
      "M12.6875 12.7705L15.9684 16.0514",
    ],
  },
  upsell: {
    viewBox: "0 0 20.625 20.625",
    paths: [
      "M5.1873 6.20869H6.5934L7.9995 12.7705H14.5613L15.9674 8.08349H7.5308",
      "M8.93743 15.817C9.32571 15.817 9.64048 15.5022 9.64048 15.1139C9.64048 14.7257 9.32571 14.4109 8.93743 14.4109C8.54914 14.4109 8.23438 14.7257 8.23438 15.1139C8.23438 15.5022 8.54914 15.817 8.93743 15.817Z",
      "M13.6249 15.817C14.0132 15.817 14.328 15.5022 14.328 15.1139C14.328 14.7257 14.0132 14.4109 13.6249 14.4109C13.2366 14.4109 12.9219 14.7257 12.9219 15.1139C12.9219 15.5022 13.2366 15.817 13.6249 15.817Z",
      "M11.2811 8.55225V11.3644M9.875 9.95835H12.6872",
    ],
  },
};

function Mark({ id, on }: { id: AdaptiveId; on: boolean }) {
  const { viewBox, paths } = icons[id];
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-[22px] shrink-0 items-center justify-center transition-colors duration-300",
        on ? "bg-maroon text-[#ffb657] shadow-[0_1px_1px_rgba(0,0,0,0.12)]" : "text-[#8c1f3d] shadow-[inset_0_0_0_0.688px_rgba(0,0,0,0.19)]",
      )}
    >
      <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="size-[20.625px]">
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

/**
 * Figma "Library · Stage + triggers" (Adaptive product pages): the stage photo (738px wide) beside a
 * column of four feature tabs on #ddd rules, each 40px in: its mark, then a Crimson 20 title over a
 * line of Open Sans 14, 16px from the mark. The active tab sits on sand with its mark in gold on
 * maroon; the rest rest at 50%, full on hover. The tabs take turns on a timer, a 2px maroon bar
 * filling across the active tab's top edge, then the next takes over (looping); choosing a tab
 * restarts it.
 *
 * From 1260px the photo (up to 738px, at most 60% of the row) sits beside the tabs; below that,
 * where the tabs would be squeezed into a sliver, the photo stacks over them at its 738:786 shape,
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
        className="relative aspect-[738/786] w-full overflow-hidden min-[1260px]:aspect-auto min-[1260px]:w-[min(738px,60%)] min-[1260px]:shrink-0"
      >
        <Image src={stagePhoto} alt="" fill sizes="(min-width: 1260px) 738px, 100vw" className="object-cover" />
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
                <span className="font-open-sans text-[14px] leading-5 tracking-[-0.42px] text-black/59">{feature.description}</span>
              </span>
              {selected && (
                <span
                  key={run}
                  aria-hidden
                  data-paused={!running || undefined}
                  onAnimationEnd={() => select(active === adaptiveFeatures.length - 1 ? 0 : active + 1)}
                  className="pointer-events-none absolute -top-[1.01px] -left-[1.01px] z-3 h-0.5 w-0 animate-[insights-progress_linear_forwards] bg-maroon group-hover/tabs:[animation-play-state:paused] data-paused:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
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
