"use client";

import { ChatScene } from "@/modules/sell/components/motion/chat-scene";
import type { Beat } from "@/modules/sell/components/motion/motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  Icon,
  InsightCard,
  ThinkingStatus,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { HumanLoopFrame, InsightHighlight, SupportPanel } from "./parts-b";

/*
 * 11 — Copilot approval: Inline card (source `Ns`). A shopper asks for 20%
 * off; the assistant checks with the team through a private approval card
 * (skeleton, then content), the merchant approves 15% and the assistant
 * offers it.
 */

const brand = "Sorelle Labs";

const copy = {
  userMessage: "I love the set, but can you give me 20% off?",
  checkingMessage: "I can check that for you. One moment.",
  requestMessage:
    "Customer is asking for a 20% discount. They’re a repeat customer with 4 previous orders. Approve?",
  decision: "Approve 15%",
  offerMessage: "I can offer you 15% off this order. Want me to apply it?",
  privacyLabel: "Private · Only visible to your team",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "checking", type: "text", text: copy.checkingMessage },
  { id: "card", type: "load", ms: 700 },
  { id: "read", type: "pause", ms: 900 },
  { id: "approve", type: "appear", ms: 550 },
  { id: "offerThink", type: "think", labels: ["Thinking", "Applying 15% off"] },
  { id: "offer", type: "text", text: copy.offerMessage },
];

export function MerchantApproval({ play = true }: { play?: boolean }) {
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
                {t.reached("checking") && <AssistantReply text={copy.checkingMessage} />}
                {t.reached("card") && (
                  <SupportPanel loading={t.loading("card")}>
                    <div className="ill-approval-privacy">
                      <Icon name="lock" size={12} />
                      <p className="ill-approval-privacy__text">{copy.privacyLabel}</p>
                    </div>
                    <InsightCard source="Crossword" lines={[copy.requestMessage]} />
                    <div className={t.loading("approve") ? "ill-approval-press" : undefined}>
                      <InsightHighlight statement={copy.decision} />
                    </div>
                  </SupportPanel>
                )}
              </AssistantTurn>
              {t.reached("offerThink") && (
                <AssistantTurn animateIn>
                  <ThinkingStatus t={t} id="offerThink" />
                  {t.reached("offer") && <AssistantReply text={copy.offerMessage} />}
                </AssistantTurn>
              )}
            </>
          )
        }
      </ChatScene>
    </HumanLoopFrame>
  );
}
