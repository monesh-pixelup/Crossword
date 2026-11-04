import type { ImgHTMLAttributes } from "react";
import { catalog } from "../../brands/catalog";
import goldHoopSetImage from "@/modules/managed-launch/assets/motion/scenarios/retention-growth/look-1-gold-hoop-set.webp";
import pearlDropSetImage from "@/modules/managed-launch/assets/motion/scenarios/retention-growth/look-2-pearl-drop-set.webp";
import citrineStudSetImage from "@/modules/managed-launch/assets/motion/scenarios/retention-growth/look-3-citrine-stud-set.webp";

const goldHoopSet = goldHoopSetImage.src;
const pearlDropSet = pearlDropSetImage.src;
const citrineStudSet = citrineStudSetImage.src;

const paperImages = new Set([
  ...Object.values(catalog)
    .filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs")
    .map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet,
]);

export function ProductImage({ src, className = "", alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <img {...props} src={src} alt={alt} className={`aiv3-product-image ${className}`} data-media-tone={paperImages.has(src) ? "paper" : "neutral"} data-media-fit={src === catalog.aurellePendant.image ? "cover" : undefined} />;
}
