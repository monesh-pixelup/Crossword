"use client";

import { useEffect, useState } from "react";
import converse from "../../assets/motion/dragon-ball-z-converse.webp";
import { phaseTimers, replyDuration, typeText, usePrefersReducedMotion } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  AttributeRow,
  Button,
  ChatMessage,
  ChatShell,
  ProductReference,
  Skeleton,
  StaggerText,
  Thread,
  UserTurn,
} from "./primitives";

/*
 * 07 · Insights: revenue attribution. An offer in a shopper's chat, then the
 * merchant's view: the journey it started and the revenue it influenced.
 */

type Phase =
  | "offerReplying"
  | "actionsReveal"
  | "pauseBeforeQuestion"
  | "composing"
  | "thinking"
  | "thinkingExit"
  | "replying"
  | "footnoteLoading"
  | "done";

const brand = "CROSSWORD";

const product = { brand: "CONVERSE", title: "Dragon Ball Z Converse", price: "$74.99", image: converse };

const offer = {
  assistantMessage: "20% off orders above $100. You're eligible. Want to use it?",
  primaryAction: "Use it",
  secondaryAction: "Not now",
};

const question = "When does the next drop go live?";

const outcome = {
  journeyNote: "From there, they clicked the offer, checked out, and spent $186.",
  statement: "This conversation influenced $186 in revenue.",
  footnote: { label: "Crossword-assisted \nrevenue this week", value: "$24,680" },
};

function useScript(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("offerReplying");
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");

  useEffect(() => {
    if (!play || reduced) return;
    const timers = phaseTimers();
    if (phase === "composing") {
      const cancel = typeText(question, {
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
    if (phase === "offerReplying") timers.after(replyDuration(offer.assistantMessage), () => setPhase("actionsReveal"));
    else if (phase === "actionsReveal") timers.after(150, () => setPhase("pauseBeforeQuestion"));
    else if (phase === "pauseBeforeQuestion") timers.after(700, () => setPhase("composing"));
    else if (phase === "thinking") {
      timers.after(300, () => setStatusLabel("Tracing the order"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") timers.after(150, () => setPhase("replying"));
    else if (phase === "replying")
      timers.after(replyDuration(outcome.journeyNote, outcome.statement), () => setPhase("footnoteLoading"));
    else if (phase === "footnoteLoading") timers.after(550, () => setPhase("done"));
    return timers.clear;
  }, [play, reduced, phase]);

  return { phase: reduced ? "done" : phase, composerValue, composerTyping: play && phase === "composing", statusLabel, reduced };
}

export function RevenueAttribution({ play }: { play: boolean }) {
  const { phase, composerValue, composerTyping, statusLabel, reduced } = useScript(play);

  const showActions = reduced || phase !== "offerReplying";
  const actionsEntering = !reduced && phase === "actionsReveal";
  const asked =
    reduced || !["offerReplying", "actionsReveal", "pauseBeforeQuestion", "composing"].includes(phase);
  const thinking = !reduced && (phase === "thinking" || phase === "thinkingExit");
  const answered = reduced || (asked && phase !== "thinking" && phase !== "thinkingExit");
  const footnoteLoading = !reduced && phase === "footnoteLoading";
  const showFootnote = reduced || phase === "footnoteLoading" || phase === "done";
  const composing = !reduced && phase === "composing";

  return (
    <ChatShell
      brand={brand}
      width={450}
      height={515}
      composerValue={composing && composerValue ? composerValue : undefined}
      composerTyping={composing && composerTyping}
    >
      <Thread>
        <AssistantTurn className="ill-ctr-offer-turn">
          <ProductReference {...product} />
          <div className="ill-ctr-offer">
            <ChatMessage role="assistant">
              {reduced ? offer.assistantMessage : <StaggerText text={offer.assistantMessage} />}
            </ChatMessage>
            {showActions && (
              <div className={`ill-ctr-actions${actionsEntering ? " ill-ctr-actions--enter" : ""}`}>
                <Button appearance="primary" label={offer.primaryAction} />
                <Button appearance="secondary" label={offer.secondaryAction} />
              </div>
            )}
          </div>
        </AssistantTurn>
        {asked && (
          <UserTurn className="ill-ctr-question-turn" animateIn={!reduced}>
            <ChatMessage role="user">{question}</ChatMessage>
          </UserTurn>
        )}
        {asked && (
          <AssistantTurn className="ill-ctr-outcome-turn" animateIn={!reduced}>
            {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
            {answered && (
              <ChatMessage role="assistant">
                {reduced ? (
                  <>
                    {outcome.journeyNote} <strong>{outcome.statement}</strong>
                  </>
                ) : (
                  <StaggerText text={outcome.journeyNote} boldText={outcome.statement} />
                )}
              </ChatMessage>
            )}
            {showFootnote && (
              <div className="ill-ctr-footnote">
                <AttributeRow label={outcome.footnote.label} value={outcome.footnote.value} />
                {!reduced && (footnoteLoading || phase === "done") && (
                  <div
                    className={`ill-ctr-footnote__skeleton-overlay${footnoteLoading ? "" : " ill-ctr-footnote__skeleton-overlay--hidden"}`}
                  >
                    <Skeleton width={120} height={18} radius={4} />
                    <Skeleton width={90} height={28} radius={6} />
                  </div>
                )}
              </div>
            )}
          </AssistantTurn>
        )}
      </Thread>
    </ChatShell>
  );
}
