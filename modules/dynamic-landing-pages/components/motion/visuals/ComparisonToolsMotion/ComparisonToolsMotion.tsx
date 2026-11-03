import { useRef } from "react";
import { BrowserChrome } from "../../components/ill/BrowserChrome";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat } from "../../illustrations/SellMotion/useChatTimeline";
import { cx, useFontsReady } from "../sellDynamicMotion";
import { Landing, Serp } from "../ComparisonTools/ComparisonTools";
import { landing, serp } from "../ComparisonTools/data";

// 08 — Comparison tools (motion). The five statics as one take, in the
// same window as the other Sell: Dynamic motions, on Storybook's motion
// values (STORYBOOK_MAPPING.md §8, §10, §15; ComparisonToolsMotion.css):
//   serp     Google results at rest
//   pick     the sponsored result takes its hover frame, the products
//            row recedes, the result dips on the tap
//   page     the window navigates: the results fade off, the comparison
//            page fades on (chrome and nav, then product and module rise)
//   load     the first two rows are in; the rest shimmer in their slots
//   resolve  the remaining rows settle in, top to bottom
//   insight  the title becomes the answer and the Melatonin row lights
// Both pages exist in the viewport once reached (transitions, not
// swaps); a restart remounts the scene via the timeline's runKey.
const beats: Beat[] = [
  { id: "serp", type: "pause", ms: 1600 },
  { id: "pick", type: "appear", ms: 700 },
  { id: "page", type: "appear", ms: 900 },
  { id: "load", type: "load", ms: 1600 },
  { id: "resolve", type: "appear", ms: 1100 },
  { id: "insight", type: "appear", ms: 1200 },
  { id: "hold", type: "pause", ms: 2200 },
];

export function ComparisonToolsMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const t = useChatTimeline(beats, landed && fontsReady);
  const onPage = t.reached("page");
  const step = t.reached("insight") ? 5 : t.reached("resolve") ? 4 : 3;
  return (
    <div ref={rootRef}>
      <div
        key={t.runKey}
        className={cx(
          "ais cmp ctm",
          t.reached("pick") && "ctm--pick",
          onPage && "ctm--page",
          t.reached("resolve") && "ctm--resolved",
          t.reached("insight") && "ctm--insight",
        )}
      >
        <article className="ais-store">
          <BrowserChrome url={onPage ? landing.path : serp.url} />
          <div className="ais-viewport">
            <div className="ctm-layer ctm-serp"><Serp picked={t.reached("pick")} /></div>
            {onPage && <div className="ctm-layer ctm-page"><Landing step={step} stream /></div>}
          </div>
        </article>
      </div>
    </div>
  );
}
