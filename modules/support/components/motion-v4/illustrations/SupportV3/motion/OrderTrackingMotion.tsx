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
import { brand, orderTracking } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 01 — Order tracking. Same composition, dimensions
// and copy as the static OrderTracking — only the beats (composer typing
// the ask, a "Checking your shipment" thinking state, the reply
// cascading in, the shipment panel skeleton-loading) are new. The static
// sibling is untouched.
export function OrderTrackingMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: orderTracking.userMessage,
      assistantMessage: orderTracking.assistantMessage,
      thinkingLabel: "Checking your shipment",
      active,
    });

  // The panel must mount already `loading` in the same render it first
  // appears (bug class: a card rendered resolved-then-covered reads as
  // breaking, not loading) — both derive from `phase` directly rather
  // than from the hook's more general `showReply`.
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
                <ChatMessage role="user" text={orderTracking.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                {showReply && (
                  <ChatMessage role="assistant">
                    <StaggerText text={orderTracking.assistantMessage} />
                  </ChatMessage>
                )}
                {showResult && (
                  <SupportPanel
                    heading={<strong>{orderTracking.eta}</strong>}
                    status={orderTracking.status}
                    loading={phase === "resultLoading"}
                  >
                    <StatusSteps steps={orderTracking.steps} />
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
