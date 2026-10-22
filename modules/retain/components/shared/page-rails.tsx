import Image from "next/image";
import rail from "@/modules/marketing/assets/rail.svg";

/**
 * The page's two hairline rails, exactly where SiteShell draws them, redrawn over a section whose
 * panel runs between them. SiteShell's rails sit under every section, so a panel spanning
 * --frame-inset to --frame-inset would otherwise paint over them for its whole height. Place it
 * last in a full-width, positioned section.
 */
export function PageRails() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Image src={rail} alt="" className="absolute inset-y-0 left-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
      <Image src={rail} alt="" className="absolute inset-y-0 right-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
    </div>
  );
}
