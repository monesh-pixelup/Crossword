import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ResolveTabs } from "./resolve-tabs";

/** Follows straight on from the intro statement on the same cream, so it only pads its bottom. */
export function CustomerSupport() {
  return (
    <section aria-labelledby="resolve-title" className="relative pb-(--section-pad)">
      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 border-t-[0.5px] border-black/20 pt-(--space-xxlarge) lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Customer support</Eyebrow>
            <SectionTitle
              id="resolve-title"
              initial="C"
              firstLine="ustomer support,"
              secondLine="handled by Crossword"
              width={580}
            />
          </div>
          <p className="max-w-[420px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            The questions that shouldn&rsquo;t need a ticket.
          </p>
        </div>

        <ResolveTabs />
      </div>
    </section>
  );
}
