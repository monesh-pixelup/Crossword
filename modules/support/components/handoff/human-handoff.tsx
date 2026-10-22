import Image from "next/image";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import ground from "../../assets/handoff/ground.webp";
import { handoffModes } from "../../config/handoff";
import { AubergineSteps } from "./aubergine-steps";
import { HandoffScene } from "./handoff-scene";

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

          {/*
            Each step's cell plays its mode's motion scene, filling it. Stacked (below 768px) the steps keep to 440px,
            centred, so the cards stay close to their drawn size instead of growing with the screen.
            In a row, the dashed rules along the cells overshoot the row by Figma's 57px only where there's room: they stop
            at least 24px inside the panel's edge, clear of the gilt frame (its lines 8–17px in). The row's side room is
            the panel's 40px padding plus whatever the panel (the page's width, capped at 1600px, less the rails' insets
            and that padding) has beyond the row's 1062px.
          */}
          <div
            className="w-full max-md:max-w-[440px]"
            style={
              {
                "--steps-overshoot": "min(57px, max(0px, (min(100vw, 1600px) - 2 * var(--frame-inset) - 80px - 1062px) / 2) + 16px)",
              } as CSSProperties
            }
          >
            <AubergineSteps steps={handoffModes} variant="handoff" media={(i) => <HandoffScene index={i} />} />
          </div>
        </div>
      </div>
    </section>
  );
}
