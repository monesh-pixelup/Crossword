"use client";

// Built from the "Crossword — Home page motion visuals (v2)" source (Crossword-Homev2-Motion/source) with Vite,
// unminified, React external. See ./index.tsx for the mechanical changes.

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useLayoutEffect, Fragment as Fragment$1, useMemo, createContext, useContext, forwardRef } from "react";
const frameBackground = "/images/landing/home-v2/assets/background-GiCSjLb9.svg";
const frameTexture$1 = "/images/landing/home-v2/assets/background-texture-C4nqYl4R.webp";
function SceneFrame({
  children,
  hideBackground,
  height
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "hm-ill-scene-frame-scale",
      style: height ? { aspectRatio: `738 / ${height}` } : void 0,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: height ? "hm-ill-scene-frame hm-ill-scene-frame--sized" : "hm-ill-scene-frame",
          style: height ? { height } : void 0,
          children: [
            !hideBackground && /* @__PURE__ */ jsxs(Fragment, { children: [
              height ? /* @__PURE__ */ jsx("svg", { className: "hm-ill-scene-frame__background", viewBox: `0 0 738 ${height}`, "aria-hidden": "true", children: [
                [26, 24],
                [712, 24],
                [26, height - 24],
                [712, height - 24]
              ].map(([cx2, cy]) => /* @__PURE__ */ jsx("circle", { cx: cx2, cy, r: 4.5, fill: "none", stroke: "#D2B75C" }, `${cx2}-${cy}`)) }) : /* @__PURE__ */ jsx(
                "img",
                {
                  className: "hm-ill-scene-frame__background",
                  src: frameBackground,
                  alt: "",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "hm-ill-scene-frame__texture",
                  src: frameTexture$1,
                  alt: "",
                  "aria-hidden": "true"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hm-ill-scene-frame__content", children })
          ]
        }
      )
    }
  );
}
function cubicBezier(p1x, p1y, p2x, p2y) {
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx2 = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;
  const sampleX = (t) => ((ax * t + bx) * t + cx2) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx2;
  const solveT = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x;
      const derivative = sampleDerivativeX(t);
      if (Math.abs(derivative) < 1e-6) break;
      t -= xEst / derivative;
    }
    return t;
  };
  return (x) => sampleY(solveT(x));
}
const drawerEase = cubicBezier(0.32, 0.72, 0, 1);
function animateScrollTo(el, to, durationMs = 320) {
  const from = el.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return () => {
  };
  let cancelled = false;
  const start = performance.now();
  const step = (now) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / durationMs);
    el.scrollTop = from + delta * drawerEase(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => {
    cancelled = true;
  };
}
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
const THINKING_STAGE_1_MS$6 = 300;
const THINKING_STAGE_2_MS$6 = 500;
const THINKING_EXIT_MS$6 = 150;
const CHAR_INTERVAL_MS$6 = 26;
const REPLY_STAGGER_MS$6 = 45;
const REPLY_WORD_ANIM_MS$6 = 220;
const REPLY_SETTLE_MS$6 = 150;
const PRODUCTS_SKELETON_HOLD_MS$1 = 550;
function prefersReducedMotion$6() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs$6(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS$6 + REPLY_WORD_ANIM_MS$6 + REPLY_SETTLE_MS$6;
}
function pauseMs$2(turn) {
  const base = 350 + Math.min(turn.assistantMessage.length * 3, 500);
  return turn.products?.length ? base + 500 : base;
}
function useConversationPlayback$2(turns2) {
  const reducedMotion = useRef(prefersReducedMotion$6()).current;
  const [turnIndex, setTurnIndex] = useState(reducedMotion ? turns2.length : 0);
  const [phase, setPhase] = useState("composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [productsLoading, setProductsLoading] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    if (turnIndex >= turns2.length) return;
    const turn = turns2[turnIndex];
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(turn.userMessage, {
        msPerStep: CHAR_INTERVAL_MS$6,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "thinking") {
      const hasProducts = Boolean(turn.products?.length || turn.singleCard);
      after(THINKING_STAGE_1_MS$6, () => {
        setStatusLabel(hasProducts ? "Finding the right options" : "Reading your ask");
      });
      after(THINKING_STAGE_1_MS$6 + THINKING_STAGE_2_MS$6, () => {
        setPhase("thinkingExit");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$6, () => {
        setPhase("replying");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      after(replyRevealMs$6(turn.assistantMessage), () => {
        if (turn.products?.length || turn.singleCard) {
          setProductsLoading(true);
          setPhase("productsLoading");
        } else {
          setPhase("pausing");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "productsLoading") {
      after(PRODUCTS_SKELETON_HOLD_MS$1, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "pausing") {
      after(pauseMs$2(turn), () => {
        setTurnIndex((n) => n + 1);
        setPhase("composing");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [turnIndex, phase, reducedMotion]);
  return {
    turnIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    productsLoading,
    reducedMotion,
    done: turnIndex >= turns2.length
  };
}
const amberChairImage = "/images/landing/home-v2/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
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
const cutoutSrcs = new Set(Object.values(cutouts));
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
const aurelia = {
  name: "Aurelia",
  category: "Merchant workspace",
  ink: "oklch(0.372050 0.104087 11.375080)",
  paper: "oklch(0.949854 0.035765 83.776669)",
  plate: "oklch(0.949854 0.035765 83.776669)",
  font: 'var(--font-geist), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Merchant workflow modules; no retail product imagery.",
  logomarkPath: "src/assets/brands/supplied/aurelia-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/aurelia-badge.svg",
  wordmarkTreatment: "plain-text"
};
const marais = {
  name: "Marais",
  category: "Fashion and accessories",
  ink: "oklch(0.333797 0.017711 52.846973)",
  paper: "oklch(0.917788 0.014926 80.705576)",
  plate: "oklch(0.917788 0.014926 80.705576)",
  font: 'var(--font-playfair-display), Georgia, serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Natural fibres, neutral apparel and cognac leather. Preserve exact garment and colourway.",
  logomarkPath: "src/assets/brands/supplied/marais-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/marais-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const goodwell = {
  name: "Goodwell",
  category: "Functional gummies",
  ink: "#3D2A52",
  paper: "#ECE5F4",
  plate: "#ECE5F4",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Plum-labelled jars on soft lavender backgrounds.",
  logomarkPath: "src/assets/brands/supplied/goodwell-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/goodwell-badge.svg",
  wordmarkTreatment: "plain-text"
};
const moonrest = {
  name: "Moonrest",
  category: "Sleep wellness",
  ink: "oklch(0.322726 0.043440 265.959396)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Midnight blue sleep-wellness packaging.",
  logomarkPath: "src/assets/brands/supplied/moonrest-mark.svg",
  wordmarkPath: "src/assets/brands/placeholders/moonrest-wordmark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/moonrest-badge.svg",
  wordmarkTreatment: "plain-text"
};
const dusklight = {
  name: "Dusklight",
  category: "Lighting",
  ink: "oklch(0.407553 0.025289 297.472985)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-playfair-display), Georgia, serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Sculptural lighting in muted dusk neutrals.",
  logomarkPath: "src/assets/brands/supplied/dusklight-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/dusklight-badge.svg",
  wordmarkTreatment: "plain-text"
};
const crestline = {
  name: "Crestline",
  category: "Helmets and protection",
  ink: "oklch(0.387478 0.051296 162.242973)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Graphite and ivory outdoor equipment on neutral studio backgrounds.",
  logomarkPath: "src/assets/brands/supplied/crestline-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/crestline-badge.svg",
  wordmarkTreatment: "plain-text"
};
const brewhaus = {
  name: "Brewhaus",
  category: "Coffee equipment",
  ink: "oklch(0.362916 0.031371 68.517470)",
  paper: "oklch(0.900982 0.029332 82.592444)",
  plate: "oklch(0.900982 0.029332 82.592444)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Brushed steel machines and cream coffee packaging; warm studio light.",
  logomarkPath: "src/assets/brands/supplied/brewhaus-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/brewhaus-badge.svg",
  wordmarkTreatment: "plain-text"
};
const waveline = {
  name: "Waveline",
  category: "Electronics",
  ink: "oklch(0.393233 0.051477 222.864924)",
  paper: "oklch(0.937245 0.014436 213.099208)",
  plate: "oklch(0.937245 0.014436 213.099208)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Clean silver and charcoal electronics, restrained blue-green accents."
};
const aura = {
  name: "Aura",
  category: "Consumer electronics",
  ink: "oklch(0.383958 0.041934 259.291287)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Ivory earbud shells with small uppercase branding.",
  logomarkPath: "src/assets/brands/supplied/aura-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/aura-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const auden = {
  name: "Auden",
  category: "Headphones",
  ink: "oklch(0.287317 0.010592 139.435369)",
  paper: "oklch(0.953751 0.006637 106.524690)",
  plate: "oklch(0.953751 0.006637 106.524690)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Same headphone geometry across black, ivory, olive and mustard variants."
};
const lumen = {
  name: "Lumen",
  category: "Foundation and makeup",
  ink: "oklch(0.471130 0.054860 60.711055)",
  paper: "oklch(0.918283 0.023989 73.599537)",
  plate: "oklch(0.918283 0.023989 73.599537)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Pale champagne caps, frosted glass and widely tracked uppercase LUMEN packaging."
};
const trailwell = {
  name: "Trailwell",
  category: "Backpacks and bottles",
  ink: "oklch(0.404438 0.043777 153.864096)",
  paper: "oklch(0.932657 0.021677 118.236881)",
  plate: "oklch(0.932657 0.021677 118.236881)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Outdoor utility, olive fabric and durable metal bottles.",
  logomarkPath: "src/assets/brands/supplied/trailwell-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/trailwell-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const stride = {
  name: "Stride",
  category: "Shoes",
  ink: "oklch(0.385568 0.040481 186.036186)",
  paper: "oklch(0.927348 0.013483 167.158983)",
  plate: "oklch(0.927348 0.013483 167.158983)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Minimal footwear; black, tan and white are separate image assets, never CSS colour filters.",
  logomarkPath: "src/assets/brands/supplied/stride-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/stride-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const vela = {
  name: "Vela",
  category: "Hair tools",
  ink: "oklch(0.400862 0.039974 357.323084)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Muted rose and charcoal styling tools."
};
const formwork = {
  name: "Formwork",
  category: "Office chairs",
  ink: "oklch(0.379113 0.017648 231.725316)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Graphite mesh seating; every gallery angle must be of the same chair."
};
const proteinmax = {
  name: "Proteinmax",
  category: "Protein supplements",
  ink: "oklch(0.397889 0.104174 19.963898)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "uppercase",
  tracking: "0.12em",
  imageDirection: "Black protein tubs, red accents and consistent PROTEINMAX labels.",
  logomarkPath: "src/assets/brands/supplied/proteinmax-mark.svg",
  identitySourcePath: "src/assets/brands/supplied/proteinmax-badge.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  wordmarkTreatment: "plain-text"
};
const hearthware = {
  name: "Hearthware",
  category: "Kitchen appliances",
  ink: "oklch(0.443046 0.078484 38.521350)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-face-inter-motion), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Matte charcoal kitchen appliances with warm neutral studio lighting."
};
const aeria = {
  name: "Aeria",
  category: "Vacuums",
  ink: "oklch(0.423822 0.051456 208.468768)",
  paper: "oklch(0.968556 0.013078 82.401983)",
  plate: "oklch(0.968556 0.013078 82.401983)",
  font: 'var(--font-space-grotesk), system-ui, sans-serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Original charcoal or ivory vacuum designs with restrained teal details; no real brand marks."
};
const aurelle = {
  name: "Aurelle",
  category: "Jewellery",
  ink: "oklch(0.372050 0.104087 11.375080)",
  paper: "oklch(0.949854 0.035765 83.776669)",
  plate: "oklch(0.949854 0.035765 83.776669)",
  font: 'var(--font-playfair-display), Georgia, serif',
  wordmarkCase: "none",
  tracking: "-0.025em",
  imageDirection: "Gold and rose-gold jewellery; warm ivory silk and pale stone.",
  logomarkPath: "src/assets/brands/supplied/aurelle-mark.svg",
  identityStatus: "Supplied logomark; plain-text wordmark",
  identitySourcePath: "src/assets/brands/supplied/aurelle-badge.svg",
  wordmarkTreatment: "plain-text"
};
const registry = {
  aurelia,
  marais,
  "sorelle-labs": {
    name: "Sorelle Labs",
    category: "Skincare",
    ink: "oklch(0.312021 0.017679 40.980349)",
    paper: "oklch(0.928960 0.013702 120.286628)",
    plate: "oklch(0.928960 0.013702 120.286628)",
    font: 'var(--font-playfair-display), Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Ivory bottles, quiet botanical details, warm paper with sand and sage plates.",
    logomarkPath: "src/assets/brands/supplied/sorelle-labs-mark.svg",
    identityStatus: "Supplied logomark; plain-text wordmark",
    identitySourcePath: "src/assets/brands/supplied/sorelle-labs-badge.svg",
    wordmarkTreatment: "plain-text"
  },
  goodwell,
  moonrest,
  "amber-and-oak": {
    name: "Amber & Oak",
    category: "Home decor and furniture",
    ink: "oklch(0.452877 0.059042 53.979984)",
    paper: "oklch(0.968556 0.013078 82.401983)",
    plate: "oklch(0.968556 0.013078 82.401983)",
    font: 'var(--font-playfair-display), Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Warm lighting, oak, linen and brass. Keep the supplied shopper reference distinct.",
    logomarkPath: "src/assets/brands/supplied/amber-and-oak-mark.svg",
    identityStatus: "Supplied logomark; plain-text wordmark",
    identitySourcePath: "src/assets/brands/supplied/amber-and-oak-badge.svg",
    wordmarkTreatment: "plain-text"
  },
  dusklight,
  crestline,
  brewhaus,
  waveline,
  aura,
  "holt-and-co": {
    name: "Holt & Co",
    category: "Leather goods",
    ink: "oklch(0.389321 0.051580 45.883998)",
    paper: "oklch(0.931264 0.021080 79.091606)",
    plate: "oklch(0.931264 0.021080 79.091606)",
    font: 'var(--font-playfair-display), Georgia, serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Cognac leather, subtle debossed wordmarks, warm sand surfaces."
  },
  auden,
  lumen,
  trailwell,
  stride,
  vela,
  formwork,
  proteinmax,
  "echo-and-co": {
    name: "Echo & Co",
    category: "Multi-category gift retailer",
    ink: "oklch(0.377131 0.052841 265.419694)",
    paper: "oklch(0.968556 0.013078 82.401983)",
    plate: "oklch(0.968556 0.013078 82.401983)",
    font: 'var(--font-face-inter-motion), system-ui, sans-serif',
    wordmarkCase: "none",
    tracking: "-0.025em",
    imageDirection: "Retailer identity stays in chrome; individual products retain Waveline, Aura and Holt & Co branding."
  },
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
const lookGoldHoopSet = "/images/landing/home-v2/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const lookPearlDropSet = "/images/landing/home-v2/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const lookCitrineStudSet = "/images/landing/home-v2/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  lookGoldHoopSet,
  lookPearlDropSet,
  lookCitrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
const __vite_glob_0_0 = "/images/landing/home-v2/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/landing/home-v2/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/landing/home-v2/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/landing/home-v2/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/landing/home-v2/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/landing/home-v2/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/landing/home-v2/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/landing/home-v2/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/landing/home-v2/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/landing/home-v2/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/landing/home-v2/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/landing/home-v2/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/landing/home-v2/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/landing/home-v2/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/landing/home-v2/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/landing/home-v2/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/landing/home-v2/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/landing/home-v2/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/landing/home-v2/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/landing/home-v2/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/landing/home-v2/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/landing/home-v2/assets/sorelle-labs-mark-DwV8-BRm.svg";
const goodwellMark = "/images/landing/home-v2/assets/goodwell-mark-D2M8-7dz.svg";
const normalise = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
function getBrand(name) {
  const entry = Object.entries(registry).find(
    ([id, brand2]) => id === name || normalise(brand2.name) === normalise(name)
  );
  if (!entry) throw new Error(`Unregistered demo brand: ${name}`);
  return { id: entry[0], ...entry[1] };
}
function brandStyle(name) {
  const brand2 = getBrand(name);
  return {
    "--brand-ink": brand2.ink,
    "--brand-paper": brand2.paper,
    "--brand-plate": brand2.plate,
    "--brand-font": brand2.font,
    "--brand-tracking": brand2.tracking,
    "--brand-case": brand2.wordmarkCase
  };
}
const marks = {
  aurelia: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  marais: "M5 19V5l7 9 7-9v14M8 19V12m8 7v-7",
  "sorelle-labs": "M12 20V9m0 7C5 16 4 10 4 7c6 0 8 3 8 7m0-3c0-5 4-7 8-7 0 5-2 9-8 9",
  moonrest: "M17 4a8.5 8.5 0 1 0 3 14A9 9 0 0 1 17 4Z",
  "amber-and-oak": "M4 12 8 5h8l4 7H4Zm8 0v7m-4 0h8",
  dusklight: "M5 17h14M7 14a5 5 0 0 1 10 0M12 3v3M4 7l2 2m14-2-2 2",
  crestline: "M3 19 10 5l4 8 3-5 5 11H3Zm5-9 2 3 2-3",
  brewhaus: "M5 9h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm12 1h1a3 3 0 0 1 0 6h-1M8 3v3m5-3v3",
  waveline: "M3 8c3-6 6 6 9 0s6 6 9 0M3 16c3-6 6 6 9 0s6 6 9 0",
  aura: "M7 5a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5V8a3 3 0 0 1 2-3Zm10 0a3 3 0 0 1 2 3v6h-2a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM7 14v5m10-5v5",
  "holt-and-co": "M5 5v14m8-14v14M5 12h8m7-5c-4-2-5 8 0 8",
  auden: "M4 15v-3a8 8 0 0 1 16 0v3M4 12h3v7H4v-7Zm13 0h3v7h-3v-7Z",
  lumen: "M12 3v3m0 12v3M3 12h3m12 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z",
  trailwell: "M3 19 9 7l4 8 3-6 5 10H3ZM12 3v4",
  stride: "m4 8 12-4-3 6 7 1-12 9 3-7-7-1Z",
  vela: "M5 5 12 20 19 5M9 5l3 7 3-7",
  formwork: "M7 4h10v9H7V4Zm-2 9h14v4H5v-4Zm3 4v4m8-4v4",
  proteinmax: "m12 3 8 5v8l-8 5-8-5V8l8-5ZM8 16V8h5a3 3 0 0 1 0 6H8",
  "echo-and-co": "M8 4a8 8 0 0 0 0 16m4-13a5 5 0 0 0 0 10m4-7a2 2 0 0 0 0 4m5-2h-1",
  hearthware: "M5 20V10l7-6 7 6v10H5Zm5-3c-3-3 3-4 2-7 5 4 4 7 0 8",
  aeria: "M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h5"
};
const suppliedMarks = /* @__PURE__ */ Object.assign({ "../assets/brands/supplied/amber-and-oak-mark.svg": __vite_glob_0_0, "../assets/brands/supplied/aura-mark.svg": __vite_glob_0_1, "../assets/brands/supplied/aurelia-mark.svg": __vite_glob_0_2, "../assets/brands/supplied/aurelle-mark.svg": __vite_glob_0_3, "../assets/brands/supplied/brewhaus-mark.svg": __vite_glob_0_4, "../assets/brands/supplied/crestline-mark.svg": __vite_glob_0_5, "../assets/brands/supplied/dusklight-mark.svg": __vite_glob_0_6, "../assets/brands/supplied/goodwell-mark.svg": __vite_glob_0_7, "../assets/brands/supplied/marais-mark.svg": __vite_glob_0_8, "../assets/brands/supplied/moonrest-mark.svg": __vite_glob_0_9, "../assets/brands/supplied/proteinmax-mark.svg": __vite_glob_0_10, "../assets/brands/supplied/sorelle-labs-mark.svg": __vite_glob_0_11, "../assets/brands/supplied/stride-mark.svg": __vite_glob_0_12, "../assets/brands/supplied/trailwell-mark.svg": __vite_glob_0_13 });
const placeholderMarks = /* @__PURE__ */ Object.assign({
  "../assets/brands/placeholders/amber-and-oak-mark.svg": __vite_glob_1_0,
  "../assets/brands/placeholders/aurelia-mark.svg": __vite_glob_1_1,
  "../assets/brands/placeholders/aurelle-mark.svg": __vite_glob_1_2,
  "../assets/brands/placeholders/brewhaus-mark.svg": __vite_glob_1_3,
  "../assets/brands/placeholders/crestline-mark.svg": __vite_glob_1_4,
  "../assets/brands/placeholders/dusklight-mark.svg": __vite_glob_1_5,
  "../assets/brands/placeholders/moonrest-mark.svg": __vite_glob_1_6,
  "../assets/brands/placeholders/sorelle-labs-mark.svg": __vite_glob_1_7
});
function BrandMark({
  brand: name,
  className = ""
}) {
  const brand2 = getBrand(name);
  const supplied = suppliedMarks[`../assets/brands/supplied/${brand2.id}-mark.svg`];
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-mark ${className}`,
      style: brandStyle(name),
      "data-brand-id": brand2.id,
      "data-identity-asset": supplied ? "supplied" : "placeholder",
      "aria-hidden": "true",
      children: supplied ? /* @__PURE__ */ jsx("img", { className: "demo-brand-mark__supplied", src: supplied, alt: "" }) : brand2.id === "aurelle" || brand2.id === "goodwell" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: brand2.id === "aurelle" ? placeholderMarks["../assets/brands/placeholders/aurelle-mark.svg"] : goodwellMark,
          alt: ""
        }
      ) : placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`] ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "demo-brand-mark__asset",
          style: {
            maskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`]}")`,
            WebkitMaskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand2.id}-mark.svg`]}")`
          }
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx("path", { d: marks[brand2.id] })
        }
      )
    }
  );
}
function BrandName({
  brand: brand2,
  className = ""
}) {
  const identity = getBrand(brand2);
  const displayName = identity.name === identity.name.toUpperCase() ? identity.name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) : identity.name;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `demo-brand-name ${className}`,
      style: brandStyle(brand2),
      "data-brand-id": identity.id,
      children: displayName
    }
  );
}
function BrandWordmark({
  brand: brand2,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("span", { className: `demo-brand-wordmark ${className}`, children: [
    /* @__PURE__ */ jsx(BrandMark, { brand: brand2 }),
    /* @__PURE__ */ jsx(BrandName, { brand: brand2 })
  ] });
}
const brand$5 = "Aurelle";
const turn1$2 = {
  userMessage: "I need a birthday gift for my wife. She has pretty expensive taste, but my budget doesn't really match it this year.",
  assistantMessage: "Let's find something that still feels special without stretching your budget — here are three pieces under $150 that read more expensive than they cost.",
  // Proactive follow-ups offered under the reply (Storybook .nw-win__row).
  followups: ["More like the pendant", "Show rose gold", "Under $100"]
};
const firstPicks = [
  { ...catalog.aurelleAnklet, brand: brand$5, rating: 4, ratingCount: "312", image: catalog.aurelleAnklet.image },
  { ...catalog.aurellePendant, brand: brand$5, rating: 5, ratingCount: "1.1k", image: catalog.aurellePendant.image, imageFit: "cover" },
  { ...catalog.aurelleBracelet, brand: brand$5, rating: 4, ratingCount: "487", image: catalog.aurelleBracelet.image }
];
const turn2$2 = {
  userMessage: "I like the middle one. Can you show me more styles like that, in rose gold?",
  assistantMessage: "Good eye — the teardrop pendant is one of our most-gifted pieces. Here are a few more pendant styles in rose gold.",
  followups: ["Add the first one to my cart", "Compare these", "Is gift wrap free?"]
};
const pendants = [
  { ...catalog.aurelleRosePendant, brand: brand$5, rating: 5, ratingCount: "860", image: catalog.aurelleRosePendant.image, imageFit: "cover" },
  { ...catalog.aurelleHalo, brand: brand$5, rating: 5, ratingCount: "402", image: catalog.aurelleHalo.image, imageFit: "cover" },
  { ...catalog.aurelleBar, brand: brand$5, rating: 4, ratingCount: "275", image: catalog.aurelleBar.image, imageFit: "cover" }
];
const turn3$2 = {
  userMessage: "Add the first one to my cart.",
  assistantMessage: "Added to your cart. Want to pair it with something else, like a matching chain?",
  followups: ["Earrings to match", "Go to checkout", "Gift wrap it"]
};
const addedPendant = pendants[0];
const turn4$2 = {
  userMessage: "Yes, show me a matching chain.",
  assistantMessage: "Here are three chains that pair well with it — most people choose the fine box chain with this pendant.",
  followups: ["Which length?", "Show gold instead", "Compare chains"]
};
const chains = [
  { ...catalog.aurelleBoxChain, brand: brand$5, rating: 5, ratingCount: "930", tag: "Most paired", image: catalog.aurelleBoxChain.image, imageFit: "cover" },
  { ...catalog.aurelleSnakeChain, brand: brand$5, rating: 4, ratingCount: "214", image: catalog.aurelleSnakeChain.image, imageFit: "cover" },
  { ...catalog.aurelleCurbChain, brand: brand$5, rating: 4, ratingCount: "158", image: catalog.aurelleCurbChain.image, imageFit: "cover" }
];
const turn5$1 = {
  userMessage: "Perfect, add that one too.",
  assistantMessage: "Added — your pendant and chain are both in the cart, ready for checkout.",
  followups: ["Go to checkout", "Add a gift note", "Keep browsing"]
};
const addedChain = chains[0];
function ChatHead({ brand: store } = {}) {
  return /* @__PURE__ */ jsxs("header", { className: "gj2-head", children: [
    /* @__PURE__ */ jsxs("div", { className: "gj2-head__group", children: [
      /* @__PURE__ */ jsx(Puck, { label: "Chat history", children: /* @__PURE__ */ jsx(HistoryGlyph, {}) }),
      /* @__PURE__ */ jsx(Puck, { label: "New chat", children: /* @__PURE__ */ jsx(PlusGlyph, {}) })
    ] }),
    store ? /* @__PURE__ */ jsx(StoreIdentity, { name: store }) : /* @__PURE__ */ jsx(AureliaIdentity, {}),
    /* @__PURE__ */ jsxs("div", { className: "gj2-head__group", children: [
      /* @__PURE__ */ jsx(Puck, { label: "More", children: /* @__PURE__ */ jsx(DotsGlyph, {}) }),
      /* @__PURE__ */ jsx(Puck, { label: "Close", children: /* @__PURE__ */ jsx(CloseGlyph, {}) })
    ] })
  ] });
}
function AureliaIdentity() {
  return /* @__PURE__ */ jsxs("div", { className: "gj2-head__identity", children: [
    /* @__PURE__ */ jsx(AureliaMark, { className: "gj2-head__logo" }),
    /* @__PURE__ */ jsx("span", { className: "gj2-head__name", children: brand$5 })
  ] });
}
function StoreIdentity({ name }) {
  return /* @__PURE__ */ jsxs("div", { className: "gj2-head__identity", children: [
    /* @__PURE__ */ jsx(BrandMark, { brand: name, className: "gj2-head__logo" }),
    /* @__PURE__ */ jsx(BrandName, { brand: name, className: "gj2-head__name" })
  ] });
}
function ChatFoot({ value }) {
  const valueRef = useRef(null);
  const [height, setHeight] = useState(void 0);
  useLayoutEffect(() => {
    if (!value) {
      setHeight(void 0);
      return;
    }
    const content2 = valueRef.current?.offsetHeight ?? 0;
    setHeight(Math.max(48, content2 + 12));
  }, [value]);
  return /* @__PURE__ */ jsxs("footer", { className: "gj2-foot", children: [
    /* @__PURE__ */ jsxs("div", { className: "gj2-composer", style: height ? { height } : void 0, children: [
      value ? /* @__PURE__ */ jsxs("span", { className: "gj2-composer__value", ref: valueRef, children: [
        value,
        /* @__PURE__ */ jsx("span", { className: "gj2-caret", "aria-hidden": "true" })
      ] }) : /* @__PURE__ */ jsx("span", { className: "gj2-composer__placeholder", children: "Ask anything" }),
      /* @__PURE__ */ jsx("span", { className: value ? "gj2-send gj2-send--ready" : "gj2-send", "aria-label": "Send", children: /* @__PURE__ */ jsx(ArrowUpGlyph, {}) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "gj2-note", children: [
      "AI can make mistakes. Powered by ",
      /* @__PURE__ */ jsx("u", { children: "Crossword" })
    ] })
  ] });
}
function AureliaMark({ className }) {
  return /* @__PURE__ */ jsx("span", { className: ["aurelia-mark", className].filter(Boolean).join(" "), "aria-hidden": "true", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "legacy-supplied-mark" }) });
}
function Followups({ items, picked, className }) {
  return /* @__PURE__ */ jsx("div", { className: ["gj2-followups", className].filter(Boolean).join(" "), children: items.map((text) => /* @__PURE__ */ jsx("span", { className: text === picked ? "gj2-followup gj2-followup--picked" : "gj2-followup", children: text }, text)) });
}
function tappedChip(items, message) {
  if (!items || !message) return void 0;
  const bare = (t) => t.trim().replace(/[.!?]+$/, "").toLowerCase();
  return items.find((t) => bare(t) === bare(message));
}
function Rail({ products, loading = false, ctaLabel, className }) {
  return /* @__PURE__ */ jsx("div", { className: className ? `gj2-rail ${className}` : "gj2-rail", children: products.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, loading, resolveDelayMs: i * 80, ctaLabel }, p.id)) });
}
function ProductCard({
  product: product2,
  added = false,
  lone = false,
  loading,
  resolveDelayMs = 0,
  adding = false,
  addingDelayMs = 0,
  ctaLabel = "Add"
}) {
  return /* @__PURE__ */ jsxs("article", { className: ["gj2-card", lone && "gj2-card--lone"].filter(Boolean).join(" "), "data-product-id": product2.id, "data-product-brand": product2.brand, children: [
    loading !== void 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        className: loading ? "gj2-skel" : "gj2-skel gj2-skel--hidden",
        style: { transitionDelay: loading ? "0ms" : `${resolveDelayMs}ms` },
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__media" }),
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__line gj2-skel__line--brand" }),
          /* @__PURE__ */ jsx("span", { className: "gj2-skel__line gj2-skel__line--name" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__tile", children: [
      product2.image && /* @__PURE__ */ jsx(ProductImage, { src: product2.image, alt: product2.title, style: product2.imageFit ? { objectFit: product2.imageFit } : void 0 }),
      product2.tag && /* @__PURE__ */ jsx("span", { className: "gj2-badge", children: product2.tag }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__expand", "aria-label": "Expand", children: /* @__PURE__ */ jsx(CornersOutGlyph, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__col", children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product2.brand }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__title", children: product2.title }),
      product2.subtitle && /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product2.subtitle }),
      product2.rating !== void 0 && /* @__PURE__ */ jsx(Stars, { value: product2.rating, count: product2.ratingCount ?? "" }),
      product2.price && /* @__PURE__ */ jsx("span", { className: "gj2-card__price", children: product2.price })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__actions", children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-puck", "aria-label": "Save for later", children: /* @__PURE__ */ jsx(HeartGlyph, {}) }),
      /* @__PURE__ */ jsx("span", { className: "gj2-puck", "aria-label": "Chat about this", children: /* @__PURE__ */ jsx(ChatDoorGlyph, {}) }),
      added && adding ? /* @__PURE__ */ jsxs("span", { className: "gj2-cta gj2-cta--lifecycle", style: { "--gj2-cta-delay": `${addingDelayMs}ms` }, children: [
        /* @__PURE__ */ jsx("span", { className: "gj2-cta__fill" }),
        /* @__PURE__ */ jsx("span", { className: "gj2-cta__phase gj2-cta__phase--adding", children: "Adding…" }),
        /* @__PURE__ */ jsxs("span", { className: "gj2-cta__phase gj2-cta__phase--done", children: [
          /* @__PURE__ */ jsx(CheckCircleGlyph, {}),
          "Added"
        ] })
      ] }) : added ? /* @__PURE__ */ jsxs("span", { className: "gj2-cta gj2-cta--done", children: [
        /* @__PURE__ */ jsx(CheckCircleGlyph, {}),
        "Added"
      ] }) : /* @__PURE__ */ jsxs("span", { className: "gj2-cta", children: [
        /* @__PURE__ */ jsx(PlusGlyph, { size: 18, trim: true }),
        ctaLabel
      ] })
    ] })
  ] });
}
function Stars({ value, count }) {
  return /* @__PURE__ */ jsxs("span", { className: "gj2-rating", children: [
    /* @__PURE__ */ jsxs("span", { className: "gj2-rating__stars", "aria-label": `${value} out of 5`, children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-rating__empty", children: "★★★★★" }),
      /* @__PURE__ */ jsx("span", { className: "gj2-rating__fill", style: { width: `${value / 5 * 100}%` }, children: "★★★★★" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "gj2-rating__count", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
function Puck({ label, children }) {
  return /* @__PURE__ */ jsx("span", { className: "gj2-head__puck", "aria-label": label, children });
}
const glyph = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function HistoryGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("polyline", { points: "128 80 128 128 168 152" }),
    /* @__PURE__ */ jsx("polyline", { points: "72 104 32 104 32 64" }),
    /* @__PURE__ */ jsx("path", { d: "M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" })
  ] });
}
function PlusGlyph({ size = 16, trim = false }) {
  const box = trim ? size * 192 / 256 : size;
  return /* @__PURE__ */ jsxs("svg", { ...glyph, viewBox: trim ? "32 32 192 192" : glyph.viewBox, width: box, height: box, children: [
    /* @__PURE__ */ jsx("line", { x1: "40", y1: "128", x2: "216", y2: "128" }),
    /* @__PURE__ */ jsx("line", { x1: "128", y1: "40", x2: "128", y2: "216" })
  ] });
}
function DotsGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: 16, height: 16, fill: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "128", cy: "128", r: "12" }),
    /* @__PURE__ */ jsx("circle", { cx: "196", cy: "128", r: "12" }),
    /* @__PURE__ */ jsx("circle", { cx: "60", cy: "128", r: "12" })
  ] });
}
function CloseGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "56", x2: "56", y2: "200" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "200", x2: "56", y2: "56" })
  ] });
}
function ArrowUpGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 16, height: 16, children: [
    /* @__PURE__ */ jsx("line", { x1: "128", y1: "216", x2: "128", y2: "40" }),
    /* @__PURE__ */ jsx("polyline", { points: "56 112 128 40 200 112" })
  ] });
}
function CornersOutGlyph() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph, width: 18, height: 18, children: [
    /* @__PURE__ */ jsx("polyline", { points: "168 48 208 48 208 88" }),
    /* @__PURE__ */ jsx("polyline", { points: "88 208 48 208 48 168" }),
    /* @__PURE__ */ jsx("polyline", { points: "208 168 208 208 168 208" }),
    /* @__PURE__ */ jsx("polyline", { points: "48 88 48 48 88 48" })
  ] });
}
function HeartGlyph() {
  return /* @__PURE__ */ jsx("svg", { ...glyph, width: 18, height: 18, children: /* @__PURE__ */ jsx("path", { d: "M128,216S24,160,24,94A54,54,0,0,1,128,73.19h0A54,54,0,0,1,232,94C232,160,128,216,128,216Z" }) });
}
function ChatDoorGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "2.5 3.758 25 25", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M15 7.5H8.5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1.5v3.5l4.5-3.5h5a3 3 0 0 0 3-3V15" }),
    /* @__PURE__ */ jsx("path", { d: "M21 5.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" })
  ] });
}
function CheckCircleGlyph() {
  const box = 18 * 208 / 256;
  return /* @__PURE__ */ jsx("svg", { viewBox: "24 24 208 208", width: box, height: box, fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" }) });
}
const turns = [
  { userMessage: turn1$2.userMessage, assistantMessage: turn1$2.assistantMessage, followups: turn1$2.followups, products: firstPicks },
  { userMessage: turn2$2.userMessage, assistantMessage: turn2$2.assistantMessage, followups: turn2$2.followups, products: pendants },
  { userMessage: turn3$2.userMessage, assistantMessage: turn3$2.assistantMessage, followups: turn3$2.followups, singleCard: addedPendant },
  { userMessage: turn4$2.userMessage, assistantMessage: turn4$2.assistantMessage, followups: turn4$2.followups, products: chains },
  { userMessage: turn5$1.userMessage, assistantMessage: turn5$1.assistantMessage, followups: turn5$1.followups, singleCard: addedChain }
];
const WAIT_FIRST = "Thinking…";
const WAIT_CARDS = "Fetching the product…";
const WORD_STAGGER_MS = REPLY_STAGGER_MS$6;
const SKELETON_HOLD_MS = PRODUCTS_SKELETON_HOLD_MS$1;
const FADE_CLEARANCE = 32;
function GiftJourneyV2Motion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [landing2, setLanding] = useState(0);
  useEffect(() => {
    if (landed) setLanding((n) => n + 1);
  }, [landed]);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: landing2 > 0 ? /* @__PURE__ */ jsx(Conversation$2, {}, landing2) : /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx("div", { className: "gj2-win" }) }) });
}
function Conversation$2({ sheet = false } = {}) {
  const { turnIndex, phase, composerValue, productsLoading, reducedMotion } = useConversationPlayback$2(turns);
  const transcriptRef = useRef(null);
  const userScrolledRef = useRef(false);
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    const mark = () => {
      userScrolledRef.current = true;
    };
    viewport.addEventListener("wheel", mark, { passive: true });
    viewport.addEventListener("touchmove", mark, { passive: true });
    return () => {
      viewport.removeEventListener("wheel", mark);
      viewport.removeEventListener("touchmove", mark);
    };
  }, []);
  useEffect(() => {
    userScrolledRef.current = false;
  }, [turnIndex]);
  useEffect(() => {
    if (userScrolledRef.current) return;
    const viewport = transcriptRef.current;
    const target = viewport?.lastElementChild;
    if (!viewport || !target) return;
    const viewportRect = viewport.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE) return;
    const top = viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
    if (reducedMotion) viewport.scrollTop = top;
    else animateScrollTo(viewport, top);
  }, [turnIndex, phase, productsLoading, reducedMotion]);
  const composing = turnIndex < turns.length && phase === "composing";
  const tapping = composing && Boolean(tappedChip(turns[turnIndex - 1]?.followups, turns[turnIndex]?.userMessage));
  const win = /* @__PURE__ */ jsxs("div", { className: sheet ? "gj2-win gjm-sheet" : "gj2-win", children: [
    sheet && /* @__PURE__ */ jsx("span", { className: "gjm-grab", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(ChatHead, {}),
    /* @__PURE__ */ jsx("div", { className: "gj2-transcript gj2-transcript--scroll", ref: transcriptRef, children: turns.map((turn, i) => {
      const isPast = i < turnIndex;
      const isSent = i === turnIndex && phase !== "composing";
      if (!isPast && !isSent) return null;
      const isCurrent = i === turnIndex;
      const thinking = isCurrent && (phase === "thinking" || phase === "thinkingExit");
      const showReply = isPast || isCurrent && !thinking;
      const showCards = isPast || isCurrent && (phase === "productsLoading" || phase === "pausing");
      const cardsLoading = isCurrent && phase === "productsLoading";
      const hasCards = Boolean(turn.products?.length || turn.singleCard);
      const animate = !reducedMotion;
      const showFollowups = isPast || isCurrent && phase === "pausing";
      return /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`, children: turn.userMessage }),
        thinking && /* @__PURE__ */ jsxs("div", { className: phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai", children: [
          /* @__PURE__ */ jsx("span", { className: "gj2-think__mark", children: /* @__PURE__ */ jsx(SparkGlyph, {}) }),
          /* @__PURE__ */ jsx("span", { className: "gj2-think__window", children: /* @__PURE__ */ jsx("span", { className: "gj2-think__line", children: hasCards ? WAIT_CARDS : WAIT_FIRST }) })
        ] }),
        showReply && /* @__PURE__ */ jsx(StreamedReply, { text: turn.assistantMessage, animate }),
        showCards && turn.products && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(Rail, { products: turn.products, loading: cardsLoading }) }),
        showCards && turn.singleCard && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(
          ProductCard,
          {
            product: turn.singleCard,
            added: true,
            lone: true,
            loading: cardsLoading,
            adding: animate,
            addingDelayMs: SKELETON_HOLD_MS
          }
        ) }),
        showFollowups && /* @__PURE__ */ jsx(
          Followups,
          {
            items: turn.followups,
            picked: turnIndex > i ? tappedChip(turn.followups, turns[i + 1]?.userMessage) : void 0,
            className: [animate && "gj2-followups--in", animate && tapping && turnIndex === i + 1 && "gj2-followups--tap"].filter(Boolean).join(" ") || void 0
          }
        )
      ] }, i);
    }) }),
    /* @__PURE__ */ jsx(ChatFoot, { value: composing && !tapping && composerValue ? composerValue : void 0 })
  ] });
  return sheet ? win : /* @__PURE__ */ jsx(SceneFrame, { children: win });
}
function StreamedReply({ text, animate }) {
  if (!animate) return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: text });
  const words2 = text.split(" ");
  return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: words2.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-word", style: { animationDelay: `${i * WORD_STAGGER_MS}ms` }, children: word }),
    i < words2.length - 1 && " "
  ] }, i)) });
}
function SparkGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5z" }) });
}
const THINKING_STAGE_1_MS$5 = 300;
const THINKING_STAGE_2_MS$5 = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS$5 = 150;
const CHAR_INTERVAL_MS$5 = 26;
const REPLY_STAGGER_MS$5 = 45;
const REPLY_WORD_ANIM_MS$5 = 220;
const REPLY_SETTLE_MS$5 = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;
function prefersReducedMotion$5() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount$1(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs$5(text) {
  return wordCount$1(text) * REPLY_STAGGER_MS$5 + REPLY_WORD_ANIM_MS$5 + REPLY_SETTLE_MS$5;
}
function useChatTimeline(beats2, active) {
  const reducedMotion = useRef(prefersReducedMotion$5()).current;
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
      cancelReveal?.();
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
            msPerStep: beat.msPerChar ?? CHAR_INTERVAL_MS$5,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(SENT_SETTLE_MS, next)
          });
        });
        break;
      }
      case "think": {
        let holdMs = THINKING_SINGLE_MS;
        if (beat.labels.length === 2) {
          after(THINKING_STAGE_1_MS$5, () => setThinkStage({ index, stage: 1 }));
          holdMs = THINKING_STAGE_1_MS$5 + THINKING_STAGE_2_MS$5;
        }
        after(holdMs, () => setExitingIndex(index));
        after(holdMs + THINKING_EXIT_MS$5, next);
        break;
      }
      case "text":
        after(replyRevealMs$5(beat.text), next);
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
      composer: current?.type === "compose" && current.text ? { value: typedValue, typing: true } : null,
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
const search$1 = "/images/landing/home-v2/assets/search-6aT0QOjO.svg";
const addressIcon = "/images/landing/home-v2/assets/address-QPOEXXur.svg";
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
  search: search$1,
  address: addressIcon,
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
  return /* @__PURE__ */ jsxs("div", { className: `hm-ill-browser-chrome hm-ill-browser-chrome--${field}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx(Icon, { name: field === "search" ? "search" : "address" }),
      /* @__PURE__ */ jsx("span", { children: url })
    ] })
  ] });
}
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
const defaultScenario$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  comparison,
  pdpState,
  searchState
}, Symbol.toStringTag, { value: "Module" }));
function ComparisonRow({
  label,
  valueA,
  valueB
}) {
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-comparison-row", children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-comparison-row__cell hm-ill-comparison-row__label", children: label }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-comparison-row__cell hm-ill-comparison-row__value-a", children: valueA }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-comparison-row__cell hm-ill-comparison-row__value-b", children: valueB })
  ] });
}
function SkeletonBlock({
  width,
  height,
  aspectRatio,
  radius
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "hm-ill-skeleton-block",
      style: {
        width,
        height,
        aspectRatio,
        borderRadius: radius
      }
    }
  );
}
function SkeletonCover({
  loading,
  radius = 0,
  className,
  shapes,
  inset = 0
}) {
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsx("div", { className: `hm-ill-sponsored__cover ${className}`, children: showOverlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `hm-sell-loading-frame__overlay${loading ? "" : " hm-sell-loading-frame__overlay--hidden"}`,
      style: { borderRadius: radius },
      children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: inset, right: inset, top: 0, bottom: 0 }, children: shapes.map((s, i) => /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: s.x,
            right: s.right,
            top: s.y,
            // a "100%" shape needs a sized wrapper to be 100% of
            width: typeof s.w === "string" ? s.w : void 0,
            height: typeof s.h === "string" ? s.h : void 0
          },
          children: /* @__PURE__ */ jsx(SkeletonBlock, { width: s.w, height: s.h, radius: s.r ?? 4 })
        },
        i
      )) })
    }
  ) });
}
const bag = "/images/landing/home-v2/assets/bag-B7O3GVmE.svg";
const heart = "/images/landing/home-v2/assets/heart-ozq9Thds.svg";
const insightMark = "/images/landing/home-v2/assets/insight-mark-Dd8J1nJH.svg";
const starFull = "/images/landing/home-v2/assets/star-full-Du_I1bJs.svg";
const starFullAlt = "/images/landing/home-v2/assets/star-full-b-Bl8WkEtW.svg";
const starPartial = "/images/landing/home-v2/assets/star-partial-CXJDJrC6.svg";
const frameTexture = "/images/landing/home-v2/assets/subtract-BWuQXYCQ.webp";
const frameOutline = "/images/landing/home-v2/assets/outline-DIDwLK1o.svg";
const frameDot = "/images/landing/home-v2/assets/ellipse-DuY5ZmjU.svg";
const SponsoredScenarioContext = createContext(defaultScenario$1);
SponsoredScenarioContext.Provider;
const useSponsoredScenario = () => useContext(SponsoredScenarioContext);
function PurpleFrame({ children, centered = true }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-frame-scale", children: /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored-frame", children: [
    /* @__PURE__ */ jsx("img", { className: "hm-ill-sponsored-frame__texture", src: frameTexture, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("img", { className: "hm-ill-sponsored-frame__outline", src: frameOutline, alt: "", "aria-hidden": "true" }),
    [
      { left: 18.52, top: 572.82 },
      { left: 1249.8, top: 572.82 },
      { left: 1249.8, top: 21.3 },
      { left: 20.79, top: 16.26 }
    ].map((dot) => /* @__PURE__ */ jsx("img", { className: "hm-ill-sponsored-frame__dot", style: dot, src: frameDot, alt: "", "aria-hidden": "true" }, `${dot.left}-${dot.top}`)),
    centered ? /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-frame__content", children }) : children
  ] }) });
}
const stars = [starFull, starFullAlt, starFull, starFullAlt, starPartial];
function SearchState({ className }) {
  const { searchState: searchState2, brandId } = useSponsoredScenario();
  return /* @__PURE__ */ jsxs("div", { className: ["hm-ill-sponsored hm-ill-sponsored--search", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored__search-chrome", children: /* @__PURE__ */ jsx(BrowserChrome, { url: searchState2.query, field: "search" }) }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__results", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__ad", children: [
        /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__ad-head", children: [
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__ad-brand", children: [
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__ad-logo", children: brandId ? /* @__PURE__ */ jsx(BrandMark, { brand: brandId }) : "H" }),
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__ad-label", children: searchState2.brand })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__ad-label", children: searchState2.sponsored })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "hm-ill-sponsored__ad-title", children: searchState2.title }),
        /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__bar hm-ill-sponsored__bar--ad-1" }),
        /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__bar hm-ill-sponsored__bar--ad-2" })
      ] }),
      /* @__PURE__ */ jsx(SkeletonResult, { nameWidth: 74, titleWidth: 188, lineWidth: 268 }),
      /* @__PURE__ */ jsx(SkeletonResult, { nameWidth: 58, titleWidth: 158, lineWidth: 243 })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored__fade", "aria-hidden": "true" })
  ] });
}
function SkeletonResult({ nameWidth, titleWidth, lineWidth }) {
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__result", children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__result-source", children: [
      /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__result-icon" }),
      /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__result-bar", style: { width: nameWidth } })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__result-title", style: { width: titleWidth } }),
    /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__result-bar", style: { width: lineWidth } })
  ] });
}
const galleryShapes = [{ x: 0, y: 0, w: "100%", h: "100%", r: 11.4 }];
const infoTitleShapes = [
  { x: 0, y: 6, w: 163.3, h: 16, r: 5 },
  { right: 126.9, y: 0.5, w: 28, h: 26.9, r: 14 },
  { right: 0, y: 0.5, w: 118.3, h: 28, r: 14 }
];
const infoPriceShapes = [
  { x: 0, y: 7.5, w: 50.9, h: 13, r: 4 },
  { x: 58.9, y: 7.5, w: 49.7, h: 13, r: 4 },
  { x: 116.5, y: 5, w: 48, h: 18, r: 9 },
  { right: 0, y: 6, w: 88, h: 16, r: 5 }
];
const comparisonShapes = [
  { x: 13.5, y: 33.5, w: 18.3, h: 17.2, r: 8 },
  { x: 36.1, y: 37, w: 213.7, h: 11, r: 4 },
  { x: 142.4, y: 81.3, w: 86.1, h: 8, r: 4 },
  { x: 281.4, y: 81.3, w: 80.8, h: 8, r: 4 },
  { x: 24.5, y: 123.4, w: 88.6, h: 8, r: 4 },
  { x: 155.4, y: 123.4, w: 24, h: 9, r: 4 },
  { x: 286.4, y: 123.4, w: 24, h: 9, r: 4 },
  { x: 24.5, y: 157.4, w: 66, h: 8, r: 4 },
  { x: 155.4, y: 157.4, w: 24, h: 9, r: 4 },
  { x: 286.4, y: 157.4, w: 24, h: 9, r: 4 },
  { x: 24.5, y: 191.4, w: 87.7, h: 8, r: 4 },
  { x: 155.4, y: 191.4, w: 24, h: 9, r: 4 },
  { x: 286.4, y: 191.4, w: 24, h: 9, r: 4 },
  { x: 24.5, y: 225.4, w: 68.9, h: 8, r: 4 },
  { x: 155.4, y: 225.4, w: 62, h: 9, r: 4 },
  { x: 286.4, y: 225.4, w: 77.6, h: 9, r: 4 },
  { x: 24.5, y: 259.4, w: 68.9, h: 8, r: 4 },
  { x: 155.4, y: 259.4, w: 62, h: 9, r: 4 },
  { x: 286.4, y: 259.4, w: 77.6, h: 9, r: 4 }
];
function PdpState({
  loading,
  className,
  comparisonSlot
}) {
  const { pdpState: pdpState2, comparison: comparison2, brandId, storeNameOnly } = useSponsoredScenario();
  return /* @__PURE__ */ jsxs("div", { className: ["hm-ill-sponsored hm-ill-sponsored--pdp", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored__pdp-chrome", children: /* @__PURE__ */ jsx(BrowserChrome, { url: pdpState2.url }) }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__store-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__store-name", children: brandId ? storeNameOnly ? /* @__PURE__ */ jsx(BrandName, { brand: brandId }) : /* @__PURE__ */ jsx(BrandWordmark, { brand: brandId }) : pdpState2.storeName }),
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__store-links", children: [
        /* @__PURE__ */ jsx("span", { style: { width: 44.09 } }),
        /* @__PURE__ */ jsx("span", { style: { width: 53.77 } }),
        /* @__PURE__ */ jsx("span", { style: { width: 37.64 } }),
        /* @__PURE__ */ jsx("span", { style: { width: 49.47 } })
      ] }),
      /* @__PURE__ */ jsx("img", { src: bag, alt: "", width: 20.432, height: 20.432 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__gallery", children: [
      /* @__PURE__ */ jsx(ProductImage, { src: pdpState2.image, alt: pdpState2.imageAlt }),
      loading && /* @__PURE__ */ jsx(SkeletonCover, { loading: loading.gallery, radius: 11.4, className: "hm-ill-sponsored__cover--gallery", shapes: galleryShapes })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__info", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__info-main", children: [
        /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__info-top", children: [
          /* @__PURE__ */ jsx("h2", { className: "hm-ill-sponsored__product-name", children: pdpState2.productName }),
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__actions", children: [
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__wishlist", children: /* @__PURE__ */ jsx("img", { src: heart, alt: "", width: 12.904, height: 12.904 }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "hm-ill-sponsored__cart", children: pdpState2.addToCart })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__info-meta", children: [
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__price-row", children: [
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__price", children: pdpState2.price }),
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__price hm-ill-sponsored__price--was", children: pdpState2.originalPrice }),
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__discount", children: pdpState2.discount })
          ] }),
          pdpState2.rating > 0 && /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored__stars", role: "img", "aria-label": `Rated ${pdpState2.rating} out of 5`, children: stars.map((src, i) => /* @__PURE__ */ jsx("img", { src, alt: "", width: 16.01, height: 16.01 }, i)) })
        ] })
      ] }),
      comparisonSlot ?? /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__comparison", children: [
        /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored__column-highlight", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__comparison-title", children: [
          /* @__PURE__ */ jsx("img", { src: insightMark, alt: "", width: 18.281, height: 17.206 }),
          /* @__PURE__ */ jsx("p", { children: comparison2.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__table", children: [
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored__table-head", children: [
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__table-head-gap" }),
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__table-head-a", children: comparison2.columnA }),
            /* @__PURE__ */ jsx("span", { className: "hm-ill-sponsored__table-head-b", children: comparison2.columnB })
          ] }),
          comparison2.rows.map((row, i) => /* @__PURE__ */ jsx(ComparisonRow, { label: row.label, valueA: row.valueA, valueB: row.valueB }, i))
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: [
              "hm-ill-sponsored__powered",
              loading && "hm-ill-sponsored__powered--cross",
              loading?.comparison && "hm-ill-sponsored__powered--pending"
            ].filter(Boolean).join(" "),
            children: [
              /* @__PURE__ */ jsx(Icon, { name: "spark", size: 9.678 }),
              /* @__PURE__ */ jsx("span", { children: comparison2.poweredBy }),
              /* @__PURE__ */ jsx("strong", { children: comparison2.poweredByBrand })
            ]
          }
        ),
        loading && /* @__PURE__ */ jsx(SkeletonCover, { loading: loading.comparison, radius: 8.073, className: "hm-ill-sponsored__cover--comparison", shapes: comparisonShapes })
      ] }),
      loading && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SkeletonCover, { loading: loading.title, radius: 4, className: "hm-ill-sponsored__cover--title", shapes: infoTitleShapes, inset: 25.825 }),
        /* @__PURE__ */ jsx(SkeletonCover, { loading: loading.price, radius: 4, className: "hm-ill-sponsored__cover--price", shapes: infoPriceShapes, inset: 25.825 })
      ] })
    ] })
  ] });
}
const baseBeats = [
  { id: "idle", type: "pause", ms: 300 },
  // The window's run (left edge 650ms, right edge trailing by 160ms, 730ms
  // in all). This beat ends while the right edge is still arriving: the
  // photo's slot resolves and the photo scales in then, so the photo is
  // already landing as the window finishes, not after it.
  { id: "open", type: "appear", ms: 480 },
  // The right side resolves in turn as the window settles, the comparison
  // module last.
  { id: "title", type: "load", ms: 250 },
  { id: "price", type: "load", ms: 200 },
  { id: "comparison", type: "load", ms: 300 }
];
function useAssetsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const photo = new Image();
    photo.src = pdpState.image;
    Promise.all([document.fonts?.ready, photo.decode().catch(() => void 0)]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}
function SponsoredComparisonMotion({
  comparison: comparison2,
  comparisonMs = 300
} = {}) {
  const beats2 = baseBeats.map((b) => b.id === "comparison" ? { ...b, ms: comparisonMs } : b);
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const assetsReady = useAssetsReady();
  const t = useChatTimeline(beats2, landed && assetsReady);
  const open = t.reached("open");
  const imageIn = t.passed("open");
  const sceneClass = [
    "hm-ill-sponsored-motion__scene",
    open && "hm-ill-sponsored-motion__scene--open",
    imageIn && "hm-ill-sponsored-motion__scene--image"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion", ref: rootRef, children: /* @__PURE__ */ jsx(PurpleFrame, { centered: false, children: /* @__PURE__ */ jsxs("div", { className: sceneClass, children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion__shell" }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion__content", children: /* @__PURE__ */ jsx(
      PdpState,
      {
        className: "hm-ill-sponsored-motion__pdp",
        loading: {
          gallery: !t.passed("open"),
          title: !t.passed("title"),
          price: !t.passed("price"),
          comparison: !t.passed("comparison")
        },
        comparisonSlot: comparison2?.(t)
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion__search", children: /* @__PURE__ */ jsx(SearchState, { className: "hm-ill-sponsored-motion__search-card" }) }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-sponsored-motion__chrome", children: [
      /* @__PURE__ */ jsx(BrowserChrome, { url: searchState.query, field: "search" }),
      /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion__chrome-address", children: /* @__PURE__ */ jsx(BrowserChrome, { url: pdpState.url }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-sponsored-motion__glow" })
  ] }) }) });
}
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
const COMPARISON_THINK_MS = 1600;
function SponsoredComparisonV2Motion() {
  return /* @__PURE__ */ jsx("div", { className: "sc2-motion", children: /* @__PURE__ */ jsx(
    SponsoredComparisonMotion,
    {
      comparisonMs: COMPARISON_THINK_MS,
      comparison: (t) => /* @__PURE__ */ jsx(ComparisonEmbed, { phase: t.passed("comparison") ? "in" : "thinking" })
    }
  ) });
}
const StorybookCardSkin = createContext(false);
const StorybookComposerDefault = createContext(false);
const goodwellSocialAd = "/images/landing/home-v2/assets/goodwell-social-ad-v1-DbWVCc2n.webp";
const igMore = "/images/landing/home-v2/assets/ig-more-DwYmQdK1.svg";
const igChevron = "/images/landing/home-v2/assets/ig-chevron-DsNho9PV.svg";
function Media({ src, alt }) {
  if (src) {
    return /* @__PURE__ */ jsx("img", { className: `hm-ill-media${cutoutSrcs.has(src) ? " hm-ill-media--cutout" : ""}`, src, alt });
  }
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-media hm-ill-media--placeholder", role: "img", "aria-label": alt });
}
const starFilled = "/images/landing/home-v2/assets/star-filled-H5Ymy-7D.svg";
const starEmpty = "/images/landing/home-v2/assets/star-empty-CaQMISUB.svg";
function Rating({ value, count }) {
  const filled = Math.round(value);
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-rating", children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-rating__stars", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx("img", { src: i < filled ? starFilled : starEmpty, alt: "", width: 9, height: 9 }, i)) }),
    /* @__PURE__ */ jsxs("span", { className: "hm-ill-rating__count", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
function Chip({
  children,
  kind = "label",
  size = "md",
  tone = "primary"
}) {
  const classes = [
    "hm-ill-chip",
    kind === "discount" && "hm-ill-chip--discount",
    kind === "action" && `hm-ill-chip--action hm-ill-chip--action-${tone}`,
    size === "sm" && "hm-ill-chip--sm"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("span", { className: classes, children });
}
function Button({ appearance, label, onClick, iconLeading, iconTrailing, className }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: ["hm-ill-button", `hm-ill-button--${appearance}`, className].filter(Boolean).join(" "), onClick, children: [
    iconLeading,
    label,
    iconTrailing
  ] });
}
function StaggerText({ text, boldText }) {
  const words2 = text.split(/\s+/).filter(Boolean);
  const boldWords = boldText ? boldText.split(/\s+/).filter(Boolean) : [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    words2.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("span", { className: "hm-ill-stagger-text__word", style: { animationDelay: `${i * 45}ms` }, children: word }),
      i < words2.length - 1 || boldWords.length ? " " : ""
    ] }, `plain-${i}`)),
    boldWords.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        "strong",
        {
          className: "hm-ill-stagger-text__word",
          style: { animationDelay: `${(words2.length + i) * 45}ms` },
          children: word
        }
      ),
      i < boldWords.length - 1 ? " " : ""
    ] }, `bold-${i}`))
  ] });
}
const asset = (name) => `/images/landing/home-v2/assets/${name}.webp`;
const sellDynamicProducts = {
  sleep60: catalog.goodwellSleep60.image,
  sleep28: catalog.goodwellSleep28.image,
  energy: catalog.goodwellEnergy.image,
  focus: catalog.goodwellFocus.image,
  calm: catalog.goodwellCalm.image,
  cream: catalog.sorelleCream.image,
  set: catalog.sorelleSet.image,
  aeroPaceTrail: asset("stride-aero-pace-trail"),
  tempoGlide: asset("stride-tempo-glide")
};
const driftDaily2 = "/images/landing/home-v2/assets/drift-daily-2-stone-CivZqN3P.webp";
const mayaAvatar = "/images/landing/home-v2/assets/avatar-maya-lLPCp7lN.webp";
const leoAvatar = "/images/landing/home-v2/assets/avatar-leo-ByAgXtts.webp";
const supportAgentPortrait = "/images/landing/home-v2/assets/avatar-sara-DY1GK0X7.webp";
const { aeroPaceTrail, tempoGlide } = sellDynamicProducts;
const prefGroups = [["returning", "size", "colour", "comfort", "previous"]];
const shoppers = [
  {
    id: "maya",
    initials: "MR",
    avatar: mayaAvatar,
    name: "Maya R.",
    summary: "Returning · 3 orders",
    tone: "strong",
    prefs: [
      { key: "returning", label: "Purchase history", value: "3 orders" },
      { key: "size", label: "Usual size", value: "UK 9" },
      { key: "colour", label: "Prefers", value: "Black" },
      { key: "comfort", label: "Shops for", value: "Comfort" }
    ],
    owned: { image: driftDaily2, title: "Drift Daily 2", note: "Owns the previous model" },
    pdp: {
      title: "Cushioning for your everyday runs",
      colour: "black",
      size: "9",
      compare: {
        title: "Upgrade from your previous pair",
        model: "Drift Daily 2",
        image: driftDaily2,
        stats: [
          { value: "18%", label: "softer" },
          { value: "24 g", label: "lighter" }
        ]
      },
      reviewTags: ["Comfort", "Fit"],
      reviews: [
        { text: "Softest pair I've run in. No break-in at all.", by: "Verified · UK 9", stars: 5 },
        { text: "True to size, same fit as the Drift Daily 2.", by: "Verified · UK 9", stars: 5 }
      ]
    }
  },
  {
    id: "leo",
    initials: "LK",
    avatar: leoAvatar,
    name: "Leo K.",
    summary: "Returning · 5 orders",
    tone: "aubergine",
    prefs: [
      { key: "returning", label: "Purchase history", value: "5 orders" },
      { key: "size", label: "Usual size", value: "UK 11" },
      { key: "colour", label: "Prefers", value: "Navy" },
      { key: "comfort", label: "Shops for", value: "Long runs" }
    ],
    owned: { image: aeroPaceTrail, title: "Aero Pace Trail", note: "Runs trail on weekends" },
    pdp: {
      title: "Built for your long road miles",
      colour: "navy",
      size: "11",
      compare: {
        title: "Your road pair for the week",
        model: "Aero Pace Trail",
        image: aeroPaceTrail,
        stats: [
          { value: "90 g", label: "lighter" },
          { value: "+6 mm", label: "cushion" }
        ]
      },
      reviewTags: ["Durability", "Long runs"],
      reviews: [
        { text: "400 km in and the foam still feels fresh.", by: "Verified · UK 11", stars: 5 },
        { text: "Comfortable past the half-marathon mark.", by: "Verified · UK 11", stars: 5 }
      ]
    }
  },
  {
    id: "sara",
    initials: "SP",
    avatar: supportAgentPortrait,
    name: "Sara P.",
    summary: "Returning · 2 orders",
    tone: "gold",
    prefs: [
      { key: "returning", label: "Purchase history", value: "2 orders" },
      { key: "size", label: "Usual size", value: "UK 6" },
      { key: "colour", label: "Prefers", value: "Burgundy" },
      { key: "comfort", label: "Shops for", value: "Speed" }
    ],
    owned: { image: tempoGlide, title: "Tempo Glide", note: "Race-day pair" },
    pdp: {
      title: "A lighter trainer for your faster days",
      colour: "burgundy",
      size: "6",
      compare: {
        title: "Pairs with your race-day shoe",
        model: "Tempo Glide",
        image: tempoGlide,
        stats: [
          { value: "+20%", label: "cushion" },
          { value: "Same", label: "fit" }
        ]
      },
      reviewTags: ["Lightweight", "Speed"],
      reviews: [
        { text: "Light enough for tempo runs, soft enough for easy days.", by: "Verified · UK 6", stars: 5 },
        { text: "Snappy toe-off. Fits like my Tempo Glide.", by: "Verified · UK 6", stars: 5 }
      ]
    }
  }
];
const GENERIC_HOLD_MS = 2200;
const INTRO_MS = 900;
const REVEAL_MS = 560;
const UPDATING_MS = 450;
const LANDING_MS = 700;
const SETTLED_PAUSE_MS = 600;
const READ_PAUSE_MS = 2400;
const CARD_EXIT_MS = 420;
const CARD_SETTLE_MS = 560;
const first = shoppers[0].id;
const initial = { state: 1, shopper: first, sources: {}, revealed: [], active: [], loading: [] };
function buildTimeline() {
  const steps2 = [
    { frame: () => initial, ms: GENERIC_HOLD_MS },
    { frame: (f) => ({ ...f, state: 2 }), ms: INTRO_MS }
  ];
  shoppers.forEach((s, i) => {
    for (const group of prefGroups) {
      steps2.push({ frame: (f) => ({ ...f, revealed: [...f.revealed, ...group], active: group }), ms: REVEAL_MS });
      steps2.push({ frame: (f) => ({ ...f, loading: group }), ms: UPDATING_MS });
      steps2.push({
        frame: (f) => ({ ...f, loading: [], sources: { ...f.sources, ...Object.fromEntries(group.map((k) => [k, s.id])) } }),
        ms: LANDING_MS
      });
      steps2.push({ frame: (f) => ({ ...f, active: [] }), ms: SETTLED_PAUSE_MS });
    }
    steps2.push({ frame: (f) => f, ms: READ_PAUSE_MS });
    const next = shoppers[i + 1];
    if (next) {
      steps2.push({ frame: (f) => ({ ...f, exiting: s.id, shopper: next.id, revealed: [] }), ms: CARD_EXIT_MS });
      steps2.push({ frame: (f) => ({ ...f, exiting: void 0 }), ms: CARD_SETTLE_MS });
    }
  });
  return steps2;
}
buildTimeline();
function ContentFade() {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-content-fade", "aria-hidden": "true" });
}
function IconButton({ icon, label, variant, onClick, className }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: ["hm-ill-icon-button", `hm-ill-icon-button--${variant}`, className].filter(Boolean).join(" "),
      "aria-label": label,
      onClick,
      children: /* @__PURE__ */ jsx("span", { className: icon === "send" || icon === "sendGold" ? "hm-ill-icon-button__glyph--rotated" : void 0, children: /* @__PURE__ */ jsx(Icon, { name: icon, size: variant === "accent" ? 20 : void 0 }) })
    }
  );
}
function ChatHeader({
  brand: brand2,
  showHistory = true,
  showAdd = true,
  showExpand = true,
  showClose = true,
  onClose
}) {
  const showControlsLeft = showHistory || showAdd;
  const registered = Object.values(registry).some((entry) => entry.name.toLowerCase() === brand2.toLowerCase());
  return /* @__PURE__ */ jsxs("header", { className: "hm-ill-chat-header", children: [
    showControlsLeft && /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-header__group", children: [
      showHistory && /* @__PURE__ */ jsx(IconButton, { icon: "history", label: "History", variant: "outline" }),
      showAdd && /* @__PURE__ */ jsx(IconButton, { icon: "add", label: "New conversation", variant: "outline" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-chat-header__brand", children: registered ? /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2 }) : brand2 }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-header__group", children: [
      showExpand && /* @__PURE__ */ jsx(IconButton, { icon: "expand", label: "Expand", variant: "outline" }),
      showClose && /* @__PURE__ */ jsx(IconButton, { icon: "close", label: "Close", variant: "outline", onClick: onClose })
    ] })
  ] });
}
function ChatComposer({
  value = "Ask anything...",
  typing = false,
  variant = "default",
  visible = true,
  sending = false
}) {
  if (variant === "expanded") {
    return /* @__PURE__ */ jsxs("div", { className: `hm-ill-chat-composer--expanded${visible ? "" : " hm-ill-chat-composer--expanded--hidden"}`, children: [
      /* @__PURE__ */ jsxs("p", { className: "hm-ill-chat-composer--expanded__text", children: [
        value,
        typing && /* @__PURE__ */ jsx("span", { className: "hm-ill-chat-composer__caret" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-composer--expanded__row", children: [
        /* @__PURE__ */ jsxs("span", { className: "hm-ill-chat-composer--expanded__upload", children: [
          /* @__PURE__ */ jsx(Icon, { name: "addMuted", size: 18 }),
          "Upload file"
        ] }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            icon: "sendGold",
            label: "Send",
            variant: "accent",
            className: sending ? "hm-ill-icon-button--pressed" : void 0
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-composer", children: [
    /* @__PURE__ */ jsx("span", { className: `hm-ill-chat-composer__text${typing ? " hm-ill-chat-composer__text--typing" : ""}`, children: typing ? /* @__PURE__ */ jsxs("span", { className: "hm-ill-chat-composer__line", children: [
      value,
      /* @__PURE__ */ jsx("span", { className: "hm-ill-chat-composer__caret" })
    ] }) : value }),
    /* @__PURE__ */ jsx(IconButton, { icon: "send", label: "Send", variant: "accent" })
  ] });
}
const ConversationViewport = forwardRef(
  function ConversationViewport2({ children }, ref) {
    return /* @__PURE__ */ jsxs("div", { className: "hm-ill-conversation-viewport", children: [
      /* @__PURE__ */ jsx("div", { className: "hm-ill-conversation-viewport__content", ref, children }),
      /* @__PURE__ */ jsx(ContentFade, {})
    ] });
  }
);
function Shell({
  brand: brand2,
  children,
  width,
  height,
  composerValue,
  composerTyping,
  viewportRef,
  rootRef,
  header,
  composer,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: ["hm-ill-shell", className].filter(Boolean).join(" "),
      style: width && height ? { width, height } : void 0,
      ref: rootRef,
      children: [
        header ?? /* @__PURE__ */ jsx(ChatHeader, { brand: brand2 }),
        /* @__PURE__ */ jsx(ConversationViewport, { ref: viewportRef, children }),
        composer ?? /* @__PURE__ */ jsx(ChatComposer, { value: composerValue, typing: composerTyping })
      ]
    }
  );
}
function ProductCollection({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-product-collection", children });
}
function ProductMeta({
  brand: brand2,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  density = "card"
}) {
  if (density === "pdp") {
    return /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-meta hm-ill-product-meta--pdp", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-meta__pdp-top", children: [
        brand2 && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__brand-pdp", children: brand2 }),
        /* @__PURE__ */ jsx(Icon, { name: "caretDown" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__title-pdp", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__subtitle", children: subtitle }),
      rating !== void 0 && ratingCount && /* @__PURE__ */ jsx(Rating, { value: rating, count: ratingCount }),
      price && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__price-pdp", children: price })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-meta", children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-meta__row", children: [
      brand2 && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__brand", children: brand2 }),
      price && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__price", children: price })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "hm-ill-product-meta__title", children: title }),
    rating !== void 0 && ratingCount && /* @__PURE__ */ jsx(Rating, { value: rating, count: ratingCount })
  ] });
}
function useLineCount(root, selector, max = Infinity) {
  const [lines, setLines] = useState(1);
  useLayoutEffect(() => {
    const el = root.current?.querySelector(selector);
    if (!el) return;
    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
      setLines(Math.min(Math.max(tops.size, 1), max));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, selector, max]);
  return lines;
}
function CommerceProductCard({
  product: product2,
  added = false,
  loading = false,
  resolveDelayMs
}) {
  const cardRef = useRef(null);
  const titleLines = useLineCount(cardRef, ".hm-ill-product-meta__title", 2);
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("article", { className: "hm-ill-commerce-card", ref: cardRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__content", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__media", children: [
        /* @__PURE__ */ jsx(Media, { src: product2.image, alt: product2.title }),
        product2.tag && /* @__PURE__ */ jsx("span", { className: "hm-ill-commerce-card__tag", children: product2.tag })
      ] }),
      /* @__PURE__ */ jsx(
        ProductMeta,
        {
          brand: product2.brand,
          title: product2.title,
          price: product2.price,
          rating: product2.rating,
          ratingCount: product2.ratingCount
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", className: "hm-ill-commerce-card__cta", disabled: added, children: added ? "Added to cart" : "Add to cart" }),
    showOverlay && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `hm-ill-commerce-card__skeleton-overlay${loading ? "" : " hm-ill-commerce-card__skeleton-overlay--hidden"}`,
        style: resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : void 0,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__content", children: [
            /* @__PURE__ */ jsx(SkeletonBlock, { aspectRatio: "257 / 147.758", radius: 16 }),
            /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__meta-skeleton", children: [
              /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__meta-skeleton-row hm-ill-commerce-card__meta-skeleton-row--split", children: [
                /* @__PURE__ */ jsx(SkeletonBlock, { width: 40, height: 9, radius: 4 }),
                /* @__PURE__ */ jsx(SkeletonBlock, { width: 20, height: 9, radius: 4 })
              ] }),
              /* @__PURE__ */ jsx("div", { children: Array.from({ length: titleLines }, (_, i) => /* @__PURE__ */ jsx("div", { className: "hm-ill-commerce-card__meta-skeleton-row", children: /* @__PURE__ */ jsx(SkeletonBlock, { width: i === titleLines - 1 ? "65%" : "100%", height: 10, radius: 4 }) }, i)) }),
              /* @__PURE__ */ jsxs("div", { className: "hm-ill-commerce-card__meta-skeleton-row hm-ill-commerce-card__meta-skeleton-row--rating", children: [
                /* @__PURE__ */ jsx(SkeletonBlock, { width: 49, height: 9, radius: 4 }),
                /* @__PURE__ */ jsx(SkeletonBlock, { width: 23, height: 9, radius: 4 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hm-ill-commerce-card__cta-skeleton", children: /* @__PURE__ */ jsx(SkeletonBlock, { height: 30, radius: 112.792 }) })
        ]
      }
    )
  ] });
}
function ChatMessage({ role, text, children }) {
  if (role === "user") {
    return /* @__PURE__ */ jsx("div", { className: "hm-ill-chat-message hm-ill-chat-message--user", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-chat-message hm-ill-chat-message--assistant", children: /* @__PURE__ */ jsx("p", { children: children ?? text }) });
}
function UserTurn({
  children,
  animateIn = false,
  className
}) {
  const classes = ["hm-ill-user-turn", animateIn && "hm-ill-user-turn--enter", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes, children });
}
function AssistantTurn({
  children,
  animateIn = false,
  className
}) {
  const classes = ["hm-ill-assistant-turn", animateIn && "hm-ill-assistant-turn--enter", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes, children });
}
function AiPills({ options, selectedId }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-ai-pills", children: options.map((option) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: option.id === selectedId ? "hm-ill-ai-pill hm-ill-ai-pill--selected" : "hm-ill-ai-pill",
      children: [
        /* @__PURE__ */ jsx(Icon, { name: "insight", size: 16 }),
        /* @__PURE__ */ jsx("span", { children: option.text })
      ]
    },
    option.id
  )) });
}
function RecommendationProductCard({
  product: product2,
  loading = false,
  resolveDelayMs,
  cta = false,
  ctaAppearance = "accent"
}) {
  const cardRef = useRef(null);
  const titleLines = useLineCount(cardRef, ".hm-ill-rec-card__title");
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("article", { className: `hm-ill-rec-card${cta ? " hm-ill-rec-card--cta" : ""}`, ref: cardRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-rec-card__media", children: [
      /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__media-bleed", children: /* @__PURE__ */ jsx(Media, { src: product2.image, alt: product2.name }) }),
      /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__favorite", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: "favorite" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__text", children: product2.brand || product2.price ? /* @__PURE__ */ jsx(ProductMeta, { brand: product2.brand, title: product2.name, price: product2.price }) : /* @__PURE__ */ jsx("p", { className: "hm-ill-rec-card__title", children: product2.name }) }),
    cta && /* @__PURE__ */ jsx(Button, { appearance: ctaAppearance, label: "Add to cart" }),
    showOverlay && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `hm-ill-rec-card__skeleton-overlay${loading ? "" : " hm-ill-rec-card__skeleton-overlay--hidden"}`,
        style: resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : void 0,
        children: [
          /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__media", children: /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: "100%", radius: 16 }) }),
          /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__text-skeleton", children: Array.from({ length: titleLines }, (_, i) => /* @__PURE__ */ jsx("div", { className: "hm-ill-rec-card__text-skeleton-line", children: /* @__PURE__ */ jsx(SkeletonBlock, { width: i === titleLines - 1 ? "60%" : "100%", height: 11, radius: 4 }) }, i)) }),
          cta && /* @__PURE__ */ jsx(SkeletonBlock, { height: 30, radius: 112.792 })
        ]
      }
    )
  ] });
}
function StoreNavItems() {
  return /* @__PURE__ */ jsxs("div", { className: "store-nav-items", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {})
  ] });
}
const sleepThreeQuarter = "/images/landing/home-v2/assets/goodwell-sleep-three-quarter-CwUI_ana.webp";
const sleepElevated = "/images/landing/home-v2/assets/goodwell-sleep-elevated-T1ADQ_Ns.webp";
const brand$4 = "Goodwell";
const domain$2 = "goodwell.com";
const page$1 = {
  headline: "Feel good, one gummy at a time.",
  sub: "Functional gummies for sleep, energy and focus.",
  shop: "Shop gummies"
};
const gummies = {
  sleep60: { ...catalog.goodwellSleep60, image: catalog.goodwellSleep60.image, name: "Daily Sleep Gummies", variant: "60 Count", price: "$29.99", rating: 4.8, reviews: "2,140" },
  sleep28: { ...catalog.goodwellSleep28, image: catalog.goodwellSleep28.image, name: "Daily Sleep Gummies", variant: "28 Count", price: "$17.99", rating: 4.7, reviews: "860" },
  energy: { ...catalog.goodwellEnergy, image: catalog.goodwellEnergy.image, name: "Clean Energy Gummies", variant: "60 Count", price: "$27.99", rating: 4.6, reviews: "1,310" },
  focus: { ...catalog.goodwellFocus, image: catalog.goodwellFocus.image, name: "Daily Focus Gummies", variant: "60 Count", price: "$27.99", rating: 4.7, reviews: "980" },
  calm: { ...catalog.goodwellCalm, image: catalog.goodwellCalm.image, name: "Calm Mood Gummies", variant: "60 Count", price: "$26.99", rating: 4.5, reviews: "720" },
  immunity: { ...catalog.goodwellImmunity, image: catalog.goodwellImmunity.image, name: "Immunity Gummies", variant: "60 Count", price: "$24.99", rating: 4.6, reviews: "1,050" }
};
const shelf = [gummies.sleep60, gummies.energy, gummies.focus, gummies.calm];
const search = {
  placeholder: "Search products or ask anything",
  askLabel: "Ask AI",
  suggestions: [
    { id: "sleep", text: "Something to help me sleep better" },
    { id: "energy", image: sellDynamicProducts.energy, text: "Energy without caffeine" },
    { id: "focus", image: sellDynamicProducts.focus, text: "Gummies for daily focus" }
  ],
  selected: "sleep",
  recentLabel: "Recent searches",
  recent: [gummies.immunity, gummies.focus, gummies.calm]
};
const results = {
  query: "Something to help me sleep better",
  answer: "For better sleep and easier mornings, I'd recommend our Daily Sleep Gummies, made with magnesium and calming botanicals.",
  picks: [gummies.sleep60, gummies.sleep28],
  moreLabel: "Explore more wellness gummies",
  more: [gummies.calm, gummies.focus, gummies.energy, gummies.immunity],
  composer: "Refine your search…",
  followUps: [
    { id: "no-melatonin", text: "No melatonin" },
    { id: "compare", text: "Compare these" },
    { id: "under-25", text: "Under $25" }
  ]
};
const pdp = {
  product: gummies.sleep60,
  gallery: [
    { src: catalog.goodwellSleep60.image, alt: "Goodwell Daily Sleep Gummies, 60 count — front view" },
    { src: sleepThreeQuarter, alt: "Goodwell Daily Sleep Gummies — three-quarter view" },
    { src: sleepElevated, alt: "Goodwell Daily Sleep Gummies — elevated lid view" },
    { src: goodwellSocialAd, alt: "Daily Sleep with Calm Mood and Daily Focus in the Goodwell campaign" }
  ],
  blurb: "Magnesium and calming botanicals to help you wind down and wake up easier.",
  variants: [gummies.sleep60, gummies.sleep28],
  askLabel: "Ask AI about this product",
  suggestions: [
    { id: "why", text: "Why did you recommend this?" },
    { id: "melatonin", text: "Does it contain melatonin?" },
    { id: "compare", text: "Compare with 28 Count" }
  ],
  backLabel: "Back to AI search"
};
function ProductVisual({ product: product2, className }) {
  return /* @__PURE__ */ jsx("div", { className: ["ais-product-visual", className].filter(Boolean).join(" "), children: /* @__PURE__ */ jsx(ProductImage, { src: product2.image, alt: `${product2.name}, ${product2.variant}` }) });
}
function Nav({ searching }) {
  return /* @__PURE__ */ jsxs("header", { className: "hm-ill-chat-header ais-nav", children: [
    /* @__PURE__ */ jsx("span", { className: "ais-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brand$4 }) }),
    /* @__PURE__ */ jsx(StoreNavItems, {}),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-header__group", children: [
      /* @__PURE__ */ jsxs("span", { className: "ais-nav__ask", children: [
        /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
        "Ask AI"
      ] }),
      /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline", className: searching ? "ais-nav__search--active" : void 0 }),
      /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
    ] })
  ] });
}
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "ais-home", children: [
    /* @__PURE__ */ jsxs("div", { className: "ais-hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "ais-hero__copy", children: [
        /* @__PURE__ */ jsx("h2", { children: page$1.headline }),
        /* @__PURE__ */ jsx("p", { children: page$1.sub }),
        /* @__PURE__ */ jsx("span", { className: "ais-btn", children: page$1.shop })
      ] }),
      /* @__PURE__ */ jsx(ProductVisual, { product: pdp.product, className: "ais-hero__img" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ais-shelf", children: [
      "Best sellers ",
      /* @__PURE__ */ jsx("span", { children: "View all" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ais-grid", children: shelf.map((g) => /* @__PURE__ */ jsx(ProductVisual, { product: g, className: "ais-card" }, g.id)) })
  ] });
}
function SearchDropdown({ picked }) {
  const query = search.suggestions.find((s) => s.id === search.selected).text;
  return /* @__PURE__ */ jsxs("div", { className: "ais-dropdown", children: [
    /* @__PURE__ */ jsxs("div", { className: "ais-field", children: [
      /* @__PURE__ */ jsx(Icon, { name: "search", size: 14 }),
      picked ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "ais-field__value", children: query }),
        /* @__PURE__ */ jsx("span", { className: "ais-field__caret ais-field__caret--after" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "ais-field__caret" }),
        /* @__PURE__ */ jsx("span", { children: search.placeholder })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "ais-dropdown__section", children: [
      /* @__PURE__ */ jsxs("p", { className: "ais-label", children: [
        /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
        search.askLabel
      ] }),
      /* @__PURE__ */ jsx(AiPills, { options: search.suggestions, selectedId: picked ? search.selected : "" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "ais-dropdown__section", children: [
      /* @__PURE__ */ jsx("p", { className: "ais-label", children: search.recentLabel }),
      /* @__PURE__ */ jsx("ul", { className: "ais-recent", children: search.recent.map((g) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx(ProductVisual, { product: g, className: "ais-recent__thumb" }),
        /* @__PURE__ */ jsxs("span", { children: [
          g.name,
          " ",
          g.variant,
          /* @__PURE__ */ jsx("small", { children: g.price })
        ] })
      ] }, g.id)) })
    ] })
  ] });
}
function toCard(g) {
  return { id: g.id, image: g.image, title: `${g.name} ${g.variant}`, price: g.price, rating: g.rating, ratingCount: g.reviews };
}
function Pdp() {
  const p = pdp.product;
  return /* @__PURE__ */ jsxs("div", { className: "ais-pdp", children: [
    /* @__PURE__ */ jsxs("div", { className: "ais-context", children: [
      /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
      /* @__PURE__ */ jsxs("span", { className: "ais-context__query", children: [
        "“",
        results.query,
        "”"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ais-context__back", children: pdp.backLabel })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ais-pdp__grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "ais-gallery ais-gallery--views", children: [
        /* @__PURE__ */ jsx("div", { className: "ais-gallery__thumbs", children: pdp.gallery.map((view, i) => /* @__PURE__ */ jsx("div", { className: `ais-product-visual ais-gallery__thumb${i === 0 ? " ais-gallery__thumb--active" : ""}`, children: /* @__PURE__ */ jsx(ProductImage, { src: view.src, alt: view.alt }) }, view.src)) }),
        /* @__PURE__ */ jsx(ProductVisual, { product: p, className: "ais-gallery__main" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ais-details", children: [
        /* @__PURE__ */ jsxs("div", { className: "ais-details__head", children: [
          /* @__PURE__ */ jsx("h2", { children: p.name }),
          /* @__PURE__ */ jsxs("div", { className: "ais-details__meta", children: [
            /* @__PURE__ */ jsx("span", { className: "ais-details__price", children: p.price }),
            /* @__PURE__ */ jsx(Rating, { value: p.rating, count: p.reviews })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "ais-details__blurb", children: pdp.blurb }),
        /* @__PURE__ */ jsx("p", { className: "ais-label", children: "Size" }),
        /* @__PURE__ */ jsx("div", { className: "ais-variants", children: pdp.variants.map((v) => /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: v.variant, className: v.id === p.id ? "ais-variant--selected" : "ais-variant" }, v.id)) }),
        /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to cart", className: "ais-details__cta" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ais-ask", children: [
        /* @__PURE__ */ jsxs("p", { className: "ais-label", children: [
          /* @__PURE__ */ jsx(Icon, { name: "spark", size: 10 }),
          pdp.askLabel
        ] }),
        /* @__PURE__ */ jsx(AiPills, { options: pdp.suggestions, selectedId: "" })
      ] })
    ] })
  ] });
}
[
  { id: "price", label: "Price", values: [catalog.goodwellSleep60.price, catalog.moonrestSleep.price] },
  { id: "gummies", label: "Gummies", values: ["60", "50"] },
  { id: "servings", label: "Servings", values: ["30", "25"] },
  { id: "per-serving", label: "Per serving", values: ["$1.00", "$0.80"] },
  { id: "melatonin", label: "Melatonin", values: ["Melatonin‑free", "Contains melatonin"], highlight: true },
  { id: "ingredients", label: "Ingredients", values: ["L-Theanine, Chamomile", "Melatonin, Chamomile"] }
];
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}
function useFollowLatest(scrollerRef, {
  thread,
  pin,
  focus,
  clearance = 0,
  pinOffset = 0,
  index,
  reducedMotion
}) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    const threadEl = scroller?.querySelector(thread);
    if (!scroller || !threadEl) return;
    let cancelScroll;
    const follow = () => {
      const box = scroller.getBoundingClientRect();
      const scale = scroller.offsetHeight ? box.height / scroller.offsetHeight : 1;
      const toContent = (y) => (y - box.top) / scale + scroller.scrollTop;
      let target = Math.max(0, toContent(threadEl.getBoundingClientRect().bottom) - scroller.clientHeight + clearance);
      const pins = pin ? threadEl.querySelectorAll(pin) : null;
      const pinned = pins?.[pins.length - 1];
      const pinTop = pinned ? Math.max(0, toContent(pinned.getBoundingClientRect().top) - pinOffset) : 0;
      target = Math.max(target, pinTop);
      const turns2 = [...threadEl.children].map((child) => {
        const r = child.getBoundingClientRect();
        return { top: toContent(r.top), bottom: toContent(r.bottom) };
      });
      const nearTop = turns2.find((turn) => target > turn.top && target - turn.top <= clearance);
      if (nearTop) target = nearTop.top;
      const focused = focus ? threadEl.querySelector(focus) : null;
      if (focused) target = Math.max(0, toContent(focused.getBoundingClientRect().top) - 8);
      const cut = turns2.some((turn) => turn.top < target - 1 && turn.bottom > target + 1);
      if (scroller.parentElement) scroller.parentElement.dataset.scrolled = String(cut);
      if (Math.abs(target - scroller.scrollTop) < 1) return;
      cancelScroll?.();
      if (reducedMotion) scroller.scrollTop = target;
      else cancelScroll = animateScrollTo(scroller, target);
    };
    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(threadEl);
    return () => {
      observer.disconnect();
      cancelScroll?.();
    };
  }, [scrollerRef, thread, pin, focus, clearance, pinOffset, index, reducedMotion]);
}
function cx(...names) {
  return names.filter(Boolean).join(" ");
}
({
  name: catalog.goodwellSleep60.title,
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price
});
({
  name: catalog.goodwellSleep60.title,
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price
});
const handWaveUrl = "/images/landing/home-v2/assets/hand-wave-DV6aLLq6.webp";
const BUZZ_NOTE_CSS = `
/* The notification: seated a turn (16px) above the resting bar,
   arriving the way the study draws it — a POP from nothing, growing
   through 105%, easing back through 95% and seating at full, all
   about its own centre. The dismissal SINKS — down past the bar and
   off the floor of the screen, fading as it goes — and a finger can
   drag it the same way. Enter and exit are SEPARATE animations —
   is-out replaces the property, so the finished fill-both pop never
   holds the transform against the leave. */
.wm-bar-buzz-note {
  position: fixed;
  bottom: calc(1.5rem + var(--wm-bar-height, 56px) + 1rem);
  left: 50%;
  /* A settled seat: 360px even, phones excepted — long copy ellipsises
     inside it rather than growing the card. */
  width: min(22.5rem, calc(100vw - 2rem));
  z-index: 30;
  /* A snug (8px) inset on every side; the right adds the close's box
     (1.75rem) plus a step (12px) of air before the words — the words
     keep the same distance from the close as they do from the bell. */
  padding: var(--wm-space-snug, 0.5rem);
  padding-right: calc(
    var(--wm-space-snug, 0.5rem) + 1.75rem + var(--wm-space-step, 0.75rem)
  );
  border-radius: var(--wm-radius-pill, 62.5rem);
  /* The nudge's own ground — the store speaking first — not a white
     card of its own: the wash says whose knock this is. */
  background: var(--wm-surface-nudge, #eef4f0);
  /* The bar's own cast rather than a plate's: the notification floats
     over the page the way the capsule does, and a card's 6% pool read
     as printed on it. */
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar, 0 6px 16px rgba(18, 23, 20, 0.1), 0 18px 30px -6px rgba(18, 23, 20, 0.18));
  transform: translate(-50%, 0);
  animation: wm-buzz-in 883ms cubic-bezier(0.33, 0, 0.67, 1) both;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  /* The card owns its touches — a downward swipe is a dismissal, not
     a scroll. */
  touch-action: none;
}
/* Under the finger the card follows LIVE — the spring-back transition
   waits until the finger lets go. */
.wm-bar-buzz-note.is-dragging {
  transition: none;
}
/* Landed, the arrival lets go — the finished fill-both fall would
   otherwise hold the transform against a later drag. A clock marks
   it, never animationend. */
.wm-bar-buzz-note.is-landed {
  animation: none;
}
/* A hand on the card deepens its cast a little (dictated: no lift,
   anywhere) — the card stands still and settles harder onto the page. */
.wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar-hover, 0 8px 20px rgba(18, 23, 20, 0.12), 0 22px 36px -6px rgba(18, 23, 20, 0.22));
}
/* Ignored for five seconds, the card BUZZES — the study's shiver: a
   ±1° turn of the whole pill at four-frame steps, done in half a
   second. The class comes and goes on clocks; its fill releases with
   it, so the hover above gets the transform back the moment the
   shiver ends. */
.wm-bar-buzz-note.is-buzzing {
  animation: wm-buzz-shake 483ms cubic-bezier(0.33, 0, 0.67, 1) both;
}
@keyframes wm-buzz-shake {
  0%,
  100% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  17.2%,
  44.8%,
  72.4% {
    transform: translate(-50%, 0) rotate(1deg);
  }
  31%,
  58.6%,
  86.2% {
    transform: translate(-50%, 0) rotate(-1deg);
  }
}
/* The study's pop, frame for frame: ten frames of nothing, the
   overshoot at 24, the under-swing at 39, seated at 53. */
@keyframes wm-buzz-in {
  0%,
  18.9% {
    transform: translate(-50%, 0) scale(0);
  }
  45.3% {
    transform: translate(-50%, 0) scale(1.05);
  }
  73% {
    transform: translate(-50%, 0) scale(0.95);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
.wm-bar-buzz-note.is-out {
  animation: wm-buzz-out 333ms cubic-bezier(0.55, 0, 1, 0.45) both;
  /* The shrink gathers toward the card's FOOT — the edge meeting the
     bar — so the narrowing reads as the bar taking it in. */
  transform-origin: 50% 100%;
}
/* The sink: from wherever the card stands — its seat, or the finger's
   last held offset (--wm-buzz-y) — down BEHIND the bar: the card drops
   a step in z (below) and ends centred on the bar's own line, the bar
   swallowing it. The card is WIDER than the bar, so it also shrinks as
   it goes — by the time it reaches the bar's line its overhang has
   pulled in and no ears poke past the capsule; the fade only finishes
   what the bar's edges leave. */
@keyframes wm-buzz-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px)) scale(1);
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  to {
    transform: translate(
        -50%,
        max(calc(50% + (var(--wm-bar-height, 56px) / 2) + 1rem), var(--wm-buzz-y, 0px))
      )
      scale(0.4, 0.7);
    opacity: 0;
  }
}
/* Behind, not over: a dragged or leaving card gives up its raised z
   and falls back on tree order — after the backdrop, before the bar —
   so the acrylic capsule paints over it and swallows the sink. */
.wm-bar-buzz-note.is-dragging,
.wm-bar-buzz-note.is-out {
  z-index: auto;
}
/* One line of furniture: the bell leads, the header speaks, the tease
   whispers under it — a notification row, not a stack. */
.wm-bar-buzz-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* The whole card is the door to the thread it teases. */
  cursor: pointer;
}
/* The white disc, holding the greeting — the study's hand, said with
   the platform's own emoji: no bell, no count; the wave is the news. */
.wm-bar-buzz-note__bell {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-primary, #004c27);
}
/* The greeting, exactly as the "Hand wave final" study plays it
   (60fps, 121 frames, a second after the knock lands): the study's
   own hand, standing at ONE size the whole time — no growing, no
   shrinking — waving ±30° about the study's null, a swing every 20
   frames: 0 → +30 → −30 → +30 → −30 → 0 across 100. */
.wm-bar-buzz-note__hand {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* A stage's own mark in the disc — the cart's filled glyph — drawn at
   the hand's own visual size, in the disc's primary ink. */
.wm-bar-buzz-note__glyph {
  width: 1.375rem;
  height: 1.375rem;
}
/* A PRODUCT in the disc — the photograph takes the whole circle, the
   white ground and the mark both standing down; the disc's hairline
   stays on as the photo's frame. */
.wm-bar-buzz-note__product {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
/* The study's hand PNG and its motion-mark strokes share one
   300-unit square, drawn at one 4.75rem seat and both centred on the
   disc — so the marks land exactly where the study put them, and the
   drawn hand (112 of the 300 units) fills the disc the way an icon
   would. The wave turns about the study's own null — (181.8, 185) of
   300, the wrist. */
.wm-bar-buzz-note__hand-img,
.wm-bar-buzz-note__hand-lines {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3.75rem;
  height: 3.75rem;
  max-width: none;
  margin: -1.875rem;
}
.wm-bar-buzz-note__hand-img {
  transform-origin: 60.6% 61.7%;
  animation: wm-buzz-wave 1667ms cubic-bezier(0.33, 0, 0.67, 1) var(--wm-buzz-wave-delay, 1000ms)
    both;
}
@keyframes wm-buzz-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60% {
    transform: rotate(30deg);
  }
  40%,
  80% {
    transform: rotate(-30deg);
  }
}
/* The study's motion marks: four swoosh strokes that flash beside
   the hand as it swings — the lower-left pair first and again
   mid-wave, the upper pair between and at the end — each drawing in
   from its head and erasing off its tail, the trim-path figure said
   in dash-offset (each path's own length normalised to 100). The
   snap from erased (−100) back to unstruck (100) happens while the
   stroke is invisible. */
.wm-bar-buzz-note__hand-lines {
  fill: none;
  stroke: var(--wm-nudge-wave-ink, #975500);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
}
.wm-bar-buzz-note__hand-lines path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
.wm-bar-buzz-note__hand-lines .is-low {
  animation: wm-buzz-swoosh-low 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
.wm-bar-buzz-note__hand-lines .is-high {
  animation: wm-buzz-swoosh-high 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
@keyframes wm-buzz-swoosh-low {
  0%,
  4% {
    stroke-dashoffset: 100;
  }
  18% {
    stroke-dashoffset: 0;
  }
  35%,
  46.9% {
    stroke-dashoffset: -100;
  }
  47% {
    stroke-dashoffset: 100;
  }
  62% {
    stroke-dashoffset: 0;
  }
  74%,
  100% {
    stroke-dashoffset: -100;
  }
}
@keyframes wm-buzz-swoosh-high {
  0%,
  30% {
    stroke-dashoffset: 100;
  }
  41.5% {
    stroke-dashoffset: 0;
  }
  53%,
  73.9% {
    stroke-dashoffset: -100;
  }
  74% {
    stroke-dashoffset: 100;
  }
  85% {
    stroke-dashoffset: 0;
  }
  97%,
  100% {
    stroke-dashoffset: -100;
  }
}
/* The words: one header, one whispered line, each on a single line. */
.wm-bar-buzz-note__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  /* Each line owns only its words — no stretched selection boxes. */
  align-items: flex-start;
  gap: var(--wm-space-nudge, 0.25rem);
}
.wm-bar-buzz-note__title,
.wm-bar-buzz-note__desc {
  max-width: 100%;
}
.wm-bar-buzz-note__title {
  /* A step under text-sm: the header should lead the 12px tease
     without shouting over a card this small — by ink, not by weight. */
  font-size: 0.8125rem;
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink, #16171b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wm-bar-buzz-note__desc {
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* A knock carrying its own door hugs its content — the fixed seat is
   the plain card's; a card with a Checkout makes exactly the room the
   button needs and no more. */
.wm-bar-buzz-note.has-cta {
  width: fit-content;
  /* The plain cards' own ceiling — a named product's longer line
     truncates rather than growing the card past it. */
  max-width: min(26rem, calc(100vw - 2rem));
  /* The pill sits closer to the close than words would — a snug (8px)
     rather than the text cards' step. */
  padding-right: calc(2 * var(--wm-space-snug, 0.5rem) + 1.75rem);
}
/* The door itself: a small primary pill on the card's midline, seated
   between the words and the close. */
.wm-bar-buzz-note__cta {
  flex: none;
  display: inline-grid;
  place-items: center;
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background-color: var(--wm-primary, #004c27);
  color: var(--wm-primary-fg, #ffffff);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
  /* The shine's stage: the stripes are children clipped by the pill. */
  position: relative;
  overflow: hidden;
}
.wm-bar-buzz-note__cta:hover {
  background-color: var(
    --wm-primary-600,
    color-mix(in srgb, var(--wm-primary, #004c27) 85%, #000000)
  );
}
/* The coupon: the code on its own white ground with the copy mark —
   a chip to take, not a door to walk through. The mark speaks in the
   muted ink; the taken beat turns it a check. */
.wm-bar-buzz-note__code {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-ink, #16171b);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
}
.wm-bar-buzz-note__code svg {
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
}
/* The taken beat, said the window chip's way: the label re-keys on each
   swap, so code-to-Copied and the return both ride the confirm's glide;
   the check speaks in the store's colour. */
.wm-bar-buzz-note__code-label {
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  animation: wm-buzz-code-swap 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* The chip holds ONE width through the swap — both tellings stand in
   the stack as silent ghosts under the live label, so Copied never
   shrinks the button and the code's return never snaps it back. */
.wm-bar-buzz-note__code-stack {
  display: inline-grid;
  justify-items: center;
}
.wm-bar-buzz-note__code-stack > * {
  grid-area: 1 / 1;
}
.wm-bar-buzz-note__code-label.is-ghost {
  visibility: hidden;
  animation: none;
}
.wm-bar-buzz-note__code.is-copied svg {
  color: var(--wm-primary, #004c27);
}
@keyframes wm-buzz-code-swap {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
}
/* The island's checkout shine, said the island's own way — two SOLID
   tilted stripes of light crossing the button, a wide one led by a
   narrow one, the way a highlight sweeps a curved surface in two
   catches rather than one bar. The pair travel together on one clock,
   held apart by their resting offsets; most of the cycle is the button
   at rest (the sweep is over by 45%), because a sheen on repeat every
   second is an advert, not a glint. */
.wm-bar-buzz-note__cta::before,
.wm-bar-buzz-note__cta::after {
  content: "";
  position: absolute;
  top: -25%;
  height: 150%;
  left: 0;
  pointer-events: none;
  transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  animation: wm-buzz-cta-shine 3.2s ease-in-out infinite;
}
.wm-bar-buzz-note__cta::before {
  width: 1rem;
  background: rgba(255, 255, 255, 0.32);
  --wm-buzz-shine-x: -3rem;
}
.wm-bar-buzz-note__cta::after {
  width: 0.375rem;
  background: rgba(255, 255, 255, 0.24);
  --wm-buzz-shine-x: -4.25rem;
}
@keyframes wm-buzz-cta-shine {
  0% {
    transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  }
  45%,
  100% {
    transform: skewX(-20deg) translateX(calc(var(--wm-buzz-shine-x, -3rem) + 12rem));
  }
}
/* The close sits INSIDE the card, on its midline — furniture of the
   card now, not a handle on its corner — quiet until hovered. */
.wm-bar-buzz-note__close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--wm-space-snug, 0.5rem);
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--wm-ink-quiet, rgba(22, 23, 27, 0.35));
  cursor: pointer;
}
.wm-bar-buzz-note__close:hover {
  color: var(--wm-ink, #16171b);
}
@media (prefers-reduced-motion: reduce) {
  .wm-bar-buzz-note,
  .wm-bar-buzz-note__hand-img,
  .wm-bar-buzz-note__hand-lines path {
    animation: none;
  }
  .wm-bar-buzz-note__cta::before,
  .wm-bar-buzz-note__cta::after {
    animation: none;
    content: none;
  }
}
`;
const KNOCK_CSS = `
/* The KNOCK rises above the ORB, aligned to its wall the way the
   chips are — dictated. It stands where the chips stack stands (the
   orb's 1.5rem seat + its 4rem + a breath), and hugs the orb's own
   wall. The study's centring translate is baked into every keyframe
   (the pop, the shiver, the hover lift), so the seat moves the ANCHOR
   instead: left is computed so the −50% lands the card's edge 1.5rem
   off the wall. The middle seat keeps the study's own centre. */
.wm-as-knock .wm-bar-buzz-note {
  bottom: calc(1.5rem + 3.5rem + 0.75rem);
  /* This seat's own cut — dictated: the card caps at 320 (the study's
     360), and the words keep 24px of air before the close — the
     study's formula (the close's snug inset + its 1.75rem box) with
     the step grown to 24. The wall-anchor calcs below read the same
     20rem. */
  width: min(20rem, calc(100vw - 2rem));
  /* The card's insets stand at a STEP (12px) on every side —
     dictated (a 16 stood briefly, then called back); the right wall
     keeps the formula with the step in the close's seat: step + the
     close's 1.75rem box + 16px of air before the words (the ragged
     lines and the glyph's own box inset already read as more). */
  padding: var(--wm-space-md, 0.75rem);
  padding-right: calc(0.75rem + 1.75rem + 1rem);
  /* Long words WRAP now (below) — the wave rides the card's TOP edge
     beside the first line rather than centring against the grown
     height. */
  align-items: flex-start;
  /* Wrapped lines outgrow the capsule — dictated: a grown card trades
     the study's full pill for the 20px corner. (At this width and
     copy the title always wraps; a one-line knock would want the pill
     back.) */
  border-radius: var(--wm-radius-plate, 1.25rem);
}
/* The words-to-tail air — dictated to a snug (8px) over the study's
   own nudge. */
.wm-as-knock .wm-bar-buzz-note__text {
  gap: var(--wm-space-sm, 0.5rem);
}
/* Looser leading for the grown card — dictated: the study's 1.3 steps
   up to 1.4 on title and tail both. */
.wm-as-knock .wm-bar-buzz-note__title,
.wm-as-knock .wm-bar-buzz-note__desc {
  line-height: var(--wm-nudge-line-height, 1.4);
}
/* The 320 cut costs the title its one line — dictated: the words take
   a SECOND line instead of the ellipsis; the tail keeps its own
   one-line cut. */
.wm-as-knock .wm-bar-buzz-note__title {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
/* The wave's white disc squares off — dictated: the 44px seat trades
   its circle for a rounded square, the 12px corner sitting a step
   inside the card's own 20. */
.wm-as-knock .wm-bar-buzz-note__bell {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
/* The LEAVE just DISAPPEARS — dictated: no sink, no travel; the card
   fades where it stands (a gather-into-the-orb told once and called
   back). The drag's own offset (--wm-buzz-y) rides along, the
   study's way, so a swiped card fades from the hand's last hold. */
.wm-as-knock .wm-bar-buzz-note.is-out {
  animation: wm-as-knock-out 0.2s ease-out both;
}
@keyframes wm-as-knock-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 1;
  }
  to {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 0;
  }
}
/* The close rides the TOP with the wave — dictated: the study centres
   it against the capsule, but a card grown to two or three lines wants
   its close where a notification keeps it, on the head line. The
   card's own snug inset seats it. */
.wm-as-knock .wm-bar-buzz-note__close {
  top: var(--wm-space-md, 0.75rem);
  right: var(--wm-space-md, 0.75rem);
  transform: none;
}
.wm-as-knock.is-right .wm-bar-buzz-note {
  left: calc(100vw - 1.5rem - min(20rem, 100vw - 2rem) / 2);
}
.wm-as-knock.is-left .wm-bar-buzz-note {
  left: calc(1.5rem + min(20rem, 100vw - 2rem) / 2);
}
`;
const NUDGE_CARD_CSS = `
.wm-nudge .wm-bar-buzz-note {
  align-items: flex-start;
  /* A VERY SUBTLE cast — dictated, called back from none: the
     hairline edge plus the faintest settle, nothing that reads as a
     floating panel. */
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow, 0 2px 8px rgba(22, 23, 27, 0.08), 0 10px 32px rgba(22, 23, 27, 0.1));
}
/* Under a resting pointer the cast deepens a little and nothing moves
   (dictated: the lift is gone, here and everywhere). */
.wm-nudge .wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow-hover, 0 3px 10px rgba(22, 23, 27, 0.1), 0 14px 36px rgba(22, 23, 27, 0.14));
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__text {
  min-height: 2.75rem;
  justify-content: center;
}
/* The words hold TWO lines (dictated: concise) — longer copy
   truncates on the second with an ellipsis. */
.wm-nudge .wm-bar-buzz-note__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* The disc is ONE seat in every telling (dictated): 44 on the tint,
   the disc's corners — whatever it holds, the wave, a glyph or the
   product's own shot, which fills it and takes its corners. */
.wm-nudge .wm-bar-buzz-note__product {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__desc {
  display: none;
}
/* The disc's own COLOUR — an icon seated with currentColor reads the
   family colour on the white plate. */
.wm-nudge .wm-bar-buzz-note__bell {
  color: var(--wm-color-text, #16171b);
}
.wm-nudge .wm-bar-buzz-note.has-cta {
  display: grid;
  grid-template-columns: 2.75rem 1fr;
  column-gap: 0.75rem;
  row-gap: 0.75rem;
  align-items: start;
  max-width: none;
  padding-right: calc(0.75rem + 1.75rem + 1rem);
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__bell {
  grid-row: 1;
  grid-column: 1;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__text {
  grid-row: 1;
  grid-column: 2;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__cta {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  justify-content: center;
  margin-right: calc(-1.75rem - 1rem);
  min-width: 0;
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  font-weight: var(--wm-font-weight-body, 400);
}
/* A BODY in the card — the Product Row, the Rating Row — seats in
   the text column on the row under the words, the column's whole
   width (a row's badge ranges to its far end; an inline row keeps
   its own), and the doors step down one. */
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__body {
  grid-column: 2;
  grid-row: 2;
  justify-self: stretch;
  align-self: start;
  min-width: 0;
}
.wm-nudge .wm-bar-buzz-note.has-cta:has(.wm-bar-buzz-note__body) .wm-bar-buzz-note__ctas {
  grid-row: 3;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__ctas {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  min-width: 0;
  margin-right: calc(-1.75rem - 1rem);
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas {
  position: static;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack {
  flex-direction: column;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack .wm-pro-cta {
  flex: none;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta {
  /* EQUAL halves (dictated) — flex alone still floors each door at
     its label's width; min-width 0 lifts the floor so both take the
     same share of the row. */
  flex: 1 1 0;
  min-width: 0;
}
/* Icon-only doors keep their square — a mark stretched to half the
   row would float in a void — and the pair ranges RIGHT (dictated),
   to the doors' own 12 off the card's edge. Beside a LABELLED door
   the icon keeps its square on the left and the label takes the line
   that remains (the Search Top Picks pair). */
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta.is-icon,
.wm-nudge .wm-bar-buzz-note__ctas .nw-win__tooltip-anchor {
  flex: none;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas:has(.wm-pro-cta.is-icon) {
  justify-content: flex-end;
}
/* The door is the Button pair's primary — the study's shine stands
   down. */
.wm-nudge .wm-bar-buzz-note__cta::before,
.wm-nudge .wm-bar-buzz-note__cta::after {
  display: none;
  animation: none;
}
`;
const NUDGE_CTA_CSS = `
.wm-pro-ctas {
  position: fixed;
  display: flex;
  gap: 0.5rem;
  z-index: 30;
}
.wm-pro-cta {
  height: 2.25rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: var(--wm-radius-full, 62.5rem);
  background: var(--wm-color-surface, #ffffff);
  color: var(--wm-color-text, #16171b);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: var(--wm-font-weight-body, 400);
  white-space: nowrap;
  cursor: pointer;
  /* The hairline alone — dictated: no cast on the capsules; the edge
     is the only thing that parts them from the card. */
  box-shadow: 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
  animation: wm-pro-cta-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}
.wm-pro-cta:hover {
  background: var(--wm-color-surface-muted, #f8f8f8);
}
.wm-pro-cta:active {
  transform: scale(0.96);
}
/* ICON-ONLY doors (dictated): the capsule squared to its own height,
   the mark alone at the door-mark size; the label lives on for the
   reader in aria-label, and for the eye in the Tooltip primitive's
   word (TIP_CSS below, its window tokens re-said in the store's). */
.wm-pro-cta.is-icon {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  padding: 0;
}
.wm-pro-cta.is-icon svg {
  width: var(--wm-icon-size-xl, 1.25rem);
  height: var(--wm-icon-size-xl, 1.25rem);
}
@keyframes wm-pro-cta-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* INSIDE the card the row speaks the Button primitive's own pair at
   the Button's own geometry — 2.5rem tall, text-sm. The unmarked
   capsule is the TRUE SECONDARY, dictated: no background, the inset
   hairline ring, the text colour's own word. Floating under the card (the
   seats' outside telling) the capsules keep the chips' white background —
   a transparent pill over a storefront says nothing. */
.wm-bar-buzz-note__ctas .wm-pro-cta {
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
}
.wm-bar-buzz-note__ctas .wm-pro-cta:hover {
  background: color-mix(in srgb, var(--wm-color-text, #16171b) 4%, transparent);
}
.wm-bar-buzz-note__ctas .wm-pro-cta.is-icon {
  width: 2.5rem;
}
/* The PRIMARY telling of a door — dictated for the two-button row:
   the left stays the secondary (the plate ringed in the hairline),
   the right commits in the primary's colours. Said AFTER the in-card
   secondary so the primary's background wins its seats. */
.wm-pro-cta.is-primary {
  background: var(--wm-color-primary, #16171b);
  color: var(--wm-color-on-primary, #ffffff);
  box-shadow: none;
}
.wm-pro-cta.is-primary:hover {
  background: color-mix(in srgb, var(--wm-color-primary, #16171b) 85%, #ffffff);
}
@media (prefers-reduced-motion: reduce) {
  .wm-pro-cta {
    animation: none;
  }
}

.wm-pro-ctas .nw-win__tooltip-anchor {
  --nww-fg: var(--wm-color-text, #16171b);
  --nww-card-bg: var(--wm-color-surface, #ffffff);
  --nww-space-snug: var(--wm-space-sm, 0.5rem);
  --nww-space-nudge: var(--wm-space-2xs, 0.25rem);
  --nww-text-xs: var(--wm-font-size-xs, 0.75rem);
  --nww-weight-regular: var(--wm-font-weight-body, 400);
  --nww-ease: var(--wm-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}
/* No tooltip on the PHONE (dictated): a finger has no hover to
   arrive on, and the plate said above a door at the wall ran past
   the layout's edge. The door's label stays in its aria-label. */
@media (max-width: 480px) {
  .wm-pro-ctas .nw-win__tooltip-anchor .nw-win__tooltip {
    display: none;
  }
}
`;
const PRO_KNOCK_CSS = `
/* Dictated: the proactive knocks stand WHITE — the sage nudge tint
   stays the page's; the card goes paper, the content on its own colours
   (the bell keeps its hairline ring, the doors their own background). */
.wm-as-knock .wm-bar-buzz-note {
  background: var(--wm-color-surface, #ffffff);
  /* And the doors in the PRIMITIVE'S manner, not the store's green —
     the note re-says the primary token as the family colour, so the
     primary door's rest and its hover both follow the Nudge page's
     own background. */
  --wm-primary: var(--wm-color-text, #16171b);
  --wm-color-primary: var(--wm-primary);
}
.wm-as-knock .wm-bar-buzz-note {
  width: min(21.25rem, calc(100vw - 2 * var(--wm-space-lg, 1rem)));
  bottom: calc(var(--wm-space-xl, 1.5rem) + 3.5rem + var(--wm-space-md, 0.75rem));
}
/* The close puck at 24 (dictated, folder-wide) — the 14px glyph
   keeps its size; the smaller puck alone closes the visual gap. */
.wm-as-knock .wm-bar-buzz-note__close {
  width: var(--wm-close-button-size, 1.5rem);
  height: var(--wm-close-button-size, 1.5rem);
}
`;
const BUZZ_ENTER_MS = 883;
function StorybookKnock({
  title,
  product: product2,
  doors,
  pressed,
  hovered,
  out
}) {
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setLanded(true), BUZZ_ENTER_MS);
    return () => window.clearTimeout(id);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "wm-bar-message wm-as-knock wm-nudge", children: [
    /* @__PURE__ */ jsx("style", { children: BUZZ_NOTE_CSS }),
    /* @__PURE__ */ jsx("style", { children: KNOCK_CSS }),
    /* @__PURE__ */ jsx("style", { children: NUDGE_CARD_CSS }),
    /* @__PURE__ */ jsx("style", { children: NUDGE_CTA_CSS }),
    /* @__PURE__ */ jsx("style", { children: PRO_KNOCK_CSS }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: [
          "wm-bar-buzz-note has-cta",
          landed && "is-landed",
          out && "is-out",
          hovered && "pv2-is-hover"
        ].filter(Boolean).join(" "),
        role: "button",
        tabIndex: 0,
        "aria-label": `Open chat — ${title}`,
        children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "wm-bar-buzz-note__close", "aria-label": "Dismiss notification", children: /* @__PURE__ */ jsx(XMark, {}) }),
          /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__bell", "aria-hidden": true, children: product2 ? /* @__PURE__ */ jsx("img", { className: "wm-bar-buzz-note__product", src: product2, alt: "" }) : /* @__PURE__ */ jsxs("span", { className: "wm-bar-buzz-note__hand", children: [
            /* @__PURE__ */ jsxs("svg", { className: "wm-bar-buzz-note__hand-lines", viewBox: "0 0 300 300", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("path", { className: "is-low", pathLength: "100", d: "M73.6 153.6C73.6 153.6 80.8 186.5 119 199" }),
              /* @__PURE__ */ jsx("path", { className: "is-low", pathLength: "100", d: "M86.7 157.9C86.7 157.9 92.2 176.7 113.5 185.5" }),
              /* @__PURE__ */ jsx("path", { className: "is-high", pathLength: "100", d: "M124.9 81.9C124.9 81.9 145.6 73.2 168.9 95.1" }),
              /* @__PURE__ */ jsx("path", { className: "is-high", pathLength: "100", d: "M127.3 90.3C127.3 90.3 140.8 86.7 151.9 97.6" })
            ] }),
            /* @__PURE__ */ jsx("img", { className: "wm-bar-buzz-note__hand-img", src: handWaveUrl, alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__text", children: /* @__PURE__ */ jsx("span", { className: "wm-bar-buzz-note__title", children: title }) }),
          /* @__PURE__ */ jsx("div", { className: "wm-bar-buzz-note__ctas", children: /* @__PURE__ */ jsx("div", { className: "wm-pro-ctas", children: doors.map((d, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: ["wm-pro-cta", d.primary && "is-primary", pressed === d.label && "pv2-is-active"].filter(Boolean).join(" "),
              style: { animationDelay: `${i * 90}ms` },
              children: d.label
            },
            d.label
          )) }) })
        ]
      }
    )
  ] });
}
function XMark() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 256 256", width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "56", x2: "56", y2: "200" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "200", x2: "56", y2: "56" })
  ] });
}
function HandoffSeam({ text, connecting, className }) {
  return /* @__PURE__ */ jsx("div", { className: ["sbp-seam", className].filter(Boolean).join(" "), role: "status", children: /* @__PURE__ */ jsx("span", { className: "sbp-seam__pill", children: connecting ? /* @__PURE__ */ jsxs("span", { className: "sbp-seam__swap", children: [
    /* @__PURE__ */ jsx("span", { className: "sbp-seam__think", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { className: "sbp-shimmer", children: text })
  ] }, "connecting") : /* @__PURE__ */ jsxs("span", { className: "sbp-seam__swap", children: [
    /* @__PURE__ */ jsx(AgentFace, { size: "sm" }),
    /* @__PURE__ */ jsx("span", { children: text })
  ] }, "joined") }) });
}
function AgentPlate({ name, role, children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: ["sbp-human", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: "sbp-human__row", children: /* @__PURE__ */ jsxs("span", { className: "sbp-human__head", children: [
      /* @__PURE__ */ jsx(AgentFace, {}),
      /* @__PURE__ */ jsxs("span", { className: "sbp-human__id", children: [
        /* @__PURE__ */ jsx("span", { className: "sbp-human__name", children: name }),
        /* @__PURE__ */ jsx("span", { className: "sbp-human__title", children: role })
      ] })
    ] }) }),
    children
  ] });
}
function AgentLine({ children }) {
  return /* @__PURE__ */ jsx("p", { className: "sbp-human__body", children });
}
function AgentTyping({ name, className }) {
  return /* @__PURE__ */ jsx("p", { className: ["sbp-typing", className].filter(Boolean).join(" "), children: /* @__PURE__ */ jsxs("span", { className: "sbp-shimmer", children: [
    name,
    " is typing…"
  ] }) });
}
function ImageTile({ src, alt, from = "user", className }) {
  return /* @__PURE__ */ jsx("div", { className: ["sbp-tile", from === "ai" && "sbp-tile--ai", className].filter(Boolean).join(" "), children: /* @__PURE__ */ jsx("img", { src, alt }) });
}
function AgentFace({ size = "md" }) {
  return /* @__PURE__ */ jsx("span", { className: `sbp-face sbp-face--${size}`, "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: supportAgentPortrait, alt: "" }) });
}
[
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers
].map(({ id, title, image }) => ({ id, name: title, image }));
[
  { ...catalog.goodwellEnergy, subtitle: "Mornings · 60 count" },
  { ...catalog.goodwellSleep60, subtitle: "Nights · 60 count" }
];
function ProductReference({ image, alt, brand: brand2, title, price, size }) {
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-reference", children: [
    /* @__PURE__ */ jsx("div", { className: "hm-ill-product-reference__media", style: size ? { width: size, height: size } : void 0, children: image ? /* @__PURE__ */ jsx(ProductImage, { src: image, alt, className: `hm-ill-media${cutoutSrcs.has(image) ? " hm-ill-media--cutout" : ""}` }) : /* @__PURE__ */ jsx(Media, { alt }) }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-product-reference__text", children: [
      brand2 && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-reference__brand", children: brand2 }),
      /* @__PURE__ */ jsx("p", { className: "hm-ill-product-reference__title", children: title }),
      price && /* @__PURE__ */ jsx("p", { className: "hm-ill-product-reference__price", children: price })
    ] })
  ] });
}
const content = {
  brand: "Goodwell",
  domain: "goodwell.com/gummies",
  campaignProducts: [catalog.goodwellSleep60, catalog.goodwellCalm, catalog.goodwellFocus],
  campaignCreative: { image: goodwellSocialAd, alt: "Goodwell Sleep, Calm and Focus gummies on lilac and blush podiums in warm sunlight" },
  knockLine: "Tell us your routine. We'll help you find your gummies.",
  ad: {
    handle: "goodwell",
    headline: "Feel good.",
    cta: "Find my gummies",
    caption: "Sleep, calm and focus. Find the gummies that fit your daily routine.",
    tags: "#dailyroutine #goodwell"
  },
  page: { eyebrow: "Your daily routine", headline: "Feel good, one gummy at a time.", sub: "Functional gummies for sleep, calm and focus." },
  picks: [catalog.goodwellSleep60, catalog.goodwellSleep28, catalog.goodwellCalm].map((p) => ({
    id: p.id,
    name: p.title,
    meta: p.size,
    price: p.price,
    image: p.image
  })),
  widget: {
    start: "Find My Match",
    q1Answer: "B",
    q2Answer: "A",
    thinking: "Thinking…",
    composer: "Or tell us in your own words…",
    welcome: "Hi! I'm your Goodwell guide. Tell us about your routine, and we'll help you choose your gummies.",
    prompts: [{ id: "sleep", text: "Sleep gummies" }, { id: "calm", text: "Calm gummies" }, { id: "match", text: "Find My Match" }],
    intro: "Let's find gummies that fit your daily routine.",
    q1: { label: "Q1. What would you like to focus on?", options: [{ key: "A", text: "Energy and focus" }, { key: "B", text: "An evening wind-down routine" }, { key: "C", text: "Everyday wellness" }] },
    q2: { label: "Q2. What matters most for your evening routine?", options: [{ key: "A", text: "Sleep and feeling calm" }, { key: "B", text: "A smaller jar to try first" }, { key: "C", text: "A simple daily habit" }] },
    result: "For your evening routine, compare Daily Sleep in two jar sizes and Calm Mood:"
  }
};
const { brand: brand$3, domain: domain$1, campaignProducts, campaignCreative, knockLine: knockLine$1, ad, page, picks: picks$2, widget } = content;
const steps$1 = [
  "Instagram ad",
  "Landing page",
  "Guided shopping · Q1",
  "Customer selection",
  "Q2",
  "Processing",
  "Recommendations"
];
const adDefaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ad,
  brand: brand$3,
  campaignCreative,
  campaignProducts,
  domain: domain$1,
  knockLine: knockLine$1,
  page,
  picks: picks$2,
  steps: steps$1,
  widget
}, Symbol.toStringTag, { value: "Module" }));
const AdJourneyContext = createContext(adDefaults);
AdJourneyContext.Provider;
function CampaignProducts({ products, className }) {
  return /* @__PURE__ */ jsx("div", { className: `${className} adj-campaign-products`, children: products.map((p) => /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title }, p.id)) });
}
function AnswerRows({ question, selected }) {
  return /* @__PURE__ */ jsxs("div", { className: "adj-quiz", children: [
    /* @__PURE__ */ jsx("p", { className: "adj-quiz__label", children: question.label }),
    /* @__PURE__ */ jsx("div", { className: "adj-quiz__rows", children: question.options.map((o) => /* @__PURE__ */ jsx(
      Button,
      {
        appearance: "secondary",
        label: o.text,
        className: o.key === selected ? "adj-answer adj-answer--selected" : "adj-answer",
        iconLeading: /* @__PURE__ */ jsx("span", { className: "adj-answer__key", children: o.key })
      },
      o.key
    )) })
  ] });
}
function Picks({ loading = false, staggerResolve = false }) {
  const { picks: picks2 } = useContext(AdJourneyContext);
  const storybook = useContext(StorybookCardSkin);
  if (storybook) {
    return /* @__PURE__ */ jsx("div", { className: "adj-picks", children: /* @__PURE__ */ jsx(Rail, { products: picks2.map((b) => ({ id: b.id, title: b.name, brand: b.meta, price: b.price, image: b.image })), loading }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "adj-picks", children: /* @__PURE__ */ jsx(ProductCollection, { children: picks2.map((b, i) => /* @__PURE__ */ jsx(
    RecommendationProductCard,
    {
      product: { id: b.id, name: b.name, brand: b.meta, price: b.price, image: b.image },
      cta: true,
      ctaAppearance: "primary",
      loading,
      resolveDelayMs: staggerResolve ? i * 90 : void 0
    },
    b.id
  )) }) });
}
const answerText$1 = (q, key) => q.options.find((o) => o.key === key).text;
function Thread$2({ step }) {
  const { widget: widget2 } = useContext(AdJourneyContext);
  if (step === 3 || step === 4) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: widget2.start }) }),
      /* @__PURE__ */ jsxs(AssistantTurn, { children: [
        /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.intro }),
        /* @__PURE__ */ jsx(AnswerRows, { question: widget2.q1, selected: step === 4 ? widget2.q1Answer : void 0 })
      ] })
    ] });
  }
  if (step === 5) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText$1(widget2.q1, widget2.q1Answer) }) }),
      /* @__PURE__ */ jsx(AssistantTurn, { children: /* @__PURE__ */ jsx(AnswerRows, { question: widget2.q2 }) })
    ] });
  }
  if (step === 6) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(UserTurn, { children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText$1(widget2.q2, widget2.q2Answer) }) }),
      /* @__PURE__ */ jsxs(AssistantTurn, { children: [
        /* @__PURE__ */ jsxs("div", { className: "adj-thinking", children: [
          /* @__PURE__ */ jsx(Icon, { name: "insight", size: 14 }),
          /* @__PURE__ */ jsx("span", { children: widget2.thinking })
        ] }),
        /* @__PURE__ */ jsx(Picks, { loading: true })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(AssistantTurn, { children: [
    /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.result }),
    /* @__PURE__ */ jsx(Picks, {})
  ] });
}
const knockLine = knockLine$1;
const knockDoors = [
  { label: "Ask me anything" },
  { label: "Find My Match", primary: true }
];
function KnockBar({ barRef, className, knock = true, pressed, out, line, doors = knockDoors, value }) {
  const { widget: widget2, knockLine: contextLine = knockLine } = useContext(AdJourneyContext);
  return /* @__PURE__ */ jsxs("div", { ref: barRef, className: ["adj-bar", className].filter(Boolean).join(" "), children: [
    knock && /* @__PURE__ */ jsx("div", { className: "pv2-knock-seat adj-bar__knock", children: /* @__PURE__ */ jsx(StorybookKnock, { title: line ?? contextLine, doors, pressed, hovered: !!pressed, out }) }),
    /* @__PURE__ */ jsx(ChatComposer, { value: value ?? widget2.composer })
  ] });
}
function Widget({ step }) {
  const { brand: brand2, widget: widget2 } = useContext(AdJourneyContext);
  const composerDefault = useContext(StorybookComposerDefault);
  if (step === 2 && composerDefault) return /* @__PURE__ */ jsx(KnockBar, {});
  if (step === 2) {
    return /* @__PURE__ */ jsx(Shell, { brand: brand2, className: "adj-widget adj-widget--compact", composer: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsxs(AssistantTurn, { children: [
      /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: widget2.welcome }),
      /* @__PURE__ */ jsx(AiPills, { options: widget2.prompts, selectedId: "" })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Shell, { brand: brand2, className: step === 6 ? "adj-widget adj-widget--expanded adj-widget--end" : "adj-widget adj-widget--expanded", composer: /* @__PURE__ */ jsx(ChatComposer, { value: widget2.composer }), children: /* @__PURE__ */ jsx("div", { className: "adj-thread", children: /* @__PURE__ */ jsx(Thread$2, { step }) }) });
}
function InstagramAd({ copy: override } = {}) {
  const { brand: brand2, ad: ad2, campaignCreative: campaignCreative2 } = useContext(AdJourneyContext);
  const copy = override ?? ad2;
  return /* @__PURE__ */ jsxs("article", { className: "adj-shell adj-ig", children: [
    /* @__PURE__ */ jsxs("header", { className: "adj-ig__head", children: [
      /* @__PURE__ */ jsxs("div", { className: "adj-ig__profile", children: [
        /* @__PURE__ */ jsx("span", { className: "adj-ig__avatar", children: /* @__PURE__ */ jsx(BrandMark, { brand: brand2 }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-ig__name", children: [
          /* @__PURE__ */ jsx(BrandName, { brand: brand2 }),
          /* @__PURE__ */ jsx("small", { children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "adj-ig__more", src: igMore, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__media", children: [
      /* @__PURE__ */ jsx("img", { className: "adj-ig__creative", src: campaignCreative2.image, alt: campaignCreative2.alt }),
      campaignCreative2.headline && /* @__PURE__ */ jsxs("div", { className: "adj-ig__campaign-copy", children: [
        /* @__PURE__ */ jsx("h2", { children: campaignCreative2.headline }),
        campaignCreative2.detail && /* @__PURE__ */ jsx("p", { children: campaignCreative2.detail })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-ig__cta", children: [
      copy.cta,
      /* @__PURE__ */ jsx("img", { src: igChevron, alt: "" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "adj-ig__caption", children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(BrandName, { brand: brand2 }) }),
      " ",
      copy.caption,
      " ",
      /* @__PURE__ */ jsx("span", { children: copy.tags })
    ] })
  ] });
}
function Storefront({ step = 2, widget: widgetSlot, hero: override }) {
  const { brand: brand2, domain: domain2, page: page2, campaignProducts: campaignProducts2, heroCreative } = useContext(AdJourneyContext);
  const hero = override ?? page2;
  return /* @__PURE__ */ jsxs("article", { className: `adj-shell adj-store${heroCreative ? " adj-store--campaign" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { children: domain2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "hm-ill-chat-header adj-nav", children: [
      /* @__PURE__ */ jsx("span", { className: "adj-nav__logo", children: /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2 }) }),
      /* @__PURE__ */ jsx(StoreNavItems, {}),
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-chat-header__group", children: [
        /* @__PURE__ */ jsx(IconButton, { icon: "search", label: "Search", variant: "outline" }),
        /* @__PURE__ */ jsx(IconButton, { icon: "shoppingCart", label: "Cart", variant: "outline" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "adj-store__body", children: [
      /* @__PURE__ */ jsx("section", { className: heroCreative ? "adj-hero adj-hero--campaign" : "adj-hero", children: heroCreative ? /* @__PURE__ */ jsx("img", { className: "adj-hero__img adj-hero__img--campaign", src: heroCreative.image, alt: heroCreative.alt }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "adj-hero__eyebrow", children: hero.eyebrow }),
        /* @__PURE__ */ jsx("h2", { children: hero.headline }),
        /* @__PURE__ */ jsx("p", { children: hero.sub }),
        /* @__PURE__ */ jsx(CampaignProducts, { products: campaignProducts2, className: "adj-hero__img" })
      ] }) }),
      heroCreative && /* @__PURE__ */ jsx("div", { className: "adj-store-products", "aria-label": `More from ${brand2}`, children: campaignProducts2.map((p) => /* @__PURE__ */ jsxs("article", { className: "adj-store-product", children: [
        /* @__PURE__ */ jsx("div", { className: "adj-store-product__tile", children: /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title }) }),
        /* @__PURE__ */ jsxs("div", { className: "adj-store-product__row", children: [
          /* @__PURE__ */ jsx("span", { className: "adj-store-product__title", children: p.title }),
          /* @__PURE__ */ jsx("span", { children: p.price })
        ] }),
        p.size && /* @__PURE__ */ jsx("span", { className: "adj-store-product__meta", children: p.size })
      ] }, p.id)) }),
      /* @__PURE__ */ jsx(ContentFade, {}),
      widgetSlot ?? /* @__PURE__ */ jsx(Widget, { step })
    ] })
  ] });
}
const invite = "Want $5 off your next order? Clear 4 hurdles to unlock it.";
const beats$5 = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: invite },
  { id: "prompts", type: "appear", ms: 1200 },
  { id: "pick-play", type: "appear", ms: 160 },
  // The pick's press is still settling when the widget starts to grow,
  // and the sweep starts while the morph is still landing — its green
  // slides in from above the panel, so tap → grow → flood is one gesture.
  { id: "expand", type: "appear", ms: 240 },
  // One continuous take (GamesRewardsMotion.css, done by ~1000ms): every layer
  // runs its own single track through Figma's six frames; nothing stops
  // at a frame. The reveal starts at 960ms, as the star's points leave
  // the panel, so the chat rises straight out of the cream.
  { id: "sweep", type: "appear", ms: 960 },
  { id: "reveal", type: "appear", ms: 650 },
  { id: "game-load", type: "load", ms: 800 },
  { id: "game", type: "appear", ms: 900 },
  // The run is one CSS track (GamesRewardsMotion.css, grm-hurdles/
  // grm-jump): these lengths are its tap times, so each Jump press lands
  // on the frame the bag starts its crouch. Hurdle 3 holds longer for
  // its toast; win starts on the last landing.
  { id: "run", type: "appear", ms: 546 },
  { id: "hurdle-1", type: "appear", ms: 933 },
  { id: "hurdle-2", type: "appear", ms: 933 },
  { id: "hurdle-3", type: "appear", ms: 1067 },
  { id: "hurdle-4", type: "appear", ms: 750 },
  { id: "win", type: "appear", ms: 900 },
  { id: "reward", type: "appear", ms: 700 },
  { id: "hold", type: "pause", ms: 1600 }
];
beats$5.map(
  (b) => b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 } : b.id === "prompts" ? { ...b, ms: 883 + 3600 } : b.id === "pick-play" ? { ...b, ms: 450 } : b
);
function AiStatusIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "hm-ill-ai-status-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 10.0015 10.0015",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsxs("g", { className: "hm-ill-ai-status-icon__shape", children: [
        /* @__PURE__ */ jsxs("g", { className: "hm-ill-ai-status-icon__spokes", children: [
          /* @__PURE__ */ jsx("path", { d: "M5.16982 1.36618e-08L5.16982 3.58808", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M5.16982 6.41338L5.16982 10.0015", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M10.0015 4.87603L6.48029 4.87603", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M3.52148 4.87603L0.000305653 4.87603", strokeWidth: "0.625092", stroke: "#462160", vectorEffect: "non-scaling-stroke" })
        ] }),
        /* @__PURE__ */ jsxs("g", { className: "hm-ill-ai-status-icon__ticks", children: [
          /* @__PURE__ */ jsx("path", { d: "M3.76818 3.63487L2.62108 2.48778", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M7.56878 7.45211L6.42169 6.30502", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M6.41942 3.6349L7.56651 2.48781", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" }),
          /* @__PURE__ */ jsx("path", { d: "M2.62359 7.4521L3.77069 6.30501", strokeWidth: "0.625092", strokeLinecap: "round", stroke: "#462160", vectorEffect: "non-scaling-stroke" })
        ] }),
        /* @__PURE__ */ jsx("rect", { className: "hm-ill-ai-status-icon__center", x: "4.40987", y: "4.27743", width: "1.40034", height: "1.40034", fill: "#462160" })
      ] })
    }
  );
}
function AiStatus({
  label,
  visible = true,
  icon
}) {
  const [current, setCurrent] = useState(label);
  const [previous, setPrevious] = useState(null);
  const currentRef = useRef(current);
  useEffect(() => {
    if (label !== currentRef.current) {
      setPrevious(currentRef.current);
      setCurrent(label);
      currentRef.current = label;
    }
  }, [label]);
  return /* @__PURE__ */ jsxs("div", { className: `hm-ill-ai-status${visible ? "" : " hm-ill-ai-status--hidden"}`, children: [
    icon ?? /* @__PURE__ */ jsx(AiStatusIcon, {}),
    /* @__PURE__ */ jsxs("span", { className: "hm-ill-ai-status__label-stack", children: [
      previous && previous !== current && /* @__PURE__ */ jsx("span", { className: "hm-ill-ai-status__label hm-ill-ai-status__label--exiting", "aria-hidden": "true", children: previous }),
      /* @__PURE__ */ jsx("span", { className: "hm-ill-ai-status__label", children: current }, current)
    ] })
  ] });
}
const specificInfo = {
  chips: [
    { id: "fragrance", text: "Is it fragrance-free?" },
    { id: "routine", text: "How do I use it?" },
    { id: "size", text: "What size is the bottle?" }
  ]
};
const directAsk = {
  chipId: "fragrance"
};
function toPieces(text) {
  const pieces = [];
  let wordIndex = -1;
  let endedWithSpace = true;
  text.split("**").forEach((segment, i) => {
    segment.split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        endedWithSpace = true;
        return;
      }
      if (endedWithSpace) wordIndex += 1;
      pieces.push({ text: token, bold: i % 2 === 1, wordIndex, spaceBefore: endedWithSpace && pieces.length > 0 });
      endedWithSpace = false;
    });
  });
  return pieces;
}
function RichStagger({ text }) {
  if (!text.includes("**")) return /* @__PURE__ */ jsx(StaggerText, { text });
  return /* @__PURE__ */ jsx(Fragment, { children: toPieces(text).map((piece, i) => {
    const Tag = piece.bold ? "strong" : "span";
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      piece.spaceBefore ? " " : "",
      /* @__PURE__ */ jsx(Tag, { className: "hm-ill-stagger-text__word", style: { animationDelay: `${piece.wordIndex * 45}ms` }, children: piece.text })
    ] }, i);
  }) });
}
function Enter({ children, delayMs }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-assistant-turn--enter", style: delayMs ? { animationDelay: `${delayMs}ms` } : void 0, children });
}
function Thinking({ t, id }) {
  const status2 = t.status(id);
  return status2 ? /* @__PURE__ */ jsx(AiStatus, { label: status2.label, visible: status2.visible }) : null;
}
function AssistantText({ text }) {
  return /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(RichStagger, { text }) });
}
const courtProfile = "/images/landing/home-v2/assets/court-01-profile-DERNvCRo.webp";
const courtOverhead = "/images/landing/home-v2/assets/court-01-overhead-Cq5u_wrK.webp";
const product = {
  ...catalog.strideCourt01,
  name: catalog.strideCourt01.title,
  eyebrow: "Stride · Leather collection",
  sizes: ["US 9", "US 9.5", "US 10", "US 10.5", "US 11"]
};
[
  { image: product.image, alt: "Court 01 Leather Sneaker in chalk, three-quarter view" },
  { image: courtProfile, alt: "Court 01 Leather Sneaker, side profile" },
  { image: courtOverhead, alt: "Court 01 Leather Sneaker, overhead view" }
];
({ detail: `${product.size} · ${product.color} · ${product.price}` });
const recs = [
  { ...catalog.strideSuedeRunner, tag: "Taupe · US 10", reason: "Soft suede and tonal mesh for a more relaxed look." },
  { ...catalog.stridePennyLoafer, tag: "Espresso · US 10", reason: "Polished leather for days that call for a smarter shoe." }
];
recs.map((r) => r.id);
[product, ...recs].reduce((sum, p) => sum + Number(p.price.slice(1)), 0);
specificInfo.chips.find((c) => c.id === directAsk.chipId);
const crosswordMark = "/images/landing/home-v2/assets/crossword-logo-C5ShBt7d.svg";
const brand$2 = "Sorelle Labs";
const states = [
  { state: 1, label: "Request received" },
  { state: 2, label: "Consulting Crossword" },
  { state: 3, label: "Recommendations received" },
  { state: 4, label: "Checking offers" },
  { state: 5, label: "Task completed" }
];
const agent = {
  label: "Personal agent",
  status: "Working",
  ask: "My user wants a daily moisturiser for dry skin, under $50.",
  followUp: "Any current offers?",
  close: "Noted. I'll show both options and the free gift offer to my user."
};
const picks$1 = [catalog.sorelleCream, catalog.sorelleSet].map((p) => ({
  id: p.id,
  name: p.title,
  price: p.price,
  image: p.image
}));
const calls = {
  products: {
    state: 2,
    returned: 3,
    topic: "Products",
    reply: [
      "The ",
      { b: "Deep Hydration Cream" },
      " is $42 and fits the budget. For $13 more, the ",
      { b: "Deep Hydration Set" },
      " adds a night mask and travel-size cleanser."
    ]
  },
  offers: {
    state: 4,
    returned: 4,
    topic: "Offers",
    reply: [
      "The ",
      { b: "Winter Glow Special" },
      " includes a free gift on orders over $50. It's valid until November 30, once per customer."
    ]
  }
};
const offer = {
  title: "Winter Glow Special",
  detail: "Free gift on orders over $50",
  terms: "Until Nov 30 · 1 per customer"
};
const defaultScenario = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  agent,
  brand: brand$2,
  calls,
  offer,
  picks: picks$1,
  states
}, Symbol.toStringTag, { value: "Module" }));
const PersonalAgentContext = createContext(defaultScenario);
PersonalAgentContext.Provider;
const usePersonalAgentScenario = () => useContext(PersonalAgentContext);
function AgentNode({ done = false }) {
  return /* @__PURE__ */ jsx("span", { className: "pa-node pa-node--agent", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", width: "12", height: "12", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: done ? /* @__PURE__ */ jsx("path", { d: "M3 6.2l2 2 4-4.4", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "4.25" }),
    /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "1.6", fill: "currentColor", stroke: "none" })
  ] }) }) });
}
function CrosswordNode() {
  return /* @__PURE__ */ jsx("span", { className: "pa-node pa-node--crossword", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: crosswordMark, alt: "" }) });
}
function AgentStep({ text, done = false }) {
  return /* @__PURE__ */ jsxs("li", { className: "pa-step pa-step--agent", children: [
    /* @__PURE__ */ jsx(AgentNode, { done }),
    /* @__PURE__ */ jsx("p", { className: "pa-step__text", children: text })
  ] });
}
function CallStep({
  topic,
  returned,
  pending,
  children
}) {
  const { brand: brand2 } = usePersonalAgentScenario();
  return /* @__PURE__ */ jsxs("li", { className: "pa-step pa-step--call", children: [
    /* @__PURE__ */ jsx(CrosswordNode, {}),
    /* @__PURE__ */ jsxs("section", { className: "pa-call", "data-name": `Tool call / Crossword / ${topic}`, children: [
      /* @__PURE__ */ jsxs("header", { className: "pa-call__header", children: [
        /* @__PURE__ */ jsxs("span", { className: "pa-call__tool", children: [
          "Crossword",
          /* @__PURE__ */ jsx("span", { className: "pa-call__merchant", children: brand2 })
        ] }),
        /* @__PURE__ */ jsx(Chip, { size: "sm", children: topic })
      ] }),
      returned ? children : pending
    ] })
  ] });
}
function PickList() {
  const { picks: picks2 } = usePersonalAgentScenario();
  return /* @__PURE__ */ jsx("div", { className: "pa-picks", children: picks2.map((p) => /* @__PURE__ */ jsx("div", { className: "pa-pick", children: /* @__PURE__ */ jsx(ProductReference, { image: p.image, alt: p.name, title: p.name, price: p.price, size: 44 }) }, p.id)) });
}
function OfferCard() {
  const { offer: offer2 } = usePersonalAgentScenario();
  return /* @__PURE__ */ jsxs("div", { className: "pa-offer", children: [
    /* @__PURE__ */ jsx("span", { className: "pa-offer__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M8.6 1.75H14.25V7.4L7.4 14.25L1.75 8.6Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "11.1", cy: "4.9", r: "1", fill: "currentColor", stroke: "none" })
    ] }) }),
    /* @__PURE__ */ jsxs("span", { className: "pa-offer__text", children: [
      /* @__PURE__ */ jsx("span", { className: "pa-offer__title", children: offer2.title }),
      /* @__PURE__ */ jsx("span", { className: "pa-offer__detail", children: offer2.detail })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "pa-offer__terms", children: offer2.terms })
  ] });
}
const shopper = {
  ask: "Find me a daily moisturiser for dry skin, under $50."
};
const panel = {
  open: "Consulting Crossword",
  done: "Used Crossword",
  lookups: (n) => `${n} lookup${n === 1 ? "" : "s"}`
};
const answer = [
  `Here are two options from ${brand$2}. The `,
  { b: "Deep Hydration Cream" },
  " is $42. For $13 more, the ",
  { b: "Deep Hydration Set" },
  " adds a night mask and travel-size cleanser. The $55 set also qualifies for the ",
  { b: "Winter Glow Special" },
  " free gift."
];
const placeholder$1 = "Message your agent";
const merchant = "Sorelle Labs";
const domain = "chatgpt.com";
const picks = [
  { id: "cream", name: catalog.sorelleCream.title, price: catalog.sorelleCream.price, note: "Rich moisture that never feels sticky", image: catalog.sorelleCream.image },
  { id: "lotion", name: catalog.sorelleLotion.title, price: catalog.sorelleLotion.price, note: "Lightweight daily lotion with ceramides", image: catalog.sorelleLotion.image },
  { id: "gel", name: catalog.sorelleGel.title, price: catalog.sorelleGel.price, note: "Water-gel texture for normal to dry skin", image: catalog.sorelleGel.image }
];
const bundle = {
  id: "set",
  name: catalog.sorelleSet.title,
  price: catalog.sorelleSet.price,
  note: "Cream, night mask and travel-size cleanser",
  image: catalog.sorelleSet.image
};
const promo = { name: "Winter Glow Special", detail: "Free gift on orders over $50", resolved: "Free gift included" };
const transcript = [
  { role: "user", text: "I'm looking for a moisturizer for dry skin, under $50." },
  {
    role: "assistant",
    text: ["Here are three options in your range. The ", { b: "Deep Hydration Cream" }, " at $42 is especially moisturizing without feeling sticky, according to reviewers."],
    result: "picks"
  },
  { role: "user", text: "I'll go with the Deep Hydration Cream." },
  {
    role: "assistant",
    text: ["For $13 more, the ", { b: "Deep Hydration Set" }, " adds a night mask and a travel-size cleanser. Our ", { b: "Winter Glow Special" }, " also includes a free gift on orders over $50."],
    result: "bundle"
  },
  { role: "user", text: "I'll take the set." },
  { role: "assistant", text: ["Done. Your free gift is added too."], result: "order" }
];
const status = "Searching for moisturizers for dry skin";
const placeholder = "Ask anything";
const paths = {
  send: /* @__PURE__ */ jsx("path", { d: "M12 19V5M6.5 10.5L12 5l5.5 5.5" }),
  chevron: /* @__PURE__ */ jsx("path", { d: "M7 10l5 5 5-5" }),
  share: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M12 14V4M8 7.5L12 3.5l4 4" }),
    /* @__PURE__ */ jsx("path", { d: "M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" })
  ] }),
  dots: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "5.5", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ jsx("circle", { cx: "18.5", cy: "12", r: "1.4", fill: "currentColor", stroke: "none" })
  ] }),
  plus: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" }),
  mic: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "9", y: "3.5", width: "6", height: "11", rx: "3" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" })
  ] }),
  voice: /* @__PURE__ */ jsx("path", { d: "M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" }),
  stop: /* @__PURE__ */ jsx("rect", { x: "7.5", y: "7.5", width: "9", height: "9", rx: "1.5", fill: "currentColor", stroke: "none" }),
  copy: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "8.5", y: "8.5", width: "11", height: "11", rx: "2.5" }),
    /* @__PURE__ */ jsx("path", { d: "M15.5 8.5V7a2.5 2.5 0 00-2.5-2.5H7A2.5 2.5 0 004.5 7v6A2.5 2.5 0 007 15.5h1.5" })
  ] }),
  up: /* @__PURE__ */ jsx("path", { d: "M7.5 20.5h-2a1 1 0 01-1-1v-8a1 1 0 011-1h2m0 10V10.5l3.6-6.3a1.6 1.6 0 012.9 1.1l-.6 4.2h4.4a2 2 0 012 2.4l-1.3 6.6a2 2 0 01-2 1.5H7.5z" }),
  down: /* @__PURE__ */ jsx("path", { d: "M16.5 3.5h2a1 1 0 011 1v8a1 1 0 01-1 1h-2m0-10v10l-3.6 6.3a1.6 1.6 0 01-2.9-1.1l.6-4.2H5.2a2 2 0 01-2-2.4l1.3-6.6a2 2 0 012-1.5h10z" }),
  retry: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M19.5 12a7.5 7.5 0 11-2.2-5.3" }),
    /* @__PURE__ */ jsx("path", { d: "M19.5 4.5v3.5H16" })
  ] }),
  gift: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "4", y: "8.5", width: "16", height: "4", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 12.5V19a1 1 0 001 1h11a1 1 0 001-1v-6.5M12 8.5V20M12 8.5C10.8 5.5 7.5 4.6 7.5 6.6c0 1.6 2.8 1.9 4.5 1.9zm0 0c1.2-3 4.5-3.9 4.5-1.9 0 1.6-2.8 1.9-4.5 1.9z" })
  ] })
};
function Glyph({ name, size = 18 }) {
  return /* @__PURE__ */ jsx("svg", { className: "aia-glyph", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: paths[name] });
}
function ProductTile({ product: product2, wide = false, media }) {
  return /* @__PURE__ */ jsxs("article", { className: wide ? "aia-tile aia-tile--wide" : "aia-tile", "data-name": `Product / ${product2.name}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "aia-tile__media", children: [
      media ?? /* @__PURE__ */ jsx(ProductImage, { src: product2.image, alt: product2.name }),
      !wide && /* @__PURE__ */ jsx("span", { className: "aia-tile__select" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "aia-tile__name", children: product2.name }),
    /* @__PURE__ */ jsxs("p", { className: "aia-tile__meta", children: [
      product2.price,
      " • ",
      product2.note
    ] }),
    wide && /* @__PURE__ */ jsxs("p", { className: "aia-tile__promo", children: [
      /* @__PURE__ */ jsx(Glyph, { name: "gift", size: 14 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("strong", { children: promo.name }),
        " • ",
        promo.detail
      ] })
    ] })
  ] });
}
function LoadingTile() {
  return /* @__PURE__ */ jsxs("div", { className: "aia-tile aia-tile--loading", "data-name": "Product / Loading", children: [
    /* @__PURE__ */ jsx("div", { className: "aia-tile__media" }),
    /* @__PURE__ */ jsx("span", { className: "aia-bar", style: { width: "72%" } }),
    /* @__PURE__ */ jsx("span", { className: "aia-bar", style: { width: "88%" } })
  ] });
}
function OrderSummary() {
  return /* @__PURE__ */ jsxs("section", { className: "aia-order", "data-name": "Order summary", children: [
    /* @__PURE__ */ jsxs("p", { className: "aia-order__merchant", children: [
      /* @__PURE__ */ jsx(BrandMark, { brand: merchant, className: "aia-order__mark" }),
      merchant
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "aia-order__row", children: [
      /* @__PURE__ */ jsx(ProductImage, { className: "aia-order__thumb", src: bundle.image, alt: bundle.name }),
      /* @__PURE__ */ jsxs("span", { className: "aia-order__text", children: [
        /* @__PURE__ */ jsx("b", { children: bundle.name }),
        /* @__PURE__ */ jsx("small", { children: "Cream, mask, travel cleanser" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "aia-order__price", children: bundle.price })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "aia-order__row", children: [
      /* @__PURE__ */ jsx("span", { className: "aia-order__thumb aia-order__thumb--gift", children: /* @__PURE__ */ jsx(Glyph, { name: "gift", size: 18 }) }),
      /* @__PURE__ */ jsxs("span", { className: "aia-order__text", children: [
        /* @__PURE__ */ jsx("b", { children: promo.name }),
        /* @__PURE__ */ jsx("small", { children: promo.resolved })
      ] })
    ] })
  ] });
}
function Actions() {
  return /* @__PURE__ */ jsx("div", { className: "aia-actions", "data-name": "Message actions", children: ["copy", "up", "down", "share", "retry"].map((n) => /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Glyph, { name: n, size: 16 }) }, n)) });
}
function BrowserBar() {
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome", children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
      /* @__PURE__ */ jsx("span", { children: domain })
    ] })
  ] });
}
function GptHeader() {
  return /* @__PURE__ */ jsxs("header", { className: "aia-header", "data-name": "Header", children: [
    /* @__PURE__ */ jsxs("span", { className: "aia-model", children: [
      "ChatGPT",
      /* @__PURE__ */ jsx(Glyph, { name: "chevron", size: 16 })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "aia-header__end", children: [
      /* @__PURE__ */ jsxs("span", { className: "aia-share", children: [
        /* @__PURE__ */ jsx(Glyph, { name: "share", size: 16 }),
        "Share"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "dots", size: 18 }) })
    ] })
  ] });
}
function Composer({ send: send2, value }) {
  return /* @__PURE__ */ jsx("div", { className: "aia-composer", "data-name": "Composer", children: /* @__PURE__ */ jsxs("div", { className: "aia-composer__field", children: [
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "plus", size: 20 }) }),
    value ? /* @__PURE__ */ jsx("span", { className: "aia-composer__placeholder aia-composer__value", children: value }) : /* @__PURE__ */ jsx("span", { className: "aia-composer__placeholder", children: placeholder }),
    /* @__PURE__ */ jsx("span", { className: "aia-icon-btn", children: /* @__PURE__ */ jsx(Glyph, { name: "mic", size: 18 }) }),
    /* @__PURE__ */ jsx("span", { className: "aia-send", children: /* @__PURE__ */ jsx(Glyph, { name: send2, size: 18 }, send2) })
  ] }) });
}
const beats$4 = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: widget.welcome },
  { id: "prompts", type: "appear", ms: 1300 },
  { id: "pick-match", type: "appear", ms: 450 },
  { id: "expand", type: "appear", ms: 720 },
  { id: "start", type: "appear", ms: 350 },
  { id: "think-1", type: "think", labels: ["Thinking"] },
  { id: "intro", type: "text", text: widget.intro },
  { id: "q1", type: "appear", ms: 1700 },
  { id: "pick-q1", type: "appear", ms: 650 },
  { id: "answer-1", type: "appear", ms: 450 },
  { id: "think-2", type: "think", labels: ["Thinking"] },
  { id: "q2", type: "appear", ms: 1700 },
  { id: "pick-q2", type: "appear", ms: 650 },
  { id: "answer-2", type: "appear", ms: 450 },
  { id: "think-3", type: "think", labels: ["Thinking", "Finding evening gummies"] },
  { id: "result", type: "text", text: widget.result },
  { id: "resolved", type: "pause", ms: 600 }
];
const knockBeats = beats$4.map(
  (b) => b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 } : b.id === "prompts" ? { ...b, ms: 883 + 3600 } : b
);
function Quiz({ t, id, pickId, question, answer: answer2 }) {
  if (!t.reached(id)) return null;
  return /* @__PURE__ */ jsx("div", { className: "adjm-quiz", children: /* @__PURE__ */ jsx(AnswerRows, { question, selected: t.reached(pickId) ? answer2 : void 0 }) });
}
function Widgets({ t }) {
  const layerRef = useRef(null);
  const surfaceRef = useRef(null);
  const compactRef = useRef(null);
  const expandedRef = useRef(null);
  const viewportRef = useRef(null);
  const showCompact = t.reached("widget");
  const expanding = t.reached("expand");
  const composerDefault = useContext(StorybookComposerDefault);
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const compact = compactRef.current;
    const expanded = expandedRef.current;
    if (!showCompact || !layer || !surface || !compact || !expanded) return;
    const box = layer.getBoundingClientRect();
    const place = (name, el) => {
      const r = el.getBoundingClientRect();
      const insets = { t: r.top - box.top, r: box.right - r.right, b: box.bottom - r.bottom, l: r.left - box.left };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);
  useFollowLatest(viewportRef, {
    thread: ".adj-thread",
    pin: ".hm-ill-user-turn",
    clearance: 8,
    // v2: the pinned turn rests below the transcript's 12px top fade.
    pinOffset: composerDefault ? 16 : 0,
    index: t.index,
    reducedMotion: t.reducedMotion
  });
  return /* @__PURE__ */ jsxs("div", { className: cx("adjm-layer", showCompact && "adjm-layer--in"), ref: layerRef, children: [
    /* @__PURE__ */ jsx("div", { className: cx("adjm-surface", expanding && "adjm-surface--open"), ref: surfaceRef }),
    showCompact && composerDefault && /* @__PURE__ */ jsx(
      KnockBar,
      {
        barRef: compactRef,
        className: cx("adjm-compact", expanding && "adjm-compact--out"),
        knock: t.reached("prompts"),
        pressed: t.reached("pick-match") ? "Find My Match" : void 0,
        out: expanding
      }
    ),
    showCompact && !composerDefault && /* @__PURE__ */ jsx(
      Shell,
      {
        brand: brand$3,
        rootRef: compactRef,
        className: cx(
          "adj-widget adj-widget--compact adjm-compact",
          t.reached("prompts") && "adjm-compact--prompts",
          expanding && "adjm-compact--out"
        ),
        composer: composerDefault ? /* @__PURE__ */ jsx(ChatComposer, { value: widget.composer }) : /* @__PURE__ */ jsx(Fragment, {}),
        children: /* @__PURE__ */ jsxs(AssistantTurn, { children: [
          /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: /* @__PURE__ */ jsx(StaggerText, { text: widget.welcome }) }),
          /* @__PURE__ */ jsx(AiPills, { options: widget.prompts, selectedId: t.reached("pick-match") ? "match" : "" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      Shell,
      {
        brand: brand$3,
        rootRef: expandedRef,
        viewportRef,
        className: cx("adj-widget adj-widget--expanded adjm-expanded", expanding && "adjm-expanded--open"),
        composer: /* @__PURE__ */ jsx(ChatComposer, { value: widget.composer }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "adj-thread", children: [
            t.reached("start") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: widget.start }) }),
            t.reached("think-1") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-1" }),
              t.reached("intro") && /* @__PURE__ */ jsx(AssistantText, { text: widget.intro }),
              /* @__PURE__ */ jsx(Quiz, { t, id: "q1", pickId: "pick-q1", question: widget.q1, answer: widget.q1Answer })
            ] }),
            t.reached("answer-1") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText$1(widget.q1, widget.q1Answer) }) }),
            t.reached("think-2") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-2" }),
              /* @__PURE__ */ jsx(Quiz, { t, id: "q2", pickId: "pick-q2", question: widget.q2, answer: widget.q2Answer })
            ] }),
            t.reached("answer-2") && /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: answerText$1(widget.q2, widget.q2Answer) }) }),
            t.reached("think-3") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
              /* @__PURE__ */ jsx(Thinking, { t, id: "think-3" }),
              t.reached("result") && /* @__PURE__ */ jsx(AssistantText, { text: widget.result }),
              /* @__PURE__ */ jsx("div", { className: "adjm-enter", children: /* @__PURE__ */ jsx(Picks, { loading: !t.reached("resolved"), staggerResolve: true }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "adjm-spacer", "aria-hidden": "true" })
        ]
      }
    )
  ] });
}
function Scene$3({ t }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("adj adjm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store"), children: [
    /* @__PURE__ */ jsx(InstagramAd, {}),
    /* @__PURE__ */ jsx("div", { className: "adjm-plate" }),
    /* @__PURE__ */ jsx(Storefront, { widget: /* @__PURE__ */ jsx(Widgets, { t }) })
  ] });
}
function AdJourneyMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const composerDefault = useContext(StorybookComposerDefault);
  const t = useChatTimeline(composerDefault ? knockBeats : beats$4, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$3, { t }, t.runKey) });
}
const beats$3 = [
  { id: "home", type: "pause", ms: 1200 },
  { id: "open-search", type: "appear", ms: 1300 },
  { id: "pick", type: "appear", ms: 850 },
  { id: "takeover", type: "appear", ms: 420 },
  { id: "think", type: "think", labels: ["Thinking", "Finding sleep support"] },
  { id: "answer", type: "text", text: results.answer },
  { id: "picks", type: "load", ms: 900 },
  { id: "read", type: "pause", ms: 1300 },
  { id: "more", type: "appear", ms: 1900 },
  // The view moves back to the picks and settles before one is picked.
  { id: "focus-picks", type: "appear", ms: 500 },
  { id: "select", type: "appear", ms: 900 },
  { id: "pdp", type: "appear", ms: 900 }
];
function Crossword({ t, closing }) {
  const viewportRef = useRef(null);
  const picking = t.reached("select");
  const storybook = useContext(StorybookCardSkin);
  useFollowLatest(viewportRef, {
    thread: ".ais-thread",
    focus: t.reached("focus-picks") ? ".ais-picks" : void 0,
    index: t.index,
    reducedMotion: t.reducedMotion
  });
  return /* @__PURE__ */ jsx(
    Shell,
    {
      brand: brand$4,
      className: cx("ais-cw aism-cw", closing && "aism-cw--closing"),
      header: /* @__PURE__ */ jsx(ChatHeader, { brand: brand$4, showExpand: false }),
      composerValue: results.composer,
      viewportRef,
      children: /* @__PURE__ */ jsxs("div", { className: "ais-thread", children: [
        /* @__PURE__ */ jsx(UserTurn, { animateIn: true, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: results.query }) }),
        t.reached("think") && /* @__PURE__ */ jsxs(AssistantTurn, { children: [
          /* @__PURE__ */ jsx(Thinking, { t, id: "think" }),
          t.reached("answer") && /* @__PURE__ */ jsx(AssistantText, { text: results.answer }),
          t.reached("picks") && /* @__PURE__ */ jsx("div", { className: picking ? "ais-picks ais-picks--picking" : "ais-picks", children: storybook ? /* @__PURE__ */ jsx(Rail, { products: results.picks.map(toCard), loading: !t.passed("picks") }) : /* @__PURE__ */ jsx(ProductCollection, { children: results.picks.map((p, i) => /* @__PURE__ */ jsx("div", { className: picking && p.id === pdp.product.id ? "ais-pick ais-pick--selected" : "ais-pick", children: /* @__PURE__ */ jsx(CommerceProductCard, { product: toCard(p), loading: !t.passed("picks"), resolveDelayMs: i * 90 }) }, p.id)) }) }),
          t.reached("more") && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Enter, { children: /* @__PURE__ */ jsxs("div", { className: "ais-more aism-more", children: [
              /* @__PURE__ */ jsx("p", { className: "ais-label", children: results.moreLabel }),
              /* @__PURE__ */ jsx(ProductCollection, { children: results.more.map((g) => /* @__PURE__ */ jsx(RecommendationProductCard, { product: { id: g.id, name: g.name, price: g.price, image: g.image } }, g.id)) })
            ] }) }),
            /* @__PURE__ */ jsx(Enter, { delayMs: 260, children: /* @__PURE__ */ jsx(AiPills, { options: results.followUps, selectedId: "" }) })
          ] })
        ] })
      ] })
    }
  );
}
function Scene$2({ t }) {
  const viewportRef = useRef(null);
  const flightRef = useRef(null);
  const [flight, setFlight] = useState(null);
  const searchOpen = t.reached("open-search");
  const onPdp = t.reached("pdp");
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!onPdp || !viewport || t.reducedMotion) return;
    const card = viewport.querySelector(".ais-pick--selected .hm-ill-commerce-card__media img");
    const gallery = viewport.querySelector(".ais-gallery__main img");
    if (!card || !gallery) return;
    const box = viewport.getBoundingClientRect();
    const local = (r) => new DOMRect(r.left - box.left, r.top - box.top, r.width, r.height);
    setFlight({ from: local(card.getBoundingClientRect()), to: local(gallery.getBoundingClientRect()), src: gallery.currentSrc || gallery.src });
  }, [onPdp, t.reducedMotion]);
  useLayoutEffect(() => {
    const img = flightRef.current;
    if (!flight || !img) return;
    const frame = (r) => ({ left: `${r.x}px`, top: `${r.y}px`, width: `${r.width}px`, height: `${r.height}px` });
    const animation = img.animate([frame(flight.from), frame(flight.to)], {
      duration: 560,
      easing: "cubic-bezier(0.45, 0, 0.15, 1)",
      fill: "forwards"
    });
    animation.onfinish = () => setFlight(null);
    return () => animation.cancel();
  }, [flight]);
  return /* @__PURE__ */ jsx("div", { className: "ais aism", children: /* @__PURE__ */ jsxs("article", { className: "ais-store", children: [
    /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__dots", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm-ill-browser-chrome__address", children: [
        /* @__PURE__ */ jsx("img", { src: addressIcon, width: "10", height: "11", alt: "" }),
        /* @__PURE__ */ jsx("span", { className: onPdp ? "aism-address" : void 0, children: onPdp ? `${domain$2}/daily-sleep-gummies` : domain$2 }, onPdp ? "pdp" : "home")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ais-viewport", ref: viewportRef, children: [
      /* @__PURE__ */ jsxs("div", { className: "ais-page", children: [
        /* @__PURE__ */ jsx(Nav, { searching: searchOpen && !t.reached("takeover") }),
        /* @__PURE__ */ jsxs("div", { className: "ais-body", children: [
          onPdp ? /* @__PURE__ */ jsx("div", { className: cx("aism-pdp", flight && "aism-pdp--flying"), children: /* @__PURE__ */ jsx(Pdp, {}) }) : /* @__PURE__ */ jsx(Home, {}),
          /* @__PURE__ */ jsx(ContentFade, {}),
          searchOpen && /* @__PURE__ */ jsxs("div", { className: cx("aism-search", t.reached("takeover") && "aism-search--out"), children: [
            /* @__PURE__ */ jsx("div", { className: "ais-scrim" }),
            /* @__PURE__ */ jsx(SearchDropdown, { picked: t.reached("pick") })
          ] })
        ] })
      ] }),
      t.reached("takeover") && /* @__PURE__ */ jsx(Crossword, { t, closing: onPdp }),
      flight && /* @__PURE__ */ jsx("img", { ref: flightRef, className: "aism-flight", src: flight.src, alt: "" })
    ] })
  ] }) });
}
function AiSearchMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$3, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$2, { t }, t.runKey) });
}
function LoadingFrame({
  loading,
  radius = 12,
  className,
  resolveDelayMs,
  children
}) {
  const wasLoadingRef = useRef(loading);
  const showOverlay = loading || wasLoadingRef.current;
  useEffect(() => {
    wasLoadingRef.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("div", { className: ["hm-sell-loading-frame", className].filter(Boolean).join(" "), children: [
    children,
    showOverlay && /* @__PURE__ */ jsx(
      "div",
      {
        className: `hm-sell-loading-frame__overlay${loading ? "" : " hm-sell-loading-frame__overlay--hidden"}`,
        style: { borderRadius: radius, transitionDelay: resolveDelayMs ? `${resolveDelayMs}ms` : void 0 },
        children: /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: "100%", radius })
      }
    )
  ] });
}
const markup = (runs) => runs.map((r) => typeof r === "string" ? r : `**${r.b}**`).join("");
const productsReply = markup(calls.products.reply);
const offersReply = markup(calls.offers.reply);
const railBeats = [
  { id: "ask", type: "text", text: agent.ask },
  { id: "call-1", type: "appear", ms: 380 },
  { id: "think-1", type: "think", labels: ["Checking products", "Matching under $50"] },
  { id: "reply-1", type: "text", text: productsReply },
  { id: "picks", type: "load", ms: 600 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "follow", type: "text", text: agent.followUp },
  { id: "call-2", type: "appear", ms: 380 },
  { id: "think-2", type: "think", labels: ["Checking offers"] },
  { id: "reply-2", type: "text", text: offersReply },
  { id: "offer", type: "load", ms: 600 },
  { id: "read-2", type: "pause", ms: 900 },
  { id: "close", type: "text", text: agent.close }
];
function MotionRail({ t }) {
  const { products, offers } = calls;
  return /* @__PURE__ */ jsxs("ol", { className: "pa-rail", children: [
    t.reached("ask") && /* @__PURE__ */ jsx(AgentStep, { text: /* @__PURE__ */ jsx(StaggerText, { text: agent.ask }) }),
    t.reached("call-1") && /* @__PURE__ */ jsxs(CallStep, { topic: products.topic, returned: t.reached("reply-1"), pending: /* @__PURE__ */ jsx(Thinking, { t, id: "think-1" }), children: [
      /* @__PURE__ */ jsx("p", { className: "pa-call__reply", children: /* @__PURE__ */ jsx(RichStagger, { text: productsReply }) }),
      /* @__PURE__ */ jsx("div", { className: "pa-picks", children: picks$1.map((p, i) => /* @__PURE__ */ jsx(LoadingFrame, { loading: !t.passed("picks"), radius: 8, resolveDelayMs: i * 110, children: /* @__PURE__ */ jsx("div", { className: "pa-pick", children: /* @__PURE__ */ jsx(ProductReference, { image: p.image, alt: p.name, title: p.name, price: p.price, size: 44 }) }) }, p.id)) })
    ] }),
    t.reached("follow") && /* @__PURE__ */ jsx(AgentStep, { text: /* @__PURE__ */ jsx(StaggerText, { text: agent.followUp }) }),
    t.reached("call-2") && /* @__PURE__ */ jsxs(CallStep, { topic: offers.topic, returned: t.reached("reply-2"), pending: /* @__PURE__ */ jsx(Thinking, { t, id: "think-2" }), children: [
      /* @__PURE__ */ jsx("p", { className: "pa-call__reply", children: /* @__PURE__ */ jsx(RichStagger, { text: offersReply }) }),
      /* @__PURE__ */ jsx(LoadingFrame, { loading: !t.passed("offer"), radius: 8, children: /* @__PURE__ */ jsx(OfferCard, {}) })
    ] }),
    t.reached("close") && /* @__PURE__ */ jsx(AgentStep, { text: /* @__PURE__ */ jsx(StaggerText, { text: agent.close }), done: true })
  ] });
}
const answerText = markup(answer);
const beats$2 = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "type-ask", type: "compose", text: shopper.ask, leadMs: 300 },
  { id: "sent", type: "appear", ms: 650 },
  { id: "panel", type: "appear", ms: 420 },
  ...railBeats,
  { id: "hold", type: "pause", ms: 900 },
  { id: "collapse", type: "appear", ms: 480 },
  { id: "answer", type: "text", text: answerText },
  { id: "answer-cards", type: "appear", ms: 600 }
];
function Chevron({ open }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cx("pa2-chevron pa2m-chevron", open && "pa2m-chevron--open"),
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M3 4.5L6 7.5l3-3" })
    }
  );
}
function ActivityPanel({ t }) {
  const bodyRef = useRef(null);
  const scrollRef = useRef(null);
  const collapsing = t.reached("collapse");
  const lookups = t.reached("call-2") ? 2 : 1;
  useFollowLatest(scrollRef, { thread: ".pa-rail", index: t.index, reducedMotion: t.reducedMotion });
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!collapsing || !body || t.reducedMotion) return;
    const animation = body.animate(
      [{ height: `${body.offsetHeight}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
      { duration: 420, easing: "cubic-bezier(0.45, 0, 0.15, 1)", fill: "forwards" }
    );
    return () => animation.cancel();
  }, [collapsing, t.reducedMotion]);
  const title = collapsing ? panel.done : panel.open;
  return /* @__PURE__ */ jsxs("section", { className: cx("pa2-panel pa2m-panel", collapsing && "pa2-panel--collapsed"), "data-name": "Activity / Crossword", children: [
    /* @__PURE__ */ jsxs("header", { className: "pa2-panel__header", children: [
      /* @__PURE__ */ jsx("span", { className: "pa-node pa-node--crossword", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: crosswordMark, alt: "" }) }),
      /* @__PURE__ */ jsx("span", { className: "pa2-panel__title pa2m-swap", children: title }, title),
      /* @__PURE__ */ jsxs("span", { className: "pa2-panel__count pa2m-swap", children: [
        "· ",
        panel.lookups(lookups)
      ] }, lookups),
      /* @__PURE__ */ jsx(Chevron, { open: !collapsing })
    ] }),
    !t.reached("answer") && /* @__PURE__ */ jsx("div", { className: "pa2-panel__body pa2m-body", ref: bodyRef, children: /* @__PURE__ */ jsx("div", { className: "pa2m-scroll", ref: scrollRef, children: /* @__PURE__ */ jsx(MotionRail, { t }) }) })
  ] });
}
function Scene$1({ t }) {
  const typed = t.composer?.value;
  const working = t.reached("sent") && !t.reached("answer");
  return /* @__PURE__ */ jsx("figure", { className: cx("pa pa2 pam pa2m", t.reached("close") && "pam--done"), "data-name": "Personal agents V2 / Motion", children: /* @__PURE__ */ jsxs("article", { className: "pa-window", children: [
    /* @__PURE__ */ jsxs("header", { className: "pa-header", children: [
      /* @__PURE__ */ jsxs("span", { className: "pa-header__title", children: [
        /* @__PURE__ */ jsx("span", { className: "pa-node pa-node--agent", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 12 12", width: "12", height: "12", fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
          /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "4.25" }),
          /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "1.6", fill: "currentColor", stroke: "none" })
        ] }) }),
        agent.label
      ] }),
      working && /* @__PURE__ */ jsxs("span", { className: cx("pa-status pa2m-status", t.reached("collapse") && "pa2m-status--out"), children: [
        /* @__PURE__ */ jsx("span", { className: "pa-status__dot", "aria-hidden": "true" }),
        agent.status
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pa2-chat", children: [
      t.passed("type-ask") && /* @__PURE__ */ jsx("p", { className: "pa2-bubble pa2m-rise", children: shopper.ask }),
      t.reached("panel") && /* @__PURE__ */ jsx(ActivityPanel, { t }),
      t.reached("answer") && /* @__PURE__ */ jsxs("div", { className: "pa2-answer", "data-name": "Turn / Agent answer", children: [
        /* @__PURE__ */ jsx("p", { className: "pa-call__reply", children: /* @__PURE__ */ jsx(RichStagger, { text: answerText }) }),
        t.reached("answer-cards") && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pa2m-rise", children: /* @__PURE__ */ jsx(PickList, {}) }),
          /* @__PURE__ */ jsx("div", { className: "pa2m-rise", style: { animationDelay: "90ms" }, children: /* @__PURE__ */ jsx(OfferCard, {}) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pa2-composer", "data-name": "Composer", children: [
      /* @__PURE__ */ jsx("span", { className: cx("pa2-composer__placeholder", typed && "pa2m-typed"), children: typed ? /* @__PURE__ */ jsxs(Fragment, { children: [
        typed,
        /* @__PURE__ */ jsx("span", { className: "pa2m-caret" })
      ] }) : placeholder$1 }),
      /* @__PURE__ */ jsx("span", { className: cx("pa2-composer__send", t.reached("sent") && !t.passed("sent") && "pa2m-send"), "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M12 19V5M6.5 10.5L12 5l5.5 5.5" }) }) })
    ] })
  ] }) });
}
function PersonalAgentsV2Motion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$2, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene$1, { t }, t.runKey) });
}
const STREAM_MS_PER_WORD = 34;
const TOKEN_FADE_MS = 280;
const plain = (runs) => runs.map((r) => typeof r === "string" ? r : r.b).join("");
const words = (runs) => plain(runs).split(/\s+/).filter(Boolean).length;
const streamMs = (runs) => words(runs) * STREAM_MS_PER_WORD + TOKEN_FADE_MS;
const user = (i) => {
  const turn = transcript[i];
  return turn.role === "user" ? turn.text : "";
};
const reply = (i) => {
  const turn = transcript[i];
  return turn.role === "assistant" ? turn.text : [];
};
const beats$1 = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: user(0), leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 2e3 },
  { id: "reply-1", type: "appear", ms: streamMs(reply(1)) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 1700 },
  { id: "choose", type: "compose", text: user(2), leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1e3 },
  { id: "reply-2", type: "appear", ms: streamMs(reply(3)) },
  { id: "set", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 1900 },
  { id: "take", type: "compose", text: user(4), leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "reply-3", type: "appear", ms: streamMs(reply(5)) },
  { id: "order", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 }
];
function StreamText({ runs, play, msPerWord = STREAM_MS_PER_WORD }) {
  let index = 0;
  const tokens = (text) => text.split(/(\s+)/).map((piece, i) => {
    if (!piece) return null;
    if (/^\s+$/.test(piece)) return /* @__PURE__ */ jsx(Fragment$1, { children: piece }, i);
    const delay = index++ * msPerWord;
    return /* @__PURE__ */ jsx("span", { className: "aiam-token", style: { animationDelay: `${delay}ms` }, children: piece }, i);
  });
  return /* @__PURE__ */ jsx("p", { className: cx("aia-reply aiam-stream", play && "aiam-stream--play"), children: runs.map((r, i) => typeof r === "string" ? /* @__PURE__ */ jsx(Fragment$1, { children: tokens(r) }, i) : /* @__PURE__ */ jsx("strong", { children: tokens(r.b) }, i)) });
}
function TileSlot({ loading, delayMs = 0, children }) {
  const wasLoading = useRef(loading);
  const showCover = loading || wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  return /* @__PURE__ */ jsxs("div", { className: "aiam-tile-slot", children: [
    children,
    showCover && /* @__PURE__ */ jsx("div", { className: cx("aiam-tile-cover", !loading && "aiam-tile-cover--hidden"), style: { transitionDelay: `${delayMs}ms` }, children: /* @__PURE__ */ jsx(LoadingTile, {}) })
  ] });
}
function Reserved({ show, className, children }) {
  return /* @__PURE__ */ jsx("div", { className: show ? className : "aiam-reserve", "aria-hidden": !show, children });
}
function ReplySlot({ t, runs, replyId, statusId }) {
  const streaming = t.reached(replyId);
  return /* @__PURE__ */ jsxs("div", { className: "aiam-slot", children: [
    /* @__PURE__ */ jsx(StreamText, { runs, play: streaming }),
    !streaming && (statusId && t.reached(statusId) ? /* @__PURE__ */ jsx("p", { className: "aia-status aiam-status", children: status }) : /* @__PURE__ */ jsx("span", { className: "aiam-dot" }))
  ] });
}
function Thread$1({ t }) {
  return /* @__PURE__ */ jsxs("div", { className: "aia-thread", children: [
    t.passed("ask") && /* @__PURE__ */ jsx("div", { className: "aia-turn aia-turn--user aiam-send", children: /* @__PURE__ */ jsx("p", { className: "aia-bubble", children: user(0) }) }),
    t.reached("wait-1") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(ReplySlot, { t, runs: reply(1), replyId: "reply-1", statusId: "search" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("search"), className: "aiam-fade", children: /* @__PURE__ */ jsx("div", { className: "aia-carousel", children: picks.map((p, i) => /* @__PURE__ */ jsx(TileSlot, { loading: !t.reached("tiles"), delayMs: i * 110, children: /* @__PURE__ */ jsx(ProductTile, { product: p }) }, p.id)) }) })
    ] }),
    t.passed("choose") && /* @__PURE__ */ jsx("div", { className: "aia-turn aia-turn--user aiam-send", children: /* @__PURE__ */ jsx("p", { className: "aia-bubble", children: user(2) }) }),
    t.reached("wait-2") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(ReplySlot, { t, runs: reply(3), replyId: "reply-2" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("reply-2"), className: "aiam-fade", children: /* @__PURE__ */ jsx(TileSlot, { loading: !t.reached("set"), children: /* @__PURE__ */ jsx(ProductTile, { product: bundle, wide: true }) }) })
    ] }),
    t.passed("take") && /* @__PURE__ */ jsx("div", { className: "aia-turn aia-turn--user aiam-send", children: /* @__PURE__ */ jsx("p", { className: "aia-bubble", children: user(4) }) }),
    t.reached("wait-3") && /* @__PURE__ */ jsxs("div", { className: "aia-turn aia-turn--assistant", children: [
      /* @__PURE__ */ jsx(ReplySlot, { t, runs: reply(5), replyId: "reply-3" }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("order"), className: "aiam-rise", children: /* @__PURE__ */ jsx(OrderSummary, {}) }),
      /* @__PURE__ */ jsx(Reserved, { show: t.reached("done"), className: "aiam-fade", children: /* @__PURE__ */ jsx(Actions, {}) })
    ] })
  ] });
}
function Scene({ t }) {
  const scrollRef = useRef(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", index: t.index, reducedMotion: t.reducedMotion });
  const generating = t.passed("ask") && !t.reached("read-1") || t.passed("choose") && !t.reached("read-2") || t.passed("take") && !t.reached("done");
  const typed = t.composer?.value;
  const send2 = generating ? "stop" : typed ? "send" : "voice";
  return /* @__PURE__ */ jsx("div", { className: "aia-canvas", children: /* @__PURE__ */ jsxs("div", { className: "aia aiam", "data-name": "AI Assistants / Motion", children: [
    /* @__PURE__ */ jsx(BrowserBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "aia-gpt", "data-name": "ChatGPT", children: [
      /* @__PURE__ */ jsx(GptHeader, {}),
      /* @__PURE__ */ jsx("div", { className: "aia-scroll", "data-name": "Conversation", ref: scrollRef, children: /* @__PURE__ */ jsx(Thread$1, { t }) }),
      /* @__PURE__ */ jsx(
        Composer,
        {
          send: send2,
          value: typed ? /* @__PURE__ */ jsxs(Fragment, { children: [
            typed,
            /* @__PURE__ */ jsx("span", { className: "aiam-caret" })
          ] }) : void 0
        }
      )
    ] })
  ] }) });
}
function AiAssistantsMotion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats$1, landed && fontsReady);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Scene, { t }, t.runKey) });
}
({
  eyebrow: catalog.goodwellSleep60.title
});
const insightsBackground = "/images/landing/home-v2/assets/insights-background-XsNT8ufi.webp";
function InsightFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-insight-frame-scale", children: /* @__PURE__ */ jsxs("div", { className: "hm-ill-insight-frame", children: [
    /* @__PURE__ */ jsx("img", { className: "hm-ill-insight-frame__background", src: insightsBackground, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "hm-ill-insight-frame__content", children })
  ] }) });
}
function Thread({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "hm-ill-thread", children });
}
function AttributeRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "hm-ill-attribute-row", children: [
    /* @__PURE__ */ jsx("span", { className: "hm-ill-attribute-row__label", children: label }),
    /* @__PURE__ */ jsx("span", { className: "hm-ill-attribute-row__value", children: value })
  ] });
}
const LANDING_HOLD_MS = 700;
const CHAR_INTERVAL_MS$4 = 26;
const TYPED_HOLD_MS = 260;
const SEND_PRESS_MS = 160;
const EXPAND_MS = 620;
const THINKING_STAGE_1_MS$4 = 300;
const THINKING_STAGE_2_MS$4 = 500;
const THINKING_EXIT_MS$4 = 150;
const REPLY_STAGGER_MS$4 = 45;
const REPLY_WORD_ANIM_MS$4 = 220;
const REPLY_SETTLE_MS$4 = 150;
const CARD_SKELETON_HOLD_MS$1 = 550;
function prefersReducedMotion$4() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs$4(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS$4 + REPLY_WORD_ANIM_MS$4 + REPLY_SETTLE_MS$4;
}
function useAskInsightPlayback(query, result, active, landingHoldMs = LANDING_HOLD_MS) {
  const reducedMotion = useRef(prefersReducedMotion$4()).current;
  const [phase, setPhase] = useState(reducedMotion ? "done" : "landing");
  const [runKey, setRunKey] = useState(0);
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");
  useEffect(() => {
    if (reducedMotion) return;
    setPhase("landing");
    setComposerValue("");
    setStatusLabel("Thinking");
    if (active) setRunKey((k) => k + 1);
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion || !active) return;
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    const clear = () => timeouts.forEach(window.clearTimeout);
    if (phase === "landing") {
      let cancelTyping = () => {
      };
      after(landingHoldMs, () => {
        cancelTyping = revealText(query, {
          msPerStep: CHAR_INTERVAL_MS$4,
          onTick: setComposerValue,
          onDone: () => after(TYPED_HOLD_MS, () => setPhase("sending"))
        });
      });
      return () => {
        cancelTyping();
        clear();
      };
    }
    if (phase === "sending") {
      after(SEND_PRESS_MS, () => setPhase("expanding"));
      return clear;
    }
    if (phase === "expanding") {
      after(EXPAND_MS, () => setPhase("thinking"));
      return clear;
    }
    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS$4, () => setStatusLabel("Finding the right cohort"));
      after(THINKING_STAGE_1_MS$4 + THINKING_STAGE_2_MS$4, () => setPhase("thinkingExit"));
      return clear;
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$4, () => setPhase("replying"));
      return clear;
    }
    if (phase === "replying") {
      after(replyRevealMs$4(result), () => setPhase("cardLoading"));
      return clear;
    }
    if (phase === "cardLoading") {
      after(CARD_SKELETON_HOLD_MS$1, () => setPhase("done"));
      return clear;
    }
    return void 0;
  }, [phase, active, runKey, reducedMotion, query, result, landingHoldMs]);
  return { phase, runKey, composerValue, statusLabel, reducedMotion };
}
const script$1 = {
  brand: "Aurelia",
  query: "Find people who reached checkout but didn't purchase in the last 7 days.",
  result: "3,284 people reached checkout. 2,140 are still deciding. Most dropped after seeing shipping costs."
};
const landing = {
  headline: "What insight do you want run?",
  suggestions: [
    { icon: "usersThree", text: "Find the best user to send campaign to" },
    { icon: "shoppingCart", text: "Find repeat cart abandoners" },
    { icon: "funnel", text: "Segment apparel checkout abandoners" },
    { icon: "bell", text: "Announce a new launch" }
  ]
};
const cohort = {
  title: "412 high-intent shoppers",
  rows: [
    { label: "Returned", value: "3+ times" },
    { label: "Avg. cart", value: "$186" },
    { label: "Status", value: "Items still in cart" }
  ],
  cta: "View this group"
};
function AskInsight({ landingHoldMs, growComposer = false } = {}) {
  const stageRef = useRef(null);
  const shellRef = useRef(null);
  const composerRef = useRef(null);
  const inputRef = useRef(null);
  const [inputHeight, setInputHeight] = useState(0);
  const active = useLandedOnScreen(stageRef);
  const { phase, runKey, composerValue, statusLabel, reducedMotion } = useAskInsightPlayback(
    script$1.query,
    script$1.result,
    active,
    landingHoldMs
  );
  const [rects, setRects] = useState(null);
  const onLanding = phase === "landing" || phase === "sending";
  const expanded = !onLanding;
  const isSent = reducedMotion || expanded && phase !== "expanding";
  const showThinking = !reducedMotion && (phase === "thinking" || phase === "thinkingExit");
  const showReply = reducedMotion || phase === "replying" || phase === "cardLoading" || phase === "done";
  const showCard = reducedMotion || phase === "cardLoading" || phase === "done";
  const cardLoading = !reducedMotion && phase === "cardLoading";
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const shell = shellRef.current;
    const pill = shell?.querySelector(".hm-ill-chat-composer");
    if (!stage || !shell || !pill) return;
    const composer = composerRef.current;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const scale = stage.getBoundingClientRect().width / stage.offsetWidth || 1;
      const toLocal = (el, origin) => {
        const r = el.getBoundingClientRect();
        const o = origin.getBoundingClientRect();
        return {
          top: (r.top - o.top) / scale,
          left: (r.left - o.left) / scale,
          width: r.width / scale,
          height: r.height / scale
        };
      };
      const shellRect = toLocal(shell, stage);
      setRects({
        composer: composer?.parentElement ? toLocal(composer, composer.parentElement) : shellRect,
        shell: shellRect,
        pill: toLocal(pill, stage)
      });
    };
    measure();
    document.fonts?.ready?.then(() => {
      measure();
      requestAnimationFrame(measure);
    });
    return () => {
      cancelled = true;
    };
  }, [runKey]);
  const settled = expanded || reducedMotion;
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!growComposer || !input) return;
    const observer = new ResizeObserver(() => setInputHeight(input.offsetHeight));
    observer.observe(input);
    return () => observer.disconnect();
  }, [growComposer, runKey]);
  const growing = growComposer && !settled && rects !== null;
  const surfaceRect = rects ? settled ? rects.shell : { ...rects.composer, height: growing ? Math.max(rects.composer.height, inputHeight) : rects.composer.height } : null;
  const inputRect = rects ? settled ? rects.pill : rects.composer : null;
  const stageClass = [
    "ask-stage",
    expanded && "ask-stage--expanded",
    reducedMotion && "ask-stage--static",
    !rects && "ask-stage--unmeasured"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(InsightFrame, { children: /* @__PURE__ */ jsx("div", { className: stageClass, ref: stageRef, children: /* @__PURE__ */ jsxs("div", { className: "ask-stage__run", children: [
    !reducedMotion && /* @__PURE__ */ jsxs("div", { className: "ask-landing", "aria-hidden": expanded, children: [
      /* @__PURE__ */ jsx("p", { className: "ask-landing__headline", children: landing.headline }),
      /* @__PURE__ */ jsx("div", { className: "ask-landing__composer", ref: composerRef }),
      /* @__PURE__ */ jsx("div", { className: "ask-landing__chips", children: landing.suggestions.map((s) => /* @__PURE__ */ jsxs("span", { className: "ask-landing__chip", children: [
        /* @__PURE__ */ jsx(Icon, { name: s.icon, size: 16 }),
        s.text
      ] }, s.text)) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "ask-surface",
        style: surfaceRect ? { top: surfaceRect.top, left: surfaceRect.left, width: surfaceRect.width, height: surfaceRect.height } : void 0
      }
    ),
    /* @__PURE__ */ jsx(Shell, { brand: script$1.brand, width: 450, height: 515, rootRef: shellRef, className: "ask-shell", children: /* @__PURE__ */ jsxs(Thread, { children: [
      isSent && /* @__PURE__ */ jsx(UserTurn, { animateIn: !reducedMotion, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: script$1.query }) }),
      isSent && /* @__PURE__ */ jsxs(AssistantTurn, { className: "hm-ill-ai-reply-turn", animateIn: !reducedMotion, children: [
        showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
        showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: reducedMotion ? script$1.result : /* @__PURE__ */ jsx(StaggerText, { text: script$1.result }) }),
        showCard && /* @__PURE__ */ jsxs("div", { className: "hm-ill-ai-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-ai-card__header", children: [
            /* @__PURE__ */ jsxs("div", { className: "hm-ill-ai-card__heading", children: [
              /* @__PURE__ */ jsx(Icon, { name: "insight", size: 14 }),
              /* @__PURE__ */ jsx("p", { className: "hm-ill-ai-card__title", children: cohort.title })
            ] }),
            /* @__PURE__ */ jsx(Icon, { name: "caretDown", size: 12 })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hm-ill-ai-card__rows", children: cohort.rows.map((row) => /* @__PURE__ */ jsx(AttributeRow, { label: row.label, value: row.value }, row.label)) }),
          /* @__PURE__ */ jsx(Button, { appearance: "primary", label: cohort.cta }),
          !reducedMotion && /* @__PURE__ */ jsxs(
            "div",
            {
              className: `hm-ill-ai-card__skeleton-overlay${cardLoading ? "" : " hm-ill-ai-card__skeleton-overlay--hidden"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "hm-ill-ai-card__skeleton-row", children: [
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 140, height: 15, radius: 4 }),
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 12, height: 12, radius: 3 })
                ] }),
                cohort.rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "hm-ill-ai-card__skeleton-row", children: [
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 70, height: 11, radius: 4 }),
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 60, height: 11, radius: 4 })
                ] }, row.label)),
                /* @__PURE__ */ jsx(SkeletonBlock, { width: "100%", height: 29, radius: 4.868 })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: inputRef,
        className: ["ask-input", composerValue && "ask-input--ready", growing && "ask-input--grow"].filter(Boolean).join(" "),
        style: inputRect ? {
          top: inputRect.top,
          left: inputRect.left,
          width: inputRect.width,
          height: growing ? void 0 : inputRect.height,
          minHeight: growing ? inputRect.height : void 0,
          borderRadius: settled ? inputRect.height / 2 : void 0
        } : void 0,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "ask-input__text", children: [
            !reducedMotion && /* @__PURE__ */ jsxs("span", { className: "ask-input__query", children: [
              composerValue,
              phase === "landing" && /* @__PURE__ */ jsx("span", { className: "hm-ill-chat-composer__caret" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "ask-input__placeholder", children: "Ask anything..." })
          ] }),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              icon: "send",
              label: "Send",
              variant: "accent",
              className: phase === "sending" ? "hm-ill-icon-button--pressed" : void 0
            }
          )
        ]
      }
    )
  ] }, runKey) }) });
}
const ACTIONS_REVEAL_MS = 150;
const PAUSE_BEFORE_QUESTION_MS = 700;
const THINKING_STAGE_1_MS$3 = 300;
const THINKING_STAGE_2_MS$3 = 500;
const THINKING_EXIT_MS$3 = 150;
const CHAR_INTERVAL_MS$3 = 26;
const REPLY_STAGGER_MS$3 = 45;
const REPLY_WORD_ANIM_MS$3 = 220;
const REPLY_SETTLE_MS$3 = 150;
const FOOTNOTE_SKELETON_HOLD_MS = 550;
function prefersReducedMotion$3() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
function replyRevealMs$3(...parts) {
  const count = parts.reduce((sum, part) => sum + wordCount(part), 0);
  return count * REPLY_STAGGER_MS$3 + REPLY_WORD_ANIM_MS$3 + REPLY_SETTLE_MS$3;
}
function useConversationToRevenuePlayback(offerMessage, question, journeyNote, statement) {
  const reducedMotion = useRef(prefersReducedMotion$3()).current;
  const [phase, setPhase] = useState(reducedMotion ? "done" : "offerReplying");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  useEffect(() => {
    if (reducedMotion) return;
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (phase === "offerReplying") {
      after(replyRevealMs$3(offerMessage), () => setPhase("actionsReveal"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "actionsReveal") {
      after(ACTIONS_REVEAL_MS, () => setPhase("pauseBeforeQuestion"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "pauseBeforeQuestion") {
      after(PAUSE_BEFORE_QUESTION_MS, () => setPhase("composing"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(question, {
        msPerStep: CHAR_INTERVAL_MS$3,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS$3, () => setStatusLabel("Tracing the order"));
      after(THINKING_STAGE_1_MS$3 + THINKING_STAGE_2_MS$3, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$3, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      after(replyRevealMs$3(journeyNote, statement), () => setPhase("footnoteLoading"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "footnoteLoading") {
      after(FOOTNOTE_SKELETON_HOLD_MS, () => setPhase("done"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [phase, reducedMotion, offerMessage, question, journeyNote, statement]);
  return {
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    done: phase === "done"
  };
}
const brand$1 = "Aurelia";
const context = { ...catalog.aurellePendant };
const offerTurn = {
  assistantMessage: "20% off orders above $100. You're eligible. Want to use it?",
  primaryAction: "Use it",
  secondaryAction: "Not now"
};
const questionTurn = {
  userMessage: "When does the next drop go live?"
};
const attribution = {
  journeyNote: "From there, they clicked the offer, checked out, and spent $186.",
  statement: "This conversation influenced $186 in revenue.",
  footnote: { label: "Crossword-assisted \nrevenue this week", value: "$24,680" }
};
function ConversationToRevenue() {
  const { phase, composerValue, composerTyping, statusLabel, reducedMotion, done } = useConversationToRevenuePlayback(
    offerTurn.assistantMessage,
    questionTurn.userMessage,
    attribution.journeyNote,
    attribution.statement
  );
  const showActions = reducedMotion || phase !== "offerReplying";
  const actionsJustEntered = !reducedMotion && phase === "actionsReveal";
  const isQuestionSent = reducedMotion || !["offerReplying", "actionsReveal", "pauseBeforeQuestion", "composing"].includes(phase);
  const showThinking = !reducedMotion && (phase === "thinking" || phase === "thinkingExit");
  const showOutcome = reducedMotion || isQuestionSent && phase !== "thinking" && phase !== "thinkingExit";
  const footnoteLoading = !reducedMotion && phase === "footnoteLoading";
  const showFootnote = reducedMotion || phase === "footnoteLoading" || phase === "done";
  return /* @__PURE__ */ jsx(InsightFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      brand: brand$1,
      width: 450,
      height: 515,
      composerValue: !reducedMotion && phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: !reducedMotion && phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsxs(Thread, { children: [
        /* @__PURE__ */ jsxs(AssistantTurn, { className: "hm-ill-ctr-offer-turn", children: [
          /* @__PURE__ */ jsx(
            ProductReference,
            {
              image: context.image,
              alt: context.title,
              brand: context.brand,
              title: context.title,
              price: context.price
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hm-ill-ctr-offer", children: [
            /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: reducedMotion ? offerTurn.assistantMessage : /* @__PURE__ */ jsx(StaggerText, { text: offerTurn.assistantMessage }) }),
            showActions && /* @__PURE__ */ jsxs("div", { className: `hm-ill-ctr-actions${actionsJustEntered ? " hm-ill-ctr-actions--enter" : ""}`, children: [
              /* @__PURE__ */ jsx(Button, { appearance: "primary", label: offerTurn.primaryAction }),
              /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: offerTurn.secondaryAction })
            ] })
          ] })
        ] }),
        isQuestionSent && /* @__PURE__ */ jsx(UserTurn, { className: "hm-ill-ctr-question-turn", animateIn: !reducedMotion, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: questionTurn.userMessage }) }),
        isQuestionSent && /* @__PURE__ */ jsxs(AssistantTurn, { className: "hm-ill-ctr-outcome-turn", animateIn: !reducedMotion, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showOutcome && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: reducedMotion ? /* @__PURE__ */ jsxs(Fragment, { children: [
            attribution.journeyNote,
            " ",
            /* @__PURE__ */ jsx("strong", { children: attribution.statement })
          ] }) : /* @__PURE__ */ jsx(StaggerText, { text: attribution.journeyNote, boldText: attribution.statement }) }),
          showFootnote && /* @__PURE__ */ jsxs("div", { className: "hm-ill-ctr-footnote", children: [
            /* @__PURE__ */ jsx(AttributeRow, { label: attribution.footnote.label, value: attribution.footnote.value }),
            !reducedMotion && (footnoteLoading || done) && /* @__PURE__ */ jsxs(
              "div",
              {
                className: `hm-ill-ctr-footnote__skeleton-overlay${footnoteLoading ? "" : " hm-ill-ctr-footnote__skeleton-overlay--hidden"}`,
                children: [
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 120, height: 18, radius: 4 }),
                  /* @__PURE__ */ jsx(SkeletonBlock, { width: 90, height: 28, radius: 6 })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  ) });
}
const THINKING_STAGE_1_MS$2 = 300;
const THINKING_STAGE_2_MS$2 = 500;
const THINKING_EXIT_MS$2 = 150;
const CHAR_INTERVAL_MS$2 = 26;
const REPLY_STAGGER_MS$2 = 45;
const REPLY_WORD_ANIM_MS$2 = 220;
const REPLY_SETTLE_MS$2 = 150;
const CARD_SKELETON_HOLD_MS = 550;
const ASK_REVEAL_MS = 150;
function prefersReducedMotion$2() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs$2(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS$2 + REPLY_WORD_ANIM_MS$2 + REPLY_SETTLE_MS$2;
}
function useAnonymousTrafficPlayback(question, insight2) {
  const reducedMotion = useRef(prefersReducedMotion$2()).current;
  const [phase, setPhase] = useState(reducedMotion ? "done" : "composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  useEffect(() => {
    if (reducedMotion) return;
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(question, {
        msPerStep: CHAR_INTERVAL_MS$2,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS$2, () => setStatusLabel("Scanning anonymous sessions"));
      after(THINKING_STAGE_1_MS$2 + THINKING_STAGE_2_MS$2, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$2, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      after(replyRevealMs$2(insight2), () => setPhase("cardLoading"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "cardLoading") {
      after(CARD_SKELETON_HOLD_MS, () => setPhase("askReveal"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "askReveal") {
      after(ASK_REVEAL_MS, () => setPhase("done"));
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [phase, reducedMotion, question, insight2]);
  return {
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    done: phase === "done"
  };
}
const script = {
  brand: "Aurelia",
  question: "We're seeing a spike in visitors we can't identify. Anything useful there?",
  insight: "340 anonymous sessions this week. 62% came from a Reddit thread comparing skincare brands."
};
const journeyCard = {
  title: "Reddit, Bestsellers, Vitamin C Serum, Moisturiser",
  row: { label: "Returned at least twice", value: "118" }
};
const action = {
  statement: "Want me to offer returning visitors 10% off next time?",
  cta: "Create offer"
};
function AnonymousTraffic() {
  const { phase, composerValue, composerTyping, statusLabel, reducedMotion } = useAnonymousTrafficPlayback(
    script.question,
    script.insight
  );
  const isSent = reducedMotion || phase !== "composing";
  const showThinking = !reducedMotion && (phase === "thinking" || phase === "thinkingExit");
  const showReply = reducedMotion || phase !== "composing" && phase !== "thinking" && phase !== "thinkingExit";
  const showCard = reducedMotion || phase === "cardLoading" || phase === "askReveal" || phase === "done";
  const cardLoading = !reducedMotion && phase === "cardLoading";
  const cardResolved = reducedMotion || phase === "askReveal" || phase === "done";
  const showAsk = reducedMotion || phase === "askReveal" || phase === "done";
  const askJustEntered = !reducedMotion && phase === "askReveal";
  return /* @__PURE__ */ jsx(InsightFrame, { children: /* @__PURE__ */ jsx(
    Shell,
    {
      brand: script.brand,
      width: 450,
      height: 515,
      composerValue: !reducedMotion && phase === "composing" && composerValue ? composerValue : void 0,
      composerTyping: !reducedMotion && phase === "composing" && composerTyping,
      children: /* @__PURE__ */ jsxs(Thread, { children: [
        isSent && /* @__PURE__ */ jsx(UserTurn, { animateIn: !reducedMotion, children: /* @__PURE__ */ jsx(ChatMessage, { role: "user", text: script.question }) }),
        isSent && /* @__PURE__ */ jsxs(AssistantTurn, { animateIn: !reducedMotion, children: [
          showThinking && /* @__PURE__ */ jsx(AiStatus, { label: statusLabel, visible: phase === "thinking" }),
          showReply && /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", children: reducedMotion ? script.insight : /* @__PURE__ */ jsx(StaggerText, { text: script.insight }) }),
          showCard && /* @__PURE__ */ jsxs("div", { className: "hm-ill-at-card", children: [
            /* @__PURE__ */ jsxs("div", { className: "hm-ill-at-card__header", children: [
              /* @__PURE__ */ jsxs("div", { className: "hm-ill-at-card__heading", children: [
                /* @__PURE__ */ jsx(Icon, { name: "insight", size: 14 }),
                /* @__PURE__ */ jsx("p", { className: "hm-ill-at-card__title", children: journeyCard.title })
              ] }),
              /* @__PURE__ */ jsx(Icon, { name: "caretDown", size: 12 })
            ] }),
            /* @__PURE__ */ jsx(AttributeRow, { label: journeyCard.row.label, value: journeyCard.row.value }),
            !reducedMotion && (cardLoading || cardResolved) && /* @__PURE__ */ jsxs(
              "div",
              {
                className: `hm-ill-at-card__skeleton-overlay${cardLoading ? "" : " hm-ill-at-card__skeleton-overlay--hidden"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "hm-ill-at-card__skeleton-row", children: [
                    /* @__PURE__ */ jsx(SkeletonBlock, { width: 180, height: 15, radius: 4 }),
                    /* @__PURE__ */ jsx(SkeletonBlock, { width: 12, height: 12, radius: 3 })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "hm-ill-at-card__skeleton-row", children: [
                    /* @__PURE__ */ jsx(SkeletonBlock, { width: 110, height: 11, radius: 4 }),
                    /* @__PURE__ */ jsx(SkeletonBlock, { width: 30, height: 11, radius: 4 })
                  ] })
                ]
              }
            )
          ] }),
          showAsk && /* @__PURE__ */ jsxs("div", { className: `hm-ill-at-ask${askJustEntered ? " hm-ill-at-ask--enter" : ""}`, children: [
            /* @__PURE__ */ jsx(ChatMessage, { role: "assistant", text: action.statement }),
            /* @__PURE__ */ jsx(Button, { appearance: "primary", label: action.cta })
          ] })
        ] })
      ] })
    }
  ) });
}
function Layer({ children }) {
  return /* @__PURE__ */ jsx(StorybookCardSkin.Provider, { value: true, children: /* @__PURE__ */ jsx(StorybookComposerDefault.Provider, { value: true, children: /* @__PURE__ */ jsx("div", { className: "sbl", children }) }) });
}
const AdJourneyV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AdJourneyMotion, {}) });
const AiSearchV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AiSearchMotion, {}) });
const PersonalAgentsV2SbMotion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(PersonalAgentsV2Motion, {}) });
const AiAssistantsV2Motion = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AiAssistantsMotion, {}) });
const AskInsightV2 = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AskInsight, { landingHoldMs: 1100, growComposer: true }) });
const ConversationToRevenueV2 = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(ConversationToRevenue, {}) });
const AnonymousTrafficV2 = () => /* @__PURE__ */ jsx(Layer, { children: /* @__PURE__ */ jsx(AnonymousTraffic, {}) });
const CHAR_INTERVAL_MS$1 = 26;
const COMPOSER_SEND_GAP_MS = 220;
const THINKING_STAGE_1_MS$1 = 300;
const THINKING_STAGE_2_MS$1 = 500;
const THINKING_EXIT_MS$1 = 150;
const AGENT_RETYPE_DWELL_MS = 550;
const REPLY_STAGGER_MS$1 = 45;
const REPLY_WORD_ANIM_MS$1 = 220;
const REPLY_SETTLE_MS$1 = 150;
const INTER_MESSAGE_GAP_MS = 350;
const HANDOFF_HOLD_MS = 1500;
function prefersReducedMotion$1() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs$1(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS$1 + REPLY_WORD_ANIM_MS$1 + REPLY_SETTLE_MS$1;
}
function pauseMs$1(message, bonusMs = 0) {
  return 350 + Math.min(message.length * 3, 500) + bonusMs;
}
function thinkingDwellMs(step, beatIndex) {
  if (step.speaker === "agent" && beatIndex > 0) return AGENT_RETYPE_DWELL_MS;
  return THINKING_STAGE_1_MS$1 + THINKING_STAGE_2_MS$1;
}
function useConversationPlayback$1(steps2) {
  const reducedMotion = useRef(prefersReducedMotion$1()).current;
  const [stepIndex, setStepIndex] = useState(reducedMotion ? steps2.length : 0);
  const [phase, setPhase] = useState("composing");
  const [beatIndex, setBeatIndex] = useState(0);
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("");
  useEffect(() => {
    if (reducedMotion) return;
    if (stepIndex >= steps2.length) return;
    const step = steps2[stepIndex];
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    if (step.kind === "user" || step.kind === "userUpload") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(step.message, {
        msPerStep: CHAR_INTERVAL_MS$1,
        onTick: setComposerValue,
        onDone: () => {
          after(COMPOSER_SEND_GAP_MS, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStepIndex((n) => n + 1);
            setPhase(steps2[stepIndex + 1]?.kind === "handoff" ? "handoff" : "thinking");
            setBeatIndex(0);
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (step.kind === "handoff") {
      after(HANDOFF_HOLD_MS, () => {
        setStepIndex((n) => n + 1);
        setPhase("thinking");
        setBeatIndex(0);
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinking") {
      setStatusLabel(step.thinkingStages[0]);
      const secondStage = step.thinkingStages[1];
      if (secondStage) {
        after(THINKING_STAGE_1_MS$1, () => {
          setStatusLabel(secondStage);
        });
      }
      after(thinkingDwellMs(step, beatIndex), () => {
        setPhase("thinkingExit");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS$1, () => {
        setPhase("replying");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying") {
      const message = step.messages[beatIndex];
      after(replyRevealMs$1(message), () => {
        const hasMoreMessages = beatIndex < step.messages.length - 1;
        if (hasMoreMessages) {
          after(INTER_MESSAGE_GAP_MS, () => {
            setBeatIndex((n) => n + 1);
            setPhase("thinking");
          });
        } else {
          setPhase("pausing");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "pausing") {
      const lastMessage = step.messages[step.messages.length - 1];
      after(pauseMs$1(lastMessage, step.pauseBonusMs), () => {
        setStepIndex((n) => n + 1);
        const next = steps2[stepIndex + 1];
        setPhase(next?.kind === "handoff" ? "handoff" : "composing");
        setBeatIndex(0);
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [stepIndex, phase, beatIndex, reducedMotion]);
  return {
    stepIndex,
    phase,
    beatIndex,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    done: stepIndex >= steps2.length
  };
}
const matchingBraceletUpload = "/images/landing/home-v2/assets/matching-bracelet-uploaded-by-the-shopper-BGkSBziL.webp";
const uploadedBracelet = matchingBraceletUpload;
const turn1$1 = {
  userMessage: "Where's my order?",
  assistantMessage: "I see you've purchased a rose gold pendant for your wife. It's on its way, and will reach you by 3rd November."
};
const turn2$1 = {
  userMessage: "I need to speak to someone.",
  assistantMessage: "Absolutely. I'll get the right person and pass along what we've already discussed."
};
const handoffStatus = "Connected with a support agent — they can see this conversation.";
const turn3$1 = {
  agentMessage: "Let me know your concern regarding the delivery of your rose gold pendant?"
};
const turn4$1 = {
  userMessage: "If the order hasn't been dispatched, I need to add one more thing, a matching bracelet, this one."
};
const turn5 = {
  agentMessages: ["Let me see what I can do.", "You reached us just in time. Consider it done!"]
};
const AGENT = { name: "Support agent", role: "Aurelle support" };
const followups$1 = {
  turn1: ["Track my order", "Change delivery date", "I need to speak to someone"]
};
const steps = [
  { kind: "user", id: "turn1", message: turn1$1.userMessage },
  { kind: "reply", id: "turn1-reply", speaker: "ai", messages: [turn1$1.assistantMessage], thinkingStages: ["Thinking"] },
  { kind: "user", id: "turn2", message: turn2$1.userMessage },
  { kind: "reply", id: "turn2-reply", speaker: "ai", messages: [turn2$1.assistantMessage], thinkingStages: ["Thinking"], pauseBonusMs: 300 },
  { kind: "handoff", id: "handoff", text: handoffStatus },
  { kind: "reply", id: "turn3-reply", speaker: "agent", messages: [turn3$1.agentMessage], thinkingStages: ["Typing"] },
  { kind: "userUpload", id: "turn4", message: turn4$1.userMessage, image: uploadedBracelet, caption: "Matching bracelet" },
  { kind: "reply", id: "turn5-reply", speaker: "agent", messages: turn5.agentMessages, thinkingStages: ["Typing"] }
];
const stepFollowups = { "turn1-reply": followups$1.turn1 };
const CONNECTING_MS = 650;
function ServiceResolutionV2Motion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [landing2, setLanding] = useState(0);
  useEffect(() => {
    if (landed) setLanding((n) => n + 1);
  }, [landed]);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: landing2 > 0 ? /* @__PURE__ */ jsx(Conversation$1, {}, landing2) : /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx("div", { className: "gj2-win" }) }) });
}
function Conversation$1() {
  const { stepIndex, phase, beatIndex, composerValue, composerTyping, reducedMotion } = useConversationPlayback$1(steps);
  const transcriptRef = useRef(null);
  const animate = !reducedMotion;
  useEffect(() => {
    const viewport = transcriptRef.current;
    const target = viewport?.lastElementChild;
    if (!viewport || !target) return;
    const viewportRect = viewport.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE) return;
    const top = viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
    if (reducedMotion) viewport.scrollTop = top;
    else animateScrollTo(viewport, top);
  }, [stepIndex, phase, beatIndex, reducedMotion]);
  const composing = stepIndex < steps.length && phase === "composing" && composerTyping;
  const nextMessage = (i) => {
    const next = steps[i + 1];
    return next && (next.kind === "user" || next.kind === "userUpload") ? next.message : void 0;
  };
  const tapping = composing && Boolean(tappedChip(stepFollowups[steps[stepIndex - 1]?.id], nextMessage(stepIndex - 1)));
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsxs("div", { className: "gj2-win", children: [
    /* @__PURE__ */ jsx(ChatHead, {}),
    /* @__PURE__ */ jsx("div", { className: "gj2-transcript gj2-transcript--scroll", ref: transcriptRef, children: steps.flatMap((step, i) => {
      const isPast = i < stepIndex;
      const isCurrent = i === stepIndex;
      if (step.kind === "user" || step.kind === "userUpload") {
        const isSent = isCurrent && phase !== "composing";
        if (!isPast && !isSent) return [];
        const bubble = /* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`, children: step.message }, step.id);
        if (step.kind === "user") return [bubble];
        return [
          /* @__PURE__ */ jsx(ImageTile, { src: step.image, alt: "Matching bracelet uploaded by the shopper", className: animate ? "sbp-in" : void 0 }, `${step.id}-img`),
          bubble
        ];
      }
      if (step.kind === "handoff") {
        if (!isPast && !isCurrent) return [];
        return [/* @__PURE__ */ jsx(Seam, { text: step.text, fresh: isCurrent && animate }, step.id)];
      }
      if (!isPast && !isCurrent) return [];
      const beat = isCurrent ? beatIndex : step.messages.length;
      const waiting = isCurrent && (phase === "thinking" || phase === "thinkingExit");
      const shown = step.messages.slice(0, waiting ? beat : beat + 1);
      const settled = isPast || isCurrent && phase === "pausing";
      if (step.speaker === "ai") {
        return [
          ...waiting ? [
            /* @__PURE__ */ jsxs("div", { className: phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai", children: [
              /* @__PURE__ */ jsx("span", { className: "gj2-think__mark", children: /* @__PURE__ */ jsx(SparkGlyph, {}) }),
              /* @__PURE__ */ jsx("span", { className: "gj2-think__window", children: /* @__PURE__ */ jsx("span", { className: "gj2-think__line", children: WAIT_FIRST }) })
            ] }, `${step.id}-think`)
          ] : [],
          ...shown.map((m, mi) => /* @__PURE__ */ jsx(StreamedReply, { text: m, animate }, `${step.id}-${mi}`)),
          ...settled && stepFollowups[step.id] ? [
            /* @__PURE__ */ jsx(
              Followups,
              {
                items: stepFollowups[step.id],
                picked: isPast ? tappedChip(stepFollowups[step.id], nextMessage(i)) : void 0,
                className: [animate && "gj2-followups--in", animate && tapping && stepIndex === i + 1 && "gj2-followups--tap"].filter(Boolean).join(" ") || void 0
              },
              `${step.id}-fu`
            )
          ] : []
        ];
      }
      return [
        ...shown.length ? [
          /* @__PURE__ */ jsx(AgentPlate, { ...AGENT, className: animate && isCurrent ? "sbp-in" : void 0, children: shown.map((m, mi) => /* @__PURE__ */ jsx(AgentLine, { children: animate ? /* @__PURE__ */ jsx(StreamedWords, { text: m }) : m }, mi)) }, step.id)
        ] : [],
        ...waiting ? [/* @__PURE__ */ jsx(AgentTyping, { name: "Support agent", className: phase === "thinkingExit" ? "gj2-think--out" : "gj2-in-ai" }, `${step.id}-typing`)] : []
      ];
    }) }),
    /* @__PURE__ */ jsx(ChatFoot, { value: composing && !tapping && composerValue ? composerValue : void 0 })
  ] }) });
}
function Seam({ text, fresh }) {
  const [connecting, setConnecting] = useState(fresh);
  useEffect(() => {
    if (!fresh) return;
    const id = window.setTimeout(() => setConnecting(false), CONNECTING_MS);
    return () => window.clearTimeout(id);
  }, [fresh]);
  return /* @__PURE__ */ jsx(
    HandoffSeam,
    {
      text: connecting ? "Connecting you to a support agent…" : text,
      connecting,
      className: fresh ? "sbp-in" : void 0
    }
  );
}
function StreamedWords({ text }) {
  const words2 = text.split(" ");
  return /* @__PURE__ */ jsx(Fragment, { children: words2.map((word, i) => /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-word", style: { animationDelay: `${i * 45}ms` }, children: word }),
    i < words2.length - 1 && " "
  ] }, i)) });
}
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_EXIT_MS = 150;
const CHAR_INTERVAL_MS = 26;
const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const PRODUCTS_SKELETON_HOLD_MS = 550;
const UPLOAD_SETTLE_MS = 650;
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function replyRevealMs(text) {
  const wordCount2 = text.split(/\s+/).filter(Boolean).length;
  return wordCount2 * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}
function pauseMs(beat) {
  if (beat.kind !== "assistant") return 350;
  const base = 350 + Math.min(beat.message.length * 3, 500);
  return beat.products?.length ? base + 500 : base;
}
function entryPhase(beat) {
  if (beat.kind === "user-text") return "composing";
  if (beat.kind === "user-upload") return "revealing";
  return "thinking";
}
function useConversationPlayback(beats2) {
  const reducedMotion = useRef(prefersReducedMotion()).current;
  const [beatIndex, setBeatIndex] = useState(reducedMotion ? beats2.length : 0);
  const [phase, setPhase] = useState(reducedMotion ? "pausing" : entryPhase(beats2[0]));
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [productsLoading, setProductsLoading] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    if (beatIndex >= beats2.length) return;
    const beat = beats2[beatIndex];
    const timeouts = [];
    const after = (ms, fn) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    const advance = () => {
      const nextIndex = beatIndex + 1;
      setBeatIndex(nextIndex);
      setPhase(nextIndex < beats2.length ? entryPhase(beats2[nextIndex]) : "pausing");
    };
    if (phase === "composing" && beat.kind === "user-text") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(beat.message, {
        msPerStep: CHAR_INTERVAL_MS,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            advance();
          });
        }
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }
    if (phase === "revealing") {
      after(UPLOAD_SETTLE_MS, advance);
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinking" && beat.kind === "assistant") {
      setStatusLabel("Thinking");
      after(THINKING_STAGE_1_MS, () => {
        setStatusLabel(beat.thinkingLabel);
      });
      after(THINKING_STAGE_1_MS + THINKING_STAGE_2_MS, () => {
        setPhase("thinkingExit");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS, () => {
        setPhase("replying");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "replying" && beat.kind === "assistant") {
      after(replyRevealMs(beat.message), () => {
        if (beat.products?.length) {
          setProductsLoading(true);
          setPhase("productsLoading");
        } else {
          setPhase("pausing");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "productsLoading") {
      after(PRODUCTS_SKELETON_HOLD_MS, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }
    if (phase === "pausing") {
      after(pauseMs(beat), advance);
      return () => timeouts.forEach(window.clearTimeout);
    }
    return void 0;
  }, [beatIndex, phase, reducedMotion]);
  return {
    beatIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    productsLoading,
    reducedMotion,
    done: beatIndex >= beats2.length
  };
}
const wifeLookGoldHoopSet = "/images/landing/home-v2/assets/wife-natural-gold-hoops-CVcKNdjK.webp";
const wifeLookPearlDropSet = "/images/landing/home-v2/assets/wife-natural-pearl-drops-DjrfzSSN.webp";
const wifeLookCitrineStudSet = "/images/landing/home-v2/assets/wife-natural-citrine-studs-BH6qP1J2.webp";
const photoUploadedByShopper = "/images/landing/home-v2/assets/wife-natural-upload-BkRy2z43.webp";
const brand = "Aurelle";
const turn1 = {
  assistantMessage: "Good to see you again. Did your wife like her rose gold pendant?",
  userMessage: "Oh yes, now I need something special for our vacation in Miami. It's our anniversary."
};
const turn2 = {
  assistantMessage: "Let me share a few earrings and bracelet options, and build a look for her."
};
const looks = [
  { id: "look-1", brand, title: "Gold Hoop Set", image: lookGoldHoopSet, price: "$89", rating: 4, ratingCount: "312" },
  { id: "look-2", brand, title: "Pearl Drop Set", image: lookPearlDropSet, price: "$96", rating: 5, ratingCount: "208" },
  { id: "look-3", brand, title: "Citrine Stud Set", image: lookCitrineStudSet, price: "$74", rating: 4, ratingCount: "165" }
];
const turn3 = {
  userMessage: "I wonder how this would look on her…",
  assistantMessage: "Simply upload her picture, and I will show you."
};
const upload = {
  alt: "Photo uploaded by the shopper",
  src: photoUploadedByShopper
};
const turn4 = {
  assistantMessage: "Here are the same looks, but for her!"
};
const personalisedLooks = [
  { id: "wife-look-1", brand, title: "Gold Hoop Set", image: wifeLookGoldHoopSet, price: "$89", rating: 4, ratingCount: "312" },
  { id: "wife-look-2", brand, title: "Pearl Drop Set", image: wifeLookPearlDropSet, price: "$96", rating: 5, ratingCount: "208" },
  { id: "wife-look-3", brand, title: "Citrine Stud Set", image: wifeLookCitrineStudSet, price: "$74", rating: 4, ratingCount: "165" }
];
const followups = {
  turn1: ["She loved it", "Shop new arrivals"],
  turn2: ["Bracelets only", "Under $90", "Show more looks"],
  turn4: ["Add Look 1", "Compare the looks", "Gift wrap it"]
};
const beats = [
  { kind: "assistant", message: turn1.assistantMessage, thinkingLabel: WAIT_FIRST },
  { kind: "user-text", message: turn1.userMessage },
  { kind: "assistant", message: turn2.assistantMessage, thinkingLabel: WAIT_CARDS, products: looks },
  { kind: "user-text", message: turn3.userMessage },
  { kind: "assistant", message: turn3.assistantMessage, thinkingLabel: WAIT_FIRST },
  { kind: "user-upload", src: upload.src, alt: upload.alt },
  { kind: "assistant", message: turn4.assistantMessage, thinkingLabel: WAIT_CARDS, products: personalisedLooks }
];
const beatFollowups = { 0: followups.turn1, 2: followups.turn2, 6: followups.turn4 };
function RetentionGrowthV2Motion() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [landing2, setLanding] = useState(0);
  useEffect(() => {
    if (landed) setLanding((n) => n + 1);
  }, [landed]);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: landing2 > 0 ? /* @__PURE__ */ jsx(Conversation, {}, landing2) : /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsx("div", { className: "gj2-win" }) }) });
}
function Conversation() {
  const { beatIndex, phase, composerValue, composerTyping, productsLoading, reducedMotion } = useConversationPlayback(beats);
  const transcriptRef = useRef(null);
  const animate = !reducedMotion;
  useEffect(() => {
    const viewport = transcriptRef.current;
    const target = viewport?.lastElementChild;
    if (!viewport || !target) return;
    const viewportRect = viewport.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE) return;
    const top = viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
    if (reducedMotion) viewport.scrollTop = top;
    else animateScrollTo(viewport, top);
  }, [beatIndex, phase, productsLoading, reducedMotion]);
  const composing = beats[beatIndex]?.kind === "user-text" && phase === "composing" && composerTyping;
  const nextMessage = (i) => {
    const next = beats[i + 1];
    return next?.kind === "user-text" ? next.message : void 0;
  };
  const tapping = composing && Boolean(tappedChip(beatFollowups[beatIndex - 1], nextMessage(beatIndex - 1)));
  return /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsxs("div", { className: "gj2-win", children: [
    /* @__PURE__ */ jsx(ChatHead, {}),
    /* @__PURE__ */ jsx("div", { className: "gj2-transcript gj2-transcript--scroll", ref: transcriptRef, children: beats.flatMap((beat, i) => {
      const isPast = i < beatIndex;
      const isCurrent = i === beatIndex;
      if (beat.kind === "user-text") {
        const isSent = isCurrent && phase !== "composing";
        if (!isPast && !isSent) return [];
        return [/* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate && !isPast ? " gj2-in" : ""}`, children: beat.message }, i)];
      }
      if (beat.kind === "user-upload") {
        if (!isPast && !isCurrent) return [];
        return [/* @__PURE__ */ jsx(ImageTile, { src: beat.src ?? "", alt: beat.alt, className: animate && !isPast ? "sbp-in" : void 0 }, i)];
      }
      if (!isPast && !isCurrent) return [];
      const thinking = isCurrent && (phase === "thinking" || phase === "thinkingExit");
      const showReply = isPast || isCurrent && !thinking;
      const showCards = isPast || isCurrent && (phase === "productsLoading" || phase === "pausing");
      const settled = isPast || isCurrent && phase === "pausing";
      return [
        ...thinking ? [
          /* @__PURE__ */ jsxs("div", { className: phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai", children: [
            /* @__PURE__ */ jsx("span", { className: "gj2-think__mark", children: /* @__PURE__ */ jsx(SparkGlyph, {}) }),
            /* @__PURE__ */ jsx("span", { className: "gj2-think__window", children: /* @__PURE__ */ jsx("span", { className: "gj2-think__line", children: beat.thinkingLabel }) })
          ] }, `${i}-think`)
        ] : [],
        ...showReply ? [/* @__PURE__ */ jsx(StreamedReply, { text: beat.message, animate }, `${i}-reply`)] : [],
        ...showCards && beat.products ? [
          /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(Rail, { products: beat.products, loading: isCurrent && productsLoading }) }, `${i}-rail`)
        ] : [],
        ...settled && beatFollowups[i] ? [
          /* @__PURE__ */ jsx(
            Followups,
            {
              items: beatFollowups[i],
              picked: isPast ? tappedChip(beatFollowups[i], nextMessage(i)) : void 0,
              className: [animate && "gj2-followups--in", animate && tapping && beatIndex === i + 1 && "gj2-followups--tap"].filter(Boolean).join(" ") || void 0
            },
            `${i}-fu`
          )
        ] : []
      ];
    }) }),
    /* @__PURE__ */ jsx(ChatFoot, { value: composing && !tapping && composerValue ? composerValue : void 0 })
  ] }) });
}
export {
  AdJourneyV2Motion as AdJourneyMotion,
  AiAssistantsV2Motion as AiAssistantsMotion,
  AiSearchV2Motion as AiSearchMotion,
  AnonymousTrafficV2 as AnonymousTrafficMotion,
  AskInsightV2 as AskInsightMotion,
  GiftJourneyV2Motion as GiftJourneyMotion,
  PersonalAgentsV2SbMotion as PersonalAgentsMotion,
  RetentionGrowthV2Motion as RetentionGrowthMotion,
  ConversationToRevenueV2 as RevenueAttributionMotion,
  ServiceResolutionV2Motion as ServiceResolutionMotion,
  SponsoredComparisonV2Motion as SponsoredComparisonMotion
};
