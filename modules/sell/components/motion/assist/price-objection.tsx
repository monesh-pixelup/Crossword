"use client";

import vitaminCSerum from "../../../assets/motion/vitamin-c-serum.webp";
import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  Button,
  ChatMessage,
  EnterDelayed,
  ProductReference,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { ConversionFrame } from "./parts";

/*
 * 28 — Price objection. The shopper doubts a serum is worth $68; the
 * assistant offers cheaper alternatives or to explain the value, with both
 * as equal-weight next steps.
 */

const copy = {
  brand: "SORELLE LABS",
  userMessage: "I'm not sure this serum is worth the price.",
  assistantMessage:
    "Fair. If you're looking for something similar at a lower price, I can show you a few options with comparable ingredients and benefits. Or I can help you understand what makes this one worth the price.",
};

const product = {
  image: vitaminCSerum,
  alt: "Vitamin C serum being considered",
  brand: "SORELLE LABS",
  title: "Vitamin C Serum",
  price: "$68",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding alternatives"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "actions", type: "appear" },
];

export function PriceObjectionScene({ play = true }: { play?: boolean }) {
  return (
    <ConversionFrame>
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
                {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
                {t.reached("actions") && (
                  <EnterDelayed>
                    <div className="ill-price-objection__actions">
                      <Button appearance="primary" label="Find alternatives" />
                      <Button appearance="secondary" label="Compare benefits" />
                    </div>
                  </EnterDelayed>
                )}
              </AssistantTurn>
            </>
          )
        }
      </ChatScene>
    </ConversionFrame>
  );
}
