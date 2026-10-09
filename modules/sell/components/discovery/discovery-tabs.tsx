"use client";

import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/discovery/arrow-right.svg";
import { discoveryFeatures } from "../../config/discovery";

/**
 * Vertical tab list (each tab an equal share of 355px on desktop; the active one carries a 2px gold
 * rule on its left) beside the feature's title, description and framed panel art. Arrow keys,
 * Home and End move between tabs.
 */
export function DiscoveryTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const feature = discoveryFeatures[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const last = discoveryFeatures.length - 1;
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
        aria-label="Product discovery features"
        onKeyDown={onKeyDown}
        className="flex shrink-0 flex-col lg:h-[355px]"
      >
        {discoveryFeatures.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.label}
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
                "flex min-h-[39px] flex-1 cursor-pointer items-center py-3 pr-5 pl-6 text-left font-inter text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-[color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                selected
                  ? "bg-cream text-ink shadow-[inset_2px_0_0_0_var(--color-gold)]"
                  : "text-ink/40 hover:text-ink/70",
              )}
            >
              {item.label}
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
            <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{feature.label}</h3>
            {feature.description && (
              <p className="max-w-[595px] font-open-sans text-base leading-6 tracking-[-0.48px] text-black/59">
                {feature.description}
              </p>
            )}
          </div>
          <Link
            href={feature.href}
            className="flex shrink-0 items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-colors hover:text-black"
          >
            LEARN MORE
            <Image src={arrowRight} alt="" className="size-3" />
          </Link>
        </div>

        {/* Panel art exported with its studded lattice frame and 1px #d2cdc0 border (821 × 611 in Figma); it fills the 820px column. */}
        <Image
          src={feature.panel}
          alt=""
          sizes="(min-width: 992px) 821px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
