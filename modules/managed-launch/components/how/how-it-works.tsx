import { Eyebrow } from "@/components/ui/eyebrow";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { cycle, howSteps } from "../../config/launch";

/**
 * Figma "ALT · How it works (checklist cards)": the eyebrow and a one-line headline, the cycle as a
 * line of Geist 20, then the six to-do cards (410 × 307, 24px apart, three to a row): cream on a
 * 1px engraved border with a gold stud 7px into each corner, 40px in, a numbered Geist Light 24
 * title over its lines, 16px apart. Header, cycle and cards are 56px apart. Opens with the
 * patterned divider band (24px more top padding).
 */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="relative section-pad-band">
      <DividerBand glyph="gear" />
      {/* The gold section tick (1px × 180px, as SectionTick), 24px lower for the divider band. */}
      <RailAccent className="absolute top-(--section-pad) left-[calc(var(--frame-inset)-0.5px)] z-2 h-[180px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-14">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Managed launch</Eyebrow>
          <SectionTitle id="how-title" initial="H" firstLine="ow it works" width={420} />
        </div>

        <p className="font-sans text-[20px] leading-6 tracking-[-0.6px] text-black/59">{cycle}</p>

        <ol className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {howSteps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-4 border border-engraved bg-cream p-10 lg:min-h-[307px]">
              <Studs inset={7} />
              <h3 className="font-sans text-[24px] leading-[1.3] font-light tracking-[-0.48px] text-ink">
                #{i + 1} {step.title}
              </h3>
              <div className="font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
                {step.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
