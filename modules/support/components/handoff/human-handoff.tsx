import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { handoffModes } from "../../config/handoff";
import { AubergineSteps } from "./aubergine-steps";

/**
 * Layout/Livery, Aubergine steps variant (Figma "Library · Aubergine steps"): aubergine damask
 * between the page rails inside the gilt notched frame, a Dark eyebrow over a one-line centred
 * headline, then the three numbered steps across 1062px.
 */
export function HumanHandoff() {
  return (
    <section aria-labelledby="handoff-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[70px] lg:pb-[110px]">
        <LiveryGround tone="aubergine" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-[66.6px]">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green">Human-in-the-loop handoff</Eyebrow>
            <SectionTitle
              id="handoff-title"
              initial="H"
              firstLine="uman-in-the-loop support"
              width={552}
              variant="handoff"
              tone="light"
            />
          </div>

          <AubergineSteps steps={handoffModes} />
        </div>
      </div>
    </section>
  );
}
