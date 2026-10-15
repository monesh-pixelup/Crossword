import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { handoffModes } from "../../config/handoff";
import { AubergineSteps } from "./aubergine-steps";
import { NoiseGround } from "./noise-ground";

/**
 * Layout/Livery, Aubergine steps variant (Figma "Library · Aubergine steps"): aubergine with
 * Figma's fine noise grain between the page rails inside the gilt notched frame, a Dark eyebrow
 * over a one-line centred headline and a 14px line of copy, then the three numbered steps across
 * 1062px (their numerals 286px down, as in Figma).
 */
export function HumanHandoff() {
  return (
    <section aria-labelledby="handoff-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[70px] lg:pb-[110px]">
        <NoiseGround id="handoff-noise" color="#462160" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-[18px]">
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
            <p className="max-w-[560px] text-center font-sans text-sm leading-[1.5] tracking-[-0.28px] text-white/60">
              When a conversation needs a human, Crossword brings them in at the right moment &mdash; with the context
              they need to take over.
            </p>
          </div>

          <AubergineSteps steps={handoffModes} />
        </div>
      </div>
    </section>
  );
}
