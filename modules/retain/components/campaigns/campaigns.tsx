import { SnappedEyebrow } from "@/components/ui/eyebrow";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { CampaignTabs } from "./campaign-tabs";

/** Campaigns & outbound: a split header (headline left, copy right) over the stage and its campaign tabs. */
export function Campaigns() {
  return (
    <section aria-labelledby="campaigns-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            {/* Snapped to whole pixels, so its 0.5px frame and corner curls stay crisp at 1x. */}
            <SnappedEyebrow className="h-8">Campaigns &amp; outbound</SnappedEyebrow>
            <SectionTitle
              id="campaigns-title"
              initial="O"
              firstLine="utreach that knows when"
              secondLine="to speak, and when not to"
              width={640}
            />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Every campaign goes out on the channel each customer actually uses, to the people it&rsquo;s relevant to,
            and only when there&rsquo;s a reason to send it.
          </p>
        </div>

        <CampaignTabs />
      </div>
    </section>
  );
}
