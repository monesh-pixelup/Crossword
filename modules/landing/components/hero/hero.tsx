import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import { HeroParallax } from "./parallax/hero-parallax";
import { TrustedBy } from "./trusted-by";

/**
 * Aligned as the Pricing page header: in the content column, left-aligned, the swash title (script
 * "Y" at 100px, Crimson ExtraLight 80px at -4px, zoomed with --h2-scale; gold "yet.") with the
 * intro 8px under it, then the wine button.
 */
function HeroCopy() {
  return (
    <div className="flex content-width flex-col items-start gap-6">
      <div className="flex min-w-0 flex-col items-start gap-2 lg:-ml-0.5">
        <h1
          id="hero-title"
          className="font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-cream"
          style={{ zoom: "var(--h2-scale)" }}
        >
          <span className="font-script text-[100px] leading-[1.18] font-normal tracking-[-1px]">Y</span>
          <span className="text-[80px] leading-[1.1] tracking-[-4px]">our best hire </span>
          <span className="text-[80px] leading-[1.1] tracking-[-4.8px] text-[#eedba5]">yet.</span>
        </h1>
        <p className="max-w-[491.655px] font-sans text-base leading-6 tracking-[-0.64px] text-cream/70 lg:w-[491.655px] lg:max-w-none">
          <span className="text-cream">Crossword</span> is an AI shopper assistant that remembers,{" "}
          <br className="max-md:hidden" />
          recommends, resolves, and reports - all within the guardrails you set.
        </p>
      </div>
      <StampButton href={ctaLinks.bookDemo} variant="wine">
        BOOK A DEMO
      </StampButton>
    </div>
  );
}

/**
 * The concierge scene full-bleed on black (the header floats over it), with the copy over it; the
 * trusted-by logos follow on the page ground.
 */
export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="relative bg-black">
        {/* The black runs the full viewport width, out past the site's 1800px cap (SiteShell clips the overrun). */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-black" />
        <div className="relative">
          <HeroParallax copy={<HeroCopy />} />
        </div>
      </section>

      <div className="pt-[92px] pb-[124px]">
        <TrustedBy />
      </div>
    </>
  );
}
