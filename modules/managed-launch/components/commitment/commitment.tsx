import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { commitments } from "../../config/launch";

/**
 * Figma "Library · Stats band" (Managed launch and progress): a sand band between the page rails,
 * 96px top and bottom, a 433px label column (the eyebrow over a two-line Crimson 22 title, 16px
 * apart), then the two commitments as stats behind dashed engraved rules, 40px in: a Crimson 200
 * 70px value with its Geist 14 unit beside it, over a Geist Mono caption, 12px apart. The second
 * stat is 466px wide; the first takes the rest.
 */
export function Commitment() {
  return (
    <section aria-label="Managed launch and progress" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-24">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-12 lg:flex-row lg:items-start lg:gap-0">
          <div className="flex flex-col items-start gap-4 lg:w-[433px] lg:shrink-0 lg:pr-10">
            <SnappedEyebrow surface="sand" className="h-8">
              Managed launch
            </SnappedEyebrow>
            <p className="font-serif text-[22px] leading-[1.15] tracking-[-0.88px] text-ink">
              Managed launch
              <br />
              and progress
            </p>
          </div>

          <dl className="flex flex-1 flex-col md:flex-row">
            {commitments.map((c, i) => (
              <div
                key={c.label}
                className={`flex flex-col-reverse gap-3 border-dashed border-engraved py-8 first:pt-0 md:border-l md:px-10 md:py-0 max-md:border-t max-md:first:border-t-0 ${
                  i === commitments.length - 1 ? "md:w-[466px] md:shrink-0" : "md:flex-1"
                }`}
              >
                <dt className="font-mono text-[12px] leading-[1.3] tracking-[0.48px] whitespace-nowrap text-label-olive uppercase">
                  {c.label}
                </dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-serif text-[70px] leading-[1.1] font-extralight tracking-[-3.5px] whitespace-nowrap text-ink">
                    {c.value}
                  </span>
                  <span className="font-sans text-[14px] leading-[1.43] tracking-[-0.28px] text-ink-muted">{c.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
