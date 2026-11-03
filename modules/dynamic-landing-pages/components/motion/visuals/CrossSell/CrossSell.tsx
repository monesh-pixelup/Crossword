import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiStatus } from "../../components/ill/AiStatus";
import { AiPills } from "../../components/ill/AiPills";
import { Button } from "../../components/ill/Button";
import { Icon } from "../../components/ill/Icon";
import { IconButton } from "../../components/ill/IconButton";
import { Media } from "../../components/ill/Media";
import { ContentFade } from "../../components/ill/ContentFade";
import { StoreNavItems } from "../StoreNavItems";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { BrandWordmark } from "../../brands/BrandIdentity";
import { added, bag, brand, gallery, followUps, intro, picks, product, recs, steps, thinking, url } from "./data";


const addressIcon = addressIconImage.src;

// Sell: Upsell & cross-sell — six static frames on #11's 738x760 canvas,
// 554x575 storefront window and 432x523 left side-nav (AskAiRightOnPage.css).
//   01 → 02  "Add to bag" is pressed; the bag badge
//            counts 1 and the scrim begins
//   02 → 03  Crossword opens on what was just added and starts matching
//   03 → 04  two picks, each with the reason it goes with the sneaker
//   04 → 05  the runner is added from its row; the bag counts 2
//   05 → 06  the loafer too; the bag summary closes the turn
export type Step = 1 | 2 | 3 | 4 | 5 | 6;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function bagCount(addedIds: string[], inBag: boolean) {
  return (inBag ? 1 : 0) + addedIds.length;
}

export function Pdp({ inBag, count }: { inBag: boolean; count: number }) {
  return (
    <div className="ask-page">
      <header className="ill-chat-header ask-nav">
        <span className="ask-nav__logo"><BrandWordmark brand={brand} /></span>
        <StoreNavItems />
        <div className="ill-chat-header__group">
          <IconButton icon="search" label="Search" variant="outline" />
          <span className="xs-cart">
            <IconButton icon="shoppingCart" label="Bag" variant="outline" />
            {count > 0 && <span className="xs-cart__badge" key={count}>{count}</span>}
          </span>
        </div>
      </header>
      <div className="ask-pdp">
        <div className="ask-gallery">
          <div className="ask-gallery__main xs-media"><Media src={product.image} alt={`${product.name}, ${product.color}`} /></div>
          <div className="ask-gallery__thumbs">
            {gallery.map((view, i) => (
              <div key={view.image} className={cx("ask-gallery__thumb xs-media", i === 0 && "ask-gallery__thumb--active")}>
                <Media src={view.image} alt={view.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="ask-details">
          <div className="ask-details__head">
            <p className="ask-details__eyebrow">{product.eyebrow}</p>
            <h2>{product.name}</h2>
            <span className="ask-details__price">{product.price}</span>
          </div>
          <div className="ask-colour">
            <p className="ask-colour__label">Colour: <b>{product.color}</b> · Size: <b>{product.size}</b></p>
            <div className="xs-sizes">
              {product.sizes.map((size) => <span key={size} className={cx("xs-size", size === product.size && "xs-size--selected")}>{size.replace("US ", "")}</span>)}
            </div>
          </div>
          <Button
            appearance="primary"
            label={inBag ? added.label : "Add to bag"}
            iconLeading={inBag ? <Icon name="checks" size={14} /> : undefined}
            className={cx("ask-details__cta xs-cta", inBag && "xs-cta--done")}
          />
          <p className="xs-ship">Free shipping over $200 · Free returns</p>
        </div>
      </div>
    </div>
  );
}

// What was just bagged: the context Crossword opens on.
export function AddedStrip() {
  return (
    <div className="xs-added" data-name="Added to bag">
      <div className="xs-added__thumb xs-media"><Media src={product.image} alt={product.name} /></div>
      <div className="xs-added__text">
        <p className="xs-added__label"><Icon name="checks" size={12} />{added.label}</p>
        <p className="xs-added__title">{product.name}</p>
        <p className="xs-added__meta">{added.detail}</p>
      </div>
    </div>
  );
}

export function Recs({ addedIds }: { addedIds: string[] }) {
  return (
    <ul className="xs-recs" data-name="Recommendations">
      {recs.map((r) => {
        const done = addedIds.includes(r.id);
        return (
          <li key={r.id} className={cx("xs-rec", done && "xs-rec--added")}>
            <div className="xs-rec__thumb xs-media"><Media src={r.image} alt={r.title} /></div>
            <div className="xs-rec__body">
              <div className="xs-rec__head">
                <p className="xs-rec__title">{r.title}</p>
                <p className="xs-rec__price">{r.price}</p>
              </div>
              <p className="xs-rec__tag">{r.tag}</p>
              <p className="xs-rec__why"><Icon name="insight" size={11} /><span>{r.reason}</span></p>
            </div>
            <span className={cx("xs-add", done && "xs-add--done")}>
              {done ? <><Icon name="checks" size={12} />Added</> : "Add"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function BagSummary() {
  return (
    <div className="xs-bag" data-name="Bag summary">
      <div className="xs-bag__head">
        <p className="xs-bag__title">{bag.title}</p>
        <p className="xs-bag__meta">{bag.meta}</p>
      </div>
      <p className="xs-bag__note"><Icon name="shieldCheck" size={12} />{bag.note}</p>
      <span className="xs-bag__cta">{bag.cta}</span>
    </div>
  );
}

function addedAt(step: Step) {
  return step >= 6 ? picks : step >= 5 ? picks.slice(0, 1) : [];
}

function Drawer({ step }: { step: 3 | 4 | 5 | 6 }) {
  return (
    <Shell
      brand={brand}
      width={432}
      height={523}
      className={cx("ask-drawer xs-drawer", step >= 6 && "ask-drawer--end")}
      header={<ChatHeader brand={brand} showHistory={false} showExpand={false} />}
    >
      <div className="ask-thread">
        <AssistantTurn>
          <AddedStrip />
          {step === 3 ? <AiStatus label={thinking} /> : (
            <>
              <ChatMessage role="assistant" text={intro} />
              <Recs addedIds={addedAt(step)} />
            </>
          )}
          {step >= 6 && (
            <>
              <BagSummary />
              <AiPills options={followUps} selectedId="" />
            </>
          )}
        </AssistantTurn>
      </div>
    </Shell>
  );
}

export function CrossSellFrame({ step }: { step: Step }) {
  const inBag = step >= 2;
  return (
    <div className="ask xs">
      <article className="ask-store">
        <div className="ill-browser-chrome">
          <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="ill-browser-chrome__address">
            <img src={addressIcon} width="10" height="11" alt="" />
            <span>{url}</span>
          </div>
        </div>
        <div className="ask-viewport">
          <Pdp inBag={inBag} count={bagCount(addedAt(step), inBag)} />
          <ContentFade />
          {step >= 2 && <div className={step === 2 ? "ask-scrim ask-scrim--start" : "ask-scrim"} />}
          {step >= 3 && <Drawer step={step as 3 | 4 | 5 | 6} />}
        </div>
      </article>
    </div>
  );
}

export function CrossSell() {
  return (
    <section className="ask-section">
      {([1, 2, 3, 4, 5, 6] as Step[]).map((s) => (
        <figure className="ask-figure" key={s} data-name={`Cross-sell / 0${s}`}>
          <figcaption className="app-stage__tile-label">0{s} — {steps[s - 1]}</figcaption>
          <CrossSellFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
