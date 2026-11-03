import { Activity, Load, Merchant, State, Text, User } from "./PersonalAgentsPossibilities";
import { sendBack, somethingILike, storeCredit, cream, type Item } from "./loggedInData";

// Personal Agents → Logged-in Experiences. Same shells as Possibilities.
// Two kinds of consent, kept apart: the brand's account sign-in arrives
// inside the "[Brand] via Crossword" card (Crossword asks on the brand's
// behalf); spending or a return is the agent's own approval card, the
// "Approve $37.49 to SuperMush?" pattern from the Muse/Grok reference.

const $$ = (n: number) => `$${n.toFixed(2)}`;
const $ = (n: number) => (Number.isInteger(n) ? `$${n}` : $$(n));

const Check = ({ size = 12 }: { size?: number }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2.5 6.2l2.3 2.3 4.7-5" /></svg>
);
const Lock = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden><rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>
);

// Sign-in / permission, inside the brand's card. `done` swaps the actions
// for the granted state.
export function SignIn({ title, meta, allow, done, doneLabel = "Signed in and allowed" }: { title: string; meta: string; allow: string; done?: boolean; doneLabel?: string }) {
  return (
    <div className="pal-auth" data-name={`Authorization / ${done ? "Granted" : "Requested"}`}>
      <span className="pal-auth__head"><span className="pal-auth__lock"><Lock /></span><b>{title}</b></span>
      <small>{meta}</small>
      {done
        ? <span className="pal-done"><Check /> {doneLabel}</span>
        : <span className="pal-actions"><span className="pal-btn">{allow}</span><span className="pal-deny">Deny</span></span>}
    </div>
  );
}

// The agent's own approval card.
export function Approval({ title, meta, allow, item, done, doneLabel = "Approved" }: { title: string; meta: string; allow: string; item?: Item; done?: boolean; doneLabel?: string }) {
  return (
    <section className="pal-approve" data-name={`Approval / ${done ? "Approved" : "Awaiting shopper"}`}>
      <b>{title}</b>
      <small>{meta}</small>
      {item && <div className="pal-approve__item"><Line item={item} /></div>}
      <span className="pal-actions">
        {done ? <span className="pal-btn pal-btn--done">{doneLabel} <Check /></span> : <span className="pal-btn">{allow}</span>}
        <span className="pal-deny">Deny</span>
      </span>
    </section>
  );
}

export const Line = ({ item, right }: { item: Item; right?: React.ReactNode }) => (
  <div className="pal-line" data-name={`Line / ${item.name}`}>
    <img src={item.thumbnailImage ?? item.image} alt="" />
    <span className="pal-line__text"><b>{item.name}</b><small>{item.meta}</small></span>
    <span className="pal-line__price">{right ?? $(item.price)}</span>
  </div>
);

/* 04 — I need to send it back. ------------------------------------ */

const sorelle = { brand: "sorelle-labs", name: "Sorelle Labs" };

export function OrderCard({ picked, loading }: { picked?: string; loading?: boolean }) {
  return (
    <Load loading={loading} i={0}><div className="pal-box" data-name="Order">
      <p className="pal-box__meta">{sendBack.order.number} · {sendBack.order.status}</p>
      <Line item={cream} />
      <div className="pal-options" data-name="Return options">
        {sendBack.options.map((o) => (
          <div key={o.id} className={picked === o.id ? "pal-option pal-option--on" : "pal-option"}>
            <span className="pal-option__radio" />
            <span><b>{o.title}</b><small>{o.detail}</small></span>
          </div>
        ))}
      </div>
    </div></Load>
  );
}

export function ReturnStatus({ loading }: { loading?: boolean }) {
  return (
    <Load loading={loading} i={0}><div className="pal-box" data-name="Return status">
      <p className="pal-band"><Check size={14} /> {sendBack.started} · {sendBack.number}</p>
      <ol className="pal-steps">{sendBack.steps.map((s) => <li key={s}>{s}</li>)}</ol>
      <div className="pal-track" data-name="Status">
        {sendBack.track.map((s, i) => <span key={s} className={i === 0 ? "pal-track__step pal-track__step--on" : "pal-track__step"}><i />{s}</span>)}
      </div>
    </div></Load>
  );
}

export function PaSendBack() {
  const name = "04 I need to send it back.";
  const at = (label: string, children: React.ReactNode) => <State agent="muse" name={name} label={label}>{children}</State>;
  return (
    <section className="pap-section pap-logged" data-name={name}>
      {at("A · Sign-in requested", <>
        <User>{sendBack.ask}</User>
        <Merchant {...sorelle} reply="To find your order, sign in to your Sorelle Labs account."><SignIn {...sendBack.auth} /></Merchant>
      </>)}
      {at("B · Order and options", <>
        <Activity line="Signed in to Sorelle Labs" done />
        <Merchant {...sorelle} reply={sendBack.found}><OrderCard /></Merchant>
      </>)}
      {at("C · Shopper confirms", <>
        <User>{sendBack.confirm}</User>
        <Approval {...sendBack.approve} item={cream} />
      </>)}
      {at("D · Return started", <>
        <Approval {...sendBack.approve} done doneLabel="Confirmed" />
        <Merchant {...sorelle} reply="Here's how to send it back:"><ReturnStatus /></Merchant>
      </>)}
    </section>
  );
}

/* 05 — Find me a sweater with my store credit. -------------------- */

const marais = { brand: "marais", name: "Marais" };

export const Account = ({ rows }: { rows: { label: string; value: string }[] }) => (
  <div className="pal-account" data-name="Account">
    {rows.map((r) => <span key={r.label}><small>{r.label}</small><b>{r.value}</b></span>)}
  </div>
);

export function Sweaters({ loading }: { loading?: boolean }) {
  return (
    <div className="pal-picks" data-name="Sweaters">
      {storeCredit.picks.map(({ item, note, best }, i) => (
        <Load key={item.id} loading={loading} i={i}><article key={item.id} className={best ? "pal-pick pal-pick--best" : "pal-pick"} data-name={`Product / ${item.name}`}>
          <div className="pal-pick__media"><img src={item.image} alt={item.name} />{best && <span className="pal-badge">Best fit</span>}</div>
          <div className="pal-pick__body">
            <b>{item.name}</b>
            <small>{item.meta}</small>
            <span className="pal-pick__price">{$(item.price)}</span>
            <span className={best ? "pal-note pal-note--good" : "pal-note"}>{note}</span>
          </div>
        </article></Load>
      ))}
    </div>
  );
}

export function Checkout({ loading }: { loading?: boolean }) {
  const c = storeCredit.checkout;
  return (
    <Load loading={loading} i={0}><div className="pal-box" data-name="Checkout summary">
      <Line item={storeCredit.picks[0].item} />
      <dl className="pal-sum">
        <dt>Subtotal</dt><dd>{$$(c.subtotal)}</dd>
        <dt>Estimated tax</dt><dd>{$$(c.tax)}</dd>
        <dt>Shipping</dt><dd>{c.shipping}</dd>
        <dt className="pal-sum__credit">Store credit applied</dt><dd className="pal-sum__credit">−{$$(c.credit)}</dd>
        <dt className="pal-sum__total">Due today</dt><dd className="pal-sum__total">{$$(c.due)}</dd>
      </dl>
      <p className="pal-remaining"><span>Remaining store credit</span><b>{$$(c.remaining)}</b></p>
    </div></Load>
  );
}

export function PaStoreCredit() {
  const name = "05 Find me a sweater with my store credit.";
  const at = (label: string, children: React.ReactNode, status?: string) => <State agent="grok" name={name} label={label} status={status}>{children}</State>;
  return (
    <section className="pap-section pap-logged" data-name={name}>
      {at("A · Sign-in requested", <>
        <User>{storeCredit.ask}</User>
        <Merchant {...marais} reply="To use your store credit, sign in to your Marais account."><SignIn {...storeCredit.auth} /></Merchant>
      </>)}
      {at("B · Account-aware picks", <>
        <Activity line={storeCredit.worked} done />
        <Merchant {...marais} reply={storeCredit.reply}><Account rows={storeCredit.account} /><Sweaters /></Merchant>
      </>)}
      {at("C · Credit applied", <>
        <User>{storeCredit.choose}</User>
        <Merchant {...marais} reply="Here's your checkout with store credit applied:"><Checkout /></Merchant>
      </>)}
      {at("D · Awaiting approval", <>
        <Text runs={storeCredit.grok} />
        <Approval {...storeCredit.approve} item={storeCredit.picks[0].item} />
      </>)}
    </section>
  );
}

/* 06 — Something I like. ------------------------------------------ */

export function Profile({ loading }: { loading?: boolean }) {
  return (
    <Load loading={loading} i={0}><ul className="pal-profile" data-name="Personalization summary">
      {somethingILike.profile.map((p) => (
        <li key={p.label}>
          <small>{p.label}</small>
          <b>{p.value}</b>
          <span className={p.from === "Muse" ? "pal-src pal-src--agent" : "pal-src"}>{p.from === "Muse" ? "From Muse" : "Marais account"}</span>
        </li>
      ))}
    </ul></Load>
  );
}

export function Recommendations({ loading }: { loading?: boolean }) {
  const s = somethingILike.spotlight;
  return (
    <>
      <Load loading={loading} i={0}><article className="pal-spot" data-name={`Recommended / ${s.item.name}`}>
        <div className="pal-spot__media"><img src={s.item.image} alt={s.item.name} /></div>
        <div className="pal-spot__body">
          <b>{s.item.name}</b>
          <small>{s.item.meta}</small>
          <ul>{s.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <span className="pal-loyalty"><span>{s.loyalty.label}</span><b>{$$(s.loyalty.price)}</b><s>{$(s.loyalty.was)}</s></span>
        </div>
      </article></Load>
      <div className="pal-alts">
        {somethingILike.alternatives.map(({ item, note }, i) => <Load key={item.id} loading={loading} i={i + 1} radius={14}><Line item={{ ...item, meta: note }} /></Load>)}
      </div>
    </>
  );
}

export function PaSomethingILike() {
  const name = "06 Something I like.";
  const at = (label: string, children: React.ReactNode) => <State agent="muse" name={name} label={label}>{children}</State>;
  return (
    <section className="pap-section pap-logged" data-name={name}>
      {at("A · Permission requested", <>
        <User>{somethingILike.ask}</User>
        <Merchant {...marais} reply="To personalize this, Marais needs your permission to use your account.">
          <SignIn {...somethingILike.auth} doneLabel="Allowed" />
        </Merchant>
      </>)}
      {at("B · What Crossword knows", <>
        <User>{somethingILike.ask}</User>
        <Merchant {...marais} reply={somethingILike.reply}><Profile /></Merchant>
      </>)}
      {at("C · Personalized picks", <>
        <Merchant {...marais} reply={somethingILike.recs}><Recommendations /></Merchant>
      </>)}
    </section>
  );
}

