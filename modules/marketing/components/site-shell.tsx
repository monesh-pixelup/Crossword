import type { ReactNode } from "react";
import { EagerImages } from "./eager-images";
import { HeroCurtain } from "./hero-curtain";
import { Rails } from "./rails";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Marketing chrome: header, footer, and the full-width page frame with its two
 * hairline rails, --frame-inset in from the page ends (24px, 12px on phones), running its full height.
 * The header is fixed (see SiteHeader), which also holds its 72.5px at the top of the page where it
 * needs it (pages with a transparent header let their hero run up under it).
 * The whole site is capped at 1440px wide and centred; past that the cream page shows either side.
 * The footer sits outside that cap so its background and frame run the full page width (its content
 * keeps to the sections' content box).
 * The horizontal clip sits on a full-width wrapper outside that cap, so a section can still run a
 * full-bleed layer out to the viewport edges (the Retain hero photo) without widening the page.
 *
 * Scrolling, the hero stays put and the sections after it slide up over it (HeroCurtain; globals.css "Hero curtain").
 * So the rails are drawn after the page, over the sections' cream, and start at the hero's foot (`--rails-top`), so
 * they ride up with the sections without drawing over the hero; with no hero they start 72.5px up, as before.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <div className="relative mx-auto max-w-[1440px]">
        <SiteHeader />
        <div className="site-rails-host @container relative">
          {children}
          <div aria-hidden className="site-rails pointer-events-none absolute inset-x-0 bottom-0 top-(--rails-top,-72.5px)">
            <Rails />
          </div>
        </div>
        <HeroCurtain />
        <EagerImages />
      </div>
      <SiteFooter />
    </div>
  );
}
