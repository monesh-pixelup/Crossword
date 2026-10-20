"use client";

import type { StaticImageData } from "next/image";
import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon, Media, Skeleton } from "../primitives";

/*
 * Scene-local building blocks the upsell scenes share, ported from the scene
 * chunk (minified names in brackets). Markup and class names match the
 * source so scenes.css applies unchanged.
 */

type ImageSource = StaticImageData | string;

/**
 * How many lines the text of `selector` (inside `ref`) wraps to, capped at
 * `max`; kept current as it resizes. Skeletons draw that many bars. [c0]
 */
export function useLineCount(ref: RefObject<HTMLElement | null>, selector: string, max = Infinity) {
  const [lines, setLines] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current?.querySelector(selector);
    if (!el) return;
    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].map((rect) => Math.round(rect.top)));
      setLines(Math.min(Math.max(tops.size, 1), max));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, selector, max]);
  return lines;
}

/**
 * Keeps a skeleton overlay mounted for one render after `loading` turns
 * false, so it can fade out (`--hidden`) instead of vanishing.
 */
function useOverlayMounted(loading: boolean) {
  const wasLoading = useRef(loading);
  // Reading the ref during render is the source's own trick: it lags `loading` by one commit.
  // eslint-disable-next-line react-hooks/refs
  const mounted = loading || wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  return mounted;
}

/** A row of product cards. [d2] */
export function ProductCollection({ children }: { children: ReactNode }) {
  return <div className="ill-product-collection">{children}</div>;
}

/** Square product thumbnail with rounded corners scaled to its size. [E] */
export function Thumbnail({
  src,
  alt,
  state = "default",
  size = 56,
}: {
  src?: ImageSource;
  alt: string;
  state?: "default" | "selected";
  size?: number;
}) {
  return (
    <div
      className={`ill-thumbnail ${state === "selected" ? "ill-thumbnail--selected" : ""}`}
      style={{ width: size, height: size, borderRadius: size * 0.1482 }}
    >
      <Media src={src} alt={alt} />
    </div>
  );
}

/** Wraps content with a skeleton overlay that fades away once loaded. [d0] */
export function LoadingFrame({
  loading,
  radius = 12,
  className,
  children,
}: {
  loading: boolean;
  radius?: number;
  className?: string;
  children: ReactNode;
}) {
  const overlay = useOverlayMounted(loading);
  return (
    <div className={["sell-loading-frame", className].filter(Boolean).join(" ")}>
      {children}
      {overlay && (
        <div
          className={`sell-loading-frame__overlay${loading ? "" : " sell-loading-frame__overlay--hidden"}`}
          style={{ borderRadius: radius }}
        >
          <Skeleton width="100%" height="100%" radius={radius} />
        </div>
      )}
    </div>
  );
}

/** One row of a two-product comparison table. [J2] */
export function ComparisonRow({ label, valueA, valueB }: { label: ReactNode; valueA: ReactNode; valueB: ReactNode }) {
  return (
    <div className="ill-comparison-row">
      <div className="ill-comparison-row__cell ill-comparison-row__label">{label}</div>
      <div className="ill-comparison-row__cell ill-comparison-row__value-a">{valueA}</div>
      <div className="ill-comparison-row__cell ill-comparison-row__value-b">{valueB}</div>
    </div>
  );
}

const starPath =
  "M4.51168%200L5.70504%202.86917L8.80255%203.1175L6.44257%205.13907L7.16358%208.16171L4.51168%206.54194L1.85978%208.16171L2.58079%205.13907L0.220818%203.1175L3.31833%202.86917L4.51168%200Z";
const star = (opacity: string) =>
  `data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='9.02336'%20height='9.02336'%20viewBox='0%200%209.02336%209.02336'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='ILL/Primitive/Rating-Star'${opacity}%3e%3cpath%20id='dyn:state:rating.star.1'%20d='${starPath}'%20fill='%23F0AA3B'/%3e%3c/g%3e%3c/svg%3e`;
/** Filled and empty (24% opacity) rating stars, verbatim from the source. [W0, Y0] */
const starFilled = star("");
const starEmpty = star("%20opacity='0.24'");

/** Five stars (rounded `value` filled) and the review count. [n2] */
export function Rating({ value, count }: { value: number; count: string }) {
  const filled = Math.round(value);
  return (
    <div className="ill-rating">
      <div className="ill-rating__stars">
        {Array.from({ length: 5 }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize
          <img key={i} src={i < filled ? starFilled : starEmpty} alt="" width={9} height={9} />
        ))}
      </div>
      <span className="ill-rating__count">({count})</span>
    </div>
  );
}

export type ProductMetaProps = {
  brand?: string;
  title: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  ratingCount?: string;
};

/**
 * Brand, title, price and rating. `card` puts brand and price on one row
 * above the title; `pdp` is the product-page header (brand with a caret,
 * large title, price last). [D2]
 */
export function ProductMeta({
  brand,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  density = "card",
}: ProductMetaProps & { density?: "card" | "pdp" }) {
  const stars = rating !== undefined && ratingCount ? <Rating value={rating} count={ratingCount} /> : null;
  if (density === "pdp") {
    return (
      <div className="ill-product-meta ill-product-meta--pdp">
        <div className="ill-product-meta__pdp-top">
          {brand && <p className="ill-product-meta__brand-pdp">{brand}</p>}
          <Icon name="caretDown" />
        </div>
        <p className="ill-product-meta__title-pdp">{title}</p>
        {subtitle && <p className="ill-product-meta__subtitle">{subtitle}</p>}
        {stars}
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
      {stars}
    </div>
  );
}

/** The product a user message is about: large thumbnail plus its PDP header. [U2] */
export function ProductAnchor({
  image,
  alt,
  size = 128,
  align = "end",
  ...meta
}: ProductMetaProps & { image?: ImageSource; alt: string; size?: number; align?: "start" | "end" }) {
  return (
    <div className={`ill-product-anchor ill-product-anchor--${align}`}>
      <Thumbnail src={image} alt={alt} size={size} />
      <ProductMeta density="pdp" {...meta} />
    </div>
  );
}

export type CommerceProduct = ProductMetaProps & {
  id: string;
  image?: ImageSource;
  tag?: string;
};

/**
 * Product card with an "Add to cart" button. While `loading` a skeleton
 * (sized to the title's line count, at most two) covers it, then fades
 * after `resolveDelayMs`. [k2]
 */
export function CommerceCard({
  product,
  added = false,
  loading = false,
  resolveDelayMs,
}: {
  product: CommerceProduct;
  added?: boolean;
  loading?: boolean;
  resolveDelayMs?: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const titleLines = useLineCount(cardRef, ".ill-product-meta__title", 2);
  const overlay = useOverlayMounted(loading);
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
      {overlay && (
        <div
          className={`ill-commerce-card__skeleton-overlay${loading ? "" : " ill-commerce-card__skeleton-overlay--hidden"}`}
          style={resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : undefined}
        >
          <div className="ill-commerce-card__content">
            <Skeleton aspectRatio="257 / 147.758" radius={16} />
            <div className="ill-commerce-card__meta-skeleton">
              <div className="ill-commerce-card__meta-skeleton-row ill-commerce-card__meta-skeleton-row--split">
                <Skeleton width={40} height={9} radius={4} />
                <Skeleton width={20} height={9} radius={4} />
              </div>
              <div>
                {Array.from({ length: titleLines }, (_, i) => (
                  <div key={i} className="ill-commerce-card__meta-skeleton-row">
                    <Skeleton width={i === titleLines - 1 ? "65%" : "100%"} height={10} radius={4} />
                  </div>
                ))}
              </div>
              <div className="ill-commerce-card__meta-skeleton-row ill-commerce-card__meta-skeleton-row--rating">
                <Skeleton width={49} height={9} radius={4} />
                <Skeleton width={23} height={9} radius={4} />
              </div>
            </div>
          </div>
          <div className="ill-commerce-card__cta-skeleton">
            <Skeleton height={30} radius={112.792} />
          </div>
        </div>
      )}
    </article>
  );
}

/**
 * A bundle offer: one card over two offset "stacked" layers. Skeleton
 * overlay while `loading`, faded out after. [ue]
 */
export function FeatureStacked({
  image,
  eyebrow,
  title,
  price,
  loading = false,
}: {
  image?: ImageSource;
  eyebrow: string;
  title: string;
  price: string;
  loading?: boolean;
}) {
  const overlay = useOverlayMounted(loading);
  return (
    <div className="ill-feature-stacked">
      <div className="ill-feature-stacked__decoration" aria-hidden="true">
        <div className="ill-feature-stacked__decoration-layer ill-feature-stacked__decoration-layer--back" />
        <div className="ill-feature-stacked__decoration-layer ill-feature-stacked__decoration-layer--mid" />
      </div>
      <div className="ill-feature-stacked__card">
        <div className="ill-feature-stacked__media">
          <Media src={image} alt={title} />
          <div className="ill-feature-stacked__favorite" aria-hidden="true">
            <Icon name="favorite" />
          </div>
        </div>
        <div className="ill-feature-stacked__row">
          <div className="ill-feature-stacked__text">
            <p className="ill-feature-stacked__eyebrow">{eyebrow}</p>
            <p className="ill-feature-stacked__title">{title}</p>
          </div>
          <p className="ill-feature-stacked__price">{price}</p>
        </div>
        {overlay && (
          <div
            className={`ill-feature-stacked__skeleton-overlay${loading ? "" : " ill-feature-stacked__skeleton-overlay--hidden"}`}
          >
            <Skeleton height={150} radius={9} />
            <div className="ill-feature-stacked__row">
              <div className="ill-feature-stacked__text">
                <div className="ill-feature-stacked__skeleton-line" style={{ height: 13 }}>
                  <Skeleton width={90} height={9} radius={4} />
                </div>
                <div className="ill-feature-stacked__skeleton-line" style={{ height: 18 }}>
                  <Skeleton width={180} height={11} radius={4} />
                </div>
              </div>
              <div className="ill-feature-stacked__skeleton-line" style={{ height: 18 }}>
                <Skeleton width={26} height={11} radius={4} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
