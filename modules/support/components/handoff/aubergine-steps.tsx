import Image from "next/image";
import card from "@/modules/dynamic-landing-pages/assets/options/card.svg";
import cellPattern from "../../assets/handoff/cell-pattern.webp";
import stamp from "../../assets/handoff/stamp.webp";

/** 1px rules dashed 2 / 2 in #634479, as Figma's Aubergine steps. */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,#634479_0_2px,transparent_2px_4px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,#634479_0_2px,transparent_2px_4px)]";

/**
 * The steps row of Figma's "Library · Aubergine steps" (Human-in-the-loop on Support, Loyalty on
 * Retain): three numbered steps across 1062px, each a script numeral over a 232px shaded,
 * patterned cell (the notched card with a stamp centred on it) over its title and line of copy.
 * From 768px dashed rules run down the cell edges (from the numerals to 52px under the copy) and
 * along the top and bottom of the cell row, overshooting it by 57px each side.
 */
export function AubergineSteps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="grid w-full gap-12 md:grid-cols-3 md:gap-0">
      {steps.map((step, i) => {
        const first = i === 0;
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className={`relative flex flex-col md:pb-[52.4px] ${first ? "" : "md:-ml-px"}`}>
            <span aria-hidden className={`pointer-events-none absolute -top-px bottom-0 left-0 hidden md:block ${dashedV}`} />
            {last && <span aria-hidden className={`pointer-events-none absolute -top-px right-0 bottom-0 hidden md:block ${dashedV}`} />}

            <p className="pl-[17px] font-script text-[36px] leading-[1.1] tracking-[-1.8px] text-[#b4a5bd] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              0{i + 1}
            </p>

            {/* Figma's pattern fill: a 49.67px tile of faint white motifs (11% at most) over the cell's black/15, from its outer corner. */}
            <div
              className="relative mt-[15.35px] h-[232px] border border-white/3 bg-black/15 bg-size-[49.667px_49.667px] bg-origin-border bg-repeat"
              style={{ backgroundImage: `url(${cellPattern.src})` }}
            >
              <span aria-hidden className={`pointer-events-none absolute top-[0.5px] hidden md:block ${dashedH} ${first ? "-left-[57px]" : "left-0"} ${last ? "-right-[57px]" : "right-0"}`} />
              <span aria-hidden className={`pointer-events-none absolute bottom-0 hidden md:block ${dashedH} ${first ? "-left-[57px]" : "left-0"} ${last ? "-right-[57px]" : "right-0"}`} />
              {/* Notched card (222.09px tall in Figma), 3.52px in from the cell's left and right edges and 5.51px from its top. */}
              <div className="absolute top-[4.51px] right-[2.52px] bottom-[3.4px] left-[2.52px] flex items-center justify-center">
                <Image src={card} alt="" fill className="max-w-none" />
                <Image src={stamp} alt="" sizes="88px" className="relative h-auto w-[87.67px]" />
              </div>
            </div>

            <div className="mt-[19.65px] flex flex-col items-start gap-3 pl-[17px]">
              <h3 className="font-sans text-sm leading-[1.2] font-medium text-white/85">{step.title}</h3>
              <p className="max-w-[326px] font-sans text-sm leading-[1.4] tracking-[-0.42px] text-white/60">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
