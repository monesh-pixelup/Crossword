"use client";

import { useEffect, useRef, useState } from "react";
import matchingBracelet from "../../assets/motion/matching-bracelet-uploaded-by-the-shopper.webp";
import { phaseTimers, replyDuration, typeText, useFollowLatest, usePrefersReducedMotion } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  ChatMessage,
  ChatShell,
  Icon,
  Media,
  StaggerText,
  Thread,
  UserTurn,
} from "./primitives";

/*
 * 04b · Support: service & resolution. "Where's my order?" is answered on the
 * spot; asking for a person hands the conversation, with its context, to a
 * support agent who adds a bracelet before dispatch.
 */

type Step =
  | { kind: "user"; id: string; message: string }
  | { kind: "userUpload"; id: string; message: string; caption: string }
  | {
      kind: "reply";
      id: string;
      speaker: "ai" | "agent";
      messages: string[];
      thinkingStages: string[];
      pauseBonusMs?: number;
    }
  | { kind: "handoff"; id: string; text: string };

type Phase = "composing" | "handoff" | "thinking" | "thinkingExit" | "replying" | "pausing";

const brand = "VELMORA";

const steps: Step[] = [
  { kind: "user", id: "turn1", message: "Where's my order?" },
  {
    kind: "reply",
    id: "turn1-reply",
    speaker: "ai",
    messages: [
      "I see you've purchased a rose gold pendant for your wife. It's on its way, and will reach you by November 3rd.",
    ],
    thinkingStages: ["Thinking", "Checking your order"],
  },
  { kind: "user", id: "turn2", message: "I need to speak to someone." },
  {
    kind: "reply",
    id: "turn2-reply",
    speaker: "ai",
    messages: ["Absolutely. I'll get the right person and pass along what we've already discussed."],
    thinkingStages: ["Thinking", "Finding the right person"],
    pauseBonusMs: 300,
  },
  { kind: "handoff", id: "handoff", text: "Connected with a support agent — they can see this conversation." },
  {
    kind: "reply",
    id: "turn3-reply",
    speaker: "agent",
    messages: ["Let me know your concern regarding the delivery of your rose gold pendant?"],
    thinkingStages: ["Typing"],
  },
  {
    kind: "userUpload",
    id: "turn4",
    message:
      "If the order hasn't been dispatched, I need to add one more thing, a matching bracelet, this one.",
    caption: "Matching bracelet",
  },
  {
    kind: "reply",
    id: "turn5-reply",
    speaker: "agent",
    messages: ["Let me see what I can do.", "You reached us, just in time, consider it done!"],
    thinkingStages: ["Typing"],
  },
];

/** The agent's "typing" glyph: three bouncing dots. */
function TypingDots() {
  return (
    <span className="ill-srm-typing-dots" aria-hidden>
      <span className="ill-srm-typing-dots__dot" />
      <span className="ill-srm-typing-dots__dot" />
      <span className="ill-srm-typing-dots__dot" />
    </span>
  );
}

/** Thinking time: an agent's follow-up message comes quicker than a first reply. */
function thinkingDuration(step: Extract<Step, { kind: "reply" }>, beat: number) {
  return step.speaker === "agent" && beat > 0 ? 550 : 800;
}

function useConversation(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("composing");
  const [beatIndex, setBeatIndex] = useState(0);
  const [composerValue, setComposerValue] = useState("");
  const [secondStage, setSecondStage] = useState(false);

  useEffect(() => {
    if (!play || reduced || stepIndex >= steps.length) return;
    const step = steps[stepIndex];
    const next = steps[stepIndex + 1];
    const timers = phaseTimers();

    if (step.kind === "user" || step.kind === "userUpload") {
      const cancel = typeText(step.message, {
        msPerStep: 26,
        onTick: setComposerValue,
        onDone: () =>
          timers.after(220, () => {
            setComposerValue("");
            setStepIndex((i) => i + 1);
            setPhase(next?.kind === "handoff" ? "handoff" : "thinking");
            setBeatIndex(0);
          }),
      });
      return () => {
        cancel();
        timers.clear();
      };
    }
    if (step.kind === "handoff") {
      timers.after(1500, () => {
        setStepIndex((i) => i + 1);
        setPhase("thinking");
        setBeatIndex(0);
      });
    } else if (phase === "thinking") {
      if (step.thinkingStages[1]) timers.after(300, () => setSecondStage(true));
      timers.after(thinkingDuration(step, beatIndex), () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") {
      timers.after(150, () => {
        // The status is gone once the reply lands; the next one starts at its first stage.
        setSecondStage(false);
        setPhase("replying");
      });
    } else if (phase === "replying") {
      timers.after(replyDuration(step.messages[beatIndex]), () => {
        if (beatIndex < step.messages.length - 1)
          timers.after(350, () => {
            setBeatIndex((b) => b + 1);
            setPhase("thinking");
          });
        else setPhase("pausing");
      });
    } else if (phase === "pausing") {
      const last = step.messages[step.messages.length - 1];
      timers.after(350 + Math.min(last.length * 3, 500) + (step.pauseBonusMs ?? 0), () => {
        setStepIndex((i) => i + 1);
        setPhase(next?.kind === "handoff" ? "handoff" : "composing");
        setBeatIndex(0);
      });
    }
    return timers.clear;
  }, [play, reduced, stepIndex, phase, beatIndex]);

  const current = steps[stepIndex];
  return {
    stepIndex: reduced ? steps.length : stepIndex,
    phase,
    beatIndex,
    composerValue,
    composerTyping: play && (current?.kind === "user" || current?.kind === "userUpload"),
    statusLabel: current?.kind === "reply" ? current.thinkingStages[secondStage ? 1 : 0] : "",
    reduced,
  };
}

export function ServiceResolution({ play }: { play: boolean }) {
  const { stepIndex, phase, beatIndex, composerValue, composerTyping, statusLabel, reduced } = useConversation(play);
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, `${stepIndex}-${phase}-${beatIndex}`, reduced);

  const composing = stepIndex < steps.length && phase === "composing";

  return (
    <ChatShell
      brand={brand}
      width={550}
      height={520}
      composerValue={composing && composerValue ? composerValue : undefined}
      composerTyping={composing && composerTyping}
      viewportRef={viewportRef}
    >
      <Thread>
        {steps.map((step, i) => {
          const past = i < stepIndex;
          const current = i === stepIndex;

          if (step.kind === "user" || step.kind === "userUpload") {
            const entering = current && phase !== "composing";
            if (!past && !entering) return null;
            return (
              <UserTurn key={step.id} animateIn={entering}>
                {step.kind === "userUpload" && (
                  <div className="ill-srm-upload-row">
                    <div className="ill-srm-upload-card">
                      <div className="ill-srm-upload-card__media">
                        <Media src={matchingBracelet} />
                        <div className="ill-srm-upload-card__badge" aria-hidden>
                          <Icon name="add" size={11} />
                        </div>
                      </div>
                      <p className="ill-srm-upload-card__caption">{step.caption}</p>
                    </div>
                  </div>
                )}
                <ChatMessage role="user">{step.message}</ChatMessage>
              </UserTurn>
            );
          }

          if (!past && !current) return null;

          if (step.kind === "handoff") {
            return (
              <p key={step.id} className={`ill-srm-handoff${current ? " ill-srm-handoff--enter" : ""}`}>
                <span>{step.text}</span>
              </p>
            );
          }

          const shown = current ? beatIndex : step.messages.length;
          const thinking = current && (phase === "thinking" || phase === "thinkingExit");
          const messages = step.messages.map((message, m) => {
            if (m < shown || (m === shown && current && !thinking))
              return (
                <ChatMessage key={`${step.id}-${m}`} role="assistant">
                  <StaggerText text={message} />
                </ChatMessage>
              );
            if (m === shown && current)
              return (
                <AiStatus
                  key={`${step.id}-status`}
                  label={statusLabel}
                  visible={phase === "thinking"}
                  icon={step.speaker === "agent" ? <TypingDots /> : undefined}
                />
              );
            return null;
          });

          return (
            <AssistantTurn key={step.id} animateIn={current}>
              {step.speaker === "ai" ? (
                messages
              ) : (
                <div className="ill-srm-agent">
                  <p className="ill-srm-agent__label">Support agent</p>
                  <div className="ill-srm-agent__messages">{messages}</div>
                </div>
              )}
            </AssistantTurn>
          );
        })}
      </Thread>
    </ChatShell>
  );
}
