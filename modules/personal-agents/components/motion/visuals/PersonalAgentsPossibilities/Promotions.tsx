import { useEffect, useRef, useState } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { AgentHeader, Merchant, User, type Agent } from "./PersonalAgentsPossibilities";
import { $ } from "./data";
import { priorities, promo, upgrade } from "./promotionsData";

// Personal Agents → Promotions & Upselling, on the motion page. Compact
// 355x402 frame with a 292x338 agent window: the Possibilities shell and
// "Trailwell via Crossword" card at compact scale. Each frame is one
// resolved moment (the shopper's ask, then Trailwell's answer) with a
// minimal landing: it plays once, the first time the frame is on screen,
// and never loops or replays.

function useLandedOnce(ref: React.RefObject<HTMLElement | null>) {
  const landed = useLandedOnScreen(ref);
  const [played, setPlayed] = useState(false);
  useEffect(() => { if (landed) setPlayed(true); }, [landed]);
  return played;
}

function Compact({ agent, name, light, standard, children }: { agent: Agent; name: string; light?: boolean; standard?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const played = useLandedOnce(ref);
  return (
    <figure className="pap-figure" data-name={name} ref={ref}>
      <figcaption className="app-stage__tile-label">{name}</figcaption>
      <div className="pap-canvas pap-canvas--compact">
        <div className={`pap pap--${agent} pap--compact ppr-land${played ? " ppr-land--in" : ""}${light ? " pap--light" : ""}${standard ? " pap--r40" : ""}`}>
          <AgentHeader agent={agent} />
          <div className="pap-thread" data-name="Conversation">{children}</div>
        </div>
      </div>
    </figure>
  );
}

const Check = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2.5 6.2l2.3 2.3 4.7-5" /></svg>
);

export function PaUpgrade() {
  const u = upgrade;
  return (
    <Compact agent="muse" standard name="08 Your upgrade suggestion · Muse">
      <User>{u.ask}</User>
      <Merchant reply={u.reply}>
        <div className="ppr-compare" data-name="Upgrade">
          <div className="ppr-opt">
            <img src={u.from.image} alt="" />
            <span><b>{u.from.name}</b><small>{u.from.size} · {$(u.from.price)}</small></span>
          </div>
          <div className="ppr-opt ppr-opt--pick">
            <img src={u.to.image} alt="" />
            <span><b>{u.to.name}</b><small>{u.to.size} · {$(u.to.price)}</small></span>
            <span className="ppr-diff">+{$(u.to.price - u.from.price)}</span>
          </div>
        </div>
        <ul className="ppr-benefits">{u.benefits.map((b) => <li key={b}><Check />{b}</li>)}</ul>
      </Merchant>
    </Compact>
  );
}

export function PaPromotion() {
  const p = promo;
  return (
    <Compact agent="grok" light standard name="09 Your promotions · Grok Bot">
      <User>{p.ask}</User>
      <Merchant reply={p.reply}>
        <article className="ppr-deal" data-name={`Promotion / ${p.bag.name}`}>
          <div className="ppr-deal__media"><img src={p.bag.image} alt={p.bag.name} /><span className="ppr-badge">{p.offer}</span></div>
          <div className="ppr-deal__body">
            <span><b>{p.bag.name}</b><small>{p.bag.size} · {p.bag.color}</small></span>
            <span className="ppr-price"><b>{$(p.price)}</b><s>{$(p.was)}</s></span>
          </div>
          <p className="ppr-terms">{p.conditions}</p>
        </article>
      </Merchant>
    </Compact>
  );
}

export function PaPriorities() {
  const m = priorities;
  const b = m.launch.bag;
  return (
    <Compact agent="muse" standard name="10 Your merchandising priorities · Muse">
      <User>{m.ask}</User>
      <Merchant reply={m.reply}>
        <div className="ppr-pair" data-name="Launch and bundle">
          <article className="ppr-tile">
            <div className="ppr-tile__media"><img src={b.image} alt={b.name} /><span className="ppr-badge ppr-badge--dark">{m.launch.tag}</span></div>
            <b>{b.name} {b.size}</b>
            <span className="ppr-price"><b>{$(b.price)}</b></span>
          </article>
          <article className="ppr-tile">
            <div className="ppr-tile__media"><img src={m.bundle.image} alt="" /><span className="ppr-badge">Bundle</span></div>
            <b>{m.bundle.name}</b>
            <span className="ppr-price"><b>{$(m.bundle.price)}</b><s>{$(m.bundle.was)}</s></span>
          </article>
        </div>
        <p className="ppr-terms">{m.conditions}</p>
      </Merchant>
    </Compact>
  );
}
