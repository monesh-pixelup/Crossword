import "../CartUpsellOffer/CartUpsellOffer.css";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { AttributeRow } from "../../components/ill/AttributeRow";
import { Chip } from "../../components/ill/Chip";
import { script, cart, offer, accessory } from "../CartUpsellOffer/data";
import { ChatMotionScene } from "./ChatMotionScene";
import { LoadingFrame } from "./LoadingFrame";
import { AssistantText, Thinking } from "./parts";
import type { Beat } from "./useChatTimeline";

// No shopper turn — Crossword notices cart state unprompted, same
// no-ask precedent as BrowseUpsellMotion's opening.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your cart"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "offer", type: "load", ms: 650 },
];

export function CartUpsellOfferMotion() {
  const progress = Math.min(cart.value / cart.threshold, 1) * 100;

  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={script.brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("offer") && (
                <LoadingFrame loading={t.loading("offer")} radius={12} className="ill-cart-offer">
                  <AttributeRow label="Cart total" value={`$${cart.value} of $${cart.threshold}`} />
                  <div className="ill-cart-offer__progress-track">
                    <div className="ill-cart-offer__progress-fill" style={{ width: `${progress}%` }} />
                  </div>

                  <div className="ill-cart-offer__accessory">
                    <Thumbnail src={accessory.image} alt={accessory.alt} size={48} />
                    <div className="ill-cart-offer__accessory-text">
                      <ProductMeta brand={accessory.brand} title={accessory.title} price={accessory.price} />
                    </div>
                    <div className="ill-cart-offer__accessory-action">
                      <Chip>{offer.savings} OFF</Chip>
                      <Chip kind="action" tone="primary">
                        Add
                      </Chip>
                    </div>
                  </div>
                </LoadingFrame>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
