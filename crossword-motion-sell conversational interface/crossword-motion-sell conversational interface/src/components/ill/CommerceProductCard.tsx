import { useEffect, useRef } from "react";
import "./CommerceProductCard.css";
import { Media } from "./Media";
import { ProductMeta, type ProductMetaData } from "./ProductMeta";
import { SkeletonBlock } from "./SkeletonBlock";
import { useLineCount } from "./useLineCount";

// ILL/Module/Product/Card-Commerce (1954:403). "Transactional product
// card composed from Media, Product Meta, and Button." Use when price,
// rating or CTA matters (per README's card-selection rule).
export interface CommerceProduct extends ProductMetaData {
  id: string;
  image?: string;
  // Subtle steer toward one option in a set (e.g. "the one most people
  // pair with this") — a small label over the media, not a bordered box.
  tag?: string;
}

// `added` renders the card's own CTA as its resolved, non-interactive
// state (per the kit's provenance rule: once a product is acted on, the
// resolution lives inside that product's own card rather than a
// separate confirmation module).
export function CommerceProductCard({
  product,
  added = false,
  loading = false,
  resolveDelayMs,
}: {
  product: CommerceProduct;
  added?: boolean;
  // Real content is always rendered underneath; `loading` layers a
  // skeleton on top that fades/blurs away when it flips false — a true
  // crossfade, never a hard content swap. Only the sequencer that mounts
  // this card decides timing.
  loading?: boolean;
  // Staggers this card's resolve transition behind others in the same
  // row — unused by default.
  resolveDelayMs?: number;
}) {
  // Keeps the skeleton overlay mounted through the render where `loading`
  // flips false, so it can play its exit transition — then it just sits
  // invisible (harmless) rather than needing an unmount timer.
  const cardRef = useRef<HTMLElement>(null);
  // Product Meta clamps titles to 2 lines.
  const titleLines = useLineCount(cardRef, ".ill-product-meta__title", 2);
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);

  return (
    <article className="ill-commerce-card" ref={cardRef}>
      <div className="ill-commerce-card__content">
        <div className="ill-commerce-card__media">
          <Media src={product.image} alt={product.title} />
          {product.tag && <span className="ill-commerce-card__tag">{product.tag}</span>}
        </div>
        <ProductMeta
          brand={product.brand}
          title={product.title}
          price={product.price}
          rating={product.rating}
          ratingCount={product.ratingCount}
        />
      </div>
      <button type="button" className="ill-commerce-card__cta" disabled={added}>
        {added ? "Added to cart" : "Add to cart"}
      </button>
      {showOverlay && (
        <div
          className={`ill-commerce-card__skeleton-overlay${loading ? "" : " ill-commerce-card__skeleton-overlay--hidden"}`}
          style={resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : undefined}
        >
          <div className="ill-commerce-card__content">
            <SkeletonBlock aspectRatio="257 / 147.758" radius={16} />
            <div className="ill-commerce-card__meta-skeleton">
              <div className="ill-commerce-card__meta-skeleton-row ill-commerce-card__meta-skeleton-row--split">
                <SkeletonBlock width={40} height={9} radius={4} />
                <SkeletonBlock width={20} height={9} radius={4} />
              </div>
              <div>
                {Array.from({ length: titleLines }, (_, i) => (
                  <div className="ill-commerce-card__meta-skeleton-row" key={i}>
                    <SkeletonBlock width={i === titleLines - 1 ? "65%" : "100%"} height={10} radius={4} />
                  </div>
                ))}
              </div>
              <div className="ill-commerce-card__meta-skeleton-row ill-commerce-card__meta-skeleton-row--rating">
                <SkeletonBlock width={49} height={9} radius={4} />
                <SkeletonBlock width={23} height={9} radius={4} />
              </div>
            </div>
          </div>
          <div className="ill-commerce-card__cta-skeleton">
            <SkeletonBlock height={30} radius={112.792} />
          </div>
        </div>
      )}
    </article>
  );
}
