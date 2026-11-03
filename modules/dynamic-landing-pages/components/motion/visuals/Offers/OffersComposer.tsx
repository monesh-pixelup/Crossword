import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { ContentFade } from "../../components/ill/ContentFade";
import { Rating } from "../../components/ill/Rating";
import { Nav } from "../AiSearch/AiSearch";
import { ChatHead, ChatFoot, AiMsg } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { StorybookKnock } from "../ProactiveV2/StorybookKnock";
import { Ad } from "./Offers";
import { brand, composerSteps, domain, hero, knock, offer, product } from "./data";

// Sell: Offers 11b — 11's ad, but the tap lands on Goodwell's page with
// Crossword's composer resting at the foot, and the Storybook's
// post-checkout offer (BarProactiveWeb PostCheckoutSeat, NDG-08) knocking
// 16px above it: the ported StorybookKnock, "No, thanks" quiet first,
// "Show coupon" primary last. A tap on the card opens the chat on the
// offer: the knock's full line as the greet, the trail's chips after it
// with the coupon code as the LAST chip (the shipped CodeChip at the
// chips' own size, on the offer's tint).
export type Step = 1 | 2 | 3;

export function Landing() {
  return (
    <div className="ais-page">
      <Nav searching={false} />
      <div className="ais-body">
        <div className="pcx-scroll ofr-scroll">
          <section className="ofr-hero" data-name="Hero">
            <p className="pcx-eyebrow">{hero.eyebrow}</p>
            <h2 className="pcx-hero__headline ofr-hero__headline">{hero.headline}</h2>
            <p className="pcx-hero__sub">{product.name}, {product.flavor}</p>
            <div className="ofr-hero__media">
              <img src={product.image} alt={`Goodwell ${product.name}`} />
            </div>
          </section>
          <article className="ofr-product" data-name="Product">
            <div className="ofr-product__media"><img src={product.image} alt="" /></div>
            <div className="ofr-product__info">
              <div className="ofr-product__head">
                <p className="ofr-product__name">{product.name}</p>
                <p className="ofr-product__variant">{product.flavor}, {product.size}</p>
              </div>
              <Rating value={product.rating} count={product.reviews} />
              <p className="ofr-product__price"><span className="ofr-product__now">{product.price}</span></p>
            </div>
          </article>
        </div>
        <ContentFade />
      </div>
    </div>
  );
}

// Phosphor's Copy (regular), the CodeChip's copy mark.
export function CopyGlyph() {
  return (
    <svg viewBox="32 32 192 192" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="168 168 216 168 216 40 88 40 88 88" />
      <rect x="40" y="88" width="128" height="128" />
    </svg>
  );
}

function Widget({ step }: { step: 2 | 3 }) {
  if (step === 2) {
    return (
      <div className="ofb-widget ofb-widget--bar" data-name="Composer">
        <div className="gj2-win ofb-bar"><ChatFoot /></div>
        <div className="pv2-knock-seat ofb-knock" data-name="Offer knock">
          <StorybookKnock title={knock.line} product={product.image} doors={knock.doors} />
        </div>
      </div>
    );
  }
  return (
    <div className="ofb-widget" data-name="Chat">
      <div className="gj2-win ofb-win">
        <ChatHead brand={brand} />
        <div className="gj2-transcript ofb-transcript">
          <AiMsg text={knock.greet} />
          <div className="gj2-followups ofb-trail">
            {knock.followups.map((text) => <span key={text} className="gj2-followup">{text}</span>)}
            <span className="gj2-followup ofb-code" aria-label={`Copy code ${offer.code}`}>{offer.code}<CopyGlyph /></span>
          </div>
        </div>
        <ChatFoot />
      </div>
    </div>
  );
}

export function OffersComposerFrame({ step }: { step: Step }) {
  if (step === 1) return <div className="adj pcx-canvas"><Ad /></div>;
  return (
    <div className="ais pcx ofr">
      <article className="ais-store">
        <BrowserChrome url={domain} />
        <div className="ais-viewport">
          <Landing />
          {step === 3 && <div className="ofb-scrim" />}
          <Widget step={step} />
        </div>
      </article>
    </div>
  );
}

export function OffersComposer() {
  return (
    <section className="pcx-section">
      {([1, 2, 3] as Step[]).map((s) => (
        <figure className="pcx-figure" key={s} data-name={`Offers 11b / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {composerSteps[s - 1]}</figcaption>
          <OffersComposerFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
