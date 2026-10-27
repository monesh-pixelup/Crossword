"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { lifecycleStages } from "../../config/lifecycle";
import { LifecyclePanel } from "../motion/panels";

// Trims the line box to cap height → baseline, as Figma lays these out.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

/** Every feature in order (Sell's sub tabs, then Support, then Retain): one list item each. */
const steps = lifecycleStages.flatMap((stage, s) =>
  stage.features.map((feature, f) => ({ stage, stageIndex: s, first: f === 0, feature, key: `${s}-${f}` })),
);

/**
 * An item stays open until all but this much of it has slid under the
 * heading, so the next one takes over just as the last disappears.
 */
const HANDOFF = 40;

/**
 * Lifecycle features as a scroll-driven list beside one sticky mock-up, after
 * Calendly's "A better way to book your meetings". From 1280px the heading
 * sticks at the top of its column and the items scroll up beneath it, fading
 * out under its edge; the item just below the heading is open (the others
 * rest at 20%). When stacked, the mock-up is what sticks and the items pass
 * under it. The mock-up plays the open item's motion visual, from the top
 * each time it changes. Clicking an item's title scrolls it open.
 */
export function LifecycleTabs({ heading }: { heading: ReactNode }) {
  const [active, setActive] = useState(0);
  // Bumped each time the open item changes, so its visual replays.
  const [run, setRun] = useState(0);
  const activeRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  // The pinned stage label's bar: how far the list is through the open item's stage (0–1), set per frame.
  const progressRef = useRef<HTMLSpanElement>(null);

  /** Where items disappear: under the heading from 1280px, under the mock-up below that. */
  const coverLine = () => {
    const desktop = window.matchMedia("(min-width: 1280px)").matches;
    return (desktop ? headingRef.current : panelRef.current)?.getBoundingClientRect().bottom ?? 0;
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = coverLine() + HANDOFF;
      // The open item is the first one still showing below the cover.
      let open = items.current.findIndex((item) => item && item.getBoundingClientRect().bottom > line);
      if (open < 0) open = steps.length - 1;
      // Progress through the open item's stage: the items of the stage before it, plus how far the open item has slid
      // under the cover. It starts again at the first item of each stage, so the bar resets with the label.
      const stageIndex = steps[open].stageIndex;
      const first = steps.findIndex((s) => s.stageIndex === stageIndex);
      const count = steps.filter((s) => s.stageIndex === stageIndex).length;
      const rect = items.current[open]?.getBoundingClientRect();
      // The last item never slides under the cover (everything scrolls away together once it lands), so it reads as done.
      const within =
        open === steps.length - 1
          ? 1
          : rect && rect.height > 0
            ? Math.min(1, Math.max(0, (line - rect.top) / (rect.height - HANDOFF)))
            : 0;
      const progress = Math.min(1, (open - first + Math.max(0.12, within)) / count);
      progressRef.current?.style.setProperty("--stage-progress", progress.toFixed(4));
      if (open !== activeRef.current) {
        activeRef.current = open;
        setActive(open);
        setRun((r) => r + 1);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /*
   * The last item stays put once it reaches the cover: everything then scrolls
   * away together. The heading's sticky scope ends where the last item begins,
   * so it lets go just as that item lands beneath it; these sizes make the
   * mock-up let go at the same moment.
   */
  useEffect(() => {
    const sync = () => {
      const heading = headingRef.current;
      const panel = panelRef.current;
      const list = listRef.current;
      const spacer = spacerRef.current;
      const last = items.current[steps.length - 1];
      if (!heading || !panel || !list || !spacer || !last) return;

      if (window.matchMedia("(min-width: 1280px)").matches) {
        // Heading and mock-up stick at the same top: the column must end where the mock-up does.
        const slack = panel.offsetHeight - heading.offsetHeight - last.offsetHeight;
        spacer.style.height = `${Math.max(0, slack)}px`;
        panel.style.marginBottom = `${Math.max(0, -slack)}px`;
        list.style.marginTop = "";
      } else {
        // The mock-up is the cover: it lets go a whole last item early, with the list pulled back up to match.
        spacer.style.height = "0px";
        panel.style.marginBottom = `${last.offsetHeight}px`;
        list.style.marginTop = `calc(var(--space-xxlarge) - ${last.offsetHeight}px)`;
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    [headingRef.current, panelRef.current, items.current[steps.length - 1]].forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  /** Scrolls item `i` up to just below the cover, which opens it. */
  const open = (i: number) => {
    const item = items.current[i];
    if (!item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: window.scrollY + item.getBoundingClientRect().top - coverLine(),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const renderItem = (i: number) => {
    const step = steps[i];
    const on = i === active;
    const { feature, stage } = step;
    return (
      <div
        key={step.key}
        ref={(el) => {
          items.current[i] = el;
        }}
        className="flex flex-col"
      >
        <div
          className={cn(
            "flex flex-col items-start gap-6 py-12 transition-opacity duration-150",
            !on && "opacity-20",
          )}
        >
          <button
            type="button"
            aria-expanded={on}
            onClick={() => open(i)}
            className={cn(
              "flex w-full flex-col items-start gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
              on ? "cursor-default" : "cursor-pointer",
            )}
          >
            {/* Each stage opens with its number and name; from 1280px it is pinned under the heading instead (see StageLabel). */}
            {step.first && (
              <span className="mb-4 flex h-9 w-full items-baseline gap-4 leading-[1.1] whitespace-nowrap xl:hidden">
                <span
                  className={cn(
                    "w-6 flex-none font-calligraphy text-[48px] tracking-[-2.4px] text-maroon",
                    trimToCaps,
                  )}
                >
                  {stage.number}
                </span>
                <span className="font-serif text-[22px] tracking-[-1.1px] text-ink uppercase">
                  {stage.name}
                </span>
              </span>
            )}
            <span className="flex h-[23px] items-center bg-[#ffeec2] p-[6.5px] outline-[0.5px] -outline-offset-[0.5px] outline-black/40 outline-solid">
              <span
                className={cn(
                  "font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] whitespace-nowrap text-[#66645e] uppercase",
                  trimToCaps,
                )}
              >
                {feature.label}
              </span>
            </span>
            <span className="font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-[#040404]">
              {feature.title}
            </span>
          </button>
          <p className="-mt-2 w-full text-base leading-6 tracking-[-0.32px] text-black/60">{feature.body}</p>
          <Link
            href={feature.href}
            className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
          >
            LEARN MORE
            <Image src={arrowRight} alt="" className="size-3" />
          </Link>
        </div>
        <div className="h-px w-full bg-black/10" />
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col xl:flex-row xl:items-start xl:justify-between xl:gap-12"
    >
      {/* Heading and list; when stacked its children join the column so the mock-up can sit between them. */}
      <div className="contents xl:flex xl:w-[483.867px] xl:shrink-0 xl:flex-col">
        {/* The heading's sticky scope: it holds every item but the last. */}
        <div className="contents xl:flex xl:flex-col">
          <div
            ref={headingRef}
            className={cn(
              "relative order-1 max-xl:mb-(--space-xxlarge) xl:sticky xl:top-[calc(72.5px+48px)] xl:z-10 xl:bg-cream",
              // Pinned 48px below the fixed 72.5px site header. Cream above the stuck heading hides items scrolled past it; a fade below softens their exit.
              "xl:before:absolute xl:before:inset-x-0 xl:before:bottom-full xl:before:h-[calc(72.5px+48px)] xl:before:bg-cream",
              "xl:after:pointer-events-none xl:after:absolute xl:after:inset-x-0 xl:after:top-full xl:after:h-10 xl:after:bg-linear-to-b xl:after:from-cream xl:after:to-cream/0",
            )}
          >
            {/*
              80px from the heading to the first item's text: 32px below the heading, then the item's own 48px top
              padding (the list adds none), which keeps that text clear of the 40px fade under the heading.
            */}
            <div className="xl:pb-8">
              {heading}
              <StageLabel stage={steps[active].stage} progressRef={progressRef} />
            </div>
          </div>

          <div ref={listRef} className="order-3 flex flex-col max-xl:mt-(--space-xxlarge)">
            {steps.slice(0, -1).map((_, i) => renderItem(i))}
          </div>
        </div>

        <div className="order-4 flex flex-col">{renderItem(steps.length - 1)}</div>
        {/* Room after the last item so the column ends level with the mock-up. */}
        <div ref={spacerRef} aria-hidden className="order-5" />
      </div>

      {/*
        The mock-up stays put while the list scrolls; between heading and list when stacked, pinned 16px below the
        fixed 72.5px site header, with cream over that 16px gap hiding the items scrolled past (the header's own
        cream bar hides them above it). Only the gap: any taller and it would cover the heading's last line.
      */}
      <div
        ref={panelRef}
        className="sticky top-[calc(72.5px+16px)] z-10 order-2 w-full bg-cream before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-4 before:bg-cream after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-10 after:bg-linear-to-b after:from-cream after:to-cream/0 xl:top-[calc(72.5px+48px)] xl:w-auto xl:min-w-0 xl:flex-1 xl:before:hidden xl:after:hidden"
      >
        {/* Stacked, the mock-up is capped at 60% of the viewport's height so the items below stay readable. */}
        <div className="@container mx-auto w-full max-xl:max-w-[calc(60svh*738/680)]">
          <LifecyclePanel visual={steps[active].feature.visual} run={run} />
        </div>
      </div>
    </div>
  );
}

/**
 * The open item's stage, pinned under the sticky heading from 1280px (Figma 3090:27829): its number and name over a
 * hairline whose maroon fill tracks the list through that stage. The name crossfades and the fill starts over when
 * the open item moves into the next stage.
 */
function StageLabel({
  stage,
  progressRef,
}: {
  stage: (typeof lifecycleStages)[number];
  progressRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="mt-[72px] hidden w-full flex-col gap-[23px] xl:flex" aria-live="polite">
      <span key={stage.number} className="lifecycle-stage-enter flex h-9 items-baseline gap-4 leading-[1.1] whitespace-nowrap">
        <span className={cn("w-6 flex-none font-calligraphy text-[48px] tracking-[-2.4px] text-maroon", trimToCaps)}>
          {stage.number}
        </span>
        <span className="font-serif text-[22px] tracking-[-1.1px] text-ink uppercase">{stage.name}</span>
      </span>
      <span className="relative block h-px w-full bg-black/15">
        <span
          key={stage.number}
          ref={progressRef}
          className="absolute inset-y-[-0.5px] left-0 w-full origin-left scale-x-(--stage-progress) bg-maroon transition-transform duration-150 ease-out"
          style={{ ["--stage-progress" as string]: 0.12 }}
        />
      </span>
    </div>
  );
}
