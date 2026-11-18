"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import panel from "../../assets/discovery/panel-conversational.webp";
import { discoveryFeatures } from "../../config/discovery";
import { ScenePanel, type SceneEntry } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { discoveryScenes as scenes } from "../motion-v2/scenes";

const discoveryScenes: Record<string, SceneEntry> = scenes;

/** Each feature's turn: its scene's run plus the hold. */
const turns = discoveryFeatures.map((feature) => tabTurn(discoveryScenes[feature.scene]?.duration));

type Feature = (typeof discoveryFeatures)[number];

/** A feature's title, description and LEARN MORE, 24px over its panel. */
function FeatureCopy({ feature }: { feature: Feature }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:pr-[21px] md:items-start md:justify-between md:gap-8">
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] text-ink">{feature.label}</h3>
        {feature.description && (
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
            {feature.description}
          </p>
        )}
      </div>
      <TextLink href={ctaLinks.bookDemo}>LEARN MORE</TextLink>
    </div>
  );
}

/** A feature's framed panel, its motion visual drawn inside while `scene` (playing while `play`, replayed as `replay` changes). */
function FeaturePanel({ feature, scene, play, replay }: { feature: Feature; scene: boolean; play: boolean; replay: number }) {
  return (
    <>
      {/*
        As Shopper asks and Campaigns & outbound: the framed panel art (821 × 611, a maroon damask in 16px of studded
        lattice inside a 1px #d2cdc0 border) fills the column. The feature's visual (788 × 579) fills
        the damask, 16px in, and centred in it, without its own maroon frame and texture (`.sell-bare`), so only the
        panel's frame shows around the chat. Drawn while its feature shows or fades out.
      */}
      <div className="relative w-full">
        <Image src={panel} alt="" sizes="(min-width: 992px) 821px, 100vw" className="h-auto w-full" />
        {discoveryScenes[feature.scene] && scene && (
          <div className="sell-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)]">
            <ScenePanel
              key={replay}
              scene={discoveryScenes[feature.scene]}
              active={play}
              root={SellMotionRoot}
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
 * Vertical tabs laid out as Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the list of features on
 * the left from 992px (above the panel below that), each label in ink in a 48px row, the active one with a rule under it
 * that a gold loader fills over its turn; and the active feature in the 820px right column (its title, description and
 * LEARN MORE, 24px over the framed 821 × 611 maroon damask panel, its motion visual playing inside the lattice frame).
 *
 * They play on their own (see `useAutoplayTabs`): each feature stays up for its turn (its scene's run plus a short
 * hold, shown by the gold loader), then the next takes over. Choosing a
 * feature shows it, starting its turn afresh.
 *
 * Below 992px there are no tabs: the features stack one under another, each its copy over its panel (48px apart),
 * every visual playing as it comes on screen.
 */
export function DiscoveryTabs() {
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
      {/* Below 992px: every feature stacked, no tabs, a thin rule halfway between each (48px either side). */}
      <ul className="flex w-full flex-col gap-12 lg:hidden [&>li+li]:border-t [&>li+li]:border-black/10 [&>li+li]:pt-12">
        {discoveryFeatures.map((feature) => (
          <li key={feature.label} className="flex w-full flex-col">
            <FeatureCopy feature={feature} />
            <FeaturePanel feature={feature} scene={wide !== true} play replay={0} />
          </li>
        ))}
      </ul>

      <div ref={root} className="flex w-full flex-row items-start justify-between gap-8 max-lg:hidden">
        {/*
          As Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the labels flush left in ink, 48px rows,
          the column as wide as its longest label; under the active one a 1px rule across the column, its 2px gold loader
          filling left to right over the feature's turn.
        */}
        <nav aria-label="Product discovery features" className="w-max shrink-0">
          <ul className="flex flex-col">
            {discoveryFeatures.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => open(i)}
                    className="flex w-full cursor-pointer items-center py-3 text-left font-sans text-base leading-6 tracking-[-0.32px] text-ink transition-opacity duration-300 lg:whitespace-nowrap hover:opacity-70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                  >
                    {item.label}
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
              <FeatureCopy feature={feature} />
              <FeaturePanel feature={feature} scene={wide !== false && (i === active || i === previous)} play={i === active} replay={plays[i]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
