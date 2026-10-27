"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { Fragment, useEffect, useRef, useState } from "react";
import beadedGoldAnkletImg from "./assets/beaded-gold-anklet.webp";
import chainLinkBraceletImg from "./assets/chain-link-bracelet.webp";
import roseGoldBarPendantImg from "./assets/rose-gold-bar-pendant.webp";
import roseGoldFineBoxChainImg from "./assets/rose-gold-fine-box-chain.webp";
import roseGoldHaloPendantImg from "./assets/rose-gold-halo-pendant.webp";
import roseGoldSnakeChainImg from "./assets/rose-gold-snake-chain.webp";
import roseGoldTeardropPendantImg from "./assets/rose-gold-teardrop-pendant.webp";
import teardropPendantNecklaceImg from "./assets/teardrop-pendant-necklace.webp";
import {
  B1,
  Gj2Foot,
  Gj2Head,
  Gj2Msg,
  Gj2Rail,
  Kn,
  PartG0,
  PartO1,
  PartX0,
  Qn,
  SceneFrame,
  Ze,
  ai,
  ml,
  scrollEase,
  typeOut,
  up,
  useLandedOnScreen,
} from "./kit";

export const Fo = 300;

export const Z3 = 500;

export const K3 = 150;

export const Q3 = 26;

export const Y3 = 220;

export const q3 = 150;

export const V1 = 550;

export function X3() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function J3(e) {
  return e.split(/\s+/).filter(Boolean).length * B1 + Y3 + q3;
}

export function ep(e) {
  var n;
  const t = 350 + Math.min(e.assistantMessage.length * 3, 500);
  return (n = e.products) != null && n.length ? t + 500 : t;
}

export function useGiftJourneyTimeline(e) {
  const t = useRef(X3()).current,
    [n, r] = useState(t ? e.length : 0),
    [i, l] = useState("composing"),
    [o, a] = useState(""),
    [c, d] = useState(!1),
    [v, w] = useState("Thinking"),
    [h, m] = useState(!1);
  return (
    useEffect(() => {
      var f;
      if (t || n >= e.length) return;
      const p = e[n],
        x = [],
        C = (u, g) => {
          x.push(window.setTimeout(g, u));
        };
      if (i === "composing") {
        d(!0), a("");
        const u = typeOut(p.userMessage, {
          msPerStep: Q3,
          onTick: a,
          onDone: () => {
            C(220, () => {
              d(!1), a(""), w("Thinking"), l("thinking");
            });
          },
        });
        return () => {
          u(), x.forEach(window.clearTimeout);
        };
      }
      if (i === "thinking") {
        const u = !!(((f = p.products) != null && f.length) || p.singleCard);
        return (
          C(Fo, () => {
            w(u ? "Finding the right options" : "Reading your ask");
          }),
          C(Fo + Z3, () => {
            l("thinkingExit");
          }),
          () => x.forEach(window.clearTimeout)
        );
      }
      if (i === "thinkingExit")
        return (
          C(K3, () => {
            l("replying");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "replying")
        return (
          C(J3(p.assistantMessage), () => {
            var u;
            ((u = p.products) != null && u.length) || p.singleCard ? (m(!0), l("productsLoading")) : l("pausing");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "productsLoading")
        return (
          C(V1, () => {
            m(!1), l("pausing");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "pausing")
        return (
          C(ep(p), () => {
            r((u) => u + 1), l("composing");
          }),
          () => x.forEach(window.clearTimeout)
        );
    }, [n, i, t]),
    {
      turnIndex: n,
      phase: i,
      composerValue: o,
      composerTyping: c,
      statusLabel: v,
      productsLoading: h,
      reducedMotion: t,
      done: n >= e.length,
    }
  );
}

export const np = beadedGoldAnkletImg.src;

export const rp = teardropPendantNecklaceImg.src;

export const sp = chainLinkBraceletImg.src;

export const ip = roseGoldTeardropPendantImg.src;

export const lp = roseGoldHaloPendantImg.src;

export const op = roseGoldBarPendantImg.src;

export const ap = roseGoldFineBoxChainImg.src;

export const cp = roseGoldSnakeChainImg.src;

export const c2 = {
  userMessage:
    "I need a birthday gift for my wife. She has pretty expensive taste, but my budget doesn't really match it this year.",
  assistantMessage:
    "Let's find something that still feels special without stretching your budget — here are three pieces under $150 that read more expensive than they cost.",
  followups: ["More like the pendant", "Show rose gold", "Under $100"],
};

export const hl = [
  {
    id: "anklet-1",
    title: "Beaded Gold Anklet",
    brand: Ze,
    price: "$89",
    rating: 4,
    ratingCount: "312",
    image: np,
  },
  {
    id: "pendant-1",
    title: "Teardrop Pendant Necklace",
    brand: Ze,
    price: "$129",
    rating: 5,
    ratingCount: "1.1k",
    image: rp,
    imageFit: "cover",
  },
  {
    id: "bracelet-1",
    title: "Chain-Link Bracelet",
    brand: Ze,
    price: "$109",
    rating: 4,
    ratingCount: "487",
    image: sp,
  },
];

export const u2 = {
  userMessage: "I like the middle one. Can you show me more styles like that, in rose gold?",
  assistantMessage:
    "Good eye — the teardrop pendant is one of our most-gifted pieces. Here are a few more pendant styles in rose gold.",
  followups: ["Add the first one to my cart", "Compare these", "Is gift wrap free?"],
};

export const z1 = [
  {
    id: "pendant-2-1",
    title: "Rose Gold Teardrop Pendant",
    brand: Ze,
    price: "$135",
    rating: 5,
    ratingCount: "860",
    image: ip,
    imageFit: "cover",
  },
  {
    id: "pendant-2-2",
    title: "Rose Gold Halo Pendant",
    brand: Ze,
    price: "$149",
    rating: 5,
    ratingCount: "402",
    image: lp,
    imageFit: "cover",
  },
  {
    id: "pendant-2-3",
    title: "Rose Gold Bar Pendant",
    brand: Ze,
    price: "$119",
    rating: 4,
    ratingCount: "275",
    image: op,
    imageFit: "cover",
  },
];

export const d2 = {
  userMessage: "Add the first one to my cart.",
  assistantMessage: "Added to your cart. Want to pair it with something else, like a matching chain?",
  followups: ["Earrings to match", "Go to checkout", "Gift wrap it"],
};

export const dp = z1[0];

export const p2 = {
  userMessage: "Yes, show me a matching chain.",
  assistantMessage:
    "Here are three chains that pair well with it — most people choose the fine box chain with this pendant.",
  followups: ["Which length?", "Show gold instead", "Compare chains"],
};

export const D1 = [
  {
    id: "chain-1",
    title: "Rose Gold Fine Box Chain",
    brand: Ze,
    price: "$59",
    rating: 5,
    ratingCount: "930",
    tag: "Most paired",
    image: ap,
    imageFit: "cover",
  },
  {
    id: "chain-2",
    title: "Rose Gold Snake Chain",
    brand: Ze,
    price: "$65",
    rating: 4,
    ratingCount: "214",
    image: cp,
    imageFit: "cover",
  },
  {
    id: "chain-3",
    title: "Rose Gold Curb Chain",
    brand: Ze,
    price: "$72",
    rating: 4,
    ratingCount: "158",
    image: up,
    imageFit: "cover",
  },
];

export const f2 = {
  userMessage: "Perfect, add that one too.",
  assistantMessage: "Added — your pendant and chain are both in the cart, ready for checkout.",
  followups: ["Go to checkout", "Add a gift note", "Keep browsing"],
};

export const pp = D1[0];

export const gn = [
  {
    userMessage: c2.userMessage,
    assistantMessage: c2.assistantMessage,
    followups: c2.followups,
    products: hl,
  },
  {
    userMessage: u2.userMessage,
    assistantMessage: u2.assistantMessage,
    followups: u2.followups,
    products: z1,
  },
  {
    userMessage: d2.userMessage,
    assistantMessage: d2.assistantMessage,
    followups: d2.followups,
    singleCard: dp,
  },
  {
    userMessage: p2.userMessage,
    assistantMessage: p2.assistantMessage,
    followups: p2.followups,
    products: D1,
  },
  {
    userMessage: f2.userMessage,
    assistantMessage: f2.assistantMessage,
    followups: f2.followups,
    singleCard: pp,
  },
];

export const Cp = V1;

export function GiftJourneyMotion() {
  const e = useRef(null),
    t = useLandedOnScreen(e),
    [n, r] = useState(0);
  return (
    useEffect(() => {
      t && r((i) => i + 1);
    }, [t]),
    (
      <div ref={e}>
        {n > 0 ? (
          <GiftJourneyScene key={n} />
        ) : (
          <SceneFrame>
            <div className="gj2-win" />
          </SceneFrame>
        )}
      </div>
    )
  );
}

export function GiftJourneyScene({ sheet = !1 } = {}) {
  var w, h;
  const { turnIndex, phase, composerValue, productsLoading, reducedMotion } = useGiftJourneyTimeline(gn),
    o = useRef(null),
    a = useRef(!1);
  useEffect(() => {
    const m = o.current;
    if (!m) return;
    const p = () => {
      a.current = !0;
    };
    return (
      m.addEventListener("wheel", p, {
        passive: !0,
      }),
      m.addEventListener("touchmove", p, {
        passive: !0,
      }),
      () => {
        m.removeEventListener("wheel", p), m.removeEventListener("touchmove", p);
      }
    );
  }, []),
    useEffect(() => {
      a.current = !1;
    }, [turnIndex]),
    useEffect(() => {
      if (a.current) return;
      const m = o.current,
        p = m == null ? void 0 : m.lastElementChild;
      if (!m || !p) return;
      const x = m.getBoundingClientRect(),
        C = p.getBoundingClientRect();
      if (C.bottom <= x.bottom - Qn) return;
      const f = m.scrollTop + C.bottom - x.bottom + Qn;
      reducedMotion ? (m.scrollTop = f) : scrollEase(m, f);
    }, [turnIndex, phase, productsLoading, reducedMotion]);
  const c = turnIndex < gn.length && phase === "composing",
    d =
      c &&
      !!Kn(
        (w = gn[turnIndex - 1]) == null ? void 0 : w.followups,
        (h = gn[turnIndex]) == null ? void 0 : h.userMessage,
      ),
    v = (
      <div className={sheet ? "gj2-win gjm-sheet" : "gj2-win"}>
        {sheet && <span className="gjm-grab" aria-hidden="true" />}
        <Gj2Head />
        <div className="gj2-transcript gj2-transcript--scroll" ref={o}>
          {gn.map((m, p) => {
            var B, R;
            const x = p < turnIndex;
            if (!x && !(p === turnIndex && phase !== "composing")) return null;
            const f = p === turnIndex,
              u = f && (phase === "thinking" || phase === "thinkingExit"),
              g = x || (f && !u),
              j = x || (f && (phase === "productsLoading" || phase === "pausing")),
              k = f && phase === "productsLoading",
              S = !!(((B = m.products) != null && B.length) || m.singleCard),
              N = !reducedMotion,
              M = x || (f && phase === "pausing");
            return (
              <Fragment key={p}>
                <p className={`gj2-msg gj2-msg--user${N ? " gj2-in" : ""}`}>{m.userMessage}</p>
                {u && (
                  <div className={phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai"}>
                    <span className="gj2-think__mark">
                      <PartX0 />
                    </span>
                    <span className="gj2-think__window">
                      <span className="gj2-think__line">{S ? ml : ai}</span>
                    </span>
                  </div>
                )}
                {g && <Gj2Msg text={m.assistantMessage} animate={N} />}
                {j && m.products && (
                  <div className={N ? "gj2-rise" : void 0}>
                    <Gj2Rail products={m.products} loading={k} />
                  </div>
                )}
                {j && m.singleCard && (
                  <div className={N ? "gj2-rise" : void 0}>
                    <PartO1 product={m.singleCard} added={!0} lone={!0} loading={k} adding={N} addingDelayMs={Cp} />
                  </div>
                )}
                {M && (
                  <PartG0
                    items={m.followups}
                    picked={turnIndex > p ? Kn(m.followups, (R = gn[p + 1]) == null ? void 0 : R.userMessage) : void 0}
                    className={
                      [N && "gj2-followups--in", N && d && turnIndex === p + 1 && "gj2-followups--tap"]
                        .filter(Boolean)
                        .join(" ") || void 0
                    }
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        <Gj2Foot value={c && !d && composerValue ? composerValue : void 0} />
      </div>
    );
  return sheet ? v : <SceneFrame>{v}</SceneFrame>;
}
