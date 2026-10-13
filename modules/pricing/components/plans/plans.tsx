import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { GiltPanel, Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { type Plan, noFees, plans } from "../../config/pricing";

/** The kit's check (`.wk-price li svg`): 15 × 12, gold, bright gold on the featured plan. */
function Check({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 15 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={cn("h-3 w-[15px] shrink-0", className)}>
      <path d="M1 7 5.5 11 14 1.5" />
    </svg>
  );
}

const arrow = (
  <svg aria-hidden viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-3 w-[22px]">
    <path d="M0 6h21M15.5.5 21 6l-5.5 5.5" />
  </svg>
);

function PlanBody({ plan }: { plan: Plan }) {
  const featured = plan.tone === "featured";
  return (
    <>
      <div className="relative flex flex-col items-start">
        {featured && (
          <Eyebrow surface="green" className="mb-4">
            {noFees[0]}
          </Eyebrow>
        )}
        <h3 className={cn("mb-2.5 font-serif text-(length:--h4-size) leading-[1.1] font-light tracking-[-0.05em]", featured ? "text-cream" : "text-ink")}>
          {plan.name}
        </h3>
        <p className={cn("font-sans text-[14px] leading-5 tracking-[-0.02em]", featured ? "text-on-dark" : "text-ink-muted")}>{plan.description}</p>
      </div>

      <p className="relative flex flex-wrap items-baseline gap-x-2">
        <span className={cn("font-serif text-[56px] leading-none font-extralight tracking-[-0.05em]", featured ? "text-gold-bright" : "text-ink")}>
          {plan.amount}
        </span>
        {plan.per && (
          <span className={cn("font-sans text-[14px] leading-5 tracking-[-0.02em]", featured ? "text-on-dark" : "text-ink-muted")}>
            / {plan.per}
          </span>
        )}
      </p>

      <StampButton
        href={ctaLinks.bookDemo}
        variant={plan.cta.variant}
        className={cn("relative self-start", featured && "gap-3 focus-visible:outline-gold")}
      >
        {plan.cta.label}
        {featured && arrow}
      </StampButton>

      <hr className={cn("relative w-full border-0 border-t", featured ? "border-gold/50" : "border-engraved")} />

      <ul className="relative flex flex-col gap-3.5">
        {plan.features.map((f) => (
          <li key={f} className={cn("flex items-center gap-3 font-sans text-[14px] leading-5 tracking-[-0.02em]", featured ? "text-cream" : "text-ink-soft")}>
            <Check className={featured ? "text-gold-bright" : "text-gold"} />
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Layout/Conversion, Pricing variant (Figma “Three plans”, the kit's `.wk-price`), under the divider
 * band that closes the page header: a centred eyebrow, swash headline and copy, then where Figma
 * has the billing toggle (the doc prices in credits, not by month or year) the doc's three “no
 * fees” in the toggle's engraved frame, split by hairlines and none of them selected, then the three plans: cream, the featured one on the
 * maroon scroll damask in its gilt frame, and sand, each studded, 24px apart.
 */
export function Plans() {
  return (
    <section aria-labelledby="plans-title" className="relative section-pad-band">
      <DividerBand glyph="chart" />

      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Pricing</Eyebrow>
            <SectionTitle
              id="plans-title"
              initial="S"
              firstLine="tart free. Scale"
              secondLine="when you’re ready"
              width={460}
              variant="centered"
            />
            <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
              Only pay for what you use.
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-1 p-1 shadow-[inset_0_0_0_1px_var(--color-engraved)]">
            {noFees.map((fee, i) => (
              <li
                key={fee}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 font-serif text-base leading-[22px] font-medium tracking-[-0.03em] text-ink-soft uppercase md:px-5",
                  i > 0 && "sm:shadow-[inset_0.5px_0_0_var(--color-engraved)]",
                )}
              >
                <Check className="text-gold" />
                {fee}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mx-auto grid w-full max-w-[520px] gap-6 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name} className="flex">
              {plan.tone === "featured" ? (
                <GiltPanel tone="scroll" inset={10} className="flex w-full flex-col gap-7 p-7 shadow-[inset_0_0_0_1px_var(--color-gold)] xs:p-10">
                  <PlanBody plan={plan} />
                </GiltPanel>
              ) : (
                <div
                  className={cn(
                    "relative flex w-full flex-col gap-7 p-7 shadow-[inset_0_0_0_1px_var(--color-engraved)] xs:p-10",
                    plan.tone === "sand" ? "bg-sand" : "bg-cream",
                  )}
                >
                  <Studs inset={8} />
                  <PlanBody plan={plan} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
