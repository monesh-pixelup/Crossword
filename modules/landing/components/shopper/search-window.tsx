import { cn } from "@/lib/cn";

/** A skeleton search result under the sponsored one: avatar, title bar, then two lines of body. */
function SkeletonResult({ top, widths }: { top: number; widths: [number, number, number] }) {
  return (
    <div className="sb-result absolute left-0 h-[70px] w-[360px]" style={{ top }}>
      <div className="absolute top-[10px] left-[12px] size-[18px] rounded-[9px] bg-[#eee7dc]" />
      <div className="absolute top-[16px] left-[37px] h-[6px] rounded-[4px] bg-[#eee7dc]" style={{ width: widths[0] }} />
      <div className="absolute top-[37px] left-[12px] h-[9px] rounded-[5px] bg-[#e3dacc]" style={{ width: widths[1] }} />
      <div className="absolute top-[54px] left-[12px] h-[6px] rounded-[4px] bg-[#eee7dc]" style={{ width: widths[2] }} />
    </div>
  );
}

/**
 * Storyboard frame 1 (Figma 3096:27980): a search for "Gillette" whose top result is Harry's sponsored comparison
 * ad. Drawn at its Figma size (402.8 × 386.8) and position on the 1280 × 599 panel; `query` is what has been typed.
 */
export function SearchWindow({ query, pressed }: { query: string; pressed: boolean }) {
  return (
    <div
      aria-hidden
      className="sb-search absolute top-[106px] left-[439px] h-[386.8px] w-[402.8px] overflow-clip rounded-[11.26px] bg-[#fff9e9] shadow-[0px_3.754px_7.695px_0px_rgba(0,0,0,0.25)] outline-[1.069px] outline-white/60 outline-solid"
    >
      {/* Browser bar: three dots and the search field. */}
      <div className="absolute top-[22px] left-[21px] h-[34px] w-[360px] rounded-[70px] bg-[#f4efe7]">
        {[14, 28, 42].map((left) => (
          <div key={left} className="absolute top-[12px] size-[8px] rounded-[4px] bg-[#dcd2c4]" style={{ left }} />
        ))}
        <div className="absolute top-[7px] left-[95px] flex h-[20px] w-[170px] items-center justify-center gap-[6px] rounded-[6px] border border-[#e5dcce] bg-[#fffdf8]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
            <circle cx="4.2" cy="4.2" r="3.15" stroke="#211a22" strokeOpacity="0.65" strokeWidth="1" />
            <path d="M6.6 6.6 8.9 8.9" stroke="#211a22" strokeOpacity="0.65" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="min-w-[33px] font-inter text-[10px] leading-[12px] tracking-[-0.128px] text-[#211a22]/65">
            {query}
            <span className="sb-caret" />
          </span>
        </div>
      </div>

      <div className="absolute top-[72px] left-[21px] h-[294px] w-[360px]">
        {/* The sponsored result: Harry's comparison ad. */}
        <div
          className={cn(
            "sb-sponsored absolute top-0 left-0 h-[126px] w-[360px] rounded-[12px] bg-[#faecd4] shadow-[0_0_5.474px_1.369px_rgba(0,0,0,0.02)] outline-[0.5px] -outline-offset-[0.5px] outline-[#cfb8bb] outline-solid",
            pressed && "sb-sponsored--pressed",
          )}
        >
          <div className="absolute top-[10px] left-[12px] flex h-[22px] items-center gap-[7px]">
            <span className="flex size-[22px] items-center justify-center rounded-[11px] bg-white font-inter text-[12px] font-semibold text-[#3f1d57]">
              H
            </span>
            <span className="font-sans text-[12px] tracking-[0.12px] text-[#8b8276] uppercase">Harry’s</span>
          </div>
          <span className="absolute top-[13px] right-[12px] font-sans text-[12px] leading-4 text-[#8b8276] uppercase">
            Sponsored
          </span>
          <p className="absolute top-[64px] left-[12px] font-sans text-[15px] leading-5 font-medium text-black">
            Harry’s vs. Gillette
          </p>
          <div className="absolute top-[91px] left-[9px] h-[6px] w-[265px] rounded-[4px] bg-[#dccdb3]" />
          <div className="absolute top-[103px] left-[9px] h-[6px] w-[194px] rounded-[4px] bg-[#dccdb3]" />
        </div>

        <SkeletonResult top={132} widths={[74, 188, 268]} />
        <SkeletonResult top={208} widths={[58, 158, 243]} />
      </div>

      {/* The page fades into the window's foot, as in Figma. */}
      <div className="pointer-events-none absolute top-[299px] -left-[88px] h-[89px] w-[536px] bg-linear-to-b from-[#f9f4eb]/0 via-[#f9f4eb] via-59% to-[#f9f4eb]" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_18.768px_0px_rgba(108,35,50,0.5)]" />
    </div>
  );
}
