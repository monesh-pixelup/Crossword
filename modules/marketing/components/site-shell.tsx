import Image from "next/image";
import type { ReactNode } from "react";
import rail from "../assets/rail.svg";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Marketing chrome: header, footer, and the full-width page frame with its two
 * hairline rails, --frame-inset in from the page ends (24px, 12px on phones), running its full height.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-clip">
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
