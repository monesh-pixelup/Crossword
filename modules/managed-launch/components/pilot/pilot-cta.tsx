import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { TwillPanel } from "@/modules/pricing/components/shared/twill-panel";

/**
 * Figma "Section · CTA (team, not just a product)" (node 3262:692), closing the page as Engineer on Pricing: the
 * maroon twill panel with its gold hairline frame 14px in and studs 8px in, 96px of padding inside and around it, and
 * 28px between a centred Dark eyebrow, the cream swash headline, a line of on-dark Geist and the Primary stamp.
 */
export function PilotCta() {
  return (
    <section aria-labelledby="pilot-cta-title" className="relative py-16 md:py-24">
      <div className="content-width">
        <TwillPanel frameInset={14} studInset={8} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green">Free pilot</Eyebrow>
          <SectionTitle
            id="pilot-cta-title"
            initial="Y"
            firstLine="ou’re getting a team,"
            secondLine="not just a product"
            width={520}
            variant="channels"
            tone="cream"
            gutter={96}
          />
          <p className="max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">Ready to try our free pilot?</p>
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            START YOUR FREE PILOT
          </StampButton>
        </TwillPanel>
      </div>
    </section>
  );
}
