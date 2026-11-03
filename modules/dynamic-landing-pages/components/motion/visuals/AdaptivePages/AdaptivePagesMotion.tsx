import { useLayoutEffect, useRef, useState } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { ChatHead, ChatFoot } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { StreamedReply } from "../../illustrations/GiftJourneyV2/GiftJourneyV2Motion";
import { Think, Trail, User, useFollowLatest } from "../../illustrations/ProductDiscoveryV2/ProductDiscoveryV2Motion";
import { DedicatedLandingFrame, AdaptiveProductFrame } from "./AdaptivePages";
import { pdp } from "./data";

// 12–13 (motion), on the statics' frames. Both states of each visual are
// mounted from the first frame and stacked in the one 420x460 shell, so
// every change is a transition, not a mount; a restart remounts via runKey.
//   12  the ad's CTA dips, the ad blurs off as the landing page fades onto
//       the same footprint, chrome and nav then hero lines rise in turn,
//       and the jar flies from the creative into the hero panel (09's
//       language); the CTA lands last
//   13  the PDP rests, Ask AI presses, the scrim fades as 01's window
//       slides in from the left edge (11's drawer); header settles, the
//       composer lands, then 01's chat beats: typed ask, wait line,
//       streamed reply (§8), then the follow-up chips rise (§15)

function useTimeline(beats: Beat[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  return { rootRef, t };
}

// ---- 12 · Dedicated landing pages ----

const landingBeats: Beat[] = [
  { id: "ad", type: "pause", ms: 1600 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 1100 },
  { id: "finish", type: "pause", ms: 2000 },
];

interface Rect { x: number; y: number; w: number; h: number }

function LandingScene({ t }: { t: Timeline }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<{ from: Rect; to: Rect; src: string } | null>(null);
  const [moved, setMoved] = useState(false);
  const [landed, setLanded] = useState(t.reducedMotion);
  const store = t.reached("store");

  // Measured once the store is laid out under the ad (both are mounted).
  useLayoutEffect(() => {
    if (!store || t.reducedMotion) return;
    const root = rootRef.current;
    const jar = root?.querySelector<HTMLElement>(".pcx-ad__jar-anchor");
    const hero = root?.querySelector<HTMLImageElement>(".pcx-hero__media img");
    if (!root || !jar || !hero) return;
    const box = root.getBoundingClientRect();
    // Back to the root's own CSS px: the site zooms each visual to fit its
    // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
    // at the visual's drawn size.
    const zoom = root.offsetWidth ? box.width / root.offsetWidth : 1;
    const rect = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / zoom, y: (r.top - box.top) / zoom, w: r.width / zoom, h: r.height / zoom };
    };
    setFlight({ from: rect(jar), to: rect(hero), src: jar.dataset.flightSrc || "" });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMoved(true)));
    // Lands even if transitionend never fires (a backgrounded tab).
    const done = window.setTimeout(() => setLanded(true), 800);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [store, t.reducedMotion]);

  const pos = flight && (moved ? flight.to : flight.from);
  return (
    <div
      ref={rootRef}
      className={cx("adpm adpm--landing", t.reached("tap-ad") && "adpm--tap", store && "adpm--store", store && !landed && "adpm--flying")}
    >
      <div className="adpm-layer adpm-ad"><DedicatedLandingFrame step={1} /></div>
      <div className="adpm-layer adpm-page"><DedicatedLandingFrame step={2} /></div>
      {pos && !landed && (
        <img
          className="adpm-flight"
          src={flight.src}
          alt=""
          style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h }}
          onTransitionEnd={(e) => e.propertyName === "top" && setLanded(true)}
        />
      )}
    </div>
  );
}

export function DedicatedLandingPagesMotion() {
  const { rootRef, t } = useTimeline(landingBeats);
  return <div ref={rootRef}><LandingScene key={t.runKey} t={t} /></div>;
}

// ---- 13 · Adaptive product pages ----

const askBeats: Beat[] = [
  { id: "store", type: "pause", ms: 1400 },
  { id: "tap-ask", type: "appear", ms: 300 },
  { id: "open", type: "appear", ms: 600 },
  { id: "ask", type: "compose", text: pdp.question, leadMs: 300 },
  { id: "think", type: "think", labels: ["Thinking", "Checking product details"] },
  { id: "reply", type: "text", text: pdp.answer },
  { id: "followups", type: "appear", ms: 500 },
  { id: "finish", type: "pause", ms: 2400 },
];

export function AdaptiveProductPagesMotion() {
  const { rootRef, t } = useTimeline(askBeats);
  const transcriptRef = useRef<HTMLDivElement>(null);
  useFollowLatest(transcriptRef, t);
  const animate = !t.reducedMotion;
  const open = t.reached("open");

  // The static's 01 frame is the page; the drawer is 02's markup, driven
  // by the timeline instead of fixed copy.
  return (
    <div ref={rootRef}>
      <div key={t.runKey} className={cx("adpm adpm--ask", t.reached("tap-ask") && "adpm--tap", open && "adpm--open")}>
        <AdaptiveProductFrame
          step={2}
          overlay={
            <>
              <div className="adp-scrim adpm-scrim" />
              {open && (
                <div className="gj2-win adp-drawer adpm-drawer" data-name="Drawer">
                  <ChatHead brand={pdp.brand} />
                  <div className="gj2-transcript" ref={transcriptRef}>
                    {t.passed("ask") && <User text={pdp.question} animate={animate} />}
                    <Think t={t} id="think" />
                    {t.reached("reply") && <StreamedReply text={pdp.answer} animate={animate} />}
                    <Trail t={t} items={pdp.followups} animate={animate} />
                  </div>
                  <ChatFoot value={t.composer?.value || undefined} />
                </div>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}
