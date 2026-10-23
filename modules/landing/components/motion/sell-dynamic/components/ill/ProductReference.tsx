import { Media } from "./Media";

// ILL/Module/Product/Reference (node 2071:16875) — added to the Figma
// library after this kit's first build; replaces the code-only version
// that composed Thumbnail + Product/Meta (vertical, with a rating slot
// the real component doesn't have). The authored module is a compact
// horizontal chip: 59x59 image, brand/title/price, no rating — a
// lighter treatment than Product/Meta was ever meant to carry for a
// "this is what you're asking about" reference.
export interface ProductReferenceData {
  image?: string;
  alt: string;
  brand?: string;
  title: string;
  price?: string;
  // Overrides the media box's CSS-driven size — e.g. a scene that needs a
  // smaller context chip alongside a larger featured one. Unset by
  // default, so every existing call site keeps its CSS-defined size.
  size?: number;
}

export function ProductReference({ image, alt, brand, title, price, size }: ProductReferenceData) {
  return (
    <div className="sdm-ill-product-reference">
      <div className="sdm-ill-product-reference__media" style={size ? { width: size, height: size } : undefined}>
        <Media src={image} alt={alt} />
      </div>
      <div className="sdm-ill-product-reference__text">
        {brand && <p className="sdm-ill-product-reference__brand">{brand}</p>}
        <p className="sdm-ill-product-reference__title">{title}</p>
        {price && <p className="sdm-ill-product-reference__price">{price}</p>}
      </div>
    </div>
  );
}
