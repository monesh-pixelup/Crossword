import "../ProductComparison/ProductComparison.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ComparisonRow } from "../../components/ill/ComparisonRow";
import { script, current, recommended } from "../ProductComparison/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
];

export function ProductComparisonMotion() {
  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={script.brand} beats={beats}>
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={script.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                <Thinking t={t} id="think" />
                {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
                {t.reached("compare") && (
                  <LoadingFrame loading={t.loading("compare")} radius={12} className="ill-product-comparison">
                    <div className="ill-product-comparison__header">
                      <div className="ill-product-comparison__header-cell" />
                      <div className="ill-product-comparison__header-cell ill-product-comparison__header-cell--favored">
                        <Thumbnail src={recommended.image} alt={recommended.name} size={36} />
                        <p className="ill-product-comparison__name ill-product-comparison__name--favored">
                          {recommended.name}
                        </p>
                      </div>
                      <div className="ill-product-comparison__header-cell">
                        <Thumbnail src={current.image} alt={current.name} size={36} />
                        <p className="ill-product-comparison__name">{current.name}</p>
                      </div>
                    </div>
                    <ComparisonRow label="Suction" valueA={recommended.suction} valueB={current.suction} />
                    <ComparisonRow label="Dustbin" valueA={recommended.dustbin} valueB={current.dustbin} />
                    <ComparisonRow label="Price" valueA={recommended.price} valueB={current.price} />
                  </LoadingFrame>
                )}
              </AssistantTurn>
            </>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
