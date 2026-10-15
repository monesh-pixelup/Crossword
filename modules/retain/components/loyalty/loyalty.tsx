import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AubergineSteps } from "@/modules/support/components/handoff/aubergine-steps";
import { NoiseGround } from "@/modules/support/components/handoff/noise-ground";
import { loyaltyCards } from "../../config/loyalty";

/**
 * Figma "Library · Aubergine steps" (Loyalty & relationship), as Human-in-the-loop on Support:
 * aubergine with Figma's fine noise grain between the page rails inside the gilt notched frame, a
 * Dark eyebrow over a centred two-line headline (82px swash, 50px lines, the second 75.2px under
 * the first), then the three numbered steps across 1062px, their numerals 274.6px down as in Figma.
 */
export function Loyalty() {
  return (
    <section aria-labelledby="loyalty-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[70px] lg:pb-[110px]">
        <NoiseGround id="loyalty-noise" color="#462160" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-[26.6px]">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green">Loyalty &amp; relationship</Eyebrow>
            <SectionTitle
              id="loyalty-title"
              initial="R"
              firstLine="emembered,"
              secondLine="not just recorded"
              width={458.609}
              variant="handoffStacked"
              tone="light"
            />
          </div>

          <AubergineSteps steps={loyaltyCards} />
        </div>
      </div>
    </section>
  );
}
