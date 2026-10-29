import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { TriggerTabs } from "./trigger-tabs";

/** Opens with the patterned divider band under Conversion assistance (24px more top padding). */
export function ProactiveMessages() {
  return (
    <section aria-labelledby="proactive-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Proactive discovery messages</Eyebrow>
          <SectionTitle
            id="proactive-title"
            initial="S"
            firstLine="tarts the conversation based"
            secondLine="on what they're doing"
            width={688.32}
            weight="light"
          />
        </div>

        <TriggerTabs />
      </div>
    </section>
  );
}
