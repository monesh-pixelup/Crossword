import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LandscapeCanvas } from "../../illustrations/WidgetLandscape/LandscapeCanvas";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useChatTimeline, type Beat } from "../../illustrations/SellMotion/useChatTimeline";
import { ChatHead, ChatFoot, Rail, Followups } from "../../illustrations/GiftJourneyV2/GiftJourneyV2";
import { FADE_CLEARANCE, SparkGlyph, StreamedReply } from "../../illustrations/GiftJourneyV2/GiftJourneyV2Motion";
import { BrandStorefront } from "../../storefronts/BrandStorefront";
import { ColorContext } from "../../brands/ColorContext";
import { JacketPdpScene } from "../../illustrations/WidgetLandscape/SizeConfidence";
// The store's "Ask AI" pill (12b); its other rules are scoped to .scd.
import crosswordLogoImage from "@/modules/managed-launch/assets/motion/ill-icons/crossword-logo.svg";
import { Ph } from "../../illustrations/LaunchAudience/LaunchAudience";
import { ProductRow } from "../../illustrations/GiftJourneyV2/StorybookParts";
import * as d from "./data";


const crosswordLogo = crosswordLogoImage.src;

// Managed Launch · Journey ("Crossword grows with every step"). Left, the
// launch checklist Crossword runs for the merchant (persistent: done,
// active, upcoming). Right, the product UI on Aurelle's real storefront
// (BrandStorefront), changing with each stage:
//   1 Define goal    the merchant's objective; the store as it is
//   2 Choose journey Crossword's suggested journeys; Product discovery picked
//   3 Customize      Aurelle's widget: catalog, styling, customer context
//   4 Test & launch  live, a shopper gets recommendations
//   5 Measure        insight card: engagement, add to cart, drop-off
//   6 Improve        the opportunity applied; what changed is marked
//   7 Expand         Product discovery stays live; Gift finder starts
// Frame: Retain 11's (LandscapeCanvas, green, bleed, 1286×598 scene), the
// live page's 1280×599 journey panel. Statics (managed-launch.html) and
// the motion (managed-launch-motion.html) render through one Scene.

type View = {
  journey: 1 | 2;
  step: number; // active checklist step; 5 = all done
  measure: 0 | 1 | 2; // none, measured, improved
  panel: "none" | "goal" | "options" | "widget";
  selected: boolean;
  // Motion only: the Ask AI press, and the product page softening out.
  tap?: boolean;
  pdpLeaving?: boolean;
  // Motion only: the window before Aurelle's styling and context apply.
  neutral?: boolean;
  // Define goal, as an input: the suggestion tapped, the typed goal, the
  // armed and pressed "Set goal".
  goalChip?: boolean;
  goalValue?: string;
  goalTyping?: boolean;
  goalArmed?: boolean;
  goalSet?: boolean;
  // Choose journey: the dropdown (closed empty, open, set) and its highlight.
  dd?: "closed" | "open" | "set";
  ddHighlight?: boolean;
  // Measure & improve: the Apply press; then the "Add next journey" row.
  applyPress?: boolean;
  addNext?: boolean;
  addPress?: boolean;
  pill: null | "testing" | "live";
  sent: boolean;
  composer: string;
  thinking: { visible: boolean } | null;
  reply: boolean;
  picks: boolean;
  picksLoading: boolean;
  animate: boolean;
};

const base: View = {
  journey: 1,
  step: 0,
  measure: 0,
  panel: "none",
  selected: false,
  pill: null,
  sent: false,
  composer: "",
  thinking: null,
  reply: false,
  picks: false,
  picksLoading: false,
  animate: false,
};

const talked = { sent: true, reply: true, picks: true, panel: "widget" as const };

export type ManagedLaunchStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const STATIC_VIEWS: Record<ManagedLaunchStep, View> = {
  1: { ...base, panel: "goal", goalChip: true, goalValue: d.discovery.goal, goalArmed: true },
  2: { ...base, step: 1, panel: "options", selected: true, dd: "open", ddHighlight: true },
  3: { ...base, step: 2, panel: "widget" },
  4: { ...base, step: 3, pill: "testing", ...talked },
  5: { ...base, step: 4, measure: 1, pill: "live", ...talked },
  6: { ...base, step: 4, measure: 2, pill: "live", addNext: true, ...talked },
  7: { ...base, journey: 2, step: 2, panel: "widget", pill: "live" },
};

const beats: Beat[] = [
  // 1 Define goal, with the merchant: a suggestion is tapped, the goal is
  // typed at a considered pace, "Set goal" is pressed.
  { id: "goal", type: "pause", ms: 600 },
  { id: "goalChip", type: "appear", ms: 500 },
  { id: "goalType", type: "compose", text: d.discovery.goal, leadMs: 250, msPerChar: 55 },
  { id: "goalSet", type: "appear", ms: 700 },
  // 2 Choose journey: the dropdown opens, the highlight lands on the best
  // fit, it closes on its value; then the store's Ask AI opens the preview.
  { id: "journey", type: "appear", ms: 900 },
  { id: "select", type: "appear", ms: 650 },
  { id: "selClose", type: "appear", ms: 450 },
  { id: "tap", type: "pause", ms: 420 },
  { id: "preview", type: "appear", ms: 1500 },
  // 3 Customize: sources toggle on one by one; the window turns Aurelle's.
  { id: "customize", type: "load", ms: 1300 },
  { id: "custHold", type: "pause", ms: 1300 },
  // 4 Test & launch: rollout at 10%, a shopper asks, then the thumb slides
  // to 100% and the pill goes Live.
  { id: "launch", type: "appear", ms: 500 },
  { id: "ask", type: "compose", text: d.turnDiscovery.user, leadMs: 400 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: d.turnDiscovery.reply },
  { id: "picks", type: "load", ms: 800 },
  { id: "golive", type: "appear", ms: 1200 },
  // 5 Measure & improve: the recommendation arrives, Apply is pressed, the
  // cards update; then "Add next journey" is pressed.
  { id: "measure", type: "appear", ms: 2600 },
  { id: "apply", type: "pause", ms: 350 },
  { id: "improve", type: "appear", ms: 3000 },
  { id: "addNext", type: "pause", ms: 450 },
  { id: "gift", type: "appear", ms: 2600 },
];

function Check({ size = 10 }: { size?: number }) {
  return (
    <svg viewBox="0 0 256 256" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={32} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="40 136 104 200 216 72" />
    </svg>
  );
}

const rise = (k: number) => ({ "--i": k }) as React.CSSProperties;

// ---------- Left: the checklist ----------

type StepState = "done" | "active" | "pending";

function StepRow({ i, title, owner, state, children }: { i: number; title: string; owner: string; state: StepState; children?: React.ReactNode }) {
  return (
    <li className={`ml-step ml-step--${state}`}>
      <span className="ml-step__mark">
        {state === "done" ? <Check /> : state === "active" ? <span className="ml-step__ring" /> : <span className="ml-step__num">{i + 1}</span>}
      </span>
      <div className="ml-step__body">
        <div className="ml-step__row">
          <span className="ml-step__title">{title}</span>
          {state === "active" && <span className="ml-step__who">{owner} · in progress</span>}
        </div>
        {children && <div className="ml-step__detail">{children}</div>}
      </div>
    </li>
  );
}

const stateOf = (i: number, step: number): StepState => (i < step ? "done" : i === step ? "active" : "pending");

// Define goal as an input — the one step the merchant does with Crossword.
function GoalInput({ v }: { v: View }) {
  const value = v.goalValue ?? "";
  return (
    <div className="ml-goal">
      <p className="ml-goal__label">What do you want to improve?</p>
      <div className={`ml-goal__field${v.goalTyping ? " is-typing" : ""}`}>
        <span className="ml-goal__value">
          {value || <span className="ml-goal__placeholder">e.g. More add-to-cart from Necklaces</span>}
          {v.goalTyping && <span className="gj2-caret" aria-hidden />}
        </span>
        <span className={["ml-goal__set", v.goalArmed && "is-on", v.goalSet && "is-pressed"].filter(Boolean).join(" ")}>Set goal</span>
      </div>
      <div className="ml-goal__list">
        <p className="ml-goal__hint">
          <img src={crosswordLogo} alt="" />
          Suggested by Crossword
        </p>
        {d.goalSuggestions.map((g, k) => {
          const picked = k === 0 && v.goalChip;
          return (
            <span className={`ml-goal__opt${picked ? " is-picked" : ""}`} key={g.label} style={rise(k)}>
              <span className="ml-goal__opt-label">{g.label}</span>
              <span className="ml-goal__opt-metric">{g.metric}</span>
              <span className="ml-goal__opt-check">{picked && <Check size={9} />}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// 2 Choose journey — a select: closed shows the value, open floats a menu
// over the rows below (no layout shift).
function JourneySelect({ v }: { v: View }) {
  const open = v.dd === "open";
  const value = v.dd === "set" || (open && v.ddHighlight) || !v.animate ? d.journeyOptions[0] : null;
  return (
    <div className="ml-select">
      <div className={`ml-select__field${open ? " is-open" : ""}`}>
        {value ? (
          <>
            <span className="ml-select__value">{value.name}</span>
            <span className="ml-select__badge">{value.fit}</span>
          </>
        ) : (
          <span className="ml-select__placeholder">Select a journey</span>
        )}
        <svg className="ml-select__caret" viewBox="0 0 256 256" width={12} height={12} aria-hidden>
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" fill="currentColor" />
        </svg>
      </div>
      {open && (
        <div className="ml-select__menu" role="listbox">
          {d.journeyOptions.map((o, k) => {
            const hi = k === 0 && v.ddHighlight;
            return (
              <div className={`ml-select__opt${hi ? " is-hi" : ""}`} key={o.id} style={rise(k)}>
                <div className="ml-select__opt-text">
                  <span className="ml-select__opt-name">{o.name}</span>
                  <span className="ml-select__opt-line">{o.line}</span>
                </div>
                <span className={`ml-select__fit${k === 0 ? " is-best" : ""}`}>{o.fit}</span>
                <span className="ml-select__tick">{hi && <Check size={9} />}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 3 Customize — multi-select tags; in motion they toggle on one by one.
function SourceTags({ items }: { items: { label: string; on: boolean }[] }) {
  let n = 0;
  return (
    <div className="ml-sources">
      {items.map((t) => (
        <span className={`ml-source${t.on ? " is-on" : ""}`} key={t.label} style={rise(t.on ? n++ : 0)}>
          <span className="ml-source__box">{t.on && <Check size={8} />}</span>
          {t.label}
        </span>
      ))}
    </div>
  );
}

// 4 Test & launch — segmented rollout; the thumb slides 10% → 100%.
function Rollout({ live }: { live: boolean }) {
  const r = d.rollout;
  const at = live ? r.stops.length - 1 : 0;
  return (
    <div className="ml-rollout">
      <div className="ml-seg" style={{ "--at": at } as React.CSSProperties}>
        <span className="ml-seg__thumb" aria-hidden />
        {r.stops.map((s, k) => (
          <span className={`ml-seg__opt${k === at ? " is-on" : ""}`} key={s}>
            {k === 0 ? `Test ${s}` : s}
          </span>
        ))}
      </div>
      <span className="ml-rollout__test">
        <span className="ml-applied__tick"><Check size={8} /></span>
        {r.test}
      </span>
    </div>
  );
}

// 5 Measure & improve — approve Crossword's recommendation inline.
function Approve({ v }: { v: View }) {
  const r = d.recommendation;
  const applied = v.measure === 2;
  return (
    <div className={`ml-approve${applied ? " is-applied" : ""}`}>
      <p className="ml-approve__title">{r.title}</p>
      <p className="ml-approve__reason">{r.reason}</p>
      <span className={["ml-approve__cta", v.applyPress && "is-pressed"].filter(Boolean).join(" ")}>
        {applied ? (
          <>
            <Check size={10} />
            Applied
          </>
        ) : (
          "Apply change"
        )}
      </span>
    </div>
  );
}

function DiscoveryDetail({ id, st, v }: { id: d.StepId; st: StepState; v: View }) {
  const j = d.discovery;
  if (st === "pending") return null;
  switch (id) {
    case "goal":
      return st === "done" ? <span>{j.goalDone}</span> : <GoalInput v={v} />;
    case "journey":
      return st === "done" ? <span>{j.journeyDone}</span> : <JourneySelect v={v} />;
    case "customize":
      return st === "done" ? <span>{j.customizeDone}</span> : <SourceTags items={d.sources} />;
    case "launch":
      return st === "done" ? <span>{j.launchDone}</span> : <Rollout live={v.pill === "live"} />;
    case "measure":
      if (st === "done") return <span>Improving weekly</span>;
      return <Approve v={v} />;
  }
}

function GiftDetail({ id, st }: { id: d.StepId; st: StepState }) {
  const g = d.giftFinder;
  if (st === "pending") return null;
  if (id === "goal") return <span>{g.goalDone}</span>;
  if (id === "journey") return <span>{g.journeyDone}</span>;
  if (id === "customize") return <SourceTags items={d.giftSources} />;
  return null;
}

// Where you are in the launch, before reading a row: "Step n of 5" over
// five segments (done green, active half, upcoming grey).
function Progress({ step }: { step: number }) {
  const total = d.steps.length;
  return (
    <div className="ml-progress">
      <span className="ml-progress__label">
        {step >= total ? "All steps done" : <>Step {step + 1} of {total}</>}
      </span>
      <span className="ml-progress__bar" aria-hidden>
        {d.steps.map((s, i) => (
          <i key={s.id} className={i < step ? "is-done" : i === step ? "is-active" : undefined} />
        ))}
      </span>
    </div>
  );
}

// FLIP for the stepper: when a step's detail opens or closes, the rows
// below glide to their new place (transform only) instead of jumping.
// "First" is read during render — the DOM still shows the old layout —
// so it's never stale; "last" after commit. Tops are relative to the list.
function useStepFlip(ref: React.RefObject<HTMLOListElement | null>, key: string, animate: boolean) {
  const lastKey = useRef(key);
  const first = useRef<number[] | null>(null);
  const rowTops = (list: HTMLOListElement) => {
    const box = list.getBoundingClientRect();
    // In the list's own CSS px (the translateY below is too): the site zooms
    // each visual to fit its panel, and getBoundingClientRect reports zoomed
    // values. 1 (a no-op) at the visual's drawn size.
    const zoom = list.offsetHeight ? box.height / list.offsetHeight : 1;
    return ([...list.children] as HTMLElement[]).map((r) => {
      // Ignore a flip still running on the row: measure where it rests.
      const t = r.getAnimations().find((x) => x.id === "ml-flip");
      const dy = t ? new DOMMatrix(getComputedStyle(r).transform).m42 : 0;
      return (r.getBoundingClientRect().top - box.top) / zoom - dy;
    });
  };
  if (lastKey.current !== key) {
    lastKey.current = key;
    first.current = animate && ref.current ? rowTops(ref.current) : null;
  }
  useLayoutEffect(() => {
    const list = ref.current;
    const before = first.current;
    first.current = null;
    if (!list || !before) return;
    const after = rowTops(list);
    if (after.length !== before.length) return;
    ([...list.children] as HTMLElement[]).forEach((row, i) => {
      row.getAnimations().forEach((x) => x.id === "ml-flip" && x.cancel());
      const dy = before[i] - after[i];
      if (Math.abs(dy) < 0.5) return;
      const anim = row.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }], {
        duration: 400,
        easing: "cubic-bezier(0.32, 0.72, 0, 1)",
      });
      anim.id = "ml-flip";
    });
  }, [key, ref]);
}

function Plan({ v }: { v: View }) {
  const j = v.journey === 1 ? d.discovery : d.giftFinder;
  const stepsRef = useRef<HTMLOListElement>(null);
  useStepFlip(stepsRef, `${v.journey}-${v.step}-${v.measure}-${v.pill}`, v.animate);
  return (
    <aside className="ml-plan">
      <header className="ml-plan__brand">
        <img src={crosswordLogo} alt="" />
        <span>Crossword · Managed launch</span>
        <span className="ml-plan__for">for Aurelle</span>
      </header>

      {v.journey === 2 && (
        <div className="ml-shipped">
          <span className="ml-shipped__mark"><Check /></span>
          <span className="ml-shipped__name">Product discovery</span>
          <span className="ml-shipped__state">
            <span className="ml-live__dot" />
            Live · improving weekly
          </span>
        </div>
      )}

      <section className="ml-card" key={v.journey}>
        <p className="ml-card__eyebrow">{v.journey === 2 ? "Up next · " : ""}{j.where}</p>
        <h3 className="ml-card__title">{j.name}</h3>
        <Progress step={v.step} />
        <ol className="ml-steps" ref={stepsRef}>
          {d.steps.map((s, i) => {
            const st = stateOf(i, v.step);
            return (
              <StepRow key={s.id} i={i} title={s.title} owner={s.owner} state={st}>
                {v.journey === 1 ? <DiscoveryDetail id={s.id} st={st} v={v} /> : <GiftDetail id={s.id} st={st} />}
              </StepRow>
            );
          })}
        </ol>
        {v.journey === 1 && v.addNext && (
          <div className={`ml-addnext${v.addPress ? " is-pressed" : ""}`}>
            <span className="ml-addnext__plus">+</span>
            <span className="ml-addnext__label">Add next journey</span>
            <span className="ml-addnext__hint">Gift finder suggested</span>
          </div>
        )}
      </section>

      <footer className="ml-commit">
        <span><b>You</b> 30 minutes a week</span>
        <span><b>Crossword</b> everything else</span>
      </footer>
    </aside>
  );
}

// ---------- Right: Aurelle's storefront ----------

function Thinking({ s }: { s: { visible: boolean } | null }) {
  if (!s) return null;
  return (
    <div className={s.visible ? "gj2-think gj2-in-ai" : "gj2-think gj2-think--out"}>
      <span className="gj2-think__mark"><SparkGlyph /></span>
      <span className="gj2-think__window"><span className="gj2-think__line">Thinking…</span></span>
    </div>
  );
}

function useFollowLatest(ref: React.RefObject<HTMLDivElement | null>, deps: unknown[], animate: boolean) {
  useEffect(() => {
    const viewport = ref.current;
    if (!viewport || !animate) return;
    let cancel: (() => void) | undefined;
    const follow = () => {
      const target = viewport.lastElementChild;
      if (!target) return;
      // In the viewport's own CSS px: the site zooms each visual to fit its
      // panel, and getBoundingClientRect reports zoomed values while
      // scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
      const vr = viewport.getBoundingClientRect();
      const zoom = viewport.offsetHeight ? vr.height / viewport.offsetHeight : 1;
      const bottom = target.getBoundingClientRect().bottom / zoom;
      const edge = vr.bottom / zoom - FADE_CLEARANCE;
      if (bottom <= edge) return;
      cancel?.();
      cancel = animateScrollTo(viewport, viewport.scrollTop + bottom - edge);
    };
    follow();
    const observer = new ResizeObserver(follow);
    [...viewport.children].forEach((child) => observer.observe(child));
    return () => {
      observer.disconnect();
      cancel?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function DiscoveryThread({ v }: { v: View }) {
  const a = v.animate;
  const improved = v.measure === 2;
  const t = d.turnDiscovery;
  return (
    <>
      <p className={`gj2-msg gj2-msg--ai${a ? " gj2-in-ai" : ""}`}>{d.openerDiscovery.text}</p>
      <Followups items={d.openerDiscovery.followups} className={a ? "gj2-followups--in" : undefined} />
      {v.sent && <p className={`gj2-msg gj2-msg--user${a ? " gj2-in" : ""}`}>{t.user}</p>}
      <Thinking s={v.thinking} />
      {v.reply && <StreamedReply text={t.reply} animate={a} />}
      {v.picks && (
        <div className={["ml-picks", a && "gj2-rise", improved && "ml-picks--improved"].filter(Boolean).join(" ")}>
          <Rail products={improved ? d.improvedPicks : d.picks} loading={a ? v.picksLoading : undefined} />
        </div>
      )}
      {v.picks && !v.picksLoading && (
        <Followups items={improved ? t.improvedFollowups : t.followups} className={a ? "gj2-followups--in" : undefined} key={improved ? "b" : "a"} />
      )}
    </>
  );
}

function GiftThread({ v }: { v: View }) {
  const a = v.animate;
  return (
    <>
      <p className={`gj2-msg gj2-msg--ai${a ? " gj2-in-ai" : ""}`}>{d.openerGift.text}</p>
      <Followups items={d.openerGift.followups} className={a ? "gj2-followups--in" : undefined} />
    </>
  );
}

function Window({ v }: { v: View }) {
  const transcriptRef = useRef<HTMLDivElement>(null);
  // Statics: a short thread starts at the top; only an overflowing one is
  // anchored to its latest turn.
  const [overflows, setOverflows] = useState(false);
  useLayoutEffect(() => {
    const t = transcriptRef.current;
    if (!t || v.animate) return;
    const kids = [...t.children] as HTMLElement[];
    const content = kids.reduce((h, k) => h + k.offsetHeight, 0) + Math.max(0, kids.length - 1) * 12;
    setOverflows(content > t.clientHeight - 40);
  }, [v.animate, v.journey, v.picks, v.measure]);
  useFollowLatest(transcriptRef, [v.journey, v.sent, v.thinking?.visible, v.reply, v.picks, v.picksLoading, v.measure], v.animate);
  return (
    <div className={["gj2-win", "ml-win", !v.animate && "ml-win--static", !v.animate && overflows && "ml-win--overflow", v.animate && "ml-win--in", v.neutral && "ml-win--neutral"].filter(Boolean).join(" ")}>
      <ChatHead brand={d.brand} />
      <div className="gj2-transcript" ref={transcriptRef} key={v.journey}>
        {v.neutral ? null : v.journey === 1 ? <DiscoveryThread v={v} /> : <GiftThread v={v} />}
      </div>
      <ChatFoot value={v.composer || undefined} />
    </div>
  );
}

// Define goal: the product page the goal is about, in Retain 12's
// ("Return reduction") PDP scene — JacketPdpScene with Aurelle's record
// and its "Ask AI" entry beside the cart. Its own browser chrome is hidden
// under this frame's bar.
function Pdp({ tap = false, leaving = false }: { tap?: boolean; leaving?: boolean }) {
  return (
    <div className={["ml-pdp-scene", tap && "ml-pdp-scene--tap", leaving && "ml-pdp-scene--out"].filter(Boolean).join(" ")} aria-hidden>
      <JacketPdpScene askAi page={d.pdp} />
    </div>
  );
}

// Choose journey: Crossword's suggestions as radio plates (the guided
// finder's selector), then the picked journey's details — what shoppers
// get, shown with the catalog pieces it recommends (List View rows).
function Options({ v, leaving }: { v: View; leaving: boolean }) {
  const p = d.journeyPreview;
  return (
    <div className={["ml-options", v.animate && "ml-options--in", leaving && "ml-options--out"].filter(Boolean).join(" ")}>
      <header className="ml-options__head">
        <img src={crosswordLogo} alt="" />
        <div>
          <p className="ml-options__eyebrow">Journey preview</p>
          <h4 className="ml-options__title">What shoppers will get</h4>
        </div>
      </header>
      {v.selected && (
        <section className="ml-detail">
          <div className="ml-detail__head">
            <span className="ml-detail__title">{p.title}</span>
            <span className="ml-option__fit ml-option__fit--best">{d.suggestions[0].fit}</span>
          </div>
          <p className="ml-detail__line">{p.line}</p>
          <p className="ml-detail__label">{p.label}</p>
          <div className="ml-detail__rows">
            {p.rows.map((r) => (
              <ProductRow key={r.title} image={r.image} title={r.title} meta={r.meta} className="ml-row" />
            ))}
          </div>
        </section>
      )}
      <span className={`ml-options__cta${v.selected ? " is-on" : ""}`}>{v.selected ? "Use Product discovery" : "Select a journey"}</span>
    </div>
  );
}

// Measure → Improve: what Crossword saw, and what it changed.
function Insight({ v }: { v: View }) {
  const i = d.insight;
  const improved = v.measure === 2;
  return (
    <section className={["ml-insight-card", v.animate && "ml-insight-card--in", improved && "is-improved"].filter(Boolean).join(" ")}>
      <header className="ml-ic__head">
        <Ph name={improved ? "rocket" : "chartLine"} className="ml-ic__icon" />
        <span className="ml-ic__title">{improved ? "Journey updated" : "What we measured"}</span>
        <span className="ml-ic__period">{i.period}</span>
      </header>
      <div className="ml-ic__stats">
        {i.stats.map((s, k) => (
          <div className={`ml-ic__stat${k === 2 ? " ml-ic__stat--warn" : ""}`} key={s.label} style={rise(k)}>
            <span className="ml-ic__label">{s.label}</span>
            <span className="ml-ic__value">
              {improved ? (
                <>
                  <s>{s.value}</s> {s.after}
                </>
              ) : (
                s.value
              )}
            </span>
            <span className="ml-ic__sub">{s.sub}</span>
          </div>
        ))}
      </div>
      {improved ? (
        <div className="ml-ic__changes" key="changes">
          <p className="ml-ic__kicker">What changed</p>
          {i.changes.map((c, k) => (
            <span className="ml-ic__change" key={c} style={rise(k)}>
              <span className="ml-applied__tick"><Check size={8} /></span>
              {c}
            </span>
          ))}
        </div>
      ) : (
        <div className="ml-ic__finding" key="finding">
          <p className="ml-ic__kicker">Where shoppers stall</p>
          <p className="ml-ic__stall">{i.stall}</p>
        </div>
      )}
    </section>
  );
}

const PILL = {
  testing: { text: "Testing · 20% of visitors", live: false },
  live: { text: "Live · all visitors", live: true },
} as const;

function Store({ v, leaving }: { v: View; leaving: boolean }) {
  const pill = v.pill ? PILL[v.pill] : null;
  const url = v.journey === 1 ? "aurelle.com/necklaces/teardrop-pendant-necklace" : d.giftFinder.url;
  return (
    <section className="ml-browser">
      <div className="ml-browser__bar">
        <span className="ml-browser__dots"><i /><i /><i /></span>
        <span className="ml-browser__url">{url}</span>
        {pill && (
          <span className={`ml-pill${pill.live ? " ml-pill--live" : ""}${v.animate ? " ml-pill--in" : ""}`} key={v.pill}>
            <span className="ml-live__dot" />
            {pill.text}
          </span>
        )}
      </div>
      <div className="ml-browser__page">
        {(v.journey === 1 || v.pdpLeaving) && <Pdp tap={v.tap} leaving={v.pdpLeaving} />}
        <div className="ml-store" aria-hidden>
          <BrandStorefront brandId="aurelle" color="green" />
        </div>
        {v.panel !== "none" && v.panel !== "goal" && <div className={`ml-scrim${v.animate ? " ml-scrim--in" : ""}`} />}
        {v.measure > 0 && <Insight v={v} />}
        <ColorContext variant="green" className="ml-ctx">
          <div className="ml-win-slot">
            {(v.panel === "options" || leaving) && <Options v={v} leaving={leaving} />}
            {v.panel === "widget" && <Window v={v} />}
          </div>
        </ColorContext>
      </div>
    </section>
  );
}

function Scene({ v, leaving = false, stageRef, runKey }: { v: View; leaving?: boolean; stageRef?: React.Ref<HTMLDivElement>; runKey?: number }) {
  return (
    <div className={["ml-stage", v.animate && "ml-stage--motion"].filter(Boolean).join(" ")} ref={stageRef}>
      <LandscapeCanvas
        backdrop="green"
        bleed
        scene={
          <div className="ml-dash" key={runKey}>
            <Plan v={v} />
            <Store v={v} leaving={leaving} />
          </div>
        }
      />
    </div>
  );
}

export function ManagedLaunch({ step }: { step: ManagedLaunchStep }) {
  return <Scene v={STATIC_VIEWS[step]} />;
}

export const ManagedLaunchStatics = ([1, 2, 3, 4, 5, 6, 7] as const).map((n) => {
  const C = () => <ManagedLaunch step={n} />;
  C.displayName = `ManagedLaunch${n}`;
  return C;
});

function MotionRun({ onDone }: { onDone: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(stageRef));
  const r = t.reached;
  const gift = r("gift");
  const think = t.status("think");
  useEffect(() => {
    if (t.done && !t.reducedMotion) onDone();
  }, [t.done, t.reducedMotion, onDone]);
  const v: View = {
    journey: gift ? 2 : 1,
    step: gift ? 2 : r("measure") ? 4 : r("launch") ? 3 : r("customize") ? 2 : r("journey") ? 1 : 0,
    measure: gift ? 0 : r("improve") ? 2 : r("measure") ? 1 : 0,
    panel: r("customize") ? "widget" : r("preview") ? "options" : "goal",
    selected: r("preview"),
    tap: t.loading("tap"),
    // Gift finder runs on the homepage: the product page softens out to it.
    pdpLeaving: !t.reducedMotion && t.loading("gift"),
    neutral: !t.reducedMotion && t.loading("customize"),
    pill: r("golive") ? "live" : r("launch") ? "testing" : null,
    sent: t.passed("ask"),
    composer: t.loading("ask") ? t.composer?.value ?? "" : "",
    goalChip: r("goalChip"),
    goalValue: t.loading("goalType") ? t.composer?.value ?? "" : t.passed("goalType") ? d.discovery.goal : "",
    goalTyping: t.loading("goalType"),
    goalArmed: t.passed("goalType"),
    goalSet: r("goalSet"),
    dd: r("selClose") ? "set" : r("journey") ? "open" : "closed",
    ddHighlight: r("select"),
    applyPress: t.loading("apply"),
    addNext: r("improve"),
    addPress: t.loading("addNext"),
    thinking: think ? { visible: think.visible } : null,
    reply: r("reply"),
    picks: r("picks"),
    picksLoading: t.loading("picks"),
    animate: !t.reducedMotion,
  };

  // Customize: the suggestions give way to Aurelle's own window.
  return <Scene v={v} leaving={t.loading("customize")} stageRef={stageRef} runKey={t.runKey} />;
}

// Loops: the last frame holds, then the whole panel softens out (400ms,
// 2px blur) and the sequence starts again from the product page — no hard
// cut, no dead end. Reduced motion renders the resolved end and stays.
const END_HOLD_MS = 2500;
const RESET_MS = 400;

export function ManagedLaunchMotion() {
  const [loop, setLoop] = useState(0);
  const [resetting, setResetting] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const onDone = useCallback(() => {
    timers.current.push(
      window.setTimeout(() => setResetting(true), END_HOLD_MS),
      window.setTimeout(() => {
        setLoop((n) => n + 1);
        setResetting(false);
      }, END_HOLD_MS + RESET_MS),
    );
  }, []);
  return (
    <div className={`ml-loop${resetting ? " ml-loop--out" : ""}`}>
      <MotionRun key={loop} onDone={onDone} />
    </div>
  );
}

/* 01m: a static at 353x440 — the plan card at its final state (every step
   done, the improvement applied, the next journey suggested). The plan is
   the one part of 01 that is already portrait, so it reads at full size;
   the desktop 01 carries the store's reaction. */
export const ManagedLaunchMwebStatic = () => (
  <figure className="ml-mweb-figure">
    <figcaption className="app-stage__tile-label">Managed Launch · 353x440</figcaption>
    <div className="ml-mweb">
      <div className="ml-mweb__window ml-mweb__window--static">
        <div className="ml-stage">
          <div className="ml-dash ml-dash--plan"><Plan v={STATIC_VIEWS[6]} /></div>
        </div>
      </div>
    </div>
  </figure>
);
