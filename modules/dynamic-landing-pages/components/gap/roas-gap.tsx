import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NotchedFrame, notchMask } from "../shared/livery";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import damaskMaroon from "../../assets/gap/damask-maroon.webp";

/**
 * Figma "Library · Wide panel": the eyebrow and a three-line headline on the left, two paragraphs
 * of Geist Light bottom-aligned on the right, then 80px below a 1280 × 599 maroon panel, its damask
 * inside the frame only and framed like the site's other cards (a gold line 14px in with concave notched corners and a ring
 * in each). A 232px gold tick sits on the left rail beside the eyebrow.
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
              variant="display"
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

        <div aria-hidden className="relative isolate aspect-[1280/599] w-full overflow-clip bg-maroon">
          {/* Plain maroon margin; the damask sits inside the frame, its notched corners cut away (laid 4px past the window to crop the hairline baked into the export's border). */}
          <div className="absolute inset-[14px] overflow-hidden" style={{ mask: notchMask(46), WebkitMask: notchMask(46) }}>
            <div className="absolute -inset-[4px]">
              <Image src={damaskMaroon} alt="" fill sizes="(min-width: 1440px) 1260px, 100vw" className="object-fill" />
            </div>
          </div>
          <NotchedFrame inset={14} radius={46} rings />
        </div>
      </div>
    </section>
  );
}
