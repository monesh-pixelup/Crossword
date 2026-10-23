"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import beadedGoldAnklet from "../../assets/motion/beaded-gold-anklet.webp";
import chainLinkBracelet from "../../assets/motion/chain-link-bracelet.webp";
import roseGoldBarPendant from "../../assets/motion/rose-gold-bar-pendant.webp";
import roseGoldCurbChain from "../../assets/motion/rose-gold-curb-chain.webp";
import roseGoldFineBoxChain from "../../assets/motion/rose-gold-fine-box-chain.webp";
import roseGoldHaloPendant from "../../assets/motion/rose-gold-halo-pendant.webp";
import roseGoldSnakeChain from "../../assets/motion/rose-gold-snake-chain.webp";
import roseGoldTeardropPendant from "../../assets/motion/rose-gold-teardrop-pendant.webp";
import teardropPendantNecklace from "../../assets/motion/teardrop-pendant-necklace.webp";
import { phaseTimers, replyDuration, typeText, useFollowLatest, usePrefersReducedMotion } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  ChatMessage,
  ChatShell,
  CommerceCard,
  type CommerceProduct,
  ProductCollection,
  StaggerText,
  Thread,
  UserTurn,
} from "./primitives";

/*
 * 01b · Sell: conversational interface. A shopper on a budget finds a gift,
 * narrows it to rose gold and builds a pendant + chain set in five turns.
 */

type Turn = {
  userMessage: string;
  assistantMessage: string;
  products?: CommerceProduct[];
  singleCard?: CommerceProduct;
};

type Phase = "composing" | "thinking" | "thinkingExit" | "replying" | "productsLoading" | "pausing";

const brand = "VELMORA";

const firstPicks: CommerceProduct[] = [
  {
    id: "anklet-1",
    title: "Beaded Gold Anklet",
    brand,
    price: "$89",
    rating: 4,
    ratingCount: "312",
    image: beadedGoldAnklet,
  },
  {
    id: "pendant-1",
    title: "Teardrop Pendant Necklace",
    brand,
    price: "$129",
    rating: 5,
    ratingCount: "1.1k",
    image: teardropPendantNecklace,
  },
  {
    id: "bracelet-1",
    title: "Chain-Link Bracelet",
    brand,
    price: "$109",
    rating: 4,
    ratingCount: "487",
    image: chainLinkBracelet,
  },
];

const pendants: CommerceProduct[] = [
  {
    id: "pendant-2-1",
    title: "Rose Gold Teardrop Pendant",
    brand,
    price: "$135",
    rating: 5,
    ratingCount: "860",
    image: roseGoldTeardropPendant,
  },
  {
    id: "pendant-2-2",
    title: "Rose Gold Halo Pendant",
    brand,
    price: "$149",
    rating: 5,
    ratingCount: "402",
    image: roseGoldHaloPendant,
  },
  {
    id: "pendant-2-3",
    title: "Rose Gold Bar Pendant",
    brand,
    price: "$119",
    rating: 4,
    ratingCount: "275",
    image: roseGoldBarPendant,
  },
];

const chains: CommerceProduct[] = [
  {
    id: "chain-1",
    title: "Rose Gold Fine Box Chain",
    brand,
    price: "$59",
    rating: 5,
    ratingCount: "930",
    tag: "Most paired",
    image: roseGoldFineBoxChain,
  },
  {
    id: "chain-2",
    title: "Rose Gold Snake Chain",
    brand,
    price: "$65",
    rating: 4,
    ratingCount: "214",
    image: roseGoldSnakeChain,
  },
  {
    id: "chain-3",
    title: "Rose Gold Curb Chain",
    brand,
    price: "$72",
    rating: 4,
    ratingCount: "158",
    image: roseGoldCurbChain,
  },
];

/* Homepage doc, "Sell: Conversational interface", verbatim. */
const turns: Turn[] = [
  {
    userMessage: "I need something for my wife's birthday. She has expensive taste. Unfortunately, my budget doesn't.",
    assistantMessage: "I can work with that. I found three options that feel considerably more expensive than they are.",
    products: firstPicks,
  },
  {
    userMessage: "I like the middle one, show me more styles but in a rose gold.",
    assistantMessage: "That’s a lovely shade, here they are.",
    products: pendants,
  },
  {
    userMessage: "Add the first one to my cart.",
    assistantMessage: "Done, want to pair it with something else too?",
    singleCard: pendants[0],
  },
  {
    userMessage: "A matching chain?",
    assistantMessage: "Here are options that match the style of the pendant. I’d go with #1.",
    products: chains,
  },
  {
    userMessage: "Done, add that too.",
    // The doc ends on the shopper's line; this confirmation is the only reply not in it.
    assistantMessage: "Added. Both are in your cart.",
    singleCard: chains[0],
  },
];

const hasCards = (turn: Turn) => !!(turn.products?.length || turn.singleCard);

/** Reading time before the next turn: longer replies and product rows hold longer. */
function pauseDuration(turn: Turn) {
  const base = 350 + Math.min(turn.assistantMessage.length * 3, 500);
  return turn.products?.length ? base + 500 : base;
}

function useConversation(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("composing");
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    if (!play || reduced || turnIndex >= turns.length) return;
    const turn = turns[turnIndex];
    const timers = phaseTimers();

    if (phase === "composing") {
      const cancel = typeText(turn.userMessage, {
        msPerStep: 26,
        onTick: setComposerValue,
        onDone: () =>
          timers.after(220, () => {
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          }),
      });
      return () => {
        cancel();
        timers.clear();
      };
    }
    if (phase === "thinking") {
      timers.after(300, () => setStatusLabel(hasCards(turn) ? "Finding the right options" : "Reading your ask"));
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") {
      timers.after(150, () => setPhase("replying"));
    } else if (phase === "replying") {
      timers.after(replyDuration(turn.assistantMessage), () => {
        if (hasCards(turn)) {
          setProductsLoading(true);
          setPhase("productsLoading");
        } else setPhase("pausing");
      });
    } else if (phase === "productsLoading") {
      timers.after(550, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
    } else if (phase === "pausing") {
      timers.after(pauseDuration(turn), () => {
        setTurnIndex((i) => i + 1);
        setPhase("composing");
      });
    }
    return timers.clear;
  }, [play, reduced, turnIndex, phase]);

  return {
    turnIndex: reduced ? turns.length : turnIndex,
    phase,
    composerValue,
    composerTyping: play && phase === "composing",
    statusLabel,
    productsLoading,
    reduced,
  };
}

export function GiftJourney({ play }: { play: boolean }) {
  const { turnIndex, phase, composerValue, composerTyping, statusLabel, productsLoading, reduced } =
    useConversation(play);
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, `${turnIndex}-${phase}-${productsLoading}`, reduced);

  const composing = turnIndex < turns.length && phase === "composing";

  return (
    <ChatShell
      brand={brand}
      width={550}
      height={520}
      composerValue={composing && composerValue ? composerValue : undefined}
      composerTyping={composing && composerTyping}
      viewportRef={viewportRef}
    >
      <Thread>
        {turns.map((turn, i) => {
          const past = i < turnIndex;
          const current = i === turnIndex;
          const entering = current && phase !== "composing";
          if (!past && !entering) return null;
          const thinking = current && (phase === "thinking" || phase === "thinkingExit");
          const showReply = past || (current && !thinking);
          const showCards = past || (current && (phase === "productsLoading" || phase === "pausing"));
          const loading = current && phase === "productsLoading";
          return (
            <Fragment key={i}>
              <UserTurn animateIn={entering}>
                <ChatMessage role="user">{turn.userMessage}</ChatMessage>
              </UserTurn>
              <AssistantTurn animateIn={entering}>
                {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                {showReply && (
                  <ChatMessage role="assistant">
                    <StaggerText text={turn.assistantMessage} />
                  </ChatMessage>
                )}
                {showCards && turn.products && (
                  <ProductCollection>
                    {turn.products.map((product, p) => (
                      <CommerceCard key={product.id} product={product} loading={loading} resolveDelayMs={p * 80} />
                    ))}
                  </ProductCollection>
                )}
                {showCards && turn.singleCard && <CommerceCard product={turn.singleCard} added loading={loading} />}
              </AssistantTurn>
            </Fragment>
          );
        })}
      </Thread>
    </ChatShell>
  );
}
