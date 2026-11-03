import { ProductImage } from "./ProductImage";
import { BrowserBar, Composer, GptHeader, Text } from "../AiAssistants/AiAssistants";
import { $, helmet, priceWatch, restock, priceProduct } from "./data";
import { BrandMark } from "../../brands/BrandIdentity";

// "Reaches them first" (05, 06) — desktop ChatGPT, 530x330 on a 620x420 canvas. The same
// shell as 01–04 (06's chrome, header, composer and tokens), widened to
// ChatGPT's desktop layout: the collapsed sidebar rail and a centred
// 720px conversation column, so cards lay out horizontally.
//
// A later, proactive update is ChatGPT's own message under a day/time
// line, set apart by a light surface and a one-line label naming the
// alert that triggered it — the shopper can tell at a glance it's the
// condition they set, not a reply to something they just typed. This is
// a concept, not a claim about a shipping ChatGPT feature.



function DesktopState({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <figure className="aiv3-figure">
      <figcaption className="app-stage__tile-label">{name} — {label}</figcaption>
      <div className="aiv3w-canvas">
        <div className="aia aiv3 aiv3w" data-name={`${name} / ${label}`}>
          <BrowserBar />
          <div className="aia-gpt" data-name="ChatGPT">
            <Rail />
            <GptHeader />
            <div className="aia-scroll" data-name="Conversation">
              <div className="aia-thread">{children}</div>
            </div>
            <Composer send="voice" />
          </div>
        </div>
      </div>
    </figure>
  );
}

const Svg = ({ size = 18, children }: { size?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
export const bell = <path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15zM10 20.5a2 2 0 004 0" />;
export const tag = <><path d="M3.5 12.5V5a1.5 1.5 0 011.5-1.5h7.5l8 8-9 9z" /><circle cx="8.5" cy="8.5" r="1.4" /></>;

// ChatGPT's collapsed sidebar: toggle, new chat, search.
export function Rail() {
  return (
    <nav className="aiv3w-rail" data-name="Sidebar (collapsed)">
      <span className="aia-icon-btn"><Svg><rect x="3.5" y="4.5" width="17" height="15" rx="3" /><path d="M9.5 4.5v15" /></Svg></span>
      <span className="aia-icon-btn"><Svg><path d="M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" /><path d="M17.5 4.5l2 2-7 7H10.5v-2z" /></Svg></span>
      <span className="aia-icon-btn"><Svg><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></Svg></span>
    </nav>
  );
}

const User = ({ children, attach }: { children: React.ReactNode; attach?: React.ReactNode }) => (
  <div className="aia-turn aia-turn--user aiv3w-user" data-name="Turn / User">{attach}<p className="aia-bubble">{children}</p></div>
);
const Reply = ({ children }: { children: React.ReactNode }) => (
  <div className="aia-turn aia-turn--assistant" data-name="Turn / Assistant">{children}</div>
);

// The compact confirmation: exactly what is being watched.
export function Watch({ icon, title, detail, thumb }: { icon: React.ReactNode; title: string; detail: string; thumb: string }) {
  return (
    <div className="aiv3w-track" data-name="Alert">
      <span className="aiv3w-track__icon"><Svg size={16}>{icon}</Svg></span>
      <ProductImage className="aiv3w-track__thumb" src={thumb} alt="" />
      <span className="aiv3w-track__text"><b>{title}</b><small>{detail}</small></span>
      <span className="aiv3w-track__status"><i />Watching</span>
    </div>
  );
}

// The later update: day/time line, then ChatGPT's message on a light
// surface, labelled with the alert it answers.
export function Update({ when, icon, label, children }: { when: string; icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <>
      <p className="aiv3w-later" data-name="Later">{when}</p>
      <div className="aia-turn aia-turn--assistant aiv3w-update" data-name="Turn / Assistant (update)">
        <p className="aiv3w-update__label"><Svg size={14}>{icon}</Svg>{label}</p>
        {children}
      </div>
    </>
  );
}

/* 05 — Tell me when my size is back. ------------------------------- */

// Storybook's stock states: out of stock is a hairline badge on the image
// corner over a greyscale photo; back in stock is the green badge. The
// variant asked for stays picked either way.
export function StockCard({ inStock }: { inStock: boolean }) {
  return (
    <article className={inStock ? "aiv3w-card" : "aiv3w-card aiv3w-card--out"} data-name={`Product / CRESTLINE Enduro MTB Helmet Medium / ${inStock ? "In stock" : "Out of stock"}`}>
      <div className="aiv3w-card__media">
        <ProductImage src={restock.image} alt="" />
        <span className={inStock ? "aiv3w-badge aiv3w-badge--in" : "aiv3w-badge"}>{inStock ? "In stock" : "Out of stock"}</span>
      </div>
      <div className="aiv3w-card__body">
        <div className="aiv3w-card__head">
          <span><b className="aiv3-product-name"><BrandMark brand="crestline" />{helmet.name}</b><small>Graphite · Medium · MTB helmet</small></span>
          <span className="aiv3w-card__price">{$(helmet.price)}</span>
        </div>
        <div className="cv2-choice__row" aria-label="Variant">
          <span className="cv2-swatch cv2-swatch--picked"><span className="cv2-swatch__dot" style={{ background: "#45484b" }} />Graphite</span>
          <span className="aiv3w-card__sep" />
          {["S", "M", "L"].map((size) => <span key={size} className={size === "M" ? "cv2-seat cv2-seat--picked" : "cv2-seat"}>{size}</span>)}
        </div>
        {inStock ? (
          <div className="aiv3w-card__foot">
            <span className="aiv3w-card__note">{restock.left}</span>
            <span className="aiv3w-btn">Buy · {$(helmet.price)}</span>
          </div>
        ) : (
          <p className="aiv3w-card__note">{restock.alternatives}</p>
        )}
      </div>
    </article>
  );
}

export const restockWatch = <Watch icon={bell} title="Restock alert on" detail={`CRESTLINE · ${helmet.name} · Graphite · M · ${$(helmet.price)}`} thumb={restock.image} />;

export function V3BackInStock() {
  const name = "05 Tell me when my size is back.";
  return (
    <section className="aiv3-section aiv3-section--stack" data-name={name}>
      <DesktopState name={name} label="1 · Request">
        <User>{restock.ask}</User>
        <Reply>
          <Text runs={restock.sold} />
          <StockCard inStock={false} />
        </Reply>
      </DesktopState>
      <DesktopState name={name} label="2 · Confirmation">
        <User>{restock.ask}</User>
        <Reply>
          <Text runs={restock.confirm} />
          {restockWatch}
        </Reply>
      </DesktopState>
      <DesktopState name={name} label="3 · Back in stock">
        <Update when={restock.when} icon={bell} label="Restock alert · Enduro MTB Helmet, Graphite, M">
          <Text runs={restock.back} />
          <StockCard inStock />
        </Update>
      </DesktopState>
    </section>
  );
}

/* 06 — Let me know when it drops below my budget. ------------------ */

// The product the shopper is looking at rides with their message (a
// reference, not a result), aligned to their bubble.
export function Viewing() {
  return (
    <div className="aiv3w-ref" data-name="Viewing / Aurelle Teardrop Pendant">
      <ProductImage src={priceProduct.image} alt="" />
      <span className="aiv3w-ref__text"><b>{priceProduct.name}</b><small>Aurelle · {$(priceProduct.was)}</small></span>
    </div>
  );
}

export function PriceCard() {
  return (
    <article className="aiv3w-card aiv3w-card--deal" data-name="Product / Aurelle Teardrop Pendant / Price drop">
      <div className="aiv3w-card__media">
        <ProductImage src={priceProduct.image} alt="" />
      </div>
      <div className="aiv3w-card__body">
        <div className="aiv3w-card__head">
          <span><b className="aiv3-product-name"><BrandMark brand="aurelle" />{priceProduct.name}</b><small>{priceProduct.note}</small></span>
        </div>
        <p className="aiv3w-deal">
          <span className="aiv3w-deal__now">{$(priceProduct.now)}</span>
          <s>{$(priceProduct.was)}</s>
          <span className="aiv3w-deal__save">You save {$(priceProduct.was - priceProduct.now)}</span>
        </p>
        <div className="aiv3w-card__foot">
          <span className="aiv3w-card__note">Your limit was {$(priceProduct.target)}</span>
          <span className="aiv3w-btn">View product</span>
        </div>
      </div>
    </article>
  );
}

export const priceAlert = <Watch icon={tag} title={`Watching for price below ${$(priceProduct.target)}`} detail={`Aurelle · ${priceProduct.name} · now ${$(priceProduct.was)}`} thumb={priceProduct.image} />;

export function V3PriceDrop() {
  const name = "06 Let me know when it drops below my budget.";
  return (
    <section className="aiv3-section aiv3-section--stack" data-name={name}>
      <DesktopState name={name} label="1 · Request">
        <User attach={<Viewing />}>{priceWatch.ask}</User>
      </DesktopState>
      <DesktopState name={name} label="2 · Confirmation">
        <User attach={<Viewing />}>{priceWatch.ask}</User>
        <Reply>
          <Text runs={priceWatch.confirm} />
          {priceAlert}
        </Reply>
      </DesktopState>
      <DesktopState name={name} label="3 · Price drop">
        <Update when={priceWatch.when} icon={tag} label={`Price alert · Teardrop Pendant under ${$(priceProduct.target)}`}>
          <Text runs={priceWatch.drop} />
          <PriceCard />
        </Update>
      </DesktopState>
    </section>
  );
}
