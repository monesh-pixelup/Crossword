import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelArt from "@/modules/sell/assets/upsell/panel-aubergine.webp";
import { OptionList } from "./option-list";

/**
 * Figma "Section · Options (Two ways to go dynamic)" (3361:299): on the left the eyebrow, 18px above a
 * two-line headline (82px swash, Crimson Light 60 at 1.1), and 67px under it the two options; on the
 * right, 10px down, the 687 × 586 aubergine panel (its damask in the notched gold frame with a ring in
 * each corner, as Upsell's on Sell). Below 1260px the panel goes under the options at its 687:586 shape.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function TwoWays() {
  return (
    <section aria-labelledby="two-ways-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-12 min-[1260px]:flex-row min-[1260px]:items-start min-[1260px]:justify-between min-[1260px]:gap-8">
        <div className="flex min-w-0 flex-col items-start gap-12 lg:gap-[67px]">
          <div className="flex flex-col items-start gap-[18px]">
            <Eyebrow>Options</Eyebrow>
            <SectionTitle id="two-ways-title" initial="T" firstLine="wo ways" secondLine="to go dynamic" width={553.133} weight="light" />
          </div>
          <OptionList />
        </div>

        {/* TODO: the option's motion scene plays in the panel once Figma has one. */}
        <div className="relative aspect-[687/586] w-full overflow-clip bg-aubergine min-[1260px]:mt-2.5 min-[1260px]:w-[687px] min-[1260px]:shrink">
          <Image src={panelArt} alt="" fill sizes="(min-width: 1280px) 687px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
