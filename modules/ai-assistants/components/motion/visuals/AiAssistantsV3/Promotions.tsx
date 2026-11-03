import { useEffect, useRef, useState } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { ScaleToFit } from "../../components/ill/ScaleToFit";
import { ProductImage } from "./ProductImage";
import { Check } from "./AiAssistantsV3";
import { App, Badge, ComposerBar, Header, User } from "./MobileCommerce";
import { $ } from "../PersonalAgentsPossibilities/data";
import { launches, promo, upgrade } from "./promotionsData";

// AI Assistants → Promotions & Upselling, 12–14. On the motion page with
// one minimal landing: the first time a frame is on screen, its turns rise
// in once, staggered, and stay (no loop, no restart). A 355x402 frame (compact_bg backdrop) holding a
// 292x338 ChatGPT window: 07–10's iOS shell (header, grey user bubble,
// plain assistant text, pill composer) laid out at ChatGPT's own 390px
// width and scaled down, so type and spacing stay ChatGPT's. Trailwell
// only ever appears as the app result, "Trailwell via Crossword".
//   12 Upgrade  = a better product
//   13 Offer    = a better deal
//   14 Launches = merchandising priority
const LAYOUT_W = 390;
const WINDOW_W = 292;
const WINDOW_H = 338;
const LAYOUT_H = Math.round((WINDOW_H * LAYOUT_W) / WINDOW_W);

function Compact({ name, children }: { name: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useLandedOnScreen(ref);
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    if (onScreen) setLanded(true);
  }, [onScreen]);
  return (
    <figure className="aiv3-figure" data-name={name}>
      <figcaption className="app-stage__tile-label">{name}</figcaption>
      <div className={`apu-canvas${landed ? " is-landed" : ""}`} ref={ref}>
        <div className="apu-window">
          <ScaleToFit contentWidth={LAYOUT_W} contentHeight={LAYOUT_H} maxWidth={WINDOW_W} maxHeight={WINDOW_H}>
            <div className="mcp apu" style={{ height: LAYOUT_H }} data-name={`${name} / ChatGPT`}>
              <Header />
              <div className="aia-scroll mcp-scroll" data-name="Conversation">
                <div className="aia-thread mcp-thread">{children}</div>
              </div>
              <ComposerBar />
            </div>
          </ScaleToFit>
        </div>
      </div>
    </figure>
  );
}

const Reply = ({ children }: { children: React.ReactNode }) => (
  <div className="aia-turn aia-turn--assistant mcp-reply" data-name="Turn / Assistant">{children}</div>
);

const Price = ({ now, was }: { now: number; was?: number }) => (
  <span className="apu-price"><b>{$(now)}</b>{was && <s>{$(was)}</s>}</span>
);

export function V3PromoUpgrade() {
  const u = upgrade;
  return (
    <Compact name="12 — Promotions & Upselling: Upgrades that make sense">
      <User>{u.ask}</User>
      <Reply>
        <p className="apu-text">{u.reply}</p>
        <App name="trailwell" via>
          <div className="apu-compare" data-name="Upgrade">
            <div className="apu-opt">
              <ProductImage className="apu-thumb" src={u.from.image} alt="" />
              <span className="apu-opt__text"><b>{u.from.name}</b><small>{u.from.size} · {u.from.note}</small></span>
              <Price now={u.from.price} />
            </div>
            <div className="apu-opt apu-opt--pick">
              <ProductImage className="apu-thumb" src={u.to.image} alt="" />
              <span className="apu-opt__text"><b>{u.to.name}</b><small>{u.to.size} · {u.to.note}</small></span>
              <span className="apu-opt__end"><Price now={u.to.price} /><Badge tone="green">+{$(u.to.price - u.from.price)}</Badge></span>
            </div>
          </div>
          <ul className="apu-benefits">{u.benefits.map((b) => <li key={b}><Check />{b}</li>)}</ul>
        </App>
      </Reply>
    </Compact>
  );
}

export function V3PromoOffer() {
  const p = promo;
  return (
    <Compact name="13 — Promotions & Upselling: Offers shoppers would otherwise miss">
      <User>{p.ask}</User>
      <Reply>
        <p className="apu-text">{p.reply}</p>
        <App name="trailwell" via>
          <div className="apu-deal" data-name={`Promotion / ${p.bag.name}`}>
            <div className="apu-deal__media">
              <ProductImage src={p.bag.image} alt={p.bag.name} />
              <Badge tone="green">{p.offer}</Badge>
            </div>
            <div className="apu-deal__body">
              <span className="apu-opt__text"><b>{p.bag.name}</b><small>{p.bag.size} · {p.bag.color}</small></span>
              <Price now={p.price} was={p.was} />
            </div>
            <p className="apu-why">{p.why}</p>
            <p className="apu-terms">{p.conditions}</p>
          </div>
        </App>
      </Reply>
    </Compact>
  );
}

export function V3PromoLaunches() {
  const m = launches;
  return (
    <Compact name="14 — Promotions & Upselling: Launches and best sellers up front">
      <User>{m.ask}</User>
      <Reply>
        <p className="apu-text">{m.reply}</p>
        <App name="trailwell" via>
          <div className="apu-pair" data-name="Launch and best seller">
            {[m.launch, m.bestSeller].map(({ bag, tag }) => (
              <div className="apu-tile" key={bag.id} data-name={`Product / ${bag.name}`}>
                <div className="apu-tile__media">
                  <ProductImage src={bag.image} alt={bag.name} />
                  <Badge tone={tag === "New" ? "blue" : "neutral"}>{tag}</Badge>
                </div>
                <span className="apu-opt__text"><b>{bag.name}</b><small>{bag.size} · {bag.color}</small></span>
                <Price now={bag.price} />
              </div>
            ))}
          </div>
          <p className="apu-terms">{m.conditions}</p>
        </App>
      </Reply>
    </Compact>
  );
}
