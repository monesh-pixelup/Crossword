import { Fragment } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { cycle, exampleJourneys, howSteps } from "../../config/launch";
import { ChecklistCard } from "./checklist-card";

const body = "font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted";

/** The three example journeys inside step 2: square sand cards, each step on a dashed gold rule. */
function ExampleJourneys() {
  return (
    <ul className="mt-3 grid gap-3 md:grid-cols-3">
      {exampleJourneys.map((journey) => (
        <li key={journey.name} className="flex flex-col gap-4 bg-sand p-5 shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
          <p className="font-serif text-[18px] leading-[1.15] tracking-[-0.03em] text-ink">&lsquo;{journey.name}&rsquo; journey</p>
          <ol className="flex flex-col">
            {journey.steps.map((step, i) => (
              <li key={step} className="relative flex gap-3 pb-3 last:pb-0">
                {/* The dashed rule runs from each dot down to the next. */}
                {i < journey.steps.length - 1 && (
                  <span aria-hidden className="absolute top-3 bottom-0 left-[3.5px] border-l border-dashed border-gold" />
                )}
                <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
                <span className="font-sans text-[13px] leading-[1.45] tracking-[-0.02em] text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
}

/**
 * How it works, as the doc's checklist of to-do cards: from 1200px a sticky header on the left
 * (eyebrow, the cycle as the swash headline, and the cycle again as engraved chips) beside the six
 * cards, each ticking off as it comes into view. Step 2 carries the three example journeys.
 */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between min-[1200px]:gap-16">
        <div className="flex flex-col items-start gap-6 min-[1200px]:sticky min-[1200px]:top-12 min-[1200px]:max-w-[460px]">
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle
            id="how-title"
            initial="G"
            firstLine="oal, journeys, launch,"
            secondLine="learn, improve, repeat"
            width={420}
            variant="assist"
          />
          <ol aria-label="The cycle" className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-3">
            {cycle.map((stage, i) => (
              <Fragment key={stage}>
                {i > 0 && (
                  <li aria-hidden className="text-gold">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                      <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
                    </svg>
                  </li>
                )}
                <li className="bg-cream px-2 py-1.5 font-sans text-[12px] leading-none tracking-[-0.02em] text-ink-soft shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                  {stage}
                </li>
              </Fragment>
            ))}
          </ol>
        </div>

        <ol className="flex w-full flex-col gap-4 min-[1200px]:max-w-[760px] min-[1200px]:flex-[0_1_760px]">
          {howSteps.map((step, i) => (
            <ChecklistCard key={step.title} index={i} title={step.title}>
              <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink">{step.lead}</p>
              {step.body.map((line) => (
                <p key={line} className={body}>
                  {line}
                </p>
              ))}
              {i === 1 && <ExampleJourneys />}
            </ChecklistCard>
          ))}
        </ol>
      </div>
    </section>
  );
}
