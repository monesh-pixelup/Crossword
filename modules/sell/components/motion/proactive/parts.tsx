"use client";

import type { StaticImageData } from "next/image";
import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import type { Beat, BeatState } from "../motion";
import { useBeats } from "../motion";
import { Button, ContentFade, Icon, Media } from "../primitives";
import { cartIcon, ratingStarOff, ratingStarOn } from "./artwork";

/*
 * Scene-local helpers of the proactive-message scenes (not part of the shared
 * layer): the framed page-with-widget canvas and the marketplace page drawn
 * behind the widget. Markup and class names match the source one-for-one so
 * scenes.css applies unchanged.
 */

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

/** Rounded product thumbnail (`E` in the scene chunk); the corner radius scales with `size`. */
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

/** Five stars (rounded `value` filled) and the review count (`n2`). */
export function Rating({ value, count }: { value: number; count: string }) {
  const filled = Math.round(value);
  return (
    <div className="ill-rating">
      <div className="ill-rating__stars">
        {Array.from({ length: 5 }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize
          <img key={i} src={i < filled ? ratingStarOn : ratingStarOff} alt="" width={9} height={9} />
        ))}
      </div>
      <span className="ill-rating__count">
        ({count})
      </span>
    </div>
  );
}

/** Brand + price row over the title (`D2`, card density, the only one these scenes use). */
export function ProductMeta({ brand, title, price }: { brand?: string; title: string; price?: string }) {
  return (
    <div className="ill-product-meta">
      <div className="ill-product-meta__row">
        {brand && <p className="ill-product-meta__brand">{brand}</p>}
        {price && <p className="ill-product-meta__price">{price}</p>}
      </div>
      <p className="ill-product-meta__title">{title}</p>
    </div>
  );
}

/** Browser window chrome: traffic-light dots and the address (or search) field (`N2`). */
export function BrowserChrome({ url, field = "address" }: { url: string; field?: "address" | "search" }) {
  return (
    <div className={`ill-browser-chrome ill-browser-chrome--${field}`}>
      <div className="ill-browser-chrome__dots">
        <span />
        <span />
        <span />
      </div>
      <div className="ill-browser-chrome__address">
        <Icon name={field === "search" ? "search" : "address"} />
        <span>{url}</span>
      </div>
    </div>
  );
}

export type MarketplaceProduct = {
  url: string;
  retailer: string;
  image: StaticImageData;
  thumbnails: StaticImageData[];
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
};

/**
 * The product page behind the widget (`Re`, `Pe`, `ts`). They share
 * everything but the title row (`title`, defaults to the plain title), the
 * price (`price`) and the block above the cart buttons (`details`).
 */
export function MarketplacePage({
  product,
  title,
  price,
  details,
}: {
  product: MarketplaceProduct;
  title?: ReactNode;
  price: ReactNode;
  details: ReactNode;
}) {
  return (
    <div className="ill-marketplace">
      <BrowserChrome url={product.url} />
      <div className="ill-marketplace__nav">
        <span className="ill-marketplace__logo">{product.retailer}</span>
        <div className="ill-marketplace__nav-links">
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize */}
        <img className="ill-marketplace__cart" src={cartIcon} alt="" aria-hidden="true" width={20} height={20} />
      </div>
      <div className="ill-marketplace__body">
        <div className="ill-marketplace__gallery">
          <div className="ill-marketplace__thumbnails">
            {product.thumbnails.map((src, i) => (
              <Thumbnail key={src.src} src={src} alt="" state={i === 0 ? "selected" : "default"} size={78.561} />
            ))}
          </div>
          <div className="ill-marketplace__gallery-main">
            <Media src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="ill-marketplace__info">
          <div className="ill-marketplace__info-top">
            <div className="ill-marketplace__brand-row">
              <span className="ill-marketplace__brand">{product.retailer}</span>
              <Icon name="caretDown" size={20} />
            </div>
            <div className="ill-marketplace__heading">
              {title ?? <p className="ill-marketplace__title">{product.title}</p>}
              <p className="ill-marketplace__subtitle">{product.subtitle}</p>
            </div>
            <Rating value={product.rating} count={product.ratingCount} />
            {price}
          </div>
          {details}
          <div className="ill-marketplace__actions">
            <Button appearance="primary" label="Add to Cart" />
            <Button appearance="secondary" label="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  );
}

type ComposerClip = { top: number; right: number; bottom: number; left: number; radius: number };

/**
 * The widget's grow-from-the-composer reveal (`Fe`). Measures where the
 * composer sits inside the panel and exposes it as `--sell-clip-*`, so the
 * collapsed state clips the panel down to the composer pill and `expanded`
 * opens the clip to the full panel (scenes.css `.sell-expand*`).
 */
export function ExpandPanel({ expanded, children }: { expanded: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<ComposerClip | null>(null);

  useLayoutEffect(() => {
    const panel = ref.current;
    const composer = panel?.querySelector(".ill-chat-composer");
    if (!panel || !composer) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const outer = panel.getBoundingClientRect();
      const inner = composer.getBoundingClientRect();
      setClip({
        top: inner.top - outer.top,
        right: outer.right - inner.right,
        bottom: outer.bottom - inner.bottom,
        left: inner.left - outer.left,
        radius: inner.height / 2,
      });
    };
    measure();
    document.fonts?.ready?.then(() => {
      measure();
      requestAnimationFrame(measure);
    });
    if (typeof ResizeObserver === "undefined") {
      return () => {
        disposed = true;
      };
    }
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);

  const style = clip
    ? ({
        "--sell-clip-top": `${clip.top}px`,
        "--sell-clip-right": `${clip.right}px`,
        "--sell-clip-bottom": `${clip.bottom}px`,
        "--sell-clip-left": `${clip.left}px`,
        "--sell-clip-radius": `${clip.radius}px`,
      } as CSSProperties)
    : undefined;
  return (
    <div
      ref={ref}
      className={cx("sell-expand", expanded && "sell-expand--expanded", !clip && "sell-expand--unmeasured")}
      style={style}
    >
      {children}
    </div>
  );
}

/** Native size of the framed canvas (`.ill-visual-canvas--framed`, border included). */
export const framedCanvasSize = { width: 1280, height: 509 };

/**
 * The proactive-message runner (`S2`): a product page (`background`, scaled
 * into a frame) under a bottom fade, with the widget docked at the bottom
 * centre. The widget starts as the composer pill and opens at beat `expand`;
 * it remounts (re-entering) each time the script restarts. `play` replaces
 * the source's in-view + focus gate.
 */
export function FramedCanvas({
  beats,
  play,
  background,
  children,
}: {
  beats: Beat[];
  play: boolean;
  background: ReactNode;
  children: (t: BeatState) => ReactNode;
}) {
  const t = useBeats(beats, play);
  return (
    <div className="ill-visual-canvas ill-visual-canvas--framed">
      <div className="ill-visual-canvas__background">{background}</div>
      <div className="ill-visual-canvas__fade">
        <ContentFade />
      </div>
      <div className="ill-visual-canvas__widget sell-widget-align-composer">
        <div key={t.runKey} className="sell-widget-enter">
          <ExpandPanel expanded={t.reached("expand")}>{children(t)}</ExpandPanel>
        </div>
      </div>
    </div>
  );
}
