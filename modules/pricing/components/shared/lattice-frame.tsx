import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * The frame's studded lattice (Figma's "Table frame" pattern fill, Pricing 3904:16873 and AI Assistants 3906:6242),
 * one stud per tile: a gold stud (#f3e1b2, a 0.5px #d8aeb3 line, a hair of cream cut round it) 6.5px in from the
 * outer edge, a #d8aeb3 diagonal from it up to the outer edge either side, meeting the next tile's. 14.5px apart;
 * `round` fits a whole number of them along each edge, each strip starting half a tile before the corner stud so the
 * corners share theirs.
 */
const TILE = 14.5;
const stud =
  '<circle cx="7.25" cy="6.5" r="2.1" fill="%23fff9ea"/><circle cx="7.25" cy="6.5" r="1.25" fill="%23f3e1b2" stroke="%23d8aeb3" stroke-width="0.5"/>';
const zigzag = '<path d="M0 0L7.25 6.5L14.5 0" fill="none" stroke="%23d8aeb3" stroke-width="0.6"/>';
const latticeX = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="14.5" height="8" viewBox="0 0 14.5 8">${zigzag}${stud}</svg>')`;
const latticeY = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="14.5" viewBox="0 0 8 14.5"><g transform="matrix(0 1 1 0 0 0)">${zigzag}${stud}</g></svg>')`;

function strip(edge: "top" | "bottom" | "left" | "right"): CSSProperties {
  const along = `calc(6.5px - ${TILE / 2}px)`;
  const horizontal = edge === "top" || edge === "bottom";
  return {
    position: "absolute",
    [edge]: 0,
    ...(horizontal ? { left: along, right: along, height: 8 } : { top: along, bottom: along, width: 8 }),
    backgroundImage: horizontal ? latticeX : latticeY,
    backgroundSize: horizontal ? `${TILE}px 8px` : `8px ${TILE}px`,
    backgroundRepeat: horizontal ? "round no-repeat" : "no-repeat round",
    transform: edge === "bottom" || edge === "right" ? "scale(-1)" : undefined,
  };
}

/**
 * Figma's "Table frame": a 1px #d2cdc0 frame, its 8px band the studded lattice over cream, 10px past the content each
 * side from 1280px; inside it a 1px engraved/50 line round the table, which scrolls sideways within the frame when it
 * doesn't fit.
 */
export function LatticeFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-cream p-2 xl:w-[calc(100%+20px)]", className)}>
      <span aria-hidden style={strip("top")} />
      <span aria-hidden style={strip("bottom")} />
      <span aria-hidden style={strip("left")} />
      <span aria-hidden style={strip("right")} />
      <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_#d2cdc0]" />
      <div className="relative w-full overflow-x-auto bg-cream p-px shadow-[inset_0_0_0_1px_rgba(183,174,154,0.5)]">{children}</div>
    </div>
  );
}
