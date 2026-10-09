"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { assistFeatures } from "../../config/assist";

/**
 * Selectable feature list beside its panel art. The active item is full strength with a 1px
 * black/50 rule 32px under it; the others are dimmed (50% with a description, 40% titles without)
 * over a 0.5px black/20 rule 64px down, every item 64px apart. From 1200px the list is clipped to
 * Figma's 334px window and scrolls, bringing the chosen item to the top. `header` (eyebrow and
 * headline) sits above the list, 84px clear of it, with the panel beside both.
 */
export function AssistList({ header }: { header: ReactNode }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const feature = assistFeatures[active];

  const select = (i: number, focus = false) => {
    setActive(i);
    const item = items.current[i];
    if (!item) return;
    if (focus) item.focus({ preventScroll: true });
    const el = list.current;
    if (el && el.scrollHeight > el.clientHeight) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollTo({
        top: item.offsetTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = assistFeatures.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="flex w-full flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between min-[1200px]:gap-10">
      <div className="flex w-full flex-col items-start gap-12 min-[1200px]:w-auto min-[1200px]:gap-[84px]">
        {header}
        <div
          ref={list}
          role="tablist"
          aria-orientation="vertical"
          aria-label="Conversion assistance features"
          onKeyDown={onKeyDown}
          className="relative flex w-full max-w-[520px] flex-col gap-16 min-[1200px]:ml-[6px] min-[1200px]:h-[334px] min-[1200px]:overflow-y-auto min-[1200px]:[scrollbar-width:none] min-[1200px]:[&::-webkit-scrollbar]:hidden"
        >
          {assistFeatures.map((item, i) => {
            const selected = i === active;
            return (
              <div
                key={item.title}
                className={cn("flex flex-col", selected ? "gap-8" : "gap-16")}
              >
                <button
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group flex cursor-pointer flex-col items-start gap-3 text-left transition-opacity duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon",
                    !selected &&
                      item.description &&
                      "opacity-50 hover:opacity-75",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] transition-colors duration-300",
                      selected || item.description
                        ? "text-[#040404]"
                        : "text-[#040404]/40 group-hover:text-[#040404]/60",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
                      {item.description}
                    </span>
                  )}
                </button>
                {/* Figma leaves the last item without a rule unless it is active. */}
                {(selected || i < assistFeatures.length - 1) && (
                  <span
                    aria-hidden
                    className={cn(
                      "block w-full",
                      selected ? "h-px bg-black/50" : "h-[0.5px] bg-black/20",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel art (687 × 586 in Figma): purple damask inside a gold notched frame with corner rings. */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="w-full min-[1200px]:mt-[10px] min-[1200px]:max-w-[687px] min-[1200px]:flex-[0_1_687px]"
      >
        <Image
          src={feature.panel}
          alt=""
          sizes="(min-width: 1200px) 687px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
