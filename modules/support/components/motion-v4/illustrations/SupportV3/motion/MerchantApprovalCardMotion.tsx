import { SceneFrame } from "../../../components/ill/SceneFrame";
import { UserTurn } from "../../../components/ill/UserTurn";
import { AssistantTurn } from "../../../components/ill/AssistantTurn";
import { ChatMessage } from "../../../components/ill/ChatMessage";
import { AssistantInsight } from "../../../components/ill/AssistantInsight";
import { InsightHighlight } from "../../../components/ill/InsightHighlight";
import { Icon } from "../../../components/ill/Icon";
import { ChatMotionScene } from "../../SellMotion/ChatMotionScene";
import { AssistantText, Thinking } from "../../SellMotion/parts";
import type { Beat } from "../../SellMotion/useChatTimeline";
import { SupportPanel } from "../SupportParts";
import { brand, merchantApproval } from "../data";
import handoffBgImage from "@/modules/support/assets/motion-v4/scenarios/human-loop/handoff-bg.webp";

const handoffBg = handoffBgImage.src;

const beats: Beat[] = [
  { id: "ask", type: "compose", text: merchantApproval.userMessage },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "checking", type: "text", text: merchantApproval.checkingMessage },
  { id: "card", type: "load", ms: 700 },
  // A reading hold on the private request before anyone answers it.
  { id: "read", type: "pause", ms: 900 },
  // The merchant's answer: "Approve 15%" takes a single press.
  { id: "approve", type: "appear", ms: 550 },
  { id: "offerThink", type: "think", labels: ["Thinking", "Applying 15% off"] },
  { id: "offer", type: "text", text: merchantApproval.offerMessage },
];

// Support V3 Motion / 11 — Merchant approval, inline card. Same themed
// 292x338.905 shell, backdrop, approval card and copy as the static
// MerchantApprovalCard. The card mounts skeleton-covered under "One
// moment", holds long enough to read the request, then "Approve 15%"
// presses once (a one-shot keyframe while the `approve` beat plays, the
// button at rest before and after) and the offer follows as the next
// turn. Follow-scroll ends on the static's scrolled-to-end frame. The
// static is untouched.
export function MerchantApprovalCardMotion() {
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
                  <ChatMessage role="user" text={merchantApproval.userMessage} />
                </UserTurn>
                <AssistantTurn animateIn>
                  <Thinking t={t} id="think" />
                  {t.reached("checking") && <AssistantText text={merchantApproval.checkingMessage} />}
                  {t.reached("card") && (
                    <SupportPanel loading={t.loading("card")}>
                      <div className="ill-approval-privacy">
                        <Icon name="lock" size={12} />
                        <p className="ill-approval-privacy__text">{merchantApproval.privacyLabel}</p>
                      </div>
                      <AssistantInsight source="Crossword" lines={[merchantApproval.requestMessage]} />
                      <div className={t.loading("approve") ? "ill-approval-press" : undefined}>
                        <InsightHighlight statement={merchantApproval.decision} />
                      </div>
                    </SupportPanel>
                  )}
                </AssistantTurn>
                {t.reached("offerThink") && (
                  <AssistantTurn animateIn>
                    <Thinking t={t} id="offerThink" />
                    {t.reached("offer") && <AssistantText text={merchantApproval.offerMessage} />}
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
