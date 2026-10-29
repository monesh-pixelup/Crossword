import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

/** The meeting rhythm, as Figma's partnership timeline: each step's tag and rhythm. */
const rhythm = [
  { tag: "First quarter", title: "We meet Weekly" },
  { tag: "Next two quarters", title: "Then Monthly" },
  { tag: "Onwards", title: "Then Quarterly" },
];

/**
 * Figma "ALT · The partnership (timeline)" (node 3262:512): a centred two-line headline (82px swash at 1.18, 60px Light
 * lines at 1.1) 24px over a 560px line of copy, then 64px below three equal steps, 24px apart, in the cycle
 * timeline's style: a rail (a 10px gold ring and a dashed gold rule), 20px down a small Geist Mono tag, and 48px
 * under it the rhythm in Crimson ExtraLight 40. Opens with the patterned divider band (24px more top padding).
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
            width={373}
            variant="credits"
            weight="light"
          />
          <p className="max-w-[560px] font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
            Your job is to bring us the business context and tell us what&rsquo;s changing. Our job is to turn that into
            better customer experiences.
          </p>
        </div>

        <ol className="grid w-full gap-12 md:grid-cols-3 md:gap-6">
          {rhythm.map((step) => (
            <li key={step.title} className="flex flex-col items-start gap-5">
              <span aria-hidden className="flex w-full items-center">
                <span className="size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.3px_var(--color-gold)]" />
                <span className="flex-1 border-t border-dashed border-gold" />
              </span>
              <div className="flex flex-col items-start gap-12">
                <Eyebrow size="tag">{step.tag}</Eyebrow>
                <h3 className="font-serif text-[40px] leading-[1.1] font-extralight tracking-[-2px] text-ink">{step.title}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
