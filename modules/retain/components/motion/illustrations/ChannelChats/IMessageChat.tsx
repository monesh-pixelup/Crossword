import { useRef } from "react";
import backImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/back.svg";
import chevronImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/chevron.svg";
import tailInImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/tail-in.svg";
import plusImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/plus.svg";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { Media } from "../../components/ill/Media";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { useRunFlip } from "./useRunFlip";

const back = backImage.src;
const chevron = chevronImage.src;
const tailIn = tailInImage.src;
const plus = plusImage.src;

// The iOS 26 Messages thread shared by the iMessage b-variants (01's shell
// and motion, generalised; it carries 01's .ill-retain-im class so the
// Retain V2 layer styles it identically). Every one is the same shape, a
// received message then the rich link preview Messages builds from the
// link, so the scenario passes content only.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "bubble", type: "appear", ms: 500 },
  { id: "preview", type: "load", ms: 700 },
];

export function IMessageChat({
  brand,
  timestamp = "Today 4:12 PM",
  message,
  preview,
}: {
  brand: string;
  timestamp?: string;
  message: string;
  preview: { images: { src: string; alt: string }[]; title: string; domain: string; fill?: boolean; containTiles?: boolean };
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(rootRef));
  const runRef = useRunFlip([t.reached("bubble"), t.reached("preview")].filter(Boolean).length, t.runKey);
  const multi = preview.images.length > 1;

  return (
    <ConversionAssistanceFrame>
      <div className="ill-outbound ill-retain-im ill-imc" ref={rootRef}>
        <div className="ill-channel-shell ill-im-shell ill-outbound__shell">
          <header className="ill-im-shell__header">
            <div className="ill-im-shell__header-row">
              <span className="ill-im-shell__back-btn">
                <img className="ill-im-shell__back" src={back} alt="" width={13.179} height={13.179} />
              </span>
              <div className="ill-im-shell__contact">
                <BrandMark brand={brand} className="ill-im-shell__avatar" />
                <span className="ill-im-shell__name">
                  <BrandName brand={brand} className="ill-imc__brand-name" />
                  <img src={chevron} alt="" width={2.028} height={3.548} />
                </span>
              </div>
              <span className="ill-im-shell__spacer" />
              <span className="ill-im-shell__video" aria-hidden="true">
                <svg viewBox="0 0 20 14" width="20" height="14">
                  <rect x="0" y="1" width="13.5" height="12" rx="3" fill="currentColor" />
                  <path d="M15 5.2 19 2.6c.4-.3 1 0 1 .5v7.8c0 .5-.6.8-1 .5L15 8.8Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </header>

          <div className="ill-im-shell__body ill-outbound__body">
            <div className="ill-retain-im__run" ref={runRef}>
              <p className="ill-outbound__timestamp">
                <b>iMessage</b>
                <br />
                {timestamp}
              </p>
              {t.reached("bubble") && (
                <div className="ill-im-shell__msg ill-im-shell__msg--in ill-retain-im__arrive" key={`bubble-${t.runKey}`}>
                  <div className="ill-im-shell__bubble-wrap">
                    <p className="ill-im-shell__bubble">{message}</p>
                  </div>
                </div>
              )}
              {t.reached("preview") && (
                <LoadingFrame
                  key={`preview-${t.runKey}`}
                  loading={t.loading("preview")}
                  radius={13}
                  className={`ill-outbound__collection ill-retain-im__arrive${multi ? " ill-imc--multi" : ""}${preview.fill ? " ill-imc--fill" : ""}${preview.containTiles ? " ill-imc--contain-tiles" : ""}`}
                >
                  <div className="ill-outbound__cards" style={multi ? { gridTemplateColumns: `repeat(${preview.images.length}, 1fr)` } : undefined}>
                    {preview.images.map((img) => (
                      <div className="ill-outbound__media" key={img.src}>
                        <Media src={img.src} alt={img.alt} />
                      </div>
                    ))}
                  </div>
                  <div className="ill-outbound__caption">
                    <p className="ill-outbound__title">{preview.title}</p>
                    <p className="ill-outbound__domain">{preview.domain}</p>
                  </div>
                </LoadingFrame>
              )}
              {t.passed("preview") && (
                <img className="ill-retain-im__tail" src={tailIn} alt="" width={12.173} height={7.101} />
              )}
            </div>
          </div>

          <footer className="ill-im-shell__toolbar">
            <div className="ill-im-shell__field">
              <span className="ill-im-shell__placeholder">iMessage</span>
              <span className="ill-im-shell__mic-glyph" aria-hidden="true">
                <svg viewBox="0 0 12 18" width="12" height="18">
                  <rect x="3.25" y="0.75" width="5.5" height="10.5" rx="2.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 8.5a5 5 0 0 0 10 0M6 13.5v3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <span className="ill-im-shell__plus">
              <img src={plus} alt="" width={9.262} height={9.262} />
            </span>
          </footer>

          <span className="ill-channel-shell__glow" aria-hidden="true" />
        </div>
      </div>
    </ConversionAssistanceFrame>
  );
}
