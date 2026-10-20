"use client";

import { ChatScene } from "@/modules/sell/components/motion/chat-scene";
import type { Beat } from "@/modules/sell/components/motion/motion";
import {
  AssistantReply,
  AssistantTurn,
  Button,
  ChatMessage,
  Icon,
  ThinkingStatus,
  UserTurn,
} from "@/modules/sell/components/motion/primitives";
import { merchantHelpdeskCopy as copy, supportBrand } from "./copy-a";
import { HelpdeskHeader, SceneFrame, SupportPanel } from "./parts-a";

/*
 * 07 — Merchant helpdesk overview [Ye]. A merchant asks about their customer
 * conversations; the assistant brings up the team inbox: counts by state
 * and the conversations that need attention.
 */

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Pulling up your inbox"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "inbox", type: "load", ms: 700 },
];

export function MerchantHelpdeskScene({ play = true }: { play?: boolean }) {
  return (
    <SceneFrame>
      <ChatScene
        brand={supportBrand}
        beats={beats}
        play={play}
        width={550}
        height={520}
        header={<HelpdeskHeader brand={supportBrand} />}
        className="ill-theme-helpdesk"
        threadClassName="ill-support-thread--tight"
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
                {t.reached("inbox") && (
                  <SupportPanel className="ill-helpdesk-panel" loading={t.loading("inbox")}>
                    <div className="ill-helpdesk">
                      <div className="ill-helpdesk__header">
                        <p className="ill-helpdesk__header-title">{copy.inboxLabel}</p>
                        <div className="ill-helpdesk__header-action">
                          <span>{copy.allConversationsLabel}</span>
                          <Icon name="caretDown" size={8} />
                        </div>
                      </div>
                      <div className="ill-helpdesk__overview">
                        {copy.overview.map((stat) => (
                          <div key={stat.label} className="ill-helpdesk__stat">
                            <p className="ill-helpdesk__stat-value">{stat.value}</p>
                            <p className="ill-helpdesk__stat-label">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="ill-helpdesk__section">
                        <p className="ill-helpdesk__section-title">{copy.attentionLabel}</p>
                        <Icon name="caretDown" size={8} />
                      </div>
                      <div className="ill-helpdesk__list">
                        {copy.conversations.map((row) => (
                          <div key={row.name} className="ill-helpdesk-row">
                            <div className="ill-helpdesk-row__text">
                              <span className="ill-helpdesk-row__name">{row.name}</span>
                              <span className="ill-helpdesk-row__issue">
                                {row.issue}
                                {" · "}
                                {row.status}
                              </span>
                            </div>
                            <div className="ill-helpdesk-row__meta">
                              {row.action ? (
                                <Button appearance="primary" label={row.action} />
                              ) : (
                                <span className="ill-helpdesk-row__chevron">
                                  <Icon name="caretDown" size={10} />
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SupportPanel>
                )}
              </AssistantTurn>
            </>
          )
        }
      </ChatScene>
    </SceneFrame>
  );
}
