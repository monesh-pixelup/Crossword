"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useLayoutEffect, useRef } from "react";
import crosswordNodeIcon from "./assets/icons/crossword-node.svg";
import {
  Le,
  PartDi,
  PartDt,
  PartVn,
  ProductReference,
  SblScope,
  SkeletonBlock,
  de,
  useLandedOnScreen,
  useQr,
  useSi,
  useThreadScroll,
} from "./kit";

export const su = crosswordNodeIcon.src;

export function PartEf({ children, kind = "label", size = "md", tone = "primary" }) {
  const i = [
    "hm-ill-chip",
    kind === "discount" && "hm-ill-chip--discount",
    kind === "action" && `hm-ill-chip--action hm-ill-chip--action-${tone}`,
    size === "sm" && "hm-ill-chip--sm",
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={i}>{children}</span>;
}

export const { crewneck: tf, heavyweight: nf } = Le;

export const iu = "Northwick";

export const Vt = {
  label: "Personal agent",
  status: "Working",
  ask: "My user wants a warm wool sweater for winter, under $90.",
  followUp: "Any current offers?",
  close: "Noted. I’ll show both options to my user, with the free wool wash offer.",
};

export const lu = [
  {
    id: "crewneck",
    name: "Alpine Merino Crewneck",
    price: "$85",
    image: tf,
  },
  {
    id: "heavyweight",
    name: "Alpine Merino Heavyweight",
    price: "$98",
    image: nf,
  },
];

export const k0 = {
  products: {
    topic: "Products",
    reply: [
      "The ",
      {
        b: "Alpine Merino Crewneck",
      },
      " at $85 fits the budget. There’s also the ",
      {
        b: "Alpine Merino Heavyweight",
      },
      " at $98. It’s $13 more, but the knit is thicker and holds its shape longer, so it’s better value if they plan to wear it all season.",
    ],
  },
  offers: {
    topic: "Offers",
    reply: [
      "Yes. The ",
      {
        b: "Winter Knit Edit",
      },
      " launches this week, with a free travel-size wool wash on orders over $95. It’s valid until November 30 and limited to one per customer.",
    ],
  },
};

export const m2 = {
  title: "Winter Knit Edit",
  detail: "Free travel-size wool wash over $95",
  terms: "Until Nov 30 · 1 per customer",
};

export function PaNode({ done = !1 }) {
  return (
    <span className="pa-node pa-node--agent" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2">
        {done ? (
          <path d="M3 6.2l2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="6" cy="6" r="4.25" />
            <circle cx="6" cy="6" r="1.6" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </span>
  );
}

export function PaNode2() {
  return (
    <span className="pa-node pa-node--crossword" aria-hidden="true">
      <img src={su} alt="" />
    </span>
  );
}

export function PaStep({ text, done = !1 }) {
  return (
    <li className="pa-step pa-step--agent">
      <PaNode done={done} />
      <p className="pa-step__text">{text}</p>
    </li>
  );
}

export function PaStep2({ topic, returned, pending, children }) {
  return (
    <li className="pa-step pa-step--call">
      <PaNode2 />
      <section className="pa-call" data-name={`Tool call / Crossword / ${topic}`}>
        <header className="pa-call__header">
          <span className="pa-call__tool">
            Crossword<span className="pa-call__merchant">{iu}</span>
          </span>
          <PartEf size="sm">{topic}</PartEf>
        </header>
        {returned ? children : pending}
      </section>
    </li>
  );
}

export function PaPicks() {
  return (
    <div className="pa-picks">
      {lu.map((e) => (
        <div key={e.id} className="pa-pick">
          <ProductReference image={e.image} alt={e.name} title={e.name} price={e.price} size={44} />
        </div>
      ))}
    </div>
  );
}

export function PaOffer() {
  return (
    <div className="pa-offer">
      <span className="pa-offer__icon" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        >
          <path d="M8.6 1.75H14.25V7.4L7.4 14.25L1.75 8.6Z" />
          <circle cx="11.1" cy="4.9" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="pa-offer__text">
        <span className="pa-offer__title">{m2.title}</span>
        <span className="pa-offer__detail">{m2.detail}</span>
      </span>
      <span className="pa-offer__terms">{m2.terms}</span>
    </div>
  );
}

export const au = {
  ask: "Find me a warm wool sweater for winter, under $90.",
};

export const v2 = {
  open: "Consulting Crossword",
  done: "Used Crossword",
  lookups: (e) => `${e} lookup${e === 1 ? "" : "s"}`,
};

export const of = [
  `Here are two options from ${iu}. The `,
  {
    b: "Alpine Merino Crewneck",
  },
  " at $85 fits your budget. The ",
  {
    b: "Alpine Merino Heavyweight",
  },
  " at $98 is $13 more, but its thicker knit holds its shape all season. The ",
  {
    b: "Winter Knit Edit",
  },
  " also adds a free travel-size wool wash on orders over $95, until November 30.",
];

export const af = "Message your agent";

export function PartSa({ loading, radius = 12, className, resolveDelayMs, children }) {
  const l = useRef(loading),
    o = loading || l.current;
  return (
    useEffect(() => {
      l.current = loading;
    }, [loading]),
    (
      <div className={["hm-sell-loading-frame", className].filter(Boolean).join(" ")}>
        {children}
        {o && (
          <div
            className={`hm-sell-loading-frame__overlay${loading ? "" : " hm-sell-loading-frame__overlay--hidden"}`}
            style={{
              borderRadius: radius,
              transitionDelay: resolveDelayMs ? `${resolveDelayMs}ms` : void 0,
            }}
          >
            <SkeletonBlock width="100%" height="100%" radius={radius} />
          </div>
        )}
      </div>
    )
  );
}

export const N0 = (e) => e.map((t) => (typeof t == "string" ? t : `**${t.b}**`)).join("");

export const uu = N0(k0.products.reply);

export const du = N0(k0.offers.reply);

export const $f = [
  {
    id: "ask",
    type: "text",
    text: Vt.ask,
  },
  {
    id: "call-1",
    type: "appear",
    ms: 380,
  },
  {
    id: "think-1",
    type: "think",
    labels: ["Checking products", "Matching under $90"],
  },
  {
    id: "reply-1",
    type: "text",
    text: uu,
  },
  {
    id: "picks",
    type: "load",
    ms: 600,
  },
  {
    id: "read-1",
    type: "pause",
    ms: 1200,
  },
  {
    id: "follow",
    type: "text",
    text: Vt.followUp,
  },
  {
    id: "call-2",
    type: "appear",
    ms: 380,
  },
  {
    id: "think-2",
    type: "think",
    labels: ["Checking offers"],
  },
  {
    id: "reply-2",
    type: "text",
    text: du,
  },
  {
    id: "offer",
    type: "load",
    ms: 600,
  },
  {
    id: "read-2",
    type: "pause",
    ms: 900,
  },
  {
    id: "close",
    type: "text",
    text: Vt.close,
  },
];

export function PaRail({ t: e }) {
  const { products, offers } = k0;
  return (
    <ol className="pa-rail">
      {e.reached("ask") && <PaStep text={<PartDt text={Vt.ask} />} />}
      {e.reached("call-1") && (
        <PaStep2 topic={products.topic} returned={e.reached("reply-1")} pending={<PartVn t={e} id="think-1" />}>
          <p className="pa-call__reply">
            <PartDi text={uu} />
          </p>
          <div className="pa-picks">
            {lu.map((r, i) => (
              <PartSa key={r.id} loading={!e.passed("picks")} radius={8} resolveDelayMs={i * 110}>
                <div className="pa-pick">
                  <ProductReference image={r.image} alt={r.name} title={r.name} price={r.price} size={44} />
                </div>
              </PartSa>
            ))}
          </div>
        </PaStep2>
      )}
      {e.reached("follow") && <PaStep text={<PartDt text={Vt.followUp} />} />}
      {e.reached("call-2") && (
        <PaStep2 topic={offers.topic} returned={e.reached("reply-2")} pending={<PartVn t={e} id="think-2" />}>
          <p className="pa-call__reply">
            <PartDi text={du} />
          </p>
          <PartSa loading={!e.passed("offer")} radius={8}>
            <PaOffer />
          </PartSa>
        </PaStep2>
      )}
      {e.reached("close") && <PaStep text={<PartDt text={Vt.close} />} done={!0} />}
    </ol>
  );
}

export const pu = N0(of);

export const Vf = [
  {
    id: "idle",
    type: "pause",
    ms: 500,
  },
  {
    id: "type-ask",
    type: "compose",
    text: au.ask,
    leadMs: 300,
  },
  {
    id: "sent",
    type: "appear",
    ms: 650,
  },
  {
    id: "panel",
    type: "appear",
    ms: 420,
  },
  ...$f,
  {
    id: "hold",
    type: "pause",
    ms: 900,
  },
  {
    id: "collapse",
    type: "appear",
    ms: 480,
  },
  {
    id: "answer",
    type: "text",
    text: pu,
  },
  {
    id: "answer-cards",
    type: "appear",
    ms: 600,
  },
];

export function PartZf({ open }) {
  return (
    <svg
      className={de("pa2-chevron pa2m-chevron", open && "pa2m-chevron--open")}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5L6 7.5l3-3" />
    </svg>
  );
}

export function PartDf({ t: e }) {
  const t = useRef(null),
    n = useRef(null),
    r = e.reached("collapse"),
    i = e.reached("call-2") ? 2 : 1;
  useThreadScroll(n, {
    thread: ".pa-rail",
    index: e.index,
    reducedMotion: e.reducedMotion,
  }),
    useLayoutEffect(() => {
      const o = t.current;
      if (!r || !o || e.reducedMotion) return;
      const a = o.animate(
        [
          {
            height: `${o.offsetHeight}px`,
            opacity: 1,
          },
          {
            height: "0px",
            opacity: 0,
          },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(0.45, 0, 0.15, 1)",
          fill: "forwards",
        },
      );
      return () => a.cancel();
    }, [r, e.reducedMotion]);
  const l = r ? v2.done : v2.open;
  return (
    <section className={de("pa2-panel pa2m-panel", r && "pa2-panel--collapsed")} data-name="Activity / Crossword">
      <header className="pa2-panel__header">
        <span className="pa-node pa-node--crossword" aria-hidden="true">
          <img src={su} alt="" />
        </span>
        <span key={l} className="pa2-panel__title pa2m-swap">
          {l}
        </span>
        <span key={i} className="pa2-panel__count pa2m-swap">
          {"· "}
          {v2.lookups(i)}
        </span>
        <PartZf open={!r} />
      </header>
      {!e.reached("answer") && (
        <div className="pa2-panel__body pa2m-body" ref={t}>
          <div className="pa2m-scroll" ref={n}>
            <PaRail t={e} />
          </div>
        </div>
      )}
    </section>
  );
}

export function PartFf({ t: e }) {
  var r;
  const t = (r = e.composer) == null ? void 0 : r.value,
    n = e.reached("sent") && !e.reached("answer");
  return (
    <figure
      className={de("pa pa2 pam pa2m", e.reached("close") && "pam--done")}
      data-name="Personal agents V2 / Motion"
    >
      <article className="pa-window">
        <header className="pa-header">
          <span className="pa-header__title">
            <span className="pa-node pa-node--agent" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="6" cy="6" r="4.25" />
                <circle cx="6" cy="6" r="1.6" fill="currentColor" stroke="none" />
              </svg>
            </span>
            {Vt.label}
          </span>
          {n && (
            <span className={de("pa-status pa2m-status", e.reached("collapse") && "pa2m-status--out")}>
              <span className="pa-status__dot" aria-hidden="true" />
              {Vt.status}
            </span>
          )}
        </header>
        <div className="pa2-chat">
          {e.passed("type-ask") && <p className="pa2-bubble pa2m-rise">{au.ask}</p>}
          {e.reached("panel") && <PartDf t={e} />}
          {e.reached("answer") && (
            <div className="pa2-answer" data-name="Turn / Agent answer">
              <p className="pa-call__reply">
                <PartDi text={pu} />
              </p>
              {e.reached("answer-cards") && (
                <>
                  <div className="pa2m-rise">
                    <PaPicks />
                  </div>
                  <div
                    className="pa2m-rise"
                    style={{
                      animationDelay: "90ms",
                    }}
                  >
                    <PaOffer />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="pa2-composer" data-name="Composer">
          <span className={de("pa2-composer__placeholder", t && "pa2m-typed")}>
            {t ? (
              <>
                {t}
                <span className="pa2m-caret" />
              </>
            ) : (
              af
            )}
          </span>
          <span
            className={de("pa2-composer__send", e.reached("sent") && !e.passed("sent") && "pa2m-send")}
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />
            </svg>
          </span>
        </div>
      </article>
    </figure>
  );
}

export function PersonalAgentsScene() {
  const e = useRef(null),
    t = useLandedOnScreen(e),
    n = useSi(),
    r = useQr(Vf, t && n);
  return (
    <div ref={e}>
      <PartFf key={r.runKey} t={r} />
    </div>
  );
}

export const PersonalAgentsMotion = () => (
  <SblScope>
    <PersonalAgentsScene />
  </SblScope>
);
