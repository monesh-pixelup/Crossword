import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { UpsellTabs } from "./upsell-tabs";

/**
 * Figma "Layout" (Upsell & cross-sell): the eyebrow and a two-line headline (1.18), then 80px below the
 * features as a tabbed panel (see UpsellTabs). The page sets Figma's 75px divider band above it. A 209px gold tick sits on the left rail beside the eyebrow.
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
            /*
              Below 768px the headline is one flowing sentence (all of it in the first line, the second line empty), so
              it wraps to the screen like running text rather than breaking again after each desktop line.
            */
            firstLine={
              <>
                {" bigger cart, because it makes"}
                <span className="md:hidden"> sense, not because it was pushed</span>
              </>
            }
            secondLine={<span className="max-md:hidden">sense, not because it was pushed</span>}
            width={760}
            variant="dynamic"
            weight="light"
          />
        </div>

        <UpsellTabs />
      </div>
    </section>
  );
}
