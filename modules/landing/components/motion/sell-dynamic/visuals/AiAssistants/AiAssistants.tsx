import type { ReactElement } from "react";
import addressIcon from "../../assets/ill-icons/address.svg";
import { bundle, domain, merchant, picks, placeholder, promo, status, steps, transcript, type Product, type Run, type Turn } from "./data";

// AI Assistants — "Where you control the experience inside ChatGPT".
// Five static 550x520 frames on the 738x680 crimson canvas. The outer
// shell is the Ad Journey / AI Search window (page fill, hairline, 12px
// radius, Crossword browser chrome); everything below the chrome is
// ChatGPT's own light UI with no Crossword styling. One transcript renders in every frame, anchored to
// the composer, so each step only appends turns and earlier ones scroll
// up — motion later is a single translate per step:
//   01  first user turn pinned at the top, reply in progress (status
//       line, loading tiles in the carousel's exact slots, stop button)
//   02  tiles resolve into the three-card carousel
//   03  shopper picks; carousel stays in view above their turn
//   04  set card + promotion inside the reply
//   05  shopper takes the set; compact order summary closes the turn
export type Step = 1 | 2 | 3 | 4 | 5;

export type IconName = "send" | "chevron" | "share" | "dots" | "plus" | "mic" | "voice" | "stop" | "copy" | "up" | "down" | "retry" | "gift";

const paths: Record<IconName, ReactElement> = {
  send: <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />,
  chevron: <path d="M7 10l5 5 5-5" />,
  share: <><path d="M12 14V4M8 7.5L12 3.5l4 4" /><path d="M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" /></>,
  dots: <><circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  mic: <><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" /></>,
  voice: <path d="M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" />,
  stop: <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" />,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path d="M15.5 8.5V7a2.5 2.5 0 00-2.5-2.5H7A2.5 2.5 0 004.5 7v6A2.5 2.5 0 007 15.5h1.5" /></>,
  up: <path d="M7.5 20.5h-2a1 1 0 01-1-1v-8a1 1 0 011-1h2m0 10V10.5l3.6-6.3a1.6 1.6 0 012.9 1.1l-.6 4.2h4.4a2 2 0 012 2.4l-1.3 6.6a2 2 0 01-2 1.5H7.5z" />,
  down: <path d="M16.5 3.5h2a1 1 0 011 1v8a1 1 0 01-1 1h-2m0-10v10l-3.6 6.3a1.6 1.6 0 01-2.9-1.1l.6-4.2H5.2a2 2 0 01-2-2.4l1.3-6.6a2 2 0 012-1.5h10z" />,
  retry: <><path d="M19.5 12a7.5 7.5 0 11-2.2-5.3" /><path d="M19.5 4.5v3.5H16" /></>,
  gift: <><rect x="4" y="8.5" width="16" height="4" rx="1" /><path d="M5.5 12.5V19a1 1 0 001 1h11a1 1 0 001-1v-6.5M12 8.5V20M12 8.5C10.8 5.5 7.5 4.6 7.5 6.6c0 1.6 2.8 1.9 4.5 1.9zm0 0c1.2-3 4.5-3.9 4.5-1.9 0 1.6-2.8 1.9-4.5 1.9z" /></>,
};

export function Glyph({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg className="aia-glyph" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function Text({ runs }: { runs: Run[] }) {
  return <p className="aia-reply">{runs.map((r, i) => (typeof r === "string" ? r : <strong key={i}>{r.b}</strong>))}</p>;
}

// ChatGPT shopping tile: image with the selection circle, title, then
// "price • note" in secondary text. No badges — the Deep Hydration Cream
// leads through order and the reply's bold, not a ranking label.
export function ProductTile({ product, wide = false }: { product: Product; wide?: boolean }) {
  return (
    <article className={wide ? "aia-tile aia-tile--wide" : "aia-tile"} data-name={`Product / ${product.name}`}>
      <div className="aia-tile__media">
        <img src={product.image} alt="" />
        {!wide && <span className="aia-tile__select" />}
      </div>
      <p className="aia-tile__name">{product.name}</p>
      <p className="aia-tile__meta">{product.price} • {product.note}</p>
      {wide && (
        <p className="aia-tile__promo"><Glyph name="gift" size={14} /><span><strong>{promo.name}</strong> • {promo.detail}</span></p>
      )}
    </article>
  );
}

export function LoadingTile() {
  return (
    <div className="aia-tile aia-tile--loading" data-name="Product / Loading">
      <div className="aia-tile__media" />
      <span className="aia-bar" style={{ width: "72%" }} />
      <span className="aia-bar" style={{ width: "88%" }} />
    </div>
  );
}

// Illustrative integrated checkout (conceptual, not ChatGPT's default):
// the merchant, the set and the promotion it unlocked.
export function OrderSummary() {
  return (
    <section className="aia-order" data-name="Order summary">
      <p className="aia-order__merchant"><span className="aia-order__mark">S</span>{merchant}</p>
      <div className="aia-order__row">
        <img className="aia-order__thumb" src={bundle.image} alt="" />
        <span className="aia-order__text"><b>{bundle.name}</b><small>Cream, mask, travel cleanser</small></span>
        <span className="aia-order__price">{bundle.price}</span>
      </div>
      <div className="aia-order__row">
        <span className="aia-order__thumb aia-order__thumb--gift"><Glyph name="gift" size={18} /></span>
        <span className="aia-order__text"><b>{promo.name}</b><small>{promo.resolved}</small></span>
      </div>
    </section>
  );
}

export function Actions() {
  return (
    <div className="aia-actions" data-name="Message actions">
      {(["copy", "up", "down", "share", "retry"] as IconName[]).map((n) => <span key={n}><Glyph name={n} size={16} /></span>)}
    </div>
  );
}

function TurnView({ turn, last }: { turn: Turn; last: boolean }) {
  if (turn.role === "user") {
    return <div className="aia-turn aia-turn--user" data-name="Turn / User"><p className="aia-bubble">{turn.text}</p></div>;
  }
  return (
    <div className="aia-turn aia-turn--assistant" data-name="Turn / Assistant">
      <Text runs={turn.text} />
      {turn.result === "picks" && <div className="aia-carousel">{picks.map((p) => <ProductTile key={p.id} product={p} />)}</div>}
      {turn.result === "bundle" && <ProductTile product={bundle} wide />}
      {turn.result === "order" && <OrderSummary />}
      {last && turn.result === "order" && <Actions />}
    </div>
  );
}

export function BrowserBar() {
  return (
    <div className="sdm-ill-browser-chrome">
      <div className="sdm-ill-browser-chrome__dots"><span></span><span></span><span></span></div>
      <div className="sdm-ill-browser-chrome__address">
        <img src={addressIcon.src} width="10" height="11" alt="" />
        <span>{domain}</span>
      </div>
    </div>
  );
}

export function GptHeader() {
  return (
    <header className="aia-header" data-name="Header">
      <span className="aia-model">ChatGPT<Glyph name="chevron" size={16} /></span>
      <span className="aia-header__end">
        <span className="aia-share"><Glyph name="share" size={16} />Share</span>
        <span className="aia-icon-btn"><Glyph name="dots" size={18} /></span>
      </span>
    </header>
  );
}

// `value` (motion only) is text being typed, shown in place of the
// placeholder. The send glyph is keyed so a swap remounts it.
export function Composer({ send, value }: { send: IconName; value?: React.ReactNode }) {
  return (
    <div className="aia-composer" data-name="Composer">
      <div className="aia-composer__field">
        <span className="aia-icon-btn"><Glyph name="plus" size={20} /></span>
        {value ? (
          <span className="aia-composer__placeholder aia-composer__value">{value}</span>
        ) : (
          <span className="aia-composer__placeholder">{placeholder}</span>
        )}
        <span className="aia-icon-btn"><Glyph name="mic" size={18} /></span>
        <span className="aia-send"><Glyph key={send} name={send} size={18} /></span>
      </div>
    </div>
  );
}

export function AiAssistantsFrame({ step }: { step: Step }) {
  const { turns } = steps[step - 1];
  const shown = transcript.slice(0, turns);
  const generating = step === 1;
  return (
    <div className="aia-canvas">
      <div className="aia" data-name={`AI Assistants / ${String(step).padStart(2, "0")}`}>
        <BrowserBar />
        <div className="aia-gpt" data-name="ChatGPT">
          <GptHeader />
          <div className="aia-scroll" data-name="Conversation">
            <div className="aia-thread">
              {shown.map((t, i) => <TurnView key={i} turn={t} last={i === shown.length - 1} />)}
              {generating && (
                <div className="aia-turn aia-turn--assistant" data-name="Turn / Assistant (in progress)">
                  <p className="aia-status">{status}</p>
                  <div className="aia-carousel">{picks.map((p) => <LoadingTile key={p.id} />)}</div>
                </div>
              )}
            </div>
          </div>
          <Composer send={generating ? "stop" : "voice"} />
        </div>
      </div>
    </div>
  );
}

export function AiAssistants() {
  return (
    <section className="aia-section" data-name="AI Assistants">
      {([1, 2, 3, 4, 5] as Step[]).map((s) => (
        <figure className="aia-figure" key={s}>
          <figcaption className="app-stage__tile-label">AI Assistants / {String(s).padStart(2, "0")} — {steps[s - 1].label}</figcaption>
          <AiAssistantsFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
