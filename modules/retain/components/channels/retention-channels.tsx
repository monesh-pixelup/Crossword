import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { retentionChannels } from "../../config/channels";
import { PageRails } from "../shared/page-rails";

/**
 * Figma "ALT · Retention channels (node diagram + illustration)", as Workflows on Support: a sand
 * panel between the page rails (0.5px black/25 hairline) with the section padding top and bottom,
 * as the page's other sections; the eyebrow and a three-line headline (set as the page's others,
 * 1.1) in a 299px header (Figma's illustration placeholder beside it is left out), then 120px
 * below the two channels (537px each, each followed by a 203px black/10 rule, 56px apart): a
 * Crimson 28 title over a line of copy in black/50.
 */
export function RetentionChannels() {
  return (
    <section aria-labelledby="retention-channels-title" className="relative px-(--frame-inset)">
      <div className="flex flex-col items-center bg-sand py-(--section-pad) shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]">
        {/* Full content width, no cap, so the heading lines up with the other sections' at every viewport. */}
        <div className="flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-16 lg:gap-[120px]">
          <div className="flex flex-col items-start lg:min-h-[299px]">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow surface="sand">Retention channels</Eyebrow>
              <SectionTitle
                id="retention-channels-title"
                initial="O"
                firstLine="ne relationship,"
                secondLine={
                  <>
                    sequenced <span className="font-light">across</span>
                    <br />
                    <span className="font-light">every channel</span>
                  </>
                }
                width={330}
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 md:flex-row md:gap-14">
            {retentionChannels.map((c, i) => (
              <div key={c.title} className="contents">
                <div className="flex flex-col items-start gap-6 md:w-[537px] md:max-w-full md:flex-[0_1_537px]">
                  <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-1.12px] text-ink">{c.title}</h3>
                  <p className={`font-sans text-base leading-6 tracking-[-0.32px] text-black/50 ${i > 0 ? "max-w-[453.973px]" : ""}`}>
                    {c.body}
                  </p>
                </div>
                <span aria-hidden className="hidden h-[203px] w-px shrink-0 bg-black/10 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageRails />
    </section>
  );
}
