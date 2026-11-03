import { Fragment, useEffect, useRef, useState } from "react";
import { SceneFrame } from "../../components/ill/SceneFrame";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import {
  useConversationPlayback,
  REPLY_STAGGER_MS,
  PRODUCTS_SKELETON_HOLD_MS,
  type PlaybackTurn,
} from "../GiftJourneyMotion/useConversationPlayback";
import { ChatHead, ChatFoot, Rail, ProductCard, Followups, tappedChip } from "./GiftJourneyV2";
import {
  turn1,
  firstPicks,
  turn2,
  pendants,
  turn3,
  addedPendant,
  turn4,
  chains,
  turn5,
  addedChain,
} from "../GiftJourney/data";

const turns: (PlaybackTurn & { followups: string[] })[] = [
  { userMessage: turn1.userMessage, assistantMessage: turn1.assistantMessage, followups: turn1.followups, products: firstPicks },
  { userMessage: turn2.userMessage, assistantMessage: turn2.assistantMessage, followups: turn2.followups, products: pendants },
  { userMessage: turn3.userMessage, assistantMessage: turn3.assistantMessage, followups: turn3.followups, singleCard: addedPendant },
  { userMessage: turn4.userMessage, assistantMessage: turn4.assistantMessage, followups: turn4.followups, products: chains },
  { userMessage: turn5.userMessage, assistantMessage: turn5.assistantMessage, followups: turn5.followups, singleCard: addedChain },
];

// Product wait lines (_think-lines.ts / ARR card waits). The shared
// sequencer thinks for only ~800ms, under half of one 2s product roll, so
// each turn holds a single line rather than swapping mid-glide.
export const WAIT_FIRST = "Thinking…";
export const WAIT_CARDS = "Fetching the product…";
// The sequencer's own per-word wait drives the CSS stream too, so the
// pause before the cards never drifts on a long reply (product: 42ms).
const WORD_STAGGER_MS = REPLY_STAGGER_MS;
// The CTA lifecycle starts once the skeleton has cleared.
const SKELETON_HOLD_MS = PRODUCTS_SKELETON_HOLD_MS;
// The transcript's own bottom mask is 24px; keep the latest turn clear of it.
export const FADE_CLEARANCE = 32;

// 01 — motion version of GiftJourneyV2, driven by GiftJourneyMotion's own
// sequencer (useConversationPlayback, unchanged) with the product's
// motion values from STORYBOOK_MAPPING.md: composer typing with the send
// disc arming, user bubble pop (0.42s overshoot from scale .5), the
// spark + shimmer-swept wait line, AI reply streamed word by word (42ms,
// 0.4s fade), card-shaped skeletons resolving 80ms apart, and the lone
// card's Adding… → Added CTA lifecycle.
// Gated on actually being seen: the sequence starts when the visual lands
// on screen (in view, tab focused) and restarts from the first beat on
// every new landing, instead of finishing unseen below the fold.
export function GiftJourneyV2Motion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const [landing, setLanding] = useState(0);
  useEffect(() => {
    if (landed) setLanding((n) => n + 1);
  }, [landed]);

  return (
    <div ref={rootRef}>
      {landing > 0 ? <Conversation key={landing} /> : <SceneFrame><div className="gj2-win" /></SceneFrame>}
    </div>
  );
}

// The conversation itself (the shared sequencer driving the product
// window). `sheet` renders it as the mobile bottom sheet (with its grab
// pill) for GiftJourneyMobileMotion, outside any SceneFrame; unset, it's the
// desktop window in the SceneFrame.
export function Conversation({ sheet = false }: { sheet?: boolean } = {}) {
  const { turnIndex, phase, composerValue, productsLoading, reducedMotion } =
    useConversationPlayback(turns);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // A manual scroll pauses the follow-the-turn scroll until the next turn,
  // so the viewer isn't yanked back mid-read.
  const userScrolledRef = useRef(false);
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    const mark = () => {
      userScrolledRef.current = true;
    };
    viewport.addEventListener("wheel", mark, { passive: true });
    viewport.addEventListener("touchmove", mark, { passive: true });
    return () => {
      viewport.removeEventListener("wheel", mark);
      viewport.removeEventListener("touchmove", mark);
    };
  }, []);
  useEffect(() => {
    userScrolledRef.current = false;
  }, [turnIndex]);

  useEffect(() => {
    if (userScrolledRef.current) return;
    const viewport = transcriptRef.current;
    const target = viewport?.lastElementChild;
    if (!viewport || !target) return;
    // Rects in the viewport's own CSS px: the site zooms each visual to fit
    // its panel, and getBoundingClientRect reports zoomed values while
    // scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
    const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
    const viewportRect = { bottom: viewport.getBoundingClientRect().bottom / zoom };
    const targetRect = { bottom: target.getBoundingClientRect().bottom / zoom };
    if (targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE) return;
    const top = viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
    if (reducedMotion) viewport.scrollTop = top;
    else animateScrollTo(viewport, top);
  }, [turnIndex, phase, productsLoading, reducedMotion]);

  const composing = turnIndex < turns.length && phase === "composing";
  // A turn whose message is one of the previous reply's chips is a tap:
  // the chip presses while the sequencer's compose beat runs, and nothing
  // is typed into the composer.
  const tapping = composing && Boolean(tappedChip(turns[turnIndex - 1]?.followups, turns[turnIndex]?.userMessage));

  const win = (
      <div className={sheet ? "gj2-win gjm-sheet" : "gj2-win"}>
        {sheet && <span className="gjm-grab" aria-hidden="true" />}
        <ChatHead />
        <div className="gj2-transcript gj2-transcript--scroll" ref={transcriptRef}>
          {turns.map((turn, i) => {
            const isPast = i < turnIndex;
            const isSent = i === turnIndex && phase !== "composing";
            if (!isPast && !isSent) return null;
            const isCurrent = i === turnIndex;
            const thinking = isCurrent && (phase === "thinking" || phase === "thinkingExit");
            const showReply = isPast || (isCurrent && !thinking);
            const showCards = isPast || (isCurrent && (phase === "productsLoading" || phase === "pausing"));
            const cardsLoading = isCurrent && phase === "productsLoading";
            const hasCards = Boolean(turn.products?.length || turn.singleCard);
            const animate = !reducedMotion;
            // Offered once the reply has fully landed (cards resolved), and kept.
            const showFollowups = isPast || (isCurrent && phase === "pausing");

            return (
              <Fragment key={i}>
                <p className={`gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`}>{turn.userMessage}</p>
                {thinking && (
                  <div className={phase === "thinkingExit" ? "gj2-think gj2-think--out" : "gj2-think gj2-in-ai"}>
                    <span className="gj2-think__mark"><SparkGlyph /></span>
                    <span className="gj2-think__window">
                      <span className="gj2-think__line">{hasCards ? WAIT_CARDS : WAIT_FIRST}</span>
                    </span>
                  </div>
                )}
                {showReply && <StreamedReply text={turn.assistantMessage} animate={animate} />}
                {showCards && turn.products && (
                  <div className={animate ? "gj2-rise" : undefined}>
                    <Rail products={turn.products} loading={cardsLoading} />
                  </div>
                )}
                {showCards && turn.singleCard && (
                  <div className={animate ? "gj2-rise" : undefined}>
                    <ProductCard
                      product={turn.singleCard}
                      added
                      lone
                      loading={cardsLoading}
                      adding={animate}
                      addingDelayMs={SKELETON_HOLD_MS}
                    />
                  </div>
                )}
                {showFollowups && (
                  <Followups
                    items={turn.followups}
                    picked={turnIndex > i ? tappedChip(turn.followups, turns[i + 1]?.userMessage) : undefined}
                    className={[animate && "gj2-followups--in", animate && tapping && turnIndex === i + 1 && "gj2-followups--tap"].filter(Boolean).join(" ") || undefined}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        <ChatFoot value={composing && !tapping && composerValue ? composerValue : undefined} />
      </div>
  );
  return sheet ? win : <SceneFrame>{win}</SceneFrame>;
}

export function StreamedReply({ text, animate }: { text: string; animate: boolean }) {
  if (!animate) return <p className="gj2-msg gj2-msg--ai">{text}</p>;
  const words = text.split(" ");
  return (
    <p className="gj2-msg gj2-msg--ai">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="gj2-word" style={{ animationDelay: `${i * WORD_STAGGER_MS}ms` }}>{word}</span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}

// Four-point spark standing in for the product's Loader6 mark.
export function SparkGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5z" />
    </svg>
  );
}
