import { ConversionAssistanceFrame } from "../../components/ill/ConversionAssistanceFrame";
import { AssistantTurn } from "../../components/ill/AssistantTurn";
import { Thumbnail } from "../../components/ill/Thumbnail";
import { ProductMeta } from "../../components/ill/ProductMeta";
import { RetainModule } from "../Retain/RetainParts";
import { browseRecovery as s } from "../Retain/data";
import { ChatMotionScene } from "../SellMotion/ChatMotionScene";
import { LoadingFrame } from "../SellMotion/LoadingFrame";
import { AssistantText, Thinking } from "../SellMotion/parts";
import type { Beat } from "../SellMotion/useChatTimeline";

// Motion sibling of Retain / 02. The tier is the sequence: the viewed bag
// resolves first, then the two alternatives below it — they never land
// as three equals.
const beats: Beat[] = [
  { id: "lead", type: "pause", ms: 350 },
  { id: "think", type: "think", labels: ["Thinking", "Finding similar bags"] },
  { id: "reply", type: "text", text: s.message },
  { id: "viewed", type: "load" },
  { id: "similar", type: "load", ms: 550 },
];

export function BrowseRecoveryMotion() {
  return (
    <ConversionAssistanceFrame>
      <ChatMotionScene brand={s.brand} beats={beats}>
        {(t) =>
          t.passed("lead") && (
            <AssistantTurn animateIn>
              <Thinking t={t} id="think" />
              {t.reached("reply") && <AssistantText text={s.message} />}
              {t.reached("viewed") && (
                <LoadingFrame loading={t.loading("viewed")} radius={12}>
                  <RetainModule product={{ ...s.viewed, size: 72 }} label={s.viewedLabel} />
                </LoadingFrame>
              )}
              {t.reached("similar") && (
                <div className="ill-retain-similar ill-assistant-turn--enter">
                  <p className="ill-retain-similar__label">{s.similarLabel}</p>
                  <div className="ill-retain-similar__row">
                    {s.similar.map((p) => (
                      <LoadingFrame key={p.id} loading={t.loading("similar")} radius={8} className="ill-retain-similar__item">
                        <Thumbnail src={p.image} alt={p.alt} size={40} />
                        <ProductMeta title={p.title} price={p.price} />
                      </LoadingFrame>
                    ))}
                  </div>
                </div>
              )}
            </AssistantTurn>
          )
        }
      </ChatMotionScene>
    </ConversionAssistanceFrame>
  );
}
