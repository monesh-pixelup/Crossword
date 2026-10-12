"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import lTheanineMagnesium from "../../assets/motion/l-theanine-magnesium.webp";
import magnesiumGlycinate from "../../assets/motion/magnesium-glycinate.webp";
import valerianRoot from "../../assets/motion/valerian-root-extract.webp";
import { phaseTimers, replyDuration, typeText, useFollowLatest, usePrefersReducedMotion, useSkeleton } from "./motion";
import {
  AiStatus,
  AssistantTurn,
  ChatMessage,
  ChatShell,
  Icon,
  Media,
  ProductCollection,
  RecCard,
  type RecProduct,
  Skeleton,
  StaggerText,
  Thread,
  UserTurn,
} from "./primitives";

/*
 * 03b · Sell: search bar. A sleep-aid search that answers like a person:
 * melatonin-free picks, then a side-by-side of the two simplest.
 */

type Comparison = {
  id: string;
  title: string;
  price: string;
  goodFor: string;
  format: string;
  image: RecProduct["image"];
};

type Turn = {
  userMessage: string;
  assistantMessage: string;
  latencySeconds: number;
  recommendations?: RecProduct[];
  comparisons?: Comparison[];
};

type Phase = "composing" | "thinking" | "thinkingExit" | "replying" | "productsLoading" | "pausing";

const brand = "MAREN";

const turns: Turn[] = [
  {
    userMessage: "Need something for better sleep. Don't want melatonin.",
    latencySeconds: 43,
    assistantMessage:
      "Sure. Here are a few melatonin-free options. Want me to narrow them down by ingredients, format or price?",
    recommendations: [
      { id: "magnesium-glycinate", name: "Magnesium Glycinate", image: magnesiumGlycinate },
      { id: "l-theanine-magnesium", name: "L-Theanine + Magnesium", image: lTheanineMagnesium },
      { id: "valerian-root", name: "Valerian Root Extract", image: valerianRoot },
    ],
  },
  {
    userMessage: "Ingredients. And nothing too complicated.",
    latencySeconds: 31,
    assistantMessage: "Then I'd start with these two. Here's what's in each and how they differ.",
    comparisons: [
      {
        id: "magnesium-glycinate",
        title: "Magnesium Glycinate",
        price: "$24",
        goodFor: "Relaxation & winding down",
        format: "Capsules",
        image: magnesiumGlycinate,
      },
      {
        id: "l-theanine-magnesium",
        title: "L-Theanine + Magnesium",
        price: "$32",
        goodFor: "Stress-related sleep support",
        format: "Gummies",
        image: lTheanineMagnesium,
      },
    ],
  },
];

/** "Worked for 43s": how long the assistant spent on the answer. */
function LatencyLine({ seconds }: { seconds: number }) {
  return (
    <p className="ill-latency-line ill-latency-line--enter">
      Worked <span className="ill-latency-line__duration">for {seconds}s</span>
    </p>
  );
}

function ComparisonCard({
  product,
  loading,
  resolveDelayMs,
}: {
  product: Comparison;
  loading: boolean;
  resolveDelayMs: number;
}) {
  const skeleton = useSkeleton(loading);
  const rows = [
    ["Good for", product.goodFor],
    ["Format", product.format],
    ["Price", product.price],
  ];
  return (
    <div className="ill-ss-comparison-card">
      <div className="ill-ss-comparison-card__media">
        <Media src={product.image} />
        <div className="ill-ss-comparison-card__favorite" aria-hidden>
          <Icon name="favorite" />
        </div>
      </div>
      <p className="ill-ss-comparison-card__title">{product.title}</p>
      <div className="ill-ss-comparison-card__attributes">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`ill-ss-comparison-card__row${i === rows.length - 1 ? " ill-ss-comparison-card__row--last" : ""}`}
          >
            <span className="ill-ss-comparison-card__label">{label}</span>
            <span className="ill-ss-comparison-card__value">{value}</span>
          </div>
        ))}
      </div>
      {skeleton.mounted && (
        <div
          className={`ill-ss-comparison-card__skeleton-overlay${skeleton.hidden ? " ill-ss-comparison-card__skeleton-overlay--hidden" : ""}`}
          style={resolveDelayMs ? { transitionDelay: `${resolveDelayMs}ms` } : undefined}
        >
          <div className="ill-ss-comparison-card__media">
            <Skeleton height={138} radius={9} />
          </div>
          <Skeleton width="55%" height={11} radius={4} />
          <div className="ill-ss-comparison-card__rows-skeleton">
            <Skeleton height={14} radius={4} />
            <Skeleton height={14} radius={4} />
            <Skeleton height={14} radius={4} />
          </div>
        </div>
      )}
    </div>
  );
}

const cardCount = (turn: Turn) => turn.recommendations?.length ?? turn.comparisons?.length ?? 0;

/** Reading time before the next turn; comparisons hold longest. */
function pauseDuration(turn: Turn) {
  const base = 400 + Math.min(turn.assistantMessage.length * 3, 500);
  return base + (cardCount(turn) ? 500 : 0) + (turn.comparisons ? 700 : 0);
}

function useConversation(play: boolean) {
  const reduced = usePrefersReducedMotion();
  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("composing");
  const [composerValue, setComposerValue] = useState("");
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [latencyVisible, setLatencyVisible] = useState(false);
  const [replyTextVisible, setReplyTextVisible] = useState(false);
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
      timers.after(300, () =>
        setStatusLabel(turn.comparisons ? "Comparing ingredients" : "Finding the right options"),
      );
      timers.after(800, () => setPhase("thinkingExit"));
    } else if (phase === "thinkingExit") {
      timers.after(150, () => {
        setLatencyVisible(true);
        setPhase("replying");
      });
    } else if (phase === "replying") {
      timers.after(200, () => setReplyTextVisible(true));
      timers.after(200 + replyDuration(turn.assistantMessage), () => {
        setProductsLoading(true);
        setPhase("productsLoading");
      });
    } else if (phase === "productsLoading") {
      timers.after(550, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
    } else if (phase === "pausing") {
      timers.after(pauseDuration(turn), () => {
        setLatencyVisible(false);
        setReplyTextVisible(false);
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
    latencyVisible,
    replyTextVisible,
    productsLoading,
    reduced,
  };
}

export function SleepSearch({ play }: { play: boolean }) {
  const {
    turnIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    latencyVisible,
    replyTextVisible,
    productsLoading,
    reduced,
  } = useConversation(play);
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(
    viewportRef,
    `${turnIndex}-${phase}-${latencyVisible}-${replyTextVisible}-${productsLoading}`,
    reduced,
  );

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
          const showCards = past || (current && (phase === "productsLoading" || phase === "pausing"));
          const loading = current && phase === "productsLoading";
          return (
            <Fragment key={i}>
              <UserTurn animateIn={entering}>
                <ChatMessage role="user">{turn.userMessage}</ChatMessage>
              </UserTurn>
              <AssistantTurn animateIn={entering}>
                {thinking && <AiStatus label={statusLabel} visible={phase === "thinking"} />}
                {(past || (current && latencyVisible)) && <LatencyLine seconds={turn.latencySeconds} />}
                {(past || (current && replyTextVisible)) && (
                  <ChatMessage role="assistant">
                    <StaggerText text={turn.assistantMessage} />
                  </ChatMessage>
                )}
                {showCards && turn.recommendations && (
                  <ProductCollection>
                    {turn.recommendations.map((product, p) => (
                      <RecCard key={product.id} product={product} loading={loading} resolveDelayMs={p * 80} />
                    ))}
                  </ProductCollection>
                )}
                {showCards && turn.comparisons && (
                  <div className="ill-ss-comparison-row">
                    <ProductCollection>
                      {turn.comparisons.map((product, p) => (
                        <ComparisonCard key={product.id} product={product} loading={loading} resolveDelayMs={p * 80} />
                      ))}
                    </ProductCollection>
                  </div>
                )}
              </AssistantTurn>
            </Fragment>
          );
        })}
      </Thread>
    </ChatShell>
  );
}
