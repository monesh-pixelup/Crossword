import { Media } from "./Media";

// ILL/Module/PDP/Thumbnail (node 1960:266). "Gallery thumbnail with
// stable dyn:media:gallery.thumbnail target and structural selected/
// default state." Authored at 108.065px/16.01px radius for a PDP gallery
// strip; proportionally scaled here (radius stays ~14.8% of size) for
// inline use next to a chat turn rather than copied at fixed pixels.
interface ThumbnailProps {
  src?: string;
  alt: string;
  state?: "default" | "selected";
  size?: number;
}

export function Thumbnail({ src, alt, state = "default", size = 56 }: ThumbnailProps) {
  return (
    <div
      className={`ill-thumbnail ${state === "selected" ? "ill-thumbnail--selected" : ""}`}
      style={{ width: size, height: size, borderRadius: size * 0.1482 }}
    >
      <Media src={src} alt={alt} />
    </div>
  );
}
