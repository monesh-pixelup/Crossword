"use client";

import { AiStatus, AssistantTurn, ChatMessage, StaggerText, UserTurn } from "@/modules/sell/components/motion/primitives";
import { orderTrackingCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, SupportSteps, useSupportScript } from "./parts-a";

/*
 * 01 — Order tracking [Ue]. The shopper asks where their order is; the
 * assistant answers and a tracker card shows it in transit through Chicago.
 */

export function OrderTrackingScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Checking your shipment",
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
          <SupportPanel heading={<strong>{copy.eta}</strong>} status={copy.status} loading={phase === "resultLoading"}>
            <SupportSteps steps={copy.steps} />
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
