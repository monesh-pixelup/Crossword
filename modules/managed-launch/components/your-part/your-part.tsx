import { Eyebrow } from "@/components/ui/eyebrow";
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
 * timeline's style: a rail (a 10px gold ring and a dashed gold rule), 20px down a small Open Sans SemiBold tag, and 48px
 * under it the rhythm in Crimson Light 32 at -1.6px. Opens with the patterned divider band (24px more top padding).
 */
export function YourPart() {
  return (
    <section aria-labelledby="your-part-title" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionTitle
            id="your-part-title"
            initial="Y"
            firstLine="our part is"
            secondLine="surprisingly small"
            width={373}
            variant="dynamicCentered"
            weight="light"
          />
          <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-[3px]">
            Your job is to bring us the business context and tell us what&rsquo;s changing. Our job is to turn that into
            better customer experiences.
          </p>
        </div>

        {/*
          From 768px the steps sit side by side, each under its stretch of the horizontal rail. On phones the rail turns
          vertical down the left (each ring level with its tag, the dashed line running on to the next one) with the steps
          stacked to its right, 40px apart.
        */}
        <ol className="grid w-full max-md:max-w-[400px] md:grid-cols-3 md:gap-6">
          {rhythm.map((step) => (
            <li key={step.title} className="group flex items-start gap-5 max-md:pb-10 max-md:last:pb-0 md:flex-col">
              <span aria-hidden className="flex items-center max-md:mt-[5.3px] max-md:flex-col max-md:self-stretch md:w-full">
                <span className="size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.3px_var(--color-gold)]" />
                <span className="flex-1 border-dashed border-gold max-md:-mb-[45.3px] max-md:border-l max-md:group-last:hidden md:border-t" />
              </span>
              <div className="flex flex-col items-start gap-4 md:gap-12">
                <Eyebrow size="tag">{step.tag}</Eyebrow>
                <h3 className="font-serif text-[32px] leading-[1.09375] font-light tracking-[-1.6px] max-md:text-[24px] max-md:leading-[27px] max-md:tracking-[-1.2px] text-ink">{step.title}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
