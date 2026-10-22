import { Rails } from "@/modules/marketing/components/rails";

/**
 * The page's two hairline rails, exactly where SiteShell draws them, redrawn over a section whose
 * panel runs between them. SiteShell's rails sit under every section, so a panel spanning
 * --frame-inset to --frame-inset would otherwise paint over them for its whole height. Place it
 * last in a full-width, positioned section.
 */
export function PageRails() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Rails />
    </div>
  );
}
