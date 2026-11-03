import { useEffect, useRef, useState } from "react";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import { revealText } from "../../components/ill/revealText";

export interface PlaybackTurn {
  userMessage: string;
  assistantMessage: string;
  products?: CommerceProduct[];
  singleCard?: CommerceProduct;
}

type Phase = "composing" | "thinking" | "thinkingExit" | "replying" | "productsLoading" | "pausing";

const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_EXIT_MS = 150;
// Same per-character pace for every turn's composer, first or fifth.
const CHAR_INTERVAL_MS = 26;
// Must match StaggerText.css's per-word delay/duration — the reply phase
// advances once the word cascade has actually finished playing.
export const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
export const PRODUCTS_SKELETON_HOLD_MS = 550;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function replyRevealMs(text: string) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return wordCount * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}

function pauseMs(turn: PlaybackTurn) {
  const base = 350 + Math.min(turn.assistantMessage.length * 3, 500);
  return turn.products?.length ? base + 500 : base;
}

// Owns the whole conversation's timing — which turn is active, what phase
// it's in, the composer's typed value, the status label, and how much of
// the reply has streamed in. Every animated primitive this drives
// (AiStatus, ChatComposer, ChatMessage, CommerceProductCard) is purely
// presentational; this hook is the only place that schedules anything.
export function useConversationPlayback(turns: PlaybackTurn[]) {
  const reducedMotion = useRef(prefersReducedMotion()).current;

  const [turnIndex, setTurnIndex] = useState(reducedMotion ? turns.length : 0);
  const [phase, setPhase] = useState<Phase>("composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (turnIndex >= turns.length) return;

    const turn = turns[turnIndex];
    const timeouts: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(turn.userMessage, {
        msPerStep: CHAR_INTERVAL_MS,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => {
            setComposerTyping(false);
            setComposerValue("");
            setStatusLabel("Thinking");
            setPhase("thinking");
          });
        },
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }

    if (phase === "thinking") {
      const hasProducts = Boolean(turn.products?.length || turn.singleCard);
      after(THINKING_STAGE_1_MS, () => {
        setStatusLabel(hasProducts ? "Finding the right options" : "Reading your ask");
      });
      after(THINKING_STAGE_1_MS + THINKING_STAGE_2_MS, () => {
        setPhase("thinkingExit");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    // A brief gap where AiStatus fades out (via its own `visible` prop)
    // before the reply starts — an abrupt unmount would sever the
    // spatial continuity from "thinking" to "replying".
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS, () => {
        setPhase("replying");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    // The reply mounts in full immediately — StaggerText (a CSS-only,
    // one-shot word cascade) owns the actual reveal. This phase just
    // waits for that cascade to finish before advancing.
    if (phase === "replying") {
      after(replyRevealMs(turn.assistantMessage), () => {
        if (turn.products?.length || turn.singleCard) {
          setProductsLoading(true);
          setPhase("productsLoading");
        } else {
          setPhase("pausing");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "productsLoading") {
      after(PRODUCTS_SKELETON_HOLD_MS, () => {
        setProductsLoading(false);
        setPhase("pausing");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "pausing") {
      after(pauseMs(turn), () => {
        setTurnIndex((n) => n + 1);
        setPhase("composing");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    return undefined;
  }, [turnIndex, phase, reducedMotion]);

  return {
    turnIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    productsLoading,
    reducedMotion,
    done: turnIndex >= turns.length,
  };
}
