import { useRef } from "react";
import wallpaperImage from "../../../../assets/motion/scenarios/channel-deployment/wa/wallpaper.png";
import cameraImage from "../../../../assets/motion/scenarios/channel-deployment/wa/camera.svg";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { Media } from "../../components/ill/Media";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat, type Timeline } from "../SellMotion/useChatTimeline";
import { useRunFlip } from "./useRunFlip";
import { BACKDROP_SIZES, sceneImage } from "../../scene-image";

const wallpaper = wallpaperImage.src;
const camera = cameraImage.src;

// The iOS WhatsApp business chat shared by the WhatsApp b-variants (02b's
// shell and motion, generalised). A scenario passes its beats, the beat
// ids that each add a message (for the run's FLIP), the beat that ends
// "typing…", and renders its messages against the timeline.
export function WhatsAppChat({
  brand,
  beats,
  arrivals,
  typingUntil,
  children,
}: {
  brand: string;
  beats: Beat[];
  arrivals: string[];
  typingUntil: string;
  children: (t: Timeline) => React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(rootRef));
  const typing = t.passed("lead") && !t.reached(typingUntil);
  const runRef = useRunFlip(arrivals.filter((id) => t.reached(id)).length, t.runKey);

  return (
    <ConversionAssistanceFrame>
      <div className="ill-outbound ill-wa2" ref={rootRef}>
        <div className="ill-channel-shell ill-wa2__shell ill-outbound__shell">
          <img className="ill-wa2__wallpaper" {...sceneImage(wallpaper, BACKDROP_SIZES)} alt="" aria-hidden="true" />
          <header className="ill-wa2__header">
            <span className="ill-wa2__back" aria-hidden="true">
              <svg viewBox="0 0 12 20" width="12" height="20">
                <path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <BrandMark brand={brand} className="ill-wa2__avatar" />
            <div className="ill-wa2__who">
              <p className="ill-wa2__name">
                <BrandName brand={brand} className="ill-wa2__brand-name" />
                <svg className="ill-wa2__verified" viewBox="0 0 12.24 12.24" width="12.24" height="12.24" aria-hidden="true">
                  <path d="M6.18 0 5.06 1.05 3.31.68l-.69 1.55-1.5.37.19 1.67L0 5.44l.94 1.3-.5 1.48 1.43.93.19 1.6h1.81L5 12.24l1.18-.99 1.5.87.87-1.36h1.69l.25-1.61 1.44-.93-.56-1.48.87-1.3-1.19-1.17.13-1.68-1.37-.37L8.99.68 7.37 1.05Z" fill="#0866FF" />
                  <path d="m4.06 6-.63.74 2.13 1.94 3.56-4.31-.81-.69-2.94 3.5Z" fill="#fff" />
                </svg>
              </p>
              <p className="ill-wa2__status">
                <span className={typing ? "is-off" : undefined}>Business account</span>
                <span className={typing ? undefined : "is-off"}>typing…</span>
              </p>
            </div>
            <span className="ill-wa2__action" aria-hidden="true">
              <svg viewBox="0 0 26 18" width="26" height="18">
                <rect x="1" y="2" width="16" height="14" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="m18.5 7 5.2-3.2c.5-.3 1.1 0 1.1.6v9.2c0 .6-.6.9-1.1.6L18.5 11Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="ill-wa2__action" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="20" height="20">
                <path d="M5.2 1.8 7.6 5c.4.5.3 1.2-.1 1.6L6 8.1c1.1 2.4 3.4 4.8 5.9 5.9l1.5-1.5c.4-.4 1.1-.5 1.6-.1l3.2 2.4c.6.4.7 1.2.2 1.8l-1.3 1.6c-.6.7-1.6 1-2.5.7C8.4 17.3 2.7 11.6 1.1 5.4c-.2-.9 0-1.9.7-2.5L3.4 1.6c.6-.5 1.4-.4 1.8.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </span>
          </header>

          <div className="ill-wa2__body">
            <div className="ill-wa2__run" ref={runRef}>
              <span className="ill-wa2__date">Today</span>
              {children(t)}
            </div>
          </div>

          <footer className="ill-wa2__bar">
            <span className="ill-wa2__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="20" height="20">
                <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="ill-wa2__field">
              <span className="ill-wa2__placeholder" />
              <svg className="ill-wa2__sticker" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                <path d="M18 11V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h5Zm0 0h-4a3 3 0 0 0-3 3v4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <img className="ill-wa2__camera" src={camera} alt="" width={15.988} height={15.988} />
            <span className="ill-wa2__icon" aria-hidden="true">
              <svg viewBox="0 0 14 20" width="14" height="20">
                <rect x="3.6" y="1" width="6.8" height="11.5" rx="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="M1 9.2a6 6 0 0 0 12 0M7 15.2V19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
          </footer>

          <span className="ill-channel-shell__glow" aria-hidden="true" />
        </div>
      </div>
    </ConversionAssistanceFrame>
  );
}

const TIME = "4:12 PM";
const Meta = () => <span className="ill-wa2__time">{TIME}</span>;

type Button = { kind: "reply" | "link" | "copy"; label: string };

const icons: Record<Button["kind"], React.ReactNode> = {
  reply: <path d="M6 3 1.5 7.5 6 12M2 7.5h7.5a5 5 0 0 1 5 5V14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  link: <path d="M9 2h5v5M14 2 7.5 8.5M12 9.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  copy: <><rect x="5" y="5" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" fill="none" stroke="currentColor" strokeWidth="1.6" /></>,
};

// One message in the run, keyed per run so its entrance replays on loop.
export function WaItem({ id, t, children }: { id: string; t: Timeline; children: React.ReactNode }) {
  if (!t.reached(id)) return null;
  return (
    <div className="ill-wa2__item ill-wa2__arrive" key={`${id}-${t.runKey}`}>
      {children}
    </div>
  );
}

export function WaText({ text, first, footer, buttons }: { text: string; first?: boolean; footer?: string; buttons?: Button[] }) {
  // With action items, the buttons belong to the message: they sit inside
  // the same bubble as full-width rows under hairlines, one card.
  if (buttons) {
    return (
      <div className={`ill-wa2__bubble ill-wa2__bubble--product ill-wa2__bubble--text-actions${first ? " ill-wa2__bubble--first" : ""}`}>
        <div className="ill-wa2__pm">
          <p className="ill-wa2__text">
            {text}
            {!footer && <span className="ill-wa2__spacer" aria-hidden="true" />}
          </p>
          {footer && (
            <p className="ill-wa2__footer">
              {footer}
              <span className="ill-wa2__spacer" aria-hidden="true" />
            </p>
          )}
          <Meta />
        </div>
        {buttons.map((btn) => (
          <span className="ill-wa2__action-row" key={btn.label}>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">{icons[btn.kind]}</svg>
            {btn.label}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className={`ill-wa2__bubble${first ? " ill-wa2__bubble--first" : ""}`}>
      <p className="ill-wa2__text">
        {text}
        {!footer && <span className="ill-wa2__spacer" aria-hidden="true" />}
      </p>
      {footer && (
        <p className="ill-wa2__footer">
          {footer}
          <span className="ill-wa2__spacer" aria-hidden="true" />
        </p>
      )}
      <Meta />
    </div>
  );
}

// Single-product message: media (the one thing that loads), name, a
// secondary line, and an optional action row under a hairline.
export function WaProduct({
  image,
  alt,
  loading,
  title,
  sub,
  action,
  first,
  mediaHeight,
  note,
  extra,
  photo = false,
}: {
  extra?: React.ReactNode;
  mediaHeight?: number;
  note?: React.ReactNode;
  photo?: boolean;
  image: string;
  alt: string;
  loading: boolean;
  title: string;
  sub: React.ReactNode;
  action?: string;
  first?: boolean;
}) {
  return (
    <div
      className={`ill-wa2__bubble ill-wa2__bubble--product${first ? " ill-wa2__bubble--first ill-wa2__bubble--product-first" : ""}`}
      style={mediaHeight ? ({ "--wa-media-h": mediaHeight } as React.CSSProperties) : undefined}
    >
      <LoadingFrame loading={loading} radius={4} className={`ill-wa2__media${photo ? " ill-wa2__media--photo" : ""}`}>
        <Media src={image} alt={alt} />
      </LoadingFrame>
      <div className="ill-wa2__pm">
        <p className="ill-wa2__pm-title">{title}</p>
        {note && <p className="ill-wa2__pm-sub">{note}</p>}
        <p className="ill-wa2__pm-sub">
          {sub}
          <span className="ill-wa2__spacer" aria-hidden="true" />
        </p>
        {extra}
        <Meta />
      </div>
      {action && <span className="ill-wa2__action-row">{action}</span>}
    </div>
  );
}

// Product list message: header, the items as body lines, "View items".
export function WaList({
  header,
  lines,
  viewItems = false,
  link,
}: {
  header: string;
  lines: (string | { text: string; image: string; alt: string })[];
  viewItems?: boolean;
  link?: string;
}) {
  return (
    <div className="ill-wa2__bubble ill-wa2__bubble--product">
      <div className="ill-wa2__pm">
        <p className="ill-wa2__pm-title">{header}</p>
        {lines.map((line, i) => {
          const text = typeof line === "string" ? line : line.text;
          return (
            <p key={text} className={`ill-wa2__pm-line${typeof line === "string" ? "" : " ill-wa2__pm-line--thumb"}`}>
              {typeof line !== "string" && (
                <span className="ill-wa2__thumb">
                  <Media src={line.image} alt={line.alt} />
                </span>
              )}
              <span>
                {text}
                {i === lines.length - 1 && <span className="ill-wa2__spacer" aria-hidden="true" />}
              </span>
            </p>
          );
        })}
        <Meta />
      </div>
      {link && (
        <span className="ill-wa2__action-row">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">{icons.link}</svg>
          {link}
        </span>
      )}
      {viewItems && (
        <span className="ill-wa2__action-row">
          <svg viewBox="0 0 16 12" width="16" height="12" aria-hidden="true">
            <path d="M5 1h10M5 6h10M5 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="1.2" cy="1" r="1.1" fill="currentColor" />
            <circle cx="1.2" cy="6" r="1.1" fill="currentColor" />
            <circle cx="1.2" cy="11" r="1.1" fill="currentColor" />
          </svg>
          View items
        </span>
      )}
    </div>
  );
}
