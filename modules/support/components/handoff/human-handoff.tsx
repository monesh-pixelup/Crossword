import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { HandoffTabs } from "./handoff-tabs";

/**
 * Layout/Livery, Aubergine steps variant (“Human handoff built for real support teams” in Figma):
 * aubergine damask between the page rails inside the gilt notched frame, a Dark eyebrow and
 * centred headline. The steps’ stamp cards give way to the live conversation, which the numbered
 * steps switch between.
 */
export function HumanHandoff() {
  return (
    <section aria-labelledby="handoff-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[72px] lg:pb-[110px]">
        <LiveryGround tone="aubergine" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <Eyebrow surface="green">Human-in-the-loop</Eyebrow>
            <SectionTitle
              id="handoff-title"
              initial="H"
              firstLine="uman-in-the-loop"
              secondLine="support"
              width={470}
              variant="centered"
              tone="light"
            />
            <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
              When a conversation needs a human, Crossword brings them in at the right moment, with the context they
              need to take over.
            </p>
          </div>

          <HandoffTabs />
        </div>
      </div>
    </section>
  );
}
