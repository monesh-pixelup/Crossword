import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ProductCollection } from "../../components/ill/ProductCollection";
import { CommerceProductCard, type CommerceProduct } from "../../components/ill/CommerceProductCard";
import { CommerceProductCardSkeleton } from "../../components/ill/CommerceProductCardSkeleton";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { Button } from "../../components/ill/Button";
import { Rating } from "../../components/ill/Rating";
import { Icon } from "../../components/ill/Icon";
import { RecommendationProductCard } from "../../components/ill/RecommendationProductCard";
import { IconButton } from "../../components/ill/IconButton";
import { ContentFade } from "../../components/ill/ContentFade";
import addressIcon from "../../assets/ill-icons/address.svg";
import { brand, domain, page, pdp, results, search, shelf, steps, type Gummy } from "./data";

// Sell: AI Search — eight static frames on the 738x680 SceneFrame
// footprint, following the reference journey (merchant site → search
// dropdown → Crossword search takeover → PDP). Every frame shares one
// 550x520 browser window; the moving surfaces keep fixed anchors so
// motion is a single change per step:
//   01 → 02  dropdown opens under the header search button (right-anchored)
//   02 → 03  first suggestion is picked; its text fills the field
//   03 → 04  Crossword takes over the page below the browser chrome; the
//            picked suggestion becomes the user turn, cards are skeletons
//   04 → 05  cards resolve in place
//   05 → 06  the turn scrolls to its end: secondary collection, follow-ups
//   06 → 07  the 60 Count card is picked; its sibling recedes
//   07 → 08  Crossword closes onto the PDP; the card image is the shared
//            element that becomes the gallery image, and the query stays
//            behind as the search-context strip
export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function ProductVisual({ product, className }: { product: Gummy; className?: string }) {
  return (
    <div className={["ais-product-visual", className].filter(Boolean).join(" ")}>
      <img src={product.image} alt={`${product.name}, ${product.variant}`} />
    </div>
  );
}

// Storefront header built from the kit's Chat/Header row and outline
// IconButtons (review). The merchant brand is a wordmark, not Crossword's
// brand pill, so the 03 → 04 takeover reads as a change of surface. The
// search button is the dropdown's anchor in 02–03.
export function Nav({ searching }: { searching: boolean }) {
  return (
    <header className="sdm-ill-chat-header ais-nav">
      <span className="ais-nav__logo">{brand}</span>
      <div className="sdm-ill-chat-header__group">
        <span className="ais-nav__ask"><Icon name="spark" size={10} />Ask AI</span>
        <IconButton icon="search" label="Search" variant="outline" className={searching ? "ais-nav__search--active" : undefined} />
        <IconButton icon="shoppingCart" label="Cart" variant="outline" />
      </div>
    </header>
  );
}

export function Home() {
  return (
    <div className="ais-home">
      <div className="ais-hero">
        <div className="ais-hero__copy">
          <h2>{page.headline}</h2>
          <p>{page.sub}</p>
          <span className="ais-btn">{page.shop}</span>
        </div>
        <ProductVisual product={pdp.product} className="ais-hero__img" />
      </div>
      <div className="ais-shelf">Best sellers <span>View all</span></div>
      <div className="ais-grid">
        {shelf.map((g) => (
          <ProductVisual key={g.id} product={g} className="ais-card" />
        ))}
      </div>
    </div>
  );
}

export function SearchDropdown({ picked }: { picked: boolean }) {
  const query = search.suggestions.find((s) => s.id === search.selected)!.text;
  return (
    <div className="ais-dropdown">
      <div className="ais-field">
        <Icon name="search" size={14} />
        {picked ? <><span className="ais-field__value">{query}</span><span className="ais-field__caret ais-field__caret--after" /></> : <><span className="ais-field__caret" /><span>{search.placeholder}</span></>}
      </div>
      <section className="ais-dropdown__section">
        <p className="ais-label"><Icon name="spark" size={10} />{search.askLabel}</p>
        <AiPills options={search.suggestions} selectedId={picked ? search.selected : ""} />
      </section>
      <section className="ais-dropdown__section">
        <p className="ais-label">{search.recentLabel}</p>
        <ul className="ais-recent">
          {search.recent.map((g) => (
            <li key={g.id}>
              <ProductVisual product={g} className="ais-recent__thumb" />
              <span>{g.name} {g.variant}<small>{g.price}</small></span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Results use the kit's Card-Commerce in a Product/Collection row, and
// its authored static skeleton while loading (same geometry, no shift).
// No brand line: every product is Goodwell's.
export function toCard(g: Gummy): CommerceProduct {
  return { id: g.id, image: g.image, title: `${g.name} ${g.variant}`, price: g.price, rating: g.rating, ratingCount: g.reviews };
}

// 04 loading → 05 loaded (top of the answer) → 06 scrolled to the end of
// the turn (secondary collection + follow-ups; the user turn scrolls out
// above) → 07 same view, 60 Count picked.
function Crossword({ step }: { step: 4 | 5 | 6 | 7 }) {
  const atEnd = step >= 6;
  return (
    <Shell
      brand={brand}
      className={atEnd ? "ais-cw ais-cw--end" : "ais-cw"}
      header={<ChatHeader brand={brand} showExpand={false} />}
      composerValue={results.composer}
    >
      <div className="ais-thread">
        <UserTurn>
          <ChatMessage role="user" text={results.query} />
        </UserTurn>
        <AssistantTurn>
          <ChatMessage role="assistant" text={results.answer} />
          <div className={step === 7 ? "ais-picks ais-picks--picking" : "ais-picks"}>
            <ProductCollection>
              {results.picks.map((p) =>
                step === 4 ? (
                  <div key={p.id} className="ais-pick ais-pick--skeleton"><CommerceProductCardSkeleton /></div>
                ) : (
                  <div key={p.id} className={step === 7 && p.id === pdp.product.id ? "ais-pick ais-pick--selected" : "ais-pick"}>
                    <CommerceProductCard product={toCard(p)} />
                  </div>
                ),
              )}
            </ProductCollection>
          </div>
          {atEnd && (
            <>
              <div className="ais-more">
                <p className="ais-label">{results.moreLabel}</p>
                {/* Kit Card-Recommendation row at a fixed narrow width: name,
                    price on its right (same meta grid as the result cards). */}
                <ProductCollection>
                  {results.more.map((g) => (
                    <RecommendationProductCard key={g.id} product={{ id: g.id, name: g.name, price: g.price, image: g.image }} />
                  ))}
                </ProductCollection>
              </div>
              <AiPills options={results.followUps} selectedId="" />
            </>
          )}
        </AssistantTurn>
      </div>
    </Shell>
  );
}

export function Pdp() {
  const p = pdp.product;
  return (
    <div className="ais-pdp">
      <div className="ais-context">
        <Icon name="spark" size={10} />
        <span className="ais-context__query">“{results.query}”</span>
        <span className="ais-context__back">{pdp.backLabel}</span>
      </div>
      <div className="ais-pdp__grid">
        <div className="ais-gallery">
          <div className="ais-gallery__thumbs">
            {[0, 1, 2, 3].map((i) => (
              <ProductVisual key={i} product={p} className={i === 0 ? "ais-gallery__thumb ais-gallery__thumb--active" : "ais-gallery__thumb"} />
            ))}
          </div>
          <ProductVisual product={p} className="ais-gallery__main" />
        </div>
        <div className="ais-details">
          <div className="ais-details__head">
            <h2>{p.name}</h2>
            <div className="ais-details__meta">
              <span className="ais-details__price">{p.price}</span>
              <Rating value={p.rating} count={p.reviews} />
            </div>
          </div>
          <p className="ais-details__blurb">{pdp.blurb}</p>
          <p className="ais-label">Size</p>
          {/* Review: size options are secondary Buttons; the picked one keeps
              the secondary fill, the other recedes to the page fill. */}
          <div className="ais-variants">
            {pdp.variants.map((v) => (
              <Button key={v.id} appearance="secondary" label={v.variant} className={v.id === p.id ? "ais-variant--selected" : "ais-variant"} />
            ))}
          </div>
          <Button appearance="primary" label="Add to cart" className="ais-details__cta" />
        </div>
        <section className="ais-ask">
          <p className="ais-label"><Icon name="spark" size={10} />{pdp.askLabel}</p>
          <AiPills options={pdp.suggestions} selectedId="" />
        </section>
      </div>
    </div>
  );
}

export function AiSearchFrame({ step }: { step: Step }) {
  const onPdp = step === 8;
  return (
    <div className="ais">
      <article className="ais-store">
        <div className="sdm-ill-browser-chrome">
          <div className="sdm-ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="sdm-ill-browser-chrome__address">
            <img src={addressIcon.src} width="10" height="11" alt="" />
            <span>{onPdp ? `${domain}/daily-sleep-gummies` : domain}</span>
          </div>
        </div>
        <div className="ais-viewport">
          <div className="ais-page">
            <Nav searching={step === 2 || step === 3} />
            <div className="ais-body">
              {onPdp ? <Pdp /> : <Home />}
              <ContentFade />
              {(step === 2 || step === 3) && <><div className="ais-scrim" /><SearchDropdown picked={step === 3} /></>}
            </div>
          </div>
          {step >= 4 && step <= 7 && <Crossword step={step as 4 | 5 | 6 | 7} />}
        </div>
      </article>
    </div>
  );
}

export function AiSearch() {
  return (
    <section className="ais-section">
      {([1, 2, 3, 4, 5, 6, 7, 8] as Step[]).map((s) => (
        <figure className="ais-figure" key={s}>
          <figcaption className="app-stage__tile-label">{String(s).padStart(2, "0")} — {steps[s - 1]}</figcaption>
          <AiSearchFrame step={s} />
        </figure>
      ))}
    </section>
  );
}
