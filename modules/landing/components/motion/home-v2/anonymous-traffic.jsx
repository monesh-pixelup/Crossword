"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useRef, useState } from "react";
import {
  AiStatus,
  AttributeRow,
  ChatMessage,
  InsightFrameScale,
  PartDt,
  PartFt,
  PartHt,
  PartJe,
  PartRe,
  PartRt,
  SblScope,
  SkeletonBlock,
  Thread,
  typeOut,
  y2,
} from "./kit";

export const da = 300;

export const Th = 500;

export const Ph = 150;

export const Ah = 26;

export const Ih = 45;

export const $h = 220;

export const Bh = 150;

export const Vh = 550;

export const zh = 150;

export function Dh() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Fh(e) {
  return e.split(/\s+/).filter(Boolean).length * Ih + $h + Bh;
}

export function useAnonymousTrafficTimeline(e, t) {
  const n = useRef(Dh()).current,
    [r, i] = useState(n ? "done" : "composing"),
    [l, o] = useState(""),
    [a, c] = useState(!1),
    [d, v] = useState("Thinking");
  return (
    useEffect(() => {
      if (n) return;
      const w = [],
        h = (m, p) => {
          w.push(window.setTimeout(p, m));
        };
      if (r === "composing") {
        c(!0), o("");
        const m = typeOut(e, {
          msPerStep: Ah,
          onTick: o,
          onDone: () => {
            h(220, () => {
              c(!1), o(""), v("Thinking"), i("thinking");
            });
          },
        });
        return () => {
          m(), w.forEach(window.clearTimeout);
        };
      }
      if (r === "thinking")
        return (
          h(da, () => v("Scanning anonymous sessions")),
          h(da + Th, () => i("thinkingExit")),
          () => w.forEach(window.clearTimeout)
        );
      if (r === "thinkingExit") return h(Ph, () => i("replying")), () => w.forEach(window.clearTimeout);
      if (r === "replying") return h(Fh(t), () => i("cardLoading")), () => w.forEach(window.clearTimeout);
      if (r === "cardLoading") return h(Vh, () => i("askReveal")), () => w.forEach(window.clearTimeout);
      if (r === "askReveal") return h(zh, () => i("done")), () => w.forEach(window.clearTimeout);
    }, [r, n, e, t]),
    {
      phase: r,
      composerValue: l,
      composerTyping: a,
      statusLabel: d,
      reducedMotion: n,
      done: r === "done",
    }
  );
}

export const xn = {
  brand: "CROSSWORD",
  question: "We're seeing a spike in visitors we can't identify. Anything useful there?",
  insight: "340 anonymous sessions this week. 62% came from a Reddit thread comparing skincare brands.",
};

export const pa = {
  statement: "Want me to offer returning visitors 10% off next time?",
  cta: "Create offer",
};

export function AnonymousTrafficScene() {
  const { phase, composerValue, composerTyping, statusLabel, reducedMotion } = useAnonymousTrafficTimeline(
      xn.question,
      xn.insight,
    ),
    l = reducedMotion || phase !== "composing",
    o = !reducedMotion && (phase === "thinking" || phase === "thinkingExit"),
    a = reducedMotion || (phase !== "composing" && phase !== "thinking" && phase !== "thinkingExit"),
    c = reducedMotion || phase === "cardLoading" || phase === "askReveal" || phase === "done",
    d = !reducedMotion && phase === "cardLoading",
    v = reducedMotion || phase === "askReveal" || phase === "done",
    w = reducedMotion || phase === "askReveal" || phase === "done",
    h = !reducedMotion && phase === "askReveal";
  return (
    <InsightFrameScale>
      <PartFt
        brand={xn.brand}
        width={450}
        height={515}
        composerValue={!reducedMotion && phase === "composing" && composerValue ? composerValue : void 0}
        composerTyping={!reducedMotion && phase === "composing" && composerTyping}
      >
        <Thread>
          {l && (
            <PartRt animateIn={!reducedMotion}>
              <ChatMessage role="user" text={xn.question} />
            </PartRt>
          )}
          {l && (
            <PartJe animateIn={!reducedMotion}>
              {o && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
              {a && (
                <ChatMessage role="assistant">{reducedMotion ? xn.insight : <PartDt text={xn.insight} />}</ChatMessage>
              )}
              {c && (
                <div className="hm-ill-at-card">
                  <div className="hm-ill-at-card__header">
                    <div className="hm-ill-at-card__heading">
                      <PartRe name="insight" size={14} />
                      <p className="hm-ill-at-card__title">{y2.title}</p>
                    </div>
                    <PartRe name="caretDown" size={12} />
                  </div>
                  <AttributeRow label={y2.row.label} value={y2.row.value} />
                  {!reducedMotion && (d || v) && (
                    <div
                      className={`hm-ill-at-card__skeleton-overlay${d ? "" : " hm-ill-at-card__skeleton-overlay--hidden"}`}
                    >
                      <div className="hm-ill-at-card__skeleton-row">
                        <SkeletonBlock width={180} height={15} radius={4} />
                        <SkeletonBlock width={12} height={12} radius={3} />
                      </div>
                      <div className="hm-ill-at-card__skeleton-row">
                        <SkeletonBlock width={110} height={11} radius={4} />
                        <SkeletonBlock width={30} height={11} radius={4} />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {w && (
                <div className={`hm-ill-at-ask${h ? " hm-ill-at-ask--enter" : ""}`}>
                  <ChatMessage role="assistant" text={pa.statement} />
                  <PartHt appearance="primary" label={pa.cta} />
                </div>
              )}
            </PartJe>
          )}
        </Thread>
      </PartFt>
    </InsightFrameScale>
  );
}

export const AnonymousTrafficMotion = () => (
  <SblScope>
    <AnonymousTrafficScene />
  </SblScope>
);
