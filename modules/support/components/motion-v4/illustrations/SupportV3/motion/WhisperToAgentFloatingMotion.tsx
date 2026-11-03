import { SceneFrame } from "../../../components/ill/SceneFrame";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { AssistantInsight } from "../../../components/ill/AssistantInsight";
import { ChatMotionScene } from "../../SellMotion/ChatMotionScene";
import { AssistantText, Thinking } from "../../SellMotion/parts";
import type { Beat } from "../../SellMotion/useChatTimeline";
import { brand, whisperToAgent } from "../data";
import handoffBgImage from "@/modules/support/assets/motion-v4/scenarios/human-loop/handoff-bg.webp";

const handoffBg = handoffBgImage.src;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: whisperToAgent.userMessage },
  // The merchant's private note lands before Crossword answers, then
  // Crossword acknowledges it ("Guidance received.") — the whisper has
  // to visibly arrive and register before it can shape the reply.
  { id: "whisper", type: "appear", ms: 1100 },
  { id: "ack", type: "appear", ms: 600 },
  { id: "think", type: "think", labels: ["Thinking", "Keeping it warm"] },
  { id: "reply", type: "text", text: whisperToAgent.assistantMessage },
];

// Support V3 Motion / 12 — Whisper to the agent, floating note. Same
// themed 292x338.905 shell, backdrop, floating card and copy as the
// static WhisperToAgentFloating. The card's footer keeps its layout from
// the card's first frame (hidden, not unmounted — the anchor's reserved
// 134px is sized to the full card) and only fades in on `ack`.
// `alignTallTurnTop` makes the follow-scroll land on the card's own top
// edge once the reply grows the anchor past the viewport, the same frame
// the static's useScrolledToCard freezes on, with the reply's tail under
// ContentFade. The static is untouched.
export function WhisperToAgentFloatingMotion() {
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
          alignTallTurnTop
        >
          {(t) =>
            t.passed("ask") && (
              <>
                <UserTurn animateIn>
                  <ChatMessage role="user" text={whisperToAgent.userMessage} />
                </UserTurn>
                {t.reached("whisper") && (
                  <div className="ill-whisper-float-anchor">
                    <div
                      className={[
                        "ill-whisper-float",
                        "ill-assistant-turn--enter",
                        t.reached("ack") ? "ill-whisper-float--ack" : "ill-whisper-float--pending",
                      ].join(" ")}
                    >
                      <AssistantInsight
                        source="Private"
                        sourceSuffix="Whisper to Crossword"
                        attribution={`${whisperToAgent.whisperSender} from ${brand}:`}
                        lines={[whisperToAgent.whisperMessage]}
                        footer={{ label: whisperToAgent.guidanceReceivedLabel }}
                      />
                    </div>
                    {t.reached("think") && (
                      <AssistantTurn animateIn>
                        <Thinking t={t} id="think" />
                        {t.reached("reply") && <AssistantText text={whisperToAgent.assistantMessage} />}
                      </AssistantTurn>
                    )}
                  </div>
                )}
              </>
            )
          }
        </ChatMotionScene>
      </div>
    </SceneFrame>
  );
}
