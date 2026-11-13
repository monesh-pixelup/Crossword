"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import panel from "@/modules/sell/assets/discovery/panel-conversational.webp";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { dedicatedTabs } from "../../config/options";
import { DlpMotionRoot, dlpScenes } from "../motion/dlp-motion";
import { TextLink } from "../shared/text-link";

/** Each component's turn: its motion visual's run plus the hold. */
const turns = dedicatedTabs.map((tab) => tabTurn(dlpScenes[tab.scene].duration));

type Tab = (typeof dedicatedTabs)[number];

/** A component's name, line of copy and LEARN MORE, 24px over its panel. */
function TabCopy({ tab }: { tab: Tab }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:pr-[21px] md:items-start md:justify-between md:gap-8">
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] text-ink">{tab.label}</h3>
        <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">{tab.description}</p>
      </div>
      <TextLink href={ctaLinks.bookDemo}>LEARN MORE</TextLink>
    </div>
  );
}

/** A component's framed panel, its motion visual drawn inside while `scene` (playing while `play`, replayed as `replay` changes). */
function TabPanel({ tab, scene, play, replay }: { tab: Tab; scene: boolean; play: boolean; replay: number }) {
  return (
    <>
      {/*
        As Shopper asks: the framed panel art (821 × 611, a maroon damask in 16px of studded lattice inside a 1px
        #d2cdc0 border) fills the column. The component's motion visual (738 × 680) is fitted whole inside the damask,
        16px in, and centred in it, without its own crimson backdrop and gold frame (`.dlp-bare`), so only the
        panel's frame shows around the illustration.
      */}
      <div className="relative w-full">
        <Image src={panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
        {scene && (
          <div className="dlp-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)]">
            <ScenePanel
              key={replay}
              scene={dlpScenes[tab.scene]}
              active={play}
              root={DlpMotionRoot}
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
 * Figma "AFTER · Vertical tabs" (3278:24167), as AI Assistants' Shopper asks: the list of components on the left from
 * 992px (above the panel below that), each label in ink in a 48px row, the active one with a rule under it that a gold
 * loader fills over its turn (Figma 3991:201196); and the active component in the 820px right
 * column (its name in Crimson 22, its line of Geist 16 and a text link, 24px over the framed 821 × 611 maroon damask
 * panel, its Sell: Dynamic v2 motion visual playing inside the lattice frame).
 *
 * They play on their own (see `useAutoplayTabs`): each component stays up for its turn (shown by the gold loader), then
 * the next takes over. Choosing a component shows it, starting its turn afresh.
 *
 * Below 992px there are no tabs: the components stack one under another, each its copy over its panel (48px apart),
 * every visual playing as it comes on screen (as Product discovery on Sell).
 */
export function DedicatedTabList() {
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
      {/* Below 992px: every component stacked, no tabs, a thin rule halfway between each (48px either side). */}
      <ul className="flex w-full flex-col gap-12 lg:hidden [&>li+li]:border-t [&>li+li]:border-black/10 [&>li+li]:pt-12">
        {dedicatedTabs.map((tab) => (
          <li key={tab.label} className="flex w-full flex-col">
            <TabCopy tab={tab} />
            <TabPanel tab={tab} scene={wide !== true} play replay={0} />
          </li>
        ))}
      </ul>

      <div ref={root} className="flex w-full flex-row items-start justify-between gap-8 max-lg:hidden">
        {/*
          Figma 3991:201196: the labels flush left in ink, 48px rows, in a 206px column; under the active one a 1px rule
          across the column, its 2px gold loader filling left to right over the component's turn.
        */}
        <nav aria-label="Dedicated landing page components" className="w-[206px] shrink-0">
          <ul className="flex flex-col">
            {dedicatedTabs.map((tab, i) => {
              const on = i === active;
              return (
                <li key={tab.label} className="relative">
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => open(i)}
                    className="flex w-full cursor-pointer items-center py-3 text-left font-sans text-base leading-6 tracking-[-0.32px] text-ink transition-opacity duration-300 lg:whitespace-nowrap hover:opacity-70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                  >
                    {tab.label}
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
          Every component shares one cell and they crossfade (`.tab-panel`); a visual is drawn while its component shows or
          fades out, keyed to replay from the start. The cell is two rows, shared through subgrid: the copy row is as tall as
          the tallest component's copy, so each one's copy starts at the same top and its panel at the same place below,
          whichever is showing.
        */}
        <div className="grid w-full min-w-0 grid-rows-[auto_auto] lg:flex-[0_1_820px]">
          {dedicatedTabs.map((tab, i) => (
            <div
              key={tab.label}
              inert={i !== active}
              className="tab-panel grid w-full grid-rows-subgrid items-start"
              style={{ gridArea: "1 / 1 / 3 / 2" }}
            >
              <TabCopy tab={tab} />
              <TabPanel tab={tab} scene={wide !== false && (i === active || i === previous)} play={i === active} replay={plays[i]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
