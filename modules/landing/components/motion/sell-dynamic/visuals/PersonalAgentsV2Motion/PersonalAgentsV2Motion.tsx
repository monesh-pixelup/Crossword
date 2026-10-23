import { useLayoutEffect, useRef } from "react";
import crosswordMark from "../../assets/ill-icons/crossword-logo.svg";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { beatsDuration, useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { RichStagger } from "../../illustrations/SellMotion/RichStagger";
import { OfferCard, PickList } from "../PersonalAgents/PersonalAgents";
import { MotionRail, markup, railBeats } from "../PersonalAgentsMotion/PersonalAgentsMotion";
import { agent, answer, panel, placeholder, shopper } from "../PersonalAgentsV2/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

// 05 V2 — Personal agents in chat (motion). The six statics as one take:
// the shopper types their ask into the agent's composer and sends it; the
// agent goes "Working" and its Crossword activity panel opens under the
// bubble, where V1's exchange plays exactly as in V1's motion (same rail,
// same beats). The panel grows into the free space, then holds its height
// and follows its newest lookup, earlier ones scrolling up under a top
// fade. When the agent signs off, the panel folds shut to "Used
// Crossword", the status goes, and the agent's answer cascades in below
// with the two sweaters and the offer.
const answerText = markup(answer);

const beats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "type-ask", type: "compose", text: shopper.ask, leadMs: 300 },
  { id: "sent", type: "appear", ms: 650 },
  { id: "panel", type: "appear", ms: 420 },
  ...railBeats,
  { id: "hold", type: "pause", ms: 900 },
  { id: "collapse", type: "appear", ms: 480 },
  { id: "answer", type: "text", text: answerText },
  { id: "answer-cards", type: "appear", ms: 600 },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={cx("pa2-chevron pa2m-chevron", open && "pa2m-chevron--open")} width="12" height="12" viewBox="0 0 12 12"
      fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4.5L6 7.5l3-3" />
    </svg>
  );
}

function ActivityPanel({ t }: { t: Timeline }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const collapsing = t.reached("collapse");
  const lookups = t.reached("call-2") ? 2 : 1;
  useFollowLatest(scrollRef, { thread: ".pa-rail", index: t.index, reducedMotion: t.reducedMotion });

  // Folds the body shut from its current height; it unmounts on the next
  // beat, leaving the static collapsed panel.
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!collapsing || !body || t.reducedMotion) return;
    const animation = body.animate(
      [{ height: `${body.offsetHeight}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
      { duration: 420, easing: "cubic-bezier(0.45, 0, 0.15, 1)", fill: "forwards" },
    );
    return () => animation.cancel();
  }, [collapsing, t.reducedMotion]);

  const title = collapsing ? panel.done : panel.open;
  return (
    <section className={cx("pa2-panel pa2m-panel", collapsing && "pa2-panel--collapsed")} data-name="Activity / Crossword">
      <header className="pa2-panel__header">
        <span className="pa-node pa-node--crossword" aria-hidden="true">
          <img src={crosswordMark.src} alt="" />
        </span>
        <span className="pa2-panel__title pa2m-swap" key={title}>{title}</span>
        <span className="pa2-panel__count pa2m-swap" key={lookups}>· {panel.lookups(lookups)}</span>
        <Chevron open={!collapsing} />
      </header>
      {!t.reached("answer") && (
        <div className="pa2-panel__body pa2m-body" ref={bodyRef}>
          <div className="pa2m-scroll" ref={scrollRef}>
            <MotionRail t={t} />
          </div>
        </div>
      )}
    </section>
  );
}

function Scene({ t }: { t: Timeline }) {
  const typed = t.composer?.value;
  const working = t.reached("sent") && !t.reached("answer");
  return (
    <figure className={cx("pa pa2 pam pa2m", t.reached("close") && "pam--done")} data-name="Personal agents V2 / Motion">
      <article className="pa-window">
        <header className="pa-header">
          <span className="pa-header__title">
            <span className="pa-node pa-node--agent" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="6" cy="6" r="4.25" />
                <circle cx="6" cy="6" r="1.6" fill="currentColor" stroke="none" />
              </svg>
            </span>
            {agent.label}
          </span>
          {working && (
            <span className={cx("pa-status pa2m-status", t.reached("collapse") && "pa2m-status--out")}>
              <span className="pa-status__dot" aria-hidden="true" />
              {agent.status}
            </span>
          )}
        </header>

        <div className="pa2-chat">
          {t.passed("type-ask") && <p className="pa2-bubble pa2m-rise">{shopper.ask}</p>}
          {t.reached("panel") && <ActivityPanel t={t} />}
          {t.reached("answer") && (
            <div className="pa2-answer" data-name="Turn / Agent answer">
              <p className="pa-call__reply">
                <RichStagger text={answerText} />
              </p>
              {t.reached("answer-cards") && (
                <>
                  <div className="pa2m-rise">
                    <PickList />
                  </div>
                  <div className="pa2m-rise" style={{ animationDelay: "90ms" }}>
                    <OfferCard />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="pa2-composer" data-name="Composer">
          <span className={cx("pa2-composer__placeholder", typed && "pa2m-typed")}>
            {typed ? <>{typed}<span className="pa2m-caret" /></> : placeholder}
          </span>
          <span className={cx("pa2-composer__send", t.reached("sent") && !t.passed("sent") && "pa2m-send")} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />
            </svg>
          </span>
        </div>
      </article>
    </figure>
  );
}

/** How long the sequence takes to play out, in ms. */
export const personalAgentsV2MotionDuration = beatsDuration(beats);

// `play` lets the host hold the sequence too (the Lifecycle panel plays it once the section is on screen).
export function PersonalAgentsV2Motion({ play = true }: { play?: boolean }) {
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
