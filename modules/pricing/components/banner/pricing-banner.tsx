import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";

/**
 * Layout/Livery, CTA banner variant (Figma “Let the concierge take the desk”, the kit's `.wk-cta`):
 * the home page's maroon card: the scroll damask set 14px in, the deep 46px notched gold corners and
 * a ring in each, as on the other banners; a centred Dark eyebrow and cream swash headline, then
 * the stamp button beside a light text link. 96px above and below, as the kit's banner.
 */
export function PricingBanner() {
  return (
    <section aria-labelledby="pricing-cta-title" className="relative pb-16 md:pb-24">
      <div className="content-width">
        <NotchedPanel tone="scroll" inset={14} radius={46} rings className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green" className="relative">
            Pricing
          </Eyebrow>
          <div className="relative">
            <SectionTitle
              id="pricing-cta-title"
              initial="S"
              firstLine="tart for free and"
              secondLine="see the impact"
              width={460}
              variant="centered"
              tone="light"
              gutter={96}
            />
          </div>
          <div className="relative mt-1 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <StampButton href={ctaLinks.bookDemo} variant="primary-soft" className="focus-visible:outline-gold">
              ENROLL NOW
            </StampButton>
            <TextLink href={ctaLinks.bookDemo} tone="cream">
              Talk to sales
            </TextLink>
          </div>
        </NotchedPanel>
      </div>
    </section>
  );
}
