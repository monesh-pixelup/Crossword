import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Media } from "../../components/ill/Media";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { Rating } from "../../components/ill/Rating";
import { Icon } from "../../components/ill/Icon";
import { Button } from "../../components/ill/Button";
import { Shell } from "../../components/ill/Shell";
import { Thread } from "../../components/ill/Thread";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Chip } from "../../components/ill/Chip";
import cartIconImage from "../../../../assets/motion/ill-icons/cart.svg";
import { LandscapeCanvas } from "./LandscapeCanvas";
import { sizeConfidence as s } from "./data";

const cartIcon = cartIconImage.src;

// Landscape 02 — More confidence at checkout. Consumer widget over the
// jacket's own PDP (same marketplace scene recipe as Visuals 21-23). Key
// moment: "a confident size, then it's in the cart." The product the
// shopper is asking about is already on the page behind, so the chat
// opens on the question itself; the product surface appears once
// there's a resolved state to put on it — S/M with Medium selected and
// marked as the recommended fit, and the card's own CTA in its resolved
// "Added to cart" state (provenance rule 6: the action lives on the
// product, not as a separate confirmation module).
export function JacketPdpScene() {
  const p = s.product;
  return (
    <div className="ill-marketplace">
      <BrowserChrome url={s.url} />
      <div className="ill-marketplace__nav">
        <span className="ill-marketplace__logo">{s.brand}</span>
        <div className="ill-marketplace__nav-links">
          <span />
          <span />
          <span />
          <span />
        </div>
        <img className="ill-marketplace__cart" src={cartIcon} alt="" aria-hidden="true" width={20} height={20} />
      </div>
      <div className="ill-marketplace__body">
        <div className="ill-marketplace__gallery">
          <div className="ill-marketplace__thumbnails">
            {p.gallery.map((src, i) => (
              <Thumbnail key={src} src={src} alt="" state={i === 0 ? "selected" : "default"} size={78.561} />
            ))}
          </div>
          <div className="ill-marketplace__gallery-main">
            <Media src={p.image} alt={p.alt} />
          </div>
        </div>
        <div className="ill-marketplace__info ill-landscape-pdp">
          <div className="ill-landscape-pdp__head">
            <span className="ill-marketplace__brand">{p.brand}</span>
            <p className="ill-marketplace__title">{p.title}</p>
            <div className="ill-landscape-pdp__price-row">
              <p className="ill-marketplace__price">{p.price}</p>
              <Rating value={p.rating} count={p.ratingCount} />
            </div>
          </div>
          <p className="ill-landscape-pdp__description">{p.description}</p>
          <div className="ill-landscape-pdp__row">
            <span className="ill-landscape-pdp__label">Color</span>
            <span className="ill-landscape-pdp__value">{p.color}</span>
          </div>
          <div className="ill-marketplace__sizes">
            <span className="ill-marketplace__sizes-label">Size</span>
            {p.sizes.map((size) => (
              <Chip key={size}>{size}</Chip>
            ))}
          </div>
          <div className="ill-marketplace__actions">
            <Button appearance="primary" label="Add to Cart" />
            <Button appearance="secondary" label="Buy Now" />
          </div>
          <ul className="ill-landscape-pdp__details">
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SizedProductCard() {
  const p = s.product;
  return (
    <section className="ill-landscape-card ill-size-card">
      <div className="ill-size-card__product">
        <Thumbnail src={p.image} alt={p.alt} size={64} />
        <div className="ill-size-card__text">
          <span className="ill-size-card__brand">{p.brand}</span>
          <span className="ill-size-card__title">{p.title}</span>
          <span className="ill-size-card__subtitle">{p.subtitle}</span>
        </div>
        <span className="ill-size-card__price">{p.price}</span>
      </div>
      <div className="ill-size-card__sizes">
        <span className="ill-size-card__sizes-label">Size</span>
        {s.sizeOptions.map((o) => (
          <Chip key={o.size} kind={o.selected ? "action" : "label"}>
            {o.size}
          </Chip>
        ))}
        <span className="ill-size-card__recommended">
          <Chip size="sm">{s.recommendedLabel}</Chip>
        </span>
        <span className="ill-size-card__added">
          <Icon name="checks" />
          {s.addedLabel}
        </span>
      </div>
    </section>
  );
}

export function SizeConfidence() {
  return (
    <LandscapeCanvas
      backdrop="purple"
      scene={<JacketPdpScene />}
      widget={
        <Shell brand={s.brand} width={600} height={370} className="ill-landscape-shell ill-landscape-shell--compact ill-landscape-shell--aubergine">
          <Thread>
            <UserTurn>
              <ChatMessage role="user" text={s.userQuestion} />
            </UserTurn>
            <AssistantTurn>
              <ChatMessage role="assistant">
                Based on the fit of this style and the measurements you shared, I'd go with a{" "}
                <strong>Medium</strong>. The Small runs closer through the shoulders. If you prefer a more fitted
                look, Small could work too.
              </ChatMessage>
            </AssistantTurn>
            <UserTurn>
              <ChatMessage role="user" text={s.userChoice} />
            </UserTurn>
            <AssistantTurn>
              <ChatMessage role="assistant" text={s.confirmation} />
              <SizedProductCard />
            </AssistantTurn>
          </Thread>
        </Shell>
      }
    />
  );
}

// The same frame without the widget — just the page behind it.
export function SizeConfidenceScene() {
  return <LandscapeCanvas backdrop="purple" scene={<JacketPdpScene />} />;
}
