import { useLayoutEffect, useRef, useState } from "react";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../../illustrations/SellMotion/useChatTimeline";
import { ChatHead, ChatFoot, Followups } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { storeName } from "../../illustrations/ProductDiscoveryV2/ProductDiscoveryV2";
import { StorybookKnock } from "./StorybookKnock";
import { MarketplaceBackground as InterventionPage } from "../ProactiveIntervention/MarketplaceBackground";
import { MarketplaceBackground as GuidancePage } from "../ComparisonGuidance/MarketplaceBackground";
import { MarketplaceBackground as ReturnVisitPage } from "../ReturnVisitComparison/MarketplaceBackground";
import * as intervention from "../ProactiveIntervention/data";
import * as guidance from "../ComparisonGuidance/data";
import * as returnVisit from "../ReturnVisitComparison/data";

// Sell: Conversational interface 21–23 (proactive messages), rebuilt
// against STORYBOOK_MAPPING.md on the web, at the originals' size: the
// framed 1280x509 canvas, each retailer's desktop marketplace page and the
// content fade are the originals', unchanged, and so is the composition —
// the widget centred on the page, its composer pinned to one y across the
// three (sell-widget-align-composer).
// The sequence is the Storybook's web proactive flow (BarProactiveWeb's
// KnockSeat, BarProductBuzz's BUZZ_NOTE_CSS): the bar (composer capsule)
// arrives and settles; a beat later the **knock** pops in centred 16px
// above it, compact (300px, white, radius 16, hairline + the bar's cast,
// 10px insets, 20px close; a 32px brand disc, the store, its line clamped
// to two, the 32px door pair — secondary first, primary last; the
// products wait for the window; the 883ms pop
// 0 → 1.05 → .95 → 1) and holds to be read; the card is tapped, sinks
// (333ms), and the chat opens ON the knock's line (KnockSeat's greet) —
// the capsule growing into 01's window as 09 does (§15: 400ms on
// (.32,.72,0,1), the composer never moves, the radius never animates,
// the header settling at 240ms). Inside: the knock's line, its products
// as List View rows, and the two doors standing as the trail's chips.
// The window's final layout is reserved from the first frame. The trigger
// stays scene context only (never dialogue), as before.


type Row = { image: string; title: string; meta: string };
type Clip = { top: number; right: number; bottom: number; left: number; radius: number };

// The window's clip starts at the composer capsule's own rect (measured)
// and eases out past the window's edges on `open`. The window remounts on
// every run (`runKey`), so it's measured again each time.
export function useComposerClip(winRef: React.RefObject<HTMLDivElement | null>, runKey: number) {
  const [clip, setClip] = useState<Clip | null>(null);
  useLayoutEffect(() => {
    const win = winRef.current;
    const composer = win?.querySelector(".gj2-composer");
    if (!win || !composer) return;
    const measure = () => {
      const w = win.getBoundingClientRect();
      const c = composer.getBoundingClientRect();
      // Rects are in screen pixels; the clip is in the window's own (the
      // page may scale the figure), so normalise by the rendered scale.
      const k = win.offsetWidth / w.width || 1;
      setClip({
        top: (c.top - w.top) * k,
        right: (w.right - c.right) * k,
        bottom: (w.bottom - c.bottom) * k,
        left: (c.left - w.left) * k,
        radius: (c.height * k) / 2,
      });
    };
    measure();
    document.fonts?.ready?.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(win);
    return () => observer.disconnect();
  }, [winRef, runKey]);
  return clip;
}

function WidgetCanvas({
  brand,
  Page,
  message,
  knockLine,
  knockProduct,
  lead,
  rows,
  secondary,
  primary,
}: {
  brand: string;
  Page: () => React.ReactNode;
  message: string;
  /** The knock's own line (its title clamps to two lines), and the
   *  product shot its disc holds; absent, the waving hand. */
  knockLine: string;
  knockProduct?: string;
  lead?: React.ReactNode;
  rows?: Row[];
  secondary?: string;
  primary: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const t = useChatTimeline(knockBeats, landed);
  const animate = !t.reducedMotion;
  const clip = useComposerClip(winRef, t.runKey);
  const open = t.reached("expand");
  const knock = animate && t.reached("knock") && !open;
  const name = storeName(brand);

  const style = clip
    ? ({
        "--pv2-clip-top": `${clip.top}px`,
        "--pv2-clip-right": `${clip.right}px`,
        "--pv2-clip-bottom": `${clip.bottom}px`,
        "--pv2-clip-left": `${clip.left}px`,
        "--pv2-clip-radius": `${clip.radius}px`,
        // The knock seats 16px above the capsule's top edge (KNOCK_CSS
        // measures the same off the bar).
        "--pv2-knock-bottom": `${clip.bottom + clip.radius * 2 + 16}px`,
      } as React.CSSProperties)
    : undefined;

  const products = (
    <>
      {lead}
      {rows?.map((r) => (
        <div key={r.title} className="sbp-row pv2-row">
          <span className="sbp-row__thumb"><img src={r.image} alt="" /></span>
          <span className="sbp-row__col">
            <span className="sbp-row__title">{r.title}</span>
            <span className="sbp-row__meta">{r.meta}</span>
          </span>
        </div>
      ))}
    </>
  );
  // KnockSeat's quiet door defaults to "Ask me anything".
  const doors = [secondary ?? "Ask me anything", primary];

  // The window opens on the knock's line: the line, its products, and the
  // doors as the trail's chips. Laid out invisibly to hold the size; the
  // live copy rises over it once the window opens.
  const turn = (live: boolean) => (
    <>
      <p className={["gj2-msg gj2-msg--ai", live && animate && "pv2-in"].filter(Boolean).join(" ")}>{message}</p>
      <div className={["pv2-rows", live && animate && "pv2-rows--in"].filter(Boolean).join(" ")}>{products}</div>
      {(!live || t.reached("trail")) && <Followups items={doors} className={live && animate ? "gj2-followups--in" : undefined} />}
    </>
  );

  return (
    <div ref={rootRef} className="ill-visual-canvas ill-visual-canvas--framed">
      <div className="ill-visual-canvas__background">
        <Page />
      </div>
      <div className="ill-visual-canvas__fade">
        <ContentFade />
      </div>
      <div className="ill-visual-canvas__widget sell-widget-align-composer">
        <div key={t.runKey} className={["pv2-seat", landed && animate && "sell-widget-enter"].filter(Boolean).join(" ")} style={style}>
          <div
            ref={winRef}
            className={["gj2-win pv2-win", (open || !animate) && "pv2-win--open", !clip && "pv2-win--unmeasured"].filter(Boolean).join(" ")}
          >
            <div className="pv2-head"><ChatHead brand={name} /></div>
            <div className="gj2-transcript pv2-transcript">
              <div className="sell-reserve">
                <div className="sell-hidden pv2-stack" aria-hidden="true">{turn(false)}</div>
                <div className="sell-reserve__live pv2-stack">{(open || !animate) && turn(true)}</div>
              </div>
            </div>
            <ChatFoot />
          </div>
          {knock && (
            <div className="pv2-knock-seat">
              <StorybookKnock
                title={knockLine}
                product={knockProduct}
                doors={[{ label: secondary ?? "Ask me anything" }, { label: primary, primary: true }]}
                hovered={t.reached("tap")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// The bar settles (1.2s), the knock pops (883ms) and holds to be read,
// the card is tapped, it sinks as the window opens (the knock's 333ms
// exit inside 09's 400ms open), and the trail's chips arrive last.
const knockBeats: Beat[] = [
  { id: "idle", type: "pause", ms: 1200 },
  { id: "knock", type: "appear", ms: 883 },
  { id: "read", type: "pause", ms: 3600 },
  { id: "tap", type: "pause", ms: 320 },
  { id: "expand", type: "appear", ms: 700 },
  { id: "trail", type: "appear", ms: 500 },
];

// ---- 21 Proactive message: same product page ----

export function ProactiveInterventionV2Motion() {
  const { marketplace: m, widget: w } = intervention;
  const ref = w.productReference;
  return (
    <WidgetCanvas
      brand={m.retailer}
      Page={InterventionPage}
      message={w.message}
      knockLine={w.knockLine}
      knockProduct={ref.image}
      rows={[{ image: ref.image, title: ref.title, meta: `${storeName(ref.brand)} · ${ref.price}` }]}
      secondary={w.secondaryAction}
      primary={w.primaryAction}
    />
  );
}

// ---- 22 Proactive message: similar foundations ----
// The three viewed foundations as one List View row with their shots
// stacked as its thumb (as 20), so the window fits the 509px canvas.

export function ComparisonGuidanceV2Motion() {
  const { marketplace: m, widget: w, foundations } = guidance;
  const prices = foundations.map((f) => Number(f.price.slice(1)));
  const finishes = [...new Set(foundations.map((f) => f.attributeValue.split(" · ")[0]))].join(", ");
  return (
    <WidgetCanvas
      brand={m.retailer}
      Page={GuidancePage}
      message={w.message}
      knockLine="Torn between three? I can narrow them down for you."
      lead={
        <div className="sbp-row um2-viewed pv2-row">
          <span className="um2-viewed__stack">
            {foundations.map((f) => (
              <span key={f.title} className="sbp-row__thumb um2-viewed__thumb"><img src={f.widgetImage} alt="" /></span>
            ))}
          </span>
          <span className="sbp-row__col">
            <span className="sbp-row__title">{foundations.length} foundations viewed</span>
            <span className="sbp-row__meta">${Math.min(...prices)}–${Math.max(...prices)} · {finishes}</span>
          </span>
        </div>
      }
      primary={w.primaryAction}
    />
  );
}

// ---- 23 Proactive message: return visit ----

export function ReturnVisitComparisonV2Motion() {
  const { marketplace: m, widget: w } = returnVisit;
  return (
    <WidgetCanvas
      brand={m.retailer}
      Page={ReturnVisitPage}
      message={w.message}
      knockLine="Back again? I can compare it with the others you viewed."
      knockProduct={w.current.image}
      rows={[{ image: w.current.image, title: w.current.title, meta: `${storeName(w.current.brand)} · ${w.current.price} · ${m.viewedLabel}` }]}
      secondary={w.secondaryAction}
      primary={w.primaryAction}
    />
  );
}
