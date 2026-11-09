"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { campaigns } from "../../config/campaigns";
import panelMaroon from "@/modules/sell/assets/discovery/panel-conversational.webp";
import panelAubergine from "@/modules/sell/assets/discovery/panel-conversational-aubergine.webp";
import panelForest from "@/modules/sell/assets/discovery/panel-conversational-forest.webp";
import { CampaignMotion, campaignTones } from "../motion/retain-motion";

/** Each campaign's framed damask panel (Sell's Product discovery art, as AI Assistants' Shopper asks), in its livery. */
const panels = { maroon: panelMaroon, aubergine: panelAubergine, forest: panelForest } as const;

/** Each campaign's turn (its visual's script isn't timed here, so the default run) plus the hold. */
const turns = campaigns.map(() => tabTurn());

/**
 * Figma "Library · Vertical tabs" (as Customer support on Support): the 280px list of campaigns on the
 * left from 992px (above the panel below that), and the active campaign in the right column (its
 * title, line of copy and a text link over its 821 × 611 Retain motion visual, maroon, aubergine and
 * forest green in turn), laid out as AI Assistants' Shopper asks: each label 24px in (12 / 20px padding), the
 * active one ink on cream with a 2px gold bar down its left edge, the rest ink/40, and the visual playing
 * inside the framed 821 × 611 damask panel's lattice window.
 *
 * They play on their own (see `useAutoplayTabs`): after each campaign's turn the next takes over. Choosing a
 * campaign shows it, starting its turn afresh.
 */
export function CampaignTabs() {
  const { active, previous, plays, root, open } = useAutoplayTabs(turns, { axis: "y" });

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav aria-label="Campaigns and outbound" className="shrink-0">
        <ul className="flex flex-col">
          {campaigns.map((campaign, i) => {
            const on = i === active;
            return (
              <li key={campaign.title}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "bg-cream text-ink" : "text-ink/40 hover:text-ink",
                  )}
                >
                  {/* Figma's 2px gold inset bar down the active label's left edge. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gold transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      on ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {campaign.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Every campaign shares one cell and they crossfade (`.tab-panel`); a scene is drawn while its campaign shows or fades out, keyed to replay from the start. */}
      <div className="grid w-full min-w-0 lg:flex-[0_1_820px]">
        {campaigns.map((campaign, i) => (
          <div key={campaign.title} inert={i !== active} className="tab-panel flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{campaign.title}</h3>
                <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] text-black/59">{campaign.description}</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

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
              {(i === active || i === previous) && (
                <div className="rtn-bare absolute inset-x-[calc(100%*16/821)] inset-y-[calc(100%*16/611)] overflow-clip">
                  <CampaignMotion key={plays[i]} index={i} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
