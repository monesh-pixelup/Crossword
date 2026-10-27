"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useContext, useLayoutEffect, useRef } from "react";
import igCtaChevronIcon from "./assets/icons/ig-cta-chevron.svg";
import igMoreIcon from "./assets/icons/ig-more.svg";
import {
  AiPills,
  ChatComposer,
  ChatMessage,
  ContentFade,
  Gj2Rail,
  Le,
  PartBe,
  PartDt,
  PartFt,
  PartHt,
  PartJe,
  PartJl,
  PartRe,
  PartRt,
  PartVn,
  Pi,
  ProductCollection,
  RecCard,
  SblScope,
  StoreNavItems,
  de,
  h2,
  useLandedOnScreen,
  useQr,
  useSi,
  useThreadScroll,
  y0,
} from "./kit";

export function q1() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const D4 = igMoreIcon.src;

export const F4 = igCtaChevronIcon.src;

export const Ur = "Trailwell";

export const H4 = "trailwell.com/backpacks";

export const O4 = {
  handle: "trailwell",
  headline: "Everyday. Anywhere.",
  cta: "Find my backpack",
  caption: "Commute, weekends away, trails. Find the backpack that fits how you carry.",
  tags: "#everydaycarry #travel",
};

export const U4 = {
  eyebrow: "Find your carry",
  headline: "Your everyday carry, sorted.",
  sub: "Backpacks for work, weekends and the trail.",
};

export const qo = [
  {
    id: "weekender",
    image: Le.weekender,
    name: "Weekender",
    meta: "30L · Opens flat",
    price: "$148",
  },
  {
    id: "roam",
    image: Le.roam,
    name: "Roam",
    meta: "40L · Lockable zips",
    price: "$189",
  },
  {
    id: "overnight",
    image: Le.overnight,
    name: "Overnight",
    meta: "24L · Shoe pocket",
    price: "$132",
  },
];

export const $ = {
  welcome: "Hi! I'm your Trailwell guide. Tell us how you carry, and we'll find a backpack that fits.",
  prompts: [
    {
      id: "laptop",
      text: "Laptop-friendly?",
    },
    {
      id: "carryon",
      text: "Carry-on size?",
    },
    {
      id: "match",
      text: "Find My Match",
    },
  ],
  start: "Find My Match",
  intro: "Let's find a backpack that fits the way you travel.",
  q1: {
    label: "Q1. What will you mainly use your backpack for?",
    options: [
      {
        key: "A",
        text: "Work and everyday commute",
      },
      {
        key: "B",
        text: "Weekend trips and short getaways",
      },
      {
        key: "C",
        text: "Hiking and outdoor adventures",
      },
    ],
  },
  q1Answer: "B",
  q2: {
    label: "Q2. What matters most in your weekend backpack?",
    options: [
      {
        key: "A",
        text: "Room for 2–3 days",
      },
      {
        key: "B",
        text: "Lightweight and easy to carry",
      },
      {
        key: "C",
        text: "A separate laptop compartment",
      },
    ],
  },
  q2Answer: "A",
  thinking: "Thinking…",
  result: "For 2–3 days away, three carry-on packs:",
  composer: "Or tell us in your own words…",
};

export function AdjQuiz({ question, selected }) {
  return (
    <div className="adj-quiz">
      <p className="adj-quiz__label">{question.label}</p>
      <div className="adj-quiz__rows">
        {question.options.map((n) => (
          <PartHt
            key={n.key}
            appearance="secondary"
            label={n.text}
            className={n.key === selected ? "adj-answer adj-answer--selected" : "adj-answer"}
            iconLeading={<span className="adj-answer__key">{n.key}</span>}
          />
        ))}
      </div>
    </div>
  );
}

export function AdjPicks({ loading = !1, staggerResolve = !1 }) {
  return useContext(y0) ? (
    <div className="adj-picks">
      <Gj2Rail
        products={qo.map((r) => ({
          id: r.id,
          title: r.name,
          brand: r.meta,
          price: r.price,
          image: r.image,
        }))}
        loading={loading}
      />
    </div>
  ) : (
    <div className="adj-picks">
      <ProductCollection>
        {qo.map((r, i) => (
          <RecCard
            key={r.id}
            product={{
              id: r.id,
              name: r.name,
              brand: r.meta,
              price: r.price,
              image: r.image,
            }}
            cta={!0}
            ctaAppearance="primary"
            loading={loading}
            resolveDelayMs={staggerResolve ? i * 90 : void 0}
          />
        ))}
      </ProductCollection>
    </div>
  );
}

export const ci = (e, t) => e.options.find((n) => n.key === t).text;

export function PartB4({ step }) {
  return step === 3 || step === 4 ? (
    <>
      <PartRt>
        <ChatMessage role="user" text={$.start} />
      </PartRt>
      <PartJe>
        <ChatMessage role="assistant" text={$.intro} />
        <AdjQuiz question={$.q1} selected={step === 4 ? $.q1Answer : void 0} />
      </PartJe>
    </>
  ) : step === 5 ? (
    <>
      <PartRt>
        <ChatMessage role="user" text={ci($.q1, $.q1Answer)} />
      </PartRt>
      <PartJe>
        <AdjQuiz question={$.q2} />
      </PartJe>
    </>
  ) : step === 6 ? (
    <>
      <PartRt>
        <ChatMessage role="user" text={ci($.q2, $.q2Answer)} />
      </PartRt>
      <PartJe>
        <div className="adj-thinking">
          <PartRe name="insight" size={14} />
          <span>{$.thinking}</span>
        </div>
        <AdjPicks loading={!0} />
      </PartJe>
    </>
  ) : (
    <PartJe>
      <ChatMessage role="assistant" text={$.result} />
      <AdjPicks />
    </PartJe>
  );
}

export function AdjWidget({ step }) {
  return step === 2 ? (
    <PartFt brand={Ur} className="adj-widget adj-widget--compact" composer={<></>}>
      <PartJe>
        <ChatMessage role="assistant" text={$.welcome} />
        <AiPills options={$.prompts} selectedId="" />
      </PartJe>
    </PartFt>
  ) : (
    <PartFt
      brand={Ur}
      className={step === 6 ? "adj-widget adj-widget--expanded adj-widget--end" : "adj-widget adj-widget--expanded"}
      composer={<ChatComposer value={$.composer} />}
    >
      <div className="adj-thread">
        <PartB4 step={step} />
      </div>
    </PartFt>
  );
}

export function AdjShell({ copy = O4 } = {}) {
  return (
    <article className="adj-shell adj-ig">
      <header className="adj-ig__head">
        <div className="adj-ig__profile">
          <span className="adj-ig__avatar">
            <img src="/images/landing/home-v2/trailwell-mark.svg" alt="Trailwell profile" />
          </span>
          <div className="adj-ig__name">
            {copy.handle}
            <small>Sponsored</small>
          </div>
        </div>
        <img className="adj-ig__more" src={D4} alt="" />
      </header>
      <div className="adj-ig__media">
        <img
          className="adj-ig__art"
          src="/images/landing/home-v2/trailwell-ad-creative-v2.webp"
          alt="Orange, cobalt and mustard Trailwell backpacks in a playful floating composition"
        />
        <img className="adj-ig__wordmark" src="/images/landing/home-v2/trailwell-wordmark.svg" alt="Trailwell" />
        <h2 className="adj-ig__headline">
          {copy.headline.split(" ").map((t) => (
            <span key={t}>{t}</span>
          ))}
        </h2>
      </div>
      <div className="adj-ig__cta">
        {copy.cta}
        <img src={F4} alt="" />
      </div>
      <p className="adj-ig__caption">
        <b>{copy.handle}</b> {copy.caption} <span>{copy.tags}</span>
      </p>
    </article>
  );
}

export function AdjShell2({ step = 2, widget, hero = U4 }) {
  return (
    <article className="adj-shell adj-store">
      <div className="hm-ill-browser-chrome">
        <div className="hm-ill-browser-chrome__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="hm-ill-browser-chrome__address">
          <img src={Pi} width="10" height="11" alt="" />
          <span>{H4}</span>
        </div>
      </div>
      <header className="hm-ill-chat-header adj-nav">
        <span className="adj-nav__logo">{Ur}</span>
        <StoreNavItems />
        <div className="hm-ill-chat-header__group">
          <PartBe icon="search" label="Search" variant="outline" />
          <PartBe icon="shoppingCart" label="Cart" variant="outline" />
        </div>
      </header>
      <div className="adj-store__body">
        <section className="adj-hero">
          <span className="adj-hero__eyebrow">{hero.eyebrow}</span>
          <h2>{hero.headline}</h2>
          <p>{hero.sub}</p>
          <img
            className="adj-hero__img"
            src="/images/landing/home-v2/trailwell-banner-colorful-v2.webp"
            alt="Cobalt, burnt orange and mustard Trailwell backpacks in an angled campaign composition"
          />
        </section>
        <ContentFade />
        {widget ?? <AdjWidget step={step} />}
      </div>
    </article>
  );
}

export const Lf = [
  {
    id: "ad",
    type: "pause",
    ms: 1400,
  },
  {
    id: "tap-ad",
    type: "appear",
    ms: 280,
  },
  {
    id: "store",
    type: "appear",
    ms: 750,
  },
  {
    id: "widget",
    type: "text",
    text: $.welcome,
  },
  {
    id: "prompts",
    type: "appear",
    ms: 1300,
  },
  {
    id: "pick-match",
    type: "appear",
    ms: 450,
  },
  {
    id: "expand",
    type: "appear",
    ms: 720,
  },
  {
    id: "start",
    type: "appear",
    ms: 350,
  },
  {
    id: "think-1",
    type: "think",
    labels: ["Thinking"],
  },
  {
    id: "intro",
    type: "text",
    text: $.intro,
  },
  {
    id: "q1",
    type: "appear",
    ms: 1700,
  },
  {
    id: "pick-q1",
    type: "appear",
    ms: 650,
  },
  {
    id: "answer-1",
    type: "appear",
    ms: 450,
  },
  {
    id: "think-2",
    type: "think",
    labels: ["Thinking"],
  },
  {
    id: "q2",
    type: "appear",
    ms: 1700,
  },
  {
    id: "pick-q2",
    type: "appear",
    ms: 650,
  },
  {
    id: "answer-2",
    type: "appear",
    ms: 450,
  },
  {
    id: "think-3",
    type: "think",
    labels: ["Thinking", "Finding carry-on packs"],
  },
  {
    id: "result",
    type: "text",
    text: $.result,
  },
  {
    id: "resolved",
    type: "pause",
    ms: 600,
  },
];

export function AdjmQuiz({ t: e, id, pickId, question, answer }) {
  return e.reached(id) ? (
    <div className="adjm-quiz">
      <AdjQuiz question={question} selected={e.reached(pickId) ? answer : void 0} />
    </div>
  ) : null;
}

export function PartEf2({ t: e }) {
  const t = useRef(null),
    n = useRef(null),
    r = useRef(null),
    i = useRef(null),
    l = useRef(null),
    o = e.reached("widget"),
    a = e.reached("expand");
  return (
    useLayoutEffect(() => {
      const c = t.current,
        d = n.current,
        v = r.current,
        w = i.current;
      if (!o || !c || !d || !v || !w) return;
      const h = c.getBoundingClientRect(),
        m = (p, x) => {
          const C = x.getBoundingClientRect(),
            f = {
              t: C.top - h.top,
              r: h.right - C.right,
              b: h.bottom - C.bottom,
              l: C.left - h.left,
            };
          for (const [u, g] of Object.entries(f)) d.style.setProperty(`--adjm-${p}-${u}`, `${g}px`);
        };
      m("from", v), m("to", w);
    }, [o]),
    useThreadScroll(l, {
      thread: ".adj-thread",
      pin: ".hm-ill-user-turn",
      clearance: 8,
      index: e.index,
      reducedMotion: e.reducedMotion,
    }),
    (
      <div className={de("adjm-layer", o && "adjm-layer--in")} ref={t}>
        <div className={de("adjm-surface", a && "adjm-surface--open")} ref={n} />
        {o && (
          <PartFt
            brand={Ur}
            rootRef={r}
            className={de(
              "adj-widget adj-widget--compact adjm-compact",
              e.reached("prompts") && "adjm-compact--prompts",
              a && "adjm-compact--out",
            )}
            composer={<></>}
          >
            <PartJe>
              <ChatMessage role="assistant">
                <PartDt text={$.welcome} />
              </ChatMessage>
              <AiPills options={$.prompts} selectedId={e.reached("pick-match") ? "match" : ""} />
            </PartJe>
          </PartFt>
        )}
        <PartFt
          brand={Ur}
          rootRef={i}
          viewportRef={l}
          className={de("adj-widget adj-widget--expanded adjm-expanded", a && "adjm-expanded--open")}
          composer={<ChatComposer value={$.composer} />}
        >
          <div className="adj-thread">
            {e.reached("start") && (
              <PartRt animateIn={!0}>
                <ChatMessage role="user" text={$.start} />
              </PartRt>
            )}
            {e.reached("think-1") && (
              <PartJe>
                <PartVn t={e} id="think-1" />
                {e.reached("intro") && <PartJl text={$.intro} />}
                <AdjmQuiz t={e} id="q1" pickId="pick-q1" question={$.q1} answer={$.q1Answer} />
              </PartJe>
            )}
            {e.reached("answer-1") && (
              <PartRt animateIn={!0}>
                <ChatMessage role="user" text={ci($.q1, $.q1Answer)} />
              </PartRt>
            )}
            {e.reached("think-2") && (
              <PartJe>
                <PartVn t={e} id="think-2" />
                <AdjmQuiz t={e} id="q2" pickId="pick-q2" question={$.q2} answer={$.q2Answer} />
              </PartJe>
            )}
            {e.reached("answer-2") && (
              <PartRt animateIn={!0}>
                <ChatMessage role="user" text={ci($.q2, $.q2Answer)} />
              </PartRt>
            )}
            {e.reached("think-3") && (
              <PartJe>
                <PartVn t={e} id="think-3" />
                {e.reached("result") && <PartJl text={$.result} />}
                <div className="adjm-enter">
                  <AdjPicks loading={!e.reached("resolved")} staggerResolve={!0} />
                </div>
              </PartJe>
            )}
          </div>
          <div className="adjm-spacer" aria-hidden="true" />
        </PartFt>
      </div>
    )
  );
}

export function PartMf({ t }) {
  return (
    <div className={de("adj adjm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store")}>
      <AdjShell />
      <div className="adjm-plate" />
      <AdjShell2 widget={<PartEf2 t={t} />} />
    </div>
  );
}

export function AdJourneyScene() {
  const e = useRef(null),
    t = useLandedOnScreen(e),
    n = useSi(),
    r = useQr(Lf, t && n);
  return (
    <div ref={e}>
      <PartMf key={r.runKey} t={r} />
    </div>
  );
}

export const AdJourneyMotion = () => (
  <SblScope>
    <AdJourneyScene />
  </SblScope>
);
