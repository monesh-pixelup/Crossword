import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

/** The meeting rhythm, as Figma's partnership timeline: each step's tag, rhythm and line of copy. */
const rhythm = [
  { tag: "First quarter", title: "Weekly", body: "For the first few months, we meet weekly." },
  { tag: "Next two quarters", title: "Monthly", body: "Then monthly." },
  { tag: "Onwards", title: "Quarterly", body: "Then quarterly as things mature." },
];

/**
 * Figma "ALT · The partnership (timeline)": a centred two-line headline over a 560px line of copy,
 * then 64px below three equal steps, 24px apart, in the cycle timeline's style: a rail (a 10px gold
 * ring and a dashed gold rule), 20px down a small Geist Mono tag, and 48px under it the rhythm in
 * Crimson 22 over a line of Geist 14, 16px apart. Opens with the patterned divider band (24px more
 * top padding).
 */
export function YourPart() {
  return (
    <section aria-labelledby="your-part-title" className="relative section-pad-band">
      <DividerBand glyph="gear" />
      <div className="flex content-width flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionTitle
            id="your-part-title"
            initial="Y"
            firstLine="our part is"
            secondLine="surprisingly small"
            width={460}
            variant="centered"
            lineGap={8}
          />
          {/* The centred title's 0.9 leading lets the descenders of "surprisingly" hang ~15px below its box; 16px more keeps them clear of this line. */}
          <p className="mt-4 max-w-[560px] font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
            Your job is to bring us the business context and tell us what&rsquo;s changing. Our job is to turn that into
            better customer experiences.
          </p>
        </div>

        <ol className="grid w-full gap-12 sm:grid-cols-3 sm:gap-6">
          {rhythm.map((step) => (
            <li key={step.title} className="flex flex-col items-start gap-5">
              <span aria-hidden className="flex w-full items-center">
                <span className="size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.3px_var(--color-gold)]" />
                <span className="flex-1 border-t border-dashed border-gold" />
              </span>
              <div className="flex flex-col items-start gap-12">
                <Eyebrow size="tag">{step.tag}</Eyebrow>
                <div className="flex flex-col items-start gap-4">
                  <h3 className="font-serif text-[22px] leading-[1.15] tracking-[-0.88px] text-ink">{step.title}</h3>
                  <p className="font-sans text-[14px] leading-[1.43] tracking-[-0.28px] text-ink-muted">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
