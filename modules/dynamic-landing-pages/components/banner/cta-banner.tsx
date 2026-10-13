import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { GiltPanel } from "../shared/livery";

/**
 * Layout/Livery, CTA banner variant: the brand's maroon scroll damask inside the gilt frame (14px in, studs
 * 8px in) with a centred Dark eyebrow, cream swash headline, one line of copy and the stamp button.
 */
export function CtaBanner() {
  return (
    <section aria-labelledby="dlp-cta-title" className="relative py-16 md:py-24">
      <div className="content-width">
        <GiltPanel tone="scroll" inset={14} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green" className="relative">
            Dynamic landing pages
          </Eyebrow>
          <div className="relative">
            <SectionTitle
              id="dlp-cta-title"
              initial="E"
              firstLine="very page, matched"
              secondLine="to the shopper"
              width={470}
              variant="centered"
              tone="light"
              gutter={96}
            />
          </div>
          <p className="relative max-w-[520px] font-sans text-base leading-6 tracking-[-0.32px] text-on-dark">
            From the first click on an ad to the last question before checkout, Crossword makes the page respond like a
            personal concierge. Get more from every visit.
          </p>
          <StampButton href={ctaLinks.bookDemo} variant="primary" className="relative mt-1 focus-visible:outline-gold">
            BOOK A DEMO
          </StampButton>
        </GiltPanel>
      </div>
    </section>
  );
}
