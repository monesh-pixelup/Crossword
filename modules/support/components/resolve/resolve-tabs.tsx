"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { resolveCases } from "../../config/resolve";
import { ChatThread } from "../shared/chat-thread";

/**
 * Figma "Library · Vertical tabs" (laid out like Sell's discovery tabs): a 280px list of question
 * types, each tab a 39.44px row 24px in from the left (the active one ink on cream with a 2px gold
 * rule, the rest ink/60, ink on hover), level with the top of an 820px panel at the far right: the
 * type's title and line of copy over the home page's maroon card (scroll damask in the notched gold
 * frame, 611px tall like Figma's 821 × 611 frame) holding its conversation. Arrow keys, Home and End
 * move between tabs.
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
    <div className="flex w-full flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Support questions Crossword handles"
        onKeyDown={onKeyDown}
        className="flex shrink-0 flex-col lg:w-[280px]"
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
                // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                "flex min-h-[39.44px] cursor-pointer items-center py-3 pr-5 pl-6 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-[color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                selected ? "bg-cream text-ink shadow-[inset_2px_0_0_0_var(--color-gold)]" : "text-ink/60 hover:text-ink",
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
        className="flex w-full min-w-0 flex-col items-start lg:flex-[0_1_820px]"
      >
        <div className="flex w-full flex-col items-start gap-3 bg-cream px-4 pb-6">
          <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{item.label}</h3>
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{item.description}</p>
        </div>

        {/* The home page's maroon card: scroll damask 14px in, deep notched gold corners and a ring in each. */}
        <NotchedPanel
          tone="scroll"
          inset={14}
          radius={46}
          rings
          className="flex w-full items-center justify-center px-10 py-14 md:min-h-[440px] md:px-16 md:py-16 lg:min-h-[611px]"
        >
          <ChatThread key={active} messages={item.thread} minHeight="200px" className="relative max-w-[551.831px]" />
        </NotchedPanel>
      </div>
    </div>
  );
}
