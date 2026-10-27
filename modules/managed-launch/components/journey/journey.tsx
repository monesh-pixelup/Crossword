import { Eyebrow } from "@/components/ui/eyebrow";
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
 * Figma "Library · Quote + steps" (Journey): the eyebrow and a centred two-line headline, then 80px
 * below it the home page's Managed launch row, sized and spaced the
 * same: "You share your objectives. We suggest potential journeys." on the left, the aubergine damask panel with this page's stamp
 * in the middle and the steps wheel on the right (LaunchWheel, with its autoplay and click-to-roll).
 */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex w-full flex-col items-center gap-section">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Journey</Eyebrow>
            <SectionTitle
              id="journey-title"
              initial="M"
              firstLine="ost projects reach saturation."
              secondLine="Crossword grows with every step"
              width={920}
              variant="centered"
            />
          </div>
        </div>

        {/*
          As the home page's Managed launch row: from 992px a 1280:360 row in three columns (text | stamp
          panel | steps), placed with the Webflow build's percentages; below that a centred stack: panel,
          steps, text.
        */}
        <div className="relative flex w-full flex-col items-center gap-12 lg:grid lg:aspect-[1280/360] lg:grid-cols-[minmax(0,1fr)_24.6875%_minmax(0,1fr)] lg:items-start lg:gap-0">
          <div className="order-3 flex flex-col items-center gap-4 lg:order-none lg:mt-[27.244%] lg:mr-[30.185%] lg:w-[179.44px] lg:items-start lg:justify-self-end">
            <p className="max-w-[149.6px] text-center font-serif text-[18px] leading-[1.1] tracking-[-0.04em] text-[#040404] lg:text-left">
              <span className="block">You share your objectives.</span>
              <span className="block">We suggest potential journeys.</span>
            </p>
          </div>

          {/* Steps at 78% of the home wheel's size: the longest is one line and has to clear the page's right rail. */}
          <LaunchWheel steps={steps} stamp={stamp} label="How a launch grows" textScale={0.78} />
        </div>
      </div>
    </section>
  );
}
