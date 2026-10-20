import Image from "next/image";
import type { ReactNode } from "react";
import rail from "../assets/rail.svg";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Marketing chrome: header, footer, and the full-width page frame with its two
 * hairline rails, --frame-inset in from the page ends (24px, 12px on phones), running its full height.
 * The header is fixed (see SiteHeader), which also holds its 72.5px at the top of the page where it
 * needs it (pages with a transparent header let their hero run up under it).
 * The whole site is capped at 1800px wide and centred; past that the cream page shows either side.
 * The footer sits outside that cap so its background and frame run the full page width (its content
 * stays capped at 1280px).
 * The horizontal clip sits on a full-width wrapper outside that cap, so a section can still run a
 * full-bleed layer out to the viewport edges (the Retain hero photo) without widening the page.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <div className="relative mx-auto max-w-[1800px]">
        <SiteHeader />
        <div className="@container relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -top-[72.5px]">
            <Image src={rail} alt="" className="absolute inset-y-0 left-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
            <Image src={rail} alt="" className="absolute inset-y-0 right-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
          </div>
          {children}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
