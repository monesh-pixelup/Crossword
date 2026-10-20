"use client";

import { ChatScene } from "@/modules/sell/components/motion/chat-scene";
import type { Beat } from "@/modules/sell/components/motion/motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  InsightCard,
  ThinkingStatus,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { HumanLoopFrame } from "./parts-b";

/*
 * 12 — Human-in-the-loop: Whisper to agent (source `Ts`). A disappointed
 * shopper writes in; a team member privately whispers guidance to the
 * assistant (floating card, then "Guidance received."), and the assistant
 * replies warmly. A tall last turn is followed by its top.
 */

const brand = "Sorelle Labs";

const copy = {
  whisperMessage: "This is a premium customer. Keep the response warm and personal.",
  userMessage: "I’m really disappointed. I expected better from you.",
  assistantMessage:
    "I completely understand why you’re disappointed. Let’s make this right. I’ve already looked into your order, and here’s what I can do…",
  whisperSender: "Alex",
  guidanceReceivedLabel: "Guidance received.",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "whisper", type: "appear", ms: 1100 },
  { id: "ack", type: "appear", ms: 600 },
  { id: "think", type: "think", labels: ["Thinking", "Keeping it warm"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
];

export function WhisperToAgent({ play = true }: { play?: boolean }) {
  return (
    <HumanLoopFrame>
      <ChatScene
        brand={brand}
        beats={beats}
        play={play}
        width={292}
        height={338.905}
        className="ill-theme-human-loop ill-support-motion"
        alignTallTurnTop
      >
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={copy.userMessage} />
              </UserTurn>
              {t.reached("whisper") && (
                <div className="ill-whisper-float-anchor">
                  <div
                    className={[
                      "ill-whisper-float",
                      "ill-assistant-turn--enter",
                      t.reached("ack") ? "ill-whisper-float--ack" : "ill-whisper-float--pending",
                    ].join(" ")}
                  >
                    <InsightCard
                      source="Private"
                      sourceSuffix="Whisper to Crossword"
                      attribution={`${copy.whisperSender} from ${brand}:`}
                      lines={[copy.whisperMessage]}
                      footer={{ label: copy.guidanceReceivedLabel }}
                    />
                  </div>
                  {t.reached("think") && (
                    <AssistantTurn animateIn>
                      <ThinkingStatus t={t} id="think" />
                      {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
                    </AssistantTurn>
                  )}
                </div>
              )}
            </>
          )
        }
      </ChatScene>
    </HumanLoopFrame>
  );
}
