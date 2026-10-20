"use client";

import { AiStatus, AssistantTurn, ChatMessage, StaggerText, UserTurn } from "@/modules/sell/components/motion/primitives";
import { sizeExchangeCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, SupportSteps, useSupportScript } from "./parts-a";

/*
 * 03 — Size exchange [$e]. The shopper wants a size up; the assistant starts
 * the exchange and a card shows the swap and the two remaining steps.
 */

export function SizeExchangeScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Starting your exchange",
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
          <SupportPanel heading={copy.heading} status={copy.status} loading={phase === "resultLoading"}>
            <div className="ill-support-swap">
              {copy.swap.map((side, i) => (
                <div key={side.label} className={`ill-support-swap__side${i === 1 ? " ill-support-swap__side--to" : ""}`}>
                  <span className="ill-support-swap__label">{side.label}</span>
                  <span className="ill-support-swap__value">{side.value}</span>
                </div>
              ))}
            </div>
            <SupportSteps steps={copy.steps} orientation="vertical" />
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
