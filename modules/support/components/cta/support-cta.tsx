import { StampButton } from "@/components/ui/stamp-button";
import { CtaBannerPanel, CtaBannerTitle } from "@/modules/ai-assistants/components/cta/cta";
import { ctaLinks } from "@/modules/marketing";

/**
 * Closes the page in the site's CTA banner layout, as Managed launch's (PilotCta): the maroon twill panel with its gold
 * hairline frame 14px in and the postage stamp in its top right corner, the cream swash headline over the Primary
 * stamp, 28px apart.
 */
export function SupportCta() {
  return (
    <section aria-labelledby="support-cta-title" className="relative py-16 md:py-24">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle
            id="support-cta-title"
            initial="R"
            firstLine="esolve more questions"
            secondLine="without more tickets"
            width={560}
          />
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            BOOK A DEMO
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}
