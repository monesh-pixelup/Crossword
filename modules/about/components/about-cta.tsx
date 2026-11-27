import { StampButton } from "@/components/ui/stamp-button";
import { CtaBannerPanel, CtaBannerTitle } from "@/modules/ai-assistants/components/cta/cta";
import { ctaLinks } from "@/modules/marketing/config/navigation";

/**
 * Figma "Container" (About us, 4464:37368), closing the page in the site's CTA banner layout (the maroon twill panel,
 * its gold hairline frame 14px in, the studs and the tilted quill stamp in its top right corner): the cream two-line
 * swash headline (539px), two lines of Geist 18/27 in the on-dark label colour, and the Primary LET'S TALK stamp (as the site's other CTA banners), 28px
 * apart.
 */
export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-title" className="relative py-16 md:py-24 lg:pt-[120px] lg:pb-[120px]">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle id="about-cta-title" initial="L" firstLine="ooks like we've" secondLine="crossed paths for a reason" width={539} />
          <p className="font-sans text-lg leading-[27px] tracking-[-0.32px] text-on-dark-label max-md:text-base max-md:leading-6">
            We&apos;re building a better way for brands and customers to engage.
            <br className="max-md:hidden" />
            <span className="md:hidden"> </span>
            We&apos;d love to show you what we mean.
          </p>
          {/* The Primary stamp, as the site's other CTA banners (its colours and hover invert). */}
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            LET&rsquo;S TALK
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}
