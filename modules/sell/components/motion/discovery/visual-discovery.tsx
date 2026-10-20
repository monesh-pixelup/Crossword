"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, ChatMessage, ThinkingStatus, UserTurn } from "../primitives";
import { productImages } from "../products";
import { ProductCollection, RecCard, type RecProduct, UploadAttachment } from "./parts-b";

/*
 * 14 — Product discovery: Visual discovery (source `ee`). The shopper
 * uploads a photo of a lamp; the assistant answers with three lamps that
 * match its warm glow, loading in as skeleton cards.
 */

const copy = {
  brand: "HEARTH",
  userMessage: "I want something like this.",
  assistantMessage:
    "I found the closest matches. Since you've previously saved warm, ambient lighting, I've prioritised lamps with a similar glow rather than just matching the shape. This one is the closest match.",
};

const upload = { src: productImages.referenceLamp, alt: "Lamp photo uploaded by the shopper" };

const matches: RecProduct[] = [
  { id: "tripod-lamp", name: "Warm Tripod Table Lamp", image: productImages.tripodLamp },
  { id: "mushroom-lamp", name: "Mod Dome Table Lamp", image: productImages.domeLamp },
  { id: "bedside-lamp", name: "Copper-Rim Bedside Lamp", image: productImages.bedsideLamp },
];

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Matching the glow"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
];

export function VisualDiscovery({ play = true }: { play?: boolean }) {
  return (
    <ChatScene brand={copy.brand} beats={beats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <UploadAttachment src={upload.src} alt={upload.alt} size={140} />
              <ChatMessage role="user" text={copy.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
              {t.reached("cards") && (
                <ProductCollection>
                  {matches.map((product, i) => (
                    <RecCard
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
