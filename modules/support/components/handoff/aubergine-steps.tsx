import Image from "next/image";
import card from "@/modules/dynamic-landing-pages/assets/options/card.svg";
import cellPattern from "../../assets/handoff/cell-pattern.webp";
import stamp from "../../assets/handoff/stamp.webp";

/** 1px rules dashed 2 / 2 in #634479, as Figma's Aubergine steps. */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,#634479_0_2px,transparent_2px_4px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,#634479_0_2px,transparent_2px_4px)]";

/** Measurements that differ between the two Figma instances of the steps row. */
const variants = {
  /**
   * Retain: Loyalty (node 2634:24479), 36px numerals set straight on the cell. Its rules run a fixed
   * 416.09px from the numerals as in Figma, the copy (three lines in the first step) ending 33.5px above.
   */
  loyalty: {
    item: "md:min-h-[416.09px] md:pb-[33.5px]",
    ruleTop: "-top-[0.62px]",
    lineTop: "top-0",
    lineBottom: "-bottom-[0.45px]",
    card: "top-[4.51px] right-[3.51px] bottom-[3.4px] left-[3.51px]",
    cell: "mt-[15.35px]",
    copy: "mt-[19.65px]",
  },
  /**
   * Support: Human-in-the-loop (node 2634:20241), 24px numerals in a 27px box (Figma nudges each
   * one in by its own amount), the cell 16.35px under it and the copy 18.65px under the cell.
   */
  handoff: {
    item: "md:pb-[54.1px]",
    ruleTop: "-top-[0.62px]",
    lineTop: "top-0",
    lineBottom: "-bottom-[0.45px]",
    card: "top-[4.51px] right-[3.51px] bottom-[3.4px] left-[3.51px]",
    cell: "mt-[16.35px]",
    copy: "mt-[18.65px]",
  },
} as const;

/** Figma's left offsets for the 01 / 02 / 03 numerals inside their box (Human-in-the-loop). */
const numeralOffsets = [4.93, 6.48, 5.96];

/**
 * The steps row of Figma's "Library · Aubergine steps" (Human-in-the-loop on Support, Loyalty on
 * Retain): three numbered steps across 1062px, each a script numeral over a 232px shaded,
 * patterned cell (the notched card with a stamp centred on it) over its title and line of copy.
 * From 768px dashed rules run down the cell edges (from the numerals to ~53px under the copy) and
 * along the top and bottom of the cell row, overshooting it by 57px each side.
 */
export function AubergineSteps({
  steps,
  variant = "loyalty",
}: {
  steps: { title: string; description: string }[];
  variant?: keyof typeof variants;
}) {
  const v = variants[variant];
  return (
    <ol className="grid w-full gap-12 md:grid-cols-3 md:gap-0">
      {steps.map((step, i) => {
        const first = i === 0;
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className={`relative flex flex-col ${v.item} ${first ? "" : "md:-ml-px"}`}>
            <span aria-hidden className={`pointer-events-none absolute bottom-0 left-0 hidden md:block ${v.ruleTop} ${dashedV}`} />
            {last && <span aria-hidden className={`pointer-events-none absolute right-0 bottom-0 hidden md:block ${v.ruleTop} ${dashedV}`} />}

            {variant === "handoff" ? (
              <div className="relative ml-[17px] h-[27px]">
                <p
                  className="absolute top-[3.5px] font-script text-[24px] leading-[1.1] tracking-[-1.2px] whitespace-nowrap text-[#b4a5bd] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
                  style={{ left: numeralOffsets[i] ?? numeralOffsets[0] }}
                >
                  0{i + 1}
                </p>
              </div>
            ) : (
              <p className="pl-[17px] font-script text-[36px] leading-[1.1] tracking-[-1.8px] text-[#b4a5bd] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                0{i + 1}
              </p>
            )}

            {/* Figma's pattern fill: a 49.67px tile of faint white motifs (11% at most) over the cell's black/15, from its outer corner. */}
            <div
              className={`relative h-[232px] border border-white/3 bg-black/15 bg-size-[49.667px_49.667px] bg-origin-border bg-repeat ${v.cell}`}
              style={{ backgroundImage: `url(${cellPattern.src})` }}
            >
              <span aria-hidden className={`pointer-events-none absolute hidden md:block ${v.lineTop} ${dashedH} ${first ? "-left-[57px]" : "left-0"} ${last ? "-right-[57px]" : "right-0"}`} />
              <span aria-hidden className={`pointer-events-none absolute hidden md:block ${v.lineBottom} ${dashedH} ${first ? "-left-[57px]" : "left-0"} ${last ? "-right-[57px]" : "right-0"}`} />
              {/* Notched card (345.65 × 222.09px in Figma), 5.51px from the cell's top and centred across it. */}
              <div className={`absolute flex items-center justify-center ${v.card}`}>
                <Image src={card} alt="" fill className="max-w-none" />
                <Image src={stamp} alt="" sizes="88px" className="relative h-auto w-[87.67px]" />
              </div>
            </div>

            {/* Kept 17px off both rules while the columns are narrow (768–1279px); at 1062px the right inset is Figma's 11px (354 − 17 − 326). */}
            <div className={`${v.copy} flex flex-col items-start gap-3 pr-[17px] pl-[17px] xl:pr-[11px]`}>
              <h3 className="font-sans text-sm leading-[1.2] font-medium text-pretty break-words text-white/85">{step.title}</h3>
              <p className="max-w-[326px] font-sans text-sm leading-[1.4] tracking-[-0.42px] text-pretty break-words text-white/60">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
