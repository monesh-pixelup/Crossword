"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { smoothScrollTo, typeText, usePrefersReducedMotion } from "@/modules/sell/components/motion/motion";
import {
  AiStatus,
  AssistantTurn,
  ChatMessage,
  ChatShell,
  Thread,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import cardBorder from "../../assets/motion/card-border.png";
import { HelpdeskHeader } from "./parts-b";

/*
 * 08 — Merchant insight (source `hs`). A merchant asks the helpdesk assistant
 * about their customer conversations; it reads the customer's history, then
 * answers a follow-up about the refund. A chat widget in a 687 × 586 green
 * notched card. Unlike the other scenes it runs its own turn/phase clock
 * (`ds`) rather than the beat runner: faster typing (14ms a character) and a
 * plain (not staggered) reply that fades in.
 */

const copy = {
  brand: "Velmore",
  userMessage: "I need to see what’s happening with our customer conversations.",
  context:
    "They’re a returning customer with 6 orders. They’re asking about a delayed refund for order #4821. They’ve visited the returns page twice and spent 3 minutes on the refund policy. Previous conversations show they prefer email updates.",
  followUpMessage: "Anything else I should know?",
  resolution:
    "The refund is approved but hasn’t reached the payment processor yet. I can draft the response for you.",
};

/** The card's four corner rings. */
const ring =
  "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20id='Ellipse%2043769'%20cx='5'%20cy='5'%20r='4.5'%20stroke='%23D2B75C'/%3e%3c/svg%3e";

/** Composer slides in before typing starts. */
const composerEnterMs = 200;
/** Typing: ms per character (±30% jitter). */
const typeMsPerStep = 14;
/** After the last character, before the message sends. */
const composeSendMs = 220;
/** Sending: the composer clears and the turn enters. */
const sendingMs = 140;
/** The turn's enter before the status shows. */
const turnEnterMs = 60;
/** "Thinking" swaps to the turn's own label after 300ms, which holds 500ms. */
const thinkingSwapMs = 300;
const thinkingLabelMs = 500;
/** The status line's exit. */
const thinkingExitMs = 150;
/** The reply's fade-in (180ms) plus a beat. */
const replyEnterMs = 180;
const replySettleMs = 150;
/** Reading pause after a reply: 350ms plus 3ms a character, at most 500ms more. */
const readBaseMs = 350;
const readMsPerChar = 3;
const readMaxExtraMs = 500;
/** Hold on the last reply. */
const finalHoldMs = 2000;

type Phase =
  | "composerEnter"
  | "composing"
  | "sending"
  | "turnEnter"
  | "thinking"
  | "thinkingExit"
  | "replying"
  | "pausing"
  | "done";

type InsightTurn = {
  userMessage: string;
  assistantMessage: string;
  thinkingLabel: string;
  /** The user message appears without being typed. */
  skipComposer?: boolean;
};

function readingPause(text: string) {
  return readBaseMs + Math.min(text.length * readMsPerChar, readMaxExtraMs);
}

/**
 * The turn-by-turn clock: for each turn the composer enters, types and sends
 * the user message, the status thinks ("Thinking", then the turn's label),
 * the reply lands, and the scene pauses before the next turn (2s on the
 * last). Runs while `play`; play false → true restarts from the top (bumping
 * `runKey`). Reduced motion starts at the end.
 */
function useInsightScript(turns: InsightTurn[], play: boolean) {
  const reducedMotion = usePrefersReducedMotion();
  const [turn, setTurn] = useState(0);
  const [phase, setPhase] = useState<Phase>("composerEnter");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [runKey, setRunKey] = useState(0);
  const wasPlaying = useRef(play);

  useEffect(() => {
    if (play && !wasPlaying.current && !reducedMotion) {
      setTurn(0);
      setPhase("composerEnter");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setRunKey((key) => key + 1);
    }
    wasPlaying.current = play;
  }, [play, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !play || phase === "done" || turn >= turns.length) return;
    const current = turns[turn];
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const clear = () => timers.forEach(window.clearTimeout);

    switch (phase) {
      case "composerEnter":
        if (current.skipComposer) {
          setPhase("turnEnter");
          return;
        }
        after(composerEnterMs, () => setPhase("composing"));
        return clear;
      case "composing": {
        setComposerTyping(true);
        setComposerValue("");
        const cancelTyping = typeText(current.userMessage, {
          msPerStep: typeMsPerStep,
          onTick: setComposerValue,
          onDone: () => after(composeSendMs, () => setPhase("sending")),
        });
        return () => {
          cancelTyping();
          clear();
        };
      }
      case "sending":
        after(sendingMs, () => {
          setComposerTyping(false);
          setComposerValue("");
          setPhase("turnEnter");
        });
        return clear;
      case "turnEnter":
        after(turnEnterMs, () => {
          setStatusLabel("Thinking");
          setPhase("thinking");
        });
        return clear;
      case "thinking":
        after(thinkingSwapMs, () => setStatusLabel(current.thinkingLabel));
        after(thinkingSwapMs + thinkingLabelMs, () => setPhase("thinkingExit"));
        return clear;
      case "thinkingExit":
        after(thinkingExitMs, () => setPhase("replying"));
        return clear;
      case "replying":
        after(replyEnterMs + replySettleMs, () => setPhase("pausing"));
        return clear;
      case "pausing": {
        const last = turn === turns.length - 1;
        after(last ? finalHoldMs : readingPause(current.assistantMessage), () => {
          if (last) {
            setPhase("done");
          } else {
            setTurn((i) => i + 1);
            setPhase("composerEnter");
          }
        });
        return clear;
      }
    }
  }, [turn, phase, play, reducedMotion, turns]);

  return {
    turnIndex: reducedMotion ? turns.length : turn,
    phase: reducedMotion ? ("done" as const) : phase,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    runKey,
  };
}

const turns: InsightTurn[] = [
  { userMessage: copy.userMessage, assistantMessage: copy.context, thinkingLabel: "Reading their history" },
  {
    userMessage: copy.followUpMessage,
    assistantMessage: copy.resolution,
    thinkingLabel: "Checking the refund",
    skipComposer: true,
  },
];

/** How far the newest turn sits above the viewport's bottom edge. */
const followMargin = 40;

export function MerchantInsight({ play = true }: { play?: boolean }) {
  const { turnIndex, phase, composerValue, composerTyping, statusLabel, reducedMotion, runKey } = useInsightScript(
    turns,
    play,
  );
  const composing =
    turnIndex === 0 && (phase === "composerEnter" || phase === "composing" || phase === "sending");
  const viewportRef = useRef<HTMLDivElement>(null);

  // Keep the newest turn in view: ease it up so its bottom sits 40px above the edge.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const latest = viewport.querySelector(".ill-thread")?.lastElementChild;
    if (!latest) return;
    const box = viewport.getBoundingClientRect();
    const rect = latest.getBoundingClientRect();
    if (rect.bottom <= box.bottom - followMargin && rect.top >= box.top) return;
    const top = viewport.scrollTop + (rect.bottom - box.bottom + followMargin);
    if (reducedMotion) viewport.scrollTop = top;
    else smoothScrollTo(viewport, top);
  }, [turnIndex, phase, reducedMotion]);

  return (
    <div className="ill-insight-frame-scale">
      <div key={runKey} className="ill-insight-card" data-phase={phase} data-turn={turnIndex}>
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn as-is, like the source */}
        <img className="ill-insight-card__border" src={cardBorder.src} alt="" aria-hidden="true" />
        <div className="ill-insight-card__hue" aria-hidden="true" />
        <div className="ill-insight-card__dots" aria-hidden="true">
          <div className="ill-insight-card__dots-row">
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data */}
            <img src={ring} alt="" width={10} height={10} />
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data */}
            <img src={ring} alt="" width={10} height={10} />
          </div>
          <div className="ill-insight-card__dots-row">
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data */}
            <img src={ring} alt="" width={10} height={10} />
            {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data */}
            <img src={ring} alt="" width={10} height={10} />
          </div>
        </div>
        <div className="ill-insight-card__content">
          <ChatShell
            brand={copy.brand}
            width={550}
            height={520}
            header={<HelpdeskHeader brand={copy.brand} />}
            composerValue={composing ? composerValue : undefined}
            composerTyping={composing && composerTyping}
            viewportRef={viewportRef}
            className="ill-theme-helpdesk"
          >
            <Thread>
              {turns.map((item, i) => {
                const past = i < turnIndex;
                const current = i === turnIndex;
                const sent = current && phase !== "composerEnter" && phase !== "composing";
                if (!past && !sent) return null;
                const thinking = current && (phase === "thinking" || phase === "thinkingExit");
                const replied = past || (current && (phase === "replying" || phase === "pausing" || phase === "done"));
                const status = <AiStatus label={statusLabel} visible={phase === "thinking"} />;
                return (
                  <Fragment key={i}>
                    <UserTurn animateIn={current && sent} className={i === 0 ? "ill-insight-first-turn" : undefined}>
                      <ChatMessage role="user" text={item.userMessage} />
                    </UserTurn>
                    <AssistantTurn animateIn={current && sent}>
                      {thinking && (i === 0 ? <div className="ill-insight-first-status">{status}</div> : status)}
                      {replied && (
                        <div className={current ? "ill-insight-reply-enter" : undefined}>
                          <ChatMessage role="assistant" text={item.assistantMessage} />
                        </div>
                      )}
                    </AssistantTurn>
                  </Fragment>
                );
              })}
            </Thread>
          </ChatShell>
        </div>
      </div>
    </div>
  );
}
