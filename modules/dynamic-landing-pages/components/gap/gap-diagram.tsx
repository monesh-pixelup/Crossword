import Image from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import crosswordNode from "../../assets/gap/crossword-node.svg";
import { type GapIcon, type GapLane, gapLanes } from "../../config/gap";

/** Phosphor-style 24px line glyphs for the gilded node tiles. */
const glyphs: Record<Exclude<GapIcon, "crossword">, string[]> = {
  ad: ["M3.5 10v4a1 1 0 0 0 1 1h2l6 4V5l-6 4h-2a1 1 0 0 0-1 1Z", "M16 9.5a3.5 3.5 0 0 1 0 5", "M18.5 7a7 7 0 0 1 0 10"],
  page: ["M3.5 4.5h17v15h-17z", "M3.5 8.5h17", "M7 12h10", "M7 15h6"],
  broken: [
    "M9.5 14.5 7.6 16.4a2.8 2.8 0 0 1-4-4L5.5 10.5",
    "M14.5 9.5l1.9-1.9a2.8 2.8 0 0 1 4 4l-1.9 1.9",
    "M8 3.5V6M3.5 8H6M16 20.5V18M20.5 16H18",
  ],
  matched: ["M3.5 4.5h17v15h-17z", "M3.5 8.5h17", "m8.5 13.5 2.5 2.5 4.5-4.5"],
  bag: ["M5 8.5h14l-1 11.5H6L5 8.5Z", "M9 8.5V7a3 3 0 0 1 6 0v1.5"],
};

/** A 48px gilded tile (#f0e5cc, #d8c69c hairline, soft shadow) as in Figma's node diagram. */
function Tile({ icon, dim }: { icon: GapIcon; dim?: boolean }) {
  if (icon === "crossword") {
    return <Image src={crosswordNode} alt="" className="size-[72px] max-w-none md:size-[98px]" />;
  }
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center bg-[#f0e5cc] shadow-[inset_0_0_0_1px_#d8c69c,0_2px_4px_rgba(118,102,64,0.12)] md:size-12",
        dim && "opacity-50",
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#b8953f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-6">
        {glyphs[icon].map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

/** The rule between two steps: solid gold, dashed rail, or dashed and snapped in the middle. */
function Connector({ tone, snapped }: { tone: GapLane["tone"]; snapped?: boolean }) {
  if (tone === "closed") return <li aria-hidden className="mt-5 h-px min-w-4 flex-1 bg-gold md:mt-6" />;
  return (
    <li aria-hidden className="mt-5 flex min-w-4 flex-1 items-center gap-3 md:mt-6">
      <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(118,102,64,0.55)_0_3px,transparent_3px_6px)]" />
      {snapped && (
        <>
          <span className="h-3 w-px rotate-[20deg] bg-label-olive/55" />
          <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(118,102,64,0.55)_0_3px,transparent_3px_6px)] opacity-40" />
        </>
      )}
    </li>
  );
}

function Lane({ lane }: { lane: GapLane }) {
  const last = lane.steps.length - 1;
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
      <p className="w-36 shrink-0 pt-4 font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] text-label-olive uppercase md:pt-5">
        {lane.label}
      </p>
      <ol className="flex flex-1 items-start">
        {lane.steps.map((step, i) => {
          const dim = lane.tone === "broken" && i === last;
          return (
            <Fragment key={step.label}>
              <li className={cn("flex w-[68px] shrink-0 flex-col items-center gap-3 text-center md:w-[136px]", step.icon === "crossword" && "-mt-4 md:-mt-6")}>
                <Tile icon={step.icon} dim={dim} />
                <span className="flex flex-col gap-1">
                  <span className={cn("font-serif text-[16px] leading-[1.1] tracking-[-0.48px] text-ink md:text-[20px] md:tracking-[-0.8px]", dim && "text-ink/50")}>
                    {step.label}
                  </span>
                  <span className="hidden font-sans text-[13px] leading-[1.35] tracking-[-0.26px] text-ink-muted md:block">{step.note}</span>
                </span>
              </li>
              {i < last && <Connector tone={lane.tone} snapped={lane.tone === "broken" && i === last - 1} />}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}

/** Two journeys after the same ad click: today's broken one, and the one Crossword closes. */
export function GapDiagram() {
  return (
    <figure className="flex w-full flex-col gap-10 md:gap-12">
      {gapLanes.map((lane, i) => (
        <Fragment key={lane.label}>
          {i > 0 && <span aria-hidden className="h-px w-full bg-black/10" />}
          <Lane lane={lane} />
        </Fragment>
      ))}
      <figcaption className="sr-only">
        Today, an ad click lands on a static page and the journey breaks. With Crossword, the page is built around the
        ad, so the click carries through to a sale.
      </figcaption>
    </figure>
  );
}
