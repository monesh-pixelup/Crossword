import { useEffect, useState } from "react";
import iconPencilImage from "@/modules/managed-launch/assets/motion/managed-launch/icon-pencil.svg";
import iconLayoutImage from "@/modules/managed-launch/assets/motion/managed-launch/icon-layout.svg";
import iconRocketImage from "@/modules/managed-launch/assets/motion/managed-launch/icon-rocket.svg";
import iconChartLineImage from "@/modules/managed-launch/assets/motion/managed-launch/icon-chartLine.svg";
import refineConnectorImage from "@/modules/managed-launch/assets/motion/managed-launch/refine-connector.svg";
import { journeyPreview } from "./data";

const iconPencil = iconPencilImage.src;
const iconLayout = iconLayoutImage.src;
const iconRocket = iconRocketImage.src;
const iconChartLine = iconChartLineImage.src;
const refineConnector = refineConnectorImage.src;

// Managed Launch · how it works. A hands-on service: the Crossword team
// does the work, the merchant joins at kickoff and sign-off.
type Owner = "you" | "team" | "both";
const steps: { n: number; title: string; line: string; owner: Owner; who: string; short?: string }[] = [
  { n: 1, title: "Kickoff call", line: "You share your goal and catalog. Together we agree what success looks like.", owner: "both", who: "You + Crossword" },
  { n: 2, title: "We design & build", line: "Our team designs the journey and sets it up with your products, brand and policies.", owner: "team", who: "Crossword" },
  { n: 3, title: "You review, we launch", line: "You approve the preview. Our team tests it and takes it live.", owner: "both", who: "You approve · Crossword launches", short: "You + Crossword" },
  { n: 4, title: "Weekly check-ins", line: "Our team reviews conversations, reports results and makes improvements.", owner: "team", who: "Crossword" },
];

const Tick = () => (
  <svg viewBox="0 0 16 16" width={9} height={9} aria-hidden>
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* A — Two-lane handoff. */
export function HandoffLanes() {
  return (
    <div className="jd-stage">
      <header className="jd-head">
        <p className="jd-eyebrow">Managed launch</p>
        <h2 className="jd-title">We do the work. You join twice.</h2>
      </header>
      <div className="jd-lanes">
        <div className="jd-lane-labels">
          <span className="jd-lane-label">You</span>
          <span className="jd-lane-label is-team">Crossword team</span>
        </div>
        <div className="jd-grid">
          <div className="jd-lane-bg" />
          <div className="jd-lane-bg is-team" />
          {steps.map((s) => (
            <div className="jd-col" key={s.n}>
              <div className={`jd-slot${s.owner !== "team" ? " is-filled" : ""}`}>
                {s.owner !== "team" && (
                  <div className="jd-touch">
                    <span className="jd-touch__dot" />
                    {s.n === 1 ? "30-min call" : "Approve preview"}
                  </div>
                )}
              </div>
              <div className="jd-slot is-team is-filled">
                <div className="jd-chip">
                  <span className="jd-chip__n">{s.n}</span>
                  <div>
                    <p className="jd-chip__title">{s.title}</p>
                    <p className="jd-chip__line">{s.line}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <svg className="jd-loop" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
            <path d="M875 4 C875 34, 375 34, 375 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="jd-loop__label">Repeats every week</span>
        </div>
      </div>
    </div>
  );
}

/* C — One deliverable per step: one Aurelle necklace project, start to finish. */
type Icon = "pencil" | "layout" | "rocket" | "chartLine";
const ICON_SRC: Record<Icon, string> = { pencil: iconPencil, layout: iconLayout, rocket: iconRocket, chartLine: iconChartLine };
function Artifact({ icon, label, meta, foot, children }: { icon: Icon; label: string; meta: string; foot: string; children: React.ReactNode }) {
  return (
    <div className="jd-doc">
      <div className="jd-doc__head">
        <img src={ICON_SRC[icon]} className="jd-doc__icon" width={16} height={16} alt="" aria-hidden />
        <span className="jd-doc__label">{label}</span>
        <span className="jd-doc__meta">{meta}</span>
      </div>
      <div className="jd-doc__body">{children}</div>
      <p className="jd-doc__foot">{foot}</p>
    </div>
  );
}

function Deliverable({ n }: { n: number }) {
  if (n === 1)
    return (
      <Artifact icon="pencil" label="Goal summary" meta="Aurelle" foot="Agreed on the kickoff call">
        <p className="jd-doc__lead">Increase necklace add-to-cart</p>
        <dl className="jd-kv">
          <div><dt>Where</dt><dd>Necklaces collection</dd></div>
          <div><dt>Measure</dt><dd>Add-to-cart rate</dd></div>
        </dl>
      </Artifact>
    );
  if (n === 2)
    return (
      <Artifact icon="layout" label="Journey preview" meta="Necklaces" foot="Designed by the Crossword team">
        <p className="jd-ask">Everyday necklace, under $150</p>
        <div className="jd-picks">
          {journeyPreview.rows.map((r) => (
            <div className="jd-pick" key={r.title}>
              <img src={r.image} alt="" />
              <span>{r.meta.split(" · ")[1]}</span>
            </div>
          ))}
        </div>
      </Artifact>
    );
  if (n === 3)
    return (
      <Artifact icon="rocket" label="Launch sign-off" meta="Necklaces" foot="Launched by the Crossword team">
        <p className="jd-check"><span className="jd-box"><Tick /></span><span>Preview approved<em>Aurelle</em></span></p>
        <p className="jd-check"><span className="jd-box"><Tick /></span><span>Test conversations reviewed<em>Crossword</em></span></p>
        <span className="jd-status"><span className="jd-status__dot" />Approved for launch</span>
      </Artifact>
    );
  return (
    <Artifact icon="chartLine" label="Weekly report" meta="Illustrative" foot="Change made by the Crossword team">
      <div className="jd-totals">
        <div><span className="jd-totals__label">Before</span><span className="jd-totals__value is-was">6.2%</span></div>
        <div><span className="jd-totals__label">After</span><span className="jd-totals__value">7.9%</span></div>
      </div>
      <p className="jd-doc__small">Necklace add-to-cart · example figures</p>
      <p className="jd-doc__fix">Shoppers asked about chain length, so we added it to every card</p>
    </Artifact>
  );
}

export function DeliverableSteps() {
  return (
    <div className="jd-stage jd-stage--c">
      <div className="jd-flow">
        <ol className="jd-cards">
          {steps.map((s) => (
            <li className="jd-card" key={s.n}>
              <div className="jd-card__top">
                <span className="jd-chip__n">{s.n}</span>
                <span className={`jd-who${s.owner !== "team" ? " is-you" : ""}`}>{s.who}</span>
              </div>
              <p className="jd-card__title">{s.title}</p>
              <p className="jd-card__line">{s.line}</p>
              <Deliverable n={s.n} />
            </li>
          ))}
        </ol>
        <div className="jd-repeat" aria-label="Refine and repeat: from weekly check-ins back to design and build">
          <img className="jd-repeat__arc" src={refineConnector} alt="" aria-hidden />
          <span className="jd-repeat__label">↺ Refine & repeat</span>
        </div>
      </div>
    </div>
  );
}

/* C at 353px — "Thread". A gold thread draws down the left from step to
   step; the step it reaches opens to show its line and deliverable while the
   others stay as compact rows. After step 4 the thread pulls back to step 2
   ("Refine & repeat") and runs 2 → 4 once more, then the story restarts. */
const SEQUENCE = [0, 1, 2, 3];
const HOLD_MS = 3200;
export function DeliverableStepsNarrow() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setTick((k) => (k + 1) % SEQUENCE.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [tick]);
  const active = SEQUENCE[tick];
  return (
    <div className="jd-stage jd-stage--t">
      <ol className="jd-thread">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className={`jd-t-row${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
            aria-current={i === active ? "step" : undefined}
          >
            <span className="jd-t-dot">{s.n}</span>
            <div className="jd-t-card">
              <div className="jd-t-head">
                <p className="jd-t-title">{s.title}</p>
                <span className={`jd-who${s.owner !== "team" ? " is-you" : ""}`}>{s.short ?? s.who}</span>
              </div>
              <div className="jd-t-body">
                <div className="jd-t-inner">
                  <p className="jd-t-line">{s.line}</p>
                  <Deliverable n={s.n} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="jd-t-loop">
        <span className="jd-t-loop__icon" aria-hidden>↺</span>
        After launch, steps 2–4 repeat every week
      </p>
    </div>
  );
}
