import { useRef } from "react";
import { ProductReference } from "../../components/ill/ProductReference";
import { StaggerText } from "../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { Thinking } from "../../illustrations/SellMotion/parts";
import { LoadingFrame } from "../../illustrations/SellMotion/LoadingFrame";
import { RichStagger } from "../../illustrations/SellMotion/RichStagger";
import { AgentStep, CallStep, ConsoleHeader, OfferCard } from "../PersonalAgents/PersonalAgents";
import { agent, calls, picks, type Run } from "../PersonalAgents/data";
import { cx, useFontsReady } from "../sellDynamicMotion";

// 05 — Personal agents (motion). The five static states as one take: the
// agent logs its request on the rail; a Crossword tool call opens (the
// rail line draws down to it) and holds Crossword's thinking row while it
// works; the reply cascades in and the two picks resolve from skeletons;
// the follow-up and the offers call play the same way; the agent signs
// off with its done node. Every step is appended at the end of the rail,
// so nothing already on screen moves.
export const markup = (runs: readonly Run[]) => runs.map((r) => (typeof r === "string" ? r : `**${r.b}**`)).join("");
const productsReply = markup(calls.products.reply);
const offersReply = markup(calls.offers.reply);

// The agent-to-Crossword exchange, step by step against the shared beat
// ids below — also played inside V2's activity panel.
export const railBeats: Beat[] = [
  { id: "ask", type: "text", text: agent.ask },
  { id: "call-1", type: "appear", ms: 380 },
  { id: "think-1", type: "think", labels: ["Checking products", "Matching under $90"] },
  { id: "reply-1", type: "text", text: productsReply },
  { id: "picks", type: "load", ms: 600 },
  { id: "read-1", type: "pause", ms: 1200 },
  { id: "follow", type: "text", text: agent.followUp },
  { id: "call-2", type: "appear", ms: 380 },
  { id: "think-2", type: "think", labels: ["Checking offers"] },
  { id: "reply-2", type: "text", text: offersReply },
  { id: "offer", type: "load", ms: 600 },
  { id: "read-2", type: "pause", ms: 900 },
  { id: "close", type: "text", text: agent.close },
];

export function MotionRail({ t }: { t: Timeline }) {
  const { products, offers } = calls;
  return (
    <ol className="pa-rail">
      {t.reached("ask") && <AgentStep text={<StaggerText text={agent.ask} />} />}

      {t.reached("call-1") && (
        <CallStep topic={products.topic} returned={t.reached("reply-1")} pending={<Thinking t={t} id="think-1" />}>
          <p className="pa-call__reply">
            <RichStagger text={productsReply} />
          </p>
          {/* Mounted with the reply, already under skeletons. */}
          <div className="pa-picks">
            {picks.map((p, i) => (
              <LoadingFrame key={p.id} loading={!t.passed("picks")} radius={8} resolveDelayMs={i * 110}>
                <div className="pa-pick">
                  <ProductReference image={p.image} alt={p.name} title={p.name} price={p.price} size={44} />
                </div>
              </LoadingFrame>
            ))}
          </div>
        </CallStep>
      )}

      {t.reached("follow") && <AgentStep text={<StaggerText text={agent.followUp} />} />}

      {t.reached("call-2") && (
        <CallStep topic={offers.topic} returned={t.reached("reply-2")} pending={<Thinking t={t} id="think-2" />}>
          <p className="pa-call__reply">
            <RichStagger text={offersReply} />
          </p>
          <LoadingFrame loading={!t.passed("offer")} radius={8}>
            <OfferCard />
          </LoadingFrame>
        </CallStep>
      )}

      {t.reached("close") && <AgentStep text={<StaggerText text={agent.close} />} done />}
    </ol>
  );
}

const beats: Beat[] = [{ id: "idle", type: "pause", ms: 400 }, ...railBeats];

function Scene({ t }: { t: Timeline }) {
  return (
    <figure className={cx("pa pam", t.reached("close") && "pam--done")}>
      <article className="pa-window">
        <ConsoleHeader />
        <MotionRail t={t} />
      </article>
    </figure>
  );
}

export function PersonalAgentsMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  return (
    <div ref={rootRef}>
      <Scene t={t} key={t.runKey} />
    </div>
  );
}
