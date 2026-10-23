import { useLayoutEffect, useRef } from "react";
import { Shell } from "../../components/ill/Shell";
import { ChatComposer } from "../../components/ill/ChatComposer";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { StaggerText } from "../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { beatsDuration, useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Thinking } from "../../illustrations/SellMotion/parts";
import { AnswerRows, InstagramAd, Picks, Storefront, answerText } from "../AdJourney/AdJourney";
import { brand, widget } from "../AdJourney/data";
import { cx, drawnScale, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

// 03 — Ad → Crossword journey (motion). The seven statics as one take on
// the same 738x680 canvas: the ad's CTA is tapped and the storefront
// opens in its place; the compact widget rises in and its welcome
// cascades; "Find My Match" is picked and the widget grows into the
// guided panel as one surface (the compact content fades out, the box
// morphs to the panel's footprint, the panel's content fades in as it
// lands — ProactiveMotionScene's ExpandShell, as a morph instead of a
// clip since the two widgets differ in width). Each answer
// becomes the shopper's turn and is pinned to the top of the thread, so
// the previous exchange scrolls up and out (the statics show one exchange
// per frame). The last answer mounts the picks already under their
// skeletons beneath the thinking row; the result line replaces it and
// the cards resolve left to right.
const beats: Beat[] = [
  { id: "ad", type: "pause", ms: 1400 },
  { id: "tap-ad", type: "appear", ms: 280 },
  { id: "store", type: "appear", ms: 750 },
  { id: "widget", type: "text", text: widget.welcome },
  { id: "prompts", type: "appear", ms: 1300 },
  { id: "pick-match", type: "appear", ms: 450 },
  { id: "expand", type: "appear", ms: 720 },
  { id: "start", type: "appear", ms: 350 },
  { id: "think-1", type: "think", labels: ["Thinking"] },
  { id: "intro", type: "text", text: widget.intro },
  { id: "q1", type: "appear", ms: 1700 },
  { id: "pick-q1", type: "appear", ms: 650 },
  { id: "answer-1", type: "appear", ms: 450 },
  { id: "think-2", type: "think", labels: ["Thinking"] },
  { id: "q2", type: "appear", ms: 1700 },
  { id: "pick-q2", type: "appear", ms: 650 },
  { id: "answer-2", type: "appear", ms: 450 },
  { id: "think-3", type: "think", labels: ["Thinking", "Finding carry-on packs"] },
  { id: "result", type: "text", text: widget.result },
  { id: "resolved", type: "pause", ms: 600 },
];

function Quiz({ t, id, pickId, question, answer }: { t: Timeline; id: string; pickId: string; question: typeof widget.q1; answer: string }) {
  if (!t.reached(id)) return null;
  return (
    <div className="adjm-quiz">
      <AnswerRows question={question} selected={t.reached(pickId) ? answer : undefined} />
    </div>
  );
}

function Widgets({ t }: { t: Timeline }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const showCompact = t.reached("widget");
  const expanding = t.reached("expand");

  // The surface's two footprints — the compact widget's box and the
  // panel's — measured once both are laid out (webfonts are already in:
  // the timeline waits for them).
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const surface = surfaceRef.current;
    const compact = compactRef.current;
    const expanded = expandedRef.current;
    if (!showCompact || !layer || !surface || !compact || !expanded) return;
    const box = layer.getBoundingClientRect();
    // In CSS px whatever the zoom the site fits the visual to its panel with.
    const scale = drawnScale(layer);
    const place = (name: string, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const insets = { t: r.top - box.top, r: box.right - r.right, b: box.bottom - r.bottom, l: r.left - box.left };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value / scale}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);

  useFollowLatest(viewportRef, {
    thread: ".adj-thread",
    pin: ".sdm-ill-user-turn",
    clearance: 8,
    index: t.index,
    reducedMotion: t.reducedMotion,
  });

  return (
    <div className={cx("adjm-layer", showCompact && "adjm-layer--in")} ref={layerRef}>
      <div className={cx("adjm-surface", expanding && "adjm-surface--open")} ref={surfaceRef} />
      {showCompact && (
        <Shell
          brand={brand}
          rootRef={compactRef}
          className={cx(
            "adj-widget adj-widget--compact adjm-compact",
            t.reached("prompts") && "adjm-compact--prompts",
            expanding && "adjm-compact--out",
          )}
          composer={<></>}
        >
          <AssistantTurn>
            <ChatMessage role="assistant">
              <StaggerText text={widget.welcome} />
            </ChatMessage>
            <AiPills options={widget.prompts} selectedId={t.reached("pick-match") ? "match" : ""} />
          </AssistantTurn>
        </Shell>
      )}
      <Shell
        brand={brand}
        rootRef={expandedRef}
        viewportRef={viewportRef}
        className={cx("adj-widget adj-widget--expanded adjm-expanded", expanding && "adjm-expanded--open")}
        composer={<ChatComposer value={widget.composer} />}
      >
        <div className="adj-thread">
          {t.reached("start") && (
            <UserTurn animateIn>
              <ChatMessage role="user" text={widget.start} />
            </UserTurn>
          )}
          {t.reached("think-1") && (
            <AssistantTurn>
              <Thinking t={t} id="think-1" />
              {t.reached("intro") && <AssistantText text={widget.intro} />}
              <Quiz t={t} id="q1" pickId="pick-q1" question={widget.q1} answer={widget.q1Answer} />
            </AssistantTurn>
          )}
          {t.reached("answer-1") && (
            <UserTurn animateIn>
              <ChatMessage role="user" text={answerText(widget.q1, widget.q1Answer)} />
            </UserTurn>
          )}
          {t.reached("think-2") && (
            <AssistantTurn>
              <Thinking t={t} id="think-2" />
              <Quiz t={t} id="q2" pickId="pick-q2" question={widget.q2} answer={widget.q2Answer} />
            </AssistantTurn>
          )}
          {t.reached("answer-2") && (
            <UserTurn animateIn>
              <ChatMessage role="user" text={answerText(widget.q2, widget.q2Answer)} />
            </UserTurn>
          )}
          {/* The picks mount with the thinking row, already covered by
              their own skeletons (static 06), and resolve after the
              result line (static 07). */}
          {t.reached("think-3") && (
            <AssistantTurn>
              <Thinking t={t} id="think-3" />
              {t.reached("result") && <AssistantText text={widget.result} />}
              <div className="adjm-enter">
                <Picks loading={!t.reached("resolved")} staggerResolve />
              </div>
            </AssistantTurn>
          )}
        </div>
        <div className="adjm-spacer" aria-hidden="true" />
      </Shell>
    </div>
  );
}

function Scene({ t }: { t: Timeline }) {
  return (
    <div className={cx("adj adjm", t.reached("tap-ad") && "adjm--tap", t.reached("store") && "adjm--store")}>
      <InstagramAd />
      <Storefront widget={<Widgets t={t} />} />
    </div>
  );
}

/** How long the sequence takes to play out, in ms. */
export const adJourneyMotionDuration = beatsDuration(beats);

// `play` lets the host hold the sequence too (the Lifecycle panel plays it once the section is on screen).
export function AdJourneyMotion({ play = true }: { play?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady && play);
  return (
    <div ref={rootRef}>
      <Scene t={t} key={t.runKey} />
    </div>
  );
}
