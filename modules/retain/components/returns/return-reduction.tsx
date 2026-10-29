import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ReturnMotion } from "../motion/retain-motion";

/**
 * Figma "Library · Three-card row" (Return reduction), as Storefront presence on Sell: the eyebrow,
 * a two-line headline and a line of 16px copy, then 80px below the 1280 × 599 Retain motion visual
 * (a confident size, then it's in the cart), zoomed as a whole to the column width.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function ReturnReduction() {
  return (
    <section aria-labelledby="returns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Return reduction</Eyebrow>
          <SectionTitle id="returns-title" initial="M" firstLine="ore confidence at checkout." secondLine="Fewer returns after it" width={760} weight="light" />
          <p className="max-w-[760px] font-sans text-sm leading-5 tracking-[-0.28px] text-black/60">
            Crossword helps customers choose with more confidence, so they&rsquo;re less likely to buy the wrong size, shade,
            or product in the first place.
          </p>
        </div>

        <div className="relative aspect-[1280/599] w-full overflow-clip bg-[#660331]">
          <ReturnMotion />
        </div>
      </div>
    </section>
  );
}
