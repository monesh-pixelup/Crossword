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
import { ComparisonRow, LoadingFrame, Thumbnail } from "./parts";

/*
 * 17 — Upsell: Upgrade [de]. The shopper is looking at a compact air fryer;
 * the assistant recommends the family-size model and lays the two side by
 * side (capacity, price).
 */

const copy = {
  brand: "HEARTHWARE",
  userMessage: "I'm looking at this air fryer.",
  assistantMessage:
    "This one will work, but I'd recommend the next model up for you. You've previously bought for a family of four, and this smaller basket may mean cooking in batches. The larger model gives you more capacity without a significant jump in price.",
};

const insightLines = ["You've tended to go mid-range rather than premium before."];

/** The model being viewed. */
const viewed = { name: "Compact Air Fryer", image: productImages.compactAirFryer, capacity: "4L", price: "$89" };
/** The recommended upgrade. */
const upgrade = { name: "Family Air Fryer", image: productImages.familyAirFryer, capacity: "6L", price: "$99" };

const beats: Beat[] = [
  { id: "ask", type: "compose", text: copy.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two models"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "insight", type: "appear" },
  { id: "compare", type: "load", ms: 800 },
];

export function UpsellUpgradeScene({ play = true }: { play?: boolean }) {
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
              {t.reached("compare") && (
                <LoadingFrame loading={t.loading("compare")} radius={12} className="ill-upgrade-comparison">
                  <div className="ill-upgrade-comparison__header">
                    <div className="ill-upgrade-comparison__header-cell" />
                    <div className="ill-upgrade-comparison__header-cell ill-upgrade-comparison__header-cell--favored">
                      <Thumbnail src={upgrade.image} alt={upgrade.name} size={36} />
                      <p className="ill-upgrade-comparison__name ill-upgrade-comparison__name--favored">
                        {upgrade.name}
                      </p>
                    </div>
                    <div className="ill-upgrade-comparison__header-cell">
                      <Thumbnail src={viewed.image} alt={viewed.name} size={36} />
                      <p className="ill-upgrade-comparison__name">{viewed.name}</p>
                    </div>
                  </div>
                  <ComparisonRow label="Capacity" valueA={upgrade.capacity} valueB={viewed.capacity} />
                  <ComparisonRow label="Price" valueA={upgrade.price} valueB={viewed.price} />
                </LoadingFrame>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}
