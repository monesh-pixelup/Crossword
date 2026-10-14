import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import frame from "@/modules/dynamic-landing-pages/assets/options/frame.svg";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import pkg from "@/modules/sell/assets/upsell/package.svg";
import puzzlePiece from "@/modules/sell/assets/upsell/puzzle-piece.svg";
import trendUp from "@/modules/sell/assets/upsell/trend-up.svg";
import { type GuardrailIcon, guardrailThread, guardrails } from "../../config/guardrails";

/** Figma's 24px gold marks for the grid cells, in its order. */
const icons: Record<GuardrailIcon, typeof trendUp> = { facts: trendUp, shield: puzzlePiece, voice: pkg };

/** 1px rules dashed 2 / 2 in #1d4324, as Figma's Forest grid. */
const dashedH = "h-px bg-[repeating-linear-gradient(90deg,#1d4324_0_2px,transparent_2px_4px)]";
const dashedV = "w-px bg-[repeating-linear-gradient(180deg,#1d4324_0_2px,transparent_2px_4px)]";

/**
 * Layout/Livery, Forest grid variant (Figma "Library · Forest grid"): forest damask between the page
 * rails inside the gilt notched frame, a Dark eyebrow over a one-line centred headline (here with
 * the site's line of copy and refusal example under it), then, 120px below, the guardrails as a row
 * of cells on a band darkened 6%: a 24px gold mark, 80px down a Crimson 24 title and Geist Light
 * copy. Dashed rules run along the band's top and bottom (14.75px past it each side) and down the
 * cell edges (22px past it top and bottom).
 */
export function Guardrails() {
  const [ask, reply] = guardrailThread;

  return (
    <section aria-labelledby="guardrails-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[70px] lg:pb-[196px]">
        <LiveryGround tone="forest" />
        <div aria-hidden className="pointer-events-none absolute top-[19px] right-2 bottom-3 left-2 max-md:hidden">
          <Image src={frame} alt="" fill className="max-w-none" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1288px] flex-col items-center gap-14 lg:gap-[120px]">
          <div className="flex w-full max-w-[540px] flex-col items-center gap-4">
            <Eyebrow surface="green">Guardrails</Eyebrow>
            <SectionTitle id="guardrails-title" initial="G" firstLine="uardrails" width={252} variant="guardrails" tone="light" />
            <p className="text-center font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
              Set the topics it won&rsquo;t touch, the tone it keeps, and the lines it won&rsquo;t cross.
            </p>
            <figure className="mt-2 flex w-full flex-col gap-3">
              <p className="ml-auto max-w-[88%] rounded-[13.57px] rounded-br-[4px] bg-wine px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-white">
                {ask.text}
              </p>
              <p className="max-w-[92%] rounded-[13.57px] rounded-bl-[4px] bg-forest px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-cream shadow-[inset_0_0_0_0.5px_rgba(224,190,96,0.45)]">
                {reply.text}
              </p>
            </figure>
          </div>

          <div className="relative w-full bg-black/6">
            <span aria-hidden className={`pointer-events-none absolute -inset-x-[14.75px] top-0 hidden md:block ${dashedH}`} />
            <span aria-hidden className={`pointer-events-none absolute -inset-x-[14.75px] bottom-0 hidden md:block ${dashedH}`} />

            <ul className="grid md:grid-cols-3">
              {guardrails.map((g, i) => (
                <li key={g.title} className="relative flex flex-col items-start pt-10 pr-5 pb-10 pl-[21.5px]">
                  <span aria-hidden className={`pointer-events-none absolute -top-[22px] -bottom-[22px] left-0 hidden md:block ${dashedV}`} />
                  {i === guardrails.length - 1 && (
                    <span aria-hidden className={`pointer-events-none absolute -top-[22px] right-0 -bottom-[22px] hidden md:block ${dashedV}`} />
                  )}
                  {/* Stacked below 768px, the cells are split by the same dashed rule. */}
                  {i > 0 && <span aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 md:hidden ${dashedH}`} />}

                  <Image src={icons[g.icon]} alt="" className="size-6" />
                  <div className="mt-10 flex flex-col items-start gap-3 md:mt-20">
                    <h3 className="font-serif text-[24px] leading-[1.1] font-light tracking-[-0.96px] text-white">{g.title}</h3>
                    <p className="font-sans text-base leading-6 font-light tracking-[-0.32px] text-white/80">{g.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
