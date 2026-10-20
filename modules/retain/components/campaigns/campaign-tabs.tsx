"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NotchedFrame, notchMask } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import damaskMaroon from "../../assets/campaigns/damask-maroon.webp";
import { campaigns } from "../../config/campaigns";
import { PhoneThread } from "../shared/phone-thread";

/** The fixed site header's height plus the 48px the list sits below it while pinned. */
const PIN_TOP = 72.5 + 48;

/**
 * Figma "Library · Vertical tabs" (as Customer support on Support), made scroll-driven like
 * Granola's "how it works": every campaign stacks in the right column (its title, line of copy and
 * a text link over the maroon damask, its gold edge drawn in, 821 × 611 in Figma, holding the
 * campaign's message in a phone, inside the home frame's notched gold line and rings, as the
 * Customer support cards on Support), while the 280px list of campaigns stays pinned on the left from
 * 992px. The campaign whose panel has crossed the middle of the viewport is the active one (ink;
 * the rest ink/60), and the gold rule under its label fills as it scrolls through, until the next
 * one takes over: then the old rule fades and shrinks away. Choosing a campaign scrolls to it.
 * Below 992px the list is hidden and the campaigns simply stack.
 */
export function CampaignTabs() {
  const [active, setActive] = useState(0);
  // Bumped each time a campaign becomes active, so its message plays in again.
  const [plays, setPlays] = useState(() => campaigns.map(() => 0));
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      const tops = steps.current.map((el) => el?.getBoundingClientRect().top ?? 0);
      // The last campaign whose top has crossed the middle of the viewport (the first until one has).
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });

      // Progress through the active campaign: from its top crossing the line to the next one's.
      const el = steps.current[current];
      const span = current < tops.length - 1 ? tops[current + 1] - tops[current] : (el?.offsetHeight ?? 1);
      const progress = Math.min(1, Math.max(0, (line - tops[current]) / span));
      const fill = fills.current[current];
      if (fill) fill.style.scale = `${progress} 1`;

      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
        setPlays((p) => p.map((n, i) => (i === current ? n + 1 : n)));
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

  /** Scrolls campaign `i` up to just below the header, level with the pinned list. */
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
      <nav aria-label="Campaigns and outbound" className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block lg:w-[280px]">
        <ul className="flex flex-col">
          {campaigns.map((campaign, i) => {
            const on = i === active;
            return (
              <li key={campaign.title}>
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {campaign.title}
                  {/* Hairline track, with the gold rule that fills as this campaign scrolls through. */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next campaign takes over.
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
        {campaigns.map((campaign, i) => (
          <div
            key={campaign.title}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{campaign.title}</h3>
                <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{campaign.description}</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            <div className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden bg-[#660331] px-6 py-16 lg:aspect-[821/611] lg:min-h-0 lg:px-4 lg:py-10">
              {/*
                As NotchedPanel: a plain margin in the damask's own ground colour, the damask only inside the
                line (14px in, its corners notched away), then the line itself with a ring in each notch.
              */}
              <div aria-hidden className="pointer-events-none absolute inset-[14px]" style={{ mask: notchMask(46), WebkitMask: notchMask(46) }}>
                <Image src={damaskMaroon} alt="" fill sizes="(min-width: 992px) 793px, 100vw" className="object-fill" />
              </div>
              <NotchedFrame inset={14} radius={46} rings />
              <p className="sr-only">{campaign.message.text}</p>
              <PhoneThread key={plays[i]} message={campaign.message} className="relative" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
