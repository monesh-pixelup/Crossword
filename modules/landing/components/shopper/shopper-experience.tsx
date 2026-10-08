import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import stud from "../../assets/shopper/panel-stud.svg";
import panelTexture from "../../assets/shopper/panel-texture.webp";
import railAccent from "../../assets/shared/rail-accent.svg";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { StorefrontMockup } from "./storefront-mockup";

// Corner studs, as positioned in Figma.
const studs = [
  { left: 18.516, top: 572.824 },
  { left: 1249.797, top: 572.824 },
  { left: 1249.797, top: 21.297 },
  { left: 20.789, top: 16.263 },
];

/**
 * Aubergine damask panel framing the storefront mock-up. The texture export carries the gilt
 * notched frame, so the panel is drawn at its 1280 × 599 design size and zoomed as a whole to
 * the column width (up or down, like the Webflow image): texture, frame, studs and mock-up
 * always stay aligned.
 */
function ShowcasePanel() {
  return (
    <div
      role="img"
      aria-label="A Harry's product page where Crossword compares the razor with Gillette's to win the sale"
      className="relative h-[599px] w-[1280px] shrink-0 overflow-clip bg-[#462160] select-none scale-to-container [--fit-width:1280px]"
    >
      <Image
        src={panelTexture}
        alt=""
        sizes="(min-width: 1440px) calc(86vw - 30px), 1238px"
        className="absolute top-[17.135px] left-[20.906px] h-[564.729px] w-[1238.18px] max-w-none"
      />
      {studs.map((pos) => (
        <Image key={`${pos.left}-${pos.top}`} src={stud} alt="" className="absolute size-[10px]" style={pos} />
      ))}
      <StorefrontMockup />
    </div>
  );
}

export function ShopperExperience() {
  return (
    <section aria-labelledby="shopper-title" className="relative section-pad-band">
      <DividerBand glyph="chart" />
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[122px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Shopper experience</Eyebrow>
            <SectionTitle
              id="shopper-title"
              initial="G"
              firstLine="ive them a reason"
              secondLine="to choose you"
              width={614.744}
            />
          </div>
          <p className="w-full max-w-[477.244px] text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            Improve ROAS. When someone arrives after considering a competitor, Crossword knows and makes the case for
            you on the spot, showing exactly why you&apos;re the better choice.
          </p>
        </div>

        <div className="@container w-full">
          <ShowcasePanel />
        </div>
      </div>
    </section>
  );
}
