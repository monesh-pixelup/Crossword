import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { UpsellTabs } from "./upsell-tabs";

/**
 * Figma "Layout" (Upsell & cross-sell): the eyebrow and a two-line headline (1.18), then 80px below the
 * features as a tabbed panel (see UpsellTabs). A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function Upsell() {
  return (
    <section aria-labelledby="upsell-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Upsell &amp; cross-sell</Eyebrow>
          <SectionTitle
            id="upsell-title"
            initial="A"
            firstLine=" bigger cart, because it makes"
            secondLine="sense, not because it was pushed"
            width={1000}
            variant="humanMode"
          />
        </div>

        <UpsellTabs />
      </div>
    </section>
  );
}
