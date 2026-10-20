"use client";

import { ChatScene } from "@/modules/sell/components/motion/chat-scene";
import type { Beat } from "@/modules/sell/components/motion/motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  ThinkingStatus,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { ChatBreaker, HumanLoopFrame } from "./parts-b";

/*
 * 10 — Human-in-the-loop: Live takeover (source `_s`). A shopper asks for
 * help; the assistant brings in the team, a breaker marks the handoff and a
 * team member replies with the full context.
 */

const brand = "Sorelle Labs";

const copy = {
  userMessage: "I’ve been going back and forth on this. Can someone help me?",
  assistantMessage:
    "Absolutely. I’m bringing in someone from the team now. I’ll pass along everything we’ve discussed so you don’t have to repeat yourself.",
  handoffLabel: "From the team",
  humanMessage: "Hi Maya, I’ve got the full context. Let’s sort this out.",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Bringing in the team"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "breaker", type: "appear", ms: 900 },
  { id: "human", type: "appear", ms: 450 },
  { id: "humanReply", type: "text", text: copy.humanMessage },
];

export function HumanTakeover({ play = true }: { play?: boolean }) {
  return (
    <HumanLoopFrame>
      <ChatScene
        brand={brand}
        beats={beats}
        play={play}
        width={292}
        height={338.905}
        className="ill-theme-human-loop ill-support-motion"
      >
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={copy.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                <ThinkingStatus t={t} id="think" />
                {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
              </AssistantTurn>
              {t.reached("breaker") && (
                <ChatBreaker text="Connected with a support agent — they can see this conversation." />
              )}
              {t.reached("human") && (
                <AssistantTurn animateIn>
                  <div className="ill-handoff-turn">
                    <p className="ill-handoff-turn__label">{copy.handoffLabel}</p>
                    {t.reached("humanReply") && <AssistantReply text={copy.humanMessage} />}
                  </div>
                </AssistantTurn>
              )}
            </>
          )
        }
      </ChatScene>
    </HumanLoopFrame>
  );
}
