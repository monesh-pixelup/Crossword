import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Button } from "../../components/ill/Button";
import { ContentFade } from "../../components/ill/ContentFade";
import { Nav } from "../AiSearch/AiSearch";
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import igMoreImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-more.svg";
import igChevronImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-chevron.svg";
import personalizedCreativeImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/personalized-content-ad-square-v5.png";
import { ad, brand, details, domain, hero, product, promise, purchase, steps } from "./data";


const igMore = igMoreImage.src;
const igChevron = igChevronImage.src;
const personalizedCreative = personalizedCreativeImage.src;

// Sell: Personalized content — three static frames on the 738x680 crimson
// canvas. 01 is the social ad (AdJourney's post at 1.35x); 02–03 are one
// Goodwell page in the AI Search storefront window (550x520). The jar and
// the line "Better sleep. No melatonin." carry through every frame.
//   01 → 02  ad tapped: the ad's jar and headline become the page hero
//   02 → 03  the page scrolls by one hero height to the details the
//            shopper came for; the purchase bar docks at the window bottom
// Groups carry data-name (Ad, Hero, Details, Card / <id>, Purchase).
export type Step = 1 | 2 | 3;

// Plum band, lavender jar, cream type: Goodwell's own ad creative.
export function Ad({ creative = personalizedCreative }: { creative?: string }) {
  return (
    <article className="adj-shell adj-ig pcx-ad" data-name="Ad">
      <header className="adj-ig__head">
        <div className="adj-ig__profile">
          <span className="adj-ig__avatar pcx-ad__avatar"><BrandMark brand="Goodwell" className="goodwell-supplied-avatar" /></span>
          <div className="adj-ig__name"><BrandName brand={brand} /><small>Sponsored</small></div>
        </div>
        <img className="adj-ig__more" src={igMore} alt="" />
      </header>
      <div className="adj-ig__media pcx-ad__media">
        <img className="pcx-ad__creative" src={creative} alt={`${promise} Goodwell campaign creative`} />
        <span className="pcx-ad__jar-anchor" data-flight-src={product.image} aria-hidden="true" />
      </div>
      <div className="adj-ig__cta">{ad.cta}<img src={igChevron} alt="" /></div>
      <p className="adj-ig__caption"><b><BrandName brand={brand} /></b> {ad.caption} <span>{ad.tags}</span></p>
    </article>
  );
}

export function Page({ step }: { step: 2 | 3 }) {
  return (
    <div className="ais-page">
      <Nav searching={false} />
      <div className="ais-body">
        {/* One continuous page; 03 is the same page scrolled by the hero. */}
        <div className={step === 3 ? "pcx-scroll pcx-scroll--details" : "pcx-scroll"}>
          <section className="pcx-hero" data-name="Hero">
            <p className="pcx-eyebrow">{hero.eyebrow}</p>
            <h2 className="pcx-hero__headline">{hero.headline}</h2>
            <p className="pcx-hero__sub">{hero.sub}</p>
            <div className="pcx-hero__media"><img src={product.image} alt={`Goodwell ${product.name}`} /></div>
          </section>
          <section className="pcx-details" data-name="Details">
            <p className="pcx-eyebrow">{details.eyebrow}</p>
            <h2 className="pcx-details__headline">{details.headline}</h2>
            <p className="pcx-details__sub">{details.sub}</p>
            <div className="pcx-cards">
              {details.cards.map((c) => (
                <article key={c.id} className="pcx-card" data-name={`Card / ${c.id}`}>
                  <p className="pcx-card__index">{c.index}</p>
                  <div>
                    <p className="pcx-card__title">{c.title}</p>
                    <p className="pcx-card__body">{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        {step === 2 && <ContentFade />}
        {step === 3 && (
          <div className="pcx-buy" data-name="Purchase">
            <img src={product.image} alt="" />
            <div className="pcx-buy__text">
              <p>{product.name}</p>
              <small>{product.price} · {product.size}</small>
            </div>
            <Button appearance="primary" label={purchase.cta} />
          </div>
        )}
      </div>
    </div>
  );
}

export function PersonalizedContentFrame({ step }: { step: Step }) {
  if (step === 1) return <div className="adj pcx-canvas"><Ad /></div>;
  return (
    <div className="ais pcx">
      <article className="ais-store">
        <BrowserChrome url={domain} />
        <div className="ais-viewport"><Page step={step} /></div>
      </article>
    </div>
  );
}

export function PersonalizedContent() {
  return (
    <section className="pcx-section">
      {([1, 2, 3] as Step[]).map((s) => (
        <figure className="pcx-figure" key={s} data-name={`Personalized content / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <PersonalizedContentFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
