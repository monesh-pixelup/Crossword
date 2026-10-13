import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import ornament from "../../assets/header/ornament-tile.webp";

/**
 * Layout/Hero, Page header title variant (Figma 2335:4362, the brand kit's `.wk-ht`): under the
 * cream header, one swash title (Parisienne “P” at 100px, Crimson ExtraLight 80px at -4px) with the
 * doc's banner line in the slot below it, and to the right the 503 × 215 damask ornament (the
 * guidelines' damask ornament, tiled 95px a row in engraved beige on cream, as Figma's shader
 * renders it). A gold tick runs down the left rail from beside the title. The divider band that
 * closes the header in Figma opens the plans section below.
 */
export function PricingHeader() {
  return (
    <section aria-labelledby="pricing-title" className="relative pt-8 pb-10 lg:pb-[30px]">
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] h-[209px] w-px max-lg:hidden" />

      <div className="flex content-width items-center gap-16 lg:gap-[269px]">
        {/* The column is the title's width (250px), so the ornament starts 269px after the title as in Figma; the line runs on past it. */}
        <div className="flex min-w-0 flex-col items-start gap-2 lg:-ml-0.5 lg:w-[250px] lg:shrink-0">
          <h1
            id="pricing-title"
            className="font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-ink"
            style={{ zoom: "var(--h2-scale)" }}
          >
            <span className="font-script text-[100px] leading-[1.18] font-normal tracking-[5px]">P</span>
            <span className="text-[80px] leading-[1.1] tracking-[-4px]">ricing</span>
          </h1>
          <p className="max-w-[460px] font-sans text-base lg:w-[460px] lg:max-w-none leading-6 tracking-[-0.02em] text-ink-muted">
            <span className="text-ink">Crossword runs on credits.</span> You pay when your agent does something for a
            shopper and nothing when it doesn&rsquo;t.
          </p>
        </div>

        <div
          aria-hidden
          className="h-[215px] min-w-0 flex-[0_1_503px] bg-size-[216px_95px] bg-top-left max-lg:hidden"
          style={{ backgroundImage: `url(${ornament.src})` }}
        />
      </div>
    </section>
  );
}
