"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import giftFinder from "../../assets/library/gift-finder.svg";
import orderTracking from "../../assets/library/order-tracking.svg";
import sizeFit from "../../assets/library/size-fit.svg";
import styleMatch from "../../assets/library/style-match.svg";
import support from "../../assets/library/support.svg";
import { libraryJourneys } from "../../config/launch";

/** Each journey's 22px gold icon, in the order of libraryJourneys (Order tracking's is Figma's filled shopping bag). */
const icons: StaticImageData[] = [giftFinder, styleMatch, sizeFit, support, orderTracking];

/** One step of the row: a 278px journey plus the 28px either side of the rule after it. */
const STEP = 278 + 56;

/**
 * Figma's 32px icon tile: maroon inside a 0.8px #efe9db border ringed by 0.8px of gold, a gold square turned 45°
 * (35.2px, clipped to the tile), a 1.6px gold stud in each corner, and the 22px icon centred (0.13px low) in a
 * 21.719px clip.
 */
function IconTile({ icon }: { icon: StaticImageData }) {
  return (
    <span aria-hidden className="relative size-8 shrink-0 overflow-clip border-[0.8px] border-[#efe9db] bg-maroon shadow-[0_0_0_0.8px_#ffb657]">
      <span className="absolute top-[calc(50%+0.13px)] left-1/2 size-[21.719px] -translate-1/2 overflow-clip">
        <Image src={icon} alt="" className="absolute top-0 left-0 size-[22px] max-w-none" />
      </span>
      <span className="absolute top-1/2 left-1/2 size-[35.2px] -translate-1/2 rotate-45 border-[0.8px] border-[#ffb657]" />
      {["top-0 left-0", "top-0 right-0", "right-0 bottom-0", "bottom-0 left-0"].map((corner) => (
        <span key={corner} className={`absolute ${corner} size-[1.6px] rounded-full bg-[#ffb657]`} />
      ))}
    </span>
  );
}

/**
 * Figma's 40 × 32 arrow button: an #a19169 arrow in a 0.5px #a19169 frame on sand. At the end of the row it fades to
 * 40% on a deeper sand (#f0e5cb), as Figma's resting "previous" button.
 */
function ArrowButton({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous journeys" : "Next journeys"}
      disabled={disabled}
      onClick={onClick}
      className={`h-8 w-10 shrink-0 shadow-[inset_0_0_0_0.5px_#a19169] transition-[opacity,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon ${
        disabled ? "cursor-default bg-[#f0e5cb] opacity-40" : "cursor-pointer bg-sand hover:bg-[#f0e5cb]"
      }`}
    >
      <svg aria-hidden viewBox="0 0 40 32" fill="none" className={`size-full ${direction === "prev" ? "-scale-x-100" : ""}`}>
        <path
          fill="#A19169"
          d="M20.8213 8.97086C21.2149 8.84292 21.6383 9.05777 21.7666 9.45132C22.7486 12.4665 24.1351 13.8647 25.4541 14.5441C26.8058 15.24 28.2034 15.2502 29.3916 15.2502C29.4234 15.2502 29.4546 15.2522 29.4854 15.256C29.8731 15.285 30.1787 15.6089 30.1787 16.0041C30.1785 16.4181 29.8428 16.7541 29.4287 16.7541H28.8506C27.7903 16.7692 26.6057 16.8633 25.4541 17.4562C24.1351 18.1356 22.7486 19.5338 21.7666 22.549C21.6383 22.9425 21.2149 23.1574 20.8213 23.0294C20.4276 22.9011 20.2126 22.4779 20.3408 22.0841C21.2062 19.4272 22.4152 17.7693 23.7646 16.7541H10.5713C10.1572 16.7541 9.82147 16.4181 9.82129 16.0041C9.82129 15.5898 10.1571 15.2541 10.5713 15.2541H23.7744C22.4209 14.2395 21.2083 12.5797 20.3408 9.91617C20.2126 9.52239 20.4276 9.09921 20.8213 8.97086Z"
        />
      </svg>
    </button>
  );
}

/**
 * Figma "Section · Journey library (4x4)" (node 3295:53): a sand panel between the page rails (0.5px black/25
 * hairline, 80px top and bottom inside it, as Workflows on Support), the cream eyebrow over a two-line swash headline
 * (1000px box) and 8px below it an 820px line of Geist Light, with the previous / next arrows (9px apart) level with
 * its foot on the right. 80px below, the journeys run in a row, 278px each and 28px either side of 10% black rules: the
 * icon tile, a Crimson 22 title and Geist 15 copy in ink muted (opening with its lead in Geist Medium #33322f), 24px
 * apart. Four fill the 1280px row; the rest are a scroll (or an arrow) away, a journey at a time.
 */
export function JourneyLibrary() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Which arrows have somewhere to go, kept in step with the row's scroll and size.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setAtStart(row.scrollLeft <= 1);
      setAtEnd(row.scrollLeft + row.clientWidth >= row.scrollWidth - 1);
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => {
      row.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rowRef.current?.scrollBy({ left: direction * STEP, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="journey-library-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        {/* Full content width, no cap, so the heading lines up with the other sections' at every viewport. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-16 lg:gap-20">
          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col items-start gap-6">
              <Eyebrow>A few of the many</Eyebrow>
              <div className="flex flex-col items-start gap-2">
                <SectionTitle
                  id="journey-library-title"
                  initial="E"
                  firstLine="very Journey is built by people"
                  secondLine="who study this for a living"
                  width={1000}
                  variant="humanMode"
                />
                <p className="max-w-[820px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
                  Each one maps the whole path: what the shopper asks, where they stall, what nudges them forward, and when
                  a person should step in. Then it&rsquo;s tested against how real customers behave before it reaches yours.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-[9px]">
              <ArrowButton direction="prev" disabled={atStart} onClick={() => scrollBy(-1)} />
              <ArrowButton direction="next" disabled={atEnd} onClick={() => scrollBy(1)} />
            </div>
          </div>

          <div
            ref={rowRef}
            role="list"
            aria-label="Journeys"
            className="flex w-full snap-x snap-mandatory items-start gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {libraryJourneys.map((journey, i) => (
              <div key={journey.title} className="contents">
                {/* The 0-wide rule's 1.054px stroke (black/20 at 50%) is centred on its line. */}
                {i > 0 && (
                  <span aria-hidden className="relative w-0 shrink-0 self-stretch">
                    <span className="absolute inset-y-0 -left-[0.527px] w-[1.054px] bg-black/10" />
                  </span>
                )}
                <div role="listitem" className="flex w-[278px] shrink-0 snap-start flex-col items-start gap-6">
                  <IconTile icon={icons[i]} />
                  <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-ink">{journey.title}</h3>
                  <p className="font-sans text-[15px] leading-[1.5] tracking-[-0.3px] text-ink-muted">
                    <span className="font-medium text-[#33322f]">{journey.lead}</span>
                    {journey.inline ? " " : <br />}
                    {journey.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
