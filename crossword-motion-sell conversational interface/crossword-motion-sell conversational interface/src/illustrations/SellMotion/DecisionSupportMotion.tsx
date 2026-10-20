import "../DecisionSupport/DecisionSupport.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ProductCollection } from "../../components/ill/ProductCollection";
import { RecommendationProductCard } from "../../components/ill/RecommendationProductCard";
import { Button } from "../../components/ill/Button";
import { script, products } from "../DecisionSupport/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { AssistantText, Enter, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

// No shopper turn — a contextual nudge off browsed products, same
// no-ask precedent as BrowseUpsellMotion/DecisionSupport's own static.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "cards", type: "appear", ms: 450 },
  { id: "action", type: "appear" },
];

export function DecisionSupportMotion() {
  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={script.brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("cards") && (
                <ProductCollection>
                  {products.map((product, i) => (
                    <Enter key={product.id} delayMs={i * 80}>
                      <RecommendationProductCard
                        product={{ id: product.id, name: product.name, image: product.image, brand: product.differentiator, price: product.price }}
                      />
                    </Enter>
                  ))}
                </ProductCollection>
              )}
              {t.reached("action") && (
                <Enter>
                  <Button appearance="primary" label="Compare products" className="ill-decision-cta" />
                </Enter>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
