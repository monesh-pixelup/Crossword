import { useRef } from "react";
import { Shell } from "../../components/ill/Shell";
import { ChatHeader } from "../../components/ill/ChatHeader";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "../../illustrations/SellMotion/useChatTimeline";
import { AssistantText, Thinking } from "../../illustrations/SellMotion/parts";
import addressIconImage from "@/modules/dynamic-landing-pages/assets/motion/ill-icons/address.svg";
import { AddedStrip, BagSummary, Pdp, Recs, bagCount } from "../CrossSell/CrossSell";
import { brand, followUps, intro, picks, thinking, url } from "../CrossSell/data";
import { cx, useFollowLatest, useFontsReady } from "../sellDynamicMotion";
import { TapRing } from "../AskAiRightOnPageMotion/TapRing";


const addressIcon = addressIconImage.src;

// 12 — Upsell & cross-sell (motion). The six statics as one take on #11's
// window, with #11's beats: "Add to bag" is hovered and tapped, the badge
// counts 1 and the scrim begins; Crossword slides in from the left on the
// bagged sneaker, thinks, and its two picks land row by row, each with
// its reason. The runner's Add is tapped, then the loafer's; each row
// flips to Added as the storefront badge counts up, and the bag summary
// closes the turn.
const beats: Beat[] = [
  { id: "pdp", type: "pause", ms: 1400 },
  { id: "hover-cta", type: "pause", ms: 400 },
  { id: "press", type: "appear", ms: 700 },
  { id: "open", type: "appear", ms: 560 },
  { id: "context", type: "appear", ms: 380 },
  { id: "think", type: "think", labels: ["Thinking", thinking] },
  { id: "intro", type: "text", text: intro },
  // Rows finish their cascade at ~700ms; the reasons get reading time.
  { id: "recs", type: "appear", ms: 3200 },
  { id: "hover-add", type: "pause", ms: 360 },
  { id: "add", type: "appear", ms: 1100 },
  { id: "hover-add2", type: "pause", ms: 360 },
  { id: "add2", type: "appear", ms: 700 },
  { id: "bag", type: "appear", ms: 600 },
];

function Crossword({ t }: { t: Timeline }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  useFollowLatest(viewportRef, {
    thread: ".ask-thread",
    focus: t.reached("bag") ? ".xs-bag" : undefined,
    clearance: 40,
    index: t.index,
    reducedMotion: t.reducedMotion,
  });
  const addedIds = t.reached("add2") ? picks : t.reached("add") ? picks.slice(0, 1) : [];

  return (
    <Shell
      brand={brand}
      width={432}
      height={523}
      className="ask-drawer askm-drawer xs-drawer"
      header={<ChatHeader brand={brand} showHistory={false} showExpand={false} />}
      viewportRef={viewportRef}
    >
      <div className="ask-thread">
        {t.reached("context") && (
          <AssistantTurn>
            <AddedStrip />
            <Thinking t={t} id="think" />
            {t.reached("intro") && <AssistantText text={intro} />}
            {t.reached("recs") && <Recs addedIds={addedIds} />}
            {t.reached("bag") && (
              <>
                <BagSummary />
                <AiPills options={followUps} selectedId="" />
              </>
            )}
          </AssistantTurn>
        )}
      </div>
    </Shell>
  );
}

function Scene({ t }: { t: Timeline }) {
  const pressed = t.reached("press");
  const addedIds = t.reached("add2") ? picks : t.reached("add") ? picks.slice(0, 1) : [];
  const tap = t.reached("add2") ? 3 : t.reached("add") ? 2 : pressed ? 1 : 0;
  const target = t.reached("add2") ? ".xs-rec:nth-child(2) .xs-add" : t.reached("add") ? ".xs-rec:nth-child(1) .xs-add" : ".xs-cta";
  return (
    <div
      className={cx(
        "ask askm xs xsm",
        t.reached("hover-cta") && !pressed && "xsm--hover-cta",
        t.reached("hover-add") && !t.reached("add") && "xsm--hover-1",
        t.reached("hover-add2") && !t.reached("add2") && "xsm--hover-2",
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
          <Pdp inBag={pressed} count={bagCount(addedIds, pressed)} />
          <ContentFade />
          <div className={cx("ask-scrim askm-scrim", t.reached("open") && "askm-scrim--on")} />
          {t.reached("open") && <Crossword t={t} />}
          <TapRing target={target} tap={tap} />
        </div>
      </article>
    </div>
  );
}

export function CrossSellMotion() {
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
