"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { dynamicOptions } from "../../config/options";

/** How long each option stays in focus before the next takes over. */
const DURATION = 6000;

/**
 * The two options (Figma 3361:305), 520px wide: each a Crimson 22 title over 462.9px of Geist 16 copy,
 * 12px apart, with a rule 32px under it and the next option 64px below that. The option in focus is at
 * full strength over a 1px black/50 rule; the other rests at 50% over a 0.5px black/20 one. While the
 * list is on screen a 2px maroon bar fills along the focused option's rule; when it fills, the next
 * option takes over (looping back to the first). Hovering or focusing an option brings it into focus.
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <div ref={rootRef} className="w-full lg:w-[520px] lg:shrink-0">
      <ul className="flex flex-col gap-16">
        {dynamicOptions.map((option, i) => {
          const on = i === active;
          return (
            <li
              key={option.title}
              tabIndex={0}
              onMouseEnter={() => !on && setActive(i)}
              onFocus={() => !on && setActive(i)}
              className="flex flex-col gap-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
            >
              <div className={cn("flex flex-col items-start gap-3 transition-opacity duration-300 ease-out motion-reduce:transition-none", !on && "opacity-50")}>
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{option.title}</h3>
                <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{option.description}</p>
              </div>
              {/* The rule, with the progress bar that runs on the option in focus. */}
              <span
                aria-hidden
                className={cn("relative w-full transition-colors duration-300", on ? "h-px bg-black/50" : "h-[0.5px] bg-black/20")}
              >
                <span
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                  className={cn("absolute top-1/2 left-0 h-0.5 w-full origin-left -translate-y-1/2 bg-maroon [scale:0_1]", !on && "opacity-0")}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
