import { backInStock, priceDrop, replenishment } from "../Retain/data";
import * as outbound from "../OutboundCampaign/data";
import * as segmented from "../SegmentedCampaign/data";
import * as postPurchase from "../PostPurchaseFollowUp/data";
import * as winBack from "../WinBackCampaign/data";
import * as review from "../ReviewSolicitation/data";
import type { Beat } from "../SellMotion/useChatTimeline";
import { IMessageChat } from "./IMessageChat";
import { WaItem, WaList, WaProduct, WaText, WhatsAppChat } from "./WhatsAppChat";

// Retain V2 03b–10b: each original's content in a native channel, odd on
// iMessage and even on WhatsApp, using only that app's own message types.
// iMessage: a received message, then the rich link preview of its link.
// WhatsApp: the business message types (text with interactive buttons,
// single-product, product list), "typing…" in the header before the first.

const typing = (first: string, then: Beat[]): Beat[] => [
  { id: "lead", type: "pause", ms: 350 },
  { id: "typing", type: "pause", ms: 1400 },
  { id: first, type: "appear", ms: 450 },
  ...then,
];

// 03b — Back-in-stock alert (iMessage)
export const BackInStockIMessage = () => (
  <IMessageChat
    brand={backInStock.brand}
    message={backInStock.message}
    preview={{
      images: [{ src: backInStock.product.image, alt: backInStock.product.alt }],
      title: `Back in stock · ${backInStock.shade.name} · ${backInStock.product.title}`,
      domain: "dusklight.com",
      fill: true,
    }}
  />
);

// 04 — Price-drop alert (WhatsApp): the message, then one product
// message carrying everything the original card holds: the 20% off
// label, the code, was/now prices and "Apply coupon".
export const PriceDropWhatsApp = () => (
  <WhatsAppChat
    brand={priceDrop.brand}
    arrivals={["reply", "product"]}
    typingUntil="reply"
    beats={typing("reply", [{ id: "product", type: "load" }])}
  >
    {(t) => (
      <>
        <WaItem id="reply" t={t}>
          <WaText first text={priceDrop.message} />
        </WaItem>
        <WaItem id="product" t={t}>
          <WaProduct
            image={priceDrop.product.image}
            photo
            alt={priceDrop.product.alt}
            loading={t.loading("product")}
            title={priceDrop.product.title}
            note={<>{priceDrop.discount} · Code {priceDrop.coupon}</>}
            sub={
              <>
                <span className="ill-wa2__pm-price">{priceDrop.now}</span> <span className="ill-wa2__was">{priceDrop.was}</span>
              </>
            }
            action={priceDrop.cta}
          />
        </WaItem>
      </>
    )}
  </WhatsAppChat>
);

// 05b — Replenishment reminder (iMessage)
export const ReplenishmentIMessage = () => (
  <IMessageChat
    brand={replenishment.brand}
    message={replenishment.message}
    preview={{
      images: [{ src: replenishment.product.image, alt: replenishment.product.alt }],
      title: `Your usual · 100% Whey · ${replenishment.product.price}`,
      domain: "proteinmax.com",
      fill: true,
    }}
  />
);

// 06b — Campaigns: Outbound (WhatsApp): the message, then the new
// arrivals as a product list.
export const OutboundWhatsApp = () => (
  <WhatsAppChat
    brand={outbound.brand}
    arrivals={["reply", "list"]}
    typingUntil="reply"
    beats={typing("reply", [{ id: "list", type: "appear", ms: 450 }])}
  >
    {(t) => (
      <>
        <WaItem id="reply" t={t}>
          <WaText first text={outbound.script.assistantMessage} />
        </WaItem>
        <WaItem id="list" t={t}>
          <WaList
            header={outbound.campaign.title}
            lines={outbound.arrivals.map((p) => ({ text: `${p.title}, ${p.price}`, image: p.image, alt: p.title }))}
            link="Visit store"
          />
        </WaItem>
      </>
    )}
  </WhatsAppChat>
);

// 07b — Campaigns: Segmented & triggered (iMessage): the shortlist page's
// preview carries its three product images.
export const SegmentedIMessage = () => (
  <IMessageChat
    brand={segmented.brand}
    message={segmented.script.assistantMessage}
    preview={{
      images: segmented.shortlist.map((p) => ({ src: p.image ?? "", alt: p.name })),
      containTiles: true,
      title: `${segmented.shortlistLabel} · ${segmented.signal.source}`,
      domain: `${segmented.shortlist.length} products · amberandoak.com`,
    }}
  />
);

// 08b — Campaigns: Post-purchase follow-up (WhatsApp): the delivered
// order, then the check-in with its two quick-reply buttons.
export const PostPurchaseWhatsApp = () => (
  <WhatsAppChat
    brand={postPurchase.brand}
    arrivals={["order", "reply"]}
    typingUntil="order"
    beats={[
      { id: "lead", type: "pause", ms: 350 },
      { id: "typing", type: "pause", ms: 1400 },
      { id: "order", type: "load" },
      { id: "reply", type: "appear", ms: 450 },
    ]}
  >
    {(t) => (
      <>
        <WaItem id="order" t={t}>
          <WaProduct
            first
            image={postPurchase.purchase.image}
            photo
            alt={postPurchase.purchase.alt}
            loading={t.loading("order")}
            title={postPurchase.purchase.title}
            sub={postPurchase.purchase.status}
            mediaHeight={150}
          />
        </WaItem>
        <WaItem id="reply" t={t}>
          <WaText
            text={postPurchase.script.assistantMessage}
            buttons={postPurchase.replies.map((r) => ({ kind: "reply" as const, label: r.text }))}
          />
        </WaItem>
      </>
    )}
  </WhatsAppChat>
);

// 09b — Campaigns: Win-back (iMessage): the new version's page preview.
export const WinBackIMessage = () => (
  <IMessageChat
    brand={winBack.brand}
    message={winBack.script.assistantMessage}
    preview={{
      // Both halves of the win-back: what they bought, and its new version.
      images: [
        { src: winBack.previous.image, alt: winBack.previous.alt },
        { src: winBack.next.image, alt: winBack.next.alt },
      ],
      title: `${winBack.next.cta} · ${winBack.next.title} · ${winBack.next.price}`,
      domain: "goodwell.com",
      fill: true,
    }}
  />
);

// 10 — Campaigns: Review & feedback (WhatsApp): the message, then one
// product message carrying the original card: the delivered purchase,
// "Rate your experience" with its five stars, and "Write a review".
export const ReviewWhatsApp = () => (
  <WhatsAppChat
    brand={review.brand}
    arrivals={["reply", "module"]}
    typingUntil="reply"
    beats={typing("reply", [{ id: "module", type: "load" }])}
  >
    {(t) => (
      <>
        <WaItem id="reply" t={t}>
          <WaText first text={review.script.assistantMessage} />
        </WaItem>
        <WaItem id="module" t={t}>
          <WaProduct
            image={review.purchase.image}
            photo
            alt={review.purchase.alt}
            loading={t.loading("module")}
            title={review.purchase.title}
            sub={review.purchase.status}
            mediaHeight={136}
            extra={
              <div className="ill-wa2__rate">
                <p className="ill-wa2__pm-sub">{review.feedback.label}</p>
                <span className="ill-wa2__stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} viewBox="0 0 9.02 9.02" width="9" height="9">
                      <path d="M4.51 0 5.7 2.87l3.1.25-2.36 2.02.72 3.02-2.65-1.62-2.65 1.62.72-3.02L.22 3.12l3.1-.25Z" fill="none" stroke="currentColor" strokeWidth="0.55" strokeLinejoin="round" />
                    </svg>
                  ))}
                </span>
              </div>
            }
            action={review.feedback.action}
          />
        </WaItem>
      </>
    )}
  </WhatsAppChat>
);
