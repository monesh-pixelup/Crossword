"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useRef, useState } from "react";
import look1GoldHoopSetImg from "./assets/look-1-gold-hoop-set.webp";
import look2PearlDropSetImg from "./assets/look-2-pearl-drop-set.webp";
import look3CitrineStudSetImg from "./assets/look-3-citrine-stud-set.webp";
import wifeNaturalCitrineStudsImg from "./assets/wife-natural-citrine-studs.webp";
import wifeNaturalGoldHoopsImg from "./assets/wife-natural-gold-hoops.webp";
import wifeNaturalPearlDropsImg from "./assets/wife-natural-pearl-drops.webp";
import wifeNaturalUploadImg from "./assets/wife-natural-upload.webp";
import {
  Gj2Foot,
  Gj2Head,
  Gj2Msg,
  Gj2Rail,
  Kn,
  PartG0,
  PartHu,
  PartX0,
  Qn,
  SceneFrame,
  ai,
  ml,
  scrollEase,
  typeOut,
  useLandedOnScreen,
} from "./kit";

export const ma = 300;

export const M6 = 500;

export const R6 = 150;

export const T6 = 26;

export const P6 = 45;

export const A6 = 220;

export const I6 = 150;

export const $6 = 550;

export const B6 = 650;

export function V6() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function z6(e) {
  return e.split(/\s+/).filter(Boolean).length * P6 + A6 + I6;
}

export function D6(e) {
  var n;
  if (e.kind !== "assistant") return 350;
  const t = 350 + Math.min(e.message.length * 3, 500);
  return (n = e.products) != null && n.length ? t + 500 : t;
}

export function ga(e) {
  return e.kind === "user-text" ? "composing" : e.kind === "user-upload" ? "revealing" : "thinking";
}

export function useRetentionGrowthTimeline(e) {
  const t = useRef(V6()).current,
    [n, r] = useState(t ? e.length : 0),
    [i, l] = useState(t ? "pausing" : ga(e[0])),
    [o, a] = useState(""),
    [c, d] = useState(!1),
    [v, w] = useState("Thinking"),
    [h, m] = useState(!1);
  return (
    useEffect(() => {
      if (t || n >= e.length) return;
      const p = e[n],
        x = [],
        C = (u, g) => {
          x.push(window.setTimeout(g, u));
        },
        f = () => {
          const u = n + 1;
          r(u), l(u < e.length ? ga(e[u]) : "pausing");
        };
      if (i === "composing" && p.kind === "user-text") {
        d(!0), a("");
        const u = typeOut(p.message, {
          msPerStep: T6,
          onTick: a,
          onDone: () => {
            C(220, () => {
              d(!1), a(""), f();
            });
          },
        });
        return () => {
          u(), x.forEach(window.clearTimeout);
        };
      }
      if (i === "revealing") return C(B6, f), () => x.forEach(window.clearTimeout);
      if (i === "thinking" && p.kind === "assistant")
        return (
          w("Thinking"),
          C(ma, () => {
            w(p.thinkingLabel);
          }),
          C(ma + M6, () => {
            l("thinkingExit");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "thinkingExit")
        return (
          C(R6, () => {
            l("replying");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "replying" && p.kind === "assistant")
        return (
          C(z6(p.message), () => {
            var u;
            (u = p.products) != null && u.length ? (m(!0), l("productsLoading")) : l("pausing");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "productsLoading")
        return (
          C($6, () => {
            m(!1), l("pausing");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "pausing") return C(D6(p), f), () => x.forEach(window.clearTimeout);
    }, [n, i, t]),
    {
      beatIndex: n,
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

export const H6 = look1GoldHoopSetImg.src;

export const O6 = look2PearlDropSetImg.src;

export const U6 = look3CitrineStudSetImg.src;

export const b6 = wifeNaturalGoldHoopsImg.src;

export const G6 = wifeNaturalPearlDropsImg.src;

export const W6 = wifeNaturalCitrineStudsImg.src;

export const Z6 = wifeNaturalUploadImg.src;

export const Fn = "Aurelia";

export const va = {
  assistantMessage: "Good to see you again. Did your wife like her rose gold pendant?",
  userMessage: "Oh yes, now I need something special for our vacation in Miami. It's our anniversary.",
};

export const K6 = {
  assistantMessage: "Let me share a few earrings and bracelet options, and build a look for her.",
};

export const Q6 = [
  {
    id: "look-1",
    brand: Fn,
    title: "Gold Hoop Set",
    image: H6,
    price: "$89",
    rating: 4,
    ratingCount: "312",
  },
  {
    id: "look-2",
    brand: Fn,
    title: "Pearl Drop Set",
    image: O6,
    price: "$96",
    rating: 5,
    ratingCount: "208",
  },
  {
    id: "look-3",
    brand: Fn,
    title: "Citrine Stud Set",
    image: U6,
    price: "$74",
    rating: 4,
    ratingCount: "165",
  },
];

export const xa = {
  userMessage: "I wonder how this would look on her…",
  assistantMessage: "Simply upload her picture, and I will show you.",
};

export const wa = {
  alt: "Photo uploaded by the shopper",
  src: Z6,
};

export const Y6 = {
  assistantMessage: "Here are the same looks, but for her!",
};

export const q6 = [
  {
    id: "wife-look-1",
    brand: Fn,
    title: "Gold Hoop Set",
    image: b6,
    price: "$89",
    rating: 4,
    ratingCount: "312",
  },
  {
    id: "wife-look-2",
    brand: Fn,
    title: "Pearl Drop Set",
    image: G6,
    price: "$96",
    rating: 5,
    ratingCount: "208",
  },
  {
    id: "wife-look-3",
    brand: Fn,
    title: "Citrine Stud Set",
    image: W6,
    price: "$74",
    rating: 4,
    ratingCount: "165",
  },
];

export const j2 = {
  turn1: ["She loved it", "Shop new arrivals"],
  turn2: ["Bracelets only", "Under $90", "Show more looks"],
  turn4: ["Add Look 1", "Compare the looks", "Gift wrap it"],
};

export const Cs = [
  {
    kind: "assistant",
    message: va.assistantMessage,
    thinkingLabel: ai,
  },
  {
    kind: "user-text",
    message: va.userMessage,
  },
  {
    kind: "assistant",
    message: K6.assistantMessage,
    thinkingLabel: ml,
    products: Q6,
  },
  {
    kind: "user-text",
    message: xa.userMessage,
  },
  {
    kind: "assistant",
    message: xa.assistantMessage,
    thinkingLabel: ai,
  },
  {
    kind: "user-upload",
    src: wa.src,
    alt: wa.alt,
  },
  {
    kind: "assistant",
    message: Y6.assistantMessage,
    thinkingLabel: ml,
    products: q6,
  },
];

export const _s = {
  0: j2.turn1,
  2: j2.turn2,
  6: j2.turn4,
};

export function RetentionGrowthMotion() {
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
          <RetentionGrowthScene key={n} />
        ) : (
          <SceneFrame>
            <div className="gj2-win" />
          </SceneFrame>
        )}
      </div>
    )
  );
}

export function RetentionGrowthScene() {
  var w;
  const { beatIndex, phase, composerValue, composerTyping, productsLoading, reducedMotion } =
      useRetentionGrowthTimeline(Cs),
    o = useRef(null),
    a = !reducedMotion;
  useEffect(() => {
    const h = o.current,
      m = h == null ? void 0 : h.lastElementChild;
    if (!h || !m) return;
    const p = h.getBoundingClientRect(),
      x = m.getBoundingClientRect();
    if (x.bottom <= p.bottom - Qn) return;
    const C = h.scrollTop + x.bottom - p.bottom + Qn;
    reducedMotion ? (h.scrollTop = C) : scrollEase(h, C);
  }, [beatIndex, phase, productsLoading, reducedMotion]);
  const c = ((w = Cs[beatIndex]) == null ? void 0 : w.kind) === "user-text" && phase === "composing" && composerTyping,
    d = (h) => {
      const m = Cs[h + 1];
      return (m == null ? void 0 : m.kind) === "user-text" ? m.message : void 0;
    },
    v = c && !!Kn(_s[beatIndex - 1], d(beatIndex - 1));
  return (
    <SceneFrame>
      <div className="gj2-win">
        <Gj2Head />
        <div className="gj2-transcript gj2-transcript--scroll" ref={o}>
          {Cs.flatMap((h, m) => {
            const p = m < beatIndex,
              x = m === beatIndex;
            if (h.kind === "user-text")
              return !p && !(x && phase !== "composing")
                ? []
                : [
                    <p key={m} className={`gj2-msg gj2-msg--user${a && !p ? " gj2-in" : ""}`}>
                      {h.message}
                    </p>,
                  ];
            if (h.kind === "user-upload")
              return !p && !x
                ? []
                : [<PartHu key={m} src={h.src ?? ""} alt={h.alt} className={a && !p ? "sbp-in" : void 0} />];
            if (!p && !x) return [];
            const C = x && (phase === "thinking" || phase === "thinkingExit"),
              f = p || (x && !C),
              u = p || (x && (phase === "productsLoading" || phase === "pausing")),
              g = p || (x && phase === "pausing");
            return [
              ...(C
                ? [
                    <div
                      key={`${m}-think`}
                      className={phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai"}
                    >
                      <span className="gj2-think__mark">
                        <PartX0 />
                      </span>
                      <span className="gj2-think__window">
                        <span className="gj2-think__line">{h.thinkingLabel}</span>
                      </span>
                    </div>,
                  ]
                : []),
              ...(f ? [<Gj2Msg key={`${m}-reply`} text={h.message} animate={a} />] : []),
              ...(u && h.products
                ? [
                    <div key={`${m}-rail`} className={a ? "gj2-rise" : void 0}>
                      <Gj2Rail products={h.products} loading={x && productsLoading} />
                    </div>,
                  ]
                : []),
              ...(g && _s[m]
                ? [
                    <PartG0
                      key={`${m}-fu`}
                      items={_s[m]}
                      picked={p ? Kn(_s[m], d(m)) : void 0}
                      className={
                        [a && "gj2-followups--in", a && v && beatIndex === m + 1 && "gj2-followups--tap"]
                          .filter(Boolean)
                          .join(" ") || void 0
                      }
                    />,
                  ]
                : []),
            ];
          })}
        </div>
        <Gj2Foot value={c && !v && composerValue ? composerValue : void 0} />
      </div>
    </SceneFrame>
  );
}
