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
 * 06 · Insights: ask your business. A merchant asks a plain-language question
 * and gets the answer plus the cohort behind it.
 */

type Phase = "composing" | "thinking" | "thinkingExit" | "replying" | "cardLoading" | "done";

const copy = {
  brand: "CROSSWORD",
  query: "Find people who reached checkout but didn't purchase in the last 7 days.",
  result: "3,284 people reached checkout. 2,140 are still deciding. Most dropped after seeing shipping costs.",
};

const cohort = {
  title: "412 high-intent shoppers",
  rows: [
    { label: "Returned", value: "3+ times" },
    { label: "Avg. cart", value: "$186" },
    { label: "Status", value: "Items still in cart" },
  ],
  cta: "View this group",
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
      const cancel = typeText(copy.query, {
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
      timers.after(300, () => setStatusLabel("Finding the right cohort"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") timers.after(150, () => setPhase("replying"));
    else if (phase === "replying") timers.after(replyDuration(copy.result), () => setPhase("cardLoading"));
    else if (phase === "cardLoading") timers.after(550, () => setPhase("done"));
    return timers.clear;
  }, [play, reduced, phase]);

  return { phase: reduced ? "done" : phase, composerValue, composerTyping: play && phase === "composing", statusLabel, reduced };
}

export function AskInsight({ play }: { play: boolean }) {
  const { phase, composerValue, composerTyping, statusLabel, reduced } = useScript(play);

  const asked = reduced || phase !== "composing";
  const thinking = !reduced && (phase === "thinking" || phase === "thinkingExit");
  const answered = reduced || (asked && !thinking);
  const showCard = reduced || phase === "cardLoading" || phase === "done";
  const cardLoading = !reduced && phase === "cardLoading";
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
            <ChatMessage role="user">{copy.query}</ChatMessage>
          </UserTurn>
        )}
        {asked && (
          <AssistantTurn className="ill-ai-reply-turn" animateIn={!reduced}>
            {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
            {answered && (
              <ChatMessage role="assistant">{reduced ? copy.result : <StaggerText text={copy.result} />}</ChatMessage>
            )}
            {showCard && (
              <div className="ill-ai-card">
                <div className="ill-ai-card__header">
                  <div className="ill-ai-card__heading">
                    <Icon name="insight" size={14} />
                    <p className="ill-ai-card__title">{cohort.title}</p>
                  </div>
                  <Icon name="caretDown" size={12} />
                </div>
                <div className="ill-ai-card__rows">
                  {cohort.rows.map((row) => (
                    <AttributeRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </div>
                <Button appearance="primary" label={cohort.cta} />
                {!reduced && (cardLoading || phase === "done") && (
                  <div className={`ill-ai-card__skeleton-overlay${cardLoading ? "" : " ill-ai-card__skeleton-overlay--hidden"}`}>
                    <div className="ill-ai-card__skeleton-row">
                      <Skeleton width={140} height={15} radius={4} />
                      <Skeleton width={12} height={12} radius={3} />
                    </div>
                    {cohort.rows.map((row) => (
                      <div key={row.label} className="ill-ai-card__skeleton-row">
                        <Skeleton width={70} height={11} radius={4} />
                        <Skeleton width={60} height={11} radius={4} />
                      </div>
                    ))}
                    <Skeleton width="100%" height={29} radius={4.868} />
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
