"use client";

import calmingSerum from "../../../assets/human-mode/calming-serum.png";
import hydratingSerum from "../../../assets/human-mode/hydrating-serum.png";
import { ChatScene } from "../chat-scene";
import type { Beat } from "../motion";
import {
  AssistantReply,
  AssistantTurn,
  Button,
  ChatMessage,
  EnterDelayed,
  Icon,
  ThinkingStatus,
  UserTurn,
} from "../primitives";
import { ComparisonRow, LoadingFrame, ProductMeta, Thumbnail } from "../upsell/parts";
import "./human-mode.css";

/*
 * 34 — Human mode: "A concierge that knows when to step in." Three 327 × 336
 * shells on the 1280 × 599 art, one Sorelle Labs skincare thread told in
 * three moments: it knows when to help, how to guide, and when you're ready.
 * Each shell runs its own script; the three enter left to right, 150ms apart.
 */

const brand = "Sorelle Labs";
const shell = { width: 327, height: 336, className: "ill-theme-human-mode" };

const whenToHelp = {
  proactiveMessage: "Wondering if this serum works for sensitive skin?",
  userMessage: "Yes, my skin reacts to fragrance.",
  assistantMessage: "This one is fragrance-free and made for sensitive skin. Want me to check the ingredients?",
  product: { image: hydratingSerum, brand: "Sorelle Labs", title: "Daily Hydrating Serum", price: "$48" },
  ctaLabel: "Check ingredients",
};

const howToGuide = {
  userMessage: "Which of these is better for sensitive skin?",
  assistantMessage: "The Calming Serum is a better match. It's fragrance-free, has a simpler formula, and costs $16 less.",
  recommended: { name: "Calming Serum", price: "$52", image: calmingSerum },
  current: { name: "Daily Hydrating Serum", price: "$68", image: hydratingSerum },
};

const whenYoureReady = {
  userMessage: "Okay, I'll take the Calming Serum.",
  assistantMessage: "Great. I've selected the 30 ml Calming Serum for you.",
  product: { image: calmingSerum, brand: "Sorelle Labs", title: "Calming Serum — 30 ml", price: "$52" },
};

/** Crossword opens the thread itself: its line plays before the shopper's turn exists. */
const whenToHelpBeats: Beat[] = [
  { id: "intro", type: "text", text: whenToHelp.proactiveMessage },
  { id: "ask", type: "compose", text: whenToHelp.userMessage, leadMs: 500 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: whenToHelp.assistantMessage },
  { id: "card", type: "load", ms: 600 },
];

const howToGuideBeats: Beat[] = [
  { id: "ask", type: "compose", text: howToGuide.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: howToGuide.assistantMessage },
  { id: "compare", type: "load", ms: 700 },
  { id: "actions", type: "appear" },
];

const whenYoureReadyBeats: Beat[] = [
  { id: "ask", type: "compose", text: whenYoureReady.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: whenYoureReady.assistantMessage },
  { id: "card", type: "load", ms: 600 },
];

function KnowsWhenToHelp({ play }: { play: boolean }) {
  const { proactiveMessage, userMessage, assistantMessage, product, ctaLabel } = whenToHelp;
  return (
    <ChatScene brand={brand} beats={whenToHelpBeats} play={play} {...shell}>
      {(t) =>
        t.reached("intro") && (
          <>
            <AssistantTurn animateIn>
              <AssistantReply text={proactiveMessage} />
            </AssistantTurn>
            {t.passed("intro") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <ThinkingStatus t={t} id="think" />
                  {t.reached("reply") && <AssistantReply text={assistantMessage} />}
                  {t.reached("card") && (
                    <LoadingFrame loading={t.loading("card")} radius={12} className="ill-human-mode__card">
                      <div className="ill-human-mode__card-top">
                        <Thumbnail src={product.image} alt={product.title} size={38} />
                        <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                      </div>
                      <Button appearance="secondary" label={ctaLabel} />
                    </LoadingFrame>
                  )}
                </AssistantTurn>
              </>
            )}
          </>
        )
      }
    </ChatScene>
  );
}

function KnowsHowToGuide({ play }: { play: boolean }) {
  const { userMessage, assistantMessage, recommended, current } = howToGuide;
  return (
    <ChatScene brand={brand} beats={howToGuideBeats} play={play} {...shell}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ChatMessage role="user" text={userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={assistantMessage} />}
              {t.reached("compare") && (
                <LoadingFrame loading={t.loading("compare")} radius={9} className="ill-human-mode__comparison">
                  <div className="ill-human-mode__comparison-header">
                    <div className="ill-human-mode__comparison-header-cell" />
                    <div className="ill-human-mode__comparison-header-cell">
                      <Thumbnail src={recommended.image} alt={recommended.name} size={26} />
                      <p className="ill-human-mode__comparison-name ill-human-mode__comparison-name--favored">
                        {recommended.name}
                      </p>
                    </div>
                    <div className="ill-human-mode__comparison-header-cell">
                      <Thumbnail src={current.image} alt={current.name} size={26} />
                      <p className="ill-human-mode__comparison-name">{current.name}</p>
                    </div>
                  </div>
                  <ComparisonRow label="Price" valueA={recommended.price} valueB={current.price} />
                </LoadingFrame>
              )}
              {t.reached("actions") && (
                <EnterDelayed>
                  <div className="ill-human-mode__actions">
                    <Button appearance="secondary" label="View ingredients" />
                    <Button appearance="primary" label="Add to cart" />
                  </div>
                </EnterDelayed>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}

function KnowsWhenYoureReady({ play }: { play: boolean }) {
  const { userMessage, assistantMessage, product } = whenYoureReady;
  return (
    <ChatScene brand={brand} beats={whenYoureReadyBeats} play={play} {...shell}>
      {(t) =>
        t.passed("ask") && (
          <>
            <UserTurn animateIn>
              <ChatMessage role="user" text={userMessage} />
            </UserTurn>
            <AssistantTurn animateIn>
              <ThinkingStatus t={t} id="think" />
              {t.reached("reply") && <AssistantReply text={assistantMessage} />}
              {t.reached("card") && (
                <LoadingFrame loading={t.loading("card")} radius={12} className="ill-human-mode__card">
                  <div className="ill-human-mode__card-top">
                    <Thumbnail src={product.image} alt={product.title} size={38} />
                    <ProductMeta brand={product.brand} title={product.title} price={product.price} />
                  </div>
                  <Button
                    appearance="secondary"
                    label="Added to your cart"
                    iconLeading={<Icon name="checks" size={11} />}
                  />
                </LoadingFrame>
              )}
            </AssistantTurn>
          </>
        )
      }
    </ChatScene>
  );
}

const panels = [KnowsWhenToHelp, KnowsHowToGuide, KnowsWhenYoureReady];

export function HumanModeScene({ play = true }: { play?: boolean }) {
  return (
    <div className="ill-human-mode-frame">
      {panels.map((Panel, i) => (
        <EnterDelayed key={i} delayMs={i * 150}>
          <Panel play={play} />
        </EnterDelayed>
      ))}
    </div>
  );
}
