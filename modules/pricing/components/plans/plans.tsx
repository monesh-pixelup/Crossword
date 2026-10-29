import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { type Plan, inclusions, plans } from "../../config/pricing";
import { TwillPanel } from "../shared/twill-panel";

/** The stamp's 22 × 11 arrow, in the label colour. */
const arrow = (
  <svg aria-hidden viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-[11px] w-[22px]">
    <path d="M0 6h21M15.5.5 21 6l-5.5 5.5" />
  </svg>
);

function PlanBody({ plan }: { plan: Plan }) {
  const featured = plan.tone === "featured";
  return (
    <>
      <div className="relative flex w-full flex-col items-start gap-3">
        <h3 className={cn("font-serif text-(length:--h4-size) leading-[1.1] font-extralight tracking-[-0.05em]", featured ? "text-cream" : "text-ink")}>
          {plan.name}
        </h3>
        <p className={cn("font-sans text-[14px] leading-5 tracking-[-0.02em] text-pretty", featured ? "text-on-dark" : "text-ink-muted")}>
          {plan.description}
        </p>
      </div>

      <StampButton href={ctaLinks.bookDemo} variant={plan.cta.variant} className={cn(featured && "gap-3 focus-visible:outline-gold")}>
        {plan.cta.label}
        {featured && arrow}
      </StampButton>
    </>
  );
}

/**
 * Library · Three plans (Figma 3564:22839): a centred eyebrow, swash headline and line of copy, 64px
 * over the three plans, 24px apart and as tall as the tallest: cream and sand cards on a 1px
 * engraved line with studs 7px in; between them Pay-as-you-go on the maroon twill in a 1px gold line,
 * its hairline frame 9px in and studs 3px in. Every card has its title over the button at the foot (at
 * least 28px under the copy), so the three buttons sit level. 40px below, the three things included in every plan, under the eyebrow on its top
 * edge. 40px below that, the early-stage program on sand: a wine label, a Crimson 22 line and a 720px
 * line of copy, with the waitlist button across from them. Gold accents on both rails beside the
 * header. Below 1024px the plans and the inclusions stack, and the program's button goes under its copy.
 */
export function Plans() {
  return (
    <section aria-labelledby="plans-title" className="relative section-pad">
      <RailAccent className="absolute top-(--section-pad) left-[calc(var(--frame-inset)-0.5px)] z-2 h-[210px] w-px max-lg:hidden" />
      <RailAccent className="absolute top-(--section-pad) right-[calc(var(--frame-inset)-0.5px)] z-2 h-[210px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Pricing options</Eyebrow>
          <SectionTitle id="plans-title" initial="S" firstLine="tart free. Scale" secondLine="when you’re ready" width={384} variant="credits" weight="light" />
          <p className="max-w-[640px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Every plan runs on the same Crossword. You only pay for the credits you use.
          </p>
        </div>

        <div className="flex w-full flex-col gap-10">
          <ul className="grid w-full gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.name} className="flex">
                {plan.tone === "featured" ? (
                  <TwillPanel
                    frameInset={9}
                    studInset={3}
                    className="flex w-full flex-col items-start justify-between gap-7 p-7 shadow-[inset_0_0_0_1px_var(--color-gold)] xs:p-10"
                  >
                    <PlanBody plan={plan} />
                  </TwillPanel>
                ) : (
                  <div
                    className={cn(
                      "relative flex w-full flex-col items-start justify-between gap-7 p-7 shadow-[inset_0_0_0_1px_var(--color-engraved)] xs:p-10",
                      plan.tone === "sand" ? "bg-sand" : "bg-cream",
                    )}
                  >
                    <Studs inset={7} />
                    <PlanBody plan={plan} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="relative bg-cream shadow-[inset_0_0_0_1px_var(--color-engraved)]">
            <Studs inset={7} />
            <div className="absolute -top-[17px] left-[calc(50%+0.5px)] z-1 flex -translate-x-1/2">
              <Eyebrow>Included in every plan</Eyebrow>
            </div>
            <ul className="grid lg:grid-cols-3">
              {inclusions.map((item, i) => (
                <li
                  key={item.title}
                  className={cn(
                    "flex items-start gap-5 px-7 pt-11 pb-9 xs:px-10",
                    i > 0 && "shadow-[inset_0_0.5px_0_var(--color-engraved)] max-lg:pt-9 lg:shadow-[inset_0.5px_0_0_var(--color-engraved)]",
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center bg-sand shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                    <Image src={item.icon} alt="" className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.04em] text-ink">{item.title}</h3>
                    <p className="font-sans text-[14px] leading-[1.43] tracking-[-0.02em] text-pretty text-ink-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-6 bg-sand px-7 py-8 shadow-[inset_0_0_0_1px_var(--color-engraved)] xs:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex max-w-[720px] flex-col items-start gap-2">
              <p className="font-sans text-[12px] leading-[1.2] font-medium tracking-[0.08em] text-wine uppercase">Early-stage program</p>
              <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.04em] text-ink">Starting a business is hard work.</h3>
              <p className="font-sans text-base leading-6 tracking-[-0.02em] text-black/60">
                If you&rsquo;re an early-stage ecommerce brand doing under $1M in annual online revenue, apply and join the
                waitlist for free access to Crossword.
              </p>
            </div>
            {/* TODO: point at the waitlist form once there is one. */}
            <StampButton href={ctaLinks.signUp} variant="outline">
              JOIN THE WAITLIST
            </StampButton>
          </div>
        </div>
      </div>
    </section>
  );
}
