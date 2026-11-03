import { useEffect, useRef, useState } from "react";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { ContentFade } from "../../components/ill/ContentFade";
import { Icon } from "../../components/ill/Icon";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { Pdp } from "../AskAiRightOnPage/AskAiRightOnPage";
import { summary, url } from "../AskAiRightOnPage/data";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { TapRing } from "../AskAiRightOnPageMotion/TapRing";


const addressIcon = addressIconImage.src;

// 12 — The gist, up front (motion). The Sorelle Labs PDP from 11, no chat:
// after a beat only the right column scrolls, bringing the AI summary into
// view beside the fixed gallery — only as far as the column runs, so it
// ends at the bottom edge — then plays once: "Show more" hovers and is
// tapped, the card opens over 300ms (the clamped text runs to its end,
// detail rows stagger in, the section below is pushed down by real
// layout) while the column follows just enough to keep "Show less" above
// the fade; a reading pause, "Show less" is tapped, and both settle back.
// It ends there, on the collapsed card.
const phases = [
  { id: "intro", ms: 1000 },
  { id: "scroll", ms: 800 },
  { id: "hover-more", ms: 500 },
  { id: "open", ms: 320 },
  { id: "read", ms: 3000 },
  { id: "hover-less", ms: 500 },
  { id: "close", ms: 320 },
] as const;
type PhaseId = (typeof phases)[number]["id"];
const at = (id: PhaseId) => phases.findIndex((p) => p.id === id);
// Page fade (40px) plus a little air.
const FADE_CLEARANCE = 56;

// Plays once, holding on the last phase; restarts from the intro whenever
// the visual (re)lands on screen.
function useGistPlayback(active: boolean) {
  const [state, setState] = useState({ index: 0, runKey: 0 });
  const wasActive = useRef(active);

  useEffect(() => {
    if (active && !wasActive.current) setState((s) => ({ index: 0, runKey: s.runKey + 1 }));
    wasActive.current = active;
  }, [active]);

  useEffect(() => {
    if (!active || state.index + 1 >= phases.length) return;
    const id = window.setTimeout(() => setState((s) => ({ ...s, index: s.index + 1 })), phases[state.index].ms);
    return () => window.clearTimeout(id);
  }, [active, state.index]);

  return state;
}

function GistCard({ open }: { open: boolean }) {
  return (
    <section className={cx("ask-summary gist-card", open && "gist-card--open")} data-name="AI summary">
      <p className="ask-insight__label"><Icon name="insight" size={12} />{summary.label}</p>
      <p className="ask-summary__text gist-text">{summary.text}</p>
      <div className="gist-more" aria-hidden={!open}>
        <ul className="gist-details">
          {summary.details.map((d) => (
            <li key={d.id}>
              <b>{d.title}</b>
              <span>{d.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="ask-link gist-toggle">{open ? summary.less : summary.more}</span>
    </section>
  );
}

function Scene({ index }: { index: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reached = (id: PhaseId) => index >= at(id);
  const open = reached("open") && !reached("close");
  const hovering = index === at("hover-more") || index === at("hover-less");
  const taps = (reached("open") ? 1 : 0) + (reached("close") ? 1 : 0);
  const restTop = useRef(0);

  // Right column only. Collapsed: scrolled to its end, so the content
  // finishes at the bottom edge with no gap. Opening: follow the card just
  // far enough to keep "Show less" above the fade, measured from the
  // card's final size up front so the scroll runs alongside the 300ms
  // expand. Closing: back to the collapsed position, alongside the close.
  useEffect(() => {
    const column = viewportRef.current?.querySelector<HTMLElement>(".ask-details");
    if (!column) return;
    if (index === at("scroll")) {
      restTop.current = column.scrollHeight - column.clientHeight;
      return animateScrollTo(column, restTop.current, 640);
    }
    if (index === at("open")) {
      const text = column.querySelector<HTMLElement>(".gist-text")!;
      const details = column.querySelector<HTMLElement>(".gist-details")!;
      const toggle = column.querySelector<HTMLElement>(".gist-toggle")!;
      const growth = details.scrollHeight + (text.scrollHeight - text.clientHeight);
      const box = column.getBoundingClientRect();
      // In the column's own CSS px: the site zooms each visual to fit its
      // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
      // at the visual's drawn size.
      const zoom = column.offsetHeight ? box.height / column.offsetHeight : 1;
      const toggleBottom = (toggle.getBoundingClientRect().bottom - box.top) / zoom + growth;
      const overflow = toggleBottom - (column.clientHeight - FADE_CLEARANCE);
      return overflow > 0 ? animateScrollTo(column, column.scrollTop + overflow, 300) : undefined;
    }
    if (index === at("close")) return animateScrollTo(column, restTop.current, 300);
  }, [index]);

  return (
    <div className={cx("ask gist", hovering && "gist--hover")}>
      <article className="ask-store">
        <div className="ill-browser-chrome">
          <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="ill-browser-chrome__address">
            <img src={addressIcon} width="10" height="11" alt="" />
            <span>{url}</span>
          </div>
        </div>
        <div className="ask-viewport" ref={viewportRef}>
          <Pdp step={1} summary={<GistCard open={open} />} />
          <ContentFade />
          <TapRing target=".gist-toggle" tap={taps} />
        </div>
      </article>
    </div>
  );
}

export function GistUpFrontMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const { index, runKey } = useGistPlayback(landed && fontsReady);
  return (
    <div ref={rootRef}>
      <Scene key={runKey} index={index} />
    </div>
  );
}
