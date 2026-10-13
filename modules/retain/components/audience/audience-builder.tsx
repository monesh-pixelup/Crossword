import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { AudienceMock } from "./audience-mock";

/**
 * The mini block after Campaigns & outbound (content doc): brands build their own audiences in
 * plain language. Layout/Showcase, Wide panel variant, as Take control on Support: a sand panel
 * between the page rails (0.5px black/25 hairline), copy on the left and the product mock on the
 * right. Its content keeps the page's side padding at every width (no 1280px cap), like the other sections.
 */
export function AudienceBuilder() {
  return (
    <section aria-labelledby="audience-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-12 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between min-[1200px]:gap-16">
          <div className="flex flex-col items-start gap-6 min-[1200px]:max-w-[480px]">
            <Eyebrow surface="sand">Audiences</Eyebrow>
            <SectionTitle id="audience-title" initial="T" firstLine="urn customer patterns" secondLine="into your audience" width={480} variant="assist" />
            <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
              Describe the customers you want to reach, in your own words. Crossword finds demand buried in past
              conversations, even when shoppers never joined a waiting list.
            </p>
          </div>

          <div className="w-full min-[1200px]:max-w-[640px] min-[1200px]:flex-[0_1_640px]">
            <AudienceMock />
          </div>
        </div>
      </div>
    </section>
  );
}
