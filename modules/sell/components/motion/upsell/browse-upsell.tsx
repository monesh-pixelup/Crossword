"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import { AssistantReply, AssistantTurn, EnterDelayed, ThinkingStatus } from "../primitives";
import { productImages } from "../products";
import { CommerceCard, type CommerceProduct, Thumbnail } from "./parts";

/*
 * 20 — Browse upselling [fe]. No user message: the assistant opens with the
 * three headphones the shopper has viewed, then suggests a pricier model
 * with the battery life they care about.
 */

const copy = {
  brand: "AUDEN",
  assistantMessage:
    "You've looked at three models in the $450 to $600 range. If you're already comfortable at that price point, this model is worth considering, it has the longer battery life you tend to prioritize and is currently only $100 more than the one you've been viewing.",
};

const viewed = {
  caption: "3 models viewed · $450–$600",
  items: [
    { image: productImages.audenIvory, alt: "Previously viewed headphone model" },
    { image: productImages.audenOlive, alt: "Previously viewed headphone model" },
    { image: productImages.audenMustard, alt: "Previously viewed headphone model" },
  ],
};

const recommended: CommerceProduct = {
  id: "recommended",
  image: productImages.auden,
  brand: "AUDEN",
  title: "Auden Wave Pro",
  price: "$699",
  rating: 5,
  ratingCount: "1.1k",
};

const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "viewed", type: "appear", ms: 700 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: copy.assistantMessage },
  { id: "card", type: "load", ms: 750 },
];

export function BrowseUpsellScene({ play = true }: { play?: boolean }) {
  return (
    <ChatScene brand={copy.brand} beats={beats} play={play}>
      {(t) =>
        t.passed("lead") && (
          <AssistantTurn animateIn>
            <div className="ill-browse-context">
              <div className="ill-browse-context__row">
                {viewed.items.map((item, i) => (
                  <EnterDelayed key={i} delayMs={i * 80}>
                    <Thumbnail src={item.image} alt={item.alt} size={40} />
                  </EnterDelayed>
                ))}
              </div>
              <EnterDelayed delayMs={240}>
                <p className="ill-browse-context__caption">{viewed.caption}</p>
              </EnterDelayed>
            </div>
            <ThinkingStatus t={t} id="think" />
            {t.reached("reply") && <AssistantReply text={copy.assistantMessage} />}
            {t.reached("card") && <CommerceCard product={recommended} loading={t.loading("card")} />}
          </AssistantTurn>
        )
      }
    </ChatScene>
  );
}
