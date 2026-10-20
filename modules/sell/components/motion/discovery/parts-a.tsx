"use client";

import type { StaticImageData } from "next/image";
import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Icon, Media, Skeleton } from "../primitives";

/*
 * Scene-local building blocks of the product-discovery visuals (group A:
 * conversational discovery, try it on, product Q&A, outfit building), ported
 * from the scene chunk of the "Sell: Conversational Interface — Motion" build.
 * Markup and class names match the source so scenes.css applies unchanged.
 */

type ImageSource = StaticImageData | string;

export type RecProduct = { id: string; name: string; image: ImageSource };

/** Row of recommendation cards (`d2`). */
export function ProductCollection({ children }: { children: ReactNode }) {
  return <div className="ill-product-collection">{children}</div>;
}

/**
 * How many lines the text of `selector` inside `ref` wraps to, at least 1 and
 * at most `max` (`c0`). Re-measured whenever that element resizes.
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
 * Keeps an overlay mounted for the render after `loading` turns false, so it
 * can play its hide transition (the source's `useRef(loading)` pattern).
 */
function useWasLoading(loading: boolean) {
  const previous = useRef(loading);
  // eslint-disable-next-line react-hooks/refs -- the source reads the previous value during render
  const mounted = loading || previous.current;
  useEffect(() => {
    previous.current = loading;
  }, [loading]);
  return mounted;
}

/**
 * Recommendation card (`E2`): photo with a favourite badge, title, optional
 * "Add to cart". While `loading` a skeleton covers it, its text lines
 * matching the title's line count; it fades out after `resolveDelayMs`.
 */
export function RecCard({
  product,
  loading = false,
  resolveDelayMs,
  cta = false,
}: {
  product: RecProduct;
  loading?: boolean;
  resolveDelayMs?: number;
  cta?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const lines = useLineCount(ref, ".ill-rec-card__title");
  const showOverlay = useWasLoading(loading);
  return (
    <article className={`ill-rec-card${cta ? " ill-rec-card--cta" : ""}`} ref={ref}>
      <div className="ill-rec-card__media">
        <div className="ill-rec-card__media-bleed">
          <Media src={product.image} alt={product.name} />
        </div>
        <div className="ill-rec-card__favorite" aria-hidden="true">
          <Icon name="favorite" />
        </div>
      </div>
      <div className="ill-rec-card__text">
        <p className="ill-rec-card__title">{product.name}</p>
      </div>
      {cta && <Button appearance="accent" label="Add to cart" />}
      {showOverlay && (
        <div
          className={`ill-rec-card__skeleton-overlay${loading ? "" : " ill-rec-card__skeleton-overlay--hidden"}`}
          style={resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : undefined}
        >
          <div className="ill-rec-card__media">
            <Skeleton width="100%" height="100%" radius={16} />
          </div>
          <div className="ill-rec-card__text-skeleton">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="ill-rec-card__text-skeleton-line">
                <Skeleton width={i === lines - 1 ? "60%" : "100%"} height={11} radius={4} />
              </div>
            ))}
          </div>
          {cta && <Skeleton height={30} radius={112.792} />}
        </div>
      )}
    </article>
  );
}

/** Square product thumbnail (`E`); corner radius scales with `size`. */
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

/** A photo the shopper attached: selected thumbnail with a "+" badge (`o0`). */
export function UploadAttachment({ src, alt, size = 64 }: { src?: ImageSource; alt: string; size?: number }) {
  return (
    <div className="ill-upload-attachment">
      <Thumbnail src={src} alt={alt} state="selected" size={size} />
      <div className="ill-upload-attachment__badge" aria-hidden="true">
        <Icon name="add" size={11} />
      </div>
    </div>
  );
}

/** Wraps content with a skeleton that covers it while `loading`, then fades out (`d0`). */
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
  const showOverlay = useWasLoading(loading);
  return (
    <div className={["sell-loading-frame", className].filter(Boolean).join(" ")}>
      {children}
      {showOverlay && (
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

const starFilled =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='9.02336'%20height='9.02336'%20viewBox='0%200%209.02336%209.02336'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='ILL/Primitive/Rating-Star'%3e%3cpath%20id='dyn:state:rating.star.1'%20d='M4.51168%200L5.70504%202.86917L8.80255%203.1175L6.44257%205.13907L7.16358%208.16171L4.51168%206.54194L1.85978%208.16171L2.58079%205.13907L0.220818%203.1175L3.31833%202.86917L4.51168%200Z'%20fill='%23F0AA3B'/%3e%3c/g%3e%3c/svg%3e";
const starEmpty =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='9.02336'%20height='9.02336'%20viewBox='0%200%209.02336%209.02336'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='ILL/Primitive/Rating-Star'%20opacity='0.24'%3e%3cpath%20id='dyn:state:rating.star.1'%20d='M4.51168%200L5.70504%202.86917L8.80255%203.1175L6.44257%205.13907L7.16358%208.16171L4.51168%206.54194L1.85978%208.16171L2.58079%205.13907L0.220818%203.1175L3.31833%202.86917L4.51168%200Z'%20fill='%23F0AA3B'/%3e%3c/g%3e%3c/svg%3e";

/** Five stars (rounded `value` filled) and the review count (`n2`). */
export function Rating({ value, count }: { value: number; count: ReactNode }) {
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

type ProductMetaProps = {
  brand?: string;
  title: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  ratingCount?: ReactNode;
};

/** Brand, title, price (and rating) in card or product-page density (`D2`). */
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

/** Large product thumbnail with its product-page details beside it (`U2`). */
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
