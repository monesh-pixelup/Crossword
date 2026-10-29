"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing";
import type { ShopperQuestion } from "../../config/possibilities";

/**
 * Figma "Library · Vertical tabs" (3305:381), as Sell's Product discovery and Retain's Campaigns &
 * outbound: the list of questions on the left from 992px (above the panel below that), and the active
 * question in the right column (its title in Crimson 22, a line of Geist 16 and GET A DEMO over its
 * framed 821 × 611 damask panel). Styled as Figma draws it, not as on Sell and Retain: each label 24px in
 * (12 / 20px padding), the active one ink on cream with a 2px gold bar down its left edge, the rest ink/40.
 *
 * They play on their own (see `useAutoplayTabs`): the gold bar grows down the active label over that
 * question's turn, then the next question takes over and the old bar fades and shrinks away. Choosing a
 * question shows it, starting its turn afresh.
 */
export function ShopperAsksTabs({ questions }: { questions: ShopperQuestion[] }) {
  // Each question's turn (its panel is a still, so the default run) plus the hold.
  const turns = questions.map(() => tabTurn());
  const { active, root, fills, open } = useAutoplayTabs(turns, { axis: "y" });

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav aria-label="Shopper questions" className="shrink-0">
        <ul className="flex flex-col">
          {questions.map((question, i) => {
            const on = i === active;
            return (
              <li key={question.label}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Figma 3305:383: 12px tall padding, 24px in and 20px after; inactive labels at ink/40, as Figma sets them.
                    "relative flex w-full cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "bg-cream text-ink" : "text-ink/40 hover:text-ink",
                  )}
                >
                  {question.label}
                  {/* The active label's 2px gold bar (Figma's inset shadow), growing down it over the question's turn. */}
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

      {/* Every question shares one cell and they crossfade (`.tab-panel`). */}
      <div className="grid w-full min-w-0 lg:flex-[0_1_820px]">
        {questions.map((question, i) => (
          <div key={question.label} inert={i !== active} className="tab-panel flex w-full flex-col items-start">
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
