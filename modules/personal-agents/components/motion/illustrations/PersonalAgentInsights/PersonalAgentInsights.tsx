import { useRef } from "react";
import { InsightsFrame, Ph } from "../LaunchAudience/LaunchAudience";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { GrokGlyph } from "../../visuals/PersonalAgentsPossibilities/PersonalAgentsPossibilities";
import museMarkImage from "@/modules/personal-agents/assets/motion/hero/entry-points/muse-fill.svg";
import { personalAgentInsights as s, type Agent } from "./data";


const museMark = museMarkImage.src;

// Personal Agents → Insights, "You know what happened". The Storybook
// "Dashboard/Final/Insights" shell (Home's rail, chat list and composer,
// via InsightsFrame) in Retain v2 11's frame. The answer is the Launch
// story's card: a "Personal agents" source tag, then one activity table,
// a row per agent request: who asked, what it asked, what Crossword did,
// how it ended.
//
// PersonalAgentInsights is the resolved static; PersonalAgentInsightsMotion
// plays it on AI Assistants 12's timeline. Both render through one
// Dashboard.
const beats: Beat[] = [
  { id: "ask", type: "compose", text: s.query, leadMs: 900 },
  { id: "think", type: "think", labels: ["Thinking", "Reading personal-agent activity"] },
  { id: "card", type: "load", ms: 900 },
  // Header and rows land as one cascade (60ms apart, in CSS) out of the
  // skeleton, not as separate beats.
  { id: "rows", type: "appear", ms: 900 },
];

type View = {
  sent: boolean;
  composer: string;
  typing: boolean;
  thinking: { label: string; visible: boolean } | null;
  thought: boolean;
  card: boolean;
  cardLoading: boolean;
  rows: boolean;
  animate: boolean;
};

const RESOLVED: View = {
  sent: true, composer: "", typing: false, thinking: null, thought: true,
  card: true, cardLoading: false, rows: true, animate: false,
};

// Gated content stays mounted (layout never shifts) and rises in place.
const rise = (shown: boolean) => (shown ? "cgi-rise" : "cgi-rise cgi-rise--pending");

const AgentMark = ({ agent }: { agent: Agent }) =>
  agent === "muse" ? (
    <span className="pai-mark pai-mark--muse"><img src={museMark} alt="" /></span>
  ) : (
    <span className="pai-mark pai-mark--grok"><GrokGlyph /></span>
  );

function ActivityCard({ v }: { v: View }) {
  const c = s.card;
  return (
    <div className={["la-card cgi-card pai-card", v.animate && "la-enter"].filter(Boolean).join(" ")}>
      <header className="la-card__head">
        <span className="la-tag cgi-source">
          <span className="pai-pair"><AgentMark agent="muse" /><AgentMark agent="grok" /></span>
          {c.source}
        </span>
        <span className="la-card__title">{c.title}</span>
      </header>
      <div className="pai-table" role="table" aria-label="Personal agent activity">
        <div className={`pai-tr pai-tr--head ${rise(v.rows)}`} role="row" style={{ "--i": 0 } as React.CSSProperties}>
          {c.columns.map((h) => <span key={h} role="columnheader">{h}</span>)}
        </div>
        {c.records.map((r, i) => (
          <div className={`pai-tr ${rise(v.rows)}`} role="row" key={r.request} data-beat={`record-${i + 1}`} style={{ "--i": i + 1 } as React.CSSProperties}>
            <span className="pai-src" role="cell">
              <AgentMark agent={r.agent} />
              <span><b>{r.agent === "muse" ? "Muse" : "Grok Bot"}</b><small>{r.age} ago</small></span>
            </span>
            <span className="pai-req" role="cell">“{r.request}”</span>
            <span className="pai-act" role="cell">{r.action}</span>
            <span className="pai-out" role="cell">
              <span className={`la-tag cgi-outcome pai-outcome pai-outcome--${r.outcome}`}>{r.label}</span>
              <small>{r.detail}</small>
            </span>
          </div>
        ))}
      </div>
      {v.animate && (
        <div className={`la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`} aria-hidden>
          <span style={{ width: 280, height: 14 }} />
          <span style={{ width: "100%", height: 28 }} />
          <span style={{ width: "100%", height: 36 }} />
          <span style={{ width: "100%", height: 36 }} />
          <span style={{ width: "100%", height: 36 }} />
          <span style={{ width: "100%", height: 36 }} />
        </div>
      )}
    </div>
  );
}

function Dashboard({ v, stageRef, runKey }: { v: View; stageRef?: React.Ref<HTMLDivElement>; runKey?: number }) {
  const enter = v.animate ? " la-enter" : "";
  return (
    <InsightsFrame
      className="cgi pai"
      saved={s.saved}
      recent={s.recent}
      active={v.sent ? s.query : undefined}
      activeEnter={v.animate}
      stageRef={stageRef}
      runKey={runKey}
    >
      <section className="la-chat">
        <div className="la-thread">
          {v.sent && <div className={`la-user${enter}`}><p>{s.query}</p></div>}
          {v.sent && (
            <div className="la-thought cgi-thought">
              {v.thinking ? (
                <span
                  className={["la-thinking", v.animate && "la-thinking--live", !v.thinking.visible && "la-thinking--out"].filter(Boolean).join(" ")}
                  key={v.thinking.label}
                >
                  {v.thinking.label}
                </span>
              ) : (
                v.thought && <span className={`la-thought__done${v.animate ? " la-fade" : ""}`}>{s.thought}<Ph name="caretRight" /></span>
              )}
            </div>
          )}
          {v.card && <ActivityCard v={v} />}
        </div>
        <div className="la-composer">
          <div className="la-composer__text">
            {v.composer ? <>{v.composer}{v.typing && <span className="la-caret" />}</> : <span className="la-composer__placeholder">Ask about your visitors...</span>}
          </div>
          <div className="la-composer__foot">
            <span className="la-upload"><Ph name="plus" />Upload file</span>
            <span className={`la-send${v.composer ? " la-send--ready" : ""}`}><Ph name="send" /></span>
          </div>
        </div>
      </section>
    </InsightsFrame>
  );
}

export function PersonalAgentInsights() {
  return <Dashboard v={RESOLVED} />;
}

export function PersonalAgentInsightsMotion() {
  const stageRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(stageRef));
  const v: View = {
    sent: t.passed("ask"),
    composer: t.composer?.value ?? "",
    typing: !!t.composer,
    thinking: t.status("think"),
    thought: t.passed("think"),
    card: t.reached("card"),
    cardLoading: t.loading("card"),
    rows: t.reached("rows"),
    animate: !t.reducedMotion,
  };
  // Keyed inside the stage, so the on-screen observer keeps its node.
  return <Dashboard v={v} stageRef={stageRef} runKey={t.runKey} />;
}
