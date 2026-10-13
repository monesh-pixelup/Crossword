import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import { commitments } from "../../config/launch";

/**
 * Managed launch and progress (the doc's “design element”). Layout/Proof, Stats band variant, set
 * to the web kit (`.wk-sb`): a sand band between the page rails, a label column (the eyebrow and
 * the pilot CTA), then the two commitments as stats split by dashed engraved rules: Crimson 200
 * display numerals with a Geist unit beside them.
 */
export function Commitment() {
  return (
    <section aria-label="Managed launch and progress" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-24">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-12 lg:flex-row lg:gap-0">
          <div className="flex flex-col items-start gap-4 lg:flex-[0_0_320px] lg:pr-10">
            <SnappedEyebrow surface="sand" className="h-8">
              Managed launch and progress
            </SnappedEyebrow>
            <StampButton href={ctaLinks.bookDemo} variant="primary" className="mt-4">
              START YOUR FREE PILOT
            </StampButton>
          </div>

          <dl className="flex flex-1 flex-col md:flex-row">
            {commitments.map((c) => (
              <div
                key={c.label}
                className="flex flex-1 flex-col gap-3 border-dashed border-engraved py-8 first:pt-0 md:border-l md:px-10 md:py-0 max-md:border-t max-md:first:border-t-0"
              >
                <dt className="font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase">{c.label}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-serif text-(length:--display-size) leading-none font-extralight tracking-[-0.05em] text-ink">
                    {c.value}
                  </span>
                  <span className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted">{c.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
