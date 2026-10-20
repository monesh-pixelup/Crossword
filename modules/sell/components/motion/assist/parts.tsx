"use client";

import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Icon, Media } from "../primitives";
import { ProductMeta } from "../upsell/parts";
import "./assist.css";

/*
 * Building blocks the conversion-assistance scenes share, ported from the
 * kit's source (component names in brackets). Markup and class names match
 * the source so assist.css and scenes.css apply unchanged.
 */

/** One 450 × 500 chat shell centred on the 687 × 586 art. [ConversionAssistanceFrame] */
export function ConversionFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ill-conversion-assistance-frame">
      <div className="ill-conversion-assistance-frame__content">{children}</div>
    </div>
  );
}

export type RecommendationProduct = {
  id: string;
  name: string;
  image?: StaticImageData | string;
  /** Differentiator line shown where Product/Meta puts the brand. */
  brand?: string;
  price?: string;
};

/**
 * Recommendation tile: bled photo, favourite badge, then a Product/Meta block
 * (brand/differentiator and price over the name). The kit's skeleton overlay
 * and CTA variants aren't used by these scenes. [RecommendationProductCard]
 */
export function RecommendationCard({ product }: { product: RecommendationProduct }) {
  return (
    <article className="ill-rec-card">
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
    </article>
  );
}
