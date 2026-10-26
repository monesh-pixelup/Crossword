"use client";

import Image, { type StaticImageData } from "next/image";
import { Fragment, type ReactNode, type Ref, useEffect, useRef, useState } from "react";
import backgroundTexture from "../../assets/motion/background-texture.webp";
import insightsBackground from "../../assets/motion/insights-background.webp";
import { iconSources, sceneFrameBackground, starEmpty, starFilled } from "./artwork";
import { useSkeleton } from "./motion";
import "./motion-visuals.css";

/*
 * Building blocks of the motion visuals, ported from the "Crossword Motion
 * Visuals" build. Markup and class names match the original one-for-one so
 * motion-visuals.css applies unchanged.
 */

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

/** Native icon sizes, from Figma. */
const iconSizes: Record<IconName, { width: number; height: number }> = {
  history: { width: 13.5696, height: 13.5696 },
  add: { width: 13.5696, height: 13.5696 },
  expand: { width: 13.5696, height: 13.5696 },
  close: { width: 13.5696, height: 13.5696 },
  send: { width: 20, height: 20 },
  favorite: { width: 10, height: 10 },
  insight: { width: 16.4468, height: 16.1409 },
  caretDown: { width: 12.1689, height: 12.1689 },
};

export type IconName = keyof typeof iconSources;

/** A Figma icon at its native size, or scaled so its width is `size`. */
export function Icon({ name, size }: { name: IconName; size?: number }) {
  const { width, height } = iconSizes[name];
  const scale = size ? size / width : 1;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize
    <img src={iconSources[name]} alt="" aria-hidden width={width * scale} height={height * scale} style={{ display: "block" }} />
  );
}

function IconButton({ icon, label, variant }: { icon: IconName; label: string; variant: "outline" | "accent" }) {
  return (
    <button type="button" className={`ill-icon-button ill-icon-button--${variant}`} aria-label={label}>
      <span className={icon === "send" ? "ill-icon-button__glyph--rotated" : undefined}>
        <Icon name={icon} size={variant === "accent" ? 20 : undefined} />
      </span>
    </button>
  );
}

function ChatHeader({ brand }: { brand: string }) {
  return (
    <div className="ill-chat-header">
      <div className="ill-chat-header__group">
        <IconButton icon="history" label="History" variant="outline" />
        <IconButton icon="add" label="New conversation" variant="outline" />
      </div>
      <div className="ill-chat-header__brand">{brand}</div>
      <div className="ill-chat-header__group">
        <IconButton icon="expand" label="Expand" variant="outline" />
        <IconButton icon="close" label="Close" variant="outline" />
      </div>
    </div>
  );
}

/** The message bar. Shows a stock prompt until the script types into it. */
export function Composer({ value = "Where’s my order?", typing = false }: { value?: string; typing?: boolean }) {
  return (
    <div className="ill-chat-composer">
      <span className="ill-chat-composer__text">
        {value}
        {typing && <span className="ill-chat-composer__caret" />}
      </span>
      <IconButton icon="send" label="Send" variant="accent" />
    </div>
  );
}

/** Scrolling conversation area, fading out above the composer. */
export function ConversationViewport({ ref, children }: { ref?: Ref<HTMLDivElement>; children: ReactNode }) {
  return (
    <div className="ill-conversation-viewport">
      <div className="ill-conversation-viewport__content" ref={ref}>
        {children}
      </div>
      <div className="ill-content-fade" aria-hidden />
    </div>
  );
}

/** The assistant window: header, conversation, composer. */
export function ChatShell({
  brand,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  children,
}: {
  brand: string;
  width: number;
  height: number;
  composerValue?: string;
  composerTyping?: boolean;
  viewportRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div className="ill-shell" style={{ width, height }}>
      <ChatHeader brand={brand} />
      <ConversationViewport ref={viewportRef}>{children}</ConversationViewport>
      <Composer value={composerValue} typing={composerTyping} />
    </div>
  );
}

export function Thread({ children }: { children: ReactNode }) {
  return <div className="ill-thread">{children}</div>;
}

export function UserTurn({
  animateIn = false,
  className,
  children,
}: {
  animateIn?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cx("ill-user-turn", animateIn && "ill-user-turn--enter", className)}>{children}</div>;
}

export function AssistantTurn({
  animateIn = false,
  className,
  children,
}: {
  animateIn?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("ill-assistant-turn", animateIn && "ill-assistant-turn--enter", className)}>{children}</div>
  );
}

export function ChatMessage({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
  return (
    <div className={`ill-chat-message ill-chat-message--${role}`}>
      <p>{children}</p>
    </div>
  );
}

export function ProductCollection({ children }: { children: ReactNode }) {
  return <div className="ill-product-collection">{children}</div>;
}

/**
 * A product photo filling its (positioned) frame. Served as-is: the files are
 * small WebPs already sized for retina, and re-encoding visibly softens them.
 */
export function Media({ src }: { src: StaticImageData }) {
  return <Image src={src} alt="" fill unoptimized loading="eager" className="ill-media" />;
}

export function Skeleton({
  width,
  height,
  aspectRatio,
  radius,
}: {
  width?: number | string;
  height?: number;
  aspectRatio?: string;
  radius?: number;
}) {
  return <div className="ill-skeleton-block" style={{ width, height, aspectRatio, borderRadius: radius }} />;
}

/** Wraps a card's skeleton: shown while loading, then blurred away after `delayMs`. */
function SkeletonOverlay({
  className,
  loading,
  delayMs,
  children,
}: {
  className: string;
  loading: boolean;
  delayMs?: number;
  children: ReactNode;
}) {
  const { mounted, hidden } = useSkeleton(loading);
  if (!mounted) return null;
  return (
    <div
      className={cx(className, hidden && `${className}--hidden`)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export type RecProduct = { id: string; name: string; image: StaticImageData };

/** Recommendation card: photo and name. */
export function RecCard({
  product,
  loading = false,
  resolveDelayMs,
}: {
  product: RecProduct;
  loading?: boolean;
  resolveDelayMs?: number;
}) {
  return (
    <div className="ill-rec-card">
      <div className="ill-rec-card__media">
        <div className="ill-rec-card__media-bleed">
          <Media src={product.image} />
        </div>
        <div className="ill-rec-card__favorite" aria-hidden>
          <Icon name="favorite" />
        </div>
      </div>
      <div className="ill-rec-card__text">
        <p className="ill-rec-card__title">{product.name}</p>
      </div>
      <SkeletonOverlay className="ill-rec-card__skeleton-overlay" loading={loading} delayMs={resolveDelayMs}>
        <div className="ill-rec-card__media">
          <Skeleton height={149} radius={16} />
        </div>
        <div className="ill-rec-card__text-skeleton">
          <Skeleton width="60%" height={11} radius={4} />
        </div>
      </SkeletonOverlay>
    </div>
  );
}

/** A photo the shopper attached, with the "+" badge. */
export function UploadAttachment({ src, size = 64 }: { src: StaticImageData; size?: number }) {
  return (
    <div className="ill-upload-attachment">
      <div
        className="ill-thumbnail ill-thumbnail--selected"
        style={{ width: size, height: size, borderRadius: size * 0.1482 }}
      >
        <Media src={src} />
      </div>
      <div className="ill-upload-attachment__badge" aria-hidden>
        <Icon name="add" size={11} />
      </div>
    </div>
  );
}

/** Product chip a reply refers to: thumbnail, brand, title, price. */
export function ProductReference({
  image,
  brand,
  title,
  price,
}: {
  image: StaticImageData;
  brand: string;
  title: string;
  price: string;
}) {
  return (
    <div className="ill-product-reference">
      <div className="ill-product-reference__media">
        <Media src={image} />
      </div>
      <div className="ill-product-reference__text">
        <p className="ill-product-reference__brand">{brand}</p>
        <p className="ill-product-reference__title">{title}</p>
        <p className="ill-product-reference__price">{price}</p>
      </div>
    </div>
  );
}

function Rating({ value, count }: { value: number; count: string }) {
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

export type CommerceProduct = {
  id: string;
  title: string;
  brand: string;
  price: string;
  rating: number;
  ratingCount: string;
  tag?: string;
  image: StaticImageData;
};

/** Shoppable card: photo, brand, price, title, rating and add-to-cart. */
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
  return (
    <div className="ill-commerce-card">
      <div className="ill-commerce-card__content">
        <div className="ill-commerce-card__media">
          <Media src={product.image} />
          {product.tag && <span className="ill-commerce-card__tag">{product.tag}</span>}
        </div>
        <div className="ill-product-meta">
          <div className="ill-product-meta__row">
            <p className="ill-product-meta__brand">{product.brand}</p>
            <p className="ill-product-meta__price">{product.price}</p>
          </div>
          <p className="ill-product-meta__title">{product.title}</p>
          <Rating value={product.rating} count={product.ratingCount} />
        </div>
      </div>
      <button type="button" className="ill-commerce-card__cta" disabled={added}>
        {added ? "Added to cart" : "Add to cart"}
      </button>
      <SkeletonOverlay className="ill-commerce-card__skeleton-overlay" loading={loading} delayMs={resolveDelayMs}>
        <div className="ill-commerce-card__content">
          <div className="ill-commerce-card__media">
            <Skeleton aspectRatio="257 / 147.758" radius={15.791} />
          </div>
          <div className="ill-commerce-card__meta-skeleton">
            <Skeleton width="70%" height={11} radius={4} />
            <Skeleton width="40%" height={9} radius={4} />
          </div>
        </div>
        <div className="ill-commerce-card__cta-skeleton">
          <Skeleton height={30.791} radius={112.792} />
        </div>
      </SkeletonOverlay>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="ill-chip">{children}</span>;
}

export function Button({ appearance, label }: { appearance: "primary" | "secondary" | "accent"; label: string }) {
  return (
    <button type="button" className={`ill-button ill-button--${appearance}`}>
      {label}
    </button>
  );
}

export function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ill-attribute-row">
      <span className="ill-attribute-row__label">{label}</span>
      <span className="ill-attribute-row__value">{value}</span>
    </div>
  );
}

function StackedCardFace({
  image,
  brand,
  title,
  price,
  cta,
}: {
  image: StaticImageData;
  brand: string;
  title: string;
  price: string;
  cta: string;
}) {
  return (
    <>
      <div className="ill-commerce-stacked__media">
        <Media src={image} />
        <div className="ill-commerce-stacked__favorite">
          <Icon name="favorite" />
        </div>
      </div>
      <div className="ill-commerce-stacked__text">
        <div className="ill-commerce-stacked__row">
          <p className="ill-commerce-stacked__brand">{brand}</p>
          <p className="ill-commerce-stacked__price">{price}</p>
        </div>
        <p className="ill-commerce-stacked__title">{title}</p>
      </div>
      <Button appearance="accent" label={cta} />
    </>
  );
}

/** A product card fanned over a tilted copy of itself, as a bundle. */
export function CommerceStacked({
  image,
  brand,
  title,
  price,
  cta = "Add to cart",
  loading = false,
}: {
  image: StaticImageData;
  brand: string;
  title: string;
  price: string;
  cta?: string;
  loading?: boolean;
}) {
  const face = { image, brand, title, price, cta };
  return (
    <div className="ill-commerce-stacked">
      <div className="ill-commerce-stacked__card ill-commerce-stacked__card--back" aria-hidden>
        <StackedCardFace {...face} />
      </div>
      <div className="ill-commerce-stacked__card ill-commerce-stacked__card--front">
        <StackedCardFace {...face} />
        <SkeletonOverlay className="ill-commerce-stacked__skeleton-overlay" loading={loading}>
          <div className="ill-commerce-stacked__media">
            <Skeleton height={148} radius={16} />
          </div>
          <div className="ill-commerce-stacked__meta-skeleton">
            <div className="ill-commerce-stacked__row">
              <Skeleton width="35%" height={9} radius={4} />
              <Skeleton width="18%" height={10} radius={4} />
            </div>
            <Skeleton width="65%" height={10} radius={4} />
          </div>
          <Skeleton height={30} radius={112.792} />
        </SkeletonOverlay>
      </div>
    </div>
  );
}

/** Suggested follow-ups; the chosen one is highlighted. */
export function AiPills({ options, selectedId }: { options: { id: string; text: string }[]; selectedId: string }) {
  return (
    <div className="ill-ai-pills">
      {options.map((option) => (
        <div key={option.id} className={cx("ill-ai-pill", option.id === selectedId && "ill-ai-pill--selected")}>
          <Icon name="insight" size={16} />
          <span>{option.text}</span>
        </div>
      ))}
    </div>
  );
}

const statusStroke = { strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" } as const;

/** The assistant's "thinking" glyph: blooms, spins and pulses on a 3s loop. */
function AiStatusIcon() {
  return (
    <svg className="ill-ai-status-icon" width="16" height="16" viewBox="0 0 10.0015 10.0015" fill="none" aria-hidden>
      <g className="ill-ai-status-icon__shape">
        <g className="ill-ai-status-icon__spokes">
          <path d="M5.16982 1.36618e-08L5.16982 3.58808" {...statusStroke} />
          <path d="M5.16982 6.41338L5.16982 10.0015" {...statusStroke} />
          <path d="M10.0015 4.87603L6.48029 4.87603" {...statusStroke} />
          <path d="M3.52148 4.87603L0.000305653 4.87603" {...statusStroke} />
        </g>
        <g className="ill-ai-status-icon__ticks">
          <path d="M3.76818 3.63487L2.62108 2.48778" strokeLinecap="round" {...statusStroke} />
          <path d="M7.56878 7.45211L6.42169 6.30502" strokeLinecap="round" {...statusStroke} />
          <path d="M6.41942 3.6349L7.56651 2.48781" strokeLinecap="round" {...statusStroke} />
          <path d="M2.62359 7.4521L3.77069 6.30501" strokeLinecap="round" {...statusStroke} />
        </g>
        <rect
          className="ill-ai-status-icon__center"
          x="4.40987"
          y="4.27743"
          width="1.40034"
          height="1.40034"
          fill="#462160"
        />
      </g>
    </svg>
  );
}

/** "Thinking…" status line; a new label cross-fades over the previous one. */
export function AiStatus({ label, visible = true, icon }: { label: string; visible?: boolean; icon?: ReactNode }) {
  const [current, setCurrent] = useState(label);
  const [previous, setPrevious] = useState<string | null>(null);
  const currentRef = useRef(current);

  useEffect(() => {
    if (label === currentRef.current) return;
    setPrevious(currentRef.current);
    setCurrent(label);
    currentRef.current = label;
  }, [label]);

  return (
    <div className={cx("ill-ai-status", !visible && "ill-ai-status--hidden")}>
      {icon ?? <AiStatusIcon />}
      <span className="ill-ai-status__label-stack">
        {previous && previous !== current && (
          <span className="ill-ai-status__label ill-ai-status__label--exiting" aria-hidden>
            {previous}
          </span>
        )}
        <span key={current} className="ill-ai-status__label">
          {current}
        </span>
      </span>
    </div>
  );
}

/** Reveals a reply word by word, 45ms apart; `boldText` follows in bold. */
export function StaggerText({ text, boldText }: { text: string; boldText?: string }) {
  const plain = text.split(/\s+/).filter(Boolean);
  const bold = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return (
    <>
      {plain.map((word, i) => (
        <Fragment key={`plain-${i}`}>
          <span className="ill-stagger-text__word" style={{ animationDelay: `${i * 45}ms` }}>
            {word}
          </span>
          {i < plain.length - 1 || bold.length ? " " : ""}
        </Fragment>
      ))}
      {bold.map((word, i) => (
        <Fragment key={`bold-${i}`}>
          <strong className="ill-stagger-text__word" style={{ animationDelay: `${(plain.length + i) * 45}ms` }}>
            {word}
          </strong>
          {i < bold.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

/** Maroon damask panel the Lifecycle visuals sit in (738 × 680). */
export function SceneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ill-root ill-scene-frame">
      {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize */}
      <img className="ill-scene-frame__background" src={sceneFrameBackground} alt="" />
      <Image src={backgroundTexture} alt="" sizes="712px" className="ill-scene-frame__texture" />
      <div className="ill-scene-frame__content">{children}</div>
    </div>
  );
}

/** Front-desk photo the Insights visuals sit on (738 × 640). */
export function InsightFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ill-root ill-insight-frame">
      <Image src={insightsBackground} alt="" sizes="738px" className="ill-insight-frame__background" />
      <div className="ill-insight-frame__content">{children}</div>
    </div>
  );
}
