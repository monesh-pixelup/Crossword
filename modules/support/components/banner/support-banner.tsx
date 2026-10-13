import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { GiltPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";

/**
 * Layout/Livery, CTA banner variant (as on Dynamic landing pages): the guidelines' maroon scroll damask inside the
 * gilt frame with a centred Dark eyebrow, cream swash headline and the stamp button.
 */
export function SupportBanner() {
  return (
    <section aria-labelledby="support-cta-title" className="relative pb-16 md:pb-24">
      <div className="content-width">
        <GiltPanel tone="scroll" inset={14} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green" className="relative">
            Support
          </Eyebrow>
          <div className="relative">
            <SectionTitle
              id="support-cta-title"
              initial="R"
              firstLine="esolve more questions"
              secondLine="without more tickets"
              width={600}
              variant="centered"
              tone="light"
              gutter={96}
            />
          </div>
          <StampButton href={ctaLinks.bookDemo} variant="primary" className="relative mt-1 focus-visible:outline-gold">
            BOOK A DEMO
          </StampButton>
        </GiltPanel>
      </div>
    </section>
  );
}
