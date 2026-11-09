import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { CampaignTabs } from "./campaign-tabs";

/**
 * Figma "Library · Vertical tabs" (Campaigns & outbound): the eyebrow and a two-line headline, then
 * 80px below the vertical campaign tabs beside their panel. The page sets Figma's 75px divider band above it.
 * A 232px gold tick sits on the left rail beside the eyebrow (98px down in Figma).
 */
export function Campaigns() {
  return (
    <section aria-labelledby="campaigns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

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
            variant="dynamic"
            weight="light"
          />
        </div>

        <CampaignTabs />
      </div>
    </section>
  );
}
