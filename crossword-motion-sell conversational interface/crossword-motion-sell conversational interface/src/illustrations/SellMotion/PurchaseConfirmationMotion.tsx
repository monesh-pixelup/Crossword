import "../PurchaseConfirmation/PurchaseConfirmation.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { AttributeRow } from "../../components/ill/AttributeRow";
import { Button } from "../../components/ill/Button";
import { script, product } from "../PurchaseConfirmation/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Confirming your preferences"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "card", type: "load", ms: 700 },
];

export function PurchaseConfirmationMotion() {
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
                {t.reached("card") && (
                  <LoadingFrame loading={t.loading("card")} radius={16} className="ill-purchase-card">
                    <div className="ill-purchase-card__top">
                      <Thumbnail src={product.image} alt={product.alt} size={52} />
                      <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                    </div>
                    <div className="ill-purchase-card__attributes">
                      <AttributeRow label="Size" value={product.size} />
                      <AttributeRow label="Color" value={product.color} />
                    </div>
                    <Button appearance="primary" label="Add to cart" />
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
