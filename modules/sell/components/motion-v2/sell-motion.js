"use client";

// Built from the "Crossword — Sell: Conversational interface v2 (motion)" source (the package with the camera
// versions of Upsell 17b–20b, Conversion assist 28b–33b and Human mode 34b; the 11 November 2026 update with the window
// standard, 34m and 21m–23m) with Vite, unminified, React external.
// See ./index.tsx for the mechanical changes.

import { createContext, useContext, useState, useEffect, useRef, useMemo, useLayoutEffect, Fragment as Fragment$1, useCallback, createElement } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
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
const moreDots = "/images/sell/motion-v2/assets/more-dots-B3DDHqii.svg";
const texture = "/images/sell/motion-v2/assets/texture-CPOrYb6a.webp";
function ChannelContainer({ children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: ["sv-ill-channel-container", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("img", { className: "sv-ill-channel-container__texture", src: texture, alt: "", "aria-hidden": "true" }),
    children
  ] });
}
const webActive = "/images/sell/motion-v2/assets/web-active-D5fy6DvW.svg";
const webInactive = "/images/sell/motion-v2/assets/web-inactive-CFSTqWod.svg";
const imessageActive = "/images/sell/motion-v2/assets/imessage-active-CK8RG-9x.svg";
const imessageInactive = "/images/sell/motion-v2/assets/imessage-inactive-C2YfmYRE.svg";
const waActive = "/images/sell/motion-v2/assets/wa-active-CsVdLC36.svg";
const waInactive = "/images/sell/motion-v2/assets/wa-inactive-C-yKLAD7.svg";
const instaActive = "/images/sell/motion-v2/assets/insta-active-WzwGAgJg.svg";
const instaInactive = "/images/sell/motion-v2/assets/insta-inactive-Do-1TlKI.svg";
const brand$2 = "Sorelle Labs";
const script$i = {
  turn1User: "Hi! Does this come in size M?",
  turn1Support: "Yes, size M is back in stock. Want me to add it to your cart?",
  turn2User: "Yes please!",
  turn2Support: "Done — it's in your cart, ready whenever you are."
};
const instagramReplyLines = {
  turn1: ["Yes, size M is back in stock.", "Want me to add it to your cart?"],
  turn2: ["Done — it's in your cart,", "ready whenever you are."]
};
const channels = [
  { id: "web", label: "Web", active: webActive, inactive: webInactive },
  { id: "imessage", label: "iMessage", active: imessageActive, inactive: imessageInactive },
  { id: "whatsapp", label: "WhatsApp", active: waActive, inactive: waInactive },
  { id: "instagram", label: "Instagram", active: instaActive, inactive: instaInactive }
];
function CornerDots() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-frame__tray-item-dot sv-ill-channel-frame__tray-item-dot--tl", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-frame__tray-item-dot sv-ill-channel-frame__tray-item-dot--tr", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-frame__tray-item-dot sv-ill-channel-frame__tray-item-dot--br", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-frame__tray-item-dot sv-ill-channel-frame__tray-item-dot--bl", "aria-hidden": "true" })
  ] });
}
function ChannelFrame({
  active,
  motion = false,
  children
}) {
  const activeIndex = channels.findIndex((c) => c.id === active);
  return /* @__PURE__ */ jsxs(ChannelContainer, { className: "sv-ill-channel-frame", children: [
    /* @__PURE__ */ jsxs(
      "ul",
      {
        className: motion ? "sv-ill-channel-frame__tray sv-ill-channel-frame__tray--motion" : "sv-ill-channel-frame__tray",
        style: motion ? { "--tray-active": activeIndex } : void 0,
        children: [
          channels.map((channel) => {
            const isActive = channel.id === active;
            return /* @__PURE__ */ jsxs("li", { className: "sv-ill-channel-frame__tray-item", "aria-current": isActive || void 0, children: [
              motion ? /* @__PURE__ */ jsxs("span", { className: "sv-ill-channel-frame__tray-glyphs", children: [
                /* @__PURE__ */ jsx("img", { className: "sv-ill-channel-frame__tray-glyph--inactive", src: channel.inactive, alt: channel.label, width: 28.622, height: 28.622 }),
                /* @__PURE__ */ jsx("img", { className: "sv-ill-channel-frame__tray-glyph--active", src: channel.active, alt: "", width: 28.622, height: 28.622 })
              ] }) : /* @__PURE__ */ jsx("img", { src: isActive ? channel.active : channel.inactive, alt: channel.label, width: 28.622, height: 28.622 }),
              /* @__PURE__ */ jsx(CornerDots, {})
            ] }, channel.id);
          }),
          /* @__PURE__ */ jsxs("li", { className: "sv-ill-channel-frame__tray-item sv-ill-channel-frame__tray-item--more", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("img", { src: moreDots, alt: "", width: 24.843, height: 6.622 }),
            /* @__PURE__ */ jsx(CornerDots, {})
          ] }),
          motion && /* @__PURE__ */ jsx("li", { className: "sv-ill-channel-frame__tray-indicator", "aria-hidden": "true" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "sv-ill-channel-frame__shell", children })
  ] });
}
const history$1 = "/images/sell/motion-v2/assets/history-Dyvg9hTe.svg";
const add$1 = "/images/sell/motion-v2/assets/add-CkLJynCo.svg";
const expand$1 = "/images/sell/motion-v2/assets/expand-Dgz5enWN.svg";
const close$1 = "/images/sell/motion-v2/assets/close-67XxIvJp.svg";
const send$1 = "/images/sell/motion-v2/assets/send-GPAabXgG.svg";
function HeaderButton({ src, label, w, h }) {
  return /* @__PURE__ */ jsx("span", { className: "sv-ill-web-shell__icon-btn", "aria-label": label, children: /* @__PURE__ */ jsx("img", { src, alt: "", width: w, height: h }) });
}
function WebChannel() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-channel-shell sv-ill-web-shell", children: [
    /* @__PURE__ */ jsxs("header", { className: "sv-ill-web-shell__header", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-web-shell__group", children: [
        /* @__PURE__ */ jsx(HeaderButton, { src: history$1, label: "History", w: 6.892, h: 6.618 }),
        /* @__PURE__ */ jsx(HeaderButton, { src: add$1, label: "New conversation", w: 6.618, h: 6.618 })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-web-shell__brand", children: brand$2 }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-web-shell__group", children: [
        /* @__PURE__ */ jsx(HeaderButton, { src: expand$1, label: "Expand", w: 6.067, h: 6.067 }),
        /* @__PURE__ */ jsx(HeaderButton, { src: close$1, label: "Close", w: 5.516, h: 5.515 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-web-shell__body", children: [
      /* @__PURE__ */ jsx("p", { className: "sv-ill-web-shell__user", children: script$i.turn1User }),
      /* @__PURE__ */ jsx("p", { className: "sv-ill-web-shell__reply", children: script$i.turn1Support }),
      /* @__PURE__ */ jsx("p", { className: "sv-ill-web-shell__user", children: script$i.turn2User }),
      /* @__PURE__ */ jsx("p", { className: "sv-ill-web-shell__reply", children: script$i.turn2Support })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-web-shell__composer", children: [
      /* @__PURE__ */ jsx("span", { className: "sv-ill-web-shell__composer-text", children: "Where’s my order?" }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-web-shell__send", "aria-label": "Send", children: /* @__PURE__ */ jsx("img", { src: send$1, alt: "", width: 8.549, height: 7.465 }) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-shell__glow sv-ill-channel-shell__glow--offset", "aria-hidden": "true" })
  ] });
}
const back$1 = "/images/sell/motion-v2/assets/back-Dnig1nB0.svg";
const brandMark$1 = "/images/sell/motion-v2/assets/brand-mark-BILZ8ERL.svg";
const chevron = "/images/sell/motion-v2/assets/chevron-BWK4xv3x.svg";
const tailIn$1 = "/images/sell/motion-v2/assets/tail-in-BbxTVNFW.svg";
const tailOut$1 = "/images/sell/motion-v2/assets/tail-out-D5Ab4FVo.svg";
const plus = "/images/sell/motion-v2/assets/plus-B9l-KGIu.svg";
function Message({ side, label, text }) {
  return /* @__PURE__ */ jsxs("div", { className: `sv-ill-im-shell__msg sv-ill-im-shell__msg--${side}`, children: [
    /* @__PURE__ */ jsx("span", { className: "sv-ill-im-shell__label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-im-shell__bubble-wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "sv-ill-im-shell__bubble", children: text }),
      /* @__PURE__ */ jsx("img", { className: "sv-ill-im-shell__tail", src: side === "in" ? tailIn$1 : tailOut$1, alt: "", width: 12.173, height: 7.101 })
    ] })
  ] });
}
function IMessageChannel() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-channel-shell sv-ill-im-shell", children: [
    /* @__PURE__ */ jsx("header", { className: "sv-ill-im-shell__header", children: /* @__PURE__ */ jsxs("div", { className: "sv-ill-im-shell__header-row", children: [
      /* @__PURE__ */ jsx("img", { className: "sv-ill-im-shell__back", src: back$1, alt: "", width: 13.179, height: 13.179 }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-im-shell__contact", children: [
        /* @__PURE__ */ jsx("span", { className: "sv-ill-im-shell__avatar", children: /* @__PURE__ */ jsx("img", { src: brandMark$1, alt: "", width: 10.535, height: 10.433 }) }),
        /* @__PURE__ */ jsxs("span", { className: "sv-ill-im-shell__name", children: [
          "Tobias  ",
          /* @__PURE__ */ jsx("img", { src: chevron, alt: "", width: 2.028, height: 3.548 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-im-shell__spacer" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-im-shell__body", children: [
      /* @__PURE__ */ jsx(Message, { side: "in", label: "Shopper", text: script$i.turn1User }),
      /* @__PURE__ */ jsx(Message, { side: "out", label: "Shopper", text: script$i.turn1Support }),
      /* @__PURE__ */ jsx(Message, { side: "in", label: "Shopper", text: script$i.turn2User }),
      /* @__PURE__ */ jsx(Message, { side: "out", label: "Shopper", text: script$i.turn2Support })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "sv-ill-im-shell__toolbar", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-im-shell__field", children: [
        /* @__PURE__ */ jsx("span", { className: "sv-ill-im-shell__placeholder", children: "Text message" }),
        /* @__PURE__ */ jsxs("svg", { className: "sv-ill-im-shell__mic", width: "6", height: "9", viewBox: "0 0 6 9", fill: "none", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("rect", { x: "1.5", y: "0.5", width: "3", height: "5", rx: "1.5", stroke: "#727272", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("path", { d: "M0.6 4.2a2.4 2.4 0 004.8 0M3 6.6v1.8", stroke: "#727272", strokeWidth: "0.8", strokeLinecap: "round" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-im-shell__plus", children: /* @__PURE__ */ jsx("img", { src: plus, alt: "", width: 9.262, height: 9.262 }) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-shell__glow sv-ill-channel-shell__glow--offset", "aria-hidden": "true" })
  ] });
}
const wallpaper = "/images/sell/motion-v2/assets/wallpaper-DMdnJD5x.webp";
const back = "/images/sell/motion-v2/assets/back-Cs3rD3YD.svg";
const avatar = "/images/sell/motion-v2/assets/avatar-sWYaiMIw.svg";
const verified = "/images/sell/motion-v2/assets/verified-DzJdQLDZ.svg";
const ticks = "/images/sell/motion-v2/assets/ticks-DMYIT4ne.svg";
const tailOut = "/images/sell/motion-v2/assets/tail-out-Cex4NTMP.svg";
const tailIn = "/images/sell/motion-v2/assets/tail-in-Dpe1fJQK.svg";
const divider = "/images/sell/motion-v2/assets/divider-YhVQjVnC.svg";
const plusV = "/images/sell/motion-v2/assets/plus-v-XVkbattK.svg";
const plusH = "/images/sell/motion-v2/assets/plus-h-BfGbKY0m.svg";
const camera = "/images/sell/motion-v2/assets/camera-2gDUm3I7.svg";
const mic = "/images/sell/motion-v2/assets/mic-Cav53jcz.svg";
const attachment = "/images/sell/motion-v2/assets/attachment-CWfzMvhW.svg";
function Bubble({ side, text, short }) {
  return /* @__PURE__ */ jsxs("div", { className: `sv-ill-wa-shell__row sv-ill-wa-shell__row--${side}`, children: [
    side === "in" && /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__tail sv-ill-wa-shell__tail--in", src: tailIn, alt: "", width: 8, height: 15 }),
    /* @__PURE__ */ jsxs("div", { className: `sv-ill-wa-shell__bubble${short ? " sv-ill-wa-shell__bubble--short" : ""}`, children: [
      /* @__PURE__ */ jsx("p", { className: "sv-ill-wa-shell__text", children: text }),
      /* @__PURE__ */ jsxs("span", { className: "sv-ill-wa-shell__meta", children: [
        /* @__PURE__ */ jsx("span", { children: "11. 00" }),
        side === "out" && /* @__PURE__ */ jsx("img", { src: ticks, alt: "", width: 8.08, height: 7.542 })
      ] })
    ] }),
    side === "out" && /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__tail", src: tailOut, alt: "", width: 8, height: 15 })
  ] });
}
function WhatsAppChannel() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-channel-shell sv-ill-wa-shell", children: [
    /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__wallpaper", src: wallpaper, alt: "", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("header", { className: "sv-ill-wa-shell__header", children: /* @__PURE__ */ jsxs("div", { className: "sv-ill-wa-shell__header-left", children: [
      /* @__PURE__ */ jsxs("span", { className: "sv-ill-wa-shell__back", children: [
        /* @__PURE__ */ jsx("img", { src: back, alt: "", width: 7, height: 11 }),
        /* @__PURE__ */ jsx("span", { children: "12" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-wa-shell__profile", children: [
        /* @__PURE__ */ jsx("img", { src: avatar, alt: "", width: 24.48, height: 24.48 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "sv-ill-wa-shell__name", children: [
            brand$2,
            /* @__PURE__ */ jsx("img", { src: verified, alt: "", width: 12.24, height: 12.24 })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "sv-ill-wa-shell__status", children: "online" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-wa-shell__body", children: [
      /* @__PURE__ */ jsx(Bubble, { side: "out", text: script$i.turn1User }),
      /* @__PURE__ */ jsx(Bubble, { side: "in", text: script$i.turn1Support }),
      /* @__PURE__ */ jsx(Bubble, { side: "out", text: script$i.turn2User, short: true }),
      /* @__PURE__ */ jsx(Bubble, { side: "in", text: script$i.turn2Support })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "sv-ill-wa-shell__bar", children: [
      /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__divider", src: divider, alt: "", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("span", { className: "sv-ill-wa-shell__plus", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("img", { src: plusV, alt: "", width: 0.999, height: 12.99 }),
        /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__plus-h", src: plusH, alt: "", width: 0.999, height: 12.99 })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "sv-ill-wa-shell__field", children: [
        /* @__PURE__ */ jsx("span", { children: "Message" }),
        /* @__PURE__ */ jsx("img", { src: attachment, alt: "", width: 15.988, height: 15.988 })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__camera", src: camera, alt: "", width: 15.988, height: 15.988 }),
      /* @__PURE__ */ jsx("img", { className: "sv-ill-wa-shell__mic", src: mic, alt: "", width: 21.318, height: 21.318 })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-shell__glow", "aria-hidden": "true" })
  ] });
}
const brandMark = "/images/sell/motion-v2/assets/brand-mark-BILZ8ERL.svg";
const info = "/images/sell/motion-v2/assets/info-ChbFz1r3.svg";
const brandMarkSm = "/images/sell/motion-v2/assets/brand-mark-sm-PMK-0aN1.svg";
const composerCamera = "/images/sell/motion-v2/assets/composer-camera-BteRoAJq.svg";
const composerActions = "/images/sell/motion-v2/assets/composer-actions-Z4GvydlB.svg";
function Avatar({ size }) {
  return /* @__PURE__ */ jsx("span", { className: `sv-ill-ig-shell__avatar sv-ill-ig-shell__avatar--${size}`, children: size === "sm" ? /* @__PURE__ */ jsx("img", { src: brandMark, alt: "", width: 12.283, height: 12.165 }) : /* @__PURE__ */ jsx("img", { src: brandMarkSm, alt: "", width: 9.65, height: 9.558 }) });
}
function Reply({ lines }) {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-ig-shell__row sv-ill-ig-shell__row--in", children: [
    /* @__PURE__ */ jsx(Avatar, { size: "md" }),
    /* @__PURE__ */ jsxs("p", { className: "sv-ill-ig-shell__bubble sv-ill-ig-shell__bubble--in", children: [
      lines[0],
      /* @__PURE__ */ jsx("br", {}),
      lines[1]
    ] })
  ] });
}
function InstagramChannel() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-channel-shell sv-ill-ig-shell", children: [
    /* @__PURE__ */ jsxs("header", { className: "sv-ill-ig-shell__header", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-ig-shell__identity", children: [
        /* @__PURE__ */ jsx(Avatar, { size: "sm" }),
        /* @__PURE__ */ jsx("span", { className: "sv-ill-ig-shell__name", children: brand$2 })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-ig-shell__icon-btn", children: /* @__PURE__ */ jsx("img", { src: info, alt: "", width: 11.724, height: 11.724 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-ig-shell__body", children: [
      /* @__PURE__ */ jsx("div", { className: "sv-ill-ig-shell__row sv-ill-ig-shell__row--out", children: /* @__PURE__ */ jsx("p", { className: "sv-ill-ig-shell__bubble sv-ill-ig-shell__bubble--out", children: script$i.turn1User }) }),
      /* @__PURE__ */ jsx(Reply, { lines: instagramReplyLines.turn1 }),
      /* @__PURE__ */ jsx("div", { className: "sv-ill-ig-shell__row sv-ill-ig-shell__row--out", children: /* @__PURE__ */ jsx("p", { className: "sv-ill-ig-shell__bubble sv-ill-ig-shell__bubble--out", children: script$i.turn2User }) }),
      /* @__PURE__ */ jsx(Reply, { lines: instagramReplyLines.turn2 })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "sv-ill-ig-shell__footer", children: /* @__PURE__ */ jsxs("div", { className: "sv-ill-ig-shell__composer", children: [
      /* @__PURE__ */ jsx("img", { src: composerCamera, alt: "", width: 19.623, height: 18.868 }),
      /* @__PURE__ */ jsx("span", { className: "sv-ill-ig-shell__actions", children: /* @__PURE__ */ jsx("img", { src: composerActions, alt: "" }) })
    ] }) }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-shell__glow", "aria-hidden": "true" })
  ] });
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
const SHELLS = {
  web: /* @__PURE__ */ jsx(WebChannel, {}),
  imessage: /* @__PURE__ */ jsx(IMessageChannel, {}),
  whatsapp: /* @__PURE__ */ jsx(WhatsAppChannel, {}),
  instagram: /* @__PURE__ */ jsx(InstagramChannel, {})
};
const STEP_MS = 3400;
function CompleteChannelDeploymentMotion$1() {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [step, setStep] = useState({ current: 0, previous: -1 });
  const [runKey, setRunKey] = useState(0);
  useEffect(() => {
    if (!landed) return;
    setStep({ current: 0, previous: -1 });
    setRunKey((k) => k + 1);
    const timer = window.setInterval(() => {
      setStep(({ current: current2 }) => ({ current: (current2 + 1) % channels.length, previous: current2 }));
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [landed]);
  const active = channels[step.current].id;
  return /* @__PURE__ */ jsx("div", { className: "ccd-motion", ref: rootRef, children: /* @__PURE__ */ jsx(ChannelFrame, { active, motion: true, children: /* @__PURE__ */ jsx("div", { className: "ccd-motion__stage", children: channels.map((channel, i) => {
    const state = i === step.current ? "active" : i === step.previous ? "leaving" : "hidden";
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `ccd-motion__shell ccd-motion__shell--${state}`,
        "aria-hidden": state !== "active" || void 0,
        children: SHELLS[channel.id]
      },
      channel.id
    );
  }) }, runKey) }) });
}
const __vite_glob_0_0 = "/images/sell/motion-v2/assets/amber-and-oak-mark-fxg20Grc.svg";
const __vite_glob_0_1 = "/images/sell/motion-v2/assets/aura-mark-DpXI8V8Q.svg";
const __vite_glob_0_2 = "/images/sell/motion-v2/assets/aurelia-mark-Bh18_Lw6.svg";
const __vite_glob_0_3 = "/images/sell/motion-v2/assets/aurelle-mark-BUbtN7nf.svg";
const __vite_glob_0_4 = "/images/sell/motion-v2/assets/brewhaus-mark-C30bIvyV.svg";
const __vite_glob_0_5 = "/images/sell/motion-v2/assets/crestline-mark-BYdfHI0-.svg";
const __vite_glob_0_6 = "/images/sell/motion-v2/assets/dusklight-mark-e281Q9el.svg";
const __vite_glob_0_7 = "/images/sell/motion-v2/assets/goodwell-mark-B8uogM9l.svg";
const __vite_glob_0_8 = "/images/sell/motion-v2/assets/marais-mark-Dtz5V4-o.svg";
const __vite_glob_0_9 = "/images/sell/motion-v2/assets/moonrest-mark-CqubK1ze.svg";
const __vite_glob_0_10 = "/images/sell/motion-v2/assets/proteinmax-mark-CAjpFhM5.svg";
const __vite_glob_0_11 = "/images/sell/motion-v2/assets/sorelle-labs-mark-CQBfsdpQ.svg";
const __vite_glob_0_12 = "/images/sell/motion-v2/assets/stride-mark-BhAcSYrg.svg";
const __vite_glob_0_13 = "/images/sell/motion-v2/assets/trailwell-mark-DWHfUX1B.svg";
const __vite_glob_1_0 = "/images/sell/motion-v2/assets/amber-and-oak-mark-DyBTEnHG.svg";
const __vite_glob_1_1 = "/images/sell/motion-v2/assets/aurelia-mark-WAhMDRAF.svg";
const __vite_glob_1_2 = "/images/sell/motion-v2/assets/aurelle-mark-CkALuNbG.svg";
const __vite_glob_1_3 = "/images/sell/motion-v2/assets/brewhaus-mark-CPBhNKZi.svg";
const __vite_glob_1_4 = "/images/sell/motion-v2/assets/crestline-mark-x07nlP5x.svg";
const __vite_glob_1_5 = "/images/sell/motion-v2/assets/dusklight-mark-BxLi6ckI.svg";
const __vite_glob_1_6 = "/images/sell/motion-v2/assets/moonrest-mark-C1S3y54t.svg";
const __vite_glob_1_7 = "/images/sell/motion-v2/assets/sorelle-labs-mark-DwV8-BRm.svg";
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
const auden$1 = {
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
  auden: auden$1,
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
const goodwellMark = "/images/sell/motion-v2/assets/goodwell-mark-D2M8-7dz.svg";
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
const amberChairImage = "/images/sell/motion-v2/assets/amber-oak-lounge-chair-Dc-4UdBJ.webp";
const amberOpalLampImage = "/images/sell/motion-v2/assets/amber-oak-opal-glass-lamp-CSWTBSbc.webp";
const amberPleatedLampImage = "/images/sell/motion-v2/assets/amber-oak-pleated-linen-lamp-DU9AZH7n.webp";
const trailwellWeekenderImage = "/images/sell/motion-v2/assets/trailwell-weekender-FcXfEIMe.webp";
const trailwellRoamImage = "/images/sell/motion-v2/assets/trailwell-roam-E1xpy3ga.webp";
const trailwellOvernightImage = "/images/sell/motion-v2/assets/trailwell-overnight-Bh3WrqOg.webp";
const strideCourt = "/images/sell/motion-v2/assets/court-01-CdgB4UN7.webp";
const strideRunner = "/images/sell/motion-v2/assets/suede-runner-CgZl6zbH.webp";
const strideLoafer = "/images/sell/motion-v2/assets/penny-loafer-B2im49V5.webp";
const sorelleSetImage = "/images/sell/motion-v2/assets/sorelle-hydration-set-9Ig4QSA_.webp";
const sorelleGelImage = "/images/sell/motion-v2/assets/sorelle-cloud-gel-BMJMi5HN.webp";
const sorelleLotionImage = "/images/sell/motion-v2/assets/sorelle-barrier-lotion-ZlOVOOrp.webp";
const sorelleCreamImage = "/images/sell/motion-v2/assets/sorelle-hydration-cream-DnCPkHXM.webp";
const vitaminCSerum = "/images/sell/motion-v2/assets/vitamin-c-serum-vnf_1nLn.webp";
const goodwell_sleep_60 = "/images/sell/motion-v2/assets/goodwell-sleep-60-CC2pkEiH.webp";
const goodwell_sleep_28 = "/images/sell/motion-v2/assets/goodwell-sleep-28-CDykoAsw.webp";
const goodwell_energy = "/images/sell/motion-v2/assets/goodwell-energy-DTBla5fb.webp";
const goodwell_focus = "/images/sell/motion-v2/assets/goodwell-focus-Bg4PysvQ.webp";
const goodwell_calm = "/images/sell/motion-v2/assets/goodwell-calm-BFGrK6_s.webp";
const goodwell_immunity = "/images/sell/motion-v2/assets/goodwell-immunity-MpMIo6Dd.webp";
const moonrest_sleep = "/images/sell/motion-v2/assets/moonrest-sleep-Cn_bYWCE.webp";
const dusklight_arc = "/images/sell/motion-v2/assets/dusklight-arc-BLtDyKob.svg";
const dusklight_linear = "/images/sell/motion-v2/assets/dusklight-linear-CNxIsC3B.svg";
const crestlineHelmet = "/images/sell/motion-v2/assets/crestline-helmet-ByadbiwR.webp";
const aurelleAnkletImage = "/images/sell/motion-v2/assets/beaded-gold-anklet-BD5cJanU.webp";
const aurellePendantImage = "/images/sell/motion-v2/assets/teardrop-pendant-necklace-D-dhIf6_.webp";
const aurelleBraceletImage = "/images/sell/motion-v2/assets/chain-link-bracelet-GsLwly7K.webp";
const aurelleRosePendantImage = "/images/sell/motion-v2/assets/rose-gold-teardrop-pendant-D6EiuVDi.webp";
const aurelleHaloImage = "/images/sell/motion-v2/assets/rose-gold-halo-pendant-D9hm3seh.webp";
const aurelleBarImage = "/images/sell/motion-v2/assets/rose-gold-bar-pendant-BLV_GvgY.webp";
const aurelleBoxChainImage = "/images/sell/motion-v2/assets/rose-gold-fine-box-chain-xCJee_59.webp";
const aurelleSnakeChainImage = "/images/sell/motion-v2/assets/rose-gold-snake-chain-CAeWdfsC.webp";
const aurelleCurbChainImage = "/images/sell/motion-v2/assets/rose-gold-curb-chain-JMoFIQPj.webp";
const espressoMachine = "/images/sell/motion-v2/assets/01-brewhaus-pro-espresso-machine-CnXtbuBY.webp";
const accessoryBundle = "/images/sell/motion-v2/assets/02-brewhaus-coffee-accessory-bundle-C2tDu5VG.webp";
const leatherFrameCase = "/images/sell/motion-v2/assets/marais-eyewear-case-JN3ZsUf8.webp";
const silkScarf = "/images/sell/motion-v2/assets/04-marais-gold-tone-silk-scarf-CNixvkq3.webp";
const smartSpeaker = "/images/sell/motion-v2/assets/05-waveline-compact-smart-speaker-Bnwh8J7N.webp";
const wirelessEarbuds = "/images/sell/motion-v2/assets/06-aura-wireless-earbuds-D4tIAj5K.webp";
const leatherWallet = "/images/sell/motion-v2/assets/07-holt-and-co-leather-bifold-wallet-Djl5CNb1.webp";
const auden = "/images/sell/motion-v2/assets/08-auden-wave-pro-black-DBohKiBG.webp";
const audenIvory = "/images/sell/motion-v2/assets/09-auden-viewed-headphones-ivory-DJtMgVTi.webp";
const audenOlive = "/images/sell/motion-v2/assets/10-auden-viewed-headphones-olive-CXNlTcjR.webp";
const audenMustard = "/images/sell/motion-v2/assets/11-auden-viewed-headphones-mustard-gold-Bfg04pgZ.webp";
const familyAirFryer = "/images/sell/motion-v2/assets/12-family-air-fryer-CWIb1OmL.webp";
const compactAirFryer = "/images/sell/motion-v2/assets/13-compact-air-fryer-BxJsr6WI.webp";
const referenceLamp = "/images/sell/motion-v2/assets/14-shopper-reference-triple-dome-lamp-aevpNtcM.webp";
const tripodLamp = "/images/sell/motion-v2/assets/15-warm-tripod-table-lamp-DHLSJYdp.webp";
const domeLamp = "/images/sell/motion-v2/assets/16-mod-dome-table-lamp-EjQrNJOK.webp";
const bedsideLamp = "/images/sell/motion-v2/assets/17-copper-rim-bedside-lamp-CpO5i7WX.webp";
const foundation = "/images/sell/motion-v2/assets/lumen-second-skin-dewy-wWlLR3Lx.webp";
const cottonShirt = "/images/sell/motion-v2/assets/19-marais-relaxed-cotton-shirt-7PfMJYiW.webp";
const tailoredTrousers = "/images/sell/motion-v2/assets/20-straight-leg-tailored-trousers-hCDbFo78.webp";
const leatherSneakers = "/images/sell/motion-v2/assets/21-minimal-leather-sneakers-BEbJimwc.webp";
const aeriaCycloneProVacuum = "/images/sell/motion-v2/assets/22-aeria-cyclone-pro-vacuum-CinSe7Rh.webp";
const aeriaCycloneMaxVacuum = "/images/sell/motion-v2/assets/aeria-cyclone-max-CqZad4Xk.webp";
const oliveCottonShirt = "/images/sell/motion-v2/assets/marais-shirt-olive-Bh1w4gzh.webp";
const blackLeatherSneakers = "/images/sell/motion-v2/assets/stride-sneakers-black-CuBmUkDb.webp";
const skinVeilFoundation = "/images/sell/motion-v2/assets/lumen-skin-veil-p5bk1wp6.webp";
const trueMatchFoundation = "/images/sell/motion-v2/assets/lumen-true-match-BhSYv85P.webp";
const leatherCardholder = "/images/sell/motion-v2/assets/holt-cardholder-Cu4HiyUC.webp";
const cutouts = {
  espressoMachine,
  accessoryBundle,
  leatherFrameCase,
  silkScarf,
  smartSpeaker,
  wirelessEarbuds,
  leatherWallet,
  auden,
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
const hydratingSerum = "/images/sell/motion-v2/assets/hydrating-serum-DkP_er3F.webp";
const calmingSerum = "/images/sell/motion-v2/assets/calming-serum-mWPB8Rzq.webp";
const proteinTub = "/images/sell/motion-v2/assets/gallery-main-Ct7UQJr8.webp";
const officeChair = "/images/sell/motion-v2/assets/gallery-main-Cz-eqPt1.webp";
const linenMidiDress = "/images/sell/motion-v2/assets/linen-midi-dress-BF9Sk3Jd.webp";
const linenShirtDress = "/images/sell/motion-v2/assets/linen-shirt-dress-DbEpAh-k.webp";
const linenTrousers = "/images/sell/motion-v2/assets/linen-trousers-BOqijRPF.webp";
const balloonSleeveDress = "/images/sell/motion-v2/assets/dress-reference-OSo4OmDP.webp";
const wavelineLaptop = "/images/sell/motion-v2/assets/laptop-bHYKckDQ.webp";
const formworkTaskChair = "/images/sell/motion-v2/assets/also-viewed-1-B6DEocae.webp";
const formworkExecutiveChair = "/images/sell/motion-v2/assets/also-viewed-2-DWB9-93Z.webp";
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
const audenViewedProducts = [
  catalog.audenIvory,
  catalog.audenOlive,
  catalog.audenMustard
];
const product$6 = (sku, collection, detail) => ({ ...sku, collection, detail });
const storefronts = {
  goodwell: {
    products: [
      product$6(
        catalog.goodwellSleep60,
        "Sleep",
        "60 gummies · magnesium and calming botanicals"
      ),
      product$6(catalog.goodwellSleep28, "Sleep", "28 gummies · a smaller start"),
      product$6(
        catalog.goodwellEnergy,
        "Energy",
        "60 gummies · your daytime routine"
      ),
      product$6(
        catalog.goodwellFocus,
        "Focus",
        "60 gummies · make room for focus"
      ),
      product$6(catalog.goodwellCalm, "Calm", "60 gummies · a moment to unwind"),
      product$6(
        catalog.goodwellImmunity,
        "Daily care",
        "60 gummies · everyday wellness"
      )
    ]
  },
  "sorelle-labs": {
    headline: "A little care. The right fit.",
    description: "A simple serum routine, chosen around what your skin needs today.",
    products: [
      product$6(
        catalog.sorelleHydrating,
        "Hydration",
        "Daily hydration · ivory bottle"
      ),
      product$6(
        catalog.sorelleCalming,
        "Gentle care",
        "30 ml · simple, fragrance-free care"
      ),
      product$6(catalog.sorelleVitaminC, "Vitamin C", "Vitamin C · serum"),
      product$6(catalog.sorelleCream, "Moisturisers", "Rich daily moisture"),
      product$6(
        catalog.sorelleLotion,
        "Moisturisers",
        "Lightweight daily lotion with ceramides"
      ),
      product$6(catalog.sorelleGel, "Moisturisers", "Water-gel texture"),
      product$6(
        catalog.sorelleSet,
        "Regimens",
        "Cream, night mask and travel-size cleanser"
      )
    ]
  },
  aurelle: {
    products: [
      product$6(
        catalog.aurellePendant,
        "Necklaces",
        "Gold · teardrop silhouette"
      ),
      product$6(catalog.aurelleBracelet, "Bracelets", "Gold · chain-link design"),
      product$6(catalog.aurelleAnklet, "Anklets", "Gold · beaded detail"),
      product$6(
        catalog.aurelleRosePendant,
        "Necklaces",
        "Rose gold · teardrop silhouette"
      ),
      product$6(catalog.aurelleHalo, "Necklaces", "Rose gold · halo design"),
      product$6(catalog.aurelleBar, "Necklaces", "Rose gold · bar design"),
      product$6(catalog.aurelleBoxChain, "Chains", "Rose gold · fine box chain"),
      product$6(catalog.aurelleSnakeChain, "Chains", "Rose gold · snake chain"),
      product$6(catalog.aurelleCurbChain, "Chains", "Rose gold · curb chain")
    ]
  },
  "amber-and-oak": {
    products: [
      product$6(
        catalog.amberLoungeChair,
        "Furniture",
        "Natural oak frame · ivory linen cushions"
      ),
      product$6(catalog.amberTripod, "Lighting", "Warm wood · fabric shade"),
      product$6(catalog.amberDome, "Lighting", "Sculptural dome · ambient light"),
      product$6(
        catalog.amberBedside,
        "Lighting",
        "Copper-rim detail · bedside scale"
      ),
      product$6(catalog.amberOpalGlass, "Lighting", "Opal glass · brushed brass"),
      product$6(catalog.amberPleatedLinen, "Lighting", "Pleated linen · walnut")
    ]
  },
  dusklight: {
    products: [
      product$6(
        catalog.dusklightArc,
        "Task",
        "Arc family · graphite · adjustable arm"
      ),
      product$6(
        catalog.dusklightLinear,
        "Pendant",
        "Linear family · graphite · suspended"
      )
    ]
  },
  crestline: {
    products: [
      product$6(
        catalog.crestlineHelmet,
        "Helmets",
        "Graphite · Enduro MTB · fit options S / M / L"
      )
    ]
  },
  brewhaus: {
    headline: "A better morning starts here.",
    products: [
      product$6(
        catalog.brewhausMachine,
        "Machines",
        "Brushed steel · home espresso"
      ),
      product$6(
        catalog.brewhausKit,
        "Accessories",
        "Milk frother, reusable filter and coffee starter pack"
      )
    ]
  },
  trailwell: {
    headline: "One trip. Everything in its place.",
    products: [
      {
        ...product$6(
          catalog.trailwellWeekender,
          "Weekend",
          "30L · opens flat · forest nylon"
        ),
        specs: [
          ["Capacity", "30L"],
          ["Access", "Opens flat"],
          ["Color", "Forest"]
        ]
      },
      {
        ...product$6(
          catalog.trailwellRoam,
          "Travel",
          "40L · lockable zips · charcoal nylon"
        ),
        specs: [
          ["Capacity", "40L"],
          ["Closure", "Lockable zips"],
          ["Color", "Charcoal"]
        ]
      },
      {
        ...product$6(
          catalog.trailwellOvernight,
          "Overnight",
          "24L · shoe pocket · sand nylon"
        ),
        specs: [
          ["Capacity", "24L"],
          ["Storage", "Shoe pocket"],
          ["Color", "Sand"]
        ]
      }
    ]
  },
  aura: {
    products: [
      {
        ...product$6(
          catalog.auraEarbuds,
          "Earbuds",
          "Wireless · in-ear · ivory charging case"
        ),
        specs: [
          ["Connection", "Wireless"],
          ["Format", "In-ear earbuds"],
          ["Finish", "Ivory"],
          ["Included", "Earbuds & charging case"]
        ]
      }
    ]
  },
  stride: {
    products: [
      {
        ...product$6(
          catalog.strideCourt01,
          "Sneakers",
          "Chalk leather · low-profile court silhouette"
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        fitNote: "Measure heel to toe and compare with your usual footwear. Demo sizes are selectable, not a fit guarantee."
      },
      {
        ...product$6(
          catalog.strideSuedeRunner,
          "Runners",
          "Taupe suede · everyday runner"
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
      },
      {
        ...product$6(
          catalog.stridePennyLoafer,
          "Loafers",
          "Espresso leather · slip-on shape"
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
      },
      {
        ...product$6(
          catalog.strideSneakersBlack,
          "Sneakers",
          "Black leather · minimal everyday sneaker"
        ),
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
      }
    ]
  },
  marais: {
    products: [
      {
        ...product$6(
          catalog.maraisLinenDress,
          "Dresses",
          "Relaxed linen · easy summer shape"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      {
        ...product$6(
          catalog.maraisShirtIvory,
          "Shirts",
          "Ivory cotton · relaxed fit"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      {
        ...product$6(
          catalog.maraisShirtOlive,
          "Shirts",
          "Olive cotton · relaxed fit"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      {
        ...product$6(
          catalog.maraisShirtDress,
          "Dresses",
          "Oversized linen · shirt-dress silhouette"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      {
        ...product$6(
          catalog.maraisLinenTrousers,
          "Trousers",
          "Linen · drawstring waist"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      {
        ...product$6(
          catalog.maraisTailoredTrousers,
          "Trousers",
          "Straight-leg · tailored finish"
        ),
        sizes: ["XS", "S", "M", "L", "XL"]
      },
      product$6(
        catalog.maraisEyewearCase,
        "Accessories",
        "Cognac leather · eyewear case"
      )
    ]
  },
  proteinmax: {
    products: [
      {
        ...product$6(
          catalog.proteinWhey,
          "Protein",
          "100% whey protein · 2.17 LB tub"
        ),
        specs: [
          ["Product", "Whey protein"],
          ["Pack weight", "2.17 LB / 984 g"],
          ["Format", "Powder"]
        ]
      }
    ]
  }
};
const Bag = () => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: [
  /* @__PURE__ */ jsx("path", { d: "M5 8h14l-1.2 12.5H6.2z" }),
  /* @__PURE__ */ jsx("path", { d: "M8.8 8V6.5a3.2 3.2 0 0 1 6.4 0V8" })
] });
const Menu = () => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: /* @__PURE__ */ jsx("path", { d: "M3 7h18M3 12h18M3 17h18" }) });
const Stars$1 = ({ n }) => /* @__PURE__ */ jsxs("span", { className: "sf2-stars", children: [
  /* @__PURE__ */ jsx("b", { "aria-hidden": "true", children: "★★★★★" }),
  /* @__PURE__ */ jsxs("span", { children: [
    n,
    " reviews"
  ] })
] });
function Nav({ word }) {
  return /* @__PURE__ */ jsxs("header", { className: "sf2-nav", children: [
    /* @__PURE__ */ jsx(Menu, {}),
    /* @__PURE__ */ jsx("span", { className: "sf2-nav__logo", children: word }),
    /* @__PURE__ */ jsx(Bag, {})
  ] });
}
function ProductCard$1({ p }) {
  return /* @__PURE__ */ jsxs("article", { className: "sf2-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "sf2-card__plate", children: [
      p.badge && /* @__PURE__ */ jsx("span", { className: "sf2-card__badge", children: p.badge }),
      /* @__PURE__ */ jsx("img", { src: p.image, alt: p.title })
    ] }),
    /* @__PURE__ */ jsx(Stars$1, { n: p.reviews }),
    /* @__PURE__ */ jsx("h3", { children: p.title }),
    p.note && /* @__PURE__ */ jsx("p", { children: p.note }),
    /* @__PURE__ */ jsx("strong", { children: p.price }),
    /* @__PURE__ */ jsx("span", { className: "sf2-card__cta", children: "Add to bag" })
  ] });
}
function SorelleStorefront() {
  const s = storefronts["sorelle-labs"];
  const { sorelleHydrating, sorelleCalming, sorelleVitaminC } = catalog;
  return /* @__PURE__ */ jsxs("div", { className: "sf2 sf2-sorelle", children: [
    /* @__PURE__ */ jsx("div", { className: "sf2-ann", children: "The serum edit is here" }),
    /* @__PURE__ */ jsx(Nav, { word: "Sorelle Labs" }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-sorelle__hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-sorelle__photo", children: [
        /* @__PURE__ */ jsx("img", { src: sorelleHydrating.image, alt: sorelleHydrating.title }),
        /* @__PURE__ */ jsx("img", { src: sorelleCalming.image, alt: sorelleCalming.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sf2-sorelle__copy", children: [
        /* @__PURE__ */ jsx("h1", { children: s.headline }),
        /* @__PURE__ */ jsx("p", { children: s.description }),
        /* @__PURE__ */ jsx("span", { className: "sf2-btn", children: "Shop serums" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__head", children: [
        /* @__PURE__ */ jsx("h2", { children: "Bestsellers" }),
        /* @__PURE__ */ jsx("span", { children: "View all" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__cards", children: [
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...sorelleHydrating, badge: "Bestseller", note: "Everyday hydration", reviews: 214 } }),
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...sorelleVitaminC, note: "Brightening care", reviews: 96 } })
      ] })
    ] })
  ] });
}
function TrailwellStorefront() {
  const s = storefronts.trailwell;
  const { trailwellWeekender: hero, trailwellOvernight, trailwellRoam } = catalog;
  return /* @__PURE__ */ jsxs("div", { className: "sf2 sf2-trail", children: [
    /* @__PURE__ */ jsx("div", { className: "sf2-ann", children: "New · Overnight 24L in Sand" }),
    /* @__PURE__ */ jsx(Nav, { word: "Trailwell" }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-trail__hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-trail__copy", children: [
        /* @__PURE__ */ jsx("span", { className: "sf2-trail__tag", children: "Weekender · 30L" }),
        /* @__PURE__ */ jsx("h1", { children: s.headline }),
        /* @__PURE__ */ jsx("span", { className: "sf2-btn", children: "Find your pack" })
      ] }),
      /* @__PURE__ */ jsx("img", { src: hero.image, alt: `${hero.title}, ${hero.color}` })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__head", children: [
        /* @__PURE__ */ jsx("h2", { children: "Shop by capacity" }),
        /* @__PURE__ */ jsx("span", { children: "Compare" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__cards", children: [
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...trailwellOvernight, title: `${trailwellOvernight.title} 24L`, badge: "New", note: "Sand · Shoe pocket", reviews: 58 } }),
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...trailwellRoam, title: `${trailwellRoam.title} 40L`, note: "Charcoal · Lockable zips", reviews: 131 } })
      ] })
    ] })
  ] });
}
function BrewhausStorefront() {
  const s = storefronts.brewhaus;
  const { brewhausMachine: m, brewhausKit: kit } = catalog;
  return /* @__PURE__ */ jsxs("div", { className: "sf2 sf2-brew", children: [
    /* @__PURE__ */ jsxs("div", { className: "sf2-ann", children: [
      "Complete your setup · Starter kit ",
      kit.price
    ] }),
    /* @__PURE__ */ jsx(Nav, { word: "Brewhaus" }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-brew__hero", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-brew__copy", children: [
        /* @__PURE__ */ jsx("span", { className: "sf2-brew__eyebrow", children: "The machine" }),
        /* @__PURE__ */ jsx("h1", { children: s.headline }),
        /* @__PURE__ */ jsx("span", { className: "sf2-btn", children: "Shop the machine" })
      ] }),
      /* @__PURE__ */ jsx("img", { src: m.image, alt: m.title })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "sf2-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__head", children: [
        /* @__PURE__ */ jsx("h2", { children: "Complete your setup" }),
        /* @__PURE__ */ jsx("span", { children: "View all" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sf2-row__cards", children: [
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...m, note: "Espresso at home", reviews: 342 } }),
        /* @__PURE__ */ jsx(ProductCard$1, { p: { ...kit, title: "Home Barista Kit", badge: "Bundle", note: "Frother, filter & starter", reviews: 87 } })
      ] })
    ] })
  ] });
}
const PAGES = {
  "sorelle-labs": SorelleStorefront,
  trailwell: TrailwellStorefront,
  brewhaus: BrewhausStorefront
};
const BRANDS = [
  { id: "sorelle-labs", label: "Sorelle Labs", chips: ["Build my routine", "Is this right for sensitive skin?"], wall: "left" },
  { id: "trailwell", label: "Trailwell", chips: ["What fits inside?", "Is this carry-on friendly?"], wall: "right" },
  { id: "brewhaus", label: "Brewhaus", chips: ["Which machine suits me?", "Recommend a grinder"], wall: "right" }
];
function BrandFrame({ children }) {
  return /* @__PURE__ */ jsx(ChannelContainer, { children: /* @__PURE__ */ jsx("div", { className: "bw-slot", children }) });
}
function CompactWidget({ id, chips, wall }) {
  return /* @__PURE__ */ jsxs("div", { className: `bw-widget bw-widget--${wall}`, "aria-label": "Crossword assistant", children: [
    /* @__PURE__ */ jsx("div", { className: "bw-widget__chips", role: "group", "aria-label": "Suggested questions", children: chips.map((c) => /* @__PURE__ */ jsx("span", { className: "bw-widget__chip", children: c }, c)) }),
    /* @__PURE__ */ jsxs("span", { className: "bw-widget__orb", children: [
      /* @__PURE__ */ jsx("span", { className: "bw-widget__pulse", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(BrandMark, { brand: id, className: "bw-widget__mark" })
    ] })
  ] });
}
function Store({ id, chips, wall, className = "", widget: widget2 = true }) {
  return /* @__PURE__ */ jsxs("div", { className: `sv-ill-channel-shell bw-shell bw-shell--${id} ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "bw-page", "aria-hidden": "true", children: PAGES[id]() }),
    widget2 && /* @__PURE__ */ jsx("div", { className: "bw-widget-layer", children: /* @__PURE__ */ jsx(CompactWidget, { id, chips, wall }) }),
    /* @__PURE__ */ jsx("span", { className: "sv-ill-channel-shell__glow", "aria-hidden": "true" })
  ] });
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
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    var _a;
    let cancelled = false;
    (((_a = document.fonts) == null ? void 0 : _a.ready) ?? Promise.resolve()).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}
const HOLD_MS$1 = 3600;
const FIRST_HOLD_MS = 4400;
const SWAP_MS$1 = 750;
function BrandedWidgetCycle() {
  const ref = useRef(null);
  const landed = useLandedOnScreen(ref);
  const fonts = useFontsReady();
  const playing = landed && fonts;
  const [state, setState] = useState({ at: 0, prev: -1, take: 0, turn: 0 });
  const [swapping, setSwapping] = useState(false);
  useEffect(() => {
    if (!playing) return;
    setState((s) => ({ at: 0, prev: -1, take: s.take + 1, turn: 0 }));
    const ids = [];
    BRANDS.slice(1).forEach((_, i) => {
      const at2 = FIRST_HOLD_MS + HOLD_MS$1 * i;
      ids.push(
        window.setTimeout(() => {
          setState((s) => ({ ...s, prev: s.at, at: i + 1, turn: s.turn + 1 }));
          setSwapping(true);
        }, at2),
        // will-change only for the wipe itself.
        window.setTimeout(() => setSwapping(false), at2 + SWAP_MS$1)
      );
    });
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [playing]);
  const { at, prev, take, turn } = state;
  const brand2 = BRANDS[at];
  return /* @__PURE__ */ jsxs(
    "figure",
    {
      ref,
      className: ["sv-ill-channel-deployment-grid__item", "bwc", take ? "is-playing" : "", turn === 0 ? "is-first" : "", swapping ? "is-swapping" : ""].join(" "),
      children: [
        /* @__PURE__ */ jsx(BrandFrame, { children: /* @__PURE__ */ jsxs("div", { className: "bwc-stack", children: [
          BRANDS.map((b, i) => /* @__PURE__ */ jsx(
            Store,
            {
              id: b.id,
              chips: b.chips,
              wall: b.wall,
              widget: false,
              className: ["bwc-store", i === at && "is-active", i === prev && "is-leaving"].filter(Boolean).join(" ")
            },
            b.id
          )),
          /* @__PURE__ */ jsx("div", { className: `bw-widget-layer bwc-layer bw-shell--${brand2.id}`, children: /* @__PURE__ */ jsxs("div", { className: `bw-widget bwc-widget bwc-widget--${brand2.wall}`, "aria-label": "Crossword assistant", children: [
            prev >= 0 && /* @__PURE__ */ jsx(
              "div",
              {
                className: `bw-widget__chips bwc-chips bwc-chips--${BRANDS[prev].wall} is-leaving bw-shell--${BRANDS[prev].id}`,
                "aria-hidden": "true",
                children: BRANDS[prev].chips.map((c) => /* @__PURE__ */ jsx("span", { className: "bw-widget__chip", children: c }, c))
              },
              `out-${take}-${turn}`
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `bw-widget__chips bwc-chips bwc-chips--${brand2.wall}`,
                role: "group",
                "aria-label": "Suggested questions",
                children: brand2.chips.map((c) => /* @__PURE__ */ jsx("span", { className: "bw-widget__chip", children: c }, c))
              },
              `${take}-${turn}`
            ),
            /* @__PURE__ */ jsxs("span", { className: "bw-widget__orb bwc-orb", children: [
              brand2.id === "brewhaus" && /* @__PURE__ */ jsx("span", { className: "bwc-pulse", "aria-hidden": "true" }, `p-${turn}`),
              BRANDS.map((b) => /* @__PURE__ */ jsx(
                BrandMark,
                {
                  brand: b.id,
                  className: `bw-widget__mark bwc-mark bwc-mark--${b.id}${b.id === brand2.id ? " is-active" : ""}`
                },
                b.id === "sorelle-labs" ? `${b.id}-${turn}` : b.id
              ))
            ] }, `orb-${take}`)
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("figcaption", { className: "bwc-caption", children: BRANDS.map((b, i) => /* @__PURE__ */ jsx("span", { className: i === at ? "is-active" : void 0, children: b.label }, b.id)) })
      ]
    }
  );
}
const history = "/images/sell/motion-v2/assets/history-BevL6311.svg";
const add = "/images/sell/motion-v2/assets/add-Cbob5SpL.svg";
const expand = "/images/sell/motion-v2/assets/expand-DCmbcy1L.svg";
const close = "/images/sell/motion-v2/assets/close-DsdKJYzC.svg";
const send = "/images/sell/motion-v2/assets/send-ciTszH9F.svg";
const favorite = "/images/sell/motion-v2/assets/favorite-CUi59LNH.svg";
const insight = "/images/sell/motion-v2/assets/insight-uAQ9aztG.svg";
const caretDown = "/images/sell/motion-v2/assets/caret-down-SLWfN0GR.svg";
const aiStatus = "/images/sell/motion-v2/assets/ai-status-BrMkXQfp.svg";
const historyGold = "/images/sell/motion-v2/assets/history-gold-BJyNNDvb.svg";
const addGold = "/images/sell/motion-v2/assets/add-gold-BsVrGX-2.svg";
const expandGold = "/images/sell/motion-v2/assets/expand-gold-DMlB4LYO.svg";
const closeGold = "/images/sell/motion-v2/assets/close-gold-C4NzsZzj.svg";
const sendGold = "/images/sell/motion-v2/assets/send-gold-Vhul_k2n.svg";
const addMuted = "/images/sell/motion-v2/assets/add-muted-BR3d4Eat.svg";
const sparkle = "/images/sell/motion-v2/assets/sparkle-DD7f07RS.svg";
const lock = "/images/sell/motion-v2/assets/lock-Ct-i8Zkt.svg";
const shieldCheck = "/images/sell/motion-v2/assets/shield-check-ButlZpGU.svg";
const checks = "/images/sell/motion-v2/assets/checks-Cn5ndNQt.svg";
const union = "/images/sell/motion-v2/assets/union-DvakWNG_.svg";
const sourceDot = "/images/sell/motion-v2/assets/source-dot-FmkgXLjm.svg";
const money = "/images/sell/motion-v2/assets/money-BRnIy4Hf.svg";
const userSound = "/images/sell/motion-v2/assets/user-sound-B1mWE2AQ.svg";
const warning = "/images/sell/motion-v2/assets/warning-B_MVWxpy.svg";
const caretRight = "/images/sell/motion-v2/assets/caret-right-N4DMqoC_.svg";
const search = "/images/sell/motion-v2/assets/search-6aT0QOjO.svg";
const address = "/images/sell/motion-v2/assets/address-QPOEXXur.svg";
const spark = "/images/sell/motion-v2/assets/spark-CL1SvstU.svg";
const usersThree = "/images/sell/motion-v2/assets/users-three-CNldQr4E.svg";
const shoppingCart = "/images/sell/motion-v2/assets/shopping-cart-9S1-ijDB.svg";
const funnel = "/images/sell/motion-v2/assets/funnel-DtM1xN-e.svg";
const bell = "/images/sell/motion-v2/assets/bell-hYUBIbcW.svg";
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
  return /* @__PURE__ */ jsxs("div", { className: `sv-ill-browser-chrome sv-ill-browser-chrome--${field}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-chrome__dots", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-chrome__address", children: [
      /* @__PURE__ */ jsx(Icon, { name: field === "search" ? "search" : "address" }),
      /* @__PURE__ */ jsx("span", { children: url })
    ] })
  ] });
}
function ContentFade() {
  return /* @__PURE__ */ jsx("div", { className: "sv-ill-content-fade", "aria-hidden": "true" });
}
const browserUrl = "shop.example.com";
const suggestions = [
  { id: "gift", text: "Help me find a gift" },
  { id: "compare", text: "Compare these two" },
  { id: "trending", text: "What's trending right now" }
];
function PageCard() {
  return /* @__PURE__ */ jsxs("article", { className: "sv-ill-page-card", children: [
    /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__media" }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-page-card__meta", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-page-card__meta-row", children: [
        /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__brand" }),
        /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__rating-icons" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__title" }),
      /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__rating" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sv-ill-page-card__cta" })
  ] });
}
function BrowserScene({
  children,
  pageLayer,
  url = browserUrl
}) {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-scene", children: [
    /* @__PURE__ */ jsx(BrowserChrome, { url }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-scene__nav", children: [
      /* @__PURE__ */ jsx("span", { className: "sv-ill-browser-scene__logo" }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-scene__nav-links", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-browser-scene__page", children: [
      /* @__PURE__ */ jsx(PageCard, {}),
      /* @__PURE__ */ jsx(PageCard, {}),
      pageLayer && /* @__PURE__ */ jsx("div", { className: "sv-ill-browser-scene__page-layer", children: pageLayer })
    ] }),
    /* @__PURE__ */ jsx(ContentFade, {}),
    /* @__PURE__ */ jsx("div", { className: "sv-ill-browser-scene__widget-layer", children })
  ] });
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
const STORE_URL = "aurelle.com";
const SCENE_SIZE = 403.75;
const SHELL_SLOT = 306;
function OrbMark() {
  return /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "aurelia-supplied-mark" });
}
function BarContents({ placeholder }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "piw2-bar__mark", "aria-hidden": "true", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "aurelia-supplied-mark" }) }),
    placeholder ?? /* @__PURE__ */ jsx("span", { className: "piw2-bar__placeholder", children: "Ask anything" }),
    /* @__PURE__ */ jsx("span", { className: "piw2-bar__send", "aria-hidden": "true", children: /* @__PURE__ */ jsx(ArrowUpGlyph$1, {}) })
  ] });
}
function PillContents() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "piw2-pin__disc", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "aurelia-supplied-mark" }) }),
    /* @__PURE__ */ jsx("span", { className: "piw2-pin__line", children: "Ask anything" }),
    /* @__PURE__ */ jsx(DotsHoldGlyph, {})
  ] });
}
function Room() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "piw2-sidebar__head", children: [
      /* @__PURE__ */ jsx("span", { className: "piw2-puck", children: /* @__PURE__ */ jsx(HistoryGlyph$1, {}) }),
      /* @__PURE__ */ jsx("span", { className: "piw2-sidebar__identity", children: /* @__PURE__ */ jsx("span", { className: "piw2-sidebar__logo", children: /* @__PURE__ */ jsx(BrandMark, { brand: "Aurelle", className: "aurelia-supplied-mark" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "piw2-puck", children: /* @__PURE__ */ jsx(CloseGlyph$1, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "piw2-sidebar__body", children: suggestions.map((s) => /* @__PURE__ */ jsx("span", { className: "piw2-chip piw2-chip--room", children: s.text }, s.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "piw2-sidebar__composer", children: [
      /* @__PURE__ */ jsx("span", { children: "Ask anything" }),
      /* @__PURE__ */ jsx("span", { className: "piw2-sidebar__send", children: /* @__PURE__ */ jsx(ArrowUpGlyph$1, {}) })
    ] })
  ] });
}
const glyph$1 = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function ArrowUpGlyph$1() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph$1, width: 14, height: 14, children: [
    /* @__PURE__ */ jsx("line", { x1: "128", y1: "216", x2: "128", y2: "40" }),
    /* @__PURE__ */ jsx("polyline", { points: "56 112 128 40 200 112" })
  ] });
}
function HistoryGlyph$1() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph$1, width: 10, height: 10, children: [
    /* @__PURE__ */ jsx("polyline", { points: "128 80 128 128 168 152" }),
    /* @__PURE__ */ jsx("polyline", { points: "72 104 32 104 32 64" }),
    /* @__PURE__ */ jsx("path", { d: "M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" })
  ] });
}
function CloseGlyph$1() {
  return /* @__PURE__ */ jsxs("svg", { ...glyph$1, width: 10, height: 10, children: [
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "56", x2: "56", y2: "200" }),
    /* @__PURE__ */ jsx("line", { x1: "200", y1: "200", x2: "56", y2: "56" })
  ] });
}
function DotsHoldGlyph() {
  return /* @__PURE__ */ jsx("svg", { className: "piw2-pin__dots", viewBox: "0 0 12 18", fill: "currentColor", "aria-hidden": "true", children: [3, 9].map((x) => [3, 9, 15].map((y) => /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r: 1.5 }, `${x}-${y}`))) });
}
function PlaceItWhereverV2Motion({ slot = SHELL_SLOT, drawers = true } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [landing, setLanding] = useState(0);
  useEffect(() => {
    if (landed) setLanding((n) => n + 1);
  }, [landed]);
  return /* @__PURE__ */ jsxs("figure", { ref: rootRef, className: ["sv-ill-place-it-wherever__panel", "piw2c", !drawers && "piw2n", !landed && "piw2c--paused"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx(ChannelContainer, { children: /* @__PURE__ */ jsx(ScaleToFit, { contentWidth: SCENE_SIZE, contentHeight: SCENE_SIZE, maxWidth: slot, maxHeight: slot, children: /* @__PURE__ */ jsxs("div", { className: "piw2c-desk", children: [
      /* @__PURE__ */ jsx("div", { className: "piw2c-page", children: /* @__PURE__ */ jsx(BrowserScene, { url: STORE_URL }) }),
      drawers && ["left", "right"].map((side) => /* @__PURE__ */ jsx("aside", { className: `piw2c-drawer piw2c-drawer--${side}`, "aria-label": `Crossword ${side} sidebar`, children: /* @__PURE__ */ jsx(Room, {}) }, side)),
      /* @__PURE__ */ jsxs("div", { className: "piw2c-morph", children: [
        /* @__PURE__ */ jsx("div", { className: "piw2c-morph__ring" }),
        /* @__PURE__ */ jsxs("div", { className: "piw2c-morph__surface", children: [
          /* @__PURE__ */ jsx("div", { className: "piw2c-morph__composer", children: /* @__PURE__ */ jsx("div", { className: "piw2-bar", children: /* @__PURE__ */ jsx(BarContents, {}) }) }),
          /* @__PURE__ */ jsx("div", { className: "piw2c-morph__pill", children: /* @__PURE__ */ jsx("div", { className: "piw2-pin", "aria-label": "Draggable chat launcher", children: /* @__PURE__ */ jsx(PillContents, {}) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "piw2c-morph__logo", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { className: "piw2c-morph__ripple" }),
          /* @__PURE__ */ jsx("span", { className: "piw2c-morph__disc", children: /* @__PURE__ */ jsx(OrbMark, {}) })
        ] })
      ] })
    ] }, landing) }) }),
    /* @__PURE__ */ jsxs("figcaption", { className: "piw2c-captions", children: [
      /* @__PURE__ */ jsx("span", { className: "piw2c-cap piw2c-cap--composer", children: "Bottom composer" }),
      /* @__PURE__ */ jsx("span", { className: "piw2c-cap piw2c-cap--drag", children: "Draggable launcher" }),
      /* @__PURE__ */ jsx("span", { className: "piw2c-cap piw2c-cap--corner", children: "Corner launcher" }),
      drawers && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "piw2c-cap piw2c-cap--right", children: "Right sidebar drawer" }),
        /* @__PURE__ */ jsx("span", { className: "piw2c-cap piw2c-cap--left", children: "Left sidebar drawer" })
      ] })
    ] })
  ] });
}
function PlaceItWhereverCompactMotion() {
  return /* @__PURE__ */ jsx(PlaceItWhereverV2Motion, { slot: 255, drawers: false });
}
const frameBackground = "/images/sell/motion-v2/assets/background-GiCSjLb9.svg";
const frameTexture = "/images/sell/motion-v2/assets/background-texture-C4nqYl4R.webp";
function SceneFrame({
  children,
  hideBackground,
  height
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "sv-ill-scene-frame-scale",
      style: height ? { aspectRatio: `738 / ${height}` } : void 0,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: height ? "sv-ill-scene-frame sv-ill-scene-frame--sized" : "sv-ill-scene-frame",
          style: height ? { height } : void 0,
          children: [
            !hideBackground && /* @__PURE__ */ jsxs(Fragment, { children: [
              height ? /* @__PURE__ */ jsx("svg", { className: "sv-ill-scene-frame__background", viewBox: `0 0 738 ${height}`, "aria-hidden": "true", children: [
                [26, 24],
                [712, 24],
                [26, height - 24],
                [712, height - 24]
              ].map(([cx, cy]) => /* @__PURE__ */ jsx("circle", { cx, cy, r: 4.5, fill: "none", stroke: "#D2B75C" }, `${cx}-${cy}`)) }) : /* @__PURE__ */ jsx(
                "img",
                {
                  className: "sv-ill-scene-frame__background",
                  src: frameBackground,
                  alt: "",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "sv-ill-scene-frame__texture",
                  src: frameTexture,
                  alt: "",
                  "aria-hidden": "true"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "sv-ill-scene-frame__content", children })
          ]
        }
      )
    }
  );
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
function prefersReducedMotion$2() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wordCount(text) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}
function replyRevealMs(text) {
  return wordCount(text) * REPLY_STAGGER_MS$1 + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}
function beatsDurationMs(beats) {
  return beats.reduce((ms, b, i) => {
    switch (b.type) {
      case "compose":
        if (!b.text) return ms + (b.holdMs ?? 700);
        return ms + (b.leadMs ?? (i === 0 ? FIRST_COMPOSE_LEAD_MS : NEXT_COMPOSE_LEAD_MS)) + b.text.length * (b.msPerChar ?? CHAR_INTERVAL_MS) + SENT_SETTLE_MS;
      case "think":
        return ms + (b.labels.length === 2 ? THINKING_STAGE_1_MS + THINKING_STAGE_2_MS : THINKING_SINGLE_MS) + THINKING_EXIT_MS;
      case "text":
        return ms + replyRevealMs(b.text);
      case "appear":
        return ms + (b.ms ?? APPEAR_MS);
      case "load":
        return ms + (b.ms ?? LOAD_MS);
      case "pause":
        return ms + b.ms;
    }
  }, 0);
}
function useChatTimeline(beats, active) {
  const reducedMotion = useRef(prefersReducedMotion$2()).current;
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
      composer: (current2 == null ? void 0 : current2.type) === "compose" && current2.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats.length,
      reducedMotion,
      runKey
    };
  }, [beats, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}
const goldHoopSet = "/images/sell/motion-v2/assets/look-1-gold-hoop-set-Qtc-fI41.webp";
const pearlDropSet = "/images/sell/motion-v2/assets/look-2-pearl-drop-set-FKAYJEcj.webp";
const citrineStudSet = "/images/sell/motion-v2/assets/look-3-citrine-stud-set-CKfNqm2y.webp";
const paperImages = /* @__PURE__ */ new Set([
  ...Object.values(catalog).filter((p) => p.brandId === "aurelle" || p.brandId === "sorelle-labs").map((p) => p.image),
  goldHoopSet,
  pearlDropSet,
  citrineStudSet
]);
function ProductImage({ src, className = "", alt = "", ...props }) {
  return /* @__PURE__ */ jsx("img", { ...props, src, alt, className: `aiv3-product-image ${className}`, "data-media-tone": paperImages.has(src) ? "paper" : "neutral", "data-media-fit": src === catalog.aurellePendant.image ? "cover" : void 0 });
}
const brand$1 = "Aurelle";
[
  { ...catalog.aurelleAnklet, brand: brand$1, rating: 4, ratingCount: "312", image: catalog.aurelleAnklet.image },
  { ...catalog.aurellePendant, brand: brand$1, rating: 5, ratingCount: "1.1k", image: catalog.aurellePendant.image, imageFit: "cover" },
  { ...catalog.aurelleBracelet, brand: brand$1, rating: 4, ratingCount: "487", image: catalog.aurelleBracelet.image }
];
[
  { ...catalog.aurelleRosePendant, brand: brand$1, rating: 5, ratingCount: "860", image: catalog.aurelleRosePendant.image, imageFit: "cover" },
  { ...catalog.aurelleHalo, brand: brand$1, rating: 5, ratingCount: "402", image: catalog.aurelleHalo.image, imageFit: "cover" },
  { ...catalog.aurelleBar, brand: brand$1, rating: 4, ratingCount: "275", image: catalog.aurelleBar.image, imageFit: "cover" }
];
[
  { ...catalog.aurelleBoxChain, brand: brand$1, rating: 5, ratingCount: "930", tag: "Most paired", image: catalog.aurelleBoxChain.image, imageFit: "cover" },
  { ...catalog.aurelleSnakeChain, brand: brand$1, rating: 4, ratingCount: "214", image: catalog.aurelleSnakeChain.image, imageFit: "cover" },
  { ...catalog.aurelleCurbChain, brand: brand$1, rating: 4, ratingCount: "158", image: catalog.aurelleCurbChain.image, imageFit: "cover" }
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
    /* @__PURE__ */ jsx("span", { className: "gj2-head__name", children: brand$1 })
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
    var _a;
    if (!value) {
      setHeight(void 0);
      return;
    }
    const content = ((_a = valueRef.current) == null ? void 0 : _a.offsetHeight) ?? 0;
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
function ImageTile({ src, alt, from = "user", className }) {
  return /* @__PURE__ */ jsx("div", { className: ["sbp-tile", from === "ai" && "sbp-tile--ai", className].filter(Boolean).join(" "), children: /* @__PURE__ */ jsx("img", { src, alt }) });
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
function QuizPlates({ questions, className }) {
  return /* @__PURE__ */ jsx("div", { className: ["sbp-quiz", className].filter(Boolean).join(" "), children: questions.map((q) => /* @__PURE__ */ jsxs("div", { className: "sbp-quiz__q", children: [
    /* @__PURE__ */ jsx("p", { className: "sbp-quiz__label", children: q.question }),
    /* @__PURE__ */ jsx("div", { className: "sbp-quiz__plates", children: q.options.map((o) => /* @__PURE__ */ jsx("span", { className: o === q.answer ? "sbp-plate sbp-plate--picked" : "sbp-plate", children: o }, o)) })
  ] }, q.question)) });
}
const seaGlassDress = "/images/sell/motion-v2/assets/sea-glass-linen-maxi-sFMUxVvU.webp";
const coralDress = "/images/sell/motion-v2/assets/coral-linen-midi-v2-BwVPsgFF.webp";
const lavenderDress = "/images/sell/motion-v2/assets/lavender-linen-maxi-C0w5XfWP.webp";
const script$h = {
  brand: catalog.maraisLinenDress.brand,
  userMessage: "I need something for a beach wedding, but I run hot and hate anything tight.",
  assistantMessage: "Got it, breathable, relaxed and wedding-appropriate. I found three linen options in lighter weaves. Let me narrow those down to your size."
};
const products$1 = [
  { id: "sea-glass-linen-maxi", name: "Sea Glass Linen Maxi Dress", image: seaGlassDress },
  { id: "coral-linen-midi", name: "Coral Linen Midi Dress", image: coralDress },
  { id: "lavender-linen-maxi", name: "Lavender Linen Maxi Dress", image: lavenderDress }
];
const discovery = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  products: products$1,
  script: script$h
}, Symbol.toStringTag, { value: "Module" }));
const shopperUpload = "/images/sell/motion-v2/assets/shopper-selfie-CyjDEIkL.webp";
const tryonResult = "/images/sell/motion-v2/assets/tryon-consistent-DrlZLkTv.webp";
const script$g = {
  brand: catalog.maraisBalloonDress.brand,
  userMessage: "Would this dress work on me?",
  assistantOffer: "Absolutely. I'll show you how it looks on you, simply upload your image.",
  assistantResult: "Since you usually prefer a relaxed fit, I've kept the styling true to that."
};
const referencedProduct = {
  ...catalog.maraisBalloonDress
};
const media = {
  dressReference: catalog.maraisBalloonDress.image,
  shopperUpload,
  tryonResult
};
const tryOn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  media,
  referencedProduct,
  script: script$g
}, Symbol.toStringTag, { value: "Module" }));
const script$f = {
  brand: catalog.wavelineLaptop.brand,
  userMessage: "Is this laptop good enough for me?",
  assistantMessage: "For how you use your laptop, yes. You mostly use it for browsing, presentations and video calls, so you don't need to pay extra for a high-performance configuration. This model gives you the battery life and screen quality you've previously prioritized, without the unnecessary processing power."
};
const product$5 = {
  ...catalog.wavelineLaptop,
  rating: 4
};
const qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  product: product$5,
  script: script$f
}, Symbol.toStringTag, { value: "Module" }));
const script$e = {
  brand: catalog.maraisShirtIvory.brand,
  userMessage: "I love this shirt. What would you wear with it?",
  assistantMessage: "Since you usually go for relaxed fits and neutral colours, I'd pair it with these straight-leg trousers and these sneakers. You also mentioned you're dressing for a dinner, so I'd keep it polished without making it formal."
};
const anchor$2 = {
  ...catalog.maraisShirtIvory
};
const coordinates = [
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers
].map(({ id, title, image }) => ({ id, name: title, image }));
const outfit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  anchor: anchor$2,
  coordinates,
  script: script$e
}, Symbol.toStringTag, { value: "Module" }));
const script$d = {
  brand: catalog.lumenSecondSkin.brand,
  userMessage: "Help me find the right foundation.",
  framing: "Let's narrow it down in 3 quick questions.",
  resultMessage: "Based on your answers, and your saved shade preference, this is your best match."
};
const answers = [
  { question: "Preferred finish?", options: ["Matte", "Dewy", "Satin"], answer: "Dewy" },
  { question: "What are you looking to cover?", options: ["Dark circles", "Some redness & spots", "Uneven tone"], answer: "Some redness & spots" },
  { question: "Skin type?", options: ["Dry", "Combination", "Oily"], answer: "Combination" }
];
const product$4 = {
  ...catalog.lumenSecondSkin,
  rating: 5,
  ratingCount: "1.4k"
};
const finder = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  answers,
  product: product$4,
  script: script$d
}, Symbol.toStringTag, { value: "Module" }));
const agedBrassLamp = "/images/sell/motion-v2/assets/aged-brass-triple-dome-CEyMDDyc.webp";
const twoDomeLamp = "/images/sell/motion-v2/assets/asymmetric-two-dome-brass-DYjTPIwN.webp";
const fourDomeLamp = "/images/sell/motion-v2/assets/four-dome-copper-fan-CtwlxkAa.webp";
const script$c = {
  brand: catalog.amberTripod.brand,
  userMessage: "I want something like this.",
  assistantMessage: "I found the closest matches. Since you've previously saved warm, ambient lighting, I've prioritised lamps with a similar glow rather than just matching the shape. This one is the closest match."
};
const uploadedImage = {
  src: cutouts.referenceLamp,
  alt: "Lamp photo uploaded by the shopper"
};
const matches = [
  { id: "aged-brass-triple-dome", name: "Aged Brass Triple-Dome Lamp", image: agedBrassLamp },
  { id: "asymmetric-two-dome-brass", name: "Asymmetric Two-Dome Lamp", image: twoDomeLamp },
  { id: "four-dome-copper-fan", name: "Copper Four-Dome Lamp", image: fourDomeLamp }
];
const visual = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  matches,
  script: script$c,
  uploadedImage
}, Symbol.toStringTag, { value: "Module" }));
const script$b = {
  brand: catalog.crestlineHelmet.brand,
  userMessage: "Will this helmet fit me?"
};
const product$3 = {
  image: catalog.crestlineHelmet.image,
  brand: catalog.crestlineHelmet.brand,
  title: catalog.crestlineHelmet.title,
  price: catalog.crestlineHelmet.price,
  rating: 4
};
const sizeFit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  product: product$3,
  script: script$b
}, Symbol.toStringTag, { value: "Module" }));
const script$a = {
  brand: catalog.aurellePendant.brand,
  userMessage: "I need a birthday gift for my mum. Around $150.",
  assistantMessage: "Based on the gifts you've bought her before, she tends to prefer simple gold jewellery. I found three options under $150, including this teardrop pendant, which fits the delicate styles she's liked before."
};
const gifts = [
  catalog.aurellePendant,
  catalog.aurelleBracelet,
  catalog.aurelleAnklet
];
const gift = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  gifts,
  script: script$a
}, Symbol.toStringTag, { value: "Module" }));
const followups$3 = {
  discovery: ["Show me in white", "Under $150", "What shoes go with these?"],
  tryOn: ["Try a different colour", "Find my size", "Add to cart"],
  qa: ["How long does the battery last?", "Compare with the Pro", "Add to cart"],
  outfit: ["Add the whole look", "Something dressier", "Show other shoes"],
  finder: ["Show me a lighter shade", "Is it buildable?", "Add a primer"],
  visual: ["Which bulbs come with it?", "Show floor lamps", "Under $100"],
  sizeFit: ["Add Medium to cart", "How do I measure?", "What if it doesn't fit?"],
  gift: ["Gift wrap it", "Something under $100", "Will it arrive by Friday?"]
};
const storeName = (brand2) => getBrand(brand2).name;
const asCards = (items, brand2) => items.map(({ id, name, image }) => ({ id, title: name, brand: brand2, image, imageFit: "contain" }));
const contain = (items) => items.map((p) => ({ ...p, brand: p.brand && storeName(p.brand), imageFit: "contain" }));
const FOLLOWUPS$1 = { id: "followups", type: "appear", ms: 500 };
function MotionWindow({ brand: brand2, beats, children }) {
  var _a;
  const rootRef = useRef(null);
  const transcriptRef = useRef(null);
  const active = useLandedOnScreen(rootRef);
  const t = useChatTimeline(beats, active);
  useFollowLatest(transcriptRef, t);
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsx(SceneFrame, { children: /* @__PURE__ */ jsxs("div", { className: "gj2-win gj2-win--standard", children: [
    /* @__PURE__ */ jsx(ChatHead, { brand: storeName(brand2) }),
    /* @__PURE__ */ jsx("div", { className: "gj2-transcript", ref: transcriptRef, children: children(t, !t.reducedMotion) }, t.runKey),
    /* @__PURE__ */ jsx(ChatFoot, { value: ((_a = t.composer) == null ? void 0 : _a.value) || void 0 })
  ] }) }) });
}
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
      cancel == null ? void 0 : cancel();
      if (t.reducedMotion) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel == null ? void 0 : cancel();
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}
function User$1({ text, animate }) {
  return /* @__PURE__ */ jsx("p", { className: `gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`, children: text });
}
function Think$1({ t, id, cards = false }) {
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
function Trail$1({ t, items, animate }) {
  if (!t.reached("followups")) return null;
  return /* @__PURE__ */ jsx(Followups, { items, className: animate ? "gj2-followups--in" : void 0 });
}
const rise = (animate) => animate ? "sbp-in" : void 0;
const discoveryBeats = [
  { id: "ask", type: "compose", text: script$h.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding linen options"] },
  { id: "reply", type: "text", text: script$h.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS$1
];
function ConversationalDiscoveryV2Motion() {
  const { script: script2, products: products2 } = discovery;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: discoveryBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: asCards(products2, storeName(script2.brand)), animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.discovery, animate })
  ] }) });
}
const tryOnBeats = [
  { id: "ask", type: "compose", text: script$g.userMessage },
  { id: "think-offer", type: "think", labels: ["Thinking"] },
  { id: "offer", type: "text", text: script$g.assistantOffer },
  { id: "upload", type: "compose", holdMs: 1e3 },
  { id: "think-result", type: "think", labels: ["Thinking", "Styling your look"] },
  { id: "result", type: "text", text: script$g.assistantResult },
  { id: "image", type: "load", ms: 1e3 },
  FOLLOWUPS$1
];
function TryItOnV2Motion() {
  const { script: script2, media: media2, referencedProduct: referencedProduct2 } = tryOn;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: tryOnBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: media2.dressReference, title: referencedProduct2.title, meta: storeName(referencedProduct2.brand), className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think-offer" }),
    t.reached("offer") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantOffer, animate }),
    t.passed("upload") && /* @__PURE__ */ jsx(ImageTile, { src: media2.shopperUpload, alt: "Photo uploaded by the shopper", className: ["pd2-upload", rise(animate)].filter(Boolean).join(" ") }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think-result" }),
    t.reached("result") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantResult, animate }),
    t.reached("image") && /* @__PURE__ */ jsxs("div", { className: ["pd2-result", animate && "gj2-rise"].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsx(ImageTile, { src: media2.tryonResult, alt: "Personalised try-on result", from: "ai" }),
      /* @__PURE__ */ jsx("span", { className: t.loading("image") ? "gj2-skel pd2-result__skel" : "gj2-skel pd2-result__skel gj2-skel--hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "gj2-skel__media" }) })
    ] }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.tryOn, animate })
  ] }) });
}
const qaBeats = [
  { id: "ask", type: "compose", text: script$f.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking how you use it"] },
  { id: "reply", type: "text", text: script$f.assistantMessage },
  FOLLOWUPS$1
];
function ProductQAV2Motion() {
  const { script: script2, product: product2 } = qa;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: qaBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: product2.image, title: product2.title, meta: `${storeName(product2.brand)} · ${product2.price} · ★${product2.rating}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think" }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.qa, animate })
  ] }) });
}
const outfitBeats = [
  { id: "ask", type: "compose", text: script$e.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Pairing it with your style"] },
  { id: "reply", type: "text", text: script$e.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
  FOLLOWUPS$1
];
function OutfitBuildingV2Motion() {
  const { script: script2, anchor: anchor2, coordinates: coordinates2 } = outfit;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: outfitBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: anchor2.image, title: anchor2.title, meta: storeName(anchor2.brand), className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: asCards(coordinates2, storeName(script2.brand)), animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.outfit, animate })
  ] }) });
}
const finderBeats = [
  { id: "ask", type: "compose", text: script$d.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "framing", type: "text", text: script$d.framing },
  ...answers.map((_, i) => ({ id: `q${i}`, type: "appear", ms: 500 })),
  { id: "think-match", type: "think", labels: ["Finding your match"] },
  { id: "result", type: "text", text: script$d.resultMessage },
  { id: "card", type: "load", ms: 700 },
  FOLLOWUPS$1
];
function GuidedFinderV2Motion() {
  const { script: script2, answers: answers2, product: product2 } = finder;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: finderBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think" }),
    t.reached("framing") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.framing, animate }),
    t.reached("q0") && /* @__PURE__ */ jsx(
      QuizPlates,
      {
        questions: answers2.filter((_, i) => t.reached(`q${i}`)),
        className: ["pd2-quiz", animate && "pd2-quiz--in"].filter(Boolean).join(" ")
      }
    ),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think-match", cards: true }),
    t.reached("result") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.resultMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "card", products: contain([product2]), animate, className: "pd2-single-wrap" }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.finder, animate })
  ] }) });
}
const visualBeats = [
  { id: "ask", type: "compose", text: script$c.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Matching the glow"] },
  { id: "reply", type: "text", text: script$c.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS$1
];
function VisualDiscoveryV2Motion() {
  const { script: script2, uploadedImage: uploadedImage2, matches: matches2 } = visual;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: visualBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ImageTile, { src: uploadedImage2.src, alt: uploadedImage2.alt, className: ["pd2-upload", rise(animate)].filter(Boolean).join(" ") }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: asCards(matches2, storeName(script2.brand)), animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.visual, animate })
  ] }) });
}
const sizeFitReply = "You're between sizes, but based on the head measurement you provided, I'd recommend Medium. It's also the better choice if you prefer a snug fit, which you've selected before.";
const sizeFitBeats = [
  { id: "ask", type: "compose", text: script$b.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking your measurements"] },
  { id: "reply", type: "text", text: sizeFitReply },
  FOLLOWUPS$1
];
function SizeFitV2Motion() {
  const { script: script2, product: product2 } = sizeFit;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: sizeFitBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: product2.image, title: product2.title, meta: `${storeName(product2.brand)} · ${product2.price} · ★${product2.rating}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think" }),
    t.reached("reply") && /* @__PURE__ */ jsx(SizeReply, { animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.sizeFit, animate })
  ] }) });
}
function SizeReply({ animate }) {
  const words = sizeFitReply.split(" ");
  return /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: words.map((word, i) => {
    const strong = word === "Medium.";
    const inner = strong ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("strong", { children: "Medium" }),
      "."
    ] }) : word;
    return /* @__PURE__ */ jsxs("span", { children: [
      animate ? /* @__PURE__ */ jsx("span", { className: "gj2-word", style: { animationDelay: `${i * 45}ms` }, children: inner }) : inner,
      i < words.length - 1 && " "
    ] }, i);
  }) });
}
const giftBeats = [
  { id: "ask", type: "compose", text: script$a.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding gifts around $150"] },
  { id: "reply", type: "text", text: script$a.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS$1
];
function GiftFinderV2Motion() {
  const { script: script2, gifts: gifts2 } = gift;
  return /* @__PURE__ */ jsx(MotionWindow, { brand: script2.brand, beats: giftBeats, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: contain(gifts2), animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$3.gift, animate })
  ] }) });
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
const brand = "Sorelle Labs";
const knowsWhenToHelp = {
  proactiveMessage: "Wondering if this serum works for sensitive skin?",
  userMessage: "Yes, my skin reacts to fragrance.",
  assistantMessage: "This one is fragrance-free and made for sensitive skin. Want me to check the ingredients?",
  product: {
    ...catalog.sorelleHydrating
  },
  ctaLabel: "Check ingredients"
};
const knowsHowToGuide = {
  userMessage: "Which of these is better for sensitive skin?",
  assistantMessage: "The Calming Serum is a better match. It's fragrance-free, has a simpler formula, and costs $16 less.",
  recommended: { ...catalog.sorelleCalming, name: catalog.sorelleCalming.title },
  current: { ...catalog.sorelleHydrating, name: catalog.sorelleHydrating.title }
};
const knowsWhenYoureReady = {
  userMessage: "Okay, I'll take the Calming Serum.",
  assistantMessage: "Great. I've selected the 30 ml Calming Serum for you.",
  product: {
    ...catalog.sorelleCalming,
    title: `${catalog.sorelleCalming.title} — ${catalog.sorelleCalming.size}`
  }
};
function StoreChrome({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "sorelle-store", style: brandStyle(brand), "aria-label": `${brand} storefront`, children: [
    /* @__PURE__ */ jsx(IosStatusBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "sorelle-store__bar", children: [
      /* @__PURE__ */ jsxs("span", { className: "gjm-store__menu", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {})
      ] }),
      /* @__PURE__ */ jsx(BrandWordmark, { brand, className: "sorelle-store__brand" }),
      /* @__PURE__ */ jsx("span", { className: "gjm-store__bag", "aria-hidden": "true" })
    ] }),
    children
  ] });
}
function SorelleProductStory() {
  const { product: product2 } = knowsWhenToHelp;
  return /* @__PURE__ */ jsxs(StoreChrome, { children: [
    /* @__PURE__ */ jsxs("div", { className: "sorelle-store__nav", children: [
      /* @__PURE__ */ jsx("span", { children: "Serums" }),
      /* @__PURE__ */ jsx("span", { children: "Moisturisers" }),
      /* @__PURE__ */ jsx("span", { children: "Our story" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sorelle-story", children: [
      /* @__PURE__ */ jsxs("div", { className: "sorelle-story__intro", children: [
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__eyebrow", children: "Care, made simple" }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "Your daily",
          /* @__PURE__ */ jsx("br", {}),
          "moment of calm."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sorelle-story__image", children: /* @__PURE__ */ jsx("img", { src: product2.image, alt: product2.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "sorelle-story__details", children: [
        /* @__PURE__ */ jsxs("div", { className: "sorelle-store__product-line", children: [
          /* @__PURE__ */ jsx("h3", { children: product2.title }),
          /* @__PURE__ */ jsx("span", { children: product2.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__description", children: "Fragrance-free care for sensitive skin." }),
        /* @__PURE__ */ jsxs("div", { className: "sorelle-store__detail-row", children: [
          /* @__PURE__ */ jsx("span", { children: "Ingredients" }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "+" })
        ] })
      ] })
    ] })
  ] });
}
function SorelleSerumCollection() {
  const { current: current2, recommended: recommended2 } = knowsHowToGuide;
  const serums = [
    { ...current2, note: "Daily hydration", tone: "sand" },
    { ...recommended2, note: "A simpler formula", tone: "sage" }
  ];
  return /* @__PURE__ */ jsxs(StoreChrome, { children: [
    /* @__PURE__ */ jsxs("div", { className: "sorelle-store__breadcrumb", children: [
      "Skincare ",
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "/" }),
      " Serums"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sorelle-collection", children: [
      /* @__PURE__ */ jsxs("div", { className: "sorelle-collection__intro", children: [
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__eyebrow", children: "The serum edit" }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "A little care.",
          /* @__PURE__ */ jsx("br", {}),
          "The right fit."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__description", children: "Two formulas. Find your everyday one." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sorelle-collection__grid", children: serums.map((serum) => /* @__PURE__ */ jsxs("div", { className: "sorelle-collection__product", children: [
        /* @__PURE__ */ jsx("div", { className: `sorelle-collection__image sorelle-store__plate--${serum.tone}`, children: /* @__PURE__ */ jsx("img", { src: serum.image, alt: serum.name }) }),
        /* @__PURE__ */ jsx("h3", { children: serum.name }),
        /* @__PURE__ */ jsx("span", { className: "sorelle-collection__price", children: serum.price }),
        /* @__PURE__ */ jsx("p", { children: serum.note })
      ] }, serum.id)) }),
      /* @__PURE__ */ jsxs("span", { className: "sorelle-store__action sorelle-store__action--outline", children: [
        "Compare serums ",
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "↗" })
      ] })
    ] })
  ] });
}
function SorellePurchasePage() {
  const { product: product2 } = knowsWhenYoureReady;
  return /* @__PURE__ */ jsxs(StoreChrome, { children: [
    /* @__PURE__ */ jsxs("div", { className: "sorelle-store__breadcrumb", children: [
      "Serums ",
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "/" }),
      " Calming Serum"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sorelle-purchase", children: [
      /* @__PURE__ */ jsx("div", { className: "sorelle-purchase__image sorelle-store__plate--sage", children: /* @__PURE__ */ jsx("img", { src: product2.image, alt: product2.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "sorelle-purchase__details", children: [
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__eyebrow", children: "Keep it gentle" }),
        /* @__PURE__ */ jsxs("div", { className: "sorelle-store__product-line", children: [
          /* @__PURE__ */ jsx("h2", { children: "Calming Serum" }),
          /* @__PURE__ */ jsx("span", { children: product2.price })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "sorelle-store__description", children: "Simple, fragrance-free care." }),
        /* @__PURE__ */ jsxs("div", { className: "sorelle-purchase__size", children: [
          /* @__PURE__ */ jsx("span", { children: "Size" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "30 ml ",
            /* @__PURE__ */ jsx("i", { "aria-hidden": "true", children: "✓" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "sorelle-store__action", children: [
          "Add to bag ",
          /* @__PURE__ */ jsx("span", { children: product2.price })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sorelle-store__detail-row", children: [
          /* @__PURE__ */ jsx("span", { children: "How to use" }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "+" })
        ] })
      ] })
    ] })
  ] });
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
const GJ2 = { transcript: ".gj2-transcript", foot: ".gj2-foot", user: ".gj2-msg--user", attach: "sbp-row", followups: "gj2-followups" };
function useChatCamera(t, enabled, stage, nudge, approach, release, { selectors = GJ2, wide = false, fitOnly = false, lens } = {}) {
  var _a;
  let mode = "full";
  if (enabled && !wide && !t.reducedMotion && !t.done && !(release && t.reached("camera-release"))) {
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
    const measure = () => {
      if (cam.style.transform && !cam.style.transform.includes("scale(1)")) return;
      const box = cam.getBoundingClientRect();
      const frame = clip.getBoundingClientRect();
      if (!box.height) return;
      setBand({ lo: (frame.top - box.top + FRAME_MARGIN) / box.height, hi: (frame.bottom - box.top - FRAME_MARGIN) / box.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(clip);
    return () => ro.disconnect();
  }, [enabled]);
  const fit = (a, b) => {
    if (!band) return FULL;
    const { lo, hi } = band;
    const h = hi - lo;
    if (lens && lens > h) {
      const span = h / lens;
      const cur2 = viewRef.current;
      const onBottom2 = cur2 !== FULL && Math.abs(cur2.ty - lo) >= 1e-3;
      const fitsTop = b + PAD <= span;
      const fitsBottom = a - PAD >= 1 - span;
      const top2 = fitsTop && !(onBottom2 && fitsBottom);
      return top2 ? { s: lens, ty: lo } : { s: lens, ty: hi - lens };
    }
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
    const transcript = cam.querySelector(selectors.transcript);
    const foot = cam.querySelector(selectors.foot);
    if (!transcript) return;
    const viewport = selectors.viewport && transcript.closest(selectors.viewport) || transcript;
    let raf = 0;
    const settle = () => {
      var _a2, _b;
      raf = 0;
      const camRect = cam.getBoundingClientRect();
      const f = (y) => (y - camRect.top) / camRect.height;
      const vp = viewport.getBoundingClientRect();
      const typing = !!foot && (!!((_a2 = t.composer) == null ? void 0 : _a2.value) || !nudge && !transcript.lastElementChild);
      const last = transcript.lastElementChild;
      let a, b;
      if (typing) {
        const r = foot.getBoundingClientRect();
        a = f(r.top);
        b = f(r.bottom);
      } else if (last) {
        const users = transcript.querySelectorAll(`:scope > ${selectors.user}`);
        let start = users.length ? users[users.length - 1] : transcript.firstElementChild;
        while ((_b = start == null ? void 0 : start.previousElementSibling) == null ? void 0 : _b.classList.contains(selectors.attach)) start = start.previousElementSibling;
        b = Math.min(f(vp.bottom), f(last.getBoundingClientRect().bottom) + HEADROOM);
        a = f(Math.max(vp.top, start.getBoundingClientRect().top));
        if (!lens && fit(a, b).s < MIN_FOCUS_ZOOM) {
          let block = last;
          while ((block == null ? void 0 : block.classList.contains(selectors.followups)) && block.previousElementSibling) block = block.previousElementSibling;
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
      if (cropped || Math.abs(next.s - cur.s) > 0.15 && since > HOLD_MS && (!fitOnly || next.s > cur.s)) {
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
  }, [mode, band, t.index, t.runKey, !!((_a = t.composer) == null ? void 0 : _a.value), selectors, fitOnly, lens]);
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
const IDLE_MS$1 = 900;
const NUDGE_MS = 2200;
const PRESS_MS$1 = 180;
const RISE_MS$1 = 600;
const HANDOFF_MS = 900;
const FOLLOWUPS = { id: "followups", type: "appear", ms: 500 };
const followups$2 = {
  help: ["How do I use it?", "Is it good for oily skin?", "Show other serums"],
  guide: ["Show reviews", "Is there a smaller size?", "How long does a bottle last?"],
  ready: ["Checkout", "Add a moisturiser", "When will it arrive?"]
};
const CHAPTERS = [
  { title: "Knows when to help", body: "A shopper lingers on a serum. Crossword offers the answer before they ask." },
  { title: "Knows how to guide", body: "Comparing two serums? It lays out what matters and helps them choose." },
  { title: "Knows when you’re ready", body: "Once they’ve decided, it adds the right one to the cart." }
];
const CH_SLOT_H = 531;
const SWAP_MS = 450;
function HumanModeV2ChaptersMotion({ mweb = false } = {}) {
  const rootRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (landed) setStarted(true);
  }, [landed]);
  const reduced = prefersReducedMotion$1();
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(0);
  const swap = useRef(0);
  const goTo = (i) => {
    window.clearTimeout(swap.current);
    setChapter(i);
    swap.current = window.setTimeout(() => setPlaying(i), reduced ? 0 : SWAP_MS);
  };
  const next = (i) => () => {
    if (i < 2) goTo(i + 1);
  };
  useEffect(() => () => window.clearTimeout(swap.current), []);
  const [runs, setRuns] = useState([0, 0, 0]);
  const pick = (i) => {
    setRuns((p) => p.map((v, j) => j === i ? v + 1 : v));
    setTimers((p) => p.map((v, j) => j === i ? 0 : v));
    setFocus(null);
    setStarted(true);
    goTo(i);
  };
  const [focus, setFocus] = useState(null);
  const [timers, setTimers] = useState([0, 0, 0]);
  const report = useCallback((f) => {
    setFocus((prev) => f.mode === "full" ? (prev == null ? void 0 : prev.phone) === f.phone ? null : prev : f);
    if (f.timerMs) setTimers((p) => p[f.phone] ? p : p.map((v, i) => i === f.phone ? f.timerMs : v));
  }, []);
  const cam = useStageCamera(focus);
  const rig = { report };
  const fill = (i) => i === chapter && (timers[i] || reduced) ? { transform: "scaleX(1)", transition: reduced ? "none" : `transform ${timers[i]}ms linear` } : { transform: "scaleX(0)", transition: "none" };
  return /* @__PURE__ */ jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsxs("div", { className: mweb ? "sv-ill-human-mode-frame hm2-chapters hm2-chapters--mweb" : "sv-ill-human-mode-frame hm2-chapters", children: [
    /* @__PURE__ */ jsx("ol", { className: "hm2-steps", style: mweb ? { "--hm2-i": chapter } : void 0, children: CHAPTERS.map((c, i) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: i === chapter ? "hm2-step hm2-step--active" : "hm2-step",
        role: "button",
        tabIndex: 0,
        "aria-current": i === chapter ? "step" : void 0,
        onClick: () => pick(i),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            pick(i);
          }
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "hm2-step__head", children: [
            /* @__PURE__ */ jsx("span", { className: "hm2-step__num", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxs("div", { className: "hm2-step__text", children: [
              /* @__PURE__ */ jsx("span", { className: "hm2-step__title", children: c.title }),
              /* @__PURE__ */ jsx("div", { className: "hm2-step__reveal", "aria-hidden": i !== chapter, children: /* @__PURE__ */ jsx("div", { className: "hm2-step__clip", children: /* @__PURE__ */ jsx("p", { className: "hm2-step__body", children: c.body }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hm2-step__bar", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "hm2-step__fill", style: fill(i) }) })
        ]
      },
      c.title
    )) }),
    /* @__PURE__ */ jsx("div", { className: "hm2-stagecol", children: /* @__PURE__ */ jsx("div", { className: cam.className, ref: cam.ref, style: cam.style, onTransitionEnd: cam.onTransitionEnd, children: /* @__PURE__ */ jsxs("div", { className: "hm2-stack", children: [
      /* @__PURE__ */ jsx(ChapterSlot, { slotH: mweb ? MWEB_SLOT_H : CH_SLOT_H, shown: chapter === 0, children: /* @__PURE__ */ jsx(KnowsWhenToHelp, { play: started && playing === 0, onDone: next(0), rig }, runs[0]) }),
      /* @__PURE__ */ jsx(ChapterSlot, { slotH: mweb ? MWEB_SLOT_H : CH_SLOT_H, shown: chapter === 1, children: /* @__PURE__ */ jsx(KnowsHowToGuide, { play: started && playing === 1, onDone: next(1), rig }, runs[1]) }),
      /* @__PURE__ */ jsx(ChapterSlot, { slotH: mweb ? MWEB_SLOT_H : CH_SLOT_H, shown: chapter === 2, children: /* @__PURE__ */ jsx(KnowsWhenYoureReady, { play: started && playing === 2, onDone: next(2), rig }, runs[2]) })
    ] }) }) })
  ] }) });
}
const MWEB_SLOT_H = 330;
function HumanModeV2ChaptersMwebMotion() {
  return /* @__PURE__ */ jsx(HumanModeV2ChaptersMotion, { mweb: true });
}
function ChapterSlot({ shown, slotH = CH_SLOT_H, children }) {
  return /* @__PURE__ */ jsx("div", { className: shown ? "hm2-slot hm2-slot--in" : "hm2-slot", "aria-hidden": !shown, children: /* @__PURE__ */ jsx(ScaleToFit, { contentWidth: PHONE_W, contentHeight: PHONE_H, maxWidth: PHONE_W * slotH / PHONE_H, maxHeight: slotH, children }) });
}
const WIDE = { s: 1, tx: 0, ty: 0 };
function useStageCamera(focus) {
  const ref = useRef(null);
  const [view, setView] = useState(WIDE);
  const viewRef = useRef(view);
  viewRef.current = view;
  const movedAt = useRef(-Infinity);
  useEffect(() => {
    var _a;
    const lens = ref.current;
    if (!lens || !focus || focus.mode === "full") {
      if (viewRef.current !== WIDE) movedAt.current = performance.now();
      setView(WIDE);
      return;
    }
    const screen = (_a = lens.querySelectorAll(".hm2-slot")[focus.phone]) == null ? void 0 : _a.querySelector(".gjm-screen");
    if (!screen) return;
    const transcript = screen.querySelector(".gj2-transcript");
    const foot = screen.querySelector(".gj2-foot");
    const lo = FRAME_MARGIN / lens.offsetHeight;
    const hi = 1 - lo;
    const band = hi - lo;
    let timer = 0;
    let later = 0;
    const settle = () => {
      timer = 0;
      const L = lens.getBoundingClientRect();
      const P = screen.getBoundingClientRect();
      const ph = { x: (P.left - L.left) / L.width, y: (P.top - L.top) / L.height, w: P.width / L.width, h: P.height / L.height };
      const f = (y) => (y - P.top) / P.height;
      const fit = (a2, b2) => {
        const cur2 = viewRef.current;
        const sTop = Math.min(ZOOM_CLOSE, band / ((b2 + PAD) * ph.h));
        const sBottom = Math.min(ZOOM_CLOSE, band / ((1 - a2 + PAD) * ph.h));
        const onTop = cur2 !== WIDE && Math.abs(cur2.ty - (lo - cur2.s * ph.y)) < 1e-3;
        const onBottom = cur2 !== WIDE && !onTop;
        const top = sTop >= sBottom * (onBottom ? 1.15 : 1) || onTop && sTop >= sBottom / 1.15;
        const allowed = top ? sTop : sBottom;
        const tx = (z) => Math.min(0, Math.max(1 - z, 0.5 - z * (ph.x + ph.w / 2)));
        const s = allowed >= ZOOM_CLOSE ? ZOOM_CLOSE : allowed >= ZOOM_MEDIUM ? ZOOM_MEDIUM : 1;
        if (s === 1 || s * ph.h <= band) return WIDE;
        return { s, tx: tx(s), ty: top ? lo - s * ph.y : hi - s * (ph.y + ph.h) };
      };
      let a, b;
      const last = transcript == null ? void 0 : transcript.lastElementChild;
      if (focus.mode === "nudge") {
        a = 0.74;
        b = 0.9;
      } else if (focus.ride) {
        a = 0;
        b = 0.4;
      } else if (foot && (focus.typing || focus.phone > 0 && !last)) {
        const r = foot.getBoundingClientRect();
        a = f(r.top);
        b = f(r.bottom);
      } else if (transcript && last) {
        const vp = transcript.getBoundingClientRect();
        const users = transcript.querySelectorAll(":scope > .gj2-msg--user");
        const start = users.length ? users[users.length - 1] : transcript.firstElementChild;
        b = Math.min(f(vp.bottom), f(last.getBoundingClientRect().bottom) + HEADROOM);
        a = f(Math.max(vp.top, start.getBoundingClientRect().top));
        if (fit(a, b).s < ZOOM_MEDIUM) {
          let block = last;
          while (block.classList.contains("gj2-followups") && block.previousElementSibling) block = block.previousElementSibling;
          a = f(Math.max(vp.top, block.getBoundingClientRect().top));
        }
      } else {
        a = 0;
        b = 0.4;
      }
      const cur = viewRef.current;
      const since = performance.now() - movedAt.current;
      if (since < CAMERA_MS) {
        later = window.setTimeout(schedule, CAMERA_MS - since + 20);
        return;
      }
      const next = fit(a, b);
      if (Math.abs(next.s - cur.s) < 1e-3 && Math.abs(next.ty - cur.ty) < 1e-3 && Math.abs(next.tx - cur.tx) < 1e-3) return;
      const shown = (y) => cur.ty + (ph.y + y * ph.h) * cur.s;
      const cropped = cur === WIDE || shown(a - PAD / 2) < lo || shown(b - HEADROOM / 2) > hi;
      if (cropped || Math.abs(next.s - cur.s) > 0.15 && since > HOLD_MS) {
        movedAt.current = performance.now();
        setView(next);
      }
    };
    const schedule = () => {
      if (!timer) timer = window.setTimeout(settle, 16);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    if (transcript) [...transcript.children].forEach((c) => ro.observe(c));
    if (foot) ro.observe(foot);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(later);
    };
  }, [focus == null ? void 0 : focus.phone, focus == null ? void 0 : focus.mode, focus == null ? void 0 : focus.tick, focus == null ? void 0 : focus.typing]);
  const [moving, setMoving] = useState(false);
  const prev = useRef(view);
  useEffect(() => {
    if (prev.current !== view) setMoving(true);
    prev.current = view;
  }, [view]);
  const ride = !!(focus == null ? void 0 : focus.ride) && view !== WIDE;
  return {
    ref,
    className: moving ? "hm2-lens hm2-lens--moving" : "hm2-lens",
    style: {
      transform: `translate(${view.tx * 100}%, ${view.ty * 100}%) scale(${view.s})`,
      transition: ride ? `transform ${RIDE_MS}ms ${EASE_RIDE}` : `transform ${view === WIDE ? PULLBACK_MS : CAMERA_MS}ms ${EASE_MOVE}`
    },
    onTransitionEnd: (e) => {
      if (e.target === e.currentTarget) setMoving(false);
    }
  };
}
function prefersReducedMotion$1() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const helpBeats = [
  { id: "ask", type: "compose", text: knowsWhenToHelp.userMessage, leadMs: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Checking for fragrance"] },
  { id: "reply", type: "text", text: knowsWhenToHelp.assistantMessage },
  { id: "card", type: "load", ms: 600 },
  FOLLOWUPS
];
function KnowsWhenToHelp({ play, onDone, rig }) {
  const reduced = prefersReducedMotion$1();
  const [stage, setStage] = useState(reduced ? "open" : "idle");
  const [risen, setRisen] = useState(reduced);
  const [approach, setApproach] = useState(false);
  useEffect(() => {
    if (!play || reduced) return;
    const lead = rig ? CAMERA_LEAD_MS : 0;
    const at = [IDLE_MS$1 + lead, IDLE_MS$1 + lead + NUDGE_MS, IDLE_MS$1 + lead + NUDGE_MS + PRESS_MS$1, IDLE_MS$1 + lead + NUDGE_MS + PRESS_MS$1 + RISE_MS$1];
    const timers = [
      ...rig ? [window.setTimeout(() => setApproach(true), IDLE_MS$1)] : [],
      window.setTimeout(() => setStage("nudge"), at[0]),
      window.setTimeout(() => setStage("pressed"), at[1]),
      window.setTimeout(() => setStage("open"), at[2]),
      window.setTimeout(() => setRisen(true), at[3])
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [play, reduced, !!rig]);
  const { proactiveMessage, userMessage, assistantMessage, product: product2, ctaLabel } = knowsWhenToHelp;
  return /* @__PURE__ */ jsxs("div", { className: `gjm-screen gjmm gjmm--${stage} hm2--${stage}`, children: [
    /* @__PURE__ */ jsx(SorelleProductStory, {}),
    /* @__PURE__ */ jsxs("div", { className: "gjm-launcher hm2-launcher", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm2-nudge", role: "status", children: [
        /* @__PURE__ */ jsx(BrandMark, { brand, className: "hm2-nudge__disc" }),
        /* @__PURE__ */ jsxs("div", { className: "hm2-nudge__col", children: [
          /* @__PURE__ */ jsx("span", { className: "hm2-nudge__head", children: brand }),
          /* @__PURE__ */ jsx("span", { className: "hm2-nudge__desc", children: proactiveMessage })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hm2-nudge__close", "aria-label": "Dismiss", children: "×" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "piw2-orb gjmm-orb", "aria-label": "Open chat", children: /* @__PURE__ */ jsx(BrandMark, { brand, className: "gjm-orb-mark" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "gjm-scrim gjmm-scrim" }),
    /* @__PURE__ */ jsx("div", { className: "gjmm-sheet-slot", children: /* @__PURE__ */ jsx(Sheet, { beats: helpBeats, active: risen, onDone, cam: rig && { rig, phone: 0, nudge: true, open: stage === "open", pre: approach, armed: play, preMs: IDLE_MS$1 + CAMERA_LEAD_MS + NUDGE_MS + PRESS_MS$1 + RISE_MS$1 }, children: (t, animate) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "gj2-msg gj2-msg--ai", children: proactiveMessage }),
      t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(User, { text: userMessage, animate }),
        /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
        t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: assistantMessage, animate }),
        t.reached("card") && /* @__PURE__ */ jsxs(Loading, { t, id: "card", animate, children: [
          /* @__PURE__ */ jsxs("div", { className: "hm2-item", children: [
            /* @__PURE__ */ jsx("div", { className: "sbp-row__thumb", children: /* @__PURE__ */ jsx("img", { src: product2.image, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "sbp-row__col", children: [
              /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: product2.title }),
              /* @__PURE__ */ jsxs("span", { className: "sbp-row__meta", children: [
                brand,
                " · ",
                product2.price
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hm2-btn hm2-btn--secondary", children: ctaLabel })
        ] }),
        /* @__PURE__ */ jsx(Trail, { t, items: followups$2.help, animate })
      ] })
    ] }) }) })
  ] });
}
const guideBeats = [
  { id: "ask", type: "compose", text: knowsHowToGuide.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing formulas"] },
  { id: "reply", type: "text", text: knowsHowToGuide.assistantMessage },
  { id: "compare", type: "load", ms: 700 },
  { id: "actions", type: "appear" },
  FOLLOWUPS
];
function KnowsHowToGuide({ play, onDone, rig }) {
  const { userMessage, assistantMessage, recommended: recommended2, current: current2 } = knowsHowToGuide;
  return /* @__PURE__ */ jsx(RisingScreen, { play, storefront: /* @__PURE__ */ jsx(SorelleSerumCollection, {}), children: (risen) => /* @__PURE__ */ jsx(Sheet, { beats: guideBeats, active: risen, onDone, cam: rig && { rig, phone: 1, nudge: false, open: risen, pre: false, armed: play, preMs: RISE_MS$1 }, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User, { text: userMessage, animate }),
    /* @__PURE__ */ jsx(Think, { t, id: "think" }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: assistantMessage, animate }),
    t.reached("compare") && /* @__PURE__ */ jsx(Loading, { t, id: "compare", animate, bare: true, children: /* @__PURE__ */ jsxs("div", { className: "hm2-compare", role: "table", children: [
      /* @__PURE__ */ jsxs("div", { className: "hm2-compare__row hm2-compare__row--shots", role: "row", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", { className: "hm2-compare__shot", children: /* @__PURE__ */ jsx("img", { src: recommended2.image, alt: "" }) }),
        /* @__PURE__ */ jsx("span", { className: "hm2-compare__shot", children: /* @__PURE__ */ jsx("img", { src: current2.image, alt: "" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm2-compare__row hm2-compare__row--head", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "columnheader", children: "What matters" }),
        /* @__PURE__ */ jsx("span", { role: "columnheader", children: recommended2.name }),
        /* @__PURE__ */ jsx("span", { role: "columnheader", children: current2.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm2-compare__row", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: "Price" }),
        /* @__PURE__ */ jsx("span", { role: "cell", className: "hm2-compare__pick", children: recommended2.price }),
        /* @__PURE__ */ jsx("span", { role: "cell", children: current2.price })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hm2-compare__row hm2-compare__row--foot", role: "row", children: [
        /* @__PURE__ */ jsx("span", { role: "rowheader", children: "Details" }),
        /* @__PURE__ */ jsx("span", { role: "cell", children: "View ↗" }),
        /* @__PURE__ */ jsx("span", { role: "cell", children: "View ↗" })
      ] })
    ] }) }),
    t.reached("actions") && /* @__PURE__ */ jsxs("div", { className: ["hm2-actions", animate && "sbp-in"].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsx("span", { className: "hm2-btn hm2-btn--secondary", children: "View ingredients" }),
      /* @__PURE__ */ jsx("span", { className: "hm2-btn", children: "Add to cart" })
    ] }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups$2.guide, animate })
  ] }) }) });
}
const readyBeats = [
  { id: "ask", type: "compose", text: knowsWhenYoureReady.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Adding it to your cart"] },
  { id: "reply", type: "text", text: knowsWhenYoureReady.assistantMessage },
  { id: "card", type: "load", ms: 600 },
  { id: "added", type: "pause", ms: 1800 },
  FOLLOWUPS
];
function KnowsWhenYoureReady({ play, onDone, rig }) {
  const { userMessage, assistantMessage, product: product2 } = knowsWhenYoureReady;
  return /* @__PURE__ */ jsx(RisingScreen, { play, storefront: /* @__PURE__ */ jsx(SorellePurchasePage, {}), children: (risen) => /* @__PURE__ */ jsx(Sheet, { beats: readyBeats, active: risen, onDone, cam: rig && { rig, phone: 2, nudge: false, open: risen, pre: false, armed: play, preMs: RISE_MS$1 }, children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User, { text: userMessage, animate }),
    /* @__PURE__ */ jsx(Think, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: assistantMessage, animate }),
    t.reached("card") && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(
      ProductCard,
      {
        product: { ...product2, imageFit: "contain" },
        added: true,
        lone: true,
        loading: t.loading("card"),
        adding: animate,
        addingDelayMs: 600
      }
    ) }),
    /* @__PURE__ */ jsx(Trail, { t, items: followups$2.ready, animate })
  ] }) }) });
}
function RisingScreen({ play, storefront, children }) {
  const reduced = prefersReducedMotion$1();
  const [risen, setRisen] = useState(false);
  useEffect(() => {
    if (!play) return;
    const id = window.setTimeout(() => setRisen(true), reduced ? 0 : RISE_MS$1);
    return () => window.clearTimeout(id);
  }, [play, reduced]);
  return /* @__PURE__ */ jsxs("div", { className: `gjm-screen gjmm gjmm--${play ? "open" : "idle"}`, children: [
    storefront,
    /* @__PURE__ */ jsx("div", { className: "gjm-launcher hm2-launcher", children: /* @__PURE__ */ jsx("span", { className: "piw2-orb gjmm-orb", "aria-label": "Open chat", children: /* @__PURE__ */ jsx(BrandMark, { brand, className: "gjm-orb-mark" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "gjm-scrim gjmm-scrim" }),
    /* @__PURE__ */ jsx("div", { className: "gjmm-sheet-slot", children: children(risen) })
  ] });
}
function Sheet({ beats, active, onDone, cam, children }) {
  var _a, _b;
  const transcriptRef = useRef(null);
  const played = useCameraBeats(beats, !!cam, !!(cam == null ? void 0 : cam.nudge));
  const t = useChatTimeline(played, active);
  const animate = !t.reducedMotion;
  const report = cam == null ? void 0 : cam.rig.report;
  let mode = "full";
  if (cam && !t.reducedMotion && !t.done) {
    if (cam.nudge) mode = cam.open ? "focus" : cam.pre ? "nudge" : "full";
    else if (active && t.passed("camera-rest")) mode = "focus";
  }
  const typing = !!((_a = t.composer) == null ? void 0 : _a.value);
  const timerMs = useMemo(() => ((cam == null ? void 0 : cam.preMs) ?? 0) + beatsDurationMs(played) + PULLBACK_MS + 150, [played, cam == null ? void 0 : cam.preMs]);
  const ride = !!(cam == null ? void 0 : cam.nudge) && t.index === 0;
  useEffect(() => {
    if (cam) report == null ? void 0 : report({ phone: cam.phone, mode, typing, tick: t.index * 1e3 + t.runKey, ride, timerMs: cam.armed ? timerMs : 0 });
  }, [report, cam == null ? void 0 : cam.phone, mode, typing, t.index, t.runKey, ride, cam == null ? void 0 : cam.armed, timerMs]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (!active || !t.done) return;
    const id = window.setTimeout(() => doneRef.current(), t.reducedMotion ? 0 : cam ? PULLBACK_MS + 150 : HANDOFF_MS);
    return () => window.clearTimeout(id);
  }, [active, t.done, t.reducedMotion, !!cam]);
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    let cancel;
    const follow = () => {
      const target = viewport.lastElementChild;
      if (!target) return;
      const scale = viewport.getBoundingClientRect().height / viewport.offsetHeight || 1;
      const bottom = target.getBoundingClientRect().bottom;
      const edge = viewport.getBoundingClientRect().bottom - FADE_CLEARANCE * scale;
      if (bottom <= edge) return;
      const top = viewport.scrollTop + (bottom - edge) / scale;
      cancel == null ? void 0 : cancel();
      if (t.reducedMotion) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel == null ? void 0 : cancel();
    };
  }, [t.index, t.runKey, t.reducedMotion]);
  return /* @__PURE__ */ jsxs("div", { className: "gj2-win gjm-sheet", children: [
    /* @__PURE__ */ jsx("span", { className: "gjm-grab", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(ChatHead, { brand }),
    /* @__PURE__ */ jsx("div", { className: "gj2-transcript", ref: transcriptRef, children: children(t, animate) }, t.runKey),
    /* @__PURE__ */ jsx(ChatFoot, { value: ((_b = t.composer) == null ? void 0 : _b.value) || void 0 })
  ] });
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
function Loading({ t, id, animate, bare = false, children }) {
  return /* @__PURE__ */ jsxs("div", { className: ["hm2-load", animate && "gj2-rise"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: bare ? void 0 : "hm2-card", children }),
    /* @__PURE__ */ jsx("span", { className: t.loading(id) ? "gj2-skel hm2-skel" : "gj2-skel hm2-skel gj2-skel--hidden", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "gj2-skel__media" }) })
  ] });
}
function Trail({ t, items, animate }) {
  if (!t.reached("followups")) return null;
  return /* @__PURE__ */ jsx(Followups, { items, className: animate ? "gj2-followups--in" : void 0 });
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
const script$9 = {
  brand: catalog.audenBlack.brand,
  // No user message — this interaction begins from observed browsing
  // behaviour, not a question. No UserTurn is rendered at all.
  assistantMessage: "You've looked at three models in the $450 to $600 range. If you're already comfortable at that price point, this model is worth considering, it has the longer battery life you tend to prioritize and is currently only $100 more than the one you've been viewing."
};
const previouslyViewed = {
  caption: "3 models viewed · $450–$600",
  items: audenViewedProducts.map((product2) => ({ ...product2, alt: product2.title }))
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
  script: script$9
}, Symbol.toStringTag, { value: "Module" }));
const script$8 = {
  brand: "AUDEN",
  assistantMessage: "Still deciding? Compare the three products you viewed side by side."
};
const differentiators = ["Balanced studio sound", "Longest battery life", "Lightest build"];
const products = audenViewedProducts.map((product2, index) => ({
  ...product2,
  name: product2.title,
  differentiator: differentiators[index]
}));
const decision = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  products,
  script: script$8
}, Symbol.toStringTag, { value: "Module" }));
const script$7 = {
  brand: catalog.sorelleGel.brand,
  // Proactive message, not a reply to a question — same precedent as
  // BrowseUpsell/23's no-UserTurn opening.
  assistantMessage: "Your cart is $14 away from a $15 offer. Add Cloud Gel Moisturizer for $29 to qualify, bringing your cart to $165 before the discount."
};
const cart = {
  value: 136,
  threshold: 150
};
const offer = {
  savings: "$15"
};
const accessory = {
  ...catalog.sorelleGel
};
const cartOffer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accessory,
  cart,
  offer,
  script: script$7
}, Symbol.toStringTag, { value: "Module" }));
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
function CatalogStorefront({ brand: brand2, categories, heading, product: product2, secondary }) {
  return /* @__PURE__ */ jsx(Storefront, { brand: brand2, categories, children: /* @__PURE__ */ jsxs("div", { className: "merchant-store__content", children: [
    /* @__PURE__ */ jsx("p", { className: "merchant-store__eyebrow", children: "The collection" }),
    /* @__PURE__ */ jsx("h2", { className: "merchant-store__heading", children: heading }),
    /* @__PURE__ */ jsx("img", { className: "merchant-store__hero", src: product2.image, alt: product2.title }),
    /* @__PURE__ */ jsxs("div", { className: "merchant-store__product-line", children: [
      /* @__PURE__ */ jsx("h3", { children: product2.title }),
      product2.price && /* @__PURE__ */ jsx("span", { children: product2.price })
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
      previouslyViewed.items.map((product2) => /* @__PURE__ */ jsx("span", { className: product2.id === viewed.id ? "auden-browse__colour auden-browse__colour--selected" : "auden-browse__colour", children: /* @__PURE__ */ jsx("img", { src: product2.image, alt: product2.title }) }, product2.id)),
      /* @__PURE__ */ jsx("span", { className: "merchant-store__description", children: "Recently viewed" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "merchant-store__cta", children: "View headphones" })
  ] }) });
}
function SorelleOfferStorefront() {
  return /* @__PURE__ */ jsx(Storefront, { brand: accessory.brand, categories: ["Moisturisers", "Serums", "Cleansers"], children: /* @__PURE__ */ jsxs("div", { className: "merchant-store__content sorelle-offer-store", children: [
    /* @__PURE__ */ jsxs("div", { className: "sorelle-offer-store__bag", children: [
      /* @__PURE__ */ jsx("span", { children: "Your bag" }),
      /* @__PURE__ */ jsxs("strong", { children: [
        "$",
        cart.value
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "merchant-store__eyebrow", children: "Daily hydration" }),
    /* @__PURE__ */ jsx("h2", { className: "merchant-store__heading", children: "Care that feels light." }),
    /* @__PURE__ */ jsx("img", { className: "merchant-store__hero", src: accessory.image, alt: accessory.title }),
    /* @__PURE__ */ jsxs("div", { className: "merchant-store__product-line", children: [
      /* @__PURE__ */ jsx("h3", { children: accessory.title }),
      /* @__PURE__ */ jsx("span", { children: accessory.price })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "merchant-store__description", children: "A fresh layer of moisture for every day." }),
    /* @__PURE__ */ jsxs("span", { className: "merchant-store__cta", children: [
      "Add to bag · ",
      accessory.price
    ] })
  ] }) });
}
function AudenCompareStorefront() {
  return /* @__PURE__ */ jsx(Storefront, { brand: "Auden", categories: ["Headphones", "Our story", "Support"], children: /* @__PURE__ */ jsxs("div", { className: "merchant-store__content auden-collection", children: [
    /* @__PURE__ */ jsx("p", { className: "merchant-store__eyebrow", children: "Compare Auden headphones" }),
    /* @__PURE__ */ jsx("h2", { className: "merchant-store__heading", children: "Three ways to listen." }),
    /* @__PURE__ */ jsx("p", { className: "merchant-store__description", children: "Find the pair that fits your day." }),
    /* @__PURE__ */ jsx("div", { className: "auden-collection__list", children: products.map((product2) => /* @__PURE__ */ jsxs("div", { className: "auden-collection__product", children: [
      /* @__PURE__ */ jsx("img", { src: product2.image, alt: product2.name }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: product2.name.replace("Auden ", "") }),
        /* @__PURE__ */ jsx("p", { children: product2.differentiator }),
        /* @__PURE__ */ jsx("span", { children: product2.price })
      ] })
    ] }, product2.id)) }),
    /* @__PURE__ */ jsxs("span", { className: "auden-collection__compare", children: [
      "Compare headphones ",
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "↗" })
    ] })
  ] }) });
}
const script$6 = {
  brand: catalog.hearthwareCompact.brand,
  userMessage: "I'm looking at this air fryer.",
  assistantMessage: "This one will work, but I'd recommend the next model up for you. You've previously bought for a family of four, and this smaller basket may mean cooking in batches. The larger model gives you more capacity without a significant jump in price."
};
const current$1 = {
  ...catalog.hearthwareCompact,
  name: catalog.hearthwareCompact.title,
  capacity: catalog.hearthwareCompact.size
};
const recommended$1 = {
  ...catalog.hearthwareFamily,
  name: catalog.hearthwareFamily.title,
  capacity: catalog.hearthwareFamily.size
};
const upsell = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  current: current$1,
  recommended: recommended$1,
  script: script$6
}, Symbol.toStringTag, { value: "Module" }));
const script$5 = {
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
  script: script$5
}, Symbol.toStringTag, { value: "Module" }));
const script$4 = {
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
  script: script$4
}, Symbol.toStringTag, { value: "Module" }));
const RISE_MS = 600;
const followups$1 = {
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
function SheetWindow$1({ brand: brand2, storefront, beats, children, Frame = SceneFrame, nudge, camera: camera2 = false, cameraRelease }) {
  var _a;
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
    const lead = camera2 ? CAMERA_LEAD_MS : 0;
    const at = [IDLE_MS + lead, IDLE_MS + lead + NUDGE_HOLD_MS, IDLE_MS + lead + NUDGE_HOLD_MS + PRESS_MS];
    const timers = [
      ...camera2 ? [window.setTimeout(() => setApproach(true), IDLE_MS)] : [],
      window.setTimeout(() => setStage("nudge"), at[0]),
      window.setTimeout(() => setStage("pressed"), at[1]),
      window.setTimeout(() => setStage("open"), at[2]),
      window.setTimeout(() => setRisen(true), at[2] + RISE_MS)
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [landed, nudge, camera2]);
  const played = useCameraBeats(beats, camera2, !!nudge, cameraRelease);
  const t = useChatTimeline(played, risen);
  const inertRef = useRef(null);
  useFollowLatest(camera2 ? inertRef : transcriptRef, t);
  useSmoothFollow(camera2 ? transcriptRef : inertRef, t);
  const cam = useChatCamera(t, camera2, stage, !!nudge, approach, cameraRelease);
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
      /* @__PURE__ */ jsx(ChatFoot, { value: ((_a = t.composer) == null ? void 0 : _a.value) || void 0 })
    ] }) })
  ] }) }) }) }) });
}
function LoneCard({ t, id, product: product2, animate }) {
  if (!t.reached(id)) return null;
  return /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(ProductCard, { product: product2, lone: true, loading: t.loading(id) }) });
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
const upsellColumns = [recommended$1, current$1];
const upsellRows = [
  { label: "Capacity", values: upsellColumns.map((c) => c.capacity) },
  { label: "Price", values: upsellColumns.map((c) => c.price) }
];
const upsellBeats = [
  { id: "ask", type: "compose", text: script$6.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two models"] },
  { id: "reply", type: "text", text: script$6.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
  FOLLOWUPS$1
];
function UpsellUpgradeV2CameraMotion() {
  return /* @__PURE__ */ jsx(UpsellUpgradeV2Motion, { camera: true });
}
function UpsellUpgradeV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, current: current2 } = upsell;
  return /* @__PURE__ */ jsx(SheetWindow$1, { brand: script2.brand, beats: upsellBeats, camera: camera2, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Air fryers", "Accessories", "Recipes"],
      heading: "A little more room for dinner.",
      product: { image: current2.image, title: current2.name, price: current2.price },
      secondary: { image: recommended$1.image, title: recommended$1.name, price: recommended$1.price }
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: current2.image, title: current2.name, meta: `${storeName(script2.brand)} · ${current2.price} · ${current2.capacity}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    t.reached("compare") && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(ComparisonCard, { columns: upsellColumns, rows: upsellRows, loading: t.loading("compare") }) }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$1.upsell, animate })
  ] }) });
}
const crossSellBeats = [
  { id: "ask", type: "compose", text: script$5.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding what goes with it"] },
  { id: "reply", type: "text", text: script$5.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
  FOLLOWUPS$1
];
function CrossSellV2CameraMotion() {
  return /* @__PURE__ */ jsx(CrossSellV2Motion, { camera: true });
}
function CrossSellV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, anchor: anchor2, addOns: addOns2 } = crossSell;
  return /* @__PURE__ */ jsx(SheetWindow$1, { brand: script2.brand, beats: crossSellBeats, camera: camera2, storefront: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: contain(addOns2), animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$1.crossSell, animate })
  ] }) });
}
const bundleBeats = [
  { id: "ask", type: "compose", text: script$4.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Picking the right add-ons"] },
  { id: "reply", type: "text", text: script$4.assistantMessage },
  { id: "bundle", type: "load", ms: 750 },
  FOLLOWUPS$1
];
const bundleCard = {
  id: "bundle",
  title: bundle.title,
  brand: storeName(script$4.brand),
  image: bundle.image,
  price: bundle.price,
  tag: "Bundle · 3 items",
  imageFit: "contain"
};
function BundleBuildingV2CameraMotion() {
  return /* @__PURE__ */ jsx(BundleBuildingV2Motion, { camera: true });
}
function BundleBuildingV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, anchor: anchor2 } = bundle$1;
  return /* @__PURE__ */ jsx(SheetWindow$1, { brand: script2.brand, beats: bundleBeats, camera: camera2, storefront: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(LoneCard, { t, id: "bundle", product: bundleCard, animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$1.bundle, animate })
  ] }) });
}
const browseBeats = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "viewed", type: "appear", ms: 700 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: script$9.assistantMessage },
  { id: "card", type: "load", ms: 750 },
  FOLLOWUPS$1
];
function BrowseUpsellV2CameraMotion() {
  return /* @__PURE__ */ jsx(BrowseUpsellV2Motion, { camera: true });
}
function BrowseUpsellV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, previouslyViewed: previouslyViewed2, recommendedProduct: recommendedProduct2 } = browse;
  return /* @__PURE__ */ jsx(SheetWindow$1, { brand: script2.brand, beats: browseBeats, camera: camera2, cameraRelease: "card", storefront: /* @__PURE__ */ jsx(AudenBrowseStorefront, {}), nudge: "Still comparing headphones? There's one worth a look.", children: (t, animate) => t.passed("lead") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: ["sbp-row um2-viewed", rise(animate)].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsx("span", { className: "um2-viewed__stack", children: previouslyViewed2.items.map((item, i) => /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb um2-viewed__thumb", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.alt }) }, i)) }),
      /* @__PURE__ */ jsxs("span", { className: "sbp-row__col", children: [
        /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: "Recently viewed" }),
        /* @__PURE__ */ jsx("span", { className: "sbp-row__meta", children: previouslyViewed2.caption })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(LoneCard, { t, id: "card", product: contain([recommendedProduct2])[0], animate }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups$1.browse, animate })
  ] }) });
}
function ConversionAssistanceFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "sv-ill-conversion-assistance-frame", children: /* @__PURE__ */ jsx("div", { className: "sv-ill-conversion-assistance-frame__content", children }) });
}
const script$3 = {
  brand: catalog.sorelleVitaminC.brand,
  userMessage: "I'm not sure this serum is worth the price.",
  assistantMessage: "Fair. If you're looking for something similar at a lower price, I can show you a few options with comparable ingredients and benefits. Or I can help you understand what makes this one worth the price."
};
const product$2 = {
  image: catalog.sorelleVitaminC.image,
  alt: "Vitamin C serum being considered",
  brand: catalog.sorelleVitaminC.brand,
  title: catalog.sorelleVitaminC.title,
  price: catalog.sorelleVitaminC.price
};
const price = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  product: product$2,
  script: script$3
}, Symbol.toStringTag, { value: "Module" }));
const script$2 = {
  brand: catalog.aeriaCyclonePro.brand,
  userMessage: "How does this compare to the Cyclone Max?",
  assistantMessage: "Choose the Cyclone Max if suction matters most. The Cyclone Pro has a larger 1.5L dustbin and costs $500 less."
};
const recommended = {
  ...catalog.aeriaCyclonePro,
  name: catalog.aeriaCyclonePro.title,
  suction: "Lower",
  dustbin: "1.5L"
};
const current = {
  ...catalog.aeriaCycloneMax,
  name: catalog.aeriaCycloneMax.title,
  suction: "Higher",
  dustbin: "0.76L"
};
const comparison = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  current,
  recommended,
  script: script$2
}, Symbol.toStringTag, { value: "Module" }));
const script$1 = {
  brand: catalog.strideSneakersBlack.brand,
  userMessage: "Do you have this in stock?",
  assistantMessage: "Yes, this is available in your preferred size, with delivery by Friday. The other color you viewed is currently out of stock."
};
const product$1 = {
  ...catalog.strideSneakersBlack,
  alt: "Minimal leather sneakers in black",
  delivery: "Friday",
  colors: [
    { name: "Black", available: true },
    { name: "Tan", available: false }
  ]
};
const stock = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  product: product$1,
  script: script$1
}, Symbol.toStringTag, { value: "Module" }));
const script = {
  brand: catalog.maraisShirtOlive.brand,
  userMessage: "Okay, I'll take it.",
  assistantMessage: "Great. I've selected your saved size and the color you preferred. Simply add it to your cart."
};
const product = {
  ...catalog.maraisShirtOlive,
  alt: "Relaxed cotton shirt in olive"
};
const purchase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  product,
  script
}, Symbol.toStringTag, { value: "Module" }));
const followups = {
  comparison: ["Is it loud?", "Show me the Cyclone Max", "Add the Cyclone Pro"],
  cartOffer: ["Show other moisturizers", "What else qualifies?", "Go to checkout"],
  stock: ["Add US 9 in black", "Tell me when tan is back", "Free returns?"],
  purchase: ["Change the size", "Show it in white", "Delivery options"]
};
function SheetWindow(props) {
  return /* @__PURE__ */ jsx(SheetWindow$1, { ...props, Frame: ConversionAssistanceFrame });
}
function Button$1({ label, kind = "primary", block = false, icon }) {
  return /* @__PURE__ */ jsxs("span", { className: ["cv2-btn", `cv2-btn--${kind}`, block && "cv2-btn--block"].filter(Boolean).join(" "), children: [
    icon,
    label
  ] });
}
function Module({ t, id, animate, children, className }) {
  if (!t.reached(id)) return null;
  const loading = t.loading(id);
  return /* @__PURE__ */ jsxs("div", { className: ["cv2-module-wrap", animate && "gj2-rise"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs("div", { className: loading ? "cv2-skel" : "cv2-skel cv2-skel--hidden", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", { className: "cv2-skel__bone cv2-skel__bone--head" }),
      /* @__PURE__ */ jsx("span", { className: "cv2-skel__bone" }),
      /* @__PURE__ */ jsx("span", { className: "cv2-skel__bone" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: ["cv2-module", className].filter(Boolean).join(" "), children })
  ] });
}
function ModuleProduct({ image, title, meta, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "cv2-product", children: [
    /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb cv2-product__thumb", children: /* @__PURE__ */ jsx("img", { src: image, alt: "" }) }),
    /* @__PURE__ */ jsxs("span", { className: "sbp-row__col cv2-product__col", children: [
      /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: title }),
      /* @__PURE__ */ jsx("span", { className: "sbp-row__meta", children: meta })
    ] }),
    action
  ] });
}
function Seats({ label, options, picked }) {
  return /* @__PURE__ */ jsxs("div", { className: "cv2-choice", children: [
    /* @__PURE__ */ jsx("span", { className: "cv2-choice__label", children: label }),
    /* @__PURE__ */ jsx("div", { className: "cv2-choice__row", children: options.map((o) => /* @__PURE__ */ jsx("span", { className: o === picked ? "cv2-seat cv2-seat--picked" : "cv2-seat", children: o }, o)) })
  ] });
}
function Swatches({ label, options, picked }) {
  return /* @__PURE__ */ jsxs("div", { className: "cv2-choice", children: [
    /* @__PURE__ */ jsx("span", { className: "cv2-choice__label", children: label }),
    /* @__PURE__ */ jsx("div", { className: "cv2-choice__row", children: options.map((o) => /* @__PURE__ */ jsxs(
      "span",
      {
        className: ["cv2-swatch", o.name === picked && "cv2-swatch--picked", o.available === false && "cv2-swatch--off"].filter(Boolean).join(" "),
        children: [
          /* @__PURE__ */ jsx("span", { className: "cv2-swatch__dot", style: { background: o.color } }),
          o.name
        ]
      },
      o.name
    )) })
  ] });
}
const priceBeats = [
  { id: "ask", type: "compose", text: script$3.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding alternatives"] },
  { id: "reply", type: "text", text: script$3.assistantMessage },
  { id: "actions", type: "appear", ms: 500 }
];
function PriceObjectionV2CameraMotion() {
  return /* @__PURE__ */ jsx(PriceObjectionV2Motion, { camera: true });
}
function PriceObjectionV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, product: product2 } = price;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: priceBeats, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Serums", "Moisturisers", "Cleansers"],
      heading: "A little care, every day.",
      product: product2
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: product2.image, title: product2.title, meta: `${storeName(product2.brand)} · ${product2.price}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think" }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    t.reached("actions") && /* @__PURE__ */ jsxs("div", { className: ["cv2-actions", animate && "cv2-actions--in"].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsx(Button$1, { kind: "secondary", label: "Compare benefits" }),
      /* @__PURE__ */ jsx(Button$1, { label: "Find alternatives" })
    ] })
  ] }) });
}
const comparisonColumns = [recommended, current];
const comparisonRows = [
  { label: "Suction", values: comparisonColumns.map((c) => c.suction) },
  { label: "Dustbin", values: comparisonColumns.map((c) => c.dustbin) },
  { label: "Price", values: comparisonColumns.map((c) => c.price) }
];
const comparisonBeats = [
  { id: "ask", type: "compose", text: script$2.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two"] },
  { id: "reply", type: "text", text: script$2.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
  FOLLOWUPS$1
];
function ProductComparisonV2CameraMotion() {
  return /* @__PURE__ */ jsx(ProductComparisonV2Motion, { camera: true });
}
function ProductComparisonV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, recommended: recommended2 } = comparison;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: comparisonBeats, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Vacuums", "Accessories", "Support"],
      heading: "A cleaner kind of everyday.",
      product: { ...recommended2, title: recommended2.name },
      secondary: { ...current, title: current.name }
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: recommended2.image, title: recommended2.name, meta: `${storeName(script2.brand)} · ${recommended2.price}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    t.reached("compare") && /* @__PURE__ */ jsx("div", { className: animate ? "gj2-rise" : void 0, children: /* @__PURE__ */ jsx(ComparisonCard, { columns: comparisonColumns, rows: comparisonRows, loading: t.loading("compare") }) }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups.comparison, animate })
  ] }) });
}
const cartBeats = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your cart"] },
  { id: "reply", type: "text", text: script$7.assistantMessage },
  { id: "offer", type: "load", ms: 650 },
  FOLLOWUPS$1
];
function CartUpsellOfferV2CameraMotion() {
  return /* @__PURE__ */ jsx(CartUpsellOfferV2Motion, { camera: true });
}
function CartUpsellOfferV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, cart: cart2, offer: offer2, accessory: accessory2 } = cartOffer;
  const progress = Math.min(cart2.value / cart2.threshold, 1) * 100;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: cartBeats, storefront: /* @__PURE__ */ jsx(SorelleOfferStorefront, {}), nudge: "You're $14 away from $15 off your order.", children: (t, animate) => t.passed("lead") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsxs(Module, { t, id: "offer", animate, children: [
      /* @__PURE__ */ jsxs("div", { className: "cv2-progress", children: [
        /* @__PURE__ */ jsxs("div", { className: "cv2-progress__head", children: [
          /* @__PURE__ */ jsx("span", { children: "Cart total" }),
          /* @__PURE__ */ jsxs("span", { className: "cv2-progress__value", children: [
            "$",
            cart2.value,
            " of $",
            cart2.threshold
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cv2-progress__track", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: ["cv2-progress__fill", animate && !t.loading("offer") && "cv2-progress__fill--in"].filter(Boolean).join(" "),
            style: { width: `${progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        ModuleProduct,
        {
          image: accessory2.image,
          title: accessory2.title,
          meta: accessory2.price,
          action: /* @__PURE__ */ jsxs("span", { className: "cv2-save", children: [
            offer2.savings,
            " off"
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Button$1, { kind: "secondary", label: "Add", block: true, icon: /* @__PURE__ */ jsx(PlusGlyph, { size: 16, trim: true }) })
    ] }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups.cartOffer, animate })
  ] }) });
}
const stockBeats = [
  { id: "ask", type: "compose", text: script$1.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking stock"] },
  { id: "reply", type: "text", text: script$1.assistantMessage },
  { id: "module", type: "load", ms: 650 },
  FOLLOWUPS$1
];
const stockColors = { Black: "#1d1d1f", Tan: "#c49a6c" };
function StockAvailabilityV2CameraMotion() {
  return /* @__PURE__ */ jsx(StockAvailabilityV2Motion, { camera: true });
}
function StockAvailabilityV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, product: product2 } = stock;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: stockBeats, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Shoes", "New arrivals", "Our story"],
      heading: "An everyday pair.",
      product: product2
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ProductRow, { image: product2.image, title: product2.title, meta: `${storeName(product2.brand)} · ${product2.price}`, className: rise(animate) }),
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsxs(Module, { t, id: "module", animate, children: [
      /* @__PURE__ */ jsx(ModuleProduct, { image: product2.image, title: product2.title, meta: `${product2.price} · Delivery by ${product2.delivery}` }),
      /* @__PURE__ */ jsx(Seats, { label: "Size", options: ["US 8", "US 8.5", product2.size, "US 9.5"], picked: product2.size }),
      /* @__PURE__ */ jsx(
        Swatches,
        {
          label: "Color",
          options: product2.colors.map((c) => ({ name: c.name, color: stockColors[c.name], available: c.available })),
          picked: product2.colors[0].name
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups.stock, animate })
  ] }) });
}
const purchaseBeats = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Confirming your preferences"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "card", type: "load", ms: 700 },
  FOLLOWUPS$1
];
function PurchaseConfirmationV2CameraMotion() {
  return /* @__PURE__ */ jsx(PurchaseConfirmationV2Motion, { camera: true });
}
function PurchaseConfirmationV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2, product: product2 } = purchase;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: purchaseBeats, storefront: /* @__PURE__ */ jsx(
    CatalogStorefront,
    {
      brand: storeName(script2.brand),
      categories: ["Clothing", "New arrivals", "Accessories"],
      heading: "Easy pieces, every day.",
      product: product2
    }
  ), children: (t, animate) => t.passed("ask") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(User$1, { text: script2.userMessage, animate }),
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsxs(Module, { t, id: "card", animate, children: [
      /* @__PURE__ */ jsx(ModuleProduct, { image: product2.image, title: product2.title, meta: `${storeName(product2.brand)} · ${product2.price}` }),
      /* @__PURE__ */ jsx(Seats, { label: "Size", options: ["S", product2.size, "L", "XL"], picked: product2.size }),
      /* @__PURE__ */ jsx(Swatches, { label: "Color", options: [{ name: product2.color, color: "#6b6b3a" }, { name: "White", color: "#f4f1ea" }], picked: product2.color }),
      /* @__PURE__ */ jsx(Button$1, { label: "Add to cart", block: true })
    ] }),
    /* @__PURE__ */ jsx(Trail$1, { t, items: followups.purchase, animate })
  ] }) });
}
const decisionBeats = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: script$8.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  { id: "action", type: "appear", ms: 500 }
];
const decisionCards = products.map(({ id, image, name, differentiator, price: cost }) => ({
  id,
  image,
  title: name,
  brand: storeName(script$8.brand),
  subtitle: differentiator,
  price: cost,
  imageFit: "contain"
}));
function DecisionSupportV2CameraMotion() {
  return /* @__PURE__ */ jsx(DecisionSupportV2Motion, { camera: true });
}
function DecisionSupportV2Motion({ camera: camera2 = false } = {}) {
  const { script: script2 } = decision;
  return /* @__PURE__ */ jsx(SheetWindow, { camera: camera2, brand: script2.brand, beats: decisionBeats, storefront: /* @__PURE__ */ jsx(AudenCompareStorefront, {}), nudge: "Still deciding? Compare the three you viewed.", children: (t, animate) => t.passed("lead") && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Think$1, { t, id: "think", cards: true }),
    t.reached("reply") && /* @__PURE__ */ jsx(StreamedReply, { text: script2.assistantMessage, animate }),
    /* @__PURE__ */ jsx(Cards, { t, id: "cards", products: decisionCards, animate, className: "cv2-decision-cards" }),
    t.reached("action") && /* @__PURE__ */ jsx("div", { className: ["cv2-actions", animate && "cv2-actions--in"].filter(Boolean).join(" "), children: /* @__PURE__ */ jsx(Button$1, { label: "Compare products", block: true }) })
  ] }) });
}
const handWaveUrl = "/images/sell/motion-v2/assets/hand-wave-DV6aLLq6.webp";
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
function Media({ src, alt }) {
  if (src) {
    return /* @__PURE__ */ jsx("img", { className: `sv-ill-media${cutoutSrcs.has(src) ? " sv-ill-media--cutout" : ""}`, src, alt });
  }
  return /* @__PURE__ */ jsx("div", { className: "sv-ill-media sv-ill-media--placeholder", role: "img", "aria-label": alt });
}
function Thumbnail({ src, alt, state = "default", size = 56 }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `sv-ill-thumbnail ${state === "selected" ? "sv-ill-thumbnail--selected" : ""}`,
      style: { width: size, height: size, borderRadius: size * 0.1482 },
      children: /* @__PURE__ */ jsx(Media, { src, alt })
    }
  );
}
function Chip({
  children,
  kind = "label",
  size = "md",
  tone = "primary"
}) {
  const classes = [
    "sv-ill-chip",
    kind === "discount" && "sv-ill-chip--discount",
    kind === "action" && `sv-ill-chip--action sv-ill-chip--action-${tone}`,
    size === "sm" && "sv-ill-chip--sm"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("span", { className: classes, children });
}
function Button({ appearance, label, onClick, iconLeading, iconTrailing, className }) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: ["sv-ill-button", `sv-ill-button--${appearance}`, className].filter(Boolean).join(" "), onClick, children: [
    iconLeading,
    label,
    iconTrailing
  ] });
}
const starFilled = "/images/sell/motion-v2/assets/star-filled-H5Ymy-7D.svg";
const starEmpty = "/images/sell/motion-v2/assets/star-empty-CaQMISUB.svg";
function Rating({ value, count }) {
  const filled = Math.round(value);
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-rating", children: [
    /* @__PURE__ */ jsx("div", { className: "sv-ill-rating__stars", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx("img", { src: i < filled ? starFilled : starEmpty, alt: "", width: 9, height: 9 }, i)) }),
    /* @__PURE__ */ jsxs("span", { className: "sv-ill-rating__count", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
const cartIcon = "/images/sell/motion-v2/assets/cart-C6m-05Y7.svg";
const marketplace$2 = {
  url: "CRESTLINE.COM/HELMETS/ENDURO-MTB",
  retailer: catalog.crestlineHelmet.brand,
  image: catalog.crestlineHelmet.image,
  thumbnails: [catalog.crestlineHelmet.image],
  title: catalog.crestlineHelmet.title,
  subtitle: "Graphite · Mountain biking",
  price: catalog.crestlineHelmet.price,
  rating: 4,
  ratingCount: "320",
  sizeLabel: "Size",
  sizes: ["Small", "Medium", "Large"]
};
const widget$2 = {
  productReference: catalog.crestlineHelmet,
  message: "Still deciding on the fit? I can help you check the sizing and see whether the smaller size is in stock.",
  knockLine: "Between sizes? Want me to check the smaller size?",
  primaryAction: "Check smaller size",
  secondaryAction: "Not now"
};
const intervention = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  marketplace: marketplace$2,
  widget: widget$2
}, Symbol.toStringTag, { value: "Module" }));
function MarketplaceBackground$2() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace demo-brand-storefront", style: brandStyle(marketplace$2.retailer), children: [
    /* @__PURE__ */ jsx(BrowserChrome, { url: marketplace$2.url }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav", children: [
      /* @__PURE__ */ jsx(BrandWordmark, { brand: marketplace$2.retailer, className: "sv-ill-marketplace__logo" }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav-links", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "sv-ill-marketplace__cart",
          src: cartIcon,
          alt: "",
          "aria-hidden": "true",
          width: 20,
          height: 20
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__gallery", children: [
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__thumbnails", children: marketplace$2.thumbnails.map((src, i) => /* @__PURE__ */ jsx(
          Thumbnail,
          {
            src,
            alt: "",
            state: i === 0 ? "selected" : "default",
            size: 78.561
          },
          src
        )) }),
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__gallery-main", children: /* @__PURE__ */ jsx(Media, { src: marketplace$2.image, alt: marketplace$2.title }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info", children: [
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info-top", children: [
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__brand-row", children: [
            /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__brand", children: marketplace$2.retailer }),
            /* @__PURE__ */ jsx(Icon, { name: "caretDown", size: 20 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__heading", children: [
            /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__title", children: marketplace$2.title }),
            /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__subtitle", children: marketplace$2.subtitle })
          ] }),
          /* @__PURE__ */ jsx(Rating, { value: marketplace$2.rating, count: marketplace$2.ratingCount }),
          /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__price-row", children: /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__price", children: marketplace$2.price }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__sizes", children: [
          /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__sizes-label", children: marketplace$2.sizeLabel }),
          marketplace$2.sizes.map((size) => /* @__PURE__ */ jsx(Chip, { children: size }, size))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__actions", children: [
          /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to Cart" }),
          /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: "Buy Now" })
        ] })
      ] })
    ] })
  ] });
}
const foundations = [
  { ...catalog.lumenSecondSkin, attributeLabel: "Finish", attributeValue: "Dewy · Fawn", widgetImage: catalog.lumenSecondSkin.image },
  { ...catalog.lumenSkinVeil, attributeLabel: "Finish", attributeValue: "Dewy · Warm Beige", widgetImage: catalog.lumenSkinVeil.image },
  { ...catalog.lumenTrueMatch, attributeLabel: "Finish", attributeValue: "Matte · Honey", widgetImage: catalog.lumenTrueMatch.image }
];
const marketplace$1 = {
  url: "LUMEN.COM/FOUNDATION/SECOND-SKIN",
  retailer: catalog.lumenSecondSkin.brand,
  image: catalog.lumenSecondSkin.image,
  thumbnails: [catalog.lumenSecondSkin.image],
  title: foundations[0].title,
  subtitle: "Dewy Finish, Fawn",
  price: foundations[0].price,
  rating: 4.3,
  ratingCount: "286"
};
const widget$1 = {
  message: "Having trouble picking one? I can narrow these down based on your finish, coverage, undertone, and budget.",
  primaryAction: "Narrow it down"
};
const guidance = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  foundations,
  marketplace: marketplace$1,
  widget: widget$1
}, Symbol.toStringTag, { value: "Module" }));
function MarketplaceBackground$1() {
  const [, viewedA, viewedB] = foundations;
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace demo-brand-storefront", style: brandStyle(marketplace$1.retailer), children: [
    /* @__PURE__ */ jsx(BrowserChrome, { url: marketplace$1.url }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav", children: [
      /* @__PURE__ */ jsx(BrandWordmark, { brand: marketplace$1.retailer, className: "sv-ill-marketplace__logo" }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav-links", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "sv-ill-marketplace__cart",
          src: cartIcon,
          alt: "",
          "aria-hidden": "true",
          width: 20,
          height: 20
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__gallery", children: [
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__thumbnails", children: marketplace$1.thumbnails.map((src, i) => /* @__PURE__ */ jsx(Thumbnail, { src, alt: "", state: i === 0 ? "selected" : "default", size: 78.561 }, src)) }),
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__gallery-main", children: /* @__PURE__ */ jsx(Media, { src: marketplace$1.image, alt: marketplace$1.title }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info", children: [
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info-top", children: [
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__brand-row", children: [
            /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__brand", children: marketplace$1.retailer }),
            /* @__PURE__ */ jsx(Icon, { name: "caretDown", size: 20 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__heading", children: [
            /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__title", children: marketplace$1.title }),
            /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__subtitle", children: marketplace$1.subtitle })
          ] }),
          /* @__PURE__ */ jsx(Rating, { value: marketplace$1.rating, count: marketplace$1.ratingCount }),
          /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__price", children: marketplace$1.price })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__recently-viewed", children: [
          /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__recently-viewed-label", children: "Recently viewed" }),
          /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__recently-viewed-row", children: [viewedA, viewedB].map((p) => /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__recently-viewed-item", children: [
            /* @__PURE__ */ jsx(Thumbnail, { src: p.image, alt: p.title, size: 56 }),
            /* @__PURE__ */ jsx("span", { children: p.title })
          ] }, p.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__actions", children: [
          /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to Cart" }),
          /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: "Buy Now" })
        ] })
      ] })
    ] })
  ] });
}
const thumb1 = "/images/sell/motion-v2/assets/thumb-1-D5p0e31p.webp";
const thumb2 = "/images/sell/motion-v2/assets/thumb-2-CqbmVPsZ.webp";
const thumb3 = "/images/sell/motion-v2/assets/thumb-3-2EAxs_AY.webp";
const marketplace = {
  url: "FORMWORK.CO/CHAIRS/MESH-OFFICE-CHAIR",
  retailer: catalog.formworkMesh.brand,
  image: catalog.formworkMesh.image,
  thumbnails: [thumb1, thumb2, thumb3],
  title: catalog.formworkMesh.title,
  subtitle: "Graphite, Adjustable Lumbar",
  price: catalog.formworkMesh.price,
  rating: 4.5,
  ratingCount: "142",
  viewedLabel: "Viewed 3×"
};
const alsoViewed = [
  { ...catalog.formworkTask, widgetImage: catalog.formworkTask.image },
  { ...catalog.formworkExecutive, widgetImage: catalog.formworkExecutive.image }
];
const widget = {
  current: {
    image: catalog.formworkMesh.image,
    brand: marketplace.retailer,
    title: marketplace.title,
    price: marketplace.price
  },
  message: "Looks like this one caught your attention. Want me to show you how it compares with the other options you’ve viewed?",
  primaryAction: "Compare them",
  secondaryAction: "Not now"
};
const returnVisit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  alsoViewed,
  marketplace,
  widget
}, Symbol.toStringTag, { value: "Module" }));
function MarketplaceBackground() {
  return /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace demo-brand-storefront", style: brandStyle(marketplace.retailer), children: [
    /* @__PURE__ */ jsx(BrowserChrome, { url: marketplace.url }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav", children: [
      /* @__PURE__ */ jsx(BrandWordmark, { brand: marketplace.retailer, className: "sv-ill-marketplace__logo" }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__nav-links", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "sv-ill-marketplace__cart",
          src: cartIcon,
          alt: "",
          "aria-hidden": "true",
          width: 20,
          height: 20
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__gallery", children: [
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__thumbnails", children: marketplace.thumbnails.map((src, i) => /* @__PURE__ */ jsx(Thumbnail, { src, alt: "", state: i === 0 ? "selected" : "default", size: 78.561 }, src)) }),
        /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__gallery-main", children: /* @__PURE__ */ jsx(Media, { src: marketplace.image, alt: marketplace.title }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info", children: [
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__info-top", children: [
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__brand-row", children: [
            /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__brand", children: marketplace.retailer }),
            /* @__PURE__ */ jsx(Icon, { name: "caretDown", size: 20 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__heading", children: [
            /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__title-row", children: [
              /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__title", children: marketplace.title }),
              /* @__PURE__ */ jsx(Chip, { children: marketplace.viewedLabel })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__subtitle", children: marketplace.subtitle })
          ] }),
          /* @__PURE__ */ jsx(Rating, { value: marketplace.rating, count: marketplace.ratingCount }),
          /* @__PURE__ */ jsx("p", { className: "sv-ill-marketplace__price", children: marketplace.price })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__also-viewed", children: [
          /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__also-viewed-label", children: "Also viewed" }),
          /* @__PURE__ */ jsx("div", { className: "sv-ill-marketplace__also-viewed-row", children: alsoViewed.map((p) => /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__also-viewed-item", children: [
            /* @__PURE__ */ jsx(Thumbnail, { src: p.image, alt: p.title, size: 56 }),
            /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__also-viewed-text", children: [
              /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__also-viewed-title", children: p.title }),
              /* @__PURE__ */ jsx("span", { className: "sv-ill-marketplace__also-viewed-price", children: p.price })
            ] })
          ] }, p.title)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sv-ill-marketplace__actions", children: [
          /* @__PURE__ */ jsx(Button, { appearance: "primary", label: "Add to Cart" }),
          /* @__PURE__ */ jsx(Button, { appearance: "secondary", label: "Buy Now" })
        ] })
      ] })
    ] })
  ] });
}
function useComposerClip(winRef, runKey) {
  const [clip, setClip] = useState(null);
  useLayoutEffect(() => {
    var _a, _b;
    const win = winRef.current;
    const composer = win == null ? void 0 : win.querySelector(".gj2-composer");
    if (!win || !composer) return;
    const measure = () => {
      const w = win.getBoundingClientRect();
      const c = composer.getBoundingClientRect();
      const k = win.offsetWidth / w.width || 1;
      setClip({
        top: (c.top - w.top) * k,
        right: (w.right - c.right) * k,
        bottom: (w.bottom - c.bottom) * k,
        left: (c.left - w.left) * k,
        radius: c.height * k / 2
      });
    };
    measure();
    (_b = (_a = document.fonts) == null ? void 0 : _a.ready) == null ? void 0 : _b.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(win);
    return () => observer.disconnect();
  }, [winRef, runKey]);
  return clip;
}
function WidgetCanvas({
  brand: brand2,
  Page,
  message,
  knockLine,
  knockProduct,
  lead,
  rows,
  secondary,
  primary,
  narrow = false
}) {
  const rootRef = useRef(null);
  const winRef = useRef(null);
  const landed = useLandedOnScreen(rootRef);
  const t = useChatTimeline(knockBeats, landed);
  const animate = !t.reducedMotion;
  const clip = useComposerClip(winRef, t.runKey);
  const open = t.reached("expand");
  const knock = animate && t.reached("knock") && !open;
  const name = storeName(brand2);
  const style = clip ? {
    "--pv2-clip-top": `${clip.top}px`,
    "--pv2-clip-right": `${clip.right}px`,
    "--pv2-clip-bottom": `${clip.bottom}px`,
    "--pv2-clip-left": `${clip.left}px`,
    "--pv2-clip-radius": `${clip.radius}px`,
    // The knock seats 16px above the capsule's top edge (KNOCK_CSS
    // measures the same off the bar).
    "--pv2-knock-bottom": `${clip.bottom + clip.radius * 2 + 16}px`
  } : void 0;
  const products2 = /* @__PURE__ */ jsxs(Fragment, { children: [
    lead,
    rows == null ? void 0 : rows.map((r) => /* @__PURE__ */ jsxs("div", { className: "sbp-row pv2-row", children: [
      /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb", children: /* @__PURE__ */ jsx("img", { src: r.image, alt: "" }) }),
      /* @__PURE__ */ jsxs("span", { className: "sbp-row__col", children: [
        /* @__PURE__ */ jsx("span", { className: "sbp-row__title", children: r.title }),
        /* @__PURE__ */ jsx("span", { className: "sbp-row__meta", children: r.meta })
      ] })
    ] }, r.title))
  ] });
  const doors = [secondary ?? "Ask me anything", primary];
  const turn = (live) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: ["gj2-msg gj2-msg--ai", live && animate && "pv2-in"].filter(Boolean).join(" "), children: message }),
    /* @__PURE__ */ jsx("div", { className: ["pv2-rows", live && animate && "pv2-rows--in"].filter(Boolean).join(" "), children: products2 }),
    (!live || t.reached("trail")) && /* @__PURE__ */ jsx(Followups, { items: doors, className: live && animate ? "gj2-followups--in" : void 0 })
  ] });
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: ["sv-ill-visual-canvas sv-ill-visual-canvas--framed pv2-canvas", narrow && "pv2-canvas--narrow"].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsx("div", { className: "sv-ill-visual-canvas__background", children: /* @__PURE__ */ jsx(Page, {}) }),
    /* @__PURE__ */ jsx("div", { className: "sv-ill-visual-canvas__fade", children: /* @__PURE__ */ jsx(ContentFade, {}) }),
    /* @__PURE__ */ jsx("div", { className: "sv-ill-visual-canvas__widget sv-sell-widget-align-composer", children: /* @__PURE__ */ jsxs("div", { className: ["pv2-seat", landed && animate && "sv-sell-widget-enter"].filter(Boolean).join(" "), style, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: winRef,
          className: ["gj2-win pv2-win", (open || !animate) && "pv2-win--open", !clip && "pv2-win--unmeasured"].filter(Boolean).join(" "),
          children: [
            /* @__PURE__ */ jsx("div", { className: "pv2-head", children: /* @__PURE__ */ jsx(ChatHead, { brand: name }) }),
            /* @__PURE__ */ jsx("div", { className: "gj2-transcript pv2-transcript", children: /* @__PURE__ */ jsxs("div", { className: "sv-sell-reserve", children: [
              /* @__PURE__ */ jsx("div", { className: "sv-sell-hidden pv2-stack", "aria-hidden": "true", children: turn(false) }),
              /* @__PURE__ */ jsx("div", { className: "sv-sell-reserve__live pv2-stack", children: (open || !animate) && turn(true) })
            ] }) }),
            /* @__PURE__ */ jsx(ChatFoot, {})
          ]
        }
      ),
      knock && /* @__PURE__ */ jsx("div", { className: "pv2-knock-seat", children: /* @__PURE__ */ jsx(
        StorybookKnock,
        {
          title: knockLine,
          product: knockProduct,
          doors: [{ label: secondary ?? "Ask me anything" }, { label: primary, primary: true }],
          hovered: t.reached("tap")
        }
      ) })
    ] }, t.runKey) })
  ] });
}
const knockBeats = [
  { id: "idle", type: "pause", ms: 1200 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 3600 },
  { id: "tap", type: "pause", ms: 320 },
  { id: "expand", type: "appear", ms: 700 },
  { id: "trail", type: "appear", ms: 500 }
];
function ProactiveInterventionV2Motion({ narrow = false } = {}) {
  const { marketplace: m, widget: w } = intervention;
  const ref = w.productReference;
  return /* @__PURE__ */ jsx(
    WidgetCanvas,
    {
      narrow,
      brand: m.retailer,
      Page: MarketplaceBackground$2,
      message: w.message,
      knockLine: w.knockLine,
      knockProduct: ref.image,
      rows: [{ image: ref.image, title: ref.title, meta: `${storeName(ref.brand)} · ${ref.price}` }],
      secondary: w.secondaryAction,
      primary: w.primaryAction
    }
  );
}
function MwebFrame({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "pv2mc", children: /* @__PURE__ */ jsx("div", { className: "pv2mc__lens", children }) });
}
function ProactiveInterventionMwebMotion() {
  return /* @__PURE__ */ jsx(MwebFrame, { children: /* @__PURE__ */ jsx(ProactiveInterventionV2Motion, { narrow: true }) });
}
function ComparisonGuidanceMwebMotion() {
  return /* @__PURE__ */ jsx(MwebFrame, { children: /* @__PURE__ */ jsx(ComparisonGuidanceV2Motion, { narrow: true }) });
}
function ReturnVisitComparisonMwebMotion() {
  return /* @__PURE__ */ jsx(MwebFrame, { children: /* @__PURE__ */ jsx(ReturnVisitComparisonV2Motion, { narrow: true }) });
}
function ComparisonGuidanceV2Motion({ narrow = false } = {}) {
  const { marketplace: m, widget: w, foundations: foundations2 } = guidance;
  const prices = foundations2.map((f) => Number(f.price.slice(1)));
  const finishes = [...new Set(foundations2.map((f) => f.attributeValue.split(" · ")[0]))].join(", ");
  return /* @__PURE__ */ jsx(
    WidgetCanvas,
    {
      narrow,
      brand: m.retailer,
      Page: MarketplaceBackground$1,
      message: w.message,
      knockLine: "Torn between three? I can narrow them down for you.",
      lead: /* @__PURE__ */ jsxs("div", { className: "sbp-row um2-viewed pv2-row", children: [
        /* @__PURE__ */ jsx("span", { className: "um2-viewed__stack", children: foundations2.map((f) => /* @__PURE__ */ jsx("span", { className: "sbp-row__thumb um2-viewed__thumb", children: /* @__PURE__ */ jsx("img", { src: f.widgetImage, alt: "" }) }, f.title)) }),
        /* @__PURE__ */ jsxs("span", { className: "sbp-row__col", children: [
          /* @__PURE__ */ jsxs("span", { className: "sbp-row__title", children: [
            foundations2.length,
            " items viewed"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "sbp-row__meta", children: [
            "$",
            Math.min(...prices),
            "–$",
            Math.max(...prices),
            " · ",
            finishes
          ] })
        ] })
      ] }),
      primary: w.primaryAction
    }
  );
}
function ReturnVisitComparisonV2Motion({ narrow = false } = {}) {
  const { marketplace: m, widget: w } = returnVisit;
  return /* @__PURE__ */ jsx(
    WidgetCanvas,
    {
      narrow,
      brand: m.retailer,
      Page: MarketplaceBackground,
      message: w.message,
      knockLine: "Back again? I can compare it with the others you viewed.",
      knockProduct: w.current.image,
      rows: [{ image: w.current.image, title: w.current.title, meta: `${storeName(w.current.brand)} · ${w.current.price} · ${m.viewedLabel}` }],
      secondary: w.secondaryAction,
      primary: w.primaryAction
    }
  );
}
const r28 = (C) => () => createElement("div", { className: "sci-r28" }, createElement(C));
const CompleteChannelDeploymentMotion = r28(CompleteChannelDeploymentMotion$1);
const BrandedWidgetMotion = r28(BrandedWidgetCycle);
const PlaceItWhereverMotion = r28(PlaceItWhereverCompactMotion);
function SellColorContext({ children }) {
  return createElement(ColorContext, { variant: "crimson", children });
}
export {
  BrandedWidgetMotion,
  BrowseUpsellV2CameraMotion as BrowseUpsellMotion,
  BundleBuildingV2CameraMotion as BundleBuildingMotion,
  CartUpsellOfferV2CameraMotion as CartUpsellOfferMotion,
  ComparisonGuidanceV2Motion as ComparisonGuidanceMotion,
  ComparisonGuidanceMwebMotion,
  CompleteChannelDeploymentMotion,
  ConversationalDiscoveryV2Motion as ConversationalDiscoveryMotion,
  CrossSellV2CameraMotion as CrossSellMotion,
  DecisionSupportV2CameraMotion as DecisionSupportMotion,
  GiftFinderV2Motion as GiftFinderMotion,
  GuidedFinderV2Motion as GuidedFinderMotion,
  HumanModeV2ChaptersMotion as HumanModeMotion,
  HumanModeV2ChaptersMwebMotion as HumanModeMwebMotion,
  OutfitBuildingV2Motion as OutfitBuildingMotion,
  PlaceItWhereverMotion,
  PriceObjectionV2CameraMotion as PriceObjectionMotion,
  ProactiveInterventionV2Motion as ProactiveInterventionMotion,
  ProactiveInterventionMwebMotion,
  ProductComparisonV2CameraMotion as ProductComparisonMotion,
  ProductQAV2Motion as ProductQaMotion,
  PurchaseConfirmationV2CameraMotion as PurchaseConfirmationMotion,
  ReturnVisitComparisonV2Motion as ReturnVisitComparisonMotion,
  ReturnVisitComparisonMwebMotion,
  SellColorContext,
  SizeFitV2Motion as SizeFitMotion,
  StockAvailabilityV2CameraMotion as StockAvailabilityMotion,
  TryItOnV2Motion as TryItOnMotion,
  UpsellUpgradeV2CameraMotion as UpsellUpgradeMotion,
  VisualDiscoveryV2Motion as VisualDiscoveryMotion
};
