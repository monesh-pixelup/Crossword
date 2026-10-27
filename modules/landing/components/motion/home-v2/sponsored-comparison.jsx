"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { useEffect, useRef, useState } from "react";
import razorImg from "./assets/razor.webp";
import sponsoredComparisonMarkIcon from "./assets/icons/sponsored-comparison-mark.svg";
import sponsoredFrameDotIcon from "./assets/icons/sponsored-frame-dot.svg";
import sponsoredFrameOutlineIcon from "./assets/icons/sponsored-frame-outline.svg";
import sponsoredSearchIcon from "./assets/icons/sponsored-search.svg";
import sponsoredStarAIcon from "./assets/icons/sponsored-star-a.svg";
import sponsoredStarBIcon from "./assets/icons/sponsored-star-b.svg";
import sponsoredStarCIcon from "./assets/icons/sponsored-star-c.svg";
import sponsoredWishlistIcon from "./assets/icons/sponsored-wishlist.svg";
import subtractImg from "./assets/subtract.webp";
import { PartRe, SkeletonBlock, h2, useLandedOnScreen, useQr, x2, y2 } from "./kit";

export function BrowserChrome({ url, field = "address" }) {
  return (
    <div className={`hm-ill-browser-chrome hm-ill-browser-chrome--${field}`}>
      <div className="hm-ill-browser-chrome__dots">
        <span />
        <span />
        <span />
      </div>
      <div className="hm-ill-browser-chrome__address">
        <PartRe name={field === "search" ? "search" : "address"} />
        <span>{url}</span>
      </div>
    </div>
  );
}

export const F5 = razorImg.src;

export const mr = {
  query: "Gillette",
  brand: "Harry’s",
  sponsored: "Sponsored",
  title: "Harry’s vs. Gillette",
};

export const Ae = {
  url: "harrys.com",
  storeName: "Harry’s",
  productName: "Harry’s (5-blade)",
  addToCart: "Add to cart",
  price: "$63.32",
  originalPrice: "$74.49",
  discount: "15% off",
  rating: 4,
  image: F5,
  imageAlt: "Harry’s 5-blade razor with handle, blade cover and cartridge",
};

export const _t = {
  poweredBy: "Powered by",
  poweredByBrand: "Crossword",
  title: "Why Harry’s is better than Gillette",
  columnA: "Harry’s (5-blade)",
  columnB: "Gillette Fusion5",
  rows: [
    {
      label: "Number of Blades",
      valueA: "5",
      valueB: "5",
    },
    {
      label: "Flexible Head",
      valueA: "Yes",
      valueB: "Yes",
    },
    {
      label: "Precision Trimmer",
      valueA: "Yes",
      valueB: "No",
    },
    {
      label: "Cost per Refill",
      valueA: "~$2/blade",
      valueB: "~$4–5/blade",
    },
    {
      label: "Cost per Refill",
      valueA: "~$2/blade",
      valueB: "~$4–5/blade",
    },
  ],
};

export function ComparisonRow({ label, valueA, valueB }) {
  return (
    <div className="hm-ill-comparison-row">
      <div className="hm-ill-comparison-row__cell hm-ill-comparison-row__label">{label}</div>
      <div className="hm-ill-comparison-row__cell hm-ill-comparison-row__value-a">{valueA}</div>
      <div className="hm-ill-comparison-row__cell hm-ill-comparison-row__value-b">{valueB}</div>
    </div>
  );
}

export function SponsoredCover({ loading, radius = 0, className, shapes, inset = 0 }) {
  const l = useRef(loading),
    o = loading || l.current;
  return (
    useEffect(() => {
      l.current = loading;
    }, [loading]),
    (
      <div className={`hm-ill-sponsored__cover ${className}`}>
        {o && (
          <div
            className={`hm-sell-loading-frame__overlay${loading ? "" : " hm-sell-loading-frame__overlay--hidden"}`}
            style={{
              borderRadius: radius,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: inset,
                right: inset,
                top: 0,
                bottom: 0,
              }}
            >
              {shapes.map((a, c) => (
                <div
                  key={c}
                  style={{
                    position: "absolute",
                    left: a.x,
                    right: a.right,
                    top: a.y,
                    width: typeof a.w == "string" ? a.w : void 0,
                    height: typeof a.h == "string" ? a.h : void 0,
                  }}
                >
                  <SkeletonBlock width={a.w} height={a.h} radius={a.r ?? 4} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export const O5 = sponsoredSearchIcon.src;

export const U5 = sponsoredWishlistIcon.src;

export const b5 = sponsoredComparisonMarkIcon.src;

export const Zo = sponsoredStarAIcon.src;

export const Ko = sponsoredStarBIcon.src;

export const G5 = sponsoredStarCIcon.src;

export const W5 = subtractImg.src;

export const Z5 = sponsoredFrameOutlineIcon.src;

export const K5 = sponsoredFrameDotIcon.src;

export function SponsoredFrameScale({ children, centered = !0 }) {
  return (
    <div className="hm-ill-sponsored-frame-scale">
      <div className="hm-ill-sponsored-frame">
        <img className="hm-ill-sponsored-frame__texture" src={W5} alt="" aria-hidden="true" />
        <img className="hm-ill-sponsored-frame__outline" src={Z5} alt="" aria-hidden="true" />
        {[
          {
            left: 18.52,
            top: 572.82,
          },
          {
            left: 1249.8,
            top: 572.82,
          },
          {
            left: 1249.8,
            top: 21.3,
          },
          {
            left: 20.79,
            top: 16.26,
          },
        ].map((n) => (
          <img
            key={`${n.left}-${n.top}`}
            className="hm-ill-sponsored-frame__dot"
            style={n}
            src={K5}
            alt=""
            aria-hidden="true"
          />
        ))}
        {centered ? <div className="hm-ill-sponsored-frame__content">{children}</div> : children}
      </div>
    </div>
  );
}

export const Y5 = [Zo, Ko, Zo, Ko, G5];

export function PartQ5({ className }) {
  return (
    <div className={["hm-ill-sponsored hm-ill-sponsored--search", className].filter(Boolean).join(" ")}>
      <div className="hm-ill-sponsored__search-chrome">
        <BrowserChrome url={mr.query} field="search" />
      </div>
      <div className="hm-ill-sponsored__results">
        <div className="hm-ill-sponsored__ad">
          <div className="hm-ill-sponsored__ad-head">
            <div className="hm-ill-sponsored__ad-brand">
              <span className="hm-ill-sponsored__ad-logo">H</span>
              <span className="hm-ill-sponsored__ad-label">{mr.brand}</span>
            </div>
            <span className="hm-ill-sponsored__ad-label">{mr.sponsored}</span>
          </div>
          <p className="hm-ill-sponsored__ad-title">{mr.title}</p>
          <span className="hm-ill-sponsored__bar hm-ill-sponsored__bar--ad-1" />
          <span className="hm-ill-sponsored__bar hm-ill-sponsored__bar--ad-2" />
        </div>
        <SponsoredResult nameWidth={74} titleWidth={188} lineWidth={268} />
        <SponsoredResult nameWidth={58} titleWidth={158} lineWidth={243} />
      </div>
      <div className="hm-ill-sponsored__fade" aria-hidden="true" />
    </div>
  );
}

export function SponsoredResult({ nameWidth, titleWidth, lineWidth }) {
  return (
    <div className="hm-ill-sponsored__result">
      <div className="hm-ill-sponsored__result-source">
        <span className="hm-ill-sponsored__result-icon" />
        <span
          className="hm-ill-sponsored__result-bar"
          style={{
            width: nameWidth,
          }}
        />
      </div>
      <span
        className="hm-ill-sponsored__result-title"
        style={{
          width: titleWidth,
        }}
      />
      <span
        className="hm-ill-sponsored__result-bar"
        style={{
          width: lineWidth,
        }}
      />
    </div>
  );
}

export const X5 = [
  {
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
    r: 11.4,
  },
];

export const J5 = [
  {
    x: 0,
    y: 6,
    w: 163.3,
    h: 16,
    r: 5,
  },
  {
    right: 126.9,
    y: 0.5,
    w: 28,
    h: 26.9,
    r: 14,
  },
  {
    right: 0,
    y: 0.5,
    w: 118.3,
    h: 28,
    r: 14,
  },
];

export const e4 = [
  {
    x: 0,
    y: 7.5,
    w: 50.9,
    h: 13,
    r: 4,
  },
  {
    x: 58.9,
    y: 7.5,
    w: 49.7,
    h: 13,
    r: 4,
  },
  {
    x: 116.5,
    y: 5,
    w: 48,
    h: 18,
    r: 9,
  },
  {
    right: 0,
    y: 6,
    w: 88,
    h: 16,
    r: 5,
  },
];

export const t4 = [
  {
    x: 13.5,
    y: 33.5,
    w: 18.3,
    h: 17.2,
    r: 8,
  },
  {
    x: 36.1,
    y: 37,
    w: 213.7,
    h: 11,
    r: 4,
  },
  {
    x: 142.4,
    y: 81.3,
    w: 86.1,
    h: 8,
    r: 4,
  },
  {
    x: 281.4,
    y: 81.3,
    w: 80.8,
    h: 8,
    r: 4,
  },
  {
    x: 24.5,
    y: 123.4,
    w: 88.6,
    h: 8,
    r: 4,
  },
  {
    x: 155.4,
    y: 123.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 286.4,
    y: 123.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 24.5,
    y: 157.4,
    w: 66,
    h: 8,
    r: 4,
  },
  {
    x: 155.4,
    y: 157.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 286.4,
    y: 157.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 24.5,
    y: 191.4,
    w: 87.7,
    h: 8,
    r: 4,
  },
  {
    x: 155.4,
    y: 191.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 286.4,
    y: 191.4,
    w: 24,
    h: 9,
    r: 4,
  },
  {
    x: 24.5,
    y: 225.4,
    w: 68.9,
    h: 8,
    r: 4,
  },
  {
    x: 155.4,
    y: 225.4,
    w: 62,
    h: 9,
    r: 4,
  },
  {
    x: 286.4,
    y: 225.4,
    w: 77.6,
    h: 9,
    r: 4,
  },
  {
    x: 24.5,
    y: 259.4,
    w: 68.9,
    h: 8,
    r: 4,
  },
  {
    x: 155.4,
    y: 259.4,
    w: 62,
    h: 9,
    r: 4,
  },
  {
    x: 286.4,
    y: 259.4,
    w: 77.6,
    h: 9,
    r: 4,
  },
];

export function PartN4({ loading, className, comparisonSlot }) {
  return (
    <div className={["hm-ill-sponsored hm-ill-sponsored--pdp", className].filter(Boolean).join(" ")}>
      <div className="hm-ill-sponsored__pdp-chrome">
        <BrowserChrome url={Ae.url} />
      </div>
      <div className="hm-ill-sponsored__store-nav">
        <span className="hm-ill-sponsored__store-name">{Ae.storeName}</span>
        <div className="hm-ill-sponsored__store-links">
          <span
            style={{
              width: 44.09,
            }}
          />
          <span
            style={{
              width: 53.77,
            }}
          />
          <span
            style={{
              width: 37.64,
            }}
          />
          <span
            style={{
              width: 49.47,
            }}
          />
        </div>
        <img src={O5} alt="" width={20.432} height={20.432} />
      </div>
      <div className="hm-ill-sponsored__gallery">
        <img src={Ae.image} alt={Ae.imageAlt} />
        {loading && (
          <SponsoredCover
            loading={loading.gallery}
            radius={11.4}
            className="hm-ill-sponsored__cover--gallery"
            shapes={X5}
          />
        )}
      </div>
      <div className="hm-ill-sponsored__info">
        <div className="hm-ill-sponsored__info-main">
          <div className="hm-ill-sponsored__info-top">
            <h2 className="hm-ill-sponsored__product-name">{Ae.productName}</h2>
            <div className="hm-ill-sponsored__actions">
              <span className="hm-ill-sponsored__wishlist">
                <img src={U5} alt="" width={12.904} height={12.904} />
              </span>
              <button type="button" className="hm-ill-sponsored__cart">
                {Ae.addToCart}
              </button>
            </div>
          </div>
          <div className="hm-ill-sponsored__info-meta">
            <div className="hm-ill-sponsored__price-row">
              <span className="hm-ill-sponsored__price">{Ae.price}</span>
              <span className="hm-ill-sponsored__price hm-ill-sponsored__price--was">{Ae.originalPrice}</span>
              <span className="hm-ill-sponsored__discount">{Ae.discount}</span>
            </div>
            <div className="hm-ill-sponsored__stars" role="img" aria-label={`Rated ${Ae.rating} out of 5`}>
              {Y5.map((r, i) => (
                <img key={i} src={r} alt="" width={16.01} height={16.01} />
              ))}
            </div>
          </div>
        </div>
        {comparisonSlot ?? (
          <div className="hm-ill-sponsored__comparison">
            <div className="hm-ill-sponsored__column-highlight" aria-hidden="true" />
            <div className="hm-ill-sponsored__comparison-title">
              <img src={b5} alt="" width={18.281} height={17.206} />
              <p>{_t.title}</p>
            </div>
            <div className="hm-ill-sponsored__table">
              <div className="hm-ill-sponsored__table-head">
                <span className="hm-ill-sponsored__table-head-gap" />
                <span className="hm-ill-sponsored__table-head-a">{_t.columnA}</span>
                <span className="hm-ill-sponsored__table-head-b">{_t.columnB}</span>
              </div>
              {_t.rows.map((r, i) => (
                <ComparisonRow key={i} label={r.label} valueA={r.valueA} valueB={r.valueB} />
              ))}
            </div>
            <div
              className={[
                "hm-ill-sponsored__powered",
                loading && "hm-ill-sponsored__powered--cross",
                (loading == null ? void 0 : loading.comparison) && "hm-ill-sponsored__powered--pending",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <PartRe name="spark" size={9.678} />
              <span>{_t.poweredBy}</span>
              <strong>{_t.poweredByBrand}</strong>
            </div>
            {loading && (
              <SponsoredCover
                loading={loading.comparison}
                radius={8.073}
                className="hm-ill-sponsored__cover--comparison"
                shapes={t4}
              />
            )}
          </div>
        )}
        {loading && (
          <>
            <SponsoredCover
              loading={loading.title}
              radius={4}
              className="hm-ill-sponsored__cover--title"
              shapes={J5}
              inset={25.825}
            />
            <SponsoredCover
              loading={loading.price}
              radius={4}
              className="hm-ill-sponsored__cover--price"
              shapes={e4}
              inset={25.825}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const r4 = [
  {
    id: "idle",
    type: "pause",
    ms: 300,
  },
  {
    id: "open",
    type: "appear",
    ms: 480,
  },
  {
    id: "title",
    type: "load",
    ms: 250,
  },
  {
    id: "price",
    type: "load",
    ms: 200,
  },
  {
    id: "comparison",
    type: "load",
    ms: 300,
  },
];

export function useSponsoredAssetsReady() {
  const [e, t] = useState(!1);
  return (
    useEffect(() => {
      var i;
      let n = !1;
      const r = new Image();
      return (
        (r.src = Ae.image),
        Promise.all([(i = document.fonts) == null ? void 0 : i.ready, r.decode().catch(() => {})]).then(() => {
          n || t(!0);
        }),
        () => {
          n = !0;
        }
      );
    }, []),
    e
  );
}

export function SponsoredMotion({ comparison, comparisonMs = 300 } = {}) {
  const n = r4.map((v) =>
      v.id === "comparison"
        ? {
            ...v,
            ms: comparisonMs,
          }
        : v,
    ),
    r = useRef(null),
    i = useLandedOnScreen(r),
    l = useSponsoredAssetsReady(),
    o = useQr(n, i && l),
    a = o.reached("open"),
    c = o.passed("open"),
    d = [
      "hm-ill-sponsored-motion__scene",
      a && "hm-ill-sponsored-motion__scene--open",
      c && "hm-ill-sponsored-motion__scene--image",
    ]
      .filter(Boolean)
      .join(" ");
  return (
    <div className="hm-ill-sponsored-motion" ref={r}>
      <SponsoredFrameScale centered={!1}>
        <div className={d}>
          <div className="hm-ill-sponsored-motion__shell" />
          <div className="hm-ill-sponsored-motion__content">
            <PartN4
              className="hm-ill-sponsored-motion__pdp"
              loading={{
                gallery: !o.passed("open"),
                title: !o.passed("title"),
                price: !o.passed("price"),
                comparison: !o.passed("comparison"),
              }}
              comparisonSlot={comparison == null ? void 0 : comparison(o)}
            />
          </div>
          <div className="hm-ill-sponsored-motion__search">
            <PartQ5 className="hm-ill-sponsored-motion__search-card" />
          </div>
          <div className="hm-ill-sponsored-motion__chrome">
            <BrowserChrome url={mr.query} field="search" />
            <div className="hm-ill-sponsored-motion__chrome-address">
              <BrowserChrome url={Ae.url} />
            </div>
          </div>
          <div className="hm-ill-sponsored-motion__glow" />
        </div>
      </SponsoredFrameScale>
    </div>
  );
}

export const Zt = {
  ..._t,
  rows: _t.rows.filter((e, t, n) => n.findIndex((r) => r.label === e.label) === t),
};

export function PartL4({ phase }) {
  const t = phase === "thinking",
    n = phase === "loading" || t;
  return (
    <section className={["sc2-embed", phase && `sc2-embed--${phase}`].filter(Boolean).join(" ")}>
      <header className="sc2-embed__head">
        <PartO4 />
        <h3 className="sc2-embed__title">{Zt.title}</h3>
        {phase && phase !== "loading" && (
          <span className={t ? "sc2-wait" : "sc2-wait sc2-wait--out"} aria-hidden={!t}>
            Thinking…
          </span>
        )}
      </header>
      <div className="sc2-table-wrap">
        {phase && (
          <div className={n ? "sc2-skel" : "sc2-skel sc2-skel--hidden"} aria-hidden="true">
            {Array.from(
              {
                length: 7,
              },
              (r, i) => (
                <span
                  key={i}
                  className="sc2-skel__row"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ),
            )}
          </div>
        )}
        <div className="sc2-table" role="table">
          <div className="sc2-table__row sc2-table__row--head" role="row">
            <span role="columnheader">What matters</span>
            <span role="columnheader">{Zt.columnA}</span>
            <span role="columnheader">{Zt.columnB}</span>
          </div>
          {Zt.rows.map((r, i) => (
            <div
              key={i}
              className="sc2-table__row"
              role="row"
              style={{
                "--sc2-i": i + 1,
              }}
            >
              <span role="rowheader">{r.label}</span>
              <span role="cell">{r.valueA}</span>
              <span role="cell">{r.valueB}</span>
            </div>
          ))}
          <div
            className="sc2-table__row sc2-table__row--foot"
            role="row"
            style={{
              "--sc2-i": Zt.rows.length + 1,
            }}
          >
            <span role="rowheader">Details</span>
            <span role="cell" className="sc2-view">
              <span className="sc2-view__word">View</span> <PartYo />
            </span>
            <span role="cell" className="sc2-view">
              <span className="sc2-view__word">View</span> <PartYo />
            </span>
          </div>
        </div>
      </div>
      <p className="sc2-embed__note">
        {Zt.poweredBy} <u>{Zt.poweredByBrand}</u>
      </p>
    </section>
  );
}

export function PartO4() {
  return (
    <svg
      viewBox="0 0 256 256"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M84.27,171.73l-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3a7.92,7.92,0,0,1,0,14.86l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0Z" />
      <line x1="176" y1="16" x2="176" y2="64" />
      <line x1="200" y1="40" x2="152" y2="40" />
    </svg>
  );
}

export function PartYo() {
  return (
    <svg
      viewBox="0 0 12 12"
      width={10}
      height={10}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
    </svg>
  );
}

export const a4 = 1600;

export function SponsoredComparisonMotion() {
  return (
    <div className="sc2-motion">
      <SponsoredMotion
        comparisonMs={a4}
        comparison={(e) => <PartL4 phase={e.passed("comparison") ? "in" : "thinking"} />}
      />
    </div>
  );
}
