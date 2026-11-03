import { SceneFrame } from "../../../components/ill/SceneFrame";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { ChatBreaker } from "../../../components/ill/ChatBreaker";
import { ChatMotionScene } from "../../SellMotion/ChatMotionScene";
import { AssistantText, Thinking } from "../../SellMotion/parts";
import type { Beat } from "../../SellMotion/useChatTimeline";
import { brand, humanTakeover } from "../data";
import handoffBgImage from "@/modules/support/assets/motion-v4/scenarios/human-loop/handoff-bg.webp";

const handoffBg = handoffBgImage.src;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: humanTakeover.userMessage },
  { id: "think", type: "think", labels: ["Thinking", "Bringing in the team"] },
  { id: "reply", type: "text", text: humanTakeover.assistantMessage },
  { id: "breaker", type: "appear", ms: 900 },
  // The human's turn: their label lands first, then a beat later their
  // message — a person joining, not Crossword's own thinking row, so no
  // AiStatus here.
  { id: "human", type: "appear", ms: 450 },
  { id: "humanReply", type: "text", text: humanTakeover.humanMessage },
];

// Support V3 Motion / 10 — Live human takeover. Same 292x338.905 themed
// shell, backdrop, breaker copy and turns as the static HumanTakeover.
// The handoff is the payoff, so it gets its own beats: Crossword's reply
// finishes, the breaker marks the join, then the human's label and
// greeting arrive. ChatMotionScene's follow-scroll ends on the same
// scrolled-to-end frame the static freezes on. The static is untouched.
export function HumanTakeoverMotion() {
  return (
    <SceneFrame hideBackground>
      <div className="ill-human-loop-backdrop">
        <img className="ill-human-loop-backdrop__bg" src={handoffBg} alt="" aria-hidden="true" />
        <ChatMotionScene
          brand={brand}
          beats={beats}
          width={292}
          height={338.905}
          className="ill-theme-human-loop ill-support-motion"
        >
          {(t) =>
            t.passed("ask") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={humanTakeover.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <Thinking t={t} id="think" />
                  {t.reached("reply") && <AssistantText text={humanTakeover.assistantMessage} />}
                </AssistantTurn>
                {/* Not wrapped in Enter: the breaker's own styles key off being a
                    direct .ill-thread child — its entrance is motion-scoped CSS. */}
                {t.reached("breaker") && (
                  <ChatBreaker text="Connected with a support agent — they can see this conversation." />
                )}
                {t.reached("human") && (
                  <AssistantTurn animateIn>
                    <div className="ill-handoff-turn">
                      <p className="ill-handoff-turn__label">{humanTakeover.handoffLabel}</p>
                      {t.reached("humanReply") && <AssistantText text={humanTakeover.humanMessage} />}
                    </div>
                  </AssistantTurn>
                )}
              </>
            )
          }
        </ChatMotionScene>
      </div>
    </SceneFrame>
  );
}
