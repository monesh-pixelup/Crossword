import "./ProductMeta.css";
import { Rating } from "./Rating";
import { Icon } from "./Icon";

// ILL/Module/Product/Meta (1960:325). "Product identity, pricing,
// optional discount, and nested Rating. Density is structural; product
// data remains component properties." Density=Card (1954:383) is the
// compact in-card treatment; Density=PDP (1960:308) is the module's own
// larger authored variant, used here for scenario 04's anchor product
// instead of scaling Card/Card-Commerce beyond their authored geometry.
export interface ProductMetaData {
  brand?: string;
  title: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  ratingCount?: string;
}

interface ProductMetaProps extends ProductMetaData {
  density?: "card" | "pdp";
}

export function ProductMeta({
  brand,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  density = "card",
}: ProductMetaProps) {
  if (density === "pdp") {
    return (
      <div className="ill-product-meta ill-product-meta--pdp">
        <div className="ill-product-meta__pdp-top">
          {brand && <p className="ill-product-meta__brand-pdp">{brand}</p>}
          <Icon name="caretDown" />
        </div>
        <p className="ill-product-meta__title-pdp">{title}</p>
        {subtitle && <p className="ill-product-meta__subtitle">{subtitle}</p>}
        {rating !== undefined && ratingCount && <Rating value={rating} count={ratingCount} />}
        {price && <p className="ill-product-meta__price-pdp">{price}</p>}
      </div>
    );
  }

  return (
    <div className="ill-product-meta">
      <div className="ill-product-meta__row">
        {brand && <p className="ill-product-meta__brand">{brand}</p>}
        {price && <p className="ill-product-meta__price">{price}</p>}
      </div>
      <p className="ill-product-meta__title">{title}</p>
      {rating !== undefined && ratingCount && <Rating value={rating} count={ratingCount} />}
    </div>
  );
}
