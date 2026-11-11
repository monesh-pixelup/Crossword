import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import quoteMark from "../../assets/launch/quote-mark.svg";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { LaunchWheel } from "./launch-wheel";

/**
 * Figma 3073:21810: the line centred in the 827px box, 72px in from both sides (16px top and bottom), the opening mark
 * 26.16px in at the top left and the closing mark, turned, 26.16px in near the bottom right. One line from 992px; wraps
 * below, with the marks tucked into the corners on small phones.
 */
function Quote() {
  return (
    <blockquote className="relative flex w-full max-w-[827px] items-center justify-center border border-black/10 bg-[rgba(243,233,212,0.5)] px-5 py-11 xs:px-[72px] xs:py-4">
      <p className="text-center font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.04em] text-ink lg:whitespace-nowrap">
        We want this, but we don&apos;t have the people, time or expertise to build it ourselves.
      </p>
      <Image src={quoteMark} alt="" className="absolute top-2 left-3 xs:top-[12.39px] xs:left-[26.16px]" />
      <Image src={quoteMark} alt="" className="absolute right-3 bottom-2 rotate-180 xs:right-[26.16px] xs:bottom-[10.95px]" />
    </blockquote>
  );
}

export function ManagedLaunch() {
  return (
    <section aria-labelledby="launch-title" className="relative section-pad-band">
      <DividerBand glyph="gear" />

      {/* Figma 3073:21775: 44px from the quote down to the 360px row (the header still 80px above the quote). */}
      <div className="flex content-width flex-col items-center gap-section lg:gap-11">
        <div className="flex w-full flex-col items-center gap-section">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Managed launch</Eyebrow>
            <SectionTitle
              id="launch-title"
              initial="W"
              firstLine={"e build your "}
              secondLine={"concierge for you "}
              width={561.054}
              variant="launch"
              weight="light"
            />
          </div>
          <Quote />
        </div>

        {/*
          From 992px a 1280:360 row in three columns (call to action | stamp panel | steps), placed with
          the Webflow build's percentages; below that a centred stack: panel, steps, call to action.
        */}
        <div className="relative flex w-full flex-col items-center gap-12 lg:grid lg:aspect-[1280/360] lg:grid-cols-[1fr_24.6875%_1fr] lg:items-start lg:gap-0">
          {/*
            Figma 3073:21775: a hairline rule (black 20%) runs down the left of the call to action, with its top half
            picked out in gold, 20px from the copy. Shown from 992px, where the block sits left-aligned in its column.
          */}
          <div className="order-3 flex items-stretch gap-5 lg:order-none lg:mt-[27.244%] lg:mr-[calc(30.185%_-_60px)] lg:w-[199.44px] lg:justify-self-end">
            <span aria-hidden className="relative hidden w-px shrink-0 bg-black/20 lg:block">
              <span className="absolute inset-x-0 top-px h-1/2 bg-gold" />
            </span>
            <div className="flex flex-col items-center gap-4 lg:w-[179.44px] lg:items-start">
              <p className="max-w-[149.6px] text-center font-serif text-[18px] leading-[1.1111] tracking-[-0.04em] max-md:text-[16px] max-md:leading-[18px] max-md:tracking-[-0.64px] text-ink lg:text-left">
                Simply tell us how your business works.
              </p>
              <Link
                href="#explore-platform"
                className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-cream p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] max-md:text-[15px] max-md:leading-5 max-md:tracking-[-0.45px] whitespace-nowrap text-ink-soft transition-opacity duration-150 hover:opacity-50"
              >
                EXPLORE PLATFORM
                <Image src={arrowRight} alt="" className="size-3" />
              </Link>
            </div>
          </div>

          <LaunchWheel />
        </div>
      </div>
    </section>
  );
}
