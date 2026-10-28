"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing";
import type { ShopperQuestion } from "../../config/possibilities";

/**
 * Figma "Library · Vertical tabs" (3305:381), made scroll-driven as Sell's Product discovery and Retain's
 * Campaigns & outbound: every question stacks in the right column (its title in Crimson 22, a line of
 * Geist 16 and GET A DEMO over its framed 821 × 611 damask panel), while the list of questions stays
 * pinned on the left from 992px. Styled as Figma draws it, not as on Sell and Retain: each label 24px in
 * (12 / 20px padding), the active one ink on cream with a 2px gold bar down its left edge, the rest
 * ink/40. The question whose block has crossed the middle of the viewport is the active one.
 *
 * They also play on their own (see `useAutoplayTabs`): while the list is pinned, the gold bar grows down
 * the active label over that question's turn, and moves along as the reader scrolls, then the page
 * scrolls on to the next question. When the next question takes over, the old bar fades and shrinks
 * away. Choosing a question scrolls to it. Below 992px the list is hidden and the questions simply stack.
 */
export function ShopperAsksTabs({ questions }: { questions: ShopperQuestion[] }) {
  // Each question's turn (its panel is a still, so the default run) plus the hold.
  const turns = questions.map(() => tabTurn());
  const { active, steps, fills, open, pause } = useAutoplayTabs(turns, { axis: "y" });

  return (
    <div className="flex w-full flex-col items-stretch lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <nav aria-label="Shopper questions" {...pause} className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block">
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
                  {/* The active label's 2px gold bar (Figma's inset shadow), growing down it over the question's turn (or as it scrolls through). */}
                  <span
                    aria-hidden
                    ref={(el) => {
                      fills.current[i] = el;
                    }}
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top bg-gold [scale:1_0]",
                      // Driven every frame while active; eased away (and faded) once the next question takes over.
                      on
                        ? "opacity-100 transition-none"
                        : "opacity-0 transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
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
