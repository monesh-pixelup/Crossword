import "./AttributeRow.css";

// ILL/Module/Product/Attribute-Row (node 1954:421). "A single label/value
// pair for surfacing one product differentiator (e.g. finish, shade,
// material) inline with a compact product reference." Use alongside
// Product/Meta or Product/Reference when a single comparison attribute
// needs to read at a glance — not a replacement for either.
export function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ill-attribute-row">
      <span className="ill-attribute-row__label">{label}</span>
      <span className="ill-attribute-row__value">{value}</span>
    </div>
  );
}
