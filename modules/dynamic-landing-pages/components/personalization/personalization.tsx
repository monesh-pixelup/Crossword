import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

/** What changes on the page once Crossword knows the shopper (Figma's six rows). */
const changes = [
  "The headline speaks to their purpose.",
  "The most relevant benefits come first.",
  "Reviews focus on the questions they care about.",
  "Comparisons reflect their priorities.",
  "Size, fit, color and budget are carried through the experience.",
  "Recommendations take into account what customers already own.",
];

/**
 * Figma "Section · The stranger problem (v2)" (3364:53): the eyebrow over a one-line headline (82px
 * swash, Crimson Light 60 at 1.1) with, 80px across and bottom-aligned, the 560px problem in two Geist
 * 16 paragraphs 14px apart (the second Medium, in ink). 64px below, a 4px-rounded split panel: the
 * 520px wine solution (Crimson Light 32 over Geist 16 in cream, 56px in) beside the sand list of
 * changes (Geist Mono 12 numerals in maroon, 20px from Crimson 22 lines, 16px above and below each and
 * a #d2cbba rule between them; 48 / 56px in), closing on a maroon line 24px under the last. Below 992px
 * the problem goes under the headline and the solution over the list. A 232px gold tick sits on the
 * left rail beside the eyebrow.
 */
export function Personalization() {
  return (
    <section aria-labelledby="stranger-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-16">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex min-w-0 flex-col items-start gap-6 lg:flex-1">
            <Eyebrow>User-level personalization</Eyebrow>
            <SectionTitle id="stranger-title" initial="T" firstLine="he stranger problem" width={488} variant="oneLine" weight="light" />
          </div>
          <div className="flex w-full max-w-[560px] flex-col gap-3.5 font-sans text-base leading-6 tracking-[-0.32px] lg:shrink-0">
            <p className="text-[rgba(20,20,20,0.82)]">
              A customer who&rsquo;s bought from you three times, has told you their size, and has told you their color
              preference sees exactly the same product page as someone who arrived ten seconds ago.
            </p>
            <p className="font-medium text-[#141414]">
              That&rsquo;s because everything you know stays in a database instead of on the page.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col overflow-clip rounded-[4px] lg:flex-row">
          <div className="flex flex-col gap-5 bg-wine p-8 md:p-14 lg:w-[520px] lg:shrink-0">
            <h3 className="font-serif text-[32px] leading-[1.1] font-light tracking-[-1.28px] text-cream">Now you have a solution</h3>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-[rgba(255,249,234,0.82)]">
              Crossword turns customer understanding into a more personal shopping experience. It brings together what a
              shopper has told you, what they&rsquo;ve bought before, what they care about and what they&rsquo;re looking
              for right now, and uses that context to change how your products are presented.
            </p>
          </div>

          <div className="flex min-w-0 flex-col bg-[#f3e7d4] px-8 py-8 md:px-14 md:py-12 lg:flex-1">
            <ol className="flex flex-col">
              {changes.map((change, i) => (
                <li key={change} className="flex items-center gap-5 border-b border-[#d2cbba] py-4 last:border-b-0">
                  <span className="shrink-0 font-mono text-[12px] tracking-[1.2px] whitespace-nowrap text-maroon">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-[#141414]">{change}</span>
                </li>
              ))}
            </ol>
            <p className="pt-6 font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-maroon">
              A shopping experience that feels like it was made for them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
