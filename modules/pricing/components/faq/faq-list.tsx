"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { faqs } from "../../config/pricing";

/**
 * The kit's FAQ accordion (`.wk-faq .acc`): questions in Crimson 22 (ink-soft, ink when open) on
 * 1px engraved rules, a gold plus that turns into a minus, the answer in Geist below. The first is
 * open; opening one closes the others. Answers ease open and shut over 400ms; with reduced motion
 * they switch at once.
 */
export function FaqList() {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div className="flex flex-col shadow-[inset_0_1px_0_var(--color-engraved)]">
      {faqs.map((item, i) => {
        const expanded = i === open;
        return (
          <div key={item.q} className="shadow-[inset_0_-1px_0_var(--color-engraved)]">
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={expanded}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-6 pt-7 text-left font-serif text-[19px] leading-[1.15] tracking-[-0.04em] transition-[color,padding] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon motion-reduce:transition-none lg:text-[22px]",
                  expanded ? "pb-4 text-ink" : "pb-7 text-ink-soft hover:text-ink",
                )}
              >
                {item.q}
                {/* The plus turns half a turn as its upright folds away, leaving the minus. */}
                <span
                  aria-hidden
                  className={cn(
                    "relative size-3.5 shrink-0 transition-[rotate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    expanded && "rotate-180",
                  )}
                >
                  <span className="absolute inset-x-0 top-[6.3px] h-[1.4px] bg-gold" />
                  <span
                    className={cn(
                      "absolute inset-y-0 left-[6.3px] w-[1.4px] bg-gold transition-[scale,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      expanded ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100",
                    )}
                  />
                </span>
              </button>
            </h3>
            {/* Grows and shrinks by animating its grid row from 0fr to 1fr (the guidelines' accordion), fading as it goes. */}
            <div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              inert={!expanded}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[620px] pb-7 font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
