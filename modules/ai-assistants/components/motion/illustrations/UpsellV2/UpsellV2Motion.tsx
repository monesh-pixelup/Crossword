import { useEffect, useRef, useState } from "react";
import { SceneFrame } from "../../components/ill/SceneFrame";
import { ScaleToFit } from "../../components/ill/ScaleToFit";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../SellMotion/useChatTimeline";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import { ChatHead, ChatFoot, ProductCard } from "../GiftJourneyV2/GiftJourneyV2";
import { StreamedReply } from "../GiftJourneyV2/GiftJourneyV2Motion";
import { ProductRow } from "../GiftJourneyV2/StorybookParts";
import { PHONE_W, PHONE_H, SLOT_W, SLOT_H } from "../GiftJourneyMobile/GiftJourneyMobile";
import { AudenBrowseStorefront, CatalogStorefront } from "./MerchantStorefront";
import { BrandMark } from "../../brands/BrandIdentity";
import { contain, storeName } from "../ProductDiscoveryV2/ProductDiscoveryV2";
import { FOLLOWUPS, Cards, Think, Trail, User, rise, useFollowLatest } from "../ProductDiscoveryV2/ProductDiscoveryV2Motion";
import * as upsell from "../UpsellUpgrade/data";
import * as crossSell from "../CrossSell/data";
import * as bundle from "../BundleBuilding/data";
import * as browse from "../BrowseUpsell/data";

// Sell: Conversational interface 17–20 (upsell & cross-sell), rebuilt
// against STORYBOOK_MAPPING.md on the phone: 09–16's SceneFrame, with the
// conversation in 01m's bottom sheet (Storybook ChatWindow ≤480px: full
// width from the top, 20px top corners, grab pill, the store under a 20%
// scrim). Each visual keeps its beat list from SellMotion/*Motion.tsx and
// plays it with 09–16's motion (composer typing, bubble pop, spark wait
// line, word stream, skeletons resolving, follow-ups rising, follow the
// latest turn). Per the mapping:
// - the boxed AssistantInsight is dropped (§4.10), its beat with it;
// - a referenced product is a List View row on the shopper's turn;
// - 17's current-vs-upgrade table becomes the Comparison Card;
// - commerce cards become 01's ProductCard (two across on the sheet);
// - 19's stacked bundle card becomes a single Product Card with a badge;
// - every AI reply ends on follow-ups that don't predict a next line.
// Copy is the originals' (each scenario's data.ts).

const RISE_MS = 600;

const followups = {
  upsell: ["Add the Family Air Fryer", "Will 6L fit my counter?", "Keep the compact one"],
  crossSell: ["Add both", "Show other bracelets", "What length is the anklet?"],
  bundle: ["Add the bundle", "Just the frother", "What's in the starter pack?"],
  browse: ["How long does the battery last?", "Compare with the one I viewed", "Add to cart"],
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// One phone screen driven by a beat list. On each landing the sheet rises
// over the scrim (01m's 0.6s phone rise), then the timeline runs inside it;
// leaving the screen drops it, so every landing replays from the top.
// `Frame` is the outer shell and background (09–16's SceneFrame unless a
// visual keeps its original one, as 28–33 do).
// `nudge` is for proactive openers (the assistant opens the chat): the
// store rests, the Storybook Nudge rises over the closed launcher and holds
// long enough to read, the orb is pressed, the sheet rises (01m's 0.6s),
// then the timeline runs. Unset, the sheet is already open and the
// shopper's turn is the first motion, so the rise isn't replayed on every
// visual. Every landing replays from the top.
type Stage = "idle" | "nudge" | "pressed" | "open";

const IDLE_MS = 700;
const NUDGE_HOLD_MS = 2800;
const PRESS_MS = 180;

export function SheetWindow({ brand, storefront, beats, children, Frame = SceneFrame, nudge }: { brand: string; storefront: React.ReactNode; beats: Beat[]; children: (t: Timeline, animate: boolean) => React.ReactNode; Frame?: React.ComponentType<{ children: React.ReactNode }>; nudge?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const [stage, setStage] = useState<Stage>(nudge ? "idle" : "open");
  const [risen, setRisen] = useState(false);
  useEffect(() => {
    if (!landed) {
      setRisen(false);
      if (nudge) setStage("idle");
      return;
    }
    if (!nudge || prefersReducedMotion()) {
      setStage("open");
      setRisen(true);
      return;
    }
    const at = [IDLE_MS, IDLE_MS + NUDGE_HOLD_MS, IDLE_MS + NUDGE_HOLD_MS + PRESS_MS];
    const timers = [
      window.setTimeout(() => setStage("nudge"), at[0]),
      window.setTimeout(() => setStage("pressed"), at[1]),
      window.setTimeout(() => setStage("open"), at[2]),
      window.setTimeout(() => setRisen(true), at[2] + RISE_MS),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [landed, nudge]);
  const t = useChatTimeline(beats, risen);
  useFollowLatest(transcriptRef, t);
  const name = storeName(brand);

  return (
    <div ref={rootRef}>
      <Frame>
        <ScaleToFit contentWidth={PHONE_W} contentHeight={PHONE_H} maxWidth={SLOT_W} maxHeight={SLOT_H}>
          <div className={`gjm-screen gjmm gjmm--${stage} hm2--${stage}`}>
            {storefront}
            {nudge && (
              <div className="gjm-launcher gjmm-launcher">
                <div className="hm2-nudge" role="status">
                  <BrandMark brand={name} className="hm2-nudge__disc" />
                  <div className="hm2-nudge__col">
                    <span className="hm2-nudge__head">{name}</span>
                    <span className="hm2-nudge__desc">{nudge}</span>
                  </div>
                  <span className="hm2-nudge__close" aria-label="Dismiss">×</span>
                </div>
                <span className="piw2-orb gjmm-orb" aria-label="Open chat">
                  <BrandMark brand={name} className="gjm-orb-mark" />
                </span>
              </div>
            )}
            <div className="gjm-scrim gjmm-scrim" />
            <div className="gjmm-sheet-slot">
              <div className="gj2-win gjm-sheet">
                <span className="gjm-grab" aria-hidden="true" />
                <ChatHead brand={name} />
                <div className="gj2-transcript" ref={transcriptRef} key={t.runKey}>
                  {children(t, !t.reducedMotion)}
                </div>
                <ChatFoot value={t.composer?.value || undefined} />
              </div>
            </div>
          </div>
        </ScaleToFit>
      </Frame>
    </div>
  );
}

// A lone Product Card (240px) resolving from its skeleton.
export function LoneCard({ t, id, product, animate }: { t: Timeline; id: string; product: CommerceProduct; animate: boolean }) {
  if (!t.reached(id)) return null;
  return (
    <div className={animate ? "gj2-rise" : undefined}>
      <ProductCard product={product} lone loading={t.loading(id)} />
    </div>
  );
}

// 17 — the Storybook Comparison Card: white, hairline ring, 20px radius,
// tinted head row ("What matters" | product shots and names), hairline
// rules, 13px cells, a "Details · View ↗" foot row. No favoured-column
// band (as 02c): the reply carries the recommendation. A card-shaped
// skeleton covers the reserved table and crossfades out on resolve.
export type ComparisonColumn = { name: string; image: string };
export type ComparisonRowData = { label: string; values: string[] };

export function ComparisonCard({ columns, rows, loading }: { columns: ComparisonColumn[]; rows: ComparisonRowData[]; loading: boolean }) {
  return (
    <div className="um2-cmp-wrap">
      <div className={loading ? "um2-cmp__skel" : "um2-cmp__skel um2-cmp__skel--hidden"} aria-hidden="true">
        <span className="um2-cmp__bone um2-cmp__bone--head" />
        {rows.map((_, i) => <span key={i} className="um2-cmp__bone" />)}
      </div>
      <div className="um2-cmp" role="table">
        <div className="um2-cmp__row um2-cmp__row--head" role="row">
          <span role="columnheader">What matters</span>
          {columns.map((c) => (
            <span key={c.name} role="columnheader" className="um2-cmp__product">
              <span className="um2-cmp__thumb"><img src={c.image} alt="" /></span>
              {c.name}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.label} className="um2-cmp__row" role="row">
            <span role="rowheader">{row.label}</span>
            {row.values.map((v, i) => <span key={i} role="cell">{v}</span>)}
          </div>
        ))}
        <div className="um2-cmp__row um2-cmp__row--foot" role="row">
          <span role="rowheader">Details</span>
          {columns.map((c) => (
            <span key={c.name} role="cell" className="um2-cmp__view"><span className="um2-cmp__view-word">View</span> <ViewOutGlyph /></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewOutGlyph() {
  return (
    <svg viewBox="0 0 12 12" width={10} height={10} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
    </svg>
  );
}

const upsellColumns = [upsell.recommended, upsell.current];
const upsellRows = [
  { label: "Capacity", values: upsellColumns.map((c) => c.capacity) },
  { label: "Price", values: upsellColumns.map((c) => c.price) },
];

const upsellBeats: Beat[] = [
  { id: "ask", type: "compose", text: upsell.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Comparing the two models"] },
  { id: "reply", type: "text", text: upsell.script.assistantMessage },
  { id: "compare", type: "load", ms: 800 },
  FOLLOWUPS,
];

export function UpsellUpgradeV2Motion() {
  const { script, current } = upsell;
  return (
    <SheetWindow brand={script.brand} beats={upsellBeats} storefront={
      <CatalogStorefront brand={storeName(script.brand)} categories={["Air fryers", "Accessories", "Recipes"]} heading="A little more room for dinner."
        product={{ image: current.image, title: current.name, price: current.price }}
        secondary={{ image: upsell.recommended.image, title: upsell.recommended.name, price: upsell.recommended.price }} />
    }>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={current.image} title={current.name} meta={`${storeName(script.brand)} · ${current.price} · ${current.capacity}`} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          {t.reached("compare") && (
            <div className={animate ? "gj2-rise" : undefined}>
              <ComparisonCard columns={upsellColumns} rows={upsellRows} loading={t.loading("compare")} />
            </div>
          )}
          <Trail t={t} items={followups.upsell} animate={animate} />
        </>
      )}
    </SheetWindow>
  );
}

const crossSellBeats: Beat[] = [
  { id: "ask", type: "compose", text: crossSell.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding what goes with it"] },
  { id: "reply", type: "text", text: crossSell.script.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
  FOLLOWUPS,
];

export function CrossSellV2Motion() {
  const { script, anchor, addOns } = crossSell;
  return (
    <SheetWindow brand={script.brand} beats={crossSellBeats} storefront={
      <CatalogStorefront brand={storeName(script.brand)} categories={["Necklaces", "Bracelets", "Anklets"]} heading="The finishing touches."
        product={anchor} secondary={addOns[1]} />
    }>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={anchor.image} title={anchor.title} meta={storeName(anchor.brand)} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Cards t={t} id="cards" products={contain(addOns)} animate={animate} />
          <Trail t={t} items={followups.crossSell} animate={animate} />
        </>
      )}
    </SheetWindow>
  );
}

const bundleBeats: Beat[] = [
  { id: "ask", type: "compose", text: bundle.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Picking the right add-ons"] },
  { id: "reply", type: "text", text: bundle.script.assistantMessage },
  { id: "bundle", type: "load", ms: 750 },
  FOLLOWUPS,
];

// The bundle is one purchase unit: a single Product Card, its item count
// as the image badge, the bundle total as the price.
const bundleCard = {
  id: "bundle",
  title: bundle.bundle.title,
  brand: storeName(bundle.script.brand),
  image: bundle.bundle.image,
  price: bundle.bundle.price,
  tag: "Bundle · 3 items",
  imageFit: "contain",
} satisfies CommerceProduct;

export function BundleBuildingV2Motion() {
  const { script, anchor } = bundle;
  return (
    <SheetWindow brand={script.brand} beats={bundleBeats} storefront={
      <CatalogStorefront brand={storeName(script.brand)} categories={["Machines", "Coffee", "Accessories"]} heading="Your morning, made simple."
        product={anchor} secondary={bundleCard} />
    }>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={anchor.image} title={anchor.title} meta={storeName(anchor.brand)} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <LoneCard t={t} id="bundle" product={bundleCard} animate={animate} />
          <Trail t={t} items={followups.bundle} animate={animate} />
        </>
      )}
    </SheetWindow>
  );
}

// No shopper turn: the thread opens on what the shopper has been looking
// at (a List View row on the reply's side, the three models stacked as its
// thumb), then the assistant speaks unprompted.
const browseBeats: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "viewed", type: "appear", ms: 700 },
  { id: "think", type: "think", labels: ["Thinking", "Comparing what you've viewed"] },
  { id: "reply", type: "text", text: browse.script.assistantMessage },
  { id: "card", type: "load", ms: 750 },
  FOLLOWUPS,
];

export function BrowseUpsellV2Motion() {
  const { script, previouslyViewed, recommendedProduct } = browse;
  return (
    <SheetWindow brand={script.brand} beats={browseBeats} storefront={<AudenBrowseStorefront />} nudge="Still comparing headphones? There's one worth a look.">
      {(t, animate) => t.passed("lead") && (
        <>
          <div className={["sbp-row um2-viewed", rise(animate)].filter(Boolean).join(" ")}>
            <span className="um2-viewed__stack">
              {previouslyViewed.items.map((item, i) => (
                <span key={i} className="sbp-row__thumb um2-viewed__thumb"><img src={item.image} alt={item.alt} /></span>
              ))}
            </span>
            <span className="sbp-row__col">
              <span className="sbp-row__title">Recently viewed</span>
              <span className="sbp-row__meta">{previouslyViewed.caption}</span>
            </span>
          </div>
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <LoneCard t={t} id="card" product={contain([recommendedProduct])[0]} animate={animate} />
          <Trail t={t} items={followups.browse} animate={animate} />
        </>
      )}
    </SheetWindow>
  );
}
