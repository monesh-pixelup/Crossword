import { Chip } from "../../components/ill/Chip";
import { ProductReference } from "../../components/ill/ProductReference";
import crosswordMark from "../../assets/ill-icons/crossword-logo.svg";
import { agent, brand, calls, offer, picks, type Run, type State } from "./data";

// Sell: Personal Agents — 738x680 crimson canvas, 550x520 window (the Ad
// Journey / AI Search footprint). Not a chat: a neutral personal-agent
// console logging its own activity on one rail. The agent's lines sit on
// the rail as plain text next to a stone node; each time it consults
// Crossword, a tool-call block opens (Crossword mark, merchant, what was
// checked) and Crossword's answer returns inside it. Agent = page fill,
// Crossword = the only containers in the frame.
//
// Static states for the motion pass (`state` prop, default 5):
//   01  Request received          agent's request on the rail
//   02  Consulting Crossword      products call opens, header only
//   03  Recommendations received  reply + both sweaters land in the call
//   04  Checking offers           follow-up on the rail; offers call
//                                 returns the Winter Knit Edit
//   05  Task completed            agent's closing line, done node

function AgentNode({ done = false }: { done?: boolean }) {
  return (
    <span className="pa-node pa-node--agent" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2">
        {done ? (
          <path d="M3 6.2l2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="6" cy="6" r="4.25" />
            <circle cx="6" cy="6" r="1.6" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </span>
  );
}

function CrosswordNode() {
  return (
    <span className="pa-node pa-node--crossword" aria-hidden="true">
      <img src={crosswordMark.src} alt="" />
    </span>
  );
}

export function Reply({ runs }: { runs: readonly Run[] }) {
  return <p className="pa-call__reply">{runs.map((r, i) => (typeof r === "string" ? r : <strong key={i}>{r.b}</strong>))}</p>;
}

export function AgentStep({ text, done = false }: { text: React.ReactNode; done?: boolean }) {
  return (
    <li className="pa-step pa-step--agent">
      <AgentNode done={done} />
      <p className="pa-step__text">{text}</p>
    </li>
  );
}

// `pending` (motion only) fills the call while Crossword is still
// answering — e.g. its thinking row. Unset, the call shows header only.
export function CallStep({
  topic,
  returned,
  pending,
  children,
}: {
  topic: string;
  returned: boolean;
  pending?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="pa-step pa-step--call">
      <CrosswordNode />
      <section className="pa-call" data-name={`Tool call / Crossword / ${topic}`}>
        <header className="pa-call__header">
          <span className="pa-call__tool">
            Crossword
            <span className="pa-call__merchant">{brand}</span>
          </span>
          <Chip size="sm">{topic}</Chip>
        </header>
        {returned ? children : pending}
      </section>
    </li>
  );
}

export function ConsoleHeader() {
  return (
    <header className="pa-header">
      <span className="pa-header__title">
        <AgentNode />
        {agent.label}
      </span>
      <span className="pa-status">
        <span className="pa-status__dot" aria-hidden="true" />
        {agent.status}
      </span>
    </header>
  );
}

export function PickList() {
  return (
    <div className="pa-picks">
      {picks.map((p) => (
        <div className="pa-pick" key={p.id}>
          <ProductReference image={p.image} alt={p.name} title={p.name} price={p.price} size={44} />
        </div>
      ))}
    </div>
  );
}

export function OfferCard() {
  return (
    <div className="pa-offer">
      <span className="pa-offer__icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
          <path d="M8.6 1.75H14.25V7.4L7.4 14.25L1.75 8.6Z" />
          <circle cx="11.1" cy="4.9" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="pa-offer__text">
        <span className="pa-offer__title">{offer.title}</span>
        <span className="pa-offer__detail">{offer.detail}</span>
      </span>
      <span className="pa-offer__terms">{offer.terms}</span>
    </div>
  );
}

export function PersonalAgents({ state = 5 }: { state?: State }) {
  const { products, offers } = calls;
  return (
    <figure className="pa">
      <article className="pa-window">
        <ConsoleHeader />

        <ol className="pa-rail">
          <AgentStep text={agent.ask} />

          {state >= products.state && (
            <CallStep topic={products.topic} returned={state >= products.returned}>
              <Reply runs={products.reply} />
              <PickList />
            </CallStep>
          )}

          {state >= offers.state && <AgentStep text={agent.followUp} />}

          {state >= offers.state && (
            <CallStep topic={offers.topic} returned={state >= offers.returned}>
              <Reply runs={offers.reply} />
              <OfferCard />
            </CallStep>
          )}

          {state >= 5 && <AgentStep text={agent.close} done />}
        </ol>
      </article>
    </figure>
  );
}
