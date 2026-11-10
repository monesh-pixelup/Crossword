"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import type { ShopperQuestion } from "../../config/possibilities";
import { motionScene } from "../motion/motion-scenes";

/** A question's title, line of copy and GET A DEMO, 24px over its panel. */
function QuestionCopy({ question }: { question: ShopperQuestion }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:pr-[21px] md:items-end md:justify-between md:gap-8">
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{question.label}</h3>
        {question.description && (
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] whitespace-pre-line text-black/59">{question.description}</p>
        )}
      </div>
      <TextLink href={ctaLinks.bookDemo}>GET A DEMO</TextLink>
    </div>
  );
}

/** A question's framed panel, its answer's motion visual drawn inside while `scene` (playing while `play`, replayed as `replay` changes). */
function QuestionPanel({ question, scene, play, replay }: { question: ShopperQuestion; scene: boolean; play: boolean; replay: number }) {
  return (
    <>
      {/*
        Panel art exported with its studded lattice frame and 1px #d2cdc0 border (821 × 611; Figma's
        is 821 × 613 here, a 579px damask in 16px of lattice). It fills the 820px column. The answer's
        motion visual (789 × 579, its own damask) covers the damask, 16px in: the window the lattice leaves.
      */}
      <div className="relative w-full">
        <Image src={question.panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
        {question.scene && scene && (
          <div className="absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)]">
            <ScenePanel key={replay} {...motionScene(question.scene)} active={play} maxScale={Infinity} />
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Figma "Library · Vertical tabs" (3305:381), as Sell's Product discovery and Retain's Campaigns &
 * outbound: the list of questions on the left from 992px (above the panel below that), and the active
 * question in the right column (its title in Crimson 22, a line of Geist 16 and GET A DEMO over its
 * framed 821 × 611 damask panel, its answer's motion visual playing inside the lattice frame). Styled as Figma draws it, not as on Sell and Retain: each label 24px in
 * (12 / 20px padding), the active one ink on cream with a 2px gold bar down its left edge, the rest ink/40.
 *
 * They play on their own (see `useAutoplayTabs`): each question stays up for its turn, then the next takes over,
 * its gold bar showing at full height while the old one fades away. Choosing a question shows it, starting its
 * turn afresh.
 *
 * Below 992px there are no tabs: the questions stack one under another, each its copy over its panel (48px apart),
 * every visual playing as it comes on screen (as Product discovery on Sell).
 */
export function ShopperAsksTabs({ questions }: { questions: ShopperQuestion[] }) {
  // Each question's turn: its answer's run (the default run for a still panel) plus the hold.
  const turns = questions.map((question) => tabTurn(question.scene && motionScene(question.scene).scene.duration));
  const { active, previous, plays, root, open } = useAutoplayTabs(turns, { axis: "y" });
  // Which layout is showing (null until known), so only its visuals are drawn and play.
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 62rem)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* Below 992px: every question stacked, no tabs, a thin rule halfway between each (48px either side). */}
      <ul className="flex w-full flex-col gap-12 lg:hidden [&>li+li]:border-t [&>li+li]:border-black/10 [&>li+li]:pt-12">
        {questions.map((question) => (
          <li key={question.label} className="flex w-full flex-col">
            <QuestionCopy question={question} />
            <QuestionPanel question={question} scene={wide !== true} play replay={0} />
          </li>
        ))}
      </ul>

      <div ref={root} className="flex w-full flex-row items-start justify-between gap-8 max-lg:hidden">
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
                      // Figma 3305:383: 48px rows, a 24px line in 12px tall padding, 24px in and 20px after; inactive labels at ink/40, as Figma sets them.
                      "relative flex w-full cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-6 tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                      on ? "bg-cream text-ink" : "text-ink/40 hover:text-ink",
                    )}
                  >
                    {question.label}
                    {/* The active label's 2px gold bar (Figma's inset shadow), at its full height (not a progress bar); it fades away once the next question takes over. */}
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

        {/*
          Every question shares one cell and they crossfade (`.tab-panel`); a visual is drawn while its question shows or
          fades out, keyed to replay from the start. The cell is two rows, shared through subgrid: the copy row is as tall
          as the tallest question's copy, so each one's copy starts at the same top and its panel at the same place below,
          whichever is showing.
        */}
        <div className="grid w-full min-w-0 grid-rows-[auto_auto] lg:flex-[0_1_820px]">
          {questions.map((question, i) => (
            <div
              key={question.label}
              inert={i !== active}
              className="tab-panel grid w-full grid-rows-subgrid items-start"
              style={{ gridArea: "1 / 1 / 3 / 2" }}
            >
              <QuestionCopy question={question} />
              <QuestionPanel question={question} scene={wide !== false && (i === active || i === previous)} play={i === active} replay={plays[i]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
