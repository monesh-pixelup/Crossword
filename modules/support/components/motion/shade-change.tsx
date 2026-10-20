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
import { shadeChangeCopy as copy, supportBrand } from "./copy-a";
import { SupportPanel, SupportScriptChat, useSupportScript } from "./parts-a";

/*
 * 04 — Change foundation shade [ze]. The order hasn't shipped, so the
 * assistant offers to switch Shade 3 Fair for Shade 4 Buff, with swatches
 * and confirm/decline buttons.
 */

export function ShadeChangeScene({ play = true }: { play?: boolean }) {
  const script = useSupportScript({
    userMessage: copy.userMessage,
    assistantMessage: copy.assistantMessage,
    thinkingLabel: "Checking your order",
    active: play,
  });
  const { phase, statusLabel, showThinking, showReply } = script;
  const { product, from, to } = copy;
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
          <SupportPanel
            heading={<ProductReference image={product.image} alt={product.alt} title={product.title} />}
            status={copy.status}
            loading={phase === "resultLoading"}
          >
            <div className="ill-support-shades">
              {[
                { ...from, key: "from" },
                { ...to, key: "to" },
              ].map((shade) => (
                <div key={shade.key} className={`ill-support-shade ill-support-shade--${shade.key}`}>
                  <span className="ill-support-shade__swatch" style={{ background: shade.swatch }} />
                  <span className="ill-support-shade__text">
                    <span className="ill-support-shade__label">{shade.label}</span>
                    <span className="ill-support-shade__name">{shade.shade}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="ill-support-actions">
              <Button appearance="secondary" label={copy.decline} />
              <Button appearance="primary" label={copy.confirm} />
            </div>
          </SupportPanel>
        )}
      </AssistantTurn>
    </SupportScriptChat>
  );
}
