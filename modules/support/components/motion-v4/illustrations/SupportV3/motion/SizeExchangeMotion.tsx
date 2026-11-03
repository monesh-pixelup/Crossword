import { useRef } from "react";
import { SceneFrame } from "../../../components/ill/SceneFrame";
import { Shell } from "../../../components/ill/Shell";
import { Thread } from "../../../components/ill/Thread";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { AiStatus } from "../../../components/ill/AiStatus";
import { StaggerText } from "../../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../../components/ill/useLandedOnScreen";
import { SupportPanel, StatusSteps } from "../SupportParts";
import { brand, sizeExchange } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 03 — Size exchange. Same composition, dimensions
// and copy as the static SizeExchange.
export function SizeExchangeMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: sizeExchange.userMessage,
      assistantMessage: sizeExchange.assistantMessage,
      thinkingLabel: "Starting your exchange",
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
                  <ChatMessage role="user" text={sizeExchange.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                  {showReply && (
                    <ChatMessage role="assistant">
                      <StaggerText text={sizeExchange.assistantMessage} />
                    </ChatMessage>
                  )}
                  {showResult && (
                    <SupportPanel
                      heading={sizeExchange.heading}
                      status={sizeExchange.status}
                      loading={phase === "resultLoading"}
                    >
                      <div className="ill-support-swap">
                        {sizeExchange.swap.map((side, i) => (
                          <div
                            key={side.label}
                            className={`ill-support-swap__side${i === 1 ? " ill-support-swap__side--to" : ""}`}
                          >
                            <span className="ill-support-swap__label">{side.label}</span>
                            <span className="ill-support-swap__value">{side.value}</span>
                          </div>
                        ))}
                      </div>
                      <StatusSteps steps={sizeExchange.steps} orientation="vertical" />
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
