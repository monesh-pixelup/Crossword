import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { DlpScenePanel } from "../motion/dlp-scene-panel";

/**
 * Figma "Library · Wide panel": the eyebrow and a three-line headline on the left, two paragraphs
 * of Geist Light on the right, top-aligned with the headline (below the eyebrow's 32px and its 24px gap), then 80px below
 * the ROAS gap motion visual (1280 × 600, Sell: Dynamic v2 01: the ad, the lost context, the generic store and the
 * drop-off, in its own framed panel). A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function RoasGap() {
  return (
    <section aria-labelledby="gap-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        {/*
          Side by side only from 1300px, where the row holds the 614.7px headline and the 477px copy with room between;
          narrower, the copy would be squeezed into a tall, narrow column, so it stacks under the headline instead.
        */}
        <div className="flex w-full flex-col items-start gap-8 min-[1300px]:flex-row min-[1300px]:items-start min-[1300px]:justify-between min-[1300px]:gap-12">
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
              weight="light"
            />
          </div>

          {/* Side by side, it starts level with the headline rather than the eyebrow: the eyebrow's 32px plus its 24px gap down. */}
          <div className="flex max-w-[477.244px] flex-col gap-6 font-sans text-base leading-6 tracking-[-0.32px] text-black/60 min-[1300px]:mt-14">
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

        <div className="relative aspect-[1280/600] w-full">
          {/*
            Fills the content width (past its drawn 1280px on wide screens). Scaled with a transform: zoomed down to a
            phone's width its text would hit the browser's minimum font size and overflow.
          */}
          <DlpScenePanel slug="roas-gap-motion" fill transform />
        </div>
      </div>
    </section>
  );
}
