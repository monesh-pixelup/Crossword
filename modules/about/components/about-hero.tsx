import { StampButton } from "@/components/ui/stamp-button";
import { InnerHeroBackdrop } from "@/modules/marketing/components/inner-hero";
import { ctaLinks } from "@/modules/marketing/config/navigation";

/**
 * Figma "Hero" (About us, 4454:31873): the inner pages' hero ground (the cream, the embossed roses and the soft-light
 * flourish from the foot, the rails and their 209px gold ticks 111px down; InnerHeroBackdrop), with the headline
 * centred 111px under the header: an 84px Crimson ExtraLight at 84px and -5% after a 117.6px Parisienne capital, two
 * lines (178px with the capital's rise), and 48px under it the wine BOOK A DEMO. 1440 × 571 at full size.
 *
 * The headline steps down with the breakpoint (84 / 64 / 48 / 42px) and, below 768px, its words flow (balanced). Below
 * 768px the copy is centred in the hero above the ornaments, as on the other inner heroes.
 */
export function AboutHero() {
  return (
    <section aria-labelledby="about-hero-title" className="relative isolate overflow-clip bg-cream">
      <InnerHeroBackdrop />

      <div className="relative flex content-width flex-col items-center gap-12 pt-14 pb-[clamp(150px,40vw,212px)] text-center max-md:gap-9 max-md:[--hero-pad:calc(56px+clamp(150px,40vw,212px))] max-md:[--hero-pb:max(calc(var(--hero-pad)/2),calc(22.19vw+16px))] max-md:pt-[calc(var(--hero-pad)-var(--hero-pb))] max-md:pb-(--hero-pb) md:pt-[111px] lg:min-h-[571px] lg:pb-16">
        <h1
          id="about-hero-title"
          className="w-full max-w-[1000px] pt-[0.12em] font-serif text-[84px] leading-none font-extralight tracking-[-0.05em] text-balance text-ink max-lg:text-[64px] max-md:text-[48px] max-[479px]:text-[42px]"
        >
          {/* The capital (1.4em, Parisienne) takes no line height of its own, so both lines keep the headline's 1. */}
          <span className="font-script text-[1.4em] leading-0 font-normal tracking-normal">W</span>
          e&apos;ve got a thing
          <br className="max-md:hidden" />
          <span className="md:hidden"> </span>
          for good conversations.
        </h1>
        <StampButton href={ctaLinks.bookDemo} variant="wine">
          BOOK A DEMO
        </StampButton>
      </div>
    </section>
  );
}
