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
import { FeatureStacked, ProductAnchor } from "./parts";

/*
 * 19 — Bundle building [ve]. The shopper is buying an espresso machine; the
 * assistant offers a three-accessory bundle as one stacked card.
 */

const copy = {
  brand: "BREWHAUS",
  userMessage: "I'm getting a new coffee machine.",
  assistantMessage:
    "If you're setting this up at home, I'd bundle it with these three: a milk frother, reusable filter and coffee starter pack. They're the accessories you're most likely to need, and buying them together saves you from ordering them separately later.",
};

const insightLines = ["Matches the accessories from the machine you replaced."];

/** The product the message is about. */
const anchor = {
  image: productImages.espressoMachine,
  alt: "Coffee machine being purchased",
  brand: "BREWHAUS",
  title: "Pro Espresso Machine",
};

const bundle = {
  image: productImages.accessoryBundle,
  eyebrow: "BUNDLE · 3 ITEMS",
  title: "Milk Frother, Reusable Filter & Starter Pack",
  price: "$65",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Picking the right add-ons"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "insight", type: "appear" },
  { id: "bundle", type: "load", ms: 750 },
];

export function BundleBuildingScene({ play = true }: { play?: boolean }) {
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
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={insightLines} />
                </EnterDelayed>
              )}
              {t.reached("bundle") && <FeatureStacked {...bundle} loading={t.loading("bundle")} />}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}
