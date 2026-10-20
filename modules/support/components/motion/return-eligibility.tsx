"use client";

import {
  AiStatus,
  AssistantTurn,
  Button,
  ChatMessage,
  Chip,
  StaggerText,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { returnEligibilityCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, useSupportScript } from "./parts-a";

/*
 * 06 — Return eligibility [We]. Opened protein powder can still go back:
 * a card shows the 30-day window and the under-25%-used condition.
 */

export function ReturnEligibilityScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Checking the policy",
    active: play,
  });
  const { phase, statusLabel, showThinking, showReply } = script;
  const showResult = phase === "resultLoading" || phase === "done";
  return (
    <SupportScriptChat brand={supportBrand} script={script} tight>
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
            <div className="ill-support-eligibility">
              <Chip size="sm">{copy.status}</Chip>
              <div className="ill-support-conditions">
                {copy.conditions.map((condition) => (
                  <div key={condition.value} className="ill-support-condition">
                    <p className="ill-support-condition__value">{condition.value}</p>
                    <p className="ill-support-condition__label">{condition.label}</p>
                  </div>
                ))}
              </div>
              <Button appearance="primary" label={copy.cta} />
            </div>
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
