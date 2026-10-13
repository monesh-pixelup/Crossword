import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { cadence, jobs } from "../../config/launch";

/**
 * The partnership: meetings thin out as things mature. Layout/Process, Timeline variant, drawn as a
 * cadence rail: one dashed gold rule split by quarter (one for weekly, then two each for monthly
 * and quarterly), a gold tick for every check-in so the ticks spread out along it, and the rhythm,
 * span and line of copy under each part. Below sit the two jobs on studded cards.
 */
export function Partnership() {
  return (
    <section aria-labelledby="partnership-title" className="relative section-pad-band">
      <DividerBand glyph="book" />
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>The partnership</Eyebrow>
            <SectionTitle id="partnership-title" initial="Y" firstLine="our part is" secondLine="surprisingly small" width={520} />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            For the first few months, we meet weekly. Then monthly. Then quarterly as things mature.
          </p>
        </div>

        <ol className="grid w-full gap-10 md:grid-cols-[1fr_2fr_2fr] md:gap-0">
          {cadence.map((part, i) => (
            <li key={part.rhythm} className={cn("flex flex-col gap-5", i > 0 && "md:pl-6")}>
              {/* The rail: a dashed gold rule with a tick per check-in, spaced evenly across the part. */}
              <span aria-hidden className="relative flex h-6 items-center">
                <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-gold" />
                <span className="relative flex w-full justify-between">
                  {Array.from({ length: part.ticks }, (_, t) => (
                    <span key={t} className={cn("w-px bg-gold", t === 0 ? "h-6" : "h-3.5")} />
                  ))}
                </span>
              </span>
              <span className="flex flex-col items-start gap-3">
                <span className="bg-sand px-2 py-1 font-sans text-[11px] leading-[1.3] tracking-[0.06em] text-label-olive uppercase shadow-[inset_0_0_0_0.5px_var(--color-engraved)]">
                  {part.span}
                </span>
                <span className="font-serif text-[22px] leading-[1.15] tracking-[-0.03em] text-ink">{part.rhythm}</span>
                <span className="max-w-[320px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">{part.note}</span>
              </span>
            </li>
          ))}
        </ol>

        <ul className="grid w-full gap-4 md:grid-cols-2">
          {jobs.map((job, i) => (
            <li
              key={job.label}
              className={cn(
                "relative flex flex-col gap-4 p-8 shadow-[inset_0_0_0_1px_var(--color-engraved)] md:p-10",
                i === 0 ? "bg-cream" : "bg-sand",
              )}
            >
              <Studs inset={7} />
              <p className="font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase">{job.label}</p>
              <p className="font-serif text-(length:--h5-size) leading-[1.2] font-light tracking-[-0.04em] text-ink">{job.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
