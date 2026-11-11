import { StampButton } from "@/components/ui/stamp-button";
import { CtaBannerPanel, CtaBannerTitle } from "@/modules/ai-assistants/components/cta/cta";
import { ctaLinks } from "@/modules/marketing";

/**
 * Figma "Section · CTA (team, not just a product)" (node 3262:692), closing the page in the site's CTA banner layout
 * (AI Assistants, Figma 3305:1697): the maroon twill panel with its gold hairline frame 14px in and the postage stamp
 * in its top right corner, 96px of padding inside and around it, and 28px between the cream swash headline, a line
 * of on-dark Geist and the Primary stamp.
 */
export function PilotCta() {
  return (
    <section aria-labelledby="pilot-cta-title" className="relative py-16 md:py-24">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle
            id="pilot-cta-title"
            initial="Y"
            firstLine="ou’re getting a team,"
            secondLine="not just a product"
            width={507}
          />
          <p className="max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-on-dark">Ready to try our free pilot?</p>
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            START YOUR FREE PILOT
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}
