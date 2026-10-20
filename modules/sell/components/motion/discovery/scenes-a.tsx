"use client";

import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  ChatMessage,
  EnterDelayed,
  InsightCard,
  Media,
  ProductReference,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { productImages } from "../products";
import dressReference from "../../../assets/motion/dress-reference.jpg";
import laptop from "../../../assets/motion/laptop.jpg";
import linenMidiDress from "../../../assets/motion/linen-midi-dress.jpg";
import linenShirtDress from "../../../assets/motion/linen-shirt-dress.jpg";
import linenTrousers from "../../../assets/motion/linen-trousers.jpg";
import shopperUpload from "../../../assets/motion/shopper-upload.jpg";
import tryonResult from "../../../assets/motion/tryon-result.jpg";
import { LoadingFrame, ProductAnchor, ProductCollection, RecCard, type RecProduct, UploadAttachment } from "./parts-a";

/*
 * Product discovery visuals, group A (09–12 in the source gallery). Each is a
 * scripted 450 × 500 chat; `play` starts (and, false → true, restarts) the
 * script where the source waited for the scene to be in view and focused.
 */

type SceneProps = { play?: boolean };

/* ---------------------------------------------------------------------------
 * 09 — Conversational discovery (`F0`)
 * ------------------------------------------------------------------------ */

const discovery = {
  brand: "ISOLA",
  userMessage: "I need something for a beach wedding, but I run hot and hate anything tight.",
  assistantMessage:
    "Got it, breathable, relaxed and wedding-appropriate. I found three linen options in lighter weaves. Let me narrow those down to your size.",
  insight: ["Using the size saved on your profile.", "You've leaned toward linen in past orders."],
  products: [
    { id: "linen-midi-dress", name: "Relaxed-Fit Linen Midi Dress", image: linenMidiDress },
    { id: "linen-shirt-dress", name: "Oversized Linen Shirt Dress", image: linenShirtDress },
    { id: "linen-trousers", name: "Drawstring Linen Trousers", image: linenTrousers },
  ] satisfies RecProduct[],
};

const discoveryBeats: Beat[] = [
  { id: "ask", type: "compose", text: discovery.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding linen options"] },
  { id: "reply", type: "text", text: discovery.assistantMessage },
  { id: "insight", type: "appear" },
  { id: "cards", type: "load", ms: 750 },
];

export function ConversationalDiscovery({ play = true }: SceneProps) {
  return (
    <ChatScene brand={discovery.brand} beats={discoveryBeats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ChatMessage role="user" text={discovery.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={discovery.assistantMessage} />}
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={discovery.insight} />
                </EnterDelayed>
              )}
              {t.reached("cards") && (
                <ProductCollection>
                  {discovery.products.map((product, i) => (
                    <RecCard
                      key={product.id}
                      product={product}
                      cta
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

/* ---------------------------------------------------------------------------
 * 10 — Try it on (`U0`)
 * ------------------------------------------------------------------------ */

const tryOn = {
  brand: "MARAIS",
  userMessage: "Would this dress work on me?",
  assistantOffer: "Absolutely. I'll show you how it looks on you, simply upload your image.",
  assistantResult: "Since you usually prefer a relaxed fit, I've kept the styling true to that.",
  dress: { brand: "MARAIS", title: "Linen Balloon-Sleeve Dress", alt: "Referenced dress" },
};

const tryOnBeats: Beat[] = [
  { id: "ask", type: "compose", text: tryOn.userMessage },
  { id: "think-offer", type: "think", labels: ["Thinking"] },
  { id: "offer", type: "text", text: tryOn.assistantOffer },
  // The shopper attaches a photo: an empty compose that just holds.
  { id: "upload", type: "compose", holdMs: 1000 },
  { id: "think-result", type: "think", labels: ["Thinking", "Styling your look"] },
  { id: "result", type: "text", text: tryOn.assistantResult },
  { id: "image", type: "load", ms: 1000 },
];

export function TryItOn({ play = true }: SceneProps) {
  return (
    <ChatScene brand={tryOn.brand} beats={tryOnBeats} play={play}>
      {(t) => (
        <>
          {t.passed("ask") && (
            <UserTurn animateIn>
              <ProductReference
                image={dressReference}
                alt={tryOn.dress.alt}
                brand={tryOn.dress.brand}
                title={tryOn.dress.title}
              />
              <ChatMessage role="user" text={tryOn.userMessage} />
            </UserTurn>
          )}
          {t.passed("ask") && (
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think-offer" />
              {t.reached("offer") && <AssistantReply text={tryOn.assistantOffer} />}
            </AssistantTurn>
          )}
          {t.passed("upload") && (
            <UserTurn animateIn>
              <UploadAttachment src={shopperUpload} alt="Photo uploaded by the shopper" />
            </UserTurn>
          )}
          {t.passed("upload") && (
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think-result" />
              {t.reached("result") && <AssistantReply text={tryOn.assistantResult} />}
              {t.reached("image") && (
                <LoadingFrame loading={t.loading("image")} radius={16} className="ill-tryon-result">
                  <Media src={tryonResult} alt="Personalised try-on result" />
                </LoadingFrame>
              )}
            </AssistantTurn>
          )}
        </>
      )}
    </ChatScene>
  );
}

/* ---------------------------------------------------------------------------
 * 11 — Product Q&A (`Q0`)
 * ------------------------------------------------------------------------ */

const productQa = {
  brand: "NOVA",
  userMessage: "Is this laptop good enough for me?",
  assistantMessage:
    "For how you use your laptop, yes. You mostly use it for browsing, presentations and video calls, so you don't need to pay extra for a high-performance configuration. This model gives you the battery life and screen quality you've previously prioritized, without the unnecessary processing power.",
  insight: [
    "Based on your browsing history — mostly video calls and presentations.",
    "Matches the battery life and screen quality you've prioritized before.",
  ],
  laptop: { image: laptop, alt: "Referenced laptop", brand: "NOVA", title: "Nova Air 14″", price: "$1,099" },
};

const productQaBeats: Beat[] = [
  { id: "ask", type: "compose", text: productQa.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking how you use it"] },
  { id: "reply", type: "text", text: productQa.assistantMessage },
  { id: "insight", type: "appear" },
];

export function ProductQa({ play = true }: SceneProps) {
  return (
    <ChatScene brand={productQa.brand} beats={productQaBeats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ProductReference {...productQa.laptop} />
              <ChatMessage role="user" text={productQa.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={productQa.assistantMessage} />}
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={productQa.insight} />
                </EnterDelayed>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}

/* ---------------------------------------------------------------------------
 * 12 — Look & outfit building (`z0`)
 * ------------------------------------------------------------------------ */

const outfit = {
  brand: "MARAIS",
  userMessage: "I love this shirt. What would you wear with it?",
  assistantMessage:
    "Since you usually go for relaxed fits and neutral colours, I'd pair it with these straight-leg trousers and these sneakers. You also mentioned you're dressing for a dinner, so I'd keep it polished without making it formal.",
  insight: [
    "You usually go for relaxed fits in neutral colours, size M.",
    "Dressing for a dinner — kept the pairing polished, not formal.",
  ],
  shirt: { image: productImages.cottonShirt, alt: "Referenced shirt", brand: "MARAIS", title: "Relaxed Cotton Shirt" },
  products: [
    { id: "straight-leg-trousers", name: "Straight-Leg Tailored Trousers", image: productImages.tailoredTrousers },
    { id: "minimal-sneakers", name: "Minimal Leather Sneakers", image: productImages.leatherSneakers },
  ] satisfies RecProduct[],
};

const outfitBeats: Beat[] = [
  { id: "ask", type: "compose", text: outfit.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Pairing it with your style"] },
  { id: "reply", type: "text", text: outfit.assistantMessage },
  { id: "insight", type: "appear" },
  { id: "cards", type: "load", ms: 700 },
];

export function OutfitBuilding({ play = true }: SceneProps) {
  return (
    <ChatScene brand={outfit.brand} beats={outfitBeats} play={play}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ProductAnchor {...outfit.shirt} />
              <ChatMessage role="user" text={outfit.userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={outfit.assistantMessage} />}
              {t.reached("insight") && (
                <EnterDelayed>
                  <InsightCard lines={outfit.insight} />
                </EnterDelayed>
              )}
              {t.reached("cards") && (
                <ProductCollection>
                  {outfit.products.map((product, i) => (
                    <RecCard
                      key={product.id}
                      product={product}
                      cta
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
