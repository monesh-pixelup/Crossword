import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/shared/rail-accent.svg";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ManagedLaunchPanel } from "../motion/ml-motion";

/**
 * Figma "Library · Wide panel" (Journey, 3512:24936): the eyebrow over a left-aligned two-line headline, with the
 * process copy (Geist 16/24, 477px) bottom-aligned on the right, then 80px below them the Managed Launch motion
 * visual (1280 × 599: the launch checklist beside Aurelle's storefront, on the green damask in its gold frame). The headline and copy sit side by side from 1280px, the
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
              variant="dynamic"
              weight="light"
            />
          </div>
        </div>

        <div className="relative aspect-[1280/599] w-full">
          <ManagedLaunchPanel />
        </div>
      </div>
    </section>
  );
}
