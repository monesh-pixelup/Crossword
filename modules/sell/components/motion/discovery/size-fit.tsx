"use client";

import helmet from "../../../assets/motion/helmet.jpg";
import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  EnterDelayed,
  InsightCard,
  ProductReference,
  ThinkingStatus,
  UserTurn,
} from "../primitives";

/*
 * 15 — Product discovery: Size & fit guidance (source `ae`). The shopper
 * asks about a helmet they're viewing; the assistant recommends a size from
 * their saved head measurement and past fit preference.
 */

const copy = { brand: "RIDGE", userMessage: "Will this helmet fit me?" };

const insightLines = [
  "Based on the head measurement saved on your profile.",
  "You've chosen a snug fit over a relaxed one before.",
];

const product = {
  image: helmet,
  alt: "Referenced helmet",
  brand: "RIDGE",
  title: "Enduro MTB Helmet",
  price: "$180",
};

const reply =
  "You're between sizes, but based on the head measurement you provided, I'd recommend **Medium**. It's also the better choice if you prefer a snug fit, which you've selected before.";

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking your measurements"] },
  { id: "reply", type: "text", text: reply },
  { id: "insight", type: "appear" },
];

export function SizeFit({ play = true }: { play?: boolean }) {
  return (
    <ChatScene brand={copy.brand} beats={beats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ProductReference
                image={product.image}
                alt={product.alt}
                brand={product.brand}
                title={product.title}
                price={product.price}
              />
              <ChatMessage role="user" text={copy.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={reply} />}
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={insightLines} />
                </EnterDelayed>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}
