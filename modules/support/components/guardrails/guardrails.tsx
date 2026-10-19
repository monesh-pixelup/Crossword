import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelAubergine from "../../assets/guardrails/panel-aubergine.webp";

/**
 * Figma "ALT · Guardrails (wide panel + illustration)": the eyebrow and a one-line headline (82px
 * swash, 60px line at 1.18) on the left, a line of Geist Light copy bottom-aligned on the right,
 * then 40px below a 1280 × 599 aubergine panel (the damask in its notched gold frame with a ring in
 * each corner, the same Figma frame as Human mode on Sell, exported here at 3x). A 232px gold tick sits on the left
 * rail beside the eyebrow.
 */
export function Guardrails() {
  return (
    <section aria-labelledby="guardrails-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-10">
        {/*
          Side by side only from 1280px, where the line of copy fits beside the 615px headline box
          (wrapping until 1440px, on one line from there, as in Figma); stacked below.
        */}
        <div className="flex w-full flex-col items-start gap-8 min-[1280px]:flex-row min-[1280px]:items-end min-[1280px]:justify-between min-[1280px]:gap-12">
          <div className="flex flex-col items-start gap-6 min-[1280px]:shrink-0">
            <Eyebrow>Guardrails</Eyebrow>
            <SectionTitle id="guardrails-title" initial="G" firstLine="uardrails" width={614.744} variant="airy" />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60 min-[1280px]:min-w-0 min-[1440px]:max-w-none min-[1440px]:whitespace-nowrap">
            Set the topics it won&rsquo;t touch, the tone it keeps, and the lines it won&rsquo;t cross.
          </p>
        </div>

        <div aria-hidden className="relative aspect-[1280/599] w-full overflow-hidden">
          <Image src={panelAubergine} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-fill" />
        </div>
      </div>
    </section>
  );
}
