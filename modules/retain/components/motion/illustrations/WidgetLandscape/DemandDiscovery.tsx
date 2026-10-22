import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { Media } from "../../components/ill/Media";
import { Shell } from "../../components/ill/Shell";
import { HelpdeskHeader } from "../../components/ill/HelpdeskHeader";
import { Thread } from "../../components/ill/Thread";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { Chip } from "../../components/ill/Chip";
import { Icon } from "../../components/ill/Icon";
import { Button } from "../../components/ill/Button";
import { LandscapeCanvas } from "./LandscapeCanvas";
import { demandDiscovery as s } from "./data";

// Landscape 01 — Discover demand from past conversations. Merchant-facing,
// so the shell carries Helpdesk/Header (the brand is the one talking) and
// the page behind is the merchant's own admin view of this week's
// arrivals, not a storefront. Key moment: "Crossword found the people
// who already asked for this." The audience card is the payoff: the three
// filter conditions restate the merchant's own request, one example pair
// shows a past ask mapped to a launch, and the outreach action lives on
// that same card. The merchant's "Yes!" is the last visible step — no
// sending/sent state, since nothing in the script depicts one.
export function MerchantAdminScene() {
  return (
    <div className="ill-marketplace">
      <BrowserChrome url={s.url} />
      <div className="ill-marketplace__nav">
        <span className="ill-marketplace__logo">{s.brand}</span>
        <div className="ill-marketplace__nav-links">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="ill-marketplace__body ill-landscape-admin">
        <div className="ill-landscape-admin__sidebar">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={i === 1 ? "ill-landscape-admin__nav-item--active" : undefined} />
          ))}
        </div>
        <div className="ill-landscape-admin__main">
          <p className="ill-landscape-admin__heading">New arrivals · This week</p>
          <div className="ill-landscape-admin__grid">
            {[...s.arrivals, ...s.arrivals].map((p, i) => (
              <div key={i} className="ill-landscape-admin__tile">
                <div className="ill-landscape-admin__tile-media">
                  <Media src={p.image} alt={p.title} />
                </div>
                <span className="ill-landscape-admin__tile-title">{p.title}</span>
                <span className="ill-landscape-admin__tile-price">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AudienceCard() {
  const { audience } = s;
  return (
    <section className="ill-landscape-card ill-audience-card">
      <header className="ill-audience-card__header">
        <span className="ill-audience-card__title">
          <span className="ill-audience-card__label">{audience.label}</span>
          <Chip size="sm">{audience.source}</Chip>
        </span>
        <Button appearance="primary" label={audience.action} />
      </header>
      <div className="ill-audience-card__body">
        <ul className="ill-audience-card__conditions">
          {audience.conditions.map((c) => (
            <li key={c}>
              <Icon name="checks" />
              {c}
            </li>
          ))}
        </ul>
        <div className="ill-audience-card__example">
          <Thumbnail src={audience.example.image} alt={audience.example.match} size={44} />
          <span className="ill-audience-card__example-text">
            <span className="ill-audience-card__example-request">{audience.example.request}</span>
            <span className="ill-audience-card__example-match">{audience.example.match}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function DemandDiscovery() {
  return (
    <LandscapeCanvas
      backdrop="green"
      scene={<MerchantAdminScene />}
      widget={
        <Shell
          brand={s.brand}
          header={<HelpdeskHeader brand={s.brand} />}
          width={600}
          height={370}
          className="ill-landscape-shell ill-landscape-shell--compact"
        >
          <Thread>
            <UserTurn>
              <ChatMessage role="user" text={s.brandRequest} />
            </UserTurn>
            <AssistantTurn>
              <ChatMessage role="assistant" text={s.reply} />
              <AudienceCard />
            </AssistantTurn>
            <UserTurn>
              <ChatMessage role="user" text={s.approval} />
            </UserTurn>
          </Thread>
        </Shell>
      }
    />
  );
}

// The same frame without the widget — just the page behind it.
export function DemandDiscoveryScene() {
  return <LandscapeCanvas backdrop="green" scene={<MerchantAdminScene />} />;
}
