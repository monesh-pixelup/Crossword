import { useLayoutEffect, useRef, useState } from "react";
import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ProductCollection } from "../../components/ill/ProductCollection";
import { CommerceProductCard } from "../../components/ill/CommerceProductCard";
import { RecommendationProductCard } from "../../components/ill/RecommendationProductCard";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { beatsDuration, useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Enter, Thinking } from "../../illustrations/SellMotion/parts";
import addressIcon from "../../assets/ill-icons/address.svg";
import { Home, Nav, Pdp, SearchDropdown, toCard } from "../AiSearch/AiSearch";
import { brand, domain, pdp, results } from "../AiSearch/data";
import { cx, drawnScale, useFollowLatest, useFontsReady } from "../sellDynamicMotion";

// 04 — AI Search (motion). The eight statics as one take in the same
// 550x520 window: the search opens out of the header's search button,
// the first suggestion is picked and fills the field, and Crossword takes
// over below the browser chrome with the query as the shopper's turn. It
// thinks, answers, and the two cards resolve from their skeletons; the
// turn then scrolls to its end (more gummies, follow-ups). The 60 Count
// card is picked, and Crossword closes onto the PDP: the card's image is
// the shared element that flies into the gallery while the details
// settle in around it.
const beats: Beat[] = [
  { id: "home", type: "pause", ms: 1200 },
  { id: "open-search", type: "appear", ms: 1300 },
  { id: "pick", type: "appear", ms: 850 },
  { id: "takeover", type: "appear", ms: 420 },
  { id: "think", type: "think", labels: ["Thinking", "Finding sleep support"] },
  { id: "answer", type: "text", text: results.answer },
  { id: "picks", type: "load", ms: 900 },
  { id: "read", type: "pause", ms: 1300 },
  { id: "more", type: "appear", ms: 1900 },
  // The view moves back to the picks and settles before one is picked.
  { id: "focus-picks", type: "appear", ms: 500 },
  { id: "select", type: "appear", ms: 900 },
  { id: "pdp", type: "appear", ms: 900 },
];

function Crossword({ t, closing }: { t: Timeline; closing: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const picking = t.reached("select");
  useFollowLatest(viewportRef, {
    thread: ".ais-thread",
    focus: t.reached("focus-picks") ? ".ais-picks" : undefined,
    index: t.index,
    reducedMotion: t.reducedMotion,
  });

  return (
    <Shell
      brand={brand}
      className={cx("ais-cw aism-cw", closing && "aism-cw--closing")}
      header={<ChatHeader brand={brand} showExpand={false} />}
      composerValue={results.composer}
      viewportRef={viewportRef}
    >
      <div className="ais-thread">
        <UserTurn animateIn>
          <ChatMessage role="user" text={results.query} />
        </UserTurn>
        {t.reached("think") && (
          <AssistantTurn>
            <Thinking t={t} id="think" />
            {t.reached("answer") && <AssistantText text={results.answer} />}
            {t.reached("picks") && (
              <div className={picking ? "ais-picks ais-picks--picking" : "ais-picks"}>
                <ProductCollection>
                  {results.picks.map((p, i) => (
                    <div key={p.id} className={picking && p.id === pdp.product.id ? "ais-pick ais-pick--selected" : "ais-pick"}>
                      <CommerceProductCard product={toCard(p)} loading={!t.passed("picks")} resolveDelayMs={i * 90} />
                    </div>
                  ))}
                </ProductCollection>
              </div>
            )}
            {t.reached("more") && (
              <>
                <Enter>
                  <div className="ais-more aism-more">
                    <p className="ais-label">{results.moreLabel}</p>
                    <ProductCollection>
                      {results.more.map((g) => (
                        <RecommendationProductCard key={g.id} product={{ id: g.id, name: g.name, price: g.price, image: g.image }} />
                      ))}
                    </ProductCollection>
                  </div>
                </Enter>
                <Enter delayMs={260}>
                  <AiPills options={results.followUps} selectedId="" />
                </Enter>
              </>
            )}
          </AssistantTurn>
        )}
      </div>
    </Shell>
  );
}

interface Flight {
  from: DOMRect;
  to: DOMRect;
  src: string;
}

function Scene({ t }: { t: Timeline }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLImageElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const searchOpen = t.reached("open-search");
  const onPdp = t.reached("pdp");

  // Measured in the render the PDP mounts, while the closing Crossword
  // layer (and the picked card in it) is still on screen above it.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!onPdp || !viewport || t.reducedMotion) return;
    const card = viewport.querySelector<HTMLImageElement>(".ais-pick--selected .sdm-ill-commerce-card__media img");
    const gallery = viewport.querySelector<HTMLImageElement>(".ais-gallery__main img");
    if (!card || !gallery) return;
    const box = viewport.getBoundingClientRect();
    // In CSS px whatever the zoom the site fits the visual to its panel with.
    const scale = drawnScale(viewport);
    const local = (r: DOMRect) =>
      new DOMRect((r.left - box.left) / scale, (r.top - box.top) / scale, r.width / scale, r.height / scale);
    setFlight({ from: local(card.getBoundingClientRect()), to: local(gallery.getBoundingClientRect()), src: gallery.currentSrc || gallery.src });
  }, [onPdp, t.reducedMotion]);

  useLayoutEffect(() => {
    const img = flightRef.current;
    if (!flight || !img) return;
    const frame = (r: DOMRect) => ({ left: `${r.x}px`, top: `${r.y}px`, width: `${r.width}px`, height: `${r.height}px` });
    const animation = img.animate([frame(flight.from), frame(flight.to)], {
      duration: 560,
      easing: "cubic-bezier(0.45, 0, 0.15, 1)",
      fill: "forwards",
    });
    animation.onfinish = () => setFlight(null);
    return () => animation.cancel();
  }, [flight]);

  return (
    <div className="ais aism">
      <article className="ais-store">
        <div className="sdm-ill-browser-chrome">
          <div className="sdm-ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="sdm-ill-browser-chrome__address">
            <img src={addressIcon.src} width="10" height="11" alt="" />
            <span key={onPdp ? "pdp" : "home"} className={onPdp ? "aism-address" : undefined}>
              {onPdp ? `${domain}/daily-sleep-gummies` : domain}
            </span>
          </div>
        </div>
        <div className="ais-viewport" ref={viewportRef}>
          <div className="ais-page">
            <Nav searching={searchOpen && !t.reached("takeover")} />
            <div className="ais-body">
              {onPdp ? (
                <div className={cx("aism-pdp", flight && "aism-pdp--flying")}>
                  <Pdp />
                </div>
              ) : (
                <Home />
              )}
              <ContentFade />
              {searchOpen && (
                <div className={cx("aism-search", t.reached("takeover") && "aism-search--out")}>
                  <div className="ais-scrim" />
                  <SearchDropdown picked={t.reached("pick")} />
                </div>
              )}
            </div>
          </div>
          {t.reached("takeover") && <Crossword t={t} closing={onPdp} />}
          {flight && <img ref={flightRef} className="aism-flight" src={flight.src} alt="" />}
        </div>
      </article>
    </div>
  );
}

/** How long the sequence takes to play out, in ms. */
export const aiSearchMotionDuration = beatsDuration(beats);

// `play` lets the host hold the sequence too (the Lifecycle panel plays it once the section is on screen).
export function AiSearchMotion({ play = true }: { play?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady && play);
  return (
    <div ref={rootRef}>
      <Scene t={t} key={t.runKey} />
    </div>
  );
}
