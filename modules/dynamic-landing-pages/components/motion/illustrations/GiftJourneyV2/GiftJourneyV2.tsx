import { ProductImage } from "../../visuals/AiAssistantsV3/ProductImage";
import { useLayoutEffect, useRef, useState } from "react";
import { SceneFrame } from "../../components/ill/SceneFrame";
// Aurelia brand mark (the gold "A" alone), Figma node 3359:3345; it sits on
// the kit's burgundy disc at the frame's own proportions (AureliaMark).
import { BrandMark, BrandName } from "../../brands/BrandIdentity";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import {
  brand,
  turn1,
  firstPicks,
  turn2,
  pendants,
  turn3,
  addedPendant,
  turn4,
  chains,
  turn5,
  addedChain,
} from "../GiftJourney/data";

// 01 — Sell: Conversational interface, rebuilt against
// STORYBOOK_MAPPING.md. SceneFrame (the red damask marketing frame) and
// the 550x520 widget slot are unchanged; everything inside the widget
// is the product ChatWindow anatomy: centred header (history, new
// chat, brand capsule, more, close), grey user bubbles, unbubbled AI
// replies at a 16px turn rhythm, the product-card carousel (216px rail
// cards with heart / chat pucks and a "+ Add" pill), the lone card in
// its "Added" CTA state, and the composer capsule with the attribution
// note. Same copy and thread as GiftJourney; static, top-of-thread view.
export function GiftJourneyV2() {
  return (
    <SceneFrame>
      <div className="gj2-win">
        <ChatHead />

        <div className="gj2-transcript">
          <UserMsg text={turn1.userMessage} />
          <AiMsg text={turn1.assistantMessage} />
          <Rail products={firstPicks} />
          <Followups items={turn1.followups} />

          <UserMsg text={turn2.userMessage} />
          <AiMsg text={turn2.assistantMessage} />
          <Rail products={pendants} />
          <Followups items={turn2.followups} picked={tappedChip(turn2.followups, turn3.userMessage)} />

          <UserMsg text={turn3.userMessage} />
          <AiMsg text={turn3.assistantMessage} />
          <ProductCard product={addedPendant} added lone />
          <Followups items={turn3.followups} picked={tappedChip(turn3.followups, turn4.userMessage)} />

          <UserMsg text={turn4.userMessage} />
          <AiMsg text={turn4.assistantMessage} />
          <Rail products={chains} />
          <Followups items={turn4.followups} picked={tappedChip(turn4.followups, turn5.userMessage)} />

          <UserMsg text={turn5.userMessage} />
          <AiMsg text={turn5.assistantMessage} />
          <ProductCard product={addedChain} added lone />
          <Followups items={turn5.followups} />
        </div>

        <ChatFoot />
      </div>
    </SceneFrame>
  );
}

// Merchant identity comes from the shared demo-brand registry.
export function ChatHead({ brand: store }: { brand?: string } = {}) {
  return (
    <header className="gj2-head">
      <div className="gj2-head__group">
        <Puck label="Chat history"><HistoryGlyph /></Puck>
        <Puck label="New chat"><PlusGlyph /></Puck>
      </div>
      {store ? <StoreIdentity name={store} /> : <AureliaIdentity />}
      <div className="gj2-head__group">
        <Puck label="More"><DotsGlyph /></Puck>
        <Puck label="Close"><CloseGlyph /></Puck>
      </div>
    </header>
  );
}

export function AureliaIdentity() {
  return (
    <div className="gj2-head__identity">
      <AureliaMark className="gj2-head__logo" />
      <span className="gj2-head__name">{brand}</span>
    </div>
  );
}

function StoreIdentity({ name }: { name: string }) {
  return (
    <div className="gj2-head__identity">
      <BrandMark brand={name} className="gj2-head__logo" />
      <BrandName brand={name} className="gj2-head__name" />
    </div>
  );
}

// Composer capsule. `value` shows typed text with a caret and arms the
// send disc (primary fill); unset, it's the resting placeholder.
export function ChatFoot({ value }: { value?: string }) {
  // While typing, the capsule's height follows its measured content on a
  // 200ms transition, so a wrapping line grows it instead of snapping the
  // transcript above. Unset (static), the height is left to layout.
  const valueRef = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    if (!value) {
      setHeight(undefined);
      return;
    }
    const content = valueRef.current?.offsetHeight ?? 0;
    setHeight(Math.max(48, content + 12));
  }, [value]);

  return (
    <footer className="gj2-foot">
      <div className="gj2-composer" style={height ? { height } : undefined}>
        {value ? (
          <span className="gj2-composer__value" ref={valueRef}>{value}<span className="gj2-caret" aria-hidden="true" /></span>
        ) : (
          <span className="gj2-composer__placeholder">Ask anything</span>
        )}
        <span className={value ? "gj2-send gj2-send--ready" : "gj2-send"} aria-label="Send"><ArrowUpGlyph /></span>
      </div>
      <p className="gj2-note">AI can make mistakes. Powered by <u>Crossword</u></p>
    </footer>
  );
}

// The Aurelia mark on its burgundy disc, balanced as in Figma (node
// 3359:3345): the "A" spans 58.6% of the disc and sits 2.75% above centre,
// since its weight is in the base. The disc takes its size from className.
export function AureliaMark({ className }: { className?: string }) {
  return (
    <span className={["aurelia-mark", className].filter(Boolean).join(" ")} aria-hidden="true">
      <BrandMark brand="Aurelle" className="legacy-supplied-mark" />
    </span>
  );
}

export function UserMsg({ text }: { text: string }) {
  return <p className="gj2-msg gj2-msg--user">{text}</p>;
}

export function AiMsg({ text }: { text: string }) {
  return <p className="gj2-msg gj2-msg--ai">{text}</p>;
}

// The proactive follow-ups under each reply: the Storybook's trail row
// (.nw-win__row) of pill chips, wrapping onto a second line on the phone.
// `picked` marks the chip the shopper tapped (the motion presses it, then
// sends its words as their next message).
export function Followups({ items, picked, className }: { items: string[]; picked?: string; className?: string }) {
  return (
    <div className={["gj2-followups", className].filter(Boolean).join(" ")}>
      {items.map((text) => (
        <span key={text} className={text === picked ? "gj2-followup gj2-followup--picked" : "gj2-followup"}>{text}</span>
      ))}
    </div>
  );
}

// The chip whose words are this message (trailing punctuation aside), if
// any — that turn is a tap, not typing.
export function tappedChip(items: string[] | undefined, message: string | undefined) {
  if (!items || !message) return undefined;
  const bare = (t: string) => t.trim().replace(/[.!?]+$/, "").toLowerCase();
  return items.find((t) => bare(t) === bare(message));
}

export function Rail({ products, loading = false, ctaLabel, className }: { products: CommerceProduct[]; loading?: boolean; ctaLabel?: string; className?: string }) {
  return (
    <div className={className ? `gj2-rail ${className}` : "gj2-rail"}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} loading={loading} resolveDelayMs={i * 80} ctaLabel={ctaLabel} />
      ))}
    </div>
  );
}

// `loading` lays the product's skeleton card over the real content (opaque
// on mount, only the exit crossfades). `adding` plays the CTA's one-shot
// Adding… → Added lifecycle on mount instead of resting in Added. Both
// default off, so the static visual is unchanged.
export function ProductCard({
  product,
  added = false,
  lone = false,
  loading,
  resolveDelayMs = 0,
  adding = false,
  addingDelayMs = 0,
  ctaLabel = "Add",
}: {
  product: CommerceProduct;
  added?: boolean;
  lone?: boolean;
  loading?: boolean;
  resolveDelayMs?: number;
  adding?: boolean;
  addingDelayMs?: number;
  ctaLabel?: string;
}) {
  return (
    <article className={["gj2-card", lone && "gj2-card--lone"].filter(Boolean).join(" ")} data-product-id={product.id} data-product-brand={product.brand}>
      {loading !== undefined && (
        <div
          className={loading ? "gj2-skel" : "gj2-skel gj2-skel--hidden"}
          style={{ transitionDelay: loading ? "0ms" : `${resolveDelayMs}ms` }}
          aria-hidden="true"
        >
          <span className="gj2-skel__media" />
          <span className="gj2-skel__line gj2-skel__line--brand" />
          <span className="gj2-skel__line gj2-skel__line--name" />
        </div>
      )}
      <div className="gj2-card__tile">
        {product.image && <ProductImage src={product.image} alt={product.title} style={product.imageFit ? { objectFit: product.imageFit } : undefined} />}
        {product.tag && <span className="gj2-badge">{product.tag}</span>}
        <span className="gj2-card__expand" aria-label="Expand"><CornersOutGlyph /></span>
      </div>
      <div className="gj2-card__col">
        <span className="gj2-card__caption">{product.brand}</span>
        <span className="gj2-card__title">{product.title}</span>
        {product.subtitle && <span className="gj2-card__caption">{product.subtitle}</span>}
        {product.rating !== undefined && <Stars value={product.rating} count={product.ratingCount ?? ""} />}
        {product.price && <span className="gj2-card__price">{product.price}</span>}
      </div>
      <div className="gj2-card__actions">
        <span className="gj2-puck" aria-label="Save for later"><HeartGlyph /></span>
        <span className="gj2-puck" aria-label="Chat about this"><ChatDoorGlyph /></span>
        {added && adding ? (
          <span className="gj2-cta gj2-cta--lifecycle" style={{ "--gj2-cta-delay": `${addingDelayMs}ms` } as React.CSSProperties}>
            <span className="gj2-cta__fill" />
            <span className="gj2-cta__phase gj2-cta__phase--adding">Adding…</span>
            <span className="gj2-cta__phase gj2-cta__phase--done"><CheckCircleGlyph />Added</span>
          </span>
        ) : added ? (
          <span className="gj2-cta gj2-cta--done"><CheckCircleGlyph />Added</span>
        ) : (
          <span className="gj2-cta"><PlusGlyph size={18} trim />{ctaLabel}</span>
        )}
      </div>
    </article>
  );
}

function Stars({ value, count }: { value: number; count: string }) {
  return (
    <span className="gj2-rating">
      <span className="gj2-rating__stars" aria-label={`${value} out of 5`}>
        <span className="gj2-rating__empty">★★★★★</span>
        <span className="gj2-rating__fill" style={{ width: `${(value / 5) * 100}%` }}>★★★★★</span>
      </span>
      <span className="gj2-rating__count">({count})</span>
    </span>
  );
}

function Puck({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="gj2-head__puck" aria-label={label}>
      {children}
    </span>
  );
}

// Phosphor isn't a dependency of this kit, so these redraw the Phosphor
// regular glyphs the product uses at their 256 viewBox and 16 stroke.
const glyph = {
  viewBox: "0 0 256 256",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 16,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HistoryGlyph() {
  return (
    <svg {...glyph} width={16} height={16}>
      <polyline points="128 80 128 128 168 152" />
      <polyline points="72 104 32 104 32 64" />
      <path d="M67.6,192A88,88,0,1,0,65.8,65.8C55.4,76.3,46.2,86.4,32,104" />
    </svg>
  );
}

// `trim` crops the 256 grid to the drawn plus (32–224 with its round
// caps) and shrinks the box to match, same stroke and size on screen: in
// a button, flex then centres the mark you see, not its empty margin.
export function PlusGlyph({ size = 16, trim = false }: { size?: number; trim?: boolean }) {
  const box = trim ? (size * 192) / 256 : size;
  return (
    <svg {...glyph} viewBox={trim ? "32 32 192 192" : glyph.viewBox} width={box} height={box}>
      <line x1="40" y1="128" x2="216" y2="128" />
      <line x1="128" y1="40" x2="128" y2="216" />
    </svg>
  );
}

function DotsGlyph() {
  return (
    <svg viewBox="0 0 256 256" width={16} height={16} fill="currentColor">
      <circle cx="128" cy="128" r="12" />
      <circle cx="196" cy="128" r="12" />
      <circle cx="60" cy="128" r="12" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg {...glyph} width={16} height={16}>
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="200" y1="200" x2="56" y2="56" />
    </svg>
  );
}

function ArrowUpGlyph() {
  return (
    <svg {...glyph} width={16} height={16}>
      <line x1="128" y1="216" x2="128" y2="40" />
      <polyline points="56 112 128 40 200 112" />
    </svg>
  );
}

function CornersOutGlyph() {
  return (
    <svg {...glyph} width={18} height={18}>
      <polyline points="168 48 208 48 208 88" />
      <polyline points="88 208 48 208 48 168" />
      <polyline points="208 168 208 208 168 208" />
      <polyline points="48 88 48 48 88 48" />
    </svg>
  );
}

function HeartGlyph() {
  return (
    <svg {...glyph} width={18} height={18}>
      <path d="M128,216S24,160,24,94A54,54,0,0,1,128,73.19h0A54,54,0,0,1,232,94C232,160,128,216,128,216Z" />
    </svg>
  );
}

// The product's custom ChatDoorIcon: speech bubble plus a 4-point sparkle.
function ChatDoorGlyph() {
  return (
    <svg viewBox="2.5 3.758 25 25" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7.5H8.5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1.5v3.5l4.5-3.5h5a3 3 0 0 0 3-3V15" />
      <path d="M21 5.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  );
}

// Cropped to the drawn circle (24–232) at the same 18px scale, so the
// "Added" label centres on the mark, not on its margin.
function CheckCircleGlyph() {
  const box = (18 * 208) / 256;
  return (
    <svg viewBox="24 24 208 208" width={box} height={box} fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}
