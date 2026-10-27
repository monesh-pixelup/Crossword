"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useRef, useState } from "react";
import avatarSaraImg from "./assets/avatar-sara.webp";
import matchingBraceletUploadedByTheShopperImg from "./assets/matching-bracelet-uploaded-by-the-shopper.webp";
import {
  Gj2Foot,
  Gj2Head,
  Gj2Msg,
  Kn,
  PartG0,
  PartHu,
  PartX0,
  Qn,
  SceneFrame,
  ai,
  scrollEase,
  typeOut,
  useLandedOnScreen,
} from "./kit";

export const Yh = avatarSaraImg.src;

export function PartQh({ text, connecting, className }) {
  return (
    <div className={["sbp-seam", className].filter(Boolean).join(" ")} role="status">
      <span className="sbp-seam__pill">
        {connecting ? (
          <span key={"connecting"} className="sbp-seam__swap">
            <span className="sbp-seam__think" aria-hidden="true" />
            <span className="sbp-shimmer">{text}</span>
          </span>
        ) : (
          <span key={"joined"} className="sbp-seam__swap">
            <SbpFace size="sm" />
            <span>{text}</span>
          </span>
        )}
      </span>
    </div>
  );
}

export function PartXh({ name, role, children, className }) {
  return (
    <div className={["sbp-human", className].filter(Boolean).join(" ")}>
      <div className="sbp-human__row">
        <span className="sbp-human__head">
          <SbpFace />
          <span className="sbp-human__id">
            <span className="sbp-human__name">{name}</span>
            <span className="sbp-human__title">{role}</span>
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

export function SbpHumanBody({ children }) {
  return <p className="sbp-human__body">{children}</p>;
}

export function PartE6({ name, className }) {
  return (
    <p className={["sbp-typing", className].filter(Boolean).join(" ")}>
      <span className="sbp-shimmer">
        {name}
        {" is typing…"}
      </span>
    </p>
  );
}

export function SbpFace({ size = "md" }) {
  return (
    <span className={`sbp-face sbp-face--${size}`} aria-hidden="true">
      <img src={Yh} alt="" />
    </span>
  );
}

export const t6 = 26;

export const n6 = 220;

export const gu = 300;

export const r6 = 500;

export const s6 = 150;

export const i6 = 550;

export const l6 = 45;

export const o6 = 220;

export const a6 = 150;

export const c6 = 350;

export const u6 = 1500;

export function d6() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function p6(e) {
  return e.split(/\s+/).filter(Boolean).length * l6 + o6 + a6;
}

export function f6(e, t = 0) {
  return 350 + Math.min(e.length * 3, 500) + t;
}

export function h6(e, t) {
  return e.speaker === "agent" && t > 0 ? i6 : gu + r6;
}

export function useServiceResolutionTimeline(e) {
  const t = useRef(d6()).current,
    [n, r] = useState(t ? e.length : 0),
    [i, l] = useState("composing"),
    [o, a] = useState(0),
    [c, d] = useState(""),
    [v, w] = useState(!1),
    [h, m] = useState("");
  return (
    useEffect(() => {
      if (t || n >= e.length) return;
      const p = e[n],
        x = [],
        C = (f, u) => {
          x.push(window.setTimeout(u, f));
        };
      if (p.kind === "user" || p.kind === "userUpload") {
        w(!0), d("");
        const f = typeOut(p.message, {
          msPerStep: t6,
          onTick: d,
          onDone: () => {
            C(n6, () => {
              var u;
              w(!1),
                d(""),
                r((g) => g + 1),
                l(((u = e[n + 1]) == null ? void 0 : u.kind) === "handoff" ? "handoff" : "thinking"),
                a(0);
            });
          },
        });
        return () => {
          f(), x.forEach(window.clearTimeout);
        };
      }
      if (p.kind === "handoff")
        return (
          C(u6, () => {
            r((f) => f + 1), l("thinking"), a(0);
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "thinking") {
        m(p.thinkingStages[0]);
        const f = p.thinkingStages[1];
        return (
          f &&
            C(gu, () => {
              m(f);
            }),
          C(h6(p, o), () => {
            l("thinkingExit");
          }),
          () => x.forEach(window.clearTimeout)
        );
      }
      if (i === "thinkingExit")
        return (
          C(s6, () => {
            l("replying");
          }),
          () => x.forEach(window.clearTimeout)
        );
      if (i === "replying") {
        const f = p.messages[o];
        return (
          C(p6(f), () => {
            o < p.messages.length - 1
              ? C(c6, () => {
                  a((g) => g + 1), l("thinking");
                })
              : l("pausing");
          }),
          () => x.forEach(window.clearTimeout)
        );
      }
      if (i === "pausing") {
        const f = p.messages[p.messages.length - 1];
        return (
          C(f6(f, p.pauseBonusMs), () => {
            r((g) => g + 1);
            const u = e[n + 1];
            l((u == null ? void 0 : u.kind) === "handoff" ? "handoff" : "composing"), a(0);
          }),
          () => x.forEach(window.clearTimeout)
        );
      }
    }, [n, i, o, t]),
    {
      stepIndex: n,
      phase: i,
      beatIndex: o,
      composerValue: c,
      composerTyping: v,
      statusLabel: h,
      reducedMotion: t,
      done: n >= e.length,
    }
  );
}

export const g6 = matchingBraceletUploadedByTheShopperImg.src;

export const v6 = g6;

export const fa = {
  userMessage: "Where's my order?",
  assistantMessage:
    "I see you've purchased a rose gold pendant for your wife. It's on its way, and will reach you by 3rd November.",
};

export const ha = {
  userMessage: "I need to speak to someone.",
  assistantMessage: "Absolutely. I'll get the right person and pass along what we've already discussed.",
};

export const x6 = "Connected with a support agent — they can see this conversation.";

export const w6 = {
  agentMessage: "Let me know your concern regarding the delivery of your rose gold pendant?",
};

export const y6 = {
  userMessage: "If the order hasn't been dispatched, I need to add one more thing, a matching bracelet, this one.",
};

export const j6 = {
  agentMessages: ["Let me see what I can do.", "You reached us just in time. Consider it done!"],
};

export const C6 = {
  name: "Support agent",
  role: "Aurelia support",
};

export const _6 = {
  turn1: ["Track my order", "Change delivery date", "I need to speak to someone"],
};

export const ur = [
  {
    kind: "user",
    id: "turn1",
    message: fa.userMessage,
  },
  {
    kind: "reply",
    id: "turn1-reply",
    speaker: "ai",
    messages: [fa.assistantMessage],
    thinkingStages: ["Thinking"],
  },
  {
    kind: "user",
    id: "turn2",
    message: ha.userMessage,
  },
  {
    kind: "reply",
    id: "turn2-reply",
    speaker: "ai",
    messages: [ha.assistantMessage],
    thinkingStages: ["Thinking"],
    pauseBonusMs: 300,
  },
  {
    kind: "handoff",
    id: "handoff",
    text: x6,
  },
  {
    kind: "reply",
    id: "turn3-reply",
    speaker: "agent",
    messages: [w6.agentMessage],
    thinkingStages: ["Typing"],
  },
  {
    kind: "userUpload",
    id: "turn4",
    message: y6.userMessage,
    image: v6,
    caption: "Matching bracelet",
  },
  {
    kind: "reply",
    id: "turn5-reply",
    speaker: "agent",
    messages: j6.agentMessages,
    thinkingStages: ["Typing"],
  },
];

export const js = {
  "turn1-reply": _6.turn1,
};

export const k6 = 650;

export function ServiceResolutionMotion() {
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
          <ServiceResolutionScene key={n} />
        ) : (
          <SceneFrame>
            <div className="gj2-win" />
          </SceneFrame>
        )}
      </div>
    )
  );
}

export function ServiceResolutionScene() {
  var w;
  const { stepIndex, phase, beatIndex, composerValue, composerTyping, reducedMotion } =
      useServiceResolutionTimeline(ur),
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
  }, [stepIndex, phase, beatIndex, reducedMotion]);
  const c = stepIndex < ur.length && phase === "composing" && composerTyping,
    d = (h) => {
      const m = ur[h + 1];
      return m && (m.kind === "user" || m.kind === "userUpload") ? m.message : void 0;
    },
    v = c && !!Kn(js[(w = ur[stepIndex - 1]) == null ? void 0 : w.id], d(stepIndex - 1));
  return (
    <SceneFrame>
      <div className="gj2-win">
        <Gj2Head />
        <div className="gj2-transcript gj2-transcript--scroll" ref={o}>
          {ur.flatMap((h, m) => {
            const p = m < stepIndex,
              x = m === stepIndex;
            if (h.kind === "user" || h.kind === "userUpload") {
              if (!p && !(x && phase !== "composing")) return [];
              const k = (
                <p key={h.id} className={`gj2-msg gj2-msg--user${a ? " gj2-in" : ""}`}>
                  {h.message}
                </p>
              );
              return h.kind === "user"
                ? [k]
                : [
                    <PartHu
                      key={`${h.id}-img`}
                      src={h.image}
                      alt="Matching bracelet uploaded by the shopper"
                      className={a ? "sbp-in" : void 0}
                    />,
                    k,
                  ];
            }
            if (h.kind === "handoff") return !p && !x ? [] : [<PartL6 key={h.id} text={h.text} fresh={x && a} />];
            if (!p && !x) return [];
            const C = x ? beatIndex : h.messages.length,
              f = x && (phase === "thinking" || phase === "thinkingExit"),
              u = h.messages.slice(0, f ? C : C + 1),
              g = p || (x && phase === "pausing");
            return h.speaker === "ai"
              ? [
                  ...(f
                    ? [
                        <div
                          key={`${h.id}-think`}
                          className={phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai"}
                        >
                          <span className="gj2-think__mark">
                            <PartX0 />
                          </span>
                          <span className="gj2-think__window">
                            <span className="gj2-think__line">{ai}</span>
                          </span>
                        </div>,
                      ]
                    : []),
                  ...u.map((j, k) => <Gj2Msg key={`${h.id}-${k}`} text={j} animate={a} />),
                  ...(g && js[h.id]
                    ? [
                        <PartG0
                          key={`${h.id}-fu`}
                          items={js[h.id]}
                          picked={p ? Kn(js[h.id], d(m)) : void 0}
                          className={
                            [a && "gj2-followups--in", a && v && stepIndex === m + 1 && "gj2-followups--tap"]
                              .filter(Boolean)
                              .join(" ") || void 0
                          }
                        />,
                      ]
                    : []),
                ]
              : [
                  ...(u.length
                    ? [
                        <PartXh key={h.id} {...C6} className={a && x ? "sbp-in" : void 0}>
                          {u.map((j, k) => (
                            <SbpHumanBody key={k}>{a ? <PartE62 text={j} /> : j}</SbpHumanBody>
                          ))}
                        </PartXh>,
                      ]
                    : []),
                  ...(f
                    ? [
                        <PartE6
                          key={`${h.id}-typing`}
                          name="Support agent"
                          className={phase === "thinkingExit" ? "gj2-think--out" : "gj2-in-ai"}
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

export function PartL6({ text, fresh }) {
  const [n, r] = useState(fresh);
  return (
    useEffect(() => {
      if (!fresh) return;
      const i = window.setTimeout(() => r(!1), k6);
      return () => window.clearTimeout(i);
    }, [fresh]),
    (
      <PartQh
        text={n ? "Connecting you to a support agent…" : text}
        connecting={n}
        className={fresh ? "sbp-in" : void 0}
      />
    )
  );
}

export function PartE62({ text }) {
  const t = text.split(" ");
  return (
    <>
      {t.map((n, r) => (
        <span key={r}>
          <span
            className="gj2-word"
            style={{
              animationDelay: `${r * 45}ms`,
            }}
          >
            {n}
          </span>
          {r < t.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
