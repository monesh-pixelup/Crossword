"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import arrowRight from "../../assets/discovery/arrow-right.svg";
import { discoveryFeatures } from "../../config/discovery";
import { ScenePanel, type SceneEntry } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { discoveryScenes as scenes } from "../motion-v2/scenes";

const discoveryScenes: Record<string, SceneEntry> = scenes;

/** Each feature's turn: its scene's run plus the hold. */
const turns = discoveryFeatures.map((feature) => tabTurn(discoveryScenes[feature.scene]?.duration));

/**
 * Vertical tabs, as on Support's "Customer support, handled by Crossword": the 280px list of features
 * on the left from 992px (above the panel below that), and the active feature in the right column (its
 * title, description and LEARN MORE over its framed panel art). The active label is ink; the rest ink/60.
 *
 * They play on their own (see `useAutoplayTabs`): the gold rule under the active label fills over that
 * feature's turn (its scene's run plus a short hold), then the next feature takes over and the old rule
 * fades and shrinks away. Choosing a feature shows it, starting its turn afresh.
 */
export function DiscoveryTabs() {
  const { active, previous, plays, root, fills, open } = useAutoplayTabs(turns);

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav
        aria-label="Product discovery features"
       
        className="shrink-0 lg:w-[280px]"
      >
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
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {/* No left padding: the labels line up with the heading above. */}
                  {item.label}
                  {/* Hairline track, with the gold rule that fills over this feature's turn. */}
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
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
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
                LEARN MORE
                <Image src={arrowRight} alt="" className="size-3" />
              </Link>
            </div>

            {/*
              The feature's visual (738 × 680: the maroon frame with its chat window, as in the source), filling the
              820px column and scaled down with it below that; drawn while its feature shows or fades out.
            */}
            <div className="relative aspect-[738/680] w-full">
              {discoveryScenes[feature.scene] && (i === active || i === previous) && (
                <ScenePanel
                  key={plays[i]}
                  scene={discoveryScenes[feature.scene]}
                  active={i === active}
                  root={SellMotionRoot}
                  maxScale={Infinity}
                  transform
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
