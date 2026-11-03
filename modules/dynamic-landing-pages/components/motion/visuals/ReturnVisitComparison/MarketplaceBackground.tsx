import { BrandWordmark, brandStyle } from "../../brands/BrandIdentity";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Media } from "../../components/ill/Media";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { Button } from "../../components/ill/Button";
import { Rating } from "../../components/ill/Rating";
import { Icon } from "../../components/ill/Icon";
import { Chip } from "../../components/ill/Chip";
import cartIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/cart.svg";
import { marketplace, alsoViewed } from "./data";


const cartIcon = cartIconImage.src;

// Same desktop marketplace/PDP skeleton as Visuals 1-2 — one current
// product page (not a comparison grid, per the brief), with two subtle
// "returning visitor" cues rather than one: a Chip badge ("Viewed 3×",
// ILL/Primitive/Chip Kind=Label — a compact status, exactly what the
// component's own doc comment calls it out for) next to the title, and a
// compact "Also viewed" row in the size-selector's structural slot
// (same slot Visual 2 used for its recently-viewed row). Neither
// invents new UI; both reuse components the system already has.
export function MarketplaceBackground() {
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
              <div className="ill-marketplace__title-row">
                <p className="ill-marketplace__title">{marketplace.title}</p>
                <Chip>{marketplace.viewedLabel}</Chip>
              </div>
              <p className="ill-marketplace__subtitle">{marketplace.subtitle}</p>
            </div>

            <Rating value={marketplace.rating} count={marketplace.ratingCount} />

            <p className="ill-marketplace__price">{marketplace.price}</p>
          </div>

          <div className="ill-marketplace__also-viewed">
            <span className="ill-marketplace__also-viewed-label">Also viewed</span>
            <div className="ill-marketplace__also-viewed-row">
              {alsoViewed.map((p) => (
                <div className="ill-marketplace__also-viewed-item" key={p.title}>
                  <Thumbnail src={p.image} alt={p.title} size={56} />
                  <div className="ill-marketplace__also-viewed-text">
                    <span className="ill-marketplace__also-viewed-title">{p.title}</span>
                    <span className="ill-marketplace__also-viewed-price">{p.price}</span>
                  </div>
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
