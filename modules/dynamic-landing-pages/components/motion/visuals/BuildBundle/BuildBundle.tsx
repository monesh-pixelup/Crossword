import { useLayoutEffect, useRef } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { ContentFade } from "../../components/ill/ContentFade";
import { Nav } from "../AiSearch/AiSearch";
import { StorybookKnock } from "../ProactiveV2/StorybookKnock";
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import { ChatHead, ChatFoot, AiMsg, UserMsg, Followups, ProductCard } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import igMoreImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-more.svg";
import igChevronImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-chevron.svg";
import { ad, brand, bundle, domain, hero, knock, q1, q2, result, steps, type Step } from "./data";


const igMore = igMoreImage.src;
const igChevron = igChevronImage.src;

// Sell: Build your bundle — seven statics on the 738x680 canvas, built on
// Offers / Personalized content's parts (the Goodwell IG post for 01; AI
// Search's storefront window and Goodwell header for 02–07) and 01's chat
// (ChatHead, ChatFoot, AiMsg, UserMsg, Followups, ProductCard).
//   01 → 02  "Find my match" tapped: the same two jars become the hero, and
//            Crossword's composer rests at the page's foot
//   02       the composer rests with a suggestion knocking above it (11b's
//            Storybook knock: a message, "Not now" / "Find my match")
//   02 → 03  "Find my match" opens the composer in place into the window
//            (09's opening), the door landing as the shopper's first bubble
//   03 → 06  each picked chip lands as the shopper's bubble, then the next
//            question; 05 holds the cards' skeletons, 06 resolves them
// The page under the window never changes, so motion only has to open the
// window and play the thread. Groups carry data-name.

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
        <BrandName brand={brand} className="pcx-ad__wordmark" />
        <h2 className="pcx-ad__headline">{ad.headline.map((line) => <span key={line} style={{ display: "block" }}>{line}</span>)}</h2>
        <span className="pcx-ad__tag">{ad.tag}</span>
        <Jars className="byb-ad__jars" />
      </div>
      <div className="adj-ig__cta">{ad.cta}<img src={igChevron} alt="" /></div>
      <p className="adj-ig__caption"><b><BrandName brand={brand} /></b> {ad.caption} <span>{ad.tags}</span></p>
    </article>
  );
}

// The campaign's pair, morning jar in front-left, night jar behind it.
function Jars({ className }: { className: string }) {
  return (
    <div className={`byb-jars ${className}`}>
      {bundle.map((p) => <img key={p.id} src={p.image} alt={`Goodwell ${p.title}`} />)}
    </div>
  );
}

export function Landing() {
  return (
    <div className="ais-page">
      <Nav searching={false} />
      <div className="ais-body">
        <div className="pcx-scroll">
          <section className="pcx-hero byb-hero" data-name="Hero">
            <p className="pcx-eyebrow">{hero.eyebrow}</p>
            <h2 className="pcx-hero__headline">{hero.headline}</h2>
            <p className="pcx-hero__sub">{hero.sub}</p>
            <div className="pcx-hero__media byb-hero__media"><Jars className="byb-hero__jars" /></div>
          </section>
        </div>
        <ContentFade />
      </div>
    </div>
  );
}

function Thread({ step }: { step: Step }) {
  const loading = step === 5;
  return (
    <>
      <UserMsg text={q1.picked} />
      <AiMsg text={q1.ai} />
      {step === 3 && <Followups items={q1.chips} />}
      {step >= 4 && (
        <>
          <UserMsg text={q2.picked} />
          <AiMsg text={q2.ai} />
          {step === 4 && <Followups items={q2.chips} />}
        </>
      )}
      {step >= 5 && (
        <>
          <UserMsg text={result.picked} />
          <p className={loading ? "gj2-msg gj2-msg--ai byb-wait" : "gj2-msg gj2-msg--ai"}>{loading ? result.loading : result.ai}</p>
          <div className="gj2-rail byb-rail" data-name="Bundle">
            {bundle.map((p) => <ProductCard key={p.id} product={p} loading={loading} ctaLabel="Add to bundle" />)}
          </div>
        </>
      )}
    </>
  );
}

function Widget({ step }: { step: Step }) {
  if (step === 2) {
    return (
      <div className="byb-widget byb-widget--bar" data-name="Composer">
        <div className="gj2-win byb-bar">
          <ChatFoot />
        </div>
        <div className="pv2-knock-seat byb-knock" data-name="Suggestion">
          <StorybookKnock title={knock.line} product={bundle[0].image} doors={knock.doors} />
        </div>
      </div>
    );
  }
  return <ChatWindow step={step} />;
}

// Follow the latest turn: the thread is scrolled to its end, so earlier
// turns pass up under the header's fade as a real chat's do.
function ChatWindow({ step }: { step: Step }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const follow = () => { el.scrollTop = el.scrollHeight; };
    follow();
    const observer = new ResizeObserver(follow);
    Array.from(el.children).forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [step]);
  return (
    <div className="byb-widget" data-name="Chat">
      <div className="gj2-win byb-win">
        <ChatHead brand={brand} />
        <div ref={ref} className="gj2-transcript byb-transcript"><Thread step={step} /></div>
        <ChatFoot />
      </div>
    </div>
  );
}

export function BuildBundleFrame({ step }: { step: Step }) {
  if (step === 1) return <div className="adj pcx-canvas"><Ad /></div>;
  return (
    <div className="ais pcx byb">
      <article className="ais-store">
        <BrowserChrome url={domain} />
        <div className="ais-viewport">
          <Landing />
          <Widget step={step} />
        </div>
      </article>
    </div>
  );
}

export function BuildBundle() {
  return (
    <section className="pcx-section">
      {([1, 2, 3, 4, 5, 6] as Step[]).map((s) => (
        <figure className="pcx-figure" key={s} data-name={`Build your bundle / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <BuildBundleFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
