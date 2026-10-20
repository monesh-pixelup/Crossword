"use client";

import type { StaticImageData } from "next/image";
import alsoViewed2 from "@/modules/sell/assets/motion/also-viewed-2.webp";
import galleryMain from "@/modules/sell/assets/motion/return-visit-gallery-main.webp";
import thumb1 from "@/modules/sell/assets/motion/return-visit-thumb-1.webp";
import thumb2 from "@/modules/sell/assets/motion/return-visit-thumb-2.webp";
import thumb3 from "@/modules/sell/assets/motion/return-visit-thumb-3.webp";
import widgetCurrent from "@/modules/sell/assets/motion/widget-current.webp";
import type { Beat } from "../motion";
import {
  Button,
  ChatHeader,
  Chip,
  Composer,
  ExpandItem,
  Media,
  ProductReference,
  ReservedReply,
  Reveal,
} from "../primitives";
import { contourProWidgetPhoto, ergoFlexPhoto, ergoFlexWidgetPhoto } from "./artwork";
import { FramedCanvas, MarketplacePage, type MarketplaceProduct, Thumbnail } from "./parts";

/*
 * 23 — Proactive message: Return visit (`ls`). A shopper is back on a chair
 * they've viewed three times; the widget opens with it and the other chairs
 * they looked at, and offers a comparison.
 */

const page: MarketplaceProduct & { price: string; viewedLabel: string } = {
  url: "FORMWORK.CO/CHAIRS/AERON-STYLE-MESH",
  retailer: "FORMWORK",
  image: galleryMain,
  thumbnails: [thumb1, thumb2, thumb3],
  title: "Aeron-Style Mesh Office Chair",
  subtitle: "Graphite, Adjustable Lumbar",
  price: "$389",
  rating: 4.5,
  ratingCount: "142",
  viewedLabel: "Viewed 3×",
};

const alsoViewed: { title: string; price: string; image: StaticImageData | string; widgetImage: string }[] = [
  { title: "ErgoFlex Task Chair", price: "$329", image: ergoFlexPhoto, widgetImage: ergoFlexWidgetPhoto },
  { title: "ContourPro Executive Chair", price: "$415", image: alsoViewed2, widgetImage: contourProWidgetPhoto },
];

const widget = {
  brand: page.retailer,
  current: { image: widgetCurrent, brand: page.retailer, title: page.title, price: page.price },
  message:
    "Looks like this one caught your attention. Want me to show you how it compares with the other options you’ve viewed?",
  primaryAction: "Compare them",
  secondaryAction: "Not now",
};

const beats: Beat[] = [
  { id: "idle", type: "pause", ms: 1200 },
  { id: "expand", type: "appear", ms: 750 },
  { id: "think", type: "think", labels: ["Thinking", "Reviewing what you've viewed"] },
  { id: "reply", type: "text", text: widget.message },
  { id: "actions", type: "appear", ms: 500 },
];

function Background() {
  return (
    <MarketplacePage
      product={page}
      title={
        <div className="ill-marketplace__title-row">
          <p className="ill-marketplace__title">{page.title}</p>
          <Chip>{page.viewedLabel}</Chip>
        </div>
      }
      price={<p className="ill-marketplace__price">{page.price}</p>}
      details={
        <div className="ill-marketplace__also-viewed">
          <span className="ill-marketplace__also-viewed-label">Also viewed</span>
          <div className="ill-marketplace__also-viewed-row">
            {alsoViewed.map((product) => (
              <div key={product.title} className="ill-marketplace__also-viewed-item">
                <Thumbnail src={product.image} alt={product.title} size={56} />
                <div className="ill-marketplace__also-viewed-text">
                  <span className="ill-marketplace__also-viewed-title">{product.title}</span>
                  <span className="ill-marketplace__also-viewed-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

export function ReturnVisitComparison({ play = true }: { play?: boolean }) {
  return (
    <FramedCanvas beats={beats} play={play} background={<Background />}>
      {(t) => (
        <div className="ill-crossword-widget">
          <ExpandItem index={0}>
            <ChatHeader brand={widget.brand} />
          </ExpandItem>
          <div className="ill-crossword-widget__body">
            <ExpandItem index={1}>
              <div className="ill-crossword-widget__current">
                <ProductReference
                  image={widget.current.image}
                  alt={widget.current.title}
                  brand={widget.current.brand}
                  title={widget.current.title}
                  price={widget.current.price}
                />
              </div>
            </ExpandItem>
            <ExpandItem index={2}>
              <div className="ill-crossword-widget__also-viewed">
                <span className="ill-crossword-widget__also-viewed-label">Also viewed</span>
                <div className="ill-crossword-widget__also-viewed-row">
                  {alsoViewed.map((product) => (
                    <div key={product.title} className="ill-crossword-widget__also-viewed-item">
                      <div className="ill-crossword-widget__also-viewed-media">
                        <Media src={product.widgetImage} alt={product.title} />
                      </div>
                      <span>{product.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandItem>
            <ReservedReply t={t} text={widget.message} thinkId="think" replyId="reply" />
            <Reveal show={t.reached("actions")}>
              <div className="ill-crossword-widget__actions">
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
