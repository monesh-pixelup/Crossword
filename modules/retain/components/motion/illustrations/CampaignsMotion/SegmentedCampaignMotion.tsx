import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { AssistantInsight } from "../../components/ill/AssistantInsight";
import { Chip } from "../../components/ill/Chip";
import { ProductCollection } from "../../components/ill/ProductCollection";
import { RecommendationProductCard } from "../../components/ill/RecommendationProductCard";
import { brand, script, signal, shortlistLabel, shortlist } from "../SegmentedCampaign/data";
import { CampaignFrame } from "../CampaignFrame";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { AssistantText, Enter, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Campaigns 07 — Segmented & triggered. The browsing
// signal settles first so the reason for reaching out is read before the
// message, then the shortlist resolves out of its skeletons.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Reviewing recent visits"] },
  { id: "insight", type: "appear" },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "cards", type: "load" },
];

export function SegmentedCampaignMotion() {
  return (
    <CampaignFrame>
      <ChatMotionScene brand={brand} beats={beats} className="ill-segmented">
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("insight") && (
                <Enter>
                  <AssistantInsight source={signal.source} lines={[signal.line]} />
                </Enter>
              )}
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("cards") && (
                <div className="ill-campaign-group ill-campaign-module ill-assistant-turn--enter">
                  <Chip size="sm">{shortlistLabel}</Chip>
                  <ProductCollection>
                    {shortlist.map((product, i) => (
                      <RecommendationProductCard
                        key={product.id}
                        product={product}
                        loading={t.loading("cards")}
                        resolveDelayMs={i * 80}
                      />
                    ))}
                  </ProductCollection>
                </div>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </CampaignFrame>
  );
}
