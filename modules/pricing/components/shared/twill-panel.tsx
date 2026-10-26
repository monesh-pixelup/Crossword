import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import twillTile from "@/modules/landing/assets/blog/damask-tile.webp";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";

type TwillPanelProps = {
  /** The 0.75px gold hairline frame, this many px in from the edges. */
  frameInset: number;
  /** The four gold studs, this many px into the corners. */
  studInset: number;
  className?: string;
  children: ReactNode;
};

/**
 * The pricing page's maroon livery (Figma's featured plan and CTA panel): maroon under the twill
 * tile at 172.82px with darken, a 0.75px gold hairline frame inside it and four corner studs.
 */
export function TwillPanel({ frameInset, studInset, className, children }: TwillPanelProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-1">
        <div className="absolute inset-0 bg-maroon" />
        <div
          className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left mix-blend-darken"
          style={{ backgroundImage: `url(${twillTile.src})` }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute shadow-[inset_0_0_0_0.75px_var(--color-gold)]"
        style={{ inset: frameInset }}
      />
      <Studs inset={studInset} />
      {children}
    </div>
  );
}
