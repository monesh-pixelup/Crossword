import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { upsellFeatures } from "../../config/upsell";

/**
 * Figma "Library · Four-card row (Upsell & cross-sell)", as Storefront presence: the eyebrow and a
 * two-line headline (set as the page's others), then 80px below four equal cards (305px at 1280px,
 * 20px apart) on #fdf4de in a black/10 hairline: a 330px aubergine panel showing the left of the
 * Storefront cards' 411.33px damask art (its gold frame 12.25px in, cropped on the right), then
 * 20px below the title in Crimson ExtraLight 24 over a line of Geist 14. A 209px gold tick sits on
 * the left rail beside the eyebrow.
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
          />
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upsellFeatures.map((feature) => (
            <li key={feature.title} className="flex flex-col gap-5 overflow-clip border border-black/10 bg-[#fdf4de]">
              <div aria-hidden className="relative h-[330px] w-full overflow-hidden bg-aubergine">
                <Image src={feature.art} alt="" sizes="412px" className="absolute top-0 left-0 h-[330px] w-[411.333px] max-w-none" />
              </div>
              <div className="flex flex-col items-start gap-2 px-5 pb-5">
                <h3 className="font-serif text-[24px] leading-[1.1] font-extralight tracking-[-1.2px] text-ink">{feature.title}</h3>
                <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
