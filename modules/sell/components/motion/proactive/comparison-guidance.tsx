"use client";

import galleryMain from "@/modules/sell/assets/motion/comparison-gallery-main.webp";
import thumb1 from "@/modules/sell/assets/motion/comparison-thumb-1.webp";
import thumb2 from "@/modules/sell/assets/motion/comparison-thumb-2.webp";
import thumb3 from "@/modules/sell/assets/motion/comparison-thumb-3.webp";
import type { Beat } from "../motion";
import { AttributeRow, Button, ChatHeader, Composer, ExpandItem, Media, ReservedReply, Reveal } from "../primitives";
import {
  secondSkinWidgetPhoto,
  skinVeilPhoto,
  skinVeilWidgetPhoto,
  trueMatchPhoto,
  trueMatchWidgetPhoto,
} from "./artwork";
import { FramedCanvas, MarketplacePage, type MarketplaceProduct, ProductMeta, Thumbnail } from "./parts";

/*
 * 22 — Proactive message: Similar foundations (`ze`). A shopper has bounced
 * between three foundations; the widget opens with all three and offers to
 * narrow them down.
 */

type Foundation = {
  brand: string;
  title: string;
  price: string;
  attributeLabel: string;
  attributeValue: string;
  /** Photo in the widget's reference card. */
  widgetImage: string;
  /** Thumbnail in the page's "Recently viewed" row. */
  image?: string;
};

const foundations: Foundation[] = [
  {
    brand: "LUMIÈRE",
    title: "Second Skin Foundation",
    price: "$42",
    attributeLabel: "Finish",
    attributeValue: "Natural · Fawn",
    widgetImage: secondSkinWidgetPhoto,
  },
  {
    brand: "LUMIÈRE",
    title: "Skin Veil Foundation SPF 25",
    price: "$38",
    attributeLabel: "Finish",
    attributeValue: "Dewy · Warm Beige",
    widgetImage: skinVeilWidgetPhoto,
    image: skinVeilPhoto,
  },
  {
    brand: "LUMIÈRE",
    title: "True Match Fluid Foundation",
    price: "$36",
    attributeLabel: "Finish",
    attributeValue: "Matte · Honey",
    widgetImage: trueMatchWidgetPhoto,
    image: trueMatchPhoto,
  },
];

const page: MarketplaceProduct & { price: string } = {
  url: "LUMIERE.COM/FOUNDATION/SECOND-SKIN",
  retailer: "LUMIÈRE",
  image: galleryMain,
  thumbnails: [thumb1, thumb2, thumb3],
  title: foundations[0].title,
  subtitle: "Natural Finish, Fawn",
  price: foundations[0].price,
  rating: 4.3,
  ratingCount: "286",
};

const widget = {
  brand: page.retailer,
  message:
    "Having trouble picking one? I can narrow these down based on your finish, coverage, undertone, and budget.",
  primaryAction: "Narrow it down",
};

const beats: Beat[] = [
  { id: "idle", type: "pause", ms: 1200 },
  { id: "expand", type: "appear", ms: 750 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: widget.message },
  { id: "actions", type: "appear", ms: 500 },
];

function Background() {
  const [, second, third] = foundations;
  return (
    <MarketplacePage
      product={page}
      price={<p className="ill-marketplace__price">{page.price}</p>}
      details={
        <div className="ill-marketplace__recently-viewed">
          <span className="ill-marketplace__recently-viewed-label">Recently viewed</span>
          <div className="ill-marketplace__recently-viewed-row">
            {[second, third].map((product) => (
              <div key={product.title} className="ill-marketplace__recently-viewed-item">
                <Thumbnail src={product.image} alt={product.title} size={56} />
                <span>{product.title}</span>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

/** One foundation in the widget: photo, brand/title, finish, price (`Oe`). */
function FoundationReference({ product }: { product: Foundation }) {
  return (
    <div className="ill-foundation-ref">
      <div className="ill-foundation-ref__media">
        <Media src={product.widgetImage} alt={product.title} />
      </div>
      <div className="ill-foundation-ref__text">
        <ProductMeta brand={product.brand} title={product.title} />
        <AttributeRow label={product.attributeLabel} value={product.attributeValue} />
      </div>
      <p className="ill-foundation-ref__price">{product.price}</p>
    </div>
  );
}

export function ComparisonGuidance({ play = true }: { play?: boolean }) {
  return (
    <FramedCanvas beats={beats} play={play} background={<Background />}>
      {(t) => (
        <div className="ill-crossword-widget">
          <ExpandItem index={0}>
            <ChatHeader brand={widget.brand} />
          </ExpandItem>
          <div className="ill-crossword-widget__body">
            <div className="ill-crossword-widget__references">
              {foundations.map((product, i) => (
                <ExpandItem key={product.title} index={1 + i}>
                  <FoundationReference product={product} />
                </ExpandItem>
              ))}
            </div>
            <ReservedReply t={t} text={widget.message} thinkId="think" replyId="reply" />
            <Reveal show={t.reached("actions")}>
              <div className="ill-crossword-widget__actions">
                <Button appearance="primary" label={widget.primaryAction} />
              </div>
            </Reveal>
          </div>
          <Composer />
        </div>
      )}
    </FramedCanvas>
  );
}
