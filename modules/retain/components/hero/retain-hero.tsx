import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "@/modules/sell/assets/hero/background.webp";

/**
 * Two-line display headline, set like the Sell hero's (70 / 56 / 48 / 44px, 1.07 leading, swash
 * "G"), its second line picked out in gold, which the guidelines allow on dark grounds only.
 *
 * The hero copy is pinned to the bottom, so any fractional height below the eyebrow pushes its top
 * edge onto a half pixel, where its 0.5px frame and corner curls blur at 1x. The leading and top
 * padding are rounded to whole pixels (and the eyebrow set to 32px tall) so it lands cleanly.
 */
function Headline() {
  return (
    <h1
      id="retain-hero-title"
      className="font-serif text-(length:--display-size) leading-[round(1.07em,1px)] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[round(0.117em,1px)]">
        <span className="font-script text-[1.2857em] leading-0 font-normal tracking-[-0.01em]">G</span>
        ood to see
      </span>
      <span className="block text-gold">you again</span>
    </h1>
  );
}

/**
 * Layout/Hero, Photo variant (as on Sell): the full-bleed photo (the whole viewport width, not capped
 * at the site's 1800px) with the copy pinned to the bottom,
 * the overlay header floating over its top. From 1200px the headline and the CTA column sit side
 * by side, bottom-aligned; below that they stack.
 */
export function RetainHero() {
  return (
    <section aria-labelledby="retain-hero-title" className="relative bg-night">
      {/* The photo runs the full viewport width, out past the site's 1800px cap on wide screens (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-night">
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      <div className="relative flex min-h-[640px] content-width flex-col justify-end pb-16 md:min-h-[788px] md:pb-[85px]">
        <div className="flex w-full max-w-[1271.652px] flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow surface="green" className="h-8">
              Retain
            </Eyebrow>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.02em] text-cream">
              Crossword remembers every customer after the sale, reaching out at the right moment, on the right
              channel, with something worth opening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
