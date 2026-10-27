"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import panelArt from "@/modules/sell/assets/upsell/panel-aubergine.webp";
import type { LoggedInQuote } from "../../config/logged-in";

/**
 * A quote stays open until all but this much of it has slid under the
 * heading, so the next one takes over just as the last disappears.
 */
const HANDOFF = 40;

/**
 * The customer quotes as a scroll-driven list beside one sticky panel, as Conversion assistance on Sell
 * (AssistList): from 1313px the heading sticks at the top of its column and the quotes scroll up beneath
 * it, fading out under its edge; the quote just below the heading is open (full strength, the others at
 * 20%), each 48px top and bottom with a 1px black/10 rule under it and 16px between the quote and its
 * copy. When stacked, the panel is what sticks and the quotes pass under it. Clicking a quote scrolls it
 * open. The panel is Figma's 687 × 586 aubergine damask (the Upsell art), a placeholder for motion scenes.
 */
export function QuoteTabs({ heading, quotes }: { heading: ReactNode; quotes: LoggedInQuote[] }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const last = quotes.length - 1;

  /** Where quotes disappear: under the heading from 1313px, under the panel below that. */
  const coverLine = () => {
    const desktop = window.matchMedia("(min-width: 1313px)").matches;
    return (desktop ? headingRef.current : panelRef.current)?.getBoundingClientRect().bottom ?? 0;
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = coverLine() + HANDOFF;
      // The open quote is the first one still showing below the cover.
      let open = items.current.findIndex((item) => item && item.getBoundingClientRect().bottom > line);
      if (open < 0) open = quotes.length - 1;
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
   * The last quote stays put once it reaches the cover: everything then scrolls
   * away together. The heading's sticky scope ends where the last quote begins,
   * so it lets go just as that quote lands beneath it; these sizes make the
   * panel let go at the same moment.
   */
  useEffect(() => {
    const sync = () => {
      const head = headingRef.current;
      const panel = panelRef.current;
      const list = listRef.current;
      const spacer = spacerRef.current;
      const end = items.current[quotes.length - 1];
      if (!head || !panel || !list || !spacer || !end) return;

      if (window.matchMedia("(min-width: 1313px)").matches) {
        // Heading and panel stick at the same top: the column must end where the panel does.
        const slack = panel.offsetHeight - head.offsetHeight - end.offsetHeight;
        spacer.style.height = `${Math.max(0, slack)}px`;
        panel.style.marginBottom = `${Math.max(0, -slack)}px`;
        list.style.marginTop = "";
      } else {
        // The panel is the cover: it lets go a whole last quote early, with the list pulled back up to match.
        spacer.style.height = "0px";
        panel.style.marginBottom = `${end.offsetHeight}px`;
        list.style.marginTop = `calc(var(--space-xxlarge) - ${end.offsetHeight}px)`;
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    [headingRef.current, panelRef.current, items.current[quotes.length - 1]].forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  /** Scrolls quote `i` up to just below the cover, which opens it. */
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
    const item = quotes[i];
    const on = i === active;
    return (
      <div
        key={item.quote}
        ref={(el) => {
          items.current[i] = el;
        }}
        className="flex flex-col"
      >
        <div className={cn("flex flex-col items-start gap-4 py-12 transition-opacity duration-150", !on && "opacity-20")}>
          <button
            type="button"
            aria-expanded={on}
            onClick={() => open(i)}
            className={cn(
              "w-full text-left font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-[#040404] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
              on ? "cursor-default" : "cursor-pointer",
            )}
          >
            {item.quote}
          </button>
          <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{item.description}</p>
        </div>
        <div className="h-px w-full bg-black/10" />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col min-[1313px]:flex-row min-[1313px]:items-start min-[1313px]:justify-between min-[1313px]:gap-12">
      {/* Heading and list; when stacked its children join the column so the panel can sit between them. */}
      <div className="contents min-[1313px]:flex min-[1313px]:w-[min(553.133px,48%)] min-[1313px]:shrink-0 min-[1313px]:flex-col">
        {/* The heading's sticky scope: it holds every quote but the last. */}
        <div className="contents min-[1313px]:flex min-[1313px]:flex-col">
          <div
            ref={headingRef}
            className={cn(
              "relative order-1 max-[1313px]:mb-(--space-xxlarge) min-[1313px]:sticky min-[1313px]:top-[calc(72.5px+48px)] min-[1313px]:z-10 min-[1313px]:bg-cream",
              // Pinned 48px below the fixed 72.5px site header. Cream above the stuck heading hides quotes scrolled past it; a fade below softens their exit.
              "min-[1313px]:before:absolute min-[1313px]:before:inset-x-0 min-[1313px]:before:bottom-full min-[1313px]:before:h-[calc(72.5px+48px)] min-[1313px]:before:bg-cream",
              "min-[1313px]:after:pointer-events-none min-[1313px]:after:absolute min-[1313px]:after:inset-x-0 min-[1313px]:after:top-full min-[1313px]:after:h-10 min-[1313px]:after:bg-linear-to-b min-[1313px]:after:from-cream min-[1313px]:after:to-cream/0",
            )}
          >
            {/* 32px below the heading, then the quote's own 48px top padding, as on Sell. */}
            <div className="min-[1313px]:pb-8">{heading}</div>
          </div>

          <div ref={listRef} className="order-3 flex flex-col max-[1313px]:mt-(--space-xxlarge)">
            {quotes.slice(0, -1).map((_, i) => renderItem(i))}
          </div>
        </div>

        <div className="order-4 flex flex-col">{renderItem(last)}</div>
        {/* Room after the last quote so the column ends level with the panel. */}
        <div ref={spacerRef} aria-hidden className="order-5" />
      </div>

      {/*
        The panel stays put while the list scrolls; between heading and list when stacked, pinned 24px below the fixed
        72.5px site header (that gap filled with cream), with a 64px fade under it so the quotes fade out before reaching it.
      */}
      <div
        ref={panelRef}
        className="sticky top-[calc(72.5px+24px)] z-10 order-2 w-full bg-cream before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-6 before:bg-cream min-[1313px]:before:hidden after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-16 after:bg-linear-to-b after:from-cream after:from-25% after:to-cream/0 min-[1313px]:top-[calc(72.5px+48px)] min-[1313px]:w-auto min-[1313px]:max-w-[687px] min-[1313px]:min-w-0 min-[1313px]:flex-1 min-[1313px]:bg-transparent min-[1313px]:after:hidden"
      >
        <div className="relative mx-auto aspect-[687/586] w-full max-w-[calc((100svh-72.5px-48px)*687/586)] overflow-hidden bg-[#462160] min-[1313px]:max-w-none">
          <Image src={panelArt} alt="" fill sizes="(min-width: 1313px) 687px, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
