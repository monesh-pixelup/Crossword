import { StampButton } from "@/components/ui/stamp-button";
import { InnerHeroBackdrop } from "@/modules/marketing/components/inner-hero";
import { ctaLinks } from "@/modules/marketing/config/navigation";

/**
 * Figma "Hero" (Trust & security, 4474:39087): the inner pages' hero ground, as About us, with the two-line headline
 * (84px Crimson ExtraLight at -5% after a 117.6px Parisienne capital) centred in 1000px and 48px under it the wine
 * BOOK A DEMO. Steps down per breakpoint (84 / 64 / 48 / 42px); below 768px the words flow (balanced).
 */
export function TrustHero() {
  return (
    <section aria-labelledby="trust-hero-title" className="relative isolate overflow-clip bg-cream">
      <InnerHeroBackdrop />

      <div className="relative flex content-width flex-col items-center gap-12 pt-14 pb-[clamp(150px,40vw,212px)] text-center max-md:gap-9 max-md:[--hero-pad:calc(56px+clamp(150px,40vw,212px))] max-md:[--hero-pb:max(calc(var(--hero-pad)/2),calc(22.19vw+16px))] max-md:pt-[calc(var(--hero-pad)-var(--hero-pb))] max-md:pb-(--hero-pb) md:pt-[111px] lg:min-h-[571px] lg:pb-16">
        <h1
          id="trust-hero-title"
          className="w-full max-w-[1000px] pt-[0.12em] font-serif text-[84px] leading-none font-extralight tracking-[-0.05em] text-balance text-ink max-lg:text-[64px] max-md:text-[48px] max-[479px]:text-[42px]"
        >
          <span className="font-script text-[1.4em] leading-0 font-normal tracking-normal">A</span> good concierge keeps your
          <br className="max-md:hidden" />
          <span className="md:hidden"> </span>
          secrets and follows your rules
        </h1>
        <StampButton href={ctaLinks.bookDemo} variant="wine">
          BOOK A DEMO
        </StampButton>
      </div>
    </section>
  );
}
