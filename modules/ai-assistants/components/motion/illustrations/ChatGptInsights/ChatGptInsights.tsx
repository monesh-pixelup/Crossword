import { useRef } from "react";
import { InsightsFrame, Ph } from "../LaunchAudience/LaunchAudience";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { chatGptInsights as s } from "./data";

// AI Assistants 15 — "You see what happened". Sorelle Labs asks its
// Insights dashboard what shoppers did inside ChatGPT. Same Storybook
// "Dashboard/Final/Insights" shell and frame as Retain 11 (InsightsFrame);
// the answer is one result card in the Launch story's form (40px tinted
// head, hairline sections): four totals, the latest ChatGPT conversations,
// and Maya R.'s conversation opened into its journey. Each step links the
// object it produced: conversation → product → cart → order.
//
// ChatGptInsights is the resolved static (ai-assistants-v3.html);
// ChatGptInsightsMotion plays it on Retain 11's chat timeline
// (ai-assistants-v3-motion.html). Both render through one Dashboard.
const beats: Beat[] = [
  { id: "ask", type: "compose", text: s.query, leadMs: 900 },
  { id: "think", type: "think", labels: ["Thinking", "Reading ChatGPT conversations"] },
  { id: "card", type: "load", ms: 900 },
  { id: "metrics", type: "appear", ms: 600 },
  { id: "interactions", type: "appear", ms: 700 },
  { id: "step-1", type: "appear", ms: 450 },
  { id: "step-2", type: "appear", ms: 450 },
  { id: "step-3", type: "appear", ms: 450 },
  { id: "step-4", type: "appear", ms: 600 },
];

// Phosphor (regular), copied from @phosphor-icons/core 2.1.1.
const PATHS = {
  openAi: "M224.32,114.24a56,56,0,0,0-60.07-76.57A56,56,0,0,0,67.93,51.44a56,56,0,0,0-36.25,90.32A56,56,0,0,0,69,217,56.39,56.39,0,0,0,83.59,219a55.75,55.75,0,0,0,8.17-.61,56,56,0,0,0,96.31-13.78,56,56,0,0,0,36.25-90.32ZM182.85,54.43a40,40,0,0,1,28.56,48c-.95-.63-1.91-1.24-2.91-1.81L164,74.88a8,8,0,0,0-8,0l-44,25.41V81.81l40.5-23.38A39.76,39.76,0,0,1,182.85,54.43ZM144,137.24l-16,9.24-16-9.24V118.76l16-9.24,16,9.24ZM80,72a40,40,0,0,1,67.53-29c-1,.51-2,1-3,1.62L100,70.27a8,8,0,0,0-4,6.92V128l-16-9.24ZM40.86,86.93A39.75,39.75,0,0,1,64.12,68.57C64.05,69.71,64,70.85,64,72v51.38a8,8,0,0,0,4,6.93l44,25.4L96,165,55.5,141.57A40,40,0,0,1,40.86,86.93ZM73.15,201.57a40,40,0,0,1-28.56-48c.95.63,1.91,1.24,2.91,1.81L92,181.12a8,8,0,0,0,8,0l44-25.41v18.48l-40.5,23.38A39.76,39.76,0,0,1,73.15,201.57ZM176,184a40,40,0,0,1-67.52,29.05c1-.51,2-1.05,3-1.63L156,185.73a8,8,0,0,0,4-6.92V128l16,9.24Zm39.14-14.93a39.75,39.75,0,0,1-23.26,18.36c.07-1.14.12-2.28.12-3.43V132.62a8,8,0,0,0-4-6.93l-44-25.4,16-9.24,40.5,23.38A40,40,0,0,1,215.14,169.07Z",
  chat: "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
  sparkle: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z",
  cart: "M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z",
  gift: "M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z",
  arrowUpRight: "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z",
} as const;

function Icon({ name, className }: { name: keyof typeof PATHS; className?: string }) {
  return (
    <svg className={["la-icon", className].filter(Boolean).join(" ")} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}

const STEP_ICONS = {
  asked: <Icon name="chat" />,
  recommended: <Icon name="sparkle" />,
  chose: <Icon name="cart" />,
  ordered: <Icon name="gift" />,
};

type View = {
  sent: boolean;
  composer: string;
  typing: boolean;
  thinking: { label: string; visible: boolean } | null;
  thought: boolean;
  card: boolean;
  cardLoading: boolean;
  metrics: boolean;
  interactions: boolean;
  // How many journey steps have landed (0–4).
  steps: number;
  animate: boolean;
};

const RESOLVED: View = {
  sent: true,
  composer: "",
  typing: false,
  thinking: null,
  thought: true,
  card: true,
  cardLoading: false,
  metrics: true,
  interactions: true,
  steps: 4,
  animate: false,
};

// Gated content stays mounted (layout never shifts) and rises in place
// when its beat is reached.
const rise = (shown: boolean) => (shown ? "cgi-rise" : "cgi-rise cgi-rise--pending");

function ChatGptChip() {
  return (
    <span className="la-tag cgi-source">
      <Icon name="openAi" />
      ChatGPT
    </span>
  );
}

function ResultCard({ v }: { v: View }) {
  const c = s.card;
  const j = s.journey;
  return (
    <div className={["la-card cgi-card", v.animate && "la-enter"].filter(Boolean).join(" ")}>
      <header className="la-card__head">
        <ChatGptChip />
        <span className="la-card__title">{c.title}</span>
      </header>

      <div className="cgi-metrics" data-beat="metrics">
        {c.metrics.map((m, i) => (
          <div className={`cgi-metric ${rise(v.metrics)}`} key={m.label} style={{ "--i": i } as React.CSSProperties}>
            <span className="cgi-metric__label">{m.label}</span>
            <span className="cgi-metric__value">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="cgi-body">
        <section className="cgi-recent" data-beat="interactions">
          <p className="la-card__label">{c.recentLabel}</p>
          {c.interactions.map((r, i) => (
            <div
              className={`cgi-int ${rise(v.interactions)}${i === 0 && v.steps > 0 ? " cgi-int--open" : ""}`}
              key={r.shopper}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="cgi-int__top">
                <span className="cgi-int__who">{r.shopper}</span>
                <span className="cgi-int__age">{r.age}</span>
              </div>
              <p className="cgi-int__request">{r.request}</p>
              <span className={`la-tag cgi-outcome cgi-outcome--${r.outcome === "Ordered" ? "won" : "open"}`}>
                {r.outcome}
                {r.amount && <span className="cgi-outcome__amount">{r.amount}</span>}
              </span>
            </div>
          ))}
        </section>

        <section className="cgi-journey" data-beat="journey">
          <div className={`cgi-journey__head ${rise(v.steps > 0)}`}>
            <span className="cgi-int__who">{j.shopper}</span>
            <span className="la-muted">{j.meta}</span>
          </div>
          <ol className={`cgi-steps${v.steps > 0 ? "" : " cgi-steps--pending"}`}>
            {j.steps.map((st, i) => (
              <li className={`cgi-step cgi-step--${st.kind} ${rise(v.steps > i)}`} key={st.kind} data-beat={`step-${i + 1}`}>
                <span className="cgi-step__dot">{STEP_ICONS[st.kind as keyof typeof STEP_ICONS]}</span>
                <div className="cgi-step__body">
                  <span className="cgi-step__label">{st.label}</span>
                  {st.product ? (
                    <span className="cgi-step__product">
                      <img src={st.product.image} alt="" />
                      <span className="cgi-step__name">{st.product.name}</span>
                      <span className="cgi-step__price">{st.product.price}</span>
                    </span>
                  ) : (
                    <span className="cgi-step__text">{st.text}</span>
                  )}
                </div>
                <span className="cgi-link">
                  {st.link}
                  <Icon name="arrowUpRight" />
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {v.animate && (
        <div className={`la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`} aria-hidden>
          <span style={{ width: 280, height: 14 }} />
          <span style={{ width: "100%", height: 48 }} />
          <span style={{ width: 520, height: 20 }} />
          <span style={{ width: 440, height: 20 }} />
          <span style={{ width: 360, height: 20 }} />
        </div>
      )}
    </div>
  );
}

function Dashboard({ v, stageRef, runKey }: { v: View; stageRef?: React.Ref<HTMLDivElement>; runKey?: number }) {
  const enter = v.animate ? " la-enter" : "";
  return (
    <InsightsFrame
      className="cgi"
      saved={s.saved}
      recent={s.recent}
      active={v.sent ? s.query : undefined}
      activeEnter={v.animate}
      stageRef={stageRef}
      runKey={runKey}
    >
      <section className="la-chat">
        <div className="la-thread">
          {v.sent && (
            <div className={`la-user${enter}`}>
              <p>{s.query}</p>
            </div>
          )}
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
                v.thought && (
                  <span className={`la-thought__done${v.animate ? " la-fade" : ""}`}>
                    {s.thought}
                    <Ph name="caretRight" />
                  </span>
                )
              )}
            </div>
          )}
          {v.card && <ResultCard v={v} />}
        </div>
        <div className="la-composer">
          <div className="la-composer__text">
            {v.composer ? (
              <>
                {v.composer}
                {v.typing && <span className="la-caret" />}
              </>
            ) : (
              <span className="la-composer__placeholder">Ask about your visitors...</span>
            )}
          </div>
          <div className="la-composer__foot">
            <span className="la-upload">
              <Ph name="plus" />
              Upload file
            </span>
            <span className={`la-send${v.composer ? " la-send--ready" : ""}`}>
              <Ph name="send" />
            </span>
          </div>
        </div>
      </section>
    </InsightsFrame>
  );
}

export function ChatGptInsights() {
  return <Dashboard v={RESOLVED} />;
}

export function ChatGptInsightsMotion() {
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
    metrics: t.reached("metrics"),
    interactions: t.reached("interactions"),
    steps: [1, 2, 3, 4].filter((n) => t.reached(`step-${n}`)).length,
    animate: !t.reducedMotion,
  };
  // Keyed inside the stage, so the on-screen observer keeps its node.
  return <Dashboard v={v} stageRef={stageRef} runKey={t.runKey} />;
}
