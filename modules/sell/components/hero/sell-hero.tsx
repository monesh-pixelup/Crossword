import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "../../assets/hero/background.webp";

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
 * Product-page hero: a full-bleed photo (the whole viewport width, not capped at the site's 1600px;
 * its own bottom fade is baked into the export) with the
 * copy pinned to the bottom. The overlay header floats over its top. From 1200px the headline and
 * the CTA column sit side by side, bottom-aligned, as in Figma; below that they stack.
 */
export function SellHero() {
  return (
    <section aria-labelledby="sell-hero-title" className="relative bg-[#0e0501]">
      {/* The photo runs the full viewport width, out past the site's 1600px cap on wide screens (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0e0501]">
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      {/*
        As tall as the home hero: the screen below 760px, then the 1440 x 863 frame at full width, capped at the screen.
        From 760px the copy sits as the home hero's does: its sides 80px in (scaled with the width below 1440px), and its
        last line 10.25% of the frame above the frame's foot, or 88.5px (scaled) above the screen's when the frame runs past it.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pb-16 min-[760px]:min-h-[min(calc(100vw*863/1440),100svh)] min-[760px]:pb-[max(min(88.5px,100vw*88.5/1440),calc(min(100vw*863/1440,100svh)_-_100vw*863*0.8975/1440))] min-[760px]:[--page-pad:min(80px,100vw*80/1440)]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          <div className="flex flex-col items-start gap-6">
            {/* The heroes' Eyebrow (green surface on dark, 32px tall), as on Support, Retain and Managed launch. */}
            <Eyebrow surface="green" className="h-8">
              Conversational interface
            </Eyebrow>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-cream">
              From the first question to the final click, Crossword guides every shopper toward the product that&apos;s
              perfect for them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
