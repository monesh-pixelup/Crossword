"use client";

import sunglasses from "../../../assets/motion/sunglasses.jpg";
import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, ChatMessage, ThinkingStatus, UserTurn } from "../primitives";
import { productImages } from "../products";
import { CommerceCard, type CommerceProduct, ProductAnchor, ProductCollection } from "./parts";

/*
 * 18 — Cross-sell / complete the look [ge]. The shopper is buying gold
 * aviators; the assistant suggests the matching leather case and silk scarf.
 */

const copy = {
  brand: "MARAIS",
  userMessage: "I'll take these sunglasses.",
  assistantMessage:
    "Good choice. You've bought similar styles before. You might also want to add this leather case, it fits the frame and this scarf that perfectly matches the color of the frame.",
};

/** The product the message is about. */
const anchor = {
  image: sunglasses,
  alt: "Sunglasses being purchased",
  brand: "MARAIS",
  title: "Gold Aviator Sunglasses",
};

const suggestions: CommerceProduct[] = [
  {
    id: "leather-case",
    title: "Leather Frame Case",
    image: productImages.leatherFrameCase,
    brand: "MARAIS",
    price: "$45",
    rating: 5,
    ratingCount: "210",
  },
  {
    id: "matching-scarf",
    image: productImages.silkScarf,
    title: "Gold-Tone Silk Scarf",
    brand: "MARAIS",
    price: "$65",
    rating: 4,
    ratingCount: "88",
  },
];

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding what goes with it"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
];

export function CrossSellScene({ play = true }: { play?: boolean }) {
  return (
    <ChatScene brand={copy.brand} beats={beats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ProductAnchor image={anchor.image} alt={anchor.alt} brand={anchor.brand} title={anchor.title} />
              <ChatMessage role="user" text={copy.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
              {t.reached("cards") && (
                <ProductCollection>
                  {suggestions.map((product, i) => (
                    <CommerceCard
                      key={product.id}
                      product={product}
                      loading={t.loading("cards")}
                      resolveDelayMs={i * 80}
                    />
                  ))}
                </ProductCollection>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}
