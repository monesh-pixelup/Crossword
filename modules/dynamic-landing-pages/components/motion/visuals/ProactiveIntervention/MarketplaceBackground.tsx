import { BrandWordmark, brandStyle } from "../../brands/BrandIdentity";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Media } from "../../components/ill/Media";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { Chip } from "../../components/ill/Chip";
import { Button } from "../../components/ill/Button";
import { Rating } from "../../components/ill/Rating";
import { Icon } from "../../components/ill/Icon";
import cartIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/cart.svg";
import { marketplace } from "./data";


const cartIcon = cartIconImage.src;

// Exact rebuild of Figma node 2077:21657 ("Frame 2147245245", fileKey
// TiAeD9ICNjjC8N3zoUJExk) at its native pixel geometry (1286x631.7
// canvas) — content, copy, product photography, colors and component
// hierarchy all pulled directly from that node (see data.ts), not
// reinterpreted. Live ILL/* components are used wherever that node uses
// them: BrowserChrome, Thumbnail, Chip, Button, Rating. The nav-row
// skeleton bars, cart icon, and address-bar lock glyph are the node's own
// one-off decorative elements (no matching component), kept custom as in
// Figma. "Add to Cart" is overridden to Accent/Secondary (#462160) below
// — the node's own instance-level color override on an otherwise
// Button/Primary instance, not a 5th component variant.
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
              <Thumbnail
                key={src}
                src={src}
                alt=""
                state={i === 0 ? "selected" : "default"}
                size={78.561}
              />
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

            <div className="ill-marketplace__price-row">
              <p className="ill-marketplace__price">{marketplace.price}</p>
            </div>
          </div>

          <div className="ill-marketplace__sizes">
            <span className="ill-marketplace__sizes-label">{marketplace.sizeLabel}</span>
            {marketplace.sizes.map((size) => (
              <Chip key={size}>{size}</Chip>
            ))}
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
