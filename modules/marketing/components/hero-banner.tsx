import { getImageProps, type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

/**
 * A product page's hero photo (the hero-banners handoff, 11 November 2026), art-directed with <picture>: the 3000px
 * desktop banner from 760px, the 780 × 1688 phone banner (a 390 × 844 hero at 2x, its subject centred, a dark foot for
 * the copy) below that. Drawn in the full-bleed box it sits in (the hero's dark ground), covering it:
 *
 * - From 760px the banner covers the full-bleed hero, so on wide screens the whole banner shows across the full width
 *   (its own dark fade at each edge), and as the screen narrows it holds the hero's height and crops from the sides.
 *   Each desktop banner is the earlier 1695 × 928 photo with page-specific extensions either side (the photo's pixels
 *   untouched, 652px in), so at the hero's usual sizes the photo lands exactly where it was: centred from 1024px, and
 *   between 760px and 1024px where the photo's 70% position put it (`calc(70% + 261.5px × H / 928)`, with the hero's
 *   height H = min(788px, 100svh) there).
 * - Below 760px the phone banner covers the hero, centred.
 */
export function HeroBanner({
  desktop,
  mobile,
  className,
}: {
  desktop: StaticImageData;
  mobile: StaticImageData;
  className?: string;
}) {
  const common = { alt: "", loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({ ...common, src: desktop, sizes: "(min-width: 2560px) 100vw, 2560px" });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobile, sizes: "100vw" });

  return (
    <picture>
      <source media="(min-width: 760px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative: alt="" comes from getImageProps */}
      <img
        {...img}
        srcSet={mobileSrcSet}
        className={cn(
          "absolute inset-0 size-full max-w-none object-cover object-center min-[760px]:max-lg:object-[calc(70%+min(222.05px,28.179svh))_center]",
          className,
        )}
      />
    </picture>
  );
}
