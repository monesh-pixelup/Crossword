import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { CampaignTabs } from "./campaign-tabs";

/**
 * Figma "Library · Vertical tabs" (Campaigns & outbound): the eyebrow and a two-line headline, then
 * 80px below the vertical campaign tabs beside their panel. Opens with the patterned divider band
 * (24px more top padding), so the 232px gold tick, 22px above the eyebrow in Figma, sits 2px below
 * the section padding.
 */
export function Campaigns() {
  return (
    <section aria-labelledby="campaigns-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+2px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          {/* Snapped to whole pixels, so its 0.5px frame and corner curls stay crisp at 1x. */}
          <SnappedEyebrow className="h-8">Campaigns &amp; outbound</SnappedEyebrow>
          <SectionTitle
            id="campaigns-title"
            initial="O"
            firstLine={<span className="font-light">utreach that knows when to</span>}
            secondLine="speak, and when not to"
            width={707.715}
          />
        </div>

        <CampaignTabs />
      </div>
    </section>
  );
}
