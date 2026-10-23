import { Fragment, useEffect, useRef } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { beatsDuration, useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import {
  Actions,
  BrowserBar,
  Composer,
  GptHeader,
  LoadingTile,
  OrderSummary,
  ProductTile,
  type IconName,
} from "../AiAssistants/AiAssistants";
import { bundle, picks, status, transcript, type Run } from "../AiAssistants/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

// AI Assistants (motion) — paced and staged the way ChatGPT's own
// shopping answers play out, not the Crossword chat kit: the shopper
// types into ChatGPT's composer (send arrow appears with text, turns to
// stop while generating), the bubble lands, a pulsing dot holds the
// reply's place, then a shimmering "Searching…" line with pulsing
// product tiles; the answer streams in token by token (opacity only — no
// rise, no blur) and the tiles resolve one after another. Each reply
// reserves its full height the moment it starts, so the thread scrolls
// once per turn and nothing below it shifts while text streams.
const STREAM_MS_PER_WORD = 34;
const TOKEN_FADE_MS = 280;

const plain = (runs: Run[]) => runs.map((r) => (typeof r === "string" ? r : r.b)).join("");
const words = (runs: Run[]) => plain(runs).split(/\s+/).filter(Boolean).length;
const streamMs = (runs: Run[]) => words(runs) * STREAM_MS_PER_WORD + TOKEN_FADE_MS;

const user = (i: number) => {
  const turn = transcript[i];
  return turn.role === "user" ? turn.text : "";
};
const reply = (i: number) => {
  const turn = transcript[i];
  return turn.role === "assistant" ? turn.text : [];
};

const beats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: user(0), leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 2000 },
  { id: "reply-1", type: "appear", ms: streamMs(reply(1)) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 1700 },
  { id: "choose", type: "compose", text: user(2), leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1000 },
  { id: "reply-2", type: "appear", ms: streamMs(reply(3)) },
  { id: "set", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 1900 },
  { id: "take", type: "compose", text: user(4), leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "reply-3", type: "appear", ms: streamMs(reply(5)) },
  { id: "order", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

// The reply's text is laid out in full from the first frame (so the turn
// never grows), each word invisible until its turn in the stream. Words
// are inline spans — opacity needs no box — and the space between them
// stays a sibling text node.
function StreamText({ runs, play }: { runs: Run[]; play: boolean }) {
  let index = 0;
  const tokens = (text: string) =>
    text.split(/(\s+)/).map((piece, i) => {
      if (!piece) return null;
      if (/^\s+$/.test(piece)) return <Fragment key={i}>{piece}</Fragment>;
      const delay = index++ * STREAM_MS_PER_WORD;
      return (
        <span key={i} className="aiam-token" style={{ animationDelay: `${delay}ms` }}>
          {piece}
        </span>
      );
    });
  return (
    <p className={cx("aia-reply aiam-stream", play && "aiam-stream--play")}>
      {runs.map((r, i) => (typeof r === "string" ? <Fragment key={i}>{tokens(r)}</Fragment> : <strong key={i}>{tokens(r.b)}</strong>))}
    </p>
  );
}

// A result tile with its loading tile laid over it: opaque from the
// render it mounts, it only ever fades out (staggered by `delayMs`).
function TileSlot({ loading, delayMs = 0, children }: { loading: boolean; delayMs?: number; children: React.ReactNode }) {
  const wasLoading = useRef(loading);
  const showCover = loading || wasLoading.current;
  useEffect(() => {
    wasLoading.current = loading;
  }, [loading]);
  return (
    <div className="aiam-tile-slot">
      {children}
      {showCover && (
        <div className={cx("aiam-tile-cover", !loading && "aiam-tile-cover--hidden")} style={{ transitionDelay: `${delayMs}ms` }}>
          <LoadingTile />
        </div>
      )}
    </div>
  );
}

// Holds a piece of the turn's space from the start; it appears once `show`.
function Reserved({ show, className, children }: { show: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={show ? className : "aiam-reserve"} aria-hidden={!show}>
      {children}
    </div>
  );
}

function ReplySlot({ t, runs, replyId, statusId }: { t: Timeline; runs: Run[]; replyId: string; statusId?: string }) {
  const streaming = t.reached(replyId);
  return (
    <div className="aiam-slot">
      <StreamText runs={runs} play={streaming} />
      {!streaming && (statusId && t.reached(statusId) ? <p className="aia-status aiam-status">{status}</p> : <span className="aiam-dot" />)}
    </div>
  );
}

function Thread({ t }: { t: Timeline }) {
  return (
    <div className="aia-thread">
      {t.passed("ask") && <div className="aia-turn aia-turn--user aiam-send"><p className="aia-bubble">{user(0)}</p></div>}
      {t.reached("wait-1") && (
        <div className="aia-turn aia-turn--assistant">
          <ReplySlot t={t} runs={reply(1)} replyId="reply-1" statusId="search" />
          <Reserved show={t.reached("search")} className="aiam-fade">
            <div className="aia-carousel">
              {picks.map((p, i) => (
                <TileSlot key={p.id} loading={!t.reached("tiles")} delayMs={i * 110}>
                  <ProductTile product={p} />
                </TileSlot>
              ))}
            </div>
          </Reserved>
        </div>
      )}
      {t.passed("choose") && <div className="aia-turn aia-turn--user aiam-send"><p className="aia-bubble">{user(2)}</p></div>}
      {t.reached("wait-2") && (
        <div className="aia-turn aia-turn--assistant">
          <ReplySlot t={t} runs={reply(3)} replyId="reply-2" />
          <Reserved show={t.reached("reply-2")} className="aiam-fade">
            <TileSlot loading={!t.reached("set")}>
              <ProductTile product={bundle} wide />
            </TileSlot>
          </Reserved>
        </div>
      )}
      {t.passed("take") && <div className="aia-turn aia-turn--user aiam-send"><p className="aia-bubble">{user(4)}</p></div>}
      {t.reached("wait-3") && (
        <div className="aia-turn aia-turn--assistant">
          <ReplySlot t={t} runs={reply(5)} replyId="reply-3" />
          <Reserved show={t.reached("order")} className="aiam-rise">
            <OrderSummary />
          </Reserved>
          <Reserved show={t.reached("done")} className="aiam-fade">
            <Actions />
          </Reserved>
        </div>
      )}
    </div>
  );
}

function Scene({ t }: { t: Timeline }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", index: t.index, reducedMotion: t.reducedMotion });

  const generating =
    (t.passed("ask") && !t.reached("read-1")) ||
    (t.passed("choose") && !t.reached("read-2")) ||
    (t.passed("take") && !t.reached("done"));
  const typed = t.composer?.value;
  const send: IconName = generating ? "stop" : typed ? "send" : "voice";

  return (
    <div className="aia-canvas">
      <div className="aia aiam" data-name="AI Assistants / Motion">
        <BrowserBar />
        <div className="aia-gpt" data-name="ChatGPT">
          <GptHeader />
          <div className="aia-scroll" data-name="Conversation" ref={scrollRef}>
            <Thread t={t} />
          </div>
          <Composer
            send={send}
            value={typed ? <>{typed}<span className="aiam-caret" /></> : undefined}
          />
        </div>
      </div>
    </div>
  );
}

/** How long the sequence takes to play out, in ms. */
export const aiAssistantsMotionDuration = beatsDuration(beats);

// `play` lets the host hold the sequence too (the Lifecycle panel plays it once the section is on screen).
export function AiAssistantsMotion({ play = true }: { play?: boolean }) {
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
