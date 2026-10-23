import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { DedicatedTabList } from "./dedicated-tab-list";

/**
 * Figma "Library · Vertical tabs" (Dedicated landing pages): the eyebrow and a two-line headline (82px swash, 60px
 * lines, both 1.18), then 80px below the components stacked beside their pinned, scroll-driven list, as Campaigns &
 * outbound on Retain (see DedicatedTabList). A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function DedicatedTabs() {
  return (
    <section aria-labelledby="dedicated-tabs-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Dedicated landing pages</Eyebrow>
          <SectionTitle
            id="dedicated-tabs-title"
            initial="D"
            firstLine="edicated"
            secondLine="landing pages"
            width={290}
            variant="humanMode"
          />
        </div>

        <DedicatedTabList />
      </div>
    </section>
  );
}
