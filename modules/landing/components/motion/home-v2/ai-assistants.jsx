"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { Fragment, useEffect, useRef } from "react";
import { Le, Pi, SblScope, de, fu, up, useLandedOnScreen, useQr, useSi, useThreadScroll, x2 } from "./kit";

export const { cream: cf, lotion: uf, gel: df, set: pf } = Le;

export const ff = "Sorelle Labs";

export const hf = "chatgpt.com";

export const mf = [
  {
    id: "cream",
    name: "Deep Hydration Cream",
    price: "$42",
    note: "Rich moisture that never feels sticky",
    image: cf,
  },
  {
    id: "lotion",
    name: "Barrier Repair Lotion",
    price: "$34",
    note: "Lightweight daily lotion with ceramides",
    image: uf,
  },
  {
    id: "gel",
    name: "Cloud Gel Moisturizer",
    price: "$29",
    note: "Water-gel texture for normal to dry skin",
    image: df,
  },
];

export const Vs = {
  id: "set",
  name: "Deep Hydration Set",
  price: "$55",
  note: "Cream, night mask and travel-size cleanser",
  image: pf,
};

export const ui = {
  name: "Winter Glow Special",
  detail: "Free gift on orders over $50",
  resolved: "Free gift included",
};

export const cu = [
  {
    role: "user",
    text: "I'm looking for a moisturizer for dry skin, under $50.",
  },
  {
    role: "assistant",
    text: [
      "Here are three options in your range. The ",
      {
        b: "Deep Hydration Cream",
      },
      " at $42 is especially moisturizing without feeling sticky, according to reviewers.",
    ],
    result: "picks",
  },
  {
    role: "user",
    text: "I'll go with the Deep Hydration Cream.",
  },
  {
    role: "assistant",
    text: [
      "For $13 more, the ",
      {
        b: "Deep Hydration Set",
      },
      " adds a night mask and a travel-size cleanser. Our ",
      {
        b: "Winter Glow Special",
      },
      " also includes a free gift on orders over $50.",
    ],
    result: "bundle",
  },
  {
    role: "user",
    text: "I'll take the set.",
  },
  {
    role: "assistant",
    text: ["Done. Your free gift is added too."],
    result: "order",
  },
];

export const gf = "Searching for moisturizers for dry skin";

export const vf = "Ask anything";

export const xf = {
  send: <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />,
  chevron: <path d="M7 10l5 5 5-5" />,
  share: (
    <>
      <path d="M12 14V4M8 7.5L12 3.5l4 4" />
      <path d="M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" />
    </>
  ),
  dots: (
    <>
      <circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  mic: (
    <>
      <rect x="9" y="3.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" />
    </>
  ),
  voice: <path d="M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" />,
  stop: <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
      <path d="M15.5 8.5V7a2.5 2.5 0 00-2.5-2.5H7A2.5 2.5 0 004.5 7v6A2.5 2.5 0 007 15.5h1.5" />
    </>
  ),
  up: (
    <path d="M7.5 20.5h-2a1 1 0 01-1-1v-8a1 1 0 011-1h2m0 10V10.5l3.6-6.3a1.6 1.6 0 012.9 1.1l-.6 4.2h4.4a2 2 0 012 2.4l-1.3 6.6a2 2 0 01-2 1.5H7.5z" />
  ),
  down: (
    <path d="M16.5 3.5h2a1 1 0 011 1v8a1 1 0 01-1 1h-2m0-10v10l-3.6 6.3a1.6 1.6 0 01-2.9-1.1l.6-4.2H5.2a2 2 0 01-2-2.4l1.3-6.6a2 2 0 012-1.5h10z" />
  ),
  retry: (
    <>
      <path d="M19.5 12a7.5 7.5 0 11-2.2-5.3" />
      <path d="M19.5 4.5v3.5H16" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="8.5" width="16" height="4" rx="1" />
      <path d="M5.5 12.5V19a1 1 0 001 1h11a1 1 0 001-1v-6.5M12 8.5V20M12 8.5C10.8 5.5 7.5 4.6 7.5 6.6c0 1.6 2.8 1.9 4.5 1.9zm0 0c1.2-3 4.5-3.9 4.5-1.9 0 1.6-2.8 1.9-4.5 1.9z" />
    </>
  ),
};

export function AiaGlyph({ name, size = 18 }) {
  return (
    <svg
      className="aia-glyph"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={!0}
    >
      {xf[name]}
    </svg>
  );
}

export function PartTa({ product, wide = !1 }) {
  return (
    <article className={wide ? "aia-tile aia-tile--wide" : "aia-tile"} data-name={`Product / ${product.name}`}>
      <div className="aia-tile__media">
        <img src={product.image} alt="" />
        {!wide && <span className="aia-tile__select" />}
      </div>
      <p className="aia-tile__name">{product.name}</p>
      <p className="aia-tile__meta">
        {product.price}
        {" • "}
        {product.note}
      </p>
      {wide && (
        <p className="aia-tile__promo">
          <AiaGlyph name="gift" size={14} />
          <span>
            <strong>{ui.name}</strong>
            {" • "}
            {ui.detail}
          </span>
        </p>
      )}
    </article>
  );
}

export function AiaTile() {
  return (
    <div className="aia-tile aia-tile--loading" data-name="Product / Loading">
      <div className="aia-tile__media" />
      <span
        className="aia-bar"
        style={{
          width: "72%",
        }}
      />
      <span
        className="aia-bar"
        style={{
          width: "88%",
        }}
      />
    </div>
  );
}

export function AiaOrder() {
  return (
    <section className="aia-order" data-name="Order summary">
      <p className="aia-order__merchant">
        <span className="aia-order__mark">S</span>
        {ff}
      </p>
      <div className="aia-order__row">
        <img className="aia-order__thumb" src={Vs.image} alt="" />
        <span className="aia-order__text">
          <b>{Vs.name}</b>
          <small>Cream, mask, travel cleanser</small>
        </span>
        <span className="aia-order__price">{Vs.price}</span>
      </div>
      <div className="aia-order__row">
        <span className="aia-order__thumb aia-order__thumb--gift">
          <AiaGlyph name="gift" size={18} />
        </span>
        <span className="aia-order__text">
          <b>{ui.name}</b>
          <small>{ui.resolved}</small>
        </span>
      </div>
    </section>
  );
}

export function AiaActions() {
  return (
    <div className="aia-actions" data-name="Message actions">
      {["copy", "up", "down", "share", "retry"].map((e) => (
        <span key={e}>
          <AiaGlyph name={e} size={16} />
        </span>
      ))}
    </div>
  );
}

export function BrowserChrome2() {
  return (
    <div className="hm-ill-browser-chrome">
      <div className="hm-ill-browser-chrome__dots">
        <span />
        <span />
        <span />
      </div>
      <div className="hm-ill-browser-chrome__address">
        <img src={Pi} width="10" height="11" alt="" />
        <span>{hf}</span>
      </div>
    </div>
  );
}

export function AiaHeader() {
  return (
    <header className="aia-header" data-name="Header">
      <span className="aia-model">
        ChatGPT
        <AiaGlyph name="chevron" size={16} />
      </span>
      <span className="aia-header__end">
        <span className="aia-share">
          <AiaGlyph name="share" size={16} />
          Share
        </span>
        <span className="aia-icon-btn">
          <AiaGlyph name="dots" size={18} />
        </span>
      </span>
    </header>
  );
}

export function AiaComposer({ send, value }) {
  return (
    <div className="aia-composer" data-name="Composer">
      <div className="aia-composer__field">
        <span className="aia-icon-btn">
          <AiaGlyph name="plus" size={20} />
        </span>
        {value ? (
          <span className="aia-composer__placeholder aia-composer__value">{value}</span>
        ) : (
          <span className="aia-composer__placeholder">{vf}</span>
        )}
        <span className="aia-icon-btn">
          <AiaGlyph name="mic" size={18} />
        </span>
        <span className="aia-send">
          <AiaGlyph key={send} name={send} size={18} />
        </span>
      </div>
    </div>
  );
}

export const zn = (e) => {
  const t = cu[e];
  return t.role === "user" ? t.text : "";
};

export const Dn = (e) => {
  const t = cu[e];
  return t.role === "assistant" ? t.text : [];
};

export const Gf = [
  {
    id: "idle",
    type: "pause",
    ms: 500,
  },
  {
    id: "ask",
    type: "compose",
    text: zn(0),
    leadMs: 300,
  },
  {
    id: "wait-1",
    type: "appear",
    ms: 900,
  },
  {
    id: "search",
    type: "appear",
    ms: 2e3,
  },
  {
    id: "reply-1",
    type: "appear",
    ms: x2(Dn(1)),
  },
  {
    id: "tiles",
    type: "appear",
    ms: 700,
  },
  {
    id: "read-1",
    type: "pause",
    ms: 1700,
  },
  {
    id: "choose",
    type: "compose",
    text: zn(2),
    leadMs: 300,
  },
  {
    id: "wait-2",
    type: "appear",
    ms: 1e3,
  },
  {
    id: "reply-2",
    type: "appear",
    ms: x2(Dn(3)),
  },
  {
    id: "set",
    type: "appear",
    ms: 700,
  },
  {
    id: "read-2",
    type: "pause",
    ms: 1900,
  },
  {
    id: "take",
    type: "compose",
    text: zn(4),
    leadMs: 300,
  },
  {
    id: "wait-3",
    type: "appear",
    ms: 800,
  },
  {
    id: "reply-3",
    type: "appear",
    ms: x2(Dn(5)),
  },
  {
    id: "order",
    type: "appear",
    ms: 700,
  },
  {
    id: "done",
    type: "pause",
    ms: 300,
  },
];

export function PartWf({ runs, play }) {
  let n = 0;
  const r = (i) =>
    i.split(/(\s+)/).map((l, o) => {
      if (!l) return null;
      if (/^\s+$/.test(l)) return <Fragment key={o}>{l}</Fragment>;
      const a = n++ * fu;
      return (
        <span
          key={o}
          className="aiam-token"
          style={{
            animationDelay: `${a}ms`,
          }}
        >
          {l}
        </span>
      );
    });
  return (
    <p className={de("aia-reply aiam-stream", play && "aiam-stream--play")}>
      {runs.map((i, l) =>
        typeof i == "string" ? <Fragment key={l}>{r(i)}</Fragment> : <strong key={l}>{r(i.b)}</strong>,
      )}
    </p>
  );
}

export function AiamTileSlot({ loading, delayMs = 0, children }) {
  const r = useRef(loading),
    i = loading || r.current;
  return (
    useEffect(() => {
      r.current = loading;
    }, [loading]),
    (
      <div className="aiam-tile-slot">
        {children}
        {i && (
          <div
            className={de("aiam-tile-cover", !loading && "aiam-tile-cover--hidden")}
            style={{
              transitionDelay: `${delayMs}ms`,
            }}
          >
            <AiaTile />
          </div>
        )}
      </div>
    )
  );
}

export function PartWs({ show, className, children }) {
  return (
    <div className={show ? className : "aiam-reserve"} aria-hidden={!show}>
      {children}
    </div>
  );
}

export function AiamSlot({ t: e, runs, replyId, statusId }) {
  const i = e.reached(replyId);
  return (
    <div className="aiam-slot">
      <PartWf runs={runs} play={i} />
      {!i &&
        (statusId && e.reached(statusId) ? (
          <p className="aia-status aiam-status">{gf}</p>
        ) : (
          <span className="aiam-dot" />
        ))}
    </div>
  );
}

export function AiaThread({ t: e }) {
  return (
    <div className="aia-thread">
      {e.passed("ask") && (
        <div className="aia-turn aia-turn--user aiam-send">
          <p className="aia-bubble">{zn(0)}</p>
        </div>
      )}
      {e.reached("wait-1") && (
        <div className="aia-turn aia-turn--assistant">
          <AiamSlot t={e} runs={Dn(1)} replyId="reply-1" statusId="search" />
          <PartWs show={e.reached("search")} className="aiam-fade">
            <div className="aia-carousel">
              {mf.map((t, n) => (
                <AiamTileSlot key={t.id} loading={!e.reached("tiles")} delayMs={n * 110}>
                  <PartTa product={t} />
                </AiamTileSlot>
              ))}
            </div>
          </PartWs>
        </div>
      )}
      {e.passed("choose") && (
        <div className="aia-turn aia-turn--user aiam-send">
          <p className="aia-bubble">{zn(2)}</p>
        </div>
      )}
      {e.reached("wait-2") && (
        <div className="aia-turn aia-turn--assistant">
          <AiamSlot t={e} runs={Dn(3)} replyId="reply-2" />
          <PartWs show={e.reached("reply-2")} className="aiam-fade">
            <AiamTileSlot loading={!e.reached("set")}>
              <PartTa product={Vs} wide={!0} />
            </AiamTileSlot>
          </PartWs>
        </div>
      )}
      {e.passed("take") && (
        <div className="aia-turn aia-turn--user aiam-send">
          <p className="aia-bubble">{zn(4)}</p>
        </div>
      )}
      {e.reached("wait-3") && (
        <div className="aia-turn aia-turn--assistant">
          <AiamSlot t={e} runs={Dn(5)} replyId="reply-3" />
          <PartWs show={e.reached("order")} className="aiam-rise">
            <AiaOrder />
          </PartWs>
          <PartWs show={e.reached("done")} className="aiam-fade">
            <AiaActions />
          </PartWs>
        </div>
      )}
    </div>
  );
}

export function AiaCanvas({ t: e }) {
  var l;
  const t = useRef(null);
  useThreadScroll(t, {
    thread: ".aia-thread",
    index: e.index,
    reducedMotion: e.reducedMotion,
  });
  const n =
      (e.passed("ask") && !e.reached("read-1")) ||
      (e.passed("choose") && !e.reached("read-2")) ||
      (e.passed("take") && !e.reached("done")),
    r = (l = e.composer) == null ? void 0 : l.value,
    i = n ? "stop" : r ? "send" : "voice";
  return (
    <div className="aia-canvas">
      <div className="aia aiam" data-name="AI Assistants / Motion">
        <BrowserChrome2 />
        <div className="aia-gpt" data-name="ChatGPT">
          <AiaHeader />
          <div className="aia-scroll" data-name="Conversation" ref={t}>
            <AiaThread t={e} />
          </div>
          <AiaComposer
            send={i}
            value={
              r ? (
                <>
                  {r}
                  <span className="aiam-caret" />
                </>
              ) : (
                void 0
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export function AiAssistantsScene() {
  const e = useRef(null),
    t = useLandedOnScreen(e),
    n = useSi(),
    r = useQr(Gf, t && n);
  return (
    <div ref={e}>
      <AiaCanvas key={r.runKey} t={r} />
    </div>
  );
}

export const AiAssistantsMotion = () => (
  <SblScope>
    <AiAssistantsScene />
  </SblScope>
);
