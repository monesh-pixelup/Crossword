"use client";

import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../motion";
import { AssistantTurn, ChatMessage, ChatShell, IconButton, Thread, UserTurn } from "../primitives";
import { FitBox, MaybeContainer } from "./parts";

/*
 * 24 — Brand adaptability: Three styles (`gs`). One conversation restyles
 * itself through four brands (luxury fashion, playful lifestyle, modern tech,
 * the house style): the frame changes first, then the type, the header and
 * the user bubbles (which morph to their new width).
 */

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

const copy = {
  turn1User: "Hi! Can you help me find something?",
  turn1Assistant:
    "Absolutely. I'm bringing in someone from the team now. I'll pass along everything we've discussed so you don't have to repeat yourself.",
  turn2User: "Something for a birthday gift.",
  turn2Assistant: "I'd love to help. Who are you shopping for?",
  composerValue: "Where's my order?",
};

const brands = [
  { id: "luxury", name: "MAISON NOIR", direction: "Luxury fashion" },
  { id: "playful", name: "PEACH CLUB", direction: "Playful lifestyle" },
  { id: "tech", name: "PULSE LABS", direction: "Modern tech" },
  { id: "ill", name: "SORELLE LABS", direction: "ILL library" },
] as const;
type BrandId = (typeof brands)[number]["id"];

/** How long each brand holds before the next restyle starts (ms). */
const holdMs = [1000, 700, 700, 1000];
/** Frame restyle (matches `--bam-morph`). */
const morphMs = 650;
/** The type, header and bubbles follow the frame after this delay. */
const retypeDelayMs = 180;
/** User bubbles ease to their new width. */
const bubbleMorphMs = 320;
/** The chat is laid out at 480 × 480 and scaled into 306 × 306. */
const shellSize = 480;
const fitSize = 306;
/** Start anyway if the brand fonts haven't loaded by then. */
const fontTimeoutMs = 2500;

/** One spec per brand face (weight + size), so they're all loaded before the first restyle. */
const fontSpecs: [spec: string, family: string][] = [
  ["400 14px", "--ill-font-geist"],
  ["400 14px", "--ill-font-noto-serif"],
  ["600 14px", "--ill-font-playfair-display"],
  ["500 14px", "--ill-font-quicksand"],
  ["700 13px", "--ill-font-quicksand"],
  ["400 14px", "--ill-font-geist-mono"],
  ["400 14px", "--ill-font-space-grotesk"],
  ["500 10px", "--ill-font-space-grotesk"],
];

/**
 * True once the brand fonts have loaded (or after 2.5s). The source named the
 * Google families; here they're next/font families, read from the
 * `--ill-font-*` variables in scope.
 */
function useBrandFontsReady(ref: RefObject<HTMLElement | null>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => !cancelled && setReady(true), fontTimeoutMs);
    const style = getComputedStyle(ref.current ?? document.documentElement);
    Promise.allSettled(
      fontSpecs.map(([spec, variable]) => document.fonts.load(`${spec} ${style.getPropertyValue(variable)}`)),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [ref]);
  return ready;
}

/**
 * A user bubble whose width eases to its new size when the type changes
 * (`typeKey`), instead of jumping (`K2`).
 */
function MorphingUserBubble({ text, typeKey, animate }: { text: string; typeKey: BrandId; animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastWidth = useRef<number | null>(null);
  const animation = useRef<Animation | null>(null);

  // Track the settled width (not while a morph is running).
  useEffect(() => {
    const bubble = ref.current;
    if (!bubble) return;
    const observer = new ResizeObserver(() => {
      if (animation.current?.playState !== "running") lastWidth.current = bubble.offsetWidth;
    });
    observer.observe(bubble);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const bubble = ref.current;
    if (!bubble) return;
    animation.current?.cancel();
    bubble.classList.remove("bam-bubble--morphing");
    const width = bubble.offsetWidth;
    const from = lastWidth.current;
    lastWidth.current = width;
    if (!animate || from == null || Math.abs(from - width) < 0.5) return;
    bubble.classList.add("bam-bubble--morphing");
    const morph = (animation.current = bubble.animate([{ width: `${from}px` }, { width: `${width}px` }], {
      duration: bubbleMorphMs,
      easing: "cubic-bezier(0.32, 0.72, 0, 1)",
    }));
    morph.onfinish = () => bubble.classList.remove("bam-bubble--morphing");
  }, [typeKey, animate]);

  return (
    <div ref={ref} className="ill-chat-message ill-chat-message--user">
      <p>{text}</p>
    </div>
  );
}

/**
 * The header for each brand (`ps`): luxury and playful use a menu button,
 * tech and the house style the history/new + expand buttons and a pill behind
 * the name. Every brand name is stacked in place and crossfades.
 */
function BrandHeader({ stepId, typeId }: { stepId: BrandId; typeId: BrandId }) {
  // Both the frame (step) and the type are on one of `ids`.
  const on = (...ids: BrandId[]) => ids.includes(stepId) && ids.includes(typeId);
  const menu = on("luxury", "playful");
  const tools = on("tech", "ill");
  return (
    <header className="ill-chat-header bam-header">
      <div className="bam-header__side">
        <div className={cx("bam-layer", menu && "is-on")} aria-hidden={!menu}>
          <button type="button" className="ill-icon-button ill-icon-button--outline ba-menu-button" aria-label="Menu">
            <span className="ba-menu-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        <div className={cx("ill-chat-header__group bam-layer", tools && "is-on")} aria-hidden={!tools}>
          <IconButton icon="history" label="History" variant="outline" />
          <IconButton icon="add" label="New conversation" variant="outline" />
        </div>
      </div>
      <span className={cx("bam-pill", tools && "is-on")}>
        {brands.map((brand) => (
          <span
            key={brand.id}
            className={cx(`bam-name bam-name--${brand.id}`, on(brand.id) && "is-on", brand.id === typeId && "is-flow")}
            aria-hidden={!on(brand.id)}
          >
            {brand.name}
          </span>
        ))}
      </span>
      <div className="bam-header__side bam-header__side--end">
        <div className={cx("bam-layer", tools && "is-on")} aria-hidden={!tools}>
          <IconButton icon="expand" label="Expand" variant="outline" />
        </div>
        <IconButton icon="close" label="Close" variant="outline" />
      </div>
    </header>
  );
}

/**
 * `bare` drops the aubergine container (texture + gold frame) and renders
 * only the 306 × 306 chat, which sits centred in the 413 × 402 container
 * (left 53.5, top 48).
 */
export function BrandAdaptability({ play = true, bare = false }: { play?: boolean; bare?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fontsReady = useBrandFontsReady(rootRef);
  const reducedMotion = usePrefersReducedMotion();
  // `step` drives the frame, `type` the type/header/bubbles (180ms behind); `snap` skips transitions on a restart.
  const [state, setState] = useState({ step: 0, type: 0, snap: false });

  useEffect(() => {
    if (!play || !fontsReady) return;
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    setState({ step: 0, type: 0, snap: true });
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setState((s) => ({ ...s, snap: false }))));
    let at = holdMs[0];
    for (let i = 1; i < brands.length; i++) {
      const index = i;
      after(at, () => setState((s) => ({ ...s, step: index })));
      after(at + retypeDelayMs, () => setState((s) => ({ ...s, type: index })));
      at += morphMs + holdMs[index];
    }
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
    };
  }, [play, fontsReady]);

  const stepId = brands[state.step].id;
  const typeId = brands[state.type].id;
  const animateBubbles = !state.snap && !reducedMotion;
  return (
    <div className="bam-stage">
      <MaybeContainer bare={bare}>
        <FitBox contentWidth={shellSize} contentHeight={shellSize} maxWidth={fitSize} maxHeight={fitSize}>
          <ChatShell
            brand={brands[state.type].name}
            className={cx(
              "ba-frame",
              `ba-frame--${stepId}`,
              "bam",
              `bam--type-${typeId}`,
              state.step !== state.type && "bam--retyping",
              state.snap && "bam--snap",
            )}
            width={shellSize}
            height={shellSize}
            rootRef={rootRef}
            composerValue={copy.composerValue}
            header={<BrandHeader stepId={stepId} typeId={typeId} />}
          >
            <Thread>
              <UserTurn>
                <MorphingUserBubble text={copy.turn1User} typeKey={typeId} animate={animateBubbles} />
              </UserTurn>
              <AssistantTurn>
                <ChatMessage role="assistant" text={copy.turn1Assistant} />
              </AssistantTurn>
              <UserTurn>
                <MorphingUserBubble text={copy.turn2User} typeKey={typeId} animate={animateBubbles} />
              </UserTurn>
              <AssistantTurn>
                <ChatMessage role="assistant" text={copy.turn2Assistant} />
              </AssistantTurn>
            </Thread>
          </ChatShell>
        </FitBox>
      </MaybeContainer>
    </div>
  );
}
