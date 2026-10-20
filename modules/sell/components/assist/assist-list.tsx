"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { assistFeatures } from "../../config/assist";

/**
 * An item stays open until all but this much of it has slid under the
 * heading, so the next one takes over just as the last disappears.
 */
const HANDOFF = 40;

/**
 * Conversion features as a scroll-driven list beside one sticky panel, as the home page's Lifecycle
 * ("Every conversation has a job to do"). From 992px the heading sticks at the top of its column and
 * the items scroll up beneath it, fading out under its edge; the item just below the heading is open
 * (full strength with a 1px black/50 rule under it, the others at 20%). When stacked, the panel is
 * what sticks and the items pass under it. The panel shows the open item's art. Clicking an item
 * scrolls it open.
 */
export function AssistList({ header }: { header: ReactNode }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const last = assistFeatures.length - 1;

  /** Where items disappear: under the heading from 992px, under the panel below that. */
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
      if (open < 0) open = assistFeatures.length - 1;
      if (open !== activeRef.current) {
        activeRef.current = open;
        setActive(open);
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
   * panel let go at the same moment.
   */
  useEffect(() => {
    const sync = () => {
      const heading = headingRef.current;
      const panel = panelRef.current;
      const list = listRef.current;
      const spacer = spacerRef.current;
      const end = items.current[assistFeatures.length - 1];
      if (!heading || !panel || !list || !spacer || !end) return;

      if (window.matchMedia("(min-width: 992px)").matches) {
        // Heading and panel stick at the same top: the column must end where the panel does.
        const slack = panel.offsetHeight - heading.offsetHeight - end.offsetHeight;
        spacer.style.height = `${Math.max(0, slack)}px`;
        panel.style.marginBottom = `${Math.max(0, -slack)}px`;
        list.style.marginTop = "";
      } else {
        // The panel is the cover: it lets go a whole last item early, with the list pulled back up to match.
        spacer.style.height = "0px";
        panel.style.marginBottom = `${end.offsetHeight}px`;
        list.style.marginTop = `calc(var(--space-xxlarge) - ${end.offsetHeight}px)`;
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    [headingRef.current, panelRef.current, items.current[assistFeatures.length - 1]].forEach((el) => el && observer.observe(el));
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
    const item = assistFeatures[i];
    const on = i === active;
    return (
      <div
        key={item.title}
        ref={(el) => {
          items.current[i] = el;
        }}
        className="flex flex-col"
      >
        <div className={cn("flex flex-col items-start gap-3 py-12 transition-opacity duration-150", !on && "opacity-20")}>
          <button
            type="button"
            aria-expanded={on}
            onClick={() => open(i)}
            className={cn(
              "w-full text-left font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] text-[#040404] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
              on ? "cursor-default" : "cursor-pointer",
            )}
          >
            {item.title}
          </button>
          {item.description && (
            <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{item.description}</p>
          )}
        </div>
        <div className={cn("w-full transition-colors duration-150", on ? "h-px bg-black/50" : "h-px bg-black/10")} />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12">
      {/* Heading and list; when stacked its children join the column so the panel can sit between them. */}
      <div className="contents lg:flex lg:w-[min(553.133px,48%)] lg:shrink-0 lg:flex-col">
        {/* The heading's sticky scope: it holds every item but the last. */}
        <div className="contents lg:flex lg:flex-col">
          <div
            ref={headingRef}
            className={cn(
              "relative order-1 max-lg:mb-(--space-xxlarge) lg:sticky lg:top-[calc(72.5px+48px)] lg:z-10 lg:bg-cream",
              // Pinned 48px below the fixed 72.5px site header. Cream above the stuck heading hides items scrolled past it; a fade below softens their exit.
              "lg:before:absolute lg:before:inset-x-0 lg:before:bottom-full lg:before:h-[calc(72.5px+48px)] lg:before:bg-cream",
              "lg:after:pointer-events-none lg:after:absolute lg:after:inset-x-0 lg:after:top-full lg:after:h-10 lg:after:bg-linear-to-b lg:after:from-cream lg:after:to-cream/0",
            )}
          >
            <div className="lg:border-b lg:border-black/10 lg:pb-12">{header}</div>
          </div>

          <div ref={listRef} className="order-3 flex flex-col max-lg:mt-(--space-xxlarge) lg:pt-16">
            {assistFeatures.slice(0, -1).map((_, i) => renderItem(i))}
          </div>
        </div>

        <div className="order-4 flex flex-col">{renderItem(last)}</div>
        {/* Room after the last item so the column ends level with the panel. */}
        <div ref={spacerRef} aria-hidden className="order-5" />
      </div>

      {/* Panel art (687 × 586 in Figma): stays put while the list scrolls; between heading and list, pinned to the top, when stacked. */}
      <div
        ref={panelRef}
        className="sticky top-0 z-10 order-2 w-full bg-cream after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-10 after:bg-linear-to-b after:from-cream after:to-cream/0 lg:top-[calc(72.5px+48px)] lg:w-auto lg:max-w-[687px] lg:min-w-0 lg:flex-1 lg:bg-transparent lg:after:hidden"
      >
        <Image
          src={assistFeatures[active].panel}
          alt=""
          sizes="(min-width: 992px) 687px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
