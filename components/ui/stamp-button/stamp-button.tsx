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

const variants = {
  /** Maroon fill, dashed gold border, bright-gold label (hero CTA). */
  primary: {
    frame: "border-dashed border-gold bg-maroon text-gold-bright",
    studs: [studGold, studGoldSm],
  },
  /** Primary with the softer gold label used in the site header. */
  "primary-soft": {
    frame: "border-dashed border-gold bg-maroon text-gold",
    studs: [studGold, studGoldSm],
  },
  /** Wine fill, faint gold border and studs (on dark green, e.g. the footer). */
  wine: {
    frame: "border-dashed border-[rgba(224,190,96,0.3)] bg-wine text-gold",
    studs: [studGoldFaint, studGoldFaintSm],
  },
  /** Wine fill with the full gold border but faint studs (dark overlay header). */
  "wine-gold": {
    frame: "border-dashed border-gold bg-wine text-gold",
    studs: [studGoldFaint, studGoldFaintSm],
  },
  /** Transparent with a solid grey hairline. */
  outline: {
    frame: "border-solid border-[#b8b8b8] text-[#646464]",
    studs: [studGrey, studGreySm],
  },
} as const;

type StampButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

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
  const { frame, studs } = variants[variant];
  const [stud, studSm] = studs;

  return (
    <Link
      className={cn(
        "relative inline-flex shrink-0 items-center border px-3 py-2 font-serif text-base leading-[22px] font-medium tracking-[-0.48px] whitespace-nowrap transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
        frame,
        className,
      )}
      {...props}
    >
      {children}
      <Image src={stud} alt="" className="absolute top-[1.82px] left-[2.11px]" />
      <Image src={studSm} alt="" className="absolute top-[1.82px] right-[2.08px]" />
      <Image src={stud} alt="" className="absolute bottom-[1.96px] left-[1.82px]" />
      <Image src={studSm} alt="" className="absolute right-[2.08px] bottom-[1.96px]" />
    </Link>
  );
}
