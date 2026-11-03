import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiStatus } from "../../components/ill/AiStatus";
import { AiPills } from "../../components/ill/AiPills";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { IconButton } from "../../components/ill/IconButton";
import { ContentFade } from "../../components/ill/ContentFade";
import { StoreNavItems } from "../StoreNavItems";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { BrandWordmark } from "../../brands/BrandIdentity";
import { answer, brand, followUps, insight, specificInfo, summary, detailAnswer, detailFollowUps, product, question, steps, thinking, url } from "./data";


const addressIcon = addressIconImage.src;

// Sell: Ask AI, right on the page — six static frames on a 738x760 crimson
// canvas. The Sorelle Labs PDP is the fixed foundation: one 554x575 storefront
// window, identical in every frame. Crossword never reflows it; it arrives
// as the kit Shell (432x523) as a full-height left side-nav, over a scrim.
//   01 → 02  "See more" on the review insight is pressed; the scrim begins
//   02 → 03  the side-nav is in from the left; the insight's question is the
//            user turn, Crossword is checking the formula
//   03 → 04  the structured answer replaces the status row
//   04 → 05  follow-up prompts land under the answer, above the composer
//   05 → 06  "Is it fragrance-free?" is picked; the thread scrolls
//            to its end: a short answer and two fresh follow-ups
export type Step = 1 | 2 | 3 | 4 | 5 | 6;

// `summary` replaces the AI summary card (the gist motion passes its
// expandable version); `specificSelected` picks a "Looking for specific
// info?" chip (the direct-ask motion). Statics leave both unset.
export function Pdp({
  step,
  summary: summarySlot,
  specificSelected = "",
}: {
  step: Step;
  summary?: React.ReactNode;
  specificSelected?: string;
}) {
  return (
    <div className="ask-page">
      {/* Same storefront header as the Ad Journey / AI Search: kit
          Chat/Header row, merchant wordmark, nav-item bars, outline IconButtons. */}
      <header className="ill-chat-header ask-nav">
        <span className="ask-nav__logo"><BrandWordmark brand={brand} /></span>
        <StoreNavItems />
        <div className="ill-chat-header__group">
          <IconButton icon="search" label="Search" variant="outline" />
          <IconButton icon="shoppingCart" label="Cart" variant="outline" />
        </div>
      </header>
      <div className="ask-pdp">
        <div className="ask-gallery">
          <div className="ask-gallery__main"><img src={product.image} alt={`${brand} ${product.name}, ${product.size}`} /></div>
          <div className="ask-gallery__thumbs">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={i === 0 ? "ask-gallery__thumb ask-gallery__thumb--active" : "ask-gallery__thumb"}>
                <img src={product.image} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="ask-details">
          <div className="ask-details__head">
            <p className="ask-details__eyebrow">{product.eyebrow}</p>
            <h2>{product.name}</h2>
            <div className="ask-details__meta">
              <span className="ask-details__price">{product.price}</span>
            </div>
          </div>
          {/* Product insight: part of the buy column, under the product price — a PDP row, not a floating card. */}
          <section className={step >= 2 ? "ask-insight ask-insight--active" : "ask-insight"} data-name="Insight">
            <p className="ask-insight__label"><Icon name="insight" size={12} />{insight.label}</p>
            <p className="ask-insight__text">{insight.text}</p>
            <span className="ask-insight__more">{insight.more} →</span>
          </section>
          <div className="ask-colour">
            <p className="ask-colour__label">Size: <b>{product.size}</b></p>
          </div>
          <Button appearance="primary" label="Add to cart" className="ask-details__cta" />
          {/* Two more ways into the same overlay (see summary/specificInfo). */}
          {summarySlot ?? (
            <section className="ask-summary" data-name="AI summary">
              <p className="ask-insight__label"><Icon name="insight" size={12} />{summary.label}</p>
              <p className="ask-summary__text">{summary.text} <span className="ask-link">{summary.more}</span></p>
            </section>
          )}
          <section className="ask-specific" data-name="Specific info">
            <p className="ask-insight__label"><Icon name="insight" size={12} />{specificInfo.label}</p>
            <div className="ask-field">
              <Icon name="search" size={12} />
              <span>{specificInfo.placeholder}</span>
            </div>
            <AiPills options={specificInfo.chips} selectedId={specificSelected} />
          </section>
        </div>
      </div>
    </div>
  );
}

export function Answer() {
  return (
    <div className="ask-answer" data-name="Answer">
      <div className="ask-answer__head">
        <p className="ask-answer__title">{answer.title}</p>
        <p className="ask-answer__meta"><Icon name="insight" size={11} />{answer.meta}</p>
      </div>
      <ul className="ask-answer__themes">
        {answer.themes.map((t) => (
          <li key={t.id}>
            <b>{t.title}</b>
            <span>{t.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Drawer({ step }: { step: 3 | 4 | 5 | 6 }) {
  return (
    <Shell
      brand={brand}
      width={432}
      height={523}
      className={step >= 5 ? "ask-drawer ask-drawer--end" : "ask-drawer"}
      header={<ChatHeader brand={brand} showHistory={false} showExpand={false} />}
    >
      <div className="ask-thread">
        <UserTurn>
          <ChatMessage role="user" text={question} />
        </UserTurn>
        <AssistantTurn>
          {step === 3 ? <AiStatus label={thinking} /> : <Answer />}
          {step >= 5 && <AiPills options={followUps} selectedId={step === 6 ? "fragrance" : ""} />}
        </AssistantTurn>
        {step === 6 && (
          <>
            <UserTurn>
              <ChatMessage role="user" text={followUps[0].text} />
            </UserTurn>
            <AssistantTurn>
              <ChatMessage role="assistant" text={detailAnswer} />
              <AiPills options={detailFollowUps} selectedId="" />
            </AssistantTurn>
          </>
        )}
      </div>
    </Shell>
  );
}

export function AskAiRightOnPageFrame({ step }: { step: Step }) {
  return (
    <div className="ask">
      <article className="ask-store">
        <div className="ill-browser-chrome">
          <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="ill-browser-chrome__address">
            <img src={addressIcon} width="10" height="11" alt="" />
            <span>{url}</span>
          </div>
        </div>
        <div className="ask-viewport">
          <Pdp step={step} />
          <ContentFade />
          {step >= 2 && <div className={step === 2 ? "ask-scrim ask-scrim--start" : "ask-scrim"} />}
          {step >= 3 && <Drawer step={step as 3 | 4 | 5 | 6} />}
        </div>
      </article>
    </div>
  );
}

export function AskAiRightOnPage() {
  return (
    <section className="ask-section">
      {([1, 2, 3, 4, 5, 6] as Step[]).map((s) => (
        <figure className="ask-figure" key={s} data-name={`Ask AI / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <AskAiRightOnPageFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
