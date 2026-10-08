import Image from "next/image";
import bag from "../../assets/shopper/bag.svg";
import heart from "../../assets/shopper/heart.svg";
import lock from "../../assets/shopper/lock.svg";
import razor from "../../assets/shopper/razor.webp";
import starA from "../../assets/shopper/star-a.svg";
import starB from "../../assets/shopper/star-b.svg";
import starC from "../../assets/shopper/star-c.svg";
import { ComparisonWidget } from "./comparison-widget";

const stars = [starA, starB, starA, starA, starC];
const navPlaceholders = [44.09, 53.769, 37.638, 49.467];
const price = "h-[29px] font-dm-sans text-[18px] leading-[28.017px] tracking-[-1.0006px] whitespace-nowrap";

function BrowserBar() {
  return (
    <div className="absolute top-[0.009px] left-[19.008px] flex h-[38px] w-[887px] items-center overflow-clip rounded-[58.07px] border-b-[1.115px] border-[#e6ded2] bg-parchment-deep px-[16.131px]">
      <div className="flex items-start gap-[6.452px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="size-[8.603px] rounded-[4.301px] bg-[#dccbbc]" />
        ))}
      </div>
      <div className="absolute top-[7.527px] left-[390.414px] flex h-[22.583px] w-[106.476px] items-center justify-center gap-[6.452px] rounded-[6.452px] border-[1.115px] border-[#e6ded2] bg-[#fffdf8] px-[12.904px]">
        <Image src={lock} alt="" className="shrink-0" />
        <p className="h-[12px] font-sans text-[8.917px] leading-[normal] tracking-[0.0892px] whitespace-nowrap text-[#8f877c] uppercase">
          harrys.com
        </p>
      </div>
    </div>
  );
}

function ProductPanel() {
  return (
    <div className="absolute -top-[3.159px] left-[431.195px] flex w-[474px] flex-col items-start gap-8 rounded-[12px] bg-parchment p-[25.825px] hairline-[0.575px] outline-rose-line">
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex h-[29px] w-full items-center justify-between">
          <p className="h-[29px] font-sans text-[22px] leading-[28.981px] font-medium tracking-[-0.4904px] whitespace-nowrap text-[#2a2622]">
            Harry’s (5-blade)
          </p>
          <div className="flex items-start gap-[8.603px]">
            <div className="flex h-[26.884px] w-[27.96px] flex-col items-center rounded-[12.904px] bg-[#fff9e9] py-[7.528px]">
              <Image src={heart} alt="" className="size-[12.904px]" />
            </div>
            <div className="flex h-[27.96px] w-[118.291px] items-center justify-center overflow-clip rounded-full bg-[#4a2a5e]">
              <p className="h-[17px] font-sans text-[12.904px] leading-[normal] font-medium tracking-[-0.1109px] whitespace-nowrap text-[#fbf3ea]">
                Add to cart
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[29px] w-full items-center justify-between">
          <div className="flex items-center gap-[8.005px]">
            <p className={`text-black ${price}`}>$63.32</p>
            <p className={`text-[#9b9b9b] line-through decoration-from-font [text-decoration-skip-ink:none] ${price}`}>
              $74.49
            </p>
            <p className="h-[18px] rounded-full bg-gold px-[8.005px] py-px font-dm-sans text-[10px] leading-[16.01px] tracking-[-0.2001px] whitespace-nowrap text-black">
              15% off
            </p>
          </div>
          <div className="flex items-center gap-[2.001px]">
            {stars.map((star, i) => (
              <Image key={i} src={star} alt="" className="size-[16.01px]" />
            ))}
          </div>
        </div>
      </div>

      <ComparisonWidget />
    </div>
  );
}

/**
 * A shopper's view of a Harry's product page with Crossword's comparison
 * widget making the case against the competitor they were considering.
 */
export function StorefrontMockup() {
  return (
    <div className="absolute top-[65px] left-[calc(50%+0.22px)] w-[970.804px] -translate-x-1/2 overflow-clip rounded-[12.11px] bg-[#fff9e9] p-[22.991px] shadow-[0px_4.037px_8.275px_0px_rgba(0,0,0,0.25)] outline-[1.15px] outline-white/60 outline-solid">
      <div className="relative h-[581.777px] w-[924.821px]">
        <BrowserBar />

        <div className="absolute top-[37.229px] -left-[0.1875px] flex w-[914.261px] flex-col items-start gap-[17.206px]">
          <div className="flex h-[52.733px] w-full items-center gap-[24.734px] px-8">
            <p className="h-[23px] font-sans text-[17.834px] leading-[normal] font-semibold tracking-[-0.4459px] whitespace-nowrap text-[#2a2622]">
              Harry’s
            </p>
            <div className="flex min-w-px flex-[1_0_0] items-start gap-[20.432px]">
              {navPlaceholders.map((width) => (
                <div key={width} className="h-[7.528px] rounded-[4.301px] bg-[#f1ebdb]" style={{ width }} />
              ))}
            </div>
            <div className="flex size-[24.734px] flex-col items-center py-[2.151px]">
              <Image src={bag} alt="" className="size-[20.432px]" />
            </div>
          </div>

          <div className="relative h-[480px] w-[864px]">
            <div className="absolute -top-[3.159px] left-[18.195px] h-[438px] w-[398px] overflow-clip rounded-[12px] bg-[#fef7e7] hairline-[0.63px] outline-[#dccbbc]">
              {/* Exported from Figma already cropped where the panel clips it. */}
              <Image
                src={razor}
                alt=""
                sizes="338px"
                className="absolute top-[16.131px] left-[30.109px] h-[390.889px] w-[337.667px] max-w-none"
              />
            </div>
            <ProductPanel />
          </div>
        </div>
      </div>

      {/* Inner glow sits above the content, as in Figma. */}
      <div className="pointer-events-none absolute -inset-[1.15px] rounded-[12.11px] shadow-[inset_0px_0px_20.183px_0px_rgba(108,35,50,0.5)]" />
    </div>
  );
}
