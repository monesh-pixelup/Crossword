"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, Button, EnterDelayed, ThinkingStatus } from "../primitives";
import { productImages } from "../products";
import { ProductCollection } from "../upsell/parts";
import { ConversionFrame, RecommendationCard } from "./parts";

/*
 * 33 — Decision support. Unprompted, the assistant offers to compare the
 * three headphone colourways the shopper viewed, each with its own
 * differentiator, under one full-width "Compare products" action.
 */

const copy = {
  brand: "AUDEN",
  assistantMessage: "Still deciding? Compare the three products you viewed side by side.",
};

const products = [
  { id: "ivory", image: productImages.audenIvory, name: "Auden Wave Pro — Ivory", differentiator: "Clearer mids", price: "$649" },
  { id: "olive", image: productImages.audenOlive, name: "Auden Wave Pro — Olive", differentiator: "Longest battery life", price: "$629" },
  { id: "mustard", image: productImages.audenMustard, name: "Auden Wave Pro — Mustard", differentiator: "Lightest build", price: "$599" },
];

const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "cards", type: "appear", ms: 450 },
  { id: "action", type: "appear" },
];

export function DecisionSupportScene({ play = true }: { play?: boolean }) {
  return (
    <ConversionFrame>
      <ChatScene brand={copy.brand} beats={beats} play={play}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
              {t.reached("cards") && (
                <ProductCollection>
                  {products.map((product, i) => (
                    <EnterDelayed key={product.id} delayMs={i * 80}>
                      <RecommendationCard
                        product={{ id: product.id, name: product.name, image: product.image, brand: product.differentiator, price: product.price }}
                      />
                    </EnterDelayed>
                  ))}
                </ProductCollection>
              )}
              {t.reached("action") && (
                <EnterDelayed>
                  <Button appearance="primary" label="Compare products" className="ill-decision-cta" />
                </EnterDelayed>
              )}
            </AssistantTurn>
          )
        }
      </ChatScene>
    </ConversionFrame>
  );
}
