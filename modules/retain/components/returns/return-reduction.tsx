import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import cardArt from "../../assets/returns/card-art.webp";

/**
 * Figma "Library · Three-card row" (Return reduction), as Storefront presence on Sell: the eyebrow,
 * a two-line headline and a line of 14px copy, then 80px below three equal cards (413.33px at
 * 1280px, 20px apart) on #fdf4de in a black/10 hairline, each a 330px textured aubergine panel
 * with the damask in its gold frame, exported from Figma as one image.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function ReturnReduction() {
  return (
    <section aria-labelledby="returns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Return reduction</Eyebrow>
          <SectionTitle id="returns-title" initial="M" firstLine="ore confidence at checkout." secondLine="Fewer returns after it" width={760} />
          <p className="max-w-[760px] font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">
            Crossword helps customers choose with more confidence, so they&rsquo;re less likely to buy the wrong size, shade,
            or product in the first place.
          </p>
        </div>

        <ul aria-hidden className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li key={i} className="overflow-clip border border-black/10 bg-[#fdf4de]">
              {/* The whole 330px panel as Figma exports it: textured aubergine, the damask and its gold frame. */}
              <Image src={cardArt} alt="" sizes="(min-width: 992px) 412px, (min-width: 768px) 48vw, 96vw" className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
