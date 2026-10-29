import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import ground from "@/modules/support/assets/handoff/ground.webp";
import { AubergineSteps } from "@/modules/support/components/handoff/aubergine-steps";
import card from "../../assets/promotions/card.svg";
import { promotionSteps } from "../../config/promotions";

/**
 * Figma "Section · Promotions & upselling" (node 3305:1197), the Aubergine steps livery laid out as
 * Support's Human-in-the-loop: aubergine with Figma's fine noise grain between the page rails, inside
 * the gilt notched frame (8px in from the panel's sides, 19px down), a Dark eyebrow 66.59px down over a centred two-line
 * headline and two lines of 16px copy, then the three numbered steps across 1062px 32px below, in
 * an 800px-tall band. Personal agents (3308:549) passes its own headline (a 413px box), copy and steps.
 */
export function Promotions({
  id = "promotions-title",
  initial = "G",
  firstLine = " et the right offer",
  secondLine = "into the conversation",
  width = 440,
  copy = (
    <>
      Tell Crossword which products or bundles to recommend, and it brings them up when they fit what the shopper is
      asking. You stay in control of the offer, even inside ChatGPT.
    </>
  ),
  steps = promotionSteps,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width. */
  width?: number;
  copy?: ReactNode;
  steps?: { title: string; description: string }[];
}) {
  return (
    <section aria-labelledby={id} className="relative px-(--frame-inset)">
      {/*
        Figma's own 1x render of the aubergine Noise grain, tiled at 240px, as Human-in-the-loop on Support.
        The bottom padding closes the band at Figma's 800px under the second step's five lines of copy.
      */}
      <div
        className="relative overflow-clip bg-[#462160] bg-size-[240px_240px] bg-repeat px-5 pt-16 pb-16 md:px-10 lg:pt-[66.59px] lg:pb-[78.61px]"
        style={{ backgroundImage: `url(${ground.src})` }}
      >
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-8">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green">Promotions &amp; upselling</Eyebrow>
            <SectionTitle
              id={id}
              initial={initial}
              firstLine={firstLine}
              secondLine={secondLine}
              width={width}
              variant="loyalty"
              weight="light"
              tone="light"
            />
            <p className="max-w-[600px] text-center font-sans text-base leading-6 tracking-[-0.32px] text-white/60">{copy}</p>
          </div>

          {/*
            As on Support's Human-in-the-loop: stacked (below 768px) the steps keep to 440px, centred. In a row, the dashed
            rules along the cells overshoot the row by Figma's 57px only where there's room: they stop at least 24px inside
            the panel's edge, clear of the gilt frame (its lines 8–17px in).
          */}
          <div
            className="w-full max-md:max-w-[440px]"
            style={
              {
                "--steps-overshoot": "min(57px, max(0px, (min(100vw, 1600px) - 2 * var(--frame-inset) - 80px - 1062px) / 2) + 16px)",
              } as CSSProperties
            }
          >
            <AubergineSteps steps={steps} variant="promotions" cardArt={card} />
          </div>
        </div>
      </div>
    </section>
  );
}
