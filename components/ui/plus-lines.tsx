import { cn } from "@/lib/cn";

/**
 * The accordions' plus / minus, drawn inside their 14px box: two 1.4px strokes crossing at the centre, in
 * currentColor. Open, the upright folds away (scales to nothing and fades) and leaves the minus; the box around it
 * turns half a turn.
 *
 * One SVG rather than two 1.4px boxes: the browser snaps a box's edges to whole device pixels, so wherever the icon
 * landed on a fraction of a pixel one bar came out 2px and the other 1px (or 4 and 2 device pixels on a 2x screen).
 * SVG strokes are anti-aliased instead, so both lines always draw at the same weight.
 */
export function PlusLines({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className={cn("absolute inset-0 size-full", className)}>
      <line x1="0" y1="7" x2="14" y2="7" />
      <line
        x1="7"
        y1="0"
        x2="7"
        y2="14"
        className={cn(
          "origin-center transition-[scale,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-box:fill-box] motion-reduce:transition-none",
          open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100",
        )}
      />
    </svg>
  );
}
