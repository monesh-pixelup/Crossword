import Image from "next/image";
import { cn } from "@/lib/cn";
import { coverArtFor, coverLayoutFor } from "../lib/cover-art";
import type { BlogPostSummary } from "../lib/posts";

/** The title's sizes for longer titles, so it always fits its place on the cover (design px at the 761px width). */
function titleSize(layout: "a" | "b", title: string) {
  const n = title.length;
  if (layout === "a") {
    // Inside the gilt box: two lines at Figma's 49.1px, then smaller as the title runs to three or four lines.
    if (n <= 28) return 49.103;
    if (n <= 48) return 40;
    if (n <= 68) return 33;
    return 28;
  }
  // On the cream, from the foot up: Figma's 34.2px has room for five lines.
  return n <= 85 ? 34.173 : 28;
}

/**
 * The post's title set on the cover art as the Figma blog templates set theirs (4062:22847), the first letter in the
 * Parisienne swash: on A, white Crimson ExtraLight in the gilt box (centred in it, 32px in); on B, ink Crimson Light at
 * the cream side's foot (29px in, 21.6px up). Laid out at the template's 761 × 296 and zoomed to the cover's width.
 * Decorative (the title is the card's heading too), so hidden from screen readers.
 */
function CoverTitle({ title, layout }: { title: string; layout: "a" | "b" }) {
  const size = titleSize(layout, title);
  // The lines are set tight (0.9), so ascenders, descenders and the swash capital reach past the line boxes (the swash
  // past the left edge too), and the line clamp's clipping would cut them off. The paragraph gets this much room on
  // every side inside its clip, taken back with an equal negative margin (or offset and width), so the title sits and
  // wraps exactly as it did.
  const bleed = Math.round(size * 0.35);
  const initial = title.slice(0, 1);
  const rest = title.slice(1);
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-[296px] w-[761px] select-none scale-to-container [--fit-height:296px] [--fit-width:761px]">
      {layout === "a" ? (
        // The gilt box: 139px down, 143.16px tall; the title centred in it.
        <div className="absolute top-[139.01px] left-8 flex h-[143.162px] w-[314.238px] items-center">
          <p
            className="line-clamp-4 font-serif leading-[0] font-light text-white [word-break:break-word]"
            style={{ letterSpacing: `${-0.05 * size}px`, padding: bleed, margin: -bleed }}
          >
            <span className="font-script leading-[0.9] font-normal" style={{ fontSize: size * 1.2038, letterSpacing: `${-0.05 * size * 1.2038}px` }}>
              {initial}
            </span>
            <span className="leading-[0.9] font-extralight" style={{ fontSize: size }}>
              {rest}
            </span>
          </p>
        </div>
      ) : (
        <p
          className="absolute line-clamp-5 font-serif leading-[0] font-light text-[#040404] [word-break:break-word]"
          style={{ letterSpacing: `${-0.04 * size}px`, padding: bleed, bottom: 21.6 - bleed, left: 29 - bleed, width: 248.398 + 2 * bleed }}
        >
          <span className="font-script leading-[0.9] font-normal text-[#141414]" style={{ fontSize: size * 1.5768, letterSpacing: `${-0.05 * size * 1.5768}px` }}>
            {initial}
          </span>
          <span className="leading-[1.1]" style={{ fontSize: size }}>
            {rest}
          </span>
        </p>
      )}
    </div>
  );
}

/**
 * A post's cover, at the Figma blog templates' 761 × 296 shape: the editor's own image from Sanity (cropped around its
 * hotspot), or else the journal's cover art in turn (cover-art.ts) with the post's title set on it.
 */
export function PostCover({
  post,
  sizes,
  priority = false,
  className,
}: {
  post: BlogPostSummary;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("@container relative aspect-[761/296] w-full overflow-hidden", className)}>
      {post.cover ? (
        <Image src={post.cover.src} alt="" fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: post.cover.position }} />
      ) : (
        <>
          <Image src={coverArtFor(post.coverIndex)} alt="" fill priority={priority} sizes={sizes} className="object-cover" />
          <CoverTitle title={post.title} layout={coverLayoutFor(post.coverIndex)} />
        </>
      )}
    </div>
  );
}
