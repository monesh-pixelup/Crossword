"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { GiltPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { resolveCases } from "../../config/resolve";
import { ChatThread } from "../shared/chat-thread";

/**
 * Layout/Feature, Vertical tabs variant, set to the guidelines' web kit (.wk-vt): a 300px list of
 * question types (Geist 16/24; the active one ink with a 2px gold rule, the rest ink/60, ink on
 * hover), 64px from the panel: the type's title and line of copy over a maroon gilt panel (at least
 * 440px tall) holding its conversation. Arrow keys, Home and End move between tabs.
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
    <div className="flex w-full flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Support questions Crossword handles"
        onKeyDown={onKeyDown}
        className="flex flex-col lg:flex-[0_0_300px]"
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
        className="flex w-full min-w-0 flex-col items-start lg:flex-[0_1_820px]"
      >
        <div className="flex w-full flex-col items-start gap-2 pb-6">
          <h3 className="font-serif text-[22px] leading-[1.2] tracking-[-0.03em] text-ink">{item.label}</h3>
          <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{item.description}</p>
        </div>

        <GiltPanel tone="maroon" className="flex w-full items-center justify-center px-6 py-12 md:min-h-[440px] md:px-16 md:py-16">
          <ChatThread key={active} messages={item.thread} minHeight="200px" className="relative max-w-[551.831px]" />
        </GiltPanel>
      </div>
    </div>
  );
}
