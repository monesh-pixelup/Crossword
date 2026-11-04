import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import { HeroParallax } from "./parallax/hero-parallax";
import { TrustedBy } from "./trusted-by";

/**
 * Laid out as the product-page heroes (SellHero): the swash title on the left (script "Y" at 100px,
 * Crimson ExtraLight 70px at -3.5px (-5%), zoomed with --h2-scale; gold "AI agent") and, from 1200px, the CTA
 * column on the right, bottom-aligned with it: the wine button over the intro, 16px apart. Below
 * 1200px the column stacks under the title.
 */
function HeroCopy() {
  return (
    // The hero sits inside the rails, so its content box is the page's less the rail inset each side: the headline
    // and CTA line up with the sections below (as the other inset bands do).
    <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
      <h1
        id="hero-title"
        className="pointer-events-auto font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-cream max-[760px]:whitespace-normal"
        style={{ zoom: "var(--h2-scale)" }}
      >
        {/* Below 760px, drawn at the section headings' size (82px swash, 60px lines, zoomed with --h2-scale), tracking scaled to match. */}
        <span className="font-script text-[100px] leading-[1.18] font-normal tracking-[-1px] max-[760px]:text-[82px]">Y</span>
        <span className="text-[70px] leading-[1.1] tracking-[-3.5px] max-[760px]:text-[60px] max-[760px]:tracking-[-3px]">our brand&rsquo;s </span>
        <span className="text-[70px] leading-[1.1] tracking-[-3.5px] text-[#eedba5] max-[760px]:text-[60px] max-[760px]:tracking-[-3px]">AI agent</span>
      </h1>

      {/*
        The copy row sits above the scene's animated UI (see HeroParallax), so the cards and conversation can't cover
        the button or the intro; a soft blurred dark halo behind them mutes anything passing underneath.
      */}
      <div className="pointer-events-auto relative isolate flex w-[491.655px] max-w-full flex-col items-start gap-4 before:pointer-events-none before:absolute before:-inset-x-10 before:-inset-y-8 before:-z-10 before:rounded-[50%] before:bg-black/55 before:blur-2xl">

        <StampButton href={ctaLinks.bookDemo} variant="wine">
          BOOK A DEMO
        </StampButton>
        <p className="font-sans text-base leading-6 tracking-[-0.64px] text-white">
          Crossword helps customers buy, get support, and keep coming back. On your
          website, in ChatGPT &amp; Claude and through their personal AI agents like Muse &amp; Instinct.
        </p>
      </div>
    </div>
  );
}

/**
 * The concierge scene on black (the header floats over it), with the copy over it; the trusted-by
 * logos follow on the page ground. The black keeps between the page's two hairline rails
 * (--frame-inset in from each side), like the inset bands below it, with the cream page showing
 * outside them.
 */
export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="relative px-(--frame-inset)">
        <div className="relative bg-black">
          {/*
            The scene spans the space between the rails. It ends at the first screen's bottom: a frame taller than
            that pins the copy 88.5px above the fold, and the rest is black. Below 760px it is the phone stack instead
            (see HeroScene), at least a screen tall and growing to fit.
          */}
          <div className="relative max-h-svh w-full overflow-hidden max-[760px]:max-h-none">
            <HeroParallax copy={<HeroCopy />} />
          </div>
        </div>
      </section>

      <div className="pt-[92px] pb-[124px]">
        <TrustedBy />
      </div>
    </>
  );
}
