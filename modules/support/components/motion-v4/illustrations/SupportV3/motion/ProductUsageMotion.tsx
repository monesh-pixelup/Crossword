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
import { SupportPanel, StatusSteps } from "../SupportParts";
import { brand, productUsage } from "../data";
import { useSupportMotionPlayback } from "./useSupportMotionPlayback";

// Support V3 Motion / 02 — Product usage guidance. Same composition,
// dimensions and copy as the static ProductUsage. The serum reference
// rides on the user's turn immediately (it's "what they're looking at",
// not something that resolves) — only the reply and the routine timeline
// animate in.
export function ProductUsageMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const { phase, composerValue, composerTyping, statusLabel, turnSent, showThinking, showReply } =
    useSupportMotionPlayback({
      userMessage: productUsage.userMessage,
      assistantMessage: productUsage.assistantMessage,
      thinkingLabel: "Checking the routine",
      active,
    });

  const { product } = productUsage;
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
                  <ProductReference image={product.image} alt={product.alt} title={product.title} />
                  <ChatMessage role="user" text={productUsage.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  {showThinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                  {showReply && (
                    <ChatMessage role="assistant">
                      <StaggerText text={productUsage.assistantMessage} />
                    </ChatMessage>
                  )}
                  {showResult && (
                    <SupportPanel loading={phase === "resultLoading"}>
                      <StatusSteps steps={productUsage.steps} orientation="boxed" />
                      <Button appearance="primary" label={productUsage.cta} />
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
