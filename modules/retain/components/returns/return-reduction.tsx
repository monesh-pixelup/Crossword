import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import stud from "@/modules/landing/assets/shopper/panel-stud.svg";
import panelTexture from "@/modules/landing/assets/shopper/panel-texture.webp";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

// Corner studs, as positioned in Figma.
const studs = [
  { left: 18.516, top: 572.824 },
  { left: 1249.797, top: 572.824 },
  { left: 1249.797, top: 21.297 },
  { left: 20.789, top: 16.263 },
];

/**
 * Figma "Library · Three-card row" (Return reduction), as Storefront presence on Sell: the eyebrow,
 * a two-line headline and a line of 14px copy, then 80px below the home page's Shopper experience
 * panel without its mock-up: the aubergine damask with its gilt notched frame and corner studs, drawn
 * at its 1280 × 599 design size and zoomed as a whole to the column width.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function ReturnReduction() {
  return (
    <section aria-labelledby="returns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Return reduction</Eyebrow>
          <SectionTitle id="returns-title" initial="M" firstLine="ore confidence at checkout." secondLine="Fewer returns after it" width={760} />
          <p className="max-w-[760px] font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">
            Crossword helps customers choose with more confidence, so they&rsquo;re less likely to buy the wrong size, shade,
            or product in the first place.
          </p>
        </div>

        <div className="@container w-full">
          <div
            aria-hidden
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
          </div>
        </div>
      </div>
    </section>
  );
}
