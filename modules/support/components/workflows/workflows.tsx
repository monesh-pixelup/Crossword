import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { workflows } from "../../config/workflows";

/**
 * Figma "Library · Node diagram" (Workflows): a sand panel between the page rails (0.5px black/25
 * hairline, 80px top and bottom), the eyebrow and a two-line headline in a 299px header, then 120px
 * below the two workflows side by side (537px each, 56px either side of a 1px black/10 rule): a
 * Crimson 28 title over a line of copy in black/50.
 */
export function Workflows() {
  return (
    <section aria-labelledby="workflows-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] max-w-[1280px] flex-col gap-16 lg:gap-[120px]">
          <div className="flex flex-col items-start gap-6 lg:min-h-[299px]">
            <Eyebrow surface="sand">Workflows</Eyebrow>
            <SectionTitle
              id="workflows-title"
              initial="W"
              firstLine="orkflows with room"
              secondLine={<span className="font-light">for human judgment</span>}
              width={560}
            />
          </div>

          <div className="flex flex-col gap-12 md:flex-row md:gap-14">
            {workflows.map((w, i) => (
              <div key={w.title} className="contents">
                {i > 0 && <span aria-hidden className="hidden w-px shrink-0 self-stretch bg-black/10 md:block" />}
                <div className="flex flex-col items-start gap-6 md:w-[537px] md:max-w-full md:flex-[0_1_537px]">
                  <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-1.12px] text-ink">{w.title}</h3>
                  <p className={`font-sans text-base leading-6 tracking-[-0.32px] text-black/50 ${i > 0 ? "max-w-[453.973px]" : ""}`}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
