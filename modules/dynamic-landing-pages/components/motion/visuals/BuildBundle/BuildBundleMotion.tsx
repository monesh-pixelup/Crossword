import { useRef } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { ChatHead, ChatFoot, Followups, Rail } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { StreamedReply } from "../../illustrations/GiftJourneyV2/GiftJourneyV2Motion";
import { Think, User, useFollowLatest } from "../../illustrations/ProductDiscoveryV2/ProductDiscoveryV2Motion";
import { StorybookKnock } from "../ProactiveV2/StorybookKnock";
import { useComposerClip } from "../ProactiveV2/ProactiveV2Motion";
import { Ad, Landing } from "./BuildBundle";
import { brand, bundle, domain, knock, q1, q2, result } from "./data";

// Sell: Build your bundle (motion), on the statics' frames and the repo's
// own motion: one beat list (useChatTimeline), started on landing and
// restarted on every landing.
//   ad → page   the CTA dips, the ad blurs off as Goodwell's page fades
//               onto the canvas; chrome and nav, then the hero's lines
//               rise (Ad journey's ad→page language)
//   knock       the bar rests, then 11b's Storybook knock pops 16px above
//               the capsule and holds to be read; "Find my match" presses
//               and the knock sinks (333ms)
//   open        the capsule grows into the window (09's opening, 21–23's
//               clip: 400ms on (.32,.72,0,1), the radius never animates,
//               the header settles at 240ms, the composer never moves)
//   thread      the door lands as the shopper's bubble; each question is
//               the wait line, a streamed reply and its chips (§15); the
//               picked chip takes the 0.97 press and lands as the next
//               bubble, the composer staying empty (a tap, not typing);
//               the bundle holds its skeletons under "Building your
//               bundle…", then the cards resolve and the match streams in
const beats: Beat[] = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "idle", type: "pause", ms: 900 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 2800 },
  { id: "press", type: "pause", ms: 320 },
  { id: "open", type: "appear", ms: 700 },
  { id: "match", type: "appear", ms: 420 },
  { id: "think-1", type: "think", labels: ["Thinking"] },
  { id: "q1", type: "text", text: q1.ai },
  { id: "chips-1", type: "appear", ms: 500 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "tap-1", type: "pause", ms: 320 },
  { id: "pick-1", type: "appear", ms: 420 },
  { id: "think-2", type: "think", labels: ["Thinking"] },
  { id: "q2", type: "text", text: q2.ai },
  { id: "chips-2", type: "appear", ms: 500 },
  { id: "read-2", type: "pause", ms: 1400 },
  { id: "tap-2", type: "pause", ms: 320 },
  { id: "pick-2", type: "appear", ms: 420 },
  { id: "build", type: "load", ms: 1400 },
  { id: "reply", type: "text", text: result.ai },
  { id: "finish", type: "pause", ms: 2600 },
];

function Question({ t, n, text, chips, picked, animate }: {
  t: Timeline; n: 1 | 2; text: string; chips: string[]; picked: string; animate: boolean;
}) {
  return (
    <>
      <Think t={t} id={`think-${n}`} />
      {t.reached(`q${n}`) && <StreamedReply text={text} animate={animate} />}
      {t.reached(`chips-${n}`) && (
        <Followups
          items={chips}
          picked={t.reached(`tap-${n}`) ? picked : undefined}
          className={cx(animate && "gj2-followups--in", animate && t.reached(`tap-${n}`) && "gj2-followups--tap")}
        />
      )}
      {t.reached(`pick-${n}`) && <User text={picked} animate={animate} />}
    </>
  );
}

function Thread({ t, animate }: { t: Timeline; animate: boolean }) {
  const building = t.reached("build") && !t.reached("reply");
  return (
    <>
      {t.reached("match") && <User text={q1.picked} animate={animate} />}
      <Question t={t} n={1} text={q1.ai} chips={q1.chips} picked={q2.picked} animate={animate} />
      <Question t={t} n={2} text={q2.ai} chips={q2.chips} picked={result.picked} animate={animate} />
      {building && <p className={cx("gj2-msg gj2-msg--ai byb-wait", animate && "gj2-in-ai")}>{result.loading}</p>}
      {t.reached("reply") && <StreamedReply text={result.ai} animate={animate} />}
      {t.reached("build") && (
        <div className={cx("byb-rail-seat", animate && "gj2-rise")} data-name="Bundle">
          <Rail products={bundle} loading={t.loading("build")} ctaLabel="Add to bundle" className="byb-rail" />
        </div>
      )}
    </>
  );
}

export function BuildBundleMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  useFollowLatest(transcriptRef, t);
  const clip = useComposerClip(winRef, t.runKey);
  const animate = !t.reducedMotion;
  const store = t.reached("store");
  const open = t.reached("open");
  const knockUp = animate && t.reached("knock") && !t.passed("open");
  // Until it opens, the page rests on static 02's bar (fade, capsule and
  // note); the window's own capsule sits under it at the same spot.
  const resting = animate && !open;

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
      <div key={t.runKey} className={cx("bybm adjm", t.reached("tap-ad") && "adjm--tap", store && "bybm--store")}>
        <div className="bybm-layer bybm-ad adj pcx-canvas"><Ad /></div>
        <div className="bybm-layer bybm-page ais pcx byb">
          <article className="ais-store">
            <BrowserChrome url={domain} />
            <div className="ais-viewport">
              <Landing />
              <div className="byb-widget bybm-widget" style={style}>
                <div
                  ref={winRef}
                  className={cx("gj2-win pv2-win byb-win", (open || !animate) && "pv2-win--open", !clip && "pv2-win--unmeasured")}
                >
                  <div className="pv2-head"><ChatHead brand={brand} /></div>
                  <div ref={transcriptRef} className="gj2-transcript byb-transcript bybm-transcript">
                    {(open || !animate) && <Thread t={t} animate={animate} />}
                  </div>
                  <ChatFoot />
                </div>
              </div>
              <div className={cx("byb-widget byb-widget--bar bybm-bar", !resting && "bybm-bar--off")} data-name="Composer">
                <div className="gj2-win byb-bar"><ChatFoot /></div>
                {knockUp && (
                  <div className="pv2-knock-seat byb-knock">
                    <StorybookKnock
                      title={knock.line}
                      product={bundle[0].image}
                      doors={knock.doors}
                      pressed={t.reached("press") ? "Find my match" : undefined}
                      out={t.reached("open")}
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
