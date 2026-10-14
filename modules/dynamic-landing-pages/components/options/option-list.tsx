"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { dynamicOptions } from "../../config/options";
import { TextLink } from "../shared/text-link";

/** Figma's tag pill: Geist Medium 14 caps on #ffeec2 in a 0.5px ink/40 hairline, cap-trimmed inside 6px. */
const tag =
  "border-[0.5px] border-black/40 bg-[#ffeec2] p-1.5 font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] text-ink-muted uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";

/**
 * The two options under a numbered header ("01 OPTION": a Tangerine numeral in maroon, then a 1px
 * black/20 rule with a 2px maroon stroke over its first 101px). The option in focus is at full
 * strength and names the numeral; the other rests at 50% until hovered or focused. Each is a tag,
 * a Crimson 32 title, a line of copy and a text link, 120px apart.
 */
export function OptionList() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full flex-col gap-8 lg:w-[462.865px] lg:shrink-0 lg:pt-8">
      <div className="flex flex-col gap-6">
        <p className="flex items-baseline gap-4 leading-[1.1] whitespace-nowrap">
          <span className="font-calligraphy text-[48px] tracking-[-2.4px] text-maroon [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            0{active + 1}
          </span>
          <span className="font-serif text-[22px] tracking-[-1.1px] text-ink uppercase">Option</span>
        </p>
        <span aria-hidden className="relative h-px w-full bg-black/20">
          <span className="absolute top-1/2 left-0 h-0.5 w-[101.149px] -translate-y-1/2 bg-maroon" />
        </span>
      </div>

      <ul className="flex flex-col gap-16 lg:gap-[120px]">
        {dynamicOptions.map((option, i) => (
          <li
            key={option.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              "flex flex-col items-start gap-6 transition-opacity duration-300 ease-out motion-reduce:transition-none",
              i !== active && "opacity-50",
            )}
          >
            <div className="flex flex-col items-start gap-4">
              <p className={tag}>{option.tag}</p>
              <h3 className="font-serif text-[32px] leading-[1.1] font-light tracking-[-1.28px] text-[#040404]">{option.title}</h3>
              <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{option.description}</p>
            </div>
            <TextLink href={option.href}>See how it works</TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
