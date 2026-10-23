"use client";

import { useEffect, useRef, useState } from "react";
import converse from "../../assets/motion/dragon-ball-z-converse.webp";
import { phaseTimers, replyDuration, typeText, useFollowLatest, usePrefersReducedMotion } from "./motion";
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
 * 07 · Insights: revenue attribution. The merchant asks the agent what one conversation was worth; the agent pulls
 * up that shopper conversation as evidence (quoted, so it never reads as a live customer chat), then traces the
 * journey it started and the revenue it influenced.
 */

type Phase = "composing" | "thinking" | "thinkingExit" | "introReplying" | "evidence" | "outcomeReplying" | "footnoteLoading" | "done";

const brand = "CROSSWORD";

const product = { brand: "CONVERSE", title: "Dragon Ball Z Converse", price: "$74.99", image: converse };

const question = "What was yesterday’s Dragon Ball Z Converse chat worth?";

const intro = "Here’s the conversation. A shopper on the product page was offered this:";

const offer = {
  assistantMessage: "20% off orders above $100. You're eligible. Want to use it?",
  primaryAction: "Use it",
  secondaryAction: "Not now",
};

const outcome = {
  journeyNote: "They tapped Use it, checked out, and spent $186.",
  statement: "This conversation influenced $186 in revenue.",
  footnote: { label: "Crossword-assisted \nrevenue this week", value: "$24,680" },
};

function useScript(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("composing");
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
    if (phase === "thinking") {
      timers.after(300, () => setStatusLabel("Finding the conversation"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") timers.after(150, () => setPhase("introReplying"));
    else if (phase === "introReplying") timers.after(replyDuration(intro), () => setPhase("evidence"));
    else if (phase === "evidence") timers.after(900, () => setPhase("outcomeReplying"));
    else if (phase === "outcomeReplying")
      timers.after(replyDuration(outcome.journeyNote, outcome.statement), () => setPhase("footnoteLoading"));
    else if (phase === "footnoteLoading") timers.after(550, () => setPhase("done"));
    return timers.clear;
  }, [play, reduced, phase]);

  return { phase: reduced ? "done" : phase, composerValue, composerTyping: play && phase === "composing", statusLabel, reduced };
}

const order: Phase[] = ["composing", "thinking", "thinkingExit", "introReplying", "evidence", "outcomeReplying", "footnoteLoading", "done"];
const reached = (phase: Phase, step: Phase) => order.indexOf(phase) >= order.indexOf(step);

export function RevenueAttribution({ play }: { play: boolean }) {
  const { phase, composerValue, composerTyping, statusLabel, reduced } = useScript(play);
  // The answer runs taller than the window once the quoted conversation lands: keep its newest beat in view.
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, phase, reduced);

  const asked = reduced || reached(phase, "thinking");
  const thinking = !reduced && (phase === "thinking" || phase === "thinkingExit");
  const introShown = reduced || reached(phase, "introReplying");
  const evidenceShown = reduced || reached(phase, "evidence");
  const outcomeShown = reduced || reached(phase, "outcomeReplying");
  const footnoteLoading = !reduced && phase === "footnoteLoading";
  const showFootnote = reduced || reached(phase, "footnoteLoading");
  const composing = !reduced && phase === "composing";

  return (
    <ChatShell
      brand={brand}
      width={450}
      height={515}
      composerValue={composing && composerValue ? composerValue : undefined}
      composerTyping={composing && composerTyping}
      viewportRef={viewportRef}
    >
      <Thread>
        {asked && (
          <UserTurn className="ill-ctr-question-turn" animateIn={!reduced}>
            <ChatMessage role="user">{question}</ChatMessage>
          </UserTurn>
        )}
        {asked && (
          <AssistantTurn className="ill-ctr-outcome-turn" animateIn={!reduced}>
            {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
            {introShown && (
              <ChatMessage role="assistant">{reduced ? intro : <StaggerText text={intro} />}</ChatMessage>
            )}
            {/* The shopper's conversation, quoted as the evidence: dimmed and framed, its buttons inert. */}
            {evidenceShown && (
              <figure className={`ill-ctr-evidence${reduced ? "" : " ill-ctr-actions--enter"}`} aria-label="Quoted shopper conversation">
                <span className="ill-ctr-evidence__label">Shopper conversation · Tue 4:12 PM</span>
                <ProductReference {...product} />
                <div className="ill-ctr-offer">
                  <ChatMessage role="assistant">{offer.assistantMessage}</ChatMessage>
                  <div className="ill-ctr-actions">
                    <Button appearance="primary" label={offer.primaryAction} />
                    <Button appearance="secondary" label={offer.secondaryAction} />
                  </div>
                </div>
              </figure>
            )}
            {outcomeShown && (
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
