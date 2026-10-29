import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/shared/rail-accent.svg";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panel from "../../assets/journey/panel.webp";

/**
 * Figma "Library · Wide panel" (Journey, 3512:24936): the eyebrow over a left-aligned two-line headline, with the
 * process copy (Geist 16/24, 477px) bottom-aligned on the right, then 80px below them the 1280 × 599 green
 * damask panel in its gold frame (exported from Figma at 2x). The headline and copy sit side by side from 1280px, the
 * copy narrowing to fit; below that the copy goes under the headline.
 */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      {/* The left rail's 232px gold accent, 98px down. */}
      <RailAccent src={railAccent} className="absolute top-[98px] left-[calc(var(--frame-inset)-0.5px)]" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
          <div className="flex min-w-0 flex-col items-start gap-6">
            <Eyebrow>Journey</Eyebrow>
            <SectionTitle
              id="journey-title"
              initial="M"
              firstLine="ost projects reach completion."
              secondLine="Crossword grows with every step"
              width={732.406}
              variant="journey"
              weight="light"
            />
          </div>
          <p className="w-full max-w-[477.244px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60 xl:min-w-0 xl:flex-1">
            You share your objectives. We suggest potential journeys. We adapt the experience to your business. A/B test.
            Measure the results. Make changes. Launch and continue to optimize.
          </p>
        </div>

        <Image src={panel} alt="" sizes="(min-width: 1440px) 1280px, 100vw" className="h-auto w-full" />
      </div>
    </section>
  );
}
