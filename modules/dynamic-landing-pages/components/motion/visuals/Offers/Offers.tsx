import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Button } from "../../components/ill/Button";
import { ContentFade } from "../../components/ill/ContentFade";
import { Nav } from "../AiSearch/AiSearch";
import { Rating } from "../../components/ill/Rating";
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import igMoreImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-more.svg";
import igChevronImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-chevron.svg";
import offerCreativeImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/welcome-offer-ad-square-v5.png";
import { ad, applied, brand, domain, hero, offer, product, steps } from "./data";


const igMore = igMoreImage.src;
const igChevron = igChevronImage.src;
const offerCreative = offerCreativeImage.src;

// Sell: Offers — three static frames on the 738x680 crimson canvas, built
// on Personalized content's parts (AdJourney post for 01; AI Search
// storefront window + Goodwell header for 02–03). The jar and the
// "10% off" perk travel together through every frame:
//   01 → 02  ad tapped: the jar becomes the hero; the perk shows as applied
//   02 → 03  the page scrolls by the hero so the applied banner, product
//            card and CTA sit together; price and CTA carry the offer
// Groups carry data-name (Ad, Hero, Offer banner, Product, CTA).
export type Step = 1 | 2 | 3;

function Check() {
  return (
    <svg className="ofr-check" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="8" />
      <path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Ad() {
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
        <img className="pcx-ad__creative" src={offerCreative} alt={`${ad.headline.join(" ")} ${ad.tag}`} />
        <span className="pcx-ad__jar-anchor" data-flight-src={product.image} aria-hidden="true" />
      </div>
      <div className="adj-ig__cta ofr-ad__cta">{ad.cta}<img src={igChevron} alt="" /></div>
      <p className="adj-ig__caption"><b><BrandName brand={brand} /></b> {ad.caption} <span>{ad.tags}</span></p>
    </article>
  );
}

export function Page({ step }: { step: 2 | 3 }) {
  return (
    <div className="ais-page">
      <Nav searching={false} />
      <div className="ais-body">
        <div className={step === 3 ? "pcx-scroll ofr-scroll ofr-scroll--cart" : "pcx-scroll ofr-scroll"}>
          <section className="ofr-hero" data-name="Hero">
            <p className="pcx-eyebrow">{hero.eyebrow}</p>
            <h2 className="pcx-hero__headline ofr-hero__headline">{hero.headline}</h2>
            <p className="pcx-hero__sub">{hero.sub}</p>
            <div className="ofr-hero__media">
              <img src={product.image} alt={`Goodwell ${product.name}`} />
              <span className="ofr-badge">{offer.percent}</span>
            </div>
          </section>
          <section className="ofr-cart">
            <div className="ofr-banner" data-name="Offer banner"><Check />{applied.banner}</div>
            <p className="ofr-code">{applied.detail}</p>
            <article className="ofr-product" data-name="Product">
              <div className="ofr-product__media">
                <img src={product.image} alt="" />
                <span className="ofr-badge ofr-badge--sm">{offer.percent}</span>
              </div>
              {/* Figma 1941:14177: title, variant line, stars, then price row
                  with the struck price and the offer pill. */}
              <div className="ofr-product__info">
                <div className="ofr-product__head">
                  <p className="ofr-product__name">{product.name}</p>
                  <p className="ofr-product__variant">{product.flavor}, {product.size}</p>
                </div>
                <Rating value={product.rating} count={product.reviews} />
                <p className="ofr-product__price">
                  <span className="ofr-product__now">{product.offerPrice}</span>
                  <s>{product.price}</s>
                  <span className="ofr-product__pill">{offer.percent}</span>
                </p>
              </div>
            </article>
            <Button appearance="primary" label={applied.cta} className="ofr-cta" />
            <p className="ofr-reassure"><Check />{applied.reassurance}</p>
          </section>
        </div>
        {step === 2 && <ContentFade />}
      </div>
    </div>
  );
}

export function OffersFrame({ step }: { step: Step }) {
  if (step === 1) return <div className="adj pcx-canvas"><Ad /></div>;
  return (
    <div className="ais pcx ofr">
      <article className="ais-store">
        <BrowserChrome url={domain} />
        <div className="ais-viewport"><Page step={step} /></div>
      </article>
    </div>
  );
}

export function Offers() {
  return (
    <section className="pcx-section">
      {([1, 2, 3] as Step[]).map((s) => (
        <figure className="pcx-figure" key={s} data-name={`Offers / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <OffersFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
