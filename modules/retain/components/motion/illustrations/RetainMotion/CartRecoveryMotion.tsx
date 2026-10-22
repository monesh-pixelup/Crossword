import { useRef } from "react";
import backImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/back.svg";
import brandMarkImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/brand-mark.svg";
import chevronImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/chevron.svg";
import tailInImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/tail-in.svg";
import plusImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/plus.svg";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { Media } from "../../components/ill/Media";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { cartRecovery as s } from "../Retain/data";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";

const back = backImage.src;
const brandMark = brandMarkImage.src;
const chevron = chevronImage.src;
const tailIn = tailInImage.src;
const plus = plusImage.src;

// Motion sibling of Retain / 01. A received iMessage arrives whole, as
// Messages delivers it — no word cascade on the phone — then the rich
// link preview resolves out of its skeleton, and the tail lands on the
// last bubble of the run once the run is complete.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "bubble", type: "appear", ms: 500 },
  { id: "preview", type: "load", ms: 700 },
];

export function CartRecoveryMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(rootRef));

  return (
    <ConversionAssistanceFrame>
      <div className="ill-outbound ill-retain-im" ref={rootRef}>
        <div className="ill-channel-shell ill-im-shell ill-outbound__shell">
          <header className="ill-im-shell__header">
            <div className="ill-im-shell__header-row">
              <img
                className="ill-im-shell__back"
                src={back}
                alt=""
                width={13.179}
                height={13.179}
              />
              <div className="ill-im-shell__contact">
                <span className="ill-im-shell__avatar">
                  <img src={brandMark} alt="" width={10.535} height={10.433} />
                </span>
                <span className="ill-im-shell__name">
                  {s.brand}
                  <img src={chevron} alt="" width={2.028} height={3.548} />
                </span>
              </div>
              <span className="ill-im-shell__spacer" />
            </div>
          </header>

          <div className="ill-im-shell__body ill-outbound__body">
            <p className="ill-outbound__timestamp">
              <b>iMessage</b>
              <br />
              {s.timestamp}
            </p>
            {t.reached("bubble") && (
              <div
                className="ill-im-shell__msg ill-im-shell__msg--in ill-assistant-turn--enter"
                key={`bubble-${t.runKey}`}
              >
                <div className="ill-im-shell__bubble-wrap">
                  <p className="ill-im-shell__bubble">{s.message}</p>
                </div>
              </div>
            )}
            {t.reached("preview") && (
              <LoadingFrame
                loading={t.loading("preview")}
                radius={13}
                className="ill-outbound__collection ill-assistant-turn--enter"
              >
                <div className="ill-outbound__cards">
                  <div className="ill-outbound__media">
                    <Media src={s.preview.image} alt={s.product.alt} />
                  </div>
                </div>
                <div className="ill-outbound__caption">
                  <p className="ill-outbound__title">{s.preview.title}</p>
                  <p className="ill-outbound__domain">{s.preview.domain}</p>
                </div>
              </LoadingFrame>
            )}
            {/* Tail on the last bubble of the run, per Messages. */}
            {t.passed("preview") && (
              <img
                className="ill-retain-im__tail"
                src={tailIn}
                alt=""
                width={12.173}
                height={7.101}
              />
            )}
          </div>

          <footer className="ill-im-shell__toolbar">
            <div className="ill-im-shell__field">
              <span className="ill-im-shell__placeholder">iMessage</span>
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
