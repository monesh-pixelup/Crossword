"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing";
import type { ShopperQuestion } from "../../config/possibilities";

/** The fixed site header's height plus the 48px the list sits below it while pinned. */
const PIN_TOP = 72.5 + 48;

/**
 * Figma "Library · Vertical tabs" (3305:381), made scroll-driven as Sell's Product discovery and Retain's
 * Campaigns & outbound: every question stacks in the right column (its title in Crimson 22, a line of
 * Geist 16 and GET A DEMO over its framed 821 × 611 damask panel), while the list of questions stays
 * pinned on the left from 992px. Styled as Figma draws it, not as on Sell and Retain: each label 24px in
 * (12 / 20px padding), the active one ink on cream with a 2px gold bar down its left edge, the rest
 * ink/40. The question whose block has crossed the middle of the viewport is the active one; the bar
 * fades across as the next takes over. Choosing a question scrolls to it. Below 992px the list is
 * hidden and the questions simply stack.
 */
export function ShopperAsksTabs({ questions }: { questions: ShopperQuestion[] }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      const tops = steps.current.map((el) => el?.getBoundingClientRect().top ?? 0);
      // The last question whose top has crossed the middle of the viewport (the first until one has).
      let current = 0;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });

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

  /** Scrolls question `i` up to just below the header, level with the pinned list. */
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
      <nav aria-label="Shopper questions" className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block">
        <ul className="flex flex-col">
          {questions.map((question, i) => {
            const on = i === active;
            return (
              <li key={question.label}>
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Figma 3305:383: 12px tall padding, 24px in and 20px after; inactive labels at ink/40, as Figma sets them.
                    "relative flex w-full cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "bg-cream text-ink" : "text-ink/40 hover:text-ink",
                  )}
                >
                  {question.label}
                  {/* The active label's 2px gold bar (Figma's inset shadow), fading across to the next. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gold transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      on ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex w-full min-w-0 flex-col gap-16 lg:flex-[0_1_820px] lg:gap-24">
        {questions.map((question, i) => (
          <div
            key={question.label}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{question.label}</h3>
                {question.description && (
                  <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] whitespace-pre-line text-black/59">{question.description}</p>
                )}
              </div>
              <TextLink href={ctaLinks.bookDemo}>Get a demo</TextLink>
            </div>

            {/*
              Panel art exported with its studded lattice frame and 1px #d2cdc0 border (821 × 611; Figma's
              is 821 × 613 here, a 579px damask in 16px of lattice). It fills the 820px column.
              TODO: the answer's motion scene plays in it once Figma has one.
            */}
            <Image src={question.panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
