"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { resolveCases } from "../../config/resolve";
import { ChatThread } from "../shared/chat-thread";

/**
 * Layout/Feature, Vertical tabs variant, set to the guidelines' web kit (.wk-vt): a 300px list of
 * question types (Geist 16/24; the active one ink with a 2px gold rule, the rest ink/60, ink on
 * hover), 64px from the panel: the type's title and line of copy over the home page's maroon card
 * (scroll damask in the notched gold frame, at least 440px tall) holding its conversation. From
 * 992px the first tab's label sits level with the panel's title. Arrow keys, Home and End move
 * between tabs.
 */
export function ResolveTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const item = resolveCases[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const last = resolveCases.length - 1;
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
    // From 992px a two-row grid: the panel's title sits over the card in the right column, and the tab
    // list spans both rows from the top, pulled up 8px so the first tab's capitals start exactly
    // where the title's do (measured: Geist 16 in a 10px-padded 24px line against Crimson 22 at 1.2).
    <div className="flex w-full flex-col items-stretch gap-12 lg:grid lg:grid-cols-[300px_minmax(0,820px)] lg:grid-rows-[auto_1fr] lg:justify-between lg:gap-x-16 lg:gap-y-0">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Support questions Crossword handles"
        onKeyDown={onKeyDown}
        className="flex flex-col lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:-mt-2 lg:self-start"
      >
        {resolveCases.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.label}
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
                // Inactive labels at ink/60, not the kit's /45, to pass AA on cream (brand guidelines 5.10).
                "cursor-pointer px-4 py-2.5 text-left font-sans text-base leading-6 tracking-[-0.02em] transition-[color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                selected ? "text-ink shadow-[inset_2px_0_0_0_var(--color-gold)]" : "text-ink/60 hover:text-ink",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="flex w-full min-w-0 flex-col items-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid lg:grid-rows-subgrid"
      >
        <div className="flex w-full flex-col items-start gap-2 pb-6">
          <h3 className="font-serif text-[22px] leading-[1.2] tracking-[-0.03em] text-ink">{item.label}</h3>
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{item.description}</p>
        </div>

        {/* The home page's maroon card: scroll damask 14px in, deep notched gold corners and a ring in each. */}
        <NotchedPanel tone="scroll" inset={14} radius={46} rings className="flex w-full items-center justify-center px-10 py-14 md:min-h-[440px] md:px-16 md:py-16">
          <ChatThread key={active} messages={item.thread} minHeight="200px" className="relative max-w-[551.831px]" />
        </NotchedPanel>
      </div>
    </div>
  );
}
