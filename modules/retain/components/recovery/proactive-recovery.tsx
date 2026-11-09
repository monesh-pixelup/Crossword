import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { RecoveryList } from "./recovery-list";

/**
 * Figma "Library · Accordion + media" in its new layout, as Sell's Conversion assistance (node 3709:21532): the
 * eyebrow and two-line headline across the top, then 80px below them the recovery moments as an accordion in a 520px
 * column on the left and the 687 × 586 panel playing the open moment's Retain visual on the right.
 */
export function ProactiveRecovery() {
  return (
    <section aria-labelledby="recovery-title" className="relative section-pad">
      {/* The left rail's gold tick, 16.51px above the eyebrow. */}
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        {/* Figma 3257:38218: the headline 18px under the eyebrow. */}
        <div className="flex flex-col items-start gap-[18px]">
          <Eyebrow>Proactive recovery</Eyebrow>
          <SectionTitle
            id="recovery-title"
            initial="C"
            firstLine="atch them before they"
            secondLine="forget why they wanted it"
            width={725}
            variant="dynamic"
            weight="light"
          />
        </div>

        <RecoveryList />
      </div>
    </section>
  );
}
