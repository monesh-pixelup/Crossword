import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { HeroBanner } from "@/modules/marketing/components/hero-banner";
import { ctaLinks } from "@/modules/marketing";
// Figma 3257:34042 (image 10027): the Support hero's own photo, the console table and trunk against the panelled wall.
import bannerDesktop from "../../assets/hero/banner-desktop.webp";
import bannerMobile from "../../assets/hero/banner-mobile.webp";

/**
 * Two-line display headline (Figma 3257:34146): Crimson ExtraLight 70 / 56 / 48 / 44px at 1.1 and -5%,
 * after a 100px swash "M" (1.4286em) at -1%. Figma's box is 175px tall, two 77px lines with the swash
 * pushing line 1 21px (0.3em) taller, which line 1 carries as top padding. Below 768px the lines may wrap.
 */
function Headline() {
  return (
    <h1
      id="support-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.1] font-extralight tracking-[-0.05em] text-cream md:whitespace-nowrap"
    >
      {/*
        From 768px: "Most support tickets aren't" over "complicated, they're just slow". On phones "complicated," joins the first
        sentence (wrapping over two lines) and the gold "they're just slow" starts its own line.
      */}
      <span className="block pt-[0.3em]">
        <span className="font-script text-[1.4286em] leading-0 font-normal tracking-[-0.01em]">M</span>
        ost support tickets aren&rsquo;t<span className="md:hidden"> complicated,</span>
      </span>
      <span className="block">
        <span className="max-md:hidden">complicated, </span>
        <span className="text-gold">they&rsquo;re just slow</span>
      </span>
    </h1>
  );
}

/**
 * Layout/Hero, Photo variant (as on Sell): the full-bleed photo (the whole viewport width, not capped
 * at the site's 1440px) with the copy pinned to the bottom,
 * the overlay header floating over its top. From 1200px the headline and the CTA column sit side
 * by side, bottom-aligned; below that they stack.
 */
export function SupportHero() {
  return (
    <section aria-labelledby="support-hero-title" className="relative bg-night">
      {/* The dark ground runs the full viewport width, out past the site's 1440px cap (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-night">
        {/*
          The hero banner, full-bleed (see HeroBanner): from 760px the 3000px banner, its whole width showing on wide
          screens and its sides cropped as the screen narrows; below that the phone banner.
        */}
        <HeroBanner desktop={bannerDesktop} mobile={bannerMobile} />
      </div>

      {/*
        The screen below 760px, then Figma's 1440 x 788 hero (3257:34040) at full width, capped at the screen and at 1200px.
        From 760px the copy sits as on the other product heroes (Sell, Retain, Dynamic landing pages): its last line 47px
        (scaled) above the frame's foot, or above the screen's when the frame runs past it, and its sides 80px in (scaled
        with the width below 1440px). The top padding keeps the copy 48px clear of the fixed 72.5px header: where the stacked copy is
        taller than the frame leaves room for (760–1199px), the hero grows rather than running it under the header.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pt-[calc(72.5px+48px)] pb-16 min-[760px]:min-h-[min(calc(1440px*788/1440),100svh,1200px)] min-[760px]:pb-[max(min(47px,1440px*47/1440),calc(min(1440px*788/1440,100svh,1200px)_-_1440px*741/1440))] min-[760px]:[--page-pad:min(80px,min(100vw,1440px)*80/1440)]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          {/* Figma 3257:34143: the headline's box 12px under the eyebrow. */}
          <div className="flex flex-col items-start gap-3">
            {/* Brand guidelines 11.3: the Eyebrow on every section, heroes included (green surface on dark). */}
            <Eyebrow surface="green" className="h-8">
              Support
            </Eyebrow>
            <Headline />
          </div>

          {/* Figma 3257:34147: the column runs 19.8px past the content edge (its row is 1299.8px wide). */}
          <div className="flex w-[481.52px] max-w-full flex-col items-start gap-4 min-[1200px]:-mr-[19.8px]">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-cream">
              Crossword answers the moment the question is asked, hands off cleanly when it can&rsquo;t, and keeps every
              promise your policies make.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
