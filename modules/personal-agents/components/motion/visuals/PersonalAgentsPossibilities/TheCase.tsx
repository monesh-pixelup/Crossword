import { useRef } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../../illustrations/SellMotion/useChatTimeline";
import { RichStagger } from "../../illustrations/SellMotion/RichStagger";
import { LandscapeCanvas } from "../../illustrations/WidgetLandscape/LandscapeCanvas";
import { BrandMark } from "../../brands/BrandIdentity";
import { Activity, GrokMark } from "./PersonalAgentsPossibilities";
import { $ } from "./data";
import { theCase as c } from "./theCaseData";

// Personal Agents → The Case. AI Assistants 15's frame (LandscapeCanvas,
// green backdrop, bleed; 1286x598 scene at 1168/1286), holding Grok Bot's
// desktop app: the chat on the left, its computer panel pinned on the
// right (xAI's Grok Bot notes: the computer icon turns purple while the
// computer is active; preview opens a pinned side panel). Four states:
// 1 request, 2 browsing search results, 3 task done, 4 what it skipped.
// No Crossword yet: this is the problem.

type Step = 1 | 2 | 3 | 4;

const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const I = {
  monitor: "M2 3h12v8H2zM6 14h4M8 11v3",
  back: "M10 3 5 8l5 5",
  fwd: "M6 3l5 5-5 5",
  lock: "M4.5 7.5h7v5.5h-7zM6 7.5V5.6a2 2 0 0 1 4 0v1.9",
  search: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM14 14l-3.5-3.5",
  check: "M3.5 8.3 6.5 11l6-6.5",
};

// Motion flags; statics leave them at their defaults (everything shown).
type Flags = { asked?: boolean; working?: boolean; picked?: boolean; animate?: boolean; typed?: string; panel?: boolean };

function Chat({ step, asked = true, working = true, animate, typed }: { step: Step } & Flags) {
  const enter = animate ? "ill-assistant-turn--enter" : undefined;
  return (
    <section className="pac-chat pap pap--grok" data-name="Grok Bot / Chat">
      <div className="pac-thread">
        {asked && <div className={`pap-turn pap-turn--user${animate ? " ill-user-turn--enter" : ""}`}><p className="pap-bubble">{c.ask}</p></div>}
        {working && (
          <div className="pac-log">
            <div className={enter}><Activity line={c.steps.open} done={step > 1} /></div>
            {step >= 2 && <div className={enter}><Activity line={c.steps.search} done /></div>}
            {step >= 2 && <div className={enter}><Activity line={c.steps.found} done={step > 2} /></div>}
          </div>
        )}
        {step >= 3 && (
          <>
            <p className="pap-text">{animate ? <RichStagger text={c.answer} /> : c.answer}</p>
            <article className={`pac-result${animate ? " ill-assistant-turn--enter pac-late" : ""}`} data-name={`Result / ${c.pick.name}`}>
              <div className="pac-result__media"><img src={c.pick.image} alt={c.pick.name} /></div>
              <div className="pac-result__body">
                <small>Trailwell</small>
                <b>{c.pick.name} {c.pick.size}</b>
                <span>Charcoal · {$(c.pick.price)}</span>
              </div>
              <span className="pac-done"><Icon d={I.check} size={14} /> Task complete</span>
            </article>
          </>
        )}
      </div>
      {/* Motion: the shopper's message types here before it's sent. */}
      <div className={typed ? "pac-composer pac-composer--typing" : "pac-composer"}>
        {typed ? <span className="pac-composer__text">{typed}<span className="pac-caret" /></span> : "Ask Grok Bot anything"}
        <span className={typed ? "pac-send pac-send--ready" : "pac-send"} aria-hidden>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
        </span>
      </div>
    </section>
  );
}

function StoreHeader() {
  return (
    <header className="pac-store__head">
      <span className="pac-store__brand"><BrandMark brand="trailwell" className="pac-store__mark" />Trailwell</span>
      <nav>{["New", "Carry-ons", "Backpacks", "Bundles", "Sale"].map((n) => <span key={n}>{n}</span>)}</nav>
      <span className="pac-store__search"><Icon d={I.search} size={13} />black carry-on</span>
    </header>
  );
}

const Banner = () => (
  <div className="pac-banner">
    <span className="pac-banner__copy"><b>{c.missed.promo.title}</b><span>{c.missed.promo.detail}</span></span>
    <span className="pac-banner__cta">Shop carry-ons</span>
  </div>
);


// State 4, two treatments of "present but never seen". Both keep the
// storefront at full color; neither fades it.
type View = "split" | "scan";


const Bundle = () => (
  <article className="pac-mod" data-name="Bundle">
    <span className="pac-mod__media"><img src={c.pick.image} alt="" /><i>+3</i></span>
    <span><small>Bundle</small><b>{c.missed.bundle.title}</b><span><em>{$(c.missed.bundle.price)}</em> <s>{$(c.missed.bundle.was)}</s> · Save {$(c.missed.bundle.was - c.missed.bundle.price)}</span></span>
  </article>
);

const Premium = () => (
  <article className="pac-mod" data-name="Premium alternative">
    <span className="pac-mod__media"><img src={c.missed.premium.image} alt="" /></span>
    <span><small>Premium</small><b>{c.missed.premium.title}</b><span><em>{$(c.missed.premium.price)}</em> · {c.missed.premium.detail}</span></span>
  </article>
);

const MiniResults = ({ picked = true }: { picked?: boolean }) => (
  <div className="pac-mini">
    {c.results.map(({ bag, color, match }) => (
      <article key={bag.id} className={match && picked ? "pac-mini__card pac-mini__card--pick" : "pac-mini__card"}>
        <span className="pac-mini__media"><img src={bag.image} alt="" />{match && <span className="pac-agent-tag">Picked by Grok Bot</span>}</span>
        <b>{bag.name}</b><small>{color} · {$(bag.price)}</small>
      </article>
    ))}
  </div>
);

// 4A: the storefront beside the page as Grok Bot parsed it. The banner,
// bundle and premium bag are simply absent from its read.
function SplitView() {
  return (
    <div className="pac-split" data-name="Agent's-eye view">
      <section className="pac-split__shop">
        <p className="pac-split__label">What Trailwell shows</p>
        <Banner />
        <MiniResults />
        <div className="pac-split__mods"><Bundle /><Premium /></div>
      </section>
      <section className="pac-split__read" aria-label="What Grok Bot read">
        <p className="pac-split__label pac-split__label--agent">What Grok Bot read</p>
        <pre className="pac-read">{`GET ${c.url.search}

results (3)
  Roam 40L · Charcoal · $189   ← picked
  Weekender 30L · Forest · $148
  Overnight 24L · Sand · $132

filters  black, under $200`}</pre>
        <p className="pac-read__foot">1 page · 3 products · 0 offers</p>
      </section>
    </div>
  );
}

// 4B: one storefront page; Grok Bot's purple browsing light covers only
// the results it read. Everything outside it is untouched and unlit.
// Outside the lit region: greyed a little, with a neutral badge.
const Unread = ({ children }: { children: React.ReactNode }) => (
  <div className="pac-unread">
    <span className="pac-unread__badge">Not read by Grok Bot</span>
    <div className="pac-unread__body">{children}</div>
  </div>
);

// Frames 2 to 4B share this one page. `read` (4B) greys what the agent
// never read, badges it and outlines what it did; nothing moves.
function ScanView({ read = true, picked = true }: { read?: boolean; picked?: boolean }) {
  return (
    <div className={read ? "pac-scan pac-scan--read" : "pac-scan"} data-name="Scan coverage">
      <Unread><Banner /></Unread>
      <div className="pac-scan__row">
        <div className="pac-scan__lit">
          <span className="pac-scan__tag">Read by Grok Bot</span>
          <MiniResults picked={picked} />
        </div>
        <div className="pac-scan__side"><Unread><Bundle /></Unread><Unread><Premium /></Unread></div>
      </div>
    </div>
  );
}

function Computer({ step, view, picked, animate }: { step: Step; view?: View } & Flags) {
  // It never leaves the results page: the product page (and its bundle) go unseen.
  const url = step === 1 ? c.url.home : c.url.search;
  return (
    <section className="pac-pc" data-name="Grok Bot / Computer">
      <div className="pac-pc__bar">
        <span className="pac-pc__nav"><Icon d={I.back} size={14} /><Icon d={I.fwd} size={14} /></span>
        <span className="pac-pc__url"><Icon d={I.lock} size={12} />{url}</span>
        <span className={step < 3 ? "pac-pc__live" : "pac-pc__live pac-pc__live--off"}>{step < 3 ? "Grok Bot is browsing" : "Session ended"}</span>
      </div>
      {/* Keyed only on loading vs site, so the storefront and its header
          persist from browsing through the reveal instead of remounting. */}
      <div className="pac-store" key={animate ? (step === 1 ? "loading" : "site") : undefined} data-animate={animate || undefined}>
        {step === 1 ? (
          <div className="pac-loading"><span className="pac-spin" />Loading trailwell.com</div>
        ) : (
          <>
            {view !== "split" && <StoreHeader />}
            <div className="pac-page">
              {step === 4 && view === "split" ? <SplitView /> : <ScanView read={step === 4} picked={picked} />}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// `panel` (motion): the computer panel opens only once Grok starts working;
// before that the chat has the whole window.
function Scene({ step, view, mark, panel = true, ...flags }: { step: Step; view?: View; mark?: string } & Flags) {
  const state = mark ?? (step === 1 ? "working" : step === 2 ? "working" : "done");
  return (
    <div className="pac-app" data-step={step}>
      <header className="pac-top">
        <GrokMark state={state} />
        <span className="pac-top__title"><b>Grok Bot</b><small>{state === "working" ? "Working" : state === "done" ? "Done" : "Agent"}</small></span>
        <span className={state === "working" ? "pac-top__pc pac-top__pc--on" : "pac-top__pc"} title="Computer"><Icon d={I.monitor} /></span>
      </header>
      <div className="pac-body" data-panel={panel ? "open" : "closed"}>
        <Chat step={step} {...flags} />
        <Computer step={step} view={view} {...flags} />
      </div>
    </div>
  );
}

const FRAMES: { step: Step; view?: View; label: string }[] = [
  { step: 1, label: "1 · Request" },
  { step: 2, label: "2 · Browsing" },
  { step: 3, label: "3 · Task completed" },
  { step: 4, view: "split", label: "4A · Missed opportunities: agent's-eye view" },
  { step: 4, view: "scan", label: "4B · Missed opportunities: scan coverage" },
];

export function PaTheCase() {
  return (
    <section className="pac-section" data-name="The Case">
      {FRAMES.map(({ step, view, label }) => (
        <figure key={label} className="pac-figure">
          <figcaption className="app-stage__tile-label">The Case — {label}</figcaption>
          <div className="pac-stage"><LandscapeCanvas backdrop="green" bleed scene={<Scene step={step} view={view} />} /></div>
        </figure>
      ))}
    </section>
  );
}

/* Motion: one take, request to reveal, ending on 4B. Plays once it's on
   screen and holds on the final frame; it never loops. */
const beats: Beat[] = [
  { id: "ask", type: "compose", text: c.ask, leadMs: 700 },
  { id: "sent", type: "appear", ms: 500 },
  { id: "open", type: "pause", ms: 1500 },
  { id: "search", type: "pause", ms: 1300 },
  { id: "pick", type: "appear", ms: 1100 },
  { id: "answer", type: "text", text: c.answer },
  { id: "hold", type: "pause", ms: 1700 },
  { id: "reveal", type: "appear", ms: 1600 },
];

export function PaTheCaseMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(ref));
  const step: Step = t.reached("reveal") ? 4 : t.reached("answer") ? 3 : t.reached("search") ? 2 : 1;
  const working = t.reached("open");
  const mark = t.loading("sent") ? "ack" : working && !t.reached("answer") ? "working" : t.reached("answer") ? "done" : "idle";
  return (
    <figure className="pac-figure pap-motion" ref={ref}>
      <figcaption className="app-stage__tile-label">The Case</figcaption>
      <div className="pac-stage">
        <LandscapeCanvas backdrop="green" bleed scene={
          <div key={t.runKey}>
            <Scene step={step} view="scan" mark={mark} panel={working} asked={t.passed("ask")} typed={t.composer?.value} working={working} picked={t.reached("pick")} animate={!t.reducedMotion} />
          </div>
        } />
      </div>
    </figure>
  );
}
