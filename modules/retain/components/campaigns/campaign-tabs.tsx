"use client";

import Image from "next/image";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import damaskMaroon from "../../assets/campaigns/damask-maroon.webp";
import { campaigns } from "../../config/campaigns";
import { PhoneThread } from "../shared/phone-thread";

/**
 * Figma "Library · Vertical tabs" (as Customer support on Support): a 280px list of campaigns, each
 * tab a 39.44px row 24px in from the left (the active one ink on cream with a 2px gold rule, the
 * rest ink/60, ink on hover), level with the top of an 820px panel at the far right: the campaign's
 * title, its line of copy and a text link over the maroon damask (its gold edge drawn in, 821 × 611
 * in Figma) holding the campaign's message in a phone. Arrow keys, Home and End move between tabs.
 */
export function CampaignTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const item = campaigns[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const last = campaigns.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="flex w-full flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Campaigns and outbound"
        onKeyDown={onKeyDown}
        className="flex shrink-0 flex-col lg:w-[280px]"
      >
        {campaigns.map((campaign, i) => {
          const selected = i === active;
          return (
            <button
              key={campaign.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                "flex min-h-[39.44px] cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-[color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                selected ? "bg-cream text-ink shadow-[inset_2px_0_0_0_var(--color-gold)]" : "text-ink/60 hover:text-ink",
              )}
            >
              {campaign.title}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex w-full min-w-0 flex-col items-start lg:flex-[0_1_820px]"
      >
        <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{item.title}</h3>
            <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{item.description}</p>
          </div>
          <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
        </div>

        <div className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden px-4 py-10 lg:aspect-[821/611] lg:min-h-0">
          <Image src={damaskMaroon} alt="" fill sizes="(min-width: 992px) 821px, 100vw" className="object-fill" />
          <p className="sr-only">{item.message.text}</p>
          <PhoneThread key={active} message={item.message} className="relative" />
        </div>
      </div>
    </div>
  );
}
