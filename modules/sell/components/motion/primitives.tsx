"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, Fragment, type ReactNode, type Ref, useEffect, useRef, useState } from "react";
import { type IconName, iconSizes, iconSources } from "./artwork";
import type { BeatState } from "./motion";
import { productCutouts } from "./products";
import "./shared.css";
// The scenes' own rules, after the shared ones as in the source build.
import "./scenes.css";

/*
 * The shared building blocks of the Sell motion visuals, ported from the
 * "Sell: Conversational Interface — Motion" build. Markup and class names
 * match the original one-for-one so shared.css applies unchanged. Everything
 * must render inside <MotionRoot>, which scopes that CSS.
 */

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

/** Scope for shared.css (and the scenes' CSS): the `.ill-sell` wrapper with the design tokens. */
export function MotionRoot({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("ill-sell", className)}>{children}</div>;
}

/** A Figma icon at its native size, or scaled so its width is `size`. */
export function Icon({ name, size }: { name: IconName; size?: number }) {
  const { width, height } = iconSizes[name];
  const scale = size ? size / width : 1;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize
    <img
      src={iconSources[name]}
      alt=""
      aria-hidden="true"
      width={width * scale}
      height={height * scale}
      style={{ display: "block" }}
    />
  );
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

/** A chat bubble. `children` wins over `text`. */
export function ChatMessage({
  role,
  text,
  children,
}: {
  role: "user" | "assistant";
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`ill-chat-message ill-chat-message--${role}`}>
      <p>{children ?? text}</p>
    </div>
  );
}

export type InsightFooter = { label: string; icon?: IconName };

/**
 * The "Thinking" insight note: source label (plus an optional suffix after a
 * dot) and the lines it noticed. With an `attribution` or `footer` it stacks
 * into a card; the attribution sits on its own line above the lines.
 */
export function InsightCard({
  source = "Thinking",
  sourceSuffix,
  lines,
  attribution,
  footer,
}: {
  source?: string;
  sourceSuffix?: string;
  lines: string[];
  attribution?: string;
  footer?: InsightFooter;
}) {
  const stacked = Boolean(attribution || footer);
  return (
    <div className={cx("ill-insight", stacked && "ill-insight--stacked")}>
      <div className="ill-insight__source">
        <Icon name="insight" />
        <p className="ill-insight__source-label">{source}</p>
        {sourceSuffix && (
          <>
            <Icon name="sourceDot" />
            <p className="ill-insight__source-label">{sourceSuffix}</p>
          </>
        )}
      </div>
      <p className="ill-insight__body">{attribution ? `${attribution}\n${lines.join(" ")}` : lines.join(" ")}</p>
      {footer && (
        <div className="ill-insight__footer">
          <div className="ill-insight__footer-status">
            <Icon name={footer.icon ?? "checks"} />
            <p className="ill-insight__body">{footer.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * A photo filling its frame (`.ill-media` is 100% × 100%, cover). The shared
 * product cutouts (products.ts) are letterboxed instead (`--cutout`). No
 * `src` draws the placeholder fill. Served as-is, like the source; pass
 * `sizes` to let Next resize and re-encode it instead.
 */
export function Media({ src, alt, sizes }: { src?: StaticImageData | string; alt: string; sizes?: string }) {
  if (!src) return <div className="ill-media ill-media--placeholder" role="img" aria-label={alt} />;
  const className = cx("ill-media", typeof src !== "string" && productCutouts.has(src) && "ill-media--cutout");
  if (typeof src === "string") {
    // eslint-disable-next-line @next/next/no-img-element -- inline data / external URL, nothing to optimize
    return <img className={className} src={src} alt={alt} />;
  }
  return <Image className={className} src={src} alt={alt} sizes={sizes} unoptimized={!sizes} loading="eager" />;
}

export type ButtonAppearance = "primary" | "secondary" | "accent" | "ghost";

export function Button({
  appearance,
  label,
  onClick,
  iconLeading,
  iconTrailing,
}: {
  appearance: ButtonAppearance;
  label: ReactNode;
  onClick?: () => void;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
}) {
  return (
    <button type="button" className={`ill-button ill-button--${appearance}`} onClick={onClick}>
      {iconLeading}
      {label}
      {iconTrailing}
    </button>
  );
}

/** Shimmering placeholder block. */
export function Skeleton({
  width,
  height,
  aspectRatio,
  radius,
}: {
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  radius?: number | string;
}) {
  return <div className="ill-skeleton-block" style={{ width, height, aspectRatio, borderRadius: radius }} />;
}

export type IconButtonVariant = "outline" | "outline-md" | "accent" | "accent-sm";

/** Round icon button. Send glyphs are rotated to point up; `accent` draws its icon at 20px. */
export function IconButton({
  icon,
  label,
  variant,
  onClick,
  className,
}: {
  icon: IconName;
  label: string;
  variant: IconButtonVariant;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cx("ill-icon-button", `ill-icon-button--${variant}`, className)}
      aria-label={label}
      onClick={onClick}
    >
      <span className={icon === "send" || icon === "sendGold" ? "ill-icon-button__glyph--rotated" : undefined}>
        <Icon name={icon} size={variant === "accent" ? 20 : undefined} />
      </span>
    </button>
  );
}

/** History / new chat · brand pill · expand / close. */
export function ChatHeader({
  brand,
  showHistory = true,
  showAdd = true,
  showExpand = true,
  showClose = true,
  onClose,
}: {
  brand: ReactNode;
  showHistory?: boolean;
  showAdd?: boolean;
  showExpand?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}) {
  return (
    <header className="ill-chat-header">
      {(showHistory || showAdd) && (
        <div className="ill-chat-header__group">
          {showHistory && <IconButton icon="history" label="History" variant="outline" />}
          {showAdd && <IconButton icon="add" label="New conversation" variant="outline" />}
        </div>
      )}
      <div className="ill-chat-header__brand">{brand}</div>
      <div className="ill-chat-header__group">
        {showExpand && <IconButton icon="expand" label="Expand" variant="outline" />}
        {showClose && <IconButton icon="close" label="Close" variant="outline" onClick={onClose} />}
      </div>
    </header>
  );
}

/**
 * The message bar. Shows `value` (a stock prompt by default), with a blinking
 * caret while `typing`. `expanded` is the tall card variant with an upload
 * row and gold send button; it can be hidden (fades down) and show `sending`.
 */
export function Composer({
  value = "Ask anything...",
  typing = false,
  variant = "default",
  visible = true,
  sending = false,
}: {
  value?: ReactNode;
  typing?: boolean;
  variant?: "default" | "expanded";
  visible?: boolean;
  sending?: boolean;
}) {
  if (variant === "expanded") {
    return (
      <div className={`ill-chat-composer--expanded${visible ? "" : " ill-chat-composer--expanded--hidden"}`}>
        <p className="ill-chat-composer--expanded__text">
          {value}
          {typing && <span className="ill-chat-composer__caret" />}
        </p>
        <div className="ill-chat-composer--expanded__row">
          <span className="ill-chat-composer--expanded__upload">
            <Icon name="addMuted" size={18} />
            Upload file
          </span>
          <IconButton
            icon="sendGold"
            label="Send"
            variant="accent"
            className={sending ? "ill-icon-button--pressed" : undefined}
          />
        </div>
      </div>
    );
  }
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

/** The fade at the bottom of the conversation, above the composer. */
export function ContentFade() {
  return <div className="ill-content-fade" aria-hidden="true" />;
}

/** Scrolling conversation area; `ref` is the scroller. */
export function ConversationViewport({ ref, children }: { ref?: Ref<HTMLDivElement>; children: ReactNode }) {
  return (
    <div className="ill-conversation-viewport">
      <div className="ill-conversation-viewport__content" ref={ref}>
        {children}
      </div>
      <ContentFade />
    </div>
  );
}

/**
 * The assistant window: header, conversation, composer (450 × 500 by default;
 * `width` and `height` override it only when both are given). `header` and
 * `composer` replace the stock ones.
 */
export function ChatShell({
  brand,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  rootRef,
  header,
  composer,
  className,
  children,
}: {
  brand?: ReactNode;
  width?: number | string;
  height?: number | string;
  composerValue?: string;
  composerTyping?: boolean;
  viewportRef?: Ref<HTMLDivElement>;
  rootRef?: Ref<HTMLDivElement>;
  header?: ReactNode;
  composer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("ill-shell", className)} style={width && height ? { width, height } : undefined} ref={rootRef}>
      {header ?? <ChatHeader brand={brand} />}
      <ConversationViewport ref={viewportRef}>{children}</ConversationViewport>
      {composer ?? <Composer value={composerValue} typing={composerTyping} />}
    </div>
  );
}

/** The turns of a conversation, 40px apart. */
export function Thread({ children }: { children: ReactNode }) {
  return <div className="ill-thread">{children}</div>;
}

const statusStroke = { strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" } as const;

/** The assistant's "thinking" glyph: blooms, spins and pulses on a 3s loop. */
export function AiStatusIcon() {
  return (
    <svg
      className="ill-ai-status-icon"
      width="16"
      height="16"
      viewBox="0 0 10.0015 10.0015"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <div className={`ill-ai-status${visible ? "" : " ill-ai-status--hidden"}`}>
      {icon ?? <AiStatusIcon />}
      <span className="ill-ai-status__label-stack">
        {previous && previous !== current && (
          <span className="ill-ai-status__label ill-ai-status__label--exiting" aria-hidden="true">
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

const wordDelay = (index: number): CSSProperties => ({ animationDelay: `${index * 45}ms` });

/** Reveals text word by word, 45ms apart; `boldText` follows in bold. */
export function StaggerText({ text, boldText }: { text: string; boldText?: string }) {
  const plain = text.split(/\s+/).filter(Boolean);
  const bold = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return (
    <>
      {plain.map((word, i) => (
        <Fragment key={`plain-${i}`}>
          <span className="ill-stagger-text__word" style={wordDelay(i)}>
            {word}
          </span>
          {i < plain.length - 1 || bold.length ? " " : ""}
        </Fragment>
      ))}
      {bold.map((word, i) => (
        <Fragment key={`bold-${i}`}>
          <strong className="ill-stagger-text__word" style={wordDelay(plain.length + i)}>
            {word}
          </strong>
          {i < bold.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

type Token = { text: string; bold: boolean; wordIndex: number; spaceBefore: boolean };

/**
 * Splits `**bold**`-marked text into pieces that keep their word's stagger
 * index, so a word split by a marker ("**$129**,") still lands as one.
 */
function tokenize(text: string) {
  const tokens: Token[] = [];
  let wordIndex = -1;
  let afterSpace = true;
  text.split("**").forEach((segment, segmentIndex) => {
    segment.split(/(\s+)/).forEach((piece) => {
      if (!piece) return;
      if (/^\s+$/.test(piece)) {
        afterSpace = true;
        return;
      }
      if (afterSpace) wordIndex += 1;
      tokens.push({ text: piece, bold: segmentIndex % 2 === 1, wordIndex, spaceBefore: afterSpace && tokens.length > 0 });
      afterSpace = false;
    });
  });
  return tokens;
}

/** StaggerText that understands inline `**bold**` markers anywhere in `text`. */
export function RichStaggerText({ text }: { text: string }) {
  if (!text.includes("**")) return <StaggerText text={text} />;
  return (
    <>
      {tokenize(text).map((token, i) => {
        const Tag = token.bold ? "strong" : "span";
        return (
          <Fragment key={i}>
            {token.spaceBefore ? " " : ""}
            <Tag className="ill-stagger-text__word" style={wordDelay(token.wordIndex)}>
              {token.text}
            </Tag>
          </Fragment>
        );
      })}
    </>
  );
}

/** Enters like a turn (rise + unblur), optionally after `delayMs`. */
export function EnterDelayed({ delayMs, children }: { delayMs?: number; children: ReactNode }) {
  return (
    <div className="ill-assistant-turn--enter" style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}>
      {children}
    </div>
  );
}

/** The status line for think beat `id`, while it plays. */
export function ThinkingStatus({ t, id }: { t: BeatState; id: string }) {
  const status = t.status(id);
  return status ? <AiStatus label={status.label} visible={status.visible} /> : null;
}

/** An assistant bubble whose text staggers in (`**bold**` supported). */
export function AssistantReply({ text }: { text: string }) {
  return (
    <ChatMessage role="assistant">
      <RichStaggerText text={text} />
    </ChatMessage>
  );
}

/**
 * Status, then reply, in a box already sized to the finished reply (an
 * invisible copy holds the space), so nothing below jumps as it lands.
 */
export function ReservedReply({
  t,
  text,
  thinkId,
  replyId,
}: {
  t: BeatState;
  text: string;
  thinkId: string;
  replyId: string;
}) {
  return (
    <div className="sell-reserve">
      <div className="sell-hidden" aria-hidden="true">
        <ChatMessage role="assistant" text={text} />
      </div>
      <div className="sell-reserve__live">
        <ThinkingStatus t={t} id={thinkId} />
        {t.reached(replyId) && <AssistantReply text={text} />}
      </div>
    </div>
  );
}

/** Keeps its space while hidden; enters like a turn once `show`. */
export function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div className={show ? "ill-assistant-turn--enter" : "sell-hidden"} aria-hidden={!show}>
      {children}
    </div>
  );
}

/** A row inside a `.sell-expand` panel; enters 70ms after the previous one (`index`). */
export function ExpandItem({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="sell-expand-item" style={{ "--sell-i": index } as CSSProperties}>
      {children}
    </div>
  );
}

/** Product chip a message refers to: thumbnail, brand, title, price. */
export function ProductReference({
  image,
  alt,
  brand,
  title,
  price,
}: {
  image?: StaticImageData | string;
  alt: string;
  brand?: string;
  title: string;
  price?: string;
}) {
  return (
    <div className="ill-product-reference">
      <div className="ill-product-reference__media">
        <Media src={image} alt={alt} />
      </div>
      <div className="ill-product-reference__text">
        {brand && <p className="ill-product-reference__brand">{brand}</p>}
        <p className="ill-product-reference__title">{title}</p>
        {price && <p className="ill-product-reference__price">{price}</p>}
      </div>
    </div>
  );
}

export function Chip({
  kind = "label",
  size = "md",
  tone = "primary",
  children,
}: {
  kind?: "label" | "discount" | "action";
  size?: "md" | "sm";
  tone?: "primary" | "gold";
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "ill-chip",
        kind === "discount" && "ill-chip--discount",
        kind === "action" && `ill-chip--action ill-chip--action-${tone}`,
        size === "sm" && "ill-chip--sm",
      )}
    >
      {children}
    </span>
  );
}

export function AttributeRow({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="ill-attribute-row">
      <span className="ill-attribute-row__label">{label}</span>
      <span className="ill-attribute-row__value">{value}</span>
    </div>
  );
}
