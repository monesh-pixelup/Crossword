import { useEffect, useRef, useState } from "react";
import { revealText } from "../../../components/ill/revealText";

export type SupportMotionPhase = "composing" | "thinking" | "thinkingExit" | "replying" | "resultLoading" | "done";

const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_EXIT_MS = 150;
// Same per-character pace GiftJourneyMotion uses for every turn's
// composer, so a scenario here doesn't read at a different "speed" than
// the rest of the kit's motion set.
const CHAR_INTERVAL_MS = 26;
// Must match StaggerText.css's per-word delay/duration — the reply phase
// advances once the word cascade has actually finished playing.
const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const RESULT_SKELETON_HOLD_MS = 550;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function replyRevealMs(text: string) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return wordCount * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}

// Shared sequencer for all six Support V3 Motion scenarios — each one is
// a single exchange (one user message, one assistant reply, one result
// panel), so this is GiftJourneyMotion's own phase shape with the
// per-turn loop removed and "productsLoading"/"pausing" renamed to this
// scenario's own "resultLoading" → "done" (every Support V3 result lives
// inside SupportPanel, never a product collection). Presentational
// components (AiStatus, StaggerText, SupportPanel's `loading`) take the
// phase's derived props and own no timers themselves.
//
// `active` (from `useLandedOnScreen`) gates the whole thing on the
// viewer having actually landed on the scenario — in view AND the tab
// focused. While inactive, no phase timer runs; each inactive→active
// transition restarts from "composing" (or straight to "done" under
// reduced motion) rather than resuming mid-flight, so looking away and
// back always replays the full exchange. Once "done" is reached the
// sequence simply stops — no loop — and the shell's own viewport stays
// scrollable throughout, per the shell's default overflow behaviour.
export function useSupportMotionPlayback({
  userMessage,
  assistantMessage,
  thinkingLabel,
  active,
}: {
  userMessage: string;
  assistantMessage: string;
  // Second-stage "Thinking" label — content-aware, e.g. "Checking your
  // shipment" — same two-stage convention GiftJourneyMotion/
  // DynamicLandingPageMotion already use.
  thinkingLabel: string;
  active: boolean;
}) {
  const reducedMotion = useRef(prefersReducedMotion()).current;

  const [phase, setPhase] = useState<SupportMotionPhase>(reducedMotion ? "done" : "composing");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  const [resultLoading, setResultLoading] = useState(false);
  // Bumped on every landing (including the first) — the user/assistant
  // turns are already gated behind `phase`, so they naturally unmount
  // and remount (replaying their own `animateIn` entrance) on restart
  // without needing a remount key of their own; this is only exposed in
  // case a scenario's own markup needs one too.
  const [runKey, setRunKey] = useState(0);

  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setPhase("composing");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setResultLoading(false);
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!active) return;
    if (phase === "done") return;

    const timeouts: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(userMessage, {
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
      after(THINKING_STAGE_1_MS, () => setStatusLabel(thinkingLabel));
      after(THINKING_STAGE_1_MS + THINKING_STAGE_2_MS, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    // A brief gap where AiStatus fades out (via its own `visible` prop)
    // before the reply starts — an abrupt unmount would sever the
    // spatial continuity from "thinking" to "replying".
    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    // The reply mounts in full immediately — StaggerText (a CSS-only,
    // one-shot word cascade) owns the actual reveal. This phase just
    // waits for that cascade to finish before the panel starts
    // skeleton-loading.
    if (phase === "replying") {
      after(replyRevealMs(assistantMessage), () => {
        setResultLoading(true);
        setPhase("resultLoading");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "resultLoading") {
      after(RESULT_SKELETON_HOLD_MS, () => {
        setResultLoading(false);
        setPhase("done");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    return undefined;
  }, [phase, active, reducedMotion, userMessage, assistantMessage, thinkingLabel]);

  return {
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    resultLoading,
    reducedMotion,
    runKey,
    // The user turn is "sent" (and so enters the thread) once composing
    // has finished — mirrors GiftJourneyMotion's own isSent logic for a
    // single turn instead of an array.
    turnSent: phase !== "composing",
    showThinking: phase === "thinking" || phase === "thinkingExit",
    showReply: phase !== "composing" && phase !== "thinking" && phase !== "thinkingExit",
  };
}
