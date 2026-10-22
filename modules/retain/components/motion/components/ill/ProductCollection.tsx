
// ILL/Assembly/Product/Collection (seen embedded in the Chat-Conversation
// template, node 1941:13838) — a flat row of product cards with the
// assembly's own 16px gap. Works with either Card-Recommendation or
// Card-Commerce children.
export function ProductCollection({ children }: { children: React.ReactNode }) {
  return <div className="ill-product-collection">{children}</div>;
}
