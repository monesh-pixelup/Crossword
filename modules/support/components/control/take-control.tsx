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
 * Below 768px: the copy under the headline, then 10m (`merchant-insight-mweb`, 353 × 440, the 27 November 2026 update):
 * the same story with the inbox folded into one chat window, the Summary landing in the conversation, on the forest
 * green mobile frame the human-in-the-loop visuals (07m–09m) use.
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
          Below 768px: 10m, "You keep control" for phones (353 × 440): the inbox folded into one chat window (no rail,
          conversation list or Details; the Summary lands in the conversation as the AI's card), on its forest green
          mobile frame, as the human-in-the-loop visuals above. Drawn at the column's width, scaled with a transform.
        */}
        <div className="relative aspect-[353/440] w-full overflow-clip bg-forest md:hidden">
          <SupportScenePanel slug="merchant-insight-mweb" fill transform replayAfter={3000} />
        </div>
      </div>
    </section>
  );
}
