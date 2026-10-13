import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import scrollDamask from "@/modules/landing/assets/motion/background-texture.webp";
import damaskTile from "../../assets/shared/damask-tile.webp";
import forestTile from "../../assets/shared/forest-tile.webp";
import stud from "../../assets/shared/stud.svg";

/** Livery grounds from the Figma layouts: colour plus its 23.35px damask tile and blend. */
const grounds = {
  maroon: { fill: "bg-maroon", tile: damaskTile, blend: "mix-blend-darken" },
  aubergine: { fill: "bg-aubergine", tile: damaskTile, blend: "mix-blend-soft-light" },
  forest: { fill: "bg-forest", tile: forestTile, blend: "mix-blend-soft-light opacity-40" },
} as const;

/**
 * `scroll`: the large maroon scroll damask from the brand guidelines' graphic system (the home
 * Lifecycle panel's texture), laid in with cover as the guidelines do. The export has notched
 * corners and an edge hairline baked in, so it is scaled up 8% to keep them cropped off even on
 * near-square panels.
 */
export type LiveryTone = keyof typeof grounds | "scroll";

/** The damask-textured livery colour, filling its (relative) parent. */
export function LiveryGround({ tone }: { tone: LiveryTone }) {
  if (tone === "scroll") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-maroon">
        <Image src={scrollDamask} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="scale-[1.08] object-cover" />
      </div>
    );
  }

  const g = grounds[tone];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className={cn("absolute inset-0", g.fill)} />
      <div
        className={cn("absolute inset-0 bg-size-[23.35px_23.35px] bg-top-left", g.blend)}
        style={{ backgroundImage: `url(${g.tile.src})` }}
      />
    </div>
  );
}

/** Four 4px gold studs pinned `inset` px into the corners of the (relative) parent. */
export function Studs({ inset = 6 }: { inset?: number }) {
  const corners = [
    { top: inset, left: inset },
    { top: inset, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <Image key={i} src={stud} alt="" aria-hidden className="pointer-events-none absolute size-1" style={style} />
      ))}
    </>
  );
}

type GiltPanelProps = {
  tone: LiveryTone;
  /** Gilt frame inset (12px on tiles, 14px on the CTA banner); studs sit half of it in. */
  inset?: number;
  className?: string;
  children: ReactNode;
};

/** A livery panel: damask ground, a 0.75px gold hairline frame inside it and four corner studs. */
export function GiltPanel({ tone, inset = 12, className, children }: GiltPanelProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <LiveryGround tone={tone} />
      <div
        aria-hidden
        className="pointer-events-none absolute shadow-[inset_0_0_0_0.75px_var(--color-gold)]"
        style={{ inset }}
      />
      <Studs inset={inset / 2} />
      {children}
    </div>
  );
}
