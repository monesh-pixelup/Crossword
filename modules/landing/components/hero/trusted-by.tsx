import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
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

function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <ul
      className={cn(
        // Figma: one centred row from 992px, 35px either side of a 52px divider (625px and 706px wide);
        // below that the logos wrap, centred, without the dividers. Phones use MobileLogoGrid instead.
        "flex w-full max-md:hidden flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:w-auto lg:flex-nowrap lg:gap-[35px]",
      )}
    >
      {logos.map((logo, i) => (
        <Fragment key={logo.name}>
          {i > 0 && (
            <li aria-hidden className="relative hidden h-[52px] w-0 lg:block">
              <Image src={divider} alt="" className="absolute inset-y-0 -left-[0.527px] h-full w-[1.054px] max-w-none" />
            </li>
          )}
          <li className="shrink-0">
            <Image
              src={logo.src}
              alt={logo.name}
              sizes={`${logo.width}px`}
              className="block max-w-none object-contain"
              style={{ width: logo.width, height: logo.height }}
            />
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/**
 * Phones (below 768px): all ten logos in one grid, three per row, the last one centred. Each logo keeps its Figma size
 * but shrinks to its cell if the screen is too narrow.
 */
function MobileLogoGrid() {
  return (
    <ul className="flex w-full flex-wrap justify-center gap-y-8 md:hidden">
      {rows.flat().map((logo) => (
        <li key={logo.name} className="flex basis-1/3 items-center justify-center px-2">
          <Image
            src={logo.src}
            alt={logo.name}
            sizes={`${logo.width}px`}
            className="block h-auto max-w-full object-contain"
            style={{ width: logo.width, aspectRatio: `${logo.width} / ${logo.height}` }}
          />
        </li>
      ))}
    </ul>
  );
}

/** Figma 3800:29441: the line of copy 40px over the first row of logos, and the second 40px under it. */
export function TrustedBy({ className }: { className?: string }) {
  return (
    <div className={cn("flex content-width flex-col items-center gap-10", className)}>
      <p className="text-center text-base leading-6 font-normal tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
        Trusted by
      </p>
      {rows.map((logos, i) => (
        <LogoRow key={i} logos={logos} />
      ))}
      <MobileLogoGrid />
    </div>
  );
}
