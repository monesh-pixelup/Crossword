import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import quoteMark from "../../assets/launch/quote-mark.svg";
import arrowRight from "../../assets/lifecycle/arrow-right.svg";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { LaunchWheel } from "./launch-wheel";

/** One line from 992px; wraps below, with the marks tucked into the corners on small phones. */
function Quote() {
  return (
    <blockquote className="relative w-full max-w-[827px] border border-black/10 bg-[rgba(243,233,212,0.5)] px-5 py-11 xs:py-4 xs:pr-16 xs:pl-[72px]">
      <p className="font-serif text-[22px] leading-[1.1] tracking-[-0.04em] text-[#040404] lg:whitespace-nowrap">
        We want this, but we don&apos;t have the people, time or expertise to build it ourselves.
      </p>
      <Image src={quoteMark} alt="" className="absolute top-2 left-3 xs:top-[12.39px] xs:left-[26.16px]" />
      <Image src={quoteMark} alt="" className="absolute right-3 bottom-2 rotate-180 xs:right-[26.16px] xs:bottom-[12.75px]" />
    </blockquote>
  );
}

export function ManagedLaunch() {
  return (
    <section aria-labelledby="launch-title" className="relative section-pad-band">
      <DividerBand glyph="gear" />

      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex w-full flex-col items-center gap-section">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Managed launch</Eyebrow>
            <SectionTitle
              id="launch-title"
              initial="W"
              firstLine={"e build your "}
              secondLine={"concierge for you "}
              width={561.054}
              variant="centered"
            />
          </div>
          <Quote />
        </div>

        {/*
          From 992px a 1280:360 row in three columns (call to action | stamp panel | steps), placed with
          the Webflow build's percentages; below that a centred stack: panel, steps, call to action.
        */}
        <div className="relative flex w-full flex-col items-center gap-12 lg:grid lg:aspect-[1280/360] lg:grid-cols-[1fr_24.6875%_1fr] lg:items-start lg:gap-0">
          <div className="order-3 flex flex-col items-center gap-4 lg:order-none lg:mt-[27.244%] lg:mr-[30.185%] lg:w-[179.44px] lg:items-start lg:justify-self-end">
            <p className="max-w-[149.6px] text-center font-serif text-[18px] leading-[1.1] tracking-[-0.04em] text-[#040404] lg:text-left">
              Simply tell us how your business works.
            </p>
            <Link
              href="#explore-platform"
              className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] bg-[#fff9e9] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
            >
              EXPLORE PLATFORM
              <Image src={arrowRight} alt="" className="size-3" />
            </Link>
          </div>

          <LaunchWheel />
        </div>
      </div>
    </section>
  );
}
