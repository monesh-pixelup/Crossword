import { useRef } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../../illustrations/SellMotion/useChatTimeline";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { ChatHead, ChatFoot } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { StreamedReply } from "../../illustrations/GiftJourneyV2/GiftJourneyV2Motion";
import { StorybookKnock } from "../ProactiveV2/StorybookKnock";
import { useComposerClip } from "../ProactiveV2/ProactiveV2Motion";
import { Ad } from "./Offers";
import { CopyGlyph, Landing } from "./OffersComposer";
import { brand, domain, knock, offer, product } from "./data";

// Sell: Offers 11b (motion), on the statics' frames and Build your
// bundle's recipe: one beat list (useChatTimeline), started on landing and
// restarted on every landing.
//   ad → page   the CTA dips, the ad blurs off as Goodwell's page fades
//               on; chrome and nav, then the hero's lines rise, and 02's
//               bar (fade, capsule, note) arrives last
//   knock       the Storybook post-checkout offer (NDG-08) pops 16px above
//               the capsule and holds to be read; the CARD is tapped (its
//               landed hover), which in PostCheckoutSeat opens the chat
//   open        the knock sinks first (its own 333ms exit), so the card and
//               the window never move at once; then the scrim fades as the
//               capsule grows into the window (09's opening, 21–23's clip: 400ms on
//               (.32,.72,0,1), the header settling at 240ms); the bar's
//               fade and note hand over in place
//   thread      the offer streams in as the greet, then the trail's chips
//               rise 60ms apart, the coupon last (§15)
const beats: Beat[] = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "idle", type: "pause", ms: 900 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 3000 },
  { id: "tap", type: "pause", ms: 320 },
  { id: "dismiss", type: "pause", ms: 360 },
  { id: "open", type: "appear", ms: 700 },
  { id: "greet", type: "text", text: knock.greet },
  { id: "trail", type: "appear", ms: 600 },
  { id: "finish", type: "pause", ms: 3000 },
];

export function OffersComposerMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  const clip = useComposerClip(winRef, t.runKey);
  const animate = !t.reducedMotion;
  const store = t.reached("store");
  const open = t.reached("open") || !animate;
  const knockUp = animate && t.reached("knock") && !t.reached("open");

  const style = clip
    ? ({
        "--pv2-clip-top": `${clip.top}px`,
        "--pv2-clip-right": `${clip.right}px`,
        "--pv2-clip-bottom": `${clip.bottom}px`,
        "--pv2-clip-left": `${clip.left}px`,
        "--pv2-clip-radius": `${clip.radius}px`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div ref={rootRef}>
      <div key={t.runKey} className={cx("ofbm adjm", t.reached("tap-ad") && "adjm--tap", store && "ofbm--store", open && "ofbm--open")}>
        <div className="ofbm-layer ofbm-ad adj pcx-canvas"><Ad /></div>
        <div className="ofbm-layer ofbm-page ais pcx ofr">
          <article className="ais-store">
            <BrowserChrome url={domain} />
            <div className="ais-viewport">
              <Landing />
              <div className="ofb-scrim ofbm-scrim" />
              <div className="ofb-widget ofbm-widget" style={style}>
                <div ref={winRef} className={cx("gj2-win pv2-win ofb-win", open && "pv2-win--open", !clip && "pv2-win--unmeasured")}>
                  <div className="pv2-head"><ChatHead brand={brand} /></div>
                  <div className="gj2-transcript ofb-transcript">
                    {t.reached("greet") && <StreamedReply text={knock.greet} animate={animate} />}
                    {t.reached("trail") && (
                      <div className={cx("gj2-followups ofb-trail", animate && "gj2-followups--in")}>
                        {knock.followups.map((text) => <span key={text} className="gj2-followup">{text}</span>)}
                        <span className="gj2-followup ofb-code" aria-label={`Copy code ${offer.code}`}>{offer.code}<CopyGlyph /></span>
                      </div>
                    )}
                  </div>
                  <ChatFoot />
                </div>
              </div>
              <div className={cx("ofb-widget ofb-widget--bar ofbm-bar", open && "ofbm-bar--off")} data-name="Composer">
                <div className="gj2-win ofb-bar"><ChatFoot /></div>
                {knockUp && (
                  <div className="pv2-knock-seat ofb-knock">
                    <StorybookKnock
                      title={knock.line}
                      product={product.image}
                      doors={knock.doors}
                      hovered={t.reached("tap")}
                      out={t.reached("dismiss")}
                    />
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
