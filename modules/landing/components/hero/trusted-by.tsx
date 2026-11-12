import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { MarqueeTrack } from "./marquee-track";
import divider from "../../assets/hero/decor/logo-divider.svg";
import absoluteScience from "../../assets/hero/logos/absolute-science.png";
import alexAni from "../../assets/hero/logos/alex-ani.png";
import analog from "../../assets/hero/logos/analog.png";
import greedy from "../../assets/hero/logos/greedy.png";
import habitAware from "../../assets/hero/logos/habitaware.png";
import minori from "../../assets/hero/logos/minori.png";
import onlyWhatsNeeded from "../../assets/hero/logos/only-whats-needed.png";
import sav from "../../assets/hero/logos/sav.png";
import superMush from "../../assets/hero/logos/supermush.png";
import vegNonVeg from "../../assets/hero/logos/vegnonveg.png";

type Logo = { name: string; src: StaticImageData; width: number; height: number };

/** Figma 3800:29441: two rows of five, each logo in its own box (the art fitted inside it). */
const rows: Logo[][] = [
  [
    { name: "Alex + Ani", src: alexAni, width: 118, height: 17 },
    { name: "SuperMush", src: superMush, width: 63, height: 33 },
    { name: "VegNonVeg", src: vegNonVeg, width: 23, height: 40 },
    { name: "Only What’s Needed", src: onlyWhatsNeeded, width: 42, height: 40 },
    { name: "Greedy", src: greedy, width: 99, height: 21 },
  ],
  [
    { name: "Minori", src: minori, width: 100, height: 21 },
    { name: "Sav", src: sav, width: 73, height: 29 },
    { name: "HabitAware", src: habitAware, width: 88, height: 24 },
    { name: "Analog", src: analog, width: 88, height: 24 },
    { name: "Absolute Science", src: absoluteScience, width: 77, height: 27 },
  ],
];

const logos = rows.flat();

/**
 * One set of the logos for the marquee: every logo at its Figma size, 35px either side of a 52px divider (as Figma's
 * rows; 24px either side on phones), with the same gap trailing the last logo so two sets join seamlessly.
 */
function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 md:gap-[35px] md:pr-[35px]">
      {logos.map((logo, i) => (
        <Fragment key={logo.name}>
          {i > 0 && (
            <li aria-hidden className="relative h-10 w-0 shrink-0 md:h-[52px]">
              <Image src={divider} alt="" className="absolute inset-y-0 -left-[0.527px] h-full w-[1.054px] max-w-none" />
            </li>
          )}
          <li className="shrink-0">
            <Image
              src={logo.src}
              alt={hidden ? "" : logo.name}
              sizes={`${logo.width}px`}
              className="block max-w-none object-contain"
              style={{ width: logo.width, height: logo.height }}
            />
          </li>
          {i === logos.length - 1 && (
            <li aria-hidden className="relative h-10 w-0 shrink-0 md:h-[52px]">
              <Image src={divider} alt="" className="absolute inset-y-0 -left-[0.527px] h-full w-[1.054px] max-w-none" />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}

/**
 * The logos as a marquee: two copies of the set side by side, the track sliding left by one set's width at a steady,
 * linear pace, then looping (MarqueeTrack). Its edges fade out over the page.
 */
function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <MarqueeTrack duration={40000}>
        <LogoSet />
        <LogoSet hidden />
      </MarqueeTrack>
    </div>
  );
}

/** Figma 3800:29441: the line of copy 40px over the logos. */
export function TrustedBy({ className }: { className?: string }) {
  return (
    <div className={cn("flex content-width flex-col items-center gap-10", className)}>
      <p className="text-center text-base leading-6 font-normal tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
        Trusted by
      </p>
      <LogoMarquee />
    </div>
  );
}
