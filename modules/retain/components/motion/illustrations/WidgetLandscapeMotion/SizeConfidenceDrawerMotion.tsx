import { useCallback, useRef, useState } from "react";
import { UserTurn } from "../../components/ill/UserTurn";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { ChatMessage } from "../../components/ill/ChatMessage";
import { LandscapeCanvas } from "../WidgetLandscape/LandscapeCanvas";
import { JacketPdpScene, SizedProductCard } from "../WidgetLandscape/SizeConfidence";
import { sizeConfidence as s } from "../WidgetLandscape/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { LoopWhenDone } from "../SellMotion/LoopWhenDone";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat, Timeline } from "../SellMotion/useChatTimeline";

const recommendation = s.recommendation.replace("a Medium.", "a **Medium**.");

// 12b — Landscape 12 with the store's own entry point instead of the
// floating widget. Sell: Dynamic v2's 15 drawer recipe (STORYBOOK_MAPPING
// §14h, AdaptivePagesMotion): the PDP rests, "Ask AI" in the header
// presses, the scrim fades as the chat slides in from the page's left
// edge, then 12's two exchanges play unchanged inside it.
const beats: Beat[] = [
  { id: "store", type: "pause", ms: 1400 },
  { id: "tap-ask", type: "appear", ms: 300 },
  { id: "open", type: "appear", ms: 600 },
  { id: "ask", type: "compose", text: s.userQuestion, leadMs: 300 },
  { id: "think", type: "think", labels: ["Thinking", "Checking the fit"] },
  { id: "reply", type: "text", text: recommendation },
  { id: "choose", type: "compose", text: s.userChoice },
  { id: "think2", type: "think", labels: ["Adding to cart"] },
  { id: "confirm", type: "text", text: s.confirmation },
  { id: "card", type: "load" },
];

// The pill press and the scrim sit outside the shell, so the shell's own
// state classes drive them (`:has()` in the CSS).
const shellState = (t: Timeline) =>
  [
    "ill-landscape-shell ill-landscape-shell--compact ill-landscape-shell--aubergine ill-shell--standard scd-drawer",
    t.reached("tap-ask") && "scd-drawer--tap",
    t.reached("open") && "scd-drawer--open",
  ]
    .filter(Boolean)
    .join(" ");

export function SizeConfidenceDrawerMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Site: plays on a loop. Bumped once the script has played out and held, re-keying the chat so it starts again from
  // the resting page.
  const [loop, setLoop] = useState(0);
  const replay = useCallback(() => setLoop((n) => n + 1), []);
  return (
    <div className="scd" ref={rootRef}>
      <LandscapeCanvas
        backdrop="maroon"
        bleed
        scene={<JacketPdpScene askAi />}
        widget={
          <>
            <div className="scd-scrim" />
            <ChatMotionScene
              key={loop}
              brand={s.brand}
              beats={beats}
              observeRef={rootRef}
              width={420}
              height={543}
              className={shellState}
              growComposer
            >
              {(t) => (
                <>
                  <LoopWhenDone t={t} onLoop={replay} />
                  {t.passed("ask") && (
                  <>
                    <UserTurn animateIn>
                      <ChatMessage role="user" text={s.userQuestion} />
                    </UserTurn>
                    <AssistantTurn animateIn>
                      <Thinking t={t} id="think" />
                      {t.reached("reply") && <AssistantText text={recommendation} />}
                    </AssistantTurn>
                    {t.passed("choose") && (
                      <>
                        <UserTurn animateIn>
                          <ChatMessage role="user" text={s.userChoice} />
                        </UserTurn>
                        <AssistantTurn animateIn>
                          <Thinking t={t} id="think2" />
                          {t.reached("confirm") && <AssistantText text={s.confirmation} />}
                          {t.reached("card") && (
                            <LoadingFrame loading={t.loading("card")} radius={12}>
                              <SizedProductCard />
                            </LoadingFrame>
                          )}
                        </AssistantTurn>
                      </>
                    )}
                  </>
                  )}
                </>
              )}
            </ChatMotionScene>
          </>
        }
      />
    </div>
  );
}
