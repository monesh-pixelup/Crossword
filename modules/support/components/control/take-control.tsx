import frameBackground from "../../assets/control/scene-frame-background-forest.svg";
import frameTexture from "../../assets/control/background-texture-forest.webp";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { SupportScenePanel } from "../motion/support-scene-panel";

/**
 * "Take control, whenever you like", laid out from 768px as the help desk section under it (HelpdeskOptions, Figma's
 * wide-panel layout): the two-line headline on the left with its copy bottom-aligned on the right (side by side from
 * 1280px, the copy under the headline below that), then 80px below them the visual across the content width on the
 * forest wide stage (1280 × 599): Support V3 10b, "You keep control" on the full helpdesk dashboard
 * (`merchant-insight-dashboard`: the Details summary writes itself in, the team member asks the AI, it answers in a
 * private note and drafts the reply), which draws the forest panel itself.
 *
 * Below 768px it is as it was: the copy under the headline, then Support V3 10 (`merchant-insight-inbox`, the helpdesk
 * inbox with its camera) in the home page Lifecycle cards' frame in forest green, 738 × 680 with a gold ring in each
 * corner and the damask texture inside its notched gold rule, the visual centred on it (its own green card hidden).
 * A 209px gold tick sits on the left rail beside the headline.
 */
export function TakeControl() {
  return (
    <section aria-labelledby="control-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-14 md:gap-section">
        {/* The headline and its copy side by side from 1280px, the copy bottom-aligned; below that the copy goes under. */}
        <div className="flex w-full flex-col items-start gap-[18px] md:gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
          <div className="flex min-w-0 flex-col items-start">
            <SectionTitle id="control-title" initial="T" firstLine="ake control," secondLine="whenever you like" width={553.133} variant="dynamic" weight="light" />
          </div>
          <p className="max-w-[553px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-2">
            Crossword gives the human-in-the-loop full context. Every conversation, workflow, order, page viewed, note and
            stuck moment. Crossword can surface the important bits, while the human stays in control.
          </p>
        </div>

        {/*
          From 768px: 10b, "You keep control" on the helpdesk dashboard (1280 × 599), which draws Figma's forest wide
          panel itself (the damask, gold notched frame and studs) with the helpdesk window on it. It fills the content
          width, scaled with a transform, as the help desk dashboard below: zoomed down its text would hit the
          browser's minimum font size.
        */}
        <div className="relative aspect-[1280/599] w-full overflow-clip bg-forest max-md:hidden">
          <SupportScenePanel slug="merchant-insight-dashboard" fill transform replayAfter={3000} />
        </div>

        {/*
          Below 768px: the home page Lifecycle frame in forest green (738 × 680, drawn at the column's width): the ground
          (#003c1f) with its four gold rings, and the damask texture with its notched gold rule 13.16px / 15.98px in. Over
          it the "You keep control" inbox (687 × 586, never past its drawn size), centred, without its own green card
          (`.sup-plain`).
        */}
        <div className="relative aspect-[738/680] w-full overflow-clip md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed frame art, scaled with the panel */}
          <img src={frameBackground.src} alt="" aria-hidden className="absolute inset-0 size-full" />
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed frame art, scaled with the panel */}
          <img
            src={frameTexture.src}
            alt=""
            aria-hidden
            className="absolute top-[calc(100%*15.98/680)] left-[calc(100%*13.16/738)] h-[calc(100%*648.036/680)] w-[calc(100%*711.68/738)]"
          />
          <div className="sup-plain absolute inset-0">
            <SupportScenePanel slug="merchant-insight-inbox" replayAfter={3000} />
          </div>
        </div>
      </div>
    </section>
  );
}
