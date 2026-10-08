import Image from "next/image";
import caretDown from "../../../assets/hero/icons/caret-down-sm.svg";
import sparkle from "../../../assets/hero/icons/sparkle.svg";
import starA from "../../../assets/hero/icons/star-a.svg";
import starB from "../../../assets/hero/icons/star-b.svg";
import starC from "../../../assets/hero/icons/star-c.svg";

const stars = [starA, starB, starC, starC, starA];

const label = "font-inter tracking-[0.3042px] text-[#5c5c5c] uppercase leading-[10.952px]";
const price = "font-dm-sans text-[14.603px] leading-[17.037px] tracking-[-0.6084px]";
const button =
  "flex h-[29.603px] w-[322.03px] items-center justify-center rounded-[4.868px] px-[14.603px] py-[7.301px] font-dm-sans text-[9.74px] leading-[14.603px] font-medium tracking-[-0.0974px]";

/** The AI-assisted product card on the right of the chat window. */
export function ProductDetailCard() {
  return (
    <div className="absolute top-[229.34px] left-[1196.62px] flex w-[348.383px] flex-col items-start gap-[12.169px] rounded-[9.13px] hairline-[0.325px] outline-gold bg-parchment p-[14.603px]">
      <div className="flex w-full items-center justify-between">
        <p className={`h-[11px] text-[7.301px] ${label}`}>PROTEINMAX</p>
        <Image src={caretDown} alt="" className="size-[12.169px]" />
      </div>

      <div className="flex w-full flex-col items-start gap-[14.603px]">
        <div className="flex w-full flex-col items-start gap-[13.726px]">
          <div className="flex w-full flex-col items-start gap-[4.991px] overflow-clip whitespace-nowrap">
            <p className={`h-[18px] text-[#171717] ${price}`}>Optimum Nutrition Gold Standard Whey Protein</p>
            <p className={`h-[11px] text-[8.735px] ${label}`}>Double Rich Chocolate, 2 LB</p>
          </div>
          <div className="flex items-center gap-[1.217px]">
            {stars.map((star, i) => (
              <Image key={i} src={star} alt="" className="size-[9.735px]" />
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[4.868px] whitespace-nowrap">
            <p className={`h-[18px] text-black ${price}`}>$63.32</p>
            <p className={`h-[18px] text-[#9b9b9b] line-through decoration-from-font [text-decoration-skip-ink:none] ${price}`}>
              $74.49
            </p>
            <p className="h-[14.868px] rounded-full bg-gold px-[4.868px] py-[2.434px] font-dm-sans text-[7.301px] leading-[9.735px] tracking-[-0.1217px] text-black">
              15% off
            </p>
          </div>
          <div className="h-[10.271px] w-[85.822px] shrink-0" />
        </div>
      </div>

      <div className="flex w-[322.201px] flex-col items-start gap-[5.177px] rounded-[4.565px] hairline-[0.324px] outline-[rgba(159,159,159,0.3)] bg-[#fff9e9] p-[8.735px]">
        <div className="flex items-start gap-[2.496px]">
          <Image src={sparkle} alt="" className="h-[9.815px] w-[9.998px]" />
          <p className="h-[11px] font-dm-sans text-[8.08px] leading-[10.353px] font-medium tracking-[-0.1616px] whitespace-nowrap text-[#462160]">
            Thinking
          </p>
        </div>
        <div className="w-[203.187px]">
          <div className="w-[294.306px] overflow-hidden font-dm-sans text-[7.487px] leading-[9.983px] tracking-[-0.0749px] text-ellipsis text-black/70">
            <p>You came from a TrueBasics whey ad.</p>
            <p>Why GOLD STANDARD is worth considering:</p>
            <p>24g protein • Whey isolate • 5.5g BCAAs</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-[7.301px]">
        <div className={`bg-wine text-white ${button}`}>Add to Cart</div>
        <div className={`hairline-[0.608px] outline-[rgba(23,23,23,0.2)] bg-parchment-deep text-[#171717] ${button}`}>
          Buy Now
        </div>
      </div>
    </div>
  );
}
