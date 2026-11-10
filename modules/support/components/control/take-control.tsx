import { Eyebrow } from "@/components/ui/eyebrow";
import frameBackground from "../../assets/control/scene-frame-background-forest.svg";
import frameTexture from "../../assets/control/background-texture-forest.webp";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { SupportScenePanel } from "../motion/support-scene-panel";

/**
 * Figma "Library · Accordion + media" (You keep complete control): on the left the eyebrow, a
 * two-line headline (77px swash, 50px lines at 1.1, the page's other headings' leading) and a 553px line of copy, 18px apart; on
 * the right, 10px down, the merchant-insight motion scene (a helpdesk chat) in the home page Lifecycle cards' frame,
 * in forest green: 738 × 680 with a gold ring in each corner and the damask texture inside its notched gold rule (the
 * home art recoloured as Retain's forest campaign damask, its gold untouched), the chat centred on it (its own green
 * card hidden). A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function TakeControl() {
  return (
    <section aria-labelledby="control-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      {/* Side by side from 1301px, where the 687px scene fits at its size beside the copy; stacked below. */}
      <div className="flex content-width flex-col gap-14 min-[1301px]:flex-row min-[1301px]:items-start min-[1301px]:justify-between min-[1301px]:gap-8">
        <div className="flex flex-col items-start gap-[18px] min-[1301px]:shrink-0">
          <Eyebrow>You keep complete control</Eyebrow>
          <SectionTitle id="control-title" initial="T" firstLine="ake control," secondLine="whenever you like" width={553.133} variant="dynamic" weight="light" />
          <p className="max-w-[553px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60 max-md:mt-2">
            Crossword gives the human-in-the-loop full context. Every conversation, workflow, order, page viewed, note and
            stuck moment. Crossword can surface the important bits, while the human stays in control.
          </p>
        </div>

        {/*
          The home page Lifecycle frame in forest green (738 × 680, drawn at the column's width): the ground (#003c1f)
          with its four gold rings, and the damask texture with its notched gold rule 13.16px / 15.98px in. Over it the merchant-insight
          chat (687 × 586, never past its drawn size), centred, without its own green card (`.sup-plain`).
        */}
        <div className="relative aspect-[738/680] w-full overflow-clip min-[1301px]:mt-2.5 min-[1301px]:w-[687px] min-[1301px]:shrink">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed frame art, scaled with the panel */}
          <img src={frameBackground.src} alt="" aria-hidden className="absolute inset-0 size-full" />
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed frame art, scaled with the panel */}
          <img
            src={frameTexture.src}
            alt=""
            aria-hidden
            className="absolute top-[calc(100%*15.98/680)] left-[calc(100%*13.16/738)] h-[calc(100%*648.036/680)] w-[calc(100%*711.68/738)]"
          />
          <div className="sup-plain absolute inset-0">
            <SupportScenePanel slug="merchant-insight" />
          </div>
        </div>
      </div>
    </section>
  );
}
