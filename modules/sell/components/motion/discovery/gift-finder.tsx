"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  EnterDelayed,
  InsightCard,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { productImages } from "../products";
import { CommerceCard, type CommerceProduct, ProductCollection } from "./parts-b";

/*
 * 16 — Product discovery: Gift & occasion finder (source `ne`). The shopper
 * wants a ~$150 birthday gift for their dad; the assistant draws on past
 * gifts and offers three practical picks as shoppable cards.
 */

const copy = {
  brand: "ECHO & CO",
  userMessage: "I need a birthday gift for my dad. Around $150.",
  assistantMessage:
    "Based on the gifts you've bought him before, he tends to prefer practical things over novelty gifts. I found three options around $150, including this smart speaker, which fits his interest in music and is simple enough to use without much setup.",
};

const insightLines = [
  "He's leaned practical over novelty in past gifts.",
  "Fits his interest in music, kept the setup simple.",
];

const gifts: CommerceProduct[] = [
  {
    id: "smart-speaker",
    image: productImages.smartSpeaker,
    brand: "WAVELINE",
    title: "Compact Smart Speaker",
    price: "$149",
    rating: 5,
    ratingCount: "2.3k",
  },
  {
    id: "wireless-earbuds",
    image: productImages.wirelessEarbuds,
    brand: "AURA",
    title: "Wireless Noise-Cancelling Earbuds",
    price: "$159",
    rating: 4,
    ratingCount: "980",
  },
  {
    id: "leather-wallet",
    image: productImages.leatherWallet,
    brand: "HOLT & CO",
    title: "Full-Grain Leather Bifold Wallet",
    price: "$135",
    rating: 5,
    ratingCount: "540",
  },
];

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding gifts around $150"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "insight", type: "appear" },
  { id: "cards", type: "load", ms: 750 },
];

export function GiftFinder({ play = true }: { play?: boolean }) {
  return (
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
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={insightLines} />
                </EnterDelayed>
              )}
              {t.reached("cards") && (
                <ProductCollection>
                  {gifts.map((product, i) => (
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
