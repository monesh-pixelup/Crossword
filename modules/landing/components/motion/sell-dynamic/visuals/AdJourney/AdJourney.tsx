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
import addressIcon from "../../assets/ill-icons/address.svg";
import igMore from "../../assets/scenarios/roas-gap/ig-more.svg";
import igChevron from "../../assets/scenarios/roas-gap/ig-chevron.svg";
import { ad, brand, domain, page, picks, steps, widget, type Question } from "./data";

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


function Widget({ step }: { step: Step }) {
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

export function InstagramAd() {
  return (
    <article className="adj-shell adj-ig">
      <header className="adj-ig__head">
        <div className="adj-ig__profile">
          <span className="adj-ig__avatar"><img src={`/images/landing/sell-dynamic/trailwell-mark.svg`} alt="Trailwell profile" /></span>
          <div className="adj-ig__name">{ad.handle}<small>Sponsored</small></div>
        </div>
        <img className="adj-ig__more" src={igMore.src} alt="" />
      </header>
      <div className="adj-ig__media">
        <img className="adj-ig__art" src={`/images/landing/sell-dynamic/trailwell-ad-creative-v2.webp`} alt="Orange, cobalt and mustard Trailwell backpacks in a playful floating composition" />
        <img className="adj-ig__wordmark" src={`/images/landing/sell-dynamic/trailwell-wordmark.svg`} alt="Trailwell" />
        <h2 className="adj-ig__headline">{ad.headline.split(" ").map((line) => <span key={line}>{line}</span>)}</h2>
      </div>
      <div className="adj-ig__cta">{ad.cta}<img src={igChevron.src} alt="" /></div>
      <p className="adj-ig__caption"><b>{ad.handle}</b> {ad.caption} <span>{ad.tags}</span></p>
    </article>
  );
}

// `widget` (motion only) replaces the per-step widget with a sequenced one.
export function Storefront({ step = 2, widget: widgetSlot }: { step?: Step; widget?: React.ReactNode }) {
  return (
    <article className="adj-shell adj-store">
      <div className="sdm-ill-browser-chrome">
        <div className="sdm-ill-browser-chrome__dots"><span></span><span></span><span></span></div>
        <div className="sdm-ill-browser-chrome__address"><img src={addressIcon.src} width="10" height="11" alt="" /><span>{domain}</span></div>
      </div>
      {/* Same storefront header as AI Search: kit Chat/Header row, merchant
          wordmark, outline IconButtons. */}
      <header className="sdm-ill-chat-header adj-nav">
        <span className="adj-nav__logo">{brand}</span>
        <div className="sdm-ill-chat-header__group">
          <IconButton icon="search" label="Search" variant="outline" />
          <IconButton icon="shoppingCart" label="Cart" variant="outline" />
        </div>
      </header>
      <div className="adj-store__body">
        <section className="adj-hero">
          <span className="adj-hero__eyebrow">{page.eyebrow}</span>
          <h2>{page.headline}</h2>
          <p>{page.sub}</p>
          <img className="adj-hero__img" src={`/images/landing/sell-dynamic/trailwell-banner-colorful-v2.webp`} alt="Cobalt, burnt orange and mustard Trailwell backpacks in an angled campaign composition" />
        </section>
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
