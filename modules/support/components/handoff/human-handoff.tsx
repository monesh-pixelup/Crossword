import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { HandoffTabs } from "./handoff-tabs";

/**
 * Figma "Stage + triggers" (Human-in-the-loop support, 3836:16962): on cream, the eyebrow 24px over a one-line swash
 * headline (688px box), then 80px below the stage playing the open mode's motion card over the three modes as tabs
 * (see HandoffTabs).
 */
export function HumanHandoff() {
  return (
    <section aria-labelledby="handoff-title" className="relative section-pad">
      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Human-in-the-loop handoff</Eyebrow>
          <SectionTitle
            id="handoff-title"
            initial="H"
            firstLine="uman-in-the-loop support"
            width={688.32}
            variant="oneLine"
            weight="light"
          />
        </div>

        <HandoffTabs />
      </div>
    </section>
  );
}
