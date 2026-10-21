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
        className="pointer-events-auto font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-cream max-[760px]:whitespace-normal"
        style={{ zoom: "var(--h2-scale)" }}
      >
        {/* Below 760px, drawn at the section headings' size (82px swash, 60px lines, zoomed with --h2-scale), tracking scaled to match. */}
        <span className="font-script text-[100px] leading-[1.18] font-normal tracking-[-1px] max-[760px]:text-[82px]">Y</span>
        <span className="text-[80px] leading-[1.1] tracking-[-4px] max-[760px]:text-[60px] max-[760px]:tracking-[-3px]">our best hire </span>
        <span className="text-[80px] leading-[1.1] tracking-[-4.8px] text-[#eedba5] max-[760px]:text-[60px] max-[760px]:tracking-[-3.6px]">yet.</span>
      </h1>

      {/*
        The copy row sits above the scene's animated UI (see HeroParallax), so the cards and conversation can't cover
        the button or the intro; a soft blurred dark halo behind them mutes anything passing underneath.
      */}
      <div className="pointer-events-auto relative isolate flex w-[491.655px] max-w-full flex-col items-start gap-4 before:pointer-events-none before:absolute before:-inset-x-10 before:-inset-y-8 before:-z-10 before:rounded-[50%] before:bg-black/55 before:blur-2xl">

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
        {/* The black runs the full viewport width, out past the site's 1700px cap (SiteShell clips the overrun). */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-black" />
        {/*
          The scene runs the full viewport width, past the 1700px cap (SiteShell clips the overrun). It ends at the
          first screen's bottom: a frame taller than that pins the copy 88.5px above the fold, and the rest is black.
          Below 760px it is the phone stack instead (see HeroScene), at least a screen tall and growing to fit.
        */}
        <div className="relative left-1/2 max-h-svh w-screen -translate-x-1/2 overflow-hidden max-[760px]:max-h-none">
          <HeroParallax copy={<HeroCopy />} />
        </div>
      </section>

      <div className="pt-[92px] pb-[124px]">
        <TrustedBy />
      </div>
    </>
  );
}
