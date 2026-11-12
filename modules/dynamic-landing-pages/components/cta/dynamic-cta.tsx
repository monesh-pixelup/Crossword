import { StampButton } from "@/components/ui/stamp-button";
import { CtaBannerPanel, CtaBannerTitle } from "@/modules/ai-assistants/components/cta/cta";
import { ctaLinks } from "@/modules/marketing";

/**
 * Closes the page in the site's CTA banner layout, as Managed launch's (PilotCta): the maroon twill panel with its gold
 * hairline frame 14px in and the postage stamp in its top right corner, the cream swash headline, a line of on-dark
 * Geist, a shorter line under it and the Primary stamp, 28px apart.
 */
export function DynamicCta() {
  return (
    <section aria-labelledby="dynamic-cta-title" className="relative py-16 md:py-24">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle
            id="dynamic-cta-title"
            initial="E"
            firstLine="very page, matched"
            secondLine="to the shopper"
            width={470}
          />
          <div className="flex max-w-[520px] flex-col items-center gap-3 font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-on-dark">
            <p>
              From the first click on an ad to the last question before checkout, Crossword makes the page respond like a
              personal concierge.
            </p>
            <p>Get more from every visit</p>
          </div>
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            BOOK A DEMO
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}
