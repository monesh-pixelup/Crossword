import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import panelFrame from "../../assets/lifecycle/panel-frame.svg";
import panelTexture from "../../assets/lifecycle/panel-texture.webp";
import railAccent from "../../assets/shared/rail-accent.svg";
import { ChatWindow } from "../shared/chat-window";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { StageList } from "./stage-list";

/**
 * Maroon damask panel with the assistant window floating in its frame. Drawn at 738 × 680 and
 * zoomed to its column: filling the width when stacked, fitting beside the list from 992px.
 */
function ShowcasePanel() {
  return (
    <div
      role="img"
      aria-label="The Crossword assistant suggesting a bracelet within a shopper's budget"
      className="relative h-[680px] w-[738px] shrink-0 overflow-clip bg-maroon select-none [--fit-gutter:0px] [--fit-width:738px] scale-to-container lg:ml-auto lg:fit-to-container"
    >
      <Image
        src={panelTexture}
        alt=""
        sizes="714px"
        className="absolute top-[15.01px] left-[12.16px] h-[650.036px] w-[713.68px] max-w-none"
      />
      <Image src={panelFrame} alt="" className="absolute top-[19px] left-[21px]" />
      <div className="absolute top-[calc(50%-0.07px)] left-[calc(50%-0.08px)] -translate-x-1/2 -translate-y-1/2">
        <ChatWindow tone="ivory" />
      </div>
    </div>
  );
}

export function Lifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[482px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Customer lifecycle</Eyebrow>
          <SectionTitle
            id="lifecycle-title"
            initial="E"
            firstLine="very conversation"
            secondLine={<span className="font-light">has a job to do</span>}
            width={483.867}
          />
        </div>

        <div className="flex w-full flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between">
          <StageList />
          <div className="@container w-full lg:w-auto lg:min-w-0 lg:flex-1">
            <ShowcasePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
