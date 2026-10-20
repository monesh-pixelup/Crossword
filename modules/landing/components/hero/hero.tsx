import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import { HeroParallax } from "./parallax/hero-parallax";
import { TrustedBy } from "./trusted-by";

/**
 * Laid out as the product-page heroes (SellHero): the swash title on the left (script "Y" at 100px,
 * Crimson ExtraLight 80px at -4px, zoomed with --h2-scale; gold "yet.") and, from 1200px, the CTA
 * column on the right, bottom-aligned with it: the wine button over the intro, 16px apart. Below
 * 1200px the column stacks under the title.
 */
function HeroCopy() {
  return (
    <div className="flex content-width flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
      <h1
        id="hero-title"
        className="font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-cream"
        style={{ zoom: "var(--h2-scale)" }}
      >
        <span className="font-script text-[100px] leading-[1.18] font-normal tracking-[-1px]">Y</span>
        <span className="text-[80px] leading-[1.1] tracking-[-4px]">our best hire </span>
        <span className="text-[80px] leading-[1.1] tracking-[-4.8px] text-[#eedba5]">yet.</span>
      </h1>

      <div className="flex w-[491.655px] max-w-full flex-col items-start gap-4">
        <StampButton href={ctaLinks.bookDemo} variant="wine">
          BOOK A DEMO
        </StampButton>
        <p className="font-sans text-base leading-6 tracking-[-0.64px] text-cream/70">
          <span className="text-cream">Crossword</span> is an AI shopper assistant that remembers,{" "}
          <br className="max-md:hidden" />
          recommends, resolves, and reports - all within the guardrails you set.
        </p>
      </div>
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
