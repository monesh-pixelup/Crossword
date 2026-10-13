import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { outboundChannels, sequence } from "../../config/channels";

const groupLabel = "font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase";
const groupBody = "max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted";

/**
 * Layout/Process, Timeline variant, set to the web kit (`.wk-tl`): centred eyebrow and headline,
 * then the channel sequence as steps on a dashed gold rule (10px gold dots, script numerals,
 * Crimson 22 channel names, square sand tags), and under a hairline the outbound channels as
 * engraved chips.
 */
export function RetentionChannels() {
  return (
    <section aria-labelledby="retention-channels-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Retention channels</Eyebrow>
          <SectionTitle
            id="retention-channels-title"
            initial="O"
            firstLine="ne relationship, sequenced"
            secondLine="across every channel"
            width={660}
            variant="centered"
          />
        </div>

        <div className="flex w-full flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className={groupLabel}>Channel sequencing</h3>
              <p className={groupBody}>
                Decides the right order to reach out, for instance iMessage first, then email, then SMS, instead of all at
                once.
              </p>
            </div>

            <ol className="grid gap-12 sm:grid-cols-3 sm:gap-6">
              {sequence.map((step, i) => (
                <li key={step.channel} className="flex flex-col gap-4">
                  <span aria-hidden className="flex items-center">
                    <span className="size-2.5 shrink-0 rounded-full bg-gold" />
                    <span className="flex-1 border-t border-dashed border-gold" />
                  </span>
                  <span className="font-script text-[28px] leading-none tracking-[-1px] text-ink">0{i + 1}</span>
                  <span className="flex flex-col items-start gap-3">
                    <span className="bg-sand px-2 py-1 font-sans text-[11px] leading-[1.3] tracking-[0.06em] text-label-olive uppercase shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                      {step.tag}
                    </span>
                    <span className="font-serif text-[22px] leading-[1.15] tracking-[-0.03em] text-ink">{step.channel}</span>
                    <span className="max-w-[320px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6 border-t-[0.5px] border-rail pt-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4">
              <h3 className={groupLabel}>WhatsApp, SMS &amp; email outbound</h3>
              <p className={groupBody}>Delivered wherever they&rsquo;re most likely to see it.</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {outboundChannels.map((channel) => (
                <li
                  key={channel}
                  className="bg-cream px-5 py-3 font-serif text-[20px] leading-none tracking-[-0.03em] text-ink shadow-[inset_0_0_0_1px_var(--color-engraved)] odd:bg-sand"
                >
                  {channel}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
