import "../StockAvailability/StockAvailability.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { AttributeRow } from "../../components/ill/AttributeRow";
import { Chip } from "../../components/ill/Chip";
import { script, product } from "../StockAvailability/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking stock"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "module", type: "load", ms: 650 },
];

export function StockAvailabilityMotion() {
  const [selected, alternate] = product.colors;

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
                {t.reached("module") && (
                  <LoadingFrame loading={t.loading("module")} radius={12} className="ill-stock-module">
                    <div className="ill-stock-module__product">
                      <Thumbnail src={product.image} alt={product.alt} size={48} />
                      <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                    </div>

                    <AttributeRow label="Size" value={`${product.size} · In stock`} />

                    <div className="ill-stock-module__colors">
                      <span className="ill-stock-module__color-label">Color</span>
                      <div className="ill-stock-module__swatches">
                        <Chip kind="action">{selected.name}</Chip>
                        <Chip>{alternate.name} · Out of stock</Chip>
                      </div>
                    </div>
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
