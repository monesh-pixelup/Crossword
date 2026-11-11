import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import flowDiagram from "../../assets/workflows/flow-diagram.svg";
import ornament from "../../assets/workflows/ornament.webp";
import { workflows } from "../../config/workflows";

/**
 * Figma "Library · Node diagram (Workflows + illustration)" (4035:24056): a sand panel between the page rails (0.5px
 * black/25 hairline, 80px top and bottom inside it), the eyebrow and two-line headline, 50px below them the
 * review-request flow diagram across the content width, then 50px below that the two workflows side by side (115px
 * either side of a black/10 rule), each a maroon icon badge beside a Crimson 24/26 title 12px over its copy in ink
 * muted. The damask ornament sits over the section's top-right corner.
 */
export function Workflows() {
  return (
    <section aria-labelledby="workflows-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-[80.5px]">
        {/* Full content width, no cap, so the heading lines up with the other sections' at every viewport. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-10 lg:gap-[50px]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow surface="sand">Workflows</Eyebrow>
            <SectionTitle
              id="workflows-title"
              initial="W"
              firstLine={<span className="font-light">orkflows with room</span>}
              secondLine="for human judgment"
              width={529}
              variant="dynamic"
              weight="light"
            />
          </div>

          {/*
            Figma 4035:24081: the review-request flow (start, wait, check, the "OK to ask?" condition branching to write and
            email the ask or skip, then end), exported as one vector at 1280 × 370 and drawn across the content width. Below
            768px it keeps a readable 860px and scrolls sideways.
          */}
          <div className="-mx-[calc(var(--page-pad)-var(--frame-inset))] overflow-x-auto px-[calc(var(--page-pad)-var(--frame-inset))] [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- a static vector illustration, nothing to optimize */}
            <img
              src={flowDiagram.src}
              alt="A workflow: start when the order is delivered, wait a week, check for open returns or tickets, then if it's OK to ask, write and email a review request, otherwise skip, and end."
              className="block aspect-[1280/370] h-auto w-full max-w-none max-md:w-[860px]"
            />
          </div>

          {/* The row spans the content column, its two workflows sharing it 537:513 either side of the rule (at 1280px, Figma's 537px first column, the rule 652px in). */}
          <div className="flex flex-col gap-12 md:flex-row md:gap-[115px]">
            {workflows.map((w, i) => (
              <div key={w.title} className="contents">
                {/* The 0-wide rule's 1.05px stroke is centred on its line. */}
                {i > 0 && (
                  <span aria-hidden className="relative hidden w-0 shrink-0 self-stretch md:block">
                    <span className="absolute inset-y-0 -left-[0.527px] w-[1.054px] bg-black/10" />
                  </span>
                )}
                {/* Figma 4035:24196: the badge beside its title and copy (14px apart on the first, 24px on the second). */}
                <div className={`flex min-w-0 items-start ${i === 0 ? "gap-[14px] md:flex-[537_1_0%]" : "gap-6 md:flex-[513_1_0%]"}`}>
                  {/* Figma 4035:24197 "Icon badge": the 16.29px Phosphor glyph on maroon, 3.86px in, inside a 0.6px #efe9db line. */}
                  <span aria-hidden className="flex size-6 shrink-0 items-center justify-center border-[0.6px] border-linen bg-maroon p-[3.856px]">
                    {/* The Phosphor glyph (phosphoricons.com, regular weight) in #ffb657. */}
                    <w.icon size={16.292} className="block text-[#ffb657]" />
                  </span>
                  {/* The Crimson 24/26 title (Headings/XS) 12px over its copy. */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
                    <h3 className="font-serif text-[24px] max-md:text-[20px] leading-[1.0833] tracking-[-1.2px] max-md:tracking-[-1px] text-ink">{w.title}</h3>
                    <p className={`font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted ${i > 0 ? "max-w-[453.973px]" : ""}`}>{w.body}</p>
                  </div>
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
