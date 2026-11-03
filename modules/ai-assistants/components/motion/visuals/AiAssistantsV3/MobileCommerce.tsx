import { ProductImage } from "./ProductImage";
import { BrandMark, BrandWordmark } from "../../brands/BrandIdentity";
import { Text } from "../AiAssistants/AiAssistants";
import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { ScaleToFit } from "../../components/ill/ScaleToFit";
import { SLOT_H } from "../../illustrations/GiftJourneyMobile/GiftJourneyMobile";
import { Check } from "./AiAssistantsV3";
import { $, cart, club, exchange, loyaltyProduct, mobileCopy as copy, orders, shopper, type Run } from "./data";

// AI Assistants V3, 07–10 — ChatGPT for iOS at 390x844. ChatGPT's own
// shell (status bar, menu / title / new chat, grey user bubble, plain
// assistant text at 16px, the "+" and pill composer with the voice
// button) is kept apart from Aurelle's UI, which only ever appears as
// an app result: a "Aurelle" attribution line, then an inline card
// with at most two actions (Apps SDK inline display). Sign-in and
// checkout open Aurelle's own pages in a browser sheet over the chat,
// so no password or payment ever enters the conversation. Storybook
// anatomy, in ChatGPT's tokens: List View rows, choice block seats and
// swatches, radio plates, the Added To Cart Card's tinted head band.
// Account linking and merchant-sent updates are shown as concepts.

const { pendant, helmet } = orders;

/* ChatGPT shell ------------------------------------------------------ */

const Svg = ({ size = 22, sw = 1.8, children }: { size?: number; sw?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
const lock = <><rect x="5.5" y="10.5" width="13" height="10" rx="2.5" /><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" /></>;

function StatusBar() {
  return (
    <div className="mcp-status" data-name="Status bar">
      <span>9:41</span>
      <span className="mcp-status__icons">
        <svg width="18" height="11" viewBox="0 0 18 11" aria-hidden><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 008 .4 10.3 10.3 0 00.8 3.3L2 4.6a8.5 8.5 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 008 4a6.6 6.6 0 00-4.6 1.8l1.2 1.3A4.8 4.8 0 018 5.8zm0 3.6c.4 0 .8.2 1.1.4L8 11 6.9 9.8c.3-.2.7-.4 1.1-.4z" /></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden><rect x=".5" y=".5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="8" rx="2" /><path d="M24 4v4c.8-.3 1.3-1 1.3-2S24.8 4.3 24 4z" opacity=".4" /></svg>
      </span>
    </div>
  );
}

export function Header() {
  return (
    <header className="mcp-header" data-name="Header">
      <span className="mcp-icon"><Svg><path d="M4 8h16M4 16h11" /></Svg></span>
      <span className="mcp-title">ChatGPT<Svg size={16} sw={2}><path d="M9 6l6 6-6 6" /></Svg></span>
      <span className="mcp-icon"><Svg><path d="M12 4.5H7a2.5 2.5 0 00-2.5 2.5v10A2.5 2.5 0 007 19.5h10a2.5 2.5 0 002.5-2.5v-5" /><path d="M17.5 4.5l2 2-7 7H10.5v-2z" /></Svg></span>
    </header>
  );
}

// `value` is text being typed (motion); `send` swaps the voice button for
// the send arrow while there's text, and the stop square while ChatGPT works.
export function ComposerBar({ value, send = "voice" }: { value?: React.ReactNode; send?: "voice" | "send" | "stop" }) {
  return (
    <div className="mcp-composer" data-name="Composer">
      <div className="mcp-composer__row">
        <span className="mcp-plus"><Svg size={20}><path d="M12 5v14M5 12h14" /></Svg></span>
        <span className="mcp-field">
          {value ? <span className="mcp-field__value">{value}</span> : <span className="mcp-field__ph">Ask anything</span>}
          {send === "voice" && <Svg size={20}><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5" /></Svg>}
          <span className="mcp-voice" key={send}>
            {send === "voice" && <Svg size={18} sw={2}><path d="M7 10.5v3M10.33 7.5v9M13.67 9v6M17 10.5v3" /></Svg>}
            {send === "send" && <Svg size={18} sw={2.2}><path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" /></Svg>}
            {send === "stop" && <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><rect width="12" height="12" rx="2.5" fill="currentColor" /></svg>}
          </span>
        </span>
      </div>
      <span className="mcp-home" />
    </div>
  );
}

// Aurelle's own page in ChatGPT's in-app browser sheet.
export function BrowserSheet({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className ? `mcp-sheet-layer ${className}` : "mcp-sheet-layer"} data-name="Browser sheet">
      <div className="mcp-sheet">
        <div className="mcp-sheet__bar">
          <span className="mcp-sheet__done">Done</span>
          <span className="mcp-sheet__url"><Svg size={12} sw={2.2}>{lock}</Svg>{url}</span>
          <span className="mcp-sheet__more"><Svg size={18}><path d="M12 14V4M8 7.5L12 3.5l4 4" /><path d="M5 12.5V18a2 2 0 002 2h10a2 2 0 002-2v-5.5" /></Svg></span>
        </div>
        <div className="mcp-sheet__page">{children}</div>
      </div>
    </div>
  );
}

// The aubergine frame of 28–33 (ConversionAssistanceFrame, 687x586) with
// the phone, laid out at 390x844, sized as 17 sits in its frame: 520 of
// 680 tall, so 448 of 586 here, keeping 17's spacing around the phone.
const PHONE_W = 390;
const PHONE_H = 844;
const SLOT = Math.round((586 * SLOT_H) / 680);

export function Framed({ children }: { children: React.ReactNode }) {
  return (
    <ConversionAssistanceFrame>
      <ScaleToFit contentWidth={PHONE_W} contentHeight={PHONE_H} maxWidth={(PHONE_W * SLOT) / PHONE_H} maxHeight={SLOT}>
        {children}
      </ScaleToFit>
    </ConversionAssistanceFrame>
  );
}

export function Screen({ name, sheet, composer, className, scrollRef, children }: {
  name: string; sheet?: React.ReactNode; composer?: React.ReactNode; className?: string; scrollRef?: React.Ref<HTMLDivElement>; children: React.ReactNode;
}) {
  return (
    <div className={["mcp", sheet && "mcp--sheet", className].filter(Boolean).join(" ")} data-name={name}>
      <StatusBar />
      <Header />
      <div className="aia-scroll mcp-scroll" data-name="Conversation" ref={scrollRef}>
        <div className="aia-thread mcp-thread">{children}</div>
      </div>
      {composer ?? <ComposerBar />}
      {sheet}
    </div>
  );
}

function Phone({ name, label, sheet, children }: { name: string; label: string; sheet?: React.ReactNode; children: React.ReactNode }) {
  return (
    <figure className="aiv3-figure">
      <figcaption className="app-stage__tile-label">{name} — {label}</figcaption>
      <Framed><Screen name={`${name} / ${label}`} sheet={sheet}>{children}</Screen></Framed>
    </figure>
  );
}

export const User = ({ children, attach }: { children: React.ReactNode; attach?: React.ReactNode }) => (
  <div className="aia-turn aia-turn--user mcp-user" data-name="Turn / User">{attach}<p className="mcp-bubble">{children}</p></div>
);
const Reply = ({ runs, children }: { runs?: Run[]; children?: React.ReactNode }) => (
  <div className="aia-turn aia-turn--assistant mcp-reply" data-name="Turn / Assistant">{runs && <Text runs={runs} />}{children}</div>
);

/* Aurelle's UI, as an app result ----------------------------------- */

export const Mark = ({ size = 18, brand = "aurelle" }: { size?: number; brand?: string }) => (
  <span className="mcp-mark" style={{ width: size, height: size }}><BrandMark brand={brand} /></span>
);

// `via` names Crossword as the source ("Trailwell via Crossword").
export function App({ children, name = "aurelle", via }: { children: React.ReactNode; name?: string; via?: boolean }) {
  return (
    <div className="mcp-app" data-name={`App / ${name}`}>
      <p className="mcp-app__label"><BrandWordmark brand={name} />{via && <span className="mcp-app__via">via Crossword</span>}</p>
      <div className="mcp-card">{children}</div>
    </div>
  );
}

// `pressed` (motion) shows the tap that moves the conversation on.
const Btn = ({ children, kind = "primary", full, pressed }: { children: React.ReactNode; kind?: "primary" | "secondary"; full?: boolean; pressed?: boolean }) => (
  <span className={`mcp-btn mcp-btn--${kind}${full ? " mcp-btn--full" : ""}${pressed ? " is-pressed" : ""}`}>{children}</span>
);
const Actions = ({ children }: { children: React.ReactNode }) => <div className="mcp-actions">{children}</div>;

// List View row: thumb on the media plate, title, muted meta, trailing value.
function Line({ image, title, meta, end, size = 48 }: { image: string; title: React.ReactNode; meta?: React.ReactNode; end?: React.ReactNode; size?: number }) {
  return (
    <div className="mcp-line">
      <ProductImage className="mcp-line__thumb" src={image} alt="" style={{ width: size, height: size }} />
      <span className="mcp-line__text"><b>{title}</b>{meta && <small>{meta}</small>}</span>
      {end && <span className="mcp-line__end">{end}</span>}
    </div>
  );
}

export const Badge = ({ tone = "neutral", children }: { tone?: "neutral" | "green" | "blue"; children: React.ReactNode }) => (
  <span className={`mcp-badge mcp-badge--${tone}`}>{children}</span>
);
const Ok = ({ children }: { children: React.ReactNode }) => (
  <p className="mcp-ok"><span className="mcp-ok__dot"><Check /></span>{children}</p>
);
const Rows = ({ rows }: { rows: [React.ReactNode, React.ReactNode, string?][] }) => (
  <dl className="mcp-rows">
    {rows.map(([k, v, tone], i) => <div key={i} className={tone ? `mcp-rows__row mcp-rows__row--${tone}` : "mcp-rows__row"}><dt>{k}</dt><dd>{v}</dd></div>)}
  </dl>
);

// ChatGPT's own small system line in the thread (not Aurelle's).
export const Connected = () => (
  <p className="mcp-system" data-name="Connected"><Mark size={16} />Connected to Aurelle as {shopper.email}</p>
);

/* 07 — Where's my order? -------------------------------------------- */

export function ConnectCard({ pressed }: { pressed?: boolean }) {
  return (
    <App>
      <div className="mcp-connect">
        <Mark size={36} />
        <div>
          <p className="mcp-card__title">Connect Aurelle</p>
          <p className="mcp-card__meta">Lets ChatGPT see your orders, returns and Aurelle Circle benefits. You'll sign in on aurelle.com.</p>
        </div>
      </div>
      <Actions><Btn kind="secondary">Not now</Btn><Btn pressed={pressed}>Connect</Btn></Actions>
    </App>
  );
}

export function OrderCard() {
  return (
    <App>
      <div className="mcp-card__head"><span>Order #{pendant.id}</span><Badge tone="blue">In transit</Badge></div>
      <Line image={pendant.image} title={`${pendant.item} · ${pendant.variant}`} meta={`${pendant.extra} · ${$(pendant.price)}`} />
      <p className="mcp-eta"><small>Estimated delivery</small><b>{pendant.eta}</b></p>
      <ol className="mcp-steps" data-name="Tracking progress">
        {pendant.steps.map((s, i) => (
          <li key={s.label} className={i < pendant.at ? "is-done" : i === pendant.at ? "is-now" : ""}>
            <i />{s.label}<small>{s.when}</small>
          </li>
        ))}
      </ol>
      <p className="mcp-card__meta">{pendant.carrier} · Last scan: Louisville, KY, 6:12 AM</p>
      <Actions><Btn kind="secondary">Get help</Btn><Btn>Track package</Btn></Actions>
    </App>
  );
}

// Aurelle's own permission page, in the browser sheet.
export function AuthPage({ pressed }: { pressed?: boolean }) {
  return (
  <div className="mcp-auth">
    <Mark size={44} />
    <p className="mcp-auth__title">Connect to ChatGPT</p>
    <p className="mcp-auth__sub">Signed in as <b>{shopper.email}</b></p>
    <div className="mcp-auth__perms">
      <p>ChatGPT will be able to:</p>
      <ul>
        <li>View your orders and tracking</li>
        <li>Start returns and exchanges</li>
        <li>See your Aurelle Circle status and benefits</li>
      </ul>
      <p className="mcp-auth__fine">ChatGPT can't see your password or saved payment methods. You can disconnect any time in Aurelle settings.</p>
    </div>
    <Btn full pressed={pressed}>Allow</Btn>
    <Btn kind="secondary" full>Cancel</Btn>
  </div>
  );
}

export function V3OrderStatus() {
  const name = "07 Where's my order?";
  const ask = <User>{copy.orders.ask}</User>;
  const request = <Reply runs={copy.orders.connect}><ConnectCard /></Reply>;
  return (
    <section className="aiv3-section mcp-section" data-name={name}>
      <Phone name={name} label="1 · Request">{ask}{request}</Phone>
      <Phone
        name={name}
        label="2 · Authentication"
        sheet={
          <BrowserSheet url="accounts.aurelle.com">
            <AuthPage />
          </BrowserSheet>
        }
      >
        {ask}{request}
      </Phone>
      <Phone name={name} label="3 · Order status">
        {ask}
        <Connected />
        <Reply runs={copy.orders.status}><OrderCard /></Reply>
      </Phone>
    </section>
  );
}

/* 08 — I need an exchange or refund. -------------------------------- */

export const helmetLine = <Line image={helmet.image} title={`${helmet.item} · ${helmet.variant}`} meta={`Order #${helmet.id} · Delivered ${helmet.delivered}`} end={$(helmet.price)} />;

export function Plates({ picked }: { picked?: "exchange" | "refund" }) {
  const plate = (id: "exchange" | "refund", title: string, meta: string) => (
    <div className={picked === id ? "mcp-plate is-picked" : picked ? "mcp-plate is-off" : "mcp-plate"}>
      <span className="mcp-plate__radio" />
      <span><b>{title}</b><small>{meta}</small></span>
    </div>
  );
  return (
    <div className="mcp-plates">
      {plate("exchange", "Exchange", "Another size · free")}
      {plate("refund", "Refund", `${$(helmet.price)} to ${shopper.card} · 5–7 days after we receive it`)}
    </div>
  );
}

function SizeRow() {
  return <div className="cv2-choice__row mcp-swatches" aria-label="Helmet size">
    {["S", "M", "L"].map((size) => <span key={size} className={size === "L" ? "cv2-seat cv2-seat--picked" : "cv2-seat"}>{size}</span>)}
  </div>;
}

export function FoundCard() {
  return <App name="crestline">{helmetLine}</App>;
}

export function EligibilityCard({ picked }: { picked?: "exchange" | "refund" }) {
  return (
    <App name="crestline">
      {helmetLine}
      <Ok>Eligible for exchange or refund until {helmet.returnBy}</Ok>
      <Plates picked={picked} />
    </App>
  );
}

export function ExchangeCard({ pressed }: { pressed?: boolean }) {
  return (
    <App name="crestline">
      <p className="mcp-card__title">Exchange</p>
      <SizeRow />
      <Rows rows={[
        ["Send back", `Enduro MTB Helmet · Graphite · M`],
        ["You'll get", `Enduro MTB Helmet · Graphite · L`],
        ["Price difference", "$0.00"],
      ]} />
      <p className="mcp-note">Needs: the original back, unused, within 14 days with the prepaid UPS label. The Large ships once it's scanned.</p>
      <Actions><Btn kind="secondary">Change</Btn><Btn pressed={pressed}>Confirm exchange</Btn></Actions>
    </App>
  );
}

export function ApprovedCard() {
  return (
    <App name="crestline">
      <p className="mcp-band"><span className="mcp-ok__dot"><Check /></span>Exchange approved · #{exchange.id}</p>
      <Line size={40} image={helmet.image} title="Return: Enduro MTB Helmet · Graphite · M" meta={`Drop off at any UPS store by ${exchange.dropBy}`} />
      <Line size={40} image={exchange.image} title="Replacement: Enduro MTB Helmet · Graphite · L" meta="Ships when the return is scanned" end="$0.00" />
      <p className="mcp-note">Order #{helmet.id} · Confirmation sent to {shopper.email}</p>
      <Actions><Btn kind="secondary">Get help</Btn><Btn>Return label</Btn></Actions>
    </App>
  );
}

export function V3Exchange() {
  const name = "08 I need an exchange or refund.";
  const ask = <User>{copy.exchange.ask}</User>;
  const found = <Reply runs={copy.exchange.found}><FoundCard /></Reply>;
  const eligibility = () => <Reply runs={copy.exchange.eligible}><EligibilityCard /></Reply>;
  return (
    <section className="aiv3-section mcp-section" data-name={name}>
      <Phone name={name} label="1 · Request">{ask}{found}</Phone>
      <Phone name={name} label="2 · Eligibility">{ask}{eligibility()}</Phone>
      <Phone name={name} label="3 · Selection">
        <User>{copy.exchange.choose}</User>
        <Reply runs={copy.exchange.summary}>
          <ExchangeCard />
        </Reply>
      </Phone>
      <Phone name={name} label="4 · Resolution">
        <User>{copy.exchange.confirm}</User>
        <Reply runs={copy.exchange.done}>
          <ApprovedCard />
        </Reply>
      </Phone>
    </section>
  );
}

/* 09 — Does my loyalty benefit apply? ------------------------------- */

export const viewing = (
  <div className="mcp-ref" data-name="Viewing / Aurelle Teardrop Pendant">
    <ProductImage src={loyaltyProduct.image} alt="" />
    <span><b>{loyaltyProduct.name}</b><small>{loyaltyProduct.note} · {$(loyaltyProduct.price)}</small></span>
  </div>
);

export function ClubCard() {
  return (
    <App>
      <div className="mcp-club">
        <span className="mcp-club__tier">{club.tier}</span>
        <span><b>{club.name}</b><small>{shopper.name} · member since {club.since}</small></span>
      </div>
      <Rows rows={[
        ["Membership", "Active", "green"],
        ["Purchases", club.orders],
        ["Benefit", club.benefit],
        ["Teardrop Pendant · $129", "Qualifies", "green"],
      ]} />
    </App>
  );
}

export const checkingLine = "Checking membership with Aurelle";

export function BenefitCard() {
  return (
    <App>
      <div className="mcp-hero">
        <div className="mcp-hero__media"><ProductImage src={loyaltyProduct.image} alt="" /><Badge tone="green">Aurelle Circle</Badge></div>
        <p className="mcp-card__title">{loyaltyProduct.name}<small>{loyaltyProduct.note} · In stock</small></p>
        <p className="mcp-price">
          <b>{$(loyaltyProduct.price - club.off)}</b><s>{$(loyaltyProduct.price)}</s><span>You save {$(club.off)}</span>
        </p>
      </div>
      <Actions><Btn kind="secondary">Details</Btn><Btn>Add to cart · {$(loyaltyProduct.price - club.off)}</Btn></Actions>
    </App>
  );
}

export function V3Loyalty() {
  const name = "09 Does my loyalty benefit apply?";
  const ask = <User attach={viewing}>{copy.loyalty.ask}</User>;
  return (
    <section className="aiv3-section mcp-section" data-name={name}>
      <Phone name={name} label="1 · Request">
        {ask}
        <Reply runs={copy.loyalty.checking}><p className="aia-status mcp-checking">{checkingLine}</p></Reply>
      </Phone>
      <Phone name={name} label="2 · Verification">
        {ask}
        <Connected />
        <Reply runs={copy.loyalty.verified}><ClubCard /></Reply>
      </Phone>
      <Phone name={name} label="3 · Benefit applied">
        {ask}
        <Reply runs={copy.loyalty.applied}>
          <BenefitCard />
        </Reply>
      </Phone>
    </section>
  );
}

/* 10 — Help me buy these. ------------------------------------------- */

export function Duo() {
  return (
    <App name="brewhaus">
      <div className="mcp-duo">
        <div><div className="mcp-duo__media"><ProductImage src={cart.machine.image} alt="" /></div><b>{cart.machine.name}</b><small>{cart.machine.variant} · {$(cart.machine.price)}</small></div>
        <div><div className="mcp-duo__media"><ProductImage src={cart.kit.image} alt="" /></div><b>{cart.kit.name}</b><small>{$(cart.kit.price)} · Three-piece kit</small></div>
      </div>
    </App>
  );
}

function CartLines() {
  return (
    <>
      <Line image={cart.machine.image} title={cart.machine.name} meta={`${cart.machine.variant} · Qty 1`} end={$(cart.machine.price)} />
      <Line image={cart.kit.image} title={cart.kit.name} meta={`${cart.kit.variant} · Qty 1`} end={$(cart.kit.price)} />
    </>
  );
}

export function CartCard() {
  return (
    <App name="brewhaus">
      <p className="mcp-card__head"><span>Your BREWHAUS cart</span><Badge>2 items</Badge></p>
      <CartLines />
      <Rows rows={[["Subtotal", $(cart.machine.price + cart.kit.price), "total"]]} />
    </App>
  );
}

export function SummaryCard() {
  return (
    <App name="brewhaus">
      <CartLines />
      <Ok>Both in stock · ships tomorrow</Ok>
      <Rows rows={[
        ["Machine", $(cart.machine.price)],
        ["Three-piece brewing kit", $(cart.kit.price)],
        ["Shipping", "Free"],
        ["Total", $(cart.total), "total"],
      ]} />
      <p className="mcp-note">Tax is calculated at checkout.</p>
    </App>
  );
}

export function HandoffCard({ pressed }: { pressed?: boolean }) {
  return (
    <App name="brewhaus">
      <p className="mcp-card__head"><span>2 items · Total {$(cart.total)}</span><Badge tone="green">Ready to buy</Badge></p>
      <Btn full pressed={pressed}>Continue to checkout</Btn>
      <p className="mcp-note mcp-note--center"><Svg size={12} sw={2.2}>{lock}</Svg>Opens checkout.brewhaus.com</p>
    </App>
  );
}

// BREWHAUS's hosted checkout, opened from "Continue to checkout" (motion):
// the cart and address carried over, payment still to choose.
export function CheckoutPage() {
  return (
    <div className="mcp-co">
      <p className="mcp-co__brand"><Mark size={24} brand="brewhaus" />BREWHAUS checkout</p>
      <div className="mcp-co__block">
        <CartLines />
        <Rows rows={[["Total", $(cart.total), "total"]]} />
      </div>
      <div className="mcp-co__block">
        <p className="mcp-co__h">Ship to</p>
        <p className="mcp-co__v">{shopper.name} · 214 Alder St, Portland, OR</p>
      </div>
      <div className="mcp-co__block">
        <p className="mcp-co__h">Payment</p>
        <p className="mcp-co__empty">Choose a payment method</p>
      </div>
    </div>
  );
}

export function V3Checkout() {
  const name = "10 Help me buy these.";
  const ask = <User>{copy.checkout.ask}</User>;
  return (
    <section className="aiv3-section mcp-section" data-name={name}>
      <Phone name={name} label="1 · Request">
        {ask}
        <Reply runs={copy.checkout.found}><Duo /></Reply>
      </Phone>
      <Phone name={name} label="2 · Cart preparation">
        {ask}
        <Reply runs={copy.checkout.cart}>
          <CartCard />
        </Reply>
      </Phone>
      <Phone name={name} label="3 · Verification">
        <User>{copy.checkout.check}</User>
        <Reply runs={copy.checkout.verified}><SummaryCard /></Reply>
      </Phone>
      <Phone name={name} label="4 · Checkout">
        <User>{copy.checkout.go}</User>
        <Reply runs={copy.checkout.handoff}>
          <HandoffCard />
        </Reply>
      </Phone>
    </section>
  );
}
