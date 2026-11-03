import { BrandWordmark, brandStyle } from "../../brands/BrandIdentity";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Media } from "../../components/ill/Media";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { Button } from "../../components/ill/Button";
import { Rating } from "../../components/ill/Rating";
import { Icon } from "../../components/ill/Icon";
import cartIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/cart.svg";
import { marketplace, foundations } from "./data";


const cartIcon = cartIconImage.src;

// Same desktop marketplace/PDP skeleton as Visual 1 (ProactiveIntervention/
// MarketplaceBackground) — BrowserChrome, nav row, a two-column PDP body
// (thumbnail rail + expanded shot / info panel) — at the same 1286x631.7
// canvas and the same ILL token usage. Visual 1's size-selector row is
// replaced with a "Recently viewed" ProductCollection of the other two
// foundations (ILL/Assembly/Product/Collection + Card-Recommendation),
// occupying the same structural slot so the panel's visual hierarchy
// matches: identity -> rating -> price -> secondary row -> CTAs.
export function MarketplaceBackground() {
  const [, viewedA, viewedB] = foundations;

  return (
    <div className="ill-marketplace demo-brand-storefront" style={brandStyle(marketplace.retailer)}>
      <BrowserChrome url={marketplace.url} />

      <div className="ill-marketplace__nav">
        <BrandWordmark brand={marketplace.retailer} className="ill-marketplace__logo" />
        <div className="ill-marketplace__nav-links">
          <span />
          <span />
          <span />
          <span />
        </div>
        <img
          className="ill-marketplace__cart"
          src={cartIcon}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
        />
      </div>

      <div className="ill-marketplace__body">
        <div className="ill-marketplace__gallery">
          <div className="ill-marketplace__thumbnails">
            {marketplace.thumbnails.map((src, i) => (
              <Thumbnail key={src} src={src} alt="" state={i === 0 ? "selected" : "default"} size={78.561} />
            ))}
          </div>
          <div className="ill-marketplace__gallery-main">
            <Media src={marketplace.image} alt={marketplace.title} />
          </div>
        </div>

        <div className="ill-marketplace__info">
          <div className="ill-marketplace__info-top">
            <div className="ill-marketplace__brand-row">
              <span className="ill-marketplace__brand">{marketplace.retailer}</span>
              <Icon name="caretDown" size={20} />
            </div>

            <div className="ill-marketplace__heading">
              <p className="ill-marketplace__title">{marketplace.title}</p>
              <p className="ill-marketplace__subtitle">{marketplace.subtitle}</p>
            </div>

            <Rating value={marketplace.rating} count={marketplace.ratingCount} />

            <p className="ill-marketplace__price">{marketplace.price}</p>
          </div>

          <div className="ill-marketplace__recently-viewed">
            <span className="ill-marketplace__recently-viewed-label">Recently viewed</span>
            <div className="ill-marketplace__recently-viewed-row">
              {[viewedA, viewedB].map((p) => (
                <div className="ill-marketplace__recently-viewed-item" key={p.title}>
                  <Thumbnail src={p.image} alt={p.title} size={56} />
                  <span>{p.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ill-marketplace__actions">
            <Button appearance="primary" label="Add to Cart" />
            <Button appearance="secondary" label="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  );
}
