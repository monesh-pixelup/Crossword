import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import stud from "../../assets/shopper/panel-stud.svg";
import panelTexture from "../../assets/shopper/panel-texture.webp";
import railAccent from "../../assets/shared/rail-accent.svg";
import { DividerBand } from "../shared/divider-band";
import { SectionTitle } from "../shared/section-title";
import { StorefrontMockup } from "./storefront-mockup";

// Corner studs, as positioned in Figma; the right pair is pinned to the right edge so it follows the panel width.
const studs = [
  { left: 18.516, top: 572.824 },
  { right: 20.203, top: 572.824 },
  { right: 20.203, top: 21.297 },
  { left: 20.789, top: 16.263 },
];

/**
 * Aubergine damask panel framing the storefront mock-up. It spans the content
 * column (never narrower than its 1280px design width, which is scaled down to
 * fit on smaller screens); the mock-up stays centred at its design size.
 */
function ShowcasePanel() {
  return (
    <div
      role="img"
      aria-label="A Harry's product page where Crossword compares the razor with Gillette's to win the sale"
      className="fit-to-container relative h-[599px] w-[max(1280px,100%)] shrink-0 overflow-clip bg-[#462160] select-none [--fit-width:1280px]"
    >
      <Image
        src={panelTexture}
        alt=""
        sizes="(min-width: 1440px) calc(100vw - 202px), 1238px"
        className="absolute inset-x-[20.906px] top-[17.135px] h-[564.729px] w-auto max-w-none object-cover"
      />
      {studs.map((pos) => (
        <Image key={`${pos.left ?? pos.right}-${pos.top}`} src={stud} alt="" className="absolute size-[10px]" style={pos} />
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

        <div className="flex w-full justify-center">
          <ShowcasePanel />
        </div>
      </div>
    </section>
  );
}
