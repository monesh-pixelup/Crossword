import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import rail from "../assets/rail.svg";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Marketing chrome: header, footer, and the full-width page frame with its two
 * hairline rails, --frame-inset in from the page ends (24px, 12px on phones), running its full height.
 * The header is fixed (see SiteHeader), which also holds its 72.5px at the top of the page where it
 * needs it (pages with a transparent header let their hero run up under it).
 * The whole site is capped at 1800px wide and centred; past that the cream page shows either side,
 * and two hairlines (the header rule's colour) edge the column.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-[1800px] overflow-x-clip",
        "min-[1800px]:before:pointer-events-none min-[1800px]:before:absolute min-[1800px]:before:inset-y-0 min-[1800px]:before:left-0 min-[1800px]:before:z-60 min-[1800px]:before:w-[0.5px] min-[1800px]:before:bg-black/20",
        "min-[1800px]:after:pointer-events-none min-[1800px]:after:absolute min-[1800px]:after:inset-y-0 min-[1800px]:after:right-0 min-[1800px]:after:z-60 min-[1800px]:after:w-[0.5px] min-[1800px]:after:bg-black/20",
      )}
    >
      <SiteHeader />
      <div className="@container relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 -top-[72.5px]">
          <Image src={rail} alt="" className="absolute inset-y-0 left-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
          <Image src={rail} alt="" className="absolute inset-y-0 right-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
        </div>
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
