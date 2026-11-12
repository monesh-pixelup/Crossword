import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import twillTile from "@/modules/landing/assets/blog/damask-tile.webp";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import ctaStamp from "../../assets/cta-stamp.webp";

type TwillPanelProps = {
  /** The 0.75px gold hairline frame, this many px in from the edges. */
  frameInset: number;
  /** The four gold studs, this many px into the corners; left out, no studs. */
  studInset?: number;
  /**
   * The tilted green postage stamp in the top right corner, as the CTA banners set it (Figma 3305:1697): 95.84 ×
   * 94.96 at (1130.4, 40.46) in the 1280px panel, so 53.76px in from its right edge (exported at 4x, cut out of the
   * maroon). Smaller on tablets and phones; the panel's own top padding should clear it there.
   */
  stamp?: boolean;
  /** Another twill tile in place of the default (Managed Launch's CTA uses Figma's own export). */
  tile?: StaticImageData;
  /**
   * The finished surface, cut from Figma's own 2x render (two periods of the weave, 691px, lossless), drawn at
   * 345.65px with no blending in place of the maroon and tile. Figma blends the tile over #7D0034 at full size and
   * then scales the result; a browser scales the tile first and blends after, which loses the weave's dark threads
   * and leaves the panel lighter than Figma's. Baked, the colour is Figma's at any screen density.
   */
  surface?: StaticImageData;
  className?: string;
  children: ReactNode;
};

/**
 * The pricing page's maroon livery (Figma's featured plan and CTA panel): maroon under the twill
 * tile at 172.82px with darken, a 0.75px gold hairline frame inside it, and either four corner studs or (the CTA
 * banners) a postage stamp in the top right corner.
 */
export function TwillPanel({ frameInset, studInset, stamp, tile = twillTile, surface, className, children }: TwillPanelProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-1">
        <div className="absolute inset-0 bg-maroon" />
        {surface ? (
          <div
            className="absolute inset-0 bg-size-[345.64909994602204px_345.64909994602204px] bg-top-left"
            style={{ backgroundImage: `url(${surface.src})` }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left mix-blend-darken"
            style={{ backgroundImage: `url(${tile.src})` }}
          />
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute shadow-[inset_0_0_0_0.75px_var(--color-gold)]"
        style={{ inset: frameInset }}
      />
      {studInset !== undefined && <Studs inset={studInset} />}
      {stamp && (
        <Image
          src={ctaStamp}
          alt=""
          aria-hidden
          sizes="96px"
          // Figma's 4x export, lossless, served as it is: resized and re-encoded by the image optimiser, its fine print blurred.
          unoptimized
          className="pointer-events-none absolute top-[40.5px] right-[53.8px] h-auto w-[95px] select-none max-lg:top-[28px] max-lg:right-[32px] max-lg:w-[76px] max-md:top-[22px] max-md:right-[22px] max-md:w-[58px]"
        />
      )}
      {children}
    </div>
  );
}
