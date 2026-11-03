import { useRef } from "react";
import { SceneFrame } from "../../../components/ill/SceneFrame";
import { Shell } from "../../../components/ill/Shell";
import { Thread } from "../../../components/ill/Thread";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { Chip } from "../../../components/ill/Chip";
import { Button } from "../../../components/ill/Button";
import { AiStatus } from "../../../components/ill/AiStatus";
import { StaggerText } from "../../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../../components/ill/useLandedOnScreen";
import { SupportPanel } from "../SupportParts";
import { brand, returnEligibility } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 06 — Return eligibility. Same composition,
// dimensions and copy as the static ReturnEligibility.
export function ReturnEligibilityMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: returnEligibility.userMessage,
      assistantMessage: returnEligibility.assistantMessage,
      thinkingLabel: "Checking the policy",
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
        <div className="ill-support-thread--tight">
          <Thread>
            {turnSent && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={returnEligibility.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                  {showReply && (
                    <ChatMessage role="assistant">
                      <StaggerText text={returnEligibility.assistantMessage} />
                    </ChatMessage>
                  )}
                  {showResult && (
                    <SupportPanel loading={phase === "resultLoading"}>
                      <div className="ill-support-eligibility">
                        <Chip size="sm">{returnEligibility.status}</Chip>
                        <div className="ill-support-conditions">
                          {returnEligibility.conditions.map((c) => (
                            <div key={c.value} className="ill-support-condition">
                              <p className="ill-support-condition__value">{c.value}</p>
                              <p className="ill-support-condition__label">{c.label}</p>
                            </div>
                          ))}
                        </div>
                        <Button appearance="primary" label={returnEligibility.cta} />
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
