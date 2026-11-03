import { useEffect, useRef } from "react";
import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Thinking } from "../../illustrations/SellMotion/parts";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { Pdp } from "../AskAiRightOnPage/AskAiRightOnPage";
import { brand, directAsk, specificInfo, url } from "../AskAiRightOnPage/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";


const addressIcon = addressIconImage.src;

// 13 — Your customer asks directly (motion). The Sorelle Labs PDP from 11/12;
// no cursor. The right column scrolls to "Looking for specific info?",
// the "Is it fragrance-free?" chip takes its selected state, and the
// side-nav from 11 slides in over a dim (the PDP never moves). The chip's
// question is the user turn, Crossword thinks, answers, and two follow-ups
// rise in. It ends there, on the answered state (and replays when it
// lands on screen again).
const beats: Beat[] = [
  { id: "pdp", type: "pause", ms: 1200 },
  { id: "scroll", type: "appear", ms: 800 },
  { id: "activate", type: "appear", ms: 650 },
  { id: "open", type: "appear", ms: 450 },
  { id: "ask", type: "appear", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "answer", type: "text", text: directAsk.answer },
  { id: "follow-ups", type: "appear", ms: 450 },
];

const chip = specificInfo.chips.find((c) => c.id === directAsk.chipId)!;

function Crossword({ t }: { t: Timeline }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, {
    thread: ".ask-thread",
    pin: ".ill-user-turn",
    clearance: 40,
    index: t.index,
    reducedMotion: t.reducedMotion,
  });
  return (
    <Shell
      brand={brand}
      width={432}
      height={523}
      className="ask-drawer dam-drawer"
      header={<ChatHeader brand={brand} showHistory={false} showExpand={false} />}
      viewportRef={viewportRef}
    >
      <div className="ask-thread">
        <UserTurn animateIn>
          <ChatMessage role="user" text={chip.text} />
        </UserTurn>
        {t.reached("think") && (
          <AssistantTurn>
            <Thinking t={t} id="think" />
            {t.reached("answer") && <AssistantText text={directAsk.answer} />}
            {t.reached("follow-ups") && <AiPills options={directAsk.followUps} selectedId="" />}
          </AssistantTurn>
        )}
      </div>
    </Shell>
  );
}

function Scene({ t }: { t: Timeline }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const active = t.reached("activate");
  const open = t.reached("open");

  // Right column only (as in 12): down to its end so the chips sit above
  // the fade.
  useEffect(() => {
    const column = viewportRef.current?.querySelector<HTMLElement>(".ask-details");
    if (column && t.index === 1) return animateScrollTo(column, column.scrollHeight - column.clientHeight, 640);
  }, [t.index]);

  return (
    <div className={cx("ask dam", active && "dam--active")}>
      <article className="ask-store">
        <div className="ill-browser-chrome">
          <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="ill-browser-chrome__address">
            <img src={addressIcon} width="10" height="11" alt="" />
            <span>{url}</span>
          </div>
        </div>
        <div className="ask-viewport" ref={viewportRef}>
          <Pdp step={1} specificSelected={active ? chip.id : ""} />
          <ContentFade />
          <div className={cx("ask-scrim dam-scrim", open && "dam-scrim--on")} />
          {open && <Crossword t={t} />}
        </div>
      </article>
    </div>
  );
}

export function DirectAskMotion() {
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
