import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import arrow from "../../assets/chat/arrow.svg";
import arrowsOut from "../../assets/chat/arrows-out-simple.svg";
import bracelet from "../../assets/chat/bracelet.webp";
import braceletFront from "../../assets/chat/bracelet-front.webp";
import carouselDots from "../../assets/chat/carousel-dots.svg";
import clock from "../../assets/chat/clock-counter-clockwise.svg";
import heartBack from "../../assets/chat/heart-back.svg";
import heart from "../../assets/chat/heart.svg";
import plus from "../../assets/chat/plus.svg";
import close from "../../assets/chat/x.svg";

/**
 * Visual themes from Figma. The same conversation appears on different
 * backgrounds, so only the surfaces change between them.
 */
const tones = {
  /** Hero: blends into the parchment showcase, hairline gold stroke. */
  parchment: {
    surface: "bg-parchment-deep",
    stroke: "inset-0 rounded-[12.701px] border-[0.602px]",
    glow: "",
    fade: "250,236,212",
    input: "bg-cream",
  },
  /** Customer-lifecycle panel: ivory card glowing on maroon. */
  ivory: {
    surface:
      "bg-[#fff9e9] shadow-[0px_0px_18.989px_0px_rgba(224,190,96,0.4),0px_0px_5.172px_0px_rgba(0,0,0,0.02),0px_4.234px_8.679px_0px_rgba(0,0,0,0.25)]",
    // Figma draws this stroke outside the frame.
    stroke: "-inset-[2px] rounded-[14.701px] border-2",
    glow: "shadow-[inset_0px_0px_20px_0px_rgba(108,35,50,0.45)]",
    fade: "249,244,235",
    input: "bg-[#efe9db]",
  },
} as const;

const message = "font-sans text-[14px] leading-[normal] tracking-[-0.0681px]";
const centered = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

function IconBubble({ icon }: { icon: StaticImageData }) {
  return (
    <div className="relative size-[29.401px] shrink-0 overflow-clip rounded-full hairline-[0.565px] outline-rose-line">
      <Image src={icon} alt="" className={`${centered} size-[13.57px]`} />
    </div>
  );
}

function HeartBadge({ icon }: { icon: StaticImageData }) {
  return (
    <div className="absolute top-[7.92px] right-[8.32px] size-[24.878px] overflow-clip rounded-full bg-[#efe9db]">
      <Image src={icon} alt="" className={`${centered} size-[13.57px]`} />
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="flex w-full flex-col items-start gap-3 px-[6.785px]">
      <div className="flex h-[50px] w-full flex-col items-start gap-1 font-sans leading-[normal] tracking-[-0.0681px]">
        <div className="flex w-full items-end justify-between whitespace-nowrap">
          <p className="text-[11px] text-[#64666c]">SWAROVSKI</p>
          <p className="text-[12px] text-black">$400</p>
        </div>
        <p className="text-[12px] whitespace-pre text-black">
          {"Cubic Zirconia-Studded "}
          <br />
          Charm Bracelet
        </p>
      </div>
      <div className="flex w-full items-center justify-center rounded-full bg-maroon px-[9.046px] py-[7.916px] font-sans text-[11.308px] leading-[normal] tracking-[-0.0681px] whitespace-nowrap text-white">
        Add to cart
      </div>
    </div>
  );
}

const productCard =
  "flex w-[251px] shrink-0 flex-col items-start gap-3 rounded-[18.093px] hairline-[0.5px] outline-rose-line px-[3.392px] pt-[3.392px] pb-[13.57px] drop-shadow-[0px_0px_2.737px_rgba(0,0,0,0.02)]";

type ChatWindowProps = {
  tone: keyof typeof tones;
  className?: string;
};

/**
 * The Crossword shopper assistant mid-conversation: a decorative product
 * mock-up shared by several landing sections. Built at the size used in the
 * customer-lifecycle section; scale it with `zoom` for other sizes.
 */
export function ChatWindow({ tone, className }: ChatWindowProps) {
  const theme = tones[tone];

  return (
    <div
      className={cn(
        "relative flex w-[551.831px] flex-col items-start gap-[22.616px] rounded-[12.701px] p-[22.616px]",
        theme.surface,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[4.523px]">
          <IconBubble icon={clock} />
          <IconBubble icon={plus} />
        </div>
        <p className="rounded-full hairline-[0.565px] outline-black/8 bg-[#f9f4eb] px-3 py-1 font-sans text-[12px] leading-[normal] tracking-[0.12px] whitespace-nowrap text-[#161719] uppercase">
          Velmora
        </p>
        <div className="flex items-center gap-[4.523px]">
          <IconBubble icon={arrowsOut} />
          <IconBubble icon={close} />
        </div>
      </div>

      <div className="flex h-[358px] w-full flex-col items-start gap-10">
        <div className="flex w-full flex-col items-end justify-center">
          <div className={`rounded-[13.57px] bg-wine p-[9.046px] whitespace-pre text-white ${message}`}>
            <p>{"I need something for my wife's birthday. "}</p>
            <p>{"She has expensive taste. Unfortunately, my budget doesn't "}</p>
          </div>
        </div>

        <div className="flex w-[479px] flex-col items-start gap-5 overflow-clip">
          <div className={`w-full text-[#161719] ${message}`}>
            <p>I can work with that.</p>
            <p>I found three options that feel considerably more expensive than they are.</p>
          </div>

          <div className="relative flex items-start gap-4">
            {/* Second recommendation, fanned out behind the first. */}
            <div className="absolute top-[calc(50%+3.47px)] left-[calc(50%-3.85px)] flex h-[298.992px] w-[282.559px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="flex-none rotate-[7.13deg]">
                <div className={`bg-[#f3e6ce] ${productCard}`}>
                  <div className="relative h-[148.135px] w-full shrink-0 overflow-clip rounded-[15.831px]">
                    <HeartBadge icon={heartBack} />
                    <Image
                      src={carouselDots}
                      alt=""
                      className="absolute top-[135.7px] left-[calc(50%-0.52px)] h-[4.523px] w-[22.616px] -translate-x-1/2"
                    />
                    <Image
                      src={bracelet}
                      alt=""
                      sizes="208px"
                      className="absolute top-1/2 left-[calc(50%-0.12px)] h-[171.706px] w-[207.919px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                    />
                  </div>
                  <ProductDetails />
                </div>
              </div>
            </div>

            <div className={`relative bg-parchment ${productCard}`}>
              <div className="relative h-[148.135px] w-full shrink-0 overflow-clip rounded-[15.831px] bg-[#f9f4eb]">
                <HeartBadge icon={heart} />
                {/* Exported from Figma already cropped to the visible area. */}
                <Image
                  src={braceletFront}
                  alt=""
                  sizes="208px"
                  className="absolute top-0 left-[18.023px] h-[124.544px] w-[207.919px] max-w-none object-cover object-top"
                />
              </div>
              <ProductDetails />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[391.86px] left-[9.19px] h-[109.809px] w-[535.978px]"
        style={{
          backgroundImage: `linear-gradient(180.13deg, rgba(${theme.fade},0) 3.5575%, rgb(${theme.fade}) 66.118%, rgb(${theme.fade}) 113.61%)`,
        }}
      />

      <div className="relative flex w-[506.599px] flex-col items-center">
        <div
          className={cn(
            "flex w-full items-center justify-center gap-[9.046px] rounded-full hairline-[0.565px] outline-rose-line py-1 pr-1 pl-4",
            theme.input,
          )}
        >
          <p className={`min-w-px flex-[1_0_0] text-[#606060] ${message}`}>Where’s my order?</p>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[33.333px] hairline-[0.737px] outline-[#ffb657] bg-wine p-[0.737px]">
            <Image src={arrow} alt="" className="size-5 -rotate-90" />
          </div>
        </div>
      </div>

      {/* Stroke and inner glow sit on top without affecting layout, as in Figma. */}
      <div className={cn("pointer-events-none absolute border-gold", theme.stroke)} />
      {theme.glow && (
        <div className={cn("pointer-events-none absolute -inset-[2px] rounded-[12.701px]", theme.glow)} />
      )}
    </div>
  );
}
