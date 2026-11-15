import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/shared/rail-accent.svg";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ManagedLaunchDiagram } from "../motion/ml-motion";

/**
 * Figma "Library · Wide panel" (Journey, 3512:24936): the eyebrow over a left-aligned two-line headline, with the
 * process copy (Geist 16/24, 477px) bottom-aligned on the right, then 80px below them the Managed Launch diagram
 * (1280 × 598 at full width: the four steps of a managed launch, each with its deliverable, on the green damask in its
 * gold frame). The headline and copy sit side by side from 1280px, the copy narrowing to fit; below that the copy goes
 * under the headline.
 */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      {/* The left rail's 232px gold accent, 98px down. */}
      <RailAccent src={railAccent} className="absolute top-[calc(98px+var(--section-shift,0px))] left-[calc(var(--frame-inset)-0.5px)]" />

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

        {/*
          The Managed Launch diagram (the 15 November 2026 handoff): a block that fills the column and reflows by its own
          width (four step cards across, two, then one), so the one visual serves every screen width. It replaces the
          launch-checklist motion visual and its phone version (ManagedLaunchPanel and ManagedLaunchMwebPanel, still in
          ml-motion.tsx).
        */}
        <div className="w-full">
          <ManagedLaunchDiagram />
        </div>
      </div>
    </section>
  );
}
