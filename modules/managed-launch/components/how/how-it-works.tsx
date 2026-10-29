import { Eyebrow } from "@/components/ui/eyebrow";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { cycle, howSteps } from "../../config/launch";

/**
 * Figma "ALT · How it works (checklist cards)": the eyebrow, 24px over a one-line headline with the
 * cycle in Geist 16 8px under it, then 56px below the six to-do cards (410 × 307, 24px apart, three
 * to a row): cream on a 1px engraved/40 border around a 400 × 296 light panel, a gold stud 7px into
 * each corner, and 40px in the number in Tangerine 55, 32px over a Crimson 22 title with its lines
 * 8px under it. Follows the Journey library's sand panel directly, so it has no divider band.
 */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="relative section-pad">
      {/* The gold section tick (1px × 180px, as SectionTick), 24px above the eyebrow, as it sat under the divider band. */}
      <RailAccent className="absolute top-[calc(var(--section-pad)-24px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[180px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-14">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Managed launch</Eyebrow>
          <div className="flex flex-col items-start gap-2">
            <SectionTitle id="how-title" initial="H" firstLine="ow it works" width={707.715} variant="oneLine" weight="light" />
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{cycle}</p>
          </div>
        </div>

        <ol className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {howSteps.map((step, i) => (
            /*
              Figma's cards are 307px tall at their 410px width; the longest copy (#2) runs into the bottom padding there,
              as in Figma. Narrower, they grow to fit.
            */
            <li
              key={step.title}
              className="relative flex flex-col gap-8 border border-engraved/40 bg-cream p-10 lg:min-h-[307px] min-[1440px]:h-[307px]"
            >
              {/* The 400 × 296 light panel, centred (Figma nudges it 0.36px up). */}
              <span aria-hidden className="pointer-events-none absolute inset-x-1 top-[4.14px] bottom-[4.86px] bg-[#fff7e4]" />
              <Studs inset={7} />
              <p
                aria-hidden
                className="relative font-calligraphy text-[55px] leading-[1.1] tracking-[-2.75px] text-maroon [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
              >
                #{i + 1}
              </p>
              <div className="relative flex flex-col gap-2">
                <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <div className="font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
                  {step.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
