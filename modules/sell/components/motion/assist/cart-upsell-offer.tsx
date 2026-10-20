"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, AttributeRow, Chip, ThinkingStatus } from "../primitives";
import { productImages } from "../products";
import { LoadingFrame, ProductMeta, Thumbnail } from "../upsell/parts";
import { ConversionFrame } from "./parts";

/*
 * 30 — Cart upsell offer. Unprompted (no shopper turn), the assistant points
 * out a $15 offer over $150 and the accessory that would take the $136 cart
 * past it.
 */

const copy = {
  brand: "HOLT & CO",
  assistantMessage:
    "You have a $15 offer available on orders over $150. Adding the matching accessory you were looking at would take your cart over the threshold.",
};

const cart = { value: 136, threshold: 150 };
const offer = { savings: "$15" };

const accessory = {
  image: productImages.leatherWallet,
  alt: "Matching accessory",
  brand: "HOLT & CO",
  title: "Leather Bifold Wallet",
  price: "$18",
};

const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your cart"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "offer", type: "load", ms: 650 },
];

export function CartUpsellOfferScene({ play = true }: { play?: boolean }) {
  const progress = Math.min(cart.value / cart.threshold, 1) * 100;

  return (
    <ConversionFrame>
      <ChatScene brand={copy.brand} beats={beats} play={play}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
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
      </ChatScene>
    </ConversionFrame>
  );
}
