import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { DedicatedTabList } from "./dedicated-tab-list";

/**
 * Figma "AFTER · Vertical tabs" (3278:24167), laid out as AI Assistants' Shopper asks: the eyebrow, a two-line headline
 * (82px swash, 60px lines at 0.9, 129px tall) and a 560px line of copy stacked 24px apart, then 80px below the list of components beside
 * the active one, playing on a timer (see DedicatedTabList). A 232px gold tick sits on the left rail beside the eyebrow
 * (98px down in Figma).
 */
export function DedicatedTabs() {
  return (
    <section aria-labelledby="dedicated-tabs-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Dedicated landing pages</Eyebrow>
          <SectionTitle
            id="dedicated-tabs-title"
            initial="D"
            firstLine="edicated"
            secondLine="landing pages"
            width={293}
            variant="dynamic"
            weight="light"
          />
          <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-[3px]">
            Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and
            comparisons built in.
          </p>
        </div>

        <DedicatedTabList />
      </div>
    </section>
  );
}
