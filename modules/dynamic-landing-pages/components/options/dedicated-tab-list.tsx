"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import panelAubergine from "../../assets/options/dedicated-panel-aubergine.webp";
import panelForest from "../../assets/options/dedicated-panel-forest.webp";
import panelMaroon from "../../assets/options/dedicated-panel-maroon.webp";
import { dedicatedTabs } from "../../config/options";
import { TextLink } from "../shared/text-link";

/**
 * The panels' liveries in turn: maroon, forest green, aubergine, then round again. Figma draws the maroon one; the
 * others are that render with its damask re-hued to the site's forest and aubergine (the lattice border untouched).
 */
const panels = [panelMaroon, panelForest, panelAubergine];

/** The fixed site header's height plus the 48px the list sits below it while pinned. */
const PIN_TOP = 72.5 + 48;

/**
 * Figma "Library · Vertical tabs" (Dedicated landing pages), made scroll-driven as Campaigns & outbound on Retain:
 * every component stacks in the right column (its name in Crimson 22, its line of Geist 16 and a text link over its
 * 821 × 611 panel, maroon, forest green and aubergine in turn), while the 280px list of components stays pinned on the left from 992px. The component whose panel
 * has crossed the middle of the viewport is the active one (ink; the rest ink/60), and the gold rule under its label
 * fills as it scrolls through, until the next one takes over: then the old rule fades and shrinks away. Choosing a
 * component scrolls to it. Below 992px the list is hidden and the components simply stack.
 */
export function DedicatedTabList() {
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
      // The last component whose top has crossed the middle of the viewport (the first until one has).
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });

      // Progress through the active component: from its top crossing the line to the next one's.
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

  /** Scrolls component `i` up to just below the header, level with the pinned list. */
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
      <nav aria-label="Dedicated landing page components" className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block lg:w-[280px]">
        <ul className="flex flex-col">
          {dedicatedTabs.map((tab, i) => {
            const on = i === active;
            return (
              <li key={tab.label}>
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {/* No left padding: the labels line up with the heading above. */}
                  {tab.label}
                  {/* Hairline track, with the gold rule that fills as this component scrolls through. */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next component takes over.
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

      <div className="flex w-full min-w-0 flex-col gap-16 lg:flex-[0_1_821px] lg:gap-24">
        {dedicatedTabs.map((tab, i) => (
          <div
            key={tab.label}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{tab.label}</h3>
                <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{tab.description}</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            {/* Figma's own render of the panel: a 1px #d2cdc0 border, the lattice ground 16px wide and the damask inside. */}
            <div className="relative aspect-[821/611] w-full overflow-clip">
              <Image src={panels[i % panels.length]} alt="" fill sizes="(min-width: 1280px) 821px, 100vw" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
