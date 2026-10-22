"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { dynamicOptions } from "../../config/options";
import { TextLink } from "../shared/text-link";

/** Figma's tag pill: Geist Medium 14 caps on #ffeec2 in a 0.5px ink/40 hairline, cap-trimmed inside 6px. */
const tag =
  "border-[0.5px] border-black/40 bg-[#ffeec2] p-1.5 font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] text-ink-muted uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";

/** How long each option stays in focus before the next takes over. */
const DURATION = 6000;

/**
 * The two options, each under its own numbered header ("01 OPTION", "02 OPTION": a Tangerine
 * numeral in maroon, then a 1px black/20 rule). The option in focus is at full strength; the other
 * rests at 50%. A 2px maroon progress bar runs along the focused option's rule while the section is
 * on screen; when it fills, the next option takes over (looping back to the first). Hovering or
 * focusing an option brings it into focus and restarts its bar. Below the header each is a tag, a
 * Crimson 32 title, a line of copy and a text link; the options sit 120px apart.
 */
export function OptionList() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  // The bar only runs while the list is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fill the bar for the option in focus, then hand over to the next one.
  const animation = useRef<Animation | null>(null);
  useEffect(() => {
    const bar = bars.current[active];
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bars.current.forEach((el, i) => el && (el.style.scale = i === active ? "1 1" : ""));
      return;
    }
    const run = bar.animate([{ scale: "0 1" }, { scale: "1 1" }], { duration: DURATION, easing: "linear", fill: "forwards" });
    run.pause();
    animation.current = run;
    run.finished.then(
      () => setActive((i) => (i + 1) % dynamicOptions.length),
      () => {},
    );
    return () => run.cancel();
  }, [active]);

  useEffect(() => {
    const run = animation.current;
    if (!run || run.playState === "finished") return;
    if (visible) run.play();
    else run.pause();
  }, [visible, active]);

  return (
    <div ref={rootRef} className="flex w-full flex-col min-[1260px]:w-[462.865px] min-[1260px]:shrink-0">
      <ul className="flex flex-col gap-16 lg:gap-[120px]">
        {dynamicOptions.map((option, i) => (
          <li
            key={option.title}
            onMouseEnter={() => i !== active && setActive(i)}
            onFocus={() => i !== active && setActive(i)}
            className={cn(
              "flex flex-col items-start gap-8 transition-opacity duration-300 ease-out motion-reduce:transition-none",
              i !== active && "opacity-50",
            )}
          >
            <div className="flex w-full flex-col gap-6">
              <p className="flex items-baseline gap-4 leading-[1.1] whitespace-nowrap">
                <span className="font-calligraphy text-[48px] tracking-[-2.4px] text-maroon [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  0{i + 1}
                </span>
                <span className="font-serif text-[22px] tracking-[-1.1px] text-ink uppercase">Option</span>
              </p>
              {/* The progress bar: runs on the option in focus, empty on the other. */}
              <span aria-hidden className="relative h-px w-full bg-black/20">
                <span
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                  className="absolute top-1/2 left-0 h-0.5 w-full origin-left -translate-y-1/2 bg-maroon [scale:0_1]"
                />
              </span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className={tag}>{option.tag}</p>
              <h3 className="font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-[#040404]">{option.title}</h3>
              <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{option.description}</p>
            </div>
            <div className="-mt-2">
              <TextLink href={option.href}>See how it works</TextLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
