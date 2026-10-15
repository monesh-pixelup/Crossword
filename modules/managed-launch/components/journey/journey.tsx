import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import panelTexture from "@/modules/landing/assets/launch/panel-texture.webp";
import quoteMark from "@/modules/landing/assets/launch/quote-mark.svg";
import stud from "@/modules/landing/assets/launch/stud.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import stamp from "../../assets/journey/stamp.webp";
import { JourneySteps } from "./journey-steps";

/** The panel's four 8px rings, as on the home page's Managed launch. */
const rings = [
  { left: 300.047, top: 9.688 },
  { left: 300.047, top: 292.016 },
  { left: 9.758, top: 9.688 },
  { left: 9.758, top: 292.016 },
];

/** The steps, the third (two lines in Figma, both in forest) active to start, as Figma's still frame. */
const steps = [
  "We suggest potential journeys.",
  "We adapt the experience to your business.",
  "A/B test.\nMeasure the results.",
  "Make changes.",
  "Launch and continue to optimize.",
];

/**
 * Figma "Library · Quote + steps" (Journey): the eyebrow and a centred two-line headline, a quote
 * box 80px below, then 80px below that a 1280 × 522.86 row: "You share your objectives." on the
 * left, the aubergine damask panel (316 × 310, the home Managed launch panel) with Figma's stamp in
 * the middle, and on the right the steps as Figma's still frame, 40px Crimson, the middle two in
 * forest and the rest fading out. Clicking a step rolls it into place and drops its stamp, as the
 * home page's Managed launch does (JourneySteps).
 */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-section">
          <div className="flex flex-col items-center gap-6">
            <Eyebrow>Journey</Eyebrow>
            <SectionTitle id="journey-title" initial="M" firstLine="ost projects reach" secondLine="completion" width={561.054} variant="centered" />
          </div>

          <blockquote className="relative border border-black/10 bg-[rgba(243,233,212,0.5)] px-[72px] py-4">
            <p className="font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] whitespace-nowrap text-[#040404]">
              Crossword grows with every step.
            </p>
            <Image src={quoteMark} alt="" className="absolute top-[12.39px] left-[32.11px]" />
            <Image src={quoteMark} alt="" className="absolute right-[32.11px] bottom-[12.39px] rotate-180" />
          </blockquote>
        </div>

        <div className="relative flex w-full flex-col items-center gap-12 lg:block lg:h-[522.86px] lg:max-w-[1280px]">
          <p className="w-[149.607px] text-center font-serif text-[18px] leading-[1.1] tracking-[-0.72px] text-[#040404] lg:absolute lg:top-[233.59px] lg:left-[157.07px] lg:text-left">
            You share your objectives.
          </p>

          <JourneySteps
            steps={steps}
            initial={2}
            stamp={stamp}
            panel={
              <>
                <Image src={panelTexture} alt="" sizes="295px" className="absolute top-[10.41px] left-[11.61px] h-[289.179px] w-[292.777px] max-w-none" />
                {rings.map((pos) => (
                  <Image key={`${pos.left}-${pos.top}`} src={stud} alt="" className="absolute size-2" style={pos} />
                ))}
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
