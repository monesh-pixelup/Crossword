import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "@/modules/sell/assets/hero/background.webp";

/**
 * Two-line display headline, set like Support's and Retain's (70 / 56 / 48 / 44px, Crimson ExtraLight at
 * 1.1 and -5%) after a 100px swash "C" (1.4286em) at -1%, its second line picked out in gold, which the
 * guidelines allow on dark grounds only. Figma's box is 175px tall, two 77px lines with the swash pushing
 * line 1 21px (0.3em) taller, which line 1 carries as top padding.
 */
function Headline() {
  return (
    <h1
      id="pricing-hero-title"
      className="font-serif text-(length:--display-size) leading-[1.1] font-extralight tracking-[-0.05em] whitespace-nowrap text-cream"
    >
      <span className="block pt-[0.3em]">
        <span className="font-script text-[1.4286em] leading-0 font-normal tracking-[-0.01em]">C</span>
        rossword runs
      </span>
      <span className="block text-gold">on credits</span>
    </h1>
  );
}

/**
 * Layout/Hero, Photo variant (as on Support and Retain): the full-bleed photo (the whole viewport width,
 * not capped at the site's 1440px) with the copy pinned to the bottom, the overlay header floating over
 * its top. From 1200px the headline and the CTA column sit side by side, bottom-aligned; below that they
 * stack.
 */
export function PricingHero() {
  return (
    <section aria-labelledby="pricing-hero-title" className="relative bg-night">
      {/* The dark ground runs the full viewport width, out past the site's 1440px cap (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-night">
        {/*
          As the home hero (and Stripe's): the photo holds its 1440px composition, centred, instead of growing past it;
          the dark ground runs on either side, and there the photo's sides fade into it (16% each).
        */}
        <div className="absolute inset-y-0 left-1/2 w-full max-w-[1440px] -translate-x-1/2 min-[1441px]:[mask-image:linear-gradient(to_right,transparent,#000_16%,#000_84%,transparent)]">
          <Image
            src={background}
            alt=""
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            preload
            className="object-cover object-[70%_center] lg:object-center"
          />
        </div>
      </div>

      {/*
        As tall as the home hero (and Support's and Retain's): the screen below 760px, then the 1440 x 863 frame at full
        width, capped at the screen and at 1200px. From 760px the copy's last line sits 10.25% of the frame above the frame's foot, or
        88.5px (scaled) above the screen's when the frame runs past it. Its sides keep the page's own padding, level with
        the header's logo and the sections below. The top padding keeps the copy 48px clear of the fixed 72.5px header.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pt-[calc(72.5px+48px)] pb-16 min-[760px]:min-h-[min(calc(1440px*863/1440),100svh,1200px)] min-[760px]:pb-[max(min(88.5px,1440px*88.5/1440),calc(min(1440px*863/1440,100svh,1200px)_-_1440px*863*0.8975/1440))]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          <div className="flex flex-col items-start gap-6">
            {/* Brand guidelines 11.3: the Eyebrow on every section, heroes included (green surface on dark). */}
            <Eyebrow surface="green" className="h-8">
              Pricing
            </Eyebrow>
            <Headline />
          </div>

          <div className="flex w-[453.402px] max-w-full flex-col items-start gap-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              TALK TO SALES
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-cream">
              You pay when your agent does something for a shopper and nothing when it doesn&rsquo;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
