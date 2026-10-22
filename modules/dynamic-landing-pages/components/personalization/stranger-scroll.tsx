"use client";

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * An item stays open until all but this much of it has slid under the
 * heading, so the next one takes over just as the last disappears.
 */
const HANDOFF = 40;

type Item = { key: string; content: ReactNode; className?: string; rule?: string };

const ActiveItem = createContext(0);

/** The index of the item open in the StrangerScroll around this component, for a panel that follows it. */
export function useStrangerActive() {
  return useContext(ActiveItem);
}

/**
 * The home Lifecycle section's scroll behaviour (`LifecycleTabs`), for static copy beside one
 * panel. From 992px the heading sticks at the top of its column and the items scroll up beneath it,
 * fading out under its edge; the item just below the heading is at full strength (the others rest
 * at 20%), and the panel sticks beside them. When stacked, the panel is what sticks and the items
 * pass under it. The last item stays put once it reaches the heading: everything then scrolls away
 * together. With `belowHeader` both pin 48px below the fixed 72.5px site header instead of 48px
 * from the viewport top, as Lifecycle does.
 */
export function StrangerScroll({
  heading,
  items,
  panel,
  belowHeader = false,
}: {
  heading: ReactNode;
  items: Item[];
  panel: ReactNode;
  belowHeader?: boolean;
}) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const last = items.length - 1;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 992px)").matches;
      const line = ((desktop ? headingRef.current : panelRef.current)?.getBoundingClientRect().bottom ?? 0) + HANDOFF;
      // The open item is the first one still showing below the cover.
      let open = refs.current.findIndex((item) => item && item.getBoundingClientRect().bottom > line);
      if (open < 0) open = last;
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
  }, [last]);

  // The heading's sticky scope ends where the last item begins; these sizes make the panel let go at the same moment.
  useEffect(() => {
    const sync = () => {
      const head = headingRef.current;
      const side = panelRef.current;
      const list = listRef.current;
      const spacer = spacerRef.current;
      const end = refs.current[last];
      if (!head || !side || !list || !spacer || !end) return;

      if (window.matchMedia("(min-width: 992px)").matches) {
        // Heading and panel stick at the same top: the column must end where the panel does.
        const slack = side.offsetHeight - head.offsetHeight - end.offsetHeight;
        spacer.style.height = `${Math.max(0, slack)}px`;
        side.style.marginBottom = `${Math.max(0, -slack)}px`;
        list.style.marginTop = "";
      } else {
        // The panel is the cover: it lets go a whole last item early, with the list pulled back up to match.
        spacer.style.height = "0px";
        side.style.marginBottom = `${end.offsetHeight}px`;
        list.style.marginTop = `calc(var(--space-xxlarge) - ${end.offsetHeight}px)`;
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    [headingRef.current, panelRef.current, refs.current[last]].forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [last]);

  const renderItem = (item: Item, i: number) => (
    <div
      key={item.key}
      ref={(el) => {
        refs.current[i] = el;
      }}
      className="flex flex-col"
    >
      <div className={cn("transition-opacity duration-150", item.className, i !== active && "opacity-20")}>{item.content}</div>
      {item.rule && <span aria-hidden className={cn("w-full", item.rule)} />}
    </div>
  );

  return (
    <div className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      {/* Heading and list; when stacked its children join the column so the panel can sit between them. */}
      <div className="contents lg:flex lg:w-[526px] lg:shrink-0 lg:flex-col">
        {/* The heading's sticky scope: it holds every item but the last. */}
        <div className="contents lg:flex lg:flex-col">
          <div
            ref={headingRef}
            className={cn(
              "order-1 max-lg:mb-(--space-xxlarge) lg:sticky lg:z-10 lg:bg-cream",
              // Cream above the stuck heading hides items scrolled past it; a fade below softens their exit.
              "lg:before:absolute lg:before:inset-x-0 lg:before:bottom-full lg:before:bg-cream",
              belowHeader ? "lg:top-[calc(72.5px+48px)] lg:before:h-[calc(72.5px+48px)]" : "lg:top-12 lg:before:h-12",
              "lg:after:pointer-events-none lg:after:absolute lg:after:inset-x-0 lg:after:top-full lg:after:h-10 lg:after:bg-linear-to-b lg:after:from-cream lg:after:to-cream/0",
            )}
          >
            {heading}
          </div>

          {/* Figma puts the first paragraph 101px under the headline. */}
          <div ref={listRef} className="order-3 flex max-w-[520px] flex-col max-lg:mt-(--space-xxlarge) lg:ml-1.5 lg:pt-[101.3px]">
            {items.slice(0, -1).map(renderItem)}
          </div>
        </div>

        <div className="order-4 flex max-w-[520px] flex-col lg:ml-1.5">{renderItem(items[last], last)}</div>
        {/* Room after the last item so the column ends level with the panel. */}
        <div ref={spacerRef} aria-hidden className="order-5" />
      </div>

      {/* The panel stays put while the list scrolls; between heading and list, pinned to the top, when stacked. */}
      <div
        ref={panelRef}
        className={cn(
          "sticky top-0 z-10 order-2 w-full after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-10 after:bg-linear-to-b after:from-cream after:to-cream/0 lg:mt-2.5 lg:w-[687px] lg:shrink lg:after:hidden",
          belowHeader ? "lg:top-[calc(72.5px+48px)]" : "lg:top-12",
        )}
      >
        <ActiveItem value={active}>{panel}</ActiveItem>
      </div>
    </div>
  );
}
