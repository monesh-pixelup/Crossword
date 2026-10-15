import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelForest from "../../assets/audience/panel-forest.webp";
import { AudienceMock } from "./audience-mock";

/**
 * Figma "Library · Wide panel" (Audiences): the eyebrow and a two-line headline on the left, a line
 * of Geist Light copy bottom-aligned on the right, then 80px below a 1280 × 599 forest panel (the
 * damask at 20% in its notched gold frame with a ring in each corner, exported from Figma as one
 * image) holding the audience-builder mock-up. A 232px gold tick sits on the left rail beside the
 * eyebrow.
 */
export function AudienceBuilder() {
  return (
    <section aria-labelledby="audience-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Audiences</Eyebrow>
            <SectionTitle id="audience-title" initial="T" firstLine="urn customer patterns" secondLine="into your audience" width={614.744} />
          </div>
          <p className="max-w-[477.244px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Find demand buried in past conversations, even when shoppers never joined a waiting list with Crossword.
          </p>
        </div>

        <div className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden px-6 py-14 md:px-16 lg:min-h-[599px]">
          <Image src={panelForest} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-fill" />
          <div className="relative w-full max-w-[640px]">
            <AudienceMock />
          </div>
        </div>
      </div>
    </section>
  );
}
