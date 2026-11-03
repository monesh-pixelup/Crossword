import { useRef } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { Reserved, StreamText } from "../AiAssistantsMotion/AiAssistantsMotion";
import { useFollowLatest, useFontsReady } from "../sellDynamicMotion";
import {
  ApprovedCard, AuthPage, BenefitCard, BrowserSheet, CartCard, CheckoutPage, ClubCard, ComposerBar, ConnectCard, Connected,
  Duo, EligibilityCard, ExchangeCard, FoundCard, Framed, HandoffCard, OrderCard, Screen, SummaryCard, User, checkingLine, viewing,
} from "./MobileCommerce";
import { mobileCopy as copy, type Run } from "./data";

// AI Assistants V3, 07–10 (motion). Each visual plays its states as one
// continuous conversation on the phone, in the statics' frame. 06's
// ChatGPT motion, unchanged: the composer types (voice → send → stop),
// the bubble rises, a pulsing dot (or a shimmering status line) holds
// the reply's first line, the reply streams token by token, and each
// result reserves its space and rises in once the text is done. Added
// for mobile: a button press where the shopper taps (Connect, Allow,
// Confirm exchange, Continue to checkout) and the browser sheet rising
// over the chat for the merchant's own pages. Beats are the only thing that
// differs per visual.
// Storybook values (STORYBOOK_MAPPING §8): words every 42ms, each fading over 0.4s.
const STREAM_MS_PER_WORD = 42;
const TOKEN_FADE_MS = 400;
const stream = (runs: Run[]) =>
  runs.map((r) => (typeof r === "string" ? r : r.b)).join("").split(/\s+/).filter(Boolean).length * STREAM_MS_PER_WORD + TOKEN_FADE_MS;

const TAP_MS = 450;
const SHEET_MS = 450;

// Spans [sent, settled) during which ChatGPT is working (stop square).
type Busy = [string, string][];

function Played({ beats, busy, name, sheet, children }: {
  beats: Beat[]; busy: Busy; name: string; sheet?: (t: Timeline) => React.ReactNode; children: (t: Timeline) => React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  return (
    <div ref={rootRef}>
      <Framed><Scene t={t} busy={busy} name={name} sheet={sheet} key={t.runKey}>{children}</Scene></Framed>
    </div>
  );
}

function Scene({ t, busy, name, sheet, children }: {
  t: Timeline; busy: Busy; name: string; sheet?: (t: Timeline) => React.ReactNode; children: (t: Timeline) => React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useFollowLatest(scrollRef, { thread: ".mcp-thread", index: t.index, reducedMotion: t.reducedMotion });
  const typed = t.composer?.value;
  const working = busy.some(([from, to]) => t.passed(from) && !t.reached(to));
  return (
    <Screen
      name={`${name} / Motion`}
      className="aiam mcpm"
      scrollRef={scrollRef}
      sheet={sheet?.(t)}
      composer={<ComposerBar send={working ? "stop" : typed ? "send" : "voice"} value={typed ? <>{typed}<span className="aiam-caret" /></> : undefined} />}
    >
      {children(t)}
    </Screen>
  );
}

// The shopper's turn lands once its compose beat has sent (or, for a
// tapped action, once its beat is reached).
function Sent({ show, children, attach }: { show: boolean; children: React.ReactNode; attach?: React.ReactNode }) {
  if (!show) return null;
  return <div className="aiam-send"><User attach={attach}>{children}</User></div>;
}

// ChatGPT's turn: one or more streamed paragraphs, each laid out in full
// from the start, held by the dot or a status line until it streams.
function Answer({ t, runs, id, status, statusId }: { t: Timeline; runs: Run[]; id: string; status?: string; statusId?: string }) {
  const streaming = t.reached(id);
  return (
    <div className="aiam-slot">
      <StreamText runs={runs} play={streaming} msPerWord={STREAM_MS_PER_WORD} />
      {!streaming && (statusId && t.reached(statusId) ? <p className="aia-status aiam-status">{status}</p> : <span className="aiam-dot" />)}
    </div>
  );
}

const Turn = ({ children }: { children: React.ReactNode }) => (
  <div className="aia-turn aia-turn--assistant mcp-reply" data-name="Turn / Assistant">{children}</div>
);

// The merchant's page in the browser sheet: rises on `inId`, falls on `outId`
// (unmounted once that beat has passed), or stays up if there's no `outId`.
function Sheet({ t, url, inId, outId, children }: { t: Timeline; url: string; inId: string; outId?: string; children: React.ReactNode }) {
  if (!t.reached(inId) || (outId && t.passed(outId))) return null;
  return <BrowserSheet url={url} className={outId && t.reached(outId) ? "mcpm-sheet--out" : "mcpm-sheet--in"}>{children}</BrowserSheet>;
}

/* 07 — Where's my order? -------------------------------------------- */

const orderBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.orders.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "reply-1", type: "appear", ms: stream(copy.orders.connect) },
  { id: "connect", type: "appear", ms: 500 },
  { id: "read-1", type: "pause", ms: 1400 },
  { id: "tap-connect", type: "appear", ms: TAP_MS },
  { id: "sheet", type: "appear", ms: SHEET_MS },
  { id: "read-auth", type: "pause", ms: 2000 },
  { id: "tap-allow", type: "appear", ms: TAP_MS },
  { id: "sheet-out", type: "appear", ms: 380 },
  { id: "connected", type: "appear", ms: 500 },
  { id: "search", type: "appear", ms: 1400 },
  { id: "reply-2", type: "appear", ms: stream(copy.orders.status) },
  { id: "order", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3OrderStatusMotion() {
  return (
    <Played
      beats={orderBeats}
      busy={[["ask", "read-1"], ["sheet-out", "done"]]}
      name="07 Where's my order?"
      sheet={(t) => <Sheet t={t} url="accounts.aurelle.com" inId="sheet" outId="sheet-out"><AuthPage pressed={t.reached("tap-allow")} /></Sheet>}
    >
      {(t) => (
        <>
          <Sent show={t.passed("ask")}>{copy.orders.ask}</Sent>
          {t.reached("wait-1") && (
            <Turn>
              <Answer t={t} runs={copy.orders.connect} id="reply-1" />
              <Reserved show={t.reached("connect")} className="aiam-rise"><ConnectCard pressed={t.reached("tap-connect") && !t.reached("connected")} /></Reserved>
            </Turn>
          )}
          {t.reached("connected") && <div className="aiam-fade"><Connected /></div>}
          {t.reached("search") && (
            <Turn>
              <Answer t={t} runs={copy.orders.status} id="reply-2" status="Checking your Aurelle orders" statusId="search" />
              <Reserved show={t.reached("order")} className="aiam-rise"><OrderCard /></Reserved>
            </Turn>
          )}
        </>
      )}
    </Played>
  );
}

/* 08 — I need an exchange or refund. -------------------------------- */

const exchangeBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.exchange.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "search", type: "appear", ms: 1200 },
  { id: "reply-1", type: "appear", ms: stream(copy.exchange.found) },
  { id: "found", type: "appear", ms: 600 },
  { id: "reply-2", type: "appear", ms: stream(copy.exchange.eligible) },
  { id: "eligible", type: "appear", ms: 600 },
  { id: "read-2", type: "pause", ms: 1800 },
  { id: "choose", type: "compose", text: copy.exchange.choose, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 800 },
  { id: "reply-3", type: "appear", ms: stream(copy.exchange.summary) },
  { id: "exchange", type: "appear", ms: 600 },
  { id: "read-3", type: "pause", ms: 2000 },
  { id: "tap-confirm", type: "appear", ms: TAP_MS },
  { id: "confirm", type: "appear", ms: 400 },
  { id: "wait-4", type: "appear", ms: 900 },
  { id: "reply-4", type: "appear", ms: stream(copy.exchange.done) },
  { id: "approved", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3ExchangeMotion() {
  return (
    <Played beats={exchangeBeats} busy={[["ask", "read-2"], ["choose", "read-3"], ["confirm", "done"]]} name="08 I need an exchange or refund.">
      {(t) => (
        <>
          <Sent show={t.passed("ask")}>{copy.exchange.ask}</Sent>
          {t.reached("wait-1") && (
            <Turn>
              <Answer t={t} runs={copy.exchange.found} id="reply-1" status="Looking up your CRESTLINE orders" statusId="search" />
              <Reserved show={t.reached("found")} className="aiam-rise"><FoundCard /></Reserved>
            </Turn>
          )}
          {t.reached("reply-2") && (
            <Turn>
              <Answer t={t} runs={copy.exchange.eligible} id="reply-2" />
              <Reserved show={t.reached("eligible")} className="aiam-rise">
                <div className="mcpm-live"><EligibilityCard picked={t.passed("choose") ? "exchange" : undefined} /></div>
              </Reserved>
            </Turn>
          )}
          <Sent show={t.passed("choose")}>{copy.exchange.choose}</Sent>
          {t.reached("wait-3") && (
            <Turn>
              <Answer t={t} runs={copy.exchange.summary} id="reply-3" />
              <Reserved show={t.reached("exchange")} className="aiam-rise"><ExchangeCard pressed={t.reached("tap-confirm") && !t.reached("wait-4")} /></Reserved>
            </Turn>
          )}
          <Sent show={t.reached("confirm")}>{copy.exchange.confirm}</Sent>
          {t.reached("wait-4") && (
            <Turn>
              <Answer t={t} runs={copy.exchange.done} id="reply-4" />
              <Reserved show={t.reached("approved")} className="aiam-rise"><ApprovedCard /></Reserved>
            </Turn>
          )}
        </>
      )}
    </Played>
  );
}

/* 09 — Does my loyalty benefit apply? ------------------------------- */

const loyaltyBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.loyalty.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 700 },
  { id: "reply-1", type: "appear", ms: stream(copy.loyalty.checking) },
  { id: "checking", type: "appear", ms: 1800 },
  { id: "connected", type: "appear", ms: 500 },
  { id: "reply-2", type: "appear", ms: stream(copy.loyalty.verified) },
  { id: "club", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 2000 },
  { id: "reply-3", type: "appear", ms: stream(copy.loyalty.applied) },
  { id: "benefit", type: "appear", ms: 700 },
  { id: "done", type: "pause", ms: 300 },
];

export function V3LoyaltyMotion() {
  return (
    <Played beats={loyaltyBeats} busy={[["ask", "done"]]} name="09 Does my loyalty benefit apply?">
      {(t) => (
        <>
          <Sent show={t.passed("ask")} attach={viewing}>{copy.loyalty.ask}</Sent>
          {t.reached("wait-1") && (
            <Turn>
              <Answer t={t} runs={copy.loyalty.checking} id="reply-1" />
              {t.reached("checking") && !t.reached("connected") && <p className="aia-status mcp-checking aiam-status-line">{checkingLine}</p>}
            </Turn>
          )}
          {t.reached("connected") && <div className="aiam-fade"><Connected /></div>}
          {t.reached("connected") && (
            <Turn>
              <Answer t={t} runs={copy.loyalty.verified} id="reply-2" />
              <Reserved show={t.reached("club")} className="aiam-rise"><ClubCard /></Reserved>
            </Turn>
          )}
          {t.reached("reply-3") && (
            <Turn>
              <Answer t={t} runs={copy.loyalty.applied} id="reply-3" />
              <Reserved show={t.reached("benefit")} className="aiam-rise"><BenefitCard /></Reserved>
            </Turn>
          )}
        </>
      )}
    </Played>
  );
}

/* 10 — Help me buy these. ------------------------------------------- */

const checkoutBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 500 },
  { id: "ask", type: "compose", text: copy.checkout.ask, leadMs: 300 },
  { id: "wait-1", type: "appear", ms: 800 },
  { id: "reply-1", type: "appear", ms: stream(copy.checkout.found) },
  { id: "duo", type: "appear", ms: 600 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "reply-2", type: "appear", ms: stream(copy.checkout.cart) },
  { id: "cart", type: "appear", ms: 700 },
  { id: "read-2", type: "pause", ms: 1600 },
  { id: "check", type: "compose", text: copy.checkout.check, leadMs: 300 },
  { id: "wait-3", type: "appear", ms: 700 },
  { id: "search", type: "appear", ms: 1300 },
  { id: "reply-3", type: "appear", ms: stream(copy.checkout.verified) },
  { id: "summary", type: "appear", ms: 700 },
  { id: "read-3", type: "pause", ms: 2000 },
  { id: "go", type: "compose", text: copy.checkout.go, leadMs: 300 },
  { id: "wait-4", type: "appear", ms: 700 },
  { id: "reply-4", type: "appear", ms: stream(copy.checkout.handoff) },
  { id: "handoff", type: "appear", ms: 600 },
  { id: "read-4", type: "pause", ms: 1000 },
  { id: "tap-continue", type: "appear", ms: TAP_MS },
  { id: "sheet", type: "appear", ms: SHEET_MS },
  { id: "done", type: "pause", ms: 300 },
];

export function V3CheckoutMotion() {
  return (
    <Played
      beats={checkoutBeats}
      busy={[["ask", "read-2"], ["check", "read-3"], ["go", "read-4"]]}
      name="10 Help me buy these."
      sheet={(t) => <Sheet t={t} url="checkout.brewhaus.com" inId="sheet"><CheckoutPage /></Sheet>}
    >
      {(t) => (
        <>
          <Sent show={t.passed("ask")}>{copy.checkout.ask}</Sent>
          {t.reached("wait-1") && (
            <Turn>
              <Answer t={t} runs={copy.checkout.found} id="reply-1" />
              <Reserved show={t.reached("duo")} className="aiam-rise"><Duo /></Reserved>
            </Turn>
          )}
          {t.reached("reply-2") && (
            <Turn>
              <Answer t={t} runs={copy.checkout.cart} id="reply-2" />
              <Reserved show={t.reached("cart")} className="aiam-rise"><CartCard /></Reserved>
            </Turn>
          )}
          <Sent show={t.passed("check")}>{copy.checkout.check}</Sent>
          {t.reached("wait-3") && (
            <Turn>
              <Answer t={t} runs={copy.checkout.verified} id="reply-3" status="Checking stock and offers with BREWHAUS" statusId="search" />
              <Reserved show={t.reached("summary")} className="aiam-rise"><SummaryCard /></Reserved>
            </Turn>
          )}
          <Sent show={t.passed("go")}>{copy.checkout.go}</Sent>
          {t.reached("wait-4") && (
            <Turn>
              <Answer t={t} runs={copy.checkout.handoff} id="reply-4" />
              <Reserved show={t.reached("handoff")} className="aiam-rise"><HandoffCard pressed={t.reached("tap-continue")} /></Reserved>
            </Turn>
          )}
        </>
      )}
    </Played>
  );
}
