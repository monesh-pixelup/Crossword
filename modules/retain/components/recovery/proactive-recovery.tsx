import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { RecoveryList } from "./recovery-list";

/** Proactive recovery: the moments Crossword reaches back out, each with the message it sends. */
export function ProactiveRecovery() {
  return (
    <section aria-labelledby="recovery-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <SectionTick />

      <div className="content-width">
        <RecoveryList
          header={
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Proactive recovery</Eyebrow>
              <SectionTitle
                id="recovery-title"
                initial="C"
                firstLine="atch them before they"
                secondLine="forget why they wanted it"
                width={520}
                variant="assist"
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
