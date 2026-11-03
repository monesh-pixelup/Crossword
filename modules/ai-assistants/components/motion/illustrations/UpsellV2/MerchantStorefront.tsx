import type { ReactNode } from "react";
import { BrandWordmark, brandStyle } from "../../brands/BrandIdentity";
import { IosStatusBar } from "../GiftJourneyMobile/GiftJourneyMobile";
import { previouslyViewed } from "../BrowseUpsell/data";
import { products as headphones } from "../DecisionSupport/data";
import { accessory, cart } from "../CartUpsellOffer/data";
type StoreProduct = { image: string; title: string; price?: string };

function Storefront({ brand, categories, children }: { brand: string; categories: string[]; children: ReactNode }) {
  return (
    <div className="merchant-store" style={brandStyle(brand)} aria-label={`${brand} storefront`}>
      <IosStatusBar />
      <div className="merchant-store__bar">
        <span className="gjm-store__menu" aria-hidden="true"><i /><i /><i /></span>
        <BrandWordmark brand={brand} className="merchant-store__brand" />
        <span className="gjm-store__bag" aria-hidden="true" />
      </div>
      <div className="merchant-store__nav">{categories.map((name) => <span key={name}>{name}</span>)}</div>
      {children}
    </div>
  );
}

export function CatalogStorefront({ brand, categories, heading, product, secondary }: { brand: string; categories: string[]; heading: string; product: StoreProduct; secondary?: StoreProduct }) {
  return (
    <Storefront brand={brand} categories={categories}>
      <div className="merchant-store__content">
        <p className="merchant-store__eyebrow">The collection</p>
        <h2 className="merchant-store__heading">{heading}</h2>
        <img className="merchant-store__hero" src={product.image} alt={product.title} />
        <div className="merchant-store__product-line"><h3>{product.title}</h3>{product.price && <span>{product.price}</span>}</div>
        <span className="merchant-store__cta">View product</span>
        {secondary && <div className="merchant-store__related">
          <img src={secondary.image} alt={secondary.title} />
          <span>{secondary.title}<small>{secondary.price}</small></span>
        </div>}
      </div>
    </Storefront>
  );
}

export function AudenBrowseStorefront() {
  const viewed = headphones[2];
  return (
    <Storefront brand="Auden" categories={["Headphones", "Our story", "Support"]}>
      <div className="merchant-store__content auden-browse">
        <p className="merchant-store__eyebrow">Wireless headphones</p>
        <h2 className="merchant-store__heading">Find your everyday sound.</h2>
        <img className="merchant-store__hero" src={viewed.image} alt={viewed.name} />
        <div className="merchant-store__product-line"><h3>{viewed.name}</h3><span>{viewed.price}</span></div>
        <p className="merchant-store__description">Over-ear. Wireless. Made for listening.</p>
        <div className="auden-browse__colours" aria-label="Available colours">
          {["Ivory", "Olive", "Mustard"].map((colour, i) => (
            <span key={colour} className={colour === "Mustard" ? "auden-browse__colour auden-browse__colour--selected" : "auden-browse__colour"}>
              <img src={previouslyViewed.items[i].image} alt={colour} />
            </span>
          ))}
          <span className="merchant-store__description">Mustard</span>
        </div>
        <span className="merchant-store__cta">View headphones</span>
      </div>
    </Storefront>
  );
}

export function HoltStorefront() {
  return (
    <Storefront brand="Holt & Co" categories={["Wallets", "Leather goods", "Accessories"]}>
      <div className="merchant-store__content holt-store">
        <div className="holt-store__bag"><span>Your bag</span><strong>${cart.value}</strong></div>
        <p className="merchant-store__eyebrow">Everyday leather goods</p>
        <h2 className="merchant-store__heading">The little essentials.</h2>
        <img className="merchant-store__hero" src={accessory.image} alt={accessory.title} />
        <div className="merchant-store__product-line"><h3>{accessory.title}</h3><span>{accessory.price}</span></div>
        <p className="merchant-store__description">A simple home for your everyday cards.</p>
        <span className="merchant-store__cta">Add to bag · {accessory.price}</span>
      </div>
    </Storefront>
  );
}

export function AudenCompareStorefront() {
  return (
    <Storefront brand="Auden" categories={["Headphones", "Our story", "Support"]}>
      <div className="merchant-store__content auden-collection">
        <p className="merchant-store__eyebrow">The Wave Pro collection</p>
        <h2 className="merchant-store__heading">Three ways to listen.</h2>
        <p className="merchant-store__description">Find the pair that fits your day.</p>
        <div className="auden-collection__list">
          {headphones.map((product) => (
            <div key={product.id} className="auden-collection__product">
              <img src={product.image} alt={product.name} />
              <div><h3>{product.name.replace("Auden ", "")}</h3><p>{product.differentiator}</p><span>{product.price}</span></div>
            </div>
          ))}
        </div>
        <span className="auden-collection__compare">Compare headphones <span aria-hidden="true">↗</span></span>
      </div>
    </Storefront>
  );
}
