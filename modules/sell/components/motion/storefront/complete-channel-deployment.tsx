"use client";

import avatar from "@/modules/sell/assets/motion/avatar.svg";
import brandMark from "@/modules/sell/assets/motion/channel-brand-mark.svg";
import brandMarkSmall from "@/modules/sell/assets/motion/channel-brand-mark-sm.svg";
import composerActions from "@/modules/sell/assets/motion/composer-actions.svg";
import wallpaper from "@/modules/sell/assets/motion/wallpaper.png";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import * as art from "./artwork";
import { ChannelContainer } from "./parts";
import "./storefront.css";

/*
 * 26 — Complete channel deployment (`u1`). The same two-turn support chat
 * shown in each channel in turn (web widget, iMessage, WhatsApp, Instagram),
 * with the channel tray on the left tracking the active one. Loops every
 * 3.4s per channel while playing.
 */

/* eslint-disable @next/next/no-img-element -- the shells are drawn from inline SVG data and source-pixel files, like the original */

const brandName = "Sorelle Labs";

const copy = {
  turn1User: "Hi! Does this come in size M?",
  turn1Support: "Yes, size M is back in stock. Want me to add it to your cart?",
  turn2User: "Yes please!",
  turn2Support: "Done — it's in your cart, ready whenever you are.",
};

/** Instagram breaks the support replies by hand. */
const instagramLines = {
  turn1: ["Yes, size M is back in stock.", "Want me to add it to your cart?"],
  turn2: ["Done — it's in your cart,", "ready whenever you are."],
};

const channels = [
  { id: "web", label: "Web", active: art.webActive, inactive: art.webInactive },
  { id: "imessage", label: "iMessage", active: art.imessageActive, inactive: art.imessageInactive },
  { id: "whatsapp", label: "WhatsApp", active: art.whatsappActive, inactive: art.whatsappInactive },
  { id: "instagram", label: "Instagram", active: art.instagramActive, inactive: art.instagramInactive },
] as const;
type ChannelId = (typeof channels)[number]["id"];

/** How long each channel shows (ms). */
const channelMs = 3400;

/** The four corner dots of a tray tile (`A0`). */
function TrayDots() {
  return (
    <>
      <span className="ill-channel-frame__tray-item-dot ill-channel-frame__tray-item-dot--tl" aria-hidden="true" />
      <span className="ill-channel-frame__tray-item-dot ill-channel-frame__tray-item-dot--tr" aria-hidden="true" />
      <span className="ill-channel-frame__tray-item-dot ill-channel-frame__tray-item-dot--br" aria-hidden="true" />
      <span className="ill-channel-frame__tray-item-dot ill-channel-frame__tray-item-dot--bl" aria-hidden="true" />
    </>
  );
}

/**
 * The channel tray and the 255 × 255 shell slot (`Hs`). With `motion`, each
 * tile holds both glyphs (crossfading) and an indicator slides to `active`.
 * Inside the container unless `bare`.
 */
function ChannelFrame({
  active,
  motion = false,
  bare = false,
  children,
}: {
  active: ChannelId;
  motion?: boolean;
  bare?: boolean;
  children: ReactNode;
}) {
  const activeIndex = channels.findIndex((channel) => channel.id === active);
  const content = (
    <>
      <ul
        className={motion ? "ill-channel-frame__tray ill-channel-frame__tray--motion" : "ill-channel-frame__tray"}
        style={motion ? ({ "--tray-active": activeIndex } as CSSProperties) : undefined}
      >
        {channels.map((channel) => {
          const isActive = channel.id === active;
          return (
            <li key={channel.id} className="ill-channel-frame__tray-item" aria-current={isActive || undefined}>
              {motion ? (
                <span className="ill-channel-frame__tray-glyphs">
                  <img
                    className="ill-channel-frame__tray-glyph--inactive"
                    src={channel.inactive}
                    alt={channel.label}
                    width={28.622}
                    height={28.622}
                  />
                  <img
                    className="ill-channel-frame__tray-glyph--active"
                    src={channel.active}
                    alt=""
                    width={28.622}
                    height={28.622}
                  />
                </span>
              ) : (
                <img
                  src={isActive ? channel.active : channel.inactive}
                  alt={channel.label}
                  width={28.622}
                  height={28.622}
                />
              )}
              <TrayDots />
            </li>
          );
        })}
        <li className="ill-channel-frame__tray-item ill-channel-frame__tray-item--more" aria-hidden="true">
          <img src={art.trayMore} alt="" width={24.843} height={6.622} />
          <TrayDots />
        </li>
        {motion && <li className="ill-channel-frame__tray-indicator" aria-hidden="true" />}
      </ul>
      <div className="ill-channel-frame__shell">{children}</div>
    </>
  );
  return bare ? (
    <div className="ill-channel-frame ill-channel-frame--bare">{content}</div>
  ) : (
    <ChannelContainer className="ill-channel-frame">{content}</ChannelContainer>
  );
}

/** A web-widget header button (`x2`). */
function WebIconButton({ src, label, w, h }: { src: string; label: string; w: number; h: number }) {
  return (
    <span className="ill-web-shell__icon-btn" aria-label={label}>
      <img src={src} alt="" width={w} height={h} />
    </span>
  );
}

/** The chat in the brand's web widget (`Vs`). */
function WebShell() {
  return (
    <div className="ill-channel-shell ill-web-shell">
      <header className="ill-web-shell__header">
        <div className="ill-web-shell__group">
          <WebIconButton src={art.webHistory} label="History" w={6.892} h={6.618} />
          <WebIconButton src={art.webAdd} label="New conversation" w={6.618} h={6.618} />
        </div>
        <span className="ill-web-shell__brand">{brandName}</span>
        <div className="ill-web-shell__group">
          <WebIconButton src={art.webExpand} label="Expand" w={6.067} h={6.067} />
          <WebIconButton src={art.webClose} label="Close" w={5.516} h={5.515} />
        </div>
      </header>
      <div className="ill-web-shell__body">
        <p className="ill-web-shell__user">{copy.turn1User}</p>
        <p className="ill-web-shell__reply">{copy.turn1Support}</p>
        <p className="ill-web-shell__user">{copy.turn2User}</p>
        <p className="ill-web-shell__reply">{copy.turn2Support}</p>
      </div>
      <div className="ill-web-shell__composer">
        <span className="ill-web-shell__composer-text">Where’s my order?</span>
        <span className="ill-web-shell__send" aria-label="Send">
          <img src={art.webSend} alt="" width={8.549} height={7.465} />
        </span>
      </div>
      <span className="ill-channel-shell__glow ill-channel-shell__glow--offset" aria-hidden="true" />
    </div>
  );
}

/** An iMessage bubble with its sender label and tail (`w2`). */
function IMessageBubble({ side, label, text }: { side: "in" | "out"; label: string; text: string }) {
  return (
    <div className={`ill-im-shell__msg ill-im-shell__msg--${side}`}>
      <span className="ill-im-shell__label">{label}</span>
      <div className="ill-im-shell__bubble-wrap">
        <p className="ill-im-shell__bubble">{text}</p>
        <img
          className="ill-im-shell__tail"
          src={side === "in" ? art.imTailIn : art.imTailOut}
          alt=""
          width={12.173}
          height={7.101}
        />
      </div>
    </div>
  );
}

/** The chat in iMessage (`zs`). */
function IMessageShell() {
  return (
    <div className="ill-channel-shell ill-im-shell">
      <header className="ill-im-shell__header">
        <div className="ill-im-shell__header-row">
          <img className="ill-im-shell__back" src={art.imBack} alt="" width={13.179} height={13.179} />
          <div className="ill-im-shell__contact">
            <span className="ill-im-shell__avatar">
              <img src={brandMark.src} alt="" width={10.535} height={10.433} />
            </span>
            <span className="ill-im-shell__name">
              {"Tobias  "}
              <img src={art.imChevron} alt="" width={2.028} height={3.548} />
            </span>
          </div>
          <span className="ill-im-shell__spacer" />
        </div>
      </header>
      <div className="ill-im-shell__body">
        <IMessageBubble side="in" label="Shopper" text={copy.turn1User} />
        <IMessageBubble side="out" label="Shopper" text={copy.turn1Support} />
        <IMessageBubble side="in" label="Shopper" text={copy.turn2User} />
        <IMessageBubble side="out" label="Shopper" text={copy.turn2Support} />
      </div>
      <footer className="ill-im-shell__toolbar">
        <div className="ill-im-shell__field">
          <span className="ill-im-shell__placeholder">Text message</span>
          <svg className="ill-im-shell__mic" width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
            <rect x="1.5" y="0.5" width="3" height="5" rx="1.5" stroke="#727272" strokeWidth="0.8" />
            <path d="M0.6 4.2a2.4 2.4 0 004.8 0M3 6.6v1.8" stroke="#727272" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="ill-im-shell__plus">
          <img src={art.imPlus} alt="" width={9.262} height={9.262} />
        </span>
      </footer>
      <span className="ill-channel-shell__glow ill-channel-shell__glow--offset" aria-hidden="true" />
    </div>
  );
}

/** A WhatsApp bubble with time, read ticks (outgoing) and tail (`C2`). */
function WhatsAppBubble({ side, text, short }: { side: "in" | "out"; text: string; short?: boolean }) {
  return (
    <div className={`ill-wa-shell__row ill-wa-shell__row--${side}`}>
      {side === "in" && (
        <img className="ill-wa-shell__tail ill-wa-shell__tail--in" src={art.waTailIn} alt="" width={8} height={15} />
      )}
      <div className={`ill-wa-shell__bubble${short ? " ill-wa-shell__bubble--short" : ""}`}>
        <p className="ill-wa-shell__text">{text}</p>
        <span className="ill-wa-shell__meta">
          <span>11. 00</span>
          {side === "out" && <img src={art.waRead} alt="" width={8.08} height={7.542} />}
        </span>
      </div>
      {side === "out" && <img className="ill-wa-shell__tail" src={art.waTailOut} alt="" width={8} height={15} />}
    </div>
  );
}

/** The chat in WhatsApp (`r1`). */
function WhatsAppShell() {
  return (
    <div className="ill-channel-shell ill-wa-shell">
      <img className="ill-wa-shell__wallpaper" src={wallpaper.src} alt="" aria-hidden="true" />
      <header className="ill-wa-shell__header">
        <div className="ill-wa-shell__header-left">
          <span className="ill-wa-shell__back">
            <img src={art.waBack} alt="" width={7} height={11} />
            <span>12</span>
          </span>
          <div className="ill-wa-shell__profile">
            <img src={avatar.src} alt="" width={24.48} height={24.48} />
            <div>
              <p className="ill-wa-shell__name">
                {brandName}
                <img src={art.waVerified} alt="" width={12.24} height={12.24} />
              </p>
              <p className="ill-wa-shell__status">online</p>
            </div>
          </div>
        </div>
      </header>
      <div className="ill-wa-shell__body">
        <WhatsAppBubble side="out" text={copy.turn1User} />
        <WhatsAppBubble side="in" text={copy.turn1Support} />
        <WhatsAppBubble side="out" text={copy.turn2User} short />
        <WhatsAppBubble side="in" text={copy.turn2Support} />
      </div>
      <footer className="ill-wa-shell__bar">
        <img className="ill-wa-shell__divider" src={art.waDivider} alt="" aria-hidden="true" />
        <span className="ill-wa-shell__plus" aria-hidden="true">
          <img src={art.waPlusV} alt="" width={0.999} height={12.99} />
          <img className="ill-wa-shell__plus-h" src={art.waPlusH} alt="" width={0.999} height={12.99} />
        </span>
        <span className="ill-wa-shell__field">
          <span>Message</span>
          <img src={art.waAttachment} alt="" width={15.988} height={15.988} />
        </span>
        <img className="ill-wa-shell__camera" src={art.waCamera} alt="" width={15.988} height={15.988} />
        <img className="ill-wa-shell__mic" src={art.waMic} alt="" width={21.318} height={21.318} />
      </footer>
      <span className="ill-channel-shell__glow" aria-hidden="true" />
    </div>
  );
}

/** Instagram avatar: the brand mark, `sm` in the header, `md` beside replies (`x0`). */
function InstagramAvatar({ size }: { size: "sm" | "md" }) {
  return (
    <span className={`ill-ig-shell__avatar ill-ig-shell__avatar--${size}`}>
      {size === "sm" ? (
        <img src={brandMark.src} alt="" width={12.283} height={12.165} />
      ) : (
        <img src={brandMarkSmall.src} alt="" width={9.65} height={9.558} />
      )}
    </span>
  );
}

/** An incoming (support) Instagram message, two hand-broken lines (`r0`). */
function InstagramReply({ lines }: { lines: string[] }) {
  return (
    <div className="ill-ig-shell__row ill-ig-shell__row--in">
      <InstagramAvatar size="md" />
      <p className="ill-ig-shell__bubble ill-ig-shell__bubble--in">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </div>
  );
}

/** The chat in Instagram DMs (`m1`). */
function InstagramShell() {
  return (
    <div className="ill-channel-shell ill-ig-shell">
      <header className="ill-ig-shell__header">
        <div className="ill-ig-shell__identity">
          <InstagramAvatar size="sm" />
          <span className="ill-ig-shell__name">{brandName}</span>
        </div>
        <span className="ill-ig-shell__icon-btn">
          <img src={art.igInfo} alt="" width={11.724} height={11.724} />
        </span>
      </header>
      <div className="ill-ig-shell__body">
        <div className="ill-ig-shell__row ill-ig-shell__row--out">
          <p className="ill-ig-shell__bubble ill-ig-shell__bubble--out">{copy.turn1User}</p>
        </div>
        <InstagramReply lines={instagramLines.turn1} />
        <div className="ill-ig-shell__row ill-ig-shell__row--out">
          <p className="ill-ig-shell__bubble ill-ig-shell__bubble--out">{copy.turn2User}</p>
        </div>
        <InstagramReply lines={instagramLines.turn2} />
      </div>
      <footer className="ill-ig-shell__footer">
        <div className="ill-ig-shell__composer">
          <img src={art.igCamera} alt="" width={19.623} height={18.868} />
          <span className="ill-ig-shell__actions">
            <img src={composerActions.src} alt="" />
          </span>
        </div>
      </footer>
      <span className="ill-channel-shell__glow" aria-hidden="true" />
    </div>
  );
}

const shells: Record<ChannelId, ReactNode> = {
  web: <WebShell />,
  imessage: <IMessageShell />,
  whatsapp: <WhatsAppShell />,
  instagram: <InstagramShell />,
};

/**
 * `bare` drops the aubergine container (texture + gold frame) and renders
 * only the tray + shell, 327.5 × 255, which sits at left 35.5, top 73.5 in
 * the 413 × 402 container (storefront.css).
 */
export function CompleteChannelDeployment({ play = true, bare = false }: { play?: boolean; bare?: boolean }) {
  const [shown, setShown] = useState({ current: 0, previous: -1 });
  // Bumped on each (re)start so the shells remount without a leaving shell.
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!play) return;
    setShown({ current: 0, previous: -1 });
    setRunKey((key) => key + 1);
    const timer = window.setInterval(() => {
      setShown(({ current }) => ({ current: (current + 1) % channels.length, previous: current }));
    }, channelMs);
    return () => window.clearInterval(timer);
  }, [play]);

  return (
    <div className="ccd-motion">
      <ChannelFrame active={channels[shown.current].id} motion bare={bare}>
        <div key={runKey} className="ccd-motion__stage">
          {channels.map((channel, i) => {
            const state = i === shown.current ? "active" : i === shown.previous ? "leaving" : "hidden";
            return (
              <div
                key={channel.id}
                className={`ccd-motion__shell ccd-motion__shell--${state}`}
                aria-hidden={state !== "active" || undefined}
              >
                {shells[channel.id]}
              </div>
            );
          })}
        </div>
      </ChannelFrame>
    </div>
  );
}
