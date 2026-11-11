import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AdaptiveTabs } from "./adaptive-tabs";

/**
 * Figma "Library · Stage + triggers" (Adaptive product pages): the eyebrow, a two-line headline and
 * a line of copy stacked 24px apart, then 80px below the product-page mock-up on its stage over
 * the feature tabs. The page sets the 75px divider band above it.
 */
export function AdaptivePages() {
  return (
    <section id="adaptive-product-pages" aria-labelledby="adaptive-title" className="relative scroll-mt-24 section-pad">
      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex max-w-[688.32px] flex-col items-start gap-6">
          <Eyebrow>Adaptive product pages</Eyebrow>
          <SectionTitle id="adaptive-title" initial="A" firstLine="daptive" secondLine="product pages" width={300} variant="dynamic" weight="light" />
          <p className="font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-[3px]">
            Keep your current pages and add dynamic elements where they matter most, like common questions addressed or
            a personalized summary.
          </p>
        </div>

        <AdaptiveTabs />
      </div>
    </section>
  );
}
