"use client";

import { useEffect, useState } from "react";
import { phaseTimers, replyDuration, typeText, usePrefersReducedMotion } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  AttributeRow,
  Button,
  ChatMessage,
  ChatShell,
  Icon,
  Skeleton,
  StaggerText,
  Thread,
  UserTurn,
} from "./primitives";

/*
 * 08 · Insights: anonymous traffic. Unidentified visitors traced to a Reddit
 * thread, with an offer ready for when they return.
 */

type Phase = "composing" | "thinking" | "thinkingExit" | "replying" | "cardLoading" | "askReveal" | "done";

const copy = {
  brand: "CROSSWORD",
  question: "We're seeing a spike in visitors we can't identify. Anything useful there?",
  insight: "340 anonymous sessions this week. 62% came from a Reddit thread comparing skincare brands.",
};

const segment = {
  title: "Reddit, Bestsellers, Vitamin C Serum, Moisturiser",
  row: { label: "Returned at least twice", value: "118" },
};

const ask = { statement: "Want me to offer returning visitors 10% off next time?", cta: "Create offer" };

function useScript(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("composing");
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");

  useEffect(() => {
    if (!play || reduced) return;
    const timers = phaseTimers();
    if (phase === "composing") {
      const cancel = typeText(copy.question, {
        msPerStep: 26,
        onTick: setComposerValue,
        onDone: () =>
          timers.after(220, () => {
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          }),
      });
      return () => {
        cancel();
        timers.clear();
      };
    }
    if (phase === "thinking") {
      timers.after(300, () => setStatusLabel("Scanning anonymous sessions"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") timers.after(150, () => setPhase("replying"));
    else if (phase === "replying") timers.after(replyDuration(copy.insight), () => setPhase("cardLoading"));
    else if (phase === "cardLoading") timers.after(550, () => setPhase("askReveal"));
    else if (phase === "askReveal") timers.after(150, () => setPhase("done"));
    return timers.clear;
  }, [play, reduced, phase]);

  return { phase: reduced ? "done" : phase, composerValue, composerTyping: play && phase === "composing", statusLabel, reduced };
}

export function AnonymousTraffic({ play }: { play: boolean }) {
  const { phase, composerValue, composerTyping, statusLabel, reduced } = useScript(play);

  const asked = reduced || phase !== "composing";
  const thinking = !reduced && (phase === "thinking" || phase === "thinkingExit");
  const answered = reduced || (asked && !thinking);
  const showCard = reduced || phase === "cardLoading" || phase === "askReveal" || phase === "done";
  const cardLoading = !reduced && phase === "cardLoading";
  const offered = reduced || phase === "askReveal" || phase === "done";
  const offerEntering = !reduced && phase === "askReveal";
  const composing = !reduced && phase === "composing";

  return (
    <ChatShell
      brand={copy.brand}
      width={450}
      height={515}
      composerValue={composing && composerValue ? composerValue : undefined}
      composerTyping={composing && composerTyping}
    >
      <Thread>
        {asked && (
          <UserTurn animateIn={!reduced}>
            <ChatMessage role="user">{copy.question}</ChatMessage>
          </UserTurn>
        )}
        {asked && (
          <AssistantTurn animateIn={!reduced}>
            {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
            {answered && (
              <ChatMessage role="assistant">{reduced ? copy.insight : <StaggerText text={copy.insight} />}</ChatMessage>
            )}
            {showCard && (
              <div className="ill-at-card">
                <div className="ill-at-card__header">
                  <div className="ill-at-card__heading">
                    <Icon name="insight" size={14} />
                    <p className="ill-at-card__title">{segment.title}</p>
                  </div>
                  <Icon name="caretDown" size={12} />
                </div>
                <AttributeRow label={segment.row.label} value={segment.row.value} />
                {!reduced && (cardLoading || offered) && (
                  <div className={`ill-at-card__skeleton-overlay${cardLoading ? "" : " ill-at-card__skeleton-overlay--hidden"}`}>
                    <div className="ill-at-card__skeleton-row">
                      <Skeleton width={180} height={15} radius={4} />
                      <Skeleton width={12} height={12} radius={3} />
                    </div>
                    <div className="ill-at-card__skeleton-row">
                      <Skeleton width={110} height={11} radius={4} />
                      <Skeleton width={30} height={11} radius={4} />
                    </div>
                  </div>
                )}
              </div>
            )}
            {offered && (
              <div className={`ill-at-ask${offerEntering ? " ill-at-ask--enter" : ""}`}>
                <ChatMessage role="assistant">{ask.statement}</ChatMessage>
                <Button appearance="primary" label={ask.cta} />
              </div>
            )}
          </AssistantTurn>
        )}
      </Thread>
    </ChatShell>
  );
}
