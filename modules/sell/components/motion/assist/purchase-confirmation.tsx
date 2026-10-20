"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  AttributeRow,
  Button,
  ChatMessage,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { productImages } from "../products";
import { LoadingFrame, ProductMeta, Thumbnail } from "../upsell/parts";
import { ConversionFrame } from "./parts";

/*
 * 32 — Purchase confirmation. The shopper decides to buy; the assistant has
 * picked their saved size and preferred colour and hands back a ready
 * "Add to cart" card.
 */

const copy = {
  brand: "MARAIS",
  userMessage: "Okay, I'll take it.",
  assistantMessage: "Great. I've selected your saved size and the color you preferred. Simply add it to your cart.",
};

const product = {
  image: productImages.cottonShirt,
  alt: "Relaxed cotton shirt",
  brand: "MARAIS",
  title: "Relaxed Cotton Shirt",
  price: "$110",
  size: "M",
  color: "Olive",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Confirming your preferences"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "card", type: "load", ms: 700 },
];

export function PurchaseConfirmationScene({ play = true }: { play?: boolean }) {
  return (
    <ConversionFrame>
      <ChatScene brand={copy.brand} beats={beats} play={play}>
        {(t) =>
          t.passed("ask") && (
            <>
              <UserTurn animateIn>
                <ChatMessage role="user" text={copy.userMessage} />
              </UserTurn>
              <AssistantTurn animateIn>
                <ThinkingStatus t={t} id="think" />
                {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
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
      </ChatScene>
    </ConversionFrame>
  );
}
