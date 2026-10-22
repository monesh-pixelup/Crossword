import { useEffect, useRef } from "react";
import { Media } from "./Media";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { ProductMeta } from "./ProductMeta";
import { SkeletonBlock } from "./SkeletonBlock";
import { useLineCount } from "./useLineCount";

// ILL/Module/Product/Card-Recommendation (node 1954:415). "Image-led
// recommendation card composed with nested Media. Favorite visibility/
// state and media layout are exposed through the Media instance."
export interface RecommendationProduct {
  id: string;
  name: string;
  image?: string;
  // Fills the card's own showSubtitle slot with Product/Meta's card-
  // density row (brand/differentiator + price) instead of a plain
  // subtitle line — the treatment node 2881:34698 uses for scenario 33's
  // peer comparison, where the differentiator is the whole point of each
  // card. Both optional and unused by every other existing call site, so
  // those keep rendering the plain title-only text block.
  brand?: string;
  price?: string;
}

// `loading`/`resolveDelayMs` extend this card with the same opt-in
// skeleton-overlay contract CommerceProductCard.tsx already has: real
// content always renders underneath, a skeleton layers on top and only
// ever crossfades on exit (never fades in), and `resolveDelayMs` staggers
// one card's resolve behind others in the same row. Both default off, so
// every existing call site (SleepSearch, RetentionGrowth, VisualDiscovery,
// ConversationalDiscovery, OutfitBuilding, DynamicLandingPage(Motion))
// renders exactly as before.
//
// `cta` renders the card's own CTA=Yes variant (node 2742:33670) — the
// same card plus a full-width "Add to cart" action, reusing Button's
// existing `accent` appearance verbatim (bg Accent/Primary, full radius,
// 11px type — identical to the variant's own `action.primary` instance).
// Defaults off, so every non-CTA call site is unaffected.
export function RecommendationProductCard({
  product,
  loading = false,
  resolveDelayMs,
  cta = false,
}: {
  product: RecommendationProduct;
  loading?: boolean;
  resolveDelayMs?: number;
  cta?: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const titleLines = useLineCount(cardRef, ".ill-rec-card__title");
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);

  return (
    <article className={`ill-rec-card${cta ? " ill-rec-card--cta" : ""}`} ref={cardRef}>
      <div className="ill-rec-card__media">
        <div className="ill-rec-card__media-bleed">
          <Media src={product.image} alt={product.name} />
        </div>
        <div className="ill-rec-card__favorite" aria-hidden="true">
          <Icon name="favorite" />
        </div>
      </div>
      <div className="ill-rec-card__text">
        {product.brand || product.price ? (
          <ProductMeta brand={product.brand} title={product.name} price={product.price} />
        ) : (
          <p className="ill-rec-card__title">{product.name}</p>
        )}
      </div>
      {cta && <Button appearance="accent" label="Add to cart" />}
      {showOverlay && (
        <div
          className={`ill-rec-card__skeleton-overlay${loading ? "" : " ill-rec-card__skeleton-overlay--hidden"}`}
          style={resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : undefined}
        >
          <div className="ill-rec-card__media">
            <SkeletonBlock width="100%" height="100%" radius={16} />
          </div>
          <div className="ill-rec-card__text-skeleton">
            {Array.from({ length: titleLines }, (_, i) => (
              <div className="ill-rec-card__text-skeleton-line" key={i}>
                <SkeletonBlock width={i === titleLines - 1 ? "60%" : "100%"} height={11} radius={4} />
              </div>
            ))}
          </div>
          {cta && <SkeletonBlock height={30} radius={112.792} />}
        </div>
      )}
    </article>
  );
}
