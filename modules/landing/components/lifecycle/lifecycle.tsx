import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "../../assets/shared/rail-accent.svg";
import { DividerBand } from "../shared/divider-band";
import { RailAccent } from "../shared/rail-accent";
import { SectionTitle } from "../shared/section-title";
import { LifecycleTabs } from "./lifecycle-tabs";

export function Lifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="relative pb-(--section-pad)">
      {/*
        The divider as its own 24px strip, above the sticky heading's cream cover. Widened 0.25px
        each side so the band's edges sit centred on the 0.5px page rails.
      */}
      <div className="relative z-20 -mx-[0.25px] h-6">
        <DividerBand glyph="chat" />
      </div>

      <div className="content-width pt-(--section-pad)">
        <LifecycleTabs
          heading={
            <div className="flex flex-col items-start gap-6">
              {/* Placed against the sticky heading (482px from the section top, out on the left rail) so it stays pinned with it. */}
              <RailAccent
                src={railAccent}
                className="pointer-events-none absolute top-[calc(458px-var(--section-pad))] left-[calc(var(--frame-inset)-var(--page-pad)-0.5px)]"
              />
              <Eyebrow>Customer lifecycle</Eyebrow>
              <SectionTitle
                id="lifecycle-title"
                initial="E"
                firstLine="very conversation"
                secondLine={<span className="font-light">has a job to do</span>}
                width={483.867}
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
