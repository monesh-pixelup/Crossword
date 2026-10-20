import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import ground from "../../assets/handoff/ground.webp";
import { handoffModes } from "../../config/handoff";
import { AubergineSteps } from "./aubergine-steps";

/**
 * Layout/Livery, Aubergine steps variant (Figma "Library · Aubergine steps", node 2634:20241):
 * aubergine with Figma's fine noise grain between the page rails inside the gilt notched frame, a
 * Dark eyebrow 64.59px down over a one-line centred headline and two lines of 14px copy, then the
 * three numbered steps across 1062px (their numeral boxes 274.59px down), in an 800px-tall panel.
 */
export function HumanHandoff() {
  return (
    <section aria-labelledby="handoff-title" className="relative px-(--frame-inset)">
      {/*
        The grain is Figma's own 1x render of the Noise effect (#462160, black 25%), cut to a 240px
        tile: the browser's feTurbulence draws it crisper and darker than Figma does.
      */}
      <div
        className="relative overflow-clip bg-[#462160] bg-size-[240px_240px] bg-repeat px-5 pt-16 pb-16 md:px-10 lg:pt-[64.59px] lg:pb-[109.31px]"
        style={{ backgroundImage: `url(${ground.src})` }}
      >
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-[17.8px]">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green">Human-in-the-loop handoff</Eyebrow>
            <SectionTitle
              id="handoff-title"
              initial="H"
              firstLine=" uman-in-the-loop support"
              width={552}
              variant="handoff"
              tone="light"
            />
            <p className="max-w-[552px] text-center font-sans text-sm leading-[1.4] tracking-[-0.42px] text-white/60">
              When a conversation needs a human, Crossword brings them in at the right moment &mdash; with the context
              they need to take over.
            </p>
          </div>

          <AubergineSteps steps={handoffModes} variant="handoff" />
        </div>
      </div>
    </section>
  );
}
