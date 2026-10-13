import { Eyebrow } from "@/components/ui/eyebrow";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { controlSignals } from "../../config/control";
import { ConsoleMock } from "./console-mock";

/**
 * Layout/Showcase, Wide panel variant: a sand panel between the page rails (0.5px black/25
 * hairline, as the Node diagram's), copy on the left with what the person can see as studded
 * chips, and the team console on the right.
 */
export function TakeControl() {
  return (
    <section aria-labelledby="control-title" className="relative px-(--frame-inset) pt-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] max-w-[1280px] flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between min-[1200px]:gap-16">
          <div className="flex flex-col items-start gap-6 min-[1200px]:max-w-[480px]">
            <Eyebrow surface="sand">Complete control</Eyebrow>
            <SectionTitle id="control-title" initial="T" firstLine="ake control," secondLine="whenever you like" width={480} />
            <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
              Crossword gives the human-in-the-loop full context. Every conversation, workflow, order, page viewed, note,
              and stuck moment. Crossword can surface the important bits, while the human stays in control.
            </p>
            <ul aria-label="What your team sees" className="mt-2 flex flex-wrap gap-2">
              {controlSignals.map((signal) => (
                <li
                  key={signal}
                  className="relative bg-cream px-4 py-2.5 font-sans text-[14px] leading-none tracking-[-0.02em] text-ink-soft shadow-[inset_0_0_0_0.5px_var(--color-engraved)]"
                >
                  <Studs inset={2.5} />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full min-[1200px]:max-w-[720px] min-[1200px]:flex-[0_1_720px]">
            <ConsoleMock />
          </div>
        </div>
      </div>
    </section>
  );
}
