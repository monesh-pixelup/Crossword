import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "@/modules/sell/assets/hero/background.webp";

/** Two-line display headline, set like the Sell hero's (70 / 56 / 48 / 44px, 1.07 leading, swash "E"). */
function Headline() {
  return (
    <h1
      id="dlp-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.07] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[0.117em]">
        <span className="font-script text-[1.2857em] leading-0 font-normal tracking-[-0.01em]">E</span>
        very page, built
      </span>
      <span className="block">
        for the <span className="text-gold">person on it</span>
      </span>
    </h1>
  );
}

/**
 * Layout/Hero, Photo variant (as on Sell): the full-bleed photo with the copy pinned to the bottom,
 * the overlay header floating over its top. From 1200px the headline and the CTA column sit side
 * by side, bottom-aligned; below that they stack.
 */
export function DynamicHero() {
  return (
    <section aria-labelledby="dlp-hero-title" className="relative overflow-hidden bg-night">
      <Image
        src={background}
        alt=""
        fill
        sizes="100vw"
        preload
        className="object-cover object-[70%_center] lg:object-center"
      />

      <div className="relative flex min-h-[640px] content-width flex-col justify-end pb-16 md:min-h-[788px] md:pb-[85px]">
        <div className="flex w-full max-w-[1271.652px] flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          <div className="flex flex-col items-start gap-6">
            {/* Brand guidelines 11.3: the Eyebrow on every section, heroes included (green surface on dark). */}
            <Eyebrow surface="green">Dynamic landing pages</Eyebrow>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-cream">
              Crossword builds landing pages that carry your ad&rsquo;s message into your store, and product pages
              that adapt to each shopper. Higher ROAS on the click. Higher conversion on the page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
