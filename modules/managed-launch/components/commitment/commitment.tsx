import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { commitments } from "../../config/launch";

/**
 * Figma "Library · Stats band" (Managed launch and progress): a sand band the full viewport width,
 * 96px top and bottom, a 433px label column holding just the eyebrow, then the two commitments as stats behind dashed engraved rules, 40px in: a Crimson Light
 * 70px value with its Geist 14 unit beside it, over a Geist Mono caption, 12px apart. The second
 * stat is 466px wide; the first takes the rest. The label column sits beside the stats only from
 * 1280px, where the first stat still has room (433 + 466 + its ~200px), centred on the stats' height; below, it sits
 * above them.
 * The value shrinks on the narrowest phones (17vw under ~412px) so "Everything" never runs off.
 */
export function Commitment() {
  return (
    <section aria-label="Managed launch and progress" className="relative">
      {/* The sand runs the full viewport width, out past the site's 1600px cap on wide screens (SiteShell clips the overrun). */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-sand shadow-[inset_0_0.5px_0_rgba(0,0,0,0.25),inset_0_-0.5px_0_rgba(0,0,0,0.25)]"
      />
      <div className="relative py-16 md:py-24">
        <div className="flex content-width flex-col gap-12 min-[1280px]:flex-row min-[1280px]:items-center min-[1280px]:gap-0">
          <div className="flex flex-col items-start min-[1280px]:w-[433px] min-[1280px]:shrink-0 min-[1280px]:pr-10">
            <SnappedEyebrow surface="sand" className="h-8">
              Managed launch and progress
            </SnappedEyebrow>
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
                  <span className="font-serif text-[min(70px,17vw)] leading-[1.1] font-light tracking-[-0.05em] whitespace-nowrap text-ink">
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
