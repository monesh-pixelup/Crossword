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

/** Quarter-circle notch per corner, drawn about the corner itself (the brand kit's `.nf` arcs). */
const notches = [
  { at: "top-0 left-0", d: "M10 0A10 10 0 0 1 0 10" },
  { at: "top-0 right-0", d: "M0 0A10 10 0 0 0 10 10" },
  { at: "bottom-0 left-0", d: "M0 0A10 10 0 0 1 10 10" },
  { at: "bottom-0 right-0", d: "M10 0A10 10 0 0 0 0 10" },
];

/** Concave corners cut into a layer: a transparent quarter disc of `radius` at each corner. */
const notchMask = (radius: number) => {
  const corner = (pos: string) => `radial-gradient(circle at ${pos}, transparent ${radius}px, #000 ${radius + 0.5}px) ${pos} / 51% 51% no-repeat`;
  return [corner("top left"), corner("top right"), corner("bottom left"), corner("bottom right")].join(", ");
};

type NotchedFrameProps = {
  /** Distance of the frame line from the parent's edges. */
  inset: number;
  /** Radius of the concave corner notches. */
  radius: number;
  /** The line's colour: gold on livery, engraved beige on cream and sand. */
  color?: string;
  /**
   * The home frame's gold rings, one sitting in each notch (26px in from the sides, 24px from the top
   * and bottom). They need the home frame's deep notches (radius about 46px, with a 14px inset) to
   * sit clear of the line.
   */
  rings?: boolean;
};

/**
 * The home frame's line, drawn over a (relative) parent: a 0.75px hairline `inset` in from its edges
 * with concave quarter-circle notches at the corners and, with `rings`, a small gold ring in each
 * notch. Used by NotchedPanel on livery, and on its own for cream and sand cards.
 */
export function NotchedFrame({ inset, radius, color = "var(--color-gold)", rings = false }: NotchedFrameProps) {
  const line = { position: "absolute" as const, background: color };
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute" style={{ inset }}>
        <span className="top-0 h-[0.75px]" style={{ ...line, left: radius, right: radius }} />
        <span className="bottom-0 h-[0.75px]" style={{ ...line, left: radius, right: radius }} />
        <span className="left-0 w-[0.75px]" style={{ ...line, top: radius, bottom: radius }} />
        <span className="right-0 w-[0.75px]" style={{ ...line, top: radius, bottom: radius }} />
        {notches.map((n) => (
          <svg
            key={n.at}
            viewBox="0 0 10 10"
            fill="none"
            className={cn("absolute overflow-visible", n.at)}
            style={{ width: radius, height: radius }}
          >
            <path d={n.d} stroke={color} strokeWidth={0.75} vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>

      {/* As on the home frame: 9px rings on a 1px #d2b75c hairline, centred 26px in from the sides and 24px from the ends. */}
      {rings &&
        [
          { left: 21.5, top: 19.5 },
          { right: 21.5, top: 19.5 },
          { left: 21.5, bottom: 19.5 },
          { right: 21.5, bottom: 19.5 },
        ].map((at, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute size-[9px] rounded-full shadow-[inset_0_0_0_1px_#d2b75c]"
            style={at}
          />
        ))}
    </>
  );
}

type NotchedPanelProps = Omit<NotchedFrameProps, "inset" | "radius" | "color"> & {
  tone: LiveryTone;
  /** Plain livery margin around the damask (the home Lifecycle frame's is about 13 to 16px). */
  inset?: number;
  /** Radius of the concave corner notches. */
  radius?: number;
  className?: string;
  children: ReactNode;
};

/**
 * The home page's framed livery panel (Lifecycle's maroon frame): a plain livery margin, then the
 * damask set inside it with concave notched corners, edged by the NotchedFrame line in gold, and
 * with `rings` the home frame's small gold ring in each notch. Drawn at any size, so it works for
 * cards as well as panels.
 */
export function NotchedPanel({ tone, inset = 12, radius = 18, rings = false, className, children }: NotchedPanelProps) {
  const ground = tone === "scroll" ? "bg-maroon" : grounds[tone].fill;

  return (
    <div className={cn("relative isolate", ground, className)}>
      <div aria-hidden className="pointer-events-none absolute" style={{ inset, mask: notchMask(radius), WebkitMask: notchMask(radius) }}>
        <LiveryGround tone={tone} />
      </div>
      <NotchedFrame inset={inset} radius={radius} rings={rings} />
      {children}
    </div>
  );
}
