"use client";

// Decompiled from the homev2-motion export bundle (see ./index.tsx). Names the build minified stay as they were.

import { Fragment, createContext, forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import addGoldIcon from "./assets/icons/add-gold.svg";
import addIcon from "./assets/icons/add.svg";
import addMutedIcon from "./assets/icons/add-muted.svg";
import addressIcon from "./assets/icons/address.svg";
import aiStatusIcon from "./assets/icons/ai-status.svg";
import aureliaMarkImg from "./assets/aurelia-mark.svg";
import backgroundTextureImg from "./assets/background-texture.webp";
import bellIcon from "./assets/icons/bell.svg";
import caretDownIcon from "./assets/icons/caret-down.svg";
import caretRightIcon from "./assets/icons/caret-right.svg";
import checksIcon from "./assets/icons/checks.svg";
import closeGoldIcon from "./assets/icons/close-gold.svg";
import closeIcon from "./assets/icons/close.svg";
import expandGoldIcon from "./assets/icons/expand-gold.svg";
import expandIcon from "./assets/icons/expand.svg";
import favoriteIcon from "./assets/icons/favorite.svg";
import funnelIcon from "./assets/icons/funnel.svg";
import historyGoldIcon from "./assets/icons/history-gold.svg";
import historyIcon from "./assets/icons/history.svg";
import insightIcon from "./assets/icons/insight.svg";
import insightsBackgroundImg from "./assets/insights-background.webp";
import lockIcon from "./assets/icons/lock.svg";
import moneyIcon from "./assets/icons/money.svg";
import p01BrewhausProEspressoMachineImg from "./assets/01-brewhaus-pro-espresso-machine.webp";
import p02BrewhausCoffeeAccessoryBundleImg from "./assets/02-brewhaus-coffee-accessory-bundle.webp";
import p03MaraisLeatherFrameCaseImg from "./assets/03-marais-leather-frame-case.webp";
import p04MaraisGoldToneSilkScarfImg from "./assets/04-marais-gold-tone-silk-scarf.webp";
import p05WavelineCompactSmartSpeakerImg from "./assets/05-waveline-compact-smart-speaker.webp";
import p06AuraWirelessEarbudsImg from "./assets/06-aura-wireless-earbuds.webp";
import p07HoltAndCoLeatherBifoldWalletImg from "./assets/07-holt-and-co-leather-bifold-wallet.webp";
import p08AudenWaveProBlackImg from "./assets/08-auden-wave-pro-black.webp";
import p09AudenViewedHeadphonesIvoryImg from "./assets/09-auden-viewed-headphones-ivory.webp";
import p10AudenViewedHeadphonesOliveImg from "./assets/10-auden-viewed-headphones-olive.webp";
import p11AudenViewedHeadphonesMustardGoldImg from "./assets/11-auden-viewed-headphones-mustard-gold.webp";
import p12FamilyAirFryerImg from "./assets/12-family-air-fryer.webp";
import p13CompactAirFryerImg from "./assets/13-compact-air-fryer.webp";
import p14ShopperReferenceTripleDomeLampImg from "./assets/14-shopper-reference-triple-dome-lamp.webp";
import p15WarmTripodTableLampImg from "./assets/15-warm-tripod-table-lamp.webp";
import p16ModDomeTableLampImg from "./assets/16-mod-dome-table-lamp.webp";
import p17CopperRimBedsideLampImg from "./assets/17-copper-rim-bedside-lamp.webp";
import p18LumenSecondSkinFoundationImg from "./assets/18-lumen-second-skin-foundation.webp";
import p19MaraisRelaxedCottonShirtImg from "./assets/19-marais-relaxed-cotton-shirt.webp";
import p20StraightLegTailoredTrousersImg from "./assets/20-straight-leg-tailored-trousers.webp";
import p21MinimalLeatherSneakersImg from "./assets/21-minimal-leather-sneakers.webp";
import p22AeriaCycloneProVacuumImg from "./assets/22-aeria-cyclone-pro-vacuum.webp";
import p23DysonV15VacuumImg from "./assets/23-dyson-v15-vacuum.webp";
import roseGoldCurbChainImg from "./assets/rose-gold-curb-chain.webp";
import sceneFrameBackgroundIcon from "./assets/icons/scene-frame-background.svg";
import searchIcon from "./assets/icons/search.svg";
import sendGoldIcon from "./assets/icons/send-gold.svg";
import sendIcon from "./assets/icons/send.svg";
import shieldCheckIcon from "./assets/icons/shield-check.svg";
import shoppingCartIcon from "./assets/icons/shopping-cart.svg";
import sourceDotIcon from "./assets/icons/source-dot.svg";
import sparkIcon from "./assets/icons/spark.svg";
import sparkleIcon from "./assets/icons/sparkle.svg";
import starEmptyIcon from "./assets/icons/star-empty.svg";
import starFilledIcon from "./assets/icons/star-filled.svg";
import unionIcon from "./assets/icons/union.svg";
import userSoundIcon from "./assets/icons/user-sound.svg";
import usersThreeImg from "./assets/users-three.svg";
import warningIcon from "./assets/icons/warning.svg";

export const U3 = sceneFrameBackgroundIcon.src;

export const b3 = backgroundTextureImg.src;

export function SceneFrame({ children, hideBackground, height }) {
  return (
    <div
      className="hm-ill-scene-frame-scale"
      style={
        height
          ? {
              aspectRatio: `738 / ${height}`,
            }
          : void 0
      }
    >
      <div
        className={height ? "hm-ill-scene-frame hm-ill-scene-frame--sized" : "hm-ill-scene-frame"}
        style={
          height
            ? {
                height,
              }
            : void 0
        }
      >
        {!hideBackground && (
          <>
            {height ? (
              <svg className="hm-ill-scene-frame__background" viewBox={`0 0 738 ${height}`} aria-hidden="true">
                {[
                  [26, 24],
                  [712, 24],
                  [26, height - 24],
                  [712, height - 24],
                ].map(([r, i]) => (
                  <circle key={`${r}-${i}`} cx={r} cy={i} r={4.5} fill="none" stroke="#D2B75C" />
                ))}
              </svg>
            ) : (
              <img className="hm-ill-scene-frame__background" src={U3} alt="" aria-hidden="true" />
            )}
            <img className="hm-ill-scene-frame__texture" src={b3} alt="" aria-hidden="true" />
          </>
        )}
        <div className="hm-ill-scene-frame__content">{children}</div>
      </div>
    </div>
  );
}

export function G3(e, t, n, r) {
  const i = 3 * e - 3 * n + 1,
    l = 3 * n - 6 * e,
    o = 3 * e,
    a = 3 * t - 3 * r + 1,
    c = 3 * r - 6 * t,
    d = 3 * t,
    v = (p) => ((i * p + l) * p + o) * p,
    w = (p) => ((a * p + c) * p + d) * p,
    h = (p) => (3 * i * p + 2 * l) * p + o,
    m = (p) => {
      let x = p;
      for (let C = 0; C < 8; C++) {
        const f = v(x) - p,
          u = h(x);
        if (Math.abs(u) < 1e-6) break;
        x -= f / u;
      }
      return x;
    };
  return (p) => w(m(p));
}

export const W3 = G3(0.32, 0.72, 0, 1);

export function scrollEase(e, t, n = 320) {
  const r = e.scrollTop,
    i = t - r;
  if (Math.abs(i) < 1) return () => {};
  let l = !1;
  const o = performance.now(),
    a = (c) => {
      if (l) return;
      const d = Math.min(1, (c - o) / n);
      (e.scrollTop = r + i * W3(d)), d < 1 && requestAnimationFrame(a);
    };
  return (
    requestAnimationFrame(a),
    () => {
      l = !0;
    }
  );
}

export function isWindowActive() {
  return typeof document < "u" && document.visibilityState === "visible" && document.hasFocus();
}

export function useLandedOnScreen(e) {
  const [t, n] = useState(!1),
    [r, i] = useState(isWindowActive);
  return (
    useEffect(() => {
      const l = e.current;
      if (!l || typeof IntersectionObserver > "u") {
        n(!0);
        return;
      }
      const o = new IntersectionObserver(([a]) => n(a.isIntersecting), {
        threshold: 0.3,
      });
      return o.observe(l), () => o.disconnect();
    }, [e]),
    useEffect(() => {
      if (typeof document > "u") return;
      const l = () => i(isWindowActive());
      return (
        document.addEventListener("visibilitychange", l),
        window.addEventListener("focus", l),
        window.addEventListener("blur", l),
        () => {
          document.removeEventListener("visibilitychange", l),
            window.removeEventListener("focus", l),
            window.removeEventListener("blur", l);
        }
      );
    }, []),
    t && r
  );
}

export function typeOut(e, { msPerStep, jitterMs = msPerStep * 0.3, chunk = 1, onTick, onDone }) {
  let o = !1,
    a = 0,
    c;
  const d = () => {
    if (o) return;
    if (((a = Math.min(e.length, a + chunk)), onTick(e.slice(0, a)), a >= e.length)) {
      onDone();
      return;
    }
    const v = (Math.random() * 2 - 1) * jitterMs;
    c = window.setTimeout(d, Math.max(8, msPerStep + v));
  };
  return (
    (c = window.setTimeout(d, msPerStep)),
    () => {
      (o = !0), window.clearTimeout(c);
    }
  );
}

export const B1 = 45;

export const Yr = aureliaMarkImg.src;

export const up = roseGoldCurbChainImg.src;

export const Ze = "Aurelia";

export function Gj2Head() {
  return (
    <header className="gj2-head">
      <div className="gj2-head__group">
        <Gj2HeadPuck label="Chat history">
          <PartHp />
        </Gj2HeadPuck>
        <Gj2HeadPuck label="New chat">
          <PartU1 />
        </Gj2HeadPuck>
      </div>
      <Gj2HeadIdentity />
      <div className="gj2-head__group">
        <Gj2HeadPuck label="More">
          <PartMp />
        </Gj2HeadPuck>
        <Gj2HeadPuck label="Close">
          <PartGp />
        </Gj2HeadPuck>
      </div>
    </header>
  );
}

export function Gj2HeadIdentity() {
  return (
    <div className="gj2-head__identity">
      <PartH1 className="gj2-head__logo" />
      <span className="gj2-head__name">{Ze}</span>
    </div>
  );
}

export function Gj2Foot({ value }) {
  const t = useRef(null),
    [n, r] = useState(void 0);
  return (
    useLayoutEffect(() => {
      var l;
      if (!value) {
        r(void 0);
        return;
      }
      const i = ((l = t.current) == null ? void 0 : l.offsetHeight) ?? 0;
      r(Math.max(48, i + 12));
    }, [value]),
    (
      <footer className="gj2-foot">
        <div
          className="gj2-composer"
          style={
            n
              ? {
                  height: n,
                }
              : void 0
          }
        >
          {value ? (
            <span className="gj2-composer__value" ref={t}>
              {value}
              <span className="gj2-caret" aria-hidden="true" />
            </span>
          ) : (
            <span className="gj2-composer__placeholder">Ask anything</span>
          )}
          <span className={value ? "gj2-send gj2-send--ready" : "gj2-send"} aria-label="Send">
            <PartVp />
          </span>
        </div>
        <p className="gj2-note">
          {"AI can make mistakes. Powered by "}
          <u>Crossword</u>
        </p>
      </footer>
    )
  );
}

export function PartH1({ className }) {
  return (
    <span className={["aurelia-mark", className].filter(Boolean).join(" ")} aria-hidden="true">
      <img src={Yr} alt="" />
    </span>
  );
}

export function PartG0({ items, picked, className }) {
  return (
    <div className={["gj2-followups", className].filter(Boolean).join(" ")}>
      {items.map((r) => (
        <span key={r} className={r === picked ? "gj2-followup gj2-followup--picked" : "gj2-followup"}>
          {r}
        </span>
      ))}
    </div>
  );
}

export function Kn(e, t) {
  if (!e || !t) return;
  const n = (r) =>
    r
      .trim()
      .replace(/[.!?]+$/, "")
      .toLowerCase();
  return e.find((r) => n(r) === n(t));
}

export function Gj2Rail({ products, loading = !1 }) {
  return (
    <div className="gj2-rail">
      {products.map((n, r) => (
        <PartO1 key={n.id} product={n} loading={loading} resolveDelayMs={r * 80} />
      ))}
    </div>
  );
}

export function PartO1({
  product,
  added = !1,
  lone = !1,
  loading,
  resolveDelayMs = 0,
  adding = !1,
  addingDelayMs = 0,
}) {
  return (
    <article className={["gj2-card", lone && "gj2-card--lone"].filter(Boolean).join(" ")}>
      {loading !== void 0 && (
        <div
          className={loading ? "gj2-skel" : "gj2-skel gj2-skel--hidden"}
          style={{
            transitionDelay: loading ? "0ms" : `${resolveDelayMs}ms`,
          }}
          aria-hidden="true"
        >
          <span className="gj2-skel__media" />
          <span className="gj2-skel__line gj2-skel__line--brand" />
          <span className="gj2-skel__line gj2-skel__line--name" />
        </div>
      )}
      <div className="gj2-card__tile">
        <img
          src={product.image}
          alt=""
          style={
            product.imageFit
              ? {
                  objectFit: product.imageFit,
                }
              : void 0
          }
        />
        {product.tag && <span className="gj2-badge">{product.tag}</span>}
        <span className="gj2-card__expand" aria-label="Expand">
          <PartXp />
        </span>
      </div>
      <div className="gj2-card__col">
        <span className="gj2-card__caption">{product.brand}</span>
        <span className="gj2-card__title">{product.title}</span>
        {product.rating !== void 0 && <Gj2Rating value={product.rating} count={product.ratingCount ?? ""} />}
        <span className="gj2-card__price">{product.price}</span>
      </div>
      <div className="gj2-card__actions">
        <span className="gj2-puck" aria-label="Save for later">
          <PartWp />
        </span>
        <span className="gj2-puck" aria-label="Chat about this">
          <PartYp />
        </span>
        {added && adding ? (
          <span
            className="gj2-cta gj2-cta--lifecycle"
            style={{
              "--gj2-cta-delay": `${addingDelayMs}ms`,
            }}
          >
            <span className="gj2-cta__fill" />
            <span className="gj2-cta__phase gj2-cta__phase--adding">Adding…</span>
            <span className="gj2-cta__phase gj2-cta__phase--done">
              <PartHo />
              Added
            </span>
          </span>
        ) : added ? (
          <span className="gj2-cta gj2-cta--done">
            <PartHo />
            Added
          </span>
        ) : (
          <span className="gj2-cta">
            <PartU1 size={18} trim={!0} />
            Add
          </span>
        )}
      </div>
    </article>
  );
}

export function Gj2Rating({ value, count }) {
  return (
    <span className="gj2-rating">
      <span className="gj2-rating__stars" aria-label={`${value} out of 5`}>
        <span className="gj2-rating__empty">★★★★★</span>
        <span
          className="gj2-rating__fill"
          style={{
            width: `${(value / 5) * 100}%`,
          }}
        >
          ★★★★★
        </span>
      </span>
      <span className="gj2-rating__count">({count})</span>
    </span>
  );
}

export function Gj2HeadPuck({ label, children }) {
  return (
    <span className="gj2-head__puck" aria-label={label}>
      {children}
    </span>
  );
}

export const on = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function PartHp() {
  return (
    <svg {...on} width={16} height={16}>
      <polyline points="128 80 128 128 168 152" />
      <polyline points="72 104 32 104 32 64" />
      <path d="M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" />
    </svg>
  );
}

export function PartU1({ size = 16, trim = !1 }) {
  const n = trim ? (size * 192) / 256 : size;
  return (
    <svg {...on} viewBox={trim ? "32 32 192 192" : on.viewBox} width={n} height={n}>
      <line x1="40" y1="128" x2="216" y2="128" />
      <line x1="128" y1="40" x2="128" y2="216" />
    </svg>
  );
}

export function PartMp() {
  return (
    <svg viewBox="0 0 256 256" width={16} height={16} fill="currentColor">
      <circle cx="128" cy="128" r="12" />
      <circle cx="196" cy="128" r="12" />
      <circle cx="60" cy="128" r="12" />
    </svg>
  );
}

export function PartGp() {
  return (
    <svg {...on} width={16} height={16}>
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="200" y1="200" x2="56" y2="56" />
    </svg>
  );
}

export function PartVp() {
  return (
    <svg {...on} width={16} height={16}>
      <line x1="128" y1="216" x2="128" y2="40" />
      <polyline points="56 112 128 40 200 112" />
    </svg>
  );
}

export function PartXp() {
  return (
    <svg {...on} width={18} height={18}>
      <polyline points="168 48 208 48 208 88" />
      <polyline points="88 208 48 208 48 168" />
      <polyline points="208 168 208 208 168 208" />
      <polyline points="48 88 48 48 88 48" />
    </svg>
  );
}

export function PartWp() {
  return (
    <svg {...on} width={18} height={18}>
      <path d="M128,216S24,160,24,94A54,54,0,0,1,128,73.19h0A54,54,0,0,1,232,94C232,160,128,216,128,216Z" />
    </svg>
  );
}

export function PartYp() {
  return (
    <svg
      viewBox="2.5 3.758 25 25"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 7.5H8.5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1.5v3.5l4.5-3.5h5a3 3 0 0 0 3-3V15" />
      <path d="M21 5.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  );
}

export function PartHo() {
  return (
    <svg viewBox="24 24 208 208" width={14.625} height={14.625} fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}

export const ai = "Thinking…";

export const ml = "Fetching the product…";

export const jp = B1;

export const Qn = 32;

export function Gj2Msg({ text, animate }) {
  if (!animate) return <p className="gj2-msg gj2-msg--ai">{text}</p>;
  const n = text.split(" ");
  return (
    <p className="gj2-msg gj2-msg--ai">
      {n.map((r, i) => (
        <Fragment key={i}>
          <span
            className="gj2-word"
            style={{
              animationDelay: `${i * jp}ms`,
            }}
          >
            {r}
          </span>
          {i < n.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}

export function PartX0() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5z" />
    </svg>
  );
}

export const kp = historyIcon.src;

export const Np = addIcon.src;

export const Sp = expandIcon.src;

export const Lp = closeIcon.src;

export const Ep = sendIcon.src;

export const Mp = favoriteIcon.src;

export const Rp = insightIcon.src;

export const Tp = caretDownIcon.src;

export const Pp = aiStatusIcon.src;

export const Ap = historyGoldIcon.src;

export const Ip = addGoldIcon.src;

export const $p = expandGoldIcon.src;

export const Bp = closeGoldIcon.src;

export const Vp = sendGoldIcon.src;

export const zp = addMutedIcon.src;

export const Dp = sparkleIcon.src;

export const Fp = lockIcon.src;

export const Hp = shieldCheckIcon.src;

export const Op = checksIcon.src;

export const Up = unionIcon.src;

export const bp = sourceDotIcon.src;

export const Gp = moneyIcon.src;

export const Wp = userSoundIcon.src;

export const Zp = warningIcon.src;

export const Kp = caretRightIcon.src;

export const Qp = searchIcon.src;

export const Pi = addressIcon.src;

export const Yp = sparkIcon.src;

export const qp = usersThreeImg.src;

export const Xp = shoppingCartIcon.src;

export const Jp = funnelIcon.src;

export const e5 = bellIcon.src;

export const t5 = {
  history: kp,
  add: Np,
  expand: Sp,
  close: Lp,
  send: Ep,
  favorite: Mp,
  insight: Rp,
  caretDown: Tp,
  aiStatus: Pp,
  historyGold: Ap,
  addGold: Ip,
  expandGold: $p,
  closeGold: Bp,
  sendGold: Vp,
  addMuted: zp,
  sparkle: Dp,
  lock: Fp,
  shieldCheck: Hp,
  checks: Op,
  union: Up,
  sourceDot: bp,
  money: Gp,
  userSound: Wp,
  warning: Zp,
  caretRight: Kp,
  search: Qp,
  address: Pi,
  spark: Yp,
  usersThree: qp,
  shoppingCart: Xp,
  funnel: Jp,
  bell: e5,
};

export const n5 = {
  history: {
    width: 13.5696,
    height: 13.5696,
  },
  add: {
    width: 13.5696,
    height: 13.5696,
  },
  expand: {
    width: 13.5696,
    height: 13.5696,
  },
  close: {
    width: 13.5696,
    height: 13.5696,
  },
  send: {
    width: 20,
    height: 20,
  },
  favorite: {
    width: 10,
    height: 10,
  },
  insight: {
    width: 16.4468,
    height: 16.1409,
  },
  caretDown: {
    width: 12.1689,
    height: 12.1689,
  },
  aiStatus: {
    width: 10.0015,
    height: 10.0015,
  },
  historyGold: {
    width: 14,
    height: 14,
  },
  addGold: {
    width: 14,
    height: 14,
  },
  expandGold: {
    width: 14,
    height: 14,
  },
  closeGold: {
    width: 14,
    height: 14,
  },
  sendGold: {
    width: 20,
    height: 20,
  },
  addMuted: {
    width: 18,
    height: 18,
  },
  sparkle: {
    width: 22.6887,
    height: 22.6887,
  },
  lock: {
    width: 19.8527,
    height: 19.8527,
  },
  shieldCheck: {
    width: 12,
    height: 12,
  },
  checks: {
    width: 13.7578,
    height: 13.7578,
  },
  union: {
    width: 24,
    height: 16.7451,
  },
  sourceDot: {
    width: 4.4406,
    height: 4.4406,
  },
  money: {
    width: 24,
    height: 24,
  },
  userSound: {
    width: 24,
    height: 24,
  },
  warning: {
    width: 24,
    height: 24,
  },
  caretRight: {
    width: 24,
    height: 24,
  },
  search: {
    width: 10,
    height: 10,
  },
  address: {
    width: 10,
    height: 11,
  },
  spark: {
    width: 9.64762,
    height: 9.64762,
  },
  usersThree: {
    width: 16,
    height: 16,
  },
  shoppingCart: {
    width: 16,
    height: 16,
  },
  funnel: {
    width: 16,
    height: 16,
  },
  bell: {
    width: 16,
    height: 16,
  },
};

export function PartRe({ name, size }) {
  const { width, height } = n5[name],
    i = size ? size / width : 1;
  return (
    <img
      src={t5[name]}
      alt=""
      aria-hidden="true"
      width={width * i}
      height={height * i}
      style={{
        display: "block",
      }}
    />
  );
}

export function ContentFade() {
  return <div className="hm-ill-content-fade" aria-hidden="true" />;
}

export const Wo = 300;

export const N5 = 500;

export const S5 = 600;

export const L5 = 150;

export const E5 = 26;

export const M5 = 45;

export const R5 = 220;

export const T5 = 150;

export const P5 = 450;

export const A5 = 650;

export const I5 = 350;

export const $5 = 900;

export const B5 = 220;

export function V5() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function z5(e) {
  return e.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}

export function D5(e) {
  return z5(e) * M5 + R5 + T5;
}

export function useQr(e, t) {
  const n = useRef(V5()).current,
    [r, i] = useState(n ? e.length : 0),
    [l, o] = useState({
      index: -1,
      value: "",
    }),
    [a, c] = useState({
      index: -1,
      stage: 0,
    }),
    [d, v] = useState(-1),
    [w, h] = useState(0),
    m = useRef(t);
  return (
    useEffect(() => {
      t &&
        !m.current &&
        !n &&
        (i(0),
        o({
          index: -1,
          value: "",
        }),
        c({
          index: -1,
          stage: 0,
        }),
        v(-1),
        h((p) => p + 1)),
        (m.current = t);
    }, [t, n]),
    useEffect(() => {
      if (n || !t || r >= e.length) return;
      const p = e[r],
        x = [];
      let C;
      const f = (j, k) => {
          x.push(window.setTimeout(k, j));
        },
        u = () => i((j) => j + 1),
        g = () => {
          C == null || C(), x.forEach(window.clearTimeout);
        };
      switch (p.type) {
        case "compose": {
          if (!p.text) {
            f(p.holdMs ?? 700, u);
            break;
          }
          const j = p.text;
          f(p.leadMs ?? (r === 0 ? I5 : $5), () => {
            C = typeOut(j, {
              msPerStep: E5,
              onTick: (k) =>
                o({
                  index: r,
                  value: k,
                }),
              onDone: () => f(B5, u),
            });
          });
          break;
        }
        case "think": {
          let j = S5;
          p.labels.length === 2 &&
            (f(Wo, () =>
              c({
                index: r,
                stage: 1,
              }),
            ),
            (j = Wo + N5)),
            f(j, () => v(r)),
            f(j + L5, u);
          break;
        }
        case "text":
          f(D5(p.text), u);
          break;
        case "appear":
          f(p.ms ?? P5, u);
          break;
        case "load":
          f(p.ms ?? A5, u);
          break;
        case "pause":
          f(p.ms, u);
          break;
      }
      return g;
    }, [r, t, n, e]),
    useMemo(() => {
      const p = (f) => {
          const u = e.findIndex((g) => g.id === f);
          if (u < 0) throw new Error(`Unknown beat "${f}"`);
          return u;
        },
        x = e[r],
        C = l.index === r ? l.value : "";
      return {
        reached: (f) => r >= p(f),
        passed: (f) => r > p(f),
        loading: (f) => r === p(f),
        status: (f) => {
          const u = e[r];
          if (r !== p(f) || u.type !== "think") return null;
          const g = a.index === r ? a.stage : 0;
          return {
            label: u.labels[g] ?? u.labels[0],
            visible: d !== r,
          };
        },
        composer:
          (x == null ? void 0 : x.type) === "compose" && x.text
            ? {
                value: C,
                typing: !0,
              }
            : null,
        index: r,
        done: r >= e.length,
        reducedMotion: n,
        runKey: w,
      };
    }, [e, r, l, a, d, n, w])
  );
}

export function SkeletonBlock({ width, height, aspectRatio, radius }) {
  return (
    <div
      className="hm-ill-skeleton-block"
      style={{
        width,
        height,
        aspectRatio,
        borderRadius: radius,
      }}
    />
  );
}

export const y0 = createContext(!1);

export function PartBe({ icon, label, variant, onClick, className }) {
  return (
    <button
      type="button"
      className={["hm-ill-icon-button", `hm-ill-icon-button--${variant}`, className].filter(Boolean).join(" ")}
      aria-label={label}
      onClick={onClick}
    >
      <span className={icon === "send" || icon === "sendGold" ? "hm-ill-icon-button__glyph--rotated" : void 0}>
        <PartRe name={icon} size={variant === "accent" ? 20 : void 0} />
      </span>
    </button>
  );
}

export function ChatHeader({ brand, showHistory = !0, showAdd = !0, showExpand = !0, showClose = !0, onClose }) {
  const o = showHistory || showAdd;
  return (
    <header className="hm-ill-chat-header">
      {o && (
        <div className="hm-ill-chat-header__group">
          {showHistory && <PartBe icon="history" label="History" variant="outline" />}
          {showAdd && <PartBe icon="add" label="New conversation" variant="outline" />}
        </div>
      )}
      <div className="hm-ill-chat-header__brand">{brand}</div>
      <div className="hm-ill-chat-header__group">
        {showExpand && <PartBe icon="expand" label="Expand" variant="outline" />}
        {showClose && <PartBe icon="close" label="Close" variant="outline" onClick={onClose} />}
      </div>
    </header>
  );
}

export function ChatComposer({
  value = "Ask anything...",
  typing = !1,
  variant = "default",
  visible = !0,
  sending = !1,
}) {
  return variant === "expanded" ? (
    <div className={`hm-ill-chat-composer--expanded${visible ? "" : " hm-ill-chat-composer--expanded--hidden"}`}>
      <p className="hm-ill-chat-composer--expanded__text">
        {value}
        {typing && <span className="hm-ill-chat-composer__caret" />}
      </p>
      <div className="hm-ill-chat-composer--expanded__row">
        <span className="hm-ill-chat-composer--expanded__upload">
          <PartRe name="addMuted" size={18} />
          Upload file
        </span>
        <PartBe
          icon="sendGold"
          label="Send"
          variant="accent"
          className={sending ? "hm-ill-icon-button--pressed" : void 0}
        />
      </div>
    </div>
  ) : (
    <div className="hm-ill-chat-composer">
      <span className={`hm-ill-chat-composer__text${typing ? " hm-ill-chat-composer__text--typing" : ""}`}>
        {typing ? (
          <span className="hm-ill-chat-composer__line">
            {value}
            <span className="hm-ill-chat-composer__caret" />
          </span>
        ) : (
          value
        )}
      </span>
      <PartBe icon="send" label="Send" variant="accent" />
    </div>
  );
}

export const PartD4 = forwardRef(function ({ children }, n) {
  return (
    <div className="hm-ill-conversation-viewport">
      <div className="hm-ill-conversation-viewport__content" ref={n}>
        {children}
      </div>
      <ContentFade />
    </div>
  );
});

export function PartFt({
  brand,
  children,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  rootRef,
  header,
  composer,
  className,
}) {
  return (
    <div
      className={["hm-ill-shell", className].filter(Boolean).join(" ")}
      style={
        width && height
          ? {
              width,
              height,
            }
          : void 0
      }
      ref={rootRef}
    >
      {header ?? <ChatHeader brand={brand} />}
      <PartD4 ref={viewportRef}>{children}</PartD4>
      {composer ?? <ChatComposer value={composerValue} typing={composerTyping} />}
    </div>
  );
}

export function ChatMessage({ role, text, children }) {
  return role === "user" ? (
    <div className="hm-ill-chat-message hm-ill-chat-message--user">
      <p>{children ?? text}</p>
    </div>
  ) : (
    <div className="hm-ill-chat-message hm-ill-chat-message--assistant">
      <p>{children ?? text}</p>
    </div>
  );
}

export function PartRt({ children, animateIn = !1, className }) {
  const r = ["hm-ill-user-turn", animateIn && "hm-ill-user-turn--enter", className].filter(Boolean).join(" ");
  return <div className={r}>{children}</div>;
}

export function PartJe({ children, animateIn = !1, className }) {
  const r = ["hm-ill-assistant-turn", animateIn && "hm-ill-assistant-turn--enter", className].filter(Boolean).join(" ");
  return <div className={r}>{children}</div>;
}

export function AiPills({ options, selectedId }) {
  return (
    <div className="hm-ill-ai-pills">
      {options.map((n) => (
        <div key={n.id} className={n.id === selectedId ? "hm-ill-ai-pill hm-ill-ai-pill--selected" : "hm-ill-ai-pill"}>
          <PartRe name="insight" size={16} />
          <span>{n.text}</span>
        </div>
      ))}
    </div>
  );
}

export function PartHt({ appearance, label, onClick, iconLeading, iconTrailing, className }) {
  return (
    <button
      type="button"
      className={["hm-ill-button", `hm-ill-button--${appearance}`, className].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      {iconLeading}
      {label}
      {iconTrailing}
    </button>
  );
}

export function ProductCollection({ children }) {
  return <div className="hm-ill-product-collection">{children}</div>;
}

export const p4 = p01BrewhausProEspressoMachineImg.src;

export const f4 = p02BrewhausCoffeeAccessoryBundleImg.src;

export const h4 = p03MaraisLeatherFrameCaseImg.src;

export const m4 = p04MaraisGoldToneSilkScarfImg.src;

export const g4 = p05WavelineCompactSmartSpeakerImg.src;

export const v4 = p06AuraWirelessEarbudsImg.src;

export const x4 = p07HoltAndCoLeatherBifoldWalletImg.src;

export const w4 = p08AudenWaveProBlackImg.src;

export const y4 = p09AudenViewedHeadphonesIvoryImg.src;

export const j4 = p10AudenViewedHeadphonesOliveImg.src;

export const C4 = p11AudenViewedHeadphonesMustardGoldImg.src;

export const _4 = p12FamilyAirFryerImg.src;

export const k4 = p13CompactAirFryerImg.src;

export const N4 = p14ShopperReferenceTripleDomeLampImg.src;

export const S4 = p15WarmTripodTableLampImg.src;

export const L4 = p16ModDomeTableLampImg.src;

export const E4 = p17CopperRimBedsideLampImg.src;

export const M4 = p18LumenSecondSkinFoundationImg.src;

export const R4 = p19MaraisRelaxedCottonShirtImg.src;

export const T4 = p20StraightLegTailoredTrousersImg.src;

export const P4 = p21MinimalLeatherSneakersImg.src;

export const A4 = p22AeriaCycloneProVacuumImg.src;

export const I4 = p23DysonV15VacuumImg.src;

export const $4 = {
  espressoMachine: p4,
  accessoryBundle: f4,
  leatherFrameCase: h4,
  silkScarf: m4,
  smartSpeaker: g4,
  wirelessEarbuds: v4,
  leatherWallet: x4,
  auden: w4,
  audenIvory: y4,
  audenOlive: j4,
  audenMustard: C4,
  familyAirFryer: _4,
  compactAirFryer: k4,
  referenceLamp: N4,
  tripodLamp: S4,
  domeLamp: L4,
  bedsideLamp: E4,
  foundation: M4,
  cottonShirt: R4,
  tailoredTrousers: T4,
  leatherSneakers: P4,
  aeriaCycloneProVacuum: A4,
  dysonV15Vacuum: I4,
};

export const B4 = new Set(Object.values($4));

export function Media({ src, alt }) {
  return src ? (
    <img className={`hm-ill-media${B4.has(src) ? " hm-ill-media--cutout" : ""}`} src={src} alt={alt} />
  ) : (
    <div className="hm-ill-media hm-ill-media--placeholder" role="img" aria-label={alt} />
  );
}

export const V4 = starFilledIcon.src;

export const z4 = starEmptyIcon.src;

export function Rating({ value, count }) {
  const n = Math.round(value);
  return (
    <div className="hm-ill-rating">
      <div className="hm-ill-rating__stars">
        {Array.from(
          {
            length: 5,
          },
          (r, i) => (
            <img key={i} src={i < n ? V4 : z4} alt="" width={9} height={9} />
          ),
        )}
      </div>
      <span className="hm-ill-rating__count">({count})</span>
    </div>
  );
}

export function ProductMeta({ brand, title, subtitle, price, rating, ratingCount, density = "card" }) {
  return density === "pdp" ? (
    <div className="hm-ill-product-meta hm-ill-product-meta--pdp">
      <div className="hm-ill-product-meta__pdp-top">
        {brand && <p className="hm-ill-product-meta__brand-pdp">{brand}</p>}
        <PartRe name="caretDown" />
      </div>
      <p className="hm-ill-product-meta__title-pdp">{title}</p>
      {subtitle && <p className="hm-ill-product-meta__subtitle">{subtitle}</p>}
      {rating !== void 0 && ratingCount && <Rating value={rating} count={ratingCount} />}
      {price && <p className="hm-ill-product-meta__price-pdp">{price}</p>}
    </div>
  ) : (
    <div className="hm-ill-product-meta">
      <div className="hm-ill-product-meta__row">
        {brand && <p className="hm-ill-product-meta__brand">{brand}</p>}
        {price && <p className="hm-ill-product-meta__price">{price}</p>}
      </div>
      <p className="hm-ill-product-meta__title">{title}</p>
      {rating !== void 0 && ratingCount && <Rating value={rating} count={ratingCount} />}
    </div>
  );
}

export function useLineCount(e, t, n = 1 / 0) {
  const [r, i] = useState(1);
  return (
    useLayoutEffect(() => {
      var c;
      const l = (c = e.current) == null ? void 0 : c.querySelector(t);
      if (!l) return;
      const o = () => {
        const d = document.createRange();
        d.selectNodeContents(l);
        const v = new Set([...d.getClientRects()].map((w) => Math.round(w.top)));
        i(Math.min(Math.max(v.size, 1), n));
      };
      o();
      const a = new ResizeObserver(o);
      return a.observe(l), () => a.disconnect();
    }, [e, t, n]),
    r
  );
}

export function RecCard({ product, loading = !1, resolveDelayMs, cta = !1, ctaAppearance = "accent" }) {
  const l = useRef(null),
    o = useLineCount(l, ".hm-ill-rec-card__title"),
    a = useRef(loading),
    c = loading || a.current;
  return (
    useEffect(() => {
      a.current = loading;
    }, [loading]),
    (
      <article className={`hm-ill-rec-card${cta ? " hm-ill-rec-card--cta" : ""}`} ref={l}>
        <div className="hm-ill-rec-card__media">
          <div className="hm-ill-rec-card__media-bleed">
            <Media src={product.image} alt={product.name} />
          </div>
          <div className="hm-ill-rec-card__favorite" aria-hidden="true">
            <PartRe name="favorite" />
          </div>
        </div>
        <div className="hm-ill-rec-card__text">
          {product.brand || product.price ? (
            <ProductMeta brand={product.brand} title={product.name} price={product.price} />
          ) : (
            <p className="hm-ill-rec-card__title">{product.name}</p>
          )}
        </div>
        {cta && <PartHt appearance={ctaAppearance} label="Add to cart" />}
        {c && (
          <div
            className={`hm-ill-rec-card__skeleton-overlay${loading ? "" : " hm-ill-rec-card__skeleton-overlay--hidden"}`}
            style={
              resolveDelayMs
                ? {
                    transitionDelay: `${resolveDelayMs}ms`,
                  }
                : void 0
            }
          >
            <div className="hm-ill-rec-card__media">
              <SkeletonBlock width="100%" height="100%" radius={16} />
            </div>
            <div className="hm-ill-rec-card__text-skeleton">
              {Array.from(
                {
                  length: o,
                },
                (d, v) => (
                  <div key={v} className="hm-ill-rec-card__text-skeleton-line">
                    <SkeletonBlock width={v === o - 1 ? "60%" : "100%"} height={11} radius={4} />
                  </div>
                ),
              )}
            </div>
            {cta && <SkeletonBlock height={30} radius={112.792} />}
          </div>
        )}
      </article>
    )
  );
}

export function StoreNavItems() {
  return (
    <div className="store-nav-items" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export const fe = (e) => `/images/landing/home-v2/${e}.webp`;

export const Le = {
  weekender: fe("trailwell-weekender"),
  roam: fe("trailwell-roam"),
  overnight: fe("trailwell-overnight"),
  sleep60: fe("goodwell-sleep-60"),
  sleep28: fe("goodwell-sleep-28"),
  energy: fe("goodwell-energy"),
  focus: fe("goodwell-focus"),
  calm: fe("goodwell-calm"),
  immunity: fe("goodwell-immunity"),
  cream: fe("sorelle-hydration-cream"),
  lotion: fe("sorelle-barrier-lotion"),
  gel: fe("sorelle-cloud-gel"),
  set: fe("sorelle-hydration-set"),
  crewneck: fe("northwick-merino-crewneck"),
  heavyweight: fe("northwick-merino-heavyweight"),
};

export const h2 = {
  headline: "Feel good, one gummy at a time.",
  sub: "Functional gummies for sleep, energy and focus.",
  shop: "Shop gummies",
};

export function ProductReference({ image, alt, brand, title, price, size }) {
  return (
    <div className="hm-ill-product-reference">
      <div
        className="hm-ill-product-reference__media"
        style={
          size
            ? {
                width: size,
                height: size,
              }
            : void 0
        }
      >
        <Media src={image} alt={alt} />
      </div>
      <div className="hm-ill-product-reference__text">
        {brand && <p className="hm-ill-product-reference__brand">{brand}</p>}
        <p className="hm-ill-product-reference__title">{title}</p>
        {price && <p className="hm-ill-product-reference__price">{price}</p>}
      </div>
    </div>
  );
}

export function PartDt({ text, boldText }) {
  const n = text.split(/\s+/).filter(Boolean),
    r = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return (
    <>
      {n.map((i, l) => (
        <Fragment key={`plain-${l}`}>
          <span
            className="hm-ill-stagger-text__word"
            style={{
              animationDelay: `${l * 45}ms`,
            }}
          >
            {i}
          </span>
          {l < n.length - 1 || r.length ? " " : ""}
        </Fragment>
      ))}
      {r.map((i, l) => (
        <Fragment key={`bold-${l}`}>
          <strong
            className="hm-ill-stagger-text__word"
            style={{
              animationDelay: `${(n.length + l) * 45}ms`,
            }}
          >
            {i}
          </strong>
          {l < r.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

export function AiStatusIcon() {
  return (
    <svg
      className="hm-ill-ai-status-icon"
      width="16"
      height="16"
      viewBox="0 0 10.0015 10.0015"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="hm-ill-ai-status-icon__shape">
        <g className="hm-ill-ai-status-icon__spokes">
          <path
            d="M5.16982 1.36618e-08L5.16982 3.58808"
            strokeWidth="0.625092"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M5.16982 6.41338L5.16982 10.0015"
            strokeWidth="0.625092"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M10.0015 4.87603L6.48029 4.87603"
            strokeWidth="0.625092"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M3.52148 4.87603L0.000305653 4.87603"
            strokeWidth="0.625092"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g className="hm-ill-ai-status-icon__ticks">
          <path
            d="M3.76818 3.63487L2.62108 2.48778"
            strokeWidth="0.625092"
            strokeLinecap="round"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M7.56878 7.45211L6.42169 6.30502"
            strokeWidth="0.625092"
            strokeLinecap="round"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M6.41942 3.6349L7.56651 2.48781"
            strokeWidth="0.625092"
            strokeLinecap="round"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M2.62359 7.4521L3.77069 6.30501"
            strokeWidth="0.625092"
            strokeLinecap="round"
            stroke="#462160"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <rect
          className="hm-ill-ai-status-icon__center"
          x="4.40987"
          y="4.27743"
          width="1.40034"
          height="1.40034"
          fill="#462160"
        />
      </g>
    </svg>
  );
}

export function AiStatus({ label, visible = !0, icon }) {
  const [r, i] = useState(label),
    [l, o] = useState(null),
    a = useRef(r);
  return (
    useEffect(() => {
      label !== a.current && (o(a.current), i(label), (a.current = label));
    }, [label]),
    (
      <div className={`hm-ill-ai-status${visible ? "" : " hm-ill-ai-status--hidden"}`}>
        {icon ?? <AiStatusIcon />}
        <span className="hm-ill-ai-status__label-stack">
          {l && l !== r && (
            <span className="hm-ill-ai-status__label hm-ill-ai-status__label--exiting" aria-hidden="true">
              {l}
            </span>
          )}
          <span key={r} className="hm-ill-ai-status__label">
            {r}
          </span>
        </span>
      </div>
    )
  );
}

export function Sf(e) {
  const t = [];
  let n = -1,
    r = !0;
  return (
    e.split("**").forEach((i, l) => {
      i.split(/(\s+)/).forEach((o) => {
        if (o) {
          if (/^\s+$/.test(o)) {
            r = !0;
            return;
          }
          r && (n += 1),
            t.push({
              text: o,
              bold: l % 2 === 1,
              wordIndex: n,
              spaceBefore: r && t.length > 0,
            }),
            (r = !1);
        }
      });
    }),
    t
  );
}

export function PartDi({ text }) {
  return text.includes("**") ? (
    <>
      {Sf(text).map((t, n) => {
        const CompR = t.bold ? "strong" : "span";
        return (
          <Fragment key={n}>
            {t.spaceBefore ? " " : ""}
            <CompR
              className="hm-ill-stagger-text__word"
              style={{
                animationDelay: `${t.wordIndex * 45}ms`,
              }}
            >
              {t.text}
            </CompR>
          </Fragment>
        );
      })}
    </>
  ) : (
    <PartDt text={text} />
  );
}

export function PartVn({ t: e, id }) {
  const n = e.status(id);
  return n ? <AiStatus label={n.label} visible={n.visible} /> : null;
}

export function PartJl({ text }) {
  return (
    <ChatMessage role="assistant">
      <PartDi text={text} />
    </ChatMessage>
  );
}

export function useSi() {
  const [e, t] = useState(!1);
  return (
    useEffect(() => {
      var r;
      let n = !1;
      return (
        (((r = document.fonts) == null ? void 0 : r.ready) ?? Promise.resolve()).then(() => {
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

export function useThreadScroll(e, { thread, pin, focus, clearance = 0, index, reducedMotion }) {
  useEffect(() => {
    const a = e.current,
      c = a == null ? void 0 : a.querySelector(thread);
    if (!a || !c) return;
    let d;
    const v = () => {
      const h = a.getBoundingClientRect(),
        m = (S) => S - h.top + a.scrollTop;
      let p = Math.max(0, m(c.getBoundingClientRect().bottom) - a.clientHeight + clearance);
      const x = pin ? c.querySelectorAll(pin) : null,
        C = x == null ? void 0 : x[x.length - 1],
        f = C ? m(C.getBoundingClientRect().top) : 0;
      p = Math.max(p, f);
      const u = [...c.children].map((S) => {
          const N = S.getBoundingClientRect();
          return {
            top: m(N.top),
            bottom: m(N.bottom),
          };
        }),
        g = u.find((S) => p > S.top && p - S.top <= clearance);
      g && (p = g.top);
      const j = focus ? c.querySelector(focus) : null;
      j && (p = Math.max(0, m(j.getBoundingClientRect().top) - 8));
      const k = u.some((S) => S.top < p - 1 && S.bottom > p + 1);
      a.parentElement && (a.parentElement.dataset.scrolled = String(k)),
        !(Math.abs(p - a.scrollTop) < 1) &&
          (d == null || d(), reducedMotion ? (a.scrollTop = p) : (d = scrollEase(a, p)));
    };
    v();
    const w = new ResizeObserver(v);
    return (
      w.observe(c),
      () => {
        w.disconnect(), d == null || d();
      }
    );
  }, [e, thread, pin, focus, clearance, index, reducedMotion]);
}

export function de(...e) {
  return e.filter(Boolean).join(" ");
}

export const fu = 34;

export const Of = 280;

export const Uf = (e) => e.map((t) => (typeof t == "string" ? t : t.b)).join("");

export const bf = (e) => Uf(e).split(/\s+/).filter(Boolean).length;

export const x2 = (e) => bf(e) * fu + Of;

export const Yf = insightsBackgroundImg.src;

export function InsightFrameScale({ children }) {
  return (
    <div className="hm-ill-insight-frame-scale">
      <div className="hm-ill-insight-frame">
        <img className="hm-ill-insight-frame__background" src={Yf} alt="" aria-hidden="true" />
        <div className="hm-ill-insight-frame__content">{children}</div>
      </div>
    </div>
  );
}

export function Thread({ children }) {
  return <div className="hm-ill-thread">{children}</div>;
}

export function AttributeRow({ label, value }) {
  return (
    <div className="hm-ill-attribute-row">
      <span className="hm-ill-attribute-row__label">{label}</span>
      <span className="hm-ill-attribute-row__value">{value}</span>
    </div>
  );
}

export const y2 = {
  title: "Reddit, Bestsellers, Vitamin C Serum, Moisturiser",
  row: {
    label: "Returned at least twice",
    value: "118",
  },
};

export function SblScope({ children }) {
  return (
    <y0.Provider value={!0}>
      <div className="sbl">{children}</div>
    </y0.Provider>
  );
}

export function PartHu({ src, alt, className }) {
  return (
    <div className={["sbp-tile", className].filter(Boolean).join(" ")}>
      <img src={src} alt={alt} />
    </div>
  );
}
