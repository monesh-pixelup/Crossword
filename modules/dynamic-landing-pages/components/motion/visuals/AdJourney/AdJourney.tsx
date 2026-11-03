import { Shell } from "../../components/ill/Shell";
import { ChatComposer } from "../../components/ill/ChatComposer";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { IconButton } from "../../components/ill/IconButton";
import { ContentFade } from "../../components/ill/ContentFade";
import { ProductCollection } from "../../components/ill/ProductCollection";
import { RecommendationProductCard } from "../../components/ill/RecommendationProductCard";
import { StoreNavItems } from "../StoreNavItems";
import { createContext, useContext } from "react";
import { BrandMark, BrandName, BrandWordmark } from "../../brands/BrandIdentity";
import type { CatalogProduct } from "../../brands/catalog";
import { StorybookKnock } from "../ProactiveV2/StorybookKnock";
import { StorybookCardSkin, StorybookComposerDefault } from "../../components/ill/ProductCardSkin";
import { Rail } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import igMoreImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-more.svg";
import igChevronImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/roas-gap/ig-chevron.svg";
import * as defaultContent from "./data";
import type { Question } from "./data";


const addressIcon = addressIconImage.src;
const igMore = igMoreImage.src;
const igChevron = igChevronImage.src;

export type AdJourneyContent = Omit<typeof defaultContent, "campaignProducts" | "campaignCreative"> & {
  campaignProducts: CatalogProduct[];
  campaignCreative: { image: string; alt: string; headline?: string; detail?: string };
  heroCreative?: { image: string; alt: string };
};
const AdJourneyContext = createContext<AdJourneyContent>(defaultContent);
export const AdJourneyProvider = AdJourneyContext.Provider;

function CampaignProducts({ products, className }: { products: CatalogProduct[]; className: string }) {
  return <div className={`${className} adj-campaign-products`}>{products.map((p) => <img key={p.id} src={p.image} alt={p.title} />)}</div>;
}

// Sell: Ad → Crossword journey — seven static frames on the 738x680
// SceneFrame footprint, following the SuperMush reference. Frame 1 is the
// ad; 2–7 are one storefront (550x520) with Crossword overlaid at the
// bottom. 02 is the compact entry widget (intro + suggestion chips, the
// only place chips appear); 03–07 are one expanded panel — same size and
// position — with the header and composer fixed and the thread between.
export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Answer options are secondary Buttons (review), the A/B/C key as the
// leading icon. The picked one keeps the secondary fill; the others recede
// to the page fill (same treatment as AI Search's size options).
export function AnswerRows({ question, selected }: { question: Question; selected?: string }) {
  return (
    <div className="adj-quiz">
      <p className="adj-quiz__label">{question.label}</p>
      <div className="adj-quiz__rows">
        {question.options.map((o) => (
          <Button
            key={o.key}
            appearance="secondary"
            label={o.text}
            className={o.key === selected ? "adj-answer adj-answer--selected" : "adj-answer"}
            iconLeading={<span className="adj-answer__key">{o.key}</span>}
          />
        ))}
      </div>
    </div>
  );
}

// 06 → 07: kit Card-Recommendation with its CTA variant (primary
// button, per review); 06 is the same card in its own `loading` state, so
// the skeleton is the component's and lands exactly on the real content.
// `staggerResolve` (motion only) resolves the cards left to right.
export function Picks({ loading = false, staggerResolve = false }: { loading?: boolean; staggerResolve?: boolean }) {
  const { picks } = useContext(AdJourneyContext);
  const storybook = useContext(StorybookCardSkin);
  if (storybook) {
    return (
      <div className="adj-picks">
        <Rail products={picks.map((b) => ({ id: b.id, title: b.name, brand: b.meta, price: b.price, image: b.image }))} loading={loading} />
      </div>
    );
  }
  return (
    <div className="adj-picks">
      <ProductCollection>
        {picks.map((b, i) => (
          <RecommendationProductCard
            key={b.id}
            product={{ id: b.id, name: b.name, brand: b.meta, price: b.price, image: b.image }}
            cta
            ctaAppearance="primary"
            loading={loading}
            resolveDelayMs={staggerResolve ? i * 90 : undefined}
          />
        ))}
      </ProductCollection>
    </div>
  );
}

export const answerText = (q: Question, key: string) => q.options.find((o) => o.key === key)!.text;

// One exchange per frame, as in the reference: an answered question is
// replaced by the shopper's answer, so earlier turns leave the thread.
function Thread({ step }: { step: Step }) {
  const { widget } = useContext(AdJourneyContext);
  if (step === 3 || step === 4) {
    return (
      <>
        <UserTurn>
          <ChatMessage role="user" text={widget.start} />
        </UserTurn>
        <AssistantTurn>
          <ChatMessage role="assistant" text={widget.intro} />
          <AnswerRows question={widget.q1} selected={step === 4 ? widget.q1Answer : undefined} />
        </AssistantTurn>
      </>
    );
  }
  if (step === 5) {
    return (
      <>
        <UserTurn>
          <ChatMessage role="user" text={answerText(widget.q1, widget.q1Answer)} />
        </UserTurn>
        <AssistantTurn>
          <AnswerRows question={widget.q2} />
        </AssistantTurn>
      </>
    );
  }
  if (step === 6) {
    return (
      <>
        <UserTurn>
          <ChatMessage role="user" text={answerText(widget.q2, widget.q2Answer)} />
        </UserTurn>
        <AssistantTurn>
          <div className="adj-thinking">
            <Icon name="insight" size={14} />
            <span>{widget.thinking}</span>
          </div>
          <Picks loading />
        </AssistantTurn>
      </>
    );
  }
  return (
    <AssistantTurn>
      <ChatMessage role="assistant" text={widget.result} />
      <Picks />
    </AssistantTurn>
  );
}


// The Storybook rebuild's assistant-first opener (STORYBOOK_MAPPING.md
// §14d, §15): the composer capsule rests alone and the ported knock stands
// 16px above it, outside the composer, carrying a short line of its own;
// two doors as 22 has (three overflow the 340px card): KnockSeat's default
// quiet door first, "Find My Match" last.
export const knockLine = defaultContent.knockLine;
export const knockDoors = [
  { label: "Ask me anything" },
  { label: "Find My Match", primary: true },
];

export function KnockBar({ barRef, className, knock = true, pressed, out, line, doors = knockDoors, value }: {
  barRef?: React.Ref<HTMLDivElement>;
  line?: string;
  doors?: { label: string; primary?: boolean }[];
  value?: string;
  className?: string;
  knock?: boolean;
  pressed?: string;
  out?: boolean;
}) {
  const { widget, knockLine: contextLine = knockLine } = useContext(AdJourneyContext);
  return (
    <div ref={barRef} className={["adj-bar", className].filter(Boolean).join(" ")}>
      {knock && (
        <div className="pv2-knock-seat adj-bar__knock">
          <StorybookKnock title={line ?? contextLine} doors={doors} pressed={pressed} hovered={!!pressed} out={out} />
        </div>
      )}
      <ChatComposer value={value ?? widget.composer} />
    </div>
  );
}

function Widget({ step }: { step: Step }) {
  const { brand, widget } = useContext(AdJourneyContext);
  const composerDefault = useContext(StorybookComposerDefault);
  if (step === 2 && composerDefault) return <KnockBar />;
  if (step === 2) {
    return (
      <Shell brand={brand} className="adj-widget adj-widget--compact" composer={<></>}>
        <AssistantTurn>
          <ChatMessage role="assistant" text={widget.welcome} />
          <AiPills options={widget.prompts} selectedId="" />
        </AssistantTurn>
      </Shell>
    );
  }
  return (
    <Shell brand={brand} className={step === 6 ? "adj-widget adj-widget--expanded adj-widget--end" : "adj-widget adj-widget--expanded"} composer={<ChatComposer value={widget.composer} />}>
      <div className="adj-thread">
        <Thread step={step} />
      </div>
    </Shell>
  );
}

// `copy` (optional) lets another campaign sequence reuse the ad with its own copy.
export function InstagramAd({ copy: override }: { copy?: typeof defaultContent.ad } = {}) {
  const { brand, ad, campaignCreative } = useContext(AdJourneyContext);
  const copy = override ?? ad;
  return (
    <article className="adj-shell adj-ig">
      <header className="adj-ig__head">
        <div className="adj-ig__profile">
          <span className="adj-ig__avatar"><BrandMark brand={brand} /></span>
          <div className="adj-ig__name"><BrandName brand={brand} /><small>Sponsored</small></div>
        </div>
        <img className="adj-ig__more" src={igMore} alt="" />
      </header>
      <div className="adj-ig__media">
        <img className="adj-ig__creative" src={campaignCreative.image} alt={campaignCreative.alt} />
        {campaignCreative.headline && (
          <div className="adj-ig__campaign-copy">
            <h2>{campaignCreative.headline}</h2>
            {campaignCreative.detail && <p>{campaignCreative.detail}</p>}
          </div>
        )}
      </div>
      <div className="adj-ig__cta">{copy.cta}<img src={igChevron} alt="" /></div>
      <p className="adj-ig__caption"><b><BrandName brand={brand} /></b> {copy.caption} <span>{copy.tags}</span></p>
    </article>
  );
}

// `widget` (motion only) replaces the per-step widget with a sequenced one;
// `hero` (optional) swaps the page copy for another campaign sequence.
export function Storefront({ step = 2, widget: widgetSlot, hero: override }: { step?: Step; widget?: React.ReactNode; hero?: typeof defaultContent.page }) {
  const { brand, domain, page, campaignProducts, heroCreative } = useContext(AdJourneyContext);
  const hero = override ?? page;
  return (
    <article className={`adj-shell adj-store${heroCreative ? " adj-store--campaign" : ""}`}>
      <div className="ill-browser-chrome">
        <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
        <div className="ill-browser-chrome__address"><img src={addressIcon} width="10" height="11" alt="" /><span>{domain}</span></div>
      </div>
      {/* Same storefront header as AI Search: kit Chat/Header row, merchant
          wordmark, nav-item bars, outline IconButtons. */}
      <header className="ill-chat-header adj-nav">
        <span className="adj-nav__logo"><BrandWordmark brand={brand} /></span>
        <StoreNavItems />
        <div className="ill-chat-header__group">
          <IconButton icon="search" label="Search" variant="outline" />
          <IconButton icon="shoppingCart" label="Cart" variant="outline" />
        </div>
      </header>
      <div className="adj-store__body">
        <section className={heroCreative ? "adj-hero adj-hero--campaign" : "adj-hero"}>
          {heroCreative ? (
            <img className="adj-hero__img adj-hero__img--campaign" src={heroCreative.image} alt={heroCreative.alt} />
          ) : (
            <>
              <span className="adj-hero__eyebrow">{hero.eyebrow}</span>
              <h2>{hero.headline}</h2>
              <p>{hero.sub}</p>
              <CampaignProducts products={campaignProducts} className="adj-hero__img" />
            </>
          )}
        </section>
        {heroCreative && (
          <div className="adj-store-products" aria-label={`More from ${brand}`}>
            {campaignProducts.map((p) => (
              <article className="adj-store-product" key={p.id}>
                <div className="adj-store-product__tile"><img src={p.image} alt={p.title} /></div>
                <div className="adj-store-product__row"><span className="adj-store-product__title">{p.title}</span><span>{p.price}</span></div>
                {p.size && <span className="adj-store-product__meta">{p.size}</span>}
              </article>
            ))}
          </div>
        )}
        <ContentFade />
        {widgetSlot ?? <Widget step={step} />}
      </div>
    </article>
  );
}

export function AdJourneyFrame({ step }: { step: Step }) {
  return <div className="adj">{step === 1 ? <InstagramAd /> : <Storefront step={step} />}</div>;
}

export function AdJourney() {
  const { steps } = useContext(AdJourneyContext);
  return (
    <section className="adj-section">
      {([1, 2, 3, 4, 5, 6, 7] as Step[]).map((s) => (
        <figure className="adj-figure" key={s}>
          <figcaption className="app-stage__tile-label">{String(s).padStart(2, "0")} — {steps[s - 1]}</figcaption>
          <AdJourneyFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
