"use client";

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { PlusLines } from "@/components/ui/plus-lines";
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
  /**
   * Figma's newer spacing (Sell: Conversion assistance 3257:36424, Retain: Proactive recovery 3257:38221): the open
   * item's rule 32px under its copy (not 24px), and a rule under the last item too.
   */
  spacedRules?: boolean;
  /** A rule under the last item too (with `spacedRules`, unless set false: AI Assistants' quotes have none). */
  lastRule?: boolean;
  /**
   * Below 992px, open each item's media right under its copy, accordion-style (as Insights on the home page), instead
   * of in one panel under the list; there the items change only when tapped, never on their own.
   */
  stackedAccordion?: boolean;
  /**
   * With `stackedAccordion`, below 992px: the FAQ's plus / minus at the end of each title (Sell: Conversion assistance),
   * a plus on the closed items and a minus on the open one.
   */
  toggleIcon?: boolean;
};

/** The stacked accordion's open / close: the row eases its height while the media fades. */
const ACCORDION_MS = 500;

/**
 * Figma "Library · Accordion + media", new layout (Sell's Conversion assistance, node 3709:21534): the items as an
 * accordion in a 520px column beside the 687 × 586 panel. The list starts 24px down and spaces everything 24px apart:
 * the open item shows its Crimson 22 title and, 12px under it, its line of Geist 16 (black/60), then a 1px black/30
 * rule; the others are their title at 40% with a 0.5px black/20 rule under each (none under the last). The panel plays
 * the open item's media.
 *
 * The items take turns on their own (see `useAutoplayTabs`): each stays open for its turn, then the next opens.
 * Choosing one opens it and starts its turn afresh. Side by side from 992px; narrower, the list sits over the panel,
 * or with `stackedAccordion` each item's media opens under it.
 */
export function AccordionMedia({
  items,
  turns,
  label,
  renderPanel,
  panelClassName,
  panelBackground,
  spacedRules = false,
  lastRule = spacedRules,
  stackedAccordion = false,
  toggleIcon = false,
}: AccordionMediaProps) {
  // Which layout is showing (null until known), when the stacked layout is an accordion: only its media is drawn.
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    if (!stackedAccordion) return;
    const query = window.matchMedia("(min-width: 62rem)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [stackedAccordion]);
  const accordion = stackedAccordion && wide !== true;

  const { active, plays, root, open } = useAutoplayTabs(turns, { manual: accordion });

  // The accordion item closing as another opens, kept drawn until it has eased shut.
  const [closing, setClosing] = useState<number | null>(null);
  const shown = useRef(active);
  useEffect(() => {
    if (shown.current === active) return;
    setClosing(shown.current);
    shown.current = active;
    const timer = window.setTimeout(() => setClosing(null), ACCORDION_MS);
    return () => window.clearTimeout(timer);
  }, [active]);
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
                <span className="flex w-full items-start justify-between gap-4">
                  <span
                    className={cn(
                      "font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] transition-colors duration-300 ease-out",
                      on ? "text-ink" : "text-ink/40 hover:text-ink/70",
                    )}
                  >
                    {item.title}
                  </span>
                  {stackedAccordion && toggleIcon && (
                    /*
                      Below 992px (the accordion): the FAQ's plus / minus (FaqList's plain one, 14px in ink-soft), centred on
                      the title's first line. The plus turns half a turn as its upright folds away, leaving the minus.
                    */
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-1 size-3.5 shrink-0 transition-[rotate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:mt-[5px] lg:hidden",
                        on && "rotate-180",
                      )}
                    >
                      <PlusLines open={on} className="text-ink-soft" />
                    </span>
                  )}
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
                      <span className="block max-w-[462.865px] pt-3 font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
                        {item.description}
                      </span>
                    </span>
                  </span>
                )}
              </button>
              {stackedAccordion && (
                /* Below 992px: the open item's media, 24px under its copy, easing open as the last one's closes. */
                <div
                  aria-hidden={!on}
                  className={cn(
                    "-mt-6 grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  style={{ transitionDuration: `${ACCORDION_MS}ms` }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className={cn("relative mt-6 aspect-[687/586] w-full overflow-hidden", panelClassName, "lg:mr-0")}>
                      {wide !== true && (on || i === closing) && (
                        <>
                          {panelBackground}
                          <div key={`${i}-${plays[i]}`} className="absolute inset-0">
                            {renderPanel(i, plays[i])}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* The open item's rule is 1px black/30; the others' a 0.5px black/20 line. None under the last, unless `spacedRules`. */}
              {(i !== last || lastRule) && (
                <span
                  aria-hidden
                  className={cn(
                    "w-full shrink-0 transition-[margin] duration-300 ease-out",
                    on ? "h-px bg-black/30" : "h-0 shadow-[0_0_0_0.25px_rgba(0,0,0,0.2)]",
                    on && spacedRules && "mt-2",
                  )}
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
        className={cn(
          "relative aspect-[687/586] w-full shrink-0 overflow-hidden lg:flex-[0_1_687px]",
          stackedAccordion && "max-lg:hidden",
          panelClassName,
        )}
      >
        {!(stackedAccordion && wide === false) && (
          <>
            {panelBackground}
            <div
              key={`${active}-${plays[active]}`}
              className="absolute inset-0 transition-opacity duration-300 ease-out starting:opacity-0"
            >
              {renderPanel(active, plays[active])}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
