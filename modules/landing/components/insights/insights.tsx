import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import arrowRight from "../../assets/insights/arrow-right.svg";
import railAccent from "../../assets/insights/rail-accent.svg";
import sharedRailAccent from "@/components/ui/rail-accent/assets/rail-accent.svg";
import { RailAccent } from "@/components/ui/rail-accent";
import { InsightTabs } from "./insight-tabs";

export function Insights() {
  return (
    <section aria-labelledby="insights-title" className="relative section-pad">
      <RailAccent
        src={railAccent}
        className="pointer-events-none absolute top-[calc(99px+var(--section-shift,0px))] left-[calc(var(--frame-inset)-0.5px)] max-lg:hidden"
      />
      {/* Stacked, the left rail's accent is drawn as in Managed launch. */}
      <RailAccent
        src={sharedRailAccent}
        className="pointer-events-none absolute top-[calc(99px+var(--section-shift,0px))] left-[calc(var(--frame-inset)-0.5px)] lg:hidden"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-[120px]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Insights</Eyebrow>
            {/* Figma: the swash at -5% (-4.1px), the line ExtraLight at 1.18 and -5% (-3px): SectionTitle's `compact`. */}
            <SectionTitle id="insights-title" initial="A" firstLine="sk your store anything" width={543} variant="compact" swashTracking={-0.05} />
          </div>
          <Link
            href={ctaLinks.bookDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] max-md:text-[15px] max-md:leading-5 max-md:tracking-[-0.45px] whitespace-nowrap text-ink-soft transition-opacity duration-150 hover:opacity-50"
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
