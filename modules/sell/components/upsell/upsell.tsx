import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import grainTile from "@/modules/landing/assets/trust/grain-tile.webp";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import frameOrnament from "../../assets/upsell/frame-ornament.svg";
import { upsellFeatures } from "../../config/upsell";

/** Deep green with the soft-light grain tile at 40%, as on the Trust panel. */
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
      style={{ backgroundImage: `url(${grainTile.src})` }}
    />
  );
}

/** 1px rule dashed 2 / 2 in #1d4324, like Figma's stroke-dasharray. */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,#1d4324_0_2px,transparent_2px_4px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,#1d4324_0_2px,transparent_2px_4px)]";

/**
 * Four features between dashed rules that overshoot the row by 36.26px a side, on a band 6% darker.
 * From 992px five dashed verticals (1288 × 313.5px in Figma, 322px apart at the 1245px row) frame
 * the columns, overshooting the block 22.26px above and 21.26px below.
 */
function Features() {
  return (
    <div className="relative flex w-full flex-col gap-10">
      <div aria-hidden className="pointer-events-none absolute top-[0.67px] -right-[21px] -left-[22.5px] h-[268.97px] bg-black/6 max-lg:hidden" />
      <div aria-hidden className="pointer-events-none max-lg:hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`absolute -top-[22.26px] h-[313.51px] ${dashedV}`}
            style={{ left: `calc(-21.5px + ${i} * (100% + 43px) / 4)` }}
          />
        ))}
      </div>

      <div aria-hidden className={`relative -mx-[36.26px] ${dashedH}`} />
      <ul className="relative grid w-full grid-cols-1 gap-x-[35px] gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {upsellFeatures.map((feature) => (
          <li key={feature.title} className="flex flex-col items-start gap-10 lg:gap-20">
            <Image src={feature.icon} alt="" className="size-6" />
            <div className="flex flex-col items-start gap-3 font-light">
              <h3 className="font-serif text-[24px] leading-[1.1] tracking-[-0.96px] text-white">{feature.title}</h3>
              <p className="font-sans text-base leading-6 tracking-[-0.32px] text-white/80">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div aria-hidden className={`relative -mx-[36.26px] ${dashedH}`} />
    </div>
  );
}

/**
 * Upsell & cross-sell: a deep green panel between the page rails (1392 × 800 at 1440px) inside a
 * double gold hairline frame with corner notches, the headline centred over the feature row.
 */
export function Upsell() {
  return (
    <section aria-labelledby="upsell-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip bg-[#00331a] px-5 pt-14 pb-16 md:px-10 md:pt-16 md:pb-24 lg:px-[73.5px] lg:pt-[70px] lg:pb-[138px]">
        <Grain />
        {/* Frame ornament: 8px in from the sides, 19px from the top and 12px from the bottom. */}
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frameOrnament} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1245px] flex-col items-center gap-16 lg:gap-[120px]">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green" className="w-[194px]">
              Upsell &amp; Cross-Sell
            </Eyebrow>
            <SectionTitle
              id="upsell-title"
              initial="A"
              firstLine={"  bigger cart, because it makes"}
              secondLine="sense, not because it was pushed."
              width={715.672}
              variant="upsell"
              tone="light"
            />
          </div>

          <Features />
        </div>
      </div>
    </section>
  );
}
