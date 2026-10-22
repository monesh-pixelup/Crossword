import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Button } from "../../components/ill/Button";
import { PurchaseRow } from "../CampaignParts";
import { brand, script, purchase, feedback } from "../ReviewSolicitation/data";
import { CampaignFrame } from "../CampaignFrame";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Campaigns 10 — Review solicitation. The ask, then the
// one module (order, unrated stars, action) resolving as a unit. Stars
// stay unrated — the sequence never fills them in for the shopper.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "module", type: "load" },
];

export function ReviewSolicitationMotion() {
  return (
    <CampaignFrame>
      <ChatMotionScene brand={brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("module") && (
                <LoadingFrame loading={t.loading("module")} radius={12} className="ill-review">
                  <PurchaseRow {...purchase} />
                  <div className="ill-review__rate">
                    <p className="ill-review__label">{feedback.label}</p>
                    <div className="ill-review__stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg key={i} width="26" height="26" viewBox="0 0 9.02336 9.02336" aria-hidden="true">
                          <path
                            d="M4.51168 0L5.70504 2.86917L8.80255 3.1175L6.44257 5.13907L7.16358 8.16171L4.51168 6.54194L1.85978 8.16171L2.58079 5.13907L0.220818 3.1175L3.31833 2.86917L4.51168 0Z"
                            fill="none"
                            stroke="var(--ill-color-text-muted)"
                            strokeWidth="0.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <Button appearance="secondary" label={feedback.action} />
                </LoadingFrame>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </CampaignFrame>
  );
}
