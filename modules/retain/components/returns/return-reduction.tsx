import { Eyebrow } from "@/components/ui/eyebrow";
import grainTile from "@/modules/landing/assets/trust/grain-tile.webp";
import { DashedGuides } from "@/modules/landing/components/shared/dashed-guides";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ChatThread } from "@/modules/support/components/shared/chat-thread";
import { returnThread } from "../../config/returns";

/**
 * Return reduction, set like the home page's Trust band (“Your data is safe with us”): a full-bleed
 * forest band holding a deep-green card with the soft-light grain tile at 40%, framed by gold
 * dashed guides that overshoot its corners. Inside, the eyebrow, headline and copy on the left and
 * the size-advice conversation on the ivory chat card on the right, as the guidelines put mock-ups
 * on jewel panels (10.4).
 */
export function ReturnReduction() {
  return (
    <section aria-labelledby="returns-title" className="relative bg-forest py-12 md:py-16 lg:py-[87px]">
      <div className="relative content-width px-5 py-12 shadow-[0_0_2px_rgba(0,0,0,0.25)] md:px-8 md:py-16 lg:px-16 lg:py-20">
        {/* Card surface: deep green with a soft-light grain tile at 40%. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-forest-deep" />
          <div
            className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: `url(${grainTile.src})` }}
          />
        </div>
        <DashedGuides />

        <div className="relative mx-auto flex w-full max-w-[1120px] flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between min-[1200px]:gap-16">
          <div className="flex flex-col items-start gap-6 min-[1200px]:max-w-[560px]">
            <Eyebrow surface="green">Return reduction</Eyebrow>
            <SectionTitle
              id="returns-title"
              initial="M"
              firstLine="ore confidence at checkout."
              secondLine="Fewer returns after it"
              width={560}
              variant="assist"
              tone="light"
            />
            <p className="max-w-[480px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
              Crossword helps customers choose with more confidence, so they&rsquo;re less likely to buy the wrong size,
              shade, or product in the first place.
            </p>
          </div>

          <div className="w-full min-[1200px]:max-w-[500px] min-[1200px]:flex-[0_1_500px]">
            <ChatThread messages={returnThread} />
          </div>
        </div>
      </div>
    </section>
  );
}
