import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Chip } from "../../components/ill/Chip";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { Button } from "../../components/ill/Button";
import { brand, script, previous, next } from "../WinBackCampaign/data";
import { CampaignFrame } from "../CampaignFrame";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Campaigns 09 — Win-back. The before/after card
// resolves as one unit, so the two columns never arrive as two separate
// products.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Checking past orders"] },
  { id: "reply", type: "text", text: script.assistantMessage },
  { id: "card", type: "load" },
];

export function WinBackCampaignMotion() {
  return (
    <CampaignFrame>
      <ChatMotionScene brand={brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={script.assistantMessage} />}
              {t.reached("card") && (
                <LoadingFrame loading={t.loading("card")} radius={12} className="ill-winback">
                  <div className="ill-winback__columns">
                    <div className="ill-winback__item ill-winback__item--previous">
                      <Chip size="sm">{previous.label}</Chip>
                      <Thumbnail src={previous.image} alt={previous.alt} size={72} />
                      <ProductMeta brand={next.brand} title={previous.title} />
                      <p className="ill-winback__note">{previous.meta}</p>
                    </div>
                    <div className="ill-winback__item ill-winback__item--next">
                      <Chip size="sm">{next.label}</Chip>
                      <Thumbnail src={next.image} alt={next.alt} size={72} />
                      <ProductMeta brand={next.brand} title={next.title} price={next.price} />
                      <p className="ill-winback__note">{next.subtitle}</p>
                    </div>
                  </div>
                  <Button appearance="primary" label={next.cta} />
                </LoadingFrame>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </CampaignFrame>
  );
}
