"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { resolveCases } from "../../config/resolve";
import { supportScenesA } from "../motion/index-a";
import { type SceneTone, SceneToneContext } from "../motion/parts-a";
import { SupportMotionRoot } from "../motion/root";

/** The cases' frames take these liveries in turn: maroon, then aubergine, then forest green, repeating. */
const tones: SceneTone[] = ["maroon", "aubergine", "forest"];

/** Each case's turn: its scene's run plus the hold. */
const turns = resolveCases.map((c) => tabTurn(supportScenesA[c.scene].duration));

/**
 * Figma "Library · Vertical tabs", made scroll-driven like Granola's "how it works": every question
 * type stacks in the right column (its title and line of copy over its notched card, maroon,
 * aubergine and forest green in turn, playing its motion scene), while the 280px list of types stays
 * pinned on the left from 992px. The type whose case has crossed the middle of the viewport is the
 * active one (ink; the rest ink/60).
 *
 * They also play on their own (see `useAutoplayTabs`): while the list is pinned, the gold rule under
 * the active label fills over that case's turn (its scene's run plus a short hold), and moves along
 * as the reader scrolls, then the page scrolls on to the next case. When the next case takes over,
 * the old rule fades and shrinks away. Choosing a type scrolls to its case. Below 992px the list is
 * hidden and the cases simply stack.
 */
export function ResolveTabs() {
  // Bumped each time a case becomes active, so its scene plays from the start again.
  const [plays, setPlays] = useState(() => resolveCases.map(() => 0));
  const { active, steps, fills, open, pause } = useAutoplayTabs(turns, {
    onActivate: (current) => setPlays((p) => p.map((n, i) => (i === current ? n + 1 : n))),
  });

  return (
    <div className="flex w-full flex-col items-stretch lg:flex-row lg:items-start lg:justify-between lg:gap-8">
      <nav aria-label="Support questions Crossword handles" {...pause} className="sticky top-[calc(72.5px+48px)] hidden shrink-0 lg:block lg:w-[280px]">
        <ul className="flex flex-col">
          {resolveCases.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {/* No left padding: the labels line up with the heading above. */}
                  {c.label}
                  {/* Hairline track, with the gold rule that fills over this case's turn (or as it scrolls through). */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next case takes over.
                        on
                          ? "opacity-100 transition-none"
                          : "opacity-0 transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex w-full min-w-0 flex-col gap-16 lg:flex-[0_1_820px] lg:gap-24">
        {resolveCases.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-3 bg-cream px-4 pb-6">
              <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{c.label}</h3>
              <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.48px] text-black/59">{c.description}</p>
            </div>

            {/* The case's motion scene: a chat in its notched frame (738 × 680, in its turn's livery), filling the column. */}
            <div className="relative aspect-[738/680] w-full">
              <SceneToneContext value={tones[i % tones.length]}>
                <ScenePanel key={plays[i]} scene={supportScenesA[c.scene]} root={SupportMotionRoot} maxScale={1.2} />
              </SceneToneContext>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
