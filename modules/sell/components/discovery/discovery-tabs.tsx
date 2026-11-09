"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import arrowRight from "../../assets/discovery/arrow-right.svg";
import panel from "../../assets/discovery/panel-conversational.webp";
import { discoveryFeatures } from "../../config/discovery";
import { ScenePanel, type SceneEntry } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { discoveryScenes as scenes } from "../motion-v2/scenes";

const discoveryScenes: Record<string, SceneEntry> = scenes;

/** Each feature's turn: its scene's run plus the hold. */
const turns = discoveryFeatures.map((feature) => tabTurn(discoveryScenes[feature.scene]?.duration));

/**
 * Figma "Library · Vertical tabs" (3257:35922), as AI Assistants' Shopper asks and Retain's Campaigns & outbound: the list
 * of features on the left from 992px (above the panel below that), each label 24px in (10.2px tall padding around its
 * 24px line, so 44.4px rows; 20px after), the active one ink on cream with a 2px gold bar down its left edge, the rest
 * ink/40; and the active feature in the 820px right column (its title, description and GET STARTED, 24px over the
 * framed 821 × 611 maroon damask panel, its motion visual playing inside the lattice frame).
 *
 * They play on their own (see `useAutoplayTabs`): each feature stays up for its turn (its scene's run plus a short
 * hold), then the next takes over, its gold bar showing at full height while the old one fades away. Choosing a
 * feature shows it, starting its turn afresh.
 */
export function DiscoveryTabs() {
  const { active, previous, plays, root, open } = useAutoplayTabs(turns, { axis: "y" });

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav aria-label="Product discovery features" className="shrink-0">
        <ul className="flex flex-col">
          {discoveryFeatures.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Figma 3257:36053: 44.4px rows, a 24px line 10.2px from top and bottom, 24px in and 20px after; inactive labels at ink/40.
                    "relative flex w-full cursor-pointer items-center py-[10.2px] pr-5 pl-6 text-left font-sans text-base leading-6 tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "bg-cream text-ink" : "text-ink/40 hover:text-ink",
                  )}
                >
                  {item.label}
                  {/* The active label's 2px gold bar, at its full height; it fades away once the next feature takes over. */}
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
        Every feature shares one cell and they crossfade (`.tab-panel`); a scene is drawn while its feature shows or fades
        out, keyed to replay from the start. The cell is two rows, shared through subgrid: the copy row is as tall as the
        tallest feature's copy, so each feature's copy starts at the same top and its visual at the same place below,
        whichever is showing.
      */}
      <div className="grid w-full min-w-0 grid-rows-[auto_auto] lg:flex-[0_1_820px]">
        {discoveryFeatures.map((feature, i) => (
          <div
            key={feature.label}
            inert={i !== active}
            className="tab-panel grid w-full grid-rows-subgrid items-start"
            style={{ gridArea: "1 / 1 / 3 / 2" }}
          >
            <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:pr-[21px] md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{feature.label}</h3>
                {feature.description && (
                  <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] text-black/59">
                    {feature.description}
                  </p>
                )}
              </div>
              <Link
                href={feature.href}
                className="flex shrink-0 items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
              >
                GET STARTED
                <Image src={arrowRight} alt="" className="size-3" />
              </Link>
            </div>

            {/*
              As Shopper asks and Campaigns & outbound: the framed panel art (821 × 611, a maroon damask in 16px of studded
              lattice inside a 1px #d2cdc0 border) fills the column. The feature's visual (738 × 680) is fitted whole inside
              the damask, 16px in, and centred in it, without its own maroon frame and texture (`.sell-bare`), so only the
              panel's frame shows around the chat. Drawn while its feature shows or fades out.
            */}
            <div className="relative w-full">
              <Image src={panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
              {discoveryScenes[feature.scene] && (i === active || i === previous) && (
                <div className="sell-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)]">
                  <ScenePanel
                    key={plays[i]}
                    scene={discoveryScenes[feature.scene]}
                    active={i === active}
                    root={SellMotionRoot}
                    maxScale={Infinity}
                    transform
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
