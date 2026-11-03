import { ProductImage } from "./ProductImage";
import { useRef } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { ComparisonCard } from "../../illustrations/UpsellV2/UpsellV2Motion";
import { BrowserBar, Composer, GptHeader, ProductTile, Text, type IconName } from "../AiAssistants/AiAssistants";
import { Reserved, StreamText, TileSlot } from "../AiAssistantsMotion/AiAssistantsMotion";
import { useFollowLatest, useFontsReady } from "../sellDynamicMotion";
import {
  Alternatives, CMP_COLUMNS, CMP_ROWS, Configurator, SHORTLIST, ShortlistRows, Spotlight, THREE, tile,
} from "./AiAssistantsV3";
import { copy, priceWatch, restock, priceProduct, statusLine, $, type Run } from "./data";
import { bell, priceAlert, PriceCard, Rail, restockWatch, StockCard, tag, Update, Viewing } from "./ReachesThemFirst";
// AI Assistants V3 (motion). Each visual plays its states as one
// continuous ChatGPT conversation in a single 789x579 frame, with 06's
// ChatGPT motion unchanged: typed composer (voice → send → stop), the
// bubble's small rise, the pulsing dot, a shimmering search line, the
// token stream (opacity only), loading tiles resolving one by one, and
// each reply reserving its full height from its first frame so the
// thread follows the latest turn once per step. The beats are the only
// thing that differs per visual.
const STREAM_MS_PER_WORD = 34;
const TOKEN_FADE_MS = 280;
const words = (runs: Run[]) => runs.map((r) => (typeof r === "string" ? r : r.b)).join("").split(/\s+/).filter(Boolean).length;
const stream = (runs: Run[]) => words(runs) * STREAM_MS_PER_WORD + TOKEN_FADE_MS;

// Spans [sent, settled) during which ChatGPT is generating (stop glyph).
type Busy = [string, string][];

function Frame({ t, busy, name, children }: { t: Timeline; busy: Busy; name: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", index: t.index, reducedMotion: t.reducedMotion });
  const generating = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  const typed = t.composer?.value;
  const send: IconName = generating ? "stop" : typed ? "send" : "voice";
  return (
    <div className="aiv3-canvas">
      <div className="aia aiv3 aiam" data-name={`${name} / Motion`}>
        <BrowserBar />
        <div className="aia-gpt" data-name="ChatGPT">
          <GptHeader />
          <div className="aia-scroll" data-name="Conversation" ref={scrollRef}>
            <div className="aia-thread">{children}</div>
          </div>
          <Composer send={send} value={typed ? <>{typed}<span className="aiam-caret" /></> : undefined} />
        </div>
      </div>
    </div>
  );
}

// 05/06's desktop ChatGPT (ReachesThemFirst's frame and rail), with the
// same composer and follow-latest wiring as Frame.
// Once the later update is in, the view holds on its top so its alert
// label isn't tucked under the header.
function DesktopFrame({ t, busy, name, children }: { t: Timeline; busy: Busy; name: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useFollowLatest(scrollRef, { thread: ".aia-thread", focus: ".aiv3wm-later .aiv3w-update", index: t.index, reducedMotion: t.reducedMotion });
  const generating = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  const typed = t.composer?.value;
  const send: IconName = generating ? "stop" : typed ? "send" : "voice";
  return (
    <div className="aiv3w-canvas">
      <div className="aia aiv3 aiv3w aiam" data-name={`${name} / Motion`}>
        <BrowserBar />
        <div className="aia-gpt" data-name="ChatGPT">
          <Rail />
          <GptHeader />
          <div className="aia-scroll" data-name="Conversation" ref={scrollRef}>
            <div className="aia-thread">{children}</div>
          </div>
          <Composer send={send} value={typed ? <>{typed}<span className="aiam-caret" /></> : undefined} />
        </div>
      </div>
    </div>
  );
}

function Sent({ t, id, text, attach }: { t: Timeline; id: string; text: string; attach?: React.ReactNode }) {
  if (!t.passed(id)) return null;
  return (
    <div className={attach ? "aia-turn aia-turn--user aiv3w-user aiam-send" : "aia-turn aia-turn--user aiam-send"} data-name="Turn / User">
      {attach}<p className="aia-bubble">{text}</p>
    </div>
  );
}

// The reply laid out in full from its first frame; the dot (then the
// search line, when there is one) holds its first line until it streams.
function Answer({ t, runs, id, status, statusId }: { t: Timeline; runs: Run[]; id: string; status?: string; statusId?: string }) {
  const streaming = t.reached(id);
  return (
    <div className="aiam-slot">
      <StreamText runs={runs} play={streaming} />
      {!streaming && (statusId && t.reached(statusId) ? <p className="aia-status aiam-status">{status}</p> : <span className="aiam-dot" />)}
    </div>
  );
}

function Tiles({ t, items, loadId }: { t: Timeline; items: typeof THREE; loadId: string }) {
  return (
    <div className="aia-carousel aiv3-tiles" data-name="Products">
      {items.map(({ p, note }, i) => (
        <TileSlot key={p.id} loading={!t.reached(loadId)} delayMs={i * 110}>
          <ProductTile product={tile(p, note)} media={<ProductImage src={p.image} alt={p.name} />} />
        </TileSlot>
      ))}
    </div>
  );
}

function Played({ beats, busy, name, children, desktop }: { beats: Beat[]; busy: Busy; name: string; children: (t: Timeline) => React.ReactNode; desktop?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  return (
    <div ref={rootRef}>
      {desktop
        ? <DesktopFrame t={t} busy={busy} name={name} key={t.runKey}>{children(t)}</DesktopFrame>
        : <Frame t={t} busy={busy} name={name} key={t.runKey}>{children(t)}</Frame>}
    </div>
  );
}

/* 01 — Which one should I get? ------------------------------------- */

const whichBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.which.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1800 },
  { id: "reply-1", type: "appear", ms: stream(copy.which.picks) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 2200 },
  { id: "why", type: "compose", text: copy.which.why, leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1000 },
  { id: "reply-2", type: "appear", ms: stream(copy.which.because) },
  { id: "table", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3WhichMotion() {
  return (
    <Played beats={whichBeats} busy={[["ask", "read-1"], ["why", "done"]]} name="01 Which one should I get?">
      {(t) => (
        <>
          <Sent t={t} id="ask" text={copy.which.ask} />
          {t.reached("wait-1") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.which.picks} id="reply-1" status={statusLine.which} statusId="search" />
              <Reserved show={t.reached("search")} className="aiam-fade"><Tiles t={t} items={THREE} loadId="tiles" /></Reserved>
            </div>
          )}
          <Sent t={t} id="why" text={copy.which.why} />
          {t.reached("wait-2") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.which.because} id="reply-2" />
              <Reserved show={t.reached("reply-2")} className="aiam-fade">
                <div className="aiv3-cmp"><ComparisonCard loading={!t.reached("table")} columns={CMP_COLUMNS} rows={CMP_ROWS} /></div>
              </Reserved>
            </div>
          )}
        </>
      )}
    </Played>
  );
}

/* 02 — The espresso machine, with the starter kit. ---------------------- */

// Opens on the espresso machine already configured as offered (continuing
// from 01). The shopper's ask lands, then the card in the reply moves to
// the new configuration one control at a time: colour, then the bundle,
// with the price following the bundle.
const configureBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 900 },
  { id: "ask", type: "compose", text: copy.configure.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "reply", type: "appear", ms: stream(copy.configure.done) },
  { id: "card", type: "appear", ms: 700 },
  { id: "colour", type: "appear", ms: 700 },
  { id: "kit", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3ConfigureMotion() {
  return (
    <Played beats={configureBeats} busy={[["ask", "done"]]} name="02 The espresso machine, with the starter kit.">
      {(t) => (
        <>
          <div className="aia-turn aia-turn--assistant">
            <Text runs={copy.configure.intro} />
            <Configurator kitOn={false} />
          </div>
          <Sent t={t} id="ask" text={copy.configure.ask} />
          {t.reached("wait") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.configure.done} id="reply" />
              <Reserved show={t.reached("card")} className="aiam-rise">
                <div className="aiv3-live">
                  <Configurator kitOn={t.reached("kit")} />
                </div>
              </Reserved>
            </div>
          )}
        </>
      )}
    </Played>
  );
}

/* 03 — Choose this one. --------------------------------------------- */

const shortlistBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.shortlist.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1600 },
  { id: "reply-1", type: "appear", ms: stream(copy.shortlist.picks) },
  { id: "tiles", type: "appear", ms: 700 },
  { id: "read-1", type: "pause", ms: 1800 },
  { id: "follow", type: "compose", text: copy.shortlist.follow, leadMs: 300 },
  { id: "wait-2", type: "appear", ms: 1000 },
  { id: "reply-2", type: "appear", ms: stream(copy.shortlist.answer) },
  { id: "rows-2", type: "appear", ms: 600 },
  { id: "read-2", type: "pause", ms: 2000 },
  { id: "choose", type: "compose", text: copy.shortlist.choose, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "rows-3", type: "appear", ms: 700 },
  { id: "pick", type: "appear", ms: 500 },
  { id: "reply-3", type: "appear", ms: stream(copy.shortlist.chosen) },
  { id: "done", type: "pause", ms: 300 },
];

export function V3ShortlistMotion() {
  return (
    <Played beats={shortlistBeats} busy={[["ask", "read-1"], ["follow", "read-2"], ["choose", "done"]]} name="03 Choose this one.">
      {(t) => (
        <>
          <Sent t={t} id="ask" text={copy.shortlist.ask} />
          {t.reached("wait-1") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.shortlist.picks} id="reply-1" status={statusLine.shortlist} statusId="search" />
              <Reserved show={t.reached("search")} className="aiam-fade"><Tiles t={t} items={SHORTLIST} loadId="tiles" /></Reserved>
            </div>
          )}
          <Sent t={t} id="follow" text={copy.shortlist.follow} />
          {t.reached("wait-2") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.shortlist.answer} id="reply-2" />
              <Reserved show={t.reached("rows-2")} className="aiam-rise"><ShortlistRows /></Reserved>
            </div>
          )}
          <Sent t={t} id="choose" text={copy.shortlist.choose} />
          {t.reached("wait-3") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.shortlist.chosen} id="reply-3" />
              <Reserved show={t.reached("rows-3")} className="aiam-rise">
                <div className="aiv3-live"><ShortlistRows selectable picked={t.reached("pick") ? "bracelet-1" : undefined} /></div>
              </Reserved>
            </div>
          )}
        </>
      )}
    </Played>
  );
}

/* 04 — I'm looking for the best value. ----------------------------- */

const valueBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.value.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "search", type: "appear", ms: 1800 },
  { id: "reply", type: "appear", ms: stream(copy.value.pick) },
  { id: "spot", type: "appear", ms: 600 },
  { id: "alts", type: "appear", ms: 600 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3ValueMotion() {
  return (
    <Played beats={valueBeats} busy={[["ask", "done"]]} name="04 I'm looking for the best value.">
      {(t) => (
        <>
          <Sent t={t} id="ask" text={copy.value.ask} />
          {t.reached("wait") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={copy.value.pick} id="reply" status={statusLine.value} statusId="search" />
              <Reserved show={t.reached("spot")} className="aiam-rise"><Spotlight /></Reserved>
              <Reserved show={t.reached("alts")} className="aiam-rise"><Alternatives /></Reserved>
            </div>
          )}
        </>
      )}
    </Played>
  );
}

/* 05 — Tell me when my size is back. ------------------------------- */

// The ask, the sold-out card and the alert confirmation play as one
// reply; then time passes (the day/time rule) and ChatGPT's own update
// arrives unprompted: label, then the message, then the in-stock card.
// No send, so no stop glyph on the update. The update's card space is
// only taken once its message streams, so the dot doesn't sit in an
// empty, card-sized surface.
const backInStockBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: restock.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "reply", type: "appear", ms: stream(restock.sold) },
  { id: "card", type: "appear", ms: 900 },
  { id: "confirm", type: "appear", ms: stream(restock.confirm) },
  { id: "watch", type: "appear", ms: 700 },
  { id: "read", type: "pause", ms: 1800 },
  { id: "later", type: "appear", ms: 700 },
  { id: "update", type: "appear", ms: 900 },
  { id: "back", type: "appear", ms: stream(restock.back) },
  { id: "in-stock", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3BackInStockMotion() {
  return (
    <Played desktop beats={backInStockBeats} busy={[["ask", "read"]]} name="05 Tell me when my size is back.">
      {(t) => (
        <>
          <Sent t={t} id="ask" text={restock.ask} />
          {t.reached("wait") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={restock.sold} id="reply" />
              <Reserved show={t.reached("card")} className="aiam-rise"><StockCard inStock={false} /></Reserved>
              <Reserved show={t.reached("card")} className="aiam-fade"><StreamText runs={restock.confirm} play={t.reached("confirm")} /></Reserved>
              <Reserved show={t.reached("watch")} className="aiam-rise">{restockWatch}</Reserved>
            </div>
          )}
          {t.reached("later") && (
            <div className="aiv3wm-later aiam-fade">
              <Update when={restock.when} icon={bell} label="Restock alert · Enduro MTB Helmet, Graphite, M">
                <Answer t={t} runs={restock.back} id="back" />
                {t.reached("back") && <Reserved show={t.reached("in-stock")} className="aiam-rise"><StockCard inStock /></Reserved>}
              </Update>
            </div>
          )}
        </>
      )}
    </Played>
  );
}

/* 06 — Let me know when it drops below my budget. ------------------ */

// Same shape as 05: the ask carries the product being viewed, the alert
// is confirmed, then the later price-drop update with its card.
const priceDropBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: priceWatch.ask, leadMs: 300 },
  { id: "wait", type: "appear", ms: 900 },
  { id: "confirm", type: "appear", ms: stream(priceWatch.confirm) },
  { id: "watch", type: "appear", ms: 700 },
  { id: "read", type: "pause", ms: 1800 },
  { id: "later", type: "appear", ms: 700 },
  { id: "update", type: "appear", ms: 900 },
  { id: "drop", type: "appear", ms: stream(priceWatch.drop) },
  { id: "deal", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3PriceDropMotion() {
  return (
    <Played desktop beats={priceDropBeats} busy={[["ask", "read"]]} name="06 Let me know when it drops below my budget.">
      {(t) => (
        <>
          <Sent t={t} id="ask" text={priceWatch.ask} attach={<Viewing />} />
          {t.reached("wait") && (
            <div className="aia-turn aia-turn--assistant">
              <Answer t={t} runs={priceWatch.confirm} id="confirm" />
              <Reserved show={t.reached("watch")} className="aiam-rise">{priceAlert}</Reserved>
            </div>
          )}
          {t.reached("later") && (
            <div className="aiv3wm-later aiam-fade">
              <Update when={priceWatch.when} icon={tag} label={`Price alert · Teardrop Pendant under ${$(priceProduct.target)}`}>
                <Answer t={t} runs={priceWatch.drop} id="drop" />
                {t.reached("drop") && <Reserved show={t.reached("deal")} className="aiam-rise"><PriceCard /></Reserved>}
              </Update>
            </div>
          )}
        </>
      )}
    </Played>
  );
}
