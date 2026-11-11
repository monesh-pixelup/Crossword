import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { HeroBanner } from "@/modules/marketing/components/hero-banner";
import { ctaLinks } from "@/modules/marketing";
// Figma 3257:35808 (image 10027): this page's own photo, the globe and bookshelves against the panelled wall. The old
// background.webp beside it is still the other product heroes' photo.
import bannerDesktop from "../../assets/hero/banner-desktop.webp";
import bannerMobile from "../../assets/hero/banner-mobile.webp";

/**
 * Two-line display headline (Figma 3257:35912): Crimson ExtraLight 70 / 56 / 48 / 44px at 1.1 and -5%,
 * after a 100px swash "E" (1.4286em) at -1%. Figma's box is 175px tall: two 77px lines, the swash making
 * line 1 21px (0.3em) taller, which line 1 carries as top padding.
 */
function Headline() {
  return (
    <h1
      id="sell-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.1] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[0.3em]">
        <span className="font-script text-[1.4286em] leading-0 font-normal tracking-[-0.01em]">E</span>
        very shopper gets
      </span>
      <span className="block">
        a reason <span className="text-gold">to buy</span>
      </span>
    </h1>
  );
}

/**
 * Product-page hero: a full-bleed photo (the whole viewport width, not capped at the site's 1440px;
 * its own bottom fade is baked into the export) with the
 * copy pinned to the bottom. The overlay header floats over its top. From 1200px the headline and
 * the CTA column sit side by side, bottom-aligned, as in Figma; below that they stack.
 */
export function SellHero() {
  return (
    <section aria-labelledby="sell-hero-title" className="relative bg-night">
      {/* The dark ground runs the full viewport width, out past the site's 1440px cap (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-night">
        {/*
          The hero banner, full-bleed (see HeroBanner): from 760px the 3000px banner, its whole width showing on wide
          screens and its sides cropped as the screen narrows; below that the phone banner.
        */}
        <HeroBanner desktop={bannerDesktop} mobile={bannerMobile} />
      </div>

      {/*
        The screen below 760px, then Figma's 1440 x 788 hero (3257:35806) at full width, capped at the screen and at 1200px.
        From 760px the copy's sides sit 80px in (scaled with the width below 1440px), and its last line 47px (scaled) above
        the frame's foot, as in Figma, or above the screen's when the frame runs past it.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pb-16 min-[760px]:min-h-[min(calc(1440px*788/1440),100svh,1200px)] min-[760px]:pb-[max(min(47px,1440px*47/1440),calc(min(1440px*788/1440,100svh,1200px)_-_1440px*741/1440))] min-[760px]:[--page-pad:min(80px,min(100vw,1440px)*80/1440)]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          {/* Figma 3257:35909: the headline's box 12px under the eyebrow. */}
          <div className="flex flex-col items-start gap-3">
            {/* The heroes' Eyebrow (green surface on dark, 32px tall), as on Support, Retain and Managed launch. */}
            <Eyebrow surface="green" className="h-8">
              Conversational interface
            </Eyebrow>
            <Headline />
          </div>

          {/* Figma 3257:35913: the column ends 8.35px short of the content edge (its row is 1271.65px wide). */}
          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4 min-[1200px]:mr-[8.35px]">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            {/* Figma 3257:35921: the opening clause in cream, the rest at cream/60. */}
            <p className="font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-cream">
              From the first question to the final click,{" "}
              <span className="text-cream/60">
                Crossword guides every shopper toward the product that&apos;s perfect for them.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
