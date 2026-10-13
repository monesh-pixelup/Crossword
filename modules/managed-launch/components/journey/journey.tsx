import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { GiltPanel, Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { journeySteps } from "../../config/launch";

/** From 992px each step stands 48px taller than the one before, so the row climbs. */
const heights = ["lg:h-[240px]", "lg:h-[288px]", "lg:h-[336px]", "lg:h-[384px]", "lg:h-[432px]", "lg:h-[480px]"];

const numeral = "font-script text-[28px] leading-none tracking-[-1px]";
const title = "font-serif text-[20px] leading-[1.15] tracking-[-0.03em]";

/**
 * The journey: “Crossword grows with every step”, drawn as a staircase. Six studded cards
 * (cream, then sand, on 1px engraved hairlines, as the web kit's bento tiles) climb 48px a step on
 * a shared baseline, each with its script numeral and step; the journeys Crossword suggests sit on
 * step 2 as square engraved chips. The last step, the launch, is the one jewel: the maroon scroll
 * damask in its gilt frame. Below 992px the steps form an even grid.
 */
export function Journey() {
  const last = journeySteps.length - 1;

  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>The journey</Eyebrow>
          <SectionTitle
            id="journey-title"
            initial="M"
            firstLine="ost projects reach completion."
            secondLine="Crossword grows with every step"
            width={760}
          />
        </div>

        <ol className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
          {journeySteps.map((step, i) => {
            const content = (
              <>
                <span className={cn(numeral, i === last ? "relative text-gold" : "text-ink")}>0{i + 1}</span>
                <span className={cn(title, i === last ? "relative text-cream" : "text-ink")}>{step.title}</span>
                {step.journeys && (
                  <ul aria-label="Suggested journeys" className="flex flex-col items-start gap-2">
                    {step.journeys.map((j) => (
                      <li
                        key={j}
                        className="bg-cream px-2.5 py-1.5 font-sans text-[12px] leading-[1.3] tracking-[-0.02em] text-ink-soft shadow-[inset_0_0_0_0.5px_var(--color-engraved)]"
                      >
                        {j}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );

            return (
              <li key={step.title} className={cn("flex sm:min-h-[200px]", heights[i])}>
                {i === last ? (
                  <GiltPanel tone="scroll" className="flex w-full flex-col justify-end gap-4 p-6">
                    {content}
                  </GiltPanel>
                ) : (
                  <div
                    className={cn(
                      "relative flex w-full flex-col justify-end gap-4 p-6 shadow-[inset_0_0_0_1px_var(--color-engraved)]",
                      i % 2 ? "bg-sand" : "bg-cream",
                    )}
                  >
                    <Studs inset={6} />
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
