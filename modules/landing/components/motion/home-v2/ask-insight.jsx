"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AiStatus,
  AttributeRow,
  ChatMessage,
  InsightFrameScale,
  PartBe,
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
  useLandedOnScreen,
} from "./kit";

export const qf = 700;

export const Xf = 26;

export const Jf = 260;

export const eh = 160;

export const th = 620;

export const la = 300;

export const nh = 500;

export const rh = 150;

export const sh = 45;

export const ih = 220;

export const lh = 150;

export const oh = 550;

export function ah() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ch(e) {
  return e.split(/\s+/).filter(Boolean).length * sh + ih + lh;
}

export function useAskInsightTimeline(e, t, n, r = qf) {
  const i = useRef(ah()).current,
    [l, o] = useState(i ? "done" : "landing"),
    [a, c] = useState(0),
    [d, v] = useState(""),
    [w, h] = useState("Thinking");
  return (
    useEffect(() => {
      i || (o("landing"), v(""), h("Thinking"), n && c((m) => m + 1));
    }, [n, i]),
    useEffect(() => {
      if (i || !n) return;
      const m = [],
        p = (C, f) => {
          m.push(window.setTimeout(f, C));
        },
        x = () => m.forEach(window.clearTimeout);
      if (l === "landing") {
        let C = () => {};
        return (
          p(r, () => {
            C = typeOut(e, {
              msPerStep: Xf,
              onTick: v,
              onDone: () => p(Jf, () => o("sending")),
            });
          }),
          () => {
            C(), x();
          }
        );
      }
      if (l === "sending") return p(eh, () => o("expanding")), x;
      if (l === "expanding") return p(th, () => o("thinking")), x;
      if (l === "thinking") return p(la, () => h("Finding the right cohort")), p(la + nh, () => o("thinkingExit")), x;
      if (l === "thinkingExit") return p(rh, () => o("replying")), x;
      if (l === "replying") return p(ch(t), () => o("cardLoading")), x;
      if (l === "cardLoading") return p(oh, () => o("done")), x;
    }, [l, n, a, i, e, t, r]),
    {
      phase: l,
      runKey: a,
      composerValue: d,
      statusLabel: w,
      reducedMotion: i,
    }
  );
}

export const vn = {
  brand: "CROSSWORD",
  query: "Find people who reached checkout but didn't purchase in the last 7 days.",
  result: "3,284 people reached checkout. 2,140 are still deciding. Most dropped after seeing shipping costs.",
};

export const oa = {
  headline: "What insight do you want run?",
  suggestions: [
    {
      icon: "usersThree",
      text: "Find the best user to send campaign to",
    },
    {
      icon: "shoppingCart",
      text: "Find repeat cart abandoners",
    },
    {
      icon: "funnel",
      text: "Segment apparel checkout abandoners",
    },
    {
      icon: "bell",
      text: "Announce a new launch",
    },
  ],
};

export const ys = {
  title: "412 high-intent shoppers",
  rows: [
    {
      label: "Returned",
      value: "3+ times",
    },
    {
      label: "Avg. cart",
      value: "$186",
    },
    {
      label: "Status",
      value: "Items still in cart",
    },
  ],
  cta: "View this group",
};

export function AskInsightScene({ landingHoldMs, growComposer = !1 } = {}) {
  const n = useRef(null),
    r = useRef(null),
    i = useRef(null),
    l = useRef(null),
    [o, a] = useState(0),
    c = useLandedOnScreen(n),
    { phase, runKey, composerValue, statusLabel, reducedMotion } = useAskInsightTimeline(
      vn.query,
      vn.result,
      c,
      landingHoldMs,
    ),
    [p, x] = useState(null),
    f = !(phase === "landing" || phase === "sending"),
    u = reducedMotion || (f && phase !== "expanding"),
    g = !reducedMotion && (phase === "thinking" || phase === "thinkingExit"),
    j = reducedMotion || phase === "replying" || phase === "cardLoading" || phase === "done",
    k = reducedMotion || phase === "cardLoading" || phase === "done",
    S = !reducedMotion && phase === "cardLoading";
  useLayoutEffect(() => {
    var L, T;
    const D = n.current,
      xe = r.current,
      Jn = xe == null ? void 0 : xe.querySelector(".hm-ill-chat-composer");
    if (!D || !xe || !Jn) return;
    const Gt = i.current;
    let fn = !1;
    const Wt = () => {
      if (fn) return;
      const P = D.getBoundingClientRect().width / D.offsetWidth || 1,
        F = (hn, st) => {
          const vt = hn.getBoundingClientRect(),
            Ye = st.getBoundingClientRect();
          return {
            top: (vt.top - Ye.top) / P,
            left: (vt.left - Ye.left) / P,
            width: vt.width / P,
            height: vt.height / P,
          };
        },
        Q = F(xe, D);
      x({
        composer: Gt != null && Gt.parentElement ? F(Gt, Gt.parentElement) : Q,
        shell: Q,
        pill: F(Jn, D),
      });
    };
    return (
      Wt(),
      (T = (L = document.fonts) == null ? void 0 : L.ready) == null ||
        T.then(() => {
          Wt(), requestAnimationFrame(Wt);
        }),
      () => {
        fn = !0;
      }
    );
  }, [runKey]);
  const N = f || reducedMotion;
  useLayoutEffect(() => {
    const D = l.current;
    if (!growComposer || !D) return;
    const xe = new ResizeObserver(() => a(D.offsetHeight));
    return xe.observe(D), () => xe.disconnect();
  }, [growComposer, runKey]);
  const M = growComposer && !N && p !== null,
    B = p
      ? N
        ? p.shell
        : {
            ...p.composer,
            height: M ? Math.max(p.composer.height, o) : p.composer.height,
          }
      : null,
    R = p ? (N ? p.pill : p.composer) : null,
    Ne = ["ask-stage", f && "ask-stage--expanded", reducedMotion && "ask-stage--static", !p && "ask-stage--unmeasured"]
      .filter(Boolean)
      .join(" ");
  return (
    <InsightFrameScale>
      <div className={Ne} ref={n}>
        <div key={runKey} className="ask-stage__run">
          {!reducedMotion && (
            <div className="ask-landing" aria-hidden={f}>
              <p className="ask-landing__headline">{oa.headline}</p>
              <div className="ask-landing__composer" ref={i} />
              <div className="ask-landing__chips">
                {oa.suggestions.map((D) => (
                  <span key={D.text} className="ask-landing__chip">
                    <PartRe name={D.icon} size={16} />
                    {D.text}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div
            className="ask-surface"
            style={
              B
                ? {
                    top: B.top,
                    left: B.left,
                    width: B.width,
                    height: B.height,
                  }
                : void 0
            }
          />
          <PartFt brand={vn.brand} width={450} height={515} rootRef={r} className="ask-shell">
            <Thread>
              {u && (
                <PartRt animateIn={!reducedMotion}>
                  <ChatMessage role="user" text={vn.query} />
                </PartRt>
              )}
              {u && (
                <PartJe className="hm-ill-ai-reply-turn" animateIn={!reducedMotion}>
                  {g && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                  {j && (
                    <ChatMessage role="assistant">
                      {reducedMotion ? vn.result : <PartDt text={vn.result} />}
                    </ChatMessage>
                  )}
                  {k && (
                    <div className="hm-ill-ai-card">
                      <div className="hm-ill-ai-card__header">
                        <div className="hm-ill-ai-card__heading">
                          <PartRe name="insight" size={14} />
                          <p className="hm-ill-ai-card__title">{ys.title}</p>
                        </div>
                        <PartRe name="caretDown" size={12} />
                      </div>
                      <div className="hm-ill-ai-card__rows">
                        {ys.rows.map((D) => (
                          <AttributeRow key={D.label} label={D.label} value={D.value} />
                        ))}
                      </div>
                      <PartHt appearance="primary" label={ys.cta} />
                      {!reducedMotion && (
                        <div
                          className={`hm-ill-ai-card__skeleton-overlay${S ? "" : " hm-ill-ai-card__skeleton-overlay--hidden"}`}
                        >
                          <div className="hm-ill-ai-card__skeleton-row">
                            <SkeletonBlock width={140} height={15} radius={4} />
                            <SkeletonBlock width={12} height={12} radius={3} />
                          </div>
                          {ys.rows.map((D) => (
                            <div key={D.label} className="hm-ill-ai-card__skeleton-row">
                              <SkeletonBlock width={70} height={11} radius={4} />
                              <SkeletonBlock width={60} height={11} radius={4} />
                            </div>
                          ))}
                          <SkeletonBlock width="100%" height={29} radius={4.868} />
                        </div>
                      )}
                    </div>
                  )}
                </PartJe>
              )}
            </Thread>
          </PartFt>
          <div
            ref={l}
            className={["ask-input", composerValue && "ask-input--ready", M && "ask-input--grow"]
              .filter(Boolean)
              .join(" ")}
            style={
              R
                ? {
                    top: R.top,
                    left: R.left,
                    width: R.width,
                    height: M ? void 0 : R.height,
                    minHeight: M ? R.height : void 0,
                    borderRadius: N ? R.height / 2 : void 0,
                  }
                : void 0
            }
          >
            <span className="ask-input__text">
              {!reducedMotion && (
                <span className="ask-input__query">
                  {composerValue}
                  {phase === "landing" && <span className="hm-ill-chat-composer__caret" />}
                </span>
              )}
              <span className="ask-input__placeholder">Ask anything...</span>
            </span>
            <PartBe
              icon="send"
              label="Send"
              variant="accent"
              className={phase === "sending" ? "hm-ill-icon-button--pressed" : void 0}
            />
          </div>
        </div>
      </div>
    </InsightFrameScale>
  );
}

export const AskInsightMotion = () => (
  <SblScope>
    <AskInsightScene landingHoldMs={1100} growComposer={!0} />
  </SblScope>
);
