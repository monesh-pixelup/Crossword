import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import card from "../../assets/options/card.svg";
import frame from "../../assets/options/frame.svg";
import stamp from "../../assets/options/stamp.webp";
import { dynamicOptions } from "../../config/options";
import { LiveryGround } from "../shared/livery";
import { TextLink } from "../shared/text-link";

/** 1px rules dashed 3 / 3 in gold at 22%, as the web kit's Aubergine steps (`.wk-as`). */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,rgba(224,190,96,0.22)_0_3px,transparent_3px_6px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,rgba(224,190,96,0.22)_0_3px,transparent_3px_6px)]";

/**
 * Layout/Livery, Aubergine steps variant: aubergine damask between the page rails inside the gilt
 * notched frame, a Dark eyebrow and centred headline, then numbered steps (script numerals) each
 * with a notched card holding a stamp, a title and a line of copy. Two steps here, not three.
 * From 768px the steps share rows (subgrid), so the dashed rules across the cards line up.
 */
export function TwoWays() {
  return (
    <section aria-labelledby="two-ways-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[72px] lg:pb-[110px]">
        <LiveryGround tone="aubergine" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1062px] flex-col items-center gap-14 lg:gap-16">
          <div className="flex flex-col items-center gap-4">
            <Eyebrow surface="green">Options</Eyebrow>
            <SectionTitle
              id="two-ways-title"
              initial="T"
              firstLine="wo ways"
              secondLine="to go dynamic"
              width={400}
              variant="centered"
              tone="light"
            />
          </div>

          <div className="relative grid w-full max-w-[740px] gap-14 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-x-8 md:gap-y-0">
            {/* Dashed rules across the top and bottom of the card row, overshooting it. The 32px column gap puts the
                middle vertical rule 16px from each card, matching the 16px above, below and outside them. */}
            <span aria-hidden className="pointer-events-none relative hidden md:col-span-full md:row-start-2 md:-mx-14 md:block">
              <span className={`absolute inset-x-0 top-0 ${dashedH}`} />
              <span className={`absolute inset-x-0 bottom-0 ${dashedH}`} />
            </span>

            {dynamicOptions.map((option, i) => (
              <div key={option.title} className={`relative flex flex-col gap-6 md:row-span-3 md:row-start-1 ${i === 0 ? "md:col-start-1" : "md:col-start-2"} md:grid md:grid-rows-subgrid md:gap-0`}>
                <span aria-hidden className={`pointer-events-none absolute top-0 -bottom-10 -left-4 hidden md:block ${dashedV}`} />
                {i === dynamicOptions.length - 1 && (
                  <span aria-hidden className={`pointer-events-none absolute top-0 -right-4 -bottom-10 hidden md:block ${dashedV}`} />
                )}

                <p className="font-script text-[36px] leading-[1.1] tracking-[-1.8px] text-cream/65 md:pb-3">0{i + 1}</p>

                {/* Notched card (345.65 × 222.09 in Figma) with the stamp centred on it, 16px inside the dashed rules on every side. */}
                <div className="relative flex aspect-[345.65/222.09] w-full items-center justify-center md:my-4">
                  <Image src={card} alt="" fill className="max-w-none" />
                  <Image src={stamp} alt="" sizes="119px" className="relative h-auto w-[118.67px]" />
                </div>

                <div className="flex flex-col items-start gap-3 md:pt-6">
                  <h3 className="font-sans text-base leading-[1.3] font-medium tracking-[-0.02em] text-cream">{option.title}</h3>
                  <p className="font-sans text-base leading-6 tracking-[-0.02em] text-on-dark/75">{option.description}</p>
                  <TextLink href={option.href} tone="cream" className="mt-3">
                    See how it works
                  </TextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
