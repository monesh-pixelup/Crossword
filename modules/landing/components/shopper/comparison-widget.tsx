import Image from "next/image";
import { cn } from "@/lib/cn";
import spark from "../../assets/shopper/spark.svg";
import sparkle from "../../assets/shopper/sparkle.svg";

const columns = ["Harry’s (5-blade)", "Gillette Fusion5"];

// The last row repeats in Figma; kept as designed.
const rows = [
  ["Number of Blades", "5", "5"],
  ["Flexible Head", "Yes", "Yes"],
  ["Precision Trimmer", "Yes", "No"],
  ["Cost per Refill", "~$2/blade", "~$4–5/blade"],
  ["Cost per Refill", "~$2/blade", "~$4–5/blade"],
];

const cell = "flex-[1_0_0] min-w-px px-[10.754px] py-[5.377px]";
const value = "font-sans text-[12.904px] leading-none h-[13px] whitespace-nowrap";

/** Crossword's in-page "why us vs. them" comparison, embedded on a product page. */
export function ComparisonWidget() {
  return (
    <div className="relative flex h-[301px] w-full flex-col items-start gap-[9.155px] rounded-[8.073px] bg-[#fff9e9] px-[12.904px] pt-[32.9px] pb-[12.904px] hairline-[0.572px] outline-[#ffb657]">
      {/* Highlights the Harry's column. */}
      <div className="absolute top-[69.504px] left-[133.172px] h-[215px] w-[139px] rounded-[4px] border-[1.115px] border-[#eedcc2] bg-[rgba(250,236,212,0.5)]" />

      <div className="relative flex w-full items-start gap-[4.414px]">
        <div className="relative h-[17.206px] w-[18.281px] shrink-0">
          <Image src={sparkle} alt="" className="absolute top-0 -left-[0.172px] max-w-none" />
        </div>
        <p className="h-[19px] min-w-px flex-[1_0_0] font-dm-sans text-[14px] leading-[18.31px] font-medium tracking-[-0.28px] text-[#462160]">
          Why Harry’s is better than Gillette
        </p>
      </div>

      <div className="relative w-full overflow-clip font-sans">
        <div className="flex h-[49.467px] w-full items-center">
          <div className="w-[117.842px] shrink-0" />
          {columns.map((name) => (
            <p
              key={name}
              className="h-[11px] w-[139.35px] shrink-0 px-[10.754px] text-[10.754px] leading-none font-semibold text-black/60"
            >
              {name}
            </p>
          ))}
        </div>

        {rows.map(([label, ours, theirs], i) => (
          <div
            key={i}
            // Figma's first row stretches its value cells; the rest centre them.
            className={cn(
              "flex h-[32.814px] w-full py-[2.53px] shadow-[inset_0_1.115px_0_rgba(217,165,94,0.1)]",
              i === 0 ? "items-stretch" : "items-center",
            )}
          >
            <div className={cell}>
              <p className="h-[17px] text-[10.754px] leading-[16.72px] tracking-[-0.1427px] whitespace-nowrap text-[#6e6470]">
                {label}
              </p>
            </div>
            <div className={cell}>
              <p className={`text-[#2a2622] ${value}`}>{ours}</p>
            </div>
            <div className={cell}>
              <p className={`text-[#6e6470] ${value}`}>{theirs}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute -top-[9px] left-[10.172px] flex h-[22.583px] w-[187.194px] items-center gap-[6.452px] rounded-[12.904px] border-[1.115px] border-[#eedcc2] bg-[#f6e9d4] px-[6.452px]">
        <div className="relative size-[9.678px] shrink-0 overflow-clip">
          <Image src={spark} alt="" className="absolute top-0 left-0 max-w-none" />
        </div>
        <p className="flex h-[15px] items-center gap-[2.151px] font-sans text-[11.704px] leading-[normal] tracking-[0.117px] whitespace-nowrap uppercase">
          <span className="text-[#6e6470]">Powered by</span>
          <span className="font-semibold text-[#3c3024]">Crossword</span>
        </p>
      </div>
    </div>
  );
}
