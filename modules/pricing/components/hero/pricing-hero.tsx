import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "@/modules/sell/assets/hero/background.webp";

/**
 * Two-line display headline (70 / 56 / 48 / 44px with --display-size, 1.07 leading), as Sell's but
 * with a 96px swash "C" at +5%. Figma's box is 163px tall: the swash pushes line 1's baseline
 * 10.66px lower than a plain 74.9px line, so line 1 carries that as top padding.
 */
function Headline() {
  return (
    <h1
      id="pricing-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.07] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[0.152em]">
        <span className="font-script text-[1.3714em] leading-0 font-normal tracking-[0.05em]">C</span>
        rossword runs
      </span>
      <span className="block text-gold">on credits</span>
    </h1>
  );
}

/**
 * Hero B (Figma 3156:13091): Sell's full-bleed photo with the copy pinned to the bottom, the
 * overlay header floating over its top. The frame is 1440 × 788 and the copy's foot sits 59px above
 * its own. From 1200px the CTA column starts 818.25px (scaled) into the content, as in Figma, the
 * headline column taking the rest; below that they stack.
 */
export function PricingHero() {
  return (
    <section aria-labelledby="pricing-hero-title" className="relative bg-[#0e0501]">
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
        The screen below 760px, then the 1440 x 788 frame at full width, capped at the screen. From 760px the copy's
        last line sits 59px (scaled) above the frame's foot, or above the screen's when the frame runs past it.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pt-[calc(72.5px+48px)] pb-16 min-[760px]:min-h-[min(calc(100vw*788/1440),100svh)] min-[760px]:pb-[max(min(59px,100vw*59/1440),calc(min(100vw*788/1440,100svh)_-_100vw*729/1440))] min-[760px]:[--page-pad:min(80px,100vw*80/1440)]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:gap-0">
          <div className="flex flex-col items-start gap-3 min-[1200px]:flex-[0_1_818.25px]">
            {/* The heroes' Eyebrow (green surface on dark, 32px tall), as on Sell and Support. */}
            <Eyebrow surface="green" className="h-8">
              Pricing
            </Eyebrow>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full shrink-0 flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              TALK TO SALES
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.16px] text-cream">
              You pay when your agent does something for a shopper and nothing when it doesn&rsquo;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
