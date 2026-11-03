import { useEffect, useRef } from "react";
import { SceneFrame } from "../../components/ill/SceneFrame";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../SellMotion/useChatTimeline";
import { ChatHead, ChatFoot, Rail, Followups } from "../GiftJourneyV2/GiftJourneyV2";
import { FADE_CLEARANCE, SparkGlyph, StreamedReply, WAIT_CARDS, WAIT_FIRST } from "../GiftJourneyV2/GiftJourneyV2Motion";
import { ImageTile, ProductRow, QuizPlates } from "../GiftJourneyV2/StorybookParts";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import { asCards, contain, followups, storeName } from "./ProductDiscoveryV2";
import * as discovery from "../ConversationalDiscovery/data";
import * as tryOn from "../TryItOn/data";
import * as qa from "../ProductQA/data";
import * as outfit from "../OutfitBuilding/data";
import * as finder from "../GuidedFinder/data";
import * as visual from "../VisualDiscovery/data";
import * as sizeFit from "../SizeFit/data";
import * as gift from "../GiftFinder/data";

// 09–16 in motion, against STORYBOOK_MAPPING.md: each visual keeps its own
// beat list from SellMotion/*Motion.tsx and the shared sequencer
// (useChatTimeline, unchanged), and plays it in 01's 550x520 window with
// 01's motion: composer typing with the send disc arming, the bubble pop,
// the spark + shimmer wait line, the reply streamed word by word, card
// skeletons resolving 80ms apart, and the transcript following the latest
// turn under its fades. The originals' insight beats are dropped with the
// insight box; a closing beat brings in the follow-ups instead.
export const FOLLOWUPS: Beat = { id: "followups", type: "appear", ms: 500 };

// One window driven by a beat list; `children` renders the thread against
// the timeline. Starts when the visual lands on screen, restarts on every
// landing (useChatTimeline's `active`).
function MotionWindow({ brand, beats, children }: { brand: string; beats: Beat[]; children: (t: Timeline, animate: boolean) => React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const t = useChatTimeline(beats, active);
  useFollowLatest(transcriptRef, t);

  return (
    <div ref={rootRef}>
      <SceneFrame>
        <div className="gj2-win">
          <ChatHead brand={storeName(brand)} />
          <div className="gj2-transcript" ref={transcriptRef} key={t.runKey}>
            {children(t, !t.reducedMotion)}
          </div>
          <ChatFoot value={t.composer?.value || undefined} />
        </div>
      </SceneFrame>
    </div>
  );
}

// Follow the latest turn; a ResizeObserver also catches growth inside a
// beat (a card resolving, a quiz row landing).
export function useFollowLatest(transcriptRef: React.RefObject<HTMLDivElement | null>, t: Timeline) {
  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    let cancel: (() => void) | undefined;
    const follow = () => {
      const target = viewport.lastElementChild;
      if (!target) return;
      // In the viewport's own CSS px: the site zooms each visual to fit its
      // panel, and getBoundingClientRect reports zoomed values while
      // scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
      const vr = viewport.getBoundingClientRect();
      const zoom = viewport.offsetHeight ? vr.height / viewport.offsetHeight : 1;
      const bottom = target.getBoundingClientRect().bottom / zoom;
      const edge = vr.bottom / zoom - FADE_CLEARANCE;
      if (bottom <= edge) return;
      const top = viewport.scrollTop + bottom - edge;
      cancel?.();
      if (t.reducedMotion) viewport.scrollTop = top;
      else cancel = animateScrollTo(viewport, top);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel?.();
    };
  }, [t.index, t.runKey, t.reducedMotion]);
}

export function User({ text, animate }: { text: string; animate: boolean }) {
  return <p className={`gj2-msg gj2-msg--user${animate ? " gj2-in" : ""}`}>{text}</p>;
}

// 01's wait line, with the product's fixed copy (§8) in place of the
// originals' content labels: "Fetching the product…" before cards.
export function Think({ t, id, cards = false }: { t: Timeline; id: string; cards?: boolean }) {
  const status = t.status(id);
  if (!status) return null;
  return (
    <div className={status.visible ? "gj2-think gj2-in-ai" : "gj2-think gj2-think--out"}>
      <span className="gj2-think__mark"><SparkGlyph /></span>
      <span className="gj2-think__window"><span className="gj2-think__line">{cards ? WAIT_CARDS : WAIT_FIRST}</span></span>
    </div>
  );
}

export function Cards({ t, id, products, animate, className }: { t: Timeline; id: string; products: CommerceProduct[]; animate: boolean; className?: string }) {
  if (!t.reached(id)) return null;
  return (
    <div className={[animate && "gj2-rise", className].filter(Boolean).join(" ") || undefined}>
      <Rail products={products} loading={t.loading(id)} />
    </div>
  );
}

export function Trail({ t, items, animate }: { t: Timeline; items: string[]; animate: boolean }) {
  if (!t.reached("followups")) return null;
  return <Followups items={items} className={animate ? "gj2-followups--in" : undefined} />;
}

export const rise = (animate: boolean) => (animate ? "sbp-in" : undefined);

const discoveryBeats: Beat[] = [
  { id: "ask", type: "compose", text: discovery.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding linen options"] },
  { id: "reply", type: "text", text: discovery.script.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS,
];

export function ConversationalDiscoveryV2Motion() {
  const { script, products } = discovery;
  return (
    <MotionWindow brand={script.brand} beats={discoveryBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Cards t={t} id="cards" products={asCards(products, storeName(script.brand))} animate={animate} />
          <Trail t={t} items={followups.discovery} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

const tryOnBeats: Beat[] = [
  { id: "ask", type: "compose", text: tryOn.script.userMessage },
  { id: "think-offer", type: "think", labels: ["Thinking"] },
  { id: "offer", type: "text", text: tryOn.script.assistantOffer },
  { id: "upload", type: "compose", holdMs: 1000 },
  { id: "think-result", type: "think", labels: ["Thinking", "Styling your look"] },
  { id: "result", type: "text", text: tryOn.script.assistantResult },
  { id: "image", type: "load", ms: 1000 },
  FOLLOWUPS,
];

export function TryItOnV2Motion() {
  const { script, media, referencedProduct } = tryOn;
  return (
    <MotionWindow brand={script.brand} beats={tryOnBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={media.dressReference} title={referencedProduct.title} meta={storeName(referencedProduct.brand)} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think-offer" />
          {t.reached("offer") && <StreamedReply text={script.assistantOffer} animate={animate} />}
          {t.passed("upload") && <ImageTile src={media.shopperUpload} alt="Photo uploaded by the shopper" className={["pd2-upload", rise(animate)].filter(Boolean).join(" ")} />}
          <Think t={t} id="think-result" />
          {t.reached("result") && <StreamedReply text={script.assistantResult} animate={animate} />}
          {t.reached("image") && (
            <div className={["pd2-result", animate && "gj2-rise"].filter(Boolean).join(" ")}>
              <ImageTile src={media.tryonResult} alt="Personalised try-on result" from="ai" />
              <span className={t.loading("image") ? "gj2-skel pd2-result__skel" : "gj2-skel pd2-result__skel gj2-skel--hidden"} aria-hidden="true">
                <span className="gj2-skel__media" />
              </span>
            </div>
          )}
          <Trail t={t} items={followups.tryOn} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

const qaBeats: Beat[] = [
  { id: "ask", type: "compose", text: qa.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking how you use it"] },
  { id: "reply", type: "text", text: qa.script.assistantMessage },
  FOLLOWUPS,
];

export function ProductQAV2Motion() {
  const { script, product } = qa;
  return (
    <MotionWindow brand={script.brand} beats={qaBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={product.image} title={product.title} meta={`${storeName(product.brand)} · ${product.price} · ★${product.rating}`} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Trail t={t} items={followups.qa} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

const outfitBeats: Beat[] = [
  { id: "ask", type: "compose", text: outfit.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Pairing it with your style"] },
  { id: "reply", type: "text", text: outfit.script.assistantMessage },
  { id: "cards", type: "load", ms: 700 },
  FOLLOWUPS,
];

export function OutfitBuildingV2Motion() {
  const { script, anchor, coordinates } = outfit;
  return (
    <MotionWindow brand={script.brand} beats={outfitBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={anchor.image} title={anchor.title} meta={storeName(anchor.brand)} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Cards t={t} id="cards" products={asCards(coordinates, storeName(script.brand))} animate={animate} />
          <Trail t={t} items={followups.outfit} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

// The quiz resolves question by question, each on its own beat.
const finderBeats: Beat[] = [
  { id: "ask", type: "compose", text: finder.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "framing", type: "text", text: finder.script.framing },
  ...finder.answers.map((_, i): Beat => ({ id: `q${i}`, type: "appear", ms: 500 })),
  { id: "think-match", type: "think", labels: ["Finding your match"] },
  { id: "result", type: "text", text: finder.script.resultMessage },
  { id: "card", type: "load", ms: 700 },
  FOLLOWUPS,
];

export function GuidedFinderV2Motion() {
  const { script, answers, product } = finder;
  return (
    <MotionWindow brand={script.brand} beats={finderBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" />
          {t.reached("framing") && <StreamedReply text={script.framing} animate={animate} />}
          {t.reached("q0") && (
            <QuizPlates
              questions={answers.filter((_, i) => t.reached(`q${i}`))}
              className={["pd2-quiz", animate && "pd2-quiz--in"].filter(Boolean).join(" ")}
            />
          )}
          <Think t={t} id="think-match" cards />
          {t.reached("result") && <StreamedReply text={script.resultMessage} animate={animate} />}
          <Cards t={t} id="card" products={contain([product])} animate={animate} className="pd2-single-wrap" />
          <Trail t={t} items={followups.finder} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

const visualBeats: Beat[] = [
  { id: "ask", type: "compose", text: visual.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Matching the glow"] },
  { id: "reply", type: "text", text: visual.script.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS,
];

export function VisualDiscoveryV2Motion() {
  const { script, uploadedImage, matches } = visual;
  return (
    <MotionWindow brand={script.brand} beats={visualBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <ImageTile src={uploadedImage.src} alt={uploadedImage.alt} className={["pd2-upload", rise(animate)].filter(Boolean).join(" ")} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Cards t={t} id="cards" products={asCards(matches, storeName(script.brand))} animate={animate} />
          <Trail t={t} items={followups.visual} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

const sizeFitReply =
  "You're between sizes, but based on the head measurement you provided, I'd recommend Medium. It's also the better choice if you prefer a snug fit, which you've selected before.";

const sizeFitBeats: Beat[] = [
  { id: "ask", type: "compose", text: sizeFit.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Checking your measurements"] },
  { id: "reply", type: "text", text: sizeFitReply },
  FOLLOWUPS,
];

export function SizeFitV2Motion() {
  const { script, product } = sizeFit;
  return (
    <MotionWindow brand={script.brand} beats={sizeFitBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <ProductRow image={product.image} title={product.title} meta={`${storeName(product.brand)} · ${product.price} · ★${product.rating}`} className={rise(animate)} />
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" />
          {t.reached("reply") && <SizeReply animate={animate} />}
          <Trail t={t} items={followups.sizeFit} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}

// The reply streams like any other, with "Medium" kept in medium weight.
function SizeReply({ animate }: { animate: boolean }) {
  const words = sizeFitReply.split(" ");
  return (
    <p className="gj2-msg gj2-msg--ai">
      {words.map((word, i) => {
        const strong = word === "Medium.";
        const inner = strong ? <><strong>Medium</strong>.</> : word;
        return (
          <span key={i}>
            {animate ? <span className="gj2-word" style={{ animationDelay: `${i * 45}ms` }}>{inner}</span> : inner}
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
}

const giftBeats: Beat[] = [
  { id: "ask", type: "compose", text: gift.script.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Finding gifts around $150"] },
  { id: "reply", type: "text", text: gift.script.assistantMessage },
  { id: "cards", type: "load", ms: 750 },
  FOLLOWUPS,
];

export function GiftFinderV2Motion() {
  const { script, gifts } = gift;
  return (
    <MotionWindow brand={script.brand} beats={giftBeats}>
      {(t, animate) => t.passed("ask") && (
        <>
          <User text={script.userMessage} animate={animate} />
          <Think t={t} id="think" cards />
          {t.reached("reply") && <StreamedReply text={script.assistantMessage} animate={animate} />}
          <Cards t={t} id="cards" products={contain(gifts)} animate={animate} />
          <Trail t={t} items={followups.gift} animate={animate} />
        </>
      )}
    </MotionWindow>
  );
}
