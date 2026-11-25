import { useLayoutEffect, useRef } from "react";
import wallpaperImage from "../../../../assets/motion/scenarios/channel-deployment/wa/wallpaper.png";
import cameraImage from "../../../../assets/motion/scenarios/channel-deployment/wa/camera.svg";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { Media } from "../../components/ill/Media";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { BrandMark } from "../../brands/BrandIdentity";
import { browseRecovery as s } from "../Retain/data";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { BACKDROP_SIZES, sceneImage } from "../../scene-image";

const wallpaper = wallpaperImage.src;
const camera = cameraImage.src;

// 02b — Retain / 02 as a native iOS WhatsApp chat with the brand's
// business account. Same content and the same reveal order as 02. Its
// "Thinking" beat becomes WhatsApp's own signal for that: "typing…" in
// the header subtitle. Then the message lands whole (WhatsApp never
// streams). The products come as WhatsApp's own business message types:
// a single-product message, then a product list. At true iPhone scale the
// run is taller than the window, so the thread scrolls the way a chat
// does: each arrival grows in at the bottom and pushes the run up.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "typing", type: "pause", ms: 1400 },
  { id: "reply", type: "appear", ms: 450 },
  { id: "viewed", type: "load" },
  { id: "similar", type: "appear", ms: 450 },
];

const TIME = "4:12 PM";

function Meta() {
  return <span className="ill-wa2__time">{TIME}</span>;
}

export function BrowseRecoveryWhatsAppMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(rootRef));
  const typing = t.passed("lead") && !t.reached("reply");

  // FLIP the run on each arrival. The thread is bottom-anchored, so a new
  // message makes the run jump up by its height. Measure that growth,
  // offset the run back down by it, then transition the offset to 0 on
  // transform alone (no per-frame layout, unlike animating its height).
  const runRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);
  const arrivals = [t.reached("reply"), t.reached("viewed"), t.reached("similar")].filter(Boolean).length;
  useLayoutEffect(() => {
    const run = runRef.current;
    if (!run) return;
    const h = run.offsetHeight;
    const grew = h - lastHeight.current;
    lastHeight.current = h;
    if (grew <= 0 || arrivals === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // offsetHeight is in the shell's own (pre-scale) px, which is the
    // space this transform lives in too.
    run.style.transition = "none";
    run.style.transform = `translateY(${grew}px)`;
    void run.offsetHeight;
    run.style.transition = "";
    run.style.transform = "";
  }, [arrivals, t.runKey]);

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
            <BrandMark brand={s.brand} className="ill-wa2__avatar" />
            <div className="ill-wa2__who">
              <p className="ill-wa2__name">
                <span>Marais</span>
                {/* Meta Verified: the blue scalloped badge with a white check. */}
                <svg className="ill-wa2__verified" viewBox="0 0 12.24 12.24" width="12.24" height="12.24" aria-hidden="true">
                  <path d="M6.18 0 5.06 1.05 3.31.68l-.69 1.55-1.5.37.19 1.67L0 5.44l.94 1.3-.5 1.48 1.43.93.19 1.6h1.81L5 12.24l1.18-.99 1.5.87.87-1.36h1.69l.25-1.61 1.44-.93-.56-1.48.87-1.3-1.19-1.17.13-1.68-1.37-.37L8.99.68 7.37 1.05Z" fill="#0866FF" />
                  <path d="m4.06 6-.63.74 2.13 1.94 3.56-4.31-.81-.69-2.94 3.5Z" fill="#fff" />
                </svg>
              </p>
              {/* Both labels stay mounted and crossfade, so the swap has a
                  "from" state each way (a remount would just pop). */}
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
            {t.reached("reply") && (
              <div className="ill-wa2__item" key={`reply-${t.runKey}`}>
              <div className="ill-wa2__bubble ill-wa2__bubble--first ill-wa2__arrive">
                <p className="ill-wa2__text">
                  {s.message}
                  <span className="ill-wa2__spacer" aria-hidden="true" />
                </p>
                <Meta />
              </div>
              </div>
            )}
            {t.reached("viewed") && (
              <div className="ill-wa2__item" key={`viewed-${t.runKey}`}>
                {/* Single-product message: image, name, price. No action
                    row: the original card has none. */}
                <div className="ill-wa2__bubble ill-wa2__bubble--product ill-wa2__arrive">
                  <LoadingFrame loading={t.loading("viewed")} radius={4} className="ill-wa2__media ill-wa2__media--photo">
                    <Media src={s.viewed.image} alt={s.viewed.alt} />
                  </LoadingFrame>
                  <div className="ill-wa2__pm">
                    <p className="ill-wa2__pm-title">{s.viewed.title}</p>
                    <p className="ill-wa2__pm-sub">
                      <span className="ill-wa2__pm-price">{s.viewed.price}</span> · {s.viewedLabel}
                      <span className="ill-wa2__spacer" aria-hidden="true" />
                    </p>
                    <Meta />
                  </div>
                </div>
              </div>
            )}
            {t.reached("similar") && (
              <div className="ill-wa2__item" key={`similar-${t.runKey}`}>
                {/* Product list message: header, the items in the body,
                    no action row (the original has none). It is all
                    text, so it arrives whole with no skeleton (only media
                    loads). */}
                <div className="ill-wa2__bubble ill-wa2__bubble--product ill-wa2__arrive">
                  <div className="ill-wa2__pm">
                    <p className="ill-wa2__pm-title">{s.similarLabel}</p>
                    {s.similar.map((p, i) => (
                      <p key={p.id} className="ill-wa2__pm-line ill-wa2__pm-line--thumb">
                        <span className="ill-wa2__thumb">
                          <Media src={p.image} alt={p.alt} />
                        </span>
                        <span>
                          {p.title}, {p.price}
                          {i === s.similar.length - 1 && <span className="ill-wa2__spacer" aria-hidden="true" />}
                        </span>
                      </p>
                    ))}
                    <Meta />
                  </div>
                  <span className="ill-wa2__action-row">
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                      <path d="M9 2h5v5M14 2 7.5 8.5M12 9.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Visit store
                  </span>
                </div>
              </div>
            )}
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
