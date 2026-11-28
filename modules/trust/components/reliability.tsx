import Image from "next/image";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import panel from "../assets/reliability-panel.png";
import stud from "../assets/reliability-stud.svg";

const points = [
  {
    title: "Not tied to one AI model",
    body: "If a model provider slows down or goes offline, Crossword switches to another and keeps answering.",
  },
  { title: "Hosted where you need it", body: "Data storage is flexible to meet your residency requirements." },
  {
    title: "No single point of failure",
    body: "Systems are duplicated across zones, so one fault doesn’t take the system offline.",
  },
];

/** The four gold studs, from the panel's corners (Figma: centres 33.48 / 29.48 in, 43.48 / 39.48 from the far sides). */
const studs = ["top-[24.5px] left-[28.5px]", "top-[24.5px] right-[38.5px]", "bottom-[34.5px] left-[28.5px]", "right-[38.5px] bottom-[34.5px]"];

/**
 * Figma "Reliability" (Trust & security, 4474:39850): the forest panel (1280 wide) with its notched damask frame 22px
 * / 18px in and four gold studs, the Reliability eyebrow, the cream swash headline and a 720px line of Geist 16/24,
 * then 64px under them three points (Crimson 22 over Geist 14 in the muted green) split by 35% gold rules.
 *
 * The frame is drawn as a border image (its notched corners kept, its damask middle stretched), so it holds at any
 * height. Below 1024px the points stack, each under a rule.
 */
export function TrustReliability() {
  return (
    <section aria-labelledby="trust-reliability-title" className="relative bg-cream py-(--section-pad-bottom)">
      <div className="content-width">
        <div className="relative isolate flex flex-col gap-16 overflow-clip bg-forest px-24 py-[88px] max-lg:gap-12 max-lg:px-16 max-lg:py-[72px] max-md:gap-10 max-md:px-8 max-md:py-14">
          <span
            aria-hidden
            className="absolute inset-x-[22px] inset-y-[18px] -z-1 max-md:inset-x-3 max-md:inset-y-3"
            style={{ borderImage: `url(${panel.src}) 80 fill / 40px / 0 stretch`, borderStyle: "solid" } as CSSProperties}
          />
          {studs.map((pos) => (
            <Image key={pos} src={stud} alt="" aria-hidden unoptimized className={cn("absolute size-2.5 max-md:hidden", pos)} />
          ))}

          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow surface="green">Reliability</Eyebrow>
              <h2
                id="trust-reliability-title"
                className="font-serif text-[length:calc(60px*var(--h2-scale))] leading-[calc(97px*var(--h2-scale))] font-light tracking-[calc(-3px*var(--h2-scale))] text-cream max-md:leading-[1.1]"
              >
                <span className="font-script text-[length:calc(82px*var(--h2-scale))] font-normal tracking-normal">B</span>uilt to stay up
              </h2>
            </div>
            <p className="max-w-[720px] font-sans text-base leading-6 tracking-[-0.32px] text-on-dark max-md:text-[15px] max-md:leading-[22px]">
              Crossword runs on infrastructure with 99.99% uptime. It already handles billions of conversations a year, so a busy
              day doesn&rsquo;t slow it down.
            </p>
          </div>

          <ul className="grid grid-cols-3 max-lg:grid-cols-1">
            {points.map((point, i) => (
              <li
                key={point.title}
                className={cn(
                  "flex flex-col gap-2.5",
                  i === 0
                    ? "pr-8 max-lg:pr-0 max-lg:pb-6"
                    : "border-l-[0.625px] border-gold/35 px-8 max-lg:border-t-[0.625px] max-lg:border-l-0 max-lg:px-0 max-lg:py-6 max-lg:last:pb-0",
                )}
              >
                <h3 className="font-serif text-[22px] leading-6 font-normal text-cream">{point.title}</h3>
                <p className="font-sans text-sm leading-5 tracking-[-0.28px] text-on-dark-muted">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
