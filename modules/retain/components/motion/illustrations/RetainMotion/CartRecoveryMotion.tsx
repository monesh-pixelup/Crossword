import { useLayoutEffect, useRef } from "react";
import backImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/back.svg";
import chevronImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/chevron.svg";
import tailInImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/tail-in.svg";
import plusImage from "../../../../assets/motion/scenarios/channel-deployment/imessage/plus.svg";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { Media } from "../../components/ill/Media";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { cartRecovery as s } from "../Retain/data";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { BrandMark } from "../../brands/BrandIdentity";

const back = backImage.src;
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

  // FLIP the run on each arrival, as 02b does: where the thread is
  // bottom-anchored (Retain V2), a new message makes the run jump up by its
  // height, so offset it back down by that growth and transition the
  // offset to 0 on transform alone, with no per-frame layout. Where the
  // thread is top-anchored (the older Retain pages), nothing above the new
  // message moves, so there is nothing to FLIP.
  const runRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);
  const arrivals = [t.reached("bubble"), t.reached("preview")].filter(Boolean).length;
  useLayoutEffect(() => {
    const run = runRef.current;
    if (!run?.parentElement) return;
    const h = run.offsetHeight;
    const grew = h - lastHeight.current;
    lastHeight.current = h;
    const anchoredBottom = getComputedStyle(run.parentElement).justifyContent === "flex-end";
    if (grew <= 0 || arrivals === 0 || !anchoredBottom || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    run.style.transition = "none";
    run.style.transform = `translateY(${grew}px)`;
    void run.offsetHeight;
    run.style.transition = "";
    run.style.transform = "";
  }, [arrivals, t.runKey]);

  return (
    <ConversionAssistanceFrame>
      <div className="ill-outbound ill-retain-im" ref={rootRef}>
        <div className="ill-channel-shell ill-im-shell ill-outbound__shell">
          <header className="ill-im-shell__header">
            <div className="ill-im-shell__header-row">
              <span className="ill-im-shell__back-btn">
                <img
                  className="ill-im-shell__back"
                  src={back}
                  alt=""
                  width={13.179}
                  height={13.179}
                />
              </span>
              <div className="ill-im-shell__contact">
                <BrandMark brand={s.brand} className="ill-im-shell__avatar" />
                <span className="ill-im-shell__name">
                  {s.brand}
                  <img src={chevron} alt="" width={2.028} height={3.548} />
                </span>
              </div>
              <span className="ill-im-shell__spacer" />
              {/* iOS 26 trailing FaceTime button; shown by the V2 layer only. */}
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
              {s.timestamp}
            </p>
            {t.reached("bubble") && (
              <div
                className="ill-im-shell__msg ill-im-shell__msg--in ill-retain-im__arrive"
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
                className="ill-outbound__collection ill-retain-im__arrive"
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
