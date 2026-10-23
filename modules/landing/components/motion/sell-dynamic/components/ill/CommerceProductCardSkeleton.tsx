
// ILL/Module/Product/Card-Commerce, Property 3=Skeleton Card-Commerce
// (node 2255:3772, fileKey TiAeD9ICNjjC8N3zoUJExk). "Transactional
// product card composed from Media, Product Meta, and Button" — this is
// the component's own authored skeleton/loading variant: a static
// diagonal-sheen placeholder baked directly into the design (not an
// animated shimmer), matching Card-Commerce's exact geometry so swapping
// between this and the resolved card never shifts layout. Fixed
// composition, no props — mirrors the Figma node's own fixed skeleton
// state rather than a generic reusable placeholder primitive.
export function CommerceProductCardSkeleton() {
  return (
    <article className="sdm-ill-commerce-card-skeleton">
      <div className="sdm-ill-commerce-card-skeleton__media" />
      <div className="sdm-ill-commerce-card-skeleton__meta">
        <div className="sdm-ill-commerce-card-skeleton__meta-row">
          <div className="sdm-ill-commerce-card-skeleton__brand" />
          <div className="sdm-ill-commerce-card-skeleton__rating-icons" />
        </div>
        <div className="sdm-ill-commerce-card-skeleton__title" />
        <div className="sdm-ill-commerce-card-skeleton__rating" />
      </div>
      <div className="sdm-ill-commerce-card-skeleton__cta" />
    </article>
  );
}
