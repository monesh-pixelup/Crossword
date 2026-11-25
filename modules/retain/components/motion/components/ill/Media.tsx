import { cutoutSrcs } from "../../assets/products/cutouts";
import { sceneImage } from "../../scene-image";

// ILL/Primitive/Media (node 1954:334). "Layout variants represent
// recurring crop structures only; imagery remains data." Renders a real
// image when supplied, otherwise a neutral placeholder block — per the
// kit's instruction to use a clearly replaceable placeholder rather than
// inventing a permanent asset when product imagery is missing.
interface MediaProps {
  src?: string;
  alt: string;
}

export function Media({ src, alt }: MediaProps) {
  if (src) {
    // Through the image optimizer (see sceneImage): the source PNGs are megabytes each.
    return <img className={`ill-media${cutoutSrcs.has(src) ? " ill-media--cutout" : ""}`} {...sceneImage(src)} alt={alt} />;
  }

  return <div className="ill-media ill-media--placeholder" role="img" aria-label={alt} />;
}
