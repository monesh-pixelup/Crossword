"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useRef, useState } from "react";
import aeroPaceTrailImg from "./assets/aero-pace-trail.jpg";
import driftDailyImg from "./assets/drift-daily.jpg";
import tempoGlideImg from "./assets/tempo-glide.jpg";
import {
  AiStatus,
  AttributeRow,
  ChatMessage,
  InsightFrameScale,
  PartDt,
  PartFt,
  PartHt,
  PartJe,
  PartRt,
  ProductReference,
  SblScope,
  SkeletonBlock,
  Thread,
  typeOut,
} from "./kit";

export const ph = 150;

export const fh = 700;

export const aa = 300;

export const hh = 500;

export const mh = 150;

export const gh = 26;

export const vh = 45;

export const xh = 220;

export const wh = 150;

export const yh = 550;

export function jh() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Ch(e) {
  return e.split(/\s+/).filter(Boolean).length;
}

export function ca(...e) {
  return e.reduce((n, r) => n + Ch(r), 0) * vh + xh + wh;
}

export function useRevenueAttributionTimeline(e, t, n, r) {
  const i = useRef(jh()).current,
    [l, o] = useState(i ? "done" : "offerReplying"),
    [a, c] = useState(""),
    [d, v] = useState(!1),
    [w, h] = useState("Thinking");
  return (
    useEffect(() => {
      if (i) return;
      const m = [],
        p = (x, C) => {
          m.push(window.setTimeout(C, x));
        };
      if (l === "offerReplying") return p(ca(e), () => o("actionsReveal")), () => m.forEach(window.clearTimeout);
      if (l === "actionsReveal") return p(ph, () => o("pauseBeforeQuestion")), () => m.forEach(window.clearTimeout);
      if (l === "pauseBeforeQuestion") return p(fh, () => o("composing")), () => m.forEach(window.clearTimeout);
      if (l === "composing") {
        v(!0), c("");
        const x = typeOut(t, {
          msPerStep: gh,
          onTick: c,
          onDone: () => {
            p(220, () => {
              v(!1), c(""), h("Thinking"), o("thinking");
            });
          },
        });
        return () => {
          x(), m.forEach(window.clearTimeout);
        };
      }
      if (l === "thinking")
        return (
          p(aa, () => h("Tracing the order")), p(aa + hh, () => o("thinkingExit")), () => m.forEach(window.clearTimeout)
        );
      if (l === "thinkingExit") return p(mh, () => o("replying")), () => m.forEach(window.clearTimeout);
      if (l === "replying") return p(ca(n, r), () => o("footnoteLoading")), () => m.forEach(window.clearTimeout);
      if (l === "footnoteLoading") return p(yh, () => o("done")), () => m.forEach(window.clearTimeout);
    }, [l, i, e, t, n, r]),
    {
      phase: l,
      composerValue: a,
      composerTyping: d,
      statusLabel: w,
      reducedMotion: i,
      done: l === "done",
    }
  );
}

export const kh = tempoGlideImg.src;

export const Nh = aeroPaceTrailImg.src;

export const Sh = driftDailyImg.src;

export const Lh = "STRIDE";

export const Eh = [
  {
    id: "tempo",
    title: "Tempo Glide 3",
    price: "$140",
    image: kh,
  },
  {
    id: "aero",
    title: "Aero Pace Trail",
    price: "$155",
    image: Nh,
  },
  {
    id: "drift",
    title: "Drift Daily Trainer",
    price: "$120",
    image: Sh,
  },
];

export const Mh = "CROSSWORD";

export const ar = {
  ...Eh[0],
  brand: Lh,
};

export const cr = {
  assistantMessage: "20% off orders above $100. You're eligible. Want to use it?",
  primaryAction: "Use it",
  secondaryAction: "Not now",
};

export const ua = {
  userMessage: "When does the next drop go live?",
};

export const yt = {
  journeyNote: "From there, they clicked the offer, checked out, and spent $186.",
  statement: "This conversation influenced $186 in revenue.",
  footnote: {
    label: `Crossword-assisted \nrevenue this week`,
    value: "$24,680",
  },
};

export function RevenueAttributionScene() {
  const { phase, composerValue, composerTyping, statusLabel, reducedMotion, done } = useRevenueAttributionTimeline(
      cr.assistantMessage,
      ua.userMessage,
      yt.journeyNote,
      yt.statement,
    ),
    o = reducedMotion || phase !== "offerReplying",
    a = !reducedMotion && phase === "actionsReveal",
    c = reducedMotion || !["offerReplying", "actionsReveal", "pauseBeforeQuestion", "composing"].includes(phase),
    d = !reducedMotion && (phase === "thinking" || phase === "thinkingExit"),
    v = reducedMotion || (c && phase !== "thinking" && phase !== "thinkingExit"),
    w = !reducedMotion && phase === "footnoteLoading",
    h = reducedMotion || phase === "footnoteLoading" || phase === "done";
  return (
    <InsightFrameScale>
      <PartFt
        brand={Mh}
        width={450}
        height={515}
        composerValue={!reducedMotion && phase === "composing" && composerValue ? composerValue : void 0}
        composerTyping={!reducedMotion && phase === "composing" && composerTyping}
      >
        <Thread>
          <PartJe className="hm-ill-ctr-offer-turn">
            <ProductReference image={ar.image} alt={ar.title} brand={ar.brand} title={ar.title} price={ar.price} />
            <div className="hm-ill-ctr-offer">
              <ChatMessage role="assistant">
                {reducedMotion ? cr.assistantMessage : <PartDt text={cr.assistantMessage} />}
              </ChatMessage>
              {o && (
                <div className={`hm-ill-ctr-actions${a ? " hm-ill-ctr-actions--enter" : ""}`}>
                  <PartHt appearance="primary" label={cr.primaryAction} />
                  <PartHt appearance="secondary" label={cr.secondaryAction} />
                </div>
              )}
            </div>
          </PartJe>
          {c && (
            <PartRt className="hm-ill-ctr-question-turn" animateIn={!reducedMotion}>
              <ChatMessage role="user" text={ua.userMessage} />
            </PartRt>
          )}
          {c && (
            <PartJe className="hm-ill-ctr-outcome-turn" animateIn={!reducedMotion}>
              {d && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
              {v && (
                <ChatMessage role="assistant">
                  {reducedMotion ? (
                    <>
                      {yt.journeyNote} <strong>{yt.statement}</strong>
                    </>
                  ) : (
                    <PartDt text={yt.journeyNote} boldText={yt.statement} />
                  )}
                </ChatMessage>
              )}
              {h && (
                <div className="hm-ill-ctr-footnote">
                  <AttributeRow label={yt.footnote.label} value={yt.footnote.value} />
                  {!reducedMotion && (w || done) && (
                    <div
                      className={`hm-ill-ctr-footnote__skeleton-overlay${w ? "" : " hm-ill-ctr-footnote__skeleton-overlay--hidden"}`}
                    >
                      <SkeletonBlock width={120} height={18} radius={4} />
                      <SkeletonBlock width={90} height={28} radius={6} />
                    </div>
                  )}
                </div>
              )}
            </PartJe>
          )}
        </Thread>
      </PartFt>
    </InsightFrameScale>
  );
}

export const RevenueAttributionMotion = () => (
  <SblScope>
    <RevenueAttributionScene />
  </SblScope>
);
