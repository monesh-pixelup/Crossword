"use client";

import { CrossfadePanel } from "@/components/ui/crossfade";
import Image from "next/image";
import { useEffect, useState } from "react";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/components/ui/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import panel from "@/modules/shared/assets/panels/panel-conversational.webp";
import { ScenePanel } from "@/modules/shared/motion/scene-panel";
import { resolveCases } from "../../config/resolve";
import { SupportMotionRoot, supportScenes } from "../motion-v3/support-motion";

/** Each case's turn: its scene's run plus the hold. */
const turns = resolveCases.map((c) => tabTurn(supportScenes[c.scene].duration));

type Case = (typeof resolveCases)[number];

/** A case's title, line of copy and LEARN MORE, 24px over its panel. */
function CaseCopy({ item }: { item: Case }) {
  return (
    <>
      {/* Figma 3257:34308: 16px in on the left, 21px on the right, 24px over the panel. */}
      <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:items-start md:justify-between md:gap-8 md:pr-[21px]">
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] text-ink">{item.label}</h3>
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">{item.description}</p>
        </div>
        <TextLink href={ctaLinks.bookDemo}>LEARN MORE</TextLink>
      </div>
    </>
  );
}

/** A case's framed panel, its motion visual drawn inside while `scene` (playing while `play`, replayed as `replay` changes). */
function CasePanel({ item, scene, play, replay }: { item: Case; scene: boolean; play: boolean; replay: number }) {
  return (
    <>
      {/*
        The framed panel art (821 × 611, a maroon damask in 16px of studded lattice inside a 1px #d2cdc0 border) fills
        the column. The case's motion visual (788 × 579) fills the damask, 16px in, and is centred in it,
        without its own notched frame and texture (`.sup-bare`), so only the panel's frame shows around the chat.
      */}
      <div className="relative w-full">
        <Image src={panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
        {scene && (
          <div className="sup-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)]">
            <ScenePanel
              key={replay}
              scene={supportScenes[item.scene]}
              active={play}
              root={SupportMotionRoot}
              maxScale={Infinity}
              transform
            />
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Vertical tabs laid out as Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the list of question
 * types on the left from 992px (above the case below that), each label in ink in a 48px row, the active one with a rule
 * under it that a gold loader fills over its turn; and the active type's case in the 820px right column (its title, line of copy and a text
 * link, 24px over the framed 821 × 611 maroon damask panel, its Support v4 motion visual playing inside the lattice).
 *
 * They play on their own (see `useAutoplayTabs`): each case stays up for its turn (its scene's run plus a short hold,
 * shown by the gold loader), then the next takes over. Choosing a type shows its
 * case, starting its turn afresh.
 *
 * Below 992px there are no tabs: the cases stack one under another, each its copy over its panel (48px apart), every
 * visual playing as it comes on screen (as Product discovery on Sell).
 */
export function ResolveTabs() {
  const { active, previous, plays, root, fills, open } = useAutoplayTabs(turns);
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
      {/* Below 992px: every case stacked, no tabs, a thin rule halfway between each (48px either side). */}
      <ul className="flex w-full flex-col gap-12 lg:hidden [&>li+li]:border-t [&>li+li]:border-black/10 [&>li+li]:pt-12">
        {resolveCases.map((c) => (
          <li key={c.label} className="flex w-full flex-col">
            <CaseCopy item={c} />
            <CasePanel item={c} scene={wide !== true} play replay={0} />
          </li>
        ))}
      </ul>

      <div ref={root} className="flex w-full flex-row items-start justify-between gap-8 max-lg:hidden">
        {/*
          As Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the labels flush left in ink, 48px rows,
          the column as wide as its longest label; under the active one a 1px rule across the column, its 2px gold loader
          filling left to right over the case's turn.
        */}
        <nav aria-label="Support questions Crossword handles" className="w-max shrink-0">
          <ul className="flex flex-col">
            {resolveCases.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.label} className="relative">
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => open(i)}
                    className="flex w-full cursor-pointer items-center py-3 text-left font-sans text-base leading-6 tracking-[-0.32px] text-ink transition-opacity duration-300 lg:whitespace-nowrap hover:opacity-70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                  >
                    {c.label}
                  </button>
                  {on && (
                    <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#d2cdc0]">
                      {/* The loader, grown across the rule by useAutoplayTabs (its `scale`), paused off screen. */}
                      <span
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gold"
                        style={{ scale: "0 1" }}
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          Every case shares one cell and they crossfade (CrossfadePanel); a scene is drawn while its case shows or fades out,
          keyed to replay from the start. The cell is two rows, shared through subgrid: the copy row is as tall as the
          tallest case's copy, so each case's copy starts at the same top and its panel at the same place below, whichever
          is showing.
        */}
        <div className="grid w-full min-w-0 grid-rows-[auto_auto] lg:flex-[0_1_820px]">
          {resolveCases.map((c, i) => (
            <CrossfadePanel key={c.label} active={i === active} className="grid w-full grid-rows-subgrid items-start" style={{ gridArea: "1 / 1 / 3 / 2" }}>
              <CaseCopy item={c} />
              <CasePanel item={c} scene={wide !== false && (i === active || i === previous)} play={i === active} replay={plays[i]} />
            </CrossfadePanel>
          ))}
        </div>
      </div>
    </>
  );
}
