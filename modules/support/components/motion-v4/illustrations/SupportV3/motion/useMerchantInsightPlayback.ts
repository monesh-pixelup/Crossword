import { useEffect, useRef, useState } from "react";
import { revealText } from "../../../components/ill/revealText";

// Support V3 Motion / 08 — Merchant insight. Two turns, not one: unlike
// every other Support V3 Motion scenario (useSupportMotionPlayback, a
// single exchange), this brief asks for a second human turn that skips
// the composer entirely ("appears directly as a bubble... do not bring
// the composer back") — so this is its own small sequencer rather than
// a second call to that hook, structured the same way (a flat phase
// state machine, presentational components own no timers) but looped
// over two turns, the second with its composer beats removed.
export type MerchantInsightPhase =
  | "composerEnter"
  | "composing"
  | "sending"
  | "turnEnter"
  | "thinking"
  | "thinkingExit"
  | "replying"
  | "pausing"
  | "done";

interface Turn {
  userMessage: string;
  assistantMessage: string;
  thinkingLabel: string;
  // Turn 2 only — brief's 8d: the follow-up lands as a bubble directly,
  // the composer never reappears for it.
  skipComposer?: boolean;
}

// Must match .ill-chat-composer--expanded's own entrance transition
// duration (ChatComposer.css) — 200ms, trimmed further for a snappier
// overall feel (emil-design-eng's duration table, low end of the
// modals/drawers band).
const COMPOSER_ENTER_MS = 200;
// Half the kit's shared 26ms/char default (GiftJourneyMotion,
// useSupportMotionPlayback) — scoped to this scenario only, not a
// change to that shared constant. At 26ms/char, this turn's ~68-char
// message took ~1.8s to type out before anything conversational even
// starts; for a passive viewer (not the person typing) that read as
// dead time, not feedback — emil-animations review, finding #2.
const CHAR_INTERVAL_MS = 14;
// Must match .ill-chat-composer--expanded--hidden's own exit transition
// duration (ChatComposer.css) — 140ms, clearly faster than the 200ms
// entrance (emil-design-eng's "make exit faster than enter").
const SENDING_MS = 140;
// The bubble's own 180ms entrance (.ill-user-turn--enter's local
// override) now starts the instant "sending" begins, not after it ends
// (see the component's isSent calc) — a true crossfade with the
// composer's 140ms exit rather than a sequential cut. By the time
// "sending" finishes, the bubble is already 140ms into its 180ms
// entrance, so this phase only needs to cover the remaining ~40ms plus
// a small settle buffer, not the bubble's full duration again.
const TURN_ENTER_MS = 60;
const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_EXIT_MS = 150;
// Must match .ill-insight-reply-enter's own transition duration
// (MerchantInsightMotion.css, trimmed to 180ms for a snappier feel)
// plus a small settle buffer — this scenario's reply is a single block
// fade, not StaggerText's per-word cascade, so the "replying" phase only
// needs to wait for that one transition to finish (crossword-chat-motion's
// own pacing note: "the phase just waits for it to finish"), not a
// word-count formula sized for a cascade that isn't playing here.
const REPLY_FADE_MS = 180;
const REPLY_SETTLE_MS = 150;
// Scaled by reply length, same shape as GiftJourneyMotion's own
// pauseMs() — crossword-chat-motion's note: "Pause before the next
// turn: scaled by reply length... people need more time to read a
// longer result." Replaces the earlier flat 700ms, which gave the
// ~235-character context reply the same read time as a one-line reply.
const BETWEEN_TURNS_PAUSE_BASE_MS = 350;
const BETWEEN_TURNS_PAUSE_PER_CHAR_MS = 3;
const BETWEEN_TURNS_PAUSE_CAP_MS = 500;
// Brief's 8e — hold the completed conversation for 2 seconds before
// settling into "done".
const FINAL_HOLD_MS = 2000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pauseAfterReplyMs(text: string) {
  return (
    BETWEEN_TURNS_PAUSE_BASE_MS + Math.min(text.length * BETWEEN_TURNS_PAUSE_PER_CHAR_MS, BETWEEN_TURNS_PAUSE_CAP_MS)
  );
}

export function useMerchantInsightPlayback(turns: readonly Turn[], active: boolean) {
  const reducedMotion = useRef(prefersReducedMotion()).current;

  const [turnIndex, setTurnIndex] = useState(reducedMotion ? turns.length : 0);
  const [phase, setPhase] = useState<MerchantInsightPhase>(reducedMotion ? "done" : "composerEnter");
  const [composerValue, setComposerValue] = useState("");
  const [composerTyping, setComposerTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Thinking");
  // Bumped on every landing, including the first — exposed so the
  // component can key its remountable bits (the composer card, the
  // turns) to replay their own entrances on each restart.
  const [runKey, setRunKey] = useState(0);

  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setTurnIndex(0);
      setPhase("composerEnter");
      setComposerValue("");
      setComposerTyping(false);
      setStatusLabel("Thinking");
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (!active) return;
    if (phase === "done") return;
    if (turnIndex >= turns.length) return;

    const turn = turns[turnIndex];
    const timeouts: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    if (phase === "composerEnter") {
      if (turn.skipComposer) {
        setPhase("turnEnter");
        return undefined;
      }
      after(COMPOSER_ENTER_MS, () => setPhase("composing"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "composing") {
      setComposerTyping(true);
      setComposerValue("");
      const cancel = revealText(turn.userMessage, {
        msPerStep: CHAR_INTERVAL_MS,
        onTick: setComposerValue,
        onDone: () => {
          after(220, () => setPhase("sending"));
        },
      });
      return () => {
        cancel();
        timeouts.forEach(window.clearTimeout);
      };
    }

    // Composer plays its own fade-and-settle exit (ChatComposer's
    // `visible=false`) while the send button plays a one-shot press —
    // this phase just holds long enough for that exit to finish before
    // the bubble enters, per the brief's "do not morph the composer
    // into the message bubble" (sequential, not a shared-element swap).
    if (phase === "sending") {
      after(SENDING_MS, () => {
        setComposerTyping(false);
        setComposerValue("");
        setPhase("turnEnter");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    // The human turn's own bubble entrance (UserTurn's animateIn,
    // locally tuned to 300ms) — this phase just waits for it to settle
    // before the assistant starts thinking.
    if (phase === "turnEnter") {
      after(TURN_ENTER_MS, () => {
        setStatusLabel("Thinking");
        setPhase("thinking");
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "thinking") {
      after(THINKING_STAGE_1_MS, () => setStatusLabel(turn.thinkingLabel));
      after(THINKING_STAGE_1_MS + THINKING_STAGE_2_MS, () => setPhase("thinkingExit"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "thinkingExit") {
      after(THINKING_EXIT_MS, () => setPhase("replying"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "replying") {
      after(REPLY_FADE_MS + REPLY_SETTLE_MS, () => setPhase("pausing"));
      return () => timeouts.forEach(window.clearTimeout);
    }

    if (phase === "pausing") {
      const isLastTurn = turnIndex === turns.length - 1;
      after(isLastTurn ? FINAL_HOLD_MS : pauseAfterReplyMs(turn.assistantMessage), () => {
        if (isLastTurn) {
          setPhase("done");
        } else {
          setTurnIndex((n) => n + 1);
          setPhase("composerEnter");
        }
      });
      return () => timeouts.forEach(window.clearTimeout);
    }

    return undefined;
  }, [turnIndex, phase, active, reducedMotion, turns]);

  return {
    turnIndex,
    phase,
    composerValue,
    composerTyping,
    statusLabel,
    reducedMotion,
    runKey,
  };
}
