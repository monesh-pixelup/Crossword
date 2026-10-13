import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import studGold from "./assets/stud-gold.svg";
import studGoldFaint from "./assets/stud-gold-faint.svg";
import studGoldFaintSm from "./assets/stud-gold-faint-sm.svg";
import studGoldSm from "./assets/stud-gold-sm.svg";
import studGrey from "./assets/stud-grey.svg";
import studGreySm from "./assets/stud-grey-sm.svg";
import studMaroon from "./assets/stud-maroon.svg";
import studMaroonSm from "./assets/stud-maroon-sm.svg";

/** Filled stamps invert on hover: gold fill, maroon label, border and studs. */
const invert = "hover:border-maroon hover:bg-gold hover:text-maroon";
const hoverStuds = [studMaroon, studMaroonSm] as const;

const variants = {
  /** Maroon fill, dashed gold border, bright-gold label (hero CTA). */
  primary: {
    frame: cn("border-dashed border-gold bg-maroon text-gold-bright", invert),
    studs: [studGold, studGoldSm],
    hoverStuds,
  },
  /** Primary with the softer gold label used in the site header. */
  "primary-soft": {
    frame: cn("border-dashed border-gold bg-maroon text-gold", invert),
    studs: [studGold, studGoldSm],
    hoverStuds,
  },
  /** Wine fill, faint gold border and studs (on dark green, e.g. the footer). */
  wine: {
    frame: cn("border-dashed border-[rgba(224,190,96,0.3)] bg-wine text-gold", invert),
    studs: [studGoldFaint, studGoldFaintSm],
    hoverStuds,
  },
  /** Wine fill with the full gold border but faint studs (dark overlay header). */
  "wine-gold": {
    frame: cn("border-dashed border-gold bg-wine text-gold", invert),
    studs: [studGoldFaint, studGoldFaintSm],
    hoverStuds,
  },
  /** Transparent with a solid grey hairline; fades like the text links on hover. */
  outline: {
    frame: "border-solid border-[#b8b8b8] text-[#646464] hover:opacity-50",
    studs: [studGrey, studGreySm],
    hoverStuds: null,
  },
} as const;

type StampButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

const studSlots = [
  { small: false, className: "top-[1.82px] left-[2.11px]" },
  { small: true, className: "top-[1.82px] right-[2.08px]" },
  { small: false, className: "bottom-[1.96px] left-[1.82px]" },
  { small: true, className: "right-[2.08px] bottom-[1.96px]" },
];

/**
 * The "stamp" CTA from the Crossword design system: a bordered label with
 * four decorative studs pinned into the corners.
 */
export function StampButton({
  variant = "primary",
  className,
  children,
  ...props
}: StampButtonProps) {
  const { frame, studs, hoverStuds } = variants[variant];
  const fade = "transition-opacity duration-200 motion-reduce:transition-none";

  return (
    <Link
      className={cn(
        "group relative inline-flex shrink-0 items-center border px-3 py-2 font-serif text-base leading-[22px] font-medium tracking-[-0.48px] whitespace-nowrap transition-[opacity,background-color,border-color,color] duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
        frame,
        className,
      )}
      {...props}
    >
      {children}
      {studSlots.map(({ small, className: slot }) => (
        <Image
          key={slot}
          src={studs[small ? 1 : 0]}
          alt=""
          className={cn("absolute", slot, hoverStuds && cn(fade, "group-hover:opacity-0"))}
        />
      ))}
      {hoverStuds &&
        studSlots.map(({ small, className: slot }) => (
          <Image
            key={`hover-${slot}`}
            src={hoverStuds[small ? 1 : 0]}
            alt=""
            className={cn("absolute opacity-0 group-hover:opacity-100", slot, fade)}
          />
        ))}
    </Link>
  );
}
