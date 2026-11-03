import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { IconButton } from "../../components/ill/IconButton";
import { BrandWordmark } from "../../brands/BrandIdentity";
import { Nav } from "../AiSearch/AiSearch";
import { Ad } from "../PersonalizedContent/PersonalizedContent";
import { product as gummies, promise } from "../PersonalizedContent/data";
import { ChatHead, ChatFoot, UserMsg, AiMsg, Followups } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { landing, pdp } from "./data";
import dedicatedLandingCreativeImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/dedicated-landing-ad-v4.png";

const dedicatedLandingCreative = dedicatedLandingCreativeImage.src;

// Sell: Dynamic 12–13, two states each on the 687x586 conversion frame,
// one 420x460 shell centred in it. The shell keeps its size and place in
// both states, so a later motion pass only swaps or slides its contents.
//   12  01 Goodwell's ad (PersonalizedContent's post) → 02 its own page:
//          same jar, same line, same CTA in AI Search's storefront window
//   13  01 AURA PDP with Ask AI in the header → 02 01's chat
//          window docks from the left over a light scrim; the page stays
// Groups carry data-name (Ad, Page, Drawer).
export type Step = 1 | 2;

function Window({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <article className="ais-store adp-shell">
      <BrowserChrome url={url} />
      <div className="ais-viewport">{children}</div>
    </article>
  );
}

export function DedicatedLandingFrame({ step }: { step: Step }) {
  return (
    <ConversionAssistanceFrame>
      {step === 1 ? (
        <div className="adj adp-ad"><Ad creative={dedicatedLandingCreative} /></div>
      ) : (
        <div className="ais pcx adp">
          <Window url={landing.domain}>
            <div className="ais-page" data-name="Page">
              <Nav searching={false} />
              <section className="pcx-hero adp-hero">
                <p className="pcx-eyebrow">{landing.eyebrow}</p>
                <h2 className="pcx-hero__headline">{promise}</h2>
                <p className="pcx-hero__sub">{landing.sub}</p>
                <div className="pcx-hero__media"><img src={gummies.image} alt={`Goodwell ${gummies.name}`} /></div>
                <Button appearance="primary" label={landing.cta} className="adp-hero__cta" />
              </section>
            </div>
          </Window>
        </div>
      )}
    </ConversionAssistanceFrame>
  );
}

function ProductPage() {
  const { product } = pdp;
  return (
    <div className="sorelle-store adp-pdp" data-name="Page">
      <header className="ill-chat-header ais-nav adp-pdp__nav">
        <BrandWordmark brand={pdp.brand} className="adp-pdp__brand" />
        <div className="ill-chat-header__group">
          <span className="ais-nav__ask"><Icon name="spark" size={10} />Ask AI</span>
          <IconButton icon="shoppingCart" label="Bag" variant="outline" />
        </div>
      </header>
      <div className="sorelle-store__breadcrumb">{pdp.category} <span aria-hidden="true">/</span> {product.title}</div>
      <article className="adp-pdp__body" aria-label={product.title}>
        <div className="adp-pdp__image"><img src={product.image} alt={product.title} /></div>
        <div className="adp-pdp__details">
          <p className="adp-pdp__caption">{pdp.brand} · {product.eyebrow}</p>
          <h2>{product.title}</h2>
          <span className="adp-pdp__price">{product.price}</span>
          <p className="adp-pdp__description">{pdp.description}</p>
          <span className="adp-pdp__finish">Finish · {product.color}</span>
          <button className="adp-pdp__action" type="button">{pdp.cta}</button>
        </div>
      </article>
      <div className="sorelle-store__detail-row"><span>{pdp.detailLabel}</span><span aria-hidden="true">+</span></div>
    </div>
  );
}

// `overlay` replaces 02's fixed scrim and drawer (the motion drives its own).
export function AdaptiveProductFrame({ step, overlay }: { step: Step; overlay?: React.ReactNode }) {
  return (
    <ConversionAssistanceFrame>
      <div className="ais adp">
        <Window url={pdp.domain}>
          <ProductPage />
          {overlay}
          {!overlay && step === 2 && (
            <>
              <div className="adp-scrim" />
              <div className="gj2-win adp-drawer" data-name="Drawer">
                <ChatHead brand={pdp.brand} />
                <div className="gj2-transcript">
                  <UserMsg text={pdp.question} />
                  <AiMsg text={pdp.answer} />
                  <Followups items={pdp.followups} />
                </div>
                <ChatFoot />
              </div>
            </>
          )}
        </Window>
      </div>
    </ConversionAssistanceFrame>
  );
}

function Section({ name, steps, Frame }: { name: string; steps: string[]; Frame: React.ComponentType<{ step: Step }> }) {
  return (
    <section className="adp-section">
      {([1, 2] as Step[]).map((s) => (
        <figure className="adp-figure" key={s} data-name={`${name} / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <Frame step={s} />
        </figure>
      ))}
    </section>
  );
}

export const DedicatedLandingPages = () => <Section name="Dedicated landing pages" steps={landing.steps} Frame={DedicatedLandingFrame} />;
export const AdaptiveProductPages = () => <Section name="Adaptive product pages" steps={pdp.steps} Frame={AdaptiveProductFrame} />;
