import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";

/**
 * Layout/Livery, CTA banner variant (as on the other product pages): the guidelines' maroon scroll
 * damask set 14px in, with the home page's notched gold frame (curved corners, no studs), and a
 * centred Dark eyebrow, cream swash headline, the doc's question and the pilot button.
 */
export function LaunchBanner() {
  return (
    <section aria-labelledby="launch-cta-title" className="relative pb-16 md:pb-24">
      <div className="content-width">
        <NotchedPanel tone="scroll" inset={14} radius={24} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green" className="relative">
            Managed launch
          </Eyebrow>
          <div className="relative">
            <SectionTitle
              id="launch-cta-title"
              initial="Y"
              firstLine="ou’re getting a team,"
              secondLine="not just a product"
              width={560}
              variant="centered"
              tone="light"
              gutter={96}
            />
          </div>
          <p className="relative max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
            Ready to try our free pilot?
          </p>
          <StampButton href={ctaLinks.bookDemo} variant="primary" className="relative mt-1 focus-visible:outline-gold">
            START YOUR FREE PILOT
          </StampButton>
        </NotchedPanel>
      </div>
    </section>
  );
}
