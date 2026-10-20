"use client";

import productPhoto from "@/modules/sell/assets/motion/product-photo.webp";
import galleryMain from "@/modules/sell/assets/motion/proactive-gallery-main.webp";
import thumb1 from "@/modules/sell/assets/motion/proactive-thumb-1.webp";
import thumb2 from "@/modules/sell/assets/motion/proactive-thumb-2.webp";
import thumb3 from "@/modules/sell/assets/motion/proactive-thumb-3.webp";
import thumb4 from "@/modules/sell/assets/motion/proactive-thumb-4.png";
import thumb5 from "@/modules/sell/assets/motion/proactive-thumb-5.png";
import type { Beat } from "../motion";
import {
  Button,
  ChatHeader,
  Chip,
  Composer,
  ExpandItem,
  ProductReference,
  ReservedReply,
  Reveal,
} from "../primitives";
import { FramedCanvas, MarketplacePage, type MarketplaceProduct } from "./parts";

/*
 * 21 — Proactive message: Same product page (`He`). A shopper lingers on a
 * whey protein page; the widget opens by itself with a sizing tip and offers
 * to check the smaller size.
 */

const page: MarketplaceProduct & {
  price: string;
  originalPrice: string;
  discount: string;
  sizeLabel: string;
  sizes: string[];
} = {
  url: "PROTEINMAX.COM/WHEY-PROTEIN/GOLD-STANDARD",
  retailer: "PROTEINMAX",
  image: galleryMain,
  thumbnails: [thumb1, thumb2, thumb3, thumb4, thumb5],
  title: "Optimum Nutrition Gold Standard Whey Protein",
  subtitle: "Double Rich Chocolate, 2 LB",
  price: "$63.32",
  originalPrice: "$74.49",
  discount: "15% off",
  rating: 4.0556,
  ratingCount: "18",
  sizeLabel: "Size",
  sizes: ["1 LB", "2 LB", "5 LB"],
};

const widget = {
  brand: page.retailer,
  productReference: {
    image: productPhoto,
    brand: "PROTEINMAX",
    title: "Gold Standard Whey Protein (2LB)",
    price: "$63.32",
  },
  message:
    "Still deciding on this one? It runs slightly large, most reviewers say to size down. Want me to check if the smaller size is in stock?",
  primaryAction: "Check smaller size",
  secondaryAction: "Not now",
};

const beats: Beat[] = [
  { id: "idle", type: "pause", ms: 1200 },
  { id: "expand", type: "appear", ms: 750 },
  { id: "think", type: "think", labels: ["Thinking", "Checking the reviews"] },
  { id: "reply", type: "text", text: widget.message },
  { id: "actions", type: "appear", ms: 500 },
];

function Background() {
  return (
    <MarketplacePage
      product={page}
      price={
        <div className="ill-marketplace__price-row">
          <p className="ill-marketplace__price">{page.price}</p>
          <p className="ill-marketplace__price--original">{page.originalPrice}</p>
          <span className="ill-marketplace__discount">{page.discount}</span>
        </div>
      }
      details={
        <div className="ill-marketplace__sizes">
          <span className="ill-marketplace__sizes-label">{page.sizeLabel}</span>
          {page.sizes.map((size) => (
            <Chip key={size}>{size}</Chip>
          ))}
        </div>
      }
    />
  );
}

export function ProactiveIntervention({ play = true }: { play?: boolean }) {
  return (
    <FramedCanvas beats={beats} play={play} background={<Background />}>
      {(t) => (
        <div className="ill-proactive-widget">
          <ExpandItem index={0}>
            <ChatHeader brand={widget.brand} />
          </ExpandItem>
          <div className="ill-proactive-widget__body">
            <ExpandItem index={1}>
              <div className="ill-proactive-widget__current">
                <ProductReference
                  image={widget.productReference.image}
                  alt={widget.productReference.title}
                  brand={widget.productReference.brand}
                  title={widget.productReference.title}
                  price={widget.productReference.price}
                />
              </div>
            </ExpandItem>
            <ReservedReply t={t} text={widget.message} thinkId="think" replyId="reply" />
            <Reveal show={t.reached("actions")}>
              <div className="ill-proactive-widget__actions">
                <Button appearance="primary" label={widget.primaryAction} />
                <Button appearance="secondary" label={widget.secondaryAction} />
              </div>
            </Reveal>
          </div>
          <Composer />
        </div>
      )}
    </FramedCanvas>
  );
}
