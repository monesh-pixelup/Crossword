"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { lifecycleStages } from "../../config/lifecycle";
import { LifecyclePanel } from "../motion/panels";

// Trims the line box to cap height → baseline, as Figma lays these out.
const trimToCaps = "[text-box:trim-both_cap_alphabetic]";

/** Every feature in order (Sell's sub tabs, then Support, then Retain): one list item each. */
const steps = lifecycleStages.flatMap((stage, s) =>
  stage.features.map((feature, f) => ({ stage, first: f === 0, feature, key: `${s}-${f}` })),
);

/**
 * An item stays open until all but this much of it has slid under the
 * heading, so the next one takes over just as the last disappears.
 */
const HANDOFF = 40;

/**
 * Lifecycle features as a scroll-driven list beside one sticky mock-up, after
 * Calendly's "A better way to book your meetings". From 992px the heading
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
  const [seen, setSeen] = useState(false);
  const activeRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  /** Where items disappear: under the heading from 992px, under the mock-up below that. */
  const coverLine = () => {
    const desktop = window.matchMedia("(min-width: 992px)").matches;
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

    // Visuals wait until the section is first on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.2 },
    );
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
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

      if (window.matchMedia("(min-width: 992px)").matches) {
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
            {/* Each stage opens with its number and name. */}
            {step.first && (
              <span className="mb-4 flex h-9 w-full items-baseline gap-4 leading-[1.1] whitespace-nowrap">
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
            <span className="font-serif text-(length:--h5-size) leading-[1.1] font-light tracking-[-0.04em] text-[#040404]">
              {feature.title}
            </span>
          </button>
          <p className="-mt-2 w-full text-base leading-6 tracking-[-0.32px] text-black/60">{feature.body}</p>
          <Link
            href={feature.href}
            className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-colors hover:text-black"
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
      className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12"
    >
      {/* Heading and list; when stacked its children join the column so the mock-up can sit between them. */}
      <div className="contents lg:flex lg:w-[483.867px] lg:shrink-0 lg:flex-col">
        {/* The heading's sticky scope: it holds every item but the last. */}
        <div className="contents lg:flex lg:flex-col">
          <div
            ref={headingRef}
            className={cn(
              "order-1 max-lg:mb-(--space-xxlarge) lg:sticky lg:top-12 lg:z-10 lg:bg-cream",
              // Cream above the stuck heading hides items scrolled past it; a fade below softens their exit.
              "lg:before:absolute lg:before:inset-x-0 lg:before:bottom-full lg:before:h-12 lg:before:bg-cream",
              "lg:after:pointer-events-none lg:after:absolute lg:after:inset-x-0 lg:after:top-full lg:after:h-10 lg:after:bg-linear-to-b lg:after:from-cream lg:after:to-cream/0",
            )}
          >
            <div className="lg:border-b lg:border-black/10 lg:pb-12">{heading}</div>
          </div>

          <div ref={listRef} className="order-3 flex flex-col max-lg:mt-(--space-xxlarge) lg:pt-16">
            {steps.slice(0, -1).map((_, i) => renderItem(i))}
          </div>
        </div>

        <div className="order-4 flex flex-col">{renderItem(steps.length - 1)}</div>
        {/* Room after the last item so the column ends level with the mock-up. */}
        <div ref={spacerRef} aria-hidden className="order-5" />
      </div>

      {/* The mock-up stays put while the list scrolls; between heading and list, pinned to the top, when stacked. */}
      <div
        ref={panelRef}
        className="@container sticky top-0 z-10 order-2 w-full after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-10 after:bg-linear-to-b after:from-cream after:to-cream/0 lg:top-12 lg:w-auto lg:min-w-0 lg:flex-1 lg:after:hidden"
      >
        <LifecyclePanel visual={steps[active].feature.visual} run={run} play={seen} />
      </div>
    </div>
  );
}
