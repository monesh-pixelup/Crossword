"use client";

import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { campaigns } from "../../config/campaigns";
import { CampaignMotion, campaignTones } from "../motion/retain-motion";

/** Each panel's ground until its visual draws, in the campaign's livery. */
const grounds = { maroon: "bg-[#660331]", aubergine: "bg-aubergine", forest: "bg-forest" } as const;

/** Each campaign's turn (its visual's script isn't timed here, so the default run) plus the hold. */
const turns = campaigns.map(() => tabTurn());

/**
 * Figma "Library · Vertical tabs" (as Customer support on Support): the 280px list of campaigns on the
 * left from 992px (above the panel below that), and the active campaign in the right column (its
 * title, line of copy and a text link over its 821 × 611 Retain motion visual, maroon, aubergine and
 * forest green in turn). The active label is ink; the rest ink/60.
 *
 * They play on their own (see `useAutoplayTabs`): the gold rule under the active label fills over that
 * campaign's turn, then the next campaign takes over and the old rule fades and shrinks away. Choosing
 * a campaign shows it, starting its turn afresh.
 */
export function CampaignTabs() {
  const { active, previous, plays, root, fills, open } = useAutoplayTabs(turns);

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav aria-label="Campaigns and outbound" className="shrink-0 lg:w-[280px]">
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
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {/* No left padding: the labels line up with the heading above. */}
                  {campaign.title}
                  {/* Hairline track, with the gold rule that fills over this campaign's turn. */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next campaign takes over.
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

      {/* Every campaign shares one cell and they crossfade (`.tab-panel`); a scene is drawn while its campaign shows or fades out, keyed to replay from the start. */}
      <div className="grid w-full min-w-0 lg:flex-[0_1_821px]">
        {campaigns.map((campaign, i) => (
          <div key={campaign.title} inert={i !== active} className="tab-panel flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{campaign.title}</h3>
                <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{campaign.description}</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            <div className={cn("relative aspect-[821/611] w-full overflow-clip", grounds[campaignTones[i % campaignTones.length]])}>
              <p className="sr-only">{campaign.message.text}</p>
              {(i === active || i === previous) && <CampaignMotion key={plays[i]} index={i} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
