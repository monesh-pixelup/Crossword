import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AiPills } from "../../components/ill/AiPills";
import { PurchaseRow } from "../CampaignParts";
import { brand, script, purchase, replies } from "../PostPurchaseFollowUp/data";
import { CampaignFrame } from "../CampaignFrame";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Enter, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Campaigns 08 — Post-purchase follow-up. The delivered
// order resolves first (the context for the check-in), then the message,
// then the two replies — left unpicked, so the sequence ends on the
// shopper's choice.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Checking your order"] },
  { id: "purchase", type: "load", ms: 550 },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "pills", type: "appear" },
];

export function PostPurchaseFollowUpMotion() {
  return (
    <CampaignFrame>
      <ChatMotionScene brand={brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("purchase") && (
                <LoadingFrame loading={t.loading("purchase")} radius={12} className="ill-campaign-purchase ill-assistant-turn--enter">
                  <PurchaseRow {...purchase} />
                </LoadingFrame>
              )}
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("pills") && (
                <Enter>
                  <AiPills options={replies} selectedId="" />
                </Enter>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </CampaignFrame>
  );
}
