import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AudienceMotion } from "../motion/retain-motion";

/**
 * Figma "Library · Wide panel" (Audiences): the eyebrow and a two-line headline on the left, a line
 * of Geist Light copy bottom-aligned on the right (stacked under the headline below 1200px, where
 * the two no longer fit side by side), then 80px below the 1280 × 599 Retain motion visual
 * (discovering demand from past conversations), zoomed as a whole to the column width. A 232px
 * gold tick sits on the left rail beside the eyebrow.
 */
export function AudienceBuilder() {
  return (
    <section aria-labelledby="audience-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-6 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between min-[1200px]:gap-12">
          <div className="flex max-w-full flex-col items-start gap-6">
            <Eyebrow>Audiences</Eyebrow>
            <SectionTitle id="audience-title" initial="T" firstLine="urn customer patterns" secondLine="into your audience" width={614.744} />
          </div>
          <p className="max-w-[477.244px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Find demand buried in past conversations, even when shoppers never joined a waiting list.
          </p>
        </div>

        <div className="relative aspect-[1280/599] w-full overflow-clip bg-[#00331b]">
          <AudienceMotion />
        </div>
      </div>
    </section>
  );
}
