import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import quoteMark from "@/modules/landing/assets/launch/quote-mark.svg";
import { LaunchWheel } from "@/modules/landing/components/launch/launch-wheel";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import stamp from "../../assets/journey/stamp.webp";

/** The steps (the third, "A/B test. Measure the results.", active in Figma's still frame). */
const steps = [
  "We suggest potential journeys.",
  "We adapt the experience to your business.",
  "A/B test. Measure the results.",
  "Make changes.",
  "Launch and continue to optimize.",
];

/**
 * Figma "Library · Quote + steps" (Journey): the eyebrow and a centred two-line headline, a quote
 * box 80px below, then 80px below that the home page's Managed launch row, sized and spaced the
 * same: "You share your objectives." on the left, the aubergine damask panel with this page's stamp
 * in the middle and the steps wheel on the right (LaunchWheel, with its autoplay and click-to-roll).
 */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex w-full flex-col items-center gap-section">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Journey</Eyebrow>
            <SectionTitle id="journey-title" initial="M" firstLine="ost projects reach" secondLine="completion" width={561.054} variant="centered" />
          </div>

          {/* One line from 480px; wraps below, with the marks tucked into the corners, as the home page's quote. */}
          <blockquote className="relative max-w-full border border-black/10 bg-[rgba(243,233,212,0.5)] px-5 py-11 xs:py-4 xs:pr-16 xs:pl-[72px]">
            <p className="text-center font-serif text-[22px] leading-[1.1] tracking-[-0.04em] text-[#040404] xs:whitespace-nowrap">
              Crossword grows with every step.
            </p>
            <Image src={quoteMark} alt="" className="absolute top-2 left-3 xs:top-[12.39px] xs:left-[26.16px]" />
            <Image src={quoteMark} alt="" className="absolute right-3 bottom-2 rotate-180 xs:right-[26.16px] xs:bottom-[12.75px]" />
          </blockquote>
        </div>

        {/*
          As the home page's Managed launch row: from 992px a 1280:360 row in three columns (text | stamp
          panel | steps), placed with the Webflow build's percentages; below that a centred stack: panel,
          steps, text.
        */}
        <div className="relative flex w-full flex-col items-center gap-12 lg:grid lg:aspect-[1280/360] lg:grid-cols-[minmax(0,1fr)_24.6875%_minmax(0,1fr)] lg:items-start lg:gap-0">
          <div className="order-3 flex flex-col items-center gap-4 lg:order-none lg:mt-[27.244%] lg:mr-[30.185%] lg:w-[179.44px] lg:items-start lg:justify-self-end">
            <p className="max-w-[149.6px] text-center font-serif text-[18px] leading-[1.1] tracking-[-0.04em] text-[#040404] lg:text-left">
              You share your objectives.
            </p>
          </div>

          {/* Steps at 78% of the home wheel's size: the longest is one line and has to clear the page's right rail. */}
          <LaunchWheel steps={steps} stamps={[stamp]} label="How a launch grows" textScale={0.78} />
        </div>
      </div>
    </section>
  );
}
