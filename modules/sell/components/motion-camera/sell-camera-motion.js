"use client";

// Built from the "Crossword — Sell: mobile demos with camera" source with Vite, unminified, React
// external. See ./index.tsx for the mechanical changes.

import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useRef, useMemo, useLayoutEffect, Fragment as Fragment$1 } from "react";
const Context = createContext("crimson");
const useColorContext = () => useContext(Context);
function ColorContext({
  variant,
  children,
  className = ""
}) {
  const inherited = useColorContext();
  const active = variant ?? inherited;
  return /* @__PURE__ */ jsx(Context.Provider, { value: active, children: /* @__PURE__ */ jsx("div", { className: `cw-context ${className}`, "data-color": active, children }) });
}
const frameBackground = "/images/sell/motion-camera/assets/background-GiCSjLb9.svg";
const frameTexture = "/images/sell/motion-camera/assets/background-texture-C4nqYl4R.webp";
function SceneFrame({
  children,
  hideBackground,
  height
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "sc-ill-scene-frame-scale",
      style: height ? { aspectRatio: `738 / ${height}` } : void 0,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: height ? "sc-ill-scene-frame sc-ill-scene-frame--sized" : "sc-ill-scene-frame",
          style: height ? { height } : void 0,
          children: [
            !hideBackground && /* @__PURE__ */ jsxs(Fragment, { children: [
              height ? /* @__PURE__ */ jsx("svg", { className: "sc-ill-scene-frame__background", viewBox: `0 0 738 ${height}`, "aria-hidden": "true", children: [
                [26, 24],
                [712, 24],
                [26, height - 24],
                [712, height - 24]
              ].map(([cx, cy]) => /* @__PURE__ */ jsx("circle", { cx, cy, r: 4.5, fill: "none", stroke: "#D2B75C" }, `${cx}-${cy}`)) }) : /* @__PURE__ */ jsx(
                "img",
                {
                  className: "sc-ill-scene-frame__background",
                  src: frameBackground,
                  alt: "",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "sc-ill-scene-frame__texture",
                  src: frameTexture,
                  alt: "",
                  "aria-hidden": "true"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "sc-ill-scene-frame__content", children })
          ]
        }
      )
    }
  );
}
function ScaleToFit({
  contentWidth,
  contentHeight,
  maxWidth,
  maxHeight,
  children
}) {
  const scale = Math.min(maxWidth / contentWidth, maxHeight / contentHeight);
  return /* @__PURE__ */ jsx("div", { style: { position: "relative", width: maxWidth, height: maxHeight }, children: /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: contentWidth,
        height: contentHeight,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center"
      },
      children
    }
  ) });
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
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS = 150;
const CHAR_INTERVAL_MS = 26;
const REPLY_STAGGER_MS$1 = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;
function prefersReducedMotion$1() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs(text) {
  return wordCount(text) * REPLY_STAGGER_MS$1 + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}
function useChatTimeline(beats, active) {
  const reducedMotion = useRef(prefersReducedMotion$1()).current;
  const [index, setIndex] = useState(reducedMotion ? beats.length : 0);
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
    if (reducedMotion || !active || index >= beats.length) return;
    const beat = beats[index];
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
  }, [index, active, reducedMotion, beats]);
  return useMemo(() => {
    const at = (id) => {
      const i = beats.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current2 = beats[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at(id),
      passed: (id) => index > at(id),
      loading: (id) => index === at(id),
      status: (id) => {
        const beat = beats[index];
        if (index !== at(id) || beat.type !== "think") return null;
        const stage = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: current2?.type === "compose" && current2.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats.length,
      reducedMotion,
      runKey
    };
  }, [beats, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
const ZOOM_MEDIUM = 1.45;
const ZOOM_CLOSE = 1.85;
const MAX_ZOOM = ZOOM_CLOSE;
const MIN_FOCUS_ZOOM = ZOOM_MEDIUM;
const PAD = 0.02;
const HEADROOM = 0.14;
const FRAME_MARGIN = 34;
const CAMERA_MS = 900;
const EASE_MOVE = "cubic-bezier(0.76, 0, 0.24, 1)";
const RIDE_MS = 600;
const EASE_RIDE = "cubic-bezier(0.22, 1, 0.36, 1)";
const CAMERA_LEAD_MS = CAMERA_MS + 150;
const READ_MS = 2600;
const PULLBACK_MS = 760;
const REST_MS = 700;
const DWELL_MS = 700;
const PRE_LOAD_MS = 400;
const LOAD_SETTLE_MS = 450;
const HOLD_MS = 1600;
const TYPE_MS_PER_CHAR = 42;
const FULL = { s: 1, ty: 0 };
function transformFor({ s, ty }) {
  return `translate(${(0.5 - 0.5 * s) * 100}%, ${ty * 100}%) scale(${s})`;
}
function useCameraBeats(beats, enabled, nudge, release) {
  return useMemo(() => {
    if (!enabled) return beats;
    const firstCompose = beats.findIndex((b) => b.type === "compose");
    const out = beats.flatMap((b, i) => {
      let beat = b;
      if (b.type === "compose" && b.text) {
        beat = { ...b, msPerChar: b.msPerChar ?? TYPE_MS_PER_CHAR, leadMs: i === firstCompose && !nudge ? Math.max(b.leadMs ?? 0, CAMERA_LEAD_MS) : b.leadMs };
      }
      const before = b.id === release ? [{ id: "camera-release", type: "pause", ms: PULLBACK_MS + 150 }] : [];
      const after = b.type === "compose" && b.text ? [{ id: `camera-dwell-${b.id}`, type: "pause", ms: DWELL_MS }] : [];
      if (b.type === "load" && b.id !== release) {
        beat = { ...b, ms: Math.max(b.ms ?? 0, CAMERA_MS + LOAD_SETTLE_MS) };
        return [...before, { id: `camera-pre-${b.id}`, type: "pause", ms: PRE_LOAD_MS }, beat, ...after];
      }
      return [...before, beat, ...after];
    });
    const rest = nudge ? [] : [{ id: "camera-rest", type: "pause", ms: REST_MS }];
    return [...rest, ...out, { id: "camera-read", type: "pause", ms: READ_MS }];
  }, [beats, enabled, nudge, release]);
}
function useChatCamera(t, enabled, stage, nudge, approach, release) {
  let mode = "full";
  if (enabled && !t.reducedMotion && !t.done && !(release && t.reached("camera-release"))) {
    if (nudge) {
      if (stage === "open") mode = "focus";
      else if (approach || stage === "nudge" || stage === "pressed") mode = "nudge";
    } else if (t.passed("camera-rest")) {
      mode = "focus";
    }
  }
  const ref = useRef(null);
  const [band, setBand] = useState(null);
  useEffect(() => {
    const cam = ref.current;
    if (!cam || !enabled) return;
    let clip = cam.parentElement;
    while (clip && getComputedStyle(clip).overflow === "visible") clip = clip.parentElement;
    if (!clip) return;
    // Site change: the page draws each visual inside a panel that starts at zero size until it has measured its
    // column (ScenePanel), and a transform scale never fires a ResizeObserver; so until the phone has a real size,
    // keep re-measuring each frame. Without this the band stayed unset and the camera never zoomed on that run.
    let retry = 0;
    const measure = () => {
      if (cam.style.transform && !cam.style.transform.includes("scale(1)")) return;
      const box = cam.getBoundingClientRect();
      const frame = clip.getBoundingClientRect();
      if (!box.height || !frame.height) {
        cancelAnimationFrame(retry);
        retry = requestAnimationFrame(measure);
        return;
      }
      setBand({ lo: (frame.top - box.top + FRAME_MARGIN) / box.height, hi: (frame.bottom - box.top - FRAME_MARGIN) / box.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(clip);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(retry);
    };
  }, [enabled]);
  const fit = (a, b) => {
    if (!band) return FULL;
    const { lo, hi } = band;
    const h = hi - lo;
    const sTop = Math.min(MAX_ZOOM, h / (b + PAD));
    const sBottom = Math.min(MAX_ZOOM, h / (1 - a + PAD));
    const cur = viewRef.current;
    const onTop = cur !== FULL && Math.abs(cur.ty - lo) < 1e-3;
    const onBottom = cur !== FULL && !onTop;
    const top = sTop >= sBottom * (onBottom ? 1.15 : 1) || onTop && sTop >= sBottom / 1.15;
    const allowed = top ? sTop : sBottom;
    const s = allowed >= ZOOM_CLOSE ? ZOOM_CLOSE : allowed >= ZOOM_MEDIUM ? ZOOM_MEDIUM : 1;
    if (s === 1 || s <= h) return FULL;
    return top ? { s, ty: lo } : { s, ty: hi - s };
  };
  const [view, setView] = useState(FULL);
  const viewRef = useRef(view);
  const movedAt = useRef(-Infinity);
  viewRef.current = view;
  useEffect(() => {
    if (mode === "full") return setView(FULL);
    if (mode === "nudge") return setView(fit(0.74, 0.9));
    const cam = ref.current;
    if (!cam || !band) return;
    const transcript = cam.querySelector(".gj2-transcript");
    const foot = cam.querySelector(".gj2-foot");
    if (!transcript) return;
    let raf = 0;
    const settle = () => {
      raf = 0;
      const camRect = cam.getBoundingClientRect();
      const f = (y) => (y - camRect.top) / camRect.height;
      const vp = transcript.getBoundingClientRect();
      const typing = !!foot && (!!t.composer?.value || !nudge && !transcript.lastElementChild);
      const last = transcript.lastElementChild;
      let a, b;
      if (typing) {
        const r = foot.getBoundingClientRect();
        a = f(r.top);
        b = f(r.bottom);
      } else if (last) {
        const users = transcript.querySelectorAll(":scope > .gj2-msg--user");
        let start = users.length ? users[users.length - 1] : transcript.firstElementChild;
        while (start?.previousElementSibling?.classList.contains("sbp-row")) start = start.previousElementSibling;
        b = Math.min(f(vp.bottom), f(last.getBoundingClientRect().bottom) + HEADROOM);
        a = f(Math.max(vp.top, start.getBoundingClientRect().top));
        if (fit(a, b).s < MIN_FOCUS_ZOOM) {
          let block = last;
          while (block?.classList.contains("gj2-followups") && block.previousElementSibling) block = block.previousElementSibling;
          a = f(Math.max(vp.top, block.getBoundingClientRect().top));
        }
      } else {
        a = 0;
        b = 0.4;
      }
      const cur = viewRef.current;
      const shown = (y) => cur.ty + y * cur.s;
      const cropped = shown(a - PAD / 2) < band.lo || shown(b - HEADROOM / 2) > band.hi;
      const since = performance.now() - movedAt.current;
      if (since < CAMERA_MS) {
        later = window.setTimeout(schedule, CAMERA_MS - since + 20);
        return;
      }
      const next = fit(a, b);
      const same = Math.abs(next.s - cur.s) < 1e-3 && Math.abs(next.ty - cur.ty) < 1e-3;
      if (same) return;
      if (cropped || Math.abs(next.s - cur.s) > 0.15 && since > HOLD_MS) {
        movedAt.current = performance.now();
        setView(next);
      }
    };
    let later = 0;
    const schedule = () => {
      if (!raf) raf = window.setTimeout(settle, 16);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    [...transcript.children].forEach((c) => ro.observe(c));
    if (foot) ro.observe(foot);
    return () => {
      ro.disconnect();
      window.clearTimeout(raf);
      window.clearTimeout(later);
    };
  }, [mode, band, t.index, t.runKey, !!t.composer?.value]);
  const [moving, setMoving] = useState(false);
  const prev = useRef(view);
  useEffect(() => {
    if (prev.current.s !== view.s || prev.current.ty !== view.ty) setMoving(true);
    prev.current = view;
  }, [view]);
  const sheetRide = nudge && stage === "open" && t.index === 0 && view !== FULL;
  return {
    className: `chat-cam${moving ? " chat-cam--moving" : ""}`,
    ref,
    style: {
      transform: transformFor(view),
      transition: sheetRide ? `transform ${RIDE_MS}ms ${EASE_RIDE}` : `transform ${view === FULL ? PULLBACK_MS : CAMERA_MS}ms ${EASE_MOVE}`
    },
    onTransitionEnd: (e) => {
      if (e.target === e.currentTarget) setMoving(false);
    }
  };
}
const OMEGA = 11;
const CLEARANCE = 32;
function useSmoothFollow(ref, t) {
  useEffect(() => {
    const vp = ref.current;
    if (!vp) return;
    let raf = 0;
    let last = 0;
    let pos = vp.scrollTop;
    let vel = 0;
    const target = () => {
      const lastChild = vp.lastElementChild;
      if (!lastChild) return pos;
      const edge = vp.getBoundingClientRect().bottom - CLEARANCE;
      const over = lastChild.getBoundingClientRect().bottom - edge;
      const max = vp.scrollHeight - vp.clientHeight;
      const scale = vp.getBoundingClientRect().height / vp.clientHeight || 1;
      return Math.min(max, Math.max(pos, vp.scrollTop + over / scale));
    };
    const tick = (now) => {
      const dt = Math.min(0.05, (last ? now - last : 16) / 1e3);
      last = now;
      const goal = target();
      const gap = goal - pos;
      if (Math.abs(gap) < 0.5 && Math.abs(vel) < 5) {
        pos = goal;
        vel = 0;
        vp.scrollTop = pos;
        raf = 0;
        last = 0;
        return;
      }
      vel += (OMEGA * OMEGA * gap - 2 * OMEGA * vel) * dt;
      pos = Math.min(pos + vel * dt, vp.scrollHeight - vp.clientHeight);
      vp.scrollTop = pos;
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (t.reducedMotion) {
        pos = target();
        vp.scrollTop = pos;
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    wake();
    const ro = new ResizeObserver(wake);
    [...vp.children].forEach((c) => ro.observe(c));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}
const amberChairImage = "/images/sell/motion-camera/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const trailwellWeekenderImage = "/images/sell/motion-camera/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/sell/motion-camera/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/sell/motion-camera/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/sell/motion-camera/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/sell/motion-camera/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/sell/motion-camera/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/sell/motion-camera/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/sell/motion-camera/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/sell/motion-camera/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/sell/motion-camera/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const vitaminCSerum = "/images/sell/motion-camera/assets/vitamin-c-serum-vnf_1nLn.webp";
const goodwell_sleep_60 = "/images/sell/motion-camera/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/sell/motion-camera/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/sell/motion-camera/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/sell/motion-camera/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/sell/motion-camera/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/sell/motion-camera/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/sell/motion-camera/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/sell/motion-camera/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/sell/motion-camera/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/sell/motion-camera/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/sell/motion-camera/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/sell/motion-camera/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/sell/motion-camera/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/sell/motion-camera/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/sell/motion-camera/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/sell/motion-camera/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/sell/motion-camera/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/sell/motion-camera/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/sell/motion-camera/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const espressoMachine = "/images/sell/motion-camera/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/sell/motion-camera/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/sell/motion-camera/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/sell/motion-camera/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/sell/motion-camera/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/sell/motion-camera/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/sell/motion-camera/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden$1 = "/images/sell/motion-camera/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/sell/motion-camera/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/sell/motion-camera/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/sell/motion-camera/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/sell/motion-camera/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/sell/motion-camera/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/sell/motion-camera/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/sell/motion-camera/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/sell/motion-camera/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/sell/motion-camera/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/sell/motion-camera/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/sell/motion-camera/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/sell/motion-camera/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/sell/motion-camera/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/sell/motion-camera/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/sell/motion-camera/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/sell/motion-camera/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/sell/motion-camera/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/sell/motion-camera/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/sell/motion-camera/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/sell/motion-camera/assets/holt-cardholder-Cu4HiyUC.webp";
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
const hydratingSerum = "/images/sell/motion-camera/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/sell/motion-camera/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/sell/motion-camera/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/sell/motion-camera/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/sell/motion-camera/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/sell/motion-camera/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/sell/motion-camera/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/sell/motion-camera/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/sell/motion-camera/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/sell/motion-camera/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/sell/motion-camera/assets/also-viewed-2-DWB9-93Z.webp";
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
const audenViewedProducts = [
  catalog.audenIvory,
  catalog.audenOlive,
  catalog.audenMustard
];
const goldHoopSet = "/images/sell/motion-camera/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/sell/motion-camera/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/sell/motion-camera/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
const __vite_glob_0_0 = "/images/sell/motion-camera/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/sell/motion-camera/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/sell/motion-camera/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/sell/motion-camera/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/sell/motion-camera/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/sell/motion-camera/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/sell/motion-camera/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/sell/motion-camera/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/sell/motion-camera/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/sell/motion-camera/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/sell/motion-camera/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/sell/motion-camera/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/sell/motion-camera/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/sell/motion-camera/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/sell/motion-camera/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/sell/motion-camera/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/sell/motion-camera/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/sell/motion-camera/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/sell/motion-camera/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/sell/motion-camera/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/sell/motion-camera/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/sell/motion-camera/assets/sorelle-labs-mark-DwV8-BRm.svg";
const goodwellMark = "/images/sell/motion-camera/assets/goodwell-mark-D2M8-7dz.svg";
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
const brand = "Aurelle";
[
  { ...catalog.aurelleAnklet, brand, rating: 4, ratingCount: "312", image: catalog.aurelleAnklet.image },
  { ...catalog.aurellePendant, brand, rating: 5, ratingCount: "1.1k", image: catalog.aurellePendant.image, imageFit: "cover" },
  { ...catalog.aurelleBracelet, brand, rating: 4, ratingCount: "487", image: catalog.aurelleBracelet.image }
];
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
    /* @__PURE__ */ jsx("span", { className: "gj2-head__name", children: brand })
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
    const content = valueRef.current?.offsetHeight ?? 0;
    setHeight(Math.max(48, content + 12));
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
function Rail({ products: products2, loading = false, ctaLabel, className }) {
  return /* @__PURE__ */ jsx("div", { className: className ? `gj2-rail ${className}` : "gj2-rail", children: products2.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, loading, resolveDelayMs: i * 80, ctaLabel }, p.id)) });
}
function ProductCard({
  product,
  added = false,
  lone = false,
  loading,
  resolveDelayMs = 0,
  adding = false,
  addingDelayMs = 0,
  ctaLabel = "Add"
}) {
  return /* @__PURE__ */ jsxs("article", { className: ["gj2-card", lone && "gj2-card--lone"].filter(Boolean).join(" "), "data-product-id": product.id, "data-product-brand": product.brand, children: [
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
      product.image && /* @__PURE__ */ jsx(ProductImage, { src: product.image, alt: product.title, style: product.imageFit ? { objectFit: product.imageFit } : void 0 }),
      product.tag && /* @__PURE__ */ jsx("span", { className: "gj2-badge", children: product.tag }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__expand", "aria-label": "Expand", children: /* @__PURE__ */ jsx(CornersOutGlyph, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "gj2-card__col", children: [
      /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product.brand }),
      /* @__PURE__ */ jsx("span", { className: "gj2-card__title", children: product.title }),
      product.subtitle && /* @__PURE__ */ jsx("span", { className: "gj2-card__caption", children: product.subtitle }),
      product.rating !== void 0 && /* @__PURE__ */ jsx(Stars, { value: product.rating, count: product.ratingCount ?? "" }),
      product.price && /* @__PURE__ */ jsx("span", { className: "gj2-card__price", children: product.price })
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
function cubicBezier(p1x, p1y, p2x, p2y) {
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
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
const REPLY_STAGGER_MS = 45;
const WAIT_FIRST = "Thinking…";
const WAIT_CARDS = "Fetching the product…";
const WORD_STAGGER_MS = REPLY_STAGGER_MS;
const FADE_CLEARANCE = 32;
function StreamedReply({ text, animate }) {
  if (!animate) return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: text });
  const words = text.split(" ");
  return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: words.map((word, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-word", style: { animationDelay: `${i * WORD_STAGGER_MS}ms` }, children: word }),
    i < words.length - 1 && " "
  ] }, i)) });
}
function SparkGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: 20, height: 20, fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5z" }) });
}
function ProductRow({ image, title, meta, className }) {
  return /* @__PURE__ */ jsxs("div", { className: ["sbp-row", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb", children: /* @__PURE__ */ jsx("img", { src: image, alt: "" }) }),
    /* @__PURE__ */ jsxs("span", { className: "sbp-row__col", children: [
      /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: title }),
      /* @__PURE__ */ jsx("span", { className: "sbp-row__meta", children: meta })
    ] })
  ] });
}
const PHONE_W = 375;
const PHONE_H = 812;
const SLOT_H = 520;
const SLOT_W = PHONE_W * SLOT_H / PHONE_H;
function IosStatusBar() {
  return /* @__PURE__ */ jsxs("div", { className: "gjm-status", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("span", { className: "gjm-status__time", children: "9:41" }),
    /* @__PURE__ */ jsxs("span", { className: "gjm-status__right", children: [
      /* @__PURE__ */ jsxs("svg", { width: "19", height: "12", viewBox: "0 0 19 12", fill: "currentColor", children: [
        /* @__PURE__ */ jsx("rect", { x: "0", y: "7.5", width: "3.2", height: "4.5", rx: "0.8" }),
        /* @__PURE__ */ jsx("rect", { x: "5.1", y: "5", width: "3.2", height: "7", rx: "0.8" }),
        /* @__PURE__ */ jsx("rect", { x: "10.2", y: "2.5", width: "3.2", height: "9.5", rx: "0.8" }),
        /* @__PURE__ */ jsx("rect", { x: "15.3", y: "0", width: "3.2", height: "12", rx: "0.8" })
      ] }),
      /* @__PURE__ */ jsxs("svg", { width: "17", height: "12", viewBox: "0 0 17 12", fill: "currentColor", children: [
        /* @__PURE__ */ jsx("path", { d: "M8.5 2.3c2.3 0 4.4.9 6 2.4.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4A11.1 11.1 0 0 0 8.5 0C5.6 0 2.9 1.1.9 3.1c-.1.1-.1.3 0 .4L2.1 4.7c.1.1.3.1.4 0a8.7 8.7 0 0 1 6-2.4Z" }),
        /* @__PURE__ */ jsx("path", { d: "M8.5 6c1.3 0 2.5.5 3.4 1.3.1.1.3.1.4 0l1.2-1.2c.1-.1.1-.3 0-.4A7.2 7.2 0 0 0 8.5 3.7c-1.8 0-3.6.7-5 2-.1.1-.1.3 0 .4l1.2 1.2c.1.1.3.1.4 0C6 6.5 7.2 6 8.5 6Z" }),
        /* @__PURE__ */ jsx("path", { d: "M10.9 8.6c.1-.1.1-.3 0-.4a3.6 3.6 0 0 0-4.8 0c-.1.1-.1.3 0 .4l2.2 2.2c.1.1.3.1.4 0l2.2-2.2Z" })
      ] }),
      /* @__PURE__ */ jsxs("svg", { width: "27", height: "13", viewBox: "0 0 27 13", fill: "none", children: [
        /* @__PURE__ */ jsx("rect", { x: "0.5", y: "0.5", width: "23", height: "12", rx: "3.8", stroke: "currentColor", opacity: "0.35" }),
        /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "9", rx: "2.5", fill: "currentColor" }),
        /* @__PURE__ */ jsx("path", { d: "M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z", fill: "currentColor", opacity: "0.4" })
      ] })
    ] })
  ] });
}
const script$3 = {
  brand: catalog.audenBlack.brand,
  // No user message — this interaction begins from observed browsing
  // behaviour, not a question. No UserTurn is rendered at all.
  assistantMessage: "You've looked at three models in the $450 to $600 range. If you're already comfortable at that price point, this model is worth considering, it has the longer battery life you tend to prioritize and is currently only $100 more than the one you've been viewing."
};
const previouslyViewed = {
  caption: "3 models viewed · $450–$600",
  items: audenViewedProducts.map((product) => ({ ...product, alt: product.title }))
};
const recommendedProduct = {
  ...catalog.audenBlack,
  rating: 5,
  ratingCount: "1.1k"
};
const browse = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  previouslyViewed,
  recommendedProduct,
  script: script$3
}, Symbol.toStringTag, { value: "Module" }));
const differentiators = ["Balanced studio sound", "Longest battery life", "Lightest build"];
const products = audenViewedProducts.map((product, index) => ({
  ...product,
  name: product.title,
  differentiator: differentiators[index]
}));
function Storefront({ brand: brand2, categories, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "merchant-store", style: brandStyle(brand2), "aria-label": `${brand2} storefront`, children: [
    /* @__PURE__ */ jsx(IosStatusBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "merchant-store__bar", children: [
      /* @__PURE__ */ jsxs("span", { className: "gjm-store__menu", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {})
      ] }),
      /* @__PURE__ */ jsx(BrandWordmark, { brand: brand2, className: "merchant-store__brand" }),
      /* @__PURE__ */ jsx("span", { className: "gjm-store__bag", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "merchant-store__nav", children: categories.map((name) => /* @__PURE__ */ jsx("span", { children: name }, name)) }),
    children
  ] });
}
function CatalogStorefront({ brand: brand2, categories, heading, product, secondary }) {
  return /* @__PURE__ */ jsx(Storefront, { brand: brand2, categories, children: /* @__PURE__ */ jsxs("div", { className: "merchant-store__content", children: [
    /* @__PURE__ */ jsx("p", { className: "merchant-store__eyebrow", children: "The collection" }),
    /* @__PURE__ */ jsx("h2", { className: "merchant-store__heading", children: heading }),
    /* @__PURE__ */ jsx("img", { className: "merchant-store__hero", src: product.image, alt: product.title }),
    /* @__PURE__ */ jsxs("div", { className: "merchant-store__product-line", children: [
      /* @__PURE__ */ jsx("h3", { children: product.title }),
      product.price && /* @__PURE__ */ jsx("span", { children: product.price })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "merchant-store__cta", children: "View product" }),
    secondary && /* @__PURE__ */ jsxs("div", { className: "merchant-store__related", children: [
      /* @__PURE__ */ jsx("img", { src: secondary.image, alt: secondary.title }),
      /* @__PURE__ */ jsxs("span", { children: [
        secondary.title,
        /* @__PURE__ */ jsx("small", { children: secondary.price })
      ] })
    ] })
  ] }) });
}
function AudenBrowseStorefront() {
  const viewed = products[2];
  return /* @__PURE__ */ jsx(Storefront, { brand: "Auden", categories: ["Headphones", "Our story", "Support"], children: /* @__PURE__ */ jsxs("div", { className: "merchant-store__content auden-browse", children: [
    /* @__PURE__ */ jsx("p", { className: "merchant-store__eyebrow", children: "Wireless headphones" }),
    /* @__PURE__ */ jsx("h2", { className: "merchant-store__heading", children: "Find your everyday sound." }),
    /* @__PURE__ */ jsx("img", { className: "merchant-store__hero", src: viewed.image, alt: viewed.name }),
    /* @__PURE__ */ jsxs("div", { className: "merchant-store__product-line", children: [
      /* @__PURE__ */ jsx("h3", { children: viewed.name }),
      /* @__PURE__ */ jsx("span", { children: viewed.price })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "merchant-store__description", children: "Over-ear. Wireless. Made for listening." }),
    /* @__PURE__ */ jsxs("div", { className: "auden-browse__colours", "aria-label": "Recently viewed models", children: [
      previouslyViewed.items.map((product) => /* @__PURE__ */ jsx("span", { className: product.id === viewed.id ? "auden-browse__colour auden-browse__colour--selected" : "auden-browse__colour", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.title }) }, product.id)),
      /* @__PURE__ */ jsx("span", { className: "merchant-store__description", children: "Recently viewed" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "merchant-store__cta", children: "View headphones" })
  ] }) });
}
[
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers
].map(({ id, title, image }) => ({ id, name: title, image }));
const storeName = (brand2) => getBrand(brand2).name;
const contain = (items) => items.map((p) => ({ ...p, brand: p.brand && storeName(p.brand), imageFit: "contain" }));
const FOLLOWUPS = { id: "followups", type: "appear", ms: 500 };
function useFollowLatest(transcriptRef, t) {
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    let cancel;
    const follow = () => {
      const target = viewport.lastElementChild;
      if (!target) return;
      const bottom = target.getBoundingClientRect().bottom;
      const edge = viewport.getBoundingClientRect().bottom - FADE_CLEARANCE;
      if (bottom <= edge) return;
      const top = viewport.scrollTop + bottom - edge;
      cancel?.();
      if (t.reducedMotion) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel?.();
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}
function User({ text, animate }) {
  return /* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`, children: text });
}
function Think({ t, id, cards = false }) {
  const status = t.status(id);
  if (!status) return null;
  return /* @__PURE__ */ jsxs("div", { className: status.visible ? "gj2-think gj2-in-ai" : "gj2-think gj2-think--out", children: [
    /* @__PURE__ */ jsx("span", { className: "gj2-think__mark", children: /* @__PURE__ */ jsx(SparkGlyph, {}) }),
    /* @__PURE__ */ jsx("span", { className: "gj2-think__window", children: /* @__PURE__ */ jsx("span", { className: "gj2-think__line", children: cards ? WAIT_CARDS : WAIT_FIRST }) })
  ] });
}
function Cards({ t, id, products: products2, animate, className }) {
  if (!t.reached(id)) return null;
  return /* @__PURE__ */ jsx("div", { className: [animate && "gj2-rise", className].filter(Boolean).join(" ") || void 0, children: /* @__PURE__ */ jsx(Rail, { products: products2, loading: t.loading(id) }) });
}
function Trail({ t, items, animate }) {
  if (!t.reached("followups")) return null;
  return /* @__PURE__ */ jsx(Followups, { items, className: animate ? "gj2-followups--in" : void 0 });
}
const rise = (animate) => animate ? "sbp-in" : void 0;
const script$2 = {
  brand: catalog.hearthwareCompact.brand,
  userMessage: "I'm looking at this air fryer.",
  assistantMessage: "This one will work, but I'd recommend the next model up for you. You've previously bought for a family of four, and this smaller basket may mean cooking in batches. The larger model gives you more capacity without a significant jump in price."
};
const current = {
  ...catalog.hearthwareCompact,
  name: catalog.hearthwareCompact.title,
  capacity: catalog.hearthwareCompact.size
};
const recommended = {
  ...catalog.hearthwareFamily,
  name: catalog.hearthwareFamily.title,
  capacity: catalog.hearthwareFamily.size
};
const upsell = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  current,
  recommended,
  script: script$2
}, Symbol.toStringTag, { value: "Module" }));
const script$1 = {
  brand: catalog.aurellePendant.brand,
  userMessage: "I'll take this pendant.",
  assistantMessage: "Good choice. You've bought similar styles before. You might also like this chain-link bracelet and beaded anklet. Both match the pendant's gold finish."
};
const anchor$1 = {
  ...catalog.aurellePendant,
  alt: "Gold teardrop pendant being purchased"
};
const addOns = [
  catalog.aurelleBracelet,
  catalog.aurelleAnklet
];
const crossSell = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addOns,
  anchor: anchor$1,
  script: script$1
}, Symbol.toStringTag, { value: "Module" }));
const script = {
  brand: catalog.brewhausMachine.brand,
  userMessage: "I'm getting a new coffee machine.",
  assistantMessage: "If you're setting this up at home, I'd bundle it with these three: a milk frother, reusable filter and coffee starter pack. They're the accessories you're most likely to need, and buying them together saves you from ordering them separately later."
};
const anchor = {
  image: catalog.brewhausMachine.image,
  alt: "Coffee machine being purchased",
  brand: catalog.brewhausMachine.brand,
  title: catalog.brewhausMachine.title,
  price: catalog.brewhausMachine.price
};
const bundle = {
  image: catalog.brewhausKit.image,
  title: catalog.brewhausKit.title,
  price: catalog.brewhausKit.price
};
const bundle$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  anchor,
  bundle,
  script
}, Symbol.toStringTag, { value: "Module" }));
const RISE_MS = 600;
const followups = {
  upsell: ["Add the Family Air Fryer", "Will 6L fit my counter?", "Keep the compact one"],
  crossSell: ["Add both", "Show other bracelets", "What length is the anklet?"],
  bundle: ["Add the bundle", "Just the frother", "What's in the starter pack?"],
  browse: ["How long does the battery last?", "Compare with the one I viewed", "Add to cart"]
};
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const IDLE_MS = 700;
const NUDGE_HOLD_MS = 2800;
const PRESS_MS = 180;
function SheetWindow({ brand: brand2, storefront, beats, children, Frame = SceneFrame, nudge, camera = false, cameraRelease }) {
  const rootRef = useRef(null);
  const transcriptRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [stage, setStage] = useState(nudge ? "idle" : "open");
  const [risen, setRisen] = useState(false);
  const [approach, setApproach] = useState(false);
  useEffect(() => {
    if (!landed) {
      setRisen(false);
      setApproach(false);
      if (nudge) setStage("idle");
      return;
    }
    if (!nudge || prefersReducedMotion()) {
      setStage("open");
      setRisen(true);
      return;
    }
    const lead = camera ? CAMERA_LEAD_MS : 0;
    const at = [IDLE_MS + lead, IDLE_MS + lead + NUDGE_HOLD_MS, IDLE_MS + lead + NUDGE_HOLD_MS + PRESS_MS];
    const timers = [
      ...camera ? [window.setTimeout(() => setApproach(true), IDLE_MS)] : [],
      window.setTimeout(() => setStage("nudge"), at[0]),
      window.setTimeout(() => setStage("pressed"), at[1]),
      window.setTimeout(() => setStage("open"), at[2]),
      window.setTimeout(() => setRisen(true), at[2] + RISE_MS)
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [landed, nudge, camera]);
  const played = useCameraBeats(beats, camera, !!nudge, cameraRelease);
  const t = useChatTimeline(played, risen);
  const inertRef = useRef(null);
  useFollowLatest(camera ? inertRef : transcriptRef, t);
  useSmoothFollow(camera ? transcriptRef : inertRef, t);
  const cam = useChatCamera(t, camera, stage, !!nudge, approach, cameraRelease);
  const name = storeName(brand2);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(Frame, { children: /* @__PURE__ */ jsx("div", { ref: cam.ref, className: cam.className, style: cam.style, onTransitionEnd: cam.onTransitionEnd, children: /* @__PURE__ */ jsx(ScaleToFit, { contentWidth: PHONE_W, contentHeight: PHONE_H, maxWidth: SLOT_W, maxHeight: SLOT_H, children: /* @__PURE__ */ jsxs("div", { className: `gjm-screen gjmm gjmm--${stage} hm2--${stage}`, children: [
    storefront,
    nudge && /* @__PURE__ */ jsxs("div", { className: "gjm-launcher gjmm-launcher", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm2-nudge", role: "status", children: [
        /* @__PURE__ */ jsx(BrandMark, { brand: name, className: "hm2-nudge__disc" }),
        /* @__PURE__ */ jsxs("div", { className: "hm2-nudge__col", children: [
          /* @__PURE__ */ jsx("span", { className: "hm2-nudge__head", children: name }),
          /* @__PURE__ */ jsx("span", { className: "hm2-nudge__desc", children: nudge })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hm2-nudge__close", "aria-label": "Dismiss", children: "×" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "piw2-orb gjmm-orb", "aria-label": "Open chat", children: /* @__PURE__ */ jsx(BrandMark, { brand: name, className: "gjm-orb-mark" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "gjm-scrim gjmm-scrim" }),
    /* @__PURE__ */ jsx("div", { className: "gjmm-sheet-slot", children: /* @__PURE__ */ jsxs("div", { className: "gj2-win gjm-sheet", children: [
      /* @__PURE__ */ jsx("span", { className: "gjm-grab", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(ChatHead, { brand: name }),
      /* @__PURE__ */ jsx("div", { className: "gj2-transcript", ref: transcriptRef, children: children(t, !t.reducedMotion) }, t.runKey),
      /* @__PURE__ */ jsx(ChatFoot, { value: t.composer?.value || void 0 })
    ] }) })
  ] }) }) }) }) });
}
function LoneCard({ t, id, product, animate }) {
  if (!t.reached(id)) return null;
  return /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(ProductCard, { product, lone: true, loading: t.loading(id) }) });
}
function ComparisonCard({ columns, rows, loading }) {
  return /* @__PURE__ */ jsxs("div", { className: "um2-cmp-wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: loading ? "um2-cmp__skel" : "um2-cmp__skel um2-cmp__skel--hidden", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", { className: "um2-cmp__bone um2-cmp__bone--head" }),
      rows.map((_, i) => /* @__PURE__ */ jsx("span", { className: "um2-cmp__bone" }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "um2-cmp", role: "table", children: [
      /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row um2-cmp__row--head", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "columnheader", children: "What matters" }),
        columns.map((c) => /* @__PURE__ */ jsxs("span", { role: "columnheader", className: "um2-cmp__product", children: [
          /* @__PURE__ */ jsx("span", { className: "um2-cmp__thumb", children: /* @__PURE__ */ jsx("img", { src: c.image, alt: "" }) }),
          c.name
        ] }, c.name))
      ] }),
      rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: row.label }),
        row.values.map((v, i) => /* @__PURE__ */ jsx("span", { role: "cell", children: v }, i))
      ] }, row.label)),
      /* @__PURE__ */ jsxs("div", { className: "um2-cmp__row um2-cmp__row--foot", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: "Details" }),
        columns.map((c) => /* @__PURE__ */ jsxs("span", { role: "cell", className: "um2-cmp__view", children: [
          /* @__PURE__ */ jsx("span", { className: "um2-cmp__view-word", children: "View" }),
          " ",
          /* @__PURE__ */ jsx(ViewOutGlyph, {})
        ] }, c.name))
      ] })
    ] })
  ] });
}
function ViewOutGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", width: 10, height: 10, fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5l5-5M4.5 3.5h4v4" }) });
}
const upsellColumns = [recommended, current];
const upsellRows = [
  { label: "Capacity", values: upsellColumns.map((c) => c.capacity) },
  { label: "Price", values: upsellColumns.map((c) => c.price) }
];
const upsellBeats = [
  { id: "ask", type: "compose", text: script$2.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two models"] },
  { id: "reply", type: "text", text: script$2.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
  FOLLOWUPS
];
function UpsellUpgradeV2CameraMotion() {
  return /* @__PURE__ */ jsx(UpsellUpgradeV2Motion, { camera: true });
}
function UpsellUpgradeV2Motion({ camera = false } = {}) {
  const { script: script2, current: current2 } = upsell;
  return /* @__PURE__ */ jsx(SheetWindow, { brand: script2.brand, beats: upsellBeats, camera, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Air fryers", "Accessories", "Recipes"],
      heading: "A little more room for dinner.",
      product: { image: current2.image, title: current2.name, price: current2.price },
      secondary: { image: recommended.image, title: recommended.name, price: recommended.price }
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: current2.image, title: current2.name, meta: `${storeName(script2.brand)} · ${current2.price} · ${current2.capacity}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    t.reached("compare") && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(ComparisonCard, { columns: upsellColumns, rows: upsellRows, loading: t.loading("compare") }) }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups.upsell, animate })
  ] }) });
}
const crossSellBeats = [
  { id: "ask", type: "compose", text: script$1.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding what goes with it"] },
  { id: "reply", type: "text", text: script$1.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
  FOLLOWUPS
];
function CrossSellV2CameraMotion() {
  return /* @__PURE__ */ jsx(CrossSellV2Motion, { camera: true });
}
function CrossSellV2Motion({ camera = false } = {}) {
  const { script: script2, anchor: anchor2, addOns: addOns2 } = crossSell;
  return /* @__PURE__ */ jsx(SheetWindow, { brand: script2.brand, beats: crossSellBeats, camera, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Necklaces", "Bracelets", "Anklets"],
      heading: "The finishing touches.",
      product: anchor2,
      secondary: addOns2[1]
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: anchor2.image, title: anchor2.title, meta: storeName(anchor2.brand), className: rise(animate) }),
    /* @__PURE__ */ jsx(User, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: contain(addOns2), animate }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups.crossSell, animate })
  ] }) });
}
const bundleBeats = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Picking the right add-ons"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "bundle", type: "load", ms: 750 },
  FOLLOWUPS
];
const bundleCard = {
  id: "bundle",
  title: bundle.title,
  brand: storeName(script.brand),
  image: bundle.image,
  price: bundle.price,
  tag: "Bundle · 3 items",
  imageFit: "contain"
};
function BundleBuildingV2CameraMotion() {
  return /* @__PURE__ */ jsx(BundleBuildingV2Motion, { camera: true });
}
function BundleBuildingV2Motion({ camera = false } = {}) {
  const { script: script2, anchor: anchor2 } = bundle$1;
  return /* @__PURE__ */ jsx(SheetWindow, { brand: script2.brand, beats: bundleBeats, camera, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Machines", "Coffee", "Accessories"],
      heading: "Your morning, made simple.",
      product: anchor2,
      secondary: bundleCard
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: anchor2.image, title: anchor2.title, meta: storeName(anchor2.brand), className: rise(animate) }),
    /* @__PURE__ */ jsx(User, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(LoneCard, { t, id: "bundle", product: bundleCard, animate }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups.bundle, animate })
  ] }) });
}
const browseBeats = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "viewed", type: "appear", ms: 700 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: script$3.assistantMessage },
  { id: "card", type: "load", ms: 750 },
  FOLLOWUPS
];
function BrowseUpsellV2CameraMotion() {
  return /* @__PURE__ */ jsx(BrowseUpsellV2Motion, { camera: true });
}
function BrowseUpsellV2Motion({ camera = false } = {}) {
  const { script: script2, previouslyViewed: previouslyViewed2, recommendedProduct: recommendedProduct2 } = browse;
  return /* @__PURE__ */ jsx(SheetWindow, { brand: script2.brand, beats: browseBeats, camera, cameraRelease: "card", storefront: /* @__PURE__ */ jsx(AudenBrowseStorefront, {}), nudge: "Still comparing headphones? There's one worth a look.", children: (t, animate) => t.passed("lead") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: ["sbp-row um2-viewed", rise(animate)].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsx("span", { className: "um2-viewed__stack", children: previouslyViewed2.items.map((item, i) => /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb um2-viewed__thumb", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.alt }) }, i)) }),
      /* @__PURE__ */ jsxs("span", { className: "sbp-row__col", children: [
        /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: "Recently viewed" }),
        /* @__PURE__ */ jsx("span", { className: "sbp-row__meta", children: previouslyViewed2.caption })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(LoneCard, { t, id: "card", product: contain([recommendedProduct2])[0], animate }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups.browse, animate })
  ] }) });
}
function SellCameraColorContext({ children }) {
  return /* @__PURE__ */ jsx(ColorContext, { variant: "crimson", children });
}
export {
  BrowseUpsellV2CameraMotion as BrowseUpsellCameraMotion,
  BundleBuildingV2CameraMotion as BundleBuildingCameraMotion,
  CrossSellV2CameraMotion as CrossSellCameraMotion,
  SellCameraColorContext,
  UpsellUpgradeV2CameraMotion as UpsellUpgradeCameraMotion
};
