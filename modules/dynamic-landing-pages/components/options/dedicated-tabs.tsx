import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { DedicatedTabList } from "./dedicated-tab-list";

/**
 * Figma "Library · Vertical tabs" (Dedicated landing pages): the eyebrow and a two-line headline (82px swash, 60px
 * lines, both 1.18) with a line of copy across from it, bottom-aligned and as wide as the cards below (stacked
 * under it below 1024px), then 80px below the list of components beside the active one, playing on a timer, as Campaigns &
 * outbound on Retain (see DedicatedTabList). A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function DedicatedTabs() {
  return (
    <section aria-labelledby="dedicated-tabs-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        {/* The copy is as wide as the cards below it (821px, less as their column shrinks beside the 280px list and its 32px gap). */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="flex max-w-full shrink-0 flex-col items-start gap-6">
            <Eyebrow>Dedicated landing pages</Eyebrow>
            <SectionTitle
              id="dedicated-tabs-title"
              initial="D"
              firstLine="edicated"
              secondLine="landing pages"
              width={290}
              variant="humanMode"
            />
          </div>
          <p className="lg:w-[min(821px,100%_-_312px)] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and
            comparisons built in.
          </p>
        </div>

        <DedicatedTabList />
      </div>
    </section>
  );
}
