import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";

/**
 * Layout/Livery, CTA banner variant (as on Dynamic landing pages and Support): the guidelines'
 * maroon scroll damask set 14px in, with the home page's notched gold frame (its deep 46px notches)
 * and corner rings, and a centred Dark eyebrow, cream swash headline, a line of copy and the stamp
 * button. The doc's nudge ends in an exclamation mark, which the voice rules don't use (16.4), so
 * the copy line ends in a period.
 */
export function RetainBanner() {
  return (
    <section aria-labelledby="retain-cta-title" className="relative pb-16 md:pb-24">
      <div className="content-width">
        <NotchedPanel tone="scroll" inset={14} radius={46} rings className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green" className="relative">
            Retain
          </Eyebrow>
          <div className="relative">
            <SectionTitle
              id="retain-cta-title"
              initial="M"
              firstLine="ore customers who come back."
              secondLine="Fewer who send products back"
              width={780}
              variant="centered"
              tone="light"
              gutter={96}
            />
          </div>
          <p className="relative max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
            Win customers, increase ROAS, and more.
          </p>
          <StampButton href={ctaLinks.bookDemo} variant="primary" className="relative mt-1 focus-visible:outline-gold">
            BOOK A DEMO
          </StampButton>
        </NotchedPanel>
      </div>
    </section>
  );
}
