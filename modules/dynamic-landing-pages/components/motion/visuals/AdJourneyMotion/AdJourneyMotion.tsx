import { useContext, useLayoutEffect, useRef } from "react";
import { StorybookComposerDefault } from "../../components/ill/ProductCardSkin";
import { Shell } from "../../components/ill/Shell";
import { ChatComposer } from "../../components/ill/ChatComposer";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { StaggerText } from "../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Thinking } from "../../illustrations/SellMotion/parts";
import { AnswerRows, InstagramAd, KnockBar, Picks, Storefront, answerText } from "../AdJourney/AdJourney";
import { brand, widget } from "../AdJourney/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

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
  { id: "think-3", type: "think", labels: ["Thinking", "Finding evening gummies"] },
  { id: "result", type: "text", text: widget.result },
  { id: "resolved", type: "pause", ms: 600 },
];

// The v2 opener (§14d): the bar rests 1.2s, the knock pops (883ms) and
// holds 3.6s to be read before "Find My Match" is pressed.
const knockBeats: Beat[] = beats.map((b) =>
  b.id === "widget" ? { id: "widget", type: "pause", ms: 1200 } : b.id === "prompts" ? { ...b, ms: 883 + 3600 } : b,
);

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
  const composerDefault = useContext(StorybookComposerDefault);

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
    // Back to the layer's own CSS px: the site zooms each visual to fit its
    // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
    // at the visual's drawn size.
    const zoom = layer.offsetWidth ? box.width / layer.offsetWidth : 1;
    const place = (name: string, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const insets = {
        t: (r.top - box.top) / zoom,
        r: (box.right - r.right) / zoom,
        b: (box.bottom - r.bottom) / zoom,
        l: (r.left - box.left) / zoom,
      };
      for (const [side, value] of Object.entries(insets)) surface.style.setProperty(`--adjm-${name}-${side}`, `${value}px`);
    };
    place("from", compact);
    place("to", expanded);
  }, [showCompact]);

  useFollowLatest(viewportRef, {
    thread: ".adj-thread",
    pin: ".ill-user-turn",
    clearance: 8,
    // v2: the pinned turn rests below the transcript's 12px top fade.
    pinOffset: composerDefault ? 16 : 0,
    index: t.index,
    reducedMotion: t.reducedMotion,
  });

  return (
    <div className={cx("adjm-layer", showCompact && "adjm-layer--in")} ref={layerRef}>
      <div className={cx("adjm-surface", expanding && "adjm-surface--open")} ref={surfaceRef} />
      {showCompact && composerDefault && (
        <KnockBar
          barRef={compactRef}
          className={cx("adjm-compact", expanding && "adjm-compact--out")}
          knock={t.reached("prompts")}
          pressed={t.reached("pick-match") ? "Find My Match" : undefined}
          out={expanding}
        />
      )}
      {showCompact && !composerDefault && (
        <Shell
          brand={brand}
          rootRef={compactRef}
          className={cx(
            "adj-widget adj-widget--compact adjm-compact",
            t.reached("prompts") && "adjm-compact--prompts",
            expanding && "adjm-compact--out",
          )}
          composer={composerDefault ? <ChatComposer value={widget.composer} /> : <></>}
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
      <div className="adjm-plate" />
      <Storefront widget={<Widgets t={t} />} />
    </div>
  );
}

export function AdJourneyMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const composerDefault = useContext(StorybookComposerDefault);
  const t = useChatTimeline(composerDefault ? knockBeats : beats, landed && fontsReady);
  return (
    <div ref={rootRef}>
      <Scene t={t} key={t.runKey} />
    </div>
  );
}
