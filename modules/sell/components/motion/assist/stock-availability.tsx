"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  AttributeRow,
  ChatMessage,
  Chip,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { productImages } from "../products";
import { LoadingFrame, ProductMeta, Thumbnail } from "../upsell/parts";
import { ConversionFrame } from "./parts";

/*
 * 31 — Stock availability. The shopper asks if the sneakers are in stock;
 * the assistant confirms their size and Friday delivery, and that the other
 * colour they viewed is out of stock.
 */

const copy = {
  brand: "FIELDSTRIDE",
  userMessage: "Do you have this in stock?",
  assistantMessage:
    "Yes, this is available in your preferred size, with delivery by Friday. The other color you viewed is currently out of stock.",
};

const product = {
  image: productImages.leatherSneakers,
  alt: "Minimal leather sneakers",
  brand: "FIELDSTRIDE",
  title: "Minimal Leather Sneakers",
  price: "$145",
  size: "US 9",
  colors: [
    { name: "Black", available: true },
    { name: "Tan", available: false },
  ],
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking stock"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "module", type: "load", ms: 650 },
];

export function StockAvailabilityScene({ play = true }: { play?: boolean }) {
  const [selected, alternate] = product.colors;

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
      </ChatScene>
    </ConversionFrame>
  );
}
