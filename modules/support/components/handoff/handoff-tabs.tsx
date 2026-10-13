"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { handoffModes } from "../../config/handoff";
import { ChatThread } from "../shared/chat-thread";

/** 1px rules dashed 3 / 3 in gold at 22%, as the web kit's Aubergine steps (`.wk-as`). */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,rgba(224,190,96,0.22)_0_3px,transparent_3px_6px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,rgba(224,190,96,0.22)_0_3px,transparent_3px_6px)]";

/** Status shown in the chat header once a person is in the conversation. */
const statuses = ["Team joined", "Team approving", "Team guiding"];

/**
 * The conversation for the chosen mode on an ivory chat card, over the three numbered steps of
 * the Aubergine steps layout, which act as its tabs. The active step carries a 2px gold rule on
 * top and full-strength type; the others dim. Arrow keys, Home and End move between steps.
 */
export function HandoffTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    const last = handoffModes.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
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
    <div className="flex w-full flex-col items-center gap-14 lg:gap-16">
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="w-full max-w-[600px]">
        <ChatThread
          key={active}
          messages={handoffModes[active].thread}
          status={statuses[active]}
          labelled
          minHeight="clamp(300px, 52vw, 470px)"
        />
      </div>

      <div role="tablist" aria-label="Ways a person joins the conversation" onKeyDown={onKeyDown} className="relative grid w-full gap-0 md:grid-cols-3">
        <span aria-hidden className={`pointer-events-none absolute -inset-x-6 top-0 hidden md:block ${dashedH}`} />

        {handoffModes.map((mode, i) => {
          const selected = i === active;
          return (
            <button
              key={mode.title}
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
              className="group relative flex cursor-pointer flex-col items-start gap-3 px-6 pt-8 pb-8 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold md:pb-2"
            >
              <span aria-hidden className={`pointer-events-none absolute top-0 -bottom-6 left-0 hidden md:block ${dashedV}`} />
              {i === handoffModes.length - 1 && (
                <span aria-hidden className={`pointer-events-none absolute top-0 right-0 -bottom-6 hidden md:block ${dashedV}`} />
              )}
              {/* Stacked below 768px, the steps are split by the same dashed rule. */}
              <span aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 md:hidden ${dashedH}`} />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-px left-0 h-0.5 bg-gold transition-[width] duration-500 ease-out motion-reduce:transition-none",
                  selected ? "w-full" : "w-0",
                )}
              />

              <span
                className={cn(
                  "font-script text-[36px] leading-[1.1] tracking-[-1.8px] text-cream/65 transition-opacity duration-300",
                  !selected && "opacity-50",
                )}
              >
                0{i + 1}
              </span>
              <span
                className={cn(
                  "font-sans text-base leading-[1.3] font-medium tracking-[-0.02em] text-cream transition-opacity duration-300",
                  selected ? "opacity-100" : "opacity-50 group-hover:opacity-100",
                )}
              >
                {mode.title}
              </span>
              <span
                className={cn(
                  "font-sans text-base leading-6 tracking-[-0.02em] text-on-dark/75 transition-opacity duration-300",
                  !selected && "opacity-50 group-hover:opacity-100",
                )}
              >
                {mode.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
