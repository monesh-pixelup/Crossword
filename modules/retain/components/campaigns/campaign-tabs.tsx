"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/components/ui/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { campaigns } from "../../config/campaigns";
import panelMaroon from "@/modules/shared/assets/panels/panel-conversational.webp";
import panelAubergine from "@/modules/shared/assets/panels/panel-conversational-aubergine.webp";
import panelForest from "@/modules/shared/assets/panels/panel-conversational-forest.webp";
import { CampaignMotion, campaignTones } from "../motion/retain-motion";

/** Each campaign's framed damask panel (Sell's Product discovery art, as AI Assistants' Shopper asks), in its livery. */
const panels = { maroon: panelMaroon, aubergine: panelAubergine, forest: panelForest } as const;

/** Each campaign's turn (its visual's script isn't timed here, so the default run) plus the hold. */
const turns = campaigns.map(() => tabTurn());

type Campaign = (typeof campaigns)[number];

/** Draws its children once they first come on screen (and keeps them), so a stacked visual starts as it's scrolled to. */
function OnceInView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setSeen(true), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen]);
  return (
    <div ref={ref} className="absolute inset-0">
      {seen && children}
    </div>
  );
}

/** A campaign's title, line of copy and LEARN MORE, 24px over its panel. */
function CampaignCopy({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 bg-cream pr-4 pb-6 pl-4 md:flex-row md:pr-[21px] md:items-start md:justify-between md:gap-8">
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] text-ink">{campaign.title}</h3>
        <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">{campaign.description}</p>
      </div>
      <TextLink href={ctaLinks.bookDemo}>LEARN MORE</TextLink>
    </div>
  );
}

/**
 * A campaign's framed panel in its livery, its motion visual drawn inside while `scene` (replayed as `replay` changes);
 * `lazy` holds the visual back until the panel is first on screen.
 */
function CampaignPanel({
  campaign,
  index: i,
  scene,
  replay,
  lazy = false,
}: {
  campaign: Campaign;
  index: number;
  scene: boolean;
  replay: number;
  lazy?: boolean;
}) {
  const motion = <CampaignMotion key={replay} index={i} />;
  return (
    <>
      {/*
        As Shopper asks: the framed panel art (821 × 611, a damask in 16px of studded lattice inside a 1px #d2cdc0
        border) fills the column, and the campaign's motion visual covers the damask, 16px in, without its own damask
        backdrop and gold notched frame (`.rtn-bare`), so only the panel's frame and pattern show around it.
      */}
      <div className="relative w-full">
        <Image
          src={panels[campaignTones[i % campaignTones.length]]}
          alt=""
          sizes="(min-width: 992px) 821px, 100vw"
          className="h-auto w-full"
        />
        <p className="sr-only">{campaign.message.text}</p>
        {scene && (
          <div className="rtn-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)] overflow-clip">
            {lazy ? <OnceInView>{motion}</OnceInView> : motion}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Vertical tabs laid out as Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the list of campaigns
 * on the left from 992px (above the panel below that), each label in ink in a 48px row, the active one with a rule
 * under it that a gold loader fills over its turn; and the active campaign in the right column (its title, line of
 * copy and a text link over its 821 × 611 Retain motion visual, maroon, aubergine and forest green in turn), the visual
 * playing inside the framed 821 × 611 damask panel's lattice window.
 *
 * They play on their own (see `useAutoplayTabs`): after each campaign's turn (shown by the gold loader) the next takes over. Choosing a
 * campaign shows it, starting its turn afresh.
 *
 * Below 992px there are no tabs: the campaigns stack one under another, each its copy over its panel (48px apart),
 * each visual starting as it comes on screen (as Customer support on Support).
 */
export function CampaignTabs() {
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
      {/* Below 992px: every campaign stacked, no tabs, a thin rule halfway between each (48px either side). */}
      <ul className="flex w-full flex-col gap-12 lg:hidden [&>li+li]:border-t [&>li+li]:border-black/10 [&>li+li]:pt-12">
        {campaigns.map((campaign, i) => (
          <li key={campaign.title} className="flex w-full flex-col items-start">
            <CampaignCopy campaign={campaign} />
            <CampaignPanel campaign={campaign} index={i} scene={wide !== true} replay={0} lazy />
          </li>
        ))}
      </ul>

      <div ref={root} className="flex w-full flex-row items-start justify-between gap-8 max-lg:hidden">
        {/*
          As Dynamic landing pages' Dedicated landing pages (Figma 3991:201196): the labels flush left in ink, 48px rows,
          the column as wide as its longest label; under the active one a 1px rule across the column, its 2px gold loader
          filling left to right over the campaign's turn.
        */}
        <nav aria-label="Campaigns and outbound" className="w-max shrink-0">
          <ul className="flex flex-col">
            {campaigns.map((campaign, i) => {
              const on = i === active;
              return (
                <li key={campaign.title} className="relative">
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => open(i)}
                    className="flex w-full cursor-pointer items-center py-3 text-left font-sans text-base leading-6 tracking-[-0.32px] text-ink transition-opacity duration-300 lg:whitespace-nowrap hover:opacity-70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                  >
                    {campaign.title}
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

        {/* Every campaign shares one cell and they crossfade (`.tab-panel`); a scene is drawn while its campaign shows or fades out, keyed to replay from the start. */}
        <div className="grid w-full min-w-0 lg:flex-[0_1_820px]">
          {campaigns.map((campaign, i) => (
            <div key={campaign.title} inert={i !== active} className="tab-panel flex w-full flex-col items-start">
              <CampaignCopy campaign={campaign} />
              <CampaignPanel campaign={campaign} index={i} scene={wide !== false && (i === active || i === previous)} replay={plays[i]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
