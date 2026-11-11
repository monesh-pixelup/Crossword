"use client";

// Built from the "Crossword — Home v2 Motion (01–11 + 08m)" source (Crossword-Homev2-Motion-01-11-08m/source) with Vite,
// unminified, React external: 08m only (see ./index.tsx).

import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo, createContext, useContext } from "react";
function isWindowActive() {
  return typeof document !== "undefined" && document.visibilityState === "visible" && document.hasFocus();
}
function useLandedOnScreen(ref) {
  const [intersecting, setIntersecting] = useState(false);
  const [windowActive, setWindowActive] = useState(isWindowActive);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.3
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => setWindowActive(isWindowActive());
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
    };
  }, []);
  return intersecting && windowActive;
}
function revealText(text, {
  msPerStep,
  jitterMs = msPerStep * 0.3,
  chunk = 1,
  onTick,
  onDone
}) {
  let cancelled = false;
  let i = 0;
  let timeoutId;
  const step = () => {
    if (cancelled) return;
    i = Math.min(text.length, i + chunk);
    onTick(text.slice(0, i));
    if (i >= text.length) {
      onDone();
      return;
    }
    const jitter = (Math.random() * 2 - 1) * jitterMs;
    timeoutId = window.setTimeout(step, Math.max(8, msPerStep + jitter));
  };
  timeoutId = window.setTimeout(step, msPerStep);
  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS = 150;
const CHAR_INTERVAL_MS = 26;
const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs(text) {
  return wordCount(text) * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}
function useChatTimeline(beats2, active) {
  const reducedMotion = useRef(prefersReducedMotion()).current;
  const [index, setIndex] = useState(reducedMotion ? beats2.length : 0);
  const [typed, setTyped] = useState({ index: -1, value: "" });
  const [thinkStage, setThinkStage] = useState({ index: -1, stage: 0 });
  const [exitingIndex, setExitingIndex] = useState(-1);
  const [runKey, setRunKey] = useState(0);
  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setIndex(0);
      setTyped({ index: -1, value: "" });
      setThinkStage({ index: -1, stage: 0 });
      setExitingIndex(-1);
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion || !active || index >= beats2.length) return;
    const beat = beats2[index];
    const timeouts = [];
    let cancelReveal;
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    const next = () => setIndex((i) => i + 1);
    const cleanup = () => {
      cancelReveal == null ? void 0 : cancelReveal();
      timeouts.forEach(window.clearTimeout);
    };
    switch (beat.type) {
      case "compose": {
        if (!beat.text) {
          after(beat.holdMs ?? 700, next);
          break;
        }
        const text = beat.text;
        after(beat.leadMs ?? (index === 0 ? FIRST_COMPOSE_LEAD_MS : NEXT_COMPOSE_LEAD_MS), () => {
          cancelReveal = revealText(text, {
            msPerStep: beat.msPerChar ?? CHAR_INTERVAL_MS,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(SENT_SETTLE_MS, next)
          });
        });
        break;
      }
      case "think": {
        let holdMs = THINKING_SINGLE_MS;
        if (beat.labels.length === 2) {
          after(THINKING_STAGE_1_MS, () => setThinkStage({ index, stage: 1 }));
          holdMs = THINKING_STAGE_1_MS + THINKING_STAGE_2_MS;
        }
        after(holdMs, () => setExitingIndex(index));
        after(holdMs + THINKING_EXIT_MS, next);
        break;
      }
      case "text":
        after(replyRevealMs(beat.text), next);
        break;
      case "appear":
        after(beat.ms ?? APPEAR_MS, next);
        break;
      case "load":
        after(beat.ms ?? LOAD_MS, next);
        break;
      case "pause":
        after(beat.ms, next);
        break;
    }
    return cleanup;
  }, [index, active, reducedMotion, beats2]);
  return useMemo(() => {
    const at = (id) => {
      const i = beats2.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current = beats2[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at(id),
      passed: (id) => index > at(id),
      loading: (id) => index === at(id),
      status: (id) => {
        const beat = beats2[index];
        if (index !== at(id) || beat.type !== "think") return null;
        const stage = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: (current == null ? void 0 : current.type) === "compose" && current.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats2.length,
      reducedMotion,
      runKey
    };
  }, [beats2, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
const history = "/images/landing/home-v2/assets/history-BevL6311.svg";
const add = "/images/landing/home-v2/assets/add-Cbob5SpL.svg";
const expand = "/images/landing/home-v2/assets/expand-DCmbcy1L.svg";
const close = "/images/landing/home-v2/assets/close-DsdKJYzC.svg";
const send = "/images/landing/home-v2/assets/send-ciTszH9F.svg";
const favorite = "/images/landing/home-v2/assets/favorite-CUi59LNH.svg";
const insight = "/images/landing/home-v2/assets/insight-uAQ9aztG.svg";
const caretDown = "/images/landing/home-v2/assets/caret-down-SLWfN0GR.svg";
const aiStatus = "/images/landing/home-v2/assets/ai-status-BrMkXQfp.svg";
const historyGold = "/images/landing/home-v2/assets/history-gold-BJyNNDvb.svg";
const addGold = "/images/landing/home-v2/assets/add-gold-BsVrGX-2.svg";
const expandGold = "/images/landing/home-v2/assets/expand-gold-DMlB4LYO.svg";
const closeGold = "/images/landing/home-v2/assets/close-gold-C4NzsZzj.svg";
const sendGold = "/images/landing/home-v2/assets/send-gold-Vhul_k2n.svg";
const addMuted = "/images/landing/home-v2/assets/add-muted-BR3d4Eat.svg";
const sparkle = "/images/landing/home-v2/assets/sparkle-DD7f07RS.svg";
const lock = "/images/landing/home-v2/assets/lock-Ct-i8Zkt.svg";
const shieldCheck = "/images/landing/home-v2/assets/shield-check-ButlZpGU.svg";
const checks = "/images/landing/home-v2/assets/checks-Cn5ndNQt.svg";
const union = "/images/landing/home-v2/assets/union-DvakWNG_.svg";
const sourceDot = "/images/landing/home-v2/assets/source-dot-FmkgXLjm.svg";
const money = "/images/landing/home-v2/assets/money-BRnIy4Hf.svg";
const userSound = "/images/landing/home-v2/assets/user-sound-B1mWE2AQ.svg";
const warning = "/images/landing/home-v2/assets/warning-B_MVWxpy.svg";
const caretRight = "/images/landing/home-v2/assets/caret-right-N4DMqoC_.svg";
const search = "/images/landing/home-v2/assets/search-6aT0QOjO.svg";
const address = "/images/landing/home-v2/assets/address-QPOEXXur.svg";
const spark = "/images/landing/home-v2/assets/spark-CL1SvstU.svg";
const usersThree = "/images/landing/home-v2/assets/users-three-CNldQr4E.svg";
const shoppingCart = "/images/landing/home-v2/assets/shopping-cart-9S1-ijDB.svg";
const funnel = "/images/landing/home-v2/assets/funnel-DtM1xN-e.svg";
const bell = "/images/landing/home-v2/assets/bell-hYUBIbcW.svg";
const glyphs = {
  history,
  add,
  expand,
  close,
  send,
  favorite,
  insight,
  caretDown,
  aiStatus,
  historyGold,
  addGold,
  expandGold,
  closeGold,
  sendGold,
  addMuted,
  sparkle,
  lock,
  shieldCheck,
  checks,
  union,
  sourceDot,
  money,
  userSound,
  warning,
  caretRight,
  search,
  address,
  spark,
  usersThree,
  shoppingCart,
  funnel,
  bell
};
const naturalSize = {
  history: { width: 13.5696, height: 13.5696 },
  add: { width: 13.5696, height: 13.5696 },
  expand: { width: 13.5696, height: 13.5696 },
  close: { width: 13.5696, height: 13.5696 },
  send: { width: 20, height: 20 },
  favorite: { width: 10, height: 10 },
  insight: { width: 16.4468, height: 16.1409 },
  caretDown: { width: 12.1689, height: 12.1689 },
  aiStatus: { width: 10.0015, height: 10.0015 },
  historyGold: { width: 14, height: 14 },
  addGold: { width: 14, height: 14 },
  expandGold: { width: 14, height: 14 },
  closeGold: { width: 14, height: 14 },
  sendGold: { width: 20, height: 20 },
  addMuted: { width: 18, height: 18 },
  sparkle: { width: 22.6887, height: 22.6887 },
  lock: { width: 19.8527, height: 19.8527 },
  shieldCheck: { width: 12, height: 12 },
  checks: { width: 13.7578, height: 13.7578 },
  union: { width: 24, height: 16.7451 },
  sourceDot: { width: 4.4406, height: 4.4406 },
  money: { width: 24, height: 24 },
  userSound: { width: 24, height: 24 },
  warning: { width: 24, height: 24 },
  caretRight: { width: 24, height: 24 },
  search: { width: 10, height: 10 },
  address: { width: 10, height: 11 },
  spark: { width: 9.64762, height: 9.64762 },
  usersThree: { width: 16, height: 16 },
  shoppingCart: { width: 16, height: 16 },
  funnel: { width: 16, height: 16 },
  bell: { width: 16, height: 16 }
};
function Icon({ name, size }) {
  const { width, height } = naturalSize[name];
  const scale = size ? size / width : 1;
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: glyphs[name],
      alt: "",
      "aria-hidden": "true",
      width: width * scale,
      height: height * scale,
      style: { display: "block" }
    }
  );
}
function BrowserChrome({ url, field = "address" }) {
  return /* @__PURE__ */ jsxs("div", { className: `hmm-ill-browser-chrome hmm-ill-browser-chrome--${field}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "hmm-ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hmm-ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx(Icon, { name: field === "search" ? "search" : "address" }),
      /* @__PURE__ */ jsx("span", { children: url })
    ] })
  ] });
}
const amberChairImage = "/images/landing/home-v2/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const amberOpalLampImage = "/images/landing/home-v2/assets/amber-oak-opal-glass-lamp-CSWTBSbc.webp";
const amberPleatedLampImage = "/images/landing/home-v2/assets/amber-oak-pleated-linen-lamp-DU9AZH7n.webp";
const trailwellWeekenderImage = "/images/landing/home-v2/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/landing/home-v2/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/landing/home-v2/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/landing/home-v2/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/landing/home-v2/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/landing/home-v2/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/landing/home-v2/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/landing/home-v2/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/landing/home-v2/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/landing/home-v2/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const vitaminCSerum = "/images/landing/home-v2/assets/vitamin-c-serum-vnf_1nLn.webp";
const goodwell_sleep_60 = "/images/landing/home-v2/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/landing/home-v2/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/landing/home-v2/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/landing/home-v2/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/landing/home-v2/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/landing/home-v2/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/landing/home-v2/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/landing/home-v2/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/landing/home-v2/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/landing/home-v2/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/landing/home-v2/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/landing/home-v2/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/landing/home-v2/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/landing/home-v2/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/landing/home-v2/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/landing/home-v2/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/landing/home-v2/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/landing/home-v2/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/landing/home-v2/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const espressoMachine = "/images/landing/home-v2/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/landing/home-v2/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/landing/home-v2/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/landing/home-v2/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/landing/home-v2/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/landing/home-v2/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/landing/home-v2/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden$1 = "/images/landing/home-v2/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/landing/home-v2/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/landing/home-v2/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/landing/home-v2/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/landing/home-v2/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/landing/home-v2/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/landing/home-v2/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/landing/home-v2/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/landing/home-v2/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/landing/home-v2/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/landing/home-v2/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/landing/home-v2/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/landing/home-v2/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/landing/home-v2/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/landing/home-v2/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/landing/home-v2/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/landing/home-v2/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/landing/home-v2/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/landing/home-v2/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/landing/home-v2/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/landing/home-v2/assets/holt-cardholder-Cu4HiyUC.webp";
const cutouts = {
  espressoMachine,
  accessoryBundle,
  leatherFrameCase,
  silkScarf,
  smartSpeaker,
  wirelessEarbuds,
  leatherWallet,
  auden: auden$1,
  audenIvory,
  audenOlive,
  audenMustard,
  familyAirFryer,
  compactAirFryer,
  referenceLamp,
  tripodLamp,
  domeLamp,
  bedsideLamp,
  foundation,
  cottonShirt,
  tailoredTrousers,
  leatherSneakers,
  aeriaCycloneProVacuum,
  aeriaCycloneMaxVacuum,
  oliveCottonShirt,
  blackLeatherSneakers,
  skinVeilFoundation,
  trueMatchFoundation,
  leatherCardholder
};
new Set(Object.values(cutouts));
const hydratingSerum = "/images/landing/home-v2/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/landing/home-v2/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/landing/home-v2/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/landing/home-v2/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/landing/home-v2/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/landing/home-v2/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/landing/home-v2/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/landing/home-v2/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/landing/home-v2/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/landing/home-v2/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/landing/home-v2/assets/also-viewed-2-DWB9-93Z.webp";
const marais = {
  name: "Marais"
};
const goodwell = {
  name: "Goodwell"
};
const moonrest = {
  name: "Moonrest"
};
const dusklight = {
  name: "Dusklight"
};
const crestline = {
  name: "Crestline"
};
const brewhaus = {
  name: "Brewhaus"
};
const waveline = {
  name: "Waveline"
};
const aura = {
  name: "Aura"
};
const auden = {
  name: "Auden"
};
const lumen = {
  name: "Lumen"
};
const trailwell = {
  name: "Trailwell"
};
const stride = {
  name: "Stride"
};
const formwork = {
  name: "Formwork"
};
const proteinmax = {
  name: "Proteinmax"
};
const hearthware = {
  name: "Hearthware"
};
const aeria = {
  name: "Aeria"
};
const aurelle = {
  name: "Aurelle"
};
const registry = {
  marais,
  "sorelle-labs": {
    name: "Sorelle Labs"
  },
  goodwell,
  moonrest,
  "amber-and-oak": {
    name: "Amber & Oak"
  },
  dusklight,
  crestline,
  brewhaus,
  waveline,
  aura,
  "holt-and-co": {
    name: "Holt & Co"
  },
  auden,
  lumen,
  trailwell,
  stride,
  formwork,
  proteinmax,
  hearthware,
  aeria,
  aurelle
};
const catalog = {
  amberLoungeChair: {
    id: "amber-oak-lounge-chair",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Oak & Linen Lounge Chair",
    image: amberChairImage,
    price: "$480",
    color: "Natural oak / Ivory linen"
  },
  trailwellWeekender: {
    id: "trailwell-weekender",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Weekender",
    image: trailwellWeekenderImage,
    price: "$148",
    color: "Forest",
    size: "30L"
  },
  trailwellRoam: {
    id: "trailwell-roam",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Roam",
    image: trailwellRoamImage,
    price: "$189",
    color: "Charcoal",
    size: "40L"
  },
  trailwellOvernight: {
    id: "trailwell-overnight",
    brandId: "trailwell",
    brand: registry.trailwell.name,
    title: "Overnight",
    image: trailwellOvernightImage,
    price: "$132",
    color: "Sand",
    size: "24L"
  },
  auraEarbuds: {
    id: "aura-wireless-earbuds",
    brandId: "aura",
    brand: registry.aura.name,
    title: "Wireless Earbuds",
    image: cutouts.wirelessEarbuds,
    price: "$89",
    color: "Ivory"
  },
  strideCourt01: {
    id: "stride-court-01",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Court 01 Leather Sneaker",
    image: strideCourt,
    price: "$245",
    color: "Chalk",
    size: "US 10"
  },
  strideSuedeRunner: {
    id: "stride-suede-runner",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Suede Runner",
    image: strideRunner,
    price: "$295",
    color: "Taupe",
    size: "US 10"
  },
  stridePennyLoafer: {
    id: "stride-penny-loafer",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Leather Penny Loafer",
    image: strideLoafer,
    price: "$325",
    color: "Espresso",
    size: "US 10"
  },
  maraisLinenDress: {
    id: "linen-mini-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed-Fit Linen Mini Dress",
    image: linenMidiDress,
    price: "$125"
  },
  maraisShirtDress: {
    id: "linen-shirt-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Oversized Linen Shirt Dress",
    image: linenShirtDress,
    price: "$135"
  },
  maraisLinenTrousers: {
    id: "linen-trousers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Drawstring Linen Trousers",
    image: linenTrousers,
    price: "$95"
  },
  maraisBalloonDress: {
    id: "balloon-sleeve-dress",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Linen Balloon-Sleeve Dress",
    image: balloonSleeveDress,
    price: "$145"
  },
  maraisTailoredTrousers: {
    id: "straight-leg-trousers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Straight-Leg Tailored Trousers",
    image: cutouts.tailoredTrousers,
    price: "$120"
  },
  maraisSneakers: {
    id: "minimal-sneakers",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Minimal Leather Sneakers",
    image: cutouts.leatherSneakers,
    price: "$145",
    color: "White"
  },
  wavelineLaptop: {
    id: "waveline-air-14",
    brandId: "waveline",
    brand: registry.waveline.name,
    title: "Waveline Air 14″",
    image: wavelineLaptop,
    price: "$1,099"
  },
  hearthwareCompact: {
    id: "hearthware-compact",
    brandId: "hearthware",
    brand: registry.hearthware.name,
    title: "Compact Air Fryer",
    image: cutouts.compactAirFryer,
    price: "$89",
    size: "4L"
  },
  hearthwareFamily: {
    id: "hearthware-family",
    brandId: "hearthware",
    brand: registry.hearthware.name,
    title: "Family Air Fryer",
    image: cutouts.familyAirFryer,
    price: "$99",
    size: "6L"
  },
  aeriaCyclonePro: {
    id: "aeria-cyclone-pro",
    brandId: "aeria",
    brand: registry.aeria.name,
    title: "Aeria Cyclone Pro",
    image: cutouts.aeriaCycloneProVacuum,
    price: "$249"
  },
  aeriaCycloneMax: {
    id: "aeria-cyclone-max",
    brandId: "aeria",
    brand: registry.aeria.name,
    title: "Aeria Cyclone Max",
    image: cutouts.aeriaCycloneMaxVacuum,
    price: "$749"
  },
  formworkTask: {
    id: "formwork-task-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "ErgoFlex Task Chair",
    image: formworkTaskChair,
    price: "$329"
  },
  formworkExecutive: {
    id: "formwork-executive-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "ContourPro Executive Chair",
    image: formworkExecutiveChair,
    price: "$415"
  },
  goodwellSleep60: {
    id: "sleep60",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Sleep Gummies",
    image: goodwell_sleep_60,
    price: "$29.99",
    size: "60 Count"
  },
  goodwellSleep28: {
    id: "sleep28",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Sleep Gummies",
    image: goodwell_sleep_28,
    price: "$17.99",
    size: "28 Count"
  },
  goodwellEnergy: {
    id: "energy",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Clean Energy Gummies",
    image: goodwell_energy,
    price: "$27.99",
    size: "60 Count"
  },
  goodwellFocus: {
    id: "focus",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Daily Focus Gummies",
    image: goodwell_focus,
    price: "$27.99",
    size: "60 Count"
  },
  goodwellCalm: {
    id: "calm",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Calm Mood Gummies",
    image: goodwell_calm,
    price: "$26.99",
    size: "60 Count"
  },
  goodwellImmunity: {
    id: "immunity",
    brandId: "goodwell",
    brand: registry["goodwell"].name,
    title: "Immunity Gummies",
    image: goodwell_immunity,
    price: "$24.99",
    size: "60 Count"
  },
  moonrestSleep: {
    id: "moonrest-sleep",
    brandId: "moonrest",
    brand: registry["moonrest"].name,
    title: "Moonrest Sleep",
    image: moonrest_sleep,
    price: "$19.99",
    size: "25 servings"
  },
  aurelleAnklet: {
    id: "anklet-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Beaded Gold Anklet",
    image: aurelleAnkletImage,
    price: "$89"
  },
  aurellePendant: {
    id: "pendant-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Teardrop Pendant Necklace",
    image: aurellePendantImage,
    price: "$129"
  },
  aurelleBracelet: {
    id: "bracelet-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Chain-Link Bracelet",
    image: aurelleBraceletImage,
    price: "$109"
  },
  aurelleRosePendant: {
    id: "pendant-2-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Teardrop Pendant",
    image: aurelleRosePendantImage,
    price: "$135"
  },
  aurelleHalo: {
    id: "pendant-2-2",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Halo Pendant",
    image: aurelleHaloImage,
    price: "$149"
  },
  aurelleBar: {
    id: "pendant-2-3",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Bar Pendant",
    image: aurelleBarImage,
    price: "$119"
  },
  aurelleBoxChain: {
    id: "chain-1",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Fine Box Chain",
    image: aurelleBoxChainImage,
    price: "$59"
  },
  aurelleSnakeChain: {
    id: "chain-2",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Snake Chain",
    image: aurelleSnakeChainImage,
    price: "$65"
  },
  aurelleCurbChain: {
    id: "chain-3",
    brandId: "aurelle",
    brand: registry["aurelle"].name,
    title: "Rose Gold Curb Chain",
    image: aurelleCurbChainImage,
    price: "$72"
  },
  amberTripod: {
    id: "tripod-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Warm Tripod Table Lamp",
    image: cutouts.tripodLamp,
    price: "$128"
  },
  amberDome: {
    id: "mushroom-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Mod Dome Table Lamp",
    image: cutouts.domeLamp,
    price: "$145"
  },
  amberBedside: {
    id: "bedside-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Copper-Rim Bedside Lamp",
    image: cutouts.bedsideLamp,
    price: "$98"
  },
  amberOpalGlass: {
    id: "amber-oak-opal-glass-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Opal Glass Table Lamp",
    image: amberOpalLampImage,
    price: "$138"
  },
  amberPleatedLinen: {
    id: "amber-oak-pleated-linen-lamp",
    brandId: "amber-and-oak",
    brand: registry["amber-and-oak"].name,
    title: "Pleated Linen Table Lamp",
    image: amberPleatedLampImage,
    price: "$118"
  },
  dusklightArc: {
    id: "dusklight-arc",
    brandId: "dusklight",
    brand: registry["dusklight"].name,
    title: "Arc Task Light",
    image: dusklight_arc,
    price: "$240"
  },
  dusklightLinear: {
    id: "dusklight-linear",
    brandId: "dusklight",
    brand: registry["dusklight"].name,
    title: "Linear Pendant",
    image: dusklight_linear,
    price: "$420"
  },
  crestlineHelmet: {
    id: "crestline-enduro",
    brandId: "crestline",
    brand: registry["crestline"].name,
    title: "Enduro MTB Helmet",
    image: crestlineHelmet,
    price: "$180",
    color: "Graphite"
  },
  brewhausMachine: {
    id: "brewhaus-machine",
    brandId: "brewhaus",
    brand: registry["brewhaus"].name,
    title: "Pro Espresso Machine",
    image: cutouts.espressoMachine,
    price: "$449"
  },
  brewhausKit: {
    id: "brewhaus-kit",
    brandId: "brewhaus",
    brand: registry["brewhaus"].name,
    title: "Milk Frother, Reusable Filter & Starter Pack",
    image: cutouts.accessoryBundle,
    price: "$65"
  },
  sorelleCream: {
    id: "sorelle-cream",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Deep Hydration Cream",
    image: sorelleCreamImage,
    price: "$42"
  },
  sorelleLotion: {
    id: "sorelle-lotion",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Barrier Repair Lotion",
    image: sorelleLotionImage,
    price: "$34"
  },
  sorelleGel: {
    id: "sorelle-gel",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Cloud Gel Moisturizer",
    image: sorelleGelImage,
    price: "$29"
  },
  sorelleSet: {
    id: "sorelle-set",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Deep Hydration Set",
    image: sorelleSetImage,
    price: "$55"
  },
  sorelleVitaminC: {
    id: "sorelle-vitamin-c",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Vitamin C Serum",
    image: vitaminCSerum,
    price: "$68"
  },
  sorelleHydrating: {
    id: "daily-hydrating-serum",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Daily Hydrating Serum",
    image: hydratingSerum,
    price: "$68"
  },
  sorelleCalming: {
    id: "calming-serum-30ml",
    brandId: "sorelle-labs",
    brand: registry["sorelle-labs"].name,
    title: "Calming Serum",
    image: calmingSerum,
    price: "$52",
    size: "30 ml"
  },
  audenIvory: {
    id: "ivory",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Studio — Ivory",
    image: cutouts.audenIvory,
    price: "$499",
    color: "Ivory"
  },
  audenOlive: {
    id: "olive",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Endurance — Olive",
    image: cutouts.audenOlive,
    price: "$549",
    color: "Olive"
  },
  audenMustard: {
    id: "mustard",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Air — Mustard",
    image: cutouts.audenMustard,
    price: "$599",
    color: "Mustard"
  },
  audenBlack: {
    id: "auden-wave-pro-black",
    brandId: "auden",
    brand: registry.auden.name,
    title: "Auden Wave Pro",
    image: cutouts.auden,
    price: "$699",
    color: "Black"
  },
  maraisShirtIvory: {
    id: "marais-shirt-ivory",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed Cotton Shirt",
    image: cutouts.cottonShirt,
    price: "$110",
    color: "Ivory"
  },
  maraisShirtOlive: {
    id: "marais-shirt-olive",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Relaxed Cotton Shirt",
    image: cutouts.oliveCottonShirt,
    price: "$110",
    color: "Olive",
    size: "M"
  },
  maraisEyewearCase: {
    id: "leather-case",
    brandId: "marais",
    brand: registry.marais.name,
    title: "Leather Frame Case",
    image: cutouts.leatherFrameCase,
    price: "$45"
  },
  strideSneakersBlack: {
    id: "stride-sneakers-black",
    brandId: "stride",
    brand: registry.stride.name,
    title: "Minimal Leather Sneakers",
    image: cutouts.blackLeatherSneakers,
    price: "$145",
    color: "Black",
    size: "US 9"
  },
  lumenSecondSkin: {
    id: "lumen-second-skin",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "Second Skin Foundation",
    image: cutouts.foundation,
    price: "$38"
  },
  lumenSkinVeil: {
    id: "lumen-skin-veil",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "Skin Veil Foundation SPF 25",
    image: cutouts.skinVeilFoundation,
    price: "$38"
  },
  lumenTrueMatch: {
    id: "lumen-true-match",
    brandId: "lumen",
    brand: registry.lumen.name,
    title: "True Match Fluid Foundation",
    image: cutouts.trueMatchFoundation,
    price: "$36"
  },
  proteinWhey: {
    id: "proteinmax-whey-2lb",
    brandId: "proteinmax",
    brand: registry.proteinmax.name,
    title: "Proteinmax 100% Whey Protein",
    image: proteinTub,
    price: "$63.32",
    size: "2.17 LB"
  },
  holtCardholder: {
    id: "holt-cardholder",
    brandId: "holt-and-co",
    brand: registry["holt-and-co"].name,
    title: "Leather Card Holder",
    image: cutouts.leatherCardholder,
    price: "$18"
  },
  formworkMesh: {
    id: "formwork-mesh-chair",
    brandId: "formwork",
    brand: registry.formwork.name,
    title: "Mesh Office Chair",
    image: officeChair,
    price: "$389",
    color: "Graphite"
  }
};
const goldHoopSet = "/images/landing/home-v2/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/landing/home-v2/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/landing/home-v2/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
const bag = "/images/landing/home-v2/assets/bag-B7O3GVmE.svg";
const heart = "/images/landing/home-v2/assets/heart-ozq9Thds.svg";
const razor = "/images/landing/home-v2/assets/razor-CXHMOIgQ.webp";
const searchState = {
  query: "Gillette",
  brand: "Harry’s",
  sponsored: "Sponsored",
  title: "Harry’s vs. Gillette"
};
const pdpState = {
  url: "harrys.com",
  storeName: "Harry’s",
  productName: "Harry’s (5-blade)",
  addToCart: "Add to cart",
  price: "$63.32",
  originalPrice: "$74.49",
  discount: "15% off",
  rating: 4,
  image: razor,
  imageAlt: "Harry’s 5-blade razor with handle, blade cover and cartridge"
};
const comparison = {
  poweredBy: "Powered by",
  poweredByBrand: "Crossword",
  title: "Why Harry’s is better than Gillette",
  columnA: "Harry’s (5-blade)",
  columnB: "Gillette Fusion5",
  rows: [
    { label: "Number of Blades", valueA: "5", valueB: "5" },
    { label: "Flexible Head", valueA: "Yes", valueB: "Yes" },
    { label: "Precision Trimmer", valueA: "Yes", valueB: "No" },
    { label: "Cost per Refill", valueA: "~$2/blade", valueB: "~$4–5/blade" },
    { label: "Cost per Refill", valueA: "~$2/blade", valueB: "~$4–5/blade" }
  ]
};
const defaultScenario = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comparison,
  pdpState,
  searchState
}, Symbol.toStringTag, { value: "Module" }));
const SponsoredScenarioContext = createContext(defaultScenario);
SponsoredScenarioContext.Provider;
const useSponsoredScenario = () => useContext(SponsoredScenarioContext);
function ComparisonEmbed({ phase }) {
  const { comparison: source } = useSponsoredScenario();
  const comparison2 = { ...source, rows: source.rows.filter((row, i, all) => all.findIndex((r) => r.label === row.label) === i) };
  const thinking = phase === "thinking";
  const pending = phase === "loading" || thinking;
  return /* @__PURE__ */ jsxs("section", { className: ["sc2-embed", phase && `sc2-embed--${phase}`].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs("header", { className: "sc2-embed__head", children: [
      /* @__PURE__ */ jsx(SparkleGlyph, {}),
      /* @__PURE__ */ jsx("h3", { className: "sc2-embed__title", children: comparison2.title }),
      phase && phase !== "loading" && /* @__PURE__ */ jsx("span", { className: thinking ? "sc2-wait" : "sc2-wait sc2-wait--out", "aria-hidden": !thinking, children: "Thinking…" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sc2-table-wrap", children: [
      phase && /* @__PURE__ */ jsx("div", { className: pending ? "sc2-skel" : "sc2-skel sc2-skel--hidden", "aria-hidden": "true", children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ jsx("span", { className: "sc2-skel__row", style: { animationDelay: `${i * 0.05}s` } }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "sc2-table", role: "table", children: [
        /* @__PURE__ */ jsxs("div", { className: "sc2-table__row sc2-table__row--head", role: "row", children: [
          /* @__PURE__ */ jsx("span", { role: "columnheader", children: "What matters" }),
          /* @__PURE__ */ jsx("span", { role: "columnheader", children: comparison2.columnA }),
          /* @__PURE__ */ jsx("span", { role: "columnheader", children: comparison2.columnB })
        ] }),
        comparison2.rows.map((row, i) => /* @__PURE__ */ jsxs("div", { className: "sc2-table__row", role: "row", style: { "--sc2-i": i + 1 }, children: [
          /* @__PURE__ */ jsx("span", { role: "rowheader", children: row.label }),
          /* @__PURE__ */ jsx("span", { role: "cell", children: row.valueA }),
          /* @__PURE__ */ jsx("span", { role: "cell", children: row.valueB })
        ] }, i)),
        /* @__PURE__ */ jsxs("div", { className: "sc2-table__row sc2-table__row--foot", role: "row", style: { "--sc2-i": comparison2.rows.length + 1 }, children: [
          /* @__PURE__ */ jsx("span", { role: "rowheader", children: "Details" }),
          /* @__PURE__ */ jsxs("span", { role: "cell", className: "sc2-view", children: [
            /* @__PURE__ */ jsx("span", { className: "sc2-view__word", children: "View" }),
            " ",
            /* @__PURE__ */ jsx(ViewOutGlyph, {})
          ] }),
          /* @__PURE__ */ jsxs("span", { role: "cell", className: "sc2-view", children: [
            /* @__PURE__ */ jsx("span", { className: "sc2-view__word", children: "View" }),
            " ",
            /* @__PURE__ */ jsx(ViewOutGlyph, {})
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "sc2-embed__note", children: [
      comparison2.poweredBy,
      " ",
      /* @__PURE__ */ jsx("u", { children: comparison2.poweredByBrand })
    ] })
  ] });
}
function SparkleGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: "M84.27,171.73l-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3a7.92,7.92,0,0,1,0,14.86l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0Z" }),
    /* @__PURE__ */ jsx("line", { x1: "176", y1: "16", x2: "176", y2: "64" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "40", x2: "152", y2: "40" })
  ] });
}
function ViewOutGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", width: 10, height: 10, fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5l5-5M4.5 3.5h4v4" }) });
}
const frameBg = "/images/landing/home-v2/assets/bg-C5bBjcVp.webp";
const beats = [
  { id: "idle", type: "pause", ms: 900 },
  { id: "tap", type: "pause", ms: 380 },
  { id: "open", type: "appear", ms: 560 },
  { id: "title", type: "load", ms: 260 },
  { id: "price", type: "load", ms: 220 },
  { id: "scroll", type: "pause", ms: 700 },
  { id: "comparison", type: "load", ms: 1600 }
];
function useAssetsReady(src) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    var _a;
    let cancelled = false;
    const img = new Image();
    img.src = src;
    Promise.all([(_a = document.fonts) == null ? void 0 : _a.ready, img.decode().catch(() => void 0)]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);
  return ready;
}
function SponsoredComparisonMobileMotion() {
  const { searchState: searchState2, pdpState: pdpState2 } = useSponsoredScenario();
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const ready = useAssetsReady(pdpState2.image);
  const t = useChatTimeline(beats, landed && ready);
  const cls = (base, flags) => [base, ...Object.entries(flags).filter(([, on]) => on).map(([k]) => `${base}--${k}`)].join(" ");
  const scene = cls("scm", {
    tap: t.reached("tap"),
    open: t.reached("open"),
    image: t.passed("open"),
    title: t.passed("title"),
    price: t.passed("price"),
    scroll: t.reached("scroll")
  });
  return /* @__PURE__ */ jsx("div", { className: "scm-root", ref: rootRef, children: /* @__PURE__ */ jsxs("div", { className: scene, children: [
    /* @__PURE__ */ jsx("img", { className: "scm__bg", src: frameBg, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "scm__window", children: [
      /* @__PURE__ */ jsxs("div", { className: "scm__chrome", children: [
        /* @__PURE__ */ jsx("div", { className: "scm__chrome-layer scm__chrome-layer--search", children: /* @__PURE__ */ jsx(BrowserChrome, { url: searchState2.query, field: "search" }) }),
        /* @__PURE__ */ jsx("div", { className: "scm__chrome-layer scm__chrome-layer--address", children: /* @__PURE__ */ jsx(BrowserChrome, { url: pdpState2.url }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "scm__viewport", children: [
        /* @__PURE__ */ jsxs("div", { className: "scm__search", children: [
          /* @__PURE__ */ jsxs("div", { className: "scm__ad", children: [
            /* @__PURE__ */ jsxs("div", { className: "scm__ad-head", children: [
              /* @__PURE__ */ jsxs("span", { className: "scm__ad-brand", children: [
                /* @__PURE__ */ jsx("span", { className: "scm__ad-logo", children: "H" }),
                /* @__PURE__ */ jsx("span", { className: "scm__label", children: searchState2.brand })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "scm__label", children: searchState2.sponsored })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "scm__ad-title", children: searchState2.title }),
            /* @__PURE__ */ jsx("span", { className: "scm__bar", style: { width: "78%" } }),
            /* @__PURE__ */ jsx("span", { className: "scm__bar", style: { width: "54%" } })
          ] }),
          [[74, 72, 92], [58, 60, 84], [66, 68, 88]].map(([a, b, c], i) => /* @__PURE__ */ jsxs("div", { className: "scm__result", children: [
            /* @__PURE__ */ jsxs("span", { className: "scm__result-source", children: [
              /* @__PURE__ */ jsx("i", {}),
              /* @__PURE__ */ jsx("span", { className: "scm__rbar", style: { width: a } })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "scm__rtitle", style: { width: `${b}%` } }),
            /* @__PURE__ */ jsx("span", { className: "scm__rbar", style: { width: `${c}%` } })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsx("div", { className: "scm__pdp", children: /* @__PURE__ */ jsxs("div", { className: "scm__page", children: [
          /* @__PURE__ */ jsxs("div", { className: "scm__nav", children: [
            /* @__PURE__ */ jsx("span", { className: "scm__store", children: pdpState2.storeName }),
            /* @__PURE__ */ jsx("img", { src: bag, alt: "", width: 18, height: 18 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "scm__gallery", children: [
            /* @__PURE__ */ jsx(ProductImage, { src: pdpState2.image, alt: pdpState2.imageAlt }),
            /* @__PURE__ */ jsx("span", { className: "scm__skel scm__skel--gallery" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "scm__info", children: [
            /* @__PURE__ */ jsxs("div", { className: "scm__row scm__row--title", children: [
              /* @__PURE__ */ jsx("h2", { className: "scm__name", children: pdpState2.productName }),
              /* @__PURE__ */ jsx("span", { className: "scm__heart", children: /* @__PURE__ */ jsx("img", { src: heart, alt: "", width: 12, height: 12 }) }),
              /* @__PURE__ */ jsxs("span", { className: "scm__skel scm__skel--row", children: [
                /* @__PURE__ */ jsx("b", { style: { width: 132 } }),
                /* @__PURE__ */ jsx("b", { style: { width: 28, marginLeft: "auto" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "scm__row scm__row--price", children: [
              /* @__PURE__ */ jsx("span", { className: "scm__price", children: pdpState2.price }),
              /* @__PURE__ */ jsx("span", { className: "scm__price scm__price--was", children: pdpState2.originalPrice }),
              /* @__PURE__ */ jsx("span", { className: "scm__discount", children: pdpState2.discount }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "scm__cart", children: pdpState2.addToCart }),
              /* @__PURE__ */ jsxs("span", { className: "scm__skel scm__skel--row", children: [
                /* @__PURE__ */ jsx("b", { style: { width: 52 } }),
                /* @__PURE__ */ jsx("b", { style: { width: 50 } }),
                /* @__PURE__ */ jsx("b", { style: { width: 44 } }),
                /* @__PURE__ */ jsx("b", { style: { width: 92, marginLeft: "auto" } })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "scm__embed", children: /* @__PURE__ */ jsx(ComparisonEmbed, { phase: t.passed("comparison") ? "in" : t.reached("comparison") ? "thinking" : "loading" }) })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  SponsoredComparisonMobileMotion
};
