import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const surfaces = {
  cream: "bg-cream",
  sand: "bg-sand",
} as const;

/** Each corner is the top-left ornament mirrored into place. */
const corners = [
  "-top-[5px] -left-[5px]",
  "-top-[5px] -right-[5px] -scale-x-100",
  "-bottom-[5px] -left-[5px] -scale-y-100",
  "-right-[5px] -bottom-[5px] rotate-180",
];

type EyebrowProps = {
  children: ReactNode;
  /** Match the background the label sits on. */
  surface?: keyof typeof surfaces;
  className?: string;
};

/**
 * The top-left ornament, drawn with the box corner at (0, 0). The rectangle's top and left edges
 * carry straight on past the corner along the same 0.5px line, then curl (top edge down, left edge
 * right). Nothing is drawn inside the box, so the ornament never doubles the rectangle's stroke.
 */
function Corner({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      width="9"
      height="9"
      viewBox="-5 -5 9 9"
      fill="none"
      stroke="#b7ae9a"
      strokeWidth="0.5"
      className={cn("pointer-events-none absolute overflow-visible", className)}
    >
      <path d="M0 0.25H-3.03A1.7 1.7 0 1 0 -1.83 3.15" />
      <path d="M0.25 0V-3.03A1.7 1.7 0 1 1 3.15 -1.83" />
    </svg>
  );
}

/** Small-caps section label framed by four ornamental corner curls. */
export function Eyebrow({ children, surface = "cream", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        // Figma (node 1880:1675): a 0.5px #b7ae9a stroke, 5 × 10px padding. The stroke is an inset
        // shadow so it adds no size and stays a true half-pixel hairline: borders and outlines get
        // rounded up to a solid 1px on standard screens, which reads darker than Figma.
        surfaces[surface],
        "relative inline-flex items-center justify-center px-[5.5px] py-[10.5px] shadow-[inset_0_0_0_0.5px_#b7ae9a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.11)]",
        className,
      )}
    >
      <span className="text-center font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] whitespace-nowrap text-[#766640] uppercase">
        {children}
      </span>
      {corners.map((position) => (
        <Corner key={position} className={position} />
      ))}
    </p>
  );
}
