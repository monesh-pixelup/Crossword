"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, ChatMessage, ThinkingStatus, UserTurn } from "../primitives";
import { productImages } from "../products";
import { ComparisonRow, LoadingFrame, Thumbnail } from "../upsell/parts";
import { ConversionFrame } from "./parts";

/*
 * 29 — Product comparison. The shopper asks how a vacuum compares to the
 * Dyson; the assistant answers, then lays the two side by side (suction,
 * dustbin, price).
 */

const copy = {
  brand: "AERIA",
  userMessage: "How does this compare to the Dyson?",
  assistantMessage: "The Dyson has stronger suction, but this model gives you a larger dustbin and costs $500 less.",
};

const recommended = {
  name: "Aeria Cyclone Pro",
  image: productImages.aeriaCycloneProVacuum,
  suction: "Comparable",
  dustbin: "1.5L",
  price: "$249",
};

const current = {
  name: "Dyson V15",
  image: productImages.dysonV15Vacuum,
  suction: "Stronger",
  dustbin: "0.76L",
  price: "$749",
};

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
];

export function ProductComparisonScene({ play = true }: { play?: boolean }) {
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
                {t.reached("compare") && (
                  <LoadingFrame loading={t.loading("compare")} radius={12} className="ill-product-comparison">
                    <div className="ill-product-comparison__header">
                      <div className="ill-product-comparison__header-cell" />
                      <div className="ill-product-comparison__header-cell ill-product-comparison__header-cell--favored">
                        <Thumbnail src={recommended.image} alt={recommended.name} size={36} />
                        <p className="ill-product-comparison__name ill-product-comparison__name--favored">
                          {recommended.name}
                        </p>
                      </div>
                      <div className="ill-product-comparison__header-cell">
                        <Thumbnail src={current.image} alt={current.name} size={36} />
                        <p className="ill-product-comparison__name">{current.name}</p>
                      </div>
                    </div>
                    <ComparisonRow label="Suction" valueA={recommended.suction} valueB={current.suction} />
                    <ComparisonRow label="Dustbin" valueA={recommended.dustbin} valueB={current.dustbin} />
                    <ComparisonRow label="Price" valueA={recommended.price} valueB={current.price} />
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
