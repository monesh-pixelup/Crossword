import { SceneFrame } from "../../../components/ill/SceneFrame";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { Icon } from "../../../components/ill/Icon";
import { Button } from "../../../components/ill/Button";
import { HelpdeskHeader } from "../../../components/ill/HelpdeskHeader";
import { ChatMotionScene } from "../../SellMotion/ChatMotionScene";
import { AssistantText, Thinking } from "../../SellMotion/parts";
import type { Beat } from "../../SellMotion/useChatTimeline";
import { SupportPanel } from "../SupportParts";
import { brand, merchantHelpdesk } from "../data";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: merchantHelpdesk.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Pulling up your inbox"] },
  { id: "reply", type: "text", text: merchantHelpdesk.assistantMessage },
  { id: "inbox", type: "load", ms: 700 },
];

// Support V3 Motion / 07 — Merchant helpdesk. Same Helpdesk header,
// aubergine theme, tight thread, copy and 550x520 size as the static
// MerchantHelpdesk — the inbox panel mounts already skeleton-covered and
// resolves once the reply has finished. The static sibling is untouched.
export function MerchantHelpdeskMotion() {
  return (
    <SceneFrame>
      <ChatMotionScene
        brand={brand}
        beats={beats}
        width={550}
        height={520}
        header={<HelpdeskHeader brand={brand} />}
        className="ill-theme-helpdesk"
        threadClassName="ill-support-thread--tight"
      >
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={merchantHelpdesk.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                <Thinking t={t} id="think" />
                {t.reached("reply") && <AssistantText text={merchantHelpdesk.assistantMessage} />}
                {t.reached("inbox") && (
                  <SupportPanel className="ill-helpdesk-panel" loading={t.loading("inbox")}>
                    <div className="ill-helpdesk">
                      <div className="ill-helpdesk__header">
                        <p className="ill-helpdesk__header-title">{merchantHelpdesk.inboxLabel}</p>
                        <div className="ill-helpdesk__header-action">
                          <span>{merchantHelpdesk.allConversationsLabel}</span>
                          <Icon name="caretDown" size={8} />
                        </div>
                      </div>
                      <div className="ill-helpdesk__overview">
                        {merchantHelpdesk.overview.map((o) => (
                          <div key={o.label} className="ill-helpdesk__stat">
                            <p className="ill-helpdesk__stat-value">{o.value}</p>
                            <p className="ill-helpdesk__stat-label">{o.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="ill-helpdesk__section">
                        <p className="ill-helpdesk__section-title">{merchantHelpdesk.attentionLabel}</p>
                        <Icon name="caretDown" size={8} />
                      </div>
                      <div className="ill-helpdesk__list">
                        {merchantHelpdesk.conversations.map((c) => (
                          <div key={c.name} className="ill-helpdesk-row">
                            <div className="ill-helpdesk-row__text">
                              <span className="ill-helpdesk-row__name">{c.name}</span>
                              <span className="ill-helpdesk-row__issue">
                                {c.issue} · {c.status}
                              </span>
                            </div>
                            <div className="ill-helpdesk-row__meta">
                              {c.action ? (
                                <Button appearance="primary" label={c.action} />
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
      </ChatMotionScene>
    </SceneFrame>
  );
}
