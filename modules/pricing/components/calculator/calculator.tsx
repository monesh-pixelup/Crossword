import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { RoiCalculator } from "./roi-calculator";

/**
 * Calculator (content doc). Layout/Showcase, Wide panel variant, as Take control on Support: a
 * sand panel between the page rails, the headline and the early-stage offer on the left and the
 * calculator (Crossword's own UI, so square) on the right.
 */
export function Calculator() {
  return (
    <section aria-labelledby="calculator-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between min-[1200px]:gap-16">
          <div className="flex flex-col items-start gap-6 min-[1200px]:max-w-[420px]">
            <Eyebrow surface="sand">ROI calculator</Eyebrow>
            <SectionTitle id="calculator-title" initial="C" firstLine="alculate your ROI" secondLine="with Crossword" width={420} variant="assist" />
            <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
              Starting a business is hard work. If you&rsquo;re an early-stage ecommerce brand doing under $1M in annual
              online revenue, apply and join the waitlist for free access to Crossword.
            </p>
            <TextLink href="#early-stage">Apply for free access</TextLink>
          </div>

          <div className="w-full min-[1200px]:max-w-[720px] min-[1200px]:flex-[0_1_720px]">
            <RoiCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
