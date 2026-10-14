import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import damaskMaroon from "../../assets/gap/damask-maroon.webp";
import ring from "../../assets/gap/ring.svg";

/** The panel's four 10px gold rings, on the corners of the damask's gold line. */
const rings = ["top-[16.26px] left-[20.79px]", "top-[21.3px] right-[20.2px]", "bottom-[16.18px] left-[18.52px]", "right-[20.2px] bottom-[16.18px]"];

/**
 * Figma "Library · Wide panel": the eyebrow and a three-line headline on the left, two paragraphs
 * of Geist Light bottom-aligned on the right, then 80px below a 1280 × 599 aubergine panel holding
 * the maroon damask (its gold line drawn in, 21.91px in from the sides and 18.13px from the top)
 * with a gold ring at each corner. A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function RoasGap() {
  return (
    <section aria-labelledby="gap-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>The ROAS gap</Eyebrow>
            <SectionTitle
              id="gap-title"
              initial="Y"
              firstLine="our ad knows why"
              secondLine={
                <>
                  someone clicked, but
                  <br />
                  your store doesn&rsquo;t
                </>
              }
              width={614.744}
              variant="airy"
            />
          </div>

          <div className="flex max-w-[477.244px] flex-col gap-6 font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            <p>
              A specific product, a specific offer, a specific audience, all carefully built into the ad. Then the click
              lands on the same generic page everyone sees. The result? You spend to win the click, but lose the
              opportunity to convert it.
            </p>
            <p>
              Crossword closes the gap. Instead of sending every ad to the same landing page, Crossword builds the page
              around the ad, the headline, the product, the offer, so the experience after the click feels like a
              continuation of the ad, not a disconnected destination.
            </p>
          </div>
        </div>

        <div aria-hidden className="relative aspect-[1280/599] w-full overflow-clip bg-aubergine">
          <div className="absolute inset-x-[21.91px] inset-y-[18.13px]">
            <Image src={damaskMaroon} alt="" fill sizes="(min-width: 1440px) 1237px, 97vw" className="object-fill" />
          </div>
          {rings.map((place) => (
            <Image key={place} src={ring} alt="" className={`absolute size-2.5 ${place}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
