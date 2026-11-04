"use client";

import { type KeyboardEvent, type ReactNode, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { useAutoplayTabs } from "@/lib/use-autoplay-tabs";

export type AccordionMediaItem = { title: string; description?: string };

type AccordionMediaProps = {
  items: AccordionMediaItem[];
  /** Each item's turn in ms (from `tabTurn`), one entry per item. */
  turns: number[];
  /** The tab list's accessible name. */
  label: string;
  /** The open item's media, drawn in the 687 × 586 panel; `play` counts its turns, to key it so each one replays. */
  renderPanel: (active: number, play: number) => ReactNode;
  /** The panel's background while its media loads. */
  panelClassName?: string;
  /** Art drawn behind the media that stays put as the items change (not keyed, so it never fades). */
  panelBackground?: ReactNode;
};

/**
 * Figma "Library · Accordion + media", new layout (Sell's Conversion assistance, node 3709:21534): the items as an
 * accordion in a 520px column beside the 687 × 586 panel. The list starts 24px down and spaces everything 24px apart:
 * the open item shows its Crimson 22 title and, 12px under it, its line of Geist 16 (black/60), then a 1px black/30
 * rule; the others are their title at 40% with a 0.5px black/20 rule under each (none under the last). The panel plays
 * the open item's media.
 *
 * The items take turns on their own (see `useAutoplayTabs`): each stays open for its turn, then the next opens.
 * Choosing one opens it and starts its turn afresh. Side by side from 1024px; narrower, the list sits over the panel.
 */
export function AccordionMedia({ items, turns, label, renderPanel, panelClassName, panelBackground }: AccordionMediaProps) {
  const { active, plays, root, open } = useAutoplayTabs(turns);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const last = items.length - 1;

  const onKeyDown = (e: KeyboardEvent) => {
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    open(next);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={root} className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex w-full min-w-0 flex-col gap-6 pt-6 lg:flex-[0_1_520px]"
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <div key={item.title} className="contents">
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => open(i)}
                className={cn(
                  "flex w-full flex-col items-start text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                  on ? "cursor-default" : "cursor-pointer",
                )}
              >
                <span
                  className={cn(
                    "font-serif text-[22px] leading-[1.1] tracking-[-0.88px] transition-colors duration-300 ease-out",
                    on ? "text-[#040404]" : "text-[#040404]/40 hover:text-[#040404]/70",
                  )}
                >
                  {item.title}
                </span>
                {item.description && (
                  /* The description (12px under the title) opens and closes by easing its row's height, fading in once there's room. */
                  <span
                    aria-hidden={!on}
                    className={cn(
                      "grid w-full transition-[grid-template-rows,opacity] ease-out",
                      on
                        ? "grid-rows-[1fr] opacity-100 duration-[300ms,200ms] delay-[0ms,100ms]"
                        : "grid-rows-[0fr] opacity-0 duration-[300ms,150ms]",
                    )}
                  >
                    <span className="min-h-0 overflow-hidden">
                      <span className="block max-w-[462.865px] pt-3 font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
                        {item.description}
                      </span>
                    </span>
                  </span>
                )}
              </button>
              {/* The open item's rule is 1px black/30; the others' a 0.5px black/20 line. None under the last. */}
              {i !== last && (
                <span
                  aria-hidden
                  className={cn("w-full shrink-0", on ? "h-px bg-black/30" : "h-0 shadow-[0_0_0_0.25px_rgba(0,0,0,0.2)]")}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* The open item's media (687 × 586), keyed so each turn plays from the start and fades in over the last. Stacked, it spans the width. */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className={cn("relative aspect-[687/586] w-full shrink-0 overflow-hidden lg:flex-[0_1_687px]", panelClassName)}
      >
        {panelBackground}
        <div
          key={`${active}-${plays[active]}`}
          className="absolute inset-0 transition-opacity duration-300 ease-out starting:opacity-0"
        >
          {renderPanel(active, plays[active])}
        </div>
      </div>
    </div>
  );
}
