import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { NotchedPanel } from "../shared/livery";
import { OptionList } from "./option-list";

/**
 * Figma "Library · Numbered panel (Two ways)": the eyebrow and headline, then 80px below a 680px
 * row: the numbered option list on the left (32px down) and, at the far right, the home page's
 * maroon card (scroll damask 14px in, notched gold corners, a ring in each) at 738 × 680. A 209px
 * gold tick sits on the left rail beside the eyebrow. It opens with the patterned divider band, which
 * adds 24px to the top padding.
 */
export function TwoWays() {
  return (
    <section aria-labelledby="two-ways-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+7.49px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Options</Eyebrow>
          <SectionTitle
            id="two-ways-title"
            initial="T"
            firstLine="wo ways"
            secondLine={<span className="font-light">to go dynamic</span>}
            width={483.867}
            variant="display"
          />
        </div>

        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <OptionList />
          <NotchedPanel
            tone="scroll"
            inset={14}
            radius={46}
            rings
            className="aspect-[738/680] w-full lg:aspect-auto lg:h-[680px] lg:w-[738px] lg:shrink"
          >
            {null}
          </NotchedPanel>
        </div>
      </div>
    </section>
  );
}
