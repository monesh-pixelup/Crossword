"use client";

import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowActive from "../../assets/platform/arrow-active.svg";
import arrowDisabled from "../../assets/platform/arrow-disabled.svg";

type CardCarouselProps = {
  label: string;
  children: ReactNode;
  /** Positions the arrow pair (Figma places it above the cards). */
  controlsClassName?: string;
  className?: string;
};

/**
 * Horizontal, snap-scrolling card track with previous/next arrows.
 * Cards are server-rendered children; this only adds scroll behaviour.
 */
export function CardCarousel({ label, children, controlsClassName, className }: CardCarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  // On phones, cards marked `data-carousel-fit` widen just enough to be no taller than the rest.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const phone = window.matchMedia("(max-width: 767.98px)");

    const fit = () => {
      const cards = [...el.querySelectorAll<HTMLElement>("[data-carousel-card]")];
      const wide = cards.filter((card) => card.hasAttribute("data-carousel-fit"));
      const rest = cards.filter((card) => !card.hasAttribute("data-carousel-fit"));
      wide.forEach((card) => (card.style.width = ""));
      if (phone.matches && wide.length && rest.length) {
        const target = Math.max(...rest.map((card) => card.offsetHeight));
        for (const card of wide) {
          // Narrowest width at which the card's height fits the target, to the pixel.
          let lo = card.offsetWidth;
          let hi = lo * 4;
          while (hi - lo > 1) {
            const mid = (lo + hi) / 2;
            card.style.width = `${mid}px`;
            if (card.offsetHeight <= target) hi = mid;
            else lo = mid;
          }
          card.style.width = `${Math.ceil(hi)}px`;
        }
      }
      sync();
    };

    fit();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(fit, 100);
    };
    window.addEventListener("resize", onResize);
    phone.addEventListener("change", fit);
    // Text wraps differently once the web fonts arrive.
    document.fonts?.ready.then(fit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      phone.removeEventListener("change", fit);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>("[data-carousel-card]")];
    const max = el.scrollWidth - el.clientWidth;
    // Each arrow reveals the next card cut off in its direction in one click: forward aligns that
    // card's left edge; back picks the furthest-back card start that still shows it in full.
    let target: number;
    if (direction === 1) {
      const hidden = cards.find((card) => card.offsetLeft + card.offsetWidth > el.scrollLeft + el.clientWidth + 1);
      target = Math.min(hidden?.offsetLeft ?? max, max);
    } else {
      const hidden = cards.findLast((card) => card.offsetLeft < el.scrollLeft - 1);
      target = hidden
        ? (cards
            .map((card) => card.offsetLeft)
            .find((x) => x <= hidden.offsetLeft && x + el.clientWidth >= hidden.offsetLeft + hidden.offsetWidth - 1) ??
          hidden.offsetLeft)
        : 0;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <div className={cn("flex items-center gap-[9px]", controlsClassName)}>
        <button
          type="button"
          aria-label="Previous"
          aria-controls="platform-cards"
          disabled={atStart}
          onClick={() => step(-1)}
          className="shrink-0 cursor-pointer -scale-x-100 disabled:cursor-default"
        >
          <Image src={atStart ? arrowDisabled : arrowActive} alt="" className="block h-8 w-10" />
        </button>
        <button
          type="button"
          aria-label="Next"
          aria-controls="platform-cards"
          disabled={atEnd}
          onClick={() => step(1)}
          className="shrink-0 cursor-pointer disabled:cursor-default"
        >
          <Image src={atEnd ? arrowDisabled : arrowActive} alt="" className="block h-8 w-10" />
        </button>
      </div>

      <div
        ref={track}
        id="platform-cards"
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={sync}
        className={cn(
          "relative flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
