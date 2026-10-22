import { useRef } from "react";
import backImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/back.svg";
import brandMarkImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/brand-mark.svg";
import chevronImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/chevron.svg";
import tailInImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/tail-in.svg";
import plusImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/plus.svg";
import { Media } from "../../components/ill/Media";
import { brand, script, campaign, arrivals } from "../OutboundCampaign/data";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { CampaignFrame } from "../CampaignFrame";

const back = backImage.src;
const brandMark = brandMarkImage.src;
const chevron = chevronImage.src;
const tailIn = tailInImage.src;
const plus = plusImage.src;

// Motion sibling of Campaigns 06 — Outbound. A received iMessage lands
// whole, as Messages delivers it (no word cascade on the phone), then the
// collection's rich-link preview resolves out of its skeleton.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "bubble", type: "appear", ms: 500 },
  { id: "preview", type: "load", ms: 700 },
];

function OutboundCampaignMotionWidget() {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(rootRef));

  return (
    <div className="ill-outbound" ref={rootRef}>
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
                {brand}
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
            Today 10:12 AM
          </p>
          {t.reached("bubble") && (
            <div
              className="ill-im-shell__msg ill-im-shell__msg--in ill-assistant-turn--enter"
              key={`bubble-${t.runKey}`}
            >
              <div className="ill-im-shell__bubble-wrap">
                <p className="ill-im-shell__bubble">
                  {script.assistantMessage}
                </p>
                <img
                  className="ill-im-shell__tail"
                  src={tailIn}
                  alt=""
                  width={12.173}
                  height={7.101}
                />
              </div>
            </div>
          )}

          {/* Apple's rich-link preview (LPLinkView): media on top,
              grey caption band with title and domain. The whole preview is
              the tap target, so there's no separate button. */}
          {t.reached("preview") && (
            <LoadingFrame
              loading={t.loading("preview")}
              radius={13}
              className="ill-outbound__collection ill-assistant-turn--enter"
            >
              <div className="ill-outbound__cards">
                {arrivals.map((shoe) => (
                  <div className="ill-outbound__media" key={shoe.id}>
                    <Media src={shoe.image} alt={shoe.title} />
                  </div>
                ))}
              </div>
              <div className="ill-outbound__caption">
                <p className="ill-outbound__title">{campaign.title}</p>
                <p className="ill-outbound__domain">{campaign.domain}</p>
              </div>
            </LoadingFrame>
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
  );
}

export function OutboundCampaignMotion() {
  return (
    <CampaignFrame>
      <OutboundCampaignMotionWidget />
    </CampaignFrame>
  );
}
