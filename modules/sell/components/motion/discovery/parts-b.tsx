"use client";

import type { StaticImageData } from "next/image";
import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Chip, Icon, Media, Skeleton } from "../primitives";

/*
 * Scene-local building blocks used by the second group of discovery scenes
 * (guided finder, visual discovery, size & fit, gift finder). Ported from the
 * scene chunk of the "Sell: Conversational Interface — Motion" build; markup
 * and class names match the original so scenes.css applies unchanged.
 * Minified names: d2 ProductCollection, c0 useLineCount, E2 RecCard,
 * E Thumbnail, o0 UploadAttachment, O2 QuizRow, n2 Rating, D2 ProductMeta,
 * k2 CommerceCard.
 */

/** A horizontal row of product cards. */
export function ProductCollection({ children }: { children: ReactNode }) {
  return <div className="ill-product-collection">{children}</div>;
}

/**
 * How many lines the element matching `selector` inside `ref` wraps onto
 * (at least 1, at most `max`), kept current as it resizes. The card
 * skeletons draw one placeholder bar per line of the real title.
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
 * Keeps a skeleton overlay mounted from the first render it was `loading`
 * on, so it can fade out (the `--hidden` transition) once loading ends.
 */
function useWasLoading(loading: boolean) {
  const wasLoading = useRef(loading);
  const show = loading || wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  return show;
}

export type RecProduct = { id: string; name: string; image: StaticImageData | string };

/**
 * Recommendation tile: bled photo, favourite badge, title (and an optional
 * "Add to cart"). While `loading`, a skeleton covers it, then fades out after
 * `resolveDelayMs`.
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
  const titleLines = useLineCount(ref, ".ill-rec-card__title");
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
            {Array.from({ length: titleLines }, (_, i) => (
              <div className="ill-rec-card__text-skeleton-line" key={i}>
                <Skeleton width={i === titleLines - 1 ? "60%" : "100%"} height={11} radius={4} />
              </div>
            ))}
          </div>
          {cta && <Skeleton height={30} radius={112.792} />}
        </div>
      )}
    </article>
  );
}

/** Square photo with rounded corners scaled to its size; `selected` adds the ring. */
export function Thumbnail({
  src,
  alt,
  state = "default",
  size = 56,
}: {
  src?: StaticImageData | string;
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

/** A photo the shopper attached: selected thumbnail with a "+" badge. */
export function UploadAttachment({ src, alt, size = 64 }: { src?: StaticImageData | string; alt: string; size?: number }) {
  return (
    <div className="ill-upload-attachment">
      <Thumbnail src={src} alt={alt} state="selected" size={size} />
      <div className="ill-upload-attachment__badge" aria-hidden="true">
        <Icon name="add" size={11} />
      </div>
    </div>
  );
}

/** One quiz question with its options; the chosen `answer` is an action chip. */
export function QuizRow({ question, options, answer }: { question: string; options: string[]; answer: string }) {
  return (
    <div className="ill-quiz-row">
      <p className="ill-quiz-row__question">{question}</p>
      <div className="ill-quiz-row__options">
        {options.map((option) =>
          option === answer ? (
            <Chip kind="action" key={option}>
              {option}
            </Chip>
          ) : (
            <Chip key={option}>{option}</Chip>
          ),
        )}
      </div>
    </div>
  );
}

const starFilled =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='9.02336'%20height='9.02336'%20viewBox='0%200%209.02336%209.02336'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='ILL/Primitive/Rating-Star'%3e%3cpath%20id='dyn:state:rating.star.1'%20d='M4.51168%200L5.70504%202.86917L8.80255%203.1175L6.44257%205.13907L7.16358%208.16171L4.51168%206.54194L1.85978%208.16171L2.58079%205.13907L0.220818%203.1175L3.31833%202.86917L4.51168%200Z'%20fill='%23F0AA3B'/%3e%3c/g%3e%3c/svg%3e";
const starEmpty =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='9.02336'%20height='9.02336'%20viewBox='0%200%209.02336%209.02336'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='ILL/Primitive/Rating-Star'%20opacity='0.24'%3e%3cpath%20id='dyn:state:rating.star.1'%20d='M4.51168%200L5.70504%202.86917L8.80255%203.1175L6.44257%205.13907L7.16358%208.16171L4.51168%206.54194L1.85978%208.16171L2.58079%205.13907L0.220818%203.1175L3.31833%202.86917L4.51168%200Z'%20fill='%23F0AA3B'/%3e%3c/g%3e%3c/svg%3e";

/** Five stars (`value` rounded) and the review count in brackets. */
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

/**
 * Brand, price, title and rating. `card` is the compact layout under a card
 * photo; `pdp` the product-page header (brand with a caret, larger title).
 */
export function ProductMeta({
  brand,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  density = "card",
}: {
  brand?: string;
  title: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  ratingCount?: string;
  density?: "card" | "pdp";
}) {
  if (density === "pdp") {
    return (
      <div className="ill-product-meta ill-product-meta--pdp">
        <div className="ill-product-meta__pdp-top">
          {brand && <p className="ill-product-meta__brand-pdp">{brand}</p>}
          <Icon name="caretDown" />
        </div>
        <p className="ill-product-meta__title-pdp">{title}</p>
        {subtitle && <p className="ill-product-meta__subtitle">{subtitle}</p>}
        {rating !== undefined && ratingCount && <Rating value={rating} count={ratingCount} />}
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
      {rating !== undefined && ratingCount && <Rating value={rating} count={ratingCount} />}
    </div>
  );
}

export type CommerceProduct = {
  id: string;
  image: StaticImageData | string;
  brand?: string;
  title: string;
  price?: string;
  rating?: number;
  ratingCount?: string;
  tag?: string;
};

/**
 * Shoppable product card: photo (optional tag), meta and "Add to cart". While
 * `loading`, a skeleton (title bars matching its wrapped lines, up to two)
 * covers it, then fades out after `resolveDelayMs`.
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
  const ref = useRef<HTMLElement>(null);
  const titleLines = useLineCount(ref, ".ill-product-meta__title", 2);
  const showOverlay = useWasLoading(loading);
  return (
    <article className="ill-commerce-card" ref={ref}>
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
            <Skeleton aspectRatio="257 / 147.758" radius={16} />
            <div className="ill-commerce-card__meta-skeleton">
              <div className="ill-commerce-card__meta-skeleton-row ill-commerce-card__meta-skeleton-row--split">
                <Skeleton width={40} height={9} radius={4} />
                <Skeleton width={20} height={9} radius={4} />
              </div>
              <div>
                {Array.from({ length: titleLines }, (_, i) => (
                  <div className="ill-commerce-card__meta-skeleton-row" key={i}>
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
