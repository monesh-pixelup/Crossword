"use client";

import { cn } from "@/lib/cn";
import { tabTurn, useAutoplayTabs } from "@/lib/use-autoplay-tabs";
import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { dedicatedTabs } from "../../config/options";
import { DlpMotionRoot, dlpScenes } from "../motion/dlp-motion";
import { TextLink } from "../shared/text-link";

/** Each component's turn: its motion visual's run plus the hold. */
const turns = dedicatedTabs.map((tab) => tabTurn(dlpScenes[tab.scene].duration));

/**
 * Figma "Library · Vertical tabs" (Dedicated landing pages), as Campaigns & outbound on Retain: the 280px list of
 * components on the left from 992px (above the panel below that), and the active component in the right column (its
 * name in Crimson 22, its line of Geist 16 and a text link over its Sell: Dynamic v2 motion visual, 738 × 680 in its
 * own framed panel). The active label is ink; the rest ink/60.
 *
 * They play on their own (see `useAutoplayTabs`): the gold rule under the active label fills over that component's
 * turn, then the next component takes over and the old rule fades and shrinks away. Choosing a component shows it,
 * starting its turn afresh.
 */
export function DedicatedTabList() {
  const { active, previous, plays, root, fills, open } = useAutoplayTabs(turns);

  return (
    <div ref={root} className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
      <nav aria-label="Dedicated landing page components" className="shrink-0 lg:w-[280px]">
        <ul className="flex flex-col">
          {dedicatedTabs.map((tab, i) => {
            const on = i === active;
            return (
              <li key={tab.label}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => open(i)}
                  className={cn(
                    // Inactive labels at ink/60, not Figma's /40, to pass AA on cream (brand guidelines 5.10).
                    "flex w-full cursor-pointer flex-col items-start gap-2 py-3 pr-5 text-left font-sans text-base leading-[1.1] tracking-[-0.32px] transition-colors lg:whitespace-nowrap duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                    on ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {/* No left padding: the labels line up with the heading above. */}
                  {tab.label}
                  {/* Hairline track, with the gold rule that fills over this component's turn. */}
                  <span aria-hidden className="relative h-px w-full bg-black/10">
                    <span
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                      className={cn(
                        "absolute -top-[0.5px] left-0 h-[2px] w-full origin-left bg-gold [scale:0_1]",
                        // Driven every frame while active; eased away (and faded) once the next component takes over.
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

      {/* Every component shares one cell and they crossfade (`.tab-panel`); a visual is drawn while its component shows or fades out, keyed to replay from the start. */}
      <div className="grid w-full min-w-0 lg:flex-[0_1_821px]">
        {dedicatedTabs.map((tab, i) => (
          <div key={tab.label} inert={i !== active} className="tab-panel flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start gap-5 bg-cream px-4 pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex flex-col items-start gap-3">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#040404]">{tab.label}</h3>
                <p className="max-w-[595px] font-sans text-base leading-6 tracking-[-0.32px] text-black/59">{tab.description}</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            {/* The component's motion visual (738 × 680), filling the column, up to 1.2× its drawn size. */}
            <div className="relative aspect-[738/680] w-full">
              {(i === active || i === previous) && (
                <ScenePanel key={plays[i]} scene={dlpScenes[tab.scene]} active={i === active} root={DlpMotionRoot} maxScale={1.2} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
