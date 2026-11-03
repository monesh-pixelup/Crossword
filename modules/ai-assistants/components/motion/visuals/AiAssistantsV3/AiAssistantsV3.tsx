import { ProductImage } from "./ProductImage";
import { BrowserBar, Composer, GptHeader, ProductTile, Text } from "../AiAssistants/AiAssistants";
import { ComparisonCard } from "../../illustrations/UpsellV2/UpsellV2Motion";
import { BrandWordmark } from "../../brands/BrandIdentity";
import { $, copy, gifts, kit, machine, skincare, sleep, sleepSmall, type Product } from "./data";

function State({ name, label, children, typing }: { name: string; label: string; children: React.ReactNode; typing?: string }) {
  return (
    <figure className="aiv3-figure">
      <figcaption className="app-stage__tile-label">{name} — {label}</figcaption>
      <div className="aiv3-canvas">
        <div className="aia aiv3" data-name={`${name} / ${label}`}>
          <BrowserBar />
          <div className="aia-gpt" data-name="ChatGPT">
            <GptHeader />
            <div className="aia-scroll" data-name="Conversation">
              <div className="aia-thread">{children}</div>
            </div>
            <Composer send={typing ? "send" : "voice"} value={typing} />
          </div>
        </div>
      </div>
    </figure>
  );
}

const User = ({ children }: { children: React.ReactNode }) => (
  <div className="aia-turn aia-turn--user" data-name="Turn / User"><p className="aia-bubble">{children}</p></div>
);

const Reply = ({ children }: { children: React.ReactNode }) => (
  <div className="aia-turn aia-turn--assistant" data-name="Turn / Assistant">{children}</div>
);

export const Merchant = ({ brand }: { brand: string }) => <p className="aiv3-merchant"><BrandWordmark brand={brand} /></p>;

export const tile = (p: Product, note = p.note) => ({ id: p.id, name: p.name, price: $(p.price), note, image: p.image });

export function Tiles({ items, selected }: { items: { p: Product; note?: string }[]; selected?: Product["id"] }) {
  return (
    <div className="aia-carousel aiv3-tiles" data-name="Products">
      {items.map(({ p, note }) => (
        <div key={p.id} className={selected ? (selected === p.id ? "aiv3-pick aiv3-pick--on" : "aiv3-pick aiv3-pick--off") : "aiv3-pick"}>
          <ProductTile product={tile(p, note)} media={<ProductImage src={p.image} alt={p.name} />} />
        </div>
      ))}
    </div>
  );
}

// Compact row: the same product, thumb and price as its tile, so the
// shortlist reads as one set of objects wherever it reappears.
export function Row({ p, fact, state }: { p: Product; fact: React.ReactNode; state?: "on" | "off" | "idle" }) {
  return (
    <div className={state ? `aiv3-row aiv3-row--${state}` : "aiv3-row"} data-name={`Row / ${p.name}`}>
      <ProductImage className="aiv3-row__thumb" src={p.image} alt="" />
      <span className="aiv3-row__text"><b>{p.name}</b><small>{fact}</small></span>
      <span className="aiv3-row__price">{$(p.price)}</span>
      {state && <span className="aiv3-row__check">{state === "on" && <Check />}</span>}
    </div>
  );
}

export const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2.5 6.2l2.3 2.3 4.7-5" /></svg>
);

/* 01 — Which one should I get? ------------------------------------- */

export const THREE = [skincare.hydrating, skincare.calming, skincare.vitaminC].map((p) => ({ p, note: p.note }));
export const CMP_COLUMNS = [skincare.hydrating, skincare.calming].map((p) => ({ name: `${p === skincare.hydrating ? "Hydrating" : "Calming"} · ${$(p.price)}`, image: p.image }));
export const CMP_ROWS = [
  { label: "Routine", values: ["Daily hydration", "Gentle care"] },
  { label: "Formula", values: ["Hydrating serum", "Fragrance-free serum"] },
];

export function V3Which() {
  return (
    <section className="aiv3-section" data-name="01 Which one should I get?">
      <State name="01 Which one should I get?" label="A · Three options">
        <User>{copy.which.ask}</User>
        <Reply>
          <Merchant brand="sorelle-labs" /><Text runs={copy.which.picks} />
          <Tiles items={THREE} />
        </Reply>
      </State>
      <State name="01 Which one should I get?" label="B · Why it costs more">
        <User>{copy.which.why}</User>
        <Reply>
          <Merchant brand="sorelle-labs" /><Text runs={copy.which.because} />
          <div className="aiv3-cmp">
            <ComparisonCard loading={false} columns={CMP_COLUMNS} rows={CMP_ROWS} />
          </div>
        </Reply>
      </State>
    </section>
  );
}

/* 02 — The espresso machine, with the starter kit. ---------------------- */

export function Configurator({ kitOn }: { kitOn: boolean }) {
  const total = machine.price + (kitOn ? kit.price : 0);
  return (
    <section className="aiv3-config" data-name={`Configurator / BREWHAUS${kitOn ? " with brewing kit" : ""}`}>
      <div className="aiv3-config__media"><ProductImage src={machine.image} alt={machine.name} /></div>
      <div className="aiv3-config__body">
        <div className="aiv3-config__head">
          <span><b>{machine.name}</b><small>Brushed steel · Qty 1</small></span>
          <span className="aiv3-config__price">{$(total)}</span>
        </div>
        <div className={kitOn ? "aiv3-bundle aiv3-bundle--on" : "aiv3-bundle"} data-name="Bundle">
          <ProductImage src={kit.image} alt={kit.name} />
          <span className="aiv3-bundle__text"><b>Three-piece brewing kit</b><small>Frother, reusable filter & starter pack · {$(kit.price)}</small></span>
          <span className="aiv3-bundle__box">{kitOn && <Check />}</span>
        </div>
      </div>
    </section>
  );
}

export function V3Configure() {
  return (
    <section className="aiv3-section" data-name="02 The espresso machine, with the starter kit.">
      <State name="02 The espresso machine, with the starter kit." label="A · Before" typing={copy.configure.ask}>
        <Reply>
          <Merchant brand="brewhaus" /><Text runs={copy.configure.intro} />
          <Configurator kitOn={false} />
        </Reply>
      </State>
      <State name="02 The espresso machine, with the starter kit." label="B · After">
        <User>{copy.configure.ask}</User>
        <Reply>
          <Merchant brand="brewhaus" /><Text runs={copy.configure.done} />
          <Configurator kitOn />
        </Reply>
      </State>
    </section>
  );
}

/* 03 — Choose this one. --------------------------------------------- */

const shortlist = gifts.map((p) => ({ p, note: p.note }));
export { shortlist as SHORTLIST };

// The shortlist as rows, each with its under-seat fact; `picked` gives
// one the selected state and steps the others back.
// `selectable` (motion) lays the rows out for picking before one is picked.
export function ShortlistRows({ picked, selectable = !!picked }: { picked?: Product["id"]; selectable?: boolean }) {
  return (
    <div className={selectable ? "aiv3-rows aiv3-rows--select" : "aiv3-rows"}>
      {shortlist.map(({ p }) => (
        <Row key={p.id} p={p} fact={p.note} state={!selectable ? undefined : picked ? (p.id === picked ? "on" : "off") : "idle"} />
      ))}
    </div>
  );
}

export function V3Shortlist() {
  return (
    <section className="aiv3-section" data-name="03 Choose this one.">
      <State name="03 Choose this one." label="A · Shortlist">
        <User>{copy.shortlist.ask}</User>
        <Reply>
          <Merchant brand="aurelle" /><Text runs={copy.shortlist.picks} />
          <Tiles items={shortlist} />
        </Reply>
      </State>
      <State name="03 Choose this one." label="B · Follow-up">
        <User>{copy.shortlist.follow}</User>
        <Reply>
          <Merchant brand="aurelle" /><Text runs={copy.shortlist.answer} />
          <ShortlistRows />
        </Reply>
      </State>
      <State name="03 Choose this one." label="C · Selected">
        <User>{copy.shortlist.choose}</User>
        <Reply>
          <Merchant brand="aurelle" /><Text runs={copy.shortlist.chosen} />
          <ShortlistRows picked="bracelet-1" />
        </Reply>
      </State>
    </section>
  );
}

/* 04 — I'm looking for the best value. ----------------------------- */

export const Spotlight = () => (
  <article className="aiv3-spot" data-name="Recommended / Goodwell Daily Sleep 60 count">
    <div className="aiv3-spot__media"><ProductImage src={sleep.image} alt={sleep.name} /></div>
    <div className="aiv3-spot__body">
      <p className="aiv3-spot__name">{sleep.name} <span>{$(sleep.price)}</span></p>
      <ul className="aiv3-spot__facts">
        <li>$0.50 per gummy in the 60-count jar</li>
        <li>The 28-count jar is $0.64 per gummy</li>
      </ul>
      <p className="aiv3-value-note">Same Goodwell formula, compared by jar size.</p>
    </div>
  </article>
);

export const Alternatives = () => (
  <div className="aiv3-rows aiv3-rows--two">
    <Row p={sleepSmall} fact="Goodwell · 28 count" />
  </div>
);

export function V3Value() {
  return (
    <section className="aiv3-section" data-name="04 I'm looking for the best value.">
      <State name="04 I'm looking for the best value." label="A · Recommendation">
        <User>{copy.value.ask}</User>
        <Reply>
          <Merchant brand="goodwell" /><Text runs={copy.value.pick} />
          <Spotlight />
          <Alternatives />
        </Reply>
      </State>
    </section>
  );
}
