"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { type LifecycleFeature, lifecycleStages } from "../../config/lifecycle";

// Trims the line box to cap height → baseline, as Figma lays these out.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

/** How long each feature stays open before the tabs advance. */
const DURATION = 6000;

/** Every feature in order; the rotation steps through these. */
const items = lifecycleStages.flatMap((stage, s) =>
  stage.features.map((_, f) => ({ stage: s, index: f, count: stage.features.length })),
);

function Feature({ feature, active }: { feature: LifecycleFeature; active: boolean }) {
  return (
    <div className={cn("flex flex-col items-start gap-6 transition-opacity duration-300", !active && "opacity-50")}>
      <div className="flex w-full flex-col items-start gap-4">
        <p className="flex h-[23px] items-center bg-[#ffeec2] p-[6.5px] outline-[0.5px] -outline-offset-[0.5px] outline-black/40 outline-solid">
          <span
            className={cn(
              "font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] whitespace-nowrap text-[#66645e] uppercase",
              trimToCaps,
            )}
          >
            {feature.label}
          </span>
        </p>
        <h3 className="font-serif text-(length:--h5-size) leading-[1.1] font-light tracking-[-0.04em] text-[#040404]">
          {feature.title}
        </h3>
        <p className="w-full text-base leading-6 tracking-[-0.32px] text-black/60">{feature.body}</p>
      </div>
      <Link
        href={feature.href}
        className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-colors hover:text-black"
      >
        LEARN MORE
        <Image src={arrowRight} alt="" className="size-3" />
      </Link>
    </div>
  );
}

/**
 * Auto-rotating accordion of lifecycle stages. Steps through every feature in
 * order while each stage's progress line fills across its features. Pauses on
 * keyboard focus and while off-screen; no rotation with reduced motion.
 */
export function StageList() {
  const id = useId();
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);
  const paused = useRef(false);
  const inView = useRef(true);
  const elapsed = useRef(0);
  const reduce = useRef(false);

  const progress = useCallback((fraction: number) => {
    const item = items[currentRef.current];
    bars.current.forEach((bar, s) => {
      if (bar) bar.style.width = `${s === item.stage ? ((item.index + fraction) / item.count) * 100 : 0}%`;
    });
  }, []);

  const activate = useCallback(
    (i: number) => {
      const next = (i + items.length) % items.length;
      currentRef.current = next;
      elapsed.current = 0;
      setCurrent(next);
      progress(reduce.current ? 1 : 0);
    },
    [progress],
  );

  // Rotation clock.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    progress(reduce.current ? 1 : 0);

    let frame = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last === null ? 0 : now - last;
      last = now;
      if (paused.current || !inView.current || reduce.current) return;
      elapsed.current += dt;
      if (elapsed.current >= DURATION) activate(currentRef.current + 1);
      else progress(elapsed.current / DURATION);
    };
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => (inView.current = entry.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activate, progress]);

  // Reserve the tallest stage's height so the page below never jumps.
  useEffect(() => {
    const steady = () => {
      const list = listRef.current;
      if (!list) return;
      list.style.minHeight = "";
      const open = bodies.current[items[currentRef.current].stage];
      const base = list.offsetHeight - (open?.offsetHeight ?? 0);
      const tallest = Math.max(0, ...bodies.current.map((body) => body?.offsetHeight ?? 0));
      list.style.minHeight = `${base + tallest}px`;
    };
    steady();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(steady, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const keyboardFocusInside = () => {
    try {
      return !!rootRef.current?.querySelector(":focus-visible");
    } catch {
      return !!rootRef.current?.contains(document.activeElement);
    }
  };

  const item = items[current];

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col items-start lg:w-[462.865px] lg:shrink-0 lg:pt-8 lg:pb-12"
      onFocus={() => {
        if (keyboardFocusInside()) paused.current = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) paused.current = false;
      }}
    >
      <div ref={listRef} className="flex w-full flex-col gap-8">
        {lifecycleStages.map((stage, s) => {
          const on = s === item.stage;
          const tabId = `${id}-tab-${s}`;
          const panelId = `${id}-panel-${s}`;

          return (
            <div key={stage.number} className={cn("flex flex-col transition-opacity duration-300", !on && "opacity-50")}>
              <button
                type="button"
                id={tabId}
                aria-expanded={on}
                aria-controls={panelId}
                onClick={() => activate(items.findIndex((it) => it.stage === s))}
                className="flex w-full cursor-pointer flex-col items-stretch gap-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
              >
                <span className="flex h-9 w-full items-baseline gap-4 leading-[1.1] whitespace-nowrap">
                  <span
                    className={cn(
                      "w-6 flex-none font-calligraphy text-[48px] tracking-[-2.4px] transition-colors duration-300",
                      trimToCaps,
                      on ? "text-maroon" : "text-[#353535]",
                    )}
                  >
                    {stage.number}
                  </span>
                  <span className="font-serif text-[22px] tracking-[-1.1px] text-ink uppercase">{stage.name}</span>
                </span>
                <span className="flex h-px w-full items-center">
                  <span
                    ref={(el) => {
                      bars.current[s] = el;
                    }}
                    className="h-[2px] w-0 flex-none bg-maroon"
                  />
                  <span className="h-px flex-1 bg-black/20" />
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={tabId}
                className={cn(
                  "-mx-1.5 grid transition-[grid-template-rows,visibility] duration-450 ease-[ease]",
                  on ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden px-1.5">
                  <div
                    ref={(el) => {
                      bodies.current[s] = el;
                    }}
                    className="flex flex-col gap-16 pt-8 pb-1.5 lg:gap-[120px]"
                  >
                    {stage.features.map((feature, f) => (
                      <Feature key={feature.title} feature={feature} active={on && f === item.index} />
                    ))}
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
