import { useRef } from "react";
import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Thinking } from "../../illustrations/SellMotion/parts";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { Answer, Pdp } from "../AskAiRightOnPage/AskAiRightOnPage";
import { brand, followUps, detailAnswer, detailFollowUps, question, thinking, url } from "../AskAiRightOnPage/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";
import { TapRing } from "./TapRing";


const addressIcon = addressIconImage.src;

// 11 — Ask AI, right on the page (motion). The six statics as one take on
// the same 554x575 window. The PDP never moves: "See more" is pressed and
// the scrim begins (02), Crossword slides in from the left as the
// full-height side-nav (03) with the insight's question already sent,
// thinks, and the answer's rows land one by one (04). Follow-ups rise in
// under it (05); the formula one is picked, sent, and answered with two
// fresh follow-ups (06). The thread follows the newest exchange. Each
// click is made legible on the target itself: a short hover state, then a
// tap ring spreading from its centre.
const beats: Beat[] = [
  { id: "pdp", type: "pause", ms: 1400 },
  { id: "hover-insight", type: "pause", ms: 400 },
  // Tap → open overlaps: the side-nav starts while the ring is still
  // spreading and the scrim is mid-fade, so it reads as one gesture.
  { id: "press", type: "appear", ms: 220 },
  { id: "open", type: "appear", ms: 560 },
  { id: "ask", type: "appear", ms: 380 },
  { id: "think", type: "think", labels: ["Thinking", thinking] },
  // The answer's rows finish at ~640ms; follow-ups continue the same
  // cascade shortly after, and the reading time comes once both are up.
  { id: "answer", type: "appear", ms: 760 },
  { id: "follow-ups", type: "appear", ms: 2600 },
  { id: "hover-chip", type: "pause", ms: 360 },
  { id: "pick", type: "appear", ms: 260 },
  { id: "send", type: "appear", ms: 380 },
  { id: "think-detail", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: detailAnswer },
  { id: "next", type: "appear", ms: 600 },
];

function Crossword({ t }: { t: Timeline }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  // The shopper's newest message holds the top of the thread; the
  // clearance keeps the last line above the kit's 32px bottom fade.
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
      className="ask-drawer askm-drawer"
      header={<ChatHeader brand={brand} showHistory={false} showExpand={false} />}
      viewportRef={viewportRef}
    >
      <div className="ask-thread">
        <UserTurn animateIn>
          <ChatMessage role="user" text={question} />
        </UserTurn>
        {t.reached("think") && (
          <AssistantTurn>
            <Thinking t={t} id="think" />
            {t.reached("answer") && <Answer />}
            {t.reached("follow-ups") && (
              <div className="askm-followups">
                <AiPills options={followUps} selectedId={t.reached("pick") ? "fragrance" : ""} />
              </div>
            )}
          </AssistantTurn>
        )}
        {t.reached("send") && (
          <UserTurn animateIn>
            <ChatMessage role="user" text={followUps[0].text} />
          </UserTurn>
        )}
        {t.reached("think-detail") && (
          <AssistantTurn>
            <Thinking t={t} id="think-detail" />
            {t.reached("reply") && <AssistantText text={detailAnswer} />}
            {t.reached("next") && (
              <AiPills options={detailFollowUps} selectedId="" />
            )}
          </AssistantTurn>
        )}
      </div>
    </Shell>
  );
}

function Scene({ t }: { t: Timeline }) {
  const pressed = t.reached("press");
  const open = t.reached("open");
  return (
    <div
      className={cx(
        "ask askm",
        t.reached("hover-insight") && !pressed && "askm--hover-insight",
        t.reached("hover-chip") && !t.reached("pick") && "askm--hover-chip",
      )}
    >
      <article className="ask-store">
        <div className="ill-browser-chrome">
          <div className="ill-browser-chrome__dots"><span></span><span></span><span></span></div>
          <div className="ill-browser-chrome__address">
            <img src={addressIcon} width="10" height="11" alt="" />
            <span>{url}</span>
          </div>
        </div>
        <div className="ask-viewport">
          <Pdp step={pressed ? 2 : 1} />
          <ContentFade />
          <div className={cx("ask-scrim askm-scrim", pressed && "askm-scrim--on")} />
          {open && <Crossword t={t} />}
          <TapRing
            target={t.reached("pick") ? ".askm-followups .ill-ai-pill:first-child" : ".ask-insight__more"}
            tap={t.reached("pick") ? 2 : pressed ? 1 : 0}
          />
        </div>
      </article>
    </div>
  );
}

export function AskAiRightOnPageMotion() {
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
