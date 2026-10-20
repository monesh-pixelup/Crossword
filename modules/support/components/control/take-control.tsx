import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { SupportScenePanel } from "../motion/support-scene-panel";

/**
 * Figma "Library · Accordion + media" (Human has complete control): on the left the eyebrow, a
 * two-line headline (77px swash, 50px lines at 1.1, the page's other headings' leading) and a 462.87px line of copy, 18px apart; on
 * the right, 10px down, the 687 × 586 merchant-insight motion scene (a helpdesk chat in a green
 * notched frame). A 209px gold
 * tick sits on the left rail beside the eyebrow.
 */
export function TakeControl() {
  return (
    <section aria-labelledby="control-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex flex-col items-start gap-[18px] lg:shrink-0">
          <Eyebrow>Human has complete control</Eyebrow>
          <SectionTitle id="control-title" initial="T" firstLine="ake control," secondLine="whenever you like" width={553.133} variant="assist" />
          <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            Crossword gives the human-in-the-loop full context. Every conversation, workflow, order, page viewed, note and
            stuck moment. Crossword can surface the important bits, while the human stays in control.
          </p>
        </div>

        {/* The merchant-insight motion scene: a helpdesk chat in its green notched frame (687 × 586). */}
        <div className="relative aspect-[687/586] w-full lg:mt-2.5 lg:w-[687px] lg:shrink">
          <SupportScenePanel slug="merchant-insight" />
        </div>
      </div>
    </section>
  );
}
