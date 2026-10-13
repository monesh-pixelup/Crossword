"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NotchedPanel } from "../shared/livery";
import { signals } from "../../config/personalization";
import { StorefrontMock } from "./storefront-mock";

/**
 * Layout/Feature, Accordion + media variant (as Conversion assistance on Sell): `intro` over
 * `header` and a selectable list on the left, the storefront mock-up on the home page's maroon
 * card on the right. As in the guidelines' web kit, every item sits over a 1px olive/45 rule; the
 * active one is ink, the others ink/50. Arrow keys, Home and End move between items.
 */
export function SignalList({ intro, header, footnote }: { intro: ReactNode; header: ReactNode; footnote: ReactNode }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    const last = signals.length - 1;
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
    // From 1200px a two-row grid: `intro` (eyebrow and headline) alone on the first row, then the copy
    // and list beside the card, so the card's top lines up with the copy's first line.
    <div className="flex w-full flex-col gap-6 min-[1200px]:grid min-[1200px]:grid-cols-[minmax(0,520px)_minmax(0,640px)] min-[1200px]:justify-between min-[1200px]:gap-x-16">
      <div className="min-[1200px]:col-start-1 min-[1200px]:row-start-1">{intro}</div>
      <div className="flex w-full flex-col items-start gap-12 min-[1200px]:col-start-1 min-[1200px]:row-start-2 min-[1200px]:gap-14">
        {header}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="What Crossword personalizes"
          onKeyDown={onKeyDown}
          className="flex w-full max-w-[520px] flex-col"
        >
          {signals.map((signal, i) => {
            const selected = i === active;
            return (
              <button
                key={signal.id}
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
                  "group flex cursor-pointer items-baseline gap-4 py-4 text-left transition-[box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                  "shadow-[inset_0_-1px_0_rgba(118,102,64,0.45)]",
                )}
              >
                <span className={cn("w-5 shrink-0 font-script text-[20px] leading-none text-wine transition-opacity duration-300", !selected && "opacity-50")}>
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "font-serif text-[22px] leading-[1.15] tracking-[-0.04em] transition-colors duration-150 md:text-[24px]",
                    selected ? "text-ink" : "text-ink/50 group-hover:text-ink",
                  )}
                >
                  {signal.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-5 min-[1200px]:col-start-2 min-[1200px]:row-start-2 min-[1200px]:mt-0 min-[1200px]:self-start">
        {/* The home page's maroon card: scroll damask 14px in, deep notched gold corners and a ring in each; 48px in so the mock-up clears the notches. */}
        <NotchedPanel tone="scroll" inset={14} radius={46} rings className="p-12">
          <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="relative">
            <StorefrontMock active={signals[active].id} />
          </div>
        </NotchedPanel>
        {footnote}
      </div>
    </div>
  );
}
