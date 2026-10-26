import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { outcomes } from "../../config/pricing";
import { BandDivider } from "../shared/band-divider";
import { RoiCalculator } from "./roi-calculator";

/** Pricing / Note: a Crimson 22 title over a line of Geist 14. */
function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.04em] text-ink">{title}</h3>
      <p className="font-sans text-[14px] leading-[1.43] tracking-[-0.02em] text-pretty text-ink-muted">{body}</p>
    </div>
  );
}

/**
 * ROI calculator (Figma 3156:13811, “Library · Contact form”), under the chart divider band: on the
 * left the eyebrow, swash headline and copy, then what Crossword moves, two notes to a row on 0.5px
 * rules; 96px from it on the right the 600px calculator, the two centred on each other. Below
 * 1200px they stack.
 */
export function Calculator() {
  return (
    <section
      id="calculator"
      aria-labelledby="calculator-title"
      className="relative scroll-mt-[72.5px] pt-[calc(var(--section-pad)+75px)] pb-(--section-pad) max-md:pt-[calc(var(--section-pad)+56px)]"
    >
      <BandDivider glyph="chart" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+75px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[214px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:gap-24">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-7">
          <Eyebrow>ROI calculator</Eyebrow>
          <SectionTitle id="calculator-title" initial="C" firstLine="alculate your ROI" secondLine="with Crossword" width={410} variant="humanMode" />
          <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Add your site traffic, chat engagement rate and replies per conversation to see what Crossword will cost. Then add
            your conversion rate and AOV to see what it will generate.
          </p>

          <div className="flex w-full flex-col pt-3">
            <p className="mb-4 font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase">
              What Crossword moves
            </p>
            {[0, 2].map((start) => (
              <div
                key={start}
                className="flex flex-col gap-6 py-6 shadow-[inset_0_0.5px_0_#c8c3b8] xs:flex-row xs:gap-10"
              >
                {outcomes.slice(start, start + 2).map((o) => (
                  <Note key={o.title} title={o.title} body={o.body} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[600px] shrink-0 min-[1200px]:w-[600px]">
          <RoiCalculator />
        </div>
      </div>
    </section>
  );
}
