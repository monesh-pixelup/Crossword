import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import arrowRight from "../../assets/insights/arrow-right.svg";
import railAccent from "../../assets/insights/rail-accent.svg";
import sharedRailAccent from "../../assets/shared/rail-accent.svg";
import { RailAccent } from "../shared/rail-accent";
import { InsightTabs } from "./insight-tabs";

export function Insights() {
  return (
    <section aria-labelledby="insights-title" className="relative section-pad">
      <RailAccent
        src={railAccent}
        className="pointer-events-none absolute top-[99px] left-[calc(var(--frame-inset)-0.5px)] max-lg:hidden"
      />
      <RailAccent
        src={railAccent}
        className="pointer-events-none absolute top-[99px] right-[calc(var(--frame-inset)-0.5px)] max-lg:hidden"
      />
      {/* Stacked, both rails carry the accent, drawn as in Managed launch so the narrow frame stays symmetrical. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[99px] lg:hidden">
        <RailAccent src={sharedRailAccent} className="absolute top-0 left-[calc(var(--frame-inset)-0.5px)]" />
        <RailAccent src={sharedRailAccent} className="absolute top-0 right-[calc(var(--frame-inset)-0.5px)]" />
      </div>

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-[120px]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Insights</Eyebrow>
            {/* Drawn at 60px and zoomed to the breakpoint's h2 size, like SectionTitle. */}
            <div className="fit-to-container [--fit-width:calc(580px*var(--h2-scale))]">
              <h2
                id="insights-title"
                className="h-[97px] w-[580px] font-serif text-[0px] leading-[0] font-extralight tracking-[-2.5px] whitespace-nowrap text-ink [zoom:var(--h2-scale)]"
              >
                <span className="font-script text-[82px] leading-[1.18] font-normal">Y</span>
                <span className="text-[60px] leading-[1.1] tracking-[-3px]">{"our best "}</span>
                <span className="text-[60px] leading-[1.1] font-light tracking-[-3px]">hire keeps notes</span>
              </h2>
            </div>
          </div>
          <Link
            href="#insights"
            className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#33322f] transition-opacity duration-150 hover:opacity-50"
          >
            LEARN MORE
            <Image src={arrowRight} alt="" className="size-4" />
          </Link>
        </div>

        <InsightTabs />
      </div>
    </section>
  );
}
