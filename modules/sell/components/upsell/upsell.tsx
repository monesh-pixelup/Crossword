import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NotchedFrame, notchMask } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { upsellFeatures } from "../../config/upsell";

/**
 * Figma "Library · Four-card row (Upsell & cross-sell)", as Storefront presence: the eyebrow and a
 * two-line headline (set as the page's others), then 80px below four equal cards (305px at 1280px,
 * 20px apart) on #fdf4de in a black/10 hairline: a 330px aubergine panel showing the left of the
 * Storefront cards' 411.33px damask art, framed like the site's other cards (a gold line 14px in
 * with concave notched corners and a ring in each), then 20px below the title in Crimson ExtraLight 24 over a line of Geist 14. A 209px gold tick sits on
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

        <ul className="grid w-full grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1400px]:grid-cols-4">
          {upsellFeatures.map((feature) => (
            <li key={feature.title} className="flex flex-col gap-5 overflow-clip border border-black/10 bg-[#fdf4de]">
              <div aria-hidden className="relative isolate h-[330px] w-full overflow-hidden bg-aubergine">
                {/*
                  The art carries its own straight gold frame (about 3% of its width and 4% of its
                  height in), so it is laid 24px past this notched 14px-inset window on every side
                  and covered from the left: at any card width its frame lands outside the window.
                */}
                <div className="absolute inset-[14px] overflow-hidden" style={{ mask: notchMask(46), WebkitMask: notchMask(46) }}>
                  <div className="absolute -inset-[24px]">
                    <Image src={feature.art} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-left" />
                  </div>
                </div>
                <NotchedFrame inset={14} radius={46} rings />
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
