import { useEffect, useRef } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { RichStagger } from "../../illustrations/SellMotion/RichStagger";
import { Activity, AgentHeader, Enriched, Merchant, NewArrivals, OfferCards, Pick, User, Working, type Agent } from "./PersonalAgentsPossibilities";
import { brand, offers, shoes, whatsNew, whyThis, type Run } from "./data";
import { Account, Approval, Checkout, OrderCard, Profile, Recommendations, ReturnStatus, SignIn, Sweaters } from "./LoggedIn";
import { cream, sendBack, somethingILike, storeCredit } from "./loggedInData";

// Personal Agents → Possibilities, in motion. Each visual plays its static
// states (A → B → C) as one beat timeline: the shopper's message lands,
// the agent goes to work, the brand's card arrives via Crossword and its
// results resolve out of skeletons, then the agent answers in its own
// words as the thread scrolls up. Muse shows its typing dots; Grok Bot
// shows work on its avatar ("Working", "Thinking") and logs the step, per
// xAI's Grok Bot design notes. Starts when landed on, restarts on return.

const md = (runs: Run[]) => runs.map((r) => (typeof r === "string" ? r : `**${r.b}**`)).join("");

const museFlow = (reply: string, answer: string): Beat[] => [
  { id: "lead", type: "pause", ms: 500 },
  { id: "ask", type: "appear", ms: 500 },
  { id: "work", type: "pause", ms: 1700 },
  { id: "card", type: "text", text: reply },
  { id: "results", type: "load", ms: 950 },
  { id: "read", type: "pause", ms: 1300 },
  { id: "answer", type: "text", text: answer },
  { id: "end", type: "pause", ms: 3000 },
];

const WHATS_NEW = museFlow(whatsNew.reply, md(whatsNew.muse));
const OFFERS = museFlow(offers.reply, md(offers.muse));
const WHY: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "ask", type: "appear", ms: 500 },
  { id: "work", type: "pause", ms: 1900 },
  { id: "card", type: "text", text: whyThis.reply },
  { id: "results", type: "load", ms: 950 },
  { id: "read", type: "pause", ms: 1500 },
  { id: "think", type: "pause", ms: 900 },
  { id: "answer", type: "text", text: md(whyThis.grok) },
  { id: "pick", type: "appear", ms: 500 },
  { id: "end", type: "pause", ms: 3000 },
];

function Scene({ agent, name, beats, logged, children }: { agent: Agent; name: string; beats: Beat[]; logged?: boolean; children: (t: Timeline) => React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(stageRef);
  const t = useChatTimeline(beats, active);

  // Follow the latest turn, as the agent's own thread does.
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    if (t.index === 0) { el.scrollTop = 0; return; }
    const to = el.scrollHeight - el.clientHeight;
    if (to > el.scrollTop + 1) return animateScrollTo(el, to);
  }, [t.index, t.runKey]);

  const busy = beats.filter((b) => b.id.startsWith("work")).some((b) => t.loading(b.id));
  const thinking = beats.some((b) => b.id === "think") && t.loading("think");
  const status = agent === "grok" ? (busy ? "Working" : thinking ? "Thinking" : undefined) : undefined;
  // Grok Bot's avatar states, per xAI's design notes: calm at rest,
  // acknowledges the task as it lands, kicks into gear while working,
  // thinks, then settles once the work is done.
  const workedOnce = beats.some((b) => b.id.startsWith("work") && t.passed(b.id));
  const mark = busy ? "working" : thinking ? "thinking" : t.loading("ask") ? "ack" : workedOnce ? "done" : "idle";
  return (
    <figure className={logged ? "pap-figure pap-logged" : "pap-figure"} ref={stageRef}>
      <figcaption className="app-stage__tile-label">{name}</figcaption>
      <div className="pap-canvas">
        <div className={`pap pap--${agent} pap-motion`} data-name={name}>
          <AgentHeader agent={agent} status={status} state={agent === "grok" ? mark : undefined} />
          <div className="pap-thread" ref={threadRef} data-name="Conversation" key={t.runKey}>
            {children(t)}
          </div>
        </div>
      </div>
    </figure>
  );
}

const Enter = ({ children }: { children: React.ReactNode }) => <div className="ill-assistant-turn--enter">{children}</div>;
const Answer = ({ runs }: { runs: Run[] }) => <p className="pap-text"><RichStagger text={md(runs)} /></p>;

function MuseTurns({ t, ask, line, reply, results, answer }: {
  t: Timeline; ask: string; line: string; reply: string; results: (loading: boolean) => React.ReactNode; answer: Run[];
}) {
  return (
    <>
      {t.reached("ask") && <User className="ill-user-turn--enter">{ask}</User>}
      {t.loading("work") && <Enter><Working line={line} /></Enter>}
      {t.reached("card") && (
        <Enter>
          <Merchant brand={brand.id} name={brand.name} reply={<RichStagger text={reply} />}>{t.reached("results") && results(t.loading("results"))}</Merchant>
        </Enter>
      )}
      {t.reached("answer") && <Answer runs={answer} />}
    </>
  );
}

export function PaWhatsNewMotion() {
  return (
    <Scene agent="muse" name="01 What's new? · Muse" beats={WHATS_NEW}>
      {(t) => (
        <MuseTurns t={t} ask={whatsNew.ask} line="Asking Stride via Crossword" reply={whatsNew.reply}
          results={(loading) => <NewArrivals loading={loading} />} answer={whatsNew.muse} />
      )}
    </Scene>
  );
}

export function PaWhyThisMotion() {
  return (
    <Scene agent="grok" name="02 Why this one? · Grok Bot" beats={WHY}>
      {(t) => (
        <>
          {t.reached("ask") && <User className="ill-user-turn--enter" refBag={shoes.court}>{whyThis.ask}</User>}
          {t.reached("work") && (
            <Enter><Activity line={t.loading("work") ? whyThis.working : whyThis.worked} done={t.passed("work")} /></Enter>
          )}
          {t.reached("card") && (
            <Enter>
              <Merchant brand={brand.id} name={brand.name} reply={<RichStagger text={whyThis.reply} />}>{t.reached("results") && <Enriched loading={t.loading("results")} />}</Merchant>
            </Enter>
          )}
          {t.reached("answer") && <Answer runs={whyThis.grok} />}
          {t.reached("pick") && <Enter><Pick /></Enter>}
        </>
      )}
    </Scene>
  );
}

export function PaOfferMotion() {
  return (
    <Scene agent="muse" name="03 Is there an offer? · Muse" beats={OFFERS}>
      {(t) => (
        <MuseTurns t={t} ask={offers.ask} line="Checking Stride offers via Crossword" reply={offers.reply}
          results={(loading) => <OfferCards loading={loading} />} answer={offers.muse} />
      )}
    </Scene>
  );
}

/* Logged-in Experiences (04–06). Same scene; the extra beats are the
   consent moments: a sign-in request that waits, then flips to granted;
   an approval card that waits for the shopper. Each "work*" beat shows
   the agent busy (Muse's dots, Grok's avatar and activity line). */

const SEND_BACK: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "ask", type: "appear", ms: 500 },
  { id: "work", type: "pause", ms: 1300 },
  { id: "auth", type: "text", text: "To find your order, sign in to your Sorelle Labs account." },
  { id: "authWait", type: "pause", ms: 1500 },
  { id: "signed", type: "appear", ms: 700 },
  { id: "work2", type: "pause", ms: 1500 },
  { id: "found", type: "text", text: sendBack.found },
  { id: "order", type: "load", ms: 900 },
  { id: "read", type: "pause", ms: 1500 },
  { id: "confirm", type: "appear", ms: 600 },
  { id: "picked", type: "appear", ms: 500 },
  { id: "approve", type: "appear", ms: 500 },
  { id: "approveWait", type: "pause", ms: 1500 },
  { id: "approved", type: "appear", ms: 600 },
  { id: "work3", type: "pause", ms: 1300 },
  { id: "started", type: "text", text: "Here's how to send it back:" },
  { id: "status", type: "load", ms: 900 },
  { id: "end", type: "pause", ms: 3000 },
];

const sorelle = { brand: "sorelle-labs", name: "Sorelle Labs" };
const marais = { brand: "marais", name: "Marais" };

export function PaSendBackMotion() {
  return (
    <Scene agent="muse" name="04 I need to send it back. · Muse" beats={SEND_BACK} logged>
      {(t) => (
        <>
          {t.reached("ask") && <User className="ill-user-turn--enter">{sendBack.ask}</User>}
          {t.loading("work") && <Enter><Working line="Connecting to Sorelle Labs via Crossword" /></Enter>}
          {t.reached("auth") && (
            <Enter><Merchant {...sorelle} reply={<RichStagger text="To find your order, sign in to your Sorelle Labs account." />}>
              <SignIn {...sendBack.auth} done={t.reached("signed")} />
            </Merchant></Enter>
          )}
          {t.loading("work2") && <Enter><Working line="Checking your order and return eligibility" /></Enter>}
          {t.reached("found") && (
            <Enter><Merchant {...sorelle} reply={<RichStagger text={sendBack.found} />}>
              {t.reached("order") && <OrderCard loading={t.loading("order")} picked={t.reached("picked") ? "refund" : undefined} />}
            </Merchant></Enter>
          )}
          {t.reached("confirm") && <User className="ill-user-turn--enter">{sendBack.confirm}</User>}
          {t.reached("approve") && <Enter><Approval {...sendBack.approve} item={cream} done={t.reached("approved")} doneLabel="Confirmed" /></Enter>}
          {t.loading("work3") && <Enter><Working line="Starting your return with Sorelle Labs" /></Enter>}
          {t.reached("started") && (
            <Enter><Merchant {...sorelle} reply={<RichStagger text="Here's how to send it back:" />}>
              {t.reached("status") && <ReturnStatus loading={t.loading("status")} />}
            </Merchant></Enter>
          )}
        </>
      )}
    </Scene>
  );
}

const STORE_CREDIT: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "ask", type: "appear", ms: 500 },
  { id: "work", type: "pause", ms: 1300 },
  { id: "auth", type: "text", text: "To use your store credit, sign in to your Marais account." },
  { id: "authWait", type: "pause", ms: 1500 },
  { id: "signed", type: "appear", ms: 700 },
  { id: "work2", type: "pause", ms: 1700 },
  { id: "picks", type: "text", text: storeCredit.reply },
  { id: "account", type: "appear", ms: 500 },
  { id: "sweaters", type: "load", ms: 950 },
  { id: "read", type: "pause", ms: 1600 },
  { id: "choose", type: "appear", ms: 600 },
  { id: "work3", type: "pause", ms: 1300 },
  { id: "checkout", type: "text", text: "Here's your checkout with store credit applied:" },
  { id: "summary", type: "load", ms: 900 },
  { id: "read2", type: "pause", ms: 1500 },
  { id: "think", type: "pause", ms: 800 },
  { id: "answer", type: "text", text: md(storeCredit.grok) },
  { id: "approve", type: "appear", ms: 500 },
  { id: "end", type: "pause", ms: 3000 },
];

export function PaStoreCreditMotion() {
  return (
    <Scene agent="grok" name="05 Find me a sweater with my store credit. · Grok Bot" beats={STORE_CREDIT} logged>
      {(t) => (
        <>
          {t.reached("ask") && <User className="ill-user-turn--enter">{storeCredit.ask}</User>}
          {t.reached("work") && <Enter><Activity line={t.loading("work") ? "Connecting to Marais via Crossword" : "Connected to Marais via Crossword"} done={t.passed("work")} /></Enter>}
          {t.reached("auth") && (
            <Enter><Merchant {...marais} reply={<RichStagger text="To use your store credit, sign in to your Marais account." />}>
              <SignIn {...storeCredit.auth} done={t.reached("signed")} />
            </Merchant></Enter>
          )}
          {t.reached("work2") && <Enter><Activity line={t.loading("work2") ? storeCredit.working : storeCredit.worked} done={t.passed("work2")} /></Enter>}
          {t.reached("picks") && (
            <Enter><Merchant {...marais} reply={<RichStagger text={storeCredit.reply} />}>
              {t.reached("account") && <Enter><Account rows={storeCredit.account} /></Enter>}
              {t.reached("sweaters") && <Sweaters loading={t.loading("sweaters")} />}
            </Merchant></Enter>
          )}
          {t.reached("choose") && <User className="ill-user-turn--enter">{storeCredit.choose}</User>}
          {t.reached("work3") && <Enter><Activity line={t.loading("work3") ? "Preparing checkout with Marais via Crossword" : "Prepared checkout with Marais via Crossword"} done={t.passed("work3")} /></Enter>}
          {t.reached("checkout") && (
            <Enter><Merchant {...marais} reply={<RichStagger text="Here's your checkout with store credit applied:" />}>
              {t.reached("summary") && <Checkout loading={t.loading("summary")} />}
            </Merchant></Enter>
          )}
          {t.reached("answer") && <Answer runs={storeCredit.grok} />}
          {t.reached("approve") && <Enter><Approval {...storeCredit.approve} item={storeCredit.picks[0].item} /></Enter>}
        </>
      )}
    </Scene>
  );
}

const SOMETHING: Beat[] = [
  { id: "lead", type: "pause", ms: 500 },
  { id: "ask", type: "appear", ms: 500 },
  { id: "work", type: "pause", ms: 1300 },
  { id: "auth", type: "text", text: "To personalize this, Marais needs your permission to use your account." },
  { id: "authWait", type: "pause", ms: 1500 },
  { id: "allowed", type: "appear", ms: 700 },
  { id: "work2", type: "pause", ms: 1700 },
  { id: "profile", type: "text", text: somethingILike.reply },
  { id: "facts", type: "load", ms: 950 },
  { id: "read", type: "pause", ms: 2200 },
  { id: "work3", type: "pause", ms: 1300 },
  { id: "recs", type: "text", text: somethingILike.recs },
  { id: "picks", type: "load", ms: 950 },
  { id: "end", type: "pause", ms: 3000 },
];

export function PaSomethingILikeMotion() {
  return (
    <Scene agent="muse" name="06 Something I like. · Muse" beats={SOMETHING} logged>
      {(t) => (
        <>
          {t.reached("ask") && <User className="ill-user-turn--enter">{somethingILike.ask}</User>}
          {t.loading("work") && <Enter><Working line="Connecting to Marais via Crossword" /></Enter>}
          {t.reached("auth") && (
            <Enter><Merchant {...marais} reply={<RichStagger text="To personalize this, Marais needs your permission to use your account." />}>
              <SignIn {...somethingILike.auth} done={t.reached("allowed")} doneLabel="Allowed" />
            </Merchant></Enter>
          )}
          {t.loading("work2") && <Enter><Working line="Combining your Marais account with what Muse knows" /></Enter>}
          {t.reached("profile") && (
            <Enter><Merchant {...marais} reply={<RichStagger text={somethingILike.reply} />}>
              {t.reached("facts") && <Profile loading={t.loading("facts")} />}
            </Merchant></Enter>
          )}
          {t.loading("work3") && <Enter><Working line="Finding picks for you" /></Enter>}
          {t.reached("recs") && (
            <Enter><Merchant {...marais} reply={<RichStagger text={somethingILike.recs} />}>
              {t.reached("picks") && <Recommendations loading={t.loading("picks")} />}
            </Merchant></Enter>
          )}
        </>
      )}
    </Scene>
  );
}
