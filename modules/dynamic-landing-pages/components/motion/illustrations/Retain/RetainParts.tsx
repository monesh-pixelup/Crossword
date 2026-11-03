import { ProductReference, type ProductReferenceData } from "../../components/ill/ProductReference";
import { Chip } from "../../components/ill/Chip";

// The one product surface the Retain set shares — the grouped-module
// recipe StockAvailability/CartUpsellOffer use (Background/Subtle fill,
// Accent/Soft hairline). One fixed order in every scenario so the set
// reads as one widget: product (Product/Reference — brand, title) with a
// right column holding the status Chip on top and the price below, then label/value
// detail rows, then one full-width action. Product actions live inside
// this container (provenance rule 6).
export function RetainModule({
  product,
  label,
  children,
}: {
  product: ProductReferenceData;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="ill-retain-module">
      <div className="ill-retain-module__product">
        <ProductReference {...product} price={undefined} />
        <div className="ill-retain-module__aside">
          {label && <Chip size="sm">{label}</Chip>}
          {product.price && <span className="ill-retain-module__price">{product.price}</span>}
        </div>
      </div>
      {children}
    </section>
  );
}

// One detail line: muted label left, value right — Attribute-Row's type
// and divider, laid out for a narrow widget column.
export function RetainRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="ill-retain-row">
      <span className="ill-retain-row__label">{label}</span>
      <span className="ill-retain-row__value">{children}</span>
    </div>
  );
}
