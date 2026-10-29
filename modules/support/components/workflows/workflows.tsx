import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import ornament from "../../assets/workflows/ornament.webp";
import { workflows } from "../../config/workflows";

/**
 * Figma "Library · Node diagram (Workflows + illustration)": a sand panel between the page rails
 * (0.5px black/25 hairline, 80px top and bottom inside it), the eyebrow and a two-line headline in a 210px
 * header, then 120px below the two workflows side by side (equal halves, 115px either side of a black/10
 * rule): a 32px wine icon tile, a Crimson 28 title and a line of copy in black/50, 24px apart. The
 * damask ornament sits over the section's top-right corner.
 */
export function Workflows() {
  return (
    <section aria-labelledby="workflows-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-[80.5px]">
        {/* Full content width, no cap, so the heading lines up with the other sections' at every viewport. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-16 lg:gap-[120px]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow surface="sand">Workflows</Eyebrow>
            <SectionTitle
              id="workflows-title"
              initial="W"
              firstLine={<span className="font-light">orkflows with room</span>}
              secondLine="for human judgment"
              width={525}
              variant="workflowsTight"
            />
          </div>

          {/* The row spans the content column, split 50-50: the two workflows share it equally either side of the rule. */}
          <div className="flex flex-col gap-12 md:flex-row md:gap-[115px]">
            {workflows.map((w, i) => (
              <div key={w.title} className="contents">
                {/* The 0-wide rule's 1.05px stroke is centred on its line. */}
                {i > 0 && (
                  <span aria-hidden className="relative hidden w-0 shrink-0 self-stretch md:block">
                    <span className="absolute inset-y-0 -left-[0.527px] w-[1.054px] bg-black/10" />
                  </span>
                )}
                <div className="flex min-w-0 flex-col items-start gap-6 md:flex-1 md:basis-0">
                  {/* Figma's 35.2px export: the 32px tile plus its 1.6px drop shadow on every side. */}
                  <span aria-hidden className="relative size-8 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
                    <img src={w.icon.src} alt="" className="absolute -inset-[1.6px] block size-[35.2px] max-w-none" />
                  </span>
                  <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-1.12px] text-ink">{w.title}</h3>
                  <p className={`font-sans text-base leading-6 tracking-[-0.32px] text-black/50 ${i > 0 ? "max-w-[453.973px]" : ""}`}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        Figma's 576.68 × 210.13 ornament frame at 75% − 35px, 43px above the section: at 1440px, its 395 × 167.5px corner
        shows. It stays where Figma puts it but is clipped at the panel's right edge, so nothing runs into the cream
        gutter. The export is the ornament's ink as a multiply layer, so it darkens the sand panel as Figma blends it.
      */}
      <div aria-hidden className="pointer-events-none absolute top-0 right-(--frame-inset) left-[calc(75%-35px)] h-[167.5px] overflow-hidden max-lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- static decoration, sized by hand */}
        <img src={ornament.src} alt="" className="absolute top-0 right-[calc(-1*var(--frame-inset))] block h-[167.5px] w-[395px] max-w-none mix-blend-multiply" />
      </div>
    </section>
  );
}
