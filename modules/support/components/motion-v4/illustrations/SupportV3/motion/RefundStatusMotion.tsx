import { useRef } from "react";
import { SceneFrame } from "../../../components/ill/SceneFrame";
import { Shell } from "../../../components/ill/Shell";
import { Thread } from "../../../components/ill/Thread";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { AttributeRow } from "../../../components/ill/AttributeRow";
import { Chip } from "../../../components/ill/Chip";
import { AiStatus } from "../../../components/ill/AiStatus";
import { StaggerText } from "../../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../../components/ill/useLandedOnScreen";
import { SupportPanel } from "../SupportParts";
import { brand, refundStatus } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 05 — Refund status. Same composition, dimensions
// and copy as the static RefundStatus (ILL/Module/Support's own
// reference instance).
export function RefundStatusMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: refundStatus.userMessage,
      assistantMessage: refundStatus.assistantMessage,
      thinkingLabel: "Checking your refund",
      active,
    });

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
        <Thread>
          {turnSent && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={refundStatus.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                {showReply && (
                  <ChatMessage role="assistant">
                    <StaggerText text={refundStatus.assistantMessage} />
                  </ChatMessage>
                )}
                {showResult && (
                  <SupportPanel loading={phase === "resultLoading"}>
                    <div className="ill-support-refund">
                      <div className="ill-support-refund__amount">
                        <p className="ill-support-refund__value">{refundStatus.amount}</p>
                        <div className="ill-support-refund__status-row">
                          <span className="ill-support-refund__label">{refundStatus.label}</span>
                          <Chip size="sm">{refundStatus.status}</Chip>
                        </div>
                      </div>
                      <div className="ill-support-refund__facts">
                        {refundStatus.facts.map((f) => (
                          <AttributeRow key={f.label} label={f.label} value={f.value} />
                        ))}
                      </div>
                    </div>
                  </SupportPanel>
                )}
              </AssistantTurn>
            </>
          )}
        </Thread>
      </Shell>
    </SceneFrame>
  );
}
