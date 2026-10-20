"use client";

import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { typeText, usePrefersReducedMotion } from "@/modules/sell/components/motion/motion";
import { ChatShell, Chip, IconButton, Skeleton, Thread } from "@/modules/sell/components/motion/primitives";
import backgroundTexture from "../../assets/motion/background-texture.webp";

/*
 * Scene-local building blocks of the support motion visuals (scenes 01–07),
 * ported from the support scene chunk (minified names in brackets). Markup
 * and class names match the source so scenes.css applies unchanged.
 */

/** The 738 × 680 maroon frame with gold corner rings, verbatim from the chunk. [Me] */
const frameBackground =
  "data:image/svg+xml,%3csvg%20width='738'%20height='680'%20viewBox='0%200%20738%20680'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='738'%20height='680'%20fill='%237D0034'/%3e%3cpath%20d='M30.5%2024C30.5%2026.4853%2028.4853%2028.5%2026%2028.5C23.5147%2028.5%2021.5%2026.4853%2021.5%2024C21.5%2021.5147%2023.5147%2019.5%2026%2019.5C28.4853%2019.5%2030.5%2021.5147%2030.5%2024Z'%20stroke='%23D2B75C'/%3e%3cpath%20d='M716.5%2024C716.5%2026.4853%20714.485%2028.5%20712%2028.5C709.515%2028.5%20707.5%2026.4853%20707.5%2024C707.5%2021.5147%20709.515%2019.5%20712%2019.5C714.485%2019.5%20716.5%2021.5147%20716.5%2024Z'%20stroke='%23D2B75C'/%3e%3cpath%20d='M30.5%20656C30.5%20658.485%2028.4853%20660.5%2026%20660.5C23.5147%20660.5%2021.5%20658.485%2021.5%20656C21.5%20653.515%2023.5147%20651.5%2026%20651.5C28.4853%20651.5%2030.5%20653.515%2030.5%20656Z'%20stroke='%23D2B75C'/%3e%3cpath%20d='M716.5%20656C716.5%20658.485%20714.485%20660.5%20712%20660.5C709.515%20660.5%20707.5%20658.485%20707.5%20656C707.5%20653.515%20709.515%20651.5%20712%20651.5C714.485%20651.5%20716.5%20653.515%20716.5%20656Z'%20stroke='%23D2B75C'/%3e%3c/svg%3e";

/** The 738 × 680 frame every support scene sits in (scales to its container's width). [M] */
export function SceneFrame({ children, hideBackground }: { children: ReactNode; hideBackground?: boolean }) {
  return (
    <div className="ill-scene-frame-scale">
      <div className="ill-scene-frame">
        {!hideBackground && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data, nothing to optimize */}
            <img className="ill-scene-frame__background" src={frameBackground} alt="" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element -- served as-is, like the source */}
            <img className="ill-scene-frame__texture" src={backgroundTexture.src} alt="" aria-hidden="true" />
          </>
        )}
        <div className="ill-scene-frame__content">{children}</div>
      </div>
    </div>
  );
}

/** Elements the skeleton draws as one solid block. [Se] */
const skeletonBlockSelector =
  ".ill-chip, .ill-button, .ill-thumbnail, .ill-support-step__marker, .ill-support-shade__swatch, svg, img";

type SkeletonShape = { kind: "block" | "outline" | "bar"; x: number; y: number; w: number; h: number; r: number };

/**
 * While `active`, traces the content of `ref` (skipping `ignoreClass`) into
 * skeleton shapes: blocks for chips/buttons/media, outlines for bordered or
 * filled boxes, and one bar per line of text (80% of the font size tall).
 * Re-traces on resize and once fonts load. [Re]
 */
function useSkeletonShapes(ref: RefObject<HTMLElement | null>, ignoreClass: string, active: boolean) {
  const [shapes, setShapes] = useState<SkeletonShape[]>([]);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!active || !root) return;
    const measure = () => {
      const box = root.getBoundingClientRect();
      const originX = box.left + root.clientLeft;
      const originY = box.top + root.clientTop;
      const next: SkeletonShape[] = [];
      const add = (rect: DOMRect, kind: SkeletonShape["kind"], radius: number, inset = 0) =>
        next.push({
          kind,
          x: rect.left - originX,
          y: rect.top - originY + inset,
          w: rect.width,
          h: rect.height - inset * 2,
          r: radius,
        });
      const visit = (el: Element) => {
        if (el.classList.contains(ignoreClass)) return;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return;
        const radius = parseFloat(style.borderTopLeftRadius) || 0;
        if (el.matches(skeletonBlockSelector)) {
          add(el.getBoundingClientRect(), "block", radius);
          return;
        }
        const channels = style.backgroundColor.match(/[\d.]+/g);
        const filled = !!channels && (channels.length < 4 || parseFloat(channels[3]) > 0);
        if ((parseFloat(style.borderTopWidth) > 0 || filled) && el.children.length > 0) {
          add(el.getBoundingClientRect(), "outline", radius);
        }
        const textNodes = [...el.childNodes].filter(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
        );
        if (textNodes.length) {
          const barHeight = Math.round(parseFloat(style.fontSize) * 0.8);
          const lines = new Map<number, DOMRect>();
          for (const node of textNodes) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
              const top = Math.round(rect.top);
              const line = lines.get(top);
              lines.set(
                top,
                line
                  ? new DOMRect(
                      Math.min(line.left, rect.left),
                      line.top,
                      Math.max(line.right, rect.right) - Math.min(line.left, rect.left),
                      line.height,
                    )
                  : rect,
              );
            }
          }
          for (const line of lines.values()) {
            const inset = Math.max((line.height - barHeight) / 2, 0);
            add(line, "bar", 4, inset);
          }
        }
        for (const child of el.children) visit(child);
      };
      for (const child of root.children) visit(child);
      setShapes(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [ref, ignoreClass, active]);
  return shapes;
}

/**
 * The cream result card under a reply. While `loading`, its content is
 * hidden behind a skeleton traced from that content; then the skeleton
 * fades out and the content reveals. [B]
 */
export function SupportPanel({
  heading,
  status,
  children,
  className,
  loading = false,
}: {
  heading?: ReactNode;
  status?: ReactNode;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const shapes = useSkeletonShapes(ref, "ill-support-panel__skeleton-overlay", loading);
  const wasLoading = useRef(loading);
  // Reading the ref during render is the source's own trick: it lags `loading` by one commit.
  // eslint-disable-next-line react-hooks/refs
  const overlayMounted = loading || wasLoading.current;
  // eslint-disable-next-line react-hooks/refs
  const revealing = !loading && wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  const state = loading ? "ill-support-panel--content-hidden" : revealing ? "ill-support-panel--content-reveal" : "";
  return (
    <section ref={ref} className={["ill-support-panel", state, className].filter(Boolean).join(" ")}>
      {(heading || status) && (
        <header className="ill-support-panel__header">
          {heading && <div className="ill-support-panel__heading">{heading}</div>}
          {status && <Chip size="sm">{status}</Chip>}
        </header>
      )}
      {children}
      {overlayMounted && (
        <div
          className={`ill-support-panel__skeleton-overlay${loading ? "" : " ill-support-panel__skeleton-overlay--hidden"}`}
        >
          {shapes.map((shape, i) => (
            <div
              key={i}
              className={`ill-support-panel__skeleton-shape${shape.kind === "outline" ? " ill-support-panel__skeleton-shape--outline" : ""}`}
              style={{ left: shape.x, top: shape.y, width: shape.w, height: shape.h, borderRadius: shape.r }}
            >
              {shape.kind !== "outline" && <Skeleton width="100%" height="100%" radius={shape.r} />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export type SupportStep = { label: string; detail?: string; state: "done" | "current" | "upcoming" };

/** A progress tracker: markers with label and detail, or `boxed` tiles without markers. [ce] */
export function SupportSteps({
  steps,
  orientation = "horizontal",
}: {
  steps: SupportStep[];
  orientation?: "horizontal" | "vertical" | "boxed";
}) {
  if (orientation === "boxed") {
    return (
      <ol className="ill-support-steps ill-support-steps--boxed">
        {steps.map((step) => (
          <li key={step.label} className={`ill-support-step ill-support-step--${step.state}`}>
            <span className="ill-support-step__label">{step.label}</span>
            {step.detail && <span className="ill-support-step__detail">{step.detail}</span>}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className={`ill-support-steps ill-support-steps--${orientation}`}>
      {steps.map((step) => (
        <li key={step.label} className={`ill-support-step ill-support-step--${step.state}`}>
          <span className="ill-support-step__marker" aria-hidden="true" />
          <span className="ill-support-step__text">
            <span className="ill-support-step__label">{step.label}</span>
            {step.detail && <span className="ill-support-step__detail">{step.detail}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Helpdesk-branded chat header: brand plus a "Helpdesk" badge between the button pairs. [be] */
export function HelpdeskHeader({ brand, tone = "default" }: { brand: ReactNode; tone?: "default" | "gold" }) {
  const gold = tone === "gold";
  return (
    <header className="ill-chat-header">
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "historyGold" : "history"} label="History" variant="outline" />
        <IconButton icon={gold ? "addGold" : "add"} label="New conversation" variant="outline" />
      </div>
      <div className="ill-helpdesk-header__center">
        <span className="ill-helpdesk-header__brand">{brand}</span>
        <span className="ill-helpdesk-header__badge">
          <span className="ill-helpdesk-header__badge-text">Helpdesk</span>
        </span>
      </div>
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "expandGold" : "expand"} label="Expand" variant="outline" />
        <IconButton icon={gold ? "closeGold" : "close"} label="Close" variant="outline" />
      </div>
    </header>
  );
}

/* The support script's timings (ms). [pe, Ie, Le, Ae, Be, Fe, Pe, Ve] */
const thinkSwapMs = 300;
const thinkSecondLabelMs = 500;
const thinkExitMs = 150;
const typeMsPerStep = 26;
const replyWordMs = 45;
const replyBaseMs = 220;
const replyTailMs = 150;
const resultLoadMs = 550;
const sendMs = 220;

/** How long a reply's word stagger plays before the result card loads. [He] */
function replyDuration(text: string) {
  return text.split(/\s+/).filter(Boolean).length * replyWordMs + replyBaseMs + replyTailMs;
}

export type SupportPhase = "composing" | "thinking" | "thinkingExit" | "replying" | "resultLoading" | "done";

/**
 * The script scenes 01–06 share: the shopper's message types into the
 * composer (26ms/char ±30%) and sends 220ms after the last character;
 * "Thinking" for 300ms, then `thinkingLabel` for 500ms, 150ms exit; the
 * reply staggers in; the result card loads for 550ms.
 *
 * Plays while `active`; inactive stops the clock where it is; inactive →
 * active restarts from the top. With reduced motion it starts at the end. [Q]
 */
export function useSupportScript({
  userMessage,
  assistantMessage,
  thinkingLabel,
  active,
}: {
  userMessage: string;
  assistantMessage: string;
  thinkingLabel: string;
  active: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState<SupportPhase>("composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [resultLoading, setResultLoading] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const wasActive = useRef(active);
  const phase: SupportPhase = reducedMotion ? "done" : step;

  // Restart from the top each time the scene becomes active again.
  useEffect(() => {
    if (active && !wasActive.current && !reducedMotion) {
      setStep("composing");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setResultLoading(false);
      setRunKey((key) => key + 1);
    }
    wasActive.current = active;
  }, [active, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !active || phase === "done") return;
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const clear = () => timers.forEach(window.clearTimeout);

    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancelTyping = typeText(userMessage, {
        msPerStep: typeMsPerStep,
        onTick: setComposerValue,
        onDone: () => {
          after(sendMs, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setStep("thinking");
          });
        },
      });
      return () => {
        cancelTyping();
        clear();
      };
    }
    if (phase === "thinking") {
      after(thinkSwapMs, () => setStatusLabel(thinkingLabel));
      after(thinkSwapMs + thinkSecondLabelMs, () => setStep("thinkingExit"));
      return clear;
    }
    if (phase === "thinkingExit") {
      after(thinkExitMs, () => setStep("replying"));
      return clear;
    }
    if (phase === "replying") {
      after(replyDuration(assistantMessage), () => {
        setResultLoading(true);
        setStep("resultLoading");
      });
      return clear;
    }
    if (phase === "resultLoading") {
      after(resultLoadMs, () => {
        setResultLoading(false);
        setStep("done");
      });
      return clear;
    }
  }, [phase, active, reducedMotion, userMessage, assistantMessage, thinkingLabel]);

  return {
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    resultLoading,
    reducedMotion,
    runKey,
    /** The shopper's message has been sent. */
    turnSent: phase !== "composing",
    /** The status line is up (fading out during `thinkingExit`). */
    showThinking: phase === "thinking" || phase === "thinkingExit",
    showReply: phase !== "composing" && phase !== "thinking" && phase !== "thinkingExit",
  };
}

/**
 * Scenes 01–06's chat: the frame, a 550 × 520 widget whose composer types
 * the shopper's message, and the thread (`tight`: 16px between turns), empty
 * until the message is sent. Unlike ChatScene, the viewport never scrolls.
 */
export function SupportScriptChat({
  brand,
  script,
  tight = false,
  children,
}: {
  brand: ReactNode;
  script: ReturnType<typeof useSupportScript>;
  tight?: boolean;
  children: ReactNode;
}) {
  const { phase, composerValue, composerTyping, turnSent } = script;
  const thread = <Thread>{turnSent && children}</Thread>;
  return (
    <SceneFrame>
      <ChatShell
        brand={brand}
        width={550}
        height={520}
        composerValue={phase === "composing" && composerValue ? composerValue : undefined}
        composerTyping={phase === "composing" && composerTyping}
      >
        {tight ? <div className="ill-support-thread--tight">{thread}</div> : thread}
      </ChatShell>
    </SceneFrame>
  );
}
