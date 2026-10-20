import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import forestDamask from "../../assets/audience/forest-damask.webp";
import { AudienceMock } from "./audience-mock";

/** Gold of the panel's frame line and rings, as Figma exports them. */
const gold = "#c7c379";

/** Each corner is the top-left one mirrored into place. */
const corners = ["top-0 left-0", "top-0 right-0 -scale-x-100", "bottom-0 left-0 -scale-y-100", "right-0 bottom-0 rotate-180"];

/**
 * The panel's notched gold frame, measured off Figma's 1280 × 599 export: a 1px line 21.4px in from
 * the sides and 17.5px from the top and bottom, cut at each corner by a concave arc (a 47.14px
 * circle centred 11.54px in and 2.8px above the corner) with a 9px ring in the notch, centred 25.5px
 * in and 20.5px down. Drawn in code, so it keeps its shape at any panel size.
 */
function ForestFrame() {
  const line = { position: "absolute" as const, background: gold };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="top-[17px] right-[54.2px] left-[54.2px] h-px" style={line} />
      <span className="right-[54.2px] bottom-[17px] left-[54.2px] h-px" style={line} />
      <span className="top-[43.2px] bottom-[43.2px] left-[20.9px] w-px" style={line} />
      <span className="top-[43.2px] right-[20.9px] bottom-[43.2px] w-px" style={line} />
      {corners.map((at) => (
        <svg key={at} width="56" height="46" viewBox="0 0 56 46" fill="none" className={`absolute overflow-visible ${at}`}>
          <path d="M21.4 43.2A47.14 47.14 0 0 0 54.2 17.5" stroke={gold} />
          <circle cx="25.5" cy="20.5" r="4" stroke={gold} />
        </svg>
      ))}
    </div>
  );
}

/**
 * Figma "Library · Wide panel" (Audiences): the eyebrow and a two-line headline on the left, a line
 * of Geist Light copy bottom-aligned on the right (stacked under the headline below 1200px, where
 * the two no longer fit side by side), then 80px below a 1280 × 599 forest panel (the damask at 20%
 * in its notched gold frame with a ring in each corner) holding the audience-builder mock-up. The
 * damask is Figma's export with the frame taken out, laid in with cover, and the frame is drawn
 * over it, so neither stretches when the panel changes shape. A 232px gold tick sits on the left
 * rail beside the eyebrow.
 */
export function AudienceBuilder() {
  return (
    <section aria-labelledby="audience-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-6 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between min-[1200px]:gap-12">
          <div className="flex max-w-full flex-col items-start gap-6">
            <Eyebrow>Audiences</Eyebrow>
            <SectionTitle id="audience-title" initial="T" firstLine="urn customer patterns" secondLine="into your audience" width={614.744} />
          </div>
          <p className="max-w-[477.244px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Find demand buried in past conversations, even when shoppers never joined a waiting list with Crossword.
          </p>
        </div>

        {/* 24px sides and 56px ends keep the mock-up clear of the frame and its corner notches. */}
        <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#00331b] px-6 py-14 md:min-h-[560px] md:px-16 lg:min-h-[599px]">
          <Image src={forestDamask} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
          <ForestFrame />
          <div className="relative w-full max-w-[640px] min-w-0">
            <AudienceMock />
          </div>
        </div>
      </div>
    </section>
  );
}
