import { StampButton } from "@/components/ui/stamp-button";
import { CtaBannerPanel, CtaBannerTitle } from "@/modules/ai-assistants/components/cta/cta";
import { ctaLinks } from "@/modules/marketing/config/navigation";

/**
 * Figma "CTA" (Trust & security, 4493:6599): the site's CTA banner (maroon twill panel, gold frame, studs and quill
 * stamp) with the cream two-line swash headline (760px) and the Primary TALK TO US stamp, as the other CTA banners.
 */
export function TrustCta() {
  return (
    <section aria-labelledby="trust-cta-title" className="relative py-16 md:py-24 lg:pt-[120px] lg:pb-[120px]">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle id="trust-cta-title" initial="B" firstLine="ring your security team and your" secondLine="toughest questions" width={760} />
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            TALK TO US
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}
