"use client";

import {
  AiStatus,
  AssistantTurn,
  AttributeRow,
  ChatMessage,
  Chip,
  StaggerText,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { refundStatusCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, useSupportScript } from "./parts-a";

/*
 * 05 — Refund status [Oe]. The return has arrived and the $48.25 refund is
 * processed; a card shows the amount and when it lands.
 */

export function RefundStatusScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Checking your refund",
    active: play,
  });
  const { phase, statusLabel, showThinking, showReply } = script;
  const showResult = phase === "resultLoading" || phase === "done";
  return (
    <SupportScriptChat brand={supportBrand} script={script}>
      <UserTurn animateIn>
        <ChatMessage role="user" text={copy.userMessage} />
      </UserTurn>
      <AssistantTurn animateIn>
        {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
        {showReply && (
          <ChatMessage role="assistant">
            <StaggerText text={copy.assistantMessage} />
          </ChatMessage>
        )}
        {showResult && (
          <SupportPanel loading={phase === "resultLoading"}>
            <div className="ill-support-refund">
              <div className="ill-support-refund__amount">
                <p className="ill-support-refund__value">{copy.amount}</p>
                <div className="ill-support-refund__status-row">
                  <span className="ill-support-refund__label">{copy.label}</span>
                  <Chip size="sm">{copy.status}</Chip>
                </div>
              </div>
              <div className="ill-support-refund__facts">
                {copy.facts.map((fact) => (
                  <AttributeRow key={fact.label} label={fact.label} value={fact.value} />
                ))}
              </div>
            </div>
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
