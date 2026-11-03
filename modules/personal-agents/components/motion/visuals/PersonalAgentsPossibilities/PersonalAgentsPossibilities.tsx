import { BrandMark } from "../../brands/BrandIdentity";
import { LoadingFrame } from "../../illustrations/SellMotion/LoadingFrame";
import museMarkImage from "@/modules/personal-agents/assets/motion/hero/entry-points/muse-fill.svg";
import { $, brand, offers, shoes, whatsNew, whyThis, type Bag, type Run } from "./data";


const museMark = museMarkImage.src;

// Personal Agents → Possibilities. Three visuals inside the shopper's own
// agent: Muse (light) and Grok Bot (dark). Crossword never gets its own
// window; the merchant answers inside the agent's thread as a white
// "[Brand] via Crossword" card, as in the Muse/Grok reference. The
// agent's own words stay plain text. Each visual lays its static states
// out in sequence (A, B, C) for the motion pass; 789x579 canvas, 500x460
// window, as AI Assistants V3 01.

export type Agent = "muse" | "grok";

export function State({ agent, name, label, status, children }: { agent: Agent; name: string; label: string; status?: string; children: React.ReactNode }) {
  return (
    <figure className="pap-figure">
      <figcaption className="app-stage__tile-label">{name} — {label}</figcaption>
      <div className="pap-canvas">
        <div className={`pap pap--${agent}`} data-name={`${name} / ${label}`}>
          <AgentHeader agent={agent} status={status} />
          <div className="pap-thread" data-name="Conversation">{children}</div>
        </div>
      </div>
    </figure>
  );
}

// Grok Bot's avatar carries its state (Working, Thinking) in place of
// typing dots, per xAI's Grok Bot design notes; `status` swaps the subtitle.
export function AgentHeader({ agent, status, state }: { agent: Agent; status?: string; state?: string }) {
  return (
    <header className={status ? "pap-header pap-header--busy" : "pap-header"} data-name="Header">
      {agent === "muse" ? <span className="pap-logo pap-logo--muse" aria-hidden><img src={museMark} alt="" /></span> : <GrokMark state={state} />}
      <span className="pap-header__title">
        <b>{agent === "muse" ? "Muse" : "Grok Bot"}</b>
        <small>{status ?? (agent === "muse" ? "Personal agent" : "Agent")}</small>
      </span>
    </header>
  );
}

// The Grok mark (supplied grok.svg), white on Grok's black tile. Its two
// subpaths are kept apart so the motion layer can move them: the right
// crescent with the upper blade, and the left crescent with the lower.
export const GrokGlyph = () => (
  <svg className="pap-grok" viewBox="-5 -5 34 34" fill="#fff" fillRule="evenodd" aria-hidden>
    <g className="pap-grok__halves">
      <path className="pap-grok__blade" d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292" />
      <path className="pap-grok__half" d="M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" />
    </g>
  </svg>
);

// `state` (motion only): idle, ack, working, thinking or done.
export const GrokMark = ({ state }: { state?: string }) => (
  <span className="pap-logo pap-logo--grok" data-state={state} aria-hidden><GrokGlyph /></span>
);

export const User = ({ children, refBag, refBrand = brand.name, className = "" }: { children: React.ReactNode; refBag?: Bag; refBrand?: string; className?: string }) => (
  <div className={`pap-turn pap-turn--user ${className}`} data-name="Turn / Shopper">
    {refBag && (
      <span className="pap-ref" data-name={`Reference / ${refBag.name}`}>
        <img src={refBag.image} alt="" />
        <span><b>{refBrand} {refBag.name}</b><small>{$(refBag.price)}</small></span>
      </span>
    )}
    <p className="pap-bubble">{children}</p>
  </div>
);

// The agent at work: its native typing pill, plus one muted line naming
// who it is asking.
export const Working = ({ line }: { line: string }) => (
  <div className="pap-working" data-name="Working">
    <span className="pap-dots" aria-hidden><i /><i /><i /></span>
    <span className="pap-working__line">{line}</span>
  </div>
);

// Grok Bot logs each step in the transcript instead: a live line while it
// works, then the finished step, muted with a check.
export const Activity = ({ line, done = false }: { line: string; done?: boolean }) => (
  <div className={done ? "pap-activity pap-activity--done" : "pap-activity"} data-name="Activity">
    {done ? (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m3.5 8.3 2.8 2.7 6.2-6.3" /></svg>
    ) : <span className="pap-activity__spin" aria-hidden />}
    <span className="pap-activity__line">{line}</span>
  </div>
);

// Wraps one result in the kit's skeleton cover when the motion passes
// `loading`; statics leave it unset and render the content bare.
export const Load = ({ loading, i, radius = 16, children }: { loading?: boolean; i: number; radius?: number; children: React.ReactNode }) =>
  loading === undefined ? <>{children}</> : <LoadingFrame loading={loading} radius={radius} resolveDelayMs={i * 120}>{children}</LoadingFrame>;

export const Text = ({ runs }: { runs: Run[] }) => (
  <p className="pap-text" data-name="Turn / Agent">{runs.map((r, i) => (typeof r === "string" ? r : <b key={i}>{r.b}</b>))}</p>
);

export function Merchant({ reply, brand = "trailwell", name = "Trailwell", children }: { reply: React.ReactNode; brand?: string; name?: string; children?: React.ReactNode }) {
  return (
    <section className="pap-merchant" data-name={`${name} via Crossword`}>
      <span className="pap-via"><BrandMark brand={brand} className="pap-via__mark" /><b>{name}</b> via Crossword</span>
      <p className="pap-merchant__reply">{reply}</p>
      {children}
    </section>
  );
}

const StockDot = ({ low }: { low: boolean }) => <i className={low ? "pap-stock__dot pap-stock__dot--low" : "pap-stock__dot"} />;

/* 01 — What's new? ------------------------------------------------ */

export function NewArrivals({ loading }: { loading?: boolean }) {
  return (
    <div className="pap-cards" data-name="Products">
      {whatsNew.picks.map(({ bag, stock, low }, i) => (
        <Load key={bag.id} loading={loading} i={i}><article key={bag.id} className="pap-card" data-name={`Product / ${bag.name}`}>
          <div className="pap-card__media"><img src={bag.image} alt={bag.name} /><span className="pap-badge">New</span></div>
          <div className="pap-card__body">
            <b>{bag.name}</b>
            <small>{bag.size} · {bag.color}</small>
            <span className="pap-card__price">{$(bag.price)}</span>
            <span className={low ? "pap-stock pap-stock--low" : "pap-stock"}><StockDot low={low} />{stock}</span>
          </div>
        </article></Load>
      ))}
    </div>
  );
}

export function PaWhatsNew() {
  const name = "01 What's new?";
  return (
    <section className="pap-section" data-name={name}>
      <State agent="muse" name={name} label="A · Muse asks Stride">
        <User>{whatsNew.ask}</User>
        <Working line="Asking Stride via Crossword" />
      </State>
      <State agent="muse" name={name} label="B · Stride responds">
        <User>{whatsNew.ask}</User>
        <Merchant brand={brand.id} name={brand.name} reply={whatsNew.reply}><NewArrivals /></Merchant>
      </State>
      <State agent="muse" name={name} label="C · Muse recommends">
        <Merchant brand={brand.id} name={brand.name} reply={whatsNew.reply}><NewArrivals /></Merchant>
        <Text runs={whatsNew.muse} />
      </State>
    </section>
  );
}

/* 02 — Why this one? ---------------------------------------------- */

const BenefitIcon = ({ i }: { i: number }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {i === 0 && <><path d="M3 10.5h10l-1.2 3H4.2z" /><path d="M8 10.5V3M5.5 5.5 8 3l2.5 2.5" /></>}
    {i === 1 && <path d="M8 1.75 13.5 4v4c0 3.1-2.3 5.4-5.5 6.25C4.8 13.4 2.5 11.1 2.5 8V4z" />}
    {i === 2 && <><path d="M8 1.75 13.5 4v4c0 3.1-2.3 5.4-5.5 6.25C4.8 13.4 2.5 11.1 2.5 8V4z" /><path d="m5.6 8 1.7 1.7 3.2-3.4" /></>}
  </svg>
);

export function Enriched({ loading }: { loading?: boolean }) {
  const p = shoes.court;
  return (
    <div className="pap-detail" data-name={`Product detail / ${p.name}`}>
      <div className="pap-detail__head">
        <img src={p.image} alt={p.name} />
        <span><b>{p.name}</b><small>{whyThis.meta} · {p.color}</small></span>
        <span className="pap-detail__price">{$(p.price)}</span>
      </div>
      <ul className="pap-benefits">
        {whyThis.benefits.map((b, i) => (
          <li key={b.title}><Load loading={loading} i={i} radius={10}><span className="pap-benefits__row"><span className="pap-benefits__icon"><BenefitIcon i={i} /></span><span><b>{b.title}</b><small>{b.detail}</small></span></span></Load></li>
        ))}
      </ul>
    </div>
  );
}

export function Pick() {
  const p = shoes.court;
  return (
    <article className="pap-pick" data-name={`Recommended / ${p.name}`}>
      <div className="pap-pick__media"><img src={p.image} alt={p.name} /></div>
      <div className="pap-pick__body">
        <span className="pap-pick__tag">{whyThis.pick}</span>
        <b>{brand.name} {p.name}</b>
        <small>{p.color} · {p.size} · {whyThis.pickMeta}</small>
        <span className="pap-pick__price">{$(p.price)}</span>
        <span className="pap-pick__actions">
          <span className="pap-btn">Add to cart</span>
          <span className="pap-puck" aria-hidden>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" /></svg>
          </span>
        </span>
      </div>
    </article>
  );
}

export function PaWhyThis() {
  const name = "02 Why this one?";
  return (
    <section className="pap-section" data-name={name}>
      <State agent="grok" name={name} label="A · Grok Bot asks Stride" status="Working">
        <User refBag={shoes.court}>{whyThis.ask}</User>
        <Activity line={whyThis.working} />
      </State>
      <State agent="grok" name={name} label="B · Stride explains">
        <User>{whyThis.ask}</User>
        <Activity line={whyThis.worked} done />
        <Merchant brand={brand.id} name={brand.name} reply={whyThis.reply}><Enriched /></Merchant>
      </State>
      <State agent="grok" name={name} label="C · Grok Bot recommends">
        <Text runs={whyThis.grok} />
        <Pick />
      </State>
    </section>
  );
}

/* 03 — Is there an offer? ----------------------------------------- */

export function OfferCards({ loading }: { loading?: boolean }) {
  return (
    <div className="pap-offers" data-name="Offers">
      {offers.cards.map((o, i) => (
        <Load key={o.id} loading={loading} i={i} radius={14}><article key={o.id} className="pap-offer" data-name={`Offer / ${o.label}`}>
          <img src={o.image} alt="" />
          <span className="pap-offer__text">
            <small className="pap-offer__label">{o.label}</small>
            <b>{o.title}</b>
            <small>{o.condition}</small>
          </span>
          <span className="pap-offer__price">
            <b>{$(o.price)}</b>
            <s>{$(o.was)}</s>
            <span className="pap-offer__save">Save {$(o.was - o.price)}</span>
          </span>
        </article></Load>
      ))}
    </div>
  );
}

export function PaOffer() {
  const name = "03 Is there an offer?";
  return (
    <section className="pap-section" data-name={name}>
      <State agent="muse" name={name} label="A · Muse checks offers">
        <User>{offers.ask}</User>
        <Working line="Checking Stride offers via Crossword" />
      </State>
      <State agent="muse" name={name} label="B · Stride's offers">
        <User>{offers.ask}</User>
        <Merchant brand={brand.id} name={brand.name} reply={offers.reply}><OfferCards /></Merchant>
      </State>
      <State agent="muse" name={name} label="C · Muse lays out the options">
        <Merchant brand={brand.id} name={brand.name} reply={offers.reply}><OfferCards /></Merchant>
        <Text runs={offers.muse} />
      </State>
    </section>
  );
}
