import { useEffect, useMemo, useRef, useState } from "react";
import { revealText } from "../../components/ill/revealText";

// One conversation as a flat, ordered list of beats. A scenario declares
// its beats once (module-level const) and renders against the returned
// Timeline — which beats have been reached, which one is playing — so
// every scenario in the Sell: Conversational Interface motion set shares
// the same pacing and none of them owns a timer.
export type Beat =
  // The shopper's message typed into the composer; the turn is "sent"
  // (passed) once typing finishes. Without `text` it's a short hold — for
  // a turn that's an upload, not typed words. `leadMs` overrides the
  // default pause before typing starts (for a compose beat that follows
  // an intro rather than an earlier turn).
  | { id: string; type: "compose"; text?: string; holdMs?: number; leadMs?: number }
  // The AI status row. One label holds ~600ms; two labels play the kit's
  // usual "Thinking" -> content-aware second label.
  | { id: string; type: "think"; labels: [string] | [string, string] }
  // An assistant reply cascading in word by word (StaggerText); the beat
  // lasts as long as the cascade does.
  | { id: string; type: "text"; text: string }
  // Something entering (insight, a row, a context strip) and settling.
  | { id: string; type: "appear"; ms?: number }
  // Result content mounted already covered by its skeleton, resolving
  // when the beat ends.
  | { id: string; type: "load"; ms?: number }
  | { id: string; type: "pause"; ms: number };

const THINKING_STAGE_1_MS = 300;
const THINKING_STAGE_2_MS = 500;
const THINKING_SINGLE_MS = 600;
const THINKING_EXIT_MS = 150;
// Same per-character pace for every scenario's composer — uniform across
// the whole kit's motion set.
const CHAR_INTERVAL_MS = 26;
// Must match StaggerText.css's per-word delay/duration — a text beat ends
// once the word cascade has actually finished playing.
const REPLY_STAGGER_MS = 45;
const REPLY_WORD_ANIM_MS = 220;
const REPLY_SETTLE_MS = 150;
const APPEAR_MS = 450;
const LOAD_MS = 650;
const FIRST_COMPOSE_LEAD_MS = 350;
const NEXT_COMPOSE_LEAD_MS = 900;
const SENT_SETTLE_MS = 220;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function wordCount(text: string) {
  return text.replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
}

function replyRevealMs(text: string) {
  return wordCount(text) * REPLY_STAGGER_MS + REPLY_WORD_ANIM_MS + REPLY_SETTLE_MS;
}

export interface Timeline {
  // Reached = this beat has started (content gated on it mounts now).
  reached: (id: string) => boolean;
  // Passed = this beat has finished (a compose beat's turn is "sent").
  passed: (id: string) => boolean;
  // True only while the named `load` beat is playing.
  loading: (id: string) => boolean;
  // Non-null only while the named `think` beat is playing; `visible`
  // flips false for its exit fade, before the beat ends.
  status: (id: string) => { label: string; visible: boolean } | null;
  composer: { value: string; typing: boolean } | null;
  index: number;
  done: boolean;
  reducedMotion: boolean;
  runKey: number;
}

// `active` (from useLandedOnScreen) gates the whole sequence on the viewer
// actually having landed on it — in view AND the tab focused. While
// inactive no timer runs; every inactive -> active transition restarts
// from the first beat rather than resuming mid-flight. The sequence stops
// at its last beat (no loop). Under reduced motion every beat is already
// passed on first render: nothing here is pre-resolved content a viewer
// needs to see before the resolved state, so the final state is correct.
export function useChatTimeline(beats: Beat[], active: boolean): Timeline {
  const reducedMotion = useRef(prefersReducedMotion()).current;

  const [index, setIndex] = useState(reducedMotion ? beats.length : 0);
  // Per-beat state is stamped with the beat index it belongs to and read
  // back only while that beat is current — so the first render of a new
  // beat never briefly shows the previous beat's leftovers (a stale
  // label crossfading into the right one, a finished message flashing in
  // the composer) before an effect gets a chance to reset it.
  const [typed, setTyped] = useState({ index: -1, value: "" });
  const [thinkStage, setThinkStage] = useState({ index: -1, stage: 0 });
  const [exitingIndex, setExitingIndex] = useState(-1);
  const [runKey, setRunKey] = useState(0);

  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (active && !wasActiveRef.current && !reducedMotion) {
      setIndex(0);
      setTyped({ index: -1, value: "" });
      setThinkStage({ index: -1, stage: 0 });
      setExitingIndex(-1);
      setRunKey((k) => k + 1);
    }
    wasActiveRef.current = active;
  }, [active, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !active || index >= beats.length) return;

    const beat = beats[index];
    const timeouts: number[] = [];
    let cancelReveal: (() => void) | undefined;
    const after = (ms: number, fn: () => void) => {
      timeouts.push(window.setTimeout(fn, ms));
    };
    const next = () => setIndex((i) => i + 1);
    const cleanup = () => {
      cancelReveal?.();
      timeouts.forEach(window.clearTimeout);
    };

    switch (beat.type) {
      case "compose": {
        if (!beat.text) {
          after(beat.holdMs ?? 700, next);
          break;
        }
        const text = beat.text;
        after(beat.leadMs ?? (index === 0 ? FIRST_COMPOSE_LEAD_MS : NEXT_COMPOSE_LEAD_MS), () => {
          cancelReveal = revealText(text, {
            msPerStep: CHAR_INTERVAL_MS,
            onTick: (value) => setTyped({ index, value }),
            onDone: () => after(SENT_SETTLE_MS, next),
          });
        });
        break;
      }
      case "think": {
        let holdMs = THINKING_SINGLE_MS;
        if (beat.labels.length === 2) {
          after(THINKING_STAGE_1_MS, () => setThinkStage({ index, stage: 1 }));
          holdMs = THINKING_STAGE_1_MS + THINKING_STAGE_2_MS;
        }
        after(holdMs, () => setExitingIndex(index));
        after(holdMs + THINKING_EXIT_MS, next);
        break;
      }
      case "text":
        after(replyRevealMs(beat.text), next);
        break;
      case "appear":
        after(beat.ms ?? APPEAR_MS, next);
        break;
      case "load":
        after(beat.ms ?? LOAD_MS, next);
        break;
      case "pause":
        after(beat.ms, next);
        break;
    }

    return cleanup;
  }, [index, active, reducedMotion, beats]);

  return useMemo(() => {
    const at = (id: string) => {
      const i = beats.findIndex((b) => b.id === id);
      if (i < 0) throw new Error(`Unknown beat "${id}"`);
      return i;
    };
    const current = beats[index];
    const typedValue = typed.index === index ? typed.value : "";
    return {
      reached: (id) => index >= at(id),
      passed: (id) => index > at(id),
      loading: (id) => index === at(id),
      status: (id) => {
        const beat = beats[index];
        if (index !== at(id) || beat.type !== "think") return null;
        const stage = thinkStage.index === index ? thinkStage.stage : 0;
        return { label: beat.labels[stage] ?? beat.labels[0], visible: exitingIndex !== index };
      },
      composer: current?.type === "compose" && current.text ? { value: typedValue, typing: true } : null,
      index,
      done: index >= beats.length,
      reducedMotion,
      runKey,
    };
  }, [beats, index, typed, thinkStage, exitingIndex, reducedMotion, runKey]);
}

// How long `beats` take to play out, in ms, from the timings above (typing
// at its mean 26ms a character). Not used by the sequencer: the Lifecycle
// panel's registry records each visual's length with it.
export function beatsDuration(beats: Beat[]) {
  return beats.reduce((total, beat, index) => {
    switch (beat.type) {
      case "compose":
        if (!beat.text) return total + (beat.holdMs ?? 700);
        return (
          total +
          (beat.leadMs ?? (index === 0 ? FIRST_COMPOSE_LEAD_MS : NEXT_COMPOSE_LEAD_MS)) +
          beat.text.length * CHAR_INTERVAL_MS +
          SENT_SETTLE_MS
        );
      case "think":
        return (
          total +
          (beat.labels.length === 2 ? THINKING_STAGE_1_MS + THINKING_STAGE_2_MS : THINKING_SINGLE_MS) +
          THINKING_EXIT_MS
        );
      case "text":
        return total + replyRevealMs(beat.text);
      case "appear":
        return total + (beat.ms ?? APPEAR_MS);
      case "load":
        return total + (beat.ms ?? LOAD_MS);
      case "pause":
        return total + beat.ms;
    }
  }, 0);
}
