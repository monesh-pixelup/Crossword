import { cn } from "@/lib/cn";

/**
 * Gold dashed guides framing a (relative) card and overshooting its corners, as on the home Trust
 * band. Each is a 2px box dashed on both long edges, as in the Webflow build.
 */
export function DashedGuides() {
  const line = "pointer-events-none absolute border-dashed border-[#e0be6042]";
  return (
    <div aria-hidden>
      <span className={cn(line, "-top-5 -left-px h-[calc(100%+43px)] w-0.5 border-x")} />
      <span className={cn(line, "-top-5 -right-px h-[calc(100%+43px)] w-0.5 border-x")} />
      <span className={cn(line, "-top-[1.48px] -inset-x-[20.73px] h-0.5 border-y")} />
      {/* On a whole-pixel offset so its two dashed edges render as one line, matching the other guides. */}
      <span className={cn(line, "-bottom-px -inset-x-[20.73px] h-0.5 border-y")} />
    </div>
  );
}
