import { useRef } from "react";
import { SceneFrame } from "../../../components/ill/SceneFrame";
import { Shell } from "../../../components/ill/Shell";
import { Thread } from "../../../components/ill/Thread";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { ProductReference } from "../../../components/ill/ProductReference";
import { Button } from "../../../components/ill/Button";
import { AiStatus } from "../../../components/ill/AiStatus";
import { StaggerText } from "../../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../../components/ill/useLandedOnScreen";
import { SupportPanel } from "../SupportParts";
import { brand, shadeChange } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 04 — Change foundation shade. Same composition,
// dimensions and copy as the static ShadeChange — both Buttons stay
// unpressed once resolved, exactly as the static makes the point that
// the change still waits on the shopper.
export function ShadeChangeMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: shadeChange.userMessage,
      assistantMessage: shadeChange.assistantMessage,
      thinkingLabel: "Checking your order",
      active,
    });

  const { product, from, to } = shadeChange;
  const showResult = phase === "resultLoading" || phase === "done";

  return (
    <SceneFrame>
      <Shell
        brand={brand}
        width={550}
        height={520}
        rootRef={rootRef}
        composerValue={phase === "composing" && composerValue ? composerValue : undefined}
        composerTyping={phase === "composing" && composerTyping}
      >
        <div className="ill-support-thread--tight">
          <Thread>
            {turnSent && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={shadeChange.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                  {showReply && (
                    <ChatMessage role="assistant">
                      <StaggerText text={shadeChange.assistantMessage} />
                    </ChatMessage>
                  )}
                  {showResult && (
                    <SupportPanel
                      heading={<ProductReference image={product.image} alt={product.alt} title={product.title} />}
                      status={shadeChange.status}
                      loading={phase === "resultLoading"}
                    >
                      <div className="ill-support-shades">
                        {[
                          { ...from, key: "from" },
                          { ...to, key: "to" },
                        ].map((s) => (
                          <div key={s.key} className={`ill-support-shade ill-support-shade--${s.key}`}>
                            <span className="ill-support-shade__swatch" style={{ background: s.swatch }} />
                            <span className="ill-support-shade__text">
                              <span className="ill-support-shade__label">{s.label}</span>
                              <span className="ill-support-shade__name">{s.shade}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="ill-support-actions">
                        <Button appearance="secondary" label={shadeChange.decline} />
                        <Button appearance="primary" label={shadeChange.confirm} />
                      </div>
                    </SupportPanel>
                  )}
                </AssistantTurn>
              </>
            )}
          </Thread>
        </div>
      </Shell>
    </SceneFrame>
  );
}
