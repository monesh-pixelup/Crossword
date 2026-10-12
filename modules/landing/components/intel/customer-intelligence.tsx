import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { stats } from "../../config/intel";
import { DividerBand } from "../shared/divider-band";
import { RailAccent } from "../shared/rail-accent";
import { SectionTitle } from "../shared/section-title";
import { MemoryGraph } from "./memory-graph";

/** Gold rail accent on the page frame, centred on the 24px rail line; it grows in as it scrolls into view. */
const frameAccent = "absolute w-px";

function Stats() {
  return (
    <div className="relative mt-[51px]">
      {/* Frame accents on both rails (56px out from the content), level with the dividers' accents. */}
      <RailAccent className={cn(frameAccent, "top-[149px] -left-14 hidden h-[83px] -translate-x-1/2 min-[992px]:block")} />
      <RailAccent className={cn(frameAccent, "top-[149px] -right-14 hidden h-[83px] translate-x-1/2 min-[992px]:block")} />
      <ul className="flex flex-col gap-12 min-[992px]:flex-row min-[992px]:gap-5 min-[992px]:px-10">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className={cn(
              "relative flex flex-col items-start gap-8 min-[992px]:flex-1 min-[992px]:gap-[50px]",
              i > 0 &&
                "border-t-[0.5px] border-[#d2cbba] pt-12 min-[992px]:border-t-0 min-[992px]:border-l-[0.5px] min-[992px]:pt-0 min-[992px]:pl-16",
            )}
          >
            {i > 0 && <RailAccent className={cn(frameAccent, "top-[149px] left-0 hidden h-[83px] -translate-x-1/2 min-[992px]:block")} />}
            <span className="font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-black/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex h-10 items-center">
              <Image src={stat.logo} alt={stat.logoAlt} className="block h-auto" style={{ width: stat.logoWidth }} />
            </span>
            <div className="flex flex-col gap-2">
              <p className="flex items-baseline gap-2.5 whitespace-nowrap">
                <span className="font-serif text-(length:--display-size) leading-[1.1] font-extralight tracking-[-0.05em] text-ink">{stat.figure}</span>
                <span className="text-[18px] leading-[1.3333] font-medium tracking-[-0.54px] text-black/60">{stat.label}</span>
              </p>
              <p className="max-w-[310px] text-base leading-6 tracking-[-0.32px] text-black/60">{stat.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Every interaction makes the next one smarter": animated memory graph and stats. */
export function CustomerIntelligence() {
  return (
    <section aria-labelledby="intel-title" className="relative section-pad-band">
      <DividerBand glyph="book" />
      <div aria-hidden>
        <RailAccent className={cn(frameAccent, "top-[124px] left-(--frame-inset) h-[325px] -translate-x-1/2")} />
        <RailAccent className={cn(frameAccent, "top-[124px] right-(--frame-inset) h-[325px] translate-x-1/2")} />
      </div>

      <div className="flex content-width flex-col items-stretch">
        <div className="mx-auto flex w-full max-w-[560.63px] flex-col items-center gap-4 text-center">
          <Eyebrow>Customer intelligence</Eyebrow>
          <SectionTitle
            id="intel-title"
            initial="E"
            firstLine="very interaction makes"
            secondLine={<span className="font-light">the next one smarter</span>}
            width={560}
            variant="intelligence"
          />
          <p className="max-w-[465.37px] text-base leading-6 tracking-[-0.32px] text-black/60">
            Crossword <span className="font-medium">turns signals, decisions, and outcomes into memory</span>, so you get to
            know your customer a little better, every single time.
          </p>
        </div>

        <MemoryGraph />
        <Stats />
      </div>
    </section>
  );
}
