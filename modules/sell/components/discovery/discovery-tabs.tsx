"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/discovery/arrow-right.svg";
import { discoveryFeatures } from "../../config/discovery";

/** The fixed site header's height plus the 48px the list sits below it while pinned. */
const PIN_TOP = 72.5 + 48;

/**
 * Vertical tabs made scroll-driven, as on Support's "Customer support, handled by Crossword": every
 * feature stacks in the right column (its title, description and LEARN MORE over its framed panel
 * art), while the 280px list of features stays pinned on the left from 992px. The feature whose
 * block has crossed the middle of the viewport is the active one (ink; the rest ink/60), and the
 * gold rule under its label fills as its block scrolls through, until the next one takes over: then
 * the old rule fades and shrinks away. Choosing a feature scrolls to it. Below 992px the list is
 * hidden and the features simply stack.
 */
export function DiscoveryTabs() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      const tops = steps.current.map((el) => el?.getBoundingClientRect().top ?? 0);
      // The last feature whose top has crossed the middle of the viewport (the first until one has).
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });

      // Progress through the active feature: from its top crossing the line to the next one's.
      const el = steps.current[current];
      const span = current < tops.length - 1 ? tops[current + 1] - tops[current] : (el?.offsetHeight ?? 1);
      const progress = Math.min(1, Math.max(0, (line - tops[current]) / span));
      const fill = fills.current[current];
      if (fill) fill.style.scale = `${progress} 1`;

      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Once the outgoing rule has its eased transition (after this render), let it shrink away.
  const previous = useRef(0);
  useEffect(() => {
    const out = previous.current;
    previous.current = active;
    if (out === active) return;
    const frame = requestAnimationFrame(() => {
      const fill = fills.current[out];
      if (fill) fill.style.scale = "0 1";
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  /** Scrolls feature `i` up to just below the header, level with the pinned list. */
  const open = (i: number) => {
    const el = steps.current[i];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - PIN_TOP,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="flex w-full flex-col items-stretch lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <nav aria-label="Product discovery features" className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block lg:w-[280px]">
        <ul className="flex flex-col">
          {discoveryFeatures.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 pl-6 text-left font-inter text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {item.label}
                  {/* Hairline track, with the gold rule that fills as this feature scrolls through. */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next feature takes over.
                        on
                          ? "opacity-100 transition-none"
                          : "opacity-0 transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex w-full min-w-0 flex-col gap-16 lg:flex-[0_1_820px] lg:gap-24">
        {discoveryFeatures.map((feature, i) => (
          <div
            key={feature.label}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{feature.label}</h3>
                {feature.description && (
                  <p className="max-w-[595px] font-open-sans text-base leading-6 tracking-[-0.48px] text-black/59">
                    {feature.description}
                  </p>
                )}
              </div>
              <Link
                href={feature.href}
                className="flex shrink-0 items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
              >
                LEARN MORE
                <Image src={arrowRight} alt="" className="size-3" />
              </Link>
            </div>

            {/* Panel art exported with its studded lattice frame and 1px #d2cdc0 border (821 × 611 in Figma); it fills the 820px column. */}
            <Image
              src={feature.panel}
              alt=""
              sizes="(min-width: 992px) 821px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
