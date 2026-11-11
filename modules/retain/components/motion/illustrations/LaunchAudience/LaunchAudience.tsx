import { useLayoutEffect, useRef } from "react";
import { LandscapeCanvas } from "../WidgetLandscape/LandscapeCanvas";
import { StaggerText } from "../../components/ill/StaggerText";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../SellMotion/useChatTimeline";
import { launchAudience as s } from "./data";
import priyaNairImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/priya-nair.svg";
import omarHaddadImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/omar-haddad.svg";
import sofiaMarinoImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/sofia-marino.svg";
import emmaLindqvistImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/emma-lindqvist.svg";
import kenjiWatanabeImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/kenji-watanabe.svg";
import orgMarkImage from "../../../../assets/motion/brand/org-mark.svg";
import priyaRamanImage from "../../../../assets/motion/illustrations/LaunchAudience/avatars/priya-raman.svg";

const priyaNair = priyaNairImage.src;
const omarHaddad = omarHaddadImage.src;
const sofiaMarino = sofiaMarinoImage.src;
const emmaLindqvist = emmaLindqvistImage.src;
const kenjiWatanabe = kenjiWatanabeImage.src;
const orgMark = orgMarkImage.src;
const priyaRaman = priyaRamanImage.src;

// Retain 11 — "Turn customer patterns into your audience", in the Storybook
// "Dashboard/Final/Insights" dashboard. The result follows the Launch
// story's audience card (avatars, headline, a breakdown under it) with the
// Segment story's label/value criteria tags; the breakdown is this week's
// MARAIS launches, each beside a past request it now answers. Measured
// against the story at 1440 wide.
//
// It sits in #12's frame (LandscapeCanvas: the damask backdrop, the page
// panel bleeding off the bottom), scaled as #12's page is, with the
// Analytics sidebar collapsed so the chat keeps the card's width.
//
// Static states, in script order (retain-v2.html):
//   1 the brand's query is sent, Crossword is thinking
//   2 the audience card
//   3 Crossword asks to send personalized messages
//   4 the brand's "Yes!"
// LaunchAudienceMotion plays the same states on the shared chat timeline
// (retain-v2-motion.html); both render through one Dashboard.
export type LaunchAudienceStep = 1 | 2 | 3 | 4;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: s.query, leadMs: 900 },
  { id: "think", type: "think", labels: ["Thinking", "Matching past conversations"] },
  { id: "card", type: "load", ms: 900 },
  { id: "products", type: "appear", ms: 700 },
  { id: "reply", type: "text", text: s.reply },
  { id: "approve", type: "compose", text: s.approval },
];

// Phosphor (regular), as the story's icons.
const ICONS = {
  house:
    "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z",
  cube: "M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z",
  headset:
    "M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88.12,88.12,0,0,1,190.54,65.93,87.39,87.39,0,0,1,215.65,120H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h24a24,24,0,0,1-24,24H136a8,8,0,0,0,0,16h56a40,40,0,0,0,40-40V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm128,56a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24v56Z",
  chartBar:
    "M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z",
  search: "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z",
  bell: "M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z",
  gear: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z",
  sidebar: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z",
  layout:
    "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z",
  chartLine:
    "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z",
  users:
    "M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z",
  pencil:
    "M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z",
  bookmarkFill: "M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z",
  dots: "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z",
  chat: "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z",
  caretRight: "M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z",
  rocket:
    "M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.940,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z",
  chatQuote:
    "M216,48H40A16,16,0,0,0,24,64V224a15.85,15.85,0,0,0,9.24,14.5A16.13,16.13,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Zm0,144H80a8,8,0,0,0-5.23,1.95L40,224V64H216Z",
  plus: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
  send: "M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z",
} as const;

export type IconName = keyof typeof ICONS;

export function Ph({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={["la-icon", className].filter(Boolean).join(" ")} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d={ICONS[name]} />
    </svg>
  );
}

const FACES = [priyaNair, omarHaddad, sofiaMarino, emmaLindqvist, kenjiWatanabe];

type View = {
  // The query has been sent into the thread.
  sent: boolean;
  // The composer's typed text and whether its caret shows.
  composer: string;
  typing: boolean;
  // While Crossword works; null once it has thought.
  thinking: { label: string; visible: boolean } | null;
  thought: boolean;
  card: boolean;
  cardLoading: boolean;
  products: boolean;
  reply: boolean;
  yes: boolean;
  // Motion plays entrances; the statics render resolved.
  animate: boolean;
};

const STATIC_VIEWS: Record<LaunchAudienceStep, View> = {
  1: {
    sent: true,
    composer: "",
    typing: false,
    thinking: { label: "Thinking", visible: true },
    thought: false,
    card: false,
    cardLoading: false,
    products: false,
    reply: false,
    yes: false,
    animate: false,
  },
  2: {
    sent: true,
    composer: "",
    typing: false,
    thinking: null,
    thought: true,
    card: true,
    cardLoading: false,
    products: true,
    reply: false,
    yes: false,
    animate: false,
  },
  3: {
    sent: true,
    composer: "",
    typing: false,
    thinking: null,
    thought: true,
    card: true,
    cardLoading: false,
    products: true,
    reply: true,
    yes: false,
    animate: false,
  },
  4: {
    sent: true,
    composer: "",
    typing: false,
    thinking: null,
    thought: true,
    card: true,
    cardLoading: false,
    products: true,
    reply: true,
    yes: true,
    animate: false,
  },
};

function AudienceCard({ v }: { v: View }) {
  const c = s.card;
  return (
    <div className={["la-card", v.animate && "la-enter", v.animate && !v.products && "la-card--pending"].filter(Boolean).join(" ")}>
      <header className="la-card__head">
        <Ph name="rocket" className="la-muted" />
        <span className="la-card__title">{c.title}</span>
      </header>
      <div className="la-card__top">
        <div className="la-criteria">
          {c.criteria.map((k) => (
            <span className="la-tag" key={k.label}>
              <span className="la-muted">{k.label}</span> {k.value}
            </span>
          ))}
        </div>
        <div className="la-hero">
          <span className="la-faces">
            {FACES.map((src) => (
              <img src={src} alt="" key={src} />
            ))}
          </span>
          <span className="la-hero__headline">{c.headline}</span>
          <span className="la-hero__source">{c.source}</span>
        </div>
      </div>
      <div className="la-card__products">
        <p className="la-card__label">{c.productsLabel}</p>
        <div className="la-products">
          {c.products.map((p, i) => (
            <figure className="la-product" key={p.title} style={{ "--i": i } as React.CSSProperties}>
              <div className="la-product__media">
                <img src={p.image} alt={p.title} />
                <span className="la-product__badge">New this week</span>
              </div>
              <figcaption>
                <p className="la-product__title">{p.title}</p>
                <p className="la-product__price">{p.price}</p>
                <p className="la-product__request">
                  <Ph name="chatQuote" />
                  <span>{p.request}</span>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      {v.animate && (
        <div className={`la-skeleton${v.cardLoading ? "" : " la-skeleton--hidden"}`} aria-hidden>
          <span style={{ width: 260, height: 14 }} />
          <span style={{ width: 420, height: 36 }} />
          <span style={{ width: 560, height: 20 }} />
          <div className="la-skeleton__tiles">
            {[0, 1, 2].map((i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// The thread follows its latest message, as the product's does: in #12's
// frame the whole exchange doesn't fit, so earlier turns scroll away.
function useFollowLatest(animate: boolean, runKey?: number) {
  const threadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const thread = threadRef.current;
    const content = contentRef.current;
    if (!thread || !content) return;
    const follow = () => thread.scrollTo({ top: thread.scrollHeight, behavior: animate ? "smooth" : "instant" });
    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(content);
    return () => observer.disconnect();
  }, [animate, runKey]);
  return { threadRef, contentRef };
}

export type RecentChat = { text: string; age: string };

// The Storybook "Dashboard/Final/Insights" shell in #12's frame: the icon
// rail, the Insights chat list (Saved / Recent) and a chat column passed as
// children. `active` is the open chat, listed first under Recent.
export function InsightsFrame({
  saved,
  recent,
  active,
  activeEnter = false,
  stageRef,
  runKey,
  className,
  bare = false,
  compact = false,
  railActive = "chartBar",
  children,
}: {
  saved: string[];
  recent: RecentChat[];
  active?: string;
  activeEnter?: boolean;
  stageRef?: React.Ref<HTMLDivElement>;
  runKey?: number;
  className?: string;
  // Just the dashboard, without #12's frame — for callers that place it
  // in their own viewport (Home 09b's camera).
  bare?: boolean;
  // The chats list collapsed (Home 09b's narrow viewport): rail + chat.
  compact?: boolean;
  // The rail's current section (Analytics by default; Build is "cube").
  railActive?: "house" | "cube" | "headset" | "chartBar";
  children: React.ReactNode;
}) {
  const dash = (
          <div className={compact ? "la-dash la-dash--compact" : "la-dash"} key={runKey}>
            <nav className="la-rail">
              <img className="la-rail__logo la-rail__logo--mark" src={orgMark} alt="" />
              <div className="la-rail__group">
                {(["house", "cube", "headset", "chartBar"] as const).map((n) => (
                  <span className={n === railActive ? "la-rail__item la-rail__item--active" : "la-rail__item"} key={n}>
                    <Ph name={n} />
                  </span>
                ))}
              </div>
              <div className="la-rail__group la-rail__group--end">
                {(["search", "bell", "gear"] as const).map((n) => (
                  <span className="la-rail__item" key={n}>
                    <Ph name={n} />
                  </span>
                ))}
                <span className="la-rail__rule" />
                <span className="la-rail__item">
                  <img className="la-rail__me" src={priyaRaman} alt="" />
                </span>
              </div>
            </nav>

            <main className="la-main">
              {!compact && (<section className="la-list">
                <div className="la-list__head">
                  <h2 className="la-serif la-serif--24">Insights</h2>
                  <Ph name="sidebar" className="la-muted" />
                </div>
                <div className="la-search">
                  <Ph name="search" />
                  <span>Search chats...</span>
                </div>
                <div className="la-row la-row--new">
                  <Ph name="pencil" />
                  New chat
                </div>
                <div className="la-section--nav">Saved</div>
                {saved.map((text) => (
                  <div className="la-row" key={text}>
                    <Ph name="bookmarkFill" className="la-primary" />
                    <span className="la-row__text">{text}</span>
                    <Ph name="dots" />
                  </div>
                ))}
                <div className="la-section--nav">Recent</div>
                {active && (
                  <div className={`la-row la-row--active${activeEnter ? " la-row--enter" : ""}`}>
                    <Ph name="chat" className="la-muted" />
                    <span className="la-row__text">{active}</span>
                    <span className="la-row__age">now</span>
                  </div>
                )}
                {recent.map((r) => (
                  <div className="la-row" key={r.text}>
                    <Ph name="chat" className="la-muted" />
                    <span className="la-row__text">{r.text}</span>
                    <span className="la-row__age">{r.age}</span>
                  </div>
                ))}
              </section>)}

              {children}
            </main>
          </div>
  );
  return (
    <div className={["la-stage", className].filter(Boolean).join(" ")} ref={stageRef}>
      {bare ? dash : <LandscapeCanvas backdrop="green" bleed scene={dash} />}
    </div>
  );
}

// `fit` (11m): the same dashboard laid out at its viewport's own size
// instead of 11's fixed 1286px frame (as Personal Agents 07m): the chats
// list folds (`compact`), the chat gets its own header, and container
// queries in LaunchAudience.css fold the rail and restack the card.
function Dashboard({ v, stageRef, runKey, fit }: { v: View; stageRef?: React.Ref<HTMLDivElement>; runKey?: number; fit?: boolean }) {
  const enter = v.animate ? " la-enter" : "";
  const { threadRef, contentRef } = useFollowLatest(v.animate, runKey);
  return (
    <InsightsFrame
      bare={fit}
      compact={fit}
      saved={s.saved}
      recent={s.recent}
      active={v.sent ? s.query : undefined}
      activeEnter={v.animate}
      stageRef={stageRef}
      runKey={runKey}
    >
      <section className="la-chat">
        {fit && (
          <header className="la-fit__head">
            <span className="la-serif la-fit__title">Insights</span>
            {v.sent && <span className={`la-fit__crumb${v.animate ? " la-fade" : ""}`}>{s.query}</span>}
          </header>
        )}
        <div className="la-thread" ref={threadRef}>
          <div className="la-thread__content" ref={contentRef}>
            {v.sent && (
              <div className={`la-user${enter}`}>
                <p>{s.query}</p>
              </div>
            )}
            {v.sent && (
              <div className="la-thought">
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
            {v.card && <AudienceCard v={v} />}
            {v.reply && <p className="la-reply">{v.animate ? <StaggerText text={s.reply} /> : s.reply}</p>}
            {v.yes && (
              <div className={`la-user la-user--next${enter}`}>
                <p>{s.approval}</p>
              </div>
            )}
          </div>
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

export function LaunchAudience({ step }: { step: LaunchAudienceStep }) {
  return <Dashboard v={STATIC_VIEWS[step]} />;
}

export function LaunchAudienceMotion() {
  const stageRef = useRef<HTMLDivElement>(null);
  const t = useChatTimeline(beats, useLandedOnScreen(stageRef));
  const status = t.status("think");
  const v: View = {
    sent: t.passed("ask"),
    composer: t.composer?.value ?? "",
    typing: !!t.composer,
    thinking: status,
    thought: t.passed("think"),
    card: t.reached("card"),
    cardLoading: t.loading("card"),
    products: t.reached("products"),
    reply: t.reached("reply"),
    yes: t.passed("approve"),
    animate: !t.reducedMotion,
  };
  // Keyed inside the stage, so the on-screen observer keeps its node.
  return <Dashboard v={v} stageRef={stageRef} runKey={t.runKey} />;
}

/* 11m: 11 at 353x440, responsive rather than redrawn. Plays once. */
export function LaunchAudienceFit() {
  const ref = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(ref);
  const played = useRef(false);
  const t = useChatTimeline(beats, landed || played.current);
  if (t.done) played.current = true;
  const v: View = {
    sent: t.passed("ask"), composer: t.composer?.value ?? "", typing: !!t.composer,
    thinking: t.status("think"), thought: t.passed("think"),
    card: t.reached("card"), cardLoading: t.loading("card"), products: t.reached("products"),
    reply: t.reached("reply"), yes: t.passed("approve"), animate: !t.reducedMotion,
  };
  return (
    <figure className="la-fit-figure" ref={ref}>
      <div className="la-fit-canvas">
        <div className="la-fit">
          <Dashboard fit v={v} runKey={t.runKey} />
        </div>
      </div>
    </figure>
  );
}
