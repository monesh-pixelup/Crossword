import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { SectionTick } from "../shared/section-tick";
import { AdaptiveTabs } from "./adaptive-tabs";

/** Dynamic components on existing pages: the product page mock-up on a stage, over its feature tabs. */
export function AdaptivePages() {
  return (
    <section id="adaptive-product-pages" aria-labelledby="adaptive-title" className="relative scroll-mt-24 section-pad-band">
      <DividerBand glyph="chat" />
      <SectionTick />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Adaptive product pages</Eyebrow>
            <SectionTitle
              id="adaptive-title"
              initial="A"
              firstLine="daptive pages, built on"
              secondLine="the ones you already have"
              width={620}
            />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Keep your current pages and add dynamic elements where they matter most, like common questions addressed or
            a personalized summary.
          </p>
        </div>

        <AdaptiveTabs />
      </div>
    </section>
  );
}
