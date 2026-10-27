"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AiPills,
  ChatHeader,
  ChatMessage,
  ContentFade,
  Gj2Rail,
  Le,
  Media,
  PartBe,
  PartFt,
  PartHt,
  PartJe,
  PartJl,
  PartRe,
  PartRt,
  PartVn,
  Pi,
  ProductCollection,
  ProductMeta,
  Rating,
  RecCard,
  SblScope,
  SkeletonBlock,
  StoreNavItems,
  de,
  h2,
  useLandedOnScreen,
  useLineCount,
  useQr,
  useSi,
  useThreadScroll,
  y0,
} from "./kit";

export function CommerceCard({ product, added = !1, loading = !1, resolveDelayMs }) {
  const i = useRef(null),
    l = useLineCount(i, ".hm-ill-product-meta__title", 2),
    o = useRef(loading),
    a = loading || o.current;
  return (
    useEffect(() => {
      o.current = loading;
    }, [loading]),
    (
      <article className="hm-ill-commerce-card" ref={i}>
        <div className="hm-ill-commerce-card__content">
          <div className="hm-ill-commerce-card__media">
            <Media src={product.image} alt={product.title} />
            {product.tag && <span className="hm-ill-commerce-card__tag">{product.tag}</span>}
          </div>
          <ProductMeta
            brand={product.brand}
            title={product.title}
            price={product.price}
            rating={product.rating}
            ratingCount={product.ratingCount}
          />
        </div>
        <button type="button" className="hm-ill-commerce-card__cta" disabled={added}>
          {added ? "Added to cart" : "Add to cart"}
        </button>
        {a && (
          <div
            className={`hm-ill-commerce-card__skeleton-overlay${loading ? "" : " hm-ill-commerce-card__skeleton-overlay--hidden"}`}
            style={
              resolveDelayMs
                ? {
                    transitionDelay: `${resolveDelayMs}ms`,
                  }
                : void 0
            }
          >
            <div className="hm-ill-commerce-card__content">
              <SkeletonBlock aspectRatio="257 / 147.758" radius={16} />
              <div className="hm-ill-commerce-card__meta-skeleton">
                <div className="hm-ill-commerce-card__meta-skeleton-row hm-ill-commerce-card__meta-skeleton-row--split">
                  <SkeletonBlock width={40} height={9} radius={4} />
                  <SkeletonBlock width={20} height={9} radius={4} />
                </div>
                <div>
                  {Array.from(
                    {
                      length: l,
                    },
                    (c, d) => (
                      <div key={d} className="hm-ill-commerce-card__meta-skeleton-row">
                        <SkeletonBlock width={d === l - 1 ? "65%" : "100%"} height={10} radius={4} />
                      </div>
                    ),
                  )}
                </div>
                <div className="hm-ill-commerce-card__meta-skeleton-row hm-ill-commerce-card__meta-skeleton-row--rating">
                  <SkeletonBlock width={49} height={9} radius={4} />
                  <SkeletonBlock width={23} height={9} radius={4} />
                </div>
              </div>
            </div>
            <div className="hm-ill-commerce-card__cta-skeleton">
              <SkeletonBlock height={30} radius={112.792} />
            </div>
          </div>
        )}
      </article>
    )
  );
}

export const yl = "Goodwell";

export const Xo = "goodwell.com";

export const ue = {
  sleep60: {
    id: "sleep60",
    image: Le.sleep60,
    name: "Daily Sleep Gummies",
    variant: "60 Count",
    price: "$29.99",
    rating: 4.8,
    reviews: "2,140",
  },
  sleep28: {
    id: "sleep28",
    image: Le.sleep28,
    name: "Daily Sleep Gummies",
    variant: "28 Count",
    price: "$17.99",
    rating: 4.7,
    reviews: "860",
  },
  energy: {
    id: "energy",
    image: Le.energy,
    name: "Clean Energy Gummies",
    variant: "60 Count",
    price: "$27.99",
    rating: 4.6,
    reviews: "1,310",
  },
  focus: {
    id: "focus",
    image: Le.focus,
    name: "Daily Focus Gummies",
    variant: "60 Count",
    price: "$27.99",
    rating: 4.7,
    reviews: "980",
  },
  calm: {
    id: "calm",
    image: Le.calm,
    name: "Calm Mood Gummies",
    variant: "60 Count",
    price: "$26.99",
    rating: 4.5,
    reviews: "720",
  },
  immunity: {
    id: "immunity",
    image: Le.immunity,
    name: "Immunity Gummies",
    variant: "60 Count",
    price: "$24.99",
    rating: 4.6,
    reviews: "1,050",
  },
};

export const Q4 = [ue.sleep60, ue.energy, ue.focus, ue.calm];

export const wt = {
  placeholder: "Search products or ask anything",
  askLabel: "Ask AI",
  suggestions: [
    {
      id: "sleep",
      text: "Something to help me sleep better",
    },
    {
      id: "energy",
      image: Le.energy,
      text: "Energy without caffeine",
    },
    {
      id: "focus",
      image: Le.focus,
      text: "Gummies for daily focus",
    },
  ],
  selected: "sleep",
  recentLabel: "Recent searches",
  recent: [ue.immunity, ue.focus, ue.calm],
};

export const Je = {
  query: "Something to help me sleep better",
  answer:
    "For better sleep and easier mornings, I'd recommend our Daily Sleep Gummies, made with magnesium and calming botanicals.",
  picks: [ue.sleep60, ue.sleep28],
  moreLabel: "Explore more wellness gummies",
  more: [ue.calm, ue.focus, ue.energy, ue.immunity],
  composer: "Refine your search…",
  followUps: [
    {
      id: "no-melatonin",
      text: "No melatonin",
    },
    {
      id: "compare",
      text: "Compare these",
    },
    {
      id: "under-25",
      text: "Under $25",
    },
  ],
};

export const kt = {
  product: ue.sleep60,
  blurb: "Magnesium and calming botanicals to help you wind down and wake up easier.",
  variants: [ue.sleep60, ue.sleep28],
  askLabel: "Ask AI about this product",
  suggestions: [
    {
      id: "why",
      text: "Why did you recommend this?",
    },
    {
      id: "melatonin",
      text: "Does it contain melatonin?",
    },
    {
      id: "compare",
      text: "Compare with 28 Count",
    },
  ],
  backLabel: "Back to AI search",
};

export function PartBr({ product, className }) {
  return (
    <div className={["ais-product-visual", className].filter(Boolean).join(" ")}>
      <img src={product.image} alt={`${product.name}, ${product.variant}`} />
    </div>
  );
}

export function ChatHeader2({ searching }) {
  return (
    <header className="hm-ill-chat-header ais-nav">
      <span className="ais-nav__logo">{yl}</span>
      <StoreNavItems />
      <div className="hm-ill-chat-header__group">
        <span className="ais-nav__ask">
          <PartRe name="spark" size={10} />
          Ask AI
        </span>
        <PartBe
          icon="search"
          label="Search"
          variant="outline"
          className={searching ? "ais-nav__search--active" : void 0}
        />
        <PartBe icon="shoppingCart" label="Cart" variant="outline" />
      </div>
    </header>
  );
}

export function AisHome() {
  return (
    <div className="ais-home">
      <div className="ais-hero">
        <div className="ais-hero__copy">
          <h2>{h2.headline}</h2>
          <p>{h2.sub}</p>
          <span className="ais-btn">{h2.shop}</span>
        </div>
        <PartBr product={kt.product} className="ais-hero__img" />
      </div>
      <div className="ais-shelf">
        {"Best sellers "}
        <span>View all</span>
      </div>
      <div className="ais-grid">
        {Q4.map((e) => (
          <PartBr key={e.id} product={e} className="ais-card" />
        ))}
      </div>
    </div>
  );
}

export function AisDropdown({ picked }) {
  const t = wt.suggestions.find((n) => n.id === wt.selected).text;
  return (
    <div className="ais-dropdown">
      <div className="ais-field">
        <PartRe name="search" size={14} />
        {picked ? (
          <>
            <span className="ais-field__value">{t}</span>
            <span className="ais-field__caret ais-field__caret--after" />
          </>
        ) : (
          <>
            <span className="ais-field__caret" />
            <span>{wt.placeholder}</span>
          </>
        )}
      </div>
      <section className="ais-dropdown__section">
        <p className="ais-label">
          <PartRe name="spark" size={10} />
          {wt.askLabel}
        </p>
        <AiPills options={wt.suggestions} selectedId={picked ? wt.selected : ""} />
      </section>
      <section className="ais-dropdown__section">
        <p className="ais-label">{wt.recentLabel}</p>
        <ul className="ais-recent">
          {wt.recent.map((n) => (
            <li key={n.id}>
              <PartBr product={n} className="ais-recent__thumb" />
              <span>
                {n.name} {n.variant}
                <small>{n.price}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function Jo(e) {
  return {
    id: e.id,
    image: e.image,
    title: `${e.name} ${e.variant}`,
    price: e.price,
    rating: e.rating,
    ratingCount: e.reviews,
  };
}

export function AisPdp() {
  const e = kt.product;
  return (
    <div className="ais-pdp">
      <div className="ais-context">
        <PartRe name="spark" size={10} />
        <span className="ais-context__query">“{Je.query}”</span>
        <span className="ais-context__back">{kt.backLabel}</span>
      </div>
      <div className="ais-pdp__grid">
        <div className="ais-gallery">
          <div className="ais-gallery__thumbs">
            {[0, 1, 2, 3].map((t) => (
              <PartBr
                key={t}
                product={e}
                className={t === 0 ? "ais-gallery__thumb ais-gallery__thumb--active" : "ais-gallery__thumb"}
              />
            ))}
          </div>
          <PartBr product={e} className="ais-gallery__main" />
        </div>
        <div className="ais-details">
          <div className="ais-details__head">
            <h2>{e.name}</h2>
            <div className="ais-details__meta">
              <span className="ais-details__price">{e.price}</span>
              <Rating value={e.rating} count={e.reviews} />
            </div>
          </div>
          <p className="ais-details__blurb">{kt.blurb}</p>
          <p className="ais-label">Size</p>
          <div className="ais-variants">
            {kt.variants.map((t) => (
              <PartHt
                key={t.id}
                appearance="secondary"
                label={t.variant}
                className={t.id === e.id ? "ais-variant--selected" : "ais-variant"}
              />
            ))}
          </div>
          <PartHt appearance="primary" label="Add to cart" className="ais-details__cta" />
        </div>
        <section className="ais-ask">
          <p className="ais-label">
            <PartRe name="spark" size={10} />
            {kt.askLabel}
          </p>
          <AiPills options={kt.suggestions} selectedId="" />
        </section>
      </div>
    </div>
  );
}

export function AssistantTurn({ children, delayMs }) {
  return (
    <div
      className="hm-ill-assistant-turn--enter"
      style={
        delayMs
          ? {
              animationDelay: `${delayMs}ms`,
            }
          : void 0
      }
    >
      {children}
    </div>
  );
}

export const Tf = [
  {
    id: "home",
    type: "pause",
    ms: 1200,
  },
  {
    id: "open-search",
    type: "appear",
    ms: 1300,
  },
  {
    id: "pick",
    type: "appear",
    ms: 850,
  },
  {
    id: "takeover",
    type: "appear",
    ms: 420,
  },
  {
    id: "think",
    type: "think",
    labels: ["Thinking", "Finding sleep support"],
  },
  {
    id: "answer",
    type: "text",
    text: Je.answer,
  },
  {
    id: "picks",
    type: "load",
    ms: 900,
  },
  {
    id: "read",
    type: "pause",
    ms: 1300,
  },
  {
    id: "more",
    type: "appear",
    ms: 1900,
  },
  {
    id: "focus-picks",
    type: "appear",
    ms: 500,
  },
  {
    id: "select",
    type: "appear",
    ms: 900,
  },
  {
    id: "pdp",
    type: "appear",
    ms: 900,
  },
];

export function PartPf({ t: e, closing }) {
  const n = useRef(null),
    r = e.reached("select"),
    i = useContext(y0);
  return (
    useThreadScroll(n, {
      thread: ".ais-thread",
      focus: e.reached("focus-picks") ? ".ais-picks" : void 0,
      index: e.index,
      reducedMotion: e.reducedMotion,
    }),
    (
      <PartFt
        brand={yl}
        className={de("ais-cw aism-cw", closing && "aism-cw--closing")}
        header={<ChatHeader brand={yl} showExpand={!1} />}
        composerValue={Je.composer}
        viewportRef={n}
      >
        <div className="ais-thread">
          <PartRt animateIn={!0}>
            <ChatMessage role="user" text={Je.query} />
          </PartRt>
          {e.reached("think") && (
            <PartJe>
              <PartVn t={e} id="think" />
              {e.reached("answer") && <PartJl text={Je.answer} />}
              {e.reached("picks") && (
                <div className={r ? "ais-picks ais-picks--picking" : "ais-picks"}>
                  {i ? (
                    <Gj2Rail products={Je.picks.map(Jo)} loading={!e.passed("picks")} />
                  ) : (
                    <ProductCollection>
                      {Je.picks.map((l, o) => (
                        <div
                          key={l.id}
                          className={r && l.id === kt.product.id ? "ais-pick ais-pick--selected" : "ais-pick"}
                        >
                          <CommerceCard product={Jo(l)} loading={!e.passed("picks")} resolveDelayMs={o * 90} />
                        </div>
                      ))}
                    </ProductCollection>
                  )}
                </div>
              )}
              {e.reached("more") && (
                <>
                  <AssistantTurn>
                    <div className="ais-more aism-more">
                      <p className="ais-label">{Je.moreLabel}</p>
                      <ProductCollection>
                        {Je.more.map((l) => (
                          <RecCard
                            key={l.id}
                            product={{
                              id: l.id,
                              name: l.name,
                              price: l.price,
                              image: l.image,
                            }}
                          />
                        ))}
                      </ProductCollection>
                    </div>
                  </AssistantTurn>
                  <AssistantTurn delayMs={260}>
                    <AiPills options={Je.followUps} selectedId="" />
                  </AssistantTurn>
                </>
              )}
            </PartJe>
          )}
        </div>
      </PartFt>
    )
  );
}

export function Ais({ t: e }) {
  const t = useRef(null),
    n = useRef(null),
    [r, i] = useState(null),
    l = e.reached("open-search"),
    o = e.reached("pdp");
  return (
    useLayoutEffect(() => {
      const a = t.current;
      if (!o || !a || e.reducedMotion) return;
      const c = a.querySelector(".ais-pick--selected .hm-ill-commerce-card__media img"),
        d = a.querySelector(".ais-gallery__main img");
      if (!c || !d) return;
      const v = a.getBoundingClientRect(),
        w = (h) => new DOMRect(h.left - v.left, h.top - v.top, h.width, h.height);
      i({
        from: w(c.getBoundingClientRect()),
        to: w(d.getBoundingClientRect()),
        src: d.currentSrc || d.src,
      });
    }, [o, e.reducedMotion]),
    useLayoutEffect(() => {
      const a = n.current;
      if (!r || !a) return;
      const c = (v) => ({
          left: `${v.x}px`,
          top: `${v.y}px`,
          width: `${v.width}px`,
          height: `${v.height}px`,
        }),
        d = a.animate([c(r.from), c(r.to)], {
          duration: 560,
          easing: "cubic-bezier(0.45, 0, 0.15, 1)",
          fill: "forwards",
        });
      return (d.onfinish = () => i(null)), () => d.cancel();
    }, [r]),
    (
      <div className="ais aism">
        <article className="ais-store">
          <div className="hm-ill-browser-chrome">
            <div className="hm-ill-browser-chrome__dots">
              <span />
              <span />
              <span />
            </div>
            <div className="hm-ill-browser-chrome__address">
              <img src={Pi} width="10" height="11" alt="" />
              <span key={o ? "pdp" : "home"} className={o ? "aism-address" : void 0}>
                {o ? `${Xo}/daily-sleep-gummies` : Xo}
              </span>
            </div>
          </div>
          <div className="ais-viewport" ref={t}>
            <div className="ais-page">
              <ChatHeader2 searching={l && !e.reached("takeover")} />
              <div className="ais-body">
                {o ? (
                  <div className={de("aism-pdp", r && "aism-pdp--flying")}>
                    <AisPdp />
                  </div>
                ) : (
                  <AisHome />
                )}
                <ContentFade />
                {l && (
                  <div className={de("aism-search", e.reached("takeover") && "aism-search--out")}>
                    <div className="ais-scrim" />
                    <AisDropdown picked={e.reached("pick")} />
                  </div>
                )}
              </div>
            </div>
            {e.reached("takeover") && <PartPf t={e} closing={o} />}
            {r && <img ref={n} className="aism-flight" src={r.src} alt="" />}
          </div>
        </article>
      </div>
    )
  );
}

export function AiSearchScene() {
  const e = useRef(null),
    t = useLandedOnScreen(e),
    n = useSi(),
    r = useQr(Tf, t && n);
  return (
    <div ref={e}>
      <Ais key={r.runKey} t={r} />
    </div>
  );
}

export const AiSearchMotion = () => (
  <SblScope>
    <AiSearchScene />
  </SblScope>
);
