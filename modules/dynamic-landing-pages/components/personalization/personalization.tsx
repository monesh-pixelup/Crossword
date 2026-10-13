import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { SectionTick } from "../shared/section-tick";
import { SignalList } from "./signal-list";

const body = "max-w-[520px] font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted";

/** User-level personalization: the stranger problem, and what changes once the page knows the shopper. */
export function Personalization() {
  return (
    <section aria-labelledby="stranger-title" className="relative section-pad-band">
      <DividerBand glyph="book" />
      <SectionTick />

      <div className="content-width">
        <SignalList
          header={
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>User-level personalization</Eyebrow>
              <SectionTitle id="stranger-title" initial="T" firstLine="he stranger problem" secondLine={null} width={470} />
              <p className={body}>
                A customer who&rsquo;s bought from you three times, has told you their size, and has told you their
                color preference sees exactly the same product page as someone who arrived ten seconds ago. That&rsquo;s
                because everything you know stays in a database instead of on the page.
              </p>
              <p className={body}>
                <span className="text-ink">Now you have a solution.</span> Crossword turns customer understanding into
                a more personal shopping experience. It brings together what a shopper has told you, what they&rsquo;ve
                bought before, what they care about and what they&rsquo;re looking for right now, and uses that context
                to change how your products are presented.
              </p>
            </div>
          }
          footnote={
            <p className="font-serif text-[20px] leading-[1.2] font-light tracking-[-0.6px] text-ink md:text-[24px] md:tracking-[-0.96px]">
              A shopping experience that feels like it was made for them.
            </p>
          }
        />
      </div>
    </section>
  );
}
