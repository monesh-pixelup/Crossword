import Image from "next/image";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "../../assets/hero/background.webp";

/**
 * Two-line display headline (70 / 56 / 48 / 44px with --display-size). Figma's box is 158px tall
 * at 70px: the 90px swash "E" pushes line 1's baseline 8.2px lower than a plain 74.9px line, so
 * line 1 carries that as top padding and both lines keep the 1.07 line height.
 */
function Headline() {
  return (
    <h1
      id="sell-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.07] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[0.117em]">
        <span className="font-script text-[1.2857em] leading-0 font-normal tracking-[-0.01em]">E</span>
        very shopper gets
      </span>
      <span className="block">
        a reason <span className="text-gold">to buy</span>
      </span>
    </h1>
  );
}

/**
 * Product-page hero: a full-bleed photo (the whole viewport width, not capped at the site's 2000px;
 * its own bottom fade is baked into the export) with the
 * copy pinned to the bottom. The overlay header floats over its top. From 1200px the headline and
 * the CTA column sit side by side, bottom-aligned, as in Figma; below that they stack.
 */
export function SellHero() {
  return (
    <section aria-labelledby="sell-hero-title" className="relative bg-[#0e0501]">
      {/* The photo runs the full viewport width, out past the site's 2000px cap on wide screens (SiteShell clips the overrun). */}
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
          <div className="flex flex-col items-start gap-3">
            <p className="font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-white/50 uppercase">
              Conversational interface
            </p>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.16px] text-cream">
              From the first question to the final click, Crossword guides every shopper toward the product that&apos;s
              perfect for them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
