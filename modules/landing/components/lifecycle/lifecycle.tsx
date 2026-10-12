import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "../../assets/shared/rail-accent.svg";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { LifecycleTabs } from "./lifecycle-tabs";

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

        <LifecycleTabs />
      </div>
    </section>
  );
}
