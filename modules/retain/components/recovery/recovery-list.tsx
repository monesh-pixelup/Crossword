"use client";

import Image from "next/image";
import { type CSSProperties, type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import panel from "@/modules/sell/assets/assist/panel-objection.webp";
import { recoveryItems } from "../../config/recovery";
import { PhoneThread } from "../shared/phone-thread";

/**
 * Layout/Feature, Accordion + media variant, set to the guidelines' web kit (`.wk-ac`): `header`
 * over a list of moments (Crimson 24, ink when open and ink/50 when not, each over a 1px olive/45
 * rule, the open one showing its line of copy), beside the Figma panel art: aubergine scroll
 * damask in a notched gold frame (687 × 586). The message for the open moment sits on the panel in
 * a phone, composed at 687px and scaled with the panel (P6). Arrow keys, Home and End move between
 * items. From 1200px the panel sits beside the list, bottom-aligned with its last item.
 */
export function RecoveryList({ header }: { header: ReactNode }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    const last = recoveryItems.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    items.current[next]?.focus();
  };

  return (
    <div className="flex w-full flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between min-[1200px]:gap-16">
      <div className="flex w-full flex-col items-start gap-12 min-[1200px]:max-w-[520px]">
        {header}
        <div role="tablist" aria-orientation="vertical" aria-label="Proactive recovery moments" onKeyDown={onKeyDown} className="flex w-full flex-col">
          {recoveryItems.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                ref={(el) => {
                  items.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex cursor-pointer flex-col items-start gap-3 pt-7 text-left shadow-[inset_0_-1px_0_rgba(118,102,64,0.45)] transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                  selected ? "pb-7" : "pb-5",
                )}
              >
                <span
                  className={cn(
                    "font-serif text-[22px] leading-[1.15] tracking-[-0.04em] transition-colors duration-150 md:text-[24px]",
                    selected ? "text-ink" : "text-ink/50 group-hover:text-ink",
                  )}
                >
                  {item.title}
                </span>
                {selected && (
                  <span className="max-w-[463px] animate-[dlp-fade_300ms_cubic-bezier(0.22,1,0.36,1)] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted motion-reduce:animate-none">
                    {item.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="@container relative aspect-[2061/1758] w-full min-[1200px]:max-w-[687px] min-[1200px]:flex-[0_1_687px]"
      >
        <Image src={panel} alt="" fill sizes="(min-width: 1200px) 687px, 100vw" className="object-cover" />
        <p className="sr-only">{recoveryItems[active].message.text}</p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-to-container w-[687px] shrink-0" style={{ "--fit-width": "687px" } as CSSProperties}>
            <PhoneThread message={recoveryItems[active].message} className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
