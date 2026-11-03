"use client";

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { tabTurn } from "@/lib/use-autoplay-tabs";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { dynamicOptions } from "../../config/options";
import { DlpMotionRoot, dlpScenes } from "../motion/dlp-motion";

/** How long each option stays in focus before the next takes over: its motion visual's run plus the hold. */
const turns = dynamicOptions.map((option) => tabTurn(dlpScenes[option.scene].duration));

type Options = {
  /** The option in focus. */
  active: number;
  /** The option that was in focus before it, so its visual can stay drawn while it fades out. */
  previous: number;
  /** Counts each option's turns in focus, to key its visual so it plays from the start each time. */
  plays: number[];
  focus: (i: number) => void;
};

const OptionsContext = createContext<Options>({ active: 0, previous: 0, plays: dynamicOptions.map(() => 0), focus: () => {} });

/** Shares the option in focus between the list (OptionList) and the panel beside it (OptionPanel). */
export function OptionsProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [plays, setPlays] = useState(() => dynamicOptions.map(() => 0));
  const activeRef = useRef(0);
  const focus = (i: number) => {
    if (i === activeRef.current) return;
    setPrevious(activeRef.current);
    activeRef.current = i;
    setActive(i);
    setPlays((p) => p.map((n, j) => (j === i ? n + 1 : n)));
  };
  return <OptionsContext value={{ active, previous, plays, focus }}>{children}</OptionsContext>;
}

/**
 * The two options (Figma 3361:305), 520px wide: each a Crimson 22 title over 462.9px of Geist 16 copy,
 * 12px apart, with a rule 32px under it and the next option 64px below that. The option in focus is at
 * full strength over a 1px black/50 rule; the other rests at 50% over a 0.5px black/20 one. While the
 * list is on screen a 2px maroon bar fills along the focused option's rule, over its motion visual's
 * run plus a short hold; when it fills, the next option takes over (looping back to the first).
 * Hovering or focusing an option brings it into focus. Render inside OptionsProvider.
 */
export function OptionList() {
  const { active, focus } = useContext(OptionsContext);
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
  const focusRef = useRef(focus);
  useEffect(() => {
    focusRef.current = focus;
  });
  useEffect(() => {
    const bar = bars.current[active];
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const run = bar.animate([{ scale: "0 1" }, { scale: "1 1" }], { duration: turns[active], easing: "linear", fill: "forwards" });
    run.pause();
    animation.current = run;
    run.finished.then(
      () => focusRef.current((active + 1) % dynamicOptions.length),
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
              onMouseEnter={() => !on && focus(i)}
              onFocus={() => !on && focus(i)}
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

/**
 * The 687 × 586 panel beside the options: the focused option's motion visual (Sell: Dynamic v2 02, Dedicated landing
 * pages, or 09, Adaptive product pages), in its own framed panel. The two share one cell and crossfade (`.tab-panel`);
 * a visual is drawn while its option is in focus or fading out, keyed to replay from the start. Render inside
 * OptionsProvider.
 */
export function OptionPanel() {
  const { active, previous, plays } = useContext(OptionsContext);
  return (
    <div className="grid h-full w-full">
      {dynamicOptions.map((option, i) => (
        <div key={option.title} inert={i !== active} className="tab-panel relative h-full w-full">
          {(i === active || i === previous) && (
            <ScenePanel key={plays[i]} scene={dlpScenes[option.scene]} active={i === active} root={DlpMotionRoot} />
          )}
        </div>
      ))}
    </div>
  );
}
