import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "../shared/divider-band";
import { RailAccent } from "../shared/rail-accent";
import { SectionTitle } from "../shared/section-title";
import { LifecycleTabs } from "./lifecycle-tabs";

/** Figma 3073:20862: the heading, then the stage tabs over the open feature and its mock-up. */
export function Lifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="relative pb-(--section-pad)">
      {/* Widened 0.25px each side so the band's edges sit centred on the 0.5px page rails. */}
      <div className="relative -mx-[0.25px] h-6">
        <DividerBand glyph="chat" />
      </div>

      {/* The left rail's gold accent: 103.49px down the section, below the band, and 208.94px long. */}
      <RailAccent className="absolute top-[calc(24px+103.49px)] left-[calc(var(--frame-inset)-0.5px)] h-[208.94px] w-px" />

      <div className="flex content-width flex-col items-start gap-section pt-(--section-pad)">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Customer lifecycle</Eyebrow>
          <SectionTitle
            id="lifecycle-title"
            variant="oneLine"
            weight="light"
            initial="E"
            firstLine="very conversation has a job to do"
            width={753.672}
          />
        </div>

        <LifecycleTabs />
      </div>
    </section>
  );
}
