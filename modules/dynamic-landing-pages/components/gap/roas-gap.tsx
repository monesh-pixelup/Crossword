import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { gapColumns } from "../../config/gap";
import { GapDiagram } from "./gap-diagram";

/**
 * Layout/Showcase, Node diagram variant: a sand panel between the page rails (0.5px black/25
 * hairline), the headline over the gilded diagram, then a row of columns split by black/10 rules.
 */
export function RoasGap() {
  return (
    <section aria-labelledby="gap-title" className="relative px-(--frame-inset) pt-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-14 lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow surface="sand">The ROAS gap</Eyebrow>
            <SectionTitle
              id="gap-title"
              initial="Y"
              firstLine="our ad knows why someone clicked,"
              secondLine="but your store doesn’t"
              width={790}
            />
          </div>

          <GapDiagram />

          {/* Three equal columns, the same 48px either side of each rule (none outside the outer two). */}
          <div className="grid w-full gap-10 lg:grid-cols-3 lg:gap-0">
            {gapColumns.map((column) => (
              <div
                key={column.title}
                className="flex flex-col gap-6 lg:px-12 lg:first:pl-0 lg:last:pr-0 lg:not-first:border-l lg:not-first:border-black/10"
              >
                <h3 className="font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-ink">{column.title}</h3>
                {column.body.map((p) => (
                  <p key={p} className="font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
