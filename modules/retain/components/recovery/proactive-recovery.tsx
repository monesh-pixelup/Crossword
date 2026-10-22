import { Eyebrow } from "@/components/ui/eyebrow";
import { StrangerScroll } from "@/modules/dynamic-landing-pages/components/personalization/stranger-scroll";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { recoveryItems } from "../../config/recovery";
import { RecoveryMotion } from "../motion/retain-motion";

const title = "font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] text-[#040404]";
const body = "max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60";

/**
 * Figma "Library · Accordion + media" (Proactive recovery), scrolling like the home page's
 * Lifecycle section (as The stranger problem on Dynamic landing pages): the eyebrow and two-line
 * headline stick from 992px while the recovery moments scroll up under them, the one just below at
 * full strength (a 1px black/50 rule under the first, 0.5px black/20 rules between the rest, 64px
 * apart); the sticky 687 × 586 panel plays the Retain motion visual of the moment that's open.
 * Heading and panel pin 48px below the fixed site header, the gold rail tick pinned with the heading.
 */
export function ProactiveRecovery() {
  const last = recoveryItems.length - 1;

  return (
    <section aria-labelledby="recovery-title" className="relative section-pad">
      <div className="content-width">
        <StrangerScroll
          belowHeader
          heading={
            <div className="flex flex-col items-start gap-6">
              {/* Placed against the sticky heading (16.51px above it, out on the left rail) so it stays pinned with it, as on Lifecycle. */}
              <RailAccent className="absolute -top-[16.51px] left-[calc(var(--frame-inset)-var(--page-pad)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />
              <Eyebrow>Proactive recovery</Eyebrow>
              <SectionTitle
                id="recovery-title"
                initial="C"
                firstLine="atch them before they"
                secondLine="forget why they wanted it"
                width={553.133}
                variant="assist"
              />
            </div>
          }
          items={recoveryItems.map((item, i) => ({
            key: item.title,
            className: i === 0 ? "pb-8" : i === last ? "pt-16" : "py-16",
            rule: i === 0 ? "h-px bg-black/50" : i === last ? undefined : "h-[0.5px] bg-black/20",
            content: (
              <div className="flex flex-col items-start gap-3">
                <h3 className={title}>{item.title}</h3>
                <p className={body}>{item.description}</p>
              </div>
            ),
          }))}
          panel={
            <div className="relative aspect-[687/586] w-full overflow-clip bg-aubergine">
              <RecoveryMotion />
            </div>
          }
        />
      </div>
    </section>
  );
}
