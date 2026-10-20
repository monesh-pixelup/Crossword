"use client";

import {
  AiStatus,
  AssistantTurn,
  Button,
  ChatMessage,
  ProductReference,
  StaggerText,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { productUsageCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, SupportSteps, useSupportScript } from "./parts-a";

/*
 * 02 — Product usage guidance [Ge]. The shopper asks how much vitamin C
 * serum to use; the assistant answers with a three-step routine card.
 */

export function ProductUsageScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Checking the routine",
    active: play,
  });
  const { phase, statusLabel, showThinking, showReply } = script;
  const { product } = copy;
  const showResult = phase === "resultLoading" || phase === "done";
  return (
    <SupportScriptChat brand={supportBrand} script={script} tight>
      <UserTurn animateIn>
        <ProductReference image={product.image} alt={product.alt} title={product.title} />
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
            <SupportSteps steps={copy.steps} orientation="boxed" />
            <Button appearance="primary" label={copy.cta} />
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
