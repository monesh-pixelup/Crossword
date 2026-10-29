import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "../../assets/shared/rail-accent.svg";
import { ShopperPanel } from "../motion/panels";
import { DividerBand } from "../shared/divider-band";
import { RailAccent } from "../shared/rail-accent";
import { SectionTitle } from "../shared/section-title";

export function ShopperExperience() {
  return (
    <section aria-labelledby="shopper-title" className="relative section-pad-band">
      <DividerBand glyph="chart" />
      <RailAccent
        src={railAccent}
        className="pointer-events-none absolute top-[122px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Shopper experience</Eyebrow>
            <SectionTitle
              id="shopper-title"
              weight="light"
              initial="G"
              firstLine="ive them a reason"
              secondLine="to choose you"
              width={614.744}
            />
          </div>
          <p className="w-full max-w-[477.244px] text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Improve ROAS. When someone arrives after considering a competitor, Crossword knows and makes the case for
            you on the spot, showing exactly why you&apos;re the better choice.
          </p>
        </div>

        <div className="@container w-full">
          <ShopperPanel />
        </div>
      </div>
    </section>
  );
}
