import Image from "next/image";
import sendArrow from "../../assets/chat/arrow.svg";
import archPhoto from "../../assets/insights/arch-photo.webp";
import bell from "../../assets/insights/bell.svg";
import caret from "../../assets/insights/caret.svg";
import cornerOrnament from "../../assets/insights/corner-ornament.svg";
import funnel from "../../assets/insights/funnel.svg";
import plus from "../../assets/insights/plus.svg";
import cart from "../../assets/insights/shopping-cart.svg";
import users from "../../assets/insights/users-three.svg";
import { insightPrompts } from "../../config/insights";

const promptIcons = { users, cart, funnel, bell };
const ui = "font-sans text-[14px] leading-[normal] whitespace-nowrap";

/**
 * "Ask anything" analytics composer over an arched-hallway photo: a
 * decorative mock-up of Crossword Insights. Drawn at 738 × 640 and zoomed to cover its panel
 * (the panel keeps 738:640 but stretches to the tabs' height beside them, like the Webflow image).
 */
export function InsightComposer() {
  return (
    <div
      role="img"
      aria-label="Crossword Insights: a merchant typing a question about repeat cart abandoners, with suggested prompts"
      className="absolute top-1/2 left-1/2 h-[640px] w-[738px] -translate-x-1/2 -translate-y-1/2 overflow-clip select-none [zoom:max(tan(atan2(100cqw,738px)),tan(atan2(100cqh,640px)))]"
    >
      {/*
        Figma upscales a 1264px photo to fill this panel; this is the exact
        visible crop of the source (no more detail exists at 3x).
      */}
      <Image
        src={archPhoto}
        alt=""
        sizes="740px"
        className="absolute -top-[0.744px] -left-[0.669px] h-[641.6px] w-[739.41px] max-w-none"
      />
      <Image src={cornerOrnament} alt="" className="absolute -top-[9px] -left-2" />

      <div className="absolute top-[194px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-8">
        <p className="h-[39px] text-right font-serif text-[35.585px] leading-[1.1] font-light tracking-[-1.7792px] whitespace-nowrap text-white">
          What insight do you want run?
        </p>

        <div className="relative flex w-[594px] flex-col items-start gap-[22.616px] rounded-[12.701px] bg-[#fff9e9] p-4 drop-shadow-[0px_4.234px_4.34px_rgba(0,0,0,0.25)]">
          <p className={`h-[18px] tracking-[-0.0681px] text-[#383838] ${ui}`}>Find me the users who repeatedly re</p>
          <div className="flex w-full items-end justify-between">
            <div className="flex items-start gap-1.5">
              <Image src={plus} alt="" className="size-[18px]" />
              <p className={`font-medium tracking-[-0.0681px] text-[#606060] ${ui}`}>Upload file</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-[33.333px] bg-wine p-[0.737px] hairline-[0.737px] outline-[#ffb657]">
              <Image src={sendArrow} alt="" className="size-5 -rotate-90" />
            </div>
          </div>
          {/* Stroke (drawn outside the frame, as in Figma) and inner glow. */}
          <div className="pointer-events-none absolute -inset-[2px] rounded-[14.701px] border-2 border-gold" />
          <div className="pointer-events-none absolute -inset-[2px] rounded-[12.701px] shadow-[inset_0px_0px_20px_0px_rgba(108,35,50,0.45)]" />
        </div>

        <div className="flex w-[598px] flex-wrap content-center items-center justify-center gap-2">
          {insightPrompts.map((prompt) => (
            <p
              key={prompt.label}
              className="flex items-center gap-1.5 rounded-[6px] border border-[#c89f57] bg-[#fff8e8] px-2.5 py-1.5"
            >
              <Image src={promptIcons[prompt.icon]} alt="" className="size-4" />
              <span className={`tracking-[-0.56px] text-[#383838] ${ui}`}>{prompt.label}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Blinking-style text caret after "re". */}
      <Image src={caret} alt="" className="absolute top-[279.57px] left-[317.94px] h-6 w-[0.5px] max-w-none" />
    </div>
  );
}
