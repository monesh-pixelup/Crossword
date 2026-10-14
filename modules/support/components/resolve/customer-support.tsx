import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ResolveTabs } from "./resolve-tabs";

/**
 * Opens with the patterned divider band under the intro statement. Figma "Library · Vertical tabs":
 * eyebrow, headline and subline stacked 24px apart, a 232px gold tick on the left rail from 22px
 * above the eyebrow, and the tabs 80px below.
 */
export function CustomerSupport() {
  return (
    <section aria-labelledby="resolve-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+2px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Customer support</Eyebrow>
          <SectionTitle
            id="resolve-title"
            initial="C"
            firstLine="ustomer support,"
            secondLine="handled by Crossword"
            width={707.715}
          />
          <p className="font-sans text-base leading-6 tracking-[-0.48px] text-black/59">
            The questions that shouldn&rsquo;t need a ticket.
          </p>
        </div>

        <ResolveTabs />
      </div>
    </section>
  );
}
