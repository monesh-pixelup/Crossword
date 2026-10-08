import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import cornerBl from "./assets/corner-bl.svg";
import cornerBr from "./assets/corner-br.svg";
import cornerTl from "./assets/corner-tl.svg";
import cornerTr from "./assets/corner-tr.svg";

const surfaces = {
  cream: "bg-cream",
  sand: "bg-sand",
} as const;

type EyebrowProps = {
  children: ReactNode;
  /** Match the background the label sits on. */
  surface?: keyof typeof surfaces;
  className?: string;
};

/** Small-caps section label framed by four ornamental corner brackets. */
export function Eyebrow({ children, surface = "cream", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        // The 0.5px hairline is an inset outline so it never changes the box size
        // (browsers round a 0.5px border up to 1px on standard screens).
        surfaces[surface],
        "relative inline-flex items-center justify-center px-[5.5px] py-[10.5px] outline-[0.5px] -outline-offset-[0.5px] outline-[#b7ae9a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.11)] outline-solid",
        className,
      )}
    >
      <span className="font-open-sans text-[12px] leading-[11px] font-semibold tracking-[1.44px] whitespace-nowrap text-[#766640] uppercase">
        {children}
      </span>
      <Image src={cornerTl} alt="" className="absolute -top-[5.43px] -left-[5.48px] max-w-none rotate-180" />
      <Image src={cornerTr} alt="" className="absolute -top-[5.42px] -right-[5.49px] max-w-none -scale-y-100" />
      <Image src={cornerBl} alt="" className="absolute -bottom-[5.41px] -left-[5.49px] max-w-none rotate-180 -scale-y-100" />
      <Image src={cornerBr} alt="" className="absolute -right-[5.5px] -bottom-[5.44px] max-w-none" />
    </p>
  );
}
