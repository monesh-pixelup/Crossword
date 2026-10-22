import { Media } from "../components/ill/Media";

// Purchased-product row shared by Post-purchase follow-up and Review
// solicitation. Product/Reference's own media + text styles, with the
// order status as a third line in the text column — so it aligns with
// the brand and title instead of floating against the row's right edge.
export function PurchaseRow({
  image,
  alt,
  brand,
  title,
  status,
}: {
  image?: string;
  alt: string;
  brand: string;
  title: string;
  status: string;
}) {
  return (
    <div className="ill-product-reference ill-campaign-purchase-row">
      <div className="ill-product-reference__media" style={{ width: 48, height: 48 }}>
        <Media src={image} alt={alt} />
      </div>
      <div className="ill-product-reference__text">
        <p className="ill-product-reference__brand">{brand}</p>
        <p className="ill-product-reference__title">{title}</p>
        <span className="ill-campaign-status">{status}</span>
      </div>
    </div>
  );
}
