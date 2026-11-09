import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/hero/decor/rail-accent.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AssistList } from "./assist-list";

/**
 * Figma "Library · Accordion + media" (Conversion assistance, new layout, node 3709:21532): the eyebrow and a
 * two-line headline (724.62px box) across the top, then 80px below them the features as an accordion in a 520px
 * column on the left and the 687 × 586 panel playing the open feature's visual on the right.
 */
export function ConversionAssist() {
  return (
    <section aria-labelledby="assist-title" className="relative section-pad">
      {/* The left rail's gold accent, 103.49px down. The page sets Figma's 75px divider band above the section. */}
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[103.49px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        {/* Figma 3257:36421: the headline 18px under the eyebrow. */}
        <div className="flex flex-col items-start gap-[18px]">
          <Eyebrow>Conversion assistance</Eyebrow>
          <SectionTitle
            id="assist-title"
            initial="E"
            firstLine="very hesitation, answered"
            secondLine="before it becomes a lost sale"
            width={724.621}
            variant="dynamic"
            weight="light"
          />
        </div>

        <AssistList />
      </div>
    </section>
  );
}
